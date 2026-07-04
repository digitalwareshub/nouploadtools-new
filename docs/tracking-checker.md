# Tracking Checker — Architecture Notes

## Overview

The tracking checker is a two-part feature: a server-side API route that fetches and scans a target URL, and a client-side component that renders the results.

---

## 1. API Route — `app/api/check-tracking/route.ts` (POST)

Accepts a JSON body `{ url: string }`.

### SSRF Protection

Two-stage validation runs before any network call and before every redirect hop.

**Stage 1 — URL string validation:**

- Only `http:` and `https:` protocols are accepted
- Pure numeric hostnames (decimal IP bypass e.g. `2130706433`) are rejected
- Bare hostnames with no dot (e.g. `localhost`, `internal`) are rejected

**Stage 2 — DNS resolution and IP validation:**

- The hostname is resolved via `dns.resolve4` and `dns.resolve6`
- Every returned IP address is checked against private/reserved ranges:
  - `0.0.0.0/8`
  - `10.0.0.0/8`
  - `100.64.0.0/10` (shared address space)
  - `127.0.0.0/8` (loopback)
  - `169.254.0.0/16` (link-local)
  - `172.16.0.0/12`
  - `192.168.0.0/16`
  - `198.18.0.0/15` (benchmarking)
  - `224.0.0.0+` (multicast/reserved)
  - `::1` (IPv6 loopback)
  - `fc00::/7` (unique local)
  - `fe80::/10` (link-local)
- Unresolvable hostnames are rejected

If any resolved address is private, the request is rejected before a fetch is attempted.

### Manual Redirect Handling

`fetch` is called with `redirect: 'manual'` — redirects are **never followed automatically**. Each 3xx response extracts the `Location` header, resolves it against the current URL (to handle relative redirects), and runs the full SSRF validation again before following. Maximum 3 hops.

### Fetch

- 10-second timeout via `AbortSignal.timeout`
- 500KB response size cap (remainder discarded)
- Custom `User-Agent` header
- The browser does not directly contact the target website. The URL is sent to the NoUploadTools server-side API for a one-time scan.

### Content-Type Check

Non-HTML responses (`content-type` not containing `text/html`) are rejected with a 422 before the body is read.

### Tracker Detection

The raw HTML is scanned against a `TRACKER_PATTERNS` dictionary organised into four categories:

| Category          | Examples                                                                                           |
| ----------------- | -------------------------------------------------------------------------------------------------- |
| Analytics         | Google Analytics, GTM, Mixpanel, Segment, Hotjar, Plausible, Fathom, Amplitude, FullStory, Clarity |
| Advertising       | Google Syndication, DoubleClick, AdSense, Taboola, Outbrain                                        |
| Social / tracking | Facebook.net, TikTok                                                                               |
| Support widgets   | Intercom, Crisp                                                                                    |

### Third-party Script Domains

All `src` and `href` attributes are scanned for external domains. Capped at 30 in the response.

### Basic Scan Score

| Score | Meaning                             |
| ----- | ----------------------------------- |
| 100   | No common tracking scripts detected |
| 75    | 1 tracker found                     |
| 50    | 2–3 trackers found                  |
| 25    | 4–6 trackers found                  |
| 0     | 7 or more trackers found            |

This is a **basic scan score**, not a full privacy or security rating. Scripts loaded after JavaScript execution are not detected.

### Rate Limiting

Not yet implemented. A `TODO` is marked in the route. Should be added before high-traffic launch (e.g. per-IP rate limit via Upstash or similar).

### Response Shape

```json
{
  "url": "https://example.com",
  "score": 75,
  "totalTrackers": 1,
  "trackers": { "Analytics": ["google-analytics.com"] },
  "thirdPartyDomains": ["cdn.example.com"],
  "summary": "Found 1 tracking pattern in the page HTML.",
  "disclaimer": "Basic scan of static HTML only. Scripts loaded after JavaScript execution are not detected. NoUploadTools does not store submitted URLs or scan results. Hosting providers may retain standard request logs."
}
```

---

## 2. Client Component — `app/tracking-checker/TrackingCheckerClient.tsx`

Marked `'use client'`. Renders:

- URL input + submit button
- Basic scan score meter (colour-coded 0–100)
- List of trackers found with category labels
- Third-party script domain list
- Disclaimer text

Calls `POST /api/check-tracking` with the entered URL. No results are stored or logged by the application.

---

## Key Design Decisions

- **Server-side fetch**: the browser does not directly contact the target site. This avoids CORS issues. The target URL is sent in the POST body to the NoUploadTools API and is visible in the user's own browser devtools as part of that request — it is not hidden from the user.
- **DNS-level SSRF protection**: regex on the URL string is not sufficient. The hostname is resolved and every returned IP is validated before fetching. Every redirect hop is re-validated.
- **Manual redirect following**: `redirect: 'manual'` prevents Node/fetch from silently following a redirect to a private IP.
- **Stateless**: no URLs, results, or user data are stored in a database. Vercel may retain standard hosting request logs.
- **HTML-only scan**: this is disclosed in the UI and the API response disclaimer.

---

## Known Limitations

- Scripts loaded via JavaScript after page load are not detected
- DNS-rebinding attacks (where a hostname resolves to a public IP at check time but a private IP at fetch time) are not fully mitigated without a custom HTTP client that re-validates the connection IP
- Rate limiting is not yet implemented
