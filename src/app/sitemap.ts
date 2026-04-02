import type { MetadataRoute } from 'next'

/**
 * Generates /sitemap.xml automatically via Next.js built-in sitemap convention.
 * All 9 public routes included with priorities optimized for SEO:
 *  - Homepage: 1.0 (most important)
 *  - Gallery/portfolio pages: 0.8 (high-value content)
 *  - Supporting pages (about, contact, blog): 0.6
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://jennieslade.com'
  const lastModified = new Date()

  return [
    { url: baseUrl, lastModified, changeFrequency: 'monthly', priority: 1.0 },
    { url: `${baseUrl}/about`, lastModified, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/portfolio`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/weddings`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/families`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/seniors`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/headshots`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/contact`, lastModified, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/blog`, lastModified, changeFrequency: 'weekly', priority: 0.6 },
  ]
}
