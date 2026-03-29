# Feature Research

**Domain:** Editorial portrait photography portfolio website
**Researched:** 2026-03-29
**Confidence:** HIGH (verified across multiple authoritative sources, cross-referenced with direct site analysis)

---

## Feature Landscape

### Table Stakes (Users Expect These)

Features that visitors assume exist. Missing any of these and the site feels broken or unprofessional.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Full-bleed hero image(s) on homepage | Every premium photographer site leads with a powerful image. Absence signals "template site." | LOW | Hero must be eager-loaded (not lazy), otherwise Lighthouse LCP tanks. |
| Gallery pages per session type | Clients want to see work organized by what they're hiring for (families, weddings, seniors). Mixing everything in one dump is confusing. | LOW | Uniform grid preferred over masonry for Jennie's editorial aesthetic. |
| Lightbox for full-screen image viewing | Standard expectation for photography sites. Clicking a thumbnail to see nothing is baffling to visitors. | MEDIUM | Full-screen, keyboard-navigable, prev/next arrows, click-outside-to-close. |
| About page with personal story and photo | Clients are hiring a person, not a logo. An impersonal or missing about page kills the connection before it starts. | LOW | Should include Jennie's 20+ year story and generational family angle. |
| Contact/inquiry form | Without a clear inquiry path, interested clients email their existing photographer instead. | LOW | 5-7 fields max. More fields = fewer submissions. |
| Mobile-first responsive design | 60%+ of photography site traffic is mobile. A non-responsive site is a business problem, not just a design problem. | MEDIUM | Mobile experience must be beautiful, not just functional. |
| Clean navigation (5 items or fewer) | Users need to find Portfolio, About, and Contact within 2 seconds. Buried navigation = lost clients. | LOW | Centered elegant layout per CLAUDE.md. No dropdowns needed. |
| Fast load time (under 3 seconds) | Google research: 32% bounce rate increase from 1s to 3s load time. 53% abandon at 3+ seconds on mobile. | MEDIUM | Cloudinary + Next.js Image + eager LCP image. This is a real risk for photo-heavy sites. |
| Descriptive alt text on all images | Accessibility and SEO. Search engines cannot see images without it. | LOW | "Las Vegas family portrait session, Red Rock Canyon" style, not keyword-stuffed. |
| Meta title and description per page | Search engines need this to understand what each page is. Default or missing metas hurt ranking. | LOW | Every page: unique title, 155-160 char description. |
| Footer with contact info and nav | Visitors who reach the footer are often ready to act. No contact path = abandoned intent. | LOW | Email, Instagram, brief nav links. Keep simple per CLAUDE.md. |
| Blog with individual post pages | SEO for "Las Vegas family photographer" and similar queries requires content. A blog without posts is fine; no blog at all is a missed opportunity. | MEDIUM | Blog listing + `[slug]` post template needed. |
| Social media links | Instagram is where photographers build audiences. Visitors expect a link. | LOW | Link only, not an embedded feed. Embedded feeds are slow and visually noisy. |

### Differentiators (Competitive Advantage)

