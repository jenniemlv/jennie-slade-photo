# Phase 7: SEO and Open Graph - Context

**Gathered:** 2026-04-01
**Status:** Ready for planning

<domain>
## Phase Boundary

Add comprehensive SEO infrastructure: optimized meta titles/descriptions on every page, Open Graph tags for social sharing, LocalBusiness JSON-LD structured data, sitemap, and Lighthouse performance verification. This is technical SEO work that makes the site discoverable and shareable.

</domain>

<decisions>
## Implementation Decisions

### Meta Titles & Descriptions (Optimized for Las Vegas Market)
- **D-01:** Follow the 2026 SEO formula: Primary Keyword + Location | Brand Name. Front-load the primary keyword. Keep titles under 60 characters. Descriptions under 155 characters.
- **D-02:** Optimized page titles and descriptions (researched against top Las Vegas competitors — Jay Soriano, Christian Purdie, LV Photography, Marie Grantham, Kristen Marie):

| Page | Title (under 60 chars) | Description (under 155 chars) |
|------|----------------------|-------------------------------|
| Home | Las Vegas Portrait Photographer \| Jennie Slade | Families, weddings, seniors, and headshots photographed with warmth and heart. Over 20 years capturing Las Vegas memories. |
| About | About Jennie Slade \| Las Vegas Photographer | Las Vegas photographer with 20+ years capturing the same families from newborns to seniors. Meet the person behind the camera. |
| Portfolio | Photography Portfolio \| Jennie Slade Photography | Curated wedding, family, senior, and headshot galleries from over two decades of Las Vegas portrait photography. |
| Weddings | Las Vegas Wedding Photographer \| Jennie Slade | Timeless, editorial wedding photography from first look to last dance. Capturing every real moment of your Las Vegas wedding. |
| Families | Las Vegas Family Photographer \| Jennie Slade | Family portrait sessions full of real moments, belly laughs, and love. Photographing Las Vegas families for over 20 years. |
| Seniors | Las Vegas Senior Portraits \| Jennie Slade Photography | Senior portrait sessions that capture who you really are. Fun, relaxed photos at your favorite Las Vegas spots. |
| Headshots | Las Vegas Headshots & Corporate \| Jennie Slade | Professional headshots and corporate team photography. Confident, approachable portraits starting at $200. |
| Contact | Book a Session \| Jennie Slade Photography | Ready to book your Las Vegas photo session? Families, weddings, seniors, and headshots. Reach out and let's create something beautiful. |
| Blog | Blog \| Jennie Slade Photography | Session features, Las Vegas photo location guides, and stories from behind the camera by Jennie Slade Photography. |

- **D-03:** Key SEO strategy: "Las Vegas" appears in EVERY page title. Competitors who rank well (Jay Soriano, Christian Purdie) all front-load "Las Vegas" in their titles. We do the same.

### Open Graph Tags
- **D-04:** Every page gets og:title, og:description, og:image, og:type, og:url, og:site_name.
- **D-05:** OG images: For now, use a default 1200x630 warm-gray placeholder with "Jennie Slade Photography" text overlay. When real photos are on Cloudinary, generate proper OG images via getCldOgImageUrl().
- **D-06:** Twitter card: summary_large_image type on all pages.
- **D-07:** og:site_name: "Jennie Slade Photography"

