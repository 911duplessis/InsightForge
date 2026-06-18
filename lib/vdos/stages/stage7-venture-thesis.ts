import type { Stage7Output, StageContext } from '@/types/vdos'
import { wrapPrompt } from '../shared'

export function buildPrompt(context: StageContext): string {
  return wrapPrompt(
    `Stage 7 — Venture Thesis. This is a GATE: the engagement may not proceed to MVP Discovery
unless this stage's gate_decision is "pass".

Using Stage 6's top_recommendation and all ASQ evidence (ASQ3-6: price elasticity, channel
gravity, specification reality, specification origin), write a venture_thesis_statement: a
single, falsifiable claim about the venture that the evidence supports. List
supporting_evidence and contradictory_evidence_considered (you must genuinely list real
counter-evidence, not strawmen). Name the selected_opportunity_title (must match a title from
Stage 6's ranked_opportunities).

Evaluate gate_criteria honestly:
- market_demand_validated: is there real evidence of demand, not just founder belief?
- founder_market_divergence_resolved: has the Stage 3 divergence been resolved or explained?
- asq_evidence_consistent: do ASQ3-6 findings support this thesis without major contradiction?
- objections_addressed: have the contradictory_evidence_considered items been addressed?

Set gate_decision to "pass" only if ALL four criteria are true. Otherwise "block" and explain
in gate_rationale exactly what evidence is missing or contradictory.

Return JSON matching:
{ "venture_thesis_statement": string, "supporting_evidence": string[], "contradictory_evidence_considered": string[], "selected_opportunity_title": string, "gate_criteria": { "market_demand_validated": boolean, "founder_market_divergence_resolved": boolean, "asq_evidence_consistent": boolean, "objections_addressed": boolean }, "gate_decision": "pass"|"block", "gate_rationale": string }`,
    context,
    { stageKeys: ['opportunity_ranking', 'emotional_driver'], asqKeys: ['asq3', 'asq4', 'asq5', 'asq6'] }
  )
}

export function validateGate(output: Stage7Output): { passed: boolean; reasons: string[] } {
  const reasons: string[] = []
  const { gate_criteria, gate_decision } = output

  if (!gate_criteria.market_demand_validated) reasons.push('Market demand not validated by evidence.')
  if (!gate_criteria.founder_market_divergence_resolved) reasons.push('Founder/market divergence unresolved.')
  if (!gate_criteria.asq_evidence_consistent) reasons.push('ASQ evidence is inconsistent with the thesis.')
  if (!gate_criteria.objections_addressed) reasons.push('Contradictory evidence not addressed.')

  const allCriteriaTrue = reasons.length === 0
  const passed = gate_decision === 'pass' && allCriteriaTrue

  if (gate_decision === 'pass' && !allCriteriaTrue) {
    reasons.push('Model declared "pass" but not all gate criteria were true — overridden to blocked.')
  }

  return { passed, reasons }
}
