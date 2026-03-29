# CLAUDE.md — Jennie Slade Photography Website

## Project Overview

This is the website for **Jennie Slade Photography** (jennieslade.com), a Las Vegas-based portrait photography business with 20+ years of experience specializing in families, weddings, and senior portraits.

We are migrating from Showit (drag-and-drop hosted platform) to a self-hosted Next.js site deployed on Vercel. The goal is full ownership, faster performance, and the ability to build and update pages through Claude Code without platform limitations.

**Live URL:** jennieslade.com
**Previous host:** Showit (showit.co)
**New stack:** Next.js + Tailwind CSS + Cloudinary (images) + Vercel (hosting)

---

## Site Owner

**Jennie Slade** — Photographer, creative entrepreneur, mother of five, Las Vegas native.

Jennie is not a developer. She works with Claude Code to build and maintain her sites. Write clean, well-commented code that's easy to understand and modify. When making decisions, lean toward simplicity over cleverness.

---

## Brand Identity

### Tagline
"Because memories make us who we are, let's freeze them in a photo, so we never forget."

### Positioning
Jennie is the photographer who has been capturing Las Vegas families for over two decades. She's warm, fun, and relaxed. The experience of working with her is stress-free. She's not intimidating, not overly artsy, not corporate. She's the photographer your family actually looks forward to seeing again.

### Unique Story
Jennie has photographed the same families for 18+ years. Newborn to senior portraits. This generational continuity is her superpower and should be subtly woven into the site's narrative.

### Voice (for all website copy)
- Warm, conversational, personal
- First person: "I'd love to capture your story"
- Story-first, not sales-first
- Encouraging, never pushy
- References real life: family, kids, memories, milestones
- Simple words: "fun," "relaxed," "real," "memories," "moments"
- Never uses: "leverage," "optimize," "utilize," "synergy," "platform"
- Never uses em dashes. Use periods, commas, or rewrite the sentence instead.
- Occasional fragments for emphasis. Like this.
- Rhetorical questions welcome: "You know that feeling when...?"

---

## Design System

### Design Feel
Editorial. Airy. Sophisticated but warm. Let the photographs be the hero of every page. Generous whitespace. Nothing cluttered. The site should feel like flipping through a beautiful magazine, not scrolling a business website.

### Colors

```css
:root {
  --color-black: #000000;        /* Titles, primary buttons */
  --color-charcoal: #1a1a1a;     /* Body text, headings */
  --color-gray: #6b6b6b;         /* Secondary/muted text */
  --color-blue-mist: #b8c5d4;    /* Soft accent */
  --color-teal-sage: #5f8f8b;    /* Brand accent color (use sparingly) */
  --color-warm-gray: #d4d1cb;    /* Section backgrounds, dividers */
  --color-warm-gray-light: #e3e0da; /* Alternate section backgrounds */
  --color-off-white: #f0eeeb;    /* Light backgrounds */
  --color-white: #ffffff;         /* Base background */
}
```

**Important:** The grays are WARM (slightly yellow/beige undertone), not cool. This is intentional. It gives the site a soft, timeless feel. Do not substitute with cool grays.

### Typography

```css
:root {
  --font-display: 'Libre Baskerville', Georgia, serif;
  --font-heading: 'Montserrat', sans-serif;
  --font-subheading: 'Apparel', sans-serif;
  --font-body: 'Libre Baskerville', Georgia, serif;
  --font-accent: 'Arapey', serif;
  --font-script: 'Destiny', cursive;
}
```

**Type Hierarchy:**

| Element | Font | Size (desktop) | Weight | Case | Letter Spacing |
|---------|------|---------------|--------|------|----------------|
| Title/H1 | Libre Baskerville | 30px+ | Normal | Uppercase | 0.02em |
| Heading/H2 | Montserrat | 12-14px | Normal | Uppercase | 0.02em |
| Subheading/H3 | Apparel Regular | 15-18px | Normal | Uppercase | 0.07em |
| Body/Paragraph | Libre Baskerville | 16px | Normal | Sentence | 0.02em |
| Body line-height | — | — | — | — | 1.9 (very airy) |

**Font Sourcing:**
- Libre Baskerville: Google Fonts (free)
- Montserrat: Google Fonts (free)
- Arapey: Google Fonts (free)
- Cormorant: Google Fonts (free)
- Apparel: Premium font (Fort Foundry). Self-host from /public/fonts/. Jennie has the files.
- Destiny Webfont: Custom script font. Self-host from /public/fonts/.

