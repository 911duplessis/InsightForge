import Anthropic from '@anthropic-ai/sdk'
import type { ForgeAnalysis, DiscoveryFormData } from '@/types'
import { buildForgePrompt } from './forge-prompt'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
})

/**
 * Shared low-level call: send a single prompt to Claude and return the parsed
 * text + token usage. Used by both the FORGE Lite path and the VDOS engine so
 * the streaming/adaptive-thinking setup lives in exactly one place.
 */
export async function runClaudeCompletion(
  prompt: string,
  maxTokens = 16000
): Promise<{ text: string; tokensUsed: number }> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const stream = await (anthropic.messages as any).stream({
    model: 'claude-opus-4-8',
    max_tokens: maxTokens,
    thinking: { type: 'adaptive' },
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
  })

  const response = await stream.finalMessage()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const textContent = response.content.find((block: any) => block.type === 'text')
  if (!textContent || textContent.type !== 'text') {
    throw new Error('No text content in Claude response')
  }

  let text = (textContent as { type: 'text'; text: string }).text.trim()

  // Strip markdown code fences if present
  if (text.startsWith('```')) {
    text = text.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '')
  }

  const tokensUsed =
    (response.usage.input_tokens || 0) + (response.usage.output_tokens || 0)

  return { text, tokensUsed }
}

export function parseJsonResponse<T>(text: string, context: string): T {
  try {
    return JSON.parse(text) as T
  } catch {
    throw new Error(`Failed to parse ${context} JSON: ${text.slice(0, 200)}`)
  }
}

export async function runForgeAnalysis(
  formData: DiscoveryFormData
): Promise<{ analysis: ForgeAnalysis; tokensUsed: number }> {
  const prompt = buildForgePrompt(formData)
  const { text, tokensUsed } = await runClaudeCompletion(prompt)
  const analysis = parseJsonResponse<ForgeAnalysis>(text, 'FORGE analysis')
  return { analysis, tokensUsed }
}
