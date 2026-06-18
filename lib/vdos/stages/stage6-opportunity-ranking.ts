import type { StageContext } from '@/types/vdos'
import { wrapPrompt } from '../shared'

export function buildPrompt(context: StageContext): string {
  return wrapPrompt(
    `Stage 6 — Opportunity Ranking.

Using the emergent_ventures from Stage 0, the gaps from Stage 4, the capability alignment
from Stage 5, and the ASQ1/ASQ2 evidence (conversion driver + price elasticity signal), produce
a final ranked_opportunities list. Score each on the same 5-dimension /50 rubric
(market_demand_score, defensibility_score, scalability_score, founder_fit_score,
speed_to_revenue_score, total_score), assign rank, and estimate probability_of_success
(percentage) grounded in the evidence gathered so far — not optimism. Give a top_recommendation
and rationale explaining why it beats the alternatives on the evidence, even if it is not the
founder's originally preferred option.

Return JSON matching:
{ "ranked_opportunities": [{ "title": string, "description": string, "market_demand_score": number, "defensibility_score": number, "scalability_score": number, "founder_fit_score": number, "speed_to_revenue_score": number, "total_score": number, "rank": number, "probability_of_success": number }], "top_recommendation": string, "rationale": string }`,
    context,
    { stageKeys: ['assumption_destruction', 'market_gap', 'capability_alignment'], asqKeys: ['asq1', 'asq2'] }
  )
}
