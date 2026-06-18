import type { StageContext } from '@/types/vdos'
import { wrapPrompt } from '../shared'

export function buildPrompt(context: StageContext): string {
  return wrapPrompt(
    `Stage 4 — Market Gap Discovery.

Identify identified_gaps in the current market (gap, supporting evidence, a market_size_estimate,
and contradictory_evidence that argues against this gap being real or capturable). Then assess
founder_desire_vs_market_demand explicitly: founder_stated_desire, market_evidence, and a
divergence_assessment. List positioning_opportunities that follow from the gaps that survive
the contradictory evidence check.

Return JSON matching:
{ "identified_gaps": [{ "gap": string, "evidence": string, "market_size_estimate": string, "contradictory_evidence": string }], "founder_desire_vs_market_demand": { "founder_stated_desire": string, "market_evidence": string, "divergence_assessment": string }, "positioning_opportunities": string[] }`,
    context,
    { stageKeys: ['assumption_destruction', 'outcome_discovery', 'emotional_driver'] }
  )
}
