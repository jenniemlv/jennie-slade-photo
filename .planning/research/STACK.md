# Stack Research

**Domain:** Editorial fine-art photography portfolio website
**Researched:** 2026-03-29
**Confidence:** HIGH (core stack verified with official docs; supporting libraries verified via npm/GitHub releases)

---

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

**Note on sitemaps:** Next.js 16 App Router supports `app/sitemap.ts` natively — this exports a `sitemap()` function that generates XML automatically. Use this built-in approach over `next-sitemap` to keep dependencies minimal. Only reach for `next-sitemap` if sitemap needs become complex (large multi-locale sites).

### Development Tools

| Tool | Purpose | Notes |
|------|---------|-------|
| ESLint (built-in) | Linting | Next.js 16 ships with `@next/eslint-plugin-next` in Flat Config format (ESLint v10 compatible). Run directly: `npx eslint .` — `next lint` command is removed in v16. |
| Turbopack (default in Next.js 16) | Dev bundler | Default as of Next.js 16 — no configuration needed. 2-5x faster builds than Webpack, up to 10x faster Fast Refresh. Do not opt out unless you have a custom webpack plugin dependency. |
| TypeScript (built-in) | Type checking | `create-next-app` bootstraps TypeScript by default. Node.js native TypeScript stripping is available via `--experimental-next-config-strip-types` for `next.config.ts`. |

---

## Installation

```bash
# Bootstrap the project (includes Next.js 16, React 19, TypeScript, Tailwind v4, ESLint)
npx create-next-app@latest jennie-slade-photo \
  --typescript \
  --tailwind \
  --app \
  --turbopack

# Image delivery
npm install next-cloudinary

# Gallery lightbox
npm install yet-another-react-lightbox

# Contact form
npm install react-hook-form

# Email (contact form submission)
npm install resend @react-email/components
```

**Tailwind v4 setup (CSS-only, no config file):**
```css
/* app/globals.css */
@import "tailwindcss";

/* Brand tokens as CSS custom properties */
@theme {
  --color-black: #000000;
  --color-charcoal: #1a1a1a;
  --color-gray: #6b6b6b;
  --color-blue-mist: #b8c5d4;
  --color-teal-sage: #5f8f8b;
  --color-warm-gray: #d4d1cb;
  --color-warm-gray-light: #e3e0da;
  --color-off-white: #f0eeeb;

  --font-display: 'Libre Baskerville', Georgia, serif;
  --font-heading: 'Montserrat', sans-serif;
  --font-subheading: 'Apparel', sans-serif;
  --font-body: 'Libre Baskerville', Georgia, serif;
  --font-accent: 'Arapey', serif;
  --font-script: 'Destiny', cursive;
}
```

**Cloudinary environment variable (required):**
```bash
# .env.local
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloud-name"
```

---

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

---

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

---

## Stack Patterns by Variant

**For gallery pages (weddings, families, seniors):**
- Use `CldImage` from next-cloudinary for all gallery thumbnails
- Use `yet-another-react-lightbox` for the full-screen overlay
- Render the image grid as a Server Component (no client state needed for layout)
- Make the lightbox a Client Component (`"use client"`) since it needs onClick handlers

**For the contact page:**
- Use a Client Component for the form (React Hook Form requires browser APIs)
- Submit via a Next.js Server Action (`"use server"` function)
- Send email from the Server Action using Resend SDK
- No API route needed — Server Actions handle this directly in Next.js 16

**For the blog:**
- Store posts as MDX files in `/content/blog/` initially (no CMS needed)
- Use Next.js dynamic routes (`app/blog/[slug]/page.tsx`)
- Parse MDX with `next-mdx-remote` or built-in `@next/mdx` when blog is implemented
- This keeps the architecture simple — Jennie can add posts by adding files

**For fonts:**
- Google Fonts (Libre Baskerville, Montserrat, Arapey): Load via `next/font/google` — automatic optimization, no layout shift
- Apparel and Destiny (self-hosted): Load via `next/font/local` pointing to `/public/fonts/`
- Apply `font-display: swap` to all fonts (Next.js does this automatically)

**For SEO:**
- Use Next.js 16 built-in `generateMetadata()` on each page
- Use built-in `app/sitemap.ts` for sitemap generation (no package needed)
- Add JSON-LD structured data inline as a `<script type="application/ld+json">` in `layout.tsx` for LocalBusiness schema
- Open Graph images: Use static `opengraph-image.jpg` files per route (Next.js picks them up automatically)

---

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

---

## Sources

- https://nextjs.org/blog/next-16 — Next.js 16 official release notes (version, breaking changes, React 19.2 requirement) — HIGH confidence
- https://tailwindcss.com/blog/tailwindcss-v4 — Tailwind CSS v4 official announcement (version 4.2.2, CSS-native config, browser support) — HIGH confidence
- https://next.cloudinary.dev/changelog — next-cloudinary v6.1.0 changelog — HIGH confidence
- https://yet-another-react-lightbox.com — Official YARL documentation, version 3.29.2 — HIGH confidence
- https://www.npmjs.com/package/resend — Resend npm page, version 6.9.4 — HIGH confidence
- https://resend.com/blog/react-email-5 — React Email 5.0 announcement, version 5.2.10 — HIGH confidence
- WebSearch: Tailwind v4 + Next.js 16 compatibility — MEDIUM confidence (multiple sources agree on v4.2.x resolving Turbopack issues)
- WebSearch: Framer Motion vs CSS animations comparison — MEDIUM confidence (consensus across multiple articles that CSS is sufficient for simple fade-in use cases)

---

*Stack research for: Editorial fine-art photography portfolio (Jennie Slade Photography)*
*Researched: 2026-03-29*
