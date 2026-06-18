import { redirect } from 'next/navigation'
import { supabaseAdmin } from '@/lib/supabase'
import { getConsultantSession, getActiveBusinessId } from '@/lib/tenant'
import CommandDashboard, { type VdosEngagementRow, type ForgeLiteSessionRow } from './CommandDashboard'

export default async function CommandPage() {
  const session = await getConsultantSession()
  if (!session) {
    redirect('/command/login')
  }

  let businessQuery = supabaseAdmin.from('businesses').select('*').order('name', { ascending: true })
  if (session.role !== 'admin') {
    const { data: access } = await supabaseAdmin
      .from('consultant_business_access')
      .select('business_id')
      .eq('consultant_id', session.consultantId)
    const allowedIds = (access ?? []).map((a) => a.business_id)
    businessQuery = businessQuery.in('id', allowedIds.length > 0 ? allowedIds : ['00000000-0000-0000-0000-000000000000'])
  }
  const { data: businesses } = await businessQuery

  const cookieBusinessId = await getActiveBusinessId()
  const activeBusinessId =
    cookieBusinessId && businesses?.some((b) => b.id === cookieBusinessId)
      ? cookieBusinessId
      : businesses?.[0]?.id ?? null

  let engagements: VdosEngagementRow[] = []
  let forgeLiteSessions: ForgeLiteSessionRow[] = []

  if (activeBusinessId) {
    const { data: vdosData } = await supabaseAdmin
      .from('vdos_engagements')
      .select('*, client:clients(*)')
      .eq('business_id', activeBusinessId)
      .order('created_at', { ascending: false })
    engagements = (vdosData ?? []) as unknown as VdosEngagementRow[]

    const { data: forgeData } = await supabaseAdmin
      .from('discovery_sessions')
      .select(`
        *,
        client:clients(*),
        insight:insights(id, analyzed_at, tokens_used),
        blueprint:blueprints(id, viewed_at, generated_at),
        opportunities:opportunities(id, title, revenue_potential, priority, confidence_score)
      `)
      .eq('business_id', activeBusinessId)
      .order('created_at', { ascending: false })
    forgeLiteSessions = (forgeData ?? []) as unknown as ForgeLiteSessionRow[]
  }

  return (
    <CommandDashboard
      businesses={businesses ?? []}
      activeBusinessId={activeBusinessId}
      engagements={engagements}
      forgeLiteSessions={forgeLiteSessions}
      isAdmin={session.role === 'admin'}
    />
  )
}
