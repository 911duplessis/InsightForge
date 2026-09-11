import Link from 'next/link'

const NETWORK = [
  { role: 'Strategy & Discovery', desc: 'Business strategy, behavioural analysis, market and competitive intelligence' },
  { role: 'Engineering', desc: 'Web, mobile, and AI/automation development across a vetted international bench' },
  { role: 'Growth', desc: 'SEO, analytics, and market positioning run as a retained discipline, not a launch afterthought' },
  { role: 'Identity', desc: 'Corporate branding and visual systems built to carry a strategy, not decorate it' },
]

const EXPERIENCE = [
  'PrimeTurf — go-to-market rebuild and post-migration SEO recovery',
  "Ready & Rooted — a full VDOS Discovery for a New Zealand children's programme",
  'Education platform and Bible-school delivery systems',
  'Real-time club and community communication systems',
  'Ride-hailing application concepts',
  'Business referral and networking platforms',
]

export default function AboutPage() {
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
          <Link href="/about" className="text-white text-sm font-medium">About</Link>
          <Link href="/command" className="text-slate-400 hover:text-white text-sm transition-colors">
            Consultant Login →
          </Link>
        </div>
      </nav>

      {/* Hero / Philosophy */}
      <div className="max-w-4xl mx-auto px-8 pt-20 pb-16 text-center">
        <div className="inline-flex items-center gap-2 bg-forge-800/50 border border-forge-700 rounded-full px-4 py-2 mb-8">
          <div className="w-2 h-2 bg-gold-400 rounded-full animate-pulse" />
          <span className="text-gold-300 text-sm font-medium">Our Story</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight tracking-tight">
          InsightForge is just a tool.
          <br />
          <span className="gold-gradient-text">It&apos;s the awakening that matters.</span>
        </h1>

        <p className="text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
          This isn&apos;t just a company. It&apos;s a collective of highly specialised people who
          will stop at nothing to build a better future for the businesses they work with —
          across countries, disciplines, and time zones. InsightForge exists to show you how
          much you&apos;ve been too close to your own business to see.
        </p>
      </div>

      {/* Find a Need, Fill a Need */}
      <div className="border-y border-forge-800 bg-forge-950/40 py-20">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Find a need. Fill a need.</h2>
          <p className="text-slate-300 text-lg leading-relaxed mb-6">
            You have a challenge. We will find a way — or make one. We don&apos;t just convey
            your dreams and visions back to you; we make them practical, measurable, and
            transparent at every step.
          </p>
          <p className="text-slate-400 leading-relaxed">
            That&apos;s the whole discipline, in one sentence: evidence before opinion, a plan
            before a build, and a number attached to every claim we make about your business.
          </p>
        </div>
      </div>

      {/* The Network */}
      <div className="py-24">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-white mb-4">One network, not one team pretending to be everything</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              20+ years of combined experience, held by specialists across different countries —
              coordinated around one objective, not stitched together after the sale.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {NETWORK.map((n) => (
              <div key={n.role} className="bg-forge-900/40 border border-forge-700/50 rounded-xl p-6">
                <h3 className="text-white font-bold mb-2">{n.role}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{n.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Experience */}
      <div className="bg-forge-950/50 border-t border-forge-800 py-24">
        <div className="max-w-4xl mx-auto px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-white mb-4">Range, not a client-logo wall</h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              Real projects across real industries — proof of range, not a highlight reel.
            </p>
          </div>
          <ul className="flex flex-col gap-3 max-w-2xl mx-auto">
            {EXPERIENCE.map((e) => (
              <li key={e} className="flex items-start gap-3 text-slate-300 text-sm leading-relaxed">
                <span className="text-gold-400 mt-1">—</span>
                <span>{e}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* CTA */}
      <div className="py-24 text-center">
        <div className="max-w-2xl mx-auto px-8">
          <h2 className="text-4xl font-black text-white mb-6">
            You have a challenge.
            <br />
            <span className="gold-gradient-text">We&apos;ll find a way, or make one.</span>
          </h2>
          <Link
            href="/discover-lite"
            className="inline-block bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-white font-bold py-4 px-10 rounded-xl text-lg transition-all transform hover:scale-105 shadow-2xl shadow-gold-900/30"
          >
            Start a Discovery →
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-forge-800 py-8 text-center">
        <p className="text-slate-500 text-sm">
          © {new Date().getFullYear()} InsightForge™. All rights reserved.
        </p>
      </footer>
    </div>
  )
}
