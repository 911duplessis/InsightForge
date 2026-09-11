import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'The Team | InsightForge™',
  description:
    'The people behind InsightForge — real qualifications, real skills, real portfolio. No invented credentials, no titles ahead of what\'s actually agreed.',
  openGraph: {
    title: 'The Team | InsightForge™',
    description: 'Real qualifications, real skills, real portfolio.',
    type: 'website',
  },
}

const STIAAN_EXPERTISE = [
  'Strategic business architecture', 'Venture development', 'Business intelligence',
  'Digital transformation', 'SEO & digital growth', 'Technology strategy',
  'Capital allocation', 'Trading & risk frameworks', 'Behavioural performance',
  'NLP', 'Timeline Therapy', 'Hypnotherapy', 'Executive & performance coaching',
]

const STIAAN_VENTURES = [
  {
    name: 'LMGI / TCN — The Connection Network',
    url: 'https://connection-network.vercel.app',
    desc: 'Originated as LMGI (Let Me Get It), built around connecting needs with the people capable of fulfilling them. Evolved into TCN: referral economics, vendor networks, digital identity, and a trust-record ledger — designed to make relationships themselves productive infrastructure, deliberately structured differently from a conventional MLM model.',
  },
  {
    name: 'InsightForge',
    desc: 'The strategic side of this work: turning fragmented business information into structured decisions via the VDOS (Discovery → Validation → Opportunity → Strategy) and Venture Blueprint methodologies referenced throughout this site.',
  },
  {
    name: 'PrimeTurf',
    url: 'https://www.primeturf.co.za',
    desc: 'Go-to-market rebuild and post-migration SEO recovery — the case study detailed on the Projects page.',
  },
  {
    name: 'Proteus Sports Group',
    desc: 'One of the network projects referenced on the Projects page.',
  },
]

const STIAAN_ACCOMPLISHMENTS = [
  'South African pole-vault champion, competing at national level in athletics during the late 1990s and early 2000s, including Victor Ludorum recognition.',
]

const VINEET_SKILLS = [
  'React', 'Next.js', 'JavaScript / TypeScript', 'Node.js / backend development',
  'PostgreSQL', 'Supabase', 'REST / API integrations', 'Authentication & authorisation',
  'Row Level Security (RLS)', 'Vercel deployment', 'Cloud application architecture',
  'Database design & management', 'Third-party service integrations',
  'Business workflow automation', 'Responsive web application development',
]

