import { notFound } from 'next/navigation'
import { supabaseAdmin } from '@/lib/supabase'
import type { ForgeAnalysis } from '@/types'
import BlueprintClient from './BlueprintClient'

interface BlueprintPageProps {
  params: Promise<{ sessionId: string }>
}

export default async function BlueprintPage({ params }: BlueprintPageProps) {
  const { sessionId } = await params

  const { data: session, error } = await supabaseAdmin
    .from('discovery_sessions')
    .select(`
      *,
      client:clients(*),
      insight:insights(*)
    `)
    .eq('id', sessionId)
    .single()

  if (error || !session || !session.insight) {
    notFound()
  }

  // Mark as viewed
  await supabaseAdmin
    .from('blueprints')
    .update({ viewed_at: new Date().toISOString() })
    .eq('session_id', sessionId)
    .is('viewed_at', null)

  const analysis = session.insight.forge_analysis as ForgeAnalysis
  const client = session.client

  return (
    <BlueprintClient
      analysis={analysis}
      clientName={`${client.first_name} ${client.last_name}`}
      companyName={client.company_name || 'Your Company'}
      sessionId={sessionId}
      generatedAt={session.insight.analyzed_at}
    />
  )
}
