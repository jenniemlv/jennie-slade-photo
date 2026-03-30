# Phase 02: Layout Shell - Research

**Researched:** 2026-03-29
**Domain:** Next.js 16 App Router — navigation, footer, section primitives, button components, scroll behavior, page transitions
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**Navigation**
- D-01: Centered elegant layout: "JENNIE SLADE" in display font (Libre Baskerville, uppercase) centered at top, with nav links centered below in a horizontal row.
- D-02: Nav links: About | Portfolio | Contact | Blog (4 links only). No "Home" link. No dropdown menus.
- D-03: Nav link typography: Montserrat, 12px, uppercase, 0.02em letter spacing.
- D-04: Header is transparent over hero sections. White-to-transparent gradient behind text. After scrolling past hero, transitions to solid off-white (#f0eeeb).
- D-05: Header disappears on scroll-down, reappears on scroll-up. Pure CSS transition, no Framer Motion.
- D-06: Header has fixed position (sticky top). Z-index above page content.

**Mobile Navigation**
- D-07: Hamburger icon on mobile (right-aligned). Clean three-line icon, not animated X morph.
- D-08: Mobile menu opens as full-screen overlay with white (#ffffff) background. CSS opacity transition, ~300ms.
- D-09: Mobile menu layout: "JENNIE SLADE" centered top, nav links stacked vertically centered with 48px between links, Instagram icon at bottom.
- D-10: Mobile menu closes on link click and on X button (top-right).

**Footer**
- D-11: "Jennie Slade Photography" in display font (Libre Baskerville, uppercase, centered).
- D-12: jennie@jennieslade.com as a mailto link below the name.
- D-13: Instagram icon link (@jenniesladephoto) — icon only.
- D-14: Nav links repeated horizontally (About | Portfolio | Contact | Blog).
- D-15: Warm-gray divider line (#d4d1cb) above the footer section.
- D-16: Footer background: off-white (#f0eeeb). Padding: 80px top, 48px bottom.

**Buttons**
- D-17: Primary: black (#000000) bg, white text, Apparel font (subheading), uppercase, 0.07em letter spacing, 10px border-radius, padding 10px 14px. Hover: 80% opacity transition.
- D-18: Secondary: transparent bg, black (#000000) border (1px), black text, same typography. Hover: black bg with white text.

**Section Components**
- D-19: Reusable Section component. Desktop: max-width 1200px centered, px-8. Mobile: px-6. Vertical padding: 80px default.
- D-20: Section variants: default (white), muted (off-white #f0eeeb), warm (warm-gray-light #e3e0da).

**Page Transitions**
- D-21: Subtle CSS opacity fade on main content area, ~200ms. Not Framer Motion. Soft crossfade on route change.

### Claude's Discretion
- Breakpoint for mobile/desktop nav switch (768px is standard)
- Scroll threshold for header show/hide behavior (typically 50-100px)
- Exact animation timing/easing curves
- Whether to use a nav component file or inline in layout
- Footer copyright year (auto-generate with JS)

### Deferred Ideas (OUT OF SCOPE)

None — discussion stayed within phase scope.
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| LAYO-01 | Centered elegant navigation with site name/logo centered above nav links | D-01, D-02, D-03: Typography and layout decisions fully specified. Use `.type-title` for site name, `.type-heading` for nav links. |
| LAYO-02 | Navigation is responsive with clean hamburger menu on mobile | D-07 through D-10: Full-screen overlay pattern. Pure CSS fade, 300ms. `useEffect` + `useState` for toggle state. |
| LAYO-03 | Header disappears on scroll-down, reappears on scroll-up (transparent/disappearing behavior) | D-04, D-05, D-06: Scroll listener pattern with `useEffect`. CSS `transform: translateY(-100%)` + `transition` for show/hide. No Framer Motion. |
| LAYO-04 | Footer with "Jennie Slade Photography" in display font, email, Instagram link, and nav links | D-11 through D-16: Static Server Component. All content specified. |
| LAYO-05 | Reusable section layout components for consistent whitespace and padding | D-19, D-20: Three variants, max-width 1200px, specific padding values. |
| LAYO-06 | Primary and secondary button components matching design spec (Apparel font, uppercase, 10px radius) | D-17, D-18: Both variants fully specified. Use `.type-subheading` class. |
| DESN-02 | Warm color palette consistently applied (no cool grays anywhere) | All components must use `--color-*` CSS tokens only. Never Tailwind's built-in `gray-*` utilities. |
| DESN-06 | Subtle page transition animations (soft fade between routes) | D-21: CSS opacity fade on `<main>` wrapper, 200ms. Client wrapper component pattern with `usePathname`. |
</phase_requirements>

---

## Summary

Phase 2 builds the structural chrome that wraps every page: a scroll-aware navigation header, a static footer, reusable section layout primitives, and button components. Everything in this phase is a design-system atom that every subsequent phase consumes.

The technical challenges in this phase are concentrated in the Header component: transparent-over-hero behavior, scroll show/hide logic, and the full-screen mobile menu overlay. All other components (Footer, Section, Button) are straightforward Server Components with no interactivity. The Header requires `'use client'` for its scroll listener and mobile menu state.

Page transitions in Next.js App Router cannot use the `AnimatePresence`/exit animation pattern because the old page unmounts before any exit animation can run. The correct approach is a mount fade using `usePathname` as a key to trigger CSS re-animation on route change. This is a common gotcha and the research documents the correct pattern below.

**Primary recommendation:** Keep the Header as a single `'use client'` component in `src/components/layout/Header.tsx`. Inline the mobile menu inside it (no separate file needed at this scale). Keep Footer, Section, and Button as Server Components. Apply page transitions via a `PageTransition` client wrapper that wraps `{children}` in `layout.tsx`.

---

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Next.js | 16.2.1 | App Router routing and layout | Already installed. `usePathname` hook drives transition key. |
| React | 19.2.4 | Component model, hooks | Already installed. `useState`, `useEffect` for scroll and menu logic. |
| Tailwind CSS | 4.2.2 | Utility-first styling | Already installed. All brand tokens in `globals.css @theme`. |

### Supporting

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| lucide-react | 1.7.0 | Menu, X, and Instagram icons | Use for hamburger (Menu), close (X), and Instagram icons. Latest version verified. Zero-weight: tree-shaking means only the 3 icons used are bundled. |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| lucide-react | Inline SVG only | Inline SVG has no dependency but requires copy-pasting raw SVG strings into JSX. For 3 icons, either approach is fine. Lucide is cleaner and already a project recommendation from the UI-SPEC. |
| lucide-react | heroicons | Both are excellent. Lucide has more icons and is React-native. UI-SPEC mentions both — lucide is the tie-breaker since it was listed first. |
| CSS scroll listener | Framer Motion | Framer Motion is EXPLICITLY forbidden by D-05 and D-21. Do not use it in this phase. |

**Installation:**
```bash
npm install lucide-react
```

**Version verification:** lucide-react@1.7.0 confirmed via `npm view lucide-react version` run on 2026-03-29.

---

## Architecture Patterns

### Recommended Project Structure (this phase)

```
src/
├── app/
│   └── layout.tsx           # Updated: imports Header, Footer, PageTransition
├── components/
│   ├── layout/
│   │   ├── Header.tsx        # 'use client' — scroll state, mobile menu state
│   │   ├── Footer.tsx        # Server Component — static chrome
│   │   └── Section.tsx       # Server Component — layout primitive
│   └── ui/
│       ├── Button.tsx        # Server Component — primary/secondary variants
│       └── PageTransition.tsx # 'use client' — fade wrapper using usePathname
```

### Pattern 1: Scroll-Aware Header

**What:** A single `'use client'` component manages three independent CSS classes derived from scroll position:
1. `transparent` vs `solid` — background appearance
2. `visible` vs `hidden` — translateY show/hide

**Implementation approach:**

```tsx
// src/components/layout/Header.tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)   // past-hero → solid bg
  const [hidden, setHidden] = useState(false)        // scroll-down → hide
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    let lastScrollY = window.scrollY

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const delta = currentScrollY - lastScrollY

      // Toggle background at 80px threshold (UI-SPEC resolved value)
      setScrolled(currentScrollY > 80)

      // Hide on scroll-down (delta > 10), show on scroll-up (delta < -5)
      if (delta > 10 && currentScrollY > 80) {
        setHidden(true)
      } else if (delta < -5) {
        setHidden(false)
      }

      lastScrollY = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={[
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled ? 'bg-off-white' : 'bg-transparent',
        hidden ? '-translate-y-full' : 'translate-y-0',
      ].join(' ')}
    >
      {/* site name + nav links */}
    </header>
  )
}
```

**Key details:**
- `{ passive: true }` on the scroll listener — required for performance, prevents scroll jank.
- Delta thresholds are asymmetric (10px down, 5px up) per UI-SPEC — reduces flicker on micro-scroll reversals.
- The `hidden` state only activates after scrollY > 80 to prevent the header hiding while still at the top.
- Tailwind classes `translate-y-0` and `-translate-y-full` with `transition-transform duration-300` drive the animation — no Framer Motion.

### Pattern 2: Transparent Header Gradient

**What:** A white-to-transparent gradient sits behind the header text when the header is in its transparent state. This ensures text remains readable against bright hero images without an opaque background.

```tsx
{/* Gradient behind header text — only visible when not scrolled */}
{!scrolled && (
  <div
    className="absolute inset-0 pointer-events-none"
    style={{
      background: 'linear-gradient(to bottom, rgba(255,255,255,0.7) 0%, transparent 100%)'
    }}
  />
)}
```

### Pattern 3: Full-Screen Mobile Menu Overlay

**What:** Mobile menu state is co-located in Header.tsx (same component, inline). No separate component file needed — the menu is always rendered but visually hidden via opacity/visibility, and shown on `menuOpen`.

```tsx
{/* Mobile overlay — always in DOM, toggled via opacity */}
<div
  role="dialog"
  aria-modal="true"
  aria-label="Navigation menu"
  className={[
    'fixed inset-0 z-40 bg-white flex flex-col items-center justify-center',
    'transition-all duration-300',
    menuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none',
  ].join(' ')}
>
  {/* JENNIE SLADE at top, nav links centered, Instagram at bottom */}
</div>
```

**Important:** Use `opacity` + `visibility` toggling (not `display: none`) so the CSS fade transition works. `display: none` cannot be transitioned.

**Focus trap:** When the menu opens, focus should be trapped inside. The simplest approach is to use `useEffect` to focus the X button when `menuOpen` becomes true, and let Tab naturally cycle through the 5 interactive elements (4 nav links + X button).

### Pattern 4: Page Transition (CSS Fade on Route Change)

**The App Router challenge:** In Next.js App Router, there is no equivalent to Pages Router's `pageProps` pattern for exit animations. The old page component is already gone before any animation could run. Exit animations (page fading out before new page appears) are not achievable with CSS alone.

**The correct approach:** Fade IN the new page's content. Use `usePathname` as a React key to force re-mount the wrapper on route change, triggering the CSS animation on mount.

```tsx
// src/components/ui/PageTransition.tsx
'use client'

import { usePathname } from 'next/navigation'

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div
      key={pathname}
      className="animate-fade-in"
    >
      {children}
    </div>
  )
}
```

Then in `globals.css`:

```css
@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

.animate-fade-in {
  animation: fade-in 200ms ease-in-out;
}
```

**In layout.tsx:**

```tsx
<body>
  <Header />
  <PageTransition>
    <main id="main-content">{children}</main>
  </PageTransition>
  <Footer />
</body>
```

**Why key={pathname}:** React unmounts and remounts the component when its key changes. This triggers a fresh CSS animation on every route change. It is the canonical App Router page transition pattern.

**Confidence:** HIGH — verified in Next.js official documentation (linking-and-navigating guide, v16.2.1, 2026-03-25) and cross-referenced with community patterns.

### Pattern 5: Section Component with Variant Props

**What:** A typed TypeScript component accepting a `variant` prop for background color. Renders a `<section>` element with consistent max-width and padding.

```tsx
// src/components/layout/Section.tsx
type SectionVariant = 'default' | 'muted' | 'warm'

interface SectionProps {
  children: React.ReactNode
  variant?: SectionVariant
  className?: string
  id?: string
}

const variantClasses: Record<SectionVariant, string> = {
  default: 'bg-white',
  muted: 'bg-off-white',
  warm: 'bg-warm-gray-light',
}

export default function Section({
  children,
  variant = 'default',
  className = '',
  id,
}: SectionProps) {
  return (
    <section
      id={id}
      className={`${variantClasses[variant]} py-20 ${className}`}
    >
      <div className="max-w-[1200px] mx-auto px-8 md:px-6">
        {children}
      </div>
    </section>
  )
}
```

**Note on Tailwind v4 dynamic classes:** In Tailwind v4 (used here), you CANNOT construct class names dynamically using string interpolation like `bg-${variant}`. Class names must appear as complete strings in source code for the scanner to detect them. The `variantClasses` lookup object pattern above is correct and safe.

### Pattern 6: Button Component

**What:** A single Button component accepting `variant`, `href` (for link buttons), and standard button props.

```tsx
// src/components/ui/Button.tsx
import Link from 'next/link'

type ButtonVariant = 'primary' | 'secondary'

interface ButtonProps {
  variant?: ButtonVariant
  href?: string
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-black text-white border border-black hover:opacity-80',
  secondary: 'bg-transparent text-black border border-black hover:bg-black hover:text-white',
}

export default function Button({
  variant = 'primary',
  href,
  children,
  className = '',
  onClick,
}: ButtonProps) {
  const baseClasses = `type-subheading inline-block px-[14px] py-[10px] rounded-[10px] transition-all duration-150 cursor-pointer ${variantClasses[variant]} ${className}`

  if (href) {
    return <Link href={href} className={baseClasses}>{children}</Link>
  }

  return (
    <button onClick={onClick} className={baseClasses}>
      {children}
    </button>
  )
}
```

**Note:** `px-[14px] py-[10px]` uses Tailwind's arbitrary value syntax to hit the exact 10px/14px padding spec. `rounded-[10px]` for the exact 10px border-radius. These are correct in Tailwind v4.

### Anti-Patterns to Avoid

- **Framer Motion for scroll/transition animations:** Explicitly forbidden by D-05 and D-21. Pure CSS + scroll listener achieves the same result with zero extra JS weight.
- **Dynamic Tailwind class names:** Never `bg-${variant}`. All class names must be complete strings in source. Use a lookup object.
- **`display: none` for mobile menu:** Cannot be CSS-transitioned. Use `opacity` + `visibility` together.
- **Scroll listener without `{ passive: true }`:** Causes browser to wait for JS before deciding if scroll should be prevented. Always use passive for read-only scroll listeners.
- **`'use client'` on Footer or Section:** These components have no interactivity. Keep them Server Components to reduce client bundle size.
- **Importing fonts directly in components:** The project rule (from STATE.md and fonts.ts comments) is to only import from `next/font` in `src/lib/fonts.ts`. Use the `.type-*` CSS classes for typography in components instead.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Icon SVGs for hamburger/close/Instagram | Custom SVG code | lucide-react (Menu, X, Instagram icons) | Lucide is accessible, consistent sizing, and tree-shaken to only the icons used |
| Font loading | @font-face declarations in component files | Existing `src/lib/fonts.ts` + `.type-*` CSS classes | Already built in Phase 1. Reimplementing creates duplicate font instances. |
| Brand color tokens | Inline hex values in components | `--color-*` CSS variables / Tailwind utilities from `globals.css` | Already codified. Inline hex bypasses the warm-gray enforcement and makes future theme changes harder. |
| Tailwind base styles | Inline styles in components | `.type-title`, `.type-heading`, `.type-subheading`, `.type-body` classes | Already defined in `globals.css`. Using inline styles breaks the typography contract. |

**Key insight:** Phase 1 did the hard work of setting up the token system. Phase 2 consumes it. Every style decision should reference an existing token or class rather than introducing new values.

---

## Common Pitfalls

### Pitfall 1: Tailwind v4 Dynamic Class Names

**What goes wrong:** Developer writes `bg-${variant}` or `` `text-${color}` `` expecting Tailwind to generate the class. The class never appears in the CSS output. The component renders with no background color and no error.

**Why it happens:** Tailwind v4 (like v3) uses a static scanner to find class names in source files. Dynamically constructed strings are invisible to the scanner.

**How to avoid:** Always use a complete string lookup object:
```tsx
const variantClasses = {
  default: 'bg-white',
  muted: 'bg-off-white',
  warm: 'bg-warm-gray-light',
}
```

**Warning signs:** Component renders but background/text colors are missing. No build error — silent failure.

### Pitfall 2: Scroll Listener Not Removed on Unmount

**What goes wrong:** `useEffect` adds a scroll listener but the cleanup function is missing. The listener stacks up on re-renders, causing multiple handlers firing simultaneously. Headers flash erratically.

**Why it happens:** Forgetting the return cleanup in `useEffect`.

**How to avoid:** Always return the cleanup function:
```tsx
useEffect(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  return () => window.removeEventListener('scroll', handleScroll)
}, [])
```

### Pitfall 3: Page Transition Re-Mounts Layout Components

**What goes wrong:** Developer wraps the entire `<body>` content (including Header and Footer) in the `PageTransition` component. Navigation and footer fade in/out on every page change, creating a disorienting flash.

**Why it happens:** Misunderstanding of which elements should participate in the transition.

**How to avoid:** `PageTransition` wraps only `{children}` (the `<main>` content area). Header and Footer are outside it and persist visually across routes.

```tsx
// Correct:
<body>
  <Header />
  <PageTransition>
    <main id="main-content">{children}</main>
  </PageTransition>
  <Footer />
</body>

// Wrong:
<PageTransition>
  <Header />
  <main>{children}</main>
  <Footer />
</PageTransition>
```

### Pitfall 4: Mobile Menu Not Closing Body Scroll

**What goes wrong:** Mobile menu overlay opens but the page behind it is still scrollable. User scrolls the page underneath the menu, which looks broken.

**Why it happens:** The overlay is visually full-screen but `body` scroll is not locked.

**How to avoid:** Toggle `overflow-hidden` on the `<body>` when the menu opens:
```tsx
useEffect(() => {
  document.body.style.overflow = menuOpen ? 'hidden' : ''
  return () => { document.body.style.overflow = '' }
}, [menuOpen])
```

### Pitfall 5: Warm Grays Replaced by Cool Tailwind Grays

**What goes wrong:** Developer uses `bg-gray-100` or `text-gray-600` from Tailwind's default palette. The site develops a cool, blue-gray tone that clashes with the warm photography aesthetic.

**Why it happens:** Tailwind's built-in gray utilities are always available and autocomplete suggests them.

**How to avoid:** Only use `bg-off-white`, `bg-warm-gray`, `bg-warm-gray-light`, `text-charcoal`, `text-gray` (the custom tokens). Never `gray-*`. The UI-SPEC explicitly states: "The executor must never substitute `gray-*` Tailwind utilities — use only the custom `--color-*` tokens."

### Pitfall 6: Header Z-Index Conflicts

**What goes wrong:** Mobile menu overlay (z-40) renders behind other page elements, or the header (z-50) is covered by hero images or sections that have their own stacking context.

**Why it happens:** Any element with `transform`, `opacity`, `filter`, or `will-change` creates a new stacking context, which can override z-index.

**How to avoid:** Use consistent z-index values:
- Header: `z-50`
- Mobile menu overlay: `z-40` (below header so X button in header sits above it)

Avoid applying `transform` or `opacity` to the static page sections during normal rendering. Only apply them inside animation wrappers.

---

## Code Examples

Verified patterns from project context and Next.js official docs:

### Skip-to-Content Link (Accessibility — Root Layout)

```tsx
// Add at the very top of <body> in layout.tsx
<a
  href="#main-content"
  className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-white focus:px-4 focus:py-2 focus:type-body"
>
  Skip to main content
</a>
```

### Footer Copyright Year

```tsx
// Auto-updating copyright — no manual updates needed
<p className="type-body text-gray text-sm">
  &copy; {new Date().getFullYear()} Jennie Slade Photography
</p>
```

### Instagram Icon with Accessible Label

```tsx
import { Instagram } from 'lucide-react'
import Link from 'next/link'

<Link
  href="https://instagram.com/jenniesladephoto"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="Jennie Slade Photography on Instagram"
  className="text-charcoal hover:text-teal-sage transition-colors duration-150"
>
  <Instagram size={20} />
</Link>
```

### Nav Link with Active State

```tsx
'use client'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

// Inside the nav:
const pathname = usePathname()

<Link
  href="/about"
  className={`type-heading transition-opacity duration-150 ${
    pathname === '/about' ? 'opacity-100' : 'opacity-60 hover:opacity-100'
  }`}
>
  About
</Link>
```

**Note:** Active state uses `opacity-60` for inactive links — subtle visual hierarchy without a different color that might clash with the transparent header state.

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Framer Motion AnimatePresence for page transitions | CSS keyframe animation triggered by `key={pathname}` | App Router (Next.js 13+) | Framer Motion exit animations cannot work with App Router's immediate unmount. CSS-on-mount is the correct pattern. |
| `window.pageYOffset` | `window.scrollY` | Modern browsers (well-supported) | `scrollY` is the standard. `pageYOffset` is an alias that still works but is deprecated in some contexts. |
| `visibility: hidden` alone | `opacity: 0` + `visibility: hidden` together | CSS transitions best practice | `visibility` alone has no transition — it snaps. Pair with `opacity` for smooth fade. `pointer-events: none` also needed to prevent clicks on hidden element. |

**Deprecated/outdated:**
- `useRouter().events` (Pages Router pattern): Does not exist in App Router. The `usePathname` + `key` pattern replaces it entirely.
- `next/head` for metadata: Replaced by the `metadata` export and `generateMetadata` function in App Router.

---

## Environment Availability

Step 2.6: SKIPPED — this phase is purely code/component work. No external services, databases, or CLI tools beyond Node.js (v24.14.0, confirmed) and npm are required. lucide-react is a new npm package dependency; installation is a single `npm install lucide-react` command.

---

## Validation Architecture

### Test Framework

No test infrastructure exists in the project. `nyquist_validation` is `true` in `.planning/config.json`, but this is a visual/UI phase. The phase requirements (LAYO-01 through LAYO-06, DESN-02, DESN-06) are all visual or interaction behaviors that cannot be meaningfully validated by automated unit tests without a browser environment.

| Property | Value |
|----------|-------|
| Framework | None installed |
| Config file | None |
| Quick run command | `npm run dev` then manual visual check at localhost:3000 |
| Full suite command | `npm run build && npm run start` then visual check |

### Phase Requirements to Test Map

| Req ID | Behavior | Test Type | Automated Command | Notes |
|--------|----------|-----------|-------------------|-------|
| LAYO-01 | Site name centered above nav links, correct typography | Visual | Manual only | Requires browser rendering |
| LAYO-02 | Hamburger opens full-screen overlay; X and nav link close it | Interaction | Manual only | Requires browser + interaction |
| LAYO-03 | Header transparent at top, solid after scroll, hides on scroll-down, shows on scroll-up | Interaction | Manual only | Requires browser + scroll behavior |
| LAYO-04 | Footer renders with all required elements, correct typography | Visual | Manual only | Requires browser rendering |
| LAYO-05 | Section variants render correct background colors with correct padding | Visual | `npm run build` (type errors would surface) | TypeScript check for prop types |
| LAYO-06 | Buttons render in Apparel font, correct hover states | Visual | Manual only | Requires browser rendering |
| DESN-02 | No cool gray anywhere (warm palette consistent) | Visual | Manual only | Requires visual inspection |
| DESN-06 | Fade-in animation on route change | Interaction | Manual only | Requires navigation between pages |

### Sampling Rate
- **Per task commit:** `npm run build` — catches TypeScript errors and Tailwind class errors at compile time
- **Per wave merge:** `npm run build` + visual review at localhost:3000
- **Phase gate:** All 5 success criteria visually verified before `/gsd:verify-work`

### Wave 0 Gaps
- No test files to create — visual/interaction requirements are not suitable for unit tests without a browser testing tool like Playwright.
- If automated testing of interactions becomes a priority in a future phase, Playwright would be the appropriate addition (configured via `npx playwright init`).

*(Current position: "None — no unit test infrastructure needed for pure visual/interaction requirements in this phase. Manual verification per the 5 success criteria is the appropriate gate.")*

---

## Project Constraints (from CLAUDE.md)

Directives the planner must verify compliance with:

| Directive | Impact on This Phase |
|-----------|---------------------|
| Never use em dashes | No em dashes in any component copy or comments |
| Never use raw `<img>` tags | Not applicable this phase — no images in nav/footer/buttons. Instagram icon is SVG from lucide-react. |
| Use Next.js Image component for images | Not applicable — no raster images in this phase |
| All fonts via `.type-*` CSS classes | Button, nav links, footer text must use `.type-title`, `.type-heading`, `.type-subheading`, `.type-body` classes — not inline font styles |
| Mobile-first responsive design | Nav breakpoint at 768px (md:). Test mobile layout before desktop layout. |
| Semantic HTML throughout | `<header>`, `<nav>`, `<footer>`, `<main>` elements required |
| Accessible: aria labels, keyboard navigation | Mobile menu: `aria-expanded`, `aria-modal`, focus trap. Skip-to-content link. |
| Warm grays — never cool grays | Only `--color-*` custom tokens. Never `gray-*` Tailwind defaults. |
| Clean, well-commented code | Each component file should have a short comment block explaining what it does and when to use it |
| Component-based architecture | Each component in its own file in the correct directory (`components/layout/`, `components/ui/`) |

---

## Sources

### Primary (HIGH confidence)
- Next.js 16.2.1 official docs (linking-and-navigating) — page transition pattern, usePathname, App Router layout behavior. Fetched 2026-03-29, version-stamped 2026-03-25.
- `src/app/globals.css` — all existing type classes and color tokens verified by direct read
- `src/lib/fonts.ts` — font variable names confirmed by direct read
- `src/app/layout.tsx` — existing root layout structure confirmed
- `.planning/phases/02-layout-shell/02-CONTEXT.md` — all D-* decisions
- `.planning/phases/02-layout-shell/02-UI-SPEC.md` — resolved discretion values, spacing scale, component inventory

### Secondary (MEDIUM confidence)
- `.planning/research/ARCHITECTURE.md` — component server/client split patterns, established project architecture
- `.planning/research/FEATURES.md` — transparent/disappearing header classified as LOW complexity differentiator
- `npm view lucide-react version` — confirmed 1.7.0 on 2026-03-29

### Tertiary (LOW confidence)
- None needed — all findings verified against primary sources

---

## Open Questions

1. **lucide-react Instagram icon name**
   - What we know: lucide-react 1.7.0 is available. The `Instagram` named export exists in lucide-react.
   - What's unclear: The exact import name should be verified at implementation time via `import { Instagram } from 'lucide-react'` — if it doesn't exist, use `import { ExternalLink } from 'lucide-react'` with a custom Instagram SVG.
   - Recommendation: Attempt `Instagram` import first. If not found, inline the SVG (4 lines of JSX).

2. **Font Apparel availability at build time**
   - What we know: `apparel-regular.woff2` in `/public/fonts/` is a valid WOFF2 placeholder (Geist font data, as noted in STATE.md). The Apparel font variable is declared and functional.
   - What's unclear: Jennie has not yet provided the real Apparel font file. Buttons will render in the Georgia fallback visually during development.
   - Recommendation: Build buttons against the `.type-subheading` class as designed. The visual will update automatically when Jennie drops in the real font file. No code changes needed.

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — all libraries already installed or are a single `npm install` away; versions verified directly
- Architecture patterns: HIGH — derived from official Next.js 16.2.1 docs and existing project code
- Pitfalls: HIGH — Tailwind dynamic class pitfall, scroll listener cleanup, and overlay visibility pattern are documented with concrete code examples from the existing stack

**Research date:** 2026-03-29
**Valid until:** 2026-04-28 (stable ecosystem — Next.js 16, Tailwind 4, lucide-react 1.7 unlikely to have breaking changes in 30 days)
