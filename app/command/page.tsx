import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { supabaseAdmin } from '@/lib/supabase'
import CommandDashboard from './CommandDashboard'

export default async function CommandPage() {
  const cookieStore = await cookies()
  const isAuth = cookieStore.get('command_auth')?.value === 'true'

  if (!isAuth) {
    redirect('/command/login')
  }

  // Fetch all sessions with client info and analysis status
  const { data: sessions } = await supabaseAdmin
    .from('discovery_sessions')
    .select(`
      *,
      client:clients(*),
      insight:insights(id, analyzed_at, tokens_used),
      blueprint:blueprints(id, viewed_at, generated_at),
      opportunities:opportunities(id, title, revenue_potential, priority, confidence_score)
    `)
    .order('created_at', { ascending: false })

  const { count: totalClients } = await supabaseAdmin
    .from('clients')
    .select('*', { count: 'exact', head: true })

  const { count: analyzedSessions } = await supabaseAdmin
    .from('discovery_sessions')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'analyzed')

  return (
    <CommandDashboard
      sessions={sessions || []}
      totalClients={totalClients || 0}
      analyzedSessions={analyzedSessions || 0}
    />
  )
}
