---
phase: 01-foundation
plan: 01
subsystem: infra
tags: [nextjs, tailwind, next-font, cloudinary, typescript, woff2]

# Dependency graph
requires: []
provides:
  - Next.js 16 App Router project with TypeScript strict mode and Turbopack
  - Tailwind v4 @theme with 9 brand colors (warm palette, teal-sage accent)
  - Font definitions for Libre Baskerville, Montserrat, Arapey, Apparel, Destiny
  - Typography hierarchy CSS classes (type-title, type-heading, type-subheading, type-body, type-accent)
  - Cloudinary remotePatterns in next.config.ts
  - NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME env var pattern
affects: [all subsequent phases depend on these foundations]

# Tech tracking
tech-stack:
  added: [next@16.2.1, react@19.2.4, tailwindcss@^4.2.0, next-cloudinary@^6.17.5, typescript, @tailwindcss/postcss]
  patterns: [single-font-definition-file, tailwind-v4-theme-block, css-variable-font-tokens]

key-files:
  created:
    - src/lib/fonts.ts
    - public/fonts/apparel-regular.woff2
    - public/fonts/destiny-webfont.woff2
    - .env.example
  modified:
    - src/app/globals.css
    - src/app/layout.tsx
    - src/app/page.tsx
    - next.config.ts
    - tsconfig.json

key-decisions:
  - "Use src/ directory layout — moved app/ to src/app/ after create-next-app bootstrapped without --src-dir"
  - "Updated tsconfig paths from ./* to ./src/* to match src/ structure"
  - "Used real WOFF2 placeholder files (Geist from next internals) instead of empty stubs — next/font/local requires valid WOFF2 to compute metrics"
  - "Fixed .gitignore to track .env.example while still ignoring .env.local (original .env* pattern was too broad)"

patterns-established:
  - "Pattern 1: All next/font instances defined once in src/lib/fonts.ts, applied via CSS variables on <html> in layout.tsx"
  - "Pattern 2: Tailwind v4 brand tokens declared in @theme block in globals.css — no tailwind.config.ts needed"
  - "Pattern 3: Local fonts use ../../public/fonts/ path relative to src/lib/fonts.ts"

requirements-completed: [FOUN-01, FOUN-02, FOUN-03, FOUN-04, FOUN-05, FOUN-06, DESN-03, DESN-05, SEOP-07, SEOP-09]

# Metrics
duration: 6min
completed: 2026-03-29
---

# Phase 01 Plan 01: Foundation Bootstrap Summary

**Next.js 16 + Tailwind v4 @theme with 9 warm brand colors, 5 next/font definitions (Libre Baskerville, Montserrat, Arapey, Apparel, Destiny), typography hierarchy classes, and Cloudinary remotePatterns — builds cleanly with zero external font requests**

## Performance

- **Duration:** ~6 min
- **Started:** 2026-03-29T17:39:09Z
- **Completed:** 2026-03-29T17:44:33Z
- **Tasks:** 2
- **Files modified:** 9

## Accomplishments

- Bootstrapped Next.js 16 App Router project with TypeScript strict mode, Tailwind v4.2, and Turbopack into src/ directory structure
- Created all 5 font definitions in src/lib/fonts.ts using next/font (no external requests to fonts.googleapis.com)
- Replaced globals.css with Tailwind v4 @theme block containing 9 brand colors (warm palette) and 5 font family tokens, plus 5 typography hierarchy classes matching design-spec.md
- Configured next.config.ts with Cloudinary remotePatterns and installed next-cloudinary
- `next build` passes with 0 errors

## Task Commits

Each task was committed atomically:

1. **Task 1: Bootstrap Next.js project and install dependencies** - `870f200` (chore)
2. **Task 2: Configure fonts, brand colors, typography hierarchy, and root layout** - `b9fbd6a` (feat)

## Files Created/Modified

