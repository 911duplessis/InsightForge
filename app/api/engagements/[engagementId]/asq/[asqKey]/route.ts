import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { runAsq } from '@/lib/vdos/engine'
import { checkRateLimit, clientIp } from '@/lib/rateLimit'
import type { AsqKey, Asq4Input } from '@/types/vdos'

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ engagementId: string; asqKey: string }> }
) {
  const { engagementId, asqKey } = await params
  const { data, error } = await supabaseAdmin
    .from('asq_instruments')
    .select('*')
    .eq('engagement_id', engagementId)
    .eq('asq_key', asqKey)
    .single()

  if (error || !data) {
    return NextResponse.json({ success: false, error: 'ASQ instrument not found' }, { status: 404 })
  }

  return NextResponse.json({ success: true, data })
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ engagementId: string; asqKey: string }> }
) {
  const { engagementId, asqKey } = await params

  const rl = await checkRateLimit(`asq-submit:${clientIp(req)}`, 60, 600)
  if (!rl.ok) {
    return NextResponse.json(
      { success: false, error: 'Too many requests. Please try again shortly.' },
      { status: 429, headers: { 'Retry-After': String(rl.retryAfter) } }
    )
  }

  const rawInput = await req.json()

  try {
    const { data: instrument, error } = await supabaseAdmin
      .from('asq_instruments')
      .update({ raw_input: rawInput, status: 'submitted', submitted_at: new Date().toISOString() })
      .eq('engagement_id', engagementId)
      .eq('asq_key', asqKey)
      .select('*')
      .single()
    if (error || !instrument) throw new Error(error?.message ?? 'ASQ instrument not found')

    if (asqKey === 'asq4') {
      const { data: businessRow } = await supabaseAdmin
        .from('vdos_engagements')
        .select('business_id')
        .eq('id', engagementId)
        .single()

      const dealsInput = rawInput as Asq4Input
      const dealRows = dealsInput.deals.map((deal) => ({
        asq_instrument_id: instrument.id,
        business_id: businessRow?.business_id,
        ...deal,
      }))
      if (dealRows.length > 0) {
        await supabaseAdmin.from('asq4_deals').insert(dealRows)
      }
    }

    const analyzed = await runAsq(engagementId, asqKey as AsqKey)
    return NextResponse.json({ success: true, data: analyzed })
  } catch (err) {
    console.error('ASQ submit error:', err)
    return NextResponse.json(
      { success: false, error: err instanceof Error ? err.message : 'Internal server error' },
      { status: 500 }
    )
  }
}
