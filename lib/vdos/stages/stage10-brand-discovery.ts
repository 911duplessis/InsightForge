import type { StageContext } from '@/types/vdos'
import { wrapPrompt } from '../shared'

export function buildPrompt(context: StageContext): string {
  return wrapPrompt(
    `Stage 10 — Brand Discovery. This stage only runs after the Stage 9 Category Creation gate
has passed. Propose 3-5 brand_name_options with rationale tied to the selected_category and
category_definition_statement. Pick selected_brand_name, write a positioning_statement, and
describe the brand_voice.

Return JSON matching:
{ "brand_name_options": [{ "name": string, "rationale": string }], "selected_brand_name": string, "positioning_statement": string, "brand_voice": string }`,
    context,
    { stageKeys: ['category_creation', 'venture_thesis'] }
  )
}
