Paste this into Claude Code after the current work is done:

```txt
Please also do a full SEO audit and SEO implementation pass for NoUploadTools.

This site is now positioned as a privacy-first directory of web tools that do not upload user files unnecessarily.

Main SEO goal:
NoUploadTools should rank for searches around no-upload tools, client-side tools, offline browser tools, privacy-first web tools, no-login tools, and free open-source utility tools.

Do not turn the site into an SEO spam directory. Keep the content useful, human, and trustworthy.

1. Run a current SEO audit

Audit the current implementation and report:

- Current title tags on all public pages
- Current meta descriptions
- Current Open Graph titles/descriptions/images
- Current Twitter card metadata
- Current canonical URLs
- Current sitemap entries
- Current robots.txt
- Whether pages are indexable
- Whether any broken internal links exist
- Whether `.html` redirects are working
- Whether old tool URLs are still referenced anywhere
- Whether directory cards are crawlable server-side
- Whether submit/contact/privacy/terms/how-we-review pages are linked from footer/header
- Whether the homepage clearly targets the new positioning
- Whether the directory page has enough crawlable text
- Whether tracking-checker page has proper metadata
- Whether any old ad-supported/tool-site SEO copy remains
- Whether any metadata conflicts with the no-ads/no-upload/privacy-first promise

Give me a clear audit summary before/after the fixes.

2. Add JSON-LD structured data

Add JSON-LD schema where appropriate.

Use Next.js-safe implementation.

Do not overdo schema. Only add truthful schema.

Recommended schema:

A. Homepage

Use `WebSite` schema.

Include:
- site name: NoUploadTools
- url: https://nouploadtools.com
- description: privacy-first directory of no-upload browser tools
- potentialAction search action only if site search exists. If there is no real search page/query route, do not add SearchAction yet.

B. Organization or Person

Use either `Organization` or `Person`, whichever is more honest.

Since this is a small independent project, `Organization` can be simple:

- name: NoUploadTools
- url: https://nouploadtools.com
- contactPoint only if appropriate
- email: write@digiwares.xyz

Do not add fake logo, fake company address, fake social links, fake founder profile, fake sameAs links, or fake corporate details.

C. Directory page

Use `CollectionPage` schema.

The directory page should represent a collection of privacy-first tools.

D. Individual tool cards/pages

If individual `/tools/[slug]` pages do not exist, do not create fake per-tool schema.

If individual tool pages exist later, use `SoftwareApplication` schema only when enough information is available.

For each tool, only include truthful fields:
- name
- description
- applicationCategory if known
- operatingSystem if known, otherwise omit
- url
- offers only if pricing is clear
- isAccessibleForFree only if true

Do not claim tools are open-source, offline, no-login, or no-ads in schema unless the data supports it.

E. Tracking checker page

Use `WebApplication` or `SoftwareApplication` schema only if appropriate.

Name:
Website Tracking Checker

Description:
A basic webpage scanner that checks visible HTML for common analytics, ad, and tracking scripts.

Make clear in the page content that it is a basic scan, not a complete security audit.

F. Breadcrumb schema

Add `BreadcrumbList` schema for pages where useful:

- Directory
- Submit
- How We Review
- Privacy
- Terms
- Contact
- Tracking Checker

3. Add or update canonical URLs

Every public page should have a canonical URL.

Preferred canonical format:

- https://nouploadtools.com/
- https://nouploadtools.com/directory
- https://nouploadtools.com/submit
- https://nouploadtools.com/how-we-review
- https://nouploadtools.com/contact
- https://nouploadtools.com/privacy
- https://nouploadtools.com/terms
- https://nouploadtools.com/tracking-checker

Do not canonicalize to `.html` URLs.

4. SEO page titles and meta descriptions

Use these as starting points. Improve only if needed, but keep them simple and accurate.

Homepage:

Title:
NoUploadTools — Privacy-First Web Tools That Don’t Upload Your Files

Description:
A curated directory of open-source, no-login, no-ads web tools that work locally in your browser whenever possible.

Directory:

Title:
Directory — NoUploadTools

Description:
Browse privacy-first browser tools that are no-login, no-ads, free, open-source where possible, and designed to avoid unnecessary file uploads.

Submit:

Title:
Submit a Tool — NoUploadTools

Description:
Submit an open-source, no-login, no-ads, privacy-first web tool for review in the NoUploadTools directory.

How We Review:

Title:
How Tools Are Reviewed — NoUploadTools

Description:
Learn how NoUploadTools reviews submitted tools for login requirements, ads, file uploads, offline support, open-source availability, and privacy claims.

Tracking Checker:

Title:
Website Tracking Checker — NoUploadTools

Description:
Check a webpage for common analytics, ad, and tracking scripts using a basic static HTML scan.

Contact:

Title:
Contact — NoUploadTools

Description:
Contact NoUploadTools for tool submission questions, corrections, broken links, privacy concerns, or general feedback.

Privacy:

Title:
Privacy Policy — NoUploadTools

Description:
Read how NoUploadTools handles privacy, tool submissions, external links, server logs, and third-party listed tools.

Terms:

Title:
Terms — NoUploadTools

Description:
Read the terms for using NoUploadTools, a directory of privacy-first web tools and external resources.

5. Suggested SEO keyword themes

Use these naturally across the site. Do not keyword-stuff.

Primary keyword themes:

- no upload tools
- privacy-first web tools
- browser tools that do not upload files
- offline browser tools
- client-side web tools
- no-login web tools
- free browser tools
- open-source web tools
- no ads web tools
- local-first web tools
- privacy tools directory
- no upload file tools
- tools that work in your browser
- tools that process files locally

Long-tail keywords to naturally include:

- free tools that do not upload your files
- browser tools that work without login
- web tools that work offline
- privacy-friendly alternatives to online tools
- client-side tools for PDF, image, text and developer tasks
- open-source tools that run in the browser
- no-login no-ads browser tools
- tools that process files locally in your browser
- safe online tools for sensitive files
- privacy-first tool directory for developers
- no upload PDF tools
- no upload image tools
- no upload text tools
- local browser utilities for developers
- website tracking checker
- check website tracking scripts
- check if a site uses Google Analytics
- check if a website has ads or trackers
- find analytics and tracking scripts on a website

6. Page-level keyword suggestions

Homepage should naturally target:

- privacy-first web tools
- no upload tools
- browser tools that do not upload files
- no-login tools
- no-ads tools
- client-side tools

Directory page should naturally target:

- directory of privacy-first tools
- no-upload tool directory
- open-source browser tools
- free no-login tools
- offline web tools

Submit page should naturally target:

- submit privacy-first tool
- submit open-source web tool
- submit no-login browser tool
- no ads tool directory submission

How We Review page should naturally target:

- how privacy tools are reviewed
- client-side tool verification
- open-source privacy tool review
- no-upload tool verification

Tracking Checker page should naturally target:

- website tracking checker
- check tracking scripts
- check website analytics scripts
- check if website uses ads
- check third-party scripts
- privacy scanner for websites

7. Add helpful content sections without making pages bloated

Homepage should have short sections like:

- What is NoUploadTools?
- Why no-upload tools matter
- What kind of tools are listed?
- What the badges mean
- Submit a privacy-first tool

Directory page should include a short intro explaining the badge system.

Tracking checker page should include:
- what it checks
- what it cannot detect
- why client-side privacy matters
- a clear disclaimer that it is not a full security audit

How We Review should include:
- review principles
- badge explanation
- limitations
- how developers can improve their listing

8. Badge SEO copy

Add a short explanation of badges somewhere crawlable.

Badges:

- No Upload: The tool is designed to avoid sending user files to a server.
- Zero Login: The tool can be used without creating an account.
- No Ads: The tool does not display advertising.
- Works Offline: The tool can function without an internet connection after loading or installation.
- Client-side: Processing happens in the browser or on the user’s device where possible.
- Open Source: Source code is publicly available for review.
- Free Forever: The submitted version is expected to remain free to use.

Be careful with wording. Use “designed to”, “claims to”, or “listed as” where full verification is not possible.

9. Internal linking

Make sure the following internal links exist naturally:

Homepage links to:
- Directory
- Submit
- How We Review
- Tracking Checker

Directory links to:
- Submit
- How We Review
- Tracking Checker

Submit links to:
- How We Review
- Directory

Tracking Checker links to:
- Directory
- How We Review

Footer links:
- Directory
- Submit
- How We Review
- Tracking Checker
- Privacy
- Terms
- Contact

10. Sitemap

Update sitemap so it includes only real indexable pages.

Include:

- /
- /directory
- /submit
- /how-we-review
- /tracking-checker
- /contact
- /privacy
- /terms

If individual tool pages exist later, include only approved public tools with real pages.

Do not include:
- pending tools
- rejected tools
- old broken tool routes
- .html versions
- API routes

11. Robots.txt

Make sure robots.txt allows crawling of public pages.

Disallow:
- /api/
- any admin routes if present
- any preview or internal routes if present

Sitemap should point to:
https://nouploadtools.com/sitemap.xml

12. Open Graph image

If there is no OG image, create or configure one later.

For now, if no good OG image exists, do not fake one.

If implementing a simple dynamic OG image, it should say:

NoUploadTools
Privacy-first web tools that don’t upload your files

Keep it simple and readable.

13. Important SEO warnings

Do not create hundreds of thin pages.

Do not generate fake tool pages.

Do not keyword-stuff.

Do not add AI-generated long content just for SEO.

Do not make claims like “100% safe” or “fully secure”.

Do not say all listed tools are verified unless they actually are.

Do not say “no tracking” if any tracking script exists.

Do not say “no ads” if ads are added later.

Do not add AdSense or analytics during this SEO pass.

14. Final SEO report

After implementation, give me a clear report with:

- All public routes
- Final title tag for each route
- Final meta description for each route
- Canonical URL for each route
- JSON-LD schema added per route
- Sitemap entries
- Robots.txt rules
- Internal links added/fixed
- SEO keywords used on homepage
- SEO keywords used on directory page
- SEO keywords used on tracking checker page
- Any old SEO copy removed
- Any broken links found/fixed
- Any remaining SEO TODOs

15. Run final checks

After SEO work, run:

- npm run format:check
- npm run lint
- npm run typecheck
- npm run build

Fix all issues before final summary.
```

One extra note for you: **do not target “online tools” too broadly yet**. That keyword is too competitive and also attracts people who do not care about privacy. Your better angle is the sharper one:

**“tools that don’t upload your files”**

That is memorable, specific, and fits the domain perfectly.
