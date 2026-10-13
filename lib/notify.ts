/**
 * Best-effort email notification for new submissions, sent via Resend's REST API
 * (no extra dependency). Never throws: a missing key or a provider error is
 * logged and swallowed so it can never break an intake route.
 *
 * Env:
 *   RESEND_API_KEY  - required to actually send; without it this is a no-op
 *   NOTIFY_EMAIL    - recipient (defaults to the consultant inbox)
 *   NOTIFY_FROM     - verified sender; defaults to Resend's shared test sender
 */
const DEFAULT_RECIPIENT = '911duplessis@gmail.com'
const DEFAULT_SENDER = 'InsightForge <onboarding@resend.dev>'

type Scalar = string | number | boolean | null | undefined
export type NotifyValue = Scalar | NotifyValue[] | { [key: string]: NotifyValue }

function flatten(value: NotifyValue, indent = ''): string {
  if (value === null || value === undefined || value === '') return ''
  if (typeof value !== 'object') return String(value)
  if (Array.isArray(value)) {
    return value.map((v) => `${indent}- ${flatten(v, indent + '  ')}`).join('\n')
  }
  return Object.entries(value)
    .map(([k, v]) => {
      const rendered = flatten(v, indent + '  ')
      if (!rendered) return ''
      const multiline = typeof v === 'object' && v !== null
      return multiline ? `${indent}${k}:\n${rendered}` : `${indent}${k}: ${rendered}`
    })
    .filter(Boolean)
    .join('\n')
}

export async function notifySubmission(
  kind: string,
  payload: { [key: string]: NotifyValue },
  replyTo?: string
): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.warn(`[notify] RESEND_API_KEY not set; skipping "${kind}" email`)
    return
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: process.env.NOTIFY_FROM || DEFAULT_SENDER,
        to: [process.env.NOTIFY_EMAIL || DEFAULT_RECIPIENT],
        subject: `[InsightForge] New ${kind}`,
        text: flatten(payload),
        ...(replyTo ? { reply_to: replyTo } : {}),
      }),
    })
    if (!res.ok) console.error('[notify] Resend error', res.status, await res.text())
  } catch (err) {
    console.error('[notify] failed to send', err)
  }
}
