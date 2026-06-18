import type { StageContext } from '@/types/vdos'
import { wrapPrompt } from '../shared'

export function buildPrompt(context: StageContext): string {
  return wrapPrompt(
    `This is Stage 0 — Assumption Destruction, run before the 11 sequential VDOS stages.

Decompose the founder's stated idea into exactly these 12 assumption categories:
Industry, Product, Customer, Business Model, Geography, Delivery, Problem, Competitive,
Founder Role, Revenue, Scale, Format/Digital.

For each category: state the assumption embedded in the founder's idea, assign a
falsification_probability (0-100, how likely this assumption is WRONG based on available
evidence/reasoning), list alternative_possibilities, and list emergent_opportunities that
appear if the assumption is false.

Then produce a destruction_matrix ranking all 12 categories by falsification_probability
(highest first — most likely to be wrong).

Then produce 7-9 emergent_ventures: distinct venture concepts that emerge from destroying
the highest-probability-of-falsification assumptions. Score each on 5 dimensions, each 0-10:
market_demand, defensibility, scalability, founder_fit, speed_to_revenue. Sum to total (/50).
Rank by total descending.

Return JSON matching:
{
  "assumption_categories": [{ "category": string, "stated_assumption": string, "falsification_probability": number, "alternative_possibilities": string[], "emergent_opportunities": string[] }],
  "destruction_matrix": [{ "category": string, "rank": number, "falsification_probability": number }],
  "emergent_ventures": [{ "name": string, "description": string, "market_demand": number, "defensibility": number, "scalability": number, "founder_fit": number, "speed_to_revenue": number, "total": number }]
}`,
    context
  )
}
