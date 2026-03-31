# Phase 4: About Page - Context

**Gathered:** 2026-03-31
**Status:** Ready for planning

<domain>
## Phase Boundary

Build the About page that tells Jennie's story, establishes her warmth and experience, and moves visitors toward getting in touch. Magazine profile layout with editorial text, personal photo placeholder, testimonial placeholders, and contact CTA.

</domain>

<decisions>
## Implementation Decisions

### Personal Details (from Jennie directly)
- **D-01:** Mother of five kids, ages 13 to 25. One child is married. This shows she's lived every stage of family life that she photographs.
- **D-02:** Las Vegas native. Over twenty years photographing families in Las Vegas.
- **D-03:** Origin story: Her grandpa taught her photography as a kid. He had a developing darkroom in his bathroom. When she had her first daughter, she wanted to capture her beautifully, so she got a good camera and practiced. People started asking her to take their photos, and it grew from there.
- **D-04:** The generational continuity angle: She's photographed the same families for 18+ years. Babies she photographed are now seniors, getting married, having their own babies. This is her superpower.

### Page Layout
- **D-05:** Magazine profile layout. Large warm-gray placeholder for Jennie's photo at the top (portrait orientation, aspect-[3/4] or similar), then editorial text flowing below.
- **D-06:** Use Section component with `default` (white) variant for main content.
- **D-07:** Text should be centered column, max-width narrower than 1200px (max-w-2xl or max-w-3xl) for comfortable reading line length. Same editorial feel as the homepage welcome section.

### Copy Structure
- **D-08:** Section flow (top to bottom):
  1. Large photo placeholder of Jennie
  2. "Hello, I'm Jennie" or similar warm heading
  3. Origin story paragraph (grandpa's darkroom, first daughter, grew into a business)
  4. What it's like to work with her (fun, relaxed, stress-free)
  5. The generational story (20+ years, same families, babies to seniors)
  6. Personal touch (mother of five, Las Vegas life)
  7. Testimonial quote callout (placeholder)
  8. CTA: "Let's Create Something Beautiful" or similar, linking to /contact
- **D-09:** All copy in first person. Warm, conversational, story-first. Follow jennie-slade-voice guidelines. No em dashes. No corporate language.
- **D-10:** Short paragraphs (2-3 sentences max). Generous whitespace between sections. 1.9 line-height on body text.

### Testimonials
- **D-11:** Placeholder testimonial slots (not real quotes yet). Style them as pulled-out editorial callouts — larger italic text (Arapey font / type-accent), centered, with a decorative quotation mark or subtle visual treatment.
- **D-12:** Include 2 placeholder slots: one mid-page (after the generational story) and one near the bottom (before the CTA).
- **D-13:** Placeholder text: "Your testimonial will appear here." styled subtly so it's clear it's a placeholder, not real copy.

### Contact CTA
- **D-14:** Clear CTA section at the bottom of the page. Primary button linking to /contact.
- **D-15:** CTA copy should be warm and inviting, not salesy. Something like "I'd love to hear your story. Let's chat about capturing it."

### Scroll Animations
- **D-16:** Use ScrollFade on sections below the photo. Same pattern as homepage — subtle fade-in on scroll.

### Mobile
- **D-17:** Mobile-first. Photo placeholder full-width on mobile. Text comfortable to read. Testimonial callouts still readable and beautiful.

### Claude's Discretion
- Exact copy wording (follow the personal details above and jennie-slade-voice guidelines)
- Photo placeholder dimensions and exact aspect ratio
- Testimonial visual treatment (quotation mark style, border, background)
- Whether to split into sub-components or keep as one page component
- Heading hierarchy (H1 for page, H2 for sections)
- Any subtle background color variations between sections

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Brand & Design
- `CLAUDE.md` — Voice guidelines, design system, typography hierarchy
- `design-spec.md` — Type styles, button specs

### Current Site Content
- `.firecrawl/jennieslade.com/this-is-me/index.md` — Scraped "This is Me" page with existing bio seed
- `.firecrawl/jennieslade.com/about-me/index.md` — Scraped About page (currently "coming soon")

### Existing Components
- `src/components/layout/Section.tsx` — Section wrapper
- `src/components/ui/Button.tsx` — Primary/secondary buttons
- `src/components/ui/ScrollFade.tsx` — Scroll fade-in animation
- `src/components/homepage/WelcomeSection.tsx` — Reference for editorial text styling and voice

### Foundation
- `src/app/globals.css` — Typography classes including type-accent (Arapey) for testimonials

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `Section` component with default/muted/warm variants
- `Button` with primary/secondary variants and href support
- `ScrollFade` for scroll animations
- `type-accent` CSS class (Arapey font) — perfect for testimonial styling
- `type-title`, `type-heading`, `type-subheading`, `type-body` classes

### Established Patterns
- Server Components by default
- Warm-gray placeholder blocks (#d4d1cb) for photos
- Editorial text: max-w-2xl centered, type-body, short paragraphs
- First-person copy voice established in WelcomeSection

### Integration Points
- `src/app/about/page.tsx` — New page to create
- Header/Footer already wrap all pages via layout.tsx
- "Meet Jennie" button on homepage already links to /about

</code_context>

<specifics>
## Specific Ideas

- The About page should feel like meeting Jennie in person. Warm, genuine, a little funny, deeply personal.
- The grandpa's darkroom story is gold. It shows photography is in her blood, not just a business she started.
- "Mother of five, ages 13 to 25" immediately signals she understands every stage of family life.
- The page should make visitors think "I want HER to photograph my family" — not because she's the best technically, but because she clearly cares and has been doing this forever.
- Reference the WelcomeSection.tsx for voice and styling patterns — this page should feel like a natural extension of the homepage welcome.

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 04-about-page*
*Context gathered: 2026-03-31*
