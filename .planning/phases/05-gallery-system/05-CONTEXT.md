# Phase 5: Gallery System - Context

**Gathered:** 2026-03-31
**Status:** Ready for planning

<domain>
## Phase Boundary

Build the portfolio hub page and three gallery pages (Weddings, Families, Seniors) with a clean grid layout, full-screen lightbox, and static data arrays. This is the highest-risk performance phase due to CLS concerns with image-heavy pages.

</domain>

<decisions>
## Implementation Decisions

### Portfolio Hub (/portfolio)
- **D-01:** Three large editorial tiles, each linking to its gallery page (/weddings, /families, /seniors). Similar to the homepage portfolio preview but larger and more editorial.
- **D-02:** Each tile has a warm-gray placeholder image, the category name overlaid (type-title), and a short one-line descriptor below (type-body).
- **D-03:** Full-width layout with generous vertical spacing between tiles. On mobile, tiles stack vertically.
- **D-04:** Page heading: "Portfolio" in type-title. Minimal intro text. Let the tiles speak.
- **D-05:** Use Section component. Top padding to clear the fixed header (pt-32 md:pt-40, same pattern as About page).

### Gallery Pages (/weddings, /families, /seniors)
- **D-06:** Each gallery page has a short editorial intro (2-3 sentences in Jennie's voice about that session type), then the image grid below.
- **D-07:** Intro text in first person, warm, conversational. Weddings: about capturing the day's emotion. Families: about freezing the chaos and love. Seniors: about marking this milestone.
- **D-08:** Clean uniform grid: 3 columns on desktop, 2 on tablet, 1 on mobile. Generous gap (gap-4 md:gap-6).
- **D-09:** All images use consistent aspect ratio within each gallery. Weddings and Families: aspect-[3/2] landscape. Seniors: aspect-[2/3] portrait.
- **D-10:** 12 placeholder slots per gallery (warm-gray blocks with baked-in aspect ratios). Realistic curated set that looks intentional, not like a dump.
- **D-11:** Images use object-cover to fill the aspect ratio container. Prevents CLS by having fixed dimensions before images load.
- **D-12:** Top padding to clear the fixed header (pt-32 md:pt-40).

### Lightbox
- **D-13:** Use yet-another-react-lightbox library. Install via npm.
- **D-14:** Full-screen view on click. Minimal chrome: prev/next arrows, close X button, image counter. No thumbnail strip.
- **D-15:** Keyboard navigation (left/right arrows, Escape to close). Mobile swipe gestures built-in.
- **D-16:** Click outside image to close. Dark background overlay.
- **D-17:** Lightbox is a client component wrapping the gallery grid. The grid itself can be server-rendered.

### Gallery Data
- **D-18:** Static TypeScript arrays in `src/data/galleries.ts`. One array per gallery type (weddings, families, seniors).
- **D-19:** Each gallery item: `{ id: string, src: string, alt: string }`. The `src` field is either a Cloudinary public ID or a local path (for now, warm-gray placeholders or pulled Showit images).
- **D-20:** Easy for non-developer to update: just edit the array, add a new object, done.

### Gallery Grid Component
- **D-21:** Reusable `GalleryGrid` component that takes an array of images and renders the grid. Used on all three gallery pages.
- **D-22:** Clicking any image opens the lightbox at that image's index.
- **D-23:** Images fade in on scroll using ScrollFade or a similar pattern (staggered naturally by grid position).
- **D-24:** All images must have descriptive, location-specific alt text (SEOP-05). Example: "Las Vegas family portrait session, Red Rock Canyon" not just "family photo."

### Image Sourcing
- **D-25:** Pull real images from the scraped Showit site (.firecrawl/jennieslade.com/) where available. Download the static.showit.co URLs to public/images/gallery/.
- **D-26:** For any gaps, use warm-gray placeholder blocks matching the brand palette.

### Performance
- **D-27:** All gallery images must have explicit width/height or use aspect-ratio containers to prevent CLS (< 0.1).
- **D-28:** Lazy-load all gallery images (they're below the fold). Only the hero/first visible content should be eager-loaded.

### Claude's Discretion
- Exact gallery intro copy for each session type (follow jennie-slade-voice guidelines)
- GalleryGrid component architecture (how to connect grid to lightbox state)
- Whether to create separate page files or use a dynamic route with category param
- Lightbox plugin configuration options
- Image download selection from Showit (pick the best representative images)
- Hover effects on grid images (subtle opacity or scale)

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Brand & Design
- `CLAUDE.md` — Voice guidelines, design system, image handling rules
- `design-spec.md` — Typography, button specs

### Current Site Images
- `.firecrawl/jennieslade.com/index.md` — Homepage with Showit image URLs for weddings/families/seniors
- `.firecrawl/jennieslade.com/portfolio/index.md` — Portfolio page content (if exists)

### Existing Components
- `src/components/images/CloudinaryImage.tsx` — Cloudinary wrapper (may use for gallery images)
- `src/components/layout/Section.tsx` — Section wrapper
- `src/components/ui/ScrollFade.tsx` — Scroll fade animation
- `src/components/ui/Button.tsx` — Buttons
- `src/components/homepage/PortfolioPreview.tsx` — Reference for portfolio tile styling

### Research
- `.planning/research/STACK.md` — yet-another-react-lightbox v3.29.2 recommended
- `.planning/research/FEATURES.md` — Curated galleries (15-20 images), CLS prevention
- `.planning/research/PITFALLS.md` — CLS from missing dimensions, double-optimization warning

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `CloudinaryImage` wrapper — ready for Cloudinary-hosted images
- `Section` component — for page sections
- `ScrollFade` — for scroll animations on gallery items
- `PortfolioPreview` on homepage — reference for tile styling and category data structure
- Typography classes and brand color tokens

### Established Patterns
- Server Components by default, `'use client'` only for interactivity (lightbox, grid click handlers)
- Warm-gray placeholders (#d4d1cb) with aspect ratios
- pt-32 md:pt-40 for pages that need header clearance
- Static data arrays (no CMS, no API)

### Integration Points
- `src/app/portfolio/page.tsx` — New hub page
- `src/app/weddings/page.tsx` — New gallery page
- `src/app/families/page.tsx` — New gallery page
- `src/app/seniors/page.tsx` — New gallery page
- `src/data/galleries.ts` — New data file
- `src/components/gallery/GalleryGrid.tsx` — New reusable component
- Homepage PortfolioPreview tiles already link to /weddings, /families, /seniors

</code_context>

<specifics>
## Specific Ideas

- The gallery pages are where the photography MUST shine. Even with placeholders, the grid proportions and spacing should feel premium.
- Research shows curated galleries (15-20 images) create stronger impact than showing everything. 12 slots per gallery is a good starting point.
- yet-another-react-lightbox is actively maintained, React 19 compatible, handles keyboard/touch/mouse. No need for a custom solution.
- The portfolio hub should feel like opening a magazine's table of contents for the photography sections.
- CLS is the #1 Lighthouse killer for gallery sites. Every image container must have explicit dimensions BEFORE images load.
- Consider pulling actual images from the current Showit site to make the galleries look real during development.

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 05-gallery-system*
*Context gathered: 2026-03-31*
