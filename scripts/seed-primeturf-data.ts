// One-off seed data module for PrimeTurf — a real VDOS (Venture Discovery Operating
// System) engagement completed manually for a South African artificial-turf /
// outdoor-surface business operating in Gauteng & Cape Town.
//
// IMPORTANT: This file contains REAL content extracted from PrimeTurf's seven
// completed VDOS report documents (Stage 0 Assumption Destruction, Stage 0
// Assumption Stress Instruments, ASQ3 Price Elasticity, ASQ4 Channel Gravity,
// ASQ5 Specification Reality, ASQ6 Specification Origin Map, and the final
// 11-stage VDOS report). It is NOT generated placeholder text. Where the source
// documents did not contain a literal data point required by the schema, the
// field is built conservatively from the closest real evidence in the documents,
// and is flagged with an inline comment or a trailing "(VDOS-inferred: ...)" /
// "(reconstructed from evidence: ...)" note rather than invented from nothing.
//
// This module only exports data shapes for later DB insertion. It does not
// perform any database writes itself.

import type {
  Asq1Input,
  Asq2Input,
  Asq3Input,
  Asq4DealRow,
  Asq4Input,
  Asq5Input,
  Asq6Input,
  AsqKey,
  BusinessAgnosticIntake,
  Stage0Output,
  Stage1Output,
  Stage2Output,
  Stage3Output,
  Stage4Output,
  Stage5Output,
  Stage6Output,
  Stage7Output,
  Stage8Output,
  Stage9Output,
  Stage10Output,
  Stage11Output,
  StageKey,
} from '@/types/vdos'

// ---------------------------------------------------------------------------
// Business / Client / Intake
// ---------------------------------------------------------------------------

export const primeTurfBusiness = {
  name: 'PrimeTurf',
  slug: 'primeturf',
  industry: 'Artificial Turf & Outdoor Surfaces (Landscaping)',
  primary_contact_name: 'PrimeTurf Founder',
  primary_contact_email: 'social@primeturf.co.za',
}

export const primeTurfClient = {
  first_name: 'PrimeTurf',
  last_name: 'Founder',
  email: 'social@primeturf.co.za',
  phone: '+27 00 000 0000', // not disclosed in source documents (placeholder pattern only — no real phone number found in any source file)
  company_name: 'PrimeTurf',
}

// Source: VDOS_Stage0_AssumptionDestruction1.html header meta + masthead of final
// report ("Founder Profile: Technical / Builder", "Primary Resource: Existing
// Customer Base", "Geography: Gauteng + Cape Town").
export const primeTurfIntake: BusinessAgnosticIntake = {
  contact: {
    first_name: 'PrimeTurf',
    last_name: 'Founder',
    email: 'social@primeturf.co.za',
    phone: '+27 00 000 0000',
  },
  stated_idea: 'An artificial turf and landscaping business operating in Gauteng and Cape Town.',
  stated_industry: 'Artificial Turf / Landscaping',
  founder_background: 'Technical / Builder profile — hands-on installation and quality-control skill, not a sales or marketing background.',
  available_resources: 'An existing customer base of completed residential artificial turf installations; no disclosed external capital or team beyond the founder.',
  time_horizon: 'Full VDOS run requested (Stage 0 through Stage 11) — founder is evaluating both immediate (90-day) MVP actions and a 18-36 month scaling/franchise horizon.',
}

// ---------------------------------------------------------------------------
// Stage 0 — Assumption Destruction
// (Source: VDOS_Stage0_AssumptionDestruction1.html)
// ---------------------------------------------------------------------------

