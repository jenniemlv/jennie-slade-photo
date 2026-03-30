# Phase 2: Layout Shell - Context

**Gathered:** 2026-03-30
**Status:** Ready for planning

<domain>
## Phase Boundary

Build the navigation, footer, reusable section components, and button components that wrap every page. These are the design system atoms that all subsequent phases build on. The root layout.tsx gets updated with the nav and footer. Page transition animations are included.

</domain>

<decisions>
## Implementation Decisions

### Navigation
- **D-01:** Centered elegant layout: "JENNIE SLADE" in display font (Libre Baskerville, uppercase) centered at top, with nav links centered below in a horizontal row.
- **D-02:** Nav links: About | Portfolio | Contact | Blog (4 links only). No "Home" link — clicking the name/logo navigates home. No dropdown menus.
- **D-03:** Nav link typography: Montserrat, 12px, uppercase, 0.02em letter spacing (matches type-heading from design spec).
- **D-04:** Header is transparent over hero/full-bleed image sections. Uses a subtle white-to-transparent gradient behind text for readability. After scrolling past the hero, transitions to solid off-white (#f0eeeb) background.
- **D-05:** Header disappears on scroll-down, reappears on scroll-up. Use a small JS scroll listener + CSS transition. Not animated with Framer Motion — pure CSS.
- **D-06:** Header has a fixed position (sticky top). Z-index above page content.

### Mobile Navigation
- **D-07:** Hamburger icon on mobile (right-aligned). Clean three-line icon, not a fancy animated X transition.
- **D-08:** Mobile menu opens as a full-screen overlay with white (#ffffff) background. Smooth fade-in animation (CSS opacity transition, ~300ms).
- **D-09:** Mobile menu layout: "JENNIE SLADE" centered at top, nav links stacked vertically centered in the middle with generous spacing (48px between links), Instagram icon link at the bottom.
- **D-10:** Mobile menu closes on link click and on X button (top-right).

### Footer
- **D-11:** "Jennie Slade Photography" in display font (Libre Baskerville, uppercase, centered).
- **D-12:** Below the name: jennie@jennieslade.com as a mailto link.
- **D-13:** Instagram icon link (@jenniesladephoto) — icon only, no embedded feed.
- **D-14:** Nav links repeated horizontally (About | Portfolio | Contact | Blog).
- **D-15:** Warm-gray divider line (#d4d1cb) above the footer section.
- **D-16:** Footer background: off-white (#f0eeeb). Generous padding (80px top, 48px bottom).

### Buttons
- **D-17:** Primary button: black (#000000) background, white text, Apparel font (subheading), uppercase, 0.07em letter spacing, 10px border-radius, padding 10px 14px. Hover: 80% opacity transition.
- **D-18:** Secondary button: transparent background, black (#000000) border (1px), black text, same typography as primary. Hover: black background with white text transition.

### Section Components
- **D-19:** Reusable `Section` component with consistent horizontal padding and vertical spacing. Desktop: max-width 1200px centered, px-8. Mobile: px-6. Vertical padding: 80px top/bottom by default.
- **D-20:** Section variants: `default` (white bg), `muted` (off-white #f0eeeb bg), `warm` (warm-gray-light #e3e0da bg).

### Page Transitions
- **D-21:** Subtle fade transition between routes. CSS opacity transition on the main content area (~200ms). Not a complex animation library — just a soft crossfade feel.

### Claude's Discretion
- Breakpoint for mobile/desktop nav switch (768px is standard)
- Scroll threshold for header show/hide behavior (typically 50-100px)
- Exact animation timing/easing curves
- Whether to use a `<nav>` component file or inline in layout
- Footer copyright year (auto-generate with JS)

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Brand & Design
- `CLAUDE.md` — Full brand identity, colors, fonts, typography hierarchy, button specs
- `design-spec.md` — Extracted Showit design settings: exact button specs, type styles

### Current Site Reference
- `.firecrawl/jennieslade.com/index.md` — Scraped homepage showing current nav order and footer structure

### Foundation (Phase 1)
- `src/app/layout.tsx` — Current root layout with font variables (will be modified to include nav/footer)
- `src/app/globals.css` — Brand color tokens, font families, typography classes
- `src/lib/fonts.ts` — Font exports used in layout

### Research
- `.planning/research/FEATURES.md` — Differentiators: transparent/disappearing header, page transitions
- `.planning/research/ARCHITECTURE.md` — Component architecture, server/client split

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/lib/fonts.ts` — All 5 font exports ready to use
- `src/app/globals.css` — Type classes (type-title, type-heading, type-subheading, type-body, type-accent) and all brand color tokens
- `src/components/images/CloudinaryImage.tsx` — Cloudinary wrapper for images

### Established Patterns
- Font variables applied via className on `<html>` element
- Brand colors available as `--color-*` CSS variables and Tailwind utilities (`text-charcoal`, `bg-off-white`, etc.)
- TypeScript strict mode enabled

### Integration Points
- `src/app/layout.tsx` — Nav and Footer components will be imported here, wrapping `{children}`
- Navigation component needs `'use client'` for scroll behavior and mobile menu state
- Footer can be a Server Component (no interactivity needed)

</code_context>

<specifics>
## Specific Ideas

- Design inspired by Elizabeth Messina and Jose Villa — clean, editorial, photography-first
- Nav should feel invisible until you need it — transparent over images, then present when scrolling
- Mobile menu should feel like opening a magazine's table of contents — full screen, clean, spacious
- The current Showit site nav order is: Blog, Contact, Portfolio, About. New order puts About first (relationship-first for a portrait photographer)
- User requested "10 out of 10 site" quality — every detail of the nav and footer should feel premium

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 02-layout-shell*
*Context gathered: 2026-03-30*
