/**
 * Individual Blog Post Page — /blog/[slug]
 *
 * This is a Server Component (no 'use client'). It:
 *   1. generateStaticParams — pre-builds all known posts at build time
 *   2. generateMetadata     — returns per-post SEO + Open Graph metadata
 *   3. Page component       — fetches post, renders MDX, wraps in BlogPostLayout
 *
 * MDX rendering uses next-mdx-remote/rsc (server-side, no hydration overhead).
 * Custom components override default HTML elements from MDX:
 *   - img → CloudinaryImage (Cloudinary public IDs in markdown, not URLs)
 *   - h2  → Cormorant display style
 *   - h3  → Apparel subheading style
 *
 * Heading hierarchy per BLOG-02:
 *   H1 = post title (rendered by BlogPostLayout, not in MDX content)
 *   H2 = major section headings within the post body
 *   H3 = sub-section headings within the post body
 */

import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { MDXRemote } from 'next-mdx-remote/rsc'
import BlogPostLayout from '@/components/blog/BlogPostLayout'
import CloudinaryImage from '@/components/images/CloudinaryImage'
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

  // Build the Cloudinary OG image URL manually for a pre-sized 1200x630 crop.
  // Using CldImage here is not possible (React component, not URL), so we construct
  // the Cloudinary URL directly — this is the correct pattern for OG tags.
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

// ── Custom MDX components ─────────────────────────────────────────────────────
//
// next-mdx-remote passes these to override default HTML output from MDX.
// MDX authors write standard markdown — the custom components handle rendering.

interface MdxImgProps {
  src?: string
  alt?: string
}

const mdxComponents = {
  /**
   * img override — MDX markdown image syntax: ![Alt text](cloudinary-public-id)
   * The src will be a Cloudinary public ID (not a full URL), so we pass it
   * directly to CloudinaryImage which expects a public ID.
   */
  img: ({ src, alt }: MdxImgProps) => {
    if (!src) return null
    return (
      <div className="my-8">
        <CloudinaryImage
          src={src}
          alt={alt ?? ''}
          width={1200}
          height={800}
          className="w-full h-auto"
        />
      </div>
    )
  },

  /**
   * h2 override — major section headings within post body.
   * Cormorant display font to match site editorial style.
   * Not using type-title (that's H1 only) — smaller size for hierarchy.
   */
  h2: ({ children }: { children?: React.ReactNode }) => (
    <h2 className="blog-prose-h2">{children}</h2>
  ),

  /**
   * h3 override — sub-section headings within post body.
   * Apparel subheading font (same as buttons and UI labels).
   */
  h3: ({ children }: { children?: React.ReactNode }) => (
    <h3 className="blog-prose-h3">{children}</h3>
  ),
}

// ── Page component ────────────────────────────────────────────────────────────

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  // Return 404 if the slug doesn't match any MDX file
  if (!post) {
    notFound()
  }

  return (
    <BlogPostLayout meta={post.meta}>
      {/*
        MDXRemote renders the raw MDX content string server-side.
        Custom components are passed to override default HTML elements.
        No client-side hydration overhead — pure RSC rendering.
      */}
      <MDXRemote source={post.content} components={mdxComponents} />
    </BlogPostLayout>
  )
}