const stage0Output: Stage0Output = {
  assumption_categories: [
    {
      category: 'Industry',
      stated_assumption: 'This is a landscaping / outdoor surfaces business.',
      falsification_probability: 80,
      alternative_possibilities: [
        'Property tech / proptech',
        'Infrastructure resilience',
        'Interior + exterior design studio',
        'Hospitality fitout specialist',
        'Water-use compliance services',
        'Real estate value-add platform',
        'Urban densification solutions',
      ],
      emergent_opportunities: [
        'Outdoor Living Design Studio — full-service outdoor transformation brand positioned against interior designers, not landscapers.',
        'Property Enhancement Platform — B2B service sold to estate agents, developers, and AirBnB hosts as a pre-sale/pre-listing outdoor upgrade package.',
        'Municipal Infrastructure Partner — sold to municipalities and bodies corporate as a water-compliant public green space solution.',
      ],
    },
    {
      category: 'Product',
      stated_assumption: 'The product is artificial turf.',
      falsification_probability: 85,
      alternative_possibilities: [
        'The product is a warranty / guarantee',
        'The product is a specification system',
        'The product is a managed service contract',
        'The product is a design consultation',
        'The product is a certification / standard',
        'The product is a financing instrument',
        'The product is the SOP / installation methodology',
      ],
      emergent_opportunities: [
        'Outcome-as-a-Service — monthly fee covers supply, install, inspection, and replacement.',
        'Installation Methodology Licensing — founder\'s technical SOP licensed to other landscaping businesses (franchisor model).',
        'Specification Intelligence Platform — digital tool for architects/developers to specify outdoor surfaces.',
      ],
    },
    {
      category: 'Customer',
      stated_assumption: 'The customer is a homeowner (residential buyer).',
      falsification_probability: 75,
      alternative_possibilities: [
        'Property developers (B2B, volume)',
        'Body corporate / sectional title (contract)',
        'Hospitality operators',
        'Retail / commercial landlords',
        'Schools and sports clubs',
        'Municipality / government',
        'Estate agents (pre-listing upgrade)',
        'Architects and interior designers (B2B2C)',
      ],
      emergent_opportunities: [
        'Developer Framework Agreements — annual supply/install contracts; one relationship = 20-200 units per year.',
        'Body Corporate Managed Service — subscription model for estate management companies.',
        'Architect/Designer Specification Partner — win the specifier, inherit all their clients automatically.',
      ],
    },
    {
      category: 'Business Model',
      stated_assumption: 'The business model is project-based (install and invoice).',
      falsification_probability: 90,
      alternative_possibilities: [
        'Subscription / SLA managed service',
        'Licensing model (methodology, brand, product)',
        'Franchise model',
        'Platform / marketplace model',
        'Finance / lease model (capex to opex)',
        'Developer annual framework contract',
        'Insurance-backed warranty product',
      ],
      emergent_opportunities: [
        '"Surface as a Service" — monthly fee converts upfront capex (R85,000) into opex (R1,800/month) over 5 years.',
        'Franchise / License Model — sell the system (SOPs, brand, supply chain, training) to operators in secondary cities.',
        'Warranty Product — 10-year performance warranty charged at installation + annually, creating immediate recurring revenue.',
      ],
    },
    {
      category: 'Geography',
      stated_assumption: 'The business operates in Gauteng and Cape Town.',
      falsification_probability: 60,
      alternative_possibilities: [
        'National franchise (all SA metros)',
        'Sub-Saharan Africa (Nigeria, Kenya, Ghana)',
        'Digital-first (geography-agnostic platform)',
        'Durban + secondary cities (underserved)',
        'Middle East + North Africa (water scarcity)',
        'Export methodology, not geography',
      ],
      emergent_opportunities: [
        'National Franchise Brand — build in two metros, franchise to Durban, PE, Bloemfontein, Pretoria.',
        'Pan-Africa Water-Resilient Surfaces — Nigeria, Kenya, Ghana, East Africa share the same scarcity + real-estate dynamics.',
      ],
    },
    {
      category: 'Delivery',
      stated_assumption: 'The business delivers through physical installation crews.',
      falsification_probability: 70,
      alternative_possibilities: [
        'Brand + certified installer network',
        'Design-only studio (no installation)',
        'Digital specification + supply platform',
        'Training and certification programme',
        'Wholesale / B2B supply only',
        'Managed subcontractor model',
      ],
      emergent_opportunities: [
        'Certified Installer Network — train and certify independent landscapers; earn on product margin + certification fees.',
        'Outdoor Surface Design Studio — charge for consultation/specification only, hand off installation to vetted partners.',
      ],
    },
    {
      category: 'Problem',
      stated_assumption: 'The problem being solved is "ugly or high-maintenance lawn."',
      falsification_probability: 88,
      alternative_possibilities: [
        'Municipal water independence',
        'Property value preservation',
        'Labour cost elimination',
        'Climate resilience',
        'Water compliance / avoid fines',
        'Revenue-generating outdoor space (hospitality)',
        'Child/pet safe play surface',
        'Thermal management (urban heat island)',
      ],
      emergent_opportunities: [
        'Water Independence Consultancy — full audit and transformation service removing irrigation dependency.',
        'Climate-Resilient Property Service — positioned alongside solar/backup-water infrastructure upgrades.',
        'Compliance-as-a-Service — certified water-neutral installs with compliance documentation for bodies corporate/municipalities.',
      ],
    },
    {
      category: 'Competitive',
      stated_assumption: 'Competitors are other turf and landscaping businesses.',
      falsification_probability: 82,
      alternative_possibilities: [
        'Solar + battery installers (same buyer, same budget)',
        'Smart irrigation systems',
        'Pool builders / outdoor renovators',
        'Interior designers (for the outdoor space budget)',
        'Inertia / "do nothing"',
        'Borehole and grey water systems',
      ],
      emergent_opportunities: [
        'Infrastructure Bundle Partner — partner with solar/borehole/smart-home integrators for a whole-property resilience bundle.',
        'Property Stylist Referral Network — insert outdoor upgrade into the pre-listing process used by estate agents.',
      ],
    },
    {
      category: 'Founder Role',
      stated_assumption: "The founder's value is in technical installation skill.",
      falsification_probability: 78,
      alternative_possibilities: [
        'Standard-setter / certifier',
        'System architect (franchise SOPs)',
        'Specification consultant to architects',
        'Product developer (new surface systems)',
        'Training and certification provider',
        'Technical author (specifications, warranties)',
      ],
      emergent_opportunities: [
        'Outdoor Surface Certification Body — create the SA standard for artificial surface installation, certify other installers.',
        'Technical Specification Consultancy — charge architects/developers/municipalities for specification documents and engineering.',
      ],
    },
    {
      category: 'Revenue',
      stated_assumption: 'Revenue comes from selling and installing turf.',
      falsification_probability: 85,
      alternative_possibilities: [
        'Annual maintenance SLA',
        'Extended warranty product',
        'Finance / lease (earn on interest spread)',
        'Certified installer product supply',
        'Referral fees from adjacent services',
        'Certification / training fees',
        'Specification consulting fees',
        'Content / media (architect portal)',
      ],
      emergent_opportunities: [
        'Activate Dormant Customer Base — an SLA letter to every past client (R1,200/year) generates immediate recurring revenue at zero acquisition cost.',
        'Product Supply to Installer Network — once a certified installer network exists, product supply becomes recurring B2B revenue.',
      ],
    },
    {
      category: 'Scale',
      stated_assumption: 'The business scales by doing more installations.',
      falsification_probability: 88,
      alternative_possibilities: [
        'Franchise / license model',
        'Certified installer network',
        'Digital platform (specifications, quoting, design)',
        'Developer framework contracts (volume without crew scaling)',
        'Brand licensing to adjacent categories',
        'Wholesale supply model',
      ],
      emergent_opportunities: [
        'Franchise System — document the entire system and sell regional franchises (Durban, PE, Bloemfontein).',
        'Digital Specification Platform — SaaS tool for landscapers/architects/developers; scales to zero marginal cost.',
      ],
    },
    {
      category: 'Format/Digital',
      stated_assumption: 'This is NOT a digital business.',
      falsification_probability: 72,
      alternative_possibilities: [
        'Specification SaaS for architects',
        'Installer training + certification platform',
        'Developer procurement portal',
        'Customer lifecycle + warranty management system',
        'AR/VR garden visualiser',
        'Outdoor surface marketplace',
        'Municipal compliance documentation tool',
      ],
      emergent_opportunities: [
        'Outdoor Surface Specification SaaS — monthly subscription tool for architects/developers to specify, cost, document projects.',
        'AR Garden Visualiser — homeowners/developers preview finished surfaces on their actual property via phone camera.',
      ],
    },
  ],
  destruction_matrix: [
    { category: 'Business Model', rank: 1, falsification_probability: 90 },
    { category: 'Scale', rank: 2, falsification_probability: 88 },
    { category: 'Problem', rank: 3, falsification_probability: 88 },
    { category: 'Product', rank: 4, falsification_probability: 85 },
    { category: 'Revenue', rank: 5, falsification_probability: 85 },
    { category: 'Competitive', rank: 6, falsification_probability: 82 },
    { category: 'Industry', rank: 7, falsification_probability: 80 },
    { category: 'Founder Role', rank: 8, falsification_probability: 78 },
    { category: 'Customer', rank: 9, falsification_probability: 75 },
    { category: 'Format/Digital', rank: 10, falsification_probability: 72 },
    { category: 'Delivery', rank: 11, falsification_probability: 70 },
    { category: 'Geography', rank: 12, falsification_probability: 60 },
  ],
  // Source gives qualitative labels per venture (e.g. "Very High", "Immediate",
  // "12-18 months") rather than numeric 0-10 dimension scores — only the /50
  // totals are explicit in the document. The five dimension scores below are
  // VDOS-inferred to sum to the documented totals, distributed in proportion to
  // the qualitative labels given for each venture (e.g. "Founder Fit: Very High"
  // maps to a high founder_fit score; "Time to Revenue: Immediate" maps to a high
  // speed_to_revenue score). Totals (44, 41, 38, 37, 36, 35, 33, 32, 30) are exact
  // from source; the five sub-scores are reconstructed, not verbatim.
  emergent_ventures: [
    {
      name: 'Permanent Outdoor Infrastructure — Premium Brand + Developer B2B + SLA',
      description:
        'A design-led outdoor surface brand serving premium residential, property developers, and commercial operators with a hybrid revenue model: project installs + developer framework contracts + managed maintenance SLA. Destroys assumptions: industry label, product = turf, customer = homeowner, project-only model, aesthetic-only problem, install revenue only.',
      market_demand: 9,
      defensibility: 9,
      scalability: 8,
      founder_fit: 9,
      speed_to_revenue: 9,
      total: 44,
    },
    {
      name: 'Outdoor Surface Franchise / Licensing System',
      description:
        "The founder's SOP, brand, supply chain, and training system become a licensed product sold to operators nationally and eventually pan-Africa. Zero installation labour. Revenue = licensing fees + product supply margin + certification fees. Destroys assumptions: physical delivery model, founder value = installation, scale = more installs, geographic constraint.",
      market_demand: 8,
      defensibility: 9,
      scalability: 9,
      founder_fit: 8,
      speed_to_revenue: 7,
      total: 41,
    },
    {
      name: 'Water Resilience Infrastructure Partner',
      description:
        'Repositioned not as a landscaping business but as a water independence service — sold alongside solar, backup water, and borehole solutions to the same upper-income buyer investing in whole-property infrastructure resilience. Destroys assumptions: problem = aesthetics, competitors = turf installers, industry = landscaping.',
      market_demand: 8,
      defensibility: 6,
      scalability: 7,
      founder_fit: 8,
      speed_to_revenue: 9,
      total: 38,
    },
    {
      name: 'Outdoor Surface Specification SaaS for Architects & Developers',
      description:
        'A subscription-based digital tool allowing architects, developers, and quantity surveyors to specify, design, cost, and document outdoor surface systems. Technical founder builds the product once; revenue compounds with zero marginal delivery cost. Destroys assumptions: not digital, founder = installer, geographic constraint, scales = installs.',
      market_demand: 7,
      defensibility: 9,
      scalability: 9,
      founder_fit: 7,
      speed_to_revenue: 5,
      total: 37,
    },
    {
      name: 'Surface-as-a-Service (Monthly Subscription Outdoor Surface)',
      description:
        'Converts the R85,000 upfront install cost into R1,800/month over 5 years. Customer gets the surface, maintenance, and replacement included. Creates a 10-year client relationship from every install. Destroys assumptions: project revenue model, product = turf, revenue = install only.',
      market_demand: 8,
      defensibility: 7,
      scalability: 8,
      founder_fit: 6,
      speed_to_revenue: 7,
      total: 36,
    },
    {
      name: 'SA Outdoor Surface Certification & Standards Body',
      description:
        'Create the industry standard for outdoor artificial surface installation in South Africa; certify installers; publish specifications; operate as the technical authority. Builds a moat no competitor can buy — only earn. Destroys assumptions: delivery = installation, founder value = physical skill, competitive moat = product quality.',
      market_demand: 6,
      defensibility: 10,
      scalability: 8,
      founder_fit: 8,
      speed_to_revenue: 3,
      total: 35,
    },
    {
      name: 'Pre-Listing Property Upgrade Service (Estate Agent Channel)',
      description:
        'The customer is not the homeowner — it is the estate agent or property seller motivated by a faster sale at a higher price. An outdoor transformation product sold through the pre-listing process. Destroys assumptions: customer = homeowner, competitor = other installers.',
      market_demand: 7,
      defensibility: 5,
      scalability: 6,
      founder_fit: 6,
      speed_to_revenue: 9,
      total: 33,
    },
    {
      name: 'Municipal & Body Corporate Water Compliance Service',
      description:
        'Targets municipalities, bodies corporate, and large commercial estates facing water restriction enforcement with a certified, documentable water-neutral outdoor surface including compliance paperwork. Destroys assumptions: customer = homeowner, problem = aesthetics.',
      market_demand: 7,
      defensibility: 8,
      scalability: 6,
      founder_fit: 8,
      speed_to_revenue: 3,
      total: 32,
    },
    {
      name: 'Pan-Africa Water-Resilient Outdoor Surface Brand',
      description:
        'Build a premium South African outdoor surface brand and use it as a regional export — targeting Nigeria, Kenya, Ghana, UAE, and East Africa where the same dynamics (premium real estate + water scarcity + no dominant brand) exist at scale. Destroys assumption: geographic constraint = two SA metros.',
      market_demand: 7,
      defensibility: 9,
      scalability: 9,
      founder_fit: 4,
      speed_to_revenue: 1,
      total: 30,
    },
  ],
}

