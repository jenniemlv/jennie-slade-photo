/**
 * Headshots & Corporate Gallery Page — /headshots
 *
 * Server Component. Client boundary lives inside GalleryGrid.
 *
 * Page structure:
 *   1. Editorial intro — centered text, first person voice
 *   2. GalleryGrid — 12 portrait images at aspect-[2/3]
 *
 * Voice: Professional but warm. About putting your best face forward.
 */

import type { Metadata } from 'next'
import Section from '@/components/layout/Section'
import GalleryGrid from '@/components/gallery/GalleryGrid'
import { headshotImages } from '@/data/galleries'

export const metadata: Metadata = {
  title: 'Headshots & Corporate — Jennie Slade Photography',
  description:
    'Professional headshots and corporate photography in Las Vegas. Clean, polished portraits for LinkedIn, branding, and business.',
}

export default function HeadshotsPage() {
  return (
    <main id="main-content" className="pt-32 md:pt-40">
      <Section>

        {/* Editorial intro — warm, professional voice */}
        <div className="max-w-2xl mx-auto text-center mb-12 md:mb-16">
          <h1 className="type-title mb-6">Headshots &amp; Corporate</h1>
          <p className="type-body">
            Whether you need a polished LinkedIn photo, updated branding images for your
            business, or team photos that actually show your company&apos;s personality, I&apos;ve got you.
            My goal is to make everyone feel comfortable so the camera captures the real you.
            Not stiff. Not over-produced. Just confident, approachable, and professional.
          </p>
        </div>

        {/* GalleryGrid — portrait orientation for headshots */}
        <GalleryGrid images={headshotImages} aspectRatio="2/3" />

      </Section>
    </main>
  )
}
