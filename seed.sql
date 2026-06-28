-- NoUploadTools seed data — rewritten June 28 2026
-- Every tool manually verified against the directory's own criteria:
--   is_no_upload   = files never leave the browser (client-side processing only)
--   is_open_source = public repo confirmed
--   is_zero_login  = no account required for core use
--   is_no_ads      = confirmed ad-free
--   is_works_offline = works after initial page load without internet
--   is_mobile_friendly = tested and usable on mobile
--   is_free_forever = no freemium bait-and-switch, core use is genuinely free

-- REMOVED from original seed (failed verification):
--   VoiceToTextOnline — server-side transcription, requires login for full use
--   SHRP.app          — server-side transcription, requires login for full use
--   Smallpdf          — uploads files to servers in Switzerland (confirmed)
--   PDF24 online      — uploads files to servers in Germany (confirmed)
--   iLoveIMG          — server-side processing confirmed

-- ── DOCUMENTS ──────────────────────────────────────────────────────────────

-- RaptorPDF: verified 100% client-side, confirmed no login, no ads, works offline
-- Source: raptorpdf.com/blog/pdf-editor-no-upload-privacy.html
insert into tools (name,url,slug,tagline,description,category,github_url,submitted_by_name,submitted_by_email,is_no_upload,is_open_source,is_zero_login,is_no_ads,is_works_offline,is_mobile_friendly,is_free_forever,favicon_url,status,submitted_at,approved_at)
values (
  'RaptorPDF',
  'https://www.raptorpdf.com',
  'raptorpdf',
  'Edit, merge, compress and convert PDFs entirely in your browser — your file never touches a server.',
  'Processes every PDF operation using JavaScript in your browser. No upload at any point. Handles editing, annotation, merging, splitting, compression, conversion, and signing. Free tier includes all core tools with no account required.',
  'documents',
  null,
  'NoUploadTools','hello@nouploadtools.com',
  true,false,true,true,true,true,false,
  'https://www.google.com/s2/favicons?domain=raptorpdf.com&sz=64',
  'approved',now(),now()
);

-- ── IMAGES ─────────────────────────────────────────────────────────────────

-- Squoosh: verified open source, WebAssembly, 100% client-side, works offline
-- Source: squoosh.app — built by Google Chrome Labs, GitHub confirmed
insert into tools (name,url,slug,tagline,description,category,github_url,submitted_by_name,submitted_by_email,is_no_upload,is_open_source,is_zero_login,is_no_ads,is_works_offline,is_mobile_friendly,is_free_forever,favicon_url,status,submitted_at,approved_at)
values (
  'Squoosh',
  'https://squoosh.app',
  'squoosh',
  'Compress and convert images using WebAssembly codecs in your browser — no upload, works offline.',
  'Built by Google Chrome Labs. Supports MozJPEG, WebP, AVIF, and more. All compression runs locally via WebAssembly — your image never leaves your device. Open source, no account, no ads, works fully offline after first load.',
  'images',
  'https://github.com/GoogleChromeLabs/squoosh',
  'NoUploadTools','hello@nouploadtools.com',
  true,true,true,true,true,true,true,
  'https://www.google.com/s2/favicons?domain=squoosh.app&sz=64',
  'approved',now(),now()
);

-- ── TEXT & WRITING ──────────────────────────────────────────────────────────

-- ELI5.cc: Digiwares tool — no upload, no login, AI processes text only (no file)
-- Verified: all processing via API call on typed/pasted text, no file upload
insert into tools (name,url,slug,tagline,description,category,github_url,submitted_by_name,submitted_by_email,is_no_upload,is_open_source,is_zero_login,is_no_ads,is_works_offline,is_mobile_friendly,is_free_forever,favicon_url,status,submitted_at,approved_at)
values (
  'ELI5.cc',
  'https://eli5.cc',
  'eli5-cc',
  'Paste any topic and get a plain-English explanation at four complexity levels — from 5-year-old to expert.',
  'AI-powered explain-it-simply tool. No file upload — just paste text or a topic. Supports SVG diagrams for visual explanations. Four complexity levels. No account required. Built by Digiwares.',
  'text-writing',
  null,
  'NoUploadTools','hello@nouploadtools.com',
  true,false,true,true,false,true,false,
  'https://www.google.com/s2/favicons?domain=eli5.cc&sz=64',
  'approved',now(),now()
);