### Buttons

**Primary:** Black background, white text, Apparel Regular uppercase, 0.07em letter spacing, 10px border radius, padding 10px 14px.

**Secondary:** Transparent background, border only (black), same typography as primary. Ghost/outlined style.

**Hover states:** 80% opacity transition.

### Images
- Photography is the hero. Always.
- Images should be large, high-quality, and given room to breathe.
- Use Next.js Image component for automatic optimization.
- Cloudinary for CDN and responsive image delivery.
- Lazy loading on all images below the fold.
- Subtle fade-in animation on scroll for gallery images.
- Never crop awkwardly. Respect the photographer's composition.

---

## Site Structure

### Pages

| Page | Purpose |
|------|---------|
| `/` | Home. Hero images, tagline, welcome section, portfolio preview, Instagram link, footer. |
| `/about` | Jennie's bio, personal photos, personality showcase, personal IG link, CTA to contact. |
| `/portfolio` | Main portfolio hub linking to weddings, families, seniors. |
| `/weddings` | Wedding gallery and description. |
| `/families` | Family session gallery and description. |
| `/seniors` | Senior portrait gallery and description. |
| `/contact` | Contact form, pricing info, booking CTA. |
| `/blog` | Blog listing page. |
| `/blog/[slug]` | Individual blog posts. |

### Navigation
- Top nav: Home, About, Portfolio, Contact/Pricing, Blog
- Keep it minimal. No dropdowns unless absolutely necessary.
- Mobile: Clean hamburger menu.

### Footer
- "Jennie Slade Photography" in display font
- Email: jennie@jennieslade.com
- Instagram: @jenniesladephoto
- Nav links repeated
- Keep it simple. No giant footer grids.

---

## Technical Guidelines

### Framework & Deployment
- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS with custom theme extending the brand colors and fonts above
- **Images:** Cloudinary for hosting and optimization, Next.js Image component for rendering
- **Deployment:** Vercel (connected to GitHub repo)
- **Domain:** jennieslade.com (DNS pointed to Vercel)

### Code Style
- Clean, readable, well-commented
- Component-based architecture
- Mobile-first responsive design
- All images must use Next.js Image component (never raw img tags)
- Semantic HTML throughout
- Accessible: proper alt text on all images, keyboard navigation, ARIA labels where needed

### Performance Targets
- Lighthouse score: 90+ on all categories
- First Contentful Paint: under 1.5s
- Images should never block page rendering
- Fonts: preload display fonts, use font-display: swap

### SEO
- Meta titles and descriptions on every page
- Open Graph tags for social sharing (especially important for a photography site)
- Structured data for local business (Las Vegas photographer)
- Alt text on every image (descriptive, not keyword-stuffed)
- Blog posts should have proper heading hierarchy

---

## Content Guidelines

### Writing new copy for this site
- Read the `jennie-slade-voice` skill file for full voice guide
- Tone: Warm, personal, story-first
- Never write in third person ("Jennie Slade is a photographer...")
  unless it's a meta description or structured data
- Website copy should be first person: "I," "my," "I'd love to"
- Keep paragraphs short (2-3 sentences max on the site)
- Never use em dashes

### Blog posts
- Anecdote or story opening, not a thesis statement
- Conversational tone throughout
- Include images from relevant sessions
- End with a soft CTA or personal sign-off

---

## Reference Files

Located in `/site-capture/`:
- `design-spec.md` — Full design specification extracted from Showit
- `site-content-captured.md` — Text content from original Home and About pages
- `scrape-site.py` — Script to download all text and images from current site
- `showit-*.png` — Screenshots of Showit Design Settings (colors, fonts, type styles, buttons)
- `text-content/` — All page text (created by scraper)
- `images/` — All site images (created by scraper)
- `site-map.json` — Full site inventory (created by scraper)

---

## What to Remember

1. **The photos are the product.** Every design decision should make the photography look better, not compete with it.
2. **Warm, not cool.** Warm grays, warm whites, warm everything. This is not a tech company.
3. **Airy, not cramped.** When in doubt, add more whitespace.
4. **Simple, not clever.** Jennie maintains this site through Claude Code. Keep the architecture straightforward.
5. **Mobile matters.** Many potential clients find photographers on their phones. Mobile experience should be beautiful, not just functional.
6. **Speed matters.** Photographers' sites are notoriously slow because of images. We will not be one of those sites.

