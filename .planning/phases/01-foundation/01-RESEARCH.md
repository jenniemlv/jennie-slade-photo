# Phase 1: Foundation - Research

**Researched:** 2026-03-29
**Domain:** Next.js 16 App Router + Tailwind CSS v4 + next/font + next-cloudinary — greenfield project setup
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

- **D-01:** Use `create-next-app@latest` to bootstrap — this configures Next.js 16 + TypeScript + Tailwind v4 + Turbopack by default. Don't fight the defaults.
- **D-02:** TypeScript strict mode enabled.
- **D-03:** Pin Tailwind CSS to `^4.2.0` — known Turbopack build issues with v4.1.x.
- **D-04:** Google Fonts (Libre Baskerville, Montserrat, Arapey) via `next/font/google`. No external requests to fonts.googleapis.com.
- **D-05:** Apparel and Destiny configured as `next/font/local` with system-font fallbacks (Georgia for Apparel, cursive for Destiny). Slots ready for when Jennie provides .woff2 files.
- **D-06:** Use `font-display: swap` on all fonts.
- **D-07:** Brand colors as Tailwind v4 `@theme` extensions. All warm grays (beige undertone), no cool grays.
- **D-08:** CSS custom properties defined for the full palette per design-spec.md.
- **D-09:** Install `next-cloudinary`. Configure `remotePatterns` in next.config (not deprecated `images.domains`).
- **D-10:** Create a `CldImage` wrapper component (needs `'use client'`) for consistent image rendering.
- **D-11:** Use `getCldOgImageUrl()` for OG images (not `CldOgImage` which is Pages Router only).
- **D-12:** Base CSS with typography hierarchy matching design-spec.md exactly: title (Libre Baskerville 30px uppercase), heading (Montserrat 12px uppercase), subheading (Apparel 15px uppercase 0.07em), paragraph (Libre Baskerville 16px, 1.9 line-height).

### Claude's Discretion

