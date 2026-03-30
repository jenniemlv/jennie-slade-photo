# Phase 3: Homepage - Research

**Researched:** 2026-03-30
**Domain:** Next.js 16 App Router homepage, IntersectionObserver scroll animations, editorial layout patterns
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

- **D-01:** New tagline: "Real moments. Real joy. Remembered forever."
- **D-02:** Display tagline in hero section overlaid on image. Use `type-title` styling (Libre Baskerville, 30px+, uppercase).
- **D-03:** Full-viewport hero section. Large warm-gray placeholder block filling the viewport width and ~80vh height. Tagline overlaid centered.
- **D-04:** Hero image must be eager-loaded (priority prop) for LCP performance. Never lazy-load the hero.
- **D-05:** Header is transparent over the hero (already built in Phase 2). Hero works with transparent header aesthetic.
- **D-06:** Mobile hero is still full-width but can be shorter (~60vh) to show content below the fold.
- **D-07:** Elevate existing copy. Keep warmth and core message, weave in generational continuity story (20+ years, photographing same families from newborn to senior).
- **D-08:** Welcome section feels editorial. Short paragraphs, generous whitespace, 1.9 line-height. Use Section with `default` (white) variant.
- **D-09:** Include a "Meet Jennie" secondary-style button linking to /about page.
- **D-10:** Welcome copy follows jennie-slade-voice skill guidelines: first person, warm, conversational, story-first, never uses em dashes, no corporate language.
- **D-11:** Three visual tiles for Weddings, Families, and Seniors. Each tile is a large placeholder image block with category name overlaid and a link to the respective gallery page.
- **D-12:** Section heading: "Featured Works" or "Portfolio" in type-heading style above the three tiles.
- **D-13:** Tiles are generous in size. Desktop: three columns. Mobile: stacked vertically.
- **D-14:** Use Section with `muted` (off-white) variant for portfolio preview section.
- **D-15:** All sections below the hero fade in on scroll using a ScrollFade component (Intersection Observer + CSS opacity/transform transition). Subtle, not dramatic.
- **D-16:** Each section animates independently. Stagger is natural from scroll position, no artificial delay.
- **D-17:** Mobile-first responsive design. All sections must be beautiful on phones, not just functional.
- **D-18:** Mobile: hero ~60vh, welcome text full-width with slightly smaller padding, portfolio tiles stacked vertically with generous spacing.
- **D-19:** Section order: (1) Hero, (2) Welcome/Intro, (3) Portfolio Preview. Three sections, clean, no Instagram section, no additional CTAs.

### Claude's Discretion

- Exact welcome copy wording (follow jennie-slade-voice guidelines, elevate existing, weave in 20+ years)
- ScrollFade component implementation details (IntersectionObserver threshold, animation duration)
- Portfolio tile hover effects (subtle opacity or scale, nothing flashy)
- Hero tagline positioning and responsive sizing
- Whether to split page.tsx into sub-components or keep it in one file

### Deferred Ideas (OUT OF SCOPE)

None. Discussion stayed within phase scope.
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| HOME-01 | Stacked editorial layout with large images interspersed with text sections (magazine-spread feel) | Section component already built; hero + welcome + tiles pattern verified against editorial design principles |
| HOME-02 | Hero section with full-width image, tagline overlay, eager-loaded for LCP performance | Next.js Image `priority` prop confirmed; warm-gray placeholder pattern established in Phase 1 |
| HOME-03 | Welcome/intro text section with Jennie's voice and generational continuity story hook | Voice skill loaded; existing copy captured from scraped site as elevation baseline |
| HOME-04 | Portfolio preview section showcasing weddings, families, and seniors with links to gallery pages | Three-tile pattern confirmed; Next.js Link component already in use |
| HOME-05 | Subtle scroll-triggered fade-in animations on sections below the fold | IntersectionObserver API pattern researched; ScrollFade component pattern documented below |
| HOME-06 | Fully responsive and beautiful on mobile devices | Mobile-first Tailwind utilities confirmed available; responsive breakpoints documented |
| DESN-01 | Editorial magazine feel with generous whitespace throughout | Section component provides consistent py-20 padding; max-width 1200px container already standard |
| DESN-04 | Photography is always the hero element on every page | Placeholder block pattern (warm-gray, aspect-ratio baked in) is the established project convention |
</phase_requirements>

