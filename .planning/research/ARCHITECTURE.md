# Architecture Research

**Domain:** Editorial photography portfolio website (Next.js App Router)
**Researched:** 2026-03-29
**Confidence:** HIGH

## Standard Architecture

### System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        Browser (Client)                          │
│  ┌──────────────┐  ┌───────────────┐  ┌────────────────────┐    │
│  │  Navigation  │  │  Page Content │  │  Interactive UI    │    │
│  │ (Client Comp)│  │ (Server Comp) │  │ (Client Components)│    │
│  └──────────────┘  └───────────────┘  └────────────────────┘    │
├─────────────────────────────────────────────────────────────────┤
│                     Next.js App Router                           │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐  ┌──────────┐   │
│  │ /          │  │ /portfolio │  │ /blog/[slug│  │ /contact │   │
│  │ /about     │  │ /weddings  │  │ ]          │  │          │   │
│  │            │  │ /families  │  │            │  │          │   │
│  │            │  │ /seniors   │  │            │  │          │   │
│  └────────────┘  └────────────┘  └────────────┘  └──────────┘   │
├─────────────────────────────────────────────────────────────────┤
│                     External Services                            │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐   │
│  │  Cloudinary  │  │    Resend    │  │   Vercel Edge/CDN    │   │
│  │  (Images)    │  │   (Email)    │  │   (Hosting/Deploy)   │   │
│  └──────────────┘  └──────────────┘  └──────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

### Component Responsibilities

| Component | Responsibility | Server or Client |
|-----------|----------------|-----------------|
| Root layout (`app/layout.tsx`) | HTML shell, fonts, metadata defaults, nav, footer | Server (pass nav as client child) |
| Navigation | Mobile menu toggle, active link highlighting | Client (needs interactivity) |
| Footer | Static branding, links, Instagram | Server |
| Page components (`page.tsx`) | Page-level layout, section assembly | Server |
| Hero section | Full-bleed image, tagline overlay | Server (static content) |
| Gallery grid | Image grid layout, triggers lightbox | Client (lightbox state) |
| Lightbox | Full-screen image viewer, keyboard nav | Client |
| Contact form | Form inputs, validation, submission state | Client |
| Scroll fade wrapper | IntersectionObserver-based fade-in | Client (browser API) |
| CldImage wrapper | Cloudinary image delivery, sizing | Client (next-cloudinary requirement) |
| Blog post renderer | Renders MDX or structured content | Server |
| Metadata exports | Per-page SEO and Open Graph tags | Server (metadata API) |

## Recommended Project Structure