<!-- GSD:project-start source:PROJECT.md -->
## Project

**Jennie Slade Photography**

A high-end editorial photography website for Jennie Slade Photography (jennieslade.com), migrating from Showit to a self-hosted Next.js site. The site showcases 20+ years of Las Vegas portrait photography (families, weddings, seniors) with a magazine-quality editorial aesthetic inspired by Elizabeth Messina and Jose Villa. Built for a non-developer photographer who maintains the site through Claude Code.

**Core Value:** The photographs are the product. Every design decision must make the photography look stunning, never compete with it. The site should feel like flipping through a beautiful magazine.

### Constraints

- **Tech stack**: Next.js App Router + Tailwind CSS + Cloudinary + Vercel (decided)
- **Fonts**: Apparel and Destiny are custom fonts not yet in the project. Build with Google Fonts first, add custom fonts when files are available
- **Images**: Placeholder blocks for now. All images must use Next.js Image component when real images are added
- **Owner skill level**: Non-developer. Code must be clean and maintainable through Claude Code
- **Performance**: Lighthouse 90+, FCP under 1.5s. Photography sites are notoriously slow — we won't be one of those
- **Mobile**: Many clients find photographers on phones. Mobile experience must be beautiful, not just functional
<!-- GSD:project-end -->

<!-- GSD:stack-start source:research/STACK.md -->
## Technology Stack