---

## Summary

Phase 3 builds on a solid Phase 2 foundation. The Section, Button, Header, Footer, and PageTransition components are all production-ready. The homepage itself (`src/app/page.tsx`) is currently a two-line placeholder stub. This phase replaces that stub with three editorial sections: a full-viewport hero, a welcome/intro, and a portfolio preview.

The main new work is the `ScrollFade` component. This is a client component using the IntersectionObserver API to trigger CSS transitions. The pattern is well-established in the Next.js App Router ecosystem: Server Components render the structure, a small `'use client'` wrapper handles the observer. No external library is needed.

The secondary work is writing elevated welcome copy that weaves in the generational continuity story (20+ years, photographing the same families). The scraped existing copy is available as a baseline. The voice skill provides exact guidelines.

**Primary recommendation:** Replace `src/app/page.tsx` with a three-section server component. Extract the hero, welcome, and portfolio-preview into sub-components in `src/components/homepage/`. Build `ScrollFade` as a small `'use client'` wrapper component in `src/components/ui/`. No new npm packages needed.

---

## Standard Stack

### Core (already installed, verified from package.json)

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| next | 16.2.1 | App Router, Image optimization, Link | Project framework |
| react | 19.2.4 | Component model | Project framework |
| tailwindcss | ^4.2.2 | Utility styling | Project standard |
| next-cloudinary | ^6.17.5 | Cloudinary image delivery | Project standard |

### No New Packages Required

All capabilities needed for Phase 3 are available in the current stack:
- IntersectionObserver: Browser-native API, no library needed
- Scroll animations: CSS transitions triggered by a className toggle, no animation library needed
- Portfolio tile links: Next.js `Link` component (already used in Button)
- Image placeholders: Tailwind bg-warm-gray with aspect-ratio utilities

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Custom IntersectionObserver | `framer-motion` | Framer adds ~30KB to client bundle, overkill for fade-in; native observer is sufficient |
| Custom IntersectionObserver | `react-intersection-observer` library | Extra dependency for a 20-line hook; not worth it |
| Warm-gray placeholder div | Real Cloudinary image | Real images are a V2 requirement; placeholders keep Phase 3 self-contained |

**Installation:** No new packages needed.

---

## Architecture Patterns

### Recommended Project Structure

```
src/
├── app/
│   └── page.tsx                    # Homepage — replaces placeholder stub
├── components/
│   ├── homepage/
│   │   ├── HeroSection.tsx         # Full-viewport hero with tagline overlay
│   │   ├── WelcomeSection.tsx      # Editorial intro copy + "Meet Jennie" CTA
│   │   └── PortfolioPreview.tsx    # Three category tiles
│   └── ui/
│       ├── Button.tsx              # Already exists
│       ├── PageTransition.tsx      # Already exists
│       └── ScrollFade.tsx          # NEW: IntersectionObserver fade-in wrapper
```

