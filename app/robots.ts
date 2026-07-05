import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/api/', '/admin', '/api/admin', '/go/'] },
    sitemap: 'https://nouploadtools.com/sitemap.xml',
  };
}
