/**
 * Seniors Gallery Page — /seniors
 *
 * This is a Server Component (no 'use client'). The client boundary
 * lives inside GalleryGrid, which handles lightbox state internally.
 *
 * Page structure:
 *   1. Editorial intro — centered text block, max-w-2xl, first person voice
 *   2. GalleryGrid — 12 portrait images at aspect-[2/3]
 *
 * Grid: 3 columns desktop, 2 tablet, 1 mobile (D-08)
 * Aspect ratio: portrait 2:3 for seniors (D-09) — distinct from weddings/families
 * Lightbox: opens on any image click — handled inside GalleryGrid
 *
 * Header clearance: pt-32 md:pt-40 (D-12)
 * Voice: First person, encouraging, fun. About marking a milestone. No em dashes. (CLAUDE.md)
 */

import type { Metadata } from 'next'
import Section from '@/components/layout/Section'
import GalleryGrid from '@/components/gallery/GalleryGrid'
import { seniorImages } from '@/data/galleries'

export const metadata: Metadata = {
  title: 'Senior Portraits — Jennie Slade Photography',
  description:
    'Las Vegas senior portrait photography marking this milestone with confidence, personality, and style.',
}

export default function SeniorsPage() {
  return (
    <main id="main-content" className="pt-32 md:pt-40">
      <Section>

        {/* Editorial intro — centered, max-w-2xl, warm voice (D-06, D-07) */}
        <div className="max-w-2xl mx-auto text-center mb-12 md:mb-16">
          <h1 className="type-title mb-6">Seniors</h1>
          <p className="type-body">
            Senior year is kind of a big deal. You&apos;ve worked hard to get here, and you deserve
            portraits that show who you are right now. Not some stiff yearbook photo. Let&apos;s
            find a spot you love, bring your personality, and have some fun with it.
          </p>
        </div>

        {/*
         * GalleryGrid — 12 portrait placeholders, lightbox on click.
         * aspectRatio="2/3" for seniors (portrait orientation per D-09).
         * This is the only gallery that uses portrait aspect ratio — visually
         * distinct from weddings and families which use landscape (3/2).
         * When real photos are ready, update the src fields in src/data/galleries.ts.
         */}
        <GalleryGrid images={seniorImages} aspectRatio="2/3" />

      </Section>
    </main>
  )
}
