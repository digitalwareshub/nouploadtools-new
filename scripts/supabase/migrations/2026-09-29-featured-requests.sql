-- NoUploadTools - Featured placement requests
-- Created 2026-09-29
--
-- Server-write only. Browser roles receive no table access.
-- The Next.js API route validates that the selected tool is approved
-- and writes using service_role.

begin;

create table public.featured_requests (
  id uuid primary key default gen_random_uuid(),
  tool_id uuid not null references public.tools(id) on update cascade on delete restrict,
  applicant_name text not null,
  applicant_email text not null,
  role text not null,
  preferred_timing text not null,
  reason text not null,
  message text,
  ownership_confirmed boolean not null default false,
  ownership_status text not null default 'pending',
  status text not null default 'submitted',
  admin_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint featured_requests_applicant_name_length_check
    check (char_length(applicant_name) between 1 and 100),

  constraint featured_requests_applicant_email_length_check
    check (char_length(applicant_email) between 3 and 254),

  constraint featured_requests_role_check
    check (role in ('owner_founder', 'employee_team_member', 'agency_representative', 'other')),

  constraint featured_requests_preferred_timing_check
    check (preferred_timing in ('asap', 'next_month', 'exploring')),

  constraint featured_requests_reason_length_check
    check (char_length(reason) between 1 and 220),

  constraint featured_requests_message_length_check
    check (message is null or char_length(message) <= 500),

  constraint featured_requests_ownership_status_check
    check (ownership_status in ('pending', 'verified', 'rejected')),

  constraint featured_requests_status_check
    check (status in ('submitted', 'reviewing', 'waitlisted', 'accepted', 'declined', 'withdrawn'))
);

create index featured_requests_tool_id_idx
  on public.featured_requests (tool_id);

create index featured_requests_status_created_at_idx
  on public.featured_requests (status, created_at desc);

create index featured_requests_applicant_email_idx
  on public.featured_requests (lower(applicant_email));

alter table public.featured_requests
  enable row level security;

-- Intentionally no anon/authenticated RLS policies.
-- All writes go through /api/featured-requests using service_role.

revoke all
  on table public.featured_requests
  from anon, authenticated;

revoke all
  on table public.featured_requests
  from service_role;

grant select, insert, update, delete
  on table public.featured_requests
  to service_role;

comment on table public.featured_requests is
  'Requests from owners or official representatives of approved NoUploadTools listings for paid homepage featured placement. Sponsorship is separate from editorial approval.';

comment on column public.featured_requests.tool_id is
  'Approved directory tool being requested for featured homepage placement.';

comment on column public.featured_requests.ownership_confirmed is
  'Applicant self-attestation that they own or officially represent the tool.';

comment on column public.featured_requests.ownership_status is
  'Manual ownership verification status.';

comment on column public.featured_requests.status is
  'Operational status of the featured placement request, not the directory listing status.';

commit;