- **Project structure:** Standard App Router layout — `app/` for routes, `components/` for UI, `lib/` for utilities, `data/` for content arrays
- **Placeholder strategy:** Solid warm-gray blocks (#d4d1cb) matching the brand palette, with baked-in aspect ratios. No patterns or text overlays.
- **Test page:** Create a `/dev` route to visually verify fonts, colors, and typography. Will be removed before launch.
- **Linting:** Use ESLint with Next.js default config. `next lint` is removed in Next.js 16, so use `eslint` directly.

### Deferred Ideas (OUT OF SCOPE)

None — discussion stayed within phase scope.
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| FOUN-01 | Next.js 16 App Router project bootstrapped with TypeScript and Tailwind CSS v4 | D-01/D-02/D-03: `create-next-app@latest` with `--typescript --tailwind --app --turbopack`; pin Tailwind to `^4.2.0` |
| FOUN-02 | Brand color palette configured as Tailwind theme extensions (warm grays, teal-sage accent) | D-07/D-08: `@theme` block in globals.css; full 9-color palette from design-spec.md |
| FOUN-03 | Google Fonts configured via next/font (Libre Baskerville, Montserrat, Arapey) | D-04: `next/font/google` in `lib/fonts.ts`; single definition file, applied via CSS variables on `<html>` |
| FOUN-04 | Custom font slots prepared for Apparel and Destiny (next/font/local, fallback to system fonts until files provided) | D-05: `next/font/local` with placeholder paths; Georgia fallback for Apparel, cursive for Destiny |
| FOUN-05 | Cloudinary configured in next.config with remotePatterns and next-cloudinary installed | D-09: `next-cloudinary@^6.17.5`; `remotePatterns` with `res.cloudinary.com`; `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` env var |
| FOUN-06 | Base CSS with typography hierarchy matching design spec (title, heading, subheading, paragraph styles) | D-12: Typography layer in globals.css using exact values from design-spec.md |
| DESN-03 | Serif-dominant typography creating timeless, sophisticated feel | Libre Baskerville as display and body font; Apparel for subheadings and buttons |
| DESN-05 | Reading-line text layout (short paragraphs, 1.9 line-height, text breathing room) | Line-height 1.9 on paragraph class; max-width readable line length via Tailwind `max-w-prose` or similar |
| DESN-07 | Placeholder blocks (warm-gray) for all images until real photography is added | `#d4d1cb` solid blocks with baked-in aspect ratios; documented in `CloudinaryImage` wrapper |
| SEOP-07 | First Contentful Paint under 1.5 seconds | Font `display: swap`; preload display fonts; no blocking external font requests; hero images will use `priority` prop (later phases) |
| SEOP-09 | Proper font-display: swap to prevent FOUT/FOIT | D-06: `next/font` applies swap automatically; verified in font config |
</phase_requirements>

---

## Summary

Phase 1 is a pure configuration and scaffolding phase — no pages, no components except one typography test page and one Cloudinary image wrapper. Every decision has been locked in CONTEXT.md, so research here is confirmatory rather than exploratory: verify exact current versions, confirm configuration syntax, and surface any implementation gotchas before the planner creates tasks.

The most important research findings are: (1) `next-cloudinary` has moved from 6.1.0 to 6.17.5 since the stack research was written — the stable API surface is identical but the version number needs updating in any install commands; (2) Tailwind v4 has a specific syntax change for `@theme` in `globals.css` that differs from v3 and must be followed exactly; (3) `next/font/local` paths are resolved relative to the file that calls `localFont()`, not from the project root — this is the single most common cause of "fonts work in dev but break on Vercel."

The phase is pure infrastructure with no external service dependencies that block execution. Cloudinary is needed for the image wrapper, but only an account name env var is required — no actual images need to exist to complete this phase.

**Primary recommendation:** Bootstrap with `create-next-app@latest`, then make three targeted edits: `globals.css` (Tailwind theme + typography), `lib/fonts.ts` (all font definitions in one place), and `next.config.ts` (Cloudinary remotePatterns). These three files are the entire foundation.

---

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Next.js | 16.2.1 (latest) | App Router framework | First-party Vercel integration, App Router, Server Actions, metadata API — all required by this project |
| React | 19.2.4 (bundled) | UI library | Bundled with Next.js 16; do not install separately |
| TypeScript | 5.1+ (via create-next-app) | Type safety | Strict mode makes Claude Code output more reliable; locked in D-02 |
| Tailwind CSS | 4.2.2 (latest, pin `^4.2.0`) | Styling | v4 CSS-native config eliminates `tailwind.config.js`; `@theme` maps directly to brand tokens |
| next-cloudinary | 6.17.5 (latest stable) | Cloudinary image delivery | `CldImage` wraps `next/image` with Cloudinary's transformation pipeline; prevents double-optimization |

### Supporting (Phase 1 only)

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| next/font/google (built-in) | Bundled with Next.js | Google Fonts — zero external requests | Libre Baskerville, Montserrat, Arapey |
| next/font/local (built-in) | Bundled with Next.js | Self-hosted premium fonts | Apparel and Destiny |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| `next/font/google` | `<link rel="stylesheet" href="fonts.googleapis.com">` | next/font is strictly better: no external DNS lookup, automatic fallback sizing, font-display swap built in |
| `next-cloudinary` CldImage | `next/image` with Cloudinary URL | next/image would double-optimize; CldImage delegates entirely to Cloudinary's pipeline |
| Tailwind v4 `@theme` | Custom CSS properties only | `@theme` makes brand tokens available as Tailwind utility classes (`bg-teal-sage`, `text-charcoal`), not just raw CSS vars |

**Installation:**
```bash
# Bootstrap (Next.js 16 + TypeScript + Tailwind v4 + Turbopack)
npx create-next-app@latest jennie-slade-photo \
  --typescript \
  --tailwind \
  --app \
  --turbopack

# Then pin Tailwind and install Cloudinary
cd jennie-slade-photo
npm install tailwindcss@^4.2.0
npm install next-cloudinary
```

**Version verification (run before writing install commands):**
```bash
npm view next version        # 16.2.1
npm view next-cloudinary version  # 6.17.5
npm view tailwindcss version      # 4.2.2
npm view react version        # 19.2.4
```

---

## Architecture Patterns

### Recommended Project Structure

```
jennie-slade-photo/
├── public/
│   └── fonts/                      # Self-hosted fonts (Apparel, Destiny)
│       ├── apparel-regular.woff2   # Placeholder — Jennie to provide
│       └── destiny-webfont.woff2   # Placeholder — Jennie to provide
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout: applies fonts, sets base HTML structure
│   │   ├── page.tsx                # Placeholder home (will be built in Phase 3)
│   │   ├── dev/
│   │   │   └── page.tsx            # Typography/color test page (removed before launch)
│   │   └── globals.css             # Tailwind import + @theme tokens + typography classes
│   ├── components/
│   │   └── images/
│   │       └── CloudinaryImage.tsx # CldImage wrapper ('use client')
│   └── lib/
│       └── fonts.ts                # All next/font definitions in one file
├── next.config.ts                  # remotePatterns for res.cloudinary.com
├── .env.local                      # NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
└── .env.example                    # Documented env vars (committed to git)
```

The `dev/` test page and `CloudinaryImage.tsx` wrapper are the only non-config files in this phase. All pages beyond `/dev` are stubs.

### Pattern 1: Single Font Definition File

**What:** All `next/font` instances (both `google` and `local`) are created once in `src/lib/fonts.ts`. The root layout imports them and applies the CSS variables to `<html>`. No other component ever imports from `next/font`.

**When to use:** Always. Importing the same font in multiple components creates duplicate font instances, extra network requests, and CLS.

**Example:**
```typescript
// src/lib/fonts.ts
import { Libre_Baskerville, Montserrat, Arapey } from 'next/font/google'
import localFont from 'next/font/local'

export const libreBaskerville = Libre_Baskerville({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--font-libre-baskerville',
  display: 'swap',
})

export const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-montserrat',
  display: 'swap',
})

export const arapey = Arapey({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-arapey',
  display: 'swap',
})

// Apparel — slot ready, falls back to Georgia until .woff2 is provided
// NOTE: file path is relative to THIS file (src/lib/fonts.ts),
// so the path is ../../public/fonts/apparel-regular.woff2
export const apparel = localFont({
  src: '../../public/fonts/apparel-regular.woff2',
  variable: '--font-apparel',
  display: 'swap',
  fallback: ['Georgia', 'serif'],
  // When file is missing Next.js will warn at build time but not crash.
  // Replace with real file when Jennie provides it.
})

export const destiny = localFont({
  src: '../../public/fonts/destiny-webfont.woff2',
  variable: '--font-destiny',
  display: 'swap',
  fallback: ['cursive'],
})
```

```tsx
// src/app/layout.tsx
import { libreBaskerville, montserrat, arapey, apparel, destiny } from '@/lib/fonts'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={[
        libreBaskerville.variable,
        montserrat.variable,
        arapey.variable,
        apparel.variable,
        destiny.variable,
      ].join(' ')}
    >
      <body>{children}</body>
    </html>
  )
}
```

### Pattern 2: Tailwind v4 Theme Configuration (CSS-Only)

**What:** Brand tokens declared in `@theme` block inside `globals.css`. No `tailwind.config.ts` needed for color/font tokens in Tailwind v4.

**When to use:** This is the v4 approach. Do not create `tailwind.config.ts` for colors — only needed for plugins or content path overrides.

**Example:**
```css
/* src/app/globals.css */
@import "tailwindcss";

@theme {
  /* Brand colors — warm undertone, never cool */
  --color-black: #000000;
  --color-charcoal: #1a1a1a;
  --color-gray: #6b6b6b;
  --color-blue-mist: #b8c5d4;
  --color-teal-sage: #5f8f8b;
  --color-warm-gray: #d4d1cb;
  --color-warm-gray-light: #e3e0da;
  --color-off-white: #f0eeeb;
  --color-white: #ffffff;

  /* Font family tokens — used via var() in typography classes below */
  --font-display: var(--font-libre-baskerville), Georgia, serif;
  --font-heading: var(--font-montserrat), sans-serif;
  --font-subheading: var(--font-apparel), Georgia, sans-serif;
  --font-body: var(--font-libre-baskerville), Georgia, serif;
  --font-accent: var(--font-arapey), serif;
  --font-script: var(--font-destiny), cursive;
}

/* Typography hierarchy — matches design-spec.md exactly */
@layer base {
  .type-title {
    font-family: var(--font-display);
    font-size: 30px;
    color: var(--color-black);
    text-transform: uppercase;
    letter-spacing: 0.02em;
    line-height: 1.2;
  }

  .type-heading {
    font-family: var(--font-heading);
    font-size: 12px;
    color: var(--color-charcoal);
    text-transform: uppercase;
    letter-spacing: 0.02em;
    line-height: 1.8;
  }

  .type-subheading {
    font-family: var(--font-subheading);
    font-size: 15px;
    color: var(--color-charcoal);
    text-transform: uppercase;
    letter-spacing: 0.07em;
    line-height: 1.1;
  }

  .type-body {
    font-family: var(--font-body);
    font-size: 16px;
    color: var(--color-charcoal);
    letter-spacing: 0.02em;
    line-height: 1.9;
  }

  .type-accent {
    font-family: var(--font-accent);
    font-size: 16px;
    color: var(--color-charcoal);
  }
}
```

### Pattern 3: CloudinaryImage Wrapper

**What:** A `'use client'` component wrapping `CldImage` from next-cloudinary. This is the ONLY way to render Cloudinary images in this project. Never use `<Image src={cloudinaryUrl}>` directly.

**When to use:** Every single image in the project that lives on Cloudinary.

**Example:**
```tsx
// src/components/images/CloudinaryImage.tsx
'use client'
import { CldImage } from 'next-cloudinary'
import type { CldImageProps } from 'next-cloudinary'

// Re-export CldImage with project defaults baked in
// All gallery images pass explicit width/height to prevent CLS
export default function CloudinaryImage(props: CldImageProps) {
  return (
    <CldImage
      {...props}
      // Enforce quality — visually identical to 100 but 30-40% smaller
      quality={props.quality ?? 80}
    />
  )
}
```

### Pattern 4: next.config.ts with remotePatterns

**What:** Configure Cloudinary as the only allowed remote image host. Use `remotePatterns`, never the deprecated `domains` array.

**Example:**
```typescript
// next.config.ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
    ],
  },
}

export default nextConfig
```

Note: The `pathname` can optionally be scoped to your cloud name (`/your-cloud-name/**`) for tighter security. Either works for this project.

### Pattern 5: Warm-Gray Placeholder Block

**What:** Until real Cloudinary photos exist, render a solid warm-gray block with a fixed aspect ratio. This prevents CLS and maintains the editorial layout.

**When to use:** Any place a real image will eventually go. Applied in `CloudinaryImage` when no `src` is provided, or as a separate `ImagePlaceholder` component for truly empty slots.

**Example:**
```tsx
// Used inline anywhere an image slot is reserved
<div
  className="bg-warm-gray w-full"
  style={{ aspectRatio: '3/2' }}
  aria-hidden="true"
/>
```

### Anti-Patterns to Avoid

- **Using `<img>` tags:** Never. No optimization, no lazy loading, no CLS prevention. Always use `CloudinaryImage` (for Cloudinary URLs) or `next/image` (for local/public images).
- **Importing fonts in multiple files:** Defining `Libre_Baskerville` in both `layout.tsx` and a `Hero.tsx` creates two instances and doubles the network request. All fonts defined once in `lib/fonts.ts`.
- **Using `images.domains` config:** Deprecated in Next.js 16. Use `remotePatterns` only.
- **Using `next lint` CLI:** Removed in Next.js 16. Use `npx eslint .` directly.
- **Importing `CldOgImage`:** This component is Pages Router only and will crash in App Router. Use `getCldOgImageUrl()` instead (relevant when Phase 7 adds OG images).
- **Putting real photos in `/public`:** No CDN, no responsive delivery, no WebP conversion. Cloudinary only.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Google Font loading without layout shift | Manual `@font-face` + preload link tags | `next/font/google` | next/font automatically self-hosts at build time, calculates fallback metrics to prevent CLS, no external DNS call |
| Cloudinary image optimization | Custom URL builder with `f_auto,q_auto` | `CldImage` from `next-cloudinary` | CldImage handles responsive srcsets, format negotiation, and bypasses Next.js double-optimization pipeline |
| CSS custom property theming | Raw `:root {}` variables only | Tailwind v4 `@theme` | `@theme` makes tokens available as Tailwind utility classes (`text-teal-sage`, `bg-warm-gray`) so utilities and raw CSS vars both work |
| Font file path resolution for local fonts | Guessing paths | Know: paths in `localFont()` are relative to the calling file | Wrong paths fail silently in dev (fallback to system font) but throw on Vercel |

**Key insight:** The `next/font` system is the single highest-leverage tool in this phase. Using it correctly for both Google and local fonts eliminates FOUT, prevents CLS from font swap, removes the `fonts.googleapis.com` network dependency, and makes Vercel production behave identically to local dev.

---

## Common Pitfalls

### Pitfall 1: `next/font/local` Path Resolution

**What goes wrong:** Font files exist in `/public/fonts/` but the path in `localFont()` resolves relative to the source file, not from the project root or `/public`. A path that works in dev may break on Vercel because the build process copies files differently.

**Why it happens:** Developers write `src: '/fonts/apparel-regular.woff2'` (absolute from root) or `src: 'public/fonts/...'` (relative from root) — both wrong. The path must be relative to the file that calls `localFont()`.

**How to avoid:** When `lib/fonts.ts` calls `localFont`, use `'../../public/fonts/apparel-regular.woff2'`. Verify by running `next build` locally before committing — if the path is wrong, the build will warn.

**Warning signs:** Subheadings render in Georgia instead of Apparel on Vercel but look fine locally.

### Pitfall 2: Tailwind v4 `@theme` vs v3 Config Format

**What goes wrong:** Claude Code or reference examples use v3 Tailwind syntax (`theme.extend.colors` in `tailwind.config.js`). In Tailwind v4, this file does not exist by default and color tokens belong in `@theme` in CSS.

**Why it happens:** Training data and most Stack Overflow answers are Tailwind v3.

**How to avoid:** Use only the CSS-in-`@theme` approach shown above. If a `tailwind.config.ts` file is needed at all (for plugins), it exists alongside `globals.css` — but brand colors never go there.

**Warning signs:** Utilities like `bg-teal-sage` don't work; colors only available via `var(--color-teal-sage)`.

### Pitfall 3: Double Image Optimization

**What goes wrong:** Using `<Image src="https://res.cloudinary.com/...">` (the standard Next.js Image component) with a Cloudinary URL causes Next.js to proxy and re-encode the already-optimized Cloudinary image. Result: double compression, larger files than a local image, and none of Cloudinary's format negotiation.

**Why it happens:** It looks like it works. The image renders. The performance problem is invisible until Lighthouse runs.

**How to avoid:** Use `CldImage` from `next-cloudinary` exclusively. The `CloudinaryImage` wrapper component in this phase enforces this convention.

**Warning signs:** Network tab shows image URLs shaped like `/_next/image?url=https%3A%2F%2Fres.cloudinary.com...`.

### Pitfall 4: `remotePatterns` Misconfiguration Silently Breaking Production

**What goes wrong:** Images load in `localhost:3000` dev mode but show as blank on Vercel preview URLs. No console error.

**Why it happens:** Next.js dev mode is more permissive about remote images than production. `remotePatterns` is enforced strictly in production builds.

**How to avoid:** Run `next build && next start` locally before the first deploy. Images that load in this mode will load on Vercel.

**Warning signs:** Blank image areas on deployed preview URLs; images fine on localhost.

### Pitfall 5: Apparel/Destiny Fallback Silently Masking Config Errors

**What goes wrong:** With `fallback: ['Georgia', 'serif']` on Apparel, the entire dev phase looks "correct" — subheadings render in Georgia and look perfectly fine. The error is only visible when Jennie provides the actual .woff2 files and they don't load because the path is wrong.

**How to avoid:** Document in the `CloudinaryImage` and font files exactly what a successful Apparel load looks like vs. the Georgia fallback. Add a note in the `/dev` test page: "Apparel should NOT look like Georgia — if it does, font path is broken."

---

## Code Examples

Verified patterns from official sources and project research:

### Installing and Bootstrapping

```bash
# Run from the parent directory of where you want the project
npx create-next-app@latest jennie-slade-photo \
  --typescript \
  --tailwind \
  --app \
  --turbopack

cd jennie-slade-photo

# Pin Tailwind to avoid v4.1.x Turbopack build issue
npm install tailwindcss@^4.2.0

# Cloudinary
npm install next-cloudinary
```

### Environment Variables

```bash
# .env.local (not committed)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="jennieslade"

# .env.example (committed — documents required vars)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloudinary-cloud-name"
```

### TypeScript Strict Mode

```json
// tsconfig.json — verify these are set after bootstrapping
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true
  }
}
```

### Dev Test Page Structure

```tsx
// src/app/dev/page.tsx
// PURPOSE: Visual verification of fonts, colors, typography
// REMOVE BEFORE LAUNCH
export default function DevPage() {
  return (
    <main className="p-16 max-w-4xl mx-auto space-y-12">
      <section>
        <p className="type-heading">Typography Verification</p>
        <h1 className="type-title">Title — Libre Baskerville 30px Uppercase</h1>
        <h2 className="type-heading">Heading — Montserrat 12px Uppercase</h2>
        <h3 className="type-subheading">Subheading — Apparel 15px Uppercase</h3>
        <p className="type-body">
          Body copy — Libre Baskerville 16px with 1.9 line-height.
          This paragraph should feel airy and editorial. Warm serif, not cold.
        </p>
      </section>
      <section>
        <p className="type-heading">Color Palette</p>
        <div className="grid grid-cols-5 gap-4">
          {/* Warm gray swatches */}
          <div className="h-16 bg-black rounded" title="#000000" />
          <div className="h-16 bg-charcoal rounded" title="#1a1a1a" />
          <div className="h-16 bg-gray rounded" title="#6b6b6b" />
          <div className="h-16 bg-teal-sage rounded" title="#5f8f8b" />
          <div className="h-16 bg-warm-gray rounded" title="#d4d1cb" />
          <div className="h-16 bg-warm-gray-light rounded" title="#e3e0da" />
          <div className="h-16 bg-off-white rounded border border-warm-gray" title="#f0eeeb" />
          <div className="h-16 bg-blue-mist rounded" title="#b8c5d4" />
          <div className="h-16 bg-white rounded border border-warm-gray" title="#ffffff" />
        </div>
      </section>
      <section>
        <p className="type-heading">Image Placeholder</p>
        {/* Verify warm-gray placeholder renders at correct aspect ratio */}
        <div className="bg-warm-gray w-full max-w-lg" style={{ aspectRatio: '3/2' }} />
      </section>
    </main>
  )
}
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `tailwind.config.js` with `theme.extend.colors` | `@theme {}` block in CSS | Tailwind v4 (2024) | No config file needed for tokens; CSS-native |
| `images.domains: ['res.cloudinary.com']` | `images.remotePatterns: [{ hostname: '...' }]` | Next.js 13+ | `domains` deprecated and insecure in v16 |
| `next lint` CLI command | `npx eslint .` | Next.js 16 | `next lint` removed from CLI |
| `middleware.ts` for request interception | `proxy.ts` | Next.js 16 | `middleware.ts` deprecated; rename any future middleware files |
| Installing Google Fonts via `<link>` tag | `next/font/google` | Next.js 13+ | No external DNS, automatic fallback, zero CLS |
| `localFont` import from `next/font/local` | `localFont` import from `next/font/local` | Unchanged | Path is relative to the calling file — always |

**Deprecated/outdated:**
- `images.domains`: Replaced by `remotePatterns`. Will throw a deprecation warning in Next.js 16 builds.
- `CldOgImage` component: Pages Router only. For App Router OG images, use `getCldOgImageUrl()` (relevant in Phase 7).
- `next lint`: Removed CLI command. Use `npx eslint .` instead.

---

## Open Questions

1. **Apparel/Destiny font files: are they available?**
   - What we know: Jennie has a Showit account and the fonts were uploaded there. She likely has the files somewhere.
   - What's unclear: Whether she can locate the .woff2 files before Phase 1 executes.
   - Recommendation: Phase 1 plan should include a task that creates placeholder font files (0-byte or a stub) in `/public/fonts/` so the `localFont()` path resolves without crashing the build. When Jennie provides the real files, she drops them in and the font slot activates automatically. Document this clearly in the `/dev` test page.

2. **Cloudinary account: does it exist?**
   - What we know: It's listed as a potential blocker in STATE.md.
   - What's unclear: Whether a Cloudinary account has been created and whether the cloud name is known.
   - Recommendation: Plan should include a task to verify `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` is set in `.env.local`. The phase cannot be verified without it (the `CldImage` wrapper and test page both depend on it).

3. **Montserrat is in design-spec.md but not the Showit font list — why?**
   - What we know: CLAUDE.md lists Montserrat as `--font-heading`. design-spec.md type styles list "Montserrat (Normal weight)" for the Heading style. But the Showit active fonts section only lists Arapey, Cormorant, Libre Baskerville, Apparel, and Destiny.
   - What's unclear: Whether Montserrat was used in Showit or is a new choice for the Next.js build.
   - Recommendation: Use Montserrat as specified in CLAUDE.md and the type hierarchy. This is a locked decision (D-12 references the design-spec heading hierarchy). It's a free Google Font so there's no sourcing concern.

---

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js | Next.js 16 (requires 20.9+) | Yes | v24.14.0 | None needed |
| npm | Package management | Yes | 11.9.0 | None needed |
| npx | create-next-app bootstrap | Yes | 11.9.0 | None needed |
| next@16.2.1 | Framework | Via npm | 16.2.1 (latest) | None needed |
| tailwindcss@4.2.2 | Styling | Via npm | 4.2.2 (latest) | None needed |
| next-cloudinary@6.17.5 | Image delivery | Via npm | 6.17.5 (latest stable) | None needed |
| Cloudinary account | `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` env var | Unknown | — | Phase can partially complete; CldImage wrapper will be built but test requires real cloud name |
| Apparel .woff2 font file | `next/font/local` Apparel slot | Unknown | — | Stub file in `/public/fonts/`; Georgia fallback renders correctly |
| Destiny .woff2 font file | `next/font/local` Destiny slot | Unknown | — | Stub file in `/public/fonts/`; cursive fallback renders correctly |

**Missing dependencies with no fallback:** None — all hard dependencies are available via Node/npm.

**Missing dependencies with fallback:**
- Cloudinary cloud name: Phase 1 can scaffold the wrapper and config; actual image rendering requires the env var. Plan should include a task to verify this before marking the phase done.
- Apparel/Destiny font files: Stub `.woff2` files (valid empty WOFF2) should be created in `/public/fonts/` so `localFont()` doesn't crash. Real files drop in later without code changes.

---

## Validation Architecture

### Test Framework

| Property | Value |
|----------|-------|
| Framework | None yet — this is a greenfield project. No test framework exists before Phase 1 executes. |
| Config file | None (Wave 0 gap) |
| Quick run command | `next build` (validates TypeScript, config, and that fonts/Cloudinary are wired up) |
| Full suite command | `next build && next start` then manually open localhost:3000/dev |

**Note:** For a configuration-only phase, the most meaningful "test" is a successful production build plus a visual inspection of the `/dev` test page. There is no unit-testable logic in this phase. The success criteria are entirely verifiable via browser + Network tab inspection.

### Phase Requirements to Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| FOUN-01 | Project bootstraps and `next build` succeeds | smoke | `next build` | No — Wave 0 |
| FOUN-02 | `bg-teal-sage`, `text-charcoal`, etc. available as Tailwind utilities | visual | `next build` (TypeScript catches unknown classes in some configs) | No — Wave 0 |
| FOUN-03 | No `fonts.googleapis.com` in Network tab | manual | Open /dev in browser, check Network tab | No — Wave 0 |
| FOUN-04 | Apparel/Destiny slots render fallback correctly | visual | Open /dev, confirm fallback renders without error | No — Wave 0 |
| FOUN-05 | `next build && next start` succeeds and images load without `/_next/image?url=` in Network tab | manual | `next build && next start` | No — Wave 0 |
| FOUN-06 | Typography classes render correctly at design-spec sizes | visual | Open /dev, inspect with browser DevTools | No — Wave 0 |
| DESN-03 | Serif fonts dominant on /dev page | visual | Open /dev | No — Wave 0 |
| DESN-05 | 1.9 line-height on body copy visible on /dev page | visual | Open /dev, inspect computed styles | No — Wave 0 |
| DESN-07 | Warm-gray placeholder block renders at aspect ratio | visual | Open /dev | No — Wave 0 |
| SEOP-07 | FCP baseline under 1.5s (fonts don't block render) | manual | Lighthouse on /dev page | No — Wave 0 |
| SEOP-09 | `font-display: swap` applied (verify via next/font automatic behavior) | manual | Check Network tab: no render-blocking font requests | No — Wave 0 |

### Sampling Rate

- **Per task commit:** `next build` (catches TypeScript errors and config issues immediately)
- **Per wave merge:** `next build && next start`, then open `/dev` and run Lighthouse
- **Phase gate:** All 5 success criteria from CONTEXT.md verified before `/gsd:verify-work`

### Wave 0 Gaps

- [ ] No test framework — this phase has no unit-testable logic, so a test framework (Jest/Vitest) is not installed here. Wave 0 is verification via `next build` + visual inspection.
- [ ] No existing test files — the project does not exist yet.

The `/dev` test page IS the test artifact for this phase. Its existence and correct rendering is the primary verification mechanism.

---

## Sources

### Primary (HIGH confidence)

- npm registry (live query 2026-03-29): `next@16.2.1`, `next-cloudinary@6.17.5`, `tailwindcss@4.2.2`, `react@19.2.4` — version numbers verified
- `.planning/research/STACK.md` — project stack research (2026-03-29), HIGH confidence
- `.planning/research/ARCHITECTURE.md` — project architecture research (2026-03-29), HIGH confidence
- `.planning/research/PITFALLS.md` — project pitfalls research (2026-03-29), HIGH confidence
- `design-spec.md` — extracted Showit design settings, exact color/font/type values
- `CLAUDE.md` — brand identity, technical guidelines, design system

### Secondary (MEDIUM confidence)

- Tailwind CSS v4 `@theme` syntax: consistent across STACK.md, official Tailwind v4 blog, and CLAUDE.md design system section
- `next/font/local` path resolution: documented in PITFALLS.md with source from thelinuxcode.com (2026), cross-referenced with Next.js font docs behavior

### Tertiary (LOW confidence)

- None — all claims in this research are supported by HIGH or MEDIUM sources.

---

## Project Constraints (from CLAUDE.md)

The following directives from `CLAUDE.md` apply to this phase and the planner must verify compliance:

| Directive | Applies to Phase 1 |
|-----------|-------------------|
| Use Next.js Image component for all images (never raw `<img>`) | Yes — `CloudinaryImage` wrapper enforces this |
| All images must use Next.js Image component or CldImage | Yes — `CloudinaryImage` wraps `CldImage` |
| Tailwind CSS with custom theme extending brand colors and fonts | Yes — `@theme` block in globals.css |
| Mobile-first responsive design | Not yet relevant (no pages in Phase 1) |
| Semantic HTML throughout | Not yet relevant (no pages except /dev) |
| Accessible: proper alt text, keyboard navigation, ARIA | Not yet relevant (no real content) |
| Performance: Lighthouse 90+, FCP under 1.5s | Font configuration (swap, next/font) lays the groundwork |
| `font-display: swap` on all fonts | Yes — enforced by `next/font` automatically |
| Preload display fonts | Yes — `next/font` handles this automatically |
| No `fonts.googleapis.com` requests | Yes — `next/font/google` self-hosts at build time |
| Warm grays only (beige undertone, not cool) | Yes — all 9 palette colors defined in `@theme` |
| Code: clean, readable, well-commented | Yes — applies to all files written in this phase |
| Framework: Next.js App Router | Yes — locked (D-01) |
| Styling: Tailwind CSS | Yes — locked (D-01, D-03) |
| Images: Cloudinary + next/image | Yes — locked (D-09, D-10) |
| Deployment: Vercel | Not yet relevant (no deploy in Phase 1) |

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — versions verified live from npm registry
- Architecture: HIGH — patterns sourced from `.planning/research/` files which cite official docs
- Pitfalls: HIGH — sourced from `.planning/research/PITFALLS.md` with official doc citations
- Font configuration: HIGH — next/font docs well-established; path resolution pattern verified in research
- Tailwind v4 `@theme`: HIGH — CSS-native config is the documented v4 approach, confirmed in STACK.md

**Research date:** 2026-03-29
**Valid until:** 2026-04-29 (30 days — stable, mature stack)
