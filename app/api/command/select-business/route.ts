import { NextRequest, NextResponse } from 'next/server'
import { getConsultantSession } from '@/lib/tenant'
import { BUSINESS_COOKIE_NAME } from '@/lib/auth'

export async function POST(req: NextRequest) {
  const session = await getConsultantSession()
  if (!session) {
    return NextResponse.json({ success: false, error: 'Not authenticated' }, { status: 401 })
  }

  const { business_id } = await req.json()
  if (!business_id) {
    return NextResponse.json({ success: false, error: 'business_id is required' }, { status: 400 })
  }

  const response = NextResponse.json({ success: true })
  response.cookies.set(BUSINESS_COOKIE_NAME, business_id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  })
  return response
}
