# Pitfalls Research

**Domain:** Editorial portrait photography website (Next.js App Router, Cloudinary, Vercel)
**Researched:** 2026-03-29
**Confidence:** HIGH (technical pitfalls verified with official docs and multiple sources; design pitfalls verified with photography-specific community resources)

---

## Critical Pitfalls

### Pitfall 1: Double Image Optimization (Cloudinary + Next.js Both Transforming)

**What goes wrong:**
When you use a Cloudinary URL inside the standard Next.js `<Image>` component without configuring a Cloudinary loader, both systems try to optimize the same image. Next.js wraps the Cloudinary URL in its own `/\_next/image?url=...` pipeline, fetching and re-encoding an image Cloudinary has already optimized. You get degraded quality (double compression), higher bandwidth costs, and none of Cloudinary's real features (dynamic cropping, format negotiation, responsive delivery).

**Why it happens:**
The default behavior of Next.js `<Image>` is to proxy and optimize any remote URL. Developers add Cloudinary for hosting but don't reconfigure how Next.js handles those URLs, so both systems transform independently.

**How to avoid:**
Use `next-cloudinary`'s `<CldImage>` component instead of `<Image>` for all Cloudinary-hosted images. CldImage bypasses Next.js optimization entirely and delegates to Cloudinary, which applies `f_auto` (best format per browser) and `q_auto` (intelligent compression) automatically. Configure `next.config.js` with Cloudinary `remotePatterns` so Next.js allows the domain but the loader points to Cloudinary's transformation pipeline.

```js
// next.config.js — correct approach
images: {
  loader: 'cloudinary',
  path: 'https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/',
}
```

Or use `next-cloudinary` package with `<CldImage>` and skip the loader config entirely.

**Warning signs:**
- Lighthouse shows large image file sizes even after "adding Cloudinary"
- Images have the URL shape `/_next/image?url=https%3A%2F%2Fres.cloudinary.com...`
- Network tab shows images downloading at 2-5x expected file size
- Cloudinary dashboard shows low transformation counts despite page views

**Phase to address:**
Foundation phase (project setup). Configure correctly before adding a single real image. Fix later requires touching every image across the site.

---

### Pitfall 2: Missing `width`/`height` on Images Causing Cumulative Layout Shift (CLS)

**What goes wrong:**
Gallery pages visually shift as images load. Content jumps down when images pop in. Google Core Web Vitals score tanks (CLS above 0.1 fails the Good threshold). This is especially bad on photography sites because large images reserve no space before loading, causing the entire page to reflow mid-scroll.

**Why it happens:**
The Next.js `<Image>` component requires either `width`/`height` props or `fill` mode. Developers use `fill` without understanding it requires a positioned parent container, or omit dimensions entirely when image dimensions are not known at build time (e.g., when pulling from Cloudinary dynamically).

**How to avoid:**
- For known images: always provide `width` and `height` matching the intended display size (not the original file dimensions).
- For dynamic/CMS images: use Cloudinary's metadata API to fetch dimensions at build/request time, or use `fill` with an explicit aspect ratio wrapper:

```jsx
// Correct fill usage — parent must have defined dimensions
<div className="relative aspect-[3/2] w-full">
  <Image src={url} fill alt={alt} className="object-cover" />
</div>
```

- Use `placeholder="blur"` with a `blurDataURL` (Cloudinary can generate these) to show a soft preview while loading.

**Warning signs:**
- Page content visibly jumps as images load
- Lighthouse CLS score above 0.1
- Gallery grid collapses to zero height before images load
- Console warning: "Image with src X has neither width, height, nor fill"

**Phase to address:**
Gallery/portfolio phase. Every image component must get this right. Include CLS check in phase acceptance criteria.

---

### Pitfall 3: Unoptimized Hero Images Destroying First Contentful Paint

**What goes wrong:**
The hero image is the largest element on the page and the first thing a visitor sees. If it is not `priority` loaded and properly sized, it dominates the Largest Contentful Paint (LCP) metric. A single 3MB hero image can push FCP past 3 seconds on mobile, which is the threshold where most visitors leave. The target is under 1.5s FCP.

**Why it happens:**
Developers add `priority` to images as an afterthought (or never). The browser lazy-loads the hero along with everything else, even though it is the most important element on the page.

