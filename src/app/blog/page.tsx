/**
 * Blog Listing Page — /blog
 *
 * This is a Server Component (no 'use client'). It calls getAllPosts() directly
 * with async/await — this works in Next.js App Router Server Components.
 *
 * Page structure:
 *   1. Page title "The Journal" — editorial, magazine feel (not generic "Blog")
 *   2. Subtitle — brief descriptor in type-heading
 *   3a. Empty state — warm on-brand message when no posts exist
 *   3b. Post card grid — 1 column mobile, 2 columns md+ when posts exist
 *
 * Post card anatomy:
 *   - Featured image (CloudinaryImage, aspect-[3/2], object-cover)
 *   - Date (type-heading, small uppercase, muted)
 *   - Title (Cormorant, editorial, warm)
 *   - Excerpt (type-body, 3 lines max, line-clamp)
 *
 * Design notes:
 *   - Editorial feel: no card borders, no shadows, let the image do the work
 *   - Cards use ScrollFade for staggered scroll reveal
 *   - Empty state links to /contact with a text link (not a button — more editorial)
 *   - Header clearance: pt-32 md:pt-40 (same pattern as About/Portfolio pages)
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import Section from '@/components/layout/Section'
import ScrollFade from '@/components/ui/ScrollFade'
import CloudinaryImage from '@/components/images/CloudinaryImage'
import { getAllPosts } from '@/lib/blog'

// ── SEO Metadata ──────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: 'Blog | Las Vegas Photographer | Jennie Slade',
  description:
    'Stories, tips, and behind-the-scenes moments from Las Vegas portrait sessions. By Jennie Slade Photography.',
  openGraph: {
    title: 'Blog | Jennie Slade Photography',
    description:
      'Stories, tips, and behind-the-scenes moments from Las Vegas portrait sessions.',
  },
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function BlogPage() {
  // getAllPosts() returns posts sorted newest-first, or [] if none exist
  const posts = await getAllPosts()
  const hasPosts = posts.length > 0

  return (
    <main>

      {/* ── Page Header ────────────────────────────────────────────────────
          NOT wrapped in ScrollFade — should be immediately visible on load.
          pt-32 md:pt-40 clears the fixed header (same pattern as About page). */}
      <Section variant="default" className="pt-32 md:pt-40">
        <div className="max-w-3xl mx-auto text-center">

          {/* Editorial title — "The Journal" feels like a magazine column */}
          <h1 className="type-title mb-4">The Journal</h1>

          {/* Small uppercase descriptor — Montserrat, very subtle */}
          <p className="type-heading mb-16">Stories, Tips, and Behind the Scenes</p>

          {/* ── Empty State ─────────────────────────────────────────────────
              Shown when no MDX files exist in content/posts/.
              Warm, on-brand messaging. Text link to /contact (editorial style). */}
          {!hasPosts && (
            <div className="py-12">
              <p className="type-body text-gray mb-6">
                New stories are on the way. In the meantime, I&apos;d love to hear yours.
              </p>
              <Link
                href="/contact"
                className="type-subheading text-charcoal border-b border-charcoal pb-0.5 hover:opacity-70 transition-opacity duration-150"
              >
                Let&apos;s talk about your session
              </Link>
            </div>
          )}

        </div>
      </Section>

      {/* ── Post Grid ──────────────────────────────────────────────────────
          Only rendered when posts exist. 1 column on mobile, 2 on md+.
          Each card is wrapped in ScrollFade for staggered reveal on scroll.  */}
      {hasPosts && (
        <Section variant="default" className="pb-24">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
            {posts.map((post) => (
              <ScrollFade key={post.slug}>
                {/* Card is a Next.js Link — entire card is clickable */}
                <Link
                  href={`/blog/${post.slug}`}
                  className="group block"
                  aria-label={`Read: ${post.title}`}
                >

                  {/* Featured image ────────────────────────────────────────
                      Uses CloudinaryImage (CldImage wrapper) with the Cloudinary
                      public ID from frontmatter. No rounded corners — editorial.
                      Subtle hover opacity transition to signal interactivity.    */}
                  <div className="overflow-hidden aspect-[3/2] mb-6">
                    {post.featuredImage ? (
                      <CloudinaryImage
                        src={post.featuredImage}
                        alt={`Featured image for ${post.title}`}
                        width={800}
                        height={533}
                        className="w-full h-full object-cover group-hover:opacity-90 transition-opacity duration-300"
                      />
                    ) : (
                      /* Warm-gray placeholder when no Cloudinary image is set */
                      <div className="w-full h-full bg-warm-gray group-hover:opacity-90 transition-opacity duration-300" />
                    )}
                  </div>

                  {/* Post date — small, uppercase, muted ────────────────── */}
                  <p className="type-heading mb-3">
                    {new Date(post.date + 'T00:00:00').toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>

                  {/* Post title — Cormorant, editorial ──────────────────── */}
                  <h2 className="font-[var(--font-cormorant)] text-xl tracking-wide text-charcoal mb-3 group-hover:opacity-80 transition-opacity duration-150">
                    {post.title}
                  </h2>

                  {/* Excerpt — clamped to 3 lines ────────────────────────── */}
                  <p className="type-body text-gray line-clamp-3">
                    {post.excerpt}
                  </p>

                </Link>
              </ScrollFade>
            ))}
          </div>
        </Section>
      )}

    </main>
  )
}
