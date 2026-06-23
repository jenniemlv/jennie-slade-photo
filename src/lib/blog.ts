// src/lib/blog.ts
// Blog utility library — reads and parses MDX files from content/posts/.
//
// How it works:
//   MDX files live in /content/posts/. Each file has a frontmatter block
//   with title, date, excerpt, and featuredImage (Cloudinary public ID).
//   The slug is derived from the filename: "my-first-post.mdx" → "my-first-post".
//
// Server-side only — uses Node.js fs and path modules.
// Never import this in a 'use client' component.

import fs from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'

// The directory where MDX blog posts live
const POSTS_DIR = path.join(process.cwd(), 'content', 'posts')

// ── Types ─────────────────────────────────────────────────────────────────────

/**
 * BlogPostMeta — frontmatter data from an MDX file.
 * This is what the listing page uses (no raw MDX content).
 */
export interface BlogPostMeta {
  /** Post title */
  title: string
  /** ISO date string — e.g. "2026-03-15" */
  date: string
  /** 1-2 sentence summary shown on the listing page */
  excerpt: string
  /** Cloudinary public ID for the featured image */
  featuredImage: string
  /** URL-friendly slug derived from the MDX filename */
  slug: string
}

/**
 * BlogPost — full post data including raw MDX content.
 * Used by the individual post page to render the full article.
 */
export interface BlogPost {
  meta: BlogPostMeta
  /** Raw MDX content string — pass to next-mdx-remote for rendering */
  content: string
}

// ── Utilities ─────────────────────────────────────────────────────────────────

/**
 * Parse a filename into a URL slug.
 * "my-great-post.mdx" → "my-great-post"
 */
function fileToSlug(filename: string): string {
  return filename.replace(/\.mdx?$/, '')
}

/**
 * Parse an MDX file into BlogPostMeta.
 * Returns null if the file cannot be parsed (e.g. missing required frontmatter).
 */
async function parsePostMeta(filename: string): Promise<BlogPostMeta | null> {
  try {
    const filePath = path.join(POSTS_DIR, filename)
    const raw = await fs.readFile(filePath, 'utf8')
    const { data } = matter(raw)

    // Title + date are required. Excerpt is optional (image-only posts may omit).
    if (!data.title || !data.date) {
      console.warn(`[blog] Skipping ${filename}: missing required frontmatter (title, date)`)
      return null
    }

    return {
      title: data.title as string,
      date: data.date as string,
      excerpt: (data.excerpt as string) ?? '',
      featuredImage: (data.featuredImage as string) ?? '',
      slug: fileToSlug(filename),
    }
  } catch {
    console.warn(`[blog] Could not parse ${filename}`)
    return null
  }
}

// ── Public API ─────────────────────────────────────────────────────────────────

/**
 * getAllPosts — returns all blog posts sorted newest-first.
 *
 * Reads every .mdx file in content/posts/, parses frontmatter,
 * and sorts by date descending. Returns an empty array if no posts exist.
 *
 * Usage (Server Component):
 *   const posts = await getAllPosts()
 */
export async function getAllPosts(): Promise<BlogPostMeta[]> {
  let files: string[]

  try {
    const allFiles = await fs.readdir(POSTS_DIR)
    files = allFiles.filter((f) => f.endsWith('.mdx') || f.endsWith('.md'))
  } catch {
    // Directory missing or unreadable — return empty array gracefully
    return []
  }

  if (files.length === 0) return []

  // Parse all files in parallel, filter out any that couldn't be parsed
  const posts = await Promise.all(files.map((f) => parsePostMeta(f)))
  const validPosts = posts.filter((p): p is BlogPostMeta => p !== null)

  // Sort newest first by date string (ISO dates sort lexicographically)
  return validPosts.sort((a, b) => b.date.localeCompare(a.date))
}

/**
 * getPostsByYear — groups posts by year for archive nav.
 */
export async function getPostsByYear(): Promise<{ year: string; count: number }[]> {
  const posts = await getAllPosts()
  const counts = new Map<string, number>()
  for (const p of posts) {
    const y = p.date.slice(0, 4)
    counts.set(y, (counts.get(y) ?? 0) + 1)
  }
  return [...counts.entries()]
    .map(([year, count]) => ({ year, count }))
    .sort((a, b) => b.year.localeCompare(a.year))
}

/**
 * getPostBySlug — returns full post data (meta + raw MDX content) for a given slug.
 *
 * Returns null if the post doesn't exist. The caller should handle 404.
 *
 * Usage (Server Component):
 *   const post = await getPostBySlug('my-first-post')
 *   if (!post) notFound()
 */
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  // Try .mdx first, then .md fallback
  const candidates = [`${slug}.mdx`, `${slug}.md`]

  for (const filename of candidates) {
    const filePath = path.join(POSTS_DIR, filename)

    try {
      const raw = await fs.readFile(filePath, 'utf8')
      const { data, content } = matter(raw)

      if (!data.title || !data.date) {
        console.warn(`[blog] Post ${slug} is missing required frontmatter (title, date)`)
        return null
      }

      return {
        meta: {
          title: data.title as string,
          date: data.date as string,
          excerpt: (data.excerpt as string) ?? '',
          featuredImage: (data.featuredImage as string) ?? '',
          slug,
        },
        content,
      }
    } catch {
      // File not found for this extension — try next candidate
      continue
    }
  }

  // Neither extension found
  return null
}
