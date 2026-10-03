# To Do

- Change the `www.nouploadtools.com` redirect from temporary `307` to permanent `301` or `308` at the hosting/DNS layer.
- Submit the updated sitemap in Google Search Console after deployment.

## Submission hardening follow-up

- Complete one normal browser submission at https://nouploadtools.com/submit with a real Turnstile token. The automation browser was rejected with code 600010; no verification record was created. Confirm the pending tool/private log pair and remove a disposable verification record afterward.
- Keep Cloudflare proxy ranges in lib/turnstile.ts current with https://www.cloudflare.com/ips-v4/ and https://www.cloudflare.com/ips-v6/; this prevents trusting unverified visitor-IP headers or limiting shared proxy addresses.
- Review the existing locked dependency vulnerabilities from npm ci separately; no dependency upgrades were made in this scoped pass.
- Review the pre-existing Supabase generate_slug/set_slug search-path advisor warnings separately.
