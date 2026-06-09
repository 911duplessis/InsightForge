import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  const { sessionId } = await params

  try {
    const { data: session, error: sessionError } = await supabaseAdmin
      .from('discovery_sessions')
      .select(`
        *,
        client:clients(*),
        insight:insights(*),
        blueprint:blueprints(*)
      `)
      .eq('id', sessionId)
      .single()

    if (sessionError || !session) {
      return NextResponse.json({ success: false, error: 'Session not found' }, { status: 404 })
    }

    // Mark blueprint as viewed
    if (session.blueprint) {
      await supabaseAdmin
        .from('blueprints')
        .update({ viewed_at: new Date().toISOString() })
        .eq('session_id', sessionId)
        .is('viewed_at', null)
    }

    return NextResponse.json({ success: true, data: session })
  } catch (err) {
    console.error('Blueprint fetch error:', err)
    return NextResponse.json(
      { success: false, error: err instanceof Error ? err.message : 'Internal server error' },
      { status: 500 }
    )
  }
}