**How to avoid:**
- Add `priority` prop to the above-the-fold hero image on every page. This tells Next.js to preload it with `<link rel="preload">`.
- Limit `priority` to only 1-2 images per page (the ones visible on initial load). Overusing it defeats the purpose.
- Use Cloudinary's responsive transformations to serve the hero at appropriate sizes: ~1400px for desktop, ~800px for mobile.
- Set quality at 80-85 for Cloudinary delivery (visually indistinguishable from 100 for photography, 30-40% smaller file).

**Warning signs:**
- Lighthouse LCP above 2.5 seconds
- Network tab shows hero image loading late (after other resources)
- Mobile Lighthouse score 60-70 while desktop is 90+
- No `<link rel="preload">` tag in page source for the hero image

**Phase to address:**
Homepage build phase. Verify with Lighthouse mobile run before marking complete.

---

### Pitfall 4: Custom Font FOUT and Layout Shift From Self-Hosted Fonts

**What goes wrong:**
This site uses two self-hosted premium fonts (Apparel and Destiny) alongside Google Fonts. If loaded incorrectly, visitors see a flash of fallback font (FOUT), then the correct font loads and text reflows, shifting all surrounding elements. On a serif-heavy editorial layout, this is visually jarring and contributes to CLS.

**Why it happens:**
Common mistakes: loading fonts via `@import` in CSS (discovered too late, extra network trip), not using `next/font` for custom fonts, missing `font-display: swap`, or importing the same font in multiple components creating duplicate instances.

**How to avoid:**
- Use `next/font/google` for Libre Baskerville, Montserrat, and Arapey. These are automatically self-hosted at build time by Next.js, eliminating the Google Fonts network request.
- For Apparel and Destiny (self-hosted from `/public/fonts/`), use `next/font/local` with the font file paths. This applies Next.js's automatic fallback calculation, which size-adjusts the system fallback to match Apparel's metrics before the custom font loads.
- Define all fonts in a single shared file (`/lib/fonts.ts`) and import from there. Never import font configs in multiple components.
- Apply fonts via CSS variables on `<html>` or `<body>` so they are available globally without prop threading.

```ts
// lib/fonts.ts
import { localFont } from 'next/font/local'
export const apparel = localFont({
  src: '../public/fonts/Apparel-Regular.woff2',
  variable: '--font-apparel',
  display: 'swap',
})
```

**Warning signs:**
- Text visibly snaps/shifts on page load
- Lighthouse CLS attributed to font swap
- Network tab shows requests to `fonts.googleapis.com` (should be none)
- Duplicate font definitions in multiple component files
- `@import` rule for fonts in a CSS file

**Phase to address:**
Foundation phase (project setup). Font configuration done once and done correctly. Apparel and Destiny can be placeholders initially, but the infrastructure must be right from day one.

---

### Pitfall 5: Mobile Gallery Experience That Works But Feels Wrong

**What goes wrong:**
The gallery grid loads correctly on mobile but touch interactions are broken or frustrating. The lightbox has no swipe support. Images require double-tapping to open. Tap targets are too small. The grid spacing that looks elegant on desktop feels cramped on a 375px screen. The site passes "mobile responsive" checks but feels amateur to mobile users, who are the majority of potential photography clients.

**Why it happens:**
Mobile is tested by resizing a browser window, not by actual touch device testing. Hover states for image captions are implemented without touch fallbacks. The lightbox library chosen lacks mobile gesture support. Grid gutters calculated in `px` rather than responsive units.

**How to avoid:**
- Choose a lightbox library with built-in swipe and pinch-to-zoom (e.g., `yet-another-react-lightbox` which has active maintenance, gesture support, and keyboard navigation).
- Never rely on hover states for revealing critical UI on gallery images. Use tap/click to show captions, or always-visible captions.
- Test on a real iPhone in Safari, not just browser DevTools. Safari on iOS has known quirks with fixed positioning and 100vh.
- Design the mobile grid first: 1 column on phone, 2 columns on tablet, 3 on desktop. Not the reverse.
- Minimum tap target size: 44x44px (Apple HIG standard).

**Warning signs:**
- Gallery images have hover-only caption reveal
- Lightbox has no visible close button on mobile (only keyboard Escape)
- Grid gutters are fixed `px` values that crush on 320px screens
- The `100vh` hero causes scroll issues on iOS (address bar shows/hides)

**Phase to address:**
Gallery phase. Do not call gallery work complete without testing on an actual iOS device in Safari.

---

