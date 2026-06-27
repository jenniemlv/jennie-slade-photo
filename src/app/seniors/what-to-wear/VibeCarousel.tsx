'use client'

/**
 * VibeCarousel — horizontal scroll-snap image carousel per aesthetic.
 *
 * Native scroll-snap on the container = sharp, no JS animation needed.
 * Indicator dots track current image via IntersectionObserver.
 * Touch-swipe works for free (native scroll).
 */

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

interface VibeImage {
  src: string
  alt: string
}

interface VibeCarouselProps {
  images: ReadonlyArray<VibeImage>
  aestheticName: string
  accent: string  // hex color for dots
}

export default function VibeCarousel({ images, aestheticName, accent }: VibeCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [activeIdx, setActiveIdx] = useState(0)

  // Track which slide is in view
  useEffect(() => {
    const container = scrollRef.current
    if (!container) return

    const slides = container.querySelectorAll('[data-slide]')
    if (slides.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number((entry.target as HTMLElement).dataset.slide)
            setActiveIdx(idx)
          }
        })
      },
      { root: container, threshold: 0.6 }
    )

    slides.forEach((slide) => observer.observe(slide))
    return () => observer.disconnect()
  }, [images])

  const scrollTo = (idx: number) => {
    const container = scrollRef.current
    if (!container) return
    const slide = container.querySelector(`[data-slide="${idx}"]`) as HTMLElement | null
    if (slide) {
      container.scrollTo({ left: slide.offsetLeft, behavior: 'smooth' })
    }
  }

  return (
    <div className="relative">
      <div
        ref={scrollRef}
        className="flex overflow-x-auto snap-x snap-mandatory aspect-[4/5] bg-warm-gray scrollbar-none"
        style={{ scrollbarWidth: 'none' }}
        aria-roledescription="carousel"
        aria-label={`${aestheticName} aesthetic gallery`}
      >
        {images.map((img, i) => (
          <div
            key={img.src}
            data-slide={i}
            className="relative shrink-0 w-full h-full snap-start snap-always"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${images.length}`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(min-width: 1280px) 800px, (min-width: 768px) 55vw, 100vw"
              quality={95}
              className="object-cover"
              priority={i === 0}
            />
          </div>
        ))}
      </div>

      {/* Indicator dots */}
      {images.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10 px-3 py-1.5 rounded-full bg-black/30 backdrop-blur-sm">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className="w-2 h-2 rounded-full transition-all duration-200"
              style={{
                backgroundColor: activeIdx === i ? accent : 'rgba(255,255,255,0.5)',
                transform: activeIdx === i ? 'scale(1.3)' : 'scale(1)',
              }}
            />
          ))}
        </div>
      )}

      {/* Slide counter */}
      {images.length > 1 && (
        <div
          className="absolute top-3 right-3 z-10 px-2.5 py-1 text-[10px] tracking-[0.2em] uppercase font-bold rounded-sm bg-black/30 backdrop-blur-sm text-white"
        >
          {activeIdx + 1} / {images.length}
        </div>
      )}
    </div>
  )
}
