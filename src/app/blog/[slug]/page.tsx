/**
 * Individual Blog Post Page — /blog/[slug]
 *
 * Uses remark + remark-html to render MDX/markdown content as HTML.
 * This approach works with both Turbopack dev server and production builds.
 *
 * Heading hierarchy per BLOG-02:
 *   H1 = post title (rendered by BlogPostLayout, not in MDX content)
 *   H2 = major section headings within the post body
 *   H3 = sub-section headings within the post body
 */

import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { remark } from 'remark'
import html from 'remark-html'
import BlogPostLayout from '@/components/blog/BlogPostLayout'
import { getAllPosts, getPostBySlug } from '@/lib/blog'

// ── Static params — pre-build all posts at build time ────────────────────────

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

// ── Metadata — per-post SEO + Open Graph tags ─────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    return { title: 'Post Not Found | Jennie Slade Photography' }
  }

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  const ogImageUrl = cloudName
    ? `https://res.cloudinary.com/${cloudName}/image/upload/w_1200,h_630,c_fill/${post.meta.featuredImage}`
    : undefined

  return {
    title: `${post.meta.title} | Jennie Slade Photography Blog`,
    description: post.meta.excerpt,
    openGraph: {
      title: post.meta.title,
      description: post.meta.excerpt,
      type: 'article',
      publishedTime: post.meta.date,
      ...(ogImageUrl && {
        images: [{ url: ogImageUrl, width: 1200, height: 630 }],
      }),
    },
  }
}

// ── Page component ────────────────────────────────────────────────────────────

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  // Convert markdown content to HTML using remark.
  // sanitize:false — imported Blogger posts contain trusted raw HTML
  // (divs, images, links). Without this, remark-html strips them.
  const processed = await remark()
    .use(html, { sanitize: false })
    .process(post.content)
  const contentHtml = processed.toString()

  return (
    <BlogPostLayout meta={post.meta}>
      {/* Render markdown as HTML inside blog-prose wrapper for brand typography */}
      <div
        className="blog-prose"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />
    </BlogPostLayout>
  )
}