### Pitfall 6: `remotePatterns` Configuration Error Causing Silent Image Failures

**What goes wrong:**
Images load fine in development on localhost but fail silently in production on Vercel, showing blank spaces with no console errors. This happens because `images.remotePatterns` in `next.config.js` is misconfigured: wrong hostname format, missing protocol, or wildcard subdomain format that Next.js does not support.

**Why it happens:**
The deprecated `images.domains` array was more forgiving. `remotePatterns` is strict and requires exact matches. Common mistakes: using `*.cloudinary.com` (wildcards are not supported in hostname), omitting the `protocol` field, or using the old `domains` array alongside `remotePatterns` which creates conflicts.

**How to avoid:**

```js
// next.config.js — correct Cloudinary remotePatterns
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'res.cloudinary.com',
      pathname: '/YOUR_CLOUD_NAME/**',
    },
  ],
}
```

Use only `remotePatterns`. Never mix with the old `domains` array. Test with a production build (`next build && next start`) before deploying.

**Warning signs:**
- Images work on `localhost:3000` but show as broken on Vercel preview URLs
- No network error logged, image simply does not render
- The URL shape is correct but the image is blank
- `images.domains` is present in config alongside `remotePatterns`

**Phase to address:**
Foundation phase (project setup). Verify with a production build before adding real images.

---

## Technical Debt Patterns

| Shortcut | Immediate Benefit | Long-term Cost | When Acceptable |
|----------|-------------------|----------------|-----------------|
| Using raw `<img>` tags for some images | Simpler syntax, no dimension required | No optimization, no lazy load, CLS, fails accessibility audit | Never — use Next.js `<Image>` always |
| Hardcoding image URLs directly in components | Fast to write | Cannot update image without code deploy | Never for real content |
| Skipping `alt` text ("will add later") | Saves time in development | Accessibility failure, SEO penalty, Lighthouse 0 on accessibility | Never — write descriptive alt on every image |
| Using `quality={100}` on all images | Preserves maximum quality | 3-5x larger files than quality={80}, ruins performance | Never — quality 80-85 is visually identical for photography |
| Loading all gallery images eagerly | Simpler code | First paint blocked by downloading 20+ images | Never — use lazy loading with `loading="lazy"` for below-fold images |
| Inline styles instead of Tailwind classes | Quick one-off fixes | Inconsistent with design system, harder to maintain for non-developer | Only in absolute emergencies, document why |
| Google Fonts link tag instead of `next/font` | Familiar, works | Extra DNS lookup, FOUT, no automatic fallback sizing | Never — next/font is strictly better |
| Contact form with no spam protection | Simplest implementation | Inbox floods with spam within weeks of Google indexing the page | Never — add honeypot field at minimum |

---

## Integration Gotchas

| Integration | Common Mistake | Correct Approach |
|-------------|----------------|------------------|
| Cloudinary + Next.js Image | Using `<Image src={cloudinaryUrl}>` without a loader | Use `<CldImage>` from `next-cloudinary` package, or configure a Cloudinary loader in `next.config.js` |
| Cloudinary URL versioning | Including `/v1234567890/` in the path when using loader mode | Cloudinary loader expects relative paths without the version segment |
| next/font + self-hosted premium fonts | Placing font files in `/public/fonts/` but referencing them with wrong relative paths from `next/font/local` | Paths in `localFont` are relative to the file defining the font, not from `/public/` |
| Vercel deployment + `next.config.js` changes | Editing remotePatterns locally but forgetting Vercel caches the old config | Redeploy after any `next.config.js` change; config changes are not hot-reloaded |
| Contact form + email delivery | Using `nodemailer` with Gmail and a plain password | Gmail requires App Passwords or OAuth. Use Resend, SendGrid, or similar transactional email service with API keys stored in Vercel environment variables |
| Open Graph images | Setting `og:image` to a relative path (`/images/og.jpg`) | Must be an absolute URL (`https://jennieslade.com/images/og.jpg`) — social crawlers cannot resolve relative paths |

---

## Performance Traps

