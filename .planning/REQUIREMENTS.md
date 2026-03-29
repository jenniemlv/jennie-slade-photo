# Requirements: Jennie Slade Photography

**Defined:** 2026-03-29
**Core Value:** The photographs are the product. Every design decision must make the photography look stunning, never compete with it.

## v1 Requirements

Requirements for initial release. Each maps to roadmap phases.

### Foundation

- [ ] **FOUN-01**: Next.js 16 App Router project bootstrapped with TypeScript and Tailwind CSS v4
- [ ] **FOUN-02**: Brand color palette configured as Tailwind theme extensions (warm grays, teal-sage accent)
- [ ] **FOUN-03**: Google Fonts configured via next/font (Libre Baskerville, Montserrat, Arapey)
- [ ] **FOUN-04**: Custom font slots prepared for Apparel and Destiny (next/font/local, fallback to system fonts until files provided)
- [ ] **FOUN-05**: Cloudinary configured in next.config with remotePatterns and next-cloudinary installed
- [ ] **FOUN-06**: Base CSS with typography hierarchy matching design spec (title, heading, subheading, paragraph styles)

### Layout

- [ ] **LAYO-01**: Centered elegant navigation with site name/logo centered above nav links
- [ ] **LAYO-02**: Navigation is responsive with clean hamburger menu on mobile
- [ ] **LAYO-03**: Header disappears on scroll-down, reappears on scroll-up (transparent/disappearing behavior)
- [ ] **LAYO-04**: Footer with "Jennie Slade Photography" in display font, email, Instagram link, and nav links
- [ ] **LAYO-05**: Reusable section layout components for consistent whitespace and padding
- [ ] **LAYO-06**: Primary and secondary button components matching design spec (Apparel font, uppercase, 10px radius)

### Homepage

- [ ] **HOME-01**: Stacked editorial layout with large images interspersed with text sections (magazine-spread feel)
- [ ] **HOME-02**: Hero section with full-width image, tagline overlay, eager-loaded for LCP performance
- [ ] **HOME-03**: Welcome/intro text section with Jennie's voice and generational continuity story hook
- [ ] **HOME-04**: Portfolio preview section showcasing weddings, families, and seniors with links to gallery pages
- [ ] **HOME-05**: Subtle scroll-triggered fade-in animations on sections below the fold
- [ ] **HOME-06**: Fully responsive and beautiful on mobile devices

### About

- [ ] **ABOU-01**: About page with Jennie's personal story, bio, and personality
- [ ] **ABOU-02**: Personal photo(s) of Jennie integrated into the page layout
- [ ] **ABOU-03**: Generational continuity narrative (18+ years photographing the same families)
- [ ] **ABOU-04**: Testimonial quotes integrated near relevant content (placeholder slots if quotes not yet provided)
- [ ] **ABOU-05**: CTA to contact page at the bottom

### Portfolio

- [ ] **PORT-01**: Portfolio hub page linking to weddings, families, and seniors galleries
- [ ] **PORT-02**: Clean uniform grid gallery component with generous spacing between images
- [ ] **PORT-03**: Full-screen lightbox on image click (keyboard-navigable, swipe on mobile, prev/next)
- [ ] **PORT-04**: Weddings gallery page with descriptive text and curated image grid
- [ ] **PORT-05**: Families gallery page with descriptive text and curated image grid
- [ ] **PORT-06**: Seniors gallery page with descriptive text and curated image grid
- [ ] **PORT-07**: Gallery images use Cloudinary CldImage component with proper width/height to prevent CLS
- [ ] **PORT-08**: Gallery data stored in static TypeScript arrays (easy for non-developer to update)

### Contact

- [ ] **CONT-01**: Contact page with simple inquiry form (name, email, session type dropdown, preferred date, message)
- [ ] **CONT-02**: Form validation with clear error messages
- [ ] **CONT-03**: Form submission sends email via Resend (Server Action, no API route needed)
- [ ] **CONT-04**: Success confirmation message after form submission
- [ ] **CONT-05**: Honeypot field for spam protection

### Blog

- [ ] **BLOG-01**: Blog listing page showing posts with title, date, excerpt, and featured image
- [ ] **BLOG-02**: Individual blog post template with proper heading hierarchy (H1 title, H2/H3 sections)
- [ ] **BLOG-03**: Blog posts stored as MDX files (easy to create and edit via Claude Code)
- [ ] **BLOG-04**: Blog post images use Cloudinary for optimization

### SEO & Performance

- [ ] **SEOP-01**: Unique meta title and description on every page via generateMetadata
- [ ] **SEOP-02**: Open Graph tags with 1200x630 images for social sharing on every page
- [ ] **SEOP-03**: LocalBusiness JSON-LD structured data for Las Vegas photographer
- [ ] **SEOP-04**: Sitemap generated via app/sitemap.ts
- [ ] **SEOP-05**: All images have descriptive, location-specific alt text
- [ ] **SEOP-06**: Lighthouse score 90+ on all categories
- [ ] **SEOP-07**: First Contentful Paint under 1.5 seconds
- [ ] **SEOP-08**: CLS less than 0.1 across all pages (no layout shift from images or fonts)
- [ ] **SEOP-09**: Proper font-display: swap to prevent FOUT/FOIT

### Design Quality

