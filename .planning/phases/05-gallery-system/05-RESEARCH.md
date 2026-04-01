# Phase 5: Gallery System - Research

**Researched:** 2026-03-29
**Domain:** Next.js gallery grid + lightbox + Cloudinary image delivery
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**Portfolio Hub (/portfolio)**
- D-01: Three large editorial tiles, each linking to /weddings, /families, /seniors. Similar to the homepage portfolio preview but larger and more editorial.
- D-02: Each tile has a warm-gray placeholder image, the category name overlaid (type-title), and a short one-line descriptor below (type-body).
- D-03: Full-width layout with generous vertical spacing between tiles. On mobile, tiles stack vertically.
- D-04: Page heading: "Portfolio" in type-title. Minimal intro text. Let the tiles speak.
- D-05: Use Section component. Top padding to clear the fixed header (pt-32 md:pt-40, same pattern as About page).

**Gallery Pages (/weddings, /families, /seniors)**
- D-06: Each gallery page has a short editorial intro (2-3 sentences in Jennie's voice about that session type), then the image grid below.
- D-07: Intro text in first person, warm, conversational. Weddings: about capturing the day's emotion. Families: about freezing the chaos and love. Seniors: about marking this milestone.
- D-08: Clean uniform grid: 3 columns on desktop, 2 on tablet, 1 on mobile. Generous gap (gap-4 md:gap-6).
- D-09: All images use consistent aspect ratio within each gallery. Weddings and Families: aspect-[3/2] landscape. Seniors: aspect-[2/3] portrait.
- D-10: 12 placeholder slots per gallery (warm-gray blocks with baked-in aspect ratios). Realistic curated set that looks intentional, not like a dump.
- D-11: Images use object-cover to fill the aspect ratio container. Prevents CLS by having fixed dimensions before images load.
- D-12: Top padding to clear the fixed header (pt-32 md:pt-40).

**Lightbox**
- D-13: Use yet-another-react-lightbox library. Install via npm.
- D-14: Full-screen view on click. Minimal chrome: prev/next arrows, close X button, image counter. No thumbnail strip.
- D-15: Keyboard navigation (left/right arrows, Escape to close). Mobile swipe gestures built-in.
- D-16: Click outside image to close. Dark background overlay.
- D-17: Lightbox is a client component wrapping the gallery grid. The grid itself can be server-rendered.

**Gallery Data**
- D-18: Static TypeScript arrays in `src/data/galleries.ts`. One array per gallery type.
- D-19: Each gallery item: `{ id: string, src: string, alt: string }`. The `src` field is either a Cloudinary public ID or a local path.
- D-20: Easy for non-developer to update: just edit the array, add a new object, done.

**Gallery Grid Component**
- D-21: Reusable `GalleryGrid` component that takes an array of images and renders the grid.
- D-22: Clicking any image opens the lightbox at that image's index.
- D-23: Images fade in on scroll using ScrollFade or a similar pattern.
- D-24: All images must have descriptive, location-specific alt text (SEOP-05).

**Image Sourcing**
- D-25: Pull real images from the scraped Showit site (.firecrawl/jennieslade.com/) where available. Download static.showit.co URLs to public/images/gallery/.
- D-26: For any gaps, use warm-gray placeholder blocks matching the brand palette.

**Performance**
- D-27: All gallery images must have explicit width/height or use aspect-ratio containers to prevent CLS (< 0.1).
- D-28: Lazy-load all gallery images. Only the hero/first visible content should be eager-loaded.

### Claude's Discretion
- Exact gallery intro copy for each session type (follow jennie-slade-voice guidelines)
- GalleryGrid component architecture (how to connect grid to lightbox state)
- Whether to create separate page files or use a dynamic route with category param
- Lightbox plugin configuration options
- Image download selection from Showit (pick the best representative images)
- Hover effects on grid images (subtle opacity or scale)

### Deferred Ideas (OUT OF SCOPE)
None — discussion stayed within phase scope
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| PORT-01 | Portfolio hub page linking to weddings, families, and seniors galleries | D-01 through D-05; editorial tile pattern documented in Architecture Patterns |
| PORT-02 | Clean uniform grid gallery component with generous spacing between images | D-08; grid CSS pattern documented; CLS prevention via aspect-ratio containers |
| PORT-03 | Full-screen lightbox on image click (keyboard-navigable, swipe on mobile, prev/next) | YARL v3.30.1 API documented; keyboard/swipe built-in by default |
| PORT-04 | Weddings gallery page with descriptive text and curated image grid | D-06, D-07, D-09 (aspect-[3/2]); Showit image URLs available for sourcing |
| PORT-05 | Families gallery page with descriptive text and curated image grid | D-06, D-07, D-09 (aspect-[3/2]); Showit image URLs available for sourcing |
| PORT-06 | Seniors gallery page with descriptive text and curated image grid | D-06, D-07, D-09 (aspect-[2/3] portrait); Showit image URLs available for sourcing |
| PORT-07 | Gallery images use Cloudinary CldImage component with proper width/height to prevent CLS | CloudinaryImage wrapper already exists; CLS prevention via aspect-ratio wrapper pattern |
| PORT-08 | Gallery data stored in static TypeScript arrays (easy for non-developer to update) | D-18, D-19, D-20; `src/data/galleries.ts` pattern documented |
| SEOP-05 | All images have descriptive, location-specific alt text | D-24; pattern: "Las Vegas family portrait, Red Rock Canyon" documented |
| SEOP-08 | CLS less than 0.1 across all pages | D-27; aspect-ratio container pattern prevents CLS before images load |
</phase_requirements>

---

## Summary

This phase builds the portfolio hub page plus three curated gallery pages (Weddings, Families, Seniors) with a full-screen lightbox. All major decisions are locked in CONTEXT.md. The primary technical risk is CLS on image-heavy pages — which is addressed through aspect-ratio wrapper containers that establish space before images load. The secondary risk is the lightbox being called a "client component" while keeping the grid server-rendered, which requires careful component boundary design.

The project has no test infrastructure yet. The `yet-another-react-lightbox` package is not installed (current latest: 3.30.1). All other components this phase depends on (CloudinaryImage, Section, ScrollFade, PortfolioPreview as reference) are already built and working. The Showit scraped content at `.firecrawl/jennieslade.com/index.md` contains direct image URLs at `static.showit.co` that can be downloaded as gallery placeholder images.

**Primary recommendation:** Build `GalleryGrid` as a `'use client'` component because it needs onClick handlers to open the lightbox. Wrap each grid image in an aspect-ratio div (not `fill`) so CLS is zero without depending on the image loading. Use separate page files (not a dynamic route) for three gallery pages to keep the code straightforward for Jennie to maintain.

---

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| yet-another-react-lightbox | 3.30.1 (latest as of 2026-03-29) | Full-screen image lightbox | Actively maintained, React 19 compatible, keyboard + touch/swipe built-in, minimal chrome, CSS-importable styles |
| next-cloudinary (CldImage) | 6.17.5 (already installed) | Gallery image rendering | Project standard; prevents double-optimization; CloudinaryImage wrapper already exists |
| ScrollFade | (already built) | Scroll fade-in on grid items | Already in the project; IntersectionObserver-based, CSS-only, fires once |
| Section | (already built) | Page section wrapper | Established pattern for all pages |

### Not Needed

| Problem | Skip | Reason |
|---------|------|--------|
| Masonry layout | Not applicable | Explicitly out of scope in REQUIREMENTS.md; uniform grid chosen |
| Thumbnail strip in lightbox | YARL Thumbnails plugin | D-14 says no thumbnail strip |
| Framer Motion | Not applicable | Brand style guide forbids it; ScrollFade already handles fade-in |

**Installation (one new package):**
```bash
npm install yet-another-react-lightbox
```

**Version verification:**
```bash
npm view yet-another-react-lightbox version
# Returns: 3.30.1 (verified 2026-03-29)
```

---

## Architecture Patterns

### Recommended Project Structure

```
src/
├── app/
│   ├── portfolio/
│   │   └── page.tsx          # Hub page — Server Component
│   ├── weddings/
│   │   └── page.tsx          # Weddings gallery — imports GalleryGrid
│   ├── families/
│   │   └── page.tsx          # Families gallery — imports GalleryGrid
│   └── seniors/
│       └── page.tsx          # Seniors gallery — imports GalleryGrid
├── components/
│   └── gallery/
│       └── GalleryGrid.tsx   # 'use client' — grid + lightbox combined
└── data/
    └── galleries.ts          # Static TypeScript arrays (all three galleries)
```

**Why separate page files instead of a dynamic route:**
A dynamic route (`app/[category]/page.tsx`) would be cleaner technically, but CONTEXT.md decision D-21 says "easy for non-developer to update." Separate page files make it obvious: `weddings/page.tsx` is the weddings page. A dynamic route requires understanding how params work. Three separate files, each ~30 lines, is the right call for Jennie's maintenance model.

### Pattern 1: Portfolio Hub Tiles

The hub page uses the same tile pattern as `PortfolioPreview` on the homepage, but larger and with a short descriptor text below each category name.

```typescript
// src/app/portfolio/page.tsx — Server Component, no 'use client'
// Source: established PortfolioPreview pattern in project

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
]

// Page structure:
// pt-32 md:pt-40 (header clearance, D-05)
// <Section>
//   <h1 className="type-title text-center mb-16">Portfolio</h1>
//   <div className="flex flex-col gap-8 md:gap-12">
//     {categories.map(c => <Link ... >tile</Link>)}
//   </div>
// </Section>
```

Each tile is a `<Link>` with:
- `relative block aspect-[3/4] bg-warm-gray overflow-hidden rounded-sm`
- Hover overlay: `bg-black/0 group-hover:bg-black/10 transition-colors duration-300`
- Category label: `type-title text-white` anchored `absolute bottom-8 left-8`
- Descriptor: `type-body text-white/80` just below the label

### Pattern 2: Gallery Page Structure

Each gallery page is a Server Component that imports GalleryGrid (which is the client boundary).

```typescript
// src/app/weddings/page.tsx — Server Component
import Section from '@/components/layout/Section'
import GalleryGrid from '@/components/gallery/GalleryGrid'
import { weddingImages } from '@/data/galleries'

export const metadata = {
  title: 'Wedding Photography — Jennie Slade Photography',
  description: '...',
}

export default function WeddingsPage() {
  return (
    <main id="main-content" className="pt-32 md:pt-40">
      <Section>
        {/* Editorial intro — D-06, D-07 */}
        <div className="max-w-2xl mx-auto text-center mb-12 md:mb-16">
          <h1 className="type-title mb-6">Weddings</h1>
          <p className="type-body">
            {/* 2-3 sentences in Jennie's first-person voice — Claude's discretion */}
          </p>
        </div>

        {/* Gallery grid — client component */}
        <GalleryGrid images={weddingImages} aspectRatio="3/2" />
      </Section>
    </main>
  )
}
```

### Pattern 3: GalleryGrid Component (Key Architecture Decision)

GalleryGrid must be `'use client'` because it holds lightbox open/close state and onClick handlers. The grid renders as part of the same client component — this is intentional because the grid cells need onClick to open the lightbox at the correct index.

```typescript
// src/components/gallery/GalleryGrid.tsx
'use client'
// Source: yet-another-react-lightbox official docs + project CloudinaryImage pattern

import { useState } from 'react'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'
import ScrollFade from '@/components/ui/ScrollFade'
import type { GalleryImage } from '@/data/galleries'

interface GalleryGridProps {
  images: GalleryImage[]
  aspectRatio: '3/2' | '2/3'  // landscape (weddings/families) or portrait (seniors)
}

export default function GalleryGrid({ images, aspectRatio }: GalleryGridProps) {
  const [lightboxIndex, setLightboxIndex] = useState(-1)

  // YARL slides array — each item needs src, alt
  const slides = images.map(img => ({
    src: img.src,
    alt: img.alt,
  }))

  return (
    <>
      {/* Grid — D-08: 3 col desktop, 2 tablet, 1 mobile */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {images.map((image, index) => (
          <ScrollFade key={image.id}>
            <button
              onClick={() => setLightboxIndex(index)}
              className="block w-full cursor-pointer group"
              aria-label={`View ${image.alt} full screen`}
            >
              {/* Aspect-ratio wrapper — CLS prevention (D-11, D-27) */}
              <div className={`relative aspect-[${aspectRatio}] bg-warm-gray overflow-hidden`}>
                {/* Placeholder: warm-gray shown until real images are added */}
                {/* When real Cloudinary images are ready:
                    <CloudinaryImage
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover group-hover:opacity-90 transition-opacity duration-150"
                    />
                */}
              </div>
            </button>
          </ScrollFade>
        ))}
      </div>

      {/* Lightbox — D-13 through D-17 */}
      <Lightbox
        open={lightboxIndex >= 0}
        index={lightboxIndex}
        close={() => setLightboxIndex(-1)}
        slides={slides}
        // Keyboard nav and swipe are ON by default — no extra config needed
      />
    </>
  )
}
```

**Critical note:** `aspect-[3/2]` and `aspect-[2/3]` use Tailwind's arbitrary value syntax. These must appear as complete strings in component code, not constructed dynamically (e.g., `` `aspect-[${aspectRatio}]` ``), because Tailwind v4's static scanner cannot detect dynamically assembled class names. Use a lookup object instead:

```typescript
// CLS-safe: lookup prevents dynamic class construction
const aspectClasses: Record<'3/2' | '2/3', string> = {
  '3/2': 'aspect-[3/2]',
  '2/3': 'aspect-[2/3]',
}
// Usage: <div className={`relative ${aspectClasses[aspectRatio]} bg-warm-gray overflow-hidden`}>
```

This is the same pattern established in the project for Section and Button variantClasses.

### Pattern 4: Gallery Data File

```typescript
// src/data/galleries.ts

export interface GalleryImage {
  id: string
  src: string      // local path (public/images/gallery/...) or Cloudinary public ID
  alt: string      // descriptive, location-specific (SEOP-05)
}

export const weddingImages: GalleryImage[] = [
  {
    id: 'wedding-01',
    src: '/images/gallery/weddings/ccbridals_107.jpg',
    alt: 'Las Vegas wedding ceremony, couple at the altar',
  },
  // ... 11 more entries
]

export const familyImages: GalleryImage[] = [
  // 12 entries, aspect-[3/2]
]

export const seniorImages: GalleryImage[] = [
  // 12 entries, aspect-[2/3]
]
```

### Pattern 5: Tailwind v4 Dynamic Class Safety

The project has an established rule (logged in STATE.md): "variantClasses Record lookup object enforced in Section and Button for Tailwind v4 static scanner compatibility." Apply the same rule to aspect ratios in GalleryGrid. Never construct Tailwind classes from string interpolation.

### Anti-Patterns to Avoid

- **Dynamic class construction:** `className={`aspect-[${ratio}]`}` — Tailwind v4 cannot detect this at scan time. Use a Record lookup object.
- **`fill` without positioned parent:** Using `CldImage fill` on a non-`relative` parent causes images to overflow. The aspect-ratio wrapper must have `relative` and `overflow-hidden`.
- **Eager loading gallery images:** `priority` on gallery images defeats lazy loading and delays page render. Only above-fold content gets `priority`.
- **`'use client'` on the page file:** Keep gallery pages as Server Components. Only `GalleryGrid` needs `'use client'`. This keeps the client bundle small.
- **ScrollFade wrapping the entire grid:** Wrapping the entire grid in ScrollFade fires once for all images simultaneously. Wrapping each cell individually gives the natural staggered effect as images scroll into view.
- **Hover-only image controls:** No interactive element should be visible only on hover. The grid cells are clickable `<button>` elements — keyboard and touch accessible.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Full-screen image viewer | Custom lightbox with modal, keyboard listener, touch handler, focus trap | `yet-another-react-lightbox` | Focus trapping, keyboard nav, swipe, pinch-to-zoom, screen reader support — all edge cases that take weeks to get right |
| Touch swipe detection | Custom touch event listeners | YARL built-in | iOS Safari has quirks with touch events and momentum scrolling; YARL handles these correctly |
| Image fade-in on scroll | Custom IntersectionObserver | `ScrollFade` (already built) | Already exists in project, fires once, CSS-only |
| Image grid CLS prevention | JavaScript to pre-measure images | CSS `aspect-ratio` containers | Aspect-ratio wrappers establish space before the image loads — no JavaScript needed, no CLS |
| Cloudinary image rendering | `<img src={cloudinaryUrl}>` or `<Image src={cloudinaryUrl}>` | `CloudinaryImage` wrapper (already built) | Prevents double-optimization; wrapper already exists in project |

**Key insight:** The hardest parts of a gallery system — lightbox accessibility, touch gestures, focus management — are handled by YARL. The rest is CSS and data arrays.

---

## Common Pitfalls

### Pitfall 1: Tailwind v4 Dynamic Aspect Ratio Classes

**What goes wrong:** `className={`aspect-[${aspectRatio}]`}` compiles but the class is never included in the CSS output. The aspect-ratio container collapses to zero height. CLS score spikes above 0.1.

**Why it happens:** Tailwind v4 scans source files statically. Dynamically assembled class strings are invisible to the scanner.

**How to avoid:** Use a Record lookup object with complete class strings as values. The scanner finds the string literals in the Record definition.

**Warning signs:** Grid container has no height in DevTools before images load.

### Pitfall 2: CLS from Gallery Grid Collapse

**What goes wrong:** Gallery grid renders at zero height, then expands as images load. Lighthouse CLS score fails (> 0.1). Content below the gallery shifts down visibly.

**Why it happens:** No space reserved for images before they load. Missing aspect-ratio wrapper.

**How to avoid:** Every image cell must be wrapped in `<div className="relative aspect-[3/2] overflow-hidden">` (or `aspect-[2/3]` for seniors). The aspect-ratio CSS property reserves the correct height before the image loads. Warm-gray background (`bg-warm-gray`) on the same div makes the placeholder visible.

**Warning signs:** Lighthouse reports "Avoid large layout shifts." The gallery grid is blank on initial render then snaps into size.

### Pitfall 3: Lightbox CSS Not Imported

**What goes wrong:** Lightbox opens but has no styling — arrows missing, background transparent, navigation broken.

**Why it happens:** YARL requires its stylesheet imported separately. Unlike component styles that Next.js handles automatically, YARL's CSS must be explicitly imported.

**How to avoid:** Add `import 'yet-another-react-lightbox/styles.css'` in `GalleryGrid.tsx` alongside the component import. Since GalleryGrid is `'use client'`, Next.js will include this CSS in the client bundle.

**Warning signs:** Lightbox opens to a blank or unstyled overlay.

### Pitfall 4: `ScrollFade` Used Incorrectly on the Grid

**What goes wrong:** All 12 images fade in simultaneously when the grid enters the viewport — there is no staggered effect.

**Why it happens:** `ScrollFade` is wrapped around the entire grid `<div>`, not around individual cells. The observer triggers once for the whole grid.

**How to avoid:** Wrap each individual image cell in its own `<ScrollFade>`. The natural stagger happens because cells at different scroll positions trigger at different times as the user scrolls.

**Warning signs:** All gallery images appear at once with no sequential reveal.

### Pitfall 5: Missing ARIA on Button Grid Cells

**What goes wrong:** Screen readers announce "button" with no context for each clickable image. Keyboard users cannot identify which image they're about to open.

**Why it happens:** Grid cells are styled as buttons for click handling but don't have descriptive labels.

**How to avoid:** Each `<button>` wrapping an image must have `aria-label={`View ${image.alt} full screen`}`. This uses the descriptive alt text (already required by SEOP-05) to give screen readers context.

### Pitfall 6: Real iPhone Safari Testing Skipped

**What goes wrong:** Lightbox swipe navigation works in Chrome DevTools mobile emulation but fails on actual iOS Safari.

**Why it happens:** iOS Safari has unique scroll/touch behavior that DevTools doesn't replicate. Fixed positioning and `100vh` behave differently when the Safari address bar is visible.

**How to avoid:** YARL handles most iOS quirks correctly. But the acceptance criteria explicitly require testing on "an actual iPhone in Safari" (Success Criteria #5). This is a manual step, not a code step.

---

## Code Examples

### YARL Lightbox Minimal Setup

```typescript
// Source: yet-another-react-lightbox.com/documentation (verified 2026-03-29)
'use client'

import { useState } from 'react'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'

// slides shape: { src: string, alt?: string, width?: number, height?: number }
const slides = [
  { src: '/images/gallery/photo-01.jpg', alt: 'Las Vegas family portrait, Red Rock Canyon' },
]

export default function Example() {
  const [index, setIndex] = useState(-1)  // -1 means closed

  return (
    <>
      {slides.map((slide, i) => (
        <button key={i} onClick={() => setIndex(i)}>
          <img src={slide.src} alt={slide.alt} />
        </button>
      ))}

      <Lightbox
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        slides={slides}
        // Keyboard nav (arrows, Escape): ON by default
        // Touch swipe: ON by default
        // Click outside to close: ON by default
      />
    </>
  )
}
```

### CLS-Safe Aspect Ratio Container

```typescript
// Pattern for all gallery grid cells — prevents CLS (D-11, D-27)
// The aspect-[3/2] class reserves height before the image loads.
// bg-warm-gray shows the brand-colored placeholder.

// Lookup object — Tailwind v4 static scanner finds these strings
const aspectClasses: Record<'3/2' | '2/3', string> = {
  '3/2': 'aspect-[3/2]',
  '2/3': 'aspect-[2/3]',
}

// Usage in render:
<div className={`relative ${aspectClasses[aspectRatio]} bg-warm-gray overflow-hidden rounded-sm`}>
  {/* CloudinaryImage goes here when real photos are added */}
</div>
```

### Gallery Data Structure

```typescript
// src/data/galleries.ts
// Source: CONTEXT.md D-18, D-19, D-20

export interface GalleryImage {
  id: string
  src: string    // '/images/gallery/weddings/filename.jpg' for now; Cloudinary public ID later
  alt: string    // location-specific: "Las Vegas wedding, outdoor ceremony at Red Rock"
}

export const weddingImages: GalleryImage[] = [
  { id: 'w-01', src: '/images/gallery/weddings/ccbridals_107.jpg', alt: 'Las Vegas bridal portrait, outdoor desert session' },
  // 11 more...
]
```

### Available Showit Image URLs for Download

The following direct image URLs from the scraped Showit site can be downloaded to `public/images/gallery/` as the initial curated set. These are wedding/portrait images from the current jennieslade.com:

```
https://static.showit.co/800/WLYNS39gcS4CMVnKQL4yhA/36826/ccbridals_107.jpg
https://static.showit.co/1200/WDUWwfCvJDFGPe2Rs33fcQ/36826/mantor_2022_0477.jpg
https://static.showit.co/800/or_UKa02dc4kysMqO08dLQ/36826/cb_temple6572.jpg
https://static.showit.co/1200/iNkqqHZVnv11lYyaS_9XWQ/36826/cb_exitbw7036.jpg
https://static.showit.co/1200/LQ376_KjRXKI4aBaFrPgfw/36826/2017-05-25_0018.jpg
https://static.showit.co/800/9XTaA1IqSrW2ZvtA2TrJPA/36826/2017-05-30_0010.jpg
https://static.showit.co/800/TT4A3119us7KjGPeXAjTaw/36826/benanna_details_img_7274096.jpg
https://static.showit.co/191/mg7Hlj2G7pGUbjdZ1rZwrg/36826/7x5a9114.jpg
https://static.showit.co/191/Rfg3Ulf2atUl6f8EaxZYIw/36826/cb_exit7017.jpg
https://static.showit.co/191/uOWNUqKCZLvioTPv65rPiA/36826/mantor_2022_0525.jpg
https://static.showit.co/191/_CqbN7f6TmrvyIeL0tORlQ/36826/marley_200dsc08938.jpg
https://static.showit.co/191/LFWnQCZLvioTPv65rPiA/36826/dsc04971.jpg
```

Note: These are Showit CDN URLs with small/medium sizes (191px, 800px, 1200px in the URL). Download the 800px or 1200px variants for gallery use. Filename after the last slash is the file to save to `public/images/gallery/`.

For galleries where we have fewer than 12 real images, fill remaining slots with warm-gray placeholder divs (no `src`, just the styled container with `bg-warm-gray`). The data array can omit `src` and the render logic checks: if no `src`, render placeholder only.

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `react-image-lightbox` | `yet-another-react-lightbox` | 2022 (YARL released) | react-image-lightbox is unmaintained; YARL is the community standard |
| `tailwind.config.js` safelist for dynamic classes | Record lookup objects with complete class strings | Tailwind v4 (2024) | Cannot use string interpolation for utility classes — must use complete strings |
| `<img>` with fixed dimensions | Aspect-ratio CSS wrapper + `object-cover` | CSS aspect-ratio property (2021, broad support 2022) | No JavaScript needed to prevent CLS; pure CSS |
| `loading="lazy"` attribute on `<img>` | Next.js `<Image>` defaults to lazy | Next.js 13+ | Lazy loading is automatic; never add `priority` to gallery images |

**Current YARL version:** 3.30.1 (npm verified 2026-03-29). STACK.md reference was 3.29.2 — this is now slightly outdated. Use 3.30.1.

---

## Open Questions

1. **Which Showit images belong to which session type?**
   - What we know: 12 image URLs were found on the homepage scrape. Most appear to be wedding/portrait images based on filenames (`ccbridals`, `cb_temple`, `benanna`). Some are ambiguous.
   - What's unclear: We don't have distinct weddings/families/seniors scrapes with clearly labeled images.
   - Recommendation: Assign available images to the most likely category based on filename. Fill remaining slots with warm-gray placeholder blocks. The planner should specify this in Wave 0 and let the implementer use their judgment when downloading.

2. **Placeholder-only slots: data array entry or just render-level?**
   - What we know: D-10 says 12 slots per gallery. D-26 says warm-gray for gaps.
   - What's unclear: Should placeholder slots be in the `GalleryImage[]` array (with no `src`) or should the gallery page just render 12 fixed placeholder divs alongside data-driven images?
   - Recommendation: Include all 12 slots in the data array, with `src: ''` for placeholder-only slots. The GalleryGrid component checks `if (!image.src)` and renders a plain `div className="bg-warm-gray"` instead. This makes the placeholder/real-image transition clear in the data file.

---

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js | npm install | Yes | 24.14.0 | — |
| npm | Package install | Yes | 11.9.0 | — |
| yet-another-react-lightbox | PORT-03 lightbox | No — not installed | — | None; install required |
| next-cloudinary (CldImage) | PORT-07 | Yes — installed | 6.17.5 | — |
| CloudinaryImage component | Gallery images | Yes — built | src/components/images/CloudinaryImage.tsx | — |
| ScrollFade component | D-23 fade-in | Yes — built | src/components/ui/ScrollFade.tsx | — |
| Section component | D-05 layout | Yes — built | src/components/layout/Section.tsx | — |
| Static Showit images | Gallery placeholders | Partially — URLs available | — | Warm-gray blocks |

**Missing dependencies with no fallback:**
- `yet-another-react-lightbox` — must be installed via `npm install yet-another-react-lightbox` in Wave 0.

**Missing dependencies with fallback:**
- Showit images — some URLs found in scrape; warm-gray placeholder blocks for any gaps.

---

## Validation Architecture

### Test Framework

No test infrastructure exists in this project. No jest.config, vitest.config, playwright.config, or test files were found.

| Property | Value |
|----------|-------|
| Framework | None installed — see Wave 0 Gaps |
| Config file | None |
| Quick run command | Manual browser check (no automated test) |
| Full suite command | `npm run build` (TypeScript compilation as proxy for correctness) |

### Phase Requirements to Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| PORT-01 | Portfolio hub links to /weddings, /families, /seniors | smoke | `npm run build` (link hrefs verified by TypeScript) | No page yet |
| PORT-02 | Grid renders with consistent spacing and aspect-ratio containers | visual | Manual browser check | No |
| PORT-03 | Lightbox opens on click, keyboard nav works, swipe works | manual | Manual: click image, press arrows, Escape | No |
| PORT-04 | Weddings page renders grid with landscape (3/2) images | smoke | `npm run build` | No |
| PORT-05 | Families page renders grid with landscape (3/2) images | smoke | `npm run build` | No |
| PORT-06 | Seniors page renders grid with portrait (2/3) images | smoke | `npm run build` | No |
| PORT-07 | No CLS — aspect-ratio containers present | automated | `npm run build` + Lighthouse CLS check | No |
| PORT-08 | galleries.ts exports typed arrays | unit | `npm run build` (TypeScript checks types) | No |
| SEOP-05 | All images have non-empty, descriptive alt text | code review | Manual code review + `npm run build` | No |
| SEOP-08 | CLS < 0.1 on all gallery pages | automated | Lighthouse CLI: `npx lighthouse http://localhost:3000/weddings --output json` | No |

### Sampling Rate

- **Per task commit:** `npm run build` — confirms TypeScript compiles and no import errors
- **Per wave merge:** Manual browser check of all four pages (portfolio hub + 3 gallery pages) plus Lighthouse CLS check on /weddings
- **Phase gate:** Full suite green (build passes, Lighthouse CLS < 0.1 on all three gallery pages, manual iPhone Safari swipe test passes) before marking complete

### Wave 0 Gaps

- [ ] `npm install yet-another-react-lightbox` — required before any gallery component can be built
- [ ] `src/app/portfolio/page.tsx` — new file, covers PORT-01
- [ ] `src/app/weddings/page.tsx` — new file, covers PORT-04
- [ ] `src/app/families/page.tsx` — new file, covers PORT-05
- [ ] `src/app/seniors/page.tsx` — new file, covers PORT-06
- [ ] `src/components/gallery/GalleryGrid.tsx` — new file, covers PORT-02, PORT-03
- [ ] `src/data/galleries.ts` — new file, covers PORT-08

No automated test framework is being added in this phase. TypeScript compilation serves as the structural correctness gate. Manual browser verification and Lighthouse serve as the quality gate.

---

## Project Constraints (from CLAUDE.md)

| Directive | How it Applies to This Phase |
|-----------|------------------------------|
| Use Next.js Image component (never raw img tags) | Gallery grid uses CloudinaryImage wrapper for real photos; placeholder divs for warm-gray slots |
| CldImage from next-cloudinary — never `<Image src={cloudinaryUrl}>` | Established project rule; CloudinaryImage wrapper enforces this |
| Tailwind CSS with custom theme | All styling uses Tailwind utilities; aspect-ratio containers use Tailwind arbitrary values via lookup objects |
| All images must have descriptive alt text | SEOP-05; alt text in galleries.ts must be location-specific ("Las Vegas..." style) |
| No em dashes in copy | Gallery intro copy must use commas and periods only |
| First-person voice for website copy | "I photograph..." not "Jennie photographs..." |
| Warm, not cool — warm-gray placeholders (#d4d1cb) | bg-warm-gray for all placeholder slots |
| Mobile-first | Grid is 1-col mobile, 2-col tablet, 3-col desktop |
| Server Components by default, 'use client' only for interactivity | Gallery pages stay Server Components; only GalleryGrid gets 'use client' |
| No Framer Motion | ScrollFade (CSS + IntersectionObserver) for all animations |
| Images should never block page rendering | Gallery images must be lazy-loaded (Next.js default); no `priority` on gallery images |
| Lighthouse 90+ | CLS < 0.1 is a specific success criterion; aspect-ratio containers are the mechanism |
| No masonry/Pinterest gallery | Explicitly out of scope in REQUIREMENTS.md; uniform grid confirmed |

---

## Sources

### Primary (HIGH confidence)
- `yet-another-react-lightbox.com/documentation` — YARL v3.30.1 API: slides shape, index prop, keyboard/swipe defaults, CSS import, render.slide
- `yet-another-react-lightbox.com/examples/nextjs` — Official Next.js integration pattern with 'use client'
- `npm view yet-another-react-lightbox version` — Verified 3.30.1 (2026-03-29)
- Project source files — CloudinaryImage, Section, ScrollFade, PortfolioPreview, layout.tsx — all read directly

### Secondary (MEDIUM confidence)
- `.firecrawl/jennieslade.com/index.md` — Showit image URLs available for gallery sourcing
- `.planning/research/STACK.md` — Prior project research (3.29.2 version now slightly stale; 3.30.1 confirmed current)
- `.planning/research/PITFALLS.md` — CLS, double-optimization, mobile lightbox pitfalls documented
- `.planning/research/FEATURES.md` — Curated gallery size (12-20 images), lightbox feature requirements

### Tertiary (LOW confidence)
- None

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — YARL version confirmed via npm; all other packages already in project
- Architecture: HIGH — component patterns verified against existing project code; Tailwind v4 static scanner rule confirmed from STATE.md
- Pitfalls: HIGH — CLS and Tailwind dynamic class pitfalls both verified against project-established patterns in STATE.md

**Research date:** 2026-03-29
**Valid until:** 2026-04-30 (YARL is actively maintained; breaking changes unlikely in 30 days)
