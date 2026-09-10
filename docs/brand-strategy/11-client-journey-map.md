# 11. Client Journey Map

| Stage | Client experience | System touchpoint | What proves value at this stage |
|---|---|---|---|
| **0. Discovery of InsightForge** | Finds the site via referral, search, or partner mention | Marketing site (`03-website-architecture.md`) | The FORGE Framework is named and explained, not just "we do strategy" |
| **1. Qualification** | Fills a short public intake | `/contact` (new, short form) | Routed transparently to FORGE Lite or VDOS based on stated complexity/budget — no bait-and-switch upsell |
| **2. Discovery intake** | Answers the full instrument (`06-client-intake-questionnaire.md`) | `/discover` (VDOS) or `/discover-lite` (FORGE Lite) | Rate-limited, paid, timeboxed — signals this is a real diagnostic, not a sales call |
| **3. Assumption Destruction** | Sees their own stated assumptions challenged with evidence | VDOS Stage 0 / FORGE prompt's "Find Reality" pass | The first moment a client realises this isn't a template report — something specific to their business came back |
| **4. Master Blueprint delivery** | Receives Findings → Evidence → Recommendation → Investment → Timeline | `/blueprint/[sessionId]` or `/vdos-blueprint/[id]` | Every recommendation cites its evidence; client could hand this to a different vendor and it would still be actionable |
| **5. Decision point** | Client chooses: implement Blueprint elsewhere, or proceed to Build | Sales conversation, milestone contract | InsightForge doesn't penalise walking away here — the fact that a client *can* leave with something usable is the trust signal |
| **6. Build** | Milestone-based development kicks off | New `milestones` tracking (see `09-technology-architecture.md`) | Payments tied to delivered, approved milestones — no invoice without a corresponding artifact |
| **7. Launch** | Deliverable goes live | Deployment (client's own infra or InsightForge-managed) | Handoff includes the Blueprint's original KPIs, so success is measured against what was promised, not redefined post-hoc |
| **8. Scale (retainer)** | Ongoing SEO/analytics/growth work | Client portal analytics view (see `09-technology-architecture.md`) | Monthly reporting ties back explicitly to the Blueprint's stated goals — "did this work" stays answerable in the client's own terms |
| **9. Continuous Evolution** | Re-Discovery triggered at a cadence matched to category velocity | Re-entry into `/discover` or a lighter re-check flow | The relationship doesn't end at "we shipped it" — it's structured to catch when the original Blueprint has gone stale |

## Two moments that matter more than the rest

- **Stage 5 (Decision point)** is deliberately a real fork, not a formality — a client who
  leaves after the Blueprint with something they can act on elsewhere is proof the Discovery
  product has standalone value, which is what makes buying it in the first place rational.
- **Stage 9 (Continuous Evolution)** is the stage most agencies skip entirely, because most
  agency relationships are structured to end at delivery. Making re-Discovery a scheduled,
  expected part of the journey — not an upsell pitch — is what turns Scale-phase clients into
  multi-year relationships instead of one-off projects.