- [ ] **DESN-01**: Editorial magazine feel with generous whitespace throughout
- [ ] **DESN-02**: Warm color palette consistently applied (no cool grays anywhere)
- [ ] **DESN-03**: Serif-dominant typography creating timeless, sophisticated feel
- [ ] **DESN-04**: Photography is always the hero element on every page
- [ ] **DESN-05**: Reading-line text layout (short paragraphs, 1.9 line-height, text breathing room)
- [ ] **DESN-06**: Subtle page transition animations (soft fade between routes)
- [ ] **DESN-07**: Placeholder blocks (warm-gray) for all images until real photography is added

## v2 Requirements

Deferred to future release. Tracked but not in current roadmap.

### Content Additions

- **V2-01**: "As Seen In" press/publication credits section (when Jennie has credentials to feature)
- **V2-02**: Testimonials page or expanded testimonial integration across pages
- **V2-03**: Seasonal mini-session landing pages
- **V2-04**: Email newsletter signup (subtle, footer-based)

### Technical Enhancements

- **V2-05**: Apparel and Destiny custom font integration (when font files are provided)
- **V2-06**: Real Cloudinary images replacing placeholder blocks
- **V2-07**: CMS integration for blog posts (if MDX becomes too technical)
- **V2-08**: Analytics integration (Google Analytics or Plausible)

## Out of Scope

| Feature | Reason |
|---------|--------|
| Embedded Instagram feed | Slow to load, breaks when API changes, diverts visitors off-site. Link only. |
| Autoplay video hero | Heavy bandwidth, often breaks on iOS, a great still image is more compelling |
| Splash/intro page | Users resent forced delays, kills SEO |
| Client portal / proofing gallery | Handled by Pixieset. Building a second system adds maintenance with no benefit |
| Online booking / scheduling widget | Adds third-party JS weight, inquiry form keeps conversation personal |
| Pricing calculator | Photography pricing is relationship-based. Calculators create sticker shock |
| Masonry/Pinterest gallery | Breaks grid discipline, disrespects composition, harder on mobile |
| Popup newsletter signup | Interrupts editorial experience, signals marketing machine not artist |
| Background music | Universally disliked |
| Parallax scrolling on gallery images | Conflicts with photo composition, causes mobile jank |
| E-commerce / print sales | Not part of this build |
| User accounts / login | No client portal needed |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| FOUN-01 | Phase 1 | Pending |
| FOUN-02 | Phase 1 | Pending |
| FOUN-03 | Phase 1 | Pending |
| FOUN-04 | Phase 1 | Pending |
| FOUN-05 | Phase 1 | Pending |
| FOUN-06 | Phase 1 | Pending |
| DESN-03 | Phase 1 | Pending |
| DESN-05 | Phase 1 | Pending |
| DESN-07 | Phase 1 | Pending |
| SEOP-07 | Phase 1 | Pending |
| SEOP-09 | Phase 1 | Pending |
| LAYO-01 | Phase 2 | Pending |
| LAYO-02 | Phase 2 | Pending |
| LAYO-03 | Phase 2 | Pending |
| LAYO-04 | Phase 2 | Pending |
| LAYO-05 | Phase 2 | Pending |
| LAYO-06 | Phase 2 | Pending |
| DESN-02 | Phase 2 | Pending |
| DESN-06 | Phase 2 | Pending |
| HOME-01 | Phase 3 | Pending |
| HOME-02 | Phase 3 | Pending |
| HOME-03 | Phase 3 | Pending |
| HOME-04 | Phase 3 | Pending |
| HOME-05 | Phase 3 | Pending |
| HOME-06 | Phase 3 | Pending |
| DESN-01 | Phase 3 | Pending |
| DESN-04 | Phase 3 | Pending |
| ABOU-01 | Phase 4 | Pending |
| ABOU-02 | Phase 4 | Pending |
| ABOU-03 | Phase 4 | Pending |
| ABOU-04 | Phase 4 | Pending |
| ABOU-05 | Phase 4 | Pending |
| PORT-01 | Phase 5 | Pending |
| PORT-02 | Phase 5 | Pending |
| PORT-03 | Phase 5 | Pending |
| PORT-04 | Phase 5 | Pending |
| PORT-05 | Phase 5 | Pending |
| PORT-06 | Phase 5 | Pending |
| PORT-07 | Phase 5 | Pending |
| PORT-08 | Phase 5 | Pending |
| SEOP-05 | Phase 5 | Pending |
| SEOP-08 | Phase 5 | Pending |
| CONT-01 | Phase 6 | Pending |
| CONT-02 | Phase 6 | Pending |
| CONT-03 | Phase 6 | Pending |
| CONT-04 | Phase 6 | Pending |
| CONT-05 | Phase 6 | Pending |
| SEOP-01 | Phase 7 | Pending |
| SEOP-02 | Phase 7 | Pending |
| SEOP-03 | Phase 7 | Pending |
| SEOP-04 | Phase 7 | Pending |
| SEOP-06 | Phase 7 | Pending |
| BLOG-01 | Phase 8 | Pending |
| BLOG-02 | Phase 8 | Pending |
| BLOG-03 | Phase 8 | Pending |
| BLOG-04 | Phase 8 | Pending |

**Coverage:**
- v1 requirements: 43 total
- Mapped to phases: 43
- Unmapped: 0

---
*Requirements defined: 2026-03-29*
*Last updated: 2026-03-29 after roadmap creation — all 43 requirements mapped*
