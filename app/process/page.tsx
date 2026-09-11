import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'The FORGE Framework™ — How InsightForge Actually Works',
  description:
    'Discover, Forge, Build, Scale: the four-stage methodology behind every InsightForge engagement, from a single-pass FORGE Lite intake to a full 11-stage VDOS Discovery.',
  openGraph: {
    title: 'The FORGE Framework™',
    description: 'Discover, Forge, Build, Scale — how an InsightForge engagement actually runs.',
    type: 'website',
  },
}

const STAGES = [
  {
    step: 'Discover',
    tag: 'Business audit · competitor analysis · market intelligence',
    desc: 'We start by finding out what’s actually true — not what the pitch deck says. A business audit, a real look at competitors, and the assumptions currently going unquestioned. This is where most consulting engagements skip straight past to a recommendation. We don’t.',
  },
  {
    step: 'Forge',
    tag: 'Strategic report · roadmap · investment planning',
    desc: 'Everything from Discovery becomes the Master Blueprint: positioning, brand identity, a technology roadmap, and an implementation plan with real numbers and a real timeline attached — something you could hand to a different team entirely and still act on.',
  },
  {
    step: 'Build',
    tag: 'Websites · applications · automation · AI systems',
    desc: 'Development starts only once the Blueprint is agreed. Not before. Every build traces back to a specific finding from Discovery — nothing gets built because it was easy to sell.',
  },
  {
    step: 'Scale',
    tag: 'SEO · analytics · optimisation · expansion',
    desc: 'A retained relationship, not a handoff. We stay measured against the same numbers the Blueprint set out — so "did this work" stays answerable in your terms, not ours.',
  },
]

export default function ProcessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-forge-950 via-forge-900 to-forge-800">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-gold-400 to-gold-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">IF</span>
          </div>
          <span className="text-white font-bold text-xl tracking-tight">InsightForge</span>
        </Link>
        <div className="flex items-center gap-6">
          <Link href="/about" className="text-slate-400 hover:text-white text-sm transition-colors">About</Link>
          <Link href="/team" className="text-slate-400 hover:text-white text-sm transition-colors">Team</Link>
          <Link href="/process" className="text-white text-sm font-medium">Process</Link>
          <Link href="/projects" className="text-slate-400 hover:text-white text-sm transition-colors">Projects</Link>
          <Link href="/partners" className="text-slate-400 hover:text-white text-sm transition-colors">Partners</Link>
          <Link href="/policies" className="text-slate-400 hover:text-white text-sm transition-colors">Policies</Link>
          <Link href="/contact" className="text-slate-400 hover:text-white text-sm transition-colors">Contact</Link>
        </div>
      </nav>

      {/* Hero */}
      <div className="max-w-3xl mx-auto px-8 pt-20 pb-16 text-center">
        <div className="inline-flex items-center gap-2 bg-forge-800/50 border border-forge-700 rounded-full px-4 py-2 mb-8">
          <div className="w-2 h-2 bg-gold-400 rounded-full animate-pulse" />
          <span className="text-gold-300 text-sm font-medium">How We Work</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight tracking-tight">
          No hype.
          <br />
          <span className="gold-gradient-text">Just what&apos;s best for you.</span>
        </h1>
        <p className="text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
          Nothing here is too big to explain plainly, and nothing gets promised that
          isn&apos;t backed by evidence. This is the process, start to finish — no part of
          it skipped, no part of it dressed up.
        </p>
      </div>

      {/* Discover -> Forge -> Build -> Scale, in depth */}
      <div className="py-16">
        <div className="max-w-4xl mx-auto px-8 flex flex-col gap-6">
          {STAGES.map((s, i) => (
            <div key={s.step} className="bg-forge-900/40 border border-forge-700/50 rounded-2xl p-8 flex gap-6">
              <div className="text-gold-400 font-mono text-sm pt-1 shrink-0">{String(i).padStart(2, '0')}</div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">{s.step}</h2>
                <p className="text-gold-300/80 text-xs uppercase tracking-wide font-semibold mb-3">{s.tag}</p>
                <p className="text-slate-300 leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Time, leveraged not spent (the 1% principle) */}
      <div className="border-y border-forge-800 bg-forge-950/40 py-20">
        <div className="max-w-3xl mx-auto px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Time, leveraged — not spent.</h2>
          <p className="text-slate-300 text-lg leading-relaxed mb-6">
            If you could give away 1% of your time and get back 100% of your life, would
            you? That&apos;s the whole point of Discover-before-Build: the 1% of clarity
            that changes where the other 99% of effort goes. Not speed for its own sake —
            leverage. Consistency over intensity.
          </p>
          <p className="text-slate-400 leading-relaxed">
            It&apos;s why we won&apos;t take a Build brief without a Blueprint behind it —
            skipping that 1% is the single most expensive shortcut a business can take.
          </p>
        </div>
      </div>

      {/* How we show up */}
      <div className="py-24">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-white mb-4">What you can expect, every time</h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              We&apos;ve been through enough to know these aren&apos;t just words on a page.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <ValueCard title="Belonging" desc="You're not a ticket number. We're stronger working alongside you than for you." />
            <ValueCard title="Trust" desc="Every recommendation traces back to evidence you can check yourself." />
            <ValueCard title="Understanding" desc="Sometimes the most valuable thing we do is listen before we advise." />
            <ValueCard title="Confidence" desc="Said plainly, backed by evidence — never inflated to sound impressive." />
          </div>
        </div>
      </div>

      {/* Built to last */}
      <div className="bg-forge-950/50 border-t border-forge-800 py-20">
        <div className="max-w-3xl mx-auto px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Built to last, not just to sell</h2>
          <p className="text-slate-300 leading-relaxed">
            We operate on the belief that there&apos;s enough opportunity in every market
            for everyone doing the work honestly — that&apos;s the eco-conscious,
            long-term view behind every recommendation we make. This business is
            structured to serve first: real transparency, milestone payments, and a
            reward that&apos;s shared, not extracted.
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="py-24 text-center">
        <div className="max-w-2xl mx-auto px-8">
          <h2 className="text-4xl font-black text-white mb-6">
            Ready to start with
            <br />
            <span className="gold-gradient-text">evidence, not an estimate?</span>
          </h2>
          <Link
            href="/contact"
            className="inline-block bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-white font-bold py-4 px-10 rounded-xl text-lg transition-all transform hover:scale-105 shadow-2xl shadow-gold-900/30"
          >
            Start a Discovery →
          </Link>
        </div>
      </div>

      <footer className="border-t border-forge-800 py-8 text-center">
        <p className="text-slate-500 text-sm">
          © {new Date().getFullYear()} InsightForge™. All rights reserved.
        </p>
        <p className="text-slate-600 text-xs mt-2">
          126 Campbell Road, Fourways, Johannesburg &middot; +27 71 770 0072
        </p>
      </footer>
    </div>
  )
}

function ValueCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="bg-forge-900/40 border border-forge-700/50 rounded-xl p-6">
      <h3 className="text-white font-bold mb-2">{title}</h3>
      <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
    </div>
  )
}
