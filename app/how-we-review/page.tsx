import type { Metadata } from 'next';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'How We Review',
  description:
    'How NoUploadTools evaluates and lists browser-based tools. Our review process, criteria, and what the badges actually mean.',
  alternates: { canonical: 'https://nouploadtools.com/how-we-review' },
  openGraph: {
    title: 'How We Review — NoUploadTools',
    description:
      'How NoUploadTools evaluates tools before listing them, and what our badges actually mean.',
    url: 'https://nouploadtools.com/how-we-review',
  },
};

const STEPS = [
  {
    heading: 'We check that files stay in your browser',
    body: "The core criterion. We look at what happens when you use the tool — does it send your file to a server, or does it process everything locally? We test this manually where possible, and for open source tools we also check the source code. If a tool's marketing says 'no upload' but the network tab shows outbound requests, it doesn't get listed.",
  },
  {
    heading: 'We check for login requirements',
    body: "Can you use the tool without creating an account? If a tool hides its core functionality behind a signup wall, it gets the 'requires login' note or is excluded. Minimal account options (like saving history) are fine as long as core use is available without signing in.",
  },
  {
    heading: 'We look for ads and tracking scripts',
    body: "We prefer tools with no advertising and minimal or no third-party tracking. A tool can still be listed if it has ads, but it won't carry the 'No Ads' badge. We note whether tracking scripts are present, but we're not able to certify the full privacy posture of every third party a tool uses.",
  },
  {
    heading: 'Open source is preferred, not required',
    body: "If a tool is open source, we note it with a badge and treat its privacy claims as more verifiable. If it's closed source, we still list it — we just rely more on stated policies and manual network testing rather than code inspection. You should apply more scrutiny to closed source tools before using them for sensitive data.",
  },
  {
    heading: 'We do not conduct security audits',
    body: "Being listed here is not a security endorsement. We don't audit code for vulnerabilities, we don't verify cryptographic implementations, and we don't certify that a tool is safe for all use cases. If you're processing sensitive personal, medical, legal, or financial data, you should review the tool's source code yourself or consult someone who can.",
  },
];

export default function HowWeReviewPage() {
  return (
    <>
      <Nav />
      <Breadcrumbs items={[{ label: 'How We Review', href: '/how-we-review' }]} />
      <main style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 24px 80px' }}>
        <div style={{ maxWidth: 680 }}>
          <h1
            style={{
              fontSize: 'clamp(1.5rem, 3vw, 2.1rem)',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              marginBottom: 14,
            }}
          >
            How we review tools
          </h1>

          <p style={{ fontSize: 15, color: 'var(--text-2)', lineHeight: 1.75, marginBottom: 48 }}>
            Every tool in this directory is reviewed before it goes live. Here&apos;s exactly what
            we check — and what we don&apos;t.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
            {STEPS.map((step, i) => (
              <div
                key={step.heading}
                style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}
              >
                <span
                  style={{
                    flexShrink: 0,
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    background: 'var(--accent-bg)',
                    border: '1px solid var(--accent-br)',
                    color: 'var(--accent)',
                    fontSize: 13,
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {i + 1}
                </span>
                <div>
                  <h2
                    style={{
                      fontSize: 16,
                      fontWeight: 650,
                      letterSpacing: '-0.01em',
                      marginBottom: 8,
                      color: 'var(--text)',
                    }}
                  >
                    {step.heading}
                  </h2>
                  <p style={{ fontSize: 14, color: 'var(--text-2)', lineHeight: 1.7 }}>
                    {step.body}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop: 52,
              padding: '20px 24px',
              border: '1px solid var(--border)',
              borderRadius: 10,
              background: 'var(--bg-card)',
            }}
          >
            <p
              style={{
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: '.07em',
                textTransform: 'uppercase',
                color: 'var(--text-3)',
                marginBottom: 10,
              }}
            >
              What the badges mean
            </p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                [
                  'NO UPLOAD',
                  "The tool's primary function works without sending your files to a server.",
                ],
                ['OPEN SOURCE', 'Source code is publicly available and we have verified the link.'],
                ['NO LOGIN', 'Core functionality is available without creating an account.'],
                ['NO ADS', 'No advertising was detected during our review.'],
                [
                  'OFFLINE OK',
                  'The tool can operate without a network connection after first load.',
                ],
                ['FREE FOREVER', 'The tool is free to use with no paywalled core features.'],
              ].map(([badge, desc]) => (
                <li
                  key={badge}
                  style={{ fontSize: 13, color: 'var(--text-2)', display: 'flex', gap: 10 }}
                >
                  <span
                    style={{
                      flexShrink: 0,
                      fontSize: 10,
                      fontWeight: 700,
                      padding: '2px 8px',
                      borderRadius: 4,
                      background: 'var(--accent-bg)',
                      color: 'var(--accent)',
                      border: '1px solid var(--accent-br)',
                      letterSpacing: '.04em',
                      alignSelf: 'flex-start',
                      marginTop: 1,
                    }}
                  >
                    {badge}
                  </span>
                  <span style={{ lineHeight: 1.55 }}>{desc}</span>
                </li>
              ))}
            </ul>
          </div>

          <div
            style={{
              marginTop: 48,
              padding: '20px 24px',
              border: '1px solid var(--border)',
              borderRadius: 10,
              background: 'var(--bg-card)',
            }}
          >
            <p
              style={{
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: '.06em',
                textTransform: 'uppercase',
                color: 'var(--text-3)',
                marginBottom: 8,
              }}
            >
              NoUploadTools is open source
            </p>
            <p style={{ fontSize: 14, color: 'var(--text-2)', lineHeight: 1.65, marginBottom: 12 }}>
              The directory itself is open source, so developers can review how submissions, badges,
              and the tracking checker work.
            </p>
            <a
              href="https://github.com/digitalwareshub/nouploadtools-new"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: 13, color: 'var(--accent)', fontWeight: 600 }}
            >
              View source on GitHub →
            </a>
          </div>

          <p style={{ fontSize: 13, color: 'var(--text-3)', lineHeight: 1.65, marginTop: 24 }}>
            Think a listed tool doesn&apos;t belong here, or want to flag an issue?{' '}
            <Link href="/contact" style={{ color: 'var(--accent)' }}>
              Contact us
            </Link>
            .
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
