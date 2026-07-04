# Contributing to NoUploadTools

Thank you for your interest in contributing.

## What this project is

NoUploadTools is a curated directory of privacy-first browser-based tools. The goal is to help people find tools that avoid unnecessary file uploads, logins, ads, and tracking.

## How to contribute

### Suggest a tool

The easiest way to contribute a tool is through the [submit form](https://nouploadtools.com/submit) on the site. All submissions are reviewed manually before going live.

### Report a broken link or incorrect listing

Email [write@digiwares.xyz](mailto:write@digiwares.xyz) or open an issue on GitHub.

### Code contributions

1. Fork the repo
2. Create a branch (`git checkout -b your-feature`)
3. Make your changes
4. Run checks: `npm run lint && npm run typecheck && npm run build`
5. Open a pull request with a clear description

## Principles — please read before contributing

**No ads or tracking.** Do not add advertising networks, analytics pixels, affiliate tracking, or any third-party tracking scripts. This project's promise is no ads and no unnecessary tracking.

**Privacy-first tools only.** Do not add tools that upload user files unnecessarily, require login for basic use, or collect data beyond what is needed.

**No dark patterns.** Do not add fake urgency, misleading copy, bait-and-switch freemium, or manipulative UI patterns.

**No AI-generated thin content.** Do not add pages or descriptions generated purely for SEO without real value.

**No fake verification claims.** Do not claim tools are verified, audited, or certified beyond what has actually been checked.

**Accurate wording.** Use "designed to", "claims to", or "listed as" where full verification is not possible. Do not say "100% safe", "fully secure", or "completely private" without evidence.

## Code style

- TypeScript strict mode is required — no `any` unless unavoidable
- ESLint and Prettier must pass: `npm run lint && npm run format:check`
- No unnecessary comments — only comment non-obvious WHY, not WHAT

## Contact

write@digiwares.xyz