| Trap | Symptoms | Prevention | When It Breaks |
|------|----------|------------|----------------|
| No `priority` on hero image | High LCP score, slow perceived load on mobile | Add `priority` prop to exactly one above-fold image per page | Every page load on mobile |
| Gallery page loads all images eagerly | 5-10 second load times for gallery pages | Use `loading="lazy"` on all images below the fold (Next.js Image default is lazy — do not override it) | Pages with 20+ images |
| Blur placeholder without `blurDataURL` | Placeholder="blur" with remote images throws a build error | Generate `blurDataURL` from Cloudinary using `e_blur:200,w_20,q_auto` transformation | Build time, not runtime |
| Scroll animations on every element | Page feels sluggish during scroll, especially on mobile | Limit scroll animations to image fade-ins only. No transforms. Use `will-change: opacity` not `will-change: transform` | Low-end mobile devices |
| Unthrottled Cloudinary transformations in development | Development works fine; Cloudinary free tier exhausted in days | Use `.env.local` to control image quality in development; use placeholder images in dev where possible | Free tier: 25 transformations/month |
| Missing `sizes` prop on responsive images | Browser always downloads the largest srcset candidate | Provide `sizes` matching the layout: `sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"` | All viewport sizes |

---

## Security Mistakes

| Mistake | Risk | Prevention |
|---------|------|------------|
| Contact form with no spam protection | Spam bots flood inbox within weeks of launch, bury real inquiries | Add a honeypot hidden field; consider Resend's rate limiting or Cloudflare Turnstile (invisible CAPTCHA) |
| Cloudinary API key/secret in client-side code | Anyone can upload to your Cloudinary account, exhausting quota and storage | API keys go in Vercel environment variables only, accessed via server-side API routes, never in browser code |
| No rate limiting on contact form endpoint | Automated abuse can send thousands of emails per hour | Add rate limiting in Next.js Route Handler (e.g., `upstash/ratelimit`) or use a form service that handles this |
| Open Graph `og:image` pointing to a raw unoptimized file | Not a security issue, but a bandwidth and appearance issue | Use a Cloudinary-optimized URL for og:image with explicit dimensions (1200x630 minimum per spec) |

---

## UX Pitfalls

| Pitfall | User Impact | Better Approach |
|---------|-------------|-----------------|
| Gallery images only reveal captions on hover | Mobile users never see image context | Always-visible minimal captions below image, or click/tap to reveal |
| Lightbox with no keyboard navigation | Accessibility failure; frustrates keyboard users | Use a lightbox that supports arrow key navigation and Escape to close out of the box |
| No visible loading state in gallery | User thinks page is broken during image load | Use placeholder="blur" or a warm-gray skeleton that matches the site's color palette |
| Contact form success state not obvious | User submits and wonders if it worked, submits again | Show a clear inline success message (not an alert box) after submission; disable submit button during send |
| Navigation disappears behind lightbox | User trapped in lightbox with no escape on mobile | Ensure lightbox close button is always visible; support swipe-down to close on mobile |
| Font size too small for body text on mobile | Older clients (the actual target demographic) cannot read | Minimum 16px body text on mobile. Never reduce below this for readability |
| Copyright watermark covering faces or key moments | Photos look defensive, not confident | If watermarks are needed, place in corner only. Better: none — the images are the portfolio, not products for sale |

---

## "Looks Done But Isn't" Checklist

- [ ] **Hero images:** Does each page have exactly one image with `priority` prop? Verify with Lighthouse — LCP element should be preloaded.
- [ ] **Gallery CLS:** Does grid layout hold its structure before images load? Inspect with Chrome DevTools Layout Shift regions.
- [ ] **Mobile lightbox:** Does the lightbox work correctly on an actual iPhone in Safari? Swipe between images, pinch to zoom, close with tap.
- [ ] **Font loading:** Is `fonts.googleapis.com` absent from the Network tab? Verify `next/font` is handling all Google fonts.
- [ ] **Apparel/Destiny fonts:** Do they load correctly in Vercel production (not just localhost)? Font file paths fail silently on deploy if wrong.
- [ ] **Contact form:** Test from a real mobile device. Does the keyboard cover the form? Does submit work? Does the success message appear?
- [ ] **Open Graph:** Paste the live URL into the Facebook Sharing Debugger and LinkedIn Post Inspector. Verify the correct image and title appear.
- [ ] **Structured data:** Run the Google Rich Results Test on the homepage. LocalBusiness schema should validate with no errors.
- [ ] **Alt text:** Run Lighthouse accessibility audit. Score of 100 requires alt text on every image, including decorative ones (`alt=""`).
- [ ] **Color profile:** Are exported photos in sRGB? CMYK or wide-gamut images render with blown-out colors in browsers.
- [ ] **remotePatterns:** Does the site work after a cold Vercel deploy? Image failures sometimes appear only after cache clears.
- [ ] **Spam protection:** Submit the contact form from an incognito window using only bot-like timing. Does the honeypot catch it?

