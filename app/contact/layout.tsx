import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Start a Discovery — Contact InsightForge™',
  description:
    'A short, honest intake — not a sales call. Tell us the problem you actually need solved and we route you to the right engagement tier, FORGE Lite or full VDOS Discovery.',
  openGraph: {
    title: 'Start a Discovery — Contact InsightForge™',
    description: 'A short, honest intake that routes you to the right engagement tier.',
    type: 'website',
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}
