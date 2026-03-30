---
phase: 02-layout-shell
plan: "01"
subsystem: ui
tags: [react, tailwind, next.js, css-animations, design-system]

# Dependency graph
requires:
  - phase: 01-foundation
    provides: globals.css with @theme brand tokens and .type-* typography classes, src/lib/fonts.ts font definitions

provides:
  - Section server component with default/muted/warm background variants (max-w-[1200px], px-6 md:px-8, py-20)
  - Button server component with primary/secondary variants using .type-subheading and correct padding/radius
  - PageTransition client component with key={pathname} remount pattern for CSS route-change fade
  - @keyframes fade-in and .animate-fade-in in globals.css (200ms ease-in-out)

affects: [02-layout-shell (plans 02, 03), all future phases that import Section or Button]

# Tech tracking
tech-stack:
  added: [lucide-react@1.7.0 (already in package.json, confirmed in node_modules)]
  patterns:
    - Tailwind v4 static class lookup object pattern (variantClasses Record) to avoid dynamic class construction
    - Server Component by default - only add 'use client' when interactivity is required
    - CSS keyframe animation triggered by React key change for App Router page transitions
    - .type-* CSS class composition instead of inline font styles

key-files:
  created:
    - src/components/layout/Section.tsx
    - src/components/ui/Button.tsx
    - src/components/ui/PageTransition.tsx
  modified:
    - src/app/globals.css (added @keyframes fade-in and .animate-fade-in)

key-decisions:
  - "Section and Button are Server Components with no 'use client' directive — reduces client bundle size"
  - "PageTransition uses key={pathname} to force remount on route change, triggering CSS animation — canonical App Router pattern"
  - "Button renders as <Link> when href is provided, <button> otherwise — single component handles both cases"
  - "variantClasses lookup object pattern enforced for both Section and Button — Tailwind v4 static scanner requires complete class strings"

patterns-established:
  - "Pattern: Server Component by default, 'use client' only when state/effects needed"
  - "Pattern: Tailwind variant lookup via Record<VariantType, string> — never dynamic string interpolation"
  - "Pattern: CSS class composition via .type-* classes — no inline font declarations in components"
  - "Pattern: PageTransition wraps only <main> content, not Header/Footer (avoids Pitfall 3)"

requirements-completed: [LAYO-05, LAYO-06, DESN-06]

# Metrics
duration: 22min
completed: 2026-03-30
---

# Phase 02, Plan 01: Design System Primitives Summary

**Section/Button/PageTransition atoms built as typed Server Components using .type-* CSS class composition and Tailwind v4 static lookup patterns, with CSS fade-in keyframe wired to App Router route changes via key={pathname}.**

## Performance

- **Duration:** 22 min
- **Started:** 2026-03-30T13:54:14Z
- **Completed:** 2026-03-30T14:16:48Z
- **Tasks:** 2
- **Files modified:** 4

## Accomplishments

- Section component built with three background variants (white, off-white, warm-gray-light) using complete static Tailwind class strings
- Button component built with primary (black bg) and secondary (transparent, inverts on hover) variants using .type-subheading typography
- PageTransition client component uses key={pathname} to trigger CSS fade-in animation on every App Router route change
- Fade-in keyframe (200ms ease-in-out) appended to globals.css without disrupting existing @layer base styles

## Task Commits

Each task was committed atomically:

1. **Task 1: Install lucide-react and create Section + Button components** - `484763a` (feat)
2. **Task 2: Create PageTransition component and add fade-in keyframe to globals.css** - `01d998e` (feat)

## Files Created/Modified

- `src/components/layout/Section.tsx` - Reusable section layout primitive with default/muted/warm variants, max-w-[1200px] centering
- `src/components/ui/Button.tsx` - Primary and secondary button, renders as Link or button depending on href prop
- `src/components/ui/PageTransition.tsx` - Client wrapper using usePathname key to trigger CSS animation on route change
- `src/app/globals.css` - Added @keyframes fade-in and .animate-fade-in class (200ms ease-in-out)

## Decisions Made

- Section and Button kept as Server Components (no interactivity needed) to minimize client bundle
- PageTransition added as 'use client' because usePathname requires client context
- Button handles both link and button rendering in a single component via href prop
- variantClasses lookup objects used in both Section and Button to comply with Tailwind v4's static class scanner requirement

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None. TypeScript compilation passed with zero errors. Build completed successfully (119s compile, 5 pages generated).

## Known Stubs

None. All three components are fully functional design system atoms with no placeholder data or hardcoded stubs.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Section, Button, and PageTransition are ready for import in Plans 02 and 03
- Header (Plan 02) can use lucide-react (Menu, X, Instagram icons) which is confirmed in node_modules
- PageTransition will be wired into layout.tsx in Plan 03
- All components follow the .type-* class composition pattern established in Phase 01

---
*Phase: 02-layout-shell*
*Completed: 2026-03-30*