---

## Recovery Strategies

| Pitfall | Recovery Cost | Recovery Steps |
|---------|---------------|----------------|
| Double optimization discovered after launch | LOW | Switch from `<Image>` to `<CldImage>` across all image usages; update next.config.js loader; redeploy |
| CLS issues on gallery pages | MEDIUM | Audit every `<Image>` usage for missing dimensions; add aspect-ratio wrappers; retest with Lighthouse |
| Wrong fonts loading in production | MEDIUM | Check woff2 file paths, recheck `next/font/local` src references, verify font files committed to repo |
| Contact form spammed before protection added | LOW | Add honeypot field; consider switching to Resend + rate limiting; clear spam from inbox |
| Hero LCP score poor after launch | LOW | Add `priority` prop to hero image on each page; verify `sizes` prop; redeploy and re-run Lighthouse |
| remotePatterns blocking production images | LOW | Fix config, commit, redeploy — images appear immediately after successful deploy |

---

## Pitfall-to-Phase Mapping

| Pitfall | Prevention Phase | Verification |
|---------|------------------|--------------|
| Double Cloudinary/Next.js optimization | Foundation (project setup) | Check Network tab: no `/_next/image?url=https%3A%2F%2Fres.cloudinary.com` URLs |
| CLS from missing image dimensions | Gallery phase | Lighthouse CLS below 0.1 on all gallery pages |
| Hero LCP / unoptimized hero | Homepage phase | Lighthouse LCP below 2.5s on mobile; hero image has `priority` prop |
| Font FOUT / layout shift | Foundation (project setup) | No `fonts.googleapis.com` in Network tab; no visible font swap on slow connection (throttle to 3G) |
| Mobile gallery UX broken | Gallery phase | Manual test on real iPhone in Safari — swipe, zoom, close |
| remotePatterns misconfiguration | Foundation (project setup) | Run `next build && next start` locally; verify all images load |
| Contact form spam | Contact page phase | Honeypot field present; rate limiting configured; test from incognito |
| Missing alt text | Every phase (ongoing) | Lighthouse accessibility score 100 before each phase is marked complete |
| Open Graph issues | SEO phase | Facebook Sharing Debugger shows correct image and title |
| Structured data errors | SEO phase | Google Rich Results Test passes with no warnings |

---

## Sources

- [Next.js Image Component Official Docs](https://nextjs.org/docs/app/api-reference/components/image) — authoritative reference for `priority`, `sizes`, `fill`, `remotePatterns`
- [Next.js Image Optimization Errors (2026)](https://oneuptime.com/blog/post/2026-01-24-nextjs-image-optimization-errors/view) — recent production error patterns
- [Fonts in Next.js (2026): Patterns and Pitfalls](https://thelinuxcode.com/fonts-in-nextjs-2026-nextfont-patterns-performance-and-production-pitfalls/) — self-hosted font gotchas
- [Next Cloudinary Image Optimization Guide](https://next.cloudinary.dev/guides/image-optimization) — CldImage vs. next/image, avoiding double optimization
- [Next.js Image Optimization: CDN vs Vercel vs Cloudinary (2025)](https://www.hashbuilds.com/articles/next-js-image-optimization-cdn-vs-vercel-vs-cloudinary-2025) — cost and performance comparison
- [Next.js Core Web Vitals (2025)](https://makersden.io/blog/optimize-web-vitals-in-nextjs-2025) — CLS and LCP fixes for App Router
- [60+ Photography Website Mistakes](https://www.foregroundweb.com/photography-website-mistakes/) — domain-specific design and UX pitfalls
- [Gallery Layout Best Practices for Photography Websites (2025)](https://onewebcare.com/blog/gallery-layout-best-practices/) — mobile gallery UX
- [Technical SEO for Photographers: 7 Common Mistakes](https://www.shutterseo.com/blog/technical-seo-for-photographers/) — photography-specific SEO pitfalls
- [Building Secure Contact Forms in Next.js](https://arnab-k.medium.com/building-secure-and-resilient-contact-forms-in-next-js-450cbb437e68) — spam protection patterns

---
*Pitfalls research for: editorial portrait photography website (Next.js + Cloudinary + Vercel)*
*Researched: 2026-03-29*