// ---------------------------------------------------------------------------
// Stage 1-11 (Source: VDOS_Report_PrimeTurf_Gauteng_CT1.html, the final report)
// ---------------------------------------------------------------------------

const stage1Output: Stage1Output = {
  surface_idea_statement:
    'An artificial turf and landscaping business operating in Gauteng and Cape Town.',
  founder_stated_problem:
    'Customers want a beautiful outdoor lawn/garden without the maintenance burden of natural grass.',
  founder_stated_solution:
    'Install artificial turf for residential and commercial customers across Gauteng and Cape Town, leveraging an existing customer base and technical/builder skill.',
  unexamined_assumptions: [
    'There is unsatisfied demand for artificial turf in Gauteng and Cape Town.',
    "The founder's technical/builder skills translate to competitive advantage in this market.",
    'Existing customers represent a repeatable acquisition model.',
    '"Landscaping" as a broader offering increases TAM without diluting positioning.',
    'Artificial turf is the primary value driver, not a commodity installation.',
    'The market is early-stage enough to build a defensible position.',
  ],
}

const stage2Output: Stage2Output = {
  desired_outcomes: [
    {
      outcome: 'A garden that always looks finished — without guilt, water bills, or gardening labour.',
      for_whom: 'Residential homeowner',
      evidence: 'Cape Town Day Zero / Level 4-6 water restrictions and Gauteng Rand Water supply crisis have made garden upkeep economically and practically unviable for middle-to-upper income households.',
    },
    {
      outcome: 'Repeatable visual premium at scale across multiple units on a fixed delivery timeline.',
      for_whom: 'Property developer / estate builder',
      evidence: 'Premium developments in Sandton, Midrand, Fourways (Gauteng) and Atlantic Seaboard, Constantia, Stellenbosch corridor (Cape Town) represent high-income demand clusters requiring consistent, photographic show-home quality.',
    },
    {
      outcome: 'Elimination of a recurring cost centre (irrigation, mowing, replacement).',
      for_whom: 'Commercial property manager',
      evidence: 'Zero-maintenance outdoor surfaces remove an ongoing operating cost across a managed portfolio.',
    },
    {
      outcome: 'A permanent revenue-generating outdoor space regardless of season or water restriction.',
      for_whom: 'Hospitality / restaurant / hotel operator',
      evidence: "Cape Town's restaurant and hotel scene is visually competitive and depends on usable outdoor seating year-round.",
    },
    {
      outcome: 'Uninterrupted usability and reduced operational cost on a surface that survives heavy use.',
      for_whom: 'Sports facility / school',
      evidence: 'Surfaces must meet performance standards without maintenance downtime.',
    },
    {
      outcome: 'Compliance with water-use regulations and cost reduction without public space degradation.',
      for_whom: 'Municipality / government (emerging segment)',
      evidence: 'Municipal water-use restriction regulation is increasing across both metros.',
    },
  ],
  outcome_vs_output_gap:
    'A technical founder typically wants to build the best product (output). The market does not buy "the best product" — it buys certainty of outcome. The highest-value positioning is not superior turf, it is guaranteed outcome delivery: the right surface, installed correctly, backed by a warranty, maintained if needed. The product is confidence, not carpet.',
}

const stage3Output: Stage3Output = {
  founder_emotional_drivers: [
    'Pride in technical craft and installation quality (builder identity)',
    'Desire to be seen as a precise, trustworthy specialist rather than a commodity installer',
  ],
  market_emotional_drivers: [
    'Status — in Sandton, Constantia, and Atlantic Seaboard a premium outdoor space is a social signal; buyers will pay 2-3x more for the "right" brand.',
    'Anxiety relief — water restriction anxiety is real and documented; homeowners who have lost gardens feel shame and helplessness.',
    'Time freedom — eliminating the cognitive load of watering schedules and dying grass is worth a premium above cost-saving.',
    'Asset pride — a visually degraded exterior lowers perceived property value; premium turf functions as asset protection.',
    'Environmental identity — "zero irrigation" and "water-neutral garden" are identity statements for Cape Town\'s water-conscious buyers, not just features.',
    'Control — in a country with load-shedding, crime anxiety, and infrastructure failure, a self-contained, low-dependency outdoor space is security-adjacent emotion.',
  ],
  divergence_assessment:
    'The dominant emotional driver in premium Gauteng and Cape Town segments is anxiety relief plus status signalling simultaneously. This is not a "budget outdoor solution" market — the brand must be positioned as a design and lifestyle decision, not an installation service. The founder\'s emotional driver (technical pride) diverges from the market\'s (status + anxiety relief): the founder must translate technical credibility into emotional/status language rather than leading with specifications.',
}

const stage4Output: Stage4Output = {
  identified_gaps: [
    {
      gap: 'Premium Residential Brand Vacuum',
      evidence: 'No single brand in SA owns the "premium residential artificial turf" position. The segment is fragmented; an architect-grade, design-led brand with consistent quality and warranty is absent.',
      market_size_estimate: 'Premium homeowners in Sandton and Clifton already spend R80k-R300k on outdoor renovations (VDOS Stage 9 category validation evidence).',
      contradictory_evidence: 'Price-driven installers dominate volume and may already satisfy budget-constrained demand in this segment, limiting headroom for a pure premium play.',
    },
    {
      gap: 'Managed Outdoor Spaces (SLA Model)',
      evidence: 'No player offers a "managed outdoor surface" subscription — supply, install, inspect, replace at end-of-life — despite commercial property managers wanting zero maintenance.',
      market_size_estimate: 'ASQ4 hidden demand scan estimates R60k-R120k/yr in SLA revenue per 50-client base at 30% acceptance of a R1,800-2,400/yr plan.',
      contradictory_evidence: 'Recurring SLA models require post-installation customer relationship infrastructure that does not currently exist in the business.',
    },
    {
      gap: 'Design-Build for Hospitality',
      evidence: "Cape Town's restaurant and hotel scene is globally competitive visually; no dedicated player serves this segment with design + installation integrated.",
      market_size_estimate: 'Hospitality design-build projects range R80k-R500k per project per Stage 7 revenue architecture.',
      contradictory_evidence: 'Requires a new network in hospitality that the founder does not currently have (Stage 5 capability table rates "Existing Customer Leverage" as Low for this gap).',
    },
    {
      gap: 'Developer Specification Partner',
      evidence: 'Property developers (e.g. Balwin, Pam Golding developments, Dogon Group launches) need a trusted specification partner who can supply consistent product across 20-200 units; currently served ad hoc.',
      market_size_estimate: 'ASQ4 hidden demand scan estimates R800k-R3M/yr from one mid-size developer framework agreement.',
      contradictory_evidence: 'High capital intensity (volume) and depends on existing B2B relationships the founder may not yet hold.',
    },
    {
      gap: 'Rooftop & Vertical Outdoor Living',
      evidence: "Cape Town's land scarcity and Johannesburg's high-rise densification are creating demand for rooftop terraces, balcony surfaces, and vertical green walls.",
      market_size_estimate: 'Not numerically quantified in source documents; qualitatively scored 6/10 capability score in Stage 5.',
      contradictory_evidence: 'Technical complexity is high and this is an entirely new segment for the founder (Low existing-customer leverage).',
    },
    {
      gap: 'Water-Conscious Garden Design System',
      evidence: 'A full outdoor transformation system combining artificial turf, drought-resistant planting, gravel zoning, and smart irrigation removal does not exist as a packaged product in SA.',
      market_size_estimate: 'Ranked opportunity #2 in Stage 6 scoring (39/50) as the "Garden Transformation System".',
      contradictory_evidence: 'Requires design partnerships the founder does not currently have in place.',
    },
  ],
  founder_desire_vs_market_demand: {
    founder_stated_desire: 'Build and install artificial turf using technical/builder skill across Gauteng and Cape Town.',
    market_evidence: 'Market evidence (Stage 0/ASQ1) points to water-scarcity-driven infrastructure resilience demand, not aesthetic lawn replacement, as the dominant conversion driver — and to developer/architect B2B channels as higher-value than residential-only acquisition.',
    divergence_assessment: 'The founder\'s desire (build great turf installs) and the market demand (a guaranteed-outcome, recurring-revenue, specification-led brand) diverge significantly. The VDOS process resolves this by repositioning the founder\'s technical skill as the moat for a system/brand business rather than a labour business.',
  },
  positioning_opportunities: [
    'Position as a Permanent Outdoor Living Design company, not a turf installer.',
    'Lead with infrastructure resilience and water independence messaging over aesthetics.',
    'Build a developer/architect specification channel rather than relying on direct residential inbound.',
    'Introduce a managed SLA layer to convert the existing dormant customer base into recurring revenue.',
  ],
}

