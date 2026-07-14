import { NextResponse } from 'next/server'
import { runStage, AsqNotReadyError, GateBlockedError } from '@/lib/vdos/engine'
import { checkRateLimit, clientIp } from '@/lib/rateLimit'

export async function POST(
  req: Request,
  { params }: { params: Promise<{ engagementId: string; stageNumber: string }> }
) {
  const { engagementId, stageNumber } = await params
  const stageNum = parseInt(stageNumber, 10)

  try {
    const rl = await checkRateLimit(`stage-run:${clientIp(req)}`, 60, 600)
    if (!rl.ok) {
      return NextResponse.json(
        { success: false, error: 'Too many requests. Please try again shortly.' },
        { status: 429, headers: { 'Retry-After': String(rl.retryAfter) } }
      )
    }

    const stage = await runStage(engagementId, stageNum)
    return NextResponse.json({ success: true, data: stage })
  } catch (err) {
    if (err instanceof AsqNotReadyError) {
      return NextResponse.json(
        { success: false, error: err.message, missing_asq_keys: err.missingAsqKeys },
        { status: 409 }
      )
    }
    if (err instanceof GateBlockedError) {
      return NextResponse.json(
        { success: false, error: err.message, blocked_at_stage: err.blockedAtStage, reasons: err.reasons },
        { status: 409 }
      )
    }
    console.error('Stage run error:', err)
    return NextResponse.json(
      { success: false, error: err instanceof Error ? err.message : 'Internal server error' },
      { status: 500 }
    )
  }
}
