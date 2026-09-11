# 7. Affiliate Partner Ecosystem

## Principles (non-negotiable)

1. **Only verified providers.** A partner is added because InsightForge has actually used
   them on a real engagement and would recommend them with no commission attached — the
   commission, where one exists, is a bonus on top of a recommendation already made on merit,
   never the reason for the recommendation.
2. **Transparent recommendations.** Every partner listing states, in plain language, whether
   InsightForge earns anything from a client choosing them, and roughly how much (a
   percentage range, not an exact confidential figure) — this is the single detail most
   agencies hide and the one InsightForge should lead with.
3. **No hidden commissions.** No affiliate relationship is disclosed only in fine print or a
   footer; it is stated on the same page/screen as the recommendation itself.
4. **Client-first decisions.** If the best tool for a client is a non-partner, that's what
   gets recommended — being a partner earns a provider visibility, not a guaranteed
   recommendation.
5. **Long-term relationships.** Partners are re-evaluated annually against actual client
   outcomes (uptime, support responsiveness, pricing drift), not locked in by contract terms
   that outlast their quality.

## Categories

| Category | Role in a typical engagement |
|---|---|
| **Hosting** | Where Build-phase deliverables (websites, apps) are deployed |
| **Cloud** | Infrastructure for AI systems, automation, and client portals (this platform runs on Supabase — a natural first-party reference point, not just a partner) |
| **Cybersecurity** | Security review, monitoring, and incident response for anything InsightForge builds or connects to client systems |
| **Hardware** | Networking/on-prem hardware recommendations for clients whose engagement includes physical infrastructure |
| **Software** | Line-of-business tools recommended during Scale (CRM, project management, analytics) |
| **AI tools** | Model providers and AI infrastructure used inside client-facing automation (Claude/Anthropic as the primary reference implementation already powering FORGE Lite/VDOS) |
| **Marketing platforms** | Paid channels, SEO tooling, analytics stacks recommended during the Growth phase |
| **Payment solutions** | Payment processing for clients whose Build phase includes commerce or billing |

Each category needs a minimum of two verified providers before it appears on `/partners`
publicly — a category with only one option reads as an exclusive kickback arrangement even
when it isn't one.

## How smart-contract-style transparency protects the model

This is a **future-facing mechanism**, not something built today — flag it as such wherever
it's referenced externally. The idea, adapted from blockchain-style transparency rather than
literal cryptocurrency infrastructure, is a tamper-evident, independently verifiable record of
commercial commitments. This repo's `Connection-Network` project already implements the
closest working analogue — a hash-chained, publicly verifiable ledger (`ledger_entries`,
`append_ledger_entry()`, `verify_ledger_chain()`) recording every trust-relevant event with a
recomputable hash chain. The same pattern, applied to InsightForge's partner ecosystem, would
protect:

- **Partner agreements** — the commission terms themselves recorded as a ledger entry at the
  time the partnership is agreed, so "no hidden commissions" is provable after the fact, not
  just promised.
- **Milestones** — Build-phase milestone definitions and their agreed payment triggers
  recorded before work starts, so neither party can quietly redefine "done" mid-engagement.
- **Payments** — a record of what was actually paid and when (mirroring
  Connection-Network's `payouts.paid_at` pattern: an attestation event, not a live payment
  rail), so a partner or client can verify the payment history independent of either party's
  word.
- **Ownership** — IP and deliverable ownership transfer points (e.g., "client owns the
  codebase once milestone 3 is paid") recorded as an immutable, timestamped event.
- **Deliverables** — a hash of each delivered artifact (a Blueprint PDF, a codebase snapshot)
  recorded at delivery time, so "this is the exact version you approved" is independently
  checkable later.

**Explicitly not recommended yet:** real smart contracts, escrow, or a crypto payment layer —
same "not yet" boundary Connection-Network has already drawn around its own ledger. The value
here is the *tamper-evident record*, not a blockchain for its own sake; a hash-chained
Postgres table (as already proven out in Connection-Network) delivers the same trust property
without the complexity, cost, or regulatory surface of an actual token or smart-contract
platform.