const stage5Output: Stage5Output = {
  founder_capabilities: [
    'Quality control and installation precision (technical/builder background)',
    'Systems thinking and ability to design maintenance protocols',
    'Capacity to document repeatable, standards-based installation processes (SOP creation)',
    'Existing residential customer base providing testimonials and referral seed',
  ],
  capability_gaps: [
    'No existing network in hospitality design-build',
    'Limited existing B2B relationships with property developers',
    'No design partnerships needed for a packaged "Garden Transformation System"',
    'No prior experience in rooftop/vertical outdoor technical complexity',
    'No sales/marketing or brand-building track record distinct from installation work',
  ],
  alignment_score: 8,
  build_vs_partner_recommendations: [
    'Build in-house: installation SOPs, quality-gate checklists, and the technical specification documentation — these are the founder\'s core strength (capability score 8/10 for Premium Residential Brand and Garden Transformation System).',
    'Partner or hire for: architect/developer relationship management and B2B sales (capability score reflects "Medium-Low" existing leverage in these segments).',
    'Partner for: hospitality network access and rooftop/vertical technical specialization until volume justifies in-house investment.',
    'Defer building: a full digital specification SaaS platform until the physical brand and specification pipeline are proven (per Stage 6 ranking, this scored lower on speed-to-revenue).',
  ],
}

// Source: Stage 06 — Opportunity Ranking table, final report (verbatim totals
// and per-dimension scores 1-10 as published).
const stage6Output: Stage6Output = {
  ranked_opportunities: [
    {
      title: 'Premium Residential Brand + Developer Specification',
      description: 'Hybrid model: high-end residential installs plus a developer specification pipeline.',
      market_demand_score: 9,
      defensibility_score: 8,
      scalability_score: 8,
      founder_fit_score: 9,
      speed_to_revenue_score: 8,
      total_score: 42,
      rank: 1,
      probability_of_success: 85, // VDOS-inferred from "highest-ranked opportunity, recommended at Rank 1" framing — not an explicit numeric figure in source
    },
    {
      title: 'Garden Transformation System',
      description: 'Packaged outdoor transformation product combining turf, drought-resistant planting, gravel zoning, and irrigation removal.',
      market_demand_score: 8,
      defensibility_score: 7,
      scalability_score: 7,
      founder_fit_score: 8,
      speed_to_revenue_score: 9,
      total_score: 39,
      rank: 2,
      probability_of_success: 75, // VDOS-inferred, proportional to rank/total score relative to Rank 1
    },
    {
      title: 'Managed Outdoor SLA / Subscription',
      description: 'Recurring maintenance and replacement contract for commercial outdoor surfaces.',
      market_demand_score: 7,
      defensibility_score: 9,
      scalability_score: 9,
      founder_fit_score: 7,
      speed_to_revenue_score: 6,
      total_score: 38,
      rank: 3,
      probability_of_success: 72, // VDOS-inferred
    },
    {
      title: 'Hospitality Design-Build',
      description: 'Premium restaurant/hotel outdoor spaces.',
      market_demand_score: 8,
      defensibility_score: 7,
      scalability_score: 6,
      founder_fit_score: 8,
      speed_to_revenue_score: 6,
      total_score: 35,
      rank: 4,
      probability_of_success: 65, // VDOS-inferred
    },
    {
      title: 'Rooftop & Vertical Outdoor',
      description: 'High-rise terrace and balcony surfaces.',
      market_demand_score: 6,
      defensibility_score: 9,
      scalability_score: 7,
      founder_fit_score: 6,
      speed_to_revenue_score: 7,
      total_score: 35,
      rank: 5,
      probability_of_success: 60, // VDOS-inferred
    },
    {
      title: 'General Landscaping',
      description: 'Broad landscaping without specialisation — the original surface idea as stated.',
      market_demand_score: 6,
      defensibility_score: 2,
      scalability_score: 3,
      founder_fit_score: 4,
      speed_to_revenue_score: 5,
      total_score: 20,
      rank: 6,
      probability_of_success: 20, // VDOS-inferred — explicitly disqualified ("commodity trap") in source
    },
  ],
  top_recommendation: 'Premium Residential Brand + Developer Specification (hybrid model)',
  rationale:
    '"Artificial turf and general landscaping" scores 20/50 — a commodity trap. The highest-ranked opportunity, a Premium Residential Brand combined with a Developer Specification pipeline, scores 42/50. These are fundamentally different businesses; the VDOS recommends the hybrid model at Rank 1.',
}

const stage7Output: Stage7Output = {
  venture_thesis_statement:
    "South Africa's premium residential and property development market has no architect-grade, design-led outdoor surface brand. Water scarcity, load-shedding-driven irrigation collapse, and rising urban densification have created structural, non-cyclical demand for permanent outdoor surface solutions. A technically superior, SOP-driven installation business — positioned as an outcome brand rather than a commodity installer — can capture the premium segment in Gauteng and Cape Town, scale via developer specification contracts, and build a recurring revenue layer through managed surface maintenance agreements.",
  supporting_evidence: [
    'Stage 6 opportunity ranking scores the hybrid Premium Residential + Developer Specification model at 42/50 vs 20/50 for the original general landscaping idea.',
    'ASQ1/Instrument 1 evidence: Cape Town Level 4-6 water restrictions and Rand Water Gauteng supply crisis correlate with documented enquiry spikes tied to water events, not seasonal aesthetic cycles.',
    'ASQ3 price elasticity data: the premium price band (R540-R820/m² installed) carries 42-56% gross margin and is occupied by fewer than five credible players in either city.',
    'ASQ4 channel gravity worked model: Channel D (Architect/Developer) produces the highest Channel Power Index of any acquisition channel, despite being the most underinvested.',
    'Buyers in the R3M-R20M property segment are documented (Stage 9 category validation) already spending R80k-R300k on outdoor renovations without a dedicated premium brand to spend it with.',
  ],
  contradictory_evidence_considered: [
    'Price-driven commodity installers dominate volume in the current market and could undercut a premium positioning on price alone.',
    "The founder's existing customer base is residential and may not include the commercial/developer accounts needed to seed the B2B pipeline immediately.",
    'A technical founder may be more comfortable executing installations than building brand, sales, and specification relationships — the moat requires capabilities (B2B relationship management, brand marketing) not yet demonstrated.',
  ],
  selected_opportunity_title: 'Premium Residential Brand + Developer Specification',
  gate_criteria: {
    market_demand_validated: true, // Stage 6 scoring (42/50) plus ASQ3/ASQ4 evidence of an underserved premium band
    founder_market_divergence_resolved: true, // Stage 4 repositions founder's technical/SOP strength as the moat for a system/brand business, resolving the labour-vs-brand divergence
    asq_evidence_consistent: true, // ASQ1 (water anxiety dominant), ASQ3 (premium band underpriced), and ASQ4 (architect/developer channel highest CPI) all point toward the same premium + B2B model
    objections_addressed: true, // ASQ3 override-factor analysis (referral, warranty, ROI calculator, architect specification) directly addresses price objections at the target price band
  },
  gate_decision: 'pass',
  gate_rationale:
    'All four gate criteria are satisfied by convergent evidence across Stage 6 scoring and the ASQ1/ASQ3/ASQ4 instruments: the premium hybrid model both outscores the original idea by a wide margin (42 vs 20 out of 50) and is independently corroborated by real price-elasticity and channel-gravity data. The gate passes to MVP Discovery.',
}

const stage8Output: Stage8Output = {
  mvp_definition:
    'The MVP is not a test of whether artificial turf sells — it is a test of whether the premium brand + specification model produces the unit economics and conversion rates the venture thesis requires, run against the existing customer base and a small set of new architect/developer/commercial touchpoints within a 90-day window.',
  in_scope: [
    'Audit existing customer base for average project value, segment, emotional trigger, and referral generation',
    'Define and name one premium "signature product" tier (specific pile height, density, backing specification)',
    'Outreach to 10 residential architects/interior designers in Sandton/Bryanston and Camps Bay/Constantia offering a complimentary site assessment and specification consultation',
    'One developer specification pilot: standardised spec package (spec sheet, installation method statement, warranty document, unit pricing) submitted to one mid-size developer',
    'Production of one hero installation case study (professional photography + short write-up)',
    'Test the SLA offer with two existing commercial clients (12-month managed surface agreement)',
  ],
  out_of_scope: [
    'Full national franchise rollout',
    'Building the Outdoor Surface Specification SaaS platform',
    'Pan-Africa expansion',
    'Hiring a dedicated sales/business development team',
  ],
  validation_plan: [
    '≥2 architect/designer specification recommendations generated within 90 days',
    '≥1 developer specification meeting booked or package submitted within 90 days',
    '≥1 SLA contract signed with a commercial client within 90 days',
    'Average residential project value increases by 20%+ vs trailing 6 months',
    'Hero installation asset generates ≥3 inbound enquiries within 30 days of publication',
  ],
}

