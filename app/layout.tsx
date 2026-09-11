import type { Metadata } from 'next'
import './globals.css'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://insightforge.example.com'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'InsightForge™ — Business Discovery & Intelligence',
    template: '%s | InsightForge™',
  },
  description:
    'InsightForge™ uses the FORGE Framework to deliver executive-grade business intelligence, revenue opportunity analysis, and strategic blueprints for your business.',
  openGraph: {
    title: 'InsightForge™',
    description: 'AI-powered business discovery and strategic blueprint generation',
    type: 'website',
  },
}

// Organization schema — legalName, address, and telephone are intentionally
// omitted until InsightForge has a registered entity and a confirmed
// number/address to publish. Adding placeholder values here would get
// indexed by Google as real business data.
const ORGANIZATION_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'InsightForge',
  description:
    'A South African-led network of vetted specialists delivering evidence-first business discovery, strategy, and execution.',
  areaServed: 'ZA',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_JSON_LD) }}
        />
      </head>
      <body className="min-h-screen bg-slate-50 text-slate-900">
        {children}
      </body>
    </html>
  )
}