```
/
├── public/
│   └── fonts/                  # Self-hosted fonts (Apparel, Destiny)
│       ├── apparel-regular.woff2
│       └── destiny-webfont.woff2
├── src/
│   ├── app/                    # Next.js App Router — all routes live here
│   │   ├── layout.tsx          # Root layout: fonts, nav, footer, metadata defaults
│   │   ├── page.tsx            # Home page
│   │   ├── about/
│   │   │   └── page.tsx
│   │   ├── portfolio/
│   │   │   └── page.tsx        # Hub page linking to session types
│   │   ├── weddings/
│   │   │   └── page.tsx
│   │   ├── families/
│   │   │   └── page.tsx
│   │   ├── seniors/
│   │   │   └── page.tsx
│   │   ├── contact/
│   │   │   └── page.tsx
│   │   ├── blog/
│   │   │   ├── page.tsx        # Blog listing
│   │   │   └── [slug]/
│   │   │       └── page.tsx    # Individual post
│   │   └── api/
│   │       └── contact/
│   │           └── route.ts    # Contact form email handler (Server Action or API route)
│   ├── components/
│   │   ├── layout/             # Structural components used on every page
│   │   │   ├── Navigation.tsx  # Top nav with mobile hamburger
│   │   │   └── Footer.tsx      # Footer with branding and links
│   │   ├── ui/                 # Reusable design-system primitives
│   │   │   ├── Button.tsx      # Primary and secondary button variants
│   │   │   ├── SectionLabel.tsx# Uppercase Montserrat label (e.g. "FAMILIES")
│   │   │   └── ScrollFade.tsx  # Intersection observer fade-in wrapper
│   │   ├── images/             # Image delivery components
│   │   │   ├── CloudinaryImage.tsx  # CldImage wrapper ('use client')
│   │   │   └── HeroImage.tsx        # Full-bleed hero with priority loading
│   │   ├── gallery/            # Gallery and lightbox
│   │   │   ├── GalleryGrid.tsx # Uniform grid with click-to-lightbox
│   │   │   └── Lightbox.tsx    # Full-screen image viewer ('use client')
│   │   ├── sections/           # Page-section building blocks
│   │   │   ├── HeroSection.tsx # Full-bleed image + centered text overlay
│   │   │   ├── WelcomeSection.tsx
│   │   │   ├── PortfolioPreview.tsx  # 3-up preview tiles for home page
│   │   │   └── TestimonialSection.tsx
│   │   ├── contact/
│   │   │   └── ContactForm.tsx # Controlled form ('use client')
│   │   └── blog/
│   │       ├── BlogCard.tsx    # Post preview tile for listing page
│   │       └── BlogPost.tsx    # Full post layout
│   ├── lib/                    # Pure utility functions, no components
│   │   ├── cloudinary.ts       # Helper: build Cloudinary URLs, gallery fetch
│   │   ├── email.ts            # Email sending via Resend
│   │   └── metadata.ts         # Shared metadata builder helper
│   └── styles/
│       └── globals.css         # CSS variables, font-face declarations, Tailwind base
├── tailwind.config.ts          # Brand colors, fonts, spacing extensions
└── next.config.ts              # Cloudinary domain allow-list, image remotePatterns
```

### Structure Rationale

- **`components/layout/`:** Nav and Footer are used in the root layout and are structurally separate from feature components. This makes it easy to find and update site-wide chrome.
- **`components/ui/`:** Design-system primitives (buttons, labels, fade wrapper) that enforce brand consistency. Building these first means every page uses the same atoms.
- **`components/images/`:** Isolated because Cloudinary's `CldImage` requires `'use client'`, and wrapping it here prevents client-component leakage into server page components.
- **`components/gallery/`:** Gallery grid and lightbox are co-located because they share state (which image is open). They only live on gallery pages, not everywhere.
- **`components/sections/`:** Page sections that aren't reusable primitives but are assembled into pages. Keeps page files thin.
- **`lib/`:** Server-safe utilities. No React components here. Easy to test, easy to reason about.

## Architectural Patterns

### Pattern 1: Server Components Outer Shell, Client Components for Interactivity

**What:** Pages and layouts are Server Components by default. Only the minimum surface area uses `'use client'` — specifically: Navigation (mobile menu), Gallery (lightbox state), ContactForm, ScrollFade wrapper, and CloudinaryImage.

**When to use:** Always. This is the App Router design principle.

**Trade-offs:** Reduces client-side JavaScript significantly. Fast initial render. The only cost is you cannot use browser APIs or useState in a server component — the wrapper pattern handles this cleanly.

**Example:**
```tsx
// app/families/page.tsx — stays a Server Component
import GalleryGrid from '@/components/gallery/GalleryGrid'
import HeroSection from '@/components/sections/HeroSection'

export default function FamiliesPage() {
  return (
    <>
      <HeroSection
        imageSrc="families/hero-main"
        title="Families"
        subtitle="Las Vegas family portraits"
      />
      <GalleryGrid
        images={familyImages}  // static data array defined in this file
      />
    </>
  )
}

// components/gallery/GalleryGrid.tsx — must be 'use client' for lightbox state
'use client'
import { useState } from 'react'
import Lightbox from './Lightbox'
import CloudinaryImage from '@/components/images/CloudinaryImage'
```

### Pattern 2: Static Data Arrays for Gallery Images

**What:** Gallery images are defined as TypeScript arrays in each page file or a `lib/gallery-data.ts` file — not fetched from an API or CMS. Jennie (or Claude Code) edits the array to add or remove images.

