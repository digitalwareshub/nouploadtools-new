# NoUploadTools

A curated directory of privacy-first browser-based tools — open source, no login, no ads, and designed to avoid unnecessary file uploads.

**Live site:** [nouploadtools.com](https://nouploadtools.com)

---

## What is NoUploadTools?

Most online tools send your files to a server to process them. NoUploadTools lists tools that process files locally in your browser — using WebAssembly, client-side JavaScript, or offline-capable web apps — so your files never leave your device unnecessarily.

Every tool in the directory is manually reviewed before listing.

---

## Tech stack

- [Next.js 16](https://nextjs.org/) — App Router, static-first with ISR
- [TypeScript](https://www.typescriptlang.org/) — strict mode
- [Supabase](https://supabase.com/) — tool listings and form submissions (REST API, no SDK)
- [Vercel](https://vercel.com/) — hosting and analytics
- ESLint + Prettier

---

## Local development

**Requirements:** Node.js 18+

```bash
git clone https://github.com/digitalwareshub/nouploadtools-new.git
cd nouploadtools-new
npm install
cp .env.example .env.local
# Fill in your Supabase credentials in .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Environment variables

| Variable                        | Description                   |
| ------------------------------- | ----------------------------- |
| `NEXT_PUBLIC_SUPABASE_URL`      | Your Supabase project URL     |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon/public key |

Get these from your Supabase dashboard → Project Settings → API.

The anon key is safe to use client-side as long as Row Level Security (RLS) is enabled on your tables.

---

## Available scripts

```bash
npm run dev          # Start development server
npm run build        # Production build
npm run lint         # ESLint
npm run typecheck    # TypeScript check
npm run format       # Prettier format
npm run format:check # Check formatting
```

---

## How tool submissions work

1. A visitor submits a tool via `/submit`
2. The form writes to Supabase with `status = 'pending'`
3. We manually review the submission
4. Approved tools appear in the directory (`status = 'approved'`)
5. Rejected tools are not shown publicly

The public directory only queries `status = approved`. Pending and rejected tools are never shown.

---

## Tracking checker

The `/tracking-checker` page scans a URL for common analytics, ad, and tracking scripts.

- The scan runs server-side via `/api/check-tracking`
- The browser never directly contacts the target site
- SSRF protection: DNS resolution + IP validation before fetch, manual redirect handling
- Stateless: no URLs or results are stored
- HTML-only scan: trackers loaded after JavaScript execution are not detected

See [docs/tracking-checker.md](docs/tracking-checker.md) for full architecture notes.

---

## How to submit a tool

Use the [submit form](https://nouploadtools.com/submit) on the site.

Tools are more likely to be approved if they:

- Process files client-side (WebAssembly, JS)
- Have a public GitHub repo
- Require no account or login for core use
- Have no advertising
- Have a clear, specific use case

---

## Review criteria

See [How We Review](https://nouploadtools.com/how-we-review) for the full criteria. In short:

- Does it avoid unnecessary file uploads?
- Does it work without login?
- Does it have ads or tracking scripts?
- Is the source code public?

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

---

## Security

See [SECURITY.md](SECURITY.md) for how to report security issues.

---

## License

MIT — see [LICENSE](LICENSE).

---

## Contact

write@digiwares.xyz · [nouploadtools.com/contact](https://nouploadtools.com/contact)

A [Digiwares](https://digiwares.xyz) project.
