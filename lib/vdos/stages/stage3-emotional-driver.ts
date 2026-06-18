import type { StageContext } from '@/types/vdos'
import { wrapPrompt } from '../shared'

export function buildPrompt(context: StageContext): string {
  return wrapPrompt(
    `Stage 3 — Emotional Driver Discovery.

List founder_emotional_drivers (why the founder personally wants this venture) separately
from market_emotional_drivers (why customers emotionally want this outcome — fear, status,
relief, identity, etc., grounded in evidence from prior stages). Then give a
divergence_assessment: do the founder's drivers and the market's drivers point the same
direction, or are they pulling the venture toward something the market doesn't actually want?

Return JSON matching:
{ "founder_emotional_drivers": string[], "market_emotional_drivers": string[], "divergence_assessment": string }`,
    context,
    { stageKeys: ['surface_idea', 'outcome_discovery'] }
  )
}
