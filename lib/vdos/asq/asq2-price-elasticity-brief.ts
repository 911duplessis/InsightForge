import type { Asq2Input, StageContext } from '@/types/vdos'
import { VDOS_RULES, renderContext } from '../shared'

export function buildAnalysisPrompt(rawInput: Asq2Input, context: StageContext): string {
  return `${VDOS_RULES}\n\n${renderContext(context)}

## ASQ2 — Price Elasticity (brief)
Real price points tested and the purchase-intent signal observed at each:
${JSON.stringify(rawInput.price_points_tested, null, 2)}

## Task
Identify the price point at which purchase intent meaningfully drops, and flag whether this
looks like a true elasticity wall or a different objection in disguise (e.g. trust, not price).
This is a brief pass — ASQ3 will go deeper on override factors.

Return JSON matching:
{ "intent_drop_price": number, "elasticity_assessment": string, "is_true_price_objection": boolean, "notes": string }`
}
