import type { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/blog'

/**
 * Generates /sitemap.xml automatically via Next.js built-in sitemap convention.
 *
 * Static routes included with priorities optimized for SEO:
 *  - Homepage: 1.0 (most important)
 *  - Gallery/portfolio pages: 0.8 (high-value content)
 *  - Supporting pages (about, contact, blog index): 0.6
 *
 * Dynamic routes:
 *  - Blog posts: fetched via getAllPosts(), each entry at priority 0.5
 *    Blog posts change less frequently than gallery pages — monthly is appropriate.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://jennieslade.com'
  const lastModified = new Date()

  // ── Static routes ──────────────────────────────────────────────────────────
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified, changeFrequency: 'monthly', priority: 1.0 },
    { url: `${baseUrl}/about`, lastModified, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/portfolio`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/weddings`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/families`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/families/info`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/seniors`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/seniors/info`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/seniors/what-to-wear`, lastModified, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/headshots`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/contact`, lastModified, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/blog`, lastModified, changeFrequency: 'weekly', priority: 0.6 },
    { url: `${baseUrl}/what-to-wear`, lastModified, changeFrequency: 'monthly', priority: 0.6 },
  ]

  // ── Dynamic blog post routes ───────────────────────────────────────────────
  // getAllPosts() returns [] gracefully if no posts exist yet
  const posts = await getAllPosts()
  const blogRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }))

  return [...staticRoutes, ...blogRoutes]
}
