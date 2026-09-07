-- NoUploadTools - Devil's Advocate waitlist
-- Created 2026-09-07
--
-- Server-write only. Browser roles receive no table access.
-- The Next.js API route writes using service_role.

begin;

create table public.devils_advocate_waitlist (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  website_url text,
  paid_interest boolean not null default false,
  source text not null default 'devils-advocate-landing',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint devils_advocate_waitlist_email_length_check
    check (char_length(email) between 3 and 254),

  constraint devils_advocate_waitlist_email_normalized_check
    check (email = lower(btrim(email))),

  constraint devils_advocate_waitlist_email_format_check
    check (email ~ '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$'),

  constraint devils_advocate_waitlist_website_length_check
    check (website_url is null or char_length(website_url) <= 500),

  constraint devils_advocate_waitlist_website_protocol_check
    check (website_url is null or website_url ~ '^https?://'),

  constraint devils_advocate_waitlist_source_length_check
    check (char_length(source) between 1 and 64),

  constraint devils_advocate_waitlist_email_key
    unique (email)
);

create index devils_advocate_waitlist_created_at_idx
  on public.devils_advocate_waitlist (created_at desc);

alter table public.devils_advocate_waitlist
  enable row level security;

-- Intentionally no anon/authenticated RLS policies.
-- All writes go through the server-side API using service_role.

revoke all
  on table public.devils_advocate_waitlist
  from anon, authenticated;

revoke all
  on table public.devils_advocate_waitlist
  from service_role;

grant select, insert, update
  on table public.devils_advocate_waitlist
  to service_role;

comment on table public.devils_advocate_waitlist is
  'Waitlist signups for the NoUploadTools Devil''s Advocate product. Written only through the server-side API using service_role.';

comment on column public.devils_advocate_waitlist.email is
  'Normalized lowercase waitlist email. Unique per signup.';

comment on column public.devils_advocate_waitlist.website_url is
  'Optional website submitted by the founder for Devil''s Advocate analysis.';

comment on column public.devils_advocate_waitlist.paid_interest is
  'Whether the user asked to hear about the deeper paid business investigation.';

comment on column public.devils_advocate_waitlist.source is
  'Application source of the signup.';

comment on column public.devils_advocate_waitlist.created_at is
  'Timestamp of the first signup.';

comment on column public.devils_advocate_waitlist.updated_at is
  'Timestamp for the latest update to the signup.';

commit;
