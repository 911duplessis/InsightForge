import type { StageContext } from '@/types/vdos'
import { wrapPrompt } from '../shared'

export function buildPrompt(context: StageContext): string {
  return wrapPrompt(
    `Stage 8 — MVP Discovery. This stage only runs after the Stage 7 Venture Thesis gate has
passed. Define the mvp_definition: the smallest version of the venture_thesis_statement that
can be tested in market. List in_scope and out_of_scope items, and a validation_plan listing
concrete, falsifiable tests (not vague "see how it goes" steps) to confirm or kill the thesis.

Return JSON matching:
{ "mvp_definition": string, "in_scope": string[], "out_of_scope": string[], "validation_plan": string[] }`,
    context,
    { stageKeys: ['venture_thesis'] }
  )
}