Features that set a 10/10 site apart. Not expected, but deeply valued by the right clients.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Stacked editorial homepage (magazine-spread layout) | Most photographer sites are grid dumps. A magazine-spread homepage with large images interspersed with text sections creates an emotional journey before asking for an inquiry. This is the Elizabeth Messina / Jose Villa signature. | MEDIUM | Alternating image-left/text-right, full-bleed sections, deliberate pacing. |
| Scroll-triggered fade-in animations (subtle) | Gives the site a sense of being alive and editorial without distracting from the photographs. Feels expensive without being flashy. | LOW | CSS-only with Intersection Observer. Never use JS animation libraries for this. Too much weight. |
| Generational continuity narrative woven into copy | Jennie's actual superpower: photographing the same families for 18+ years. No competitor can say this. Surfacing this story on the homepage and about page creates an emotional hook that no amount of skill claims can match. | LOW | This is copy, not a technical feature. But it's a differentiator the site must communicate. |
| Transparent/disappearing header on scroll | On scroll-down the header fades or slides away, giving images full vertical space. On scroll-up, it reappears instantly. Feels editorial and considered. | LOW | CSS + small JS scroll listener. Easy with Tailwind. |
| Curated galleries (15-20 images, not 100+) | Showing everything dilutes everything. 15-20 best images per category create a stronger impression than 100 similar ones. Clients shouldn't have to work to see the best work. | LOW | This is a content decision, not a technical one. Document it so Jennie knows to edit, not just add. |
| Open Graph images per page | When clients share the site on Instagram stories, iMessage, or Pinterest, OG images determine whether it looks beautiful or like a broken link. Critical for a photography business where referrals happen on social. | LOW | 1200x630 per page, featuring actual photography. Next.js metadata API handles this cleanly. |
| LocalBusiness structured data (JSON-LD) | Rich snippets in Google search results. Schema for a Las Vegas photographer with correct address, service area, and photography specializations gives 30% more click-through than standard results (BrightEdge research). | LOW | One JSON-LD block in the site layout. Implement once. |
| Reading-line text layout (short paragraphs, generous line-height) | Photography sites often neglect copy. When copy breathes (1.9 line-height, 2-3 sentence paragraphs, lots of whitespace), it feels premium. When copy is dense, it feels like a brochure. | LOW | Enforce via Tailwind prose config matching CLAUDE.md type spec. |
| Testimonials integrated into pages (not buried) | Client quotes on the about page and near contact CTAs remove booking anxiety. "I've used Jennie for 12 years" from a real client says more than any marketing claim. | LOW | 3-5 quotes, placed near relevant content, not in a separate testimonials graveyard. |
| Blog posts that rank for local search | "Las Vegas family photographer fall session" is a real search query. A blog post about a Red Rock Canyon session with proper title, heading hierarchy, and local keywords can own that query. This is long-term SEO that no shortcut replaces. | MEDIUM | Each blog post needs: good title, proper H1-H3 hierarchy, location-specific copy, at least one session image. |
| Page transition animations (subtle) | A soft fade between pages makes the site feel like a cohesive editorial experience rather than a collection of separate pages. Visitors feel they're moving through a magazine. | LOW | CSS opacity transition on route change in Next.js App Router. Lightweight. |

### Anti-Features (Commonly Requested, Often Problematic)

Features that seem like good ideas but consistently create problems.

| Feature | Why Requested | Why Problematic | Alternative |
|---------|---------------|-----------------|-------------|
| Embedded Instagram feed | Keeps the page "fresh" without manual updates | Slow to load (third-party JS), often breaks when Instagram API changes, visually noisy, diverts visitors off-site before they inquire. A direct link does the job without the cost. | Instagram icon link in footer. Clean, fast, honest. |
| Autoplay video hero | Feels dynamic and high-end | Heavy bandwidth cost (especially mobile), visitors often mute/close it immediately, frequently breaks on iOS. Slows page load dramatically. A great still image beats a mediocre autoplay video. | Full-bleed hero image with strong composition. Photographic hero done right is more compelling. |
| Splash/intro page | Creates a "grand entrance" feeling | Users resent forced delays. Kills SEO because search engine crawlers often don't follow the redirect. Bounce rate increases. | Open directly to the homepage with a powerful hero image. That IS the grand entrance. |
| Autoplay background music | Boutique photographers sometimes do this for ambiance | Universally disliked. Users are often in quiet places. Instant close/mute reaction loses the session. | Let the photography speak for itself. |
| Parallax scrolling on gallery images | Feels editorial and dynamic | Can conflict with the photography's composition (cropping or shifting images unexpectedly). Also causes jank on mobile. Expensive to do well. | Subtle fade-in on scroll achieves the "alive" feeling without risking image composition. |
| Client portal / proofing gallery | One-stop shop for everything | Complex to build and maintain, especially for a non-developer owner. Pixieset already handles this well. Building a second system adds maintenance burden with no client benefit. | Keep proofing in Pixieset. Link from contact confirmation email. |
| Popup newsletter signup | Grow an email list | Interrupts the editorial experience the moment someone arrives. Signals "this is a marketing machine" rather than "this is an artist." Clients came to see the photography, not sign up for emails. | If email list matters later, add a subtle email field in the footer with a soft ask. |
| Masonry / Pinterest-style gallery | "Shows more images, looks dynamic" | Breaks the grid discipline that makes the site feel editorial. Arbitrary cropping disrespects the photographer's composition (CLAUDE.md explicitly warns against awkward cropping). Also harder to control on mobile. | Uniform grid with consistent aspect ratios and generous gaps. Respects composition and feels more intentional. |
| Online booking / scheduling widget | Convenient for clients | Adds third-party JS weight, visual inconsistency, and forces Jennie into a booking flow she may not want for relationship-driven work. An inquiry form keeps the conversation personal. | Simple inquiry form. Jennie responds and books on her terms. |
| Pricing calculator | Transparent pricing, interactive | Photography pricing is relationship-based and session-specific. Calculators create anchoring problems and often result in sticker shock before Jennie can explain the value. | Show pricing ranges or session types on contact page. Full pricing in response to inquiry. |
| Too-large galleries (100+ images) | More to see = more impressive | Dilutes the strongest work. Visitors stop seeing individual images and start scrolling mindlessly. 15-20 images per gallery creates stronger impact. | Curate ruthlessly. 15-20 per category. |