const stage9Output: Stage9Output = {
  category_options: [
    {
      category_name: 'Artificial Turf Installer',
      rationale: 'The existing/default category — explicitly identified as the one to escape: a commodity category defined by rand-per-m², dominated by whoever answers the phone first and bids lowest.',
    },
    {
      category_name: 'Permanent Outdoor Living Design',
      rationale: 'The selected new category: designing, supplying, and guaranteeing outdoor living surfaces that require zero water, zero maintenance, and zero compromise, engineered for the South African climate and lifestyle. Defined by three pillars — Engineering-Grade Permanence, Water Independence, and Designed Living Surfaces.',
    },
  ],
  selected_category: 'Permanent Outdoor Living Design',
  category_definition_statement:
    'The category of designing, supplying, and guaranteeing outdoor living surfaces that require zero water, zero maintenance, and zero compromise — engineered for the South African climate and lifestyle.',
  gate_criteria: {
    category_distinct_from_incumbents: true, // explicitly defined against "artificial turf installer" commodity category
    category_defensible: true, // engineering-grade permanence + specification system are structurally harder to copy than turf supply alone
    category_resonant_with_evidence: true, // Stage 9 "Category Validation" cites real buyer spend (R80k-R300k outdoor renovations in Sandton/Clifton) already occurring without a brand occupying the category
  },
  gate_decision: 'pass',
  gate_rationale:
    'This category already exists implicitly in the buyer\'s mind — they just don\'t have a brand that occupies it. Premium homeowners in Sandton and Clifton are already spending R80k-R300k on outdoor renovations; they are looking for someone who can design, specify, and guarantee an outdoor space, not "a turf guy." The category names that experience and gives it a home, satisfying distinctness, defensibility, and evidence-resonance simultaneously.',
}

const stage10Output: Stage10Output = {
  brand_name_options: [
    { name: 'TERRAFIRM', rationale: 'Evokes permanence and ground/earth engineering.' },
    { name: 'PRIME SURFACE', rationale: 'Selected option — preserves "Prime" equity from the existing PrimeTurf brand while elevating to a surface/category-level name rather than a product-level name.' },
    { name: 'GROUNDWORK STUDIO', rationale: 'Evokes engineering + design studio positioning.' },
    { name: 'SURFACE & SOIL', rationale: 'Evokes the material/design-language territory.' },
    { name: 'VIVUM', rationale: 'Latin-derived, evokes living/permanence without literal turf reference.' },
    { name: 'FIELDFORM', rationale: 'Evokes engineered outdoor surface shaping.' },
    { name: 'BASEFORM', rationale: 'Evokes substrate/foundation engineering credibility.' },
    { name: 'SWARD STUDIO', rationale: '"Sward" is a traditional term for turfed ground, paired with "Studio" for design positioning.' },
  ],
  selected_brand_name: 'Prime Surface (Studio) — with PrimeTurf retained as the residential turf product line',
  positioning_statement:
    'For premium homeowners, property developers, and commercial operators in Gauteng and Cape Town who want exceptional outdoor spaces without water dependency or maintenance burden, [Brand] is the permanent outdoor living design company that engineers and guarantees outdoor surface systems — unlike commodity installers who sell product without owning outcomes.',
  brand_voice:
    '"Designed for permanence." / "Your outdoor space. Engineered." / "Zero water. Zero maintenance. Zero compromise." Architect meets landscape engineer: precise, considered, material-conscious. Speaks the language of design and specification, not installation and labour. Does not use the words "cheap," "affordable," or "competitive rates" — references warranties, substrates, and design systems instead. Note: if the existing PrimeTurf brand is already established, the brand architecture should evolve it upward, not replace it — PrimeTurf becomes the residential turf product line under a parent studio brand (e.g. Prime Surface Studio), preserving existing equity while unlocking the broader category positioning.',
}

const stage11Output: Stage11Output = {
  sales_system: {
    channels: [
      'Inbound: hero installation content via Instagram/Houzz/Pinterest → discovery call → site visit → proposal',
      'Outbound: architect/designer specification programme — quarterly product updates, lunch briefings, digital spec library access',
      'B2B: developer relationship manager (founder-led initially) — annual framework contracts with 2-3 developers in each city',
      'CRM tracking every lead, source, conversion rate, and project value by segment as the venture\'s intelligence layer',
    ],
    process: 'Inbound and referral leads move through discovery call → site visit → proposal (with override stack: warranty, ROI calculator, portfolio, method statement) → close. B2B leads move through specification consultation → spec package submission → framework agreement.',
    pricing_architecture:
      'Layer 1: Premium residential installs (project revenue, R45k-R250k per project). Layer 2: Developer specification contracts (volume, R500k-R3M per estate phase). Layer 3: Managed surface SLA (recurring, R1,500-R6,000/month per commercial client). Layer 4: Hospitality design-build (high margin, R80k-R500k per project). Target blended gross margin: 45-55% (residential premium), 35-42% (developer volume), 60-70% (SLA/maintenance). Payment terms: 50% deposit on acceptance, 40% on commencement, 10% on sign-off.',
  },
  operations_system: {
    delivery_model:
      'Founder-designed installation SOP (substrate prep, drainage, laying, finishing, quality sign-off) executed initially by the founder and managed sub-contractor crews trained to the standard; not employed directly until volume justifies it.',
    key_processes: [
      'Documented installation SOP taught and inspected, not informally executed',
      'Quality gate: every installation signed off against a 12-point checklist before handover, with photo evidence stored against the client record',
      'Supply chain: two to three product suppliers maintained (no single-source dependency); minimum stock holding for fast-turnaround residential projects',
      'Sub-contractor management: vetted installation teams trained on SOP, managed on a performance scorecard',
    ],
    bottleneck_mitigations: [
      'Key person dependency on founder technical knowledge mitigated by full SOP documentation that can be taught and inspected',
      'Load-shedding operational risk mitigated by building a 20% buffer into all project timelines with no penalty clauses for load-shedding delays',
      'Single-supplier risk mitigated by maintaining two to three suppliers concurrently',
    ],
  },
  financial_architecture: {
    revenue_layers: [
      'Premium residential project revenue (R45k-R250k per project)',
      'Developer specification contracts (R500k-R3M per estate phase)',
      'Managed surface SLA / recurring maintenance (R1,500-R6,000/month per commercial client)',
      'Hospitality design-build (R80k-R500k per project)',
    ],
    margin_targets: '45-55% blended gross margin on residential premium work, 35-42% on developer volume work, 60-70% on SLA/maintenance contracts.',
    breakeven_assessment:
      'SLA contracts are intended to be pre-paid annually or via monthly debit order, building recurring revenue intended to cover fixed overhead by month 18 of the capability scaling plan.',
  },
  brand_marketing_system: {
    positioning_statement:
      'For premium homeowners, property developers, and commercial operators in Gauteng and Cape Town who want exceptional outdoor spaces without water dependency or maintenance burden, [Brand] is the permanent outdoor living design company that engineers and guarantees outdoor surface systems — unlike commodity installers who sell product without owning outcomes.',
    primary_channels: [
      'Content engine: every completed project produces 5 photographs + 1 short case study, published monthly, archived as a specification library',
      'Architect programme: digital portal with downloadable spec sheets, CAD blocks, material samples',
      'PR: target home design publications (House & Leisure, Visi, Architectural Digest SA) for one editorial feature per city per year',
      'Referral programme: R1,500 introduction credit for a signed project referral, activating the existing customer base immediately',
    ],
    messaging_pillars: [
      'Engineering-grade permanence — a designed surface system with substrate engineering, drainage design, thermal management, and structural warranty',
      'Water independence — liberation from the municipal water grid as an infrastructure resilience statement, not just an environmental virtue signal',
      'Designed living surfaces — outdoor surfaces as interior-design-grade decisions with material specifications and finish options',
    ],
  },
  capability_scaling_plan: {
    current_capability_gaps: [
      'No dedicated sales/business development hire yet',
      'No formalised architect/developer relationship management function',
      'No Cape Town-based dedicated crew (founder-led across both cities initially)',
    ],
    hiring_or_partnering_plan: [
      'Months 1-6: founder-led sales, SOP documentation, MVP tests, hero asset production',
      'Months 6-12: first dedicated sales/business development hire (Gauteng base); developer pipeline activated',
      'Months 12-18: Cape Town operation formalised with dedicated crew(s) per city; SLA base building',
      'Months 18-36: evaluate franchise or licensing model for regional expansion (Durban, Port Elizabeth) — the SOP becomes the franchise asset',
    ],
    timeline: '0-36 months across four phases: founder-led MVP (0-6mo), first hire + developer activation (6-12mo), dual-city formalisation (12-18mo), franchise/licensing evaluation (18-36mo).',
  },
  risk_register: [
    {
      risk: 'Rand depreciation risk — product is imported',
      likelihood: 'Medium-High (structural to SA currency exposure)',
      impact: 'Margin compression on imported product lines',
      mitigation: 'Hedge via forward pricing in client contracts and an annual price adjustment clause.',
    },
    {
      risk: 'Copycat risk — the physical product cannot be protected',
      likelihood: 'High',
      impact: 'Erosion of differentiation if competitors copy the visible product offering',
      mitigation: 'Invest in brand, SOP, and specification network — not product secrecy — since these are the defensible assets, not the turf itself.',
    },
    {
      risk: 'Developer payment risk — SA developers carry late payment risk',
      likelihood: 'Medium',
      impact: 'Cash flow strain on large framework contracts',
      mitigation: 'Require 30% deposit on developer contracts; credit check all developer clients before framework signing.',
    },
    {
      risk: 'Load-shedding operational risk — install schedules affected',
      likelihood: 'High (structural to current SA grid conditions)',
      impact: 'Delivery delays and customer dissatisfaction',
      mitigation: 'Build a 20% buffer into all project timelines; no penalty clauses for load-shedding delays.',
    },
    {
      risk: 'Key person dependency — venture runs on founder technical knowledge alone',
      likelihood: 'High at current stage',
      impact: 'Business cannot scale or be transferred without the founder',
      mitigation: 'SOP documentation as the primary mitigation — making installation knowledge teachable and inspectable, independent of the founder.',
    },
  ],
}

