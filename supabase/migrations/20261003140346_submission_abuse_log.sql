-- Tools and their source log are saved atomically; no contact data or raw IP here.
create table public.submission_abuse_log (
  tool_id uuid primary key references public.tools(id) on delete cascade,
  fingerprint text not null check (fingerprint ~ '^[0-9a-f]{64}$'),
  domain text not null check (length(domain) between 1 and 253),
  submitted_at timestamptz not null default now(),
  outcome text not null default 'submitted' check (outcome = 'submitted')
);
alter table public.submission_abuse_log enable row level security;
revoke all on public.submission_abuse_log from public, anon, authenticated;
grant select, insert, delete on public.submission_abuse_log to service_role;
create index submission_abuse_log_source_time_idx
  on public.submission_abuse_log (fingerprint, submitted_at desc);

create function public.insert_tool_submission(p_tool jsonb, p_fingerprint text, p_domain text)
returns uuid
language plpgsql
security invoker
set search_path = ''
as $$
declare
  tool public.tools;
  inserted_id uuid;
begin
  tool := jsonb_populate_record(null::public.tools, p_tool);
  insert into public.tools (
    name, url, tagline, description, category, github_url,
    submitted_by_email, submitted_by_name,
    is_no_upload, is_open_source, is_zero_login, is_no_ads,
    is_works_offline, is_mobile_friendly, is_free_forever, slug, status
  ) values (
    tool.name, tool.url, tool.tagline, tool.description, tool.category, tool.github_url,
    tool.submitted_by_email, tool.submitted_by_name,
    tool.is_no_upload, tool.is_open_source, tool.is_zero_login, tool.is_no_ads,
    tool.is_works_offline, tool.is_mobile_friendly, tool.is_free_forever, '', 'pending'
  ) returning id into inserted_id;

  insert into public.submission_abuse_log (tool_id, fingerprint, domain)
    values (inserted_id, p_fingerprint, p_domain);
  return inserted_id;
end;
$$;
revoke all on function public.insert_tool_submission(jsonb, text, text)
  from public, anon, authenticated;
grant execute on function public.insert_tool_submission(jsonb, text, text) to service_role;

-- Return counts for recent tools without exposing fingerprints even in admin HTML.
create function public.submission_source_counts()
returns table (tool_id uuid, submission_count bigint)
language sql
security invoker
set search_path = ''
as $$
  select tool_id, submission_count
  from (
    select tool_id, count(*) over (partition by fingerprint) as submission_count
    from public.submission_abuse_log
    where submitted_at > now() - interval '24 hours'
  ) recent
  where submission_count >= 3;
$$;
revoke all on function public.submission_source_counts() from public, anon, authenticated;
grant execute on function public.submission_source_counts() to service_role;