---

## Feature Dependencies

```
Lightbox
    └──requires──> Gallery grid (must have images to light-box)

Blog post [slug] page
    └──requires──> Blog listing page
                       └──requires──> At least 1 post to be meaningful

Open Graph images per page
    └──requires──> Real photography on Cloudinary (placeholders won't work for OG)

LocalBusiness JSON-LD
    └──requires──> Stable page layout (put in root layout.tsx)

Scroll animations (fade-in)
    └──requires──> Images below the fold (works alongside lazy loading)
                       └──note──> LCP image must NOT be lazy-loaded

Testimonials near CTAs
    └──requires──> Contact page or About page (placement context)

Generational continuity narrative
    └──requires──> About page (primary home) + Homepage welcome section (secondary)

Page transitions
    └──requires──> Next.js App Router layout structure (wrap in layout)
```

### Dependency Notes

- **LCP image must be eager, all others lazy:** The hero image on the homepage is the Largest Contentful Paint element. Lazy loading it (common mistake) directly tanks Lighthouse score. Every other below-fold image should be lazy. This is a build-time decision.
- **Cloudinary before real images, not before site launch:** The site can launch with color-block placeholders. Cloudinary integration is needed before adding real photography, not before launch.
- **Blog structure before blog posts:** Build the listing page and post template first. Posts can be added at any time after.
- **Curated gallery sizes (15-20 images) conflict with "show everything" instinct:** Document this explicitly in handoff notes to Jennie. More images added later should replace weaker ones, not just accumulate.

---

## MVP Definition

### Launch With (v1)

Minimum needed to replace the current Showit site and feel premium to an arriving visitor.

- [ ] Homepage with editorial hero, welcome text, portfolio preview, and footer
- [ ] About page with Jennie's story, personal photo, and CTA to contact
- [ ] Portfolio hub page linking to three session types
- [ ] Weddings gallery with lightbox
- [ ] Families gallery with lightbox
- [ ] Seniors gallery with lightbox
- [ ] Contact/inquiry form (name, email, session type, date, message)
- [ ] Blog listing page and post template (can have 0 posts at launch)
- [ ] Meta tags and Open Graph tags on all pages
- [ ] LocalBusiness JSON-LD in root layout
- [ ] Mobile-responsive throughout
- [ ] Scroll-triggered fade-in on gallery images
- [ ] Transparent header with scroll behavior
- [ ] Footer with email, Instagram link, nav links
- [ ] Fast load: eager LCP hero, lazy everything else, Cloudinary optimization

### Add After Validation (v1.x)

Add these once the site is live and Jennie has real content flowing.

- [ ] Real photography in galleries (Cloudinary) -- trigger: Jennie uploads images
- [ ] Per-page Open Graph images using real photography -- trigger: real images exist
- [ ] Testimonials on About page and near Contact CTA -- trigger: Jennie provides quotes
- [ ] First blog posts with local SEO targeting -- trigger: content ready
- [ ] Page transition animations -- trigger: after core UX validated on mobile

### Future Consideration (v2+)

Defer until the site is stable and traffic patterns are understood.

- [ ] "As Seen In" publications bar -- trigger: Jennie has media credits to feature
- [ ] Blog content strategy with keyword targeting -- trigger: 5+ posts published
- [ ] Subtle parallax on full-bleed sections (not gallery images) -- trigger: only if explicitly wanted, mobile performance must be tested first
- [ ] Email list footer opt-in -- trigger: only if Jennie wants a newsletter

---

## Feature Prioritization Matrix

