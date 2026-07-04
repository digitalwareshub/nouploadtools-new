You are working on the NoUploadTools codebase.

Project: NoUploadTools
Domain: https://nouploadtools.com
Goal: Rebuild/clean up the current codebase into a trust-first directory of privacy-first browser tools.

Important context:

NoUploadTools should no longer look like a generic ad-supported tools site.

The new positioning is:

NoUploadTools is a curated directory of web tools that respect user privacy.

Tools listed should ideally follow these principles:

- Open source
- Zero login
- Work offline or client-side where possible
- Free forever
- No ads
- No file uploads to a server
- Transparent about what happens to user data

The site should feel simple, trustworthy, developer-friendly, and privacy-first.

Do not build this like a typical SEO spam tools directory. Keep it clean, minimal, and credible.

Main tasks:

1. Audit the existing codebase first

Before making changes, inspect the full codebase and identify:

- Current framework and routing structure
- Existing pages
- Existing tool routes
- Existing metadata
- Sitemap and robots setup
- Any analytics/tracking/ad scripts
- Broken internal links
- Old pages that no longer match the new direction
- Components that reference ads, tracking, uploads, or monetization
- Any inconsistent route patterns such as `.html`, trailing slashes, `/tools/...`, `/privacy`, `/privacy.html`, etc.

Then make the required changes.

2. Keep the project in Next.js

Do not convert this back to plain HTML.

Continue using Next.js/App Router, but clean it up so the site behaves mostly like a static/pre-rendered content site for SEO.

The main content of every important page should be crawlable without depending on client-side JavaScript.

3. Remove all tracking and ad code

NoUploadTools publicly promises a privacy-first experience, so remove:

- Google AdSense
- Google Analytics
- Microsoft Clarity
- Facebook/Meta Pixel if present
- Vercel Analytics if present
- Any third-party tracking script
- Any ad placeholder components
- Any “ad space” text on the site
- Any monetization copy that conflicts with “free forever / no ads”

Also search the entire repo for:

- ads
- adsense
- analytics
- clarity
- gtag
- pixel
- tracking
- AdPlaceholder
- sponsored

Remove or rewrite anything that conflicts with the new privacy-first positioning.

4. Fix routing and URL structure

Use clean Next.js routes only.

Preferred public routes:

- `/`
- `/directory`
- `/submit`
- `/privacy`
- `/terms`
- `/contact`
- `/tracking-checker` if implemented
- `/tools/[slug]` only if individual tool pages are useful and not thin

Avoid `.html` routes.

If old `.html` routes exist, add redirects where appropriate:

- `/privacy.html` → `/privacy`
- `/terms.html` → `/terms`
- `/submit.html` → `/submit`
- `/contact.html` → `/contact`

Also clean up any broken links from the homepage, directory page, footer, sitemap, and internal navigation.

Do not leave links pointing to old missing pages such as `/image-to-pdf` or `/tools/compress-pdf` unless those pages actually exist and are relevant.

5. Rebuild the homepage around the new positioning

Homepage should clearly communicate:

Headline idea:
“Privacy-first web tools that don’t upload your files”

Supporting copy:
“A curated directory of open-source, no-login, no-ads tools that work locally in your browser whenever possible.”

The homepage should include:

- Clear explanation of what NoUploadTools is
- Trust principles:

  - Open source preferred
  - No login
  - No ads
  - Works offline/client-side where possible
  - Free forever
  - No unnecessary uploads

- Link to `/directory`
- Link to `/submit`
- Short section explaining why no-upload tools matter
- Short section explaining how tools are reviewed
- No exaggerated claims
- No fake tool counts
- No fake logos
- No fake testimonials

Tone:
Simple, direct, credible.

6. Rebuild the directory page

The `/directory` page should list tools in a clean way.

Each tool card should include:

- Tool name
- Short description
- Website URL
- Category
- Badges:

  - Open Source
  - No Login
  - No Ads
  - Works Offline
  - Client-side
  - Free Forever
  - No Upload

- Verification status:

  - Verified
  - Not verified yet
  - Community submitted

- Optional GitHub/source link
- Optional notes about limitations

Do not list tools that are not real.

Do not link to broken internal pages.

If using placeholder sample data, clearly mark it as sample or seed data in the code and avoid fake claims on the live UI.