The planner should decide whether to split into sub-components or keep everything in page.tsx (Claude's Discretion per CONTEXT.md). Sub-components are recommended for readability and are consistent with Phase 2 patterns.

### Pattern 1: Hero Section (Server Component)

**What:** Full-viewport section with a warm-gray placeholder block, tagline text overlaid centered, works under transparent header.
**When to use:** Page hero, first element below the header.

```tsx
// Hero does NOT use the Section component — it is full-bleed, not content-constrained.
// It stretches to 80vh on desktop, 60vh on mobile.
// The transparent header sits on top of this without pushing it down.
// Tailwind classes: h-[80vh] md:h-[80vh] for desktop, h-[60vh] for mobile-first default.

export default function HeroSection() {
  return (
    <div className="relative w-full h-[60vh] md:h-[80vh] bg-warm-gray flex items-center justify-center">
      {/* Placeholder: replace this div with <CloudinaryImage> when real photo is ready */}
      <div className="absolute inset-0 bg-warm-gray" />

      {/* Tagline overlay — centered, type-title, white text for contrast on photo */}
      <div className="relative z-10 text-center px-6">
        <h1 className="type-title text-white">
          Real moments. Real joy. Remembered forever.
        </h1>
      </div>
    </div>
  )
}
```

Key constraints:
- Do NOT wrap in `<Section>` — hero is full-bleed, Section adds horizontal padding and max-width
- `position: relative` on outer div, `position: absolute inset-0` on placeholder/image, `position: relative z-10` on tagline overlay
- When real hero image is added: use `<CloudinaryImage>` (not `<Image>`) with `fill` layout and `priority` prop

### Pattern 2: ScrollFade Component ('use client')

**What:** Client wrapper that uses IntersectionObserver to add a CSS class when the element enters the viewport. Children start invisible and fade in.
**When to use:** Wrap any section below the hero.

```tsx
// src/components/ui/ScrollFade.tsx
'use client'

import { useEffect, useRef, useState } from 'react'

interface ScrollFadeProps {
  children: React.ReactNode
  className?: string
}

export default function ScrollFade({ children, className = '' }: ScrollFadeProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect() // fire once, then stop watching
        }
      },
      { threshold: 0.15 }  // trigger when 15% of element is in view
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      } ${className}`}
    >
      {children}
    </div>
  )
}
```

Key implementation notes:
- `'use client'` is required — IntersectionObserver and useState are browser-only
- `observer.disconnect()` after first trigger prevents repeated re-animation on scroll-up
- `threshold: 0.15` strikes the right balance — not too eager, not too delayed
- `translate-y-4` (16px upward drift) is subtle; more than that feels flashy
- `duration-700` (700ms) matches editorial feel; 200ms is too quick, 1000ms is too slow
- The Section component (Server Component) wraps its content; ScrollFade wraps the Section
- Usage: `<ScrollFade><Section variant="default">...</Section></ScrollFade>`

### Pattern 3: Portfolio Preview Tiles (Server Component)

**What:** Three large placeholder blocks in a responsive grid, each with category name overlay and link.
**When to use:** Portfolio preview, category hub pages.

```tsx
// Three-column desktop, single-column mobile
// Tiles are tall enough to feel like "doorways," not thumbnails
// Aspect ratio: 3/4 portrait orientation feels more editorial for portrait photography

const categories = [
  { label: 'Weddings', href: '/weddings' },
  { label: 'Families', href: '/families' },
  { label: 'Seniors', href: '/seniors' },
]

