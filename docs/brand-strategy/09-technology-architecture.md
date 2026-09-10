# 9. Technology Architecture

## What's already running (don't re-recommend a different stack)

- **App:** Next.js (App Router), multi-tenant by `business_id` (`lib/tenant.ts`,
  `lib/db/scoped.ts`) — every record scoped so client businesses never see each other's data.
- **Data:** Supabase (Postgres), schema-migration-by-hand against `supabase/schema.sql` +
  `supabase/migrations/*` — same pattern as Connection-Network, no separate ORM query layer.
- **Auth:** signed JWT session cookies via `jose` (`lib/auth.ts`, `vdos_session` /
  `vdos_business` cookies), bcrypt-hashed consultant passwords, invite/admin-provisioned only
  (no public signup) — appropriate for a consulting practice where every login is a known
  consultant or a specific client business, not open registration.
- **AI:** Anthropic Claude (`lib/claude.ts`, currently `claude-opus-4-8` with adaptive
  thinking) powering both `buildForgePrompt` (FORGE Lite, one call) and the VDOS engine
  (`lib/vdos/engine.ts`, one call per stage). This is InsightForge's actual "AI strategy"
  product, not a hypothetical future integration — the brand's AI-strategy service line
  should point to this as a live reference implementation.
- **Rate limiting:** `lib/rateLimit.ts` — since every report generation is a paid Claude call,
  this is a cost-control surface as much as an abuse-prevention one; keep it in the loop for
  any new public-facing intake form (`/contact`).

## Recommended additions (net-new, to support the brand strategy above)

- **Client portal.** The existing `/engagements/[id]` and `/vdos-blueprint/[id]` views are the
  client portal — no separate product needed. What's missing is the marketing-site shell
  (`03-website-architecture.md`) that funnels a prospect into these routes; build that as
  Next.js route additions to this same app, not a separate codebase.
- **CRM.** For a boutique consulting practice, a full CRM is over-scoped before there's
  volume to justify it — start with a lightweight `leads` table (mirrors the `consultant`
  role/business-access pattern already in `lib/db/scoped.ts`) capturing `/contact` submissions
  and their FORGE Lite/VDOS routing decision, and revisit a dedicated CRM only once lead
  volume outgrows a simple table + email notification.
- **Project management.** Build-phase milestone tracking should live as structured data
  against each engagement (a `milestones` table keyed to `business_id`, mirroring
  Connection-Network's `payouts`/`ledger_entries` pattern) rather than an external PM tool —
  keeps milestone status visible inside the same client portal a client already logs into for
  their Blueprint.
- **Analytics dashboard.** For the Scale phase, surface GA4/Search Console data inside the
  client portal rather than sending clients to a separate dashboard — same principle as
  Connection-Network's admin overview panel: derive it server-side from data already owned,
  not a separately licensed BI tool, until volume justifies one.
- **AI integration.** Already the core product (Claude via `lib/claude.ts`). The one addition
  worth making as the practice grows: persist FORGE Lite's single Claude call as a resumable,
  stage-like record the way VDOS already does — reduces the gap between the two tiers and
  makes FORGE Lite auditable the same way VDOS is.
- **Secure document sharing.** Master Blueprint PDFs and any client-uploaded material should
  be stored in Supabase Storage with row-level security scoped by `business_id` — no separate
  document-sharing vendor needed; the multi-tenant boundary this app already enforces for
  database rows should extend to file storage the same way.
- **Smart contract possibilities.** See `07-partner-ecosystem-strategy.md` — the near-term,
  buildable version of this is a hash-chained ledger table (directly modeled on
  Connection-Network's `ledger_entries` / `append_ledger_entry()` / `verify_ledger_chain()`)
  recording Blueprint approvals, milestone sign-offs, and payment attestations. Explicitly
  not a blockchain or token system — same "not yet" boundary Connection-Network has already
  drawn, for the same reason (no liquidity/scale problem that justifies the complexity yet).

## Sequencing

Build the marketing-site shell and the `leads` intake table first (cheapest, unblocks the
brand launch) → extend document storage with per-business RLS before the first real client
Blueprint is delivered externally → add the milestones table alongside the first Build-phase
engagement that needs it → defer CRM/PM/BI tooling and the ledger mechanism until volume
across multiple simultaneous engagements makes the current ad-hoc tracking genuinely painful.
