# Project Research Summary

**Project:** Jennie Slade Photography Website
**Domain:** Editorial portrait photography portfolio (Next.js App Router)
**Researched:** 2026-03-29
**Confidence:** HIGH

## Executive Summary

This is a photography portfolio site migrating from Showit to a self-hosted Next.js site, and expert research confirms the stack and architectural approach are well-matched to the domain. The recommended approach is Next.js 16 App Router with Tailwind CSS v4, Cloudinary for image delivery via `next-cloudinary`, Resend for contact form email, and Vercel for hosting. This combination delivers the performance targets required by a photography portfolio (Lighthouse 90+, FCP under 1.5s) without requiring DevOps knowledge from a non-developer site owner. The architecture is deliberately minimal: static TypeScript arrays for gallery data, Server Actions for the contact form, and no CMS until traffic patterns justify the complexity.

The key differentiator for this site is not technology but editorial approach. Research across the fine-art photographer tier (Elizabeth Messina, Jose Villa) confirms that the sites that convert best lead with a magazine-spread homepage layout, curated galleries of 15-20 images per category, and a warm personal narrative. Jennie's specific advantage -- photographing the same families for 18+ years -- is a storytelling hook no competitor can replicate. The site's success depends on surfacing this narrative on the homepage and about page alongside technically excellent performance.

The primary risks are all performance-related and front-loaded: Cloudinary must be configured correctly from day one to avoid double image optimization; hero images must use the `priority` prop from the start to hit LCP targets; and custom fonts (Apparel, Destiny) must use `next/font/local` rather than CSS `@import` to eliminate layout shift. None of these are architecturally difficult, but all become expensive to fix retroactively. The foundation phase is therefore the highest-leverage investment in the project.

---

## Key Findings

### Recommended Stack

The stack is a standard, well-supported choice for a Next.js photography portfolio in 2026. Next.js 16 App Router with React 19.2 and TypeScript 5.1+ is the baseline. Tailwind CSS v4 uses a CSS-native `@import "tailwindcss"` approach with no config file required. The brand design tokens map cleanly into the `@theme` block in `globals.css`.

For images, `next-cloudinary` v6.1.0 with the `CldImage` component is the only correct approach. Using Cloudinary URLs inside the standard Next.js `<Image>` component without a Cloudinary loader causes double optimization (both systems re-encode the image), degrading quality and wasting bandwidth. For the gallery lightbox, `yet-another-react-lightbox` v3.29.2 is actively maintained, React 19 compatible, and handles touch/keyboard navigation correctly. For the contact form, React Hook Form v7 submits via a Next.js Server Action to Resend v6.9.4, with no API route needed.

**Core technologies:**
- **Next.js 16 (App Router):** Framework -- zero-config Vercel deployment, built-in metadata API, Server Actions for forms, automatic image optimization hooks
- **React 19.2:** Bundled with Next.js 16 -- View Transitions available for page animations
- **TypeScript 5.1+:** Required by Next.js 16 -- prevents class of bugs, makes Claude Code generation more reliable
- **Tailwind CSS v4:** Styling -- CSS-native config, brand tokens in `@theme` block, utility classes predictable for non-developer maintenance
- **next-cloudinary v6.1.0:** Image delivery -- `CldImage` wraps `next/image`, delegates optimization to Cloudinary CDN, `f_auto`/`q_auto` automatic
- **Resend v6.9.4:** Transactional email -- serverless-native, 100/day free tier, no SMTP to manage
- **yet-another-react-lightbox v3.29.2:** Gallery lightbox -- maintained, React 19 compatible, touch/keyboard/mouse support
- **Vercel:** Hosting -- zero-config Next.js CI/CD, edge CDN, preview deployments per PR

**One critical version note:** Node.js 20.9+ is required by Next.js 16. Node 18 is not supported.

### Expected Features

Research across the top-tier photography portfolio space confirms a clear feature hierarchy. Sites in the Elizabeth Messina / Jose Villa tier distinguish themselves through editorial homepage layout, curated galleries, and personal narrative -- not through feature volume. An inquiry form with 5-7 fields converts better than a booking widget. A footer Instagram link outperforms an embedded feed by every metric.

