import Link from 'next/link'

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
        <Link
          href="/command"
          className="text-slate-400 hover:text-white text-sm transition-colors"
        >
          Consultant Login →
        </Link>
      </nav>

      {/* Hero */}
      <div className="max-w-7xl mx-auto px-8 pt-20 pb-32 text-center">
        <div className="inline-flex items-center gap-2 bg-forge-800/50 border border-forge-700 rounded-full px-4 py-2 mb-8">
          <div className="w-2 h-2 bg-gold-400 rounded-full animate-pulse" />
          <span className="text-gold-300 text-sm font-medium">Powered by the FORGE Framework™</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight tracking-tight">
          Discover What Your
          <br />
          <span className="gold-gradient-text">Business Is Worth</span>
        </h1>

        <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed">
          Complete our 10-minute business discovery session and receive an executive-grade
          strategic blueprint — revealing hidden revenue, untapped opportunities, and
          your 90-day growth roadmap.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/discover"
            className="bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-white font-bold py-4 px-10 rounded-xl text-lg transition-all transform hover:scale-105 shadow-2xl shadow-gold-900/30"
          >
            Start Your Discovery Session →
          </Link>
          <p className="text-slate-400 text-sm">Free · 10 minutes · No commitment</p>
        </div>
      </div>

      {/* FORGE Framework */}
      <div className="bg-forge-950/50 border-t border-forge-800 py-24">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">The FORGE Framework™</h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              Our proprietary 5-stage business intelligence methodology used by top consulting firms
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

      {/* What you get */}
      <div className="py-24">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Your Strategic Blueprint Includes</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: '📊',
                title: 'Revenue Leak Analysis',
                desc: 'Identify exactly where money is walking out the door with specific, actionable fixes',
              },
              {
                icon: '🎯',
                title: 'Opportunity Matrix',
                desc: 'Ranked opportunities by revenue potential, difficulty, and time-to-value',
              },
              {
                icon: '📈',
                title: '90-Day Growth Roadmap',
                desc: 'Phased action plan with week-by-week milestones and accountability metrics',
              },
              {
                icon: '⚡',
                title: 'Quick Win Playbook',
                desc: '5+ immediate actions you can take this week to start generating results',
              },
              {
                icon: '🔍',
                title: 'SWOT Analysis',
                desc: 'Deep competitive intelligence and market positioning recommendations',
              },
              {
                icon: '📋',
                title: 'KPI Dashboard',
                desc: 'Measurable targets across revenue, growth, and operational efficiency',
              },
            ].map((item) => (
              <div key={item.title} className="bg-forge-900/30 border border-forge-700/50 rounded-xl p-6">
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="text-white font-bold mb-2">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Bottom */}
      <div className="py-24 text-center">
        <div className="max-w-2xl mx-auto px-8">
          <h2 className="text-4xl font-black text-white mb-6">
            Ready to Forge Your
            <br />
            <span className="gold-gradient-text">Business Breakthrough?</span>
          </h2>
          <Link
            href="/discover"
            className="inline-block bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-white font-bold py-4 px-10 rounded-xl text-lg transition-all transform hover:scale-105 shadow-2xl shadow-gold-900/30"
          >
            Begin Your Discovery Session →
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-forge-800 py-8 text-center">
        <p className="text-slate-500 text-sm">
          © {new Date().getFullYear()} InsightForge Discover™. All rights reserved.
        </p>
      </footer>
    </div>
  )
}
