import { supabaseAdmin } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import EngagementClient from './EngagementClient'

export default async function EngagementPage({ params }: { params: Promise<{ engagementId: string }> }) {
  const { engagementId } = await params

  const { data: engagement } = await supabaseAdmin
    .from('vdos_engagements')
    .select('*, business:businesses(*), client:clients(*)')
    .eq('id', engagementId)
    .single()

  if (!engagement) notFound()

  const { data: stages } = await supabaseAdmin
    .from('vdos_stages')
    .select('*')
    .eq('engagement_id', engagementId)
    .order('stage_number', { ascending: true })

  const { data: asqInstruments } = await supabaseAdmin
    .from('asq_instruments')
    .select('*')
    .eq('engagement_id', engagementId)

  return (
    <EngagementClient
      engagement={engagement}
      initialStages={stages ?? []}
      initialAsqInstruments={asqInstruments ?? []}
    />
  )
}
