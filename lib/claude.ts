import Anthropic from '@anthropic-ai/sdk'
import type { ForgeAnalysis, DiscoveryFormData } from '@/types'
import { buildForgePrompt } from './forge-prompt'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
})

export async function runForgeAnalysis(
  formData: DiscoveryFormData
): Promise<{ analysis: ForgeAnalysis; tokensUsed: number }> {
  const prompt = buildForgePrompt(formData)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const stream = await (anthropic.messages as any).stream({
    model: 'claude-opus-4-8',
    max_tokens: 16000,
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

  let jsonText = (textContent as { type: 'text'; text: string }).text.trim()

  // Strip markdown code fences if present
  if (jsonText.startsWith('```')) {
    jsonText = jsonText.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '')
  }

  let analysis: ForgeAnalysis
  try {
    analysis = JSON.parse(jsonText) as ForgeAnalysis
  } catch {
    throw new Error(`Failed to parse FORGE analysis JSON: ${jsonText.slice(0, 200)}`)
  }

  const tokensUsed =
    (response.usage.input_tokens || 0) + (response.usage.output_tokens || 0)

  return { analysis, tokensUsed }
}