// Each tile:
// <Link href={category.href} className="group relative block aspect-[3/4] bg-warm-gray overflow-hidden">
//   <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
//   <span className="absolute bottom-6 left-6 type-subheading text-white">{category.label}</span>
// </Link>
```

Key constraints:
- Tiles use `aspect-[3/4]` — portrait orientation for photography
- `group-hover` overlay is a subtle dark tint (bg-black/10), not an opacity change on the tile itself
- Category label stays visible at all times (editorial) rather than appearing only on hover
- Use CSS Grid: `grid-cols-1 md:grid-cols-3 gap-4 md:gap-6`

### Pattern 4: Welcome Copy (Server Component, Claude's Discretion)

The existing scraped copy to elevate:
> "Welcome to Jennie Slade Photography! With 18 years of experience, Jennie offers wedding photography, family sessions, and senior portraits, all with a fun, relaxed approach that ensures a stress-free experience."

Problems with existing copy:
- Third person ("Jennie offers") — must switch to first person ("I offer")
- Generic and sales-forward — not story-first
- No generational continuity story
- No warmth beyond the word "warm"

Elevated copy direction (for planner to include in task):
- Open with a moment or statement that immediately communicates 20+ years of relationship ("Some of the babies I photographed in my first year are heading off to college now.")
- First person throughout
- Keep paragraphs to 2-3 sentences max
- Do not use em dashes
- "Meet Jennie" secondary button at the end

### Anti-Patterns to Avoid

- **Wrapping the hero in `<Section>`:** Section adds max-width and horizontal padding. Hero must be full-bleed. Keep them separate.
- **Lazy-loading the hero image:** Violates D-04 and kills LCP. Hero must always have `priority` prop on the Image/CloudinaryImage component.
- **Using raw `<img>` tags:** Project convention requires Next.js `<Image>` or `<CloudinaryImage>` wrapper. Raw img tags break optimization.
- **Importing next/font in components:** All font imports are centralized in `src/lib/fonts.ts`. Do not re-import Libre_Baskerville or Montserrat in individual components.
- **Dynamic class construction:** Tailwind v4's static scanner cannot detect `bg-${variant}`. Always use complete class strings. The Section and Button components already demonstrate the correct pattern.
- **Using `display:none` for scroll animation initial state:** Use opacity-0 + visibility or opacity-0 + translate — not display:none — so the element occupies layout space and doesn't cause CLS when it appears.
- **Adding IntersectionObserver to a Server Component:** ScrollFade must be `'use client'`. The Section component it wraps stays a Server Component.
- **Artificial stagger delays on ScrollFade:** D-16 says stagger is natural from scroll position. Do not add `transition-delay` to create artificial stagger — it feels choreographed, not editorial.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Scroll-triggered animations | Custom scroll event listener with requestAnimationFrame | IntersectionObserver API | Scroll listeners on every frame degrade performance; IntersectionObserver is async and off-main-thread |
| Image optimization | Manual srcset / picture elements | Next.js Image with priority + CloudinaryImage wrapper | Double optimization pitfall (established project decision); automatic responsive sizes, WebP conversion, lazy loading |
| Route-change fade | CSS animation wired manually | PageTransition component (already built in Phase 2) | Already handles key={pathname} pattern correctly |
| Category links | Custom anchor tags | Next.js `Link` component | Prefetching, client-side navigation |

**Key insight:** This phase is primarily a composition phase. The primitives (Section, Button, PageTransition) are already built. The new work is ScrollFade (small), copy writing (editorial), and wiring everything into page.tsx.

---

## Common Pitfalls

### Pitfall 1: Hero Height and Header Overlap

**What goes wrong:** The transparent header sits on top of the hero. If the hero is not padded correctly, the tagline can be obscured by the header (typically 60-80px tall).
**Why it happens:** `h-[80vh]` gives the full block height but does not account for the header overlapping the top.
**How to avoid:** The tagline centered in the hero is already below the header visually because the header is transparent and the flex centering still works. However, if the tagline is positioned near the top, add `pt-20` (80px) to push it below header height. Test on a real screen, not just DevTools.
**Warning signs:** On mobile, header hamburger icon covers the top of tagline text.

### Pitfall 2: CLS from Placeholder Block

**What goes wrong:** The hero placeholder div has no explicit dimensions. The browser can't predict how tall it is. The page shifts as it loads.
**Why it happens:** Missing height declaration before the element renders.
**How to avoid:** Always declare `h-[60vh] md:h-[80vh]` (or an aspect-ratio class) directly on the hero container. Never let height be determined by content inside.
**Warning signs:** Lighthouse CLS score above 0.1.

### Pitfall 3: opacity-0 Causing Invisible-but-Present Elements

**What goes wrong:** ScrollFade uses opacity-0 for initial state. If JavaScript is disabled or IntersectionObserver fails to fire, sections remain invisible.
**Why it happens:** The `isVisible` state starts false; the class applied is `opacity-0`.
**How to avoid:** The IntersectionObserver disconnect pattern (fires once) is reliable in modern browsers. For resilience: ensure the observer fires immediately for elements already in the viewport on load (threshold: 0.15 means any element 15% visible on first paint fires immediately). Test by scrolling to the welcome section on first load (it should always be below the fold at 80vh hero, so it won't pre-fire).
**Warning signs:** Welcome section or portfolio tiles are invisible until scrolled past.

### Pitfall 4: Portfolio Tile Images Breaking Aspect Ratio

**What goes wrong:** Portfolio tiles are currently warm-gray placeholder divs. When real Cloudinary images are swapped in later, they may not respect the 3:4 aspect ratio, causing layout shift.
**Why it happens:** `<Image>` with `fill` layout requires `position: relative` on the parent and explicit height on the parent.
**How to avoid:** Set `aspect-[3/4]` on the tile container and `position: relative` with `overflow-hidden`. When CloudinaryImage is added later, use `fill` layout. Document this pattern in comments.
**Warning signs:** Tiles collapse to zero height when placeholder div is removed.

### Pitfall 5: Type-title Sizing on Mobile

**What goes wrong:** `.type-title` is 30px on desktop. On a small phone (375px), "Real moments. Real joy. Remembered forever." at 30px uppercase with 0.02em letter-spacing wraps awkwardly and can overflow.
**Why it happens:** The type scale was designed for desktop first.
**How to avoid:** Use responsive font sizing. Start at 22-24px on mobile, scale up to 30px+ on desktop. Tailwind: `text-[22px] md:text-[30px]`. The `.type-title` class sets 30px as a base — override with responsive Tailwind utilities.
**Warning signs:** Tagline overflows hero container width or wraps into 4+ lines on iPhone 14.

### Pitfall 6: ScrollFade Wrapping Causes Layout Issues

**What goes wrong:** ScrollFade is a `<div>` wrapper. If it wraps a `<section>` (the Section component renders a `<section>`), the resulting HTML is `<div><section>` which is valid. But if ScrollFade's className is also setting background colors, the Section's background can be overridden.
**Why it happens:** className prop collision between ScrollFade's wrapper div and the Section's outer element.
**How to avoid:** ScrollFade's wrapper div should have no background color — only opacity and transform classes. The Section component controls background via its variant prop.
**Warning signs:** Section backgrounds appear transparent or wrong color.

---

## Code Examples

### Hero Section with Tagline Overlay

```tsx
// Server Component — no 'use client' needed
// Note: This is NOT wrapped in <Section> — it's full-bleed