**Must have (table stakes) -- launch blockers:**
- Full-bleed editorial hero image(s) on homepage -- absence signals "template site"
- Gallery pages per session type (families, weddings, seniors) with lightbox
- About page with Jennie's 20+ year story and personal photos
- Contact/inquiry form (5-7 fields max -- more fields mean fewer submissions)
- Mobile-first responsive design -- 60%+ of traffic is mobile
- Fast load time: hero eager-loaded, everything else lazy, Cloudinary optimization
- Meta titles, descriptions, and Open Graph tags on every page
- LocalBusiness JSON-LD structured data (Las Vegas photographer -- local SEO impact)
- Blog listing page and post template (can have 0 posts at launch, but structure must exist)
- Footer with email, Instagram link, navigation

**Should have (competitive differentiators):**
- Stacked editorial homepage (magazine-spread layout, not a grid dump)
- Scroll-triggered fade-in animations (CSS + IntersectionObserver, no Framer Motion)
- Transparent/disappearing header on scroll-down, reappears on scroll-up
- Generational continuity narrative in copy (18+ years, same families -- Jennie's actual superpower)
- Curated galleries: 15-20 images per category (quality over quantity)
- Testimonials integrated near CTAs (not buried on a separate page)
- Per-page Open Graph images using real photography (critical for referrals via Instagram/iMessage)
- Blog posts targeting local SEO ("Las Vegas family photographer Red Rock Canyon")

**Defer to v2+:**
- "As Seen In" publications bar (needs real media credits)
- Email list footer opt-in (only if Jennie wants a newsletter)
- Subtle parallax on full-bleed sections (mobile performance must be tested first)
- Blog content strategy with keyword targeting (needs 5+ posts first)

**Anti-features to avoid explicitly:**
- Embedded Instagram feed (slow, breaks on API changes, diverts users before inquiry)
- Autoplay video hero (heavy, iOS issues, not better than a great still image)
- Masonry/Pinterest gallery grid (arbitrary cropping disrespects composition)
- Client proofing portal (Pixieset already handles this -- duplicate maintenance burden)
- Popup newsletter signup (kills editorial experience)

### Architecture Approach

The architecture follows the App Router principle strictly: Server Components for the outer shell, Client Components only where browser APIs are required. Only five component types need `'use client'`: Navigation (mobile menu toggle), GalleryGrid + Lightbox (lightbox state), ContactForm (React Hook Form requires browser APIs), ScrollFade wrapper (IntersectionObserver), and CloudinaryImage (next-cloudinary requirement). All page-level `page.tsx` files remain Server Components. This keeps client-side JavaScript minimal, which is critical for mobile performance.

Gallery image data is stored as static TypeScript arrays in `lib/gallery-data.ts` -- no CMS, no API calls, no loading states. This is appropriate for a photographer updating sessions a few times per year. When image volume grows to 100+ sessions annually, a headless CMS (Sanity) can be introduced incrementally without changing the component architecture.

**Major components and build order:**
1. **Foundation:** `globals.css` + Tailwind config (brand tokens), `next.config.ts` (remotePatterns), CloudinaryImage wrapper
2. **Layout shell:** Navigation, Footer, root `layout.tsx`
3. **UI primitives:** Button, SectionLabel, ScrollFade (design system atoms)
4. **Page sections:** HeroSection, WelcomeSection, PortfolioPreview, TestimonialSection
5. **Gallery system:** GalleryGrid + Lightbox (share state, co-located)
6. **Page assembly:** Home, About, Portfolio, Weddings, Families, Seniors
7. **Contact:** ContactForm, `lib/email.ts`, Server Action, contact page
8. **Blog:** BlogCard, BlogPost, listing page, `[slug]` post template

### Critical Pitfalls

1. **Double image optimization (Cloudinary + Next.js both transforming)** -- Use `<CldImage>` from `next-cloudinary` everywhere, never `<Image src={cloudinaryUrl}>`. Configure `remotePatterns` in `next.config.ts`, not the deprecated `images.domains`. Check: no `/_next/image?url=https%3A%2F%2Fres.cloudinary.com` URLs in the Network tab.

2. **Missing `width`/`height` on images causing CLS (Cumulative Layout Shift)** -- Every `CldImage` needs explicit `width` and `height`, or use `fill` with a positioned aspect-ratio wrapper (`<div className="relative aspect-[3/2] w-full">`). CLS above 0.1 fails Core Web Vitals. Gallery pages are the highest-risk location.

3. **Hero images lazy-loaded by default destroying LCP** -- Add `priority` prop to exactly one image per page (the above-fold hero). Lighthouse LCP must be below 2.5s on mobile. Overusing `priority` defeats the purpose.

4. **Font FOUT from self-hosted premium fonts (Apparel, Destiny)** -- Use `next/font/local` for Apparel and Destiny, `next/font/google` for Libre Baskerville/Montserrat/Arapey. Define all fonts in a single `lib/fonts.ts` file. Never use CSS `@import` for fonts. Verify `fonts.googleapis.com` is absent from the Network tab.

5. **`remotePatterns` misconfiguration causing silent image failures in production** -- Images work on localhost but fail on Vercel. Use the exact pattern: `{ protocol: 'https', hostname: 'res.cloudinary.com', pathname: '/YOUR_CLOUD_NAME/**' }`. Verify with `next build && next start` locally before first deploy.

6. **Mobile gallery UX that passes tests but frustrates real users** -- Test on an actual iPhone in Safari, not just browser DevTools. The lightbox must support swipe. Tap targets minimum 44x44px. `100vh` hero causes scroll issues on iOS (address bar shows/hides). Do not rely on hover states to reveal critical UI.

---

## Implications for Roadmap

The architecture research provides an explicit build order (8 phases of component dependencies). The feature research maps cleanly to MVP vs. post-validation. The pitfall research adds clear go/no-go criteria for each phase. The suggested roadmap structure below follows these dependencies.

### Phase 1: Foundation and Project Setup
**Rationale:** Every other component depends on Cloudinary configuration, brand tokens, and font setup being correct. Errors here compound -- fixing double optimization retroactively means touching every image across the site.
**Delivers:** Configured Next.js 16 project with Tailwind v4, brand design tokens, font loading (including Apparel/Destiny via `next/font/local`), Cloudinary integration, and verified `remotePatterns`.
**Addresses:** Performance baseline requirements, brand identity implementation
**Avoids:** Double optimization pitfall, font FOUT pitfall, remotePatterns misconfiguration pitfall
**Go/No-Go:** Network tab shows no `fonts.googleapis.com` requests; `next build && next start` loads images from Cloudinary correctly; CLS from fonts is zero.

### Phase 2: Layout Shell and Design System
**Rationale:** Navigation and Footer appear on every page. UI primitives (Button, SectionLabel, ScrollFade) enforce design system consistency. Building these before pages prevents inconsistency and rework.
**Delivers:** Navigation with mobile hamburger, Footer with email/Instagram/nav links, Button and SectionLabel components, ScrollFade wrapper component.
**Uses:** Tailwind v4 brand tokens from Phase 1, `next/font` variables, transparent-header scroll behavior
**Implements:** Root `layout.tsx` wiring nav + footer into every page
**Avoids:** Making page.tsx files Client Components just to support one interactive element (navigation)

### Phase 3: Homepage
**Rationale:** The homepage is the site's editorial statement and the most complex single page. Building it after the design system means all primitives are available. It also validates that the stacked editorial layout works on mobile before gallery pages are built.
**Delivers:** Full editorial homepage -- hero image (priority-loaded), welcome section with generational narrative, portfolio preview tiles, footer.
**Addresses:** Full-bleed hero, stacked editorial layout, tagline and brand voice, portfolio preview
**Avoids:** Hero LCP pitfall (verify priority prop + Lighthouse mobile run before marking complete)
**Research flag:** Standard patterns -- no phase research needed.

### Phase 4: About Page
**Rationale:** About page is architecturally simple (no dynamic data, no lightbox) and reinforces the generational continuity narrative that is Jennie's primary differentiator. Building it immediately after the homepage while copy decisions are fresh is efficient.
**Delivers:** Jennie's story, personal photos via CloudinaryImage, CTA to contact, testimonials section (placeholder if quotes not yet available).
**Addresses:** Personal story, generational family angle, social proof integration near CTA

### Phase 5: Gallery System and Portfolio Pages
**Rationale:** Gallery is the highest-risk phase for performance (CLS from images, mobile lightbox UX, lazy loading vs. eager). Building it after homepage validates the CloudinaryImage wrapper at scale. Galleries share the GalleryGrid and Lightbox components across all three session types.
**Delivers:** GalleryGrid component (Server Component wrapper, Client Component for lightbox state), Lightbox component (`yet-another-react-lightbox`), Portfolio hub page, Weddings/Families/Seniors gallery pages, `lib/gallery-data.ts` with initial image arrays.
**Addresses:** Gallery pages per session type, lightbox, curated 15-20 image galleries, mobile gallery UX
**Avoids:** CLS from missing image dimensions (aspect-ratio wrappers on all grid images), mobile lightbox broken (test on real iPhone in Safari), lazy loading below-fold images only
**Go/No-Go:** Lighthouse CLS below 0.1 on all three gallery pages; lightbox swipe works on actual iPhone; grid holds structure before images load.
**Research flag:** Standard patterns -- yet-another-react-lightbox is well-documented.

### Phase 6: Contact Page
**Rationale:** Contact is the conversion goal of the entire site. It depends on Resend domain verification (external step that can take time) and Server Actions (which require the foundation to be correct). Building it after galleries means the main portfolio experience is complete and testable end-to-end.
**Delivers:** ContactForm (5-7 fields: name, email, phone, session type, preferred date, message), Server Action (`sendContactEmail` via Resend), success/error states, spam honeypot field.
**Addresses:** Inquiry form, email delivery to jennie@jennieslade.com, spam protection
**Avoids:** Nodemailer/Gmail SMTP pitfall, no-spam-protection pitfall, unclear success state
**Go/No-Go:** Form submits successfully from a real mobile device; Jennie receives email at jennie@jennieslade.com; honeypot field catches bot-timing submissions; success message is clear and visible.

### Phase 7: SEO and Open Graph
**Rationale:** Meta tags, Open Graph images, and LocalBusiness JSON-LD can be done at any time but benefit from being done after real photography is on Cloudinary. This phase also adds the `app/sitemap.ts` for search engine indexing.
**Delivers:** `generateMetadata()` on every page, Open Graph images per route (1200x630 via Cloudinary), LocalBusiness JSON-LD in root layout, `app/sitemap.ts` and robots.txt.
**Addresses:** Local SEO for Las Vegas photographer, social sharing appearance, rich snippets in search results
**Go/No-Go:** Google Rich Results Test passes with no errors; Facebook Sharing Debugger shows correct image and title; Lighthouse SEO score 100.

### Phase 8: Blog Structure
**Rationale:** Blog infrastructure (listing page and `[slug]` post template) is needed at launch but can be built last because it has no dependencies on gallery or contact, and it can launch with zero posts. Building it last keeps the critical path (homepage, galleries, contact) unblocked.
**Delivers:** Blog listing page, individual post template (`app/blog/[slug]/page.tsx`), BlogCard and BlogPost components, MDX support via `@next/mdx` or `next-mdx-remote`.
**Addresses:** Blog infrastructure, local SEO foundation for future content
**Note:** Posts are content deliverables, not engineering deliverables. The blog can go live empty.

### Phase Ordering Rationale

- **Foundation first:** Cloudinary, fonts, and `next.config.ts` are the most expensive to fix retroactively. All other phases depend on them being correct.
- **Layout shell before pages:** Nav and Footer are in every page. Building them first prevents rework.
- **Homepage before galleries:** Validates the editorial aesthetic on the most complex page (stacked sections) before building the simpler but performance-critical gallery pages.
- **Contact after galleries:** Resend domain verification can run in parallel with gallery work; contact page has no dependencies on gallery components.
- **SEO phase near end:** Benefits from real photography being on Cloudinary; OG images with placeholders are less valuable.
- **Blog last:** No blocking dependencies; can launch empty; unblocks content work independently of engineering.

### Research Flags

Phases likely needing deeper research during planning:
- **Phase 6 (Contact/Resend):** Resend domain DNS verification process takes variable time (minutes to 48 hours). Research the DNS records needed for `jennieslade.com` early so verification can run in parallel with Phase 5 work.
- **Phase 7 (SEO):** LocalBusiness JSON-LD schema for a photography business has specific fields (service area, specialities, photography type). Validate the schema structure against Google's Rich Results Test before finalizing.

Phases with standard patterns (skip additional research):
- **Phase 1 (Foundation):** Next.js 16 + Tailwind v4 setup is thoroughly documented; the STACK.md install commands are verified.
- **Phase 2 (Layout shell):** Navigation and Footer are standard components; transparent-header scroll behavior is a well-known CSS pattern.
- **Phase 5 (Gallery):** yet-another-react-lightbox is well-documented with Next.js examples; CldImage usage is covered in next-cloudinary docs.
- **Phase 8 (Blog):** Next.js App Router dynamic routes and MDX are standard patterns with official docs.

---

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | Core technologies verified with official release notes and changelogs. Version compatibility table verified (Next.js 16, React 19.2, Tailwind v4.2.x, next-cloudinary 6.1.0). One known compatibility note: pin Tailwind to `^4.2.0` not `^4.1.x` due to resolved Turbopack issue. |
| Features | HIGH | Cross-referenced with multiple photography site analyses (StyleCloud, SiteBuilderReport, PhotoWebDesigns) and UX research (HoneyBook, ShootProof). Anti-feature rationale is evidence-based (not opinion). |
| Architecture | HIGH | Patterns verified with official Next.js App Router docs, next-cloudinary docs, and Resend + Next.js Server Actions documentation. Build order derived from actual component dependency graph. |
| Pitfalls | HIGH | Technical pitfalls verified with official docs (Next.js Image, next/font) and production error pattern reports. Performance pitfalls verified against Core Web Vitals documentation. Domain-specific pitfalls verified with photography community sources. |

**Overall confidence:** HIGH

### Gaps to Address

- **Apparel and Destiny font files:** Research assumes Jennie has these files and they can be placed in `/public/fonts/`. This must be confirmed before Phase 1 can be marked complete. If files are unavailable, a fallback serif must be planned for Apparel's role in headings and buttons.
- **Cloudinary account setup:** Research assumes a Cloudinary account exists or will be created. The free tier (25 transformations/month) may be insufficient during active development. The developer account (paid) or careful use of placeholder images in development avoids exhausting the free tier.
- **Real photography availability:** OG images per page (Phase 7) require real photography uploaded to Cloudinary. Timing for Jennie uploading images to Cloudinary is an external dependency that may delay Phase 7.
- **Resend domain verification timing:** DNS verification for the sending domain (`jennieslade.com`) can take up to 48 hours. This should be initiated at the start of Phase 6, not at the end.
- **Contact form spam protection depth:** Research recommends a honeypot field at minimum. If the site receives significant bot traffic post-launch, Cloudflare Turnstile (invisible CAPTCHA) is the recommended escalation. This can be added reactively rather than proactively.

---

## Sources

### Primary (HIGH confidence)
- https://nextjs.org/blog/next-16 -- Next.js 16 release notes, breaking changes, React 19.2 requirement
- https://tailwindcss.com/blog/tailwindcss-v4 -- Tailwind CSS v4 CSS-native config, version 4.2.2
- https://next.cloudinary.dev/changelog -- next-cloudinary v6.1.0 changelog and App Router integration
- https://yet-another-react-lightbox.com -- YARL v3.29.2 official documentation
- https://nextjs.org/docs/app/api-reference/components/image -- Next.js Image component, priority, sizes, fill, remotePatterns
- https://nextjs.org/docs/app/getting-started/server-and-client-components -- App Router Server/Client component patterns
- https://resend.com/nextjs -- Resend + Next.js Server Actions integration

### Secondary (MEDIUM confidence)
- https://stylecloud.co/fine-art-wedding-photography-websites/ -- Fine art photography site design patterns
- https://www.sitebuilderreport.com/inspiration/wedding-photography-websites -- Common patterns in top-tier photographer sites
- https://www.foregroundweb.com/photography-website-mistakes/ -- 60+ photography website anti-patterns
- https://www.corewebvitals.io/pagespeed/fix-largest-contentful-paint-image-was-lazily-loaded-lighthouse -- LCP / lazy load conflict
- https://makersden.io/blog/optimize-web-vitals-in-nextjs-2025 -- Core Web Vitals CLS and LCP fixes
- https://www.mikecassidyphotography.com/post/a-structured-data-json-ld-template-for-your-photography-business -- LocalBusiness JSON-LD for photographers

### Tertiary (contextual)
- https://blog.pixieset.com/blog/jose-villa-interview/ -- Editorial photography philosophy and client communication
- https://www.shutterseo.com/blog/technical-seo-for-photographers/ -- Photography-specific SEO patterns

---

*Research completed: 2026-03-29*
*Ready for roadmap: yes*
