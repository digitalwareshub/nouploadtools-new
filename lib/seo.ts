import type { Metadata } from 'next';

export const SITE_URL = 'https://nouploadtools.com';
export const DEFAULT_SOCIAL_IMAGE = `${SITE_URL}/og-image.png`;

export type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  socialTitle?: string;
  socialDescription?: string;
};

/**
 * Builds consistent canonical, Open Graph, and Twitter Card metadata for
 * standard website pages. Pass page titles without the NoUploadTools suffix;
 * the root layout applies the site-wide HTML title template.
 */
export function buildPageMetadata({
  title,
  description,
  path,
  socialTitle,
  socialDescription,
}: PageMetadataOptions): Metadata {
  const canonical = new URL(path, SITE_URL).toString();
  const shareTitle = socialTitle ?? `${title} - NoUploadTools`;
  const shareDescription = socialDescription ?? description;
  const imageAlt = `${shareTitle} social preview`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      type: 'website',
      siteName: 'NoUploadTools',
      title: shareTitle,
      description: shareDescription,
      url: canonical,
      images: [
        {
          url: DEFAULT_SOCIAL_IMAGE,
          width: 1200,
          height: 630,
          alt: imageAlt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: shareTitle,
      description: shareDescription,
      images: [DEFAULT_SOCIAL_IMAGE],
    },
  };
}
