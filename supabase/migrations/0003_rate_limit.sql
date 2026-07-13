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
