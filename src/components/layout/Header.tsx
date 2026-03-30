'use client'

// Header.tsx
// Scroll-aware site header with transparent-to-solid transition, show/hide on scroll direction,
// and a full-screen mobile menu overlay.
//
// Behaviors:
//   - Transparent over hero images; transitions to solid bg-off-white after 80px scroll
//   - Hides when scrolling down (delta > 10px) past the 80px threshold
//   - Reappears immediately when scrolling up (delta > -5px)
//   - Mobile hamburger opens a full-screen white overlay with stacked nav links
//   - Body scroll is locked while the mobile menu is open

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

// Instagram brand icon — lucide-react dropped social brand icons in recent versions.
// Using an inline SVG path sourced from the official Instagram brand assets.
function InstagramIcon({ size = 24, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  )
}

// Exactly 4 nav links per design spec (D-02). No "Home" link — JENNIE SLADE name navigates to /.
const NAV_LINKS = [
  { href: '/about', label: 'About' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/contact', label: 'Contact' },
  { href: '/blog', label: 'Blog' },
] as const

export default function Header() {
  const pathname = usePathname()

  // scrolled: true when page scrolled past 80px — switches header from transparent to solid
  const [scrolled, setScrolled] = useState(false)
  // hidden: true when user scrolls down past threshold — slides header off-screen
  const [hidden, setHidden] = useState(false)
  // menuOpen: controls the full-screen mobile overlay
  const [menuOpen, setMenuOpen] = useState(false)

  // Scroll listener — tracks direction to show/hide header
  useEffect(() => {
    let lastScrollY = window.scrollY

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const delta = currentScrollY - lastScrollY

      // Toggle solid background at 80px threshold (per UI-SPEC)
      setScrolled(currentScrollY > 80)

      // Only hide/show header once user has scrolled past the hero zone
      if (currentScrollY > 80) {
        if (delta > 10) {
          // Scrolling down fast enough — hide header
          setHidden(true)
        } else if (delta < -5) {
          // Scrolling up — bring header back
          setHidden(false)
        }
      } else {
        // At the top of the page — always show header
        setHidden(false)
      }

      lastScrollY = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Body scroll lock — prevent background scrolling while mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  // Close mobile menu on route change (handles "close on nav link click" naturally)
  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  // Computed header classes — build as array then join for Tailwind scanner compatibility
  const headerClasses = [
    'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
    scrolled ? 'bg-off-white' : 'bg-transparent',
    hidden ? '-translate-y-full' : 'translate-y-0',
  ].join(' ')

  return (
    <>
      {/* ── Main header ── */}
      <header className={headerClasses}>
        {/* Gradient overlay — softens the hero image at the top when header is transparent.
            Only rendered when scrolled is false so it doesn't show over solid backgrounds. */}
        {!scrolled && (
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0.7) 0%, transparent 100%)' }}
          />
        )}

        {/* Nav content wrapper */}
        <div className="relative z-10 max-w-[1200px] mx-auto py-6 px-6 md:px-8">

          {/* Site name — centered, links to home (D-02) */}
          <Link href="/" className="type-title block text-center">
            JENNIE SLADE
          </Link>

          {/* Desktop navigation — hidden on mobile, centered row on md+ */}
          <nav aria-label="Main navigation" className="hidden md:flex justify-center items-center gap-8 mt-3">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={[
                  'type-heading transition-opacity duration-150',
                  pathname === link.href ? 'opacity-100' : 'opacity-60 hover:opacity-100',
                ].join(' ')}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Hamburger button — visible on mobile only (md:hidden) */}
          <button
            onClick={() => setMenuOpen(true)}
            className="md:hidden absolute right-6 top-1/2 -translate-y-1/2 p-2"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <Menu size={24} className="text-charcoal" />
          </button>
        </div>
      </header>

      {/* ── Mobile menu overlay ──
          Uses opacity + visibility for smooth CSS transitions (not display:none).
          z-[60] sits above the header's z-50. */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={[
          'fixed inset-0 z-[60] bg-white flex flex-col items-center',
          'transition-all duration-300',
          menuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none',
        ].join(' ')}
      >
        {/* Close (X) button */}
        <button
          onClick={() => setMenuOpen(false)}
          aria-label="Close menu"
          className="absolute top-6 right-6 p-2"
        >
          <X size={24} className="text-charcoal" />
        </button>

        {/* Site name at top of overlay */}
        <Link href="/" className="type-title mt-16" onClick={() => setMenuOpen(false)}>
          JENNIE SLADE
        </Link>

        {/* Stacked nav links — 48px gap per design spec */}
        <nav
          aria-label="Mobile navigation"
          className="flex flex-col items-center justify-center flex-1 gap-[48px]"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={[
                'type-heading text-lg transition-opacity duration-150',
                pathname === link.href ? 'opacity-100' : 'opacity-60 hover:opacity-100',
              ].join(' ')}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Instagram icon — bottom of overlay, hover teal-sage accent */}
        <Link
          href="https://instagram.com/jenniesladephoto"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Jennie Slade Photography on Instagram"
          className="mb-12 text-charcoal hover:text-teal-sage transition-colors duration-150"
        >
          <InstagramIcon size={24} />
        </Link>
      </div>
    </>
  )
}
