# 5. The FORGE Framework™

## This is already live — don't rename it

`lib/forge-prompt.ts` already ships this exact acronym in the prompt sent to Claude for every
FORGE Lite report:

> F – Find Reality: Uncover the true state of the business beneath the surface
> O – Observe Patterns: Identify hidden patterns in revenue, customers, and operations
> R – Reveal Opportunities: Surface the highest-value, lowest-friction growth opportunities
> G – Generate Solutions: Create specific, actionable, implementable strategies
> E – Execute & Evolve: Provide a phased roadmap with measurable outcomes

This document formalises that existing five-letter framework as the named IP asset it already
functions as, rather than replacing it with a generic phase list. Any external-facing
methodology page (`/methodology`) should describe **this**, verbatim in spirit, because it is
what a client's report is actually generated against — a marketing page that described a
different framework would be describing a product that doesn't exist.

## Where FORGE sits inside the bigger four-stage process

The company-level process is **Discover → Forge → Build → Scale**. FORGE (the acronym above)
is the analytical method applied *during* the Forge stage — it's how raw Discovery intake
(the client's answers, competitor data, market signals) gets synthesized into the Master
Blueprint. Concretely:

| Macro stage | What happens | FORGE letter(s) doing the work |
|---|---|---|
| **Discover** | Intake via `/discover` (VDOS) or `/discover-lite` (FORGE Lite); Stage 0 Assumption Destruction | F — Find Reality |
| **Forge** | Synthesis into the Master Blueprint | O, R, G — Observe Patterns, Reveal Opportunities, Generate Solutions |
| **Build** | Development scoped from the Blueprint | E (first half) — Execute |
| **Scale** | Retained optimisation against the Blueprint's KPIs | E (second half) — Evolve |

## Relationship to VDOS's 11 stages

For clients on the full VDOS tier, the same FORGE lens is applied with far more granularity
and persistence — each VDOS stage is a discrete, auditable record rather than one prompt call:

`Stage 0` Assumption Destruction → `Stage 1` Surface Idea → `Stage 2` Outcome Discovery →
`Stage 3` Emotional Driver → `Stage 4` Market Gap → `Stage 5` Capability Alignment →
`Stage 6` Opportunity Ranking → `Stage 7` Venture Thesis → `Stage 8` MVP Discovery →
`Stage 9` Category Creation → `Stage 10` Brand Discovery → `Stage 11` VOS Design — validated
throughout by the 6 ASQ (evidentiary) instruments (`lib/vdos/asq/asq1`–`asq6`).

Positioning line for sales/marketing use: **"FORGE Lite runs the FORGE Framework once. VDOS
runs it eleven times, at depth, with the evidence kept."** This gives the two-tier pricing
structure (see `08-business-model-revenue.md`) an honest, non-confusing story instead of two
unrelated-sounding products.

## Why this is a repeatable intellectual-property asset, not just "our process"

1. **It's named, letter-mapped, and trademarkable** — closer to a real methodology brand
   (like Bain's Net Promoter System) than "our approach," precisely because it's already
   embedded in the product's own generation logic, not just marketing copy layered on top.
2. **It's instrumented, not narrated.** Because VDOS persists every stage as a discrete
   record, a client can see, with timestamps, exactly when Find Reality happened and what it
   found — the framework is provable, not asserted.
3. **It compounds across engagements.** Every completed engagement (PrimeTurf,
   Ready & Rooted, and every one after) adds to a pattern library of what "Observe Patterns"
   and "Reveal Opportunities" actually surface across categories — an asset that gets more
   valuable with volume and cannot be replicated by a competitor copying the acronym alone.
4. **It's the natural upsell path.** FORGE Lite (one pass) and VDOS (eleven gated passes) are
   the same framework at two depths — a client can start light and upgrade without being
   sold a second, unrelated methodology.
5. **It protects margin.** Selling "we apply the FORGE Framework" is a defensible, separately
   priced line item (the Master Blueprint) in a way "we'll think about your business" never
   is — this is what lets Phase-1 clarity be billed distinctly from Phase-3 development.
