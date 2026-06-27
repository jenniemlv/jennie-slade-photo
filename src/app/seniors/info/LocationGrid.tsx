'use client'

/**
 * LocationGrid — interactive location pills w/ hover preview.
 *
 * Hover/tap a pill → its mapped photo appears in the right-side preview.
 * Falls back to first photo if none hovered.
 *
 * Client component because hover state requires JS.
 */

import { useState } from 'react'
import Image from 'next/image'

const GUIDE_URL = 'https://locations.jennieslade.com/las-vegas-photo-locations.html'

// Mapping of location → preview photo + alt text.
// Multiple locations share a photo when the visual vibe matches.
const LOCATIONS: ReadonlyArray<{ name: string; img: string; alt: string }> = [
  { name: 'Calico Basin', img: '/images/seniors/real/calico-basin.jpg', alt: 'Senior girl lavender dress at Calico Basin' },
  { name: 'Calico Desert', img: '/images/seniors/real/calico-desert.jpg', alt: 'Senior girl white dress at Calico Desert red rocks' },
  { name: 'Mt Charleston', img: '/images/seniors/real/mt-charleston.jpg', alt: 'Senior girl rust dress cowboy boots at Mt Charleston pines' },
  { name: 'Valley of Fire', img: '/images/seniors/real/valley-of-fire.jpg', alt: 'Senior girl white lace dress at Valley of Fire' },
  { name: 'Floyd Lamb Park', img: '/images/seniors/real/floyd-lamb.jpg', alt: 'Senior graduation cap gown golden hour Floyd Lamb Park' },
  { name: 'Dry Lake Bed', img: '/images/seniors/real/dry-lake-bed.jpg', alt: 'Senior girl white sweater floral skirt at Dry Lake Bed' },
  { name: 'Tunnels', img: '/images/seniors/real/tunnel-boy.jpg', alt: 'Senior boy backlit tunnels Las Vegas' },
  { name: 'Las Vegas Strip', img: '/images/seniors/real/las-vegas-strip.jpg', alt: 'Senior girl black dress Welcome to Las Vegas sign' },
  { name: 'Downtown', img: '/images/seniors/real/downtown.jpg', alt: 'Senior boy on turquoise wall Downtown Las Vegas' },
  { name: 'Las Vegas Wetlands', img: '/images/seniors/real/wetlands.jpg', alt: 'Senior girl rust dress at Las Vegas Wetlands' },
  { name: 'Tivoli', img: '/images/seniors/real/tivoli.jpg', alt: 'Danny Richards senior portrait Tivoli Village' },
  { name: 'JW Marriott', img: '/images/seniors/real/jw-marriott.jpg', alt: 'Jagger PV varsity jacket at JW Marriott Las Vegas' },
  { name: 'Smith Center', img: '/images/seniors/real/smith-center.jpg', alt: 'Senior boy blue blazer rainbow columns Smith Center' },
  { name: 'Blue Desert', img: '/images/seniors/real/blue-desert.jpg', alt: 'Senior girl green dress Joshua trees Blue Desert' },
  { name: 'Sunset Park', img: '/images/seniors/real/twirl-girl.jpg', alt: 'Senior Sunset Park' },
  { name: 'Neon Museum', img: '/images/seniors/real/neon-museum.jpg', alt: 'Senior girl green dress at Neon Museum giant star sign' },
]

interface LocationGridProps {
  fontGroteskVar: string
}

export default function LocationGrid({ fontGroteskVar }: LocationGridProps) {
  const [hovered, setHovered] = useState<number | null>(null)
  const active = LOCATIONS[hovered ?? 0]

  return (
    <div className="grid md:grid-cols-12 gap-6 md:gap-8 items-start">
      {/* Location pill cloud */}
      <ul className="md:col-span-7 flex flex-wrap gap-2 md:gap-2.5">
        {LOCATIONS.map((loc, i) => (
          <li key={loc.name}>
            <button
              type="button"
              onMouseEnter={() => setHovered(i)}
              onFocus={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              onBlur={() => setHovered(null)}
              onClick={() => setHovered(i)}
              className={[
                'inline-block px-4 py-2 text-xs tracking-[0.15em] uppercase border transition-colors cursor-pointer',
                hovered === i
                  ? 'bg-charcoal text-off-white border-charcoal'
                  : 'border-charcoal/40 text-charcoal hover:bg-charcoal hover:text-off-white',
              ].join(' ')}
              style={{ fontFamily: fontGroteskVar, fontWeight: 500 }}
            >
              {loc.name}
            </button>
          </li>
        ))}
      </ul>

      {/* Live preview — swaps photo on hover. Aspect-[4/5] crops less than 3/4. */}
      <div className="md:col-span-5">
        <div
          className="relative aspect-[4/5] overflow-hidden shadow-xl"
          style={{ backgroundColor: '#d4d1cb' }}
        >
          {LOCATIONS.map((loc, i) => (
            <Image
              key={loc.name}
              src={loc.img}
              alt={loc.alt}
              fill
              sizes="(min-width: 1024px) 600px, (min-width: 768px) 50vw, 100vw"
              quality={90}
              className={[
                'object-cover transition-opacity duration-300',
                (hovered ?? 0) === i ? 'opacity-100' : 'opacity-0',
              ].join(' ')}
              priority={i === 0}
            />
          ))}
        </div>
        <p
          className="text-center mt-3 text-xs tracking-[0.2em] uppercase text-charcoal/70"
          style={{ fontFamily: fontGroteskVar, fontWeight: 600 }}
        >
          {active.name}
        </p>
      </div>
    </div>
  )
}
