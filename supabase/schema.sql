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
create trigger update_clients_updated_at
  before update on clients
  for each row execute function update_updated_at_column();

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
create policy "service_role_all_clients" on clients
  for all using (auth.role() = 'service_role');

create policy "service_role_all_sessions" on discovery_sessions
  for all using (auth.role() = 'service_role');

create policy "service_role_all_answers" on discovery_answers
  for all using (auth.role() = 'service_role');

create policy "service_role_all_insights" on insights
  for all using (auth.role() = 'service_role');

create policy "service_role_all_opportunities" on opportunities
  for all using (auth.role() = 'service_role');

create policy "service_role_all_blueprints" on blueprints
  for all using (auth.role() = 'service_role');