const VINEET_PORTFOLIO = [
  {
    name: 'TCN — The Connection Network',
    url: 'https://connection-network.vercel.app',
    desc: 'Connector and vendor workflows, referral tracking, commission logic, authentication, admin functionality, and the platform\'s Trust Record — a hash-chained, publicly verifiable audit trail around referrals and transactions, on Supabase/PostgreSQL with Row Level Security.',
  },
  {
    name: 'InsightForge',
    desc: 'Development environment supporting the platform\'s discovery workflows, structured business data, strategic assessment systems, database architecture, authentication, and AI-enabled integrations.',
  },
  {
    name: 'AME Bible College Portal',
    url: 'https://amest.org',
    desc: 'Institutional administration and academic workflow platform — user roles, data management, and backend infrastructure for a working MVP, not just an informational site.',
  },
  {
    name: 'PrimeTurf',
    desc: 'Development support within PrimeTurf\'s broader technology work, where web development and infrastructure intersect with its digital growth strategy.',
  },
  {
    name: 'Estia / EZPay2Attend',
    desc: 'Previous commercial full-stack development work. Included here for completeness — we\'re not publishing specific technical claims about this system until we have project documentation or a live public reference.',
  },
]

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-forge-950 via-forge-900 to-forge-800">
      <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-gold-400 to-gold-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">IF</span>
          </div>
          <span className="text-white font-bold text-xl tracking-tight">InsightForge</span>
        </Link>
        <div className="flex items-center gap-6">
          <Link href="/about" className="text-slate-400 hover:text-white text-sm transition-colors">About</Link>
          <Link href="/team" className="text-white text-sm font-medium">Team</Link>
          <Link href="/process" className="text-slate-400 hover:text-white text-sm transition-colors">Process</Link>
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
          <span className="text-gold-300 text-sm font-medium">Real People, Real Track Record</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight tracking-tight">
          Who&apos;s actually
          <br />
          <span className="gold-gradient-text">doing the work.</span>
        </h1>
        <p className="text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
          Skills, portfolio, and what&apos;s been delivered — not a stock-photo team page.
          Where something isn&apos;t independently verified yet, we say so instead of
          rounding it up.
        </p>
      </div>

      {/* Stiaan */}
      <div className="py-16">
        <div className="max-w-4xl mx-auto px-8">
          <div className="bg-forge-900/40 border border-forge-700/50 rounded-2xl p-8">
            <h2 className="text-white font-bold text-2xl mb-1">Stiaan du Plessis</h2>
            <p className="text-gold-300/80 text-xs uppercase tracking-wide font-semibold mb-6">
              Strategic Behavioral Architect & Capital Systems Strategist
            </p>
            <p className="text-slate-300 text-sm leading-relaxed mb-4">
              Stiaan du Plessis works at the intersection of business, technology, human
              behaviour, and capital. He specialises in connecting the dots between complex
              problems, people, opportunities, and systems — transforming fragmented
              information into clear strategy and executable business architecture.
            </p>
            <p className="text-slate-300 text-sm leading-relaxed mb-6">
              As the architect behind initiatives including LMGI / The Connection Network and
              InsightForge, he combines strategic thinking with practical execution, working
              alongside technical specialists and business partners to turn ideas into
              functioning systems. His philosophy: structure before scale, data before
              emotion, and preservation before growth. He doesn&apos;t simply ask what should
              be built — he asks why it should exist, who it should serve, how it should
              create value, and what system is required to make it work.
            </p>

            <h3 className="text-white font-bold text-sm uppercase tracking-wide mb-3">Areas of Expertise</h3>
            <div className="flex flex-wrap gap-2 mb-8">
              {STIAAN_EXPERTISE.map((s) => (
                <span key={s} className="bg-forge-800/60 border border-forge-700/50 rounded-full px-3 py-1.5 text-slate-300 text-xs">
                  {s}
                </span>
              ))}
            </div>

            <h3 className="text-white font-bold text-sm uppercase tracking-wide mb-3">Ventures Architected</h3>
            <div className="flex flex-col gap-4 mb-8">
              {STIAAN_VENTURES.map((v) => (
                <div key={v.name} className="border-l-2 border-gold-500/40 pl-4">
                  <h4 className="text-white font-semibold text-sm mb-1">
                    {v.url ? (
                      <a href={v.url} target="_blank" rel="noopener noreferrer" className="hover:text-gold-300 transition-colors">
                        {v.name} ↗
                      </a>
                    ) : (
                      v.name
                    )}
                  </h4>
                  <p className="text-slate-400 text-sm leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>

            <h3 className="text-white font-bold text-sm uppercase tracking-wide mb-3">Accomplishments</h3>
            <ul className="flex flex-col gap-2">
              {STIAAN_ACCOMPLISHMENTS.map((a) => (
                <li key={a} className="flex items-start gap-3 text-slate-400 text-sm leading-relaxed">
                  <span className="text-gold-400 mt-1">—</span>
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Vineet */}
      <div className="border-y border-forge-800 bg-forge-950/40 py-20">
        <div className="max-w-4xl mx-auto px-8">
          <div className="bg-forge-900/40 border border-forge-700/50 rounded-2xl p-8">
            <h2 className="text-white font-bold text-2xl mb-1">Vineet Dubey</h2>
            <p className="text-gold-300/80 text-xs uppercase tracking-wide font-semibold mb-6">
              Full-Stack Developer & Technical Development Partner
            </p>
            <p className="text-slate-300 text-sm leading-relaxed mb-6">
              Vineet is an independent full-stack developer working across modern web
              applications, business systems, databases, APIs, and cloud deployment. His role
              is turning strategic concepts into functional technology — architecture, build,
              service integration, and deployment — for early-stage businesses where the
              technology needs to evolve alongside the business model.
            </p>

            <h3 className="text-white font-bold text-sm uppercase tracking-wide mb-3">Core Skills</h3>
            <div className="flex flex-wrap gap-2 mb-8">
              {VINEET_SKILLS.map((s) => (
                <span key={s} className="bg-forge-800/60 border border-forge-700/50 rounded-full px-3 py-1.5 text-slate-300 text-xs">
                  {s}
                </span>
              ))}
            </div>

            <h3 className="text-white font-bold text-sm uppercase tracking-wide mb-3">Portfolio</h3>
            <div className="flex flex-col gap-4 mb-8">
              {VINEET_PORTFOLIO.map((p) => (
                <div key={p.name} className="border-l-2 border-gold-500/40 pl-4">
                  <h4 className="text-white font-semibold text-sm mb-1">
                    {p.url ? (
                      <a href={p.url} target="_blank" rel="noopener noreferrer" className="hover:text-gold-300 transition-colors">
                        {p.name} ↗
                      </a>
                    ) : (
                      p.name
                    )}
                  </h4>
                  <p className="text-slate-400 text-sm leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>

            <h3 className="text-white font-bold text-sm uppercase tracking-wide mb-3">Qualifications & Education</h3>
            <p className="text-slate-500 text-xs leading-relaxed mb-6">
              Not yet independently verified — we&apos;d rather state that plainly than list
              something we haven&apos;t checked.
            </p>

            <h3 className="text-white font-bold text-sm uppercase tracking-wide mb-3">Development Philosophy</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Concept → Architecture → Database → Application → API → Authentication →
              Deployment → Iteration. Software gets built as a functional foundation, tested
              in the real world, then progressively strengthened — not treated as a finished
              product on day one.
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="py-24 text-center">
        <div className="max-w-2xl mx-auto px-8">
          <h2 className="text-4xl font-black text-white mb-6">
            Want to know who&apos;d actually
            <br />
            <span className="gold-gradient-text">work on your engagement?</span>
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
