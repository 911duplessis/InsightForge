import type { Asq6Input, StageContext } from '@/types/vdos'
import { VDOS_RULES, renderContext } from '../shared'

export function buildAnalysisPrompt(rawInput: Asq6Input, context: StageContext): string {
  return `${VDOS_RULES}\n\n${renderContext(context)}

## ASQ6 — Specification Origin Map (final/determinative ASQ)
Control points evidence supplied by the founder:
"${rawInput.control_points_evidence}"

Revenue physics inputs: ${JSON.stringify(rawInput.revenue_physics_inputs, null, 2)}

## Task
Map the Control Points into three clusters: Pre-Decision Capture, Decision-Stage Influence,
Post-Decision Competition. Identify which Revenue Physics dominates this business
(Specification Gravity / Sales Persuasion / Price Competition) based on the evidence. Propose
a Three-Layer Architecture (Founder/Standards layer, Distribution/Influence layer, Execution
layer) and a Floor Rate System (minimum acceptable price by channel/control-point). List
Competitor Exclusion Mechanisms available given the control points identified (e.g.
specification inclusion, approved-supplier lists, warranty lock-in, portfolio reference,
technical knowledge asymmetry — only include ones the evidence supports).

Return JSON matching:
{ "control_point_clusters": { "pre_decision_capture": string[], "decision_stage_influence": string[], "post_decision_competition": string[] }, "dominant_revenue_physics": "Specification Gravity"|"Sales Persuasion"|"Price Competition", "three_layer_architecture": { "layer_1_founder": string, "layer_2_distribution": string, "layer_3_execution": string }, "floor_rate_system": Record<string, number>, "competitor_exclusion_mechanisms": string[] }`
}
