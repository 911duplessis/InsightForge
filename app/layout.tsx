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

const ORGANIZATION_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'InsightForge',
  legalName: 'LMGI - The Distribution Company',
  description:
    'A South African-led network of vetted specialists delivering evidence-first business discovery, strategy, and execution.',
  areaServed: 'ZA',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '126 Campbell Road',
    addressLocality: 'Fourways',
    addressRegion: 'Gauteng',
    addressCountry: 'ZA',
  },
  telephone: '+27 71 770 0072',
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
