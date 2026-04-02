/**
 * Portfolio Hub Page — /portfolio
 *
 * This is a Server Component (no 'use client'). The client boundary lives
 * inside GalleryGrid, which this page does not use directly.
 *
 * Page structure:
 *   1. Page title "Portfolio" — centered, type-title
 *   2. Short intro line — muted, conversational
 *   3. Three editorial tiles — stacked vertically, each linking to a gallery page
 *
 * Tile design (D-01, D-02, D-03):
 *   - Wide cinematic aspect ratio (16/9 mobile, 21/9 desktop)
 *   - Warm-gray background placeholder — real Cloudinary images will fill in later
 *   - Category name overlaid bottom-left in type-title white
 *   - One-line descriptor in type-body white/80
 *   - Subtle black overlay on hover to signal interactivity
 *
 * To swap in real photos when Cloudinary images are ready:
 *   Add <CloudinaryImage src="your-public-id" alt="..." fill className="object-cover" />
 *   inside each Link (it already has position:relative and overflow-hidden).
 *
 * Header clearance: pt-32 md:pt-40 (same pattern as About page — D-05, D-12)
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import Section from '@/components/layout/Section'
import ScrollFade from '@/components/ui/ScrollFade'

// SEO metadata — optimized for Las Vegas market (Phase 7, D-01 through D-07)
export const metadata: Metadata = {
  title: 'Photography Portfolio | Jennie Slade Photography',
  description: 'Curated wedding, family, senior, and headshot galleries from over two decades of Las Vegas portrait photography.',
  openGraph: {
    title: 'Photography Portfolio | Jennie Slade Photography',
    description: 'Curated wedding, family, senior, and headshot galleries from over two decades of Las Vegas portrait photography.',
  },
}

// The three gallery categories with editorial descriptors (D-02)
const categories = [
  {
    label: 'Weddings',
    href: '/weddings',
    descriptor: 'From first look to last dance.',
  },
  {
    label: 'Families',
    href: '/families',
    descriptor: 'The chaos. The love. All of it.',
  },
  {
    label: 'Seniors',
    href: '/seniors',
    descriptor: 'A milestone worth remembering.',
  },
  {
    label: 'Headshots & Corporate',
    href: '/headshots',
    descriptor: 'Your best first impression.',
  },
]

export default function PortfolioPage() {
  return (
    <main id="main-content" className="pt-32 md:pt-40">
      <Section>

        {/* Page heading — type-title centered (D-04) */}
        <h1 className="type-title text-center mb-4">Portfolio</h1>

        {/* Minimal intro — warm and inviting, not salesy */}
        <p className="type-body text-center text-gray mb-16 max-w-2xl mx-auto">
          A look into the moments I love capturing most.
        </p>

        {/* Editorial tile stack — full width, generous vertical gaps (D-03) */}
        <div className="flex flex-col gap-8 md:gap-12">
          {categories.map((category) => (
            <ScrollFade key={category.href}>
              {/*
               * Tile — wide cinematic aspect ratio for a magazine editorial feel.
               * 16:9 on mobile, 21:9 on desktop (wider, more dramatic than homepage tiles).
               * bg-warm-gray is the placeholder until real Cloudinary images are added.
               *
               * To add a real photo, insert inside this Link:
               *   <CloudinaryImage src="jennie-slade/portfolio/{slug}" alt="..." fill className="object-cover" />
               */}
              <Link
                href={category.href}
                className="group relative block aspect-[16/9] md:aspect-[21/9] bg-warm-gray overflow-hidden rounded-sm"
              >
                {/* Hover overlay — subtle darkening signals the tile is clickable */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />

                {/* Text overlay anchored bottom-left — visible over the image */}
                <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12">
                  <h2 className="type-title text-white mb-2">{category.label}</h2>
                  <p className="type-body text-white/80">{category.descriptor}</p>
                </div>
              </Link>
            </ScrollFade>
          ))}
        </div>

      </Section>
    </main>
  )
}
