import { notFound } from 'next/navigation'
import { supabaseAdmin } from '@/lib/supabase'
import type { Stage11Output } from '@/types/vdos'
import VdosBlueprintClient from './VdosBlueprintClient'

interface VdosBlueprintPageProps {
  params: Promise<{ engagementId: string }>
}

export default async function VdosBlueprintPage({ params }: VdosBlueprintPageProps) {
  const { engagementId } = await params

  const { data: engagement, error } = await supabaseAdmin
    .from('vdos_engagements')
    .select('*, business:businesses(*), client:clients(*)')
    .eq('id', engagementId)
    .single()

  if (error || !engagement) notFound()

  const { data: stages } = await supabaseAdmin
    .from('vdos_stages')
    .select('*')
    .eq('engagement_id', engagementId)
    .order('stage_number', { ascending: true })

  const finalStage = stages?.find((s) => s.stage_number === 11 && s.status === 'complete')
  if (!finalStage) notFound()

  await supabaseAdmin
    .from('vdos_blueprints')
    .update({ viewed_at: new Date().toISOString() })
    .eq('engagement_id', engagementId)
    .is('viewed_at', null)

  return (
    <VdosBlueprintClient
      vosDesign={finalStage.output as Stage11Output}
      businessName={engagement.business.name}
      founderName={`${engagement.client.first_name} ${engagement.client.last_name}`}
      stages={stages ?? []}
      engagementId={engagementId}
    />
  )
}