Prefer storing directory data in one central file for now, for example:

`data/tools.ts`

Each tool object can look like:

{
name: string;
slug: string;
url: string;
sourceUrl?: string;
category: string;
description: string;
badges: {
openSource: boolean;
noLogin: boolean;
noAds: boolean;
worksOffline: boolean;
clientSide: boolean;
freeForever: boolean;
noUpload: boolean;
};
verificationStatus: 'verified' | 'unverified' | 'community-submitted';
notes?: string;
}

7. Rebuild the submit page

The `/submit` page should invite developers to submit tools that match the NoUploadTools principles.

The submit page should say that priority is given to tools that are:

- Open source
- Zero login
- Work offline or locally in the browser
- Free forever
- No ads
- No file uploads to a server
- Transparent about privacy

Include form fields:

- Tool name
- Tool URL
- Source code URL / GitHub URL
- Category
- Short description
- Does it require login?
- Does it show ads?
- Does it work offline?
- Does it upload files to a server?
- Is it free forever?
- Notes for review
- Submitter email, optional

If the existing project already has Supabase or a backend route, wire the form to a safe server action/API route.

If not, implement a simple placeholder form state and leave a clearly marked TODO for integration.

Do not expose secrets.

8. Add or improve a “How tools are reviewed” section/page

Create a simple trust page or section explaining how NoUploadTools reviews submitted tools.

Route can be:

`/how-we-review`

or it can be a section on `/submit`.

Explain:

- We check whether the tool works without login
- We check for obvious third-party tracking/ad scripts
- We prefer public source code
- We check whether processing happens client-side where possible
- We do not guarantee perfect security
- Users should still review source code for sensitive use cases

This is important so the site does not overclaim.

9. Update privacy policy

Update `/privacy` so it matches the actual code.

Privacy policy must be truthful.

It should say:

- NoUploadTools does not require accounts to browse the directory
- NoUploadTools does not upload user files for directory browsing
- NoUploadTools does not use ads
- NoUploadTools does not use third-party analytics/tracking scripts, if you have removed them
- If a submit form exists, submitted data is used only to review the tool
- External listed tools are third-party websites and have their own privacy practices
- Users should review the privacy policy/source code of external tools before using sensitive files
- Server logs may be kept by hosting providers for security and abuse prevention

Do not claim “we collect zero data” if the submit form stores submissions or the host keeps server logs.

10. Update terms page

Update `/terms` so it matches the directory model.

Terms should say:

- The site is a directory/resource
- Listed tools are third-party tools unless explicitly owned by NoUploadTools
- NoUploadTools does not guarantee accuracy, security, availability, or privacy practices of third-party tools
- Verification badges are best-effort indicators, not security certifications
- Users are responsible for reviewing tools before using sensitive data
- Developers submitting tools must provide accurate information
- NoUploadTools can remove listings at any time

Keep it simple and not over-legalistic.

11. Update metadata for SEO

Update metadata across key pages.

Homepage title:
NoUploadTools — Privacy-First Web Tools That Don’t Upload Your Files

Homepage description:
A curated directory of open-source, no-login, no-ads web tools that work locally in your browser whenever possible.

Directory title:
Directory — NoUploadTools

Directory description:
Browse privacy-first browser tools that are open source, no-login, no-ads, free, and client-side where possible.

Submit title:
Submit a Tool — NoUploadTools

Submit description:
Submit an open-source, no-login, no-ads, privacy-first web tool for review.

Privacy title:
Privacy Policy — NoUploadTools

Terms title:
Terms — NoUploadTools

Also update Open Graph and Twitter metadata.

12. Update sitemap and robots

Generate sitemap from actual routes and actual directory data.

Only include pages that exist.

Do not include old broken tool pages.

Make sure `/sitemap.xml` and `/robots.txt` are valid.

13. Add `/tracking-checker` feasibility implementation or scaffold

Build a new page:

`/tracking-checker`

Purpose:
Visitors can enter a website URL and see a simple report of visible tracking/ad scripts.

Important: This cannot be fully done client-side because of CORS. It needs a backend route.

Implement a safe MVP if possible.

Route:
`/tracking-checker`

API route:
`/api/check-tracking`

User flow:

- User enters a URL
- Server validates the URL
- Server fetches the page HTML
- Server analyzes:

  - script src domains
  - iframe src domains
  - external image/pixel URLs
  - known analytics/ad/tracking patterns
  - cookies from response headers if available
  - suspicious third-party domains

- Result displays:

  - Tracking scripts found
  - Ad scripts found
  - Analytics tools found
  - Third-party domains
  - Cookies detected from first response
  - Simple privacy score
  - Plain-English explanation

Known tracker patterns to detect initially:

- google-analytics.com
- googletagmanager.com
- googlesyndication.com
- doubleclick.net
- clarity.ms
- hotjar.com
- facebook.net
- connect.facebook.net
- tiktok.com
- segment.com
- mixpanel.com
- amplitude.com
- fullstory.com
- plausible.io
- fathom
- posthog
- intercom
- crisp.chat
- adsystem
- adservice
- taboola
- outbrain

Important security requirements:

This API must be protected against SSRF.

Validate URLs carefully:

- Allow only http and https
- Reject localhost
- Reject 127.0.0.1
- Reject 0.0.0.0
- Reject private IP ranges
- Reject link-local IPs
- Reject internal hostnames
- Reject file://, ftp://, gopher:// and all non-http protocols
- Limit redirects
- Re-validate every redirect target
- Set timeout
- Limit response size
- Only fetch text/html or reasonable content types
- Add basic rate limiting if the project already has rate-limit utilities
- Do not execute JavaScript in the MVP
- Do not use Playwright initially unless explicitly needed later

Make clear in the UI that this is a basic static HTML scan and cannot detect everything a browser would load after JavaScript execution.

Do not overclaim.

Possible page title:
Website Tracking Checker

Possible copy:
“Check a webpage for common analytics, ad, and tracking scripts. This is a basic scan of the page HTML, not a full browser-level security audit.”

14. Design direction

Use a minimal, clean, trustworthy design.

Avoid:

- Loud gradients
- Fake SaaS hype
- Ad-like sections
- Popups
- Dark patterns
- Overcrowded tool cards

Good design direction:

- White or very light background
- Simple typography
- Developer-friendly cards
- Small trust badges
- Clear spacing
- Fast loading
- Mobile responsive
- Accessible color contrast

15. Code quality requirements

- TypeScript should be clean
- Avoid `any` where possible
- Reuse components
- Keep data in typed files
- Keep metadata centralized where practical
- No dead imports
- No broken build
- No console spam
- No unused old ad components
- No stale pages in sitemap
- No mismatched copy between privacy policy and actual code

16. Testing checklist

After implementation, run:

- install dependencies if needed
- typecheck
- lint
- build

Also manually verify:

- Homepage loads
- `/directory` loads
- `/submit` loads
- `/privacy` loads
- `/terms` loads
- `/contact` loads if present
- `/tracking-checker` loads if implemented
- Old `.html` routes redirect properly if configured
- No links point to 404 pages
- No ad placeholders remain
- No Google Analytics/AdSense/Clarity scripts remain
- Sitemap only contains valid URLs
- Metadata is correct
- Mobile layout is usable

17. Final response format

When done, summarize:

- What was changed
- Which old files/components were removed
- Which routes now exist
- Whether tracking/ad scripts were fully removed
- Whether redirects were added
- Whether tracking checker was implemented or only scaffolded
- Any remaining TODOs
- Build/lint/typecheck results

Do not make unsupported claims. If something was not possible, clearly say so.

I mentioned **lint/build/typecheck**, but I did **not explicitly mention implementing Prettier and ESLint** as a dedicated task.

Add this section to the Claude Code prompt:

18. Implement and configure Prettier and ESLint

Add proper formatting and linting setup for the project.

Requirements:

- Ensure ESLint is installed and configured correctly for Next.js + TypeScript.
- Ensure Prettier is installed and configured.
- Add a `.prettierrc` file.
- Add a `.prettierignore` file.
- Make sure ESLint and Prettier do not conflict.
- If needed, add `eslint-config-prettier`.
- Add or update package scripts:

  - `"lint"` for ESLint
  - `"format"` for Prettier write mode
  - `"format:check"` for Prettier check mode
  - `"typecheck"` for TypeScript checking
  - `"build"` for production build

Suggested scripts:

