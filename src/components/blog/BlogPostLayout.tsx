/**
 * BlogPostLayout — layout wrapper for individual blog posts.
 *
 * Receives BlogPostMeta (title, date, excerpt, featuredImage) and children
 * (the rendered MDX content passed from the [slug] page).
 *
 * Structure:
 *   1. Header — date, H1 title, excerpt (editorial subtitle)
 *   2. Featured image — full-width Cloudinary image, aspect-[3/2]
 *   3. Content — MDX body wrapped in .blog-prose styles
 *   4. Back link — "Back to The Journal" at the bottom
 *
 * This is a Server Component (no 'use client'). CloudinaryImage is also a
 * client component but can be composed here without issue in App Router.
 */

import Link from 'next/link'
import Section from '@/components/layout/Section'
import CloudinaryImage from '@/components/images/CloudinaryImage'
import type { BlogPostMeta } from '@/lib/blog'

interface BlogPostLayoutProps {
  meta: BlogPostMeta
  children: React.ReactNode
}

export default function BlogPostLayout({ meta, children }: BlogPostLayoutProps) {
  // Format the ISO date string into a readable label (e.g., "March 29, 2026")
  // Add T00:00:00 to prevent timezone offset from shifting the date by one day
  const formattedDate = new Date(meta.date + 'T00:00:00').toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <main>
      {/* ── Post header ──────────────────────────────────────────────────────
          Not wrapped in ScrollFade — immediately visible on load.
          pt-32 md:pt-40 clears the fixed header (matches all other pages).     */}
      <Section variant="default" className="pt-32 md:pt-40 pb-0">
        <div className="max-w-[750px] mx-auto">

          {/* Date — small uppercase Montserrat label, muted gray */}
          <p className="type-heading mb-5">{formattedDate}</p>

          {/* H1 title — Cormorant Light uppercase (type-title)
              This is the only H1 on the page, satisfying BLOG-02 heading hierarchy. */}
          <h1 className="type-title mb-6">{meta.title}</h1>

          {/* Excerpt — editorial subtitle below the title, italic Lora */}
          <p className="type-body text-gray italic mb-12">{meta.excerpt}</p>

        </div>
      </Section>

      {/* ── Featured image ──────────────────────────────────────────────────── */}
      <Section variant="default" className="py-0">
        <div className="max-w-[750px] mx-auto mb-12">
          {meta.featuredImage ? (
            /* Full-width image, aspect-[3/2] matching blog listing cards */
            <div className="w-full aspect-[3/2] overflow-hidden">
              <CloudinaryImage
                src={meta.featuredImage}
                alt={meta.title}
                width={1200}
                height={800}
                className="w-full h-full object-cover"
                priority
              />
            </div>
          ) : (
            /* Warm-gray placeholder when no Cloudinary image is set */
            <div className="w-full aspect-[3/2] bg-warm-gray" />
          )}
        </div>
      </Section>

      {/* ── MDX content ────────────────────────────────────────────────────────
          .blog-prose styles (defined in globals.css) apply brand typography to
          all MDX-generated HTML elements without @tailwindcss/typography.         */}
      <Section variant="default" className="pt-0 pb-24">
        <div className="max-w-[750px] mx-auto">
          <div className="blog-prose">
            {children}
          </div>

          {/* ── Back link ─────────────────────────────────────────────────── */}
          <div className="mt-16 pt-8 border-t border-warm-gray">
            <Link
              href="/blog"
              className="type-subheading text-charcoal hover:opacity-70 transition-opacity duration-150"
            >
              &larr; Back to The Journal
            </Link>
          </div>
        </div>
      </Section>
    </main>
  )
}
