import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { checkRateLimit, clientIp } from '@/lib/rateLimit'

interface ContactBody {
  first_name: string
  last_name: string
  email: string
  phone?: string
  industry?: string
  budget_range: string
  urgency: string
  problem_description: string
}

// Deterministic routing, not an LLM call — this only decides which intake
// tier to *point* the visitor at (/discover-lite vs /discover). The actual
// FORGE/VDOS analysis still runs through the real intake once they're there.
function recommendTier(budget_range: string, urgency: string): 'forge_lite' | 'vdos' {
  const highBudget = budget_range === 'r50k_plus' || budget_range === 'r15k_50k'
  const urgent = urgency === 'immediate' || urgency === 'this_month'
  return highBudget && urgent ? 'vdos' : 'forge_lite'
}

export async function POST(req: NextRequest) {
  const rl = await checkRateLimit(`contact:${clientIp(req)}`, 10, 600)
  if (!rl.ok) {
    return NextResponse.json(
      { success: false, error: 'Too many requests. Please try again shortly.' },
      { status: 429, headers: { 'Retry-After': String(rl.retryAfter) } }
    )
  }

  const body: ContactBody = await req.json()
  const { first_name, last_name, email, phone, industry, budget_range, urgency, problem_description } = body

  if (!first_name || !last_name || !email || !budget_range || !urgency || !problem_description) {
    return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 })
  }

  const recommended_tier = recommendTier(budget_range, urgency)

  const { error } = await supabaseAdmin.from('leads').insert({
    first_name,
    last_name,
    email,
    phone: phone || null,
    industry: industry || null,
    budget_range,
    urgency,
    problem_description,
    recommended_tier,
  })

  if (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true, recommended_tier })
}