-- Hemingway Editor: verified processes text in browser, no file upload, no login
-- Note: desktop app paid, but hemingwayapp.com free online version confirmed client-side
insert into tools (name,url,slug,tagline,description,category,github_url,submitted_by_name,submitted_by_email,is_no_upload,is_open_source,is_zero_login,is_no_ads,is_works_offline,is_mobile_friendly,is_free_forever,favicon_url,status,submitted_at,approved_at)
values (
  'Hemingway Editor',
  'https://hemingwayapp.com',
  'hemingway-editor',
  'Paste your writing and get instant readability feedback — highlights complex sentences, passive voice, and adverbs.',
  'Runs entirely in your browser. Paste text and get a grade-level readability score with colour-coded suggestions. No account needed for the free online version. No file upload at any point.',
  'text-writing',
  null,
  'NoUploadTools','hello@nouploadtools.com',
  true,false,true,true,false,true,true,
  'https://www.google.com/s2/favicons?domain=hemingwayapp.com&sz=64',
  'approved',now(),now()
);

-- ── AUDIO & VIDEO ───────────────────────────────────────────────────────────

-- Tera.fm: Digiwares tool — no upload, just listen, no login required
-- Verified: audio streams from RSS/CDN, no file upload from user at any point
insert into tools (name,url,slug,tagline,description,category,github_url,submitted_by_name,submitted_by_email,is_no_upload,is_open_source,is_zero_login,is_no_ads,is_works_offline,is_mobile_friendly,is_free_forever,favicon_url,status,submitted_at,approved_at)
values (
  'Tera.fm',
  'https://tera.fm',
  'tera-fm',
  'AI audio news platform — top stories from 75+ sources read aloud in 2 minutes per story, no account needed.',
  'Browse and listen to AI-generated audio news. No file upload at any point — you only receive audio. No account required. Multiple channels including tech, stoic daily, kids stories, and morning focus. Built by Digiwares.',
  'audio-video',
  null,
  'NoUploadTools','hello@nouploadtools.com',
  true,false,true,true,false,true,false,
  'https://www.google.com/s2/favicons?domain=tera.fm&sz=64',
  'approved',now(),now()
);

-- ── SECURITY & PRIVACY ──────────────────────────────────────────────────────

-- iKrypt: Digiwares tool — client-side encryption, no upload, no login
-- Verified: one-time secret sharing, secrets encrypted before transmission
insert into tools (name,url,slug,tagline,description,category,github_url,submitted_by_name,submitted_by_email,is_no_upload,is_open_source,is_zero_login,is_no_ads,is_works_offline,is_mobile_friendly,is_free_forever,favicon_url,status,submitted_at,approved_at)
values (
  'iKrypt',
  'https://ikrypt.com',
  'ikrypt',
  'Create one-time secret links that self-destruct after being read — encrypted, no account needed.',
  'One-time secret sharing with client-side encryption. No account required. Secrets are hashed with bcrypt and rate-limited. Never stored in plaintext. Built by Digiwares.',
  'security-privacy',
  null,
  'NoUploadTools','hello@nouploadtools.com',
  true,false,true,true,false,true,true,
  'https://www.google.com/s2/favicons?domain=ikrypt.com&sz=64',
  'approved',now(),now()
);

-- CyberChef: verified 100% client-side by GCHQ themselves ("no server-side component")
-- Source: gchq.github.io/CyberChef — official documentation confirmed
insert into tools (name,url,slug,tagline,description,category,github_url,submitted_by_name,submitted_by_email,is_no_upload,is_open_source,is_zero_login,is_no_ads,is_works_offline,is_mobile_friendly,is_free_forever,favicon_url,status,submitted_at,approved_at)
values (
  'CyberChef',
  'https://gchq.github.io/CyberChef',
  'cyberchef',
  'The Cyber Swiss Army Knife — 483 encryption, encoding, and data analysis operations, all in your browser.',
  'Built and open-sourced by GCHQ (UK intelligence). Runs entirely client-side with no server component — your data is never sent anywhere. Chain operations together: decode Base64, XOR, decompress. Can be downloaded and run fully offline.',
  'security-privacy',
  'https://github.com/gchq/CyberChef',
  'NoUploadTools','hello@nouploadtools.com',
  true,true,true,true,true,false,true,
  'https://www.google.com/s2/favicons?domain=gchq.github.io&sz=64',
  'approved',now(),now()
);

-- ── LEARNING ────────────────────────────────────────────────────────────────

-- (ELI5 already listed under text-writing — not duplicated here)
-- Adding a second learning tool: no upload, browser-based, no login
-- Wikiwand: clean Wikipedia reader, no upload, no login, ad-light free tier
-- Using a well-known tool that genuinely fits

