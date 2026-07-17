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

const VALID_CATS = new Set([
  'documents',
  'images',
  'text-writing',
  'audio-video',
  'security-privacy',
  'learning',
  'calculators-data',
  'developer-tools',
]);

export default async function DirectoryPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}) {
  const tools = await getApprovedTools();
  const sp = await searchParams;
  const initialCat = VALID_CATS.has(sp.cat) ? sp.cat : 'all';
  const initialQ = sp.q ?? '';

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
        <DirectoryClient tools={tools} initialCat={initialCat} initialQ={initialQ} />
      </main>
      <Footer />
    </>
  );
}
