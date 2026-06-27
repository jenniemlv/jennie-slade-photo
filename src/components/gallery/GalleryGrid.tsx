'use client'

/**
 * GalleryGrid — responsive photo grid with integrated full-screen lightbox.
 *
 * This is a Client Component because it manages click-to-open lightbox state.
 * The page files that import this component remain Server Components.
 *
 * Usage:
 *   import GalleryGrid from '@/components/gallery/GalleryGrid'
 *   import { weddingImages } from '@/data/galleries'
 *
 *   <GalleryGrid images={weddingImages} aspectRatio="3/2" />
 *
 * Props:
 *   images      — Array of GalleryImage objects from src/data/galleries.ts
 *   aspectRatio — '3/2' for landscape (weddings, families), '2/3' for portrait (seniors)
 *
 * Placeholder mode: When image.src is '', GalleryGrid shows a warm-gray block.
 * To activate real images: set the src field in galleries.ts to the Cloudinary
 * public ID or a local /images/ path. No other changes needed.
 *
 * Lightbox behavior:
 *   - Click any image to open lightbox at that index
 *   - Keyboard: left/right arrows navigate, Escape closes
 *   - Mobile: swipe left/right to navigate
 *   - Click outside image to close (YARL default)
 *   - No thumbnail strip (D-14)
 */

import { useState } from 'react'
import Image from 'next/image'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'
import ScrollFade from '@/components/ui/ScrollFade'
import type { GalleryImage } from '@/data/galleries'

interface GalleryGridProps {
  images: GalleryImage[]
  aspectRatio: '3/2' | '2/3'
}

// MUST use Record lookup — never string interpolation for Tailwind v4 static scanner.
// Dynamic class construction (e.g. `aspect-[${ratio}]`) breaks Tailwind v4 purging.
const aspectClasses: Record<'3/2' | '2/3', string> = {
  '3/2': 'aspect-[3/2]',
  '2/3': 'aspect-[2/3]',
}

export default function GalleryGrid({ images, aspectRatio }: GalleryGridProps) {
  // -1 means lightbox is closed. Any index >= 0 opens it at that position.
  const [lightboxIndex, setLightboxIndex] = useState(-1)

  // Build YARL slides array. When src is empty (placeholder mode),
  // use a placeholder path so the lightbox structure still works.
  const slides = images.map((img) => ({
    src: img.src || '/images/placeholder.svg',
    alt: img.alt,
  }))

  return (
    <>
      {/* Responsive grid — 1 col mobile, 2 col tablet, 3 col desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {images.map((image, index) => (
          // Wrap each cell individually in ScrollFade — NOT the whole grid.
          // Wrapping the entire grid means only one IntersectionObserver fires,
          // causing all 12 images to snap-appear at once instead of staggering.
          <ScrollFade key={image.id}>
            <button
              onClick={() => setLightboxIndex(index)}
              className="block w-full cursor-pointer group"
              aria-label={`View ${image.alt} full screen`}
            >
              {/*
               * Aspect-ratio container prevents CLS (Cumulative Layout Shift).
               * The browser reserves exactly this space before the image loads,
               * so the page doesn't jump as images come in. (D-11, D-27)
               */}
              <div
                className={`relative ${aspectClasses[aspectRatio]} bg-warm-gray overflow-hidden`}
              >
                {image.src ? (
                  /*
                   * Real image: fill + object-cover fills the aspect-ratio container.
                   * Subtle opacity dim on hover signals interactivity without flash.
                   * All gallery images are lazy-loaded — no priority prop. (D-28)
                   *
                   * When switching from local paths to Cloudinary:
                   *   Replace <Image> with <CloudinaryImage> from @/components/images/CloudinaryImage
                   *   The fill, sizes, and className props remain identical.
                   */
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover group-hover:opacity-90 transition-opacity duration-150"
                    sizes="(min-width: 1280px) 420px, (min-width: 768px) 50vw, 100vw"
                    quality={92}
                    loading="lazy"
                  />
                ) : (
                  // Placeholder: warm-gray background is already set on the parent div.
                  // Nothing to render here — the background color IS the placeholder.
                  null
                )}
              </div>
            </button>
          </ScrollFade>
        ))}
      </div>

      {/*
       * YARL Lightbox — renders as a portal, outside the grid DOM.
       * open: controlled by lightboxIndex (>= 0 means open)
       * index: which slide to show first
       * close: resets state to -1 (closed)
       * Keyboard nav (arrows + Escape) and touch swipe are ON by default.
       * No extra plugin config needed for the base experience. (D-13 through D-16)
       */}
      <Lightbox
        open={lightboxIndex >= 0}
        index={lightboxIndex}
        close={() => setLightboxIndex(-1)}
        slides={slides}
      />
    </>
  )
}
