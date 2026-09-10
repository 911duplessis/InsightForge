# 8. Business Model

## Revenue streams

1. **Strategic consulting (Discovery)** — sold as its own line item, either as FORGE Lite
   (fixed-fee, single-pass) or a full VDOS engagement (fixed-fee per stage or per stage-block,
   given its 11-stage structure makes granular milestone billing natural).
2. **Master Blueprint reports** — the Phase 4 deliverable, priced separately from any
   development work, deliberately purchasable on its own — a client can walk away after the
   Blueprint and implement it themselves. This is the trust mechanism that makes the whole
   model credible: InsightForge doesn't need to bundle Build into Discovery to make Discovery
   worth buying.
3. **Development projects (Build)** — scoped directly from the Blueprint's roadmap, priced
   against milestones, only sold to clients who bought a Blueprint (in-house or elsewhere) —
   InsightForge does not take on undiscovered/unscoped build work.
4. **Monthly optimisation retainers (Scale)** — SEO, analytics, growth iteration, priced
   against the KPIs the Blueprint defined, renewable, cancellable with notice — never a
   locked-in annual contract, since the value has to be re-earned every month.
5. **Affiliate revenue** — disclosed commissions from the partner ecosystem
   (`07-partner-ecosystem-strategy.md`) — a real but secondary and fully transparent stream,
   never structured to influence which partner gets recommended.
6. **Partnership agreements** — co-delivery arrangements with other agencies/consultancies
   who lack InsightForge's technical bench, referring or white-labeling Build/Scale work.
7. **Equity participation** — offered selectively, for early-stage clients who can't afford
   full cash pricing, in exchange for reduced fees on Discovery/Build — governed by the same
   milestone-and-disclosure structure as cash engagements, never a substitute for a written
   scope.

## Pricing logic (not final numbers — the logic that should set them)

- **FORGE Lite** is priced to be an easy yes for a small/early-stage business — a single fixed
  fee, delivered fast, positioned as "cheaper and faster than doing nothing while you decide."
- **VDOS** is priced per stage-block (e.g., Stage 0 + Stages 1–3 as an initial block,
  remaining stages as a second block once the client has seen the first block's evidence) —
  this lets a client buy conviction incrementally instead of committing to the full 11-stage
  fee upfront before trusting the process.
- **Build** is priced against the Blueprint's own roadmap line items, never as an open-ended
  "time and materials" arrangement — each milestone has a fixed price agreed before work
  starts.
- **Scale retainers** are priced against a stated KPI band, with the option to step down or
  pause with notice — the retainer has to keep earning renewal, not rely on contract inertia.

## A model that protects both parties

- **Clear contracts.** Every engagement — Discovery, Build, or Scale — has a written scope
  before money changes hands. No verbal-agreement-then-invoice pattern.
- **Milestone payments.** Build-phase payments release against delivered, client-approved
  milestones, not a percentage-of-time schedule — protects the client from paying for
  in-progress work that stalls, and protects InsightForge from scope creep against a fixed
  total fee.
- **Transparent deliverables.** Every payment maps to a named artifact (a signed-off
  Blueprint, a merged and deployed milestone, a monthly optimisation report) — never a payment
  for "time spent."
- **Defined timelines.** Every engagement states an expected timeline at the point of scoping,
  with an explicit process for what happens if either party misses it (a defined grace period
  before renegotiation, not silent slippage).
- **No hidden fees.** Partner commissions, third-party tool costs, and any pass-through
  expense are itemised, not folded into a round-number "project fee."

## Guardrail against over-financialising this document

This is a services business with disclosed affiliate revenue and optional equity
participation — not a payment platform. Any future ledger/transparency mechanism
(`07-partner-ecosystem-strategy.md`) is for recording commitments and attestations, not for
moving client money; real payment processing stays with normal invoicing/payment-processor
rails, exactly as Connection-Network deliberately keeps `payouts.paid_at` as an attestation
rather than a real money movement.
