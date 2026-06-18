import type { StageContext } from '@/types/vdos'
import { wrapPrompt } from '../shared'

export function buildPrompt(context: StageContext): string {
  return wrapPrompt(
    `Stage 1 — Surface Idea Discovery.

Restate the founder's idea plainly as the surface_idea_statement, then extract
founder_stated_problem and founder_stated_solution as the founder would describe them
(not yet challenged). List unexamined_assumptions still standing after Stage 0's
destruction matrix that have not yet been resolved by evidence.

Return JSON matching:
{ "surface_idea_statement": string, "founder_stated_problem": string, "founder_stated_solution": string, "unexamined_assumptions": string[] }`,
    context,
    { stageKeys: ['assumption_destruction'] }
  )
}
