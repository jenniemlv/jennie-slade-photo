/**
 * Families Gallery Page — /families
 *
 * This is a Server Component (no 'use client'). The client boundary
 * lives inside GalleryGrid, which handles lightbox state internally.
 *
 * Page structure:
 *   1. Editorial intro — centered text block, max-w-2xl, first person voice
 *   2. GalleryGrid — 12 landscape images at aspect-[3/2]
 *
 * Grid: 3 columns desktop, 2 tablet, 1 mobile (D-08)
 * Aspect ratio: landscape 3:2 for families (D-09)
 * Lightbox: opens on any image click — handled inside GalleryGrid
 *
 * Header clearance: pt-32 md:pt-40 (D-12)
 * Voice: First person, warm, about generational continuity. No em dashes. (CLAUDE.md)
 */

import type { Metadata } from 'next'
import Section from '@/components/layout/Section'
import GalleryGrid from '@/components/gallery/GalleryGrid'
import { familyImages } from '@/data/galleries'

export const metadata: Metadata = {
  title: 'Family Photography — Jennie Slade Photography',
  description:
    'Las Vegas family portrait sessions capturing the love, laughter, and connection that make your family uniquely yours.',
}

export default function FamiliesPage() {
  return (
    <main id="main-content" className="pt-32 md:pt-40">
      <Section>

        {/* Editorial intro — centered, max-w-2xl, warm voice (D-06, D-07) */}
        <div className="max-w-2xl mx-auto text-center mb-12 md:mb-16">
          <h1 className="type-title mb-6">Families</h1>
          <p className="type-body">
            Kids grow up so fast. One day they&apos;re climbing all over you at a photo session,
            and the next they&apos;re heading off to college. I&apos;ve been photographing Las Vegas
            families for over twenty years, and some of my favorite sessions are with families
            I&apos;ve known since their kids were newborns. This is your story. Let&apos;s make
            sure you remember it.
          </p>
        </div>

        {/*
         * GalleryGrid — 12 landscape placeholders, lightbox on click.
         * aspectRatio="3/2" for families (landscape orientation per D-09).
         * When real photos are ready, update the src fields in src/data/galleries.ts.
         */}
        <GalleryGrid images={familyImages} aspectRatio="3/2" />

      </Section>
    </main>
  )
}
