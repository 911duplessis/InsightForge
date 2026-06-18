import type { StageContext } from '@/types/vdos'

/** Common preamble injected into every stage prompt — the VDOS operating rules. */
export const VDOS_RULES = `You are running the Venture Discovery Operating System (VDOS) for a real business.
VDOS is NOT a validation exercise. Your objective is to discover the highest-demand, most
scalable, most defensible opportunity that aligns with the founder's capabilities and is
supported by measurable evidence — even if that means contradicting the founder's original idea.

At every stage you must:
- Challenge assumptions rather than accept them.
- Actively seek contradictory evidence, not just supporting evidence.
- Separate founder desire ("what they want to build") from market demand ("what the evidence shows is wanted").
- Score opportunities objectively using the stated rubric, not by enthusiasm.
- Rank options by probability of success, not by founder preference.

You are not allowed to assume the founder's initial idea is correct. If the evidence
contradicts it, say so plainly and explain why.

Respond with ONLY valid JSON matching the schema given. No markdown fences, no preamble, no commentary.`

function formatRecord(label: string, record: Record<string, unknown> | undefined | null): string {
  if (!record || Object.keys(record).length === 0) return ''
  return `\n\n### ${label}\n${JSON.stringify(record, null, 2)}`
}

/** Renders the intake summary + all prior stage/ASQ outputs available to a stage builder. */
export function renderContext(context: StageContext, opts?: { stageKeys?: string[]; asqKeys?: string[] }): string {
  const { intakeSummary, priorStageOutputs, asqOutputs, business } = context

  let out = `## Business\n${business.name} (industry: ${business.industry ?? 'unspecified'})`
  out += `\n\n## Founder Intake\n${JSON.stringify(intakeSummary, null, 2)}`

  const stageKeys = opts?.stageKeys ?? Object.keys(priorStageOutputs)
  for (const key of stageKeys) {
    out += formatRecord(`Prior Stage Output: ${key}`, priorStageOutputs[key as keyof typeof priorStageOutputs])
  }

  const asqKeys = opts?.asqKeys ?? Object.keys(asqOutputs)
  for (const key of asqKeys) {
    out += formatRecord(`ASQ Evidence: ${key}`, asqOutputs[key as keyof typeof asqOutputs])
  }

  return out
}

export function wrapPrompt(instructions: string, context: StageContext, opts?: { stageKeys?: string[]; asqKeys?: string[] }): string {
  return `${VDOS_RULES}\n\n${renderContext(context, opts)}\n\n## Task\n${instructions}`
}