export default function HeroSection() {
  return (
    <div className="relative w-full h-[60vh] md:h-[80vh] bg-warm-gray">
      {/*
        Placeholder: when real hero photo is ready, replace this empty div with:
        <CloudinaryImage
          src="your-cloudinary-public-id"
          alt="Jennie Slade Photography — Las Vegas portrait photographer"
          fill
          priority
          className="object-cover"
        />
        The priority prop is REQUIRED on the hero for LCP performance.
      */}

      {/* Tagline overlay */}
      <div className="absolute inset-0 flex items-center justify-center px-6">
        <h1 className="type-title text-white text-[22px] md:text-[30px] lg:text-[38px] text-center max-w-2xl">
          Real moments. Real joy. Remembered forever.
        </h1>
      </div>
    </div>
  )
}
```

### ScrollFade Component

```tsx
'use client'

import { useEffect, useRef, useState } from 'react'

interface ScrollFadeProps {
  children: React.ReactNode
  className?: string
}

export default function ScrollFade({ children, className = '' }: ScrollFadeProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      } ${className}`}
    >
      {children}
    </div>
  )
}
```

### Portfolio Preview Grid

```tsx
import Link from 'next/link'
import Section from '@/components/layout/Section'

const categories = [
  { label: 'Weddings', href: '/weddings' },
  { label: 'Families', href: '/families' },
  { label: 'Seniors', href: '/seniors' },
]

export default function PortfolioPreview() {
  return (
    <Section variant="muted">
      <p className="type-heading text-center mb-12">Featured Works</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {categories.map((cat) => (
          <Link
            key={cat.href}
            href={cat.href}
            className="group relative block aspect-[3/4] bg-warm-gray overflow-hidden"
          >
            {/* Dark overlay on hover — subtle, not flashy */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
            {/* Category label */}
            <span className="absolute bottom-6 left-6 type-subheading text-white">
              {cat.label}
            </span>
          </Link>
        ))}
      </div>
    </Section>
  )
}
```

