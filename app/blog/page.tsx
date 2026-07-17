import type { Metadata } from 'next';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import { blogPosts } from '@/lib/blog';

export const metadata: Metadata = {
  title: 'Blog — NoUploadTools',
  description:
    'Articles on privacy-first tools, client-side processing, metadata removal, and protecting your data online.',
  alternates: { canonical: 'https://nouploadtools.com/blog' },
  openGraph: {
    title: 'Blog — NoUploadTools',
    description: 'Articles on privacy-first tools, client-side processing, and protecting your data.',
    url: 'https://nouploadtools.com/blog',
  },
};

export default function BlogIndexPage() {
  return (
    <>
      <Nav />
      <Breadcrumbs items={[{ label: 'Blog', href: '/blog' }]} />
      <main style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 24px 80px' }}>
        <h1
          style={{
            fontSize: 'clamp(1.5rem, 3vw, 2rem)',
            fontWeight: 700,
            letterSpacing: '-0.03em',
            marginBottom: 8,
          }}
        >
          Blog
        </h1>
        <p style={{ fontSize: 14, color: 'var(--text-2)', marginBottom: 40, lineHeight: 1.65 }}>
          Articles on privacy-first tools, browser-based processing, and keeping your data on your
          device.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              style={{
                display: 'block',
                padding: '20px 24px',
                border: '1px solid var(--border)',
                borderRadius: 10,
                background: 'var(--bg-card)',
                textDecoration: 'none',
                color: 'inherit',
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  color: 'var(--text-3)',
                  marginBottom: 6,
                  textTransform: 'uppercase',
                  letterSpacing: '.06em',
                }}
              >
                {new Date(post.publishDate).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </div>
              <div
                style={{ fontSize: 16, fontWeight: 700, marginBottom: 6, letterSpacing: '-0.02em' }}
              >
                {post.title}
              </div>
              <div style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.6 }}>
                {post.description}
              </div>
              <div style={{ fontSize: 12, color: 'var(--accent)', marginTop: 10, fontWeight: 500 }}>
                Read article →
              </div>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