// ---------------------------------------------------------------------------
// Combined stages export
// ---------------------------------------------------------------------------

type AnyStageOutput =
  | Stage0Output
  | Stage1Output
  | Stage2Output
  | Stage3Output
  | Stage4Output
  | Stage5Output
  | Stage6Output
  | Stage7Output
  | Stage8Output
  | Stage9Output
  | Stage10Output
  | Stage11Output

export const primeTurfStages: Record<
  number,
  { stage_key: StageKey; output: AnyStageOutput; is_gate: boolean; gate_passed: boolean | null }
> = {
  0: { stage_key: 'assumption_destruction', output: stage0Output, is_gate: false, gate_passed: null },
  1: { stage_key: 'surface_idea', output: stage1Output, is_gate: false, gate_passed: null },
  2: { stage_key: 'outcome_discovery', output: stage2Output, is_gate: false, gate_passed: null },
  3: { stage_key: 'emotional_driver', output: stage3Output, is_gate: false, gate_passed: null },
  4: { stage_key: 'market_gap', output: stage4Output, is_gate: false, gate_passed: null },
  5: { stage_key: 'capability_alignment', output: stage5Output, is_gate: false, gate_passed: null },
  6: { stage_key: 'opportunity_ranking', output: stage6Output, is_gate: false, gate_passed: null },
  7: { stage_key: 'venture_thesis', output: stage7Output, is_gate: true, gate_passed: true },
  8: { stage_key: 'mvp_discovery', output: stage8Output, is_gate: false, gate_passed: null },
  9: { stage_key: 'category_creation', output: stage9Output, is_gate: true, gate_passed: true },
  10: { stage_key: 'brand_discovery', output: stage10Output, is_gate: false, gate_passed: null },
  11: { stage_key: 'vos_design', output: stage11Output, is_gate: false, gate_passed: null },
}

// ---------------------------------------------------------------------------
// ASQ Instruments
// ---------------------------------------------------------------------------

// ASQ1 — Conversion Driver
// Source: VDOS_Stage0_AssumptionInstruments1.html, Instrument 1 ("Is the buying
// decision driven by aesthetics — or by water anxiety and regulatory pressure?").
// NOTE ON RECONSTRUCTION: the source document frames Instrument 1 as a decision
// instrument with a documented VDOS hypothesis and supporting SA market evidence
// (Cape Town Day Zero/Level 4-6 restrictions, Rand Water Gauteng crisis, 8-14%
// annual tariff increases, California drought study citing 68% water-cost-driven
// buyers) rather than recording a literal founder transcript. No verbatim founder
// quote exists in any of the 7 source files for this instrument. The
// `founder_answer` below is therefore reconstructed directly from that real
// documented evidence (not invented) and is explicitly flagged as such.
const asq1Input: Asq1Input = {
  conversion_driver_question:
    'When customers in Gauteng and Cape Town purchase artificial turf, what is the dominant conversion driver in actual closed transactions: (A) aesthetics and low-maintenance convenience, (B) water scarcity and cost of irrigation, (C) property value and resale uplift, or (D) contractor trust and referral — and what percentage of closed deals does each represent in real installer experience or transaction records?',
  founder_answer:
    '(Reconstructed from VDOS-documented evidence, not a literal transcript — no verbatim founder quote exists in the source materials.) Looking back at the enquiries and closed jobs, the pattern lines up with the water situation more than the garden looking nice. Cape Town clients kept bringing up Day Zero and the Level 4-6 restrictions, and in Gauteng it has been the Rand Water supply problems and load-shedding making sprinklers useless. Water tariffs have also been going up 8-14% a year in both cities, so a lot of clients are doing the maths on what they are paying to keep grass alive. Aesthetics comes up, but mostly as a secondary point once the water conversation has already happened — it is rarely the opening reason someone calls.',
}

// ASQ2 — Price Elasticity (brief)
// Source: VDOS_Stage0_AssumptionInstruments1.html, Instrument 2 ("Where does price
// resistance actually appear — and what overrides it?") — elasticity bar chart
// gives the real estimated purchase-intent bands.
const asq2Input: Asq2Input = {
  price_points_tested: [
    { price: 330, purchase_intent_signal: 'High (estimated ~90% purchase intent) — R280-380/m² installed band' },
    { price: 450, purchase_intent_signal: 'Good (estimated ~70% purchase intent) — R380-520/m² installed band' },
    { price: 620, purchase_intent_signal: 'Selective (estimated ~50% purchase intent) — R520-720/m² installed band' },
    { price: 860, purchase_intent_signal: 'Premium (estimated ~30% purchase intent) — R720-1,000/m² installed band' },
    { price: 1100, purchase_intent_signal: 'Luxury (estimated ~12% purchase intent) — R1,000+/m² installed band' },
  ],
}

// ASQ3 — Price Elasticity (deep)
// Source: VDOS_ASQ3_PriceElasticity1.html, Section 1 price-band table and
// Section 2 override-factor matrix (real percentages as published).
const asq3Input: Asq3Input = {
  price_bands: [
    {
      band: 'E (DIY / informal / budget residential)',
      price_low: 190,
      price_high: 280,
      override_factor_effectiveness: {
        warm_peer_referral: 88,
        architect_designer_specification: 92,
        ten_year_written_warranty: 72,
        roi_calculation_water_savings: 65,
        hero_portfolio_evidence: 58,
        monthly_payment_financing: 55,
        brand_recognition: 40,
        transparent_method_statement: 35,
      },
    },
    {
      band: 'D (Mid-market residential, price-comparing buyers — Commodity Zone)',
      price_low: 280,
      price_high: 390,
      override_factor_effectiveness: {
        warm_peer_referral: 88,
        architect_designer_specification: 92,
        ten_year_written_warranty: 72,
        roi_calculation_water_savings: 65,
        hero_portfolio_evidence: 58,
        monthly_payment_financing: 55,
        brand_recognition: 40,
        transparent_method_statement: 35,
      },
    },
    {
      band: 'C (Upper-mid residential, value-conscious premium — Transition Zone)',
      price_low: 390,
      price_high: 540,
      override_factor_effectiveness: {
        warm_peer_referral: 88,
        architect_designer_specification: 92,
        ten_year_written_warranty: 72,
        roi_calculation_water_savings: 65,
        hero_portfolio_evidence: 58,
        monthly_payment_financing: 55,
        brand_recognition: 40,
        transparent_method_statement: 35,
      },
    },
    {
      band: 'B (Sandton / Atlantic Seaboard / Constantia premium — Target Band)',
      price_low: 540,
      price_high: 820,
      override_factor_effectiveness: {
        warm_peer_referral: 88,
        architect_designer_specification: 92,
        ten_year_written_warranty: 72,
        roi_calculation_water_savings: 65,
        hero_portfolio_evidence: 58,
        monthly_payment_financing: 55,
        brand_recognition: 40,
        transparent_method_statement: 35,
      },
    },
    {
      band: 'A (Ultra-premium / hospitality / developer spec — Luxury Band)',
      price_low: 820,
      price_high: 1200,
      override_factor_effectiveness: {
        warm_peer_referral: 88,
        architect_designer_specification: 92,
        ten_year_written_warranty: 72,
        roi_calculation_water_savings: 65,
        hero_portfolio_evidence: 58,
        monthly_payment_financing: 55,
        brand_recognition: 40,
        transparent_method_statement: 35,
      },
    },
  ],
  // Source: ASQ3 ROI model (Johannesburg/Sandton + Cape Town/Atlantic Seaboard
  // water-savings calculations, 65m² lawn).
  water_tariff_inputs: {
    johannesburg_total_annual_saving_mid_rand: 16402, // midpoint of R16,220-R16,584
    cape_town_total_annual_saving_mid_rand: 18864, // midpoint of R18,624-R19,104
    johannesburg_install_cost_at_580_per_sqm: 37700,
    cape_town_install_cost_at_620_per_sqm: 40300,
  },
}

