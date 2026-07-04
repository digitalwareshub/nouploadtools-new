# Security Policy

## Reporting a vulnerability

If you find a security vulnerability in NoUploadTools — including but not limited to SSRF, XSS, injection, authentication bypass, or data exposure — please report it privately before disclosing it publicly.

**Email:** write@digiwares.xyz  
**Subject line:** `[SECURITY] NoUploadTools — brief description`

Please include:
- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Any suggested fix (optional)

We will acknowledge your report within 3 business days and aim to resolve confirmed issues promptly.

## Please do not

- Publicly disclose the vulnerability before we have had a chance to address it
- Use the vulnerability to access, modify, or delete data
- Test against production in ways that could affect other users (e.g. flooding `/api/check-tracking`)

## Scope

The main areas of concern for this project are:

- **`/api/check-tracking`** — server-side URL fetch with SSRF protection. We are aware of the theoretical DNS-rebinding limitation and welcome practical reports.
- **Supabase RLS** — the public directory query uses the anon key. Service-role key is never exposed in client code.
- **Form submissions** — the submit form writes to Supabase. Pending submissions should not be publicly readable or modifiable.

## Out of scope

- Issues in third-party tools listed in the directory (report those to the tool authors)
- Theoretical issues without a working proof of concept
- Rate limiting (documented as a known TODO)

## Thank you

Security researchers help make privacy-focused projects more trustworthy. We appreciate responsible disclosure.
