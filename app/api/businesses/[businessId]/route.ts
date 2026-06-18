import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { getConsultantSession } from '@/lib/tenant'

export async function GET(_req: Request, { params }: { params: Promise<{ businessId: string }> }) {
  const session = await getConsultantSession()
  if (!session) {
    return NextResponse.json({ success: false, error: 'Not authenticated' }, { status: 401 })
  }

  const { businessId } = await params
  const { data, error } = await supabaseAdmin
    .from('businesses')
    .select('*')
    .eq('id', businessId)
    .single()

  if (error || !data) {
    return NextResponse.json({ success: false, error: 'Business not found' }, { status: 404 })
  }

  return NextResponse.json({ success: true, data })
}
