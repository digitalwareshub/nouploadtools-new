import type { Metadata } from 'next';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with NoUploadTools for tool submission questions, corrections, or feedback.',
  alternates: { canonical: 'https://nouploadtools.com/contact' },
  openGraph: {
    title: 'Contact — NoUploadTools',
    description: 'Get in touch with NoUploadTools.',
    url: 'https://nouploadtools.com/contact',
  },
};

export default function ContactPage() {
  return (
    <>
      <Nav />
      <Breadcrumbs items={[{ label: 'Contact', href: '/contact' }]} />
      <main style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 24px 80px' }}>
        <div style={{ maxWidth: 680 }}>
          <h1
            style={{
              fontSize: 'clamp(1.5rem, 3vw, 2rem)',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              marginBottom: 12,
            }}
          >
            Contact NoUploadTools
          </h1>

          <p style={{ fontSize: 15, color: 'var(--text-2)', lineHeight: 1.75, marginBottom: 32 }}>
            Have a question, tool submission issue, correction request, or privacy concern? You can
            reach me at:
          </p>

          <a
            href="mailto:write@digiwares.xyz"
            style={{
              display: 'inline-block',
              fontSize: 18,
              fontWeight: 600,
              color: 'var(--accent)',
              marginBottom: 40,
            }}
          >
            write@digiwares.xyz
          </a>

          <div
            style={{
              border: '1px solid var(--border)',
              borderRadius: 10,
              padding: '20px 24px',
              background: 'var(--bg-card)',
              marginBottom: 32,
            }}
          >
            <p
              style={{
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: '.07em',
                textTransform: 'uppercase',
                color: 'var(--text-3)',
                marginBottom: 14,
              }}
            >
              Use this email for
            </p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                'Tool submission questions',
                'Updating or removing a listed tool',
                'Reporting a broken link',
                'Reporting a privacy or tracking concern about a listed tool',
                'General feedback',
              ].map((item) => (
                <li
                  key={item}
                  style={{
                    fontSize: 14,
                    color: 'var(--text-2)',
                    display: 'flex',
                    gap: 10,
                    lineHeight: 1.5,
                  }}
                >
                  <span style={{ color: 'var(--accent)', flexShrink: 0 }}>→</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <p style={{ fontSize: 13, color: 'var(--text-3)', lineHeight: 1.65 }}>
            I review messages manually, so replies may not be instant. I&apos;ll get back to you as
            soon as I can.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
