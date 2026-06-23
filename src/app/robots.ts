import type { MetadataRoute } from 'next'

/**
 * Generates /robots.txt via Next.js built-in robots convention.
 * Allows all crawlers to index the full site and points to the sitemap.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/admin/'],
    },
    sitemap: 'https://jennieslade.com/sitemap.xml',
  }
}
