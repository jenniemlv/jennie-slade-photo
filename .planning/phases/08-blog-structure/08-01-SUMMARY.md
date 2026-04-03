---
phase: 08-blog-structure
plan: "01"
subsystem: blog
tags: [blog, mdx, content, listing-page, utility-library]
dependency_graph:
  requires: []
  provides: [blog-utility-library, blog-listing-page, content-posts-directory]
  affects: [/blog route, future blog post pages]
tech_stack:
  added: [gray-matter@4.0.3, next-mdx-remote@6.0.0]
  patterns: [MDX filesystem parsing, server component async/await, gray-matter frontmatter]
key_files:
  created:
    - src/lib/blog.ts
    - src/app/blog/page.tsx
    - content/posts/.gitkeep
  modified:
    - package.json
    - package-lock.json
decisions:
  - gray-matter for frontmatter parsing (lightweight, no MDX pipeline changes needed)
  - next-mdx-remote chosen for App Router Server Component compatibility
  - getAllPosts() returns empty array gracefully when directory empty or missing
  - Warm-gray fallback div when featuredImage is absent (no broken images)
  - Empty state uses text link to /contact (not a button — editorial feel)
  - Page title "The Journal" instead of "Blog" for magazine editorial feel
  - Stale .next cache cleared after adding npm packages (Turbopack chunk resolution issue)
metrics:
  duration: 13min
  completed_date: "2026-04-03"
  tasks_completed: 2
  files_created_or_modified: 5
---

# Phase 08 Plan 01: Blog Infrastructure and Listing Page Summary

## One-liner

MDX blog infrastructure with gray-matter frontmatter parsing, typed utility library, and editorial listing page at /blog with empty state and post card grid.

## What Was Built

### Task 1: MDX Dependencies and Blog Utility Library

Installed `gray-matter` (frontmatter parsing) and `next-mdx-remote` (MDX rendering for App Router Server Components) as project dependencies.

Created `content/posts/.gitkeep` — the directory where MDX blog posts live. Drop a `.mdx` file here and it automatically appears on the listing page.

Created `src/lib/blog.ts` with:
- `BlogPostMeta` interface — frontmatter fields: title, date, excerpt, featuredImage (Cloudinary public ID), slug
- `BlogPost` interface — extends meta with raw MDX content string
- `getAllPosts()` — reads all .mdx files from content/posts/, parses frontmatter with gray-matter, returns sorted newest-first. Returns `[]` gracefully when directory is empty.
- `getPostBySlug(slug)` — reads a single post by slug, returns meta + raw MDX content, or null if not found.

### Task 2: Blog Listing Page

Created `src/app/blog/page.tsx` as a Next.js App Router Server Component.

- **Page header:** Title "The Journal" (editorial magazine feel) with "STORIES, TIPS, AND BEHIND THE SCENES" subtitle
- **Empty state:** Warm, on-brand message ("New stories are on the way...") with a text link to /contact — editorial text link style, not a button
- **Post card grid:** 1 column mobile, 2 columns md+, with 48px gaps
- **Post cards:** Featured image (CloudinaryImage with warm-gray fallback), formatted date, title in Cormorant, 3-line clamped excerpt
- **ScrollFade:** Each card wrapped for staggered scroll reveal
- **Metadata:** SEO-optimized title, description, and OpenGraph tags
- **Header clearance:** pt-32 md:pt-40 matching About and Portfolio pages

## Decisions Made

| Decision | Rationale |
|----------|-----------|
| gray-matter over remark/rehype | Lightweight, zero config for frontmatter only. MDX parsing handled by next-mdx-remote at render time. |
| next-mdx-remote over @next/mdx | next-mdx-remote works in App Router Server Components without next.config changes |
| "The Journal" page title | Magazine editorial feel, consistent with the brand's airy, editorial aesthetic |
| Text link for empty state CTA | More editorial than a button. Buttons are for primary conversion actions. |
| Warm-gray fallback for missing images | Prevents broken image displays while posts are being added |

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Stale .next Turbopack cache caused build failure**
- **Found during:** Task 2 build verification
- **Issue:** Stale `.next/server/app/*.js` files from a previous Turbopack dev session referenced chunk paths that no longer existed after adding npm packages. Build failed with `Cannot find module '../../chunks/ssr/[turbopack]_runtime.js'` errors.
- **Fix:** Deleted `.next/` directory to force a clean production build. Second build succeeded with all 15 routes building correctly.
- **Files modified:** `.next/` (deleted stale cache)

## Known Stubs

None. The empty state is intentional — when no MDX files exist in `content/posts/`, the page shows a warm placeholder message. This is correct behavior, not a stub. Real posts will appear automatically once .mdx files are added.

## Self-Check: PASSED

Files created:
- src/lib/blog.ts — FOUND
- src/app/blog/page.tsx — FOUND
- content/posts/.gitkeep — FOUND

Commits:
- 7005559 — feat(08-01): install MDX deps and create blog utility library — FOUND
- ea9c58d — feat(08-01): create blog listing page at /blog — FOUND

Build: PASSED (all 15 routes, including /blog)
TypeScript: PASSED (no errors)
