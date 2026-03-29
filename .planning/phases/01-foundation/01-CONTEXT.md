# Phase 1: Foundation - Context

**Gathered:** 2026-03-29
**Status:** Ready for planning

<domain>
## Phase Boundary

Configure a Next.js 16 App Router project with brand tokens, custom fonts, Cloudinary integration, and base CSS that won't require expensive retroactive fixes. This is pure infrastructure: no pages, no components beyond a typography test page.

</domain>

<decisions>
## Implementation Decisions

### Stack Configuration
- **D-01:** Use `create-next-app@latest` to bootstrap — this configures Next.js 16 + TypeScript + Tailwind v4 + Turbopack by default. Don't fight the defaults.
- **D-02:** TypeScript strict mode enabled. Catches bugs early, Claude Code writes better typed code.
- **D-03:** Pin Tailwind CSS to `^4.2.0` — known Turbopack build issues with v4.1.x (from stack research).

### Font Configuration
- **D-04:** Google Fonts (Libre Baskerville, Montserrat, Arapey) via `next/font/google`. No external requests to fonts.googleapis.com.
- **D-05:** Apparel and Destiny configured as `next/font/local` with system-font fallbacks (Georgia for Apparel, cursive for Destiny). Slots ready for when Jennie provides .woff2 files.
- **D-06:** Use `font-display: swap` on all fonts to prevent FOUT/FOIT.

### Color Palette
- **D-07:** Brand colors as Tailwind v4 `@theme` extensions. All warm grays (beige undertone), no cool grays.
- **D-08:** CSS custom properties defined for the full palette per design-spec.md.

### Cloudinary
- **D-09:** Install `next-cloudinary`. Configure `remotePatterns` in next.config (not deprecated `images.domains`).
- **D-10:** Create a `CldImage` wrapper component (needs `'use client'`) for consistent image rendering.
- **D-11:** Use `getCldOgImageUrl()` for OG images (not `CldOgImage` which is Pages Router only — per architecture research).

### Typography
- **D-12:** Base CSS with typography hierarchy matching design-spec.md exactly: title (Libre Baskerville 30px uppercase), heading (Montserrat 12px uppercase), subheading (Apparel 15px uppercase 0.07em), paragraph (Libre Baskerville 16px, 1.9 line-height).

### Claude's Discretion
- **Project structure:** Standard App Router layout — `app/` for routes, `components/` for UI, `lib/` for utilities, `data/` for content arrays
- **Placeholder strategy:** Solid warm-gray blocks (#d4d1cb) matching the brand palette, with baked-in aspect ratios. No patterns or text overlays.
- **Test page:** Create a `/dev` route to visually verify fonts, colors, and typography. Will be removed before launch.
- **Linting:** Use ESLint with Next.js default config. `next lint` is removed in Next.js 16, so use `eslint` directly.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Brand & Design
- `CLAUDE.md` — Full brand identity, colors, fonts, typography hierarchy, design feel, technical guidelines
- `design-spec.md` — Extracted Showit design settings: exact colors, font families, type styles, button specs

### Research
- `.planning/research/STACK.md` — Verified stack versions and compatibility notes (Next.js 16, Tailwind v4.2, next-cloudinary v6.1)
- `.planning/research/ARCHITECTURE.md` — Component architecture, server/client component split, build order
- `.planning/research/PITFALLS.md` — Font loading, Cloudinary double-optimization, remotePatterns deprecation warnings

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- None — greenfield project

### Established Patterns
- None — patterns will be established in this phase

### Integration Points
- None — this phase creates the foundation all other phases build on

</code_context>

<specifics>
## Specific Ideas

- Design inspired by Elizabeth Messina and Jose Villa — luminous, film-quality, editorial feel
- User requested "10 out of 10 site" quality level — every default and config choice should lean toward the premium option
- Warm grays are intentionally warm (beige/yellow undertone). This is the most important color note for the entire project.

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 01-foundation*
*Context gathered: 2026-03-29*
