# Phase 3: Homepage - Context

**Gathered:** 2026-03-30
**Status:** Ready for planning

<domain>
## Phase Boundary

Build the editorial homepage that proves the magazine-spread aesthetic works. Stacked sections with large images interspersed with text. This is the first page visitors see and must immediately communicate Jennie's warmth, experience, and the quality of her work.

</domain>

<decisions>
## Implementation Decisions

### Tagline
- **D-01:** New tagline: "Real moments. Real joy. Remembered forever."
- **D-02:** Display in the hero section overlaid on the hero image. Use `type-title` styling (Libre Baskerville, 30px+, uppercase).

### Hero Section
- **D-03:** Full-viewport hero section. Large warm-gray placeholder block filling the viewport width and ~80vh height. Tagline overlaid centered on the image.
- **D-04:** Hero image must be eager-loaded (priority prop) for LCP performance. Never lazy-load the hero.
- **D-05:** Header is transparent over the hero (already built in Phase 2). The hero should work with the transparent header aesthetic.
- **D-06:** On mobile, hero should still be full-width but can be shorter (~60vh) to show content below the fold.

### Welcome/Intro Section
- **D-07:** Elevate the existing copy. Keep the warmth and core message but make it more personal, first-person, and weave in the generational continuity story (20+ years, photographing the same families from newborn to senior portraits).
- **D-08:** Section should feel like an editorial magazine intro. Short paragraphs, generous whitespace, 1.9 line-height. Use Section component with `default` (white) variant.
- **D-09:** Include a "Meet Jennie" or "About Me" button (secondary style) linking to /about page.
- **D-10:** Welcome copy should use the jennie-slade-voice skill guidelines: first person, warm, conversational, story-first, never uses em dashes, no corporate language.

### Portfolio Preview Section
- **D-11:** Three visual tiles for Weddings, Families, and Seniors. Each tile is a large placeholder image block with the category name overlaid and a link to the respective gallery page.
- **D-12:** Section heading: "Featured Works" or "Portfolio" in type-heading style above the three tiles.
- **D-13:** Tiles should be generous in size — not tiny thumbnails. Think magazine-spread image blocks. On desktop: three columns. On mobile: stacked vertically.
- **D-14:** Use Section component with `muted` (off-white) variant for visual contrast with the white welcome section above.

### Scroll Animations
- **D-15:** All sections below the hero fade in on scroll using the ScrollFade component pattern (Intersection Observer + CSS opacity/transform transition). Subtle, not dramatic.
- **D-16:** Each section animates independently. Stagger is natural from scroll position, no artificial delay needed.

### Mobile Design
- **D-17:** Mobile-first responsive design. All sections must be beautiful on phones, not just functional.
- **D-18:** On mobile: hero ~60vh, welcome text full-width with slightly smaller padding, portfolio tiles stacked vertically with generous spacing between them.

### Page Structure (top to bottom)
- **D-19:** Section order:
  1. Hero (full-viewport, tagline overlay, eager-loaded placeholder)
  2. Welcome/Intro (white bg, elevated copy with generational story, "Meet Jennie" CTA)
  3. Portfolio Preview (off-white bg, three category tiles linking to gallery pages)

  That's it. Three sections. Clean, editorial, focused. No Instagram section (decided: link only in footer). No additional CTAs or sections.

### Claude's Discretion
- Exact welcome copy wording (follow jennie-slade-voice guidelines, elevate existing, weave in 20+ years)
- ScrollFade component implementation details (IntersectionObserver threshold, animation duration)
- Portfolio tile hover effects (subtle opacity or scale, nothing flashy)
- Hero tagline positioning and responsive sizing
- Whether to split page.tsx into sub-components or keep it in one file

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Brand & Design
- `CLAUDE.md` — Full brand identity, voice guidelines, design system, typography hierarchy
- `design-spec.md` — Extracted Showit design settings

### Current Site Content
- `.firecrawl/jennieslade.com/index.md` — Scraped current homepage with existing copy to elevate

### Phase 2 Components (ready to use)
- `src/components/layout/Section.tsx` — Section wrapper with default/muted/warm variants
- `src/components/ui/Button.tsx` — Primary/secondary buttons
- `src/components/ui/PageTransition.tsx` — Route-change fade animation
- `src/components/layout/Header.tsx` — Transparent-to-solid header (already in layout)
- `src/components/layout/Footer.tsx` — Footer (already in layout)

### Phase 1 Foundation
- `src/app/globals.css` — Brand colors, font families, typography classes
- `src/lib/fonts.ts` — Font exports

### Voice Guide
- `.claude/skills/jennie-slade-voice/SKILL.md` — Jennie's authentic brand voice guidelines (if exists)

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `Section` component (3 variants: default, muted, warm) — use for all homepage sections
- `Button` component (primary, secondary) — use for "Meet Jennie" CTA
- `ScrollFade` — needs to be created (new component for this phase)
- `CloudinaryImage` wrapper — ready for when real images replace placeholders
- Typography classes: `type-title`, `type-heading`, `type-subheading`, `type-body`, `type-accent`

### Established Patterns
- Server Components by default, `'use client'` only when needed (scroll observer)
- Tailwind v4 with brand color utilities (bg-off-white, text-charcoal, etc.)
- Warm-gray placeholder blocks (#d4d1cb) with baked-in aspect ratios

### Integration Points
- `src/app/page.tsx` — Currently a minimal placeholder. Will be replaced with the full homepage.
- Header already transparent over page content — hero section works naturally under it.
- PageTransition already wraps page content — fade-in on route change is automatic.

</code_context>

<specifics>
## Specific Ideas

- This page IS the editorial statement. If this page doesn't feel like flipping through a magazine, nothing else matters.
- The hero should feel expansive and cinematic. Even with a placeholder block, the proportions and spacing should convey "high-end photography."
- Welcome copy should mention the generational story naturally: "I've been photographing Las Vegas families for over twenty years. Some of my first babies are now seniors." Something like that — warm, personal, not a sales pitch.
- Portfolio preview should make you want to click through. The tiles should feel like doorways into beautiful galleries, not tiny thumbnails on a grid.
- User specifically requested "10 out of 10 site" — this page needs to deliver on that promise.

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 03-homepage*
*Context gathered: 2026-03-30*