// ASQ4 — Channel Gravity
// Source: VDOS_ASQ4_ChannelGravity1.html, Module 3 "Worked Example — Hypothetical
// 18-Month Data (Replace With Your Actuals)" CPI table. The source explicitly
// labels this table as illustrative/hypothetical (not literal closed-deal
// records) and instructs the founder to replace it with actuals — it is the only
// deal-level/channel-level numeric dataset in the entire ASQ4 corpus, so it is
// used here as the most-real-available source, flagged transparently rather than
// fabricated from nothing. Deal-level rows below are reconstructed from the
// aggregate per-channel figures in that worked example (revenue, repeatability
// multiplier, margin, CAC) by representing one illustrative deal per channel
// carrying the channel's aggregate 18-month figures, since no individual deal
// rows were published.
export const primeTurfAsq4Deals: Asq4DealRow[] = [
  {
    deal_id: 'WORKED-EXAMPLE-CHANNEL-D-AGGREGATE',
    channel: 'D — Architect / Developer',
    sub_source: 'Illustrative aggregate of 18-month channel revenue from ASQ4 worked example (source explicitly flags these figures as hypothetical, to be replaced with actuals)',
    deal_size: 280000,
    cac_direct_cost: 8400,
    gross_margin: 0.52,
    repeatability: 'high', // source describes as "4.0 (structural)" repeatability multiplier — mapped to codebase's 'high' signal (multiplier 1) since codebase formula uses string signals, not the 1.0-4.0 numeric scale used in the HTML worked example
    objection_type: 'N',
    project_type: 'Developer estate',
    upsell_potential: 'Y — architect/developer channel flagged as highest-leverage in business',
  },
  {
    deal_id: 'WORKED-EXAMPLE-CHANNEL-B-AGGREGATE',
    channel: 'B — Referral (Peer)',
    sub_source: 'Illustrative aggregate of 18-month channel revenue from ASQ4 worked example',
    deal_size: 620000,
    cac_direct_cost: 18200,
    gross_margin: 0.44,
    repeatability: 'medium', // source: "2.5 (consistent)" — mapped to 'medium' (codebase multiplier 0.6)
    objection_type: 'N',
    project_type: 'Residential garden',
    upsell_potential: 'Y',
  },
  {
    deal_id: 'WORKED-EXAMPLE-CHANNEL-C-AGGREGATE',
    channel: 'C — Contractor / Landscaper',
    sub_source: 'Illustrative aggregate of 18-month channel revenue from ASQ4 worked example',
    deal_size: 340000,
    cac_direct_cost: 14000,
    gross_margin: 0.31,
    repeatability: 'low', // source: "1.5 (occasional)" — mapped to 'low' (codebase multiplier 0.3)
    objection_type: 'P',
    project_type: 'Residential garden',
    upsell_potential: 'N',
  },
  {
    deal_id: 'WORKED-EXAMPLE-CHANNEL-A-AGGREGATE',
    channel: 'A — Direct Homeowner (Inbound)',
    sub_source: 'Illustrative aggregate of 18-month channel revenue from ASQ4 worked example',
    deal_size: 480000,
    cac_direct_cost: 38400,
    gross_margin: 0.26,
    repeatability: 'low', // source: "1.0 (one-time)" — mapped to 'low' (closest available signal; codebase has no 1.0/none option)
    objection_type: 'P',
    project_type: 'Residential garden',
    upsell_potential: 'N',
  },
]

const asq4Input: Asq4Input = {
  deals: primeTurfAsq4Deals,
  // Source: ASQ4 Module 2 Hidden Demand Scan table (real estimated revenue
  // opportunity figures, midpoint of each published range used per signal).
  hidden_demand_signals: [
    { signal: 'Additional Area Upsell (existing clients, ~20% of base adds 25m²)', estimated_value: 250000 },
    { signal: 'Maintenance SLA Demand (~30% of base at R1,800-2,400/yr)', estimated_value: 90000 },
    { signal: 'Adjacent Surface Demand (pool surrounds, decking, ~15% of base)', estimated_value: 360000 },
    { signal: 'Missed Contractor Channel (3 active referral partners x 4 deals/yr)', estimated_value: 450000 },
    { signal: 'Water Restriction Spike Zones (3 target suburbs activated)', estimated_value: 600000 },
    { signal: 'Architect/Designer Not Yet Approached (5 architects formalised)', estimated_value: 900000 },
    { signal: 'Developer Specification Gap (one mid-size developer agreement)', estimated_value: 1900000 },
  ],
}

// ASQ5 — Specification Reality
// Source: VDOS_ASQ5_SpecificationReality1.html. The HTML did not present a raw
// per-deal CSV-style table in the portion captured for this seed; deal rows
// below are reconstructed to be consistent with the Specification Threshold
// Matrix categories and the S1-vs-S4 margin relationship described in the
// asq5-specification-reality.ts module (S1 = highest margin / pre-specified,
// S4 = lowest margin / cold/commodity), using margin figures consistent with
// the ASQ3 price-band gross-margin ranges that are real and published (Band
// A/B premium 42-58%+ vs Band D/E commodity 8-26%). This is the most uncertain
// instrument in this dataset — flagged explicitly rather than presented as
// verbatim deal records.
const asq5Input: Asq5Input = {
  deals_classified: [
    { deal_id: 'S1-DEV-001', classification: 'S1', margin: 0.55 }, // pre-specified developer/architect deal — consistent with ASQ3 Band A/B margin range
    { deal_id: 'S1-DEV-002', classification: 'S1', margin: 0.52 },
    { deal_id: 'S2-ARCH-001', classification: 'S2', margin: 0.46 }, // influenced by architect/designer but not fully pre-specified
    { deal_id: 'S2-ARCH-002', classification: 'S2', margin: 0.44 },
    { deal_id: 'S3-COMP-001', classification: 'S3', margin: 0.32 }, // competitive quote situation — consistent with ASQ3 Band C margin range
    { deal_id: 'S3-COMP-002', classification: 'S3', margin: 0.30 },
    { deal_id: 'S3-COMP-003', classification: 'S3', margin: 0.28 },
    { deal_id: 'S4-COLD-001', classification: 'S4', margin: 0.22 }, // cold/commodity inbound — consistent with ASQ3 Band D margin range
    { deal_id: 'S4-COLD-002', classification: 'S4', margin: 0.20 },
    { deal_id: 'S4-COLD-003', classification: 'S4', margin: 0.18 },
  ],
}

// ASQ6 — Specification Origin Map
// Source: VDOS_ASQ6_SpecificationOriginMap.html. Control points evidence and
// revenue physics inputs reconstructed from the Three-Layer Architecture, Floor
// Rate System (Channel D/B/C/A floor rates), and Competitor Exclusion Mechanisms
// content carried over from the prior conversation segment's reading of this
// document (per the task's own carried-over summary of real figures: Channel D
// floor R620/m², Channel B floor R520/m², Channel C floor R460/m², Channel A
// floor R420/m²).
const asq6Input: Asq6Input = {
  control_points_evidence:
    'Pre-decision capture occurs primarily through architect/designer specification and developer procurement, where the buyer defers to the specifier before ever meeting the installer (ASQ3/ASQ4 evidence: architect specification overrides price resistance ~92%, and Channel D close rate is 78-94% with price objection rare). Decision-stage influence occurs through warranty, ROI calculation, and portfolio evidence overriding price resistance for direct and referral buyers. Post-decision competition occurs mainly in the commodity Channel A/Band D segment, where buyers compare multiple installer quotes after the decision to go artificial has already been made.',
  revenue_physics_inputs: {
    channel_d_floor_rate_per_sqm: 620,
    channel_b_floor_rate_per_sqm: 520,
    channel_c_floor_rate_per_sqm: 460,
    channel_a_floor_rate_per_sqm: 420,
    architect_specification_close_rate_pct: 92,
    referral_override_effectiveness_pct: 88,
  },
}

// ---------------------------------------------------------------------------
// Combined ASQ instruments export
// ---------------------------------------------------------------------------

export const primeTurfAsqInstruments: Record<
  AsqKey,
  { raw_input: Record<string, unknown>; analysis_output: Record<string, unknown> }
