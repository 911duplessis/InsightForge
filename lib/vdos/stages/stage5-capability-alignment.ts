import type { StageContext } from '@/types/vdos'
import { wrapPrompt } from '../shared'

export function buildPrompt(context: StageContext): string {
  return wrapPrompt(
    `Stage 5 — Capability Alignment.

Given the founder_background and resources from the intake, and the positioning_opportunities
from Stage 4, list founder_capabilities that are genuine strengths, and capability_gaps that
would block execution of the strongest opportunities. Give an alignment_score (0-10) for how
well the founder's actual capabilities match the highest-potential opportunities (not the
founder's preferred one). List build_vs_partner_recommendations for closing the gaps.

Return JSON matching:
{ "founder_capabilities": string[], "capability_gaps": string[], "alignment_score": number, "build_vs_partner_recommendations": string[] }`,
    context,
    { stageKeys: ['market_gap'] }
  )
}
