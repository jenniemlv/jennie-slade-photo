/**
 * PortfolioPreview — three-tile editorial gateway to the gallery pages.
 *
 * This is a Server Component (no 'use client') — no interactivity needed here.
 *
 * Purpose:
 *   Provides a visual invitation into Jennie's three session types: Weddings,
 *   Families, and Seniors. Each tile is a large portrait-oriented block that
 *   links to its respective gallery page. Generous sizing lets the tiles feel
 *   like magazine spreads, not thumbnails.
 *
 * Current state: Warm-gray placeholder backgrounds for each tile.
 * Real photos will be added when Cloudinary assets are ready.
 *
 * To swap in real photos (per tile):
 *   Replace the inner placeholder comment block inside each Link tile with:
 *
 *   <CloudinaryImage
 *     src="your-cloudinary-public-id"
 *     alt="Descriptive alt text"
 *     fill
 *     className="object-cover"
 *   />
 *
 * Layout:
 *   - Mobile: stacked single column, gap-6 (D-18)
 *   - Desktop (md+): three equal columns, gap-8
 *   - Tiles use aspect-[3/4] portrait orientation (generous, not thumbnails — D-13)
 *   - Subtle hover overlay darkens tile to signal interactivity
 *   - Category label anchored bottom-left over the tile
 */

import Link from 'next/link'
import Section from '@/components/layout/Section'

// The three portfolio categories — each links to its gallery page
const categories = [
  { label: 'Weddings', href: '/weddings' },
  { label: 'Families', href: '/families' },
  { label: 'Seniors', href: '/seniors' },
]

export default function PortfolioPreview() {
  return (
    <Section variant="muted">

      {/* Section label — Montserrat uppercase, centered (D-12) */}
      <h2 className="type-heading text-center mb-12">Featured Works</h2>

      {/* Tile grid — single column mobile, three columns desktop (D-18) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {categories.map((category) => (
          <Link
            key={category.href}
            href={category.href}
            className="group relative block aspect-[3/4] bg-warm-gray overflow-hidden rounded-sm"
          >
            {/* Replace bg-warm-gray with CloudinaryImage fill when real photos are ready:
                <CloudinaryImage src="category-public-id" alt="Jennie Slade Photography — {category.label}" fill className="object-cover" />
                The tile itself already has overflow-hidden and relative positioning. */}

            {/* Subtle hover overlay — signals the tile is clickable without being heavy-handed */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />

            {/* Category label — anchored bottom-left, white text over the image */}
            <span className="absolute bottom-8 left-8 type-subheading text-white tracking-widest">
              {category.label}
            </span>
          </Link>
        ))}
      </div>

    </Section>
  )
}
