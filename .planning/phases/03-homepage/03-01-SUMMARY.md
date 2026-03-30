---
phase: 03-homepage
plan: 01
subsystem: ui
tags: [nextjs, react, tailwind, intersection-observer, scroll-animation, server-components]

# Dependency graph
requires:
  - phase: 02-layout-shell
    provides: Section, Button, global CSS typography classes, brand color tokens
provides:
  - ScrollFade IntersectionObserver scroll-animation wrapper component
  - HeroSection full-viewport hero with warm-gray placeholder and responsive tagline
  - WelcomeSection editorial welcome copy with generational story and Meet Jennie CTA
affects: [03-homepage, page.tsx composition in plan 03-02]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - IntersectionObserver fade-in via ScrollFade wrapper (fires once, threshold 0.15)
    - HeroSection is full-bleed (no Section wrapper) for cinematic viewport fill
    - Server Component pattern for HeroSection and WelcomeSection (no 'use client')

key-files:
  created:
    - src/components/ui/ScrollFade.tsx
    - src/components/homepage/HeroSection.tsx
    - src/components/homepage/WelcomeSection.tsx
  modified: []

key-decisions:
  - "HeroSection does not use Section wrapper — full-bleed hero needs no max-width constraint"
  - "ScrollFade fires once only via observer.disconnect() — sections do not re-animate on scroll back"
  - "HeroSection tagline uses responsive text-[22px]/[30px]/[38px] instead of type-title default 30px — prevents mobile overflow"

patterns-established:
  - "ScrollFade pattern: wrap any below-fold section in <ScrollFade> for IntersectionObserver fade-in"
  - "CloudinaryImage swap comment included in HeroSection placeholder for future photo replacement"

requirements-completed: [HOME-01, HOME-02, HOME-03, HOME-05, HOME-06, DESN-01, DESN-04]

# Metrics
duration: 2min
completed: 2026-03-30
---

# Phase 3 Plan 01: Homepage Foundation Summary

**ScrollFade IntersectionObserver wrapper and two editorial homepage sections (Hero + Welcome) built as Server Component-first, ready for composition in page.tsx**

## Performance

- **Duration:** 2 min
- **Started:** 2026-03-30T20:41:12Z
- **Completed:** 2026-03-30T20:43:18Z
- **Tasks:** 2
- **Files modified:** 3

## Accomplishments
- ScrollFade component with IntersectionObserver fires once at 15% threshold, 700ms ease-out transition
- HeroSection full-viewport warm-gray placeholder at h-[60vh] md:h-[80vh] with responsive tagline overlay
- WelcomeSection editorial copy in Jennie's authentic voice: 20+ year generational story, first person, no em dashes, secondary button linking to /about

## Task Commits

1. **Task 1: ScrollFade and HeroSection components** - `aa499ce` (feat)
2. **Task 2: WelcomeSection component** - `c08b6e8` (feat)

**Plan metadata:** (docs commit to follow)

## Files Created/Modified
- `src/components/ui/ScrollFade.tsx` - IntersectionObserver fade-in wrapper, 'use client', fires once
- `src/components/homepage/HeroSection.tsx` - Server Component, full-viewport hero with warm-gray placeholder and centered tagline
- `src/components/homepage/WelcomeSection.tsx` - Server Component, editorial welcome copy with generational story, Meet Jennie CTA

## Decisions Made
- HeroSection does not wrap in `<Section>` — the hero is full-bleed and must not be constrained by a max-width container
- ScrollFade uses `observer.disconnect()` inside the `isIntersecting` callback to fire the animation only once (sections do not re-animate when user scrolls back up)
- HeroSection tagline uses explicit `text-[22px] md:text-[30px] lg:text-[38px]` overrides rather than the `.type-title` default of 30px, which would overflow on small mobile screens

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None.

## User Setup Required
None - no external service configuration required.

## Known Stubs
- `src/components/homepage/HeroSection.tsx` - warm-gray `<div>` placeholder instead of real photo. This is intentional and documented: a CloudinaryImage swap comment is included with exact replacement instructions and the `priority` prop reminder.

## Next Phase Readiness
- All three components are ready for composition into `src/app/page.tsx` (Plan 03-02)
- ScrollFade is ready to wrap WelcomeSection and any other below-fold sections
- HeroSection placeholder will be replaced with real Cloudinary image when photography assets are available

---
*Phase: 03-homepage*
*Completed: 2026-03-30*
