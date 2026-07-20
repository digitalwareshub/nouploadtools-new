# Changes

## 2026-07-20

- Updated IndexNow sitemap submissions to include the SEO guide pages from the shared landing-page configuration.
- Added four focused SEO guide pages:
  - `/no-upload-pdf-tools`
  - `/privacy-first-image-tools`
  - `/client-side-developer-tools`
  - `/offline-browser-tools`
- Added shared SEO landing-page configuration for guide copy, matching filters, verification checks, and FAQs.
- Added the new guide pages to the sitemap.
- Added `SearchAction` structured data to the site-wide `WebSite` schema.
- Updated the directory structured data from a standalone `ItemList` to a `CollectionPage` with an `ItemList` main entity.
- Added `FAQPage` and `HowTo` structured data to the tracking checker page.
- Expanded the tracking checker page with first-pass privacy-check guidance, tracker categories, manual verification steps, and FAQs.
- Updated homepage category links and footer guide links to point to the new intent-focused SEO pages.
- Replaced internal anchor links with Next.js `Link` components where lint required it.
- Removed the build-time Google Fonts dependency and switched the app to a local system font stack.
- Hardened approved-tool fetching so build-time Supabase network failures do not crash static generation.
