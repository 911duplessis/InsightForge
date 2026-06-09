import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'InsightForge Discover™ — Business Discovery & Intelligence',
  description:
    'InsightForge Discover™ uses the FORGE Framework to deliver executive-grade business intelligence, revenue opportunity analysis, and strategic blueprints for your business.',
  openGraph: {
    title: 'InsightForge Discover™',
    description: 'AI-powered business discovery and strategic blueprint generation',
    type: 'website',
  },
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
      </head>
      <body className="min-h-screen bg-slate-50 text-slate-900">
        {children}
      </body>
    </html>
  )
}