**When to use:** Right for this project. No CMS is in scope. Keeps the architecture dead simple: no API calls, no loading states, no dynamic routes for images.

**Trade-offs:** Updating images requires editing code. For a photographer updating sessions a few times per year, this is perfectly acceptable. Much simpler than a headless CMS.

**Example:**
```ts
// lib/gallery-data.ts
export const familyImages = [
  { src: 'families/session-smith-2024-001', alt: 'Smith family portrait at Red Rock Canyon', width: 1200, height: 800 },
  { src: 'families/session-jones-2024-003', alt: 'Jones family with children at Sunset Park', width: 1200, height: 900 },
]
```

### Pattern 3: Server Actions for Contact Form

**What:** The contact form uses a Next.js Server Action to send email via Resend, without a separate API route. The form POST triggers a server function directly.

**When to use:** Simpler than API routes for single-purpose form submissions. No client-side fetch boilerplate. Works with or without JavaScript (progressive enhancement).

**Trade-offs:** Server Actions are the modern pattern for this in App Router. Resend is preferred over Nodemailer because Resend handles deliverability, retries, and bounce management. Nodemailer requires managing SMTP credentials and has no built-in retry logic.

**Example:**
```ts
// app/contact/actions.ts
'use server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendContactEmail(formData: FormData) {
  const name = formData.get('name') as string
  await resend.emails.send({
    from: 'website@jennieslade.com',
    to: 'jennie@jennieslade.com',
    subject: `New inquiry from ${name}`,
    html: `...`,
  })
}
```

### Pattern 4: Scroll Fade as a Reusable Wrapper

**What:** A single `ScrollFade` client component wraps any content that should animate in on scroll, using the IntersectionObserver API with Tailwind opacity/transform utilities.

**When to use:** Wrap gallery grids, text sections, and image blocks on the home and about pages. Do not wrap hero images (they should be visible immediately).

**Trade-offs:** One wrapper handles all fade animations. Avoids Framer Motion as a dependency — Tailwind + IntersectionObserver is sufficient for simple fade-ins and keeps bundle size small.

**Example:**
```tsx
// components/ui/ScrollFade.tsx
'use client'
import { useEffect, useRef, useState } from 'react'

export default function ScrollFade({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
    >
      {children}
    </div>
  )
}
```

## Data Flow

### Page Render Flow (Gallery Page)

```
Browser requests /families
    ↓
Next.js App Router matches route
    ↓
app/families/page.tsx (Server Component)
    ├── Reads familyImages array from lib/gallery-data.ts (static, no network call)
    ├── Renders HeroSection (Server Component — outputs HTML)
    └── Renders GalleryGrid (Client Component boundary)
            ↓ (sent to browser as JS bundle)
        Browser hydrates GalleryGrid
            ↓
        User clicks image thumbnail
            ↓
        useState opens Lightbox with selected image
            ↓
        CloudinaryImage renders full-size image from Cloudinary CDN
```

### Contact Form Flow

```
User fills ContactForm (Client Component)
    ↓
User submits form
    ↓
Server Action: sendContactEmail() (runs on server, never in browser)
    ↓
Resend API sends email to jennie@jennieslade.com
    ↓
Server Action returns success/error
    ↓
ContactForm shows confirmation message (useState)
```

### Image Delivery Flow

```
Page rendered with CloudinaryImage component
    ↓
CldImage generates optimized URL via Cloudinary SDK
    ↓
Browser requests image from Cloudinary CDN
    ↓
Cloudinary serves: correct format (WebP/AVIF), correct size for device width
    ↓
Next.js Image component handles: lazy loading, blur placeholder, layout shift prevention
```

### Metadata Flow (SEO)

```
Each page.tsx exports metadata object (or generateMetadata function)
    ↓
Next.js reads metadata at build time (static) or request time (dynamic)
    ↓
Injects <title>, <meta description>, <og:image> etc. into <head>
    ↓
getCldOgImageUrl() generates Cloudinary URL for Open Graph image
    (CldOgImage component not used — it's Pages Router only)
```