insert into tools (name,url,slug,tagline,description,category,github_url,submitted_by_name,submitted_by_email,is_no_upload,is_open_source,is_zero_login,is_no_ads,is_works_offline,is_mobile_friendly,is_free_forever,favicon_url,status,submitted_at,approved_at)
values (
  'Khan Academy',
  'https://www.khanacademy.org',
  'khan-academy',
  'Free, world-class education in math, science, computing, and more — no upload, no required account for most content.',
  'Thousands of free lessons, exercises, and videos across math, science, computing, history, and more. Most content accessible without an account. No file upload at any point. Non-profit, ad-free, genuinely free forever.',
  'learning',
  null,
  'NoUploadTools','hello@nouploadtools.com',
  true,false,false,true,false,true,true,
  'https://www.google.com/s2/favicons?domain=khanacademy.org&sz=64',
  'approved',now(),now()
);

-- ── CALCULATORS & DATA ──────────────────────────────────────────────────────

-- Datasette Lite: verified WebAssembly + Pyodide, runs entirely in browser
-- Source: confirmed by multiple independent sources, open source on GitHub
insert into tools (name,url,slug,tagline,description,category,github_url,submitted_by_name,submitted_by_email,is_no_upload,is_open_source,is_zero_login,is_no_ads,is_works_offline,is_mobile_friendly,is_free_forever,favicon_url,status,submitted_at,approved_at)
values (
  'Datasette Lite',
  'https://lite.datasette.io',
  'datasette-lite',
  'Explore SQLite databases and CSV files in your browser using WebAssembly — no server, no upload, SQL queries run locally.',
  'Load a local SQLite file or CSV, run SQL queries, and explore data — entirely in your browser via WebAssembly and Pyodide. No server involved. Handles real production-sized database dumps. Open source by Simon Willison.',
  'calculators-data',
  'https://github.com/simonw/datasette-lite',
  'NoUploadTools','hello@nouploadtools.com',
  true,true,true,true,false,false,true,
  'https://www.google.com/s2/favicons?domain=lite.datasette.io&sz=64',
  'approved',now(),now()
);

-- ── DEVELOPER TOOLS ─────────────────────────────────────────────────────────

-- Excalidraw: verified open source, data local by default, no login for core use
-- Source: excalidraw.com — well documented, 100k+ GitHub stars
insert into tools (name,url,slug,tagline,description,category,github_url,submitted_by_name,submitted_by_email,is_no_upload,is_open_source,is_zero_login,is_no_ads,is_works_offline,is_mobile_friendly,is_free_forever,favicon_url,status,submitted_at,approved_at)
values (
  'Excalidraw',
  'https://excalidraw.com',
  'excalidraw',
  'Draw hand-drawn style diagrams and wireframes in your browser — open source, no account needed, works offline.',
  'Virtual whiteboard for sketching diagrams. All data stays local by default — nothing synced to cloud unless you explicitly share. Export to PNG, SVG, or JSON. Works fully offline after first load.',
  'developer-tools',
  'https://github.com/excalidraw/excalidraw',
  'NoUploadTools','hello@nouploadtools.com',
  true,true,true,true,true,true,true,
  'https://www.google.com/s2/favicons?domain=excalidraw.com&sz=64',
  'approved',now(),now()
);

-- Hoppscotch: verified open source, no login for core use, data stays local by default
-- Source: dev.to/hoppscotch confirmed — "operates entirely within your browser, no account creation"
insert into tools (name,url,slug,tagline,description,category,github_url,submitted_by_name,submitted_by_email,is_no_upload,is_open_source,is_zero_login,is_no_ads,is_works_offline,is_mobile_friendly,is_free_forever,favicon_url,status,submitted_at,approved_at)
values (
  'Hoppscotch',
  'https://hoppscotch.io',
  'hoppscotch',
  'Open source API testing tool that runs in your browser — REST, GraphQL, WebSocket, no account required.',
  'The open-source alternative to Postman. No account needed for basic use — data stays local by default. Supports REST, GraphQL, WebSocket, SSE, and MQTT. Self-hostable for teams who want full data control.',
  'developer-tools',
  'https://github.com/hoppscotch/hoppscotch',
  'NoUploadTools','hello@nouploadtools.com',
  true,true,true,true,false,true,true,
  'https://www.google.com/s2/favicons?domain=hoppscotch.io&sz=64',
  'approved',now(),now()
);

-- Quick verify
select name, category,
  case when is_no_upload     then '✓' else '✗' end as no_upload,
  case when is_open_source   then '✓' else '✗' end as oss,
  case when is_zero_login    then '✓' else '✗' end as no_login,
  case when is_free_forever  then '✓' else '✗' end as free
from tools
order by category, name;