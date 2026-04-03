/**
 * Blog Listing Page — /blog ("The Journal")
 *
 * Editorial magazine journal layout. Clean, minimal, photography-first.
 * Single-column layout when few posts exist, expanding to 2-col grid
 * when there are 3+ posts. Feels like a curated editorial index.
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import Section from '@/components/layout/Section'
import ScrollFade from '@/components/ui/ScrollFade'
import { getAllPosts } from '@/lib/blog'

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

export default async function BlogPage() {
  const posts = await getAllPosts()
  const hasPosts = posts.length > 0

  return (
    <main>

      {/* Page header — generous top padding, subtle divider below */}
      <Section variant="default" className="pt-36 md:pt-44 pb-8">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="font-accent italic text-[40px] md:text-[54px] text-charcoal leading-tight mb-6">
            The Journal
          </h1>
          <div className="w-16 mx-auto border-t border-warm-gray" />
        </div>
      </Section>

      {/* Empty state */}
      {!hasPosts && (
        <Section variant="default" className="pb-24">
          <div className="max-w-2xl mx-auto text-center py-12">
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
        </Section>
      )}

      {/* Post list — editorial single-column for clean reading */}
      {hasPosts && (
        <Section variant="default" className="pb-24">
          <div className="max-w-3xl mx-auto space-y-16">
            {posts.map((post) => (
              <ScrollFade key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group block"
                  aria-label={`Read: ${post.title}`}
                >
                  {/* Featured image — full width within the column */}
                  <div className="overflow-hidden aspect-[16/9] mb-8 bg-warm-gray">
                    {post.featuredImage && (
                      <div className="w-full h-full bg-warm-gray" />
                    )}
                  </div>

                  {/* Post meta — centered, editorial feel */}
                  <div className="text-center">
                    <p className="type-heading mb-4">
                      {new Date(post.date + 'T00:00:00').toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>

                    <h2 className="font-display text-[24px] md:text-[28px] font-light tracking-[0.06em] text-charcoal mb-4 group-hover:opacity-70 transition-opacity duration-150">
                      {post.title}
                    </h2>

                    <p className="type-body text-gray max-w-xl mx-auto mb-6">
                      {post.excerpt}
                    </p>

                    <span className="type-heading text-charcoal border-b border-charcoal pb-0.5">
                      Read More
                    </span>
                  </div>
                </Link>
              </ScrollFade>
            ))}
          </div>
        </Section>
      )}

    </main>
  )
}
