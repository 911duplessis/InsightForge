import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { STAGE_SEQUENCE, ASQ_KEYS } from '@/types/vdos'
import type { BusinessAgnosticIntake } from '@/types/vdos'
import { runStage } from '@/lib/vdos/engine'
import { checkRateLimit, clientIp } from '@/lib/rateLimit'

interface CreateEngagementBody {
  business_id: string
  intake: BusinessAgnosticIntake
}

export async function POST(req: NextRequest) {
  try {
    const rl = await checkRateLimit(`engagements:${clientIp(req)}`, 15, 600)
    if (!rl.ok) {
      return NextResponse.json(
        { success: false, error: 'Too many requests. Please try again shortly.' },
        { status: 429, headers: { 'Retry-After': String(rl.retryAfter) } }
      )
    }

    const body: CreateEngagementBody = await req.json()
    const { business_id, intake } = body

    if (!business_id || !intake) {
      return NextResponse.json({ success: false, error: 'business_id and intake are required' }, { status: 400 })
    }

    if (!intake.contact?.email) {
      return NextResponse.json({ success: false, error: 'A contact email is required' }, { status: 400 })
    }

    // Only allow engagements against a real, active business. Without this the
    // endpoint would accept any business_id from the request body and spin up a
    // stage run (which calls the LLM) against arbitrary or inactive tenants.
    const { data: business } = await supabaseAdmin
      .from('businesses')
      .select('id')
      .eq('id', business_id)
      .eq('status', 'active')
      .maybeSingle()

    if (!business) {
      return NextResponse.json({ success: false, error: 'Business not found or inactive' }, { status: 404 })
    }

    // Upsert the founder/contact as a client record
    const { data: existingClient } = await supabaseAdmin
      .from('clients')
      .select('id')
      .eq('email', intake.contact.email)
      .single()

    let clientId: string
    if (existingClient) {
      clientId = existingClient.id
    } else {
      const { data: newClient, error: clientError } = await supabaseAdmin
        .from('clients')
        .insert({
          first_name: intake.contact.first_name,
          last_name: intake.contact.last_name,
          email: intake.contact.email,
          phone: intake.contact.phone || null,
        })
        .select('id')
        .single()
      if (clientError || !newClient) {
        throw new Error(`Failed to create client: ${clientError?.message}`)
      }
      clientId = newClient.id
    }

    const { data: engagement, error: engagementError } = await supabaseAdmin
      .from('vdos_engagements')
      .insert({
        business_id,
        client_id: clientId,
        process_type: 'vdos',
        status: 'in_progress',
        current_stage: 0,
        intake_summary: intake,
      })
      .select('*')
      .single()
    if (engagementError || !engagement) {
      throw new Error(`Failed to create engagement: ${engagementError?.message}`)
    }

    const stageRows = STAGE_SEQUENCE.map((s) => ({
      engagement_id: engagement.id,
      business_id,
      stage_number: s.stageNumber,
      stage_key: s.stageKey,
      status: 'pending',
      is_gate: s.isGate,
    }))
    const { error: stagesError } = await supabaseAdmin.from('vdos_stages').insert(stageRows)
    if (stagesError) throw new Error(`Failed to create stage rows: ${stagesError.message}`)

    const asqRows = ASQ_KEYS.map((key) => ({
      engagement_id: engagement.id,
      business_id,
      asq_key: key,
      status: 'awaiting_data',
    }))
    const { error: asqError } = await supabaseAdmin.from('asq_instruments').insert(asqRows)
    if (asqError) throw new Error(`Failed to create ASQ rows: ${asqError.message}`)

    // Kick off Stage 0 immediately
    await runStage(engagement.id, 0)

    return NextResponse.json({ success: true, data: { engagement_id: engagement.id } })
  } catch (err) {
    console.error('Engagement creation error:', err)
    return NextResponse.json(
      { success: false, error: err instanceof Error ? err.message : 'Internal server error' },
      { status: 500 }
    )
  }
}
