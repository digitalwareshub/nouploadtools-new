import type { Metadata } from 'next';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import { getApprovedTools } from '@/lib/supabase';
import DirectoryClient from './DirectoryClient';

export const metadata: Metadata = {
  title: 'Directory',
  description:
    'Browse privacy-first browser tools that are open source, no-login, no-ads, free, and client-side where possible.',
  alternates: { canonical: 'https://nouploadtools.com/directory' },
  openGraph: {
    title: 'Directory — NoUploadTools',
    description:
      'Browse privacy-first browser tools that are open source, no-login, no-ads, free, and client-side where possible.',
    url: 'https://nouploadtools.com/directory',
  },
};

export default async function DirectoryPage() {
  const tools = await getApprovedTools();

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'NoUploadTools Directory',
    description: 'Curated list of privacy-first browser-based tools.',
    url: 'https://nouploadtools.com/directory',
    numberOfItems: tools.length,
    itemListElement: tools.slice(0, 20).map((t, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: t.name,
      description: t.tagline,
      url: t.url,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <Nav />
      <Breadcrumbs items={[{ label: 'Directory', href: '/directory' }]} />
      <main>
        <header style={{ maxWidth: 1100, margin: '0 auto', padding: '24px 24px 24px' }}>
          <h1
            style={{
              fontSize: 'clamp(1.5rem, 3vw, 2rem)',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              marginBottom: 8,
            }}
          >
            Tool Directory
          </h1>
          <p style={{ fontSize: 14, color: 'var(--text-2)' }}>
            {tools.length} listed tools · browser-based · privacy-first
          </p>
        </header>
        <DirectoryClient tools={tools} />
      </main>
      <Footer />
    </>
  );
}
