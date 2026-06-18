import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

// Public, read-only lookup so a VDOS intake link (e.g. /discover?business=primeturf)
// can resolve which business the intake belongs to without requiring consultant auth.
export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const { data, error } = await supabaseAdmin
    .from('businesses')
    .select('id, name, slug, status')
    .eq('slug', slug)
    .eq('status', 'active')
    .single()

  if (error || !data) {
    return NextResponse.json({ success: false, error: 'Business not found' }, { status: 404 })
  }

  return NextResponse.json({ success: true, data })
}
