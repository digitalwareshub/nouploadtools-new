import type { Metadata } from 'next';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { getApprovedTools } from '@/lib/supabase';

export const metadata: Metadata = {
  title: "NoUploadTools — Privacy-First Web Tools That Don't Upload Your Files",
  description:
    'A curated directory of open-source, no-login, no-ads web tools that work locally in your browser whenever possible.',
  alternates: { canonical: 'https://nouploadtools.com/' },
  openGraph: {
    title: "NoUploadTools — Privacy-First Web Tools That Don't Upload Your Files",
    description:
      'A curated directory of open-source, no-login, no-ads web tools that work locally in your browser.',
    url: 'https://nouploadtools.com/',
  },
};

export default async function HomePage() {
  const tools = await getApprovedTools();
  const ossCount = tools.filter((t) => t.is_open_source).length;

  const homePageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: "NoUploadTools — Privacy-First Web Tools That Don't Upload Your Files",
    url: 'https://nouploadtools.com/',
    description:
      'A curated directory of open-source, no-login, no-ads web tools that work locally in your browser whenever possible.',
    isPartOf: { '@type': 'WebSite', url: 'https://nouploadtools.com' },
    about: {
      '@type': 'Thing',
      name: 'Privacy-first browser-based tools',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homePageSchema) }}
      />
      <Nav />
      <main>
        {/* HERO */}
        <header style={{ maxWidth: 1100, margin: '0 auto', padding: '60px 24px 44px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              background: 'var(--green-bg)',
              border: '1px solid var(--green-br)',
              color: 'var(--green)',
              borderRadius: 100,
              fontSize: 12,
              fontWeight: 600,
              padding: '4px 12px',
              marginBottom: 18,
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: 'var(--green)',
                display: 'inline-block',
              }}
            />
            No unnecessary file uploads
          </div>

          <h1
            style={{
              fontSize: 'clamp(1.8rem, 4vw, 2.7rem)',
              fontWeight: 700,
              lineHeight: 1.15,
              letterSpacing: '-0.03em',
              maxWidth: 620,
              marginBottom: 14,
            }}
          >
            Privacy-First Web Tools That Don&apos;t Upload Your Files
          </h1>

          <p
            style={{
              fontSize: 15,
              color: 'var(--text-2)',
              maxWidth: 520,
              lineHeight: 1.65,
              marginBottom: 32,
            }}
          >
            A curated directory of browser-based tools — PDF tools, image utilities, text tools,
            developer utilities, and encryption tools — that avoid unnecessary uploads, forced
            accounts, ads, and tracking.
          </p>

          <div style={{ display: 'flex', gap: 36, flexWrap: 'wrap', marginBottom: 32 }}>
            <div>
              <div
                style={{
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  letterSpacing: '-0.03em',
                  lineHeight: 1,
                }}
              >
                {tools.length || '—'}
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 3 }}>Listed tools</div>
            </div>
            <div>
              <div
                style={{
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  letterSpacing: '-0.03em',
                  lineHeight: 1,
                }}
              >
                {ossCount || '—'}
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 3 }}>Open source</div>
            </div>
            <div>
              <div
                style={{
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  letterSpacing: '-0.03em',
                  lineHeight: 1,
                }}
              >
                8
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 3 }}>Categories</div>
            </div>
          </div>

          <div
            style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'flex-start' }}
          >
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
              <Link
                href="/directory"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  background: 'var(--accent)',
                  color: '#fff',
                  padding: '10px 22px',
                  borderRadius: 'var(--radius)',
                  fontSize: 14,
                  fontWeight: 600,
                }}
              >
                Browse directory →
              </Link>
              <a
                href="https://github.com/digitalwareshub/nouploadtools-new"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  color: 'var(--text-2)',
                  padding: '10px 18px',
                  borderRadius: 'var(--radius)',
                  fontSize: 13,
                  fontWeight: 600,
                }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12" />
                </svg>
                Open source
              </a>
            </div>
            <Link
              href="/tracking-checker"
              style={{ fontSize: 13, color: 'var(--accent)', fontWeight: 500 }}
            >
              Check a website for trackers →
            </Link>
          </div>
        </header>

        {/* TRUST PRINCIPLES */}
        <section
          style={{
            borderTop: '1px solid var(--border)',
            background: 'var(--bg-card)',
            padding: '52px 24px',
          }}
        >
          <div
            style={{
              maxWidth: 1100,
              margin: '0 auto',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 36,
            }}
          >
            <div>
              <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 6 }}>
                Privacy by architecture
              </h3>
              <p style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.65 }}>
                Tools are reviewed for local processing, offline support, open-source availability,
                and clear disclosure of any API calls. The goal is to make privacy visible, not
                hidden in fine print.
              </p>
            </div>
            <div>
              <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 6 }}>
                Open source = verifiable
              </h3>
              <p style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.65 }}>
                Tools marked Open Source link directly to their public repository. Anyone can
                inspect the code and confirm the no-upload claim is real, not just marketing.
              </p>
            </div>
            <div>
              <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 6 }}>
                Curated, not scraped
              </h3>
              <p style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.65 }}>
                Every tool is manually reviewed before listing. We check the privacy policy, test
                the tool where possible, and look for signs that the submitted claims are accurate.
                If something changes we update or remove it.
              </p>
            </div>
          </div>
        </section>

        {/* WHY NO-UPLOAD */}
        <section style={{ maxWidth: 1100, margin: '0 auto', padding: '52px 24px' }}>
          <h2
            style={{
              fontSize: 'clamp(1.4rem, 3vw, 1.9rem)',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              marginBottom: 12,
            }}
          >
            Why no-upload tools matter
          </h2>
          <p
            style={{
              fontSize: 15,
              color: 'var(--text-2)',
              maxWidth: 680,
              lineHeight: 1.7,
              marginBottom: 24,
            }}
          >
            When you upload a file to a web tool, you lose control of it. It may be stored on a
            server, scanned for training data, or retained longer than the privacy policy admits.
            Browser-based tools can reduce this risk significantly when processing happens locally
            on your device.
          </p>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: 12,
            }}
          >
            {[
              {
                icon: '🔒',
                label: 'No login required',
                desc: 'Zero accounts. Zero profiles. No ad trackers.',
              },
              {
                icon: '📴',
                label: 'Works offline',
                desc: 'Many tools function without an internet connection after first load.',
              },
              {
                icon: '🆓',
                label: 'Free forever',
                desc: 'No freemium traps. No credit card required.',
              },
              {
                icon: '📖',
                label: 'Open source preferred',
                desc: 'Public code anyone can audit and verify.',
              },
            ].map((item) => (
              <div
                key={item.label}
                style={{
                  border: '1px solid var(--border)',
                  borderRadius: 10,
                  padding: 18,
                  background: 'var(--bg-card)',
                }}
              >
                <div style={{ fontSize: 22, marginBottom: 8 }}>{item.icon}</div>
                <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>{item.label}</div>
                <div style={{ fontSize: 13, color: 'var(--text-2)' }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* EXAMPLES FROM DIRECTORY */}
        <section style={{ borderTop: '1px solid var(--border)', padding: '52px 24px' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <h2
              style={{
                fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)',
                fontWeight: 700,
                letterSpacing: '-0.03em',
                marginBottom: 6,
              }}
            >
              Examples from the directory
            </h2>
            <p style={{ fontSize: 14, color: 'var(--text-2)', marginBottom: 24 }}>
              A few privacy-first tools already listed on NoUploadTools.
            </p>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: 12,
                marginBottom: 24,
              }}
            >
              {tools.slice(0, 6).map((t) => {
                const dm = (() => {
                  try {
                    return new URL(t.url).hostname.replace('www.', '');
                  } catch {
                    return t.url;
                  }
                })();
                const badges = [
                  t.is_no_upload && 'No upload',
                  t.is_open_source && 'Open source',
                  t.is_zero_login && 'No login',
                  t.is_no_ads && 'No ads',
                ]
                  .filter(Boolean)
                  .slice(0, 3) as string[];
                return (
                  <a
                    key={t.id}
                    href={`/go/${t.slug}?source=homepage`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 8,
                      padding: 16,
                      border: '1px solid var(--border)',
                      borderRadius: 10,
                      background: 'var(--bg-card)',
                      textDecoration: 'none',
                      color: 'inherit',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={
                          t.favicon_url || `https://www.google.com/s2/favicons?domain=${dm}&sz=32`
                        }
                        alt=""
                        width={24}
                        height={24}
                        style={{ borderRadius: 4, flexShrink: 0 }}
                      />
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 600 }}>{t.name}</div>
                        <div style={{ fontSize: 11, color: 'var(--text-3)' }}>{dm}</div>
                      </div>
                    </div>
                    <p
                      style={{
                        fontSize: 12,
                        color: 'var(--text-2)',
                        lineHeight: 1.5,
                        margin: 0,
                      }}
                    >
                      {t.tagline}
                    </p>
                    {badges.length > 0 && (
                      <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                        {badges.map((b) => (
                          <span
                            key={b}
                            style={{
                              fontSize: 10,
                              fontWeight: 600,
                              padding: '2px 7px',
                              borderRadius: 4,
                              background: 'var(--accent-bg)',
                              color: 'var(--accent)',
                              border: '1px solid var(--accent-br)',
                              letterSpacing: '.03em',
                            }}
                          >
                            {b.toUpperCase()}
                          </span>
                        ))}
                      </div>
                    )}
                    <div style={{ fontSize: 10, color: 'var(--text-3)' }}>
                      {t.clickCount === 1 ? '1 click' : `${t.clickCount ?? 0} clicks`}
                    </div>
                  </a>
                );
              })}
            </div>
            <Link
              href="/directory"
              style={{ fontSize: 13, fontWeight: 600, color: 'var(--accent)' }}
            >
              View full directory →
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