### Key Data Flows Summary

1. **Image data:** Static arrays in `lib/gallery-data.ts` → passed as props to page components → rendered by `GalleryGrid` → individual images rendered by `CloudinaryImage`.
2. **Contact submissions:** Browser form → Server Action → Resend → Jennie's email inbox. No database, no state persistence.
3. **Fonts:** Self-hosted Apparel/Destiny loaded via `@font-face` in `globals.css`, Google Fonts (Libre Baskerville, Montserrat, Arapey) loaded via `next/font/google` in root layout.
4. **Metadata:** Each `page.tsx` exports a `metadata` constant. Root layout provides site-wide defaults. Cloudinary URLs used for OG images.

## Component Build Order (Dependencies)

Build in this sequence because later components depend on earlier ones:

```
Phase 1 — Foundation (everything else depends on this)
  globals.css + tailwind.config.ts    CSS variables, font-face, brand tokens
  CloudinaryImage.tsx                 Used by almost every component
  next.config.ts                      Image domains must be configured first

Phase 2 — Layout Shell
  Navigation.tsx                      Appears on every page
  Footer.tsx                          Appears on every page
  app/layout.tsx                      Wires nav + footer into root shell

Phase 3 — UI Primitives
  Button.tsx                          Used in CTAs everywhere
  SectionLabel.tsx                    Used in section headers everywhere
  ScrollFade.tsx                      Wrapper used by gallery and sections

Phase 4 — Page Sections
  HeroSection.tsx                     Used on home, portfolio category pages
  PortfolioPreview.tsx                Used on home page

Phase 5 — Gallery System
  GalleryGrid.tsx                     Used on weddings, families, seniors
  Lightbox.tsx                        Used by GalleryGrid

Phase 6 — Page Assembly
  app/page.tsx (Home)                 Assembles sections
  app/about/page.tsx
  app/portfolio/page.tsx
  app/weddings/page.tsx
  app/families/page.tsx
  app/seniors/page.tsx

Phase 7 — Contact
  ContactForm.tsx
  lib/email.ts (Resend integration)
  app/contact/page.tsx

Phase 8 — Blog
  BlogCard.tsx
  BlogPost.tsx
  app/blog/page.tsx
  app/blog/[slug]/page.tsx
```

## Integration Points

### External Services

| Service | Integration Pattern | Notes |
|---------|---------------------|-------|
| Cloudinary | `next-cloudinary` package — `CldImage` component (client), `getCldOgImageUrl` for metadata | Add `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` to `.env.local`. Configure `remotePatterns` in `next.config.ts` to allow `res.cloudinary.com`. |
| Resend | Server Action calls Resend Node SDK | Add `RESEND_API_KEY` to `.env.local`. Never expose to client. Verify sending domain in Resend dashboard. |
| Vercel | Deploy via GitHub push. No extra config needed for App Router. | Add environment variables in Vercel dashboard (same as `.env.local`). |
| Google Fonts | `next/font/google` in root layout — automatic optimization, no external network request at render time | Libre Baskerville, Montserrat, Arapey. |

### Internal Boundaries

| Boundary | Communication | Notes |
|----------|---------------|-------|
| Server page → Client gallery | Props (image array passed down) | Once data crosses into a Client Component, it stays client-side |
| ContactForm → Server Action | Form POST via Server Action | Server Action is imported directly into the page, not via fetch |
| CloudinaryImage → Cloudinary CDN | HTTP image request | The component generates the URL; browser fetches the image |
| Root layout → Navigation | Children pattern | Nav is a Client Component passed as a child to the server layout |

## Scaling Considerations

| Scale | Architecture Adjustments |
|-------|--------------------------|
| Current (small portfolio, ~10 pages) | Static arrays for gallery data, no CMS, Server Actions for contact. This is appropriate and sufficient. |
| If Jennie adds 100+ sessions per year | Consider a headless CMS (Sanity is popular for photographers). Gallery data moves from static arrays to CMS API calls. Blog also moves to CMS. Incremental Static Regeneration (ISR) handles revalidation. |
| If site gets heavy traffic | Vercel's CDN handles this automatically. Next.js static pages are edge-cached. No architecture changes needed for a photography portfolio at any realistic traffic level. |

