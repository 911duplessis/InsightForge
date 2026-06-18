import type { Asq1Input, StageContext } from '@/types/vdos'
import { VDOS_RULES, renderContext } from '../shared'

export function buildAnalysisPrompt(rawInput: Asq1Input, context: StageContext): string {
  return `${VDOS_RULES}\n\n${renderContext(context)}

## ASQ1 — Conversion Driver Test
This instrument tests what actually drives customers to convert (aesthetics, anxiety/fear,
asset value, referral trust, etc.) using the founder's real answer below — not a guess.

Founder's answer to "${rawInput.conversion_driver_question}":
"${rawInput.founder_answer}"

## Task
Interpret this real answer. Identify which conversion driver(s) it reveals, and what business
model bifurcation this implies (e.g. consumer brand vs infrastructure/compliance vs
developer/real-estate channel vs installer-network/franchise — adapt categories to the
business at hand). Be explicit about what this answer rules OUT, not just what it confirms.

Return JSON matching:
{ "primary_conversion_driver": string, "secondary_drivers": string[], "business_model_implication": string, "ruled_out_models": string[], "confidence": number }`
}
