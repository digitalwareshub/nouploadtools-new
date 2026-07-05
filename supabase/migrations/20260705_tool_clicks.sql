-- tool_clicks: privacy-friendly click counter
-- Stores which tool was clicked and when.
-- Does NOT store IP address, user agent, cookies, fingerprint, session ID, or personal identifiers.

create table if not exists tool_clicks (
  id uuid primary key default gen_random_uuid(),
  tool_id uuid not null references tools(id) on delete cascade,
  clicked_at timestamptz not null default now(),
  source text not null default 'unknown'
    check (source in ('homepage', 'directory', 'unknown'))
);

create index if not exists tool_clicks_tool_id_idx
on tool_clicks(tool_id);

create index if not exists tool_clicks_clicked_at_idx
on tool_clicks(clicked_at desc);

-- RLS: anon can insert click rows only.
-- Raw click rows are not publicly readable.
alter table tool_clicks enable row level security;

grant insert on tool_clicks to anon;

drop policy if exists "anon_insert_clicks" on tool_clicks;

create policy "anon_insert_clicks"
on tool_clicks
for insert
to anon
with check (true);

-- No SELECT policy for anon.
-- Service role bypasses RLS by default, so server/admin aggregate reads can use service role.
