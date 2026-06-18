import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { getConsultantSession } from '@/lib/tenant'

export async function GET() {
  const session = await getConsultantSession()
  if (!session) {
    return NextResponse.json({ success: false, error: 'Not authenticated' }, { status: 401 })
  }

  let query = supabaseAdmin.from('businesses').select('*').order('name', { ascending: true })

  if (session.role !== 'admin') {
    const { data: access } = await supabaseAdmin
      .from('consultant_business_access')
      .select('business_id')
      .eq('consultant_id', session.consultantId)
    const allowedIds = (access ?? []).map((a) => a.business_id)
    if (allowedIds.length === 0) {
      return NextResponse.json({ success: true, data: [] })
    }
    query = query.in('id', allowedIds)
  }

  const { data, error } = await query
  if (error) return NextResponse.json({ success: false, error: error.message }, { status: 500 })

  return NextResponse.json({ success: true, data })
}

export async function POST(req: NextRequest) {
  const session = await getConsultantSession()
  if (!session) {
    return NextResponse.json({ success: false, error: 'Not authenticated' }, { status: 401 })
  }
  if (session.role !== 'admin') {
    return NextResponse.json({ success: false, error: 'Only admins can onboard new businesses' }, { status: 403 })
  }

  const body = await req.json()
  const { name, slug, industry, primary_contact_name, primary_contact_email } = body

  if (!name || !slug) {
    return NextResponse.json({ success: false, error: 'name and slug are required' }, { status: 400 })
  }

  const { data, error } = await supabaseAdmin
    .from('businesses')
    .insert({ name, slug, industry, primary_contact_name, primary_contact_email })
    .select('*')
    .single()

  if (error) return NextResponse.json({ success: false, error: error.message }, { status: 500 })

  await supabaseAdmin
    .from('consultant_business_access')
    .insert({ consultant_id: session.consultantId, business_id: data.id })

  return NextResponse.json({ success: true, data })
}