### Welcome Section Copy Direction

The welcome copy should follow this structural pattern (exact wording is Claude's Discretion):

```
Paragraph 1: Specific detail that signals 20+ years ("Some of the babies I photographed in my first year are heading off to college now.")
Paragraph 2: What the experience of working with Jennie feels like (relaxed, fun, real, no stiff posing).
Paragraph 3: Soft invitation. First person, warm CTA feel — not salesy.
[Secondary button: "Meet Jennie" → /about]
```

Voice rules that apply to every sentence:
- First person ("I've been photographing Las Vegas families" not "Jennie has")
- No em dashes (use periods or commas instead)
- No corporate words: leverage, optimize, ensure, experience (as a verb)
- Short paragraphs (2-3 sentences max)
- 1.9 line-height already baked into `.type-body` — do not override

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| scroll event listeners for fade-in | IntersectionObserver API | 2018+ (now universal) | Off-main-thread, no jank |
| Third-party animation library (AOS, ScrollReveal) | Native IntersectionObserver + CSS transitions | 2020+ best practice | Zero bundle cost |
| `display: none` to hide pre-animation elements | `opacity-0 translate-y-4` | Long-standing | No CLS, layout preserved |
| `<img>` tags | Next.js `<Image>` component | Next.js v10+ | Automatic optimization, LCP improvement |

---

## Environment Availability

Step 2.6: SKIPPED — Phase 3 is a code-only change. No external services, CLI tools, or runtimes beyond the already-running Next.js dev server are required. The project already has Node.js, npm, and Next.js configured.

---

## Validation Architecture

Nyquist validation is enabled (`workflow.nyquist_validation: true`).

### Test Framework

| Property | Value |
|----------|-------|
| Framework | None detected — no pytest.ini, jest.config, or vitest.config found in project |
| Config file | None — Wave 0 must decide on test approach |
| Quick run command | `npm run build` (build-time type-check as proxy) |
| Full suite command | `npm run build && npm run lint` |

### Phase Requirements to Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| HOME-01 | Stacked editorial layout renders three sections | Manual visual | `npm run build` (compile check) | N/A — visual |
| HOME-02 | Hero section renders with h-[80vh] and no priority=false | Manual visual + build | `npm run build` | N/A |
| HOME-03 | Welcome copy is first-person, no em dashes, generational story | Manual editorial review | None | N/A |
| HOME-04 | Three portfolio tiles link to /weddings, /families, /seniors | Manual click-through | `npm run build` | N/A |
| HOME-05 | Sections below hero fade in on scroll | Manual scroll test | None | N/A |
| HOME-06 | Page is usable/beautiful on real iPhone Safari | Manual device test | None | N/A |
| DESN-01 | Generous whitespace, editorial feel | Manual visual | None | N/A |
| DESN-04 | Placeholder blocks are prominent, images are heroes | Manual visual | None | N/A |

### Sampling Rate

- Per task commit: `npm run build` (catches TypeScript errors, missing imports, broken JSX)
- Per wave merge: `npm run build && npm run lint`
- Phase gate: Build passes + manual visual review on mobile device before `/gsd:verify-work`

### Wave 0 Gaps

- [ ] No automated test framework exists. For this phase: `npm run build` is the primary automated gate. Manual visual review on iPhone Safari is required for HOME-06.
- [ ] Consider adding `npx tsc --noEmit` as a faster type-check-only command (no build output, faster feedback loop).

---

## Project Constraints (from CLAUDE.md)

These apply to every task in this phase. Planner must verify each.

| Directive | Constraint |
|-----------|------------|
| Image components | Always use Next.js `<Image>` or `<CloudinaryImage>` wrapper. Never raw `<img>` tags. |
| Font imports | All `next/font` instances defined in `src/lib/fonts.ts` only. Never import in individual components. |
| Tailwind classes | No dynamic construction (`bg-${var}`). Always complete class strings. |
| Server Components | Default to Server Components. Add `'use client'` only when required (ScrollFade needs it). |
| Em dashes | Never use em dashes in copy. Use periods, commas, or rewrite. |
| Third person | Never write copy in third person about Jennie. Always first person on the website. |
| Images | Use `priority` prop on hero image. Lazy load all below-fold images. |
| Accessibility | Proper alt text on all images, keyboard navigation, ARIA labels where needed. |
| Semantic HTML | `<section>`, `<h1>`, `<h2>` etc. used correctly. Hero gets `<h1>` for tagline (one H1 per page). |
| Mobile-first | All Tailwind responsive styles start from mobile, scale up with `md:` and `lg:` prefixes. |
| Warm colors | No cool grays anywhere. Always use the warm palette from globals.css. |

---

## Open Questions

1. **Hero tagline contrast on placeholder vs. real photo**
   - What we know: The warm-gray placeholder (#d4d1cb) is a mid-tone. White text will be low contrast against it.
   - What's unclear: Should we add a subtle dark overlay to the placeholder for legibility, even before the real photo exists?
   - Recommendation: Add `bg-black/20` as an additional overlay layer behind the tagline text on the placeholder. This establishes the compositional pattern for when real photos arrive (photographers typically use a dark gradient or overlay for text legibility). Text color: white. If contrast is still insufficient, consider adding `drop-shadow-md` to the tagline text.

2. **H1 placement: Hero tagline vs. SEO**
   - What we know: The tagline ("Real moments. Real joy. Remembered forever.") is the natural H1. The business name "Jennie Slade Photography" is in the header logo. Each page should have one H1.
   - What's unclear: Should the H1 be the tagline (emotional) or a descriptive SEO-friendly heading ("Las Vegas Portrait Photographer")?
   - Recommendation: Use the tagline as the H1. SEO H1 optimization is a Phase 7 concern (SEOP requirements are deferred to Phase 7). Keep Phase 3 focused on editorial feel.

3. **Portfolio preview tile label position**
   - What we know: Category label at `bottom-6 left-6` is the standard editorial pattern.
   - What's unclear: Whether the label should also be centered (editorial center treatment) or left-aligned (more magazine-like).
   - Recommendation: Left-aligned at bottom is the more editorial/magazine choice. Centered labels feel more "app UI." Use left-aligned.

---

## Sources

### Primary (HIGH confidence)

- `src/components/layout/Section.tsx` — Existing component API verified by direct file read
- `src/components/ui/Button.tsx` — Existing component API verified by direct file read
- `src/components/ui/PageTransition.tsx` — Existing component API verified by direct file read
- `src/app/globals.css` — Typography classes, color tokens verified by direct file read
- `src/lib/fonts.ts` — Font setup verified by direct file read
- `src/app/page.tsx` — Current placeholder stub verified by direct file read
- `package.json` — All dependency versions verified by direct file read
- `.firecrawl/jennieslade.com/index.md` — Existing copy baseline verified by direct file read
- `.claude/skills/jennie-slade-voice/SKILL.md` — Voice guidelines loaded in full
- `.planning/phases/03-homepage/03-CONTEXT.md` — All locked decisions read

### Secondary (MEDIUM confidence)

- IntersectionObserver API pattern: MDN Web Docs canonical; threshold and disconnect patterns are long-established browser API conventions
- `observer.disconnect()` after first intersection: Standard pattern for "animate once" use cases, consistent across Next.js community examples

### Tertiary (LOW confidence)

- None. This phase uses only already-installed packages and browser-native APIs. No novel or unverified dependencies.

---

## Metadata

**Confidence breakdown:**

- Standard stack: HIGH — all packages already installed and confirmed in package.json
- Architecture: HIGH — all patterns use existing project components; ScrollFade uses browser-native API
- Pitfalls: HIGH — identified from direct code inspection of existing components and established Next.js patterns
- Copy guidance: HIGH — voice skill loaded in full, existing copy scraped and available as baseline

**Research date:** 2026-03-30
**Valid until:** 2026-06-30 (stable stack; Next.js 16 + Tailwind 4 + React 19 are not in rapid flux)
