# Jennie Slade Photography

## What This Is

A high-end editorial photography website for Jennie Slade Photography (jennieslade.com), migrating from Showit to a self-hosted Next.js site. The site showcases 20+ years of Las Vegas portrait photography (families, weddings, seniors) with a magazine-quality editorial aesthetic inspired by Elizabeth Messina and Jose Villa. Built for a non-developer photographer who maintains the site through Claude Code.

## Core Value

The photographs are the product. Every design decision must make the photography look stunning, never compete with it. The site should feel like flipping through a beautiful magazine.

## Requirements

### Validated

- ✓ Next.js App Router project with Tailwind CSS, custom fonts, and brand color palette — Validated in Phase 1: Foundation
- ✓ Cloudinary integration for image hosting and optimization — Validated in Phase 1: Foundation

### Active
- [ ] Responsive navigation with centered elegant layout (logo/name centered, nav links below)
- [ ] Stacked editorial homepage with large images, tagline, welcome text, portfolio previews
- [ ] About page with Jennie's bio, personal story, and personality
- [ ] Portfolio hub page linking to session types
- [ ] Weddings gallery page with clean grid layout and lightbox
- [ ] Families gallery page with clean grid layout and lightbox
- [ ] Seniors gallery page with clean grid layout and lightbox
- [ ] Contact page with simple inquiry form (name, email, session type, date, message)
- [ ] Blog listing page
- [ ] Individual blog post template
- [ ] SEO meta tags and Open Graph tags on all pages
- [ ] Mobile-first responsive design that's beautiful on phones
- [ ] Subtle scroll animations (fade-in) and smooth page transitions
- [ ] Performance optimized (Lighthouse 90+, FCP under 1.5s)
- [ ] Footer with branding, email, Instagram link, and nav links

### Out of Scope

- Instagram embedded feed — keeping it to a link only for cleaner design
- E-commerce / print sales — not part of this build
- Client galleries / proofing — handled by Pixieset separately
- CMS / admin panel — content managed through code for now
- Online booking system — simple inquiry form sends to email
- User accounts / login — no client portal needed
- Video content — photography-only site

## Context

**Migration:** Moving from Showit (drag-and-drop hosted platform) to self-hosted Next.js on Vercel. Motivated by wanting full ownership, faster performance, and the ability to build/update through Claude Code.

**Design direction:** Editorial, airy, sophisticated. Inspired by the luminous, film-quality aesthetic of Elizabeth Messina and Jose Villa. Serif-dominant typography, warm neutral palette, generous whitespace, full-bleed photography. Think high-end photography magazine, not a business website.

**Brand fonts:** Libre Baskerville (titles/body), Montserrat (headings), Apparel (subheadings/buttons, self-hosted), Arapey (accent), Destiny (script, self-hosted). Currently no font files in the project — using Google Fonts for available fonts, will add Apparel and Destiny later.

**Brand colors:** Warm palette with beige undertones. Black, charcoal, warm grays, off-white, with teal-sage (#5f8f8b) as the only color accent. No cool grays.

**Images:** Using warm-gray colored placeholder blocks initially. Real images will be added later and hosted on Cloudinary.

**Key design decisions from questioning:**
- Homepage: Stacked editorial layout (large images interspersed with text sections, magazine-spread feel)
- Navigation: Centered elegant (name/logo centered above nav links)
- Galleries: Clean uniform grid with generous spacing, full-screen lightbox on click
- Animations: Subtle fade-ins on scroll only, nothing flashy
- Contact: Simple form (name, email, session type, date, message) that sends to email
- Instagram: Icon/link only in footer, no embedded feed

**Site owner:** Jennie Slade is a photographer, not a developer. Code should be clean, well-commented, and easy to understand. Simplicity over cleverness.

## Constraints

- **Tech stack**: Next.js App Router + Tailwind CSS + Cloudinary + Vercel (decided)
- **Fonts**: Apparel and Destiny are custom fonts not yet in the project. Build with Google Fonts first, add custom fonts when files are available
- **Images**: Placeholder blocks for now. All images must use Next.js Image component when real images are added
- **Owner skill level**: Non-developer. Code must be clean and maintainable through Claude Code
- **Performance**: Lighthouse 90+, FCP under 1.5s. Photography sites are notoriously slow — we won't be one of those
- **Mobile**: Many clients find photographers on phones. Mobile experience must be beautiful, not just functional

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Next.js App Router over Pages Router | Modern architecture, better performance, server components | — Pending |
| Tailwind CSS for styling | Rapid development, easy customization, good DX with Claude Code | — Pending |
| Cloudinary for images | CDN, responsive delivery, automatic optimization | — Pending |
| Stacked editorial homepage | Magazine-spread feel, lets photos breathe, inspired by fine art photographers | — Pending |
| Centered elegant navigation | Editorial feel, more sophisticated than standard left-aligned nav | — Pending |
| Clean grid galleries with lightbox | Uniform presentation respects photographer's composition, lightbox for full impact | — Pending |
| Simple contact form over booking system | Lower complexity, Jennie handles bookings personally | — Pending |
| No Instagram embed | Cleaner design, faster load, just link to profile | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd:transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd:complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-03-30 after Phase 1: Foundation complete*
