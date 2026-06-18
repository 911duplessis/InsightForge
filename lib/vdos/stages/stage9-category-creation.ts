import type { Stage9Output, StageContext } from '@/types/vdos'
import { wrapPrompt } from '../shared'

export function buildPrompt(context: StageContext): string {
  return wrapPrompt(
    `Stage 9 — Category Creation. This is a GATE: the engagement may not proceed to Brand
Discovery unless this stage's gate_decision is "pass".

Propose 2-4 category_options (a "category" is the market category this venture defines itself
against, not a tagline) with rationale for each, grounded in the venture_thesis and MVP
definition. Select selected_category and write a category_definition_statement explaining
what makes this category distinct.

Evaluate gate_criteria honestly:
- category_distinct_from_incumbents: is this genuinely different from how competitors frame themselves?
- category_defensible: can a competitor trivially claim the same category?
- category_resonant_with_evidence: does this category match the emotional/market evidence from earlier stages?

Set gate_decision to "pass" only if all three are true, otherwise "block" with gate_rationale.

Return JSON matching:
{ "category_options": [{ "category_name": string, "rationale": string }], "selected_category": string, "category_definition_statement": string, "gate_criteria": { "category_distinct_from_incumbents": boolean, "category_defensible": boolean, "category_resonant_with_evidence": boolean }, "gate_decision": "pass"|"block", "gate_rationale": string }`,
    context,
    { stageKeys: ['venture_thesis', 'mvp_discovery', 'market_gap'] }
  )
}

export function validateGate(output: Stage9Output): { passed: boolean; reasons: string[] } {
  const reasons: string[] = []
  const { gate_criteria, gate_decision } = output

  if (!gate_criteria.category_distinct_from_incumbents) reasons.push('Category not distinct from incumbents.')
  if (!gate_criteria.category_defensible) reasons.push('Category is not defensible.')
  if (!gate_criteria.category_resonant_with_evidence) reasons.push('Category does not match the evidence gathered.')

  const allCriteriaTrue = reasons.length === 0
  const passed = gate_decision === 'pass' && allCriteriaTrue

  if (gate_decision === 'pass' && !allCriteriaTrue) {
    reasons.push('Model declared "pass" but not all gate criteria were true — overridden to blocked.')
  }

  return { passed, reasons }
}