- `src/lib/fonts.ts` - All 5 next/font definitions with CSS variables and display: swap
- `src/app/globals.css` - Tailwind @theme brand colors + typography hierarchy classes
- `src/app/layout.tsx` - Root layout applying all 5 font CSS variables to html element
- `src/app/page.tsx` - Minimal placeholder home page using brand typography classes
- `next.config.ts` - Cloudinary remotePatterns configuration
- `tsconfig.json` - Updated @/* path alias to point to ./src/*
- `public/fonts/apparel-regular.woff2` - Placeholder WOFF2 (swap for real Apparel font when available)
- `public/fonts/destiny-webfont.woff2` - Placeholder WOFF2 (swap for real Destiny font when available)
- `.env.example` - Documented NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME env var

## Decisions Made

- Updated tsconfig paths from `./*` to `./src/*` to match the src/ directory layout that was established after bootstrapping
- Used real WOFF2 placeholder files (Geist font from Next.js internals) instead of empty or synthetic stubs — `next/font/local` requires a valid WOFF2 to compute fallback metrics, otherwise Turbopack throws "end of data reached unexpectedly"
- Fixed .gitignore to be explicit (`env.local`, `.env*.local`) rather than broad (`.env*`) so `.env.example` can be tracked by git

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Moved app/ to src/app/ after create-next-app bootstrapped without --src-dir**
- **Found during:** Task 1 (Bootstrap Next.js project)
- **Issue:** `create-next-app@latest --yes` bootstrapped without the `src/` directory (did not honor the expected src structure). Plan specified `src/` layout throughout.
- **Fix:** Moved all files from `app/` to `src/app/`, created `src/lib`, `src/components/images`, `src/data` directories, updated `tsconfig.json` paths alias from `./*` to `./src/*`
- **Files modified:** tsconfig.json, all src/ files moved
- **Verification:** `next build` passes, @/* imports resolve correctly
- **Committed in:** 870f200 (Task 1 commit)

**2. [Rule 3 - Blocking] Used valid WOFF2 placeholder instead of synthetic stubs for local fonts**
- **Found during:** Task 2 (Font configuration)
- **Issue:** Plan suggested creating "minimal placeholder" or 0-byte WOFF2 stubs. Turbopack's `next/font/local` actually reads the WOFF2 file during build to compute font fallback metrics — an invalid WOFF2 causes "end of data reached unexpectedly" build error.
- **Fix:** Copied a real valid WOFF2 (Geist font from Next.js internals in node_modules) as placeholder for both Apparel and Destiny slots
- **Files modified:** public/fonts/apparel-regular.woff2, public/fonts/destiny-webfont.woff2
- **Verification:** `next build` passes with 0 errors
- **Committed in:** b9fbd6a (Task 2 commit)

**3. [Rule 2 - Missing Critical] Fixed .gitignore to allow .env.example to be tracked**
- **Found during:** Task 1 (git commit)
- **Issue:** Default create-next-app .gitignore used `.env*` pattern, which matched `.env.example`. The plan specifies `.env.example` should be committed to the repo as documentation.
- **Fix:** Changed .gitignore to explicit entries: `.env.local`, `.env*.local`, `.env.development`, `.env.production`
- **Files modified:** .gitignore
- **Verification:** `git add .env.example` succeeds without -f flag
- **Committed in:** 870f200 (Task 1 commit)

---

**Total deviations:** 3 auto-fixed (2 blocking, 1 missing critical)
**Impact on plan:** All auto-fixes necessary for correct project structure and build success. No scope creep.

## Issues Encountered

- `create-next-app --yes` bootstrapped without `src/` layout — required manual restructuring (handled as deviation above)
- `next/font/local` requires valid WOFF2 binary even for placeholder fonts — empty/synthetic files cause Turbopack build failure

## User Setup Required

None — no external service configuration required for this plan. Cloudinary env var is in `.env.local` with the cloud name `jennieslade`. When deploying to Vercel, add `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=jennieslade` as an environment variable.

**Font files:** When Jennie provides the real Apparel and Destiny WOFF2 files, replace:
- `public/fonts/apparel-regular.woff2`
- `public/fonts/destiny-webfont.woff2`

No code changes needed — the font slots in `src/lib/fonts.ts` are already configured.

## Next Phase Readiness

- Foundation complete: brand tokens, fonts, typography, Cloudinary config all in place
- All subsequent phases can use `bg-teal-sage`, `text-charcoal`, `type-title`, etc. immediately
- `@/lib/fonts` pattern established — no other component should import from next/font
- Ready for Phase 01 Plan 02 (whatever the next foundation plan is)

## Known Stubs

- `public/fonts/apparel-regular.woff2` — Placeholder file (copy of Geist font). Real Apparel font from Fort Foundry must be provided by Jennie to render correctly. Typography renders with Georgia fallback until then.
- `public/fonts/destiny-webfont.woff2` — Placeholder file. Real Destiny script font must be provided by Jennie. Typography renders with cursive fallback until then.

These stubs do NOT prevent the plan's goal (foundation infrastructure) from being achieved — the CSS variable slots and font fallbacks are correct. The real files are an external dependency.

---
*Phase: 01-foundation*
*Completed: 2026-03-29*

## Self-Check: PASSED

All files exist on disk and all task commits verified in git history.

| Check | Status |
|-------|--------|
| src/lib/fonts.ts | FOUND |
| src/app/globals.css | FOUND |
| src/app/layout.tsx | FOUND |
| next.config.ts | FOUND |
| .env.example | FOUND |
| public/fonts/apparel-regular.woff2 | FOUND |
| public/fonts/destiny-webfont.woff2 | FOUND |
| 01-01-SUMMARY.md | FOUND |
| Commit 870f200 (Task 1) | FOUND |
| Commit b9fbd6a (Task 2) | FOUND |
