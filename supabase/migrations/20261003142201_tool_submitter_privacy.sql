-- Apply after the app explicitly selects PUBLIC_TOOL_COLUMNS (SELECT * now fails).
revoke select on public.tools from public, anon, authenticated;
revoke select (submitted_by_email, submitted_by_name) on public.tools
  from public, anon, authenticated;
grant select (
  id, name, url, slug, tagline, description, category, github_url,
  is_no_upload, is_open_source, is_zero_login, is_no_ads,
  is_works_offline, is_mobile_friendly, is_free_forever,
  favicon_url, status, submitted_at, approved_at
) on public.tools to anon, authenticated;
-- Keep direct browser inserts blocked, including any future inherited PUBLIC grant.
revoke insert on public.tools from public, anon, authenticated;
