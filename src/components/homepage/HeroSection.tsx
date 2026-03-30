/**
 * HeroSection — full-viewport cinematic hero for the homepage.
 *
 * This is a Server Component (no 'use client') for maximum performance.
 * The hero does NOT use <Section> because it is full-bleed with no max-width constraint.
 *
 * Current state: Warm-gray placeholder background with centered tagline overlay.
 * The bg-warm-gray placeholder will be replaced with a real Cloudinary image
 * when photography assets are ready.
 *
 * To swap in a real photo:
 *   Replace the inner placeholder <div className="absolute inset-0 bg-warm-gray" /> with:
 *
 *   <CloudinaryImage
 *     src="your-cloudinary-public-id"
 *     alt="Las Vegas portrait photographer Jennie Slade"
 *     fill
 *     priority
 *     className="object-cover"
 *   />
 *
 *   IMPORTANT: The `priority` prop is REQUIRED for LCP performance (D-04).
 *   Without it, the hero image will be lazy-loaded and tank your Lighthouse score.
 *
 * Layout:
 *   - Mobile: 60vh (enough presence without overwhelming small screens)
 *   - Desktop (md+): 80vh (near-fullscreen cinematic feel, D-06)
 *   - bg-black/20 overlay improves tagline contrast against any photo background
 */

export default function HeroSection() {
  return (
    <div className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden">

      {/* Placeholder — warm-gray background until real photo is ready (D-03) */}
      {/* Replace this div with CloudinaryImage when real photo is ready:
          <CloudinaryImage src="hero-public-id" alt="Las Vegas portrait photographer" fill priority className="object-cover" />
          The priority prop is REQUIRED for LCP (D-04). */}
      <div className="absolute inset-0 bg-warm-gray" />

      {/* Semi-transparent overlay for text legibility against any background */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Tagline overlay — centered, never wraps awkwardly on mobile */}
      <div className="absolute inset-0 flex items-center justify-center px-6">
        <h1
          className="type-title text-white text-center max-w-2xl text-[22px] md:text-[30px] lg:text-[38px] leading-relaxed"
        >
          Real moments. Real joy. Remembered forever.
        </h1>
      </div>

    </div>
  )
}
