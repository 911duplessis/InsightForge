import Link from 'next/link'

const CAPABILITIES = [
  'Web & mobile development',
  'AI strategy & automation',
  'Cybersecurity & networking',
  'Cloud & infrastructure',
  'SEO & market positioning',
  'Corporate identity & branding',
]

const PROCESS = [
  {
    step: 'Discover',
    desc: 'Deep analysis of the business, market, customers, competitors, opportunities, and the assumptions currently going unquestioned.',
  },
  {
    step: 'Forge',
    desc: 'The Master Blueprint: positioning, brand identity, technology roadmap, growth strategy, competitive advantage, and an implementation plan with real numbers attached.',
  },
  {
    step: 'Build',
    desc: 'Development starts only once the Blueprint is agreed — websites, applications, automation, AI systems, and digital infrastructure.',
  },
  {
    step: 'Scale',
    desc: 'SEO, analytics, growth systems, and market expansion, run as a retained relationship — not a one-time handoff.',
  },
]

const PROJECTS = [
  {
    name: 'PrimeTurf',
    desc: 'Post-migration SEO recovery and go-to-market rebuild for a Gauteng & Cape Town artificial turf installer.',
  },
  {
    name: 'Ready & Rooted',
    desc: "A full VDOS Discovery engagement for a New Zealand children's emotional-readiness programme.",
  },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-forge-950 via-forge-900 to-forge-800">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-gold-400 to-gold-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">IF</span>
          </div>
          <span className="text-white font-bold text-xl tracking-tight">InsightForge</span>
        </div>
        <div className="flex items-center gap-6">
          <Link href="/about" className="text-slate-400 hover:text-white text-sm transition-colors">About</Link>
          <Link href="/process" className="text-slate-400 hover:text-white text-sm transition-colors">Process</Link>
          <Link href="/contact" className="text-slate-400 hover:text-white text-sm transition-colors">Contact</Link>
          <Link href="/command" className="text-slate-400 hover:text-white text-sm transition-colors">
            Consultant Login →
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <div className="max-w-7xl mx-auto px-8 pt-20 pb-24 text-center">
        <div className="inline-flex items-center gap-2 bg-forge-800/50 border border-forge-700 rounded-full px-4 py-2 mb-8">
          <div className="w-2 h-2 bg-gold-400 rounded-full animate-pulse" />
          <span className="text-gold-300 text-sm font-medium">Strategic Intelligence &amp; Execution Ecosystem</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight tracking-tight">
          Where Insights
          <br />
          <span className="gold-gradient-text">Become Impact.</span>
        </h1>

        <p className="text-xl text-slate-300 mb-4 max-w-2xl mx-auto leading-relaxed">
          Most businesses don&apos;t fail for lack of ideas. They fail for lack of clarity —
          about their market, their customers, and what to build next. InsightForge finds
          that clarity first, with evidence, then builds what it proves out.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-10">
          <Link
            href="/contact"
            className="bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-white font-bold py-4 px-10 rounded-xl text-lg transition-all transform hover:scale-105 shadow-2xl shadow-gold-900/30"
          >
            Start a Discovery →
          </Link>
          <p className="text-slate-400 text-sm">No commitment to build. Evidence before a pitch.</p>
        </div>
      </div>

      {/* Trust indicators */}
      <div className="border-y border-forge-800 bg-forge-950/30">
        <div className="max-w-7xl mx-auto px-8 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <TrustStat value="11-stage" label="gated methodology, VDOS" />
          <TrustStat value="6" label="evidentiary ASQ instruments" />
          <TrustStat value="10+" label="disciplines, one network" />
          <TrustStat value="0" label="black-box recommendations" />
        </div>
      </div>

      {/* Global capability */}
      <div className="py-24">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-white mb-4">One network. Every discipline a serious business needs.</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Held natively inside one network of specialists across multiple countries — not
              stitched together from subcontractors after the sale.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {CAPABILITIES.map((c) => (
              <div key={c} className="bg-forge-900/40 border border-forge-700/50 rounded-xl px-5 py-4 text-slate-200 text-sm font-medium">
                {c}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FORGE Framework (analytical method) */}
      <div className="bg-forge-950/50 border-t border-forge-800 py-24">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">The FORGE Framework™</h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              The analytical method applied at every Discovery — run once in FORGE Lite,
              or eleven times, at depth, inside a full VDOS engagement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[
              { letter: 'F', title: 'Find Reality', desc: 'Uncover the true state of your business beneath the surface' },
              { letter: 'O', title: 'Observe Patterns', desc: 'Identify hidden patterns in revenue, customers & operations' },
              { letter: 'R', title: 'Reveal Opportunities', desc: 'Surface the highest-value, lowest-friction growth levers' },
              { letter: 'G', title: 'Generate Solutions', desc: 'Create specific, actionable, implementable strategies' },
              { letter: 'E', title: 'Execute & Evolve', desc: 'Phased roadmap with measurable milestones and KPIs' },
            ].map((step) => (
              <div key={step.letter} className="bg-forge-900/50 border border-forge-700 rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-gold-500 to-gold-700 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-black text-xl">{step.letter}</span>
                </div>
                <h3 className="text-white font-bold mb-2">{step.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Discover -> Forge -> Build -> Scale */}
      <div className="py-24">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Discover → Forge → Build → Scale</h2>
            <p className="text-slate-400 max-w-xl mx-auto">How that method turns into an engagement, end to end.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {PROCESS.map((p, i) => (
              <div key={p.step} className="relative">
                <div className="bg-forge-900/30 border border-forge-700/50 rounded-xl p-6 h-full">
                  <div className="text-gold-400 font-mono text-xs mb-3">{String(i).padStart(2, '0')}</div>
                  <h3 className="text-white font-bold mb-2">{p.step}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured projects */}
      <div className="bg-forge-950/50 border-t border-forge-800 py-24">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Proof, not portfolio filler</h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              Real, referenceable engagements run through this exact methodology.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PROJECTS.map((p) => (
              <div key={p.name} className="bg-forge-900/40 border border-forge-700/50 rounded-xl p-8">
                <h3 className="text-white font-bold text-xl mb-3">{p.name}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Bottom */}
      <div className="py-24 text-center">
        <div className="max-w-2xl mx-auto px-8">
          <h2 className="text-4xl font-black text-white mb-6">
            Start with evidence,
            <br />
            <span className="gold-gradient-text">not an estimate.</span>
          </h2>
          <p className="text-slate-400 mb-10">
            A Discovery doesn&apos;t commit you to a build. It tells you, with evidence, whether
            the thing you&apos;re about to spend money on is the right thing to spend money on.
          </p>
          <Link
            href="/contact"
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

function TrustStat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="text-2xl md:text-3xl font-black text-white">{value}</div>
      <div className="text-slate-400 text-xs mt-1">{label}</div>
    </div>
  )
}
