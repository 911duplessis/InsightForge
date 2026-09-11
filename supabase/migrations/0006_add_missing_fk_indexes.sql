-- Adds covering indexes for foreign keys get_advisors flagged as unindexed
-- (INFO-level performance lint). consultant_business_access already has a
-- composite PK (consultant_id, business_id), but that index leads with
-- consultant_id and doesn't serve lookups filtered by business_id alone.

create index if not exists idx_asq4_deals_business on asq4_deals(business_id);
create index if not exists idx_asq_instruments_business on asq_instruments(business_id);
create index if not exists idx_consultant_business_access_business on consultant_business_access(business_id);
create index if not exists idx_vdos_blueprints_business on vdos_blueprints(business_id);
create index if not exists idx_vdos_engagements_client on vdos_engagements(client_id);
create index if not exists idx_vdos_opportunities_business on vdos_opportunities(business_id);