```json
{
  "scripts": {
    "lint": "next lint",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "typecheck": "tsc --noEmit",
    "build": "next build"
  }
}
```

If this project uses a newer Next.js version where `next lint` is not supported, configure ESLint using the current recommended Next.js ESLint setup and update the script accordingly.

Prettier config can be simple:

```json
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "all",
  "printWidth": 100,
  "tabWidth": 2
}
```

`.prettierignore` should include:

```txt
.next
node_modules
out
dist
build
coverage
.vercel
.env
.env.local
package-lock.json
pnpm-lock.yaml
yarn.lock
```

After setting this up, run:

- `npm run format:check`
- `npm run lint`
- `npm run typecheck`
- `npm run build`

Fix any errors caused by the cleanup work.

In the final summary, report whether Prettier, ESLint, typecheck, and build all passed.

Also change the earlier **Testing checklist** section to include:

After implementation, run:

- `npm run format:check`
- `npm run lint`
- `npm run typecheck`
- `npm run build`

And in the final response format, add:

Also report:

- Whether Prettier was added/configured
- Whether ESLint was added/configured
- Whether formatting check passed
- Whether lint passed
- Whether typecheck passed
- Whether production build passed

Yes — **go ahead with Next.js 16**, but tell Claude Code to do it carefully, not just bump the version blindly.

For NoUploadTools, Next.js 16 is fine because the site is mostly static/content-driven, and Next.js 16 is already the current major release. The main thing to watch is that **`next lint` is removed in Next.js 16**, so Claude should use the ESLint CLI directly, like `eslint .`, not `"next lint"`. Next.js also has a v16 upgrade guide covering changes like Turbopack config, middleware → proxy migration, and removed legacy config. ([Next.js][1])

Add this to the prompt:

19. Use Next.js 16 carefully

Upgrade or standardize the project on the latest stable Next.js 16 version.

Do not blindly upgrade and assume everything works. First inspect the current versions of:

- `next`
- `react`
- `react-dom`
- `typescript`
- `eslint`
- `eslint-config-next`
- `prettier`

Then update the project to a clean Next.js 16-compatible setup.

Important Next.js 16 requirements:

- Do not use `next lint`. It has been removed in Next.js 16.
- Use ESLint directly through the ESLint CLI.
- Use ESLint flat config if appropriate.
- Remove any deprecated `eslint` config from `next.config.js` if present.
- Check whether the project uses old `middleware.ts`. If it does, review whether it needs to be migrated to the newer `proxy` convention.
- Check for deprecated Next.js config options.
- Check for any old `experimental.ppr` or `experimental_ppr` usage and remove/update it.
- Make sure the App Router pages remain crawlable and suitable for static/SSR SEO.
- Avoid adding unnecessary client components.
- Keep the site lightweight.

Recommended package scripts for Next.js 16:

```json id="1d768s"
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint .",
    "lint:fix": "eslint . --fix",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "typecheck": "tsc --noEmit"
  }
}
```

After upgrading, run:

- `npm run format:check`
- `npm run lint`
- `npm run typecheck`
- `npm run build`

Fix all issues before finalizing.

In the final summary, report:

- Final Next.js version
- Final React version
- Whether ESLint uses CLI instead of `next lint`
- Whether Prettier is configured
- Whether build/lint/typecheck/format check passed
- Any Next.js 16 migration changes made

My recommendation: **Next.js 16 + static-first App Router + ESLint CLI + Prettier**. That is better than staying on old Next.js or going back to raw HTML.

[1]: https://nextjs.org/docs/app/guides/upgrading/version-16?utm_source=chatgpt.com 'Upgrading: Version 16'

20. Add a review status system for submitted tools.

Statuses:

- pending
- claimed
- reviewed
- verified
- rejected

Badge logic:

Do not show a tool as “Verified” just because the submitter checked boxes.

Only show “Verified” if the admin/manual review confirms the claims.

If a tool is not open source, show “Not Open Source” or simply do not show the Open Source badge.

If a tool has ads, do not show the No Ads badge.

If a tool is not free forever, do not show the Free Forever badge.

Add a small note on tool cards:

“Badges are based on submitted information and manual review where possible.”

For tools where source code is unavailable, show:

“Source not public — privacy claims are based on the developer’s public statements and our basic review.”
