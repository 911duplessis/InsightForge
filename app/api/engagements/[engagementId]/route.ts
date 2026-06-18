import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET(_req: Request, { params }: { params: Promise<{ engagementId: string }> }) {
  const { engagementId } = await params

  const { data: engagement, error } = await supabaseAdmin
    .from('vdos_engagements')
    .select('*, business:businesses(*), client:clients(*)')
    .eq('id', engagementId)
    .single()
  if (error || !engagement) {
    return NextResponse.json({ success: false, error: 'Engagement not found' }, { status: 404 })
  }

  const { data: stages } = await supabaseAdmin
    .from('vdos_stages')
    .select('*')
    .eq('engagement_id', engagementId)
    .order('stage_number', { ascending: true })

  const { data: asqInstruments } = await supabaseAdmin
    .from('asq_instruments')
    .select('*')
    .eq('engagement_id', engagementId)

  return NextResponse.json({
    success: true,
    data: { engagement, stages: stages ?? [], asq_instruments: asqInstruments ?? [] },
  })
}
