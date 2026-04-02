// Homepage — editorial magazine-spread layout (Phase 3)
//
// Composes all three homepage sections in order:
//   1. HeroSection     — full-viewport warm-gray hero with tagline (no scroll animation)
//   2. WelcomeSection  — personal intro copy, wraps in ScrollFade
//   3. PortfolioPreview — three-tile gallery gateway, wraps in ScrollFade
//
// The hero is NOT wrapped in ScrollFade — it should be immediately visible.
// Everything below the fold fades in as the user scrolls (D-15, D-16).
//
// This is a Server Component (no 'use client'). ScrollFade is a Client Component
// but can be used as a child of a Server Component without issue.

import type { Metadata } from 'next'
import HeroSection from '@/components/homepage/HeroSection'
import WelcomeSection from '@/components/homepage/WelcomeSection'
import PortfolioPreview from '@/components/homepage/PortfolioPreview'
import ScrollFade from '@/components/ui/ScrollFade'

// SEO metadata — optimized for Las Vegas market (Phase 7, D-01 through D-07)
export const metadata: Metadata = {
  title: 'Las Vegas Portrait Photographer | Jennie Slade',
  description: 'Families, weddings, seniors, and headshots photographed with warmth and heart. Over 20 years capturing Las Vegas memories.',
  openGraph: {
    title: 'Las Vegas Portrait Photographer | Jennie Slade',
    description: 'Families, weddings, seniors, and headshots photographed with warmth and heart. Over 20 years capturing Las Vegas memories.',
  },
}

export default function Home() {
  return (
    <main>
      {/* Hero — full-bleed, immediately visible, no scroll animation */}
      <HeroSection />

      {/* Welcome — editorial intro, fades in on scroll */}
      <ScrollFade>
        <WelcomeSection />
      </ScrollFade>

      {/* Portfolio preview — three gallery tiles, fades in on scroll */}
      <ScrollFade>
        <PortfolioPreview />
      </ScrollFade>
    </main>
  )
}
