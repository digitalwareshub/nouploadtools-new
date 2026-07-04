import type { Metadata } from 'next';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'NoUploadTools privacy policy. We collect minimal data — tool submission emails only. No file uploads, no tracking pixels, no ad networks.',
  alternates: { canonical: 'https://nouploadtools.com/privacy' },
  openGraph: {
    title: 'Privacy Policy — NoUploadTools',
    description:
      'NoUploadTools privacy policy. Minimal data collection. No tracking pixels. No ads.',
    url: 'https://nouploadtools.com/privacy',
  },
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: 36 }}>
      <h2
        style={{ fontSize: '1.1rem', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 10 }}
      >
        {title}
      </h2>
      {children}
    </section>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontSize: 14, color: 'var(--text-2)', lineHeight: 1.75, marginBottom: 10 }}>
      {children}
    </p>
  );
}

export default function PrivacyPage() {
  return (
    <>
      <Nav />
      <Breadcrumbs items={[{ label: 'Privacy Policy', href: '/privacy' }]} />
      <main style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 24px 80px' }}>
        <h1
          style={{
            fontSize: 'clamp(1.5rem, 3vw, 2rem)',
            fontWeight: 700,
            letterSpacing: '-0.03em',
            marginBottom: 8,
          }}
        >
          Privacy Policy
        </h1>
        <p style={{ fontSize: 12, color: 'var(--text-3)', marginBottom: 40 }}>
          Last updated: June 28, 2026 · Operated by Digiwares
        </p>

        <Section title="Overview">
          <P>
            This policy explains exactly what we collect, why, and what we do with it. NoUploadTools
            is operated by Digiwares. Contact:{' '}
            <a href="mailto:write@digiwares.xyz" style={{ color: 'var(--accent)' }}>
              write@digiwares.xyz
            </a>
          </P>
          <P>
            NoUploadTools does not require accounts to browse the directory. NoUploadTools does not
            upload user files for directory browsing. NoUploadTools does not use ads, ad networks,
            or third-party tracking scripts. We use privacy-friendly hosting analytics from Vercel —
            no cookies, no cross-site tracking, no individual profiling.
          </P>
        </Section>

        <Section title="What we collect">
          <P>
            <strong>Tool submissions:</strong> When you submit a tool via the submit form, we store
            your email address, optional name/handle, and the tool details you provide. This data is
            used only to review and communicate about your submission.
          </P>
          <P>
            <strong>Server logs:</strong> Our hosting provider (Vercel) may retain server logs for
            security and abuse prevention. We do not control this data.
          </P>
          <P>
            <strong>Vercel Analytics:</strong> We use Vercel Analytics for basic traffic metrics
            (page views, referrers). This is privacy-friendly and does not use cookies or
            fingerprinting.
          </P>
        </Section>

        <Section title="What we do not collect">
          <P>
            We do not collect your files. We do not use Google Analytics, Google AdSense, Meta
            Pixel, Microsoft Clarity, Hotjar, or any other third-party tracking or advertising
            scripts. We do not sell your data. We do not build profiles on individual visitors.
          </P>
        </Section>

        <Section title="Third-party tools in the directory">
          <P>
            External tools listed in our directory are third-party websites with their own privacy
            practices. We do not control them. You should review the privacy policy and/or source
            code of any external tool before using it with sensitive files.
          </P>
          <P>
            Our verification badges are best-effort indicators based on our review at the time of
            listing. They are not security certifications. We cannot guarantee the ongoing accuracy,
            security, availability, or privacy practices of third-party tools.
          </P>
        </Section>

        <Section title="Data retention">
          <P>
            Tool submission data is retained as long as the tool is under review or listed in the
            directory. If a submission is rejected, data may be retained briefly to prevent
            re-submission of the same URL, then deleted.
          </P>
        </Section>

        <Section title="Your rights">
          <P>
            You may request deletion of your submission data at any time by emailing{' '}
            <a href="mailto:write@digiwares.xyz" style={{ color: 'var(--accent)' }}>
              write@digiwares.xyz
            </a>
            . We will respond within 30 days.
          </P>
        </Section>

        <Section title="Changes to this policy">
          <P>
            We may update this policy. Significant changes will be noted with an updated date at the
            top of this page. Continued use of the site after changes constitutes acceptance.
          </P>
        </Section>

        <div
          style={{
            marginTop: 48,
            padding: '20px 24px',
            border: '1px solid var(--border)',
            borderRadius: 10,
            background: 'var(--bg-card)',
            fontSize: 13,
            color: 'var(--text-2)',
          }}
        >
          <strong>Operated by:</strong> Digiwares ·{' '}
          <a href="mailto:write@digiwares.xyz" style={{ color: 'var(--accent)' }}>
            write@digiwares.xyz
          </a>
        </div>
      </main>
      <Footer />
    </>
  );
}
