/**
 * Blog Listing Page — /blog ("The Journal")
 *
 * Editorial magazine journal layout with pagination + year archive nav.
 *
 * Query params:
 *   ?page=N    — paginated page (default 1)
 *   ?year=YYYY — filter by year
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Section from '@/components/layout/Section'
import ScrollFade from '@/components/ui/ScrollFade'
import { getAllPosts, getPostsByYear } from '@/lib/blog'

const PAGE_SIZE = 12

export const metadata: Metadata = {
  title: 'Journal | Las Vegas Photographer | Jennie Slade',
  description:
    'Stories, tips, and behind-the-scenes moments from Las Vegas portrait sessions. By Jennie Slade Photography.',
  openGraph: {
    title: 'Journal | Jennie Slade Photography',
    description:
      'Stories, tips, and behind-the-scenes moments from Las Vegas portrait sessions.',
  },
}

function isLocalAsset(src: string): boolean {
  return src.startsWith('/')
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; year?: string }>
}) {
  const sp = await searchParams
  const allPosts = await getAllPosts()
  const yearGroups = await getPostsByYear()

  const yearFilter = sp.year && /^\d{4}$/.test(sp.year) ? sp.year : null
  const filtered = yearFilter
    ? allPosts.filter((p) => p.date.startsWith(yearFilter))
    : allPosts

  const page = Math.max(1, parseInt(sp.page ?? '1', 10) || 1)
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const safePage = Math.min(page, totalPages)
  const start = (safePage - 1) * PAGE_SIZE
  const posts = filtered.slice(start, start + PAGE_SIZE)
  const hasPosts = posts.length > 0

  const qs = (p: number) => {
    const params = new URLSearchParams()
    if (yearFilter) params.set('year', yearFilter)
    if (p > 1) params.set('page', String(p))
    const s = params.toString()
    return s ? `/blog?${s}` : '/blog'
  }

  return (
    <main>
      {/* Page header */}
      <Section variant="default" className="pt-36 md:pt-44 pb-8">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="font-accent italic text-[40px] md:text-[54px] text-charcoal leading-tight mb-6">
            The Journal
          </h1>
          <div className="w-16 mx-auto border-t border-warm-gray" />
          {yearFilter && (
            <p className="type-heading mt-6 text-charcoal">
              {yearFilter}
              <Link
                href="/blog"
                className="ml-3 text-gray underline-offset-2 hover:opacity-70"
              >
                clear
              </Link>
            </p>
          )}
        </div>
      </Section>

      {/* Year archive nav — only show when there are 2+ years */}
      {yearGroups.length > 1 && (
        <Section variant="default" className="pb-8">
          <div className="max-w-4xl mx-auto">
            <nav
              aria-label="Archive by year"
              className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-center"
            >
              <Link
                href="/blog"
                className={`type-heading transition-opacity duration-150 ${
                  !yearFilter
                    ? 'text-charcoal border-b border-charcoal pb-0.5'
                    : 'text-gray hover:opacity-70'
                }`}
              >
                All
              </Link>
              {yearGroups.map((yg) => (
                <Link
                  key={yg.year}
                  href={`/blog?year=${yg.year}`}
                  className={`type-heading transition-opacity duration-150 ${
                    yearFilter === yg.year
                      ? 'text-charcoal border-b border-charcoal pb-0.5'
                      : 'text-gray hover:opacity-70'
                  }`}
                >
                  {yg.year} <span className="opacity-50">({yg.count})</span>
                </Link>
              ))}
            </nav>
          </div>
        </Section>
      )}

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

      {/* Post grid — 2-col on md, single column mobile */}
      {hasPosts && (
        <Section variant="default" className="pb-16">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-20">
            {posts.map((post) => (
              <ScrollFade key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group block"
                  aria-label={`Read: ${post.title}`}
                >
                  <div className="overflow-hidden aspect-[3/2] mb-6 bg-warm-gray">
                    {post.featuredImage &&
                      (isLocalAsset(post.featuredImage) ? (
                        <Image
                          src={post.featuredImage}
                          alt={post.title}
                          width={800}
                          height={533}
                          className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full bg-warm-gray" />
                      ))}
                  </div>

                  <div className="text-center">
                    <p className="type-heading mb-3">
                      {new Date(post.date + 'T00:00:00').toLocaleDateString(
                        'en-US',
                        { year: 'numeric', month: 'long', day: 'numeric' },
                      )}
                    </p>
                    <h2 className="font-display text-[22px] md:text-[24px] font-light tracking-[0.06em] text-charcoal mt-1 mb-4 group-hover:opacity-70 transition-opacity duration-150">
                      {post.title}
                    </h2>
                    <p className="type-body text-gray text-sm line-clamp-3 max-w-md mx-auto">
                      {post.excerpt}
                    </p>
                  </div>
                </Link>
              </ScrollFade>
            ))}
          </div>
        </Section>
      )}

      {/* Pagination */}
      {hasPosts && totalPages > 1 && (
        <Section variant="default" className="pb-20">
          <div className="max-w-xl mx-auto flex items-center justify-between">
            <div>
              {safePage > 1 ? (
                <Link
                  href={qs(safePage - 1)}
                  className="type-heading text-charcoal hover:opacity-70 transition-opacity"
                >
                  &larr; Newer
                </Link>
              ) : (
                <span className="type-heading text-warm-gray">&larr; Newer</span>
              )}
            </div>
            <p className="type-heading text-gray">
              Page {safePage} of {totalPages}
            </p>
            <div>
              {safePage < totalPages ? (
                <Link
                  href={qs(safePage + 1)}
                  className="type-heading text-charcoal hover:opacity-70 transition-opacity"
                >
                  Older &rarr;
                </Link>
              ) : (
                <span className="type-heading text-warm-gray">Older &rarr;</span>
              )}
            </div>
          </div>
        </Section>
      )}
    </main>
  )
}
