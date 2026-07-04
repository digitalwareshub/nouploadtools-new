import type { Metadata } from 'next';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    'Terms of service for NoUploadTools. Free tool directory. No warranties on third-party tools. Submit tools in good faith.',
  alternates: { canonical: 'https://nouploadtools.com/terms' },
  openGraph: {
    title: 'Terms of Service — NoUploadTools',
    description: 'Terms of service for NoUploadTools.',
    url: 'https://nouploadtools.com/terms',
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

export default function TermsPage() {
  return (
    <>
      <Nav />
      <Breadcrumbs items={[{ label: 'Terms of Service', href: '/terms' }]} />
      <main style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 24px 80px' }}>
        <h1
          style={{
            fontSize: 'clamp(1.5rem, 3vw, 2rem)',
            fontWeight: 700,
            letterSpacing: '-0.03em',
            marginBottom: 8,
          }}
        >
          Terms of Service
        </h1>
        <p style={{ fontSize: 12, color: 'var(--text-3)', marginBottom: 40 }}>
          Last updated: June 28, 2026 · Operated by Digiwares
        </p>

        <Section title="What NoUploadTools is">
          <P>
            NoUploadTools is a curated directory of browser-based, privacy-friendly web tools. It is
            a resource, not a tool platform. The tools listed here are third-party tools unless
            explicitly stated otherwise.
          </P>
        </Section>

        <Section title="No warranties on third-party tools">
          <P>
            NoUploadTools does not guarantee the accuracy, security, availability, or privacy
            practices of any third-party tool listed in the directory. Verification badges are
            best-effort indicators based on our review at the time of listing — they are not
            security certifications.
          </P>
          <P>
            You are responsible for reviewing any tool before using it with sensitive, personal, or
            confidential data. We strongly recommend reviewing the source code of open-source tools
            for sensitive use cases.
          </P>
        </Section>

        <Section title="Submitting tools">
          <P>
            Developers submitting tools must provide accurate, truthful information. Submitting
            false claims about a tool&apos;s privacy properties (e.g. claiming no-upload when files
            are uploaded) may result in immediate removal and being blocked from future submissions.
          </P>
          <P>
            NoUploadTools reserves the right to reject, remove, or modify any listing at any time
            without notice, for any reason including but not limited to: inaccurate claims, tool no
            longer functions, privacy practices have changed, or the tool no longer aligns with the
            directory&apos;s standards.
          </P>
        </Section>

        <Section title="Review status">
          <P>
            Tools in the directory may carry one of the following statuses: pending, claimed,
            reviewed, verified, or rejected. &quot;Verified&quot; status is only assigned after
            manual review by the NoUploadTools team confirms the submitted claims. Submitter-checked
            boxes alone do not result in a Verified badge.
          </P>
        </Section>

        <Section title="Intellectual property">
          <P>
            The NoUploadTools name, logo, and site design are owned by Digiwares. You may not
            reproduce or use them without permission. Third-party tool names and logos are property
            of their respective owners.
          </P>
        </Section>

        <Section title="Limitation of liability">
          <P>
            To the fullest extent permitted by applicable law, Digiwares and its affiliates shall
            not be liable for any indirect, incidental, special, consequential, or punitive damages
            arising from your use of this site or any tool listed in the directory.
          </P>
        </Section>

        <Section title="Governing law">
          <P>
            These terms are governed by the laws of the United States (Delaware), where Digiwares is
            registered, without regard to conflict of law provisions.
          </P>
          <P>
            You waive any right to participate in a class action lawsuit or class-wide arbitration
            against NoUploadTools or Digiwares.
          </P>
        </Section>

        <Section title="Changes to these terms">
          <P>
            We may update these terms. Continued use of the site after changes constitutes
            acceptance. Significant changes will be noted with an updated date at the top of this
            page.
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