| Feature | User Value | Implementation Cost | Priority |
|---------|------------|---------------------|----------|
| Editorial stacked homepage | HIGH | MEDIUM | P1 |
| Gallery pages + lightbox | HIGH | MEDIUM | P1 |
| Contact inquiry form | HIGH | LOW | P1 |
| About page with story | HIGH | LOW | P1 |
| Mobile-first responsive design | HIGH | MEDIUM | P1 |
| Performance optimization (LCP eager, lazy-load rest) | HIGH | LOW | P1 |
| Meta tags + Open Graph per page | HIGH | LOW | P1 |
| LocalBusiness JSON-LD | MEDIUM | LOW | P1 |
| Scroll fade-in animations | MEDIUM | LOW | P1 |
| Transparent/disappearing header | MEDIUM | LOW | P2 |
| Blog listing + post template | MEDIUM | MEDIUM | P1 |
| Testimonials integrated into pages | MEDIUM | LOW | P2 |
| Generational narrative in copy | HIGH | LOW | P1 (copy decision) |
| Curated gallery sizes (15-20) | HIGH | LOW | P1 (content decision) |
| Per-page OG images with real photography | HIGH | LOW | P2 (needs real images first) |
| Local SEO blog content | MEDIUM | MEDIUM | P2 |
| Page transition animations | LOW | LOW | P3 |
| "As Seen In" bar | LOW | LOW | P3 |

**Priority key:**
- P1: Must have for launch
- P2: Should have, add when possible
- P3: Nice to have, future consideration

---

## Competitor Feature Analysis

Sites in the Elizabeth Messina / Jose Villa tier were analyzed for patterns (sites returned 403 on direct fetch; analysis based on industry reporting and secondary sources).

| Feature | Average Photographer Site | Fine Art / Editorial Tier | Jennie's Plan |
|---------|--------------------------|--------------------------|---------------|
| Homepage | Hero image + quick grid dump | Magazine-spread stacked layout with image/text rhythm | Stacked editorial layout |
| Gallery | All images in one page | Curated by session type, 15-20 each | Three categories, curated |
| Lightbox | Basic or absent | Full-screen, keyboard-nav, minimal chrome | Full-screen lightbox |
| Navigation | Generic nav bar | Centered typographic elegance, disappears on scroll | Centered elegant, transparent-on-scroll |
| About page | Bio paragraph | Personal story + personality showcase | Story-first, generational angle |
| Social proof | Testimonials page nobody finds | Integrated quotes near CTAs | Near About CTA and Contact |
| Contact | Generic form | Minimal fields, conversational copy | 5-7 fields, warm language |
| Blog | Absent or irregular | Real wedding/session stories, local SEO | Blog template ready for content |
| Mobile | Responsive but afterthought | Beautiful on mobile intentionally | Mobile-first, beautiful not just functional |
| Performance | Notoriously slow | Fast, images optimized aggressively | Lighthouse 90+, FCP under 1.5s |
| Social media | Embedded feed (slow) | Icon link only | Footer icon/link only |

---

## Sources

- [StyleCloud: 21 Fine Art Wedding Photography Websites](https://stylecloud.co/fine-art-wedding-photography-websites/) — Design philosophy of the Elizabeth Messina / Jose Villa tier
- [SiteBuilderReport: Wedding Photography Websites 2026](https://www.sitebuilderreport.com/inspiration/wedding-photography-websites) — Common patterns in top-tier sites
- [Photo Web Designs: 17 Best Wedding Photographer Websites 2025](https://photowebdesigns.com/wedding-photographer-websites/) — Feature inventory
- [ForegroundWeb: 60+ Photography Website Mistakes](https://www.foregroundweb.com/photography-website-mistakes/) — Anti-patterns, concrete mistakes
- [FloThemes: 14 Website Mistakes Photographers Make](https://flothemes.com/website-mistakes-photographers-make/) — UX mistakes, mobile pitfalls
- [HoneyBook: Effective Contact Forms for Photographers](https://www.honeybook.com/blog/how-to-create-an-effective-contact-form-for-photographers) — Form field research
- [ShootProof: 5 Contact Forms that Get Clients](https://www.shootproof.com/blog/5-genius-contact-forms-that-will-get-you-more-clients/) — Conversion best practices
- [Vercel Blog: Fast Animated Image Gallery with Next.js](https://vercel.com/blog/building-a-fast-animated-image-gallery-with-next-js) — Performance patterns
- [Core Web Vitals: Fix LCP Lazy Loading](https://www.corewebvitals.io/pagespeed/fix-largest-contentful-paint-image-was-lazily-loaded-lighthouse) — LCP / lazy load conflict
- [Mike Cassidy Photography: Structured Data JSON-LD Template](https://www.mikecassidyphotography.com/post/a-structured-data-json-ld-template-for-your-photography-business) — LocalBusiness schema
- [Semrush: Open Graph Best Practices](https://www.semrush.com/blog/open-graph/) — OG tag implementation
- [Pixieset Blog: Jose Villa Interview](https://blog.pixieset.com/blog/jose-villa-interview/) — Client communication, editorial philosophy

---

*Feature research for: editorial portrait photography portfolio website*
*Researched: 2026-03-29*