### LocalBusiness JSON-LD Structured Data
- **D-08:** Schema type: LocalBusiness with sub-type Photographer.
- **D-09:** Business details:
  - Name: "Jennie Slade Photography"
  - Service area: Las Vegas, Nevada (no street address — home-based)
  - Email: jennie@jennieslade.com
  - No phone number (per Jennie's preference)
  - URL: https://jennieslade.com
  - Instagram: https://instagram.com/jenniesladephoto
- **D-10:** Service offerings in structured data: Wedding Photography, Family Photography, Senior Portraits, Headshots, Corporate Photography.
- **D-11:** Price range: "$$" (mid-tier for Las Vegas market).
- **D-12:** Place JSON-LD in root layout.tsx so it appears on every page.

### Sitemap
- **D-13:** Use Next.js built-in `app/sitemap.ts` to generate sitemap automatically.
- **D-14:** Include all public routes: /, /about, /portfolio, /weddings, /families, /seniors, /headshots, /contact, /blog.
- **D-15:** Set lastModified to current date. Priority: homepage 1.0, gallery pages 0.8, other pages 0.6.

### Robots.txt
- **D-16:** Create `app/robots.ts` allowing all crawlers, pointing to sitemap URL.

### Performance Verification
- **D-17:** Run Lighthouse audit on all pages. Target: 90+ on all four categories (Performance, Accessibility, Best Practices, SEO).
- **D-18:** Fix any issues found during Lighthouse audit within this phase.

### Additional SEO (10/10 Competitive Edge)
- **D-19:** Canonical URLs on every page to prevent duplicate content.
- **D-20:** Proper heading hierarchy verified on every page (one H1, logical H2/H3 structure).
- **D-21:** All existing images already have descriptive alt text (verified in Phase 5).
- **D-22:** Google Search Console verification meta tag (placeholder — Jennie will need to create a Search Console account).
- **D-23:** Add a default OG image file at /public/images/og-default.png (warm-gray 1200x630 with brand name).

### Claude's Discretion
- Exact OG image placeholder design
- Whether to use generateMetadata function or static metadata export (some pages already have static)
- Lighthouse fix prioritization
- robots.txt exact rules
- Any additional structured data properties

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Brand & Design
- `CLAUDE.md` — SEO guidelines, meta tag requirements
- `.claude/skills/jennie-slade-photo-brand/SKILL.md` — Brand colors for OG image

### Existing Pages (already have metadata exports)
- `src/app/page.tsx` — Homepage
- `src/app/about/page.tsx` — About
- `src/app/portfolio/page.tsx` — Portfolio hub
- `src/app/weddings/page.tsx` — Weddings gallery
- `src/app/families/page.tsx` — Families gallery
- `src/app/seniors/page.tsx` — Seniors gallery
- `src/app/headshots/page.tsx` — Headshots gallery
- `src/app/contact/page.tsx` — Contact
- `src/app/layout.tsx` — Root layout (for JSON-LD placement)

### Research
- `.planning/research/ARCHITECTURE.md` — getCldOgImageUrl() for OG images
- `.planning/research/PITFALLS.md` — SEO structured data guidance

</canonical_refs>

<code_context>
## Existing Code Insights

### What Already Exists
- Most pages already have `export const metadata: Metadata` with basic titles/descriptions
- These need to be UPDATED with the optimized versions above, not created from scratch
- Root layout.tsx already has a base metadata export

### What Needs Creating
- `app/sitemap.ts` — New file
- `app/robots.ts` — New file
- JSON-LD script in layout.tsx — New addition
- OG default image — New file
- Updated metadata on all 9 pages

### Integration Points
- `src/app/layout.tsx` — Add JSON-LD, update base metadata with OG defaults
- Every page's metadata export — Update titles and descriptions
- `public/images/og-default.png` — Create placeholder OG image

</code_context>

<specifics>
## Specific Ideas

- The #1 competitive advantage is "20 years" — no other Las Vegas photographer can claim this. It appears in multiple descriptions.
- "Las Vegas" in every title is non-negotiable for local SEO. Competitors who rank well all do this.
- The generational story ("same families from newborns to seniors") is unique and should appear in About description.
- Headshots page includes pricing in description ("starting at $200") — this is intentional. Pricing in meta descriptions increases click-through rate for high-intent searches.

</specifics>

<deferred>
## Deferred Ideas

- Google Business Profile setup (requires separate Google account setup)
- Google Search Console verification (requires DNS or meta tag verification)
- Real OG images from Cloudinary (when real photos are uploaded)
- Blog post SEO (handled in Phase 8)

</deferred>

---

*Phase: 07-seo-and-open-graph*
*Context gathered: 2026-04-01*
