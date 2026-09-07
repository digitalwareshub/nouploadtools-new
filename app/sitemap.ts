import type { MetadataRoute } from 'next';
import { blogPosts } from '@/lib/blog-all';
import { seoLandings } from '@/lib/seo-landings';

const modified = {
  homepage: new Date('2026-07-20'),
  directory: new Date('2026-09-07'),
  devilsAdvocate: new Date('2026-09-07'),
  seoLandings: new Date('2026-07-20'),
  blog: new Date('2026-09-07'),
  trackingChecker: new Date('2026-07-20'),
  privacy: new Date('2026-09-07'),
};

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://nouploadtools.com';

  return [
    { url: `${base}/`, lastModified: modified.homepage, changeFrequency: 'daily', priority: 1.0 },
    {
      url: `${base}/directory`,
      lastModified: modified.directory,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${base}/devils-advocate`,
      lastModified: modified.devilsAdvocate,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    ...seoLandings.map((landing) => ({
      url: `${base}/${landing.slug}`,
      lastModified: modified.seoLandings,
      changeFrequency: 'weekly' as const,
      priority: 0.75,
    })),
    {
      url: `${base}/blog`,
      lastModified: modified.blog,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...blogPosts.map((p) => ({
      url: `${base}/blog/${p.slug}`,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
      lastModified: new Date(p.dateModified),
    })),
    { url: `${base}/submit`, changeFrequency: 'monthly', priority: 0.7 },
    {
      url: `${base}/tracking-checker`,
      lastModified: modified.trackingChecker,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    { url: `${base}/how-we-review`, changeFrequency: 'yearly', priority: 0.4 },
    { url: `${base}/contact`, changeFrequency: 'yearly', priority: 0.3 },
    {
      url: `${base}/privacy`,
      lastModified: modified.privacy,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    { url: `${base}/terms`, changeFrequency: 'yearly', priority: 0.3 },
  ];
}
