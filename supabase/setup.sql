-- InsightForge — complete database setup.
-- Paste this whole file into the Supabase SQL editor and run it.
-- Idempotent: safe on a fresh database and safe to re-run.
-- Generated from schema.sql + migrations/*. Keep in sync if those change.

-- ============================================================
-- supabase/schema.sql
-- ============================================================
-- InsightForge Discover™ Database Schema
-- Run this in your Supabase SQL editor

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Clients table
create table if not exists clients (
  id uuid default uuid_generate_v4() primary key,
  first_name text not null,
  last_name text not null,
  email text not null unique,
  phone text,
  company_name text,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Discovery sessions table
create table if not exists discovery_sessions (
  id uuid default uuid_generate_v4() primary key,
  client_id uuid references clients(id) on delete cascade,
  status text not null default 'in_progress' check (status in ('in_progress', 'completed', 'analyzed')),
  started_at timestamptz default now() not null,
  completed_at timestamptz,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Discovery answers table (stores all form responses)
create table if not exists discovery_answers (
  id uuid default uuid_generate_v4() primary key,
  session_id uuid references discovery_sessions(id) on delete cascade not null,
  category text not null,
  question_key text not null,
  answer text,
  created_at timestamptz default now() not null
);

-- Insights table (FORGE analysis results)
create table if not exists insights (
  id uuid default uuid_generate_v4() primary key,
  session_id uuid references discovery_sessions(id) on delete cascade not null unique,
  forge_analysis jsonb not null,
  model_used text not null default 'claude-opus-4-8',
  tokens_used integer,
  analyzed_at timestamptz default now() not null,
  created_at timestamptz default now() not null
);

-- Opportunities table (extracted from FORGE analysis for quick access)
create table if not exists opportunities (
  id uuid default uuid_generate_v4() primary key,
  session_id uuid references discovery_sessions(id) on delete cascade not null,
  title text not null,
  revenue_potential text,
  difficulty text check (difficulty in ('Low', 'Medium', 'High')),
  priority integer,
  confidence_score integer,
  time_to_value text,
  created_at timestamptz default now() not null
);

-- Blueprints table
create table if not exists blueprints (
  id uuid default uuid_generate_v4() primary key,
  session_id uuid references discovery_sessions(id) on delete cascade not null unique,
  generated_at timestamptz default now() not null,
  viewed_at timestamptz,
  email_sent_at timestamptz,
  created_at timestamptz default now() not null
);

-- Indexes for performance
create index if not exists idx_discovery_sessions_client_id on discovery_sessions(client_id);
create index if not exists idx_discovery_answers_session_id on discovery_answers(session_id);
create index if not exists idx_insights_session_id on insights(session_id);
create index if not exists idx_opportunities_session_id on opportunities(session_id);
create index if not exists idx_blueprints_session_id on blueprints(session_id);

-- Updated_at trigger function
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Apply updated_at triggers
drop trigger if exists update_clients_updated_at on clients;
create trigger update_clients_updated_at
  before update on clients
  for each row execute function update_updated_at_column();

drop trigger if exists update_discovery_sessions_updated_at on discovery_sessions;
create trigger update_discovery_sessions_updated_at
  before update on discovery_sessions
  for each row execute function update_updated_at_column();

-- Row Level Security (RLS)
-- For MVP we use service role key server-side, but enable RLS for safety
alter table clients enable row level security;
alter table discovery_sessions enable row level security;
alter table discovery_answers enable row level security;
alter table insights enable row level security;
alter table opportunities enable row level security;
alter table blueprints enable row level security;

-- Allow service role full access (server-side operations)
-- Anon users can only insert (for form submission)
drop policy if exists "service_role_all_clients" on clients;
create policy "service_role_all_clients" on clients
  for all using (auth.role() = 'service_role');

drop policy if exists "service_role_all_sessions" on discovery_sessions;
create policy "service_role_all_sessions" on discovery_sessions
  for all using (auth.role() = 'service_role');

drop policy if exists "service_role_all_answers" on discovery_answers;
create policy "service_role_all_answers" on discovery_answers
  for all using (auth.role() = 'service_role');

drop policy if exists "service_role_all_insights" on insights;
create policy "service_role_all_insights" on insights
  for all using (auth.role() = 'service_role');

drop policy if exists "service_role_all_opportunities" on opportunities;
create policy "service_role_all_opportunities" on opportunities
  for all using (auth.role() = 'service_role');

drop policy if exists "service_role_all_blueprints" on blueprints;
create policy "service_role_all_blueprints" on blueprints
  for all using (auth.role() = 'service_role');

-- ============================================================
-- supabase/migrations/0002_vdos.sql
-- ============================================================
-- VDOS (Venture Discovery Operating System) schema additions
-- Additive only — legacy FORGE tables (clients, discovery_sessions, discovery_answers,
-- insights, opportunities, blueprints) are untouched and continue to serve "FORGE Lite".
-- Run this in your Supabase SQL editor after supabase/schema.sql.

-- ---------------------------------------------------------------------------
-- Tenant root
-- ---------------------------------------------------------------------------
create table if not exists businesses (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  slug text not null unique,
  industry text,
  primary_contact_name text,
  primary_contact_email text,
  status text not null default 'active' check (status in ('active', 'paused', 'archived')),
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- ---------------------------------------------------------------------------
-- Consultants (replaces single shared command password)
-- ---------------------------------------------------------------------------
create table if not exists consultants (
  id uuid default uuid_generate_v4() primary key,
  email text not null unique,
  password_hash text not null,
  display_name text not null,
  role text not null default 'consultant' check (role in ('consultant', 'admin')),
  created_at timestamptz default now() not null
);

create table if not exists consultant_business_access (
  consultant_id uuid references consultants(id) on delete cascade not null,
  business_id uuid references businesses(id) on delete cascade not null,
  created_at timestamptz default now() not null,
  primary key (consultant_id, business_id)
);

-- ---------------------------------------------------------------------------
-- VDOS engagements (replaces discovery_sessions for the VDOS path)
-- ---------------------------------------------------------------------------
create table if not exists vdos_engagements (
  id uuid default uuid_generate_v4() primary key,
  business_id uuid references businesses(id) on delete cascade not null,
  client_id uuid references clients(id) on delete set null,
  process_type text not null default 'vdos' check (process_type in ('vdos', 'forge_lite')),
  status text not null default 'in_progress'
    check (status in ('in_progress', 'stage_0_complete', 'asq_pending', 'active', 'gated', 'completed', 'archived')),
  current_stage integer not null default 0,
  intake_summary jsonb,
  started_at timestamptz default now() not null,
  completed_at timestamptz,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);
create index if not exists idx_engagements_business on vdos_engagements(business_id);
create index if not exists idx_engagements_business_status on vdos_engagements(business_id, status);

-- ---------------------------------------------------------------------------
-- VDOS stages: one row per stage (0-11) per engagement
-- ---------------------------------------------------------------------------
create table if not exists vdos_stages (
  id uuid default uuid_generate_v4() primary key,
  engagement_id uuid references vdos_engagements(id) on delete cascade not null,
  business_id uuid references businesses(id) on delete cascade not null,
  stage_number integer not null check (stage_number between 0 and 11),
  stage_key text not null check (stage_key in (
    'assumption_destruction', 'surface_idea', 'outcome_discovery', 'emotional_driver',
    'market_gap', 'capability_alignment', 'opportunity_ranking', 'venture_thesis',
    'mvp_discovery', 'category_creation', 'brand_discovery', 'vos_design'
  )),
  status text not null default 'pending'
    check (status in ('pending', 'awaiting_input', 'in_progress', 'complete', 'gated_blocked')),
  is_gate boolean not null default false,
  gate_passed boolean,
  input_context jsonb,
  output jsonb,
  model_used text,
  tokens_used integer,
  started_at timestamptz,
  completed_at timestamptz,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null,
  unique (engagement_id, stage_number)
);
create index if not exists idx_stages_engagement on vdos_stages(engagement_id);
create index if not exists idx_stages_business on vdos_stages(business_id);

-- ---------------------------------------------------------------------------
-- ASQ instruments (1-6): founder-supplied evidentiary data + Claude interpretation
-- ---------------------------------------------------------------------------
create table if not exists asq_instruments (
  id uuid default uuid_generate_v4() primary key,
  engagement_id uuid references vdos_engagements(id) on delete cascade not null,
  business_id uuid references businesses(id) on delete cascade not null,
  asq_key text not null check (asq_key in ('asq1', 'asq2', 'asq3', 'asq4', 'asq5', 'asq6')),
  status text not null default 'awaiting_data' check (status in ('awaiting_data', 'submitted', 'analyzed')),
  raw_input jsonb not null default '{}'::jsonb,
  analysis_output jsonb,
  submitted_at timestamptz,
  analyzed_at timestamptz,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null,
  unique (engagement_id, asq_key)
);
create index if not exists idx_asq_engagement on asq_instruments(engagement_id);

-- ASQ4 deal-capture rows (structured/tabular — queried/aggregated for Channel Power Index)
create table if not exists asq4_deals (
  id uuid default uuid_generate_v4() primary key,
  asq_instrument_id uuid references asq_instruments(id) on delete cascade not null,
  business_id uuid references businesses(id) on delete cascade not null,
  deal_id text not null,
  channel text not null,
  sub_source text,
  deal_size numeric,
  price_per_sqm numeric,
  close_rate_signal text,
  cac_time_days numeric,
  cac_direct_cost numeric,
  gross_margin numeric,
  repeatability text,
  objection_type text,
  geography text,
  project_type text,
  upsell_potential text,
  created_at timestamptz default now() not null
);
create index if not exists idx_asq4_deals_instrument on asq4_deals(asq_instrument_id);

-- ---------------------------------------------------------------------------
-- Scored ventures/opportunities (Stage 0 Emergent Ventures + Stage 6 Opportunity Ranking)
-- ---------------------------------------------------------------------------
create table if not exists vdos_opportunities (
  id uuid default uuid_generate_v4() primary key,
  engagement_id uuid references vdos_engagements(id) on delete cascade not null,
  business_id uuid references businesses(id) on delete cascade not null,
  source_stage integer not null,
  title text not null,
  description text,
  market_demand_score integer check (market_demand_score between 0 and 10),
  defensibility_score integer check (defensibility_score between 0 and 10),
  scalability_score integer check (scalability_score between 0 and 10),
  founder_fit_score integer check (founder_fit_score between 0 and 10),
  speed_to_revenue_score integer check (speed_to_revenue_score between 0 and 10),
  total_score integer,
  rank integer,
  probability_of_success numeric,
  notes text,
  created_at timestamptz default now() not null
);
create index if not exists idx_vdos_opps_engagement on vdos_opportunities(engagement_id);

-- ---------------------------------------------------------------------------
-- Final blueprint record (Stage 11 VOS Design), analogous to legacy `blueprints`
-- ---------------------------------------------------------------------------
create table if not exists vdos_blueprints (
  id uuid default uuid_generate_v4() primary key,
  engagement_id uuid references vdos_engagements(id) on delete cascade not null unique,
  business_id uuid references businesses(id) on delete cascade not null,
  generated_at timestamptz default now() not null,
  viewed_at timestamptz,
  email_sent_at timestamptz,
  created_at timestamptz default now() not null
);

-- ---------------------------------------------------------------------------
-- Legacy bridge: let FORGE Lite sessions be scoped/displayed per business too
-- ---------------------------------------------------------------------------
alter table discovery_sessions add column if not exists business_id uuid references businesses(id);
create index if not exists idx_discovery_sessions_business on discovery_sessions(business_id);

-- ---------------------------------------------------------------------------
-- updated_at triggers (reuses update_updated_at_column() from schema.sql)
-- ---------------------------------------------------------------------------
drop trigger if exists update_businesses_updated_at on businesses;
create trigger update_businesses_updated_at
  before update on businesses
  for each row execute function update_updated_at_column();

drop trigger if exists update_engagements_updated_at on vdos_engagements;
create trigger update_engagements_updated_at
  before update on vdos_engagements
  for each row execute function update_updated_at_column();

drop trigger if exists update_stages_updated_at on vdos_stages;
create trigger update_stages_updated_at
  before update on vdos_stages
  for each row execute function update_updated_at_column();

drop trigger if exists update_asq_instruments_updated_at on asq_instruments;
create trigger update_asq_instruments_updated_at
  before update on asq_instruments
  for each row execute function update_updated_at_column();

-- ---------------------------------------------------------------------------
-- Row Level Security
-- Service role (used by all server-side API routes today) bypasses RLS, so the
-- real isolation guarantee comes from the application-layer business_id filter
-- in lib/db/scoped.ts. These policies are defense-in-depth plus a forward path
-- for a future authenticated/anon client keyed on a business_id JWT claim.
-- ---------------------------------------------------------------------------
alter table businesses enable row level security;
alter table consultants enable row level security;
alter table consultant_business_access enable row level security;
alter table vdos_engagements enable row level security;
alter table vdos_stages enable row level security;
alter table asq_instruments enable row level security;
alter table asq4_deals enable row level security;
alter table vdos_opportunities enable row level security;
alter table vdos_blueprints enable row level security;

drop policy if exists "service_role_all_businesses" on businesses;
create policy "service_role_all_businesses" on businesses
  for all using (auth.role() = 'service_role');
drop policy if exists "service_role_all_consultants" on consultants;
create policy "service_role_all_consultants" on consultants
  for all using (auth.role() = 'service_role');
drop policy if exists "service_role_all_consultant_business_access" on consultant_business_access;
create policy "service_role_all_consultant_business_access" on consultant_business_access
  for all using (auth.role() = 'service_role');
drop policy if exists "service_role_all_engagements" on vdos_engagements;
create policy "service_role_all_engagements" on vdos_engagements
  for all using (auth.role() = 'service_role');
drop policy if exists "service_role_all_stages" on vdos_stages;
create policy "service_role_all_stages" on vdos_stages
  for all using (auth.role() = 'service_role');
drop policy if exists "service_role_all_asq_instruments" on asq_instruments;
create policy "service_role_all_asq_instruments" on asq_instruments
  for all using (auth.role() = 'service_role');
drop policy if exists "service_role_all_asq4_deals" on asq4_deals;
create policy "service_role_all_asq4_deals" on asq4_deals
  for all using (auth.role() = 'service_role');
drop policy if exists "service_role_all_vdos_opportunities" on vdos_opportunities;
create policy "service_role_all_vdos_opportunities" on vdos_opportunities
  for all using (auth.role() = 'service_role');
drop policy if exists "service_role_all_vdos_blueprints" on vdos_blueprints;
create policy "service_role_all_vdos_blueprints" on vdos_blueprints
  for all using (auth.role() = 'service_role');

-- Forward-looking, currently-inert business_id-scoped policy stubs for a future
-- authenticated client path (not used while all access is via service role).
drop policy if exists "business_scoped_engagements" on vdos_engagements;
create policy "business_scoped_engagements" on vdos_engagements
  for select using (business_id::text = (auth.jwt() ->> 'business_id'));
drop policy if exists "business_scoped_stages" on vdos_stages;
create policy "business_scoped_stages" on vdos_stages
  for select using (business_id::text = (auth.jwt() ->> 'business_id'));

-- ============================================================
-- supabase/migrations/0003_rate_limit.sql
-- ============================================================
-- Best-effort rate limiting for the public, unauthenticated intake/analysis
-- endpoints (which trigger paid LLM calls). One row per accepted request;
-- a fixed-window count per bucket decides whether to allow the next one.
--
-- The application treats this as fail-open: if these queries error (e.g. the
-- table is missing), requests are allowed, so rate limiting can never take the
-- app down. Run this migration to actually enforce the limits.

create table if not exists rate_limit_hits (
  id bigint generated always as identity primary key,
  bucket text not null,
  created_at timestamptz not null default now()
);

create index if not exists idx_rate_limit_hits_bucket_time
  on rate_limit_hits (bucket, created_at desc);

-- Make PostgREST expose the new tables/columns immediately.
notify pgrst, 'reload schema';
