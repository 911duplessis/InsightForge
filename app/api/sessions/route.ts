import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { runForgeAnalysis } from '@/lib/claude'
import { checkRateLimit, clientIp } from '@/lib/rateLimit'
import type { DiscoveryFormData, ApiResponse, CreateSessionResponse } from '@/types'

export async function POST(req: NextRequest) {
  try {
    const rl = await checkRateLimit(`sessions:${clientIp(req)}`, 15, 600)
    if (!rl.ok) {
      return NextResponse.json(
        { success: false, error: 'Too many requests. Please try again shortly.' },
        { status: 429, headers: { 'Retry-After': String(rl.retryAfter) } }
      )
    }

    const formData: DiscoveryFormData = await req.json()

    // 1. Upsert client (by email)
    const { data: existingClient } = await supabaseAdmin
      .from('clients')
      .select('id')
      .eq('email', formData.contact.email)
      .single()

    let clientId: string

    if (existingClient) {
      clientId = existingClient.id
      await supabaseAdmin
        .from('clients')
        .update({
          first_name: formData.contact.first_name,
          last_name: formData.contact.last_name,
          phone: formData.contact.phone || null,
          company_name: formData.company.company_name || null,
        })
        .eq('id', clientId)
    } else {
      const { data: newClient, error: clientError } = await supabaseAdmin
        .from('clients')
        .insert({
          first_name: formData.contact.first_name,
          last_name: formData.contact.last_name,
          email: formData.contact.email,
          phone: formData.contact.phone || null,
          company_name: formData.company.company_name || null,
        })
        .select('id')
        .single()

      if (clientError || !newClient) {
        throw new Error(`Failed to create client: ${clientError?.message}`)
      }
      clientId = newClient.id
    }

    // 2. Create discovery session
    const { data: session, error: sessionError } = await supabaseAdmin
      .from('discovery_sessions')
      .insert({
        client_id: clientId,
        status: 'in_progress',
      })
      .select('id')
      .single()

    if (sessionError || !session) {
      throw new Error(`Failed to create session: ${sessionError?.message}`)
    }

    const sessionId = session.id

    // 3. Save all answers
    const answers: Array<{ session_id: string; category: string; question_key: string; answer: string }> = []

    const categories: Array<{ key: keyof DiscoveryFormData; name: string }> = [
      { key: 'contact', name: 'contact' },
      { key: 'company', name: 'company' },
      { key: 'customers', name: 'customers' },
      { key: 'products', name: 'products' },
      { key: 'revenue', name: 'revenue' },
      { key: 'marketing', name: 'marketing' },
      { key: 'operations', name: 'operations' },
      { key: 'competition', name: 'competition' },
      { key: 'challenges', name: 'challenges' },
      { key: 'opportunities', name: 'opportunities' },
    ]

    for (const { key, name } of categories) {
      const section = formData[key] as Record<string, string>
      for (const [field, value] of Object.entries(section)) {
        if (value && value.trim()) {
          answers.push({
            session_id: sessionId,
            category: name,
            question_key: field,
            answer: value.trim(),
          })
        }
      }
    }

    const { error: answersError } = await supabaseAdmin
      .from('discovery_answers')
      .insert(answers)

    if (answersError) {
      throw new Error(`Failed to save answers: ${answersError.message}`)
    }

    // 4. Update session status to completed
    await supabaseAdmin
      .from('discovery_sessions')
      .update({ status: 'completed', completed_at: new Date().toISOString() })
      .eq('id', sessionId)

    // 5. Run FORGE analysis
    const { analysis, tokensUsed } = await runForgeAnalysis(formData)

    // 6. Save insight
    const { error: insightError } = await supabaseAdmin
      .from('insights')
      .insert({
        session_id: sessionId,
        forge_analysis: analysis,
        model_used: 'claude-opus-4-8',
        tokens_used: tokensUsed,
      })

    if (insightError) {
      throw new Error(`Failed to save insight: ${insightError.message}`)
    }

    // 7. Save top opportunities for quick access
    if (analysis.opportunity_matrix && analysis.opportunity_matrix.length > 0) {
      const opportunityRows = analysis.opportunity_matrix.slice(0, 10).map((opp) => ({
        session_id: sessionId,
        title: opp.opportunity,
        revenue_potential: opp.revenue_potential,
        difficulty: opp.difficulty,
        priority: opp.priority,
        confidence_score: opp.confidence_score,
        time_to_value: opp.time_to_value,
      }))

      await supabaseAdmin.from('opportunities').insert(opportunityRows)
    }

    // 8. Create blueprint record
    await supabaseAdmin.from('blueprints').insert({ session_id: sessionId })

    // 9. Mark session as analyzed
    await supabaseAdmin
      .from('discovery_sessions')
      .update({ status: 'analyzed' })
      .eq('id', sessionId)

    const response: ApiResponse<CreateSessionResponse> = {
      success: true,
      data: { session_id: sessionId, client_id: clientId },
    }

    return NextResponse.json(response)
  } catch (err) {
    console.error('Session creation error:', err)
    const response: ApiResponse = {
      success: false,
      error: err instanceof Error ? err.message : 'Internal server error',
    }
    return NextResponse.json(response, { status: 500 })
  }
}