## Recommended Stack
### Core Technologies
| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| Next.js | 16.x (latest: 16.2.1) | App framework | Industry standard for React-based marketing/portfolio sites. App Router provides server components, automatic image optimization via `next/image`, built-in SEO metadata API, and sitemap generation. Vercel deploys it with zero config. |
| React | 19.2 (bundled with Next.js 16) | UI library | Required by Next.js 16. React 19.2 includes View Transitions for smooth page animations, which suits editorial feel. No separate install needed — `npm install next@latest` pulls the correct React version. |
| TypeScript | 5.1+ | Type safety | Required minimum for Next.js 16. Catches class of bugs early; makes it easier for Claude Code to generate correct code and for Jennie to maintain long-term without a developer. |
| Tailwind CSS | 4.2.2 | Styling | Zero-config CSS framework. v4 uses CSS-native `@import "tailwindcss"` — no `tailwind.config.js` required. Inline utility classes make design changes readable and predictable. Custom CSS variables for brand colors map cleanly to Tailwind's theme system. |
| Cloudinary (next-cloudinary) | 6.1.0 | Image hosting, CDN, optimization | `CldImage` wraps `next/image` with automatic `f_auto` and `q_auto`, responsive srcsets, and Cloudinary's CDN. Photography sites live or die by image performance — this gets Lighthouse image scores to 90+ without manual optimization. Self-hosted images on Vercel would hit cold starts; Cloudinary is the right call. |
| Vercel | N/A (hosting) | Deployment | First-party Next.js hosting. Zero-config CI/CD from GitHub. Edge network, automatic HTTPS, preview deployments. The path-of-least-resistance choice for a non-developer site owner — no DevOps required. |
### Supporting Libraries
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| yet-another-react-lightbox | 3.29.2 | Full-screen gallery lightbox | Use on all gallery pages (weddings, families, seniors). Actively maintained, React 19 compatible, keyboard/touch/mouse navigation, responsive images with automatic resolution switching. Best-maintained lightbox in the React ecosystem as of early 2026. |
| React Hook Form | 7.x | Contact form management | Use only for the `/contact` page form. Minimal re-renders, uncontrolled inputs, and simple validation. For a 5-field contact form this is all you need — no Formik, no complex state management. |
| Resend | 6.9.4 | Transactional email (contact form) | Use in a Next.js Server Action to send contact form submissions to jennie@jennieslade.com. 100 emails/day free tier. Requires domain DNS verification. The cleanest serverless email solution for Next.js — no SMTP server to manage. |
| react-email | 5.2.10 | Email template for contact notifications | Optional but recommended. Lets you write the "you got a new inquiry" email as a React component. Pairs with Resend. |
| next-sitemap | 4.x | Sitemap + robots.txt generation | Use to auto-generate `/sitemap.xml` and `/robots.txt` at build time. Important for local SEO (Las Vegas photographer). Alternatively, Next.js 16 has built-in `app/sitemap.ts` — use that instead; see note below. |
### Development Tools
| Tool | Purpose | Notes |
|------|---------|-------|
| ESLint (built-in) | Linting | Next.js 16 ships with `@next/eslint-plugin-next` in Flat Config format (ESLint v10 compatible). Run directly: `npx eslint .` — `next lint` command is removed in v16. |
| Turbopack (default in Next.js 16) | Dev bundler | Default as of Next.js 16 — no configuration needed. 2-5x faster builds than Webpack, up to 10x faster Fast Refresh. Do not opt out unless you have a custom webpack plugin dependency. |
| TypeScript (built-in) | Type checking | `create-next-app` bootstraps TypeScript by default. Node.js native TypeScript stripping is available via `--experimental-next-config-strip-types` for `next.config.ts`. |
## Installation
# Bootstrap the project (includes Next.js 16, React 19, TypeScript, Tailwind v4, ESLint)
# Image delivery
# Gallery lightbox
# Contact form
# Email (contact form submission)
# .env.local
## Alternatives Considered
| Recommended | Alternative | When to Use Alternative |
|-------------|-------------|-------------------------|
| Next.js 16 | Astro 5 | Astro is better for fully static sites with no interactivity. Next.js is the right call here because of the contact form (Server Actions), future blog posts, and the team's familiarity. |
| Tailwind CSS v4 | CSS Modules | CSS Modules are valid for component-scoped styles. Tailwind is better here because rapid iteration matters more than CSS encapsulation, and utility classes are easier for Claude Code to generate precisely. |
| Cloudinary + next-cloudinary | Vercel Image Optimization (local) | Vercel's built-in optimization works but stores images in the repo. For a photography portfolio with hundreds of large images, Cloudinary's CDN and transformation API is the only sensible choice. |
| yet-another-react-lightbox | React Photoswipe Gallery | Photoswipe has excellent touch support but heavier setup. YARL is simpler to configure, actively maintained, and React 19 compatible out of the box. |
| Resend | Nodemailer + SMTP | Nodemailer requires managing an SMTP server or credentials for Gmail/SendGrid. Resend is serverless-native, has a clean API, and generous free tier. No SMTP credentials to rotate. |
| Server Actions (Next.js) for forms | Formik | Formik is heavier and older. Server Actions + React Hook Form is the modern Next.js pattern for 2025/2026 — less client-side JavaScript, better performance. |
| Native CSS scroll animations (Intersection Observer) | Framer Motion | Framer Motion adds ~50kb of JavaScript. For simple fade-in-on-scroll effects (the only animation this site needs), native CSS with Intersection Observer or Tailwind's `animate-` utilities is faster and removes a dependency. Use Framer Motion only if you need complex physics-driven animations. |
## What NOT to Use
| Avoid | Why | Use Instead |
|-------|-----|-------------|
| Pages Router | Deprecated in favor of App Router. New Next.js projects should always use App Router. Pages Router will not receive new features. | App Router (default in Next.js 16) |
| `next lint` CLI command | Removed in Next.js 16. Running `next lint` will error. | `npx eslint .` directly |
| `middleware.ts` for request interception | Deprecated in Next.js 16 in favor of `proxy.ts`. Will be removed in a future version. | Rename to `proxy.ts` from the start |
| `images.domains` config | Deprecated in Next.js 16. Security vulnerability — overly permissive. | `images.remotePatterns` in `next.config.ts` |
| Raw `<img>` tags | No optimization, lazy loading, or responsive srcsets. Against project guidelines. | `next/image` or `CldImage` from next-cloudinary |
| Framer Motion (full library) | ~50kb bundle cost for effects this site doesn't need. Scroll fade-ins are achievable with 10 lines of CSS. | CSS animations + Intersection Observer API, or Tailwind `transition`/`animate-` utilities |
| Formik | Heavier than React Hook Form, slower to render, largely superseded. | React Hook Form v7 |
| react-image-lightbox | Unmaintained. Last commit 2022. Will break with React 19. | yet-another-react-lightbox |
| Tailwind CSS v3 | v4 is the current major version. v3 uses a different config format (`tailwind.config.js`) and is entering maintenance mode. | Tailwind CSS v4 |
## Stack Patterns by Variant
- Use `CldImage` from next-cloudinary for all gallery thumbnails
- Use `yet-another-react-lightbox` for the full-screen overlay
- Render the image grid as a Server Component (no client state needed for layout)
- Make the lightbox a Client Component (`"use client"`) since it needs onClick handlers
- Use a Client Component for the form (React Hook Form requires browser APIs)
- Submit via a Next.js Server Action (`"use server"` function)
- Send email from the Server Action using Resend SDK
- No API route needed — Server Actions handle this directly in Next.js 16
- Store posts as MDX files in `/content/blog/` initially (no CMS needed)
- Use Next.js dynamic routes (`app/blog/[slug]/page.tsx`)
- Parse MDX with `next-mdx-remote` or built-in `@next/mdx` when blog is implemented
- This keeps the architecture simple — Jennie can add posts by adding files
- Google Fonts (Libre Baskerville, Montserrat, Arapey): Load via `next/font/google` — automatic optimization, no layout shift
- Apparel and Destiny (self-hosted): Load via `next/font/local` pointing to `/public/fonts/`
- Apply `font-display: swap` to all fonts (Next.js does this automatically)
- Use Next.js 16 built-in `generateMetadata()` on each page
- Use built-in `app/sitemap.ts` for sitemap generation (no package needed)
- Add JSON-LD structured data inline as a `<script type="application/ld+json">` in `layout.tsx` for LocalBusiness schema
- Open Graph images: Use static `opengraph-image.jpg` files per route (Next.js picks them up automatically)
## Version Compatibility
| Package | Compatible With | Notes |
|---------|-----------------|-------|
| next@16.x | react@19.2, typescript@5.1+ | React 19.2 is bundled — do not install an older React version separately |
| tailwindcss@4.2.2 | next@16.x (via PostCSS) | Known build issue with Tailwind v4.1.x and Turbopack in some configurations; v4.2.x resolves this. Pin to `^4.2.0` in package.json. |
| next-cloudinary@6.1.0 | next@15/16 | Wraps `next/image` — compatible with Next.js 16. Verify compatibility on first install. |
| yet-another-react-lightbox@3.29.2 | react@16.8+, including react@19 | Actively maintained; React 19 compatible confirmed. |
| resend@6.9.4 | Node.js 18+ (Next.js 16 requires Node.js 20.9+) | No conflict. |
| react-hook-form@7.x | react@16.8+, including react@19 | Stable, no known React 19 issues. |
| node | 20.9+ | Next.js 16 hard requirement. Node.js 18 is no longer supported. |
## Sources
- https://nextjs.org/blog/next-16 — Next.js 16 official release notes (version, breaking changes, React 19.2 requirement) — HIGH confidence
- https://tailwindcss.com/blog/tailwindcss-v4 — Tailwind CSS v4 official announcement (version 4.2.2, CSS-native config, browser support) — HIGH confidence
- https://next.cloudinary.dev/changelog — next-cloudinary v6.1.0 changelog — HIGH confidence
- https://yet-another-react-lightbox.com — Official YARL documentation, version 3.29.2 — HIGH confidence
- https://www.npmjs.com/package/resend — Resend npm page, version 6.9.4 — HIGH confidence
- https://resend.com/blog/react-email-5 — React Email 5.0 announcement, version 5.2.10 — HIGH confidence
- WebSearch: Tailwind v4 + Next.js 16 compatibility — MEDIUM confidence (multiple sources agree on v4.2.x resolving Turbopack issues)
- WebSearch: Framer Motion vs CSS animations comparison — MEDIUM confidence (consensus across multiple articles that CSS is sufficient for simple fade-in use cases)
<!-- GSD:stack-end -->

<!-- GSD:conventions-start source:CONVENTIONS.md -->
## Conventions

Conventions not yet established. Will populate as patterns emerge during development.
<!-- GSD:conventions-end -->

<!-- GSD:architecture-start source:ARCHITECTURE.md -->
## Architecture

Architecture not yet mapped. Follow existing patterns found in the codebase.
<!-- GSD:architecture-end -->

<!-- GSD:workflow-start source:GSD defaults -->
## GSD Workflow Enforcement

Before using Edit, Write, or other file-changing tools, start work through a GSD command so planning artifacts and execution context stay in sync.

Use these entry points:
- `/gsd:quick` for small fixes, doc updates, and ad-hoc tasks
- `/gsd:debug` for investigation and bug fixing
- `/gsd:execute-phase` for planned phase work

Do not make direct repo edits outside a GSD workflow unless the user explicitly asks to bypass it.
<!-- GSD:workflow-end -->

<!-- GSD:profile-start -->
## Developer Profile

> Profile not yet configured. Run `/gsd:profile-user` to generate your developer profile.
> This section is managed by `generate-claude-profile` -- do not edit manually.
<!-- GSD:profile-end -->
