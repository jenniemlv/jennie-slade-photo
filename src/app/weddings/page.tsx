/**
 * Weddings Gallery Page — /weddings
 *
 * This is a Server Component (no 'use client'). The client boundary
 * lives inside GalleryGrid, which handles lightbox state internally.
 *
 * Page structure:
 *   1. Editorial intro — centered text block, max-w-2xl, first person voice
 *   2. GalleryGrid — 12 landscape images at aspect-[3/2]
 *
 * Grid: 3 columns desktop, 2 tablet, 1 mobile (D-08)
 * Aspect ratio: landscape 3:2 for weddings (D-09)
 * Lightbox: opens on any image click — handled inside GalleryGrid
 *
 * Header clearance: pt-32 md:pt-40 (D-12)
 * Voice: First person, warm, emotional. No em dashes. (CLAUDE.md)
 */

import type { Metadata } from 'next'
import Section from '@/components/layout/Section'
import GalleryGrid from '@/components/gallery/GalleryGrid'
import { weddingImages } from '@/data/galleries'

export const metadata: Metadata = {
  title: 'Wedding Photography — Jennie Slade Photography',
  description:
    'Las Vegas wedding photography capturing every moment from ceremony to reception. Over 20 years of experience documenting love stories.',
}

export default function WeddingsPage() {
  return (
    <main id="main-content" className="pt-32 md:pt-40">
      <Section>

        {/* Editorial intro — centered, max-w-2xl, warm voice (D-06, D-07) */}
        <div className="max-w-2xl mx-auto text-center mb-12 md:mb-16">
          <h1 className="type-title mb-6">Weddings</h1>
          <p className="type-body">
            Your wedding day moves fast. The nervous laughter before the ceremony,
            the tears during the vows, that moment on the dance floor when the whole
            room is singing along. I love capturing all of it. The big moments and
            the tiny ones you almost forgot happened.
          </p>
        </div>

        {/*
         * GalleryGrid — 12 landscape placeholders, lightbox on click.
         * aspectRatio="3/2" for weddings (landscape orientation per D-09).
         * When real photos are ready, update the src fields in src/data/galleries.ts.
         */}
        <GalleryGrid images={weddingImages} aspectRatio="3/2" />

      </Section>
    </main>
  )
}