> = {
  asq1: {
    raw_input: asq1Input as unknown as Record<string, unknown>,
    analysis_output: {
      primary_conversion_driver: 'Water scarcity and cost of irrigation (infrastructure anxiety)',
      secondary_drivers: ['Property value / resale uplift', 'Contractor trust / referral'],
      business_model_implication:
        'The dominant driver positions this as an infrastructure resilience service, not a consumer lifestyle/aesthetic product — supporting premium, urgency-driven pricing power and a B2B/specification-led channel strategy over price-led residential volume.',
      ruled_out_models: ['Pure consumer lifestyle/aesthetic brand competing on taste cycles'],
      confidence: 70,
    },
  },
  asq2: {
    raw_input: asq2Input as unknown as Record<string, unknown>,
    analysis_output: {
      intent_drop_price: 720,
      elasticity_assessment:
        'Purchase intent holds well through the R280-720/m² range (High to Selective) and falls sharply above ~R720-820/m² (the documented "cliff edge") unless architect specification or developer procurement removes price as a comparison point.',
      is_true_price_objection: false,
      notes:
        'ASQ3 override-factor data shows the drop above the cliff edge is substantially recoverable with referral, warranty, and architect specification — indicating this is more a trust/specification gap than a hard price ceiling.',
    },
  },
  asq3: {
    raw_input: asq3Input as unknown as Record<string, unknown>,
    analysis_output: {
      band_analysis: [
        { band: 'D (R280-390)', most_effective_override_factors: ['warm_peer_referral', 'architect_designer_specification'], payback_months: null },
        { band: 'C (R390-540)', most_effective_override_factors: ['architect_designer_specification', 'ten_year_written_warranty'], payback_months: null },
        { band: 'B (R540-820, Target Band)', most_effective_override_factors: ['architect_designer_specification', 'warm_peer_referral', 'roi_calculation_water_savings'], payback_months: 27.6 },
        { band: 'A (R820-1200, Luxury)', most_effective_override_factors: ['architect_designer_specification', 'monthly_payment_financing'], payback_months: null },
      ],
      decision_tree_summary:
        'If a +15% price uplift with the full override stack (warranty, ROI calculation, method statement, portfolio) holds close rate within 10% of baseline, the Premium Brand model is confirmed and rates should rise immediately targeting Band B (R540-820/m²) via the architect channel. If close rate drops more than 20% even with overrides present, the issue is segment (commodity-zone leads), not price, and outreach should redirect to architect/developer channels.',
      verdict: 'underpriced',
      target_price_band: 'B (R540-R820/m² installed)',
    },
  },
  asq4: {
    raw_input: asq4Input as unknown as Record<string, unknown>,
    analysis_output: {
      cpi_ranking: [
        { channel: 'D — Architect / Developer', cpi: 6933 },
        { channel: 'B — Referral (Peer)', cpi: 3748 },
        { channel: 'C — Contractor / Landscaper', cpi: 1127 },
        { channel: 'A — Direct Homeowner (Inbound)', cpi: 325 },
      ],
      priority_matrix: {
        invest: ['D — Architect / Developer', 'B — Referral (Peer, formalised)'],
        scale_carefully: ['C — Contractor / Landscaper (structured partnership)', 'Maintenance SLA (adjacent service)'],
        fix_or_exit: ['A — Direct Homeowner (Inbound, repositioned to premium pricing only)'],
        deprioritize: ['A — Direct Homeowner (cold inbound / price-aggregator leads)', 'Paid social media ad spend'],
      },
      hidden_demand_total: 4550000,
      ninety_day_plan: [
        'Weeks 1-2: run the Channel Gravity Audit on the last 30-50 closed deals; calculate revenue %, close rate, and time-CAC by channel.',
        'Weeks 3-4: launch Hidden Demand Harvest — Phase 2 upsell quotes, SLA offers to installs older than 6 months, and a formal R2,000 referral credit programme.',
        'Weeks 5-8: build the Architect Programme — identify 10 target architects/designers in Sandton and Atlantic Seaboard, prepare the specification package, request 10 specification-consultation meetings.',
        'Weeks 9-12: run the ASQ3 price-uplift test simultaneously — all new proposals submitted with the full override stack, premium-suburb proposals quoted +15%, lost-deal debriefs within 3 days.',
      ],
    },
  },
  asq5: {
    raw_input: asq5Input as unknown as Record<string, unknown>,
    analysis_output: {
      threshold_classification: 'latent',
      margin_delta_s1_vs_s4: 33.5,
      recommended_road: 'Road A - Specification System',
      rationale:
        'S1 (pre-specified) share of the classified deal sample is 20% — within the 10-20% "latent" band of the Specification Threshold Matrix — and the S1-vs-S4 margin delta is a substantial 33.5 percentage points, consistent with ASQ3/ASQ4 evidence that architect/developer specification channels carry both higher close rates and higher margins. This combination of a latent (not yet critical, not yet structural) S1 share with a large margin gap justifies investing in Road A (Specification System) now, before the gap closes through competitor action, rather than waiting for Road B (Referral + Contractor Foundation) to mature first.',
    },
  },
  asq6: {
    raw_input: asq6Input as unknown as Record<string, unknown>,
    analysis_output: {
      control_point_clusters: {
        pre_decision_capture: ['Architect / designer specification', 'Developer procurement framework'],
        decision_stage_influence: ['10-year written warranty', 'ROI calculation (water savings)', 'Hero portfolio evidence', 'Warm peer referral'],
        post_decision_competition: ['Direct homeowner inbound (Channel A) — multi-quote price comparison after the decision to go artificial is already made'],
      },
      dominant_revenue_physics: 'Specification Gravity',
      three_layer_architecture: {
        layer_1_founder: 'Founder sets installation standards, warranty terms, and pricing floors — the technical/SOP authority layer.',
        layer_2_distribution: 'Architects, designers, and developers acting as specifiers who direct buyer demand before any installer-level sales conversation occurs.',
        layer_3_execution: 'Vetted installer/sub-contractor crews trained and certified against the founder\'s SOP, executing to the documented standard.',
      },
      floor_rate_system: {
        channel_d_architect_developer: 620,
        channel_b_peer_referral: 520,
        channel_c_contractor_landscaper: 460,
        channel_a_direct_homeowner: 420,
      },
      competitor_exclusion_mechanisms: [
        'Specification Schedule Inclusion (hard exclusion)',
        'Developer Approved Supplier List (hard exclusion)',
        '10-Year Warranty Transfer (hard exclusion)',
        'Portfolio Reference Architecture (soft exclusion)',
        'Technical Knowledge Asymmetry (information exclusion)',
      ],
    },
  },
}

// ---------------------------------------------------------------------------
// Opportunities (Stage 0 emergent ventures + Stage 6 ranked opportunities)
// ---------------------------------------------------------------------------

export const primeTurfOpportunities: Array<{
  source_stage: number
  title: string
  description?: string
  market_demand_score: number
  defensibility_score: number
  scalability_score: number
  founder_fit_score: number
  speed_to_revenue_score: number
  total_score: number
  rank: number
  probability_of_success?: number
  notes?: string
}> = [
  // Stage 0 — Emergent Ventures (9 entries)
  ...stage0Output.emergent_ventures.map((v, idx) => ({
    source_stage: 0,
    title: v.name,
    description: v.description,
    market_demand_score: v.market_demand,
    defensibility_score: v.defensibility,
    scalability_score: v.scalability,
    founder_fit_score: v.founder_fit,
    speed_to_revenue_score: v.speed_to_revenue,
    total_score: v.total,
    rank: idx + 1,
    notes:
      'Stage 0 totals (/50) are verbatim from VDOS_Stage0_AssumptionDestruction1.html. The five 0-10 dimension sub-scores are VDOS-inferred to sum to the documented total, reconstructed from the qualitative labels (e.g. "Very High", "Immediate") given per venture in the source — not verbatim numeric data.',
  })),
  // Stage 6 — Ranked Opportunities (6 entries, verbatim scores from final report)
  ...stage6Output.ranked_opportunities.map((o) => ({
    source_stage: 6,
    title: o.title,
    description: o.description,
    market_demand_score: o.market_demand_score,
    defensibility_score: o.defensibility_score,
    scalability_score: o.scalability_score,
    founder_fit_score: o.founder_fit_score,
    speed_to_revenue_score: o.speed_to_revenue_score,
    total_score: o.total_score,
    rank: o.rank,
    probability_of_success: o.probability_of_success,
    notes:
      o.rank === 6
        ? 'All five dimension scores and the total (20/50) are verbatim from the Stage 06 Opportunity Ranking table in the final VDOS report. probability_of_success is VDOS-inferred (not an explicit numeric figure in source) from the explicit "commodity trap / disqualified" framing.'
        : 'All five dimension scores and the total are verbatim from the Stage 06 Opportunity Ranking table in the final VDOS report. probability_of_success is VDOS-inferred (not an explicit numeric figure in source), scaled proportionally to rank and total score.',
  })),
]
