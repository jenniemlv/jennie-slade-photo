# Roadmap: Jennie Slade Photography

## Overview

Eight phases build the site in dependency order: foundation and configuration first (everything else depends on it being correct), then the layout shell that wraps every page, then the homepage that proves the editorial aesthetic works, then the about page, then the gallery system (the performance-critical core of a photography site), then the contact page (the conversion goal), then SEO and structured data, and finally the blog infrastructure. Each phase delivers a complete, verifiable capability. Real photography and custom fonts (Apparel, Destiny) are external dependencies that slot in as content deliverables after the structure is proven.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [x] **Phase 1: Foundation** - Next.js project with brand tokens, fonts, Cloudinary, and base CSS configured correctly from day one (completed 2026-03-30)
- [x] **Phase 2: Layout Shell** - Navigation, footer, and design system primitives that wrap every page (completed 2026-03-30)
- [ ] **Phase 3: Homepage** - The editorial statement of the site, proving the magazine-spread layout works
- [ ] **Phase 4: About Page** - Jennie's story, generational continuity narrative, and social proof
- [ ] **Phase 5: Gallery System** - Portfolio hub and three gallery pages with lightbox, the highest-risk performance phase
- [ ] **Phase 6: Contact Page** - Inquiry form with email delivery, the conversion goal of the site
- [ ] **Phase 7: SEO and Open Graph** - Meta tags, structured data, sitemap, and performance verification across all pages
- [ ] **Phase 8: Blog Structure** - Blog listing page and post template, ready for content with zero posts at launch

## Phase Details

### Phase 1: Foundation
**Goal**: A correctly configured Next.js project that won't require expensive retroactive fixes to Cloudinary, fonts, or build config
**Depends on**: Nothing (first phase)
**Requirements**: FOUN-01, FOUN-02, FOUN-03, FOUN-04, FOUN-05, FOUN-06, DESN-03, DESN-05, DESN-07, SEOP-07, SEOP-09
**Success Criteria** (what must be TRUE):
  1. `next build && next start` completes without errors and images load from Cloudinary (no double-optimization in the Network tab)
  2. No `fonts.googleapis.com` requests in the Network tab (all fonts load via next/font)
  3. Libre Baskerville, Montserrat, Arapey render correctly; Apparel and Destiny slots exist with system-font fallbacks
  4. Brand color tokens (warm grays, teal-sage) are available as Tailwind utilities throughout the project
  5. Base typography hierarchy (title, heading, subheading, body, accent) matches the design spec in a rendered test page
**Plans:** 2/2 plans complete
Plans:
- [x] 01-01-PLAN.md — Bootstrap Next.js project, configure fonts, colors, Cloudinary, and typography
- [x] 01-02-PLAN.md — CloudinaryImage wrapper, /dev test page, and visual verification

### Phase 2: Layout Shell
**Goal**: Navigation and footer exist on every page, the design system atoms are ready to use, and root layout is wired correctly
**Depends on**: Phase 1
**Requirements**: LAYO-01, LAYO-02, LAYO-03, LAYO-04, LAYO-05, LAYO-06, DESN-02, DESN-06
**Success Criteria** (what must be TRUE):
  1. Centered elegant navigation renders with site name above nav links on desktop; hamburger menu opens and closes correctly on mobile
  2. Header is transparent over content, disappears on scroll-down, and reappears on scroll-up
  3. Footer shows "Jennie Slade Photography" in display font with email, Instagram link, and nav links
  4. Primary and secondary button components render in Apparel/fallback font, uppercase, with correct border radius and hover state
  5. Warm color palette is visibly consistent throughout nav and footer (no cool grays appear)
**Plans:** 3/3 plans complete
Plans:
- [x] 02-01-PLAN.md — Section, Button, and PageTransition design system primitives
- [x] 02-02-PLAN.md — Scroll-aware Header with mobile menu overlay
- [x] 02-03-PLAN.md — Footer component and root layout wiring with visual verification
**UI hint**: yes

### Phase 3: Homepage
**Goal**: The editorial homepage delivers the magazine-spread experience and proves the stacked layout works on mobile
**Depends on**: Phase 2
**Requirements**: HOME-01, HOME-02, HOME-03, HOME-04, HOME-05, HOME-06, DESN-01, DESN-04
**Success Criteria** (what must be TRUE):
  1. Hero section fills the viewport with a full-width image (or warm-gray placeholder) and tagline overlay, with no layout shift on load
  2. Welcome section communicates Jennie's voice and generational continuity story in warm, personal copy
  3. Portfolio preview section shows weddings, families, and seniors tiles with links to their respective gallery pages
  4. Sections below the fold fade in smoothly on scroll (not immediately visible, not jarring)
  5. The page is beautiful and usable on a real iPhone in Safari, not just browser DevTools
