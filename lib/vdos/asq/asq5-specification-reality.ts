import type { Asq5Input, StageContext } from '@/types/vdos'
import { VDOS_RULES, renderContext } from '../shared'
import { computeMarginDelta } from './formulas'

export function buildAnalysisPrompt(rawInput: Asq5Input, context: StageContext): string {
  const byClass = new Map<string, number[]>()
  for (const d of rawInput.deals_classified) {
    const list = byClass.get(d.classification) ?? []
    list.push(d.margin)
    byClass.set(d.classification, list)
  }
  const avgByClass: Record<string, number> = {}
  for (const [cls, margins] of Array.from(byClass.entries())) {
    avgByClass[cls] = margins.reduce((a, b) => a + b, 0) / margins.length
  }
  const s1Avg = avgByClass['S1'] ?? 0
  const s4Avg = avgByClass['S4'] ?? 0
  const marginDeltaS1VsS4 = computeMarginDelta(s1Avg, s4Avg)

  const total = rawInput.deals_classified.length
  const classCounts: Record<string, number> = {}
  for (const d of rawInput.deals_classified) {
    classCounts[d.classification] = (classCounts[d.classification] ?? 0) + 1
  }
  const criticalShare = total > 0 ? ((classCounts['S1'] ?? 0) / total) * 100 : 0

  return `${VDOS_RULES}\n\n${renderContext(context)}

## ASQ5 — Specification Reality Test
Deal classifications (S1 Pre-specified / S2 Influenced / S3 Competitive / S4 Cold) supplied:
${JSON.stringify(rawInput.deals_classified, null, 2)}

Pre-computed average margin by classification: ${JSON.stringify(avgByClass)}
Pre-computed S1 vs S4 margin delta (percentage points): ${marginDeltaS1VsS4}
Pre-computed S1 share of total deals: ${criticalShare.toFixed(1)}%

## Task
Apply the Specification Threshold Matrix (S1 share <10% = critical, 10-20% = latent, 20-35%
= active, 35%+ = structural) to classify where this business sits. Recommend Road A
(Specification System investment) if the S1 share and margin delta justify it, or Road B
(Referral + Contractor foundation first) if not — be explicit about which evidence drove
the choice.

Return JSON matching:
{ "threshold_classification": "critical"|"latent"|"active"|"structural", "margin_delta_s1_vs_s4": number, "recommended_road": "Road A - Specification System"|"Road B - Referral and Contractor Foundation", "rationale": string }`
}
