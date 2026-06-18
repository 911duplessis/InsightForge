import type { StageContext } from '@/types/vdos'
import { wrapPrompt } from '../shared'

export function buildPrompt(context: StageContext): string {
  return wrapPrompt(
    `Stage 2 — Outcome Discovery.

Identify the desired_outcomes customers actually want (not the output/product the founder
plans to deliver). For each: state the outcome, for_whom, and the evidence backing it.
Then describe the outcome_vs_output_gap — where the founder's planned product/output
diverges from the outcome customers are actually paying for.

Return JSON matching:
{ "desired_outcomes": [{ "outcome": string, "for_whom": string, "evidence": string }], "outcome_vs_output_gap": string }`,
    context,
    { stageKeys: ['assumption_destruction', 'surface_idea'] }
  )
}