The realistic scaling concern for this site is image performance, not traffic volume. Cloudinary handles responsive delivery. The build order in Phase 1 (setting up Cloudinary correctly) is therefore the highest-leverage early investment.

## Anti-Patterns

### Anti-Pattern 1: Making Entire Pages Client Components

**What people do:** Add `'use client'` to a `page.tsx` file because they need one interactive element (like a mobile menu or a contact form).

**Why it's wrong:** The entire page's JavaScript ships to the browser. Server-side rendering benefits are lost. Time-to-first-byte increases. Lighthouse performance scores drop.

**Do this instead:** Keep `page.tsx` as a Server Component. Extract only the interactive part (the form, the nav toggle, the gallery) into its own Client Component file. The page imports and renders it as a child.

### Anti-Pattern 2: Using Raw `<img>` Tags

**What people do:** Use `<img src="...">` directly, especially for Cloudinary URLs built manually.

**Why it's wrong:** No automatic sizing, no lazy loading, no blur placeholder, no WebP/AVIF conversion, no prevention of Cumulative Layout Shift. Photography sites die on Lighthouse performance because of unoptimized images.

**Do this instead:** Always use the `CloudinaryImage` wrapper (which uses `CldImage` from `next-cloudinary`). Pass explicit `width` and `height` for every image. For hero images, add `priority` prop to disable lazy loading.

### Anti-Pattern 3: Storing Gallery Images in `/public`

**What people do:** Upload photos to the `/public` folder and reference them directly.

**Why it's wrong:** No CDN, no responsive delivery, no automatic WebP conversion. A 5MB DSLR photo served directly from `/public` will destroy load times.

**Do this instead:** All real photos go to Cloudinary. Use placeholder color blocks during development. When Jennie has real images, upload them to Cloudinary and add the public ID to the gallery data array.

### Anti-Pattern 4: Using Nodemailer Instead of Resend

**What people do:** Set up Nodemailer with Gmail SMTP for the contact form.

**Why it's wrong:** Gmail SMTP has daily send limits, gets flagged as spam, requires App Password setup, and has no retry logic. It breaks silently (Jennie misses a booking inquiry and doesn't know it).

**Do this instead:** Use Resend. Free tier handles hundreds of emails per month. Verified sending domain, delivery tracking, and it takes 10 minutes to set up.

### Anti-Pattern 5: Blocking Hero Images with Lazy Loading

**What people do:** Apply lazy loading or scroll animations to the hero image at the top of the page.

**Why it's wrong:** The hero image is above the fold. Lazy loading it delays the most important visual element on the page, tanks the Largest Contentful Paint score, and makes the site feel broken on first load.

**Do this instead:** Add `priority` prop to the hero `CldImage` (or Next.js `Image`). Only apply `ScrollFade` and lazy loading to images below the fold.

## Sources

- Next.js App Router official docs: https://nextjs.org/docs/app/getting-started/server-and-client-components
- Next.js project structure guide: https://nextjs.org/docs/app/getting-started/project-structure
- next-cloudinary CldImage docs: https://next.cloudinary.dev/cldimage/basic-usage
- next-cloudinary App Router integration: https://next.cloudinary.dev/nextjs-14
- Cloudinary + Next.js gallery pattern: https://cloudinary.com/blog/image-gallery-next-js-parallel-intercepting-routes
- Resend + Next.js Server Actions: https://resend.com/nextjs
- Intersection Observer scroll animations: https://dev.to/franciscomoretti/react-intersection-observer-with-tailwind-and-nextjs-4f9p
- Next.js App Router layouts and pages: https://nextjs.org/docs/app/getting-started/layouts-and-pages

---
*Architecture research for: editorial photography portfolio (Next.js App Router)*
*Researched: 2026-03-29*