**Plans:** 2 plans
Plans:
- [ ] 03-01-PLAN.md — ScrollFade component, HeroSection, and WelcomeSection with editorial copy
- [ ] 03-02-PLAN.md — PortfolioPreview component, page.tsx composition, and visual verification
**UI hint**: yes

### Phase 4: About Page
**Goal**: Visitors understand who Jennie is, why she's different, and are moved toward getting in touch
**Depends on**: Phase 3
**Requirements**: ABOU-01, ABOU-02, ABOU-03, ABOU-04, ABOU-05
**Success Criteria** (what must be TRUE):
  1. Jennie's bio and personal story are present with a photo of Jennie integrated into the layout
  2. The generational continuity narrative (18+ years, same families) appears as a distinct section or callout
  3. At least one testimonial quote appears near the bottom of the page (placeholder slot acceptable if quotes not yet provided)
  4. A clear CTA to the contact page appears at the bottom of the page
**Plans**: TBD
**UI hint**: yes

### Phase 5: Gallery System
**Goal**: Visitors can browse curated photography across three session types and view any image full-screen without layout shift or mobile UX failures
**Depends on**: Phase 2
**Requirements**: PORT-01, PORT-02, PORT-03, PORT-04, PORT-05, PORT-06, PORT-07, PORT-08, SEOP-05, SEOP-08
**Success Criteria** (what must be TRUE):
  1. Portfolio hub page links visually to weddings, families, and seniors gallery pages
  2. Gallery grids display images in a clean uniform grid with generous spacing; grid structure is visible before images load (no CLS)
  3. Clicking any image opens a full-screen lightbox; keyboard arrow navigation and mobile swipe both work correctly
  4. Gallery images use `CldImage` with explicit dimensions; Lighthouse CLS score is below 0.1 on all three gallery pages
  5. Lightbox and swipe navigation work on an actual iPhone in Safari (not just DevTools mobile emulation)
**Plans**: TBD
**UI hint**: yes

### Phase 6: Contact Page
**Goal**: Visitors can submit an inquiry and Jennie receives it by email, reliably, from any device
**Depends on**: Phase 2
**Requirements**: CONT-01, CONT-02, CONT-03, CONT-04, CONT-05
**Success Criteria** (what must be TRUE):
  1. Contact form renders with fields for name, email, session type dropdown, preferred date, and message
  2. Submitting the form with missing required fields shows clear inline error messages before submission
  3. A successful form submission delivers an email to jennie@jennieslade.com via Resend
  4. After successful submission, a confirmation message is clearly visible on the page
  5. A honeypot field is present in the form DOM and submission with it filled is rejected silently
**Plans**: TBD
**UI hint**: yes

### Phase 7: SEO and Open Graph
**Goal**: Every page is discoverable, share-worthy on social media, and validated for local search as a Las Vegas photographer
**Depends on**: Phase 5
**Requirements**: SEOP-01, SEOP-02, SEOP-03, SEOP-04, SEOP-06
**Success Criteria** (what must be TRUE):
  1. Every page has a unique meta title and description that renders correctly in browser tabs and search results
  2. Sharing any page URL on iMessage or Instagram shows the correct Open Graph image, title, and description
  3. Google Rich Results Test passes for LocalBusiness JSON-LD with no errors (Las Vegas photographer structured data)
  4. `app/sitemap.ts` generates a valid sitemap covering all routes
  5. Lighthouse SEO score is 100 and overall score is 90+ on all categories across all pages
**Plans**: TBD

### Phase 8: Blog Structure
**Goal**: Blog infrastructure exists and is ready to receive content, even with zero posts at launch
**Depends on**: Phase 2
**Requirements**: BLOG-01, BLOG-02, BLOG-03, BLOG-04
**Success Criteria** (what must be TRUE):
  1. Blog listing page renders at `/blog` with a message or empty state when no posts exist
  2. Creating an MDX file in the correct directory makes a post appear on the listing page with title, date, and excerpt
  3. Individual blog post pages render at `/blog/[slug]` with correct H1 title and H2/H3 heading hierarchy
  4. Blog post images reference Cloudinary and render without layout shift
**Plans**: TBD
**UI hint**: yes

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4 → 5 → 6 → 7 → 8

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation | 2/2 | Complete   | 2026-03-30 |
| 2. Layout Shell | 3/3 | Complete   | 2026-03-30 |
| 3. Homepage | 0/2 | In progress | - |
| 4. About Page | 0/TBD | Not started | - |
| 5. Gallery System | 0/TBD | Not started | - |
| 6. Contact Page | 0/TBD | Not started | - |
| 7. SEO and Open Graph | 0/TBD | Not started | - |
| 8. Blog Structure | 0/TBD | Not started | - |
