// Footer — Server Component (no 'use client' — footer has no interactivity)
// Displays site branding, email link, Instagram icon, nav links, and copyright.
// Sits below PageTransition in the root layout, outside the animated wrapper.
import Link from 'next/link'

// Inline SVG Instagram icon — lucide-react dropped social brand icons in v0.400+
// Matches the standard Instagram camera-rounded-square shape.
function InstagramIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* Rounded square body */}
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      {/* Lens circle */}
      <circle cx="12" cy="12" r="4" />
      {/* Flash dot */}
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  )
}

export default function Footer() {
  return (
    <footer className="bg-off-white">
      {/* Warm-gray divider line at the very top of the footer (D-15) */}
      <div className="border-t border-warm-gray">
        {/* Footer content — centered, generous padding: pt-20 (80px) and pb-12 (48px) (D-16) */}
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 pt-20 pb-12 text-center">

          {/* Site name in display font — Libre Baskerville, uppercase (D-11) */}
          <p className="type-title">Jennie Slade Photography</p>

          {/* Email as mailto link (D-12) */}
          <a
            href="mailto:jennie@jennieslade.com"
            className="type-body text-gray hover:text-charcoal transition-colors duration-150 mt-4 inline-block"
          >
            jennie@jennieslade.com
          </a>

          {/* Instagram icon link — icon only, no text label (D-13) */}
          <div className="mt-4">
            <Link
              href="https://instagram.com/jenniesladephoto"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Jennie Slade Photography on Instagram"
              className="inline-block text-charcoal hover:text-teal-sage transition-colors duration-150"
            >
              <InstagramIcon size={20} />
            </Link>
          </div>

          {/* Nav links — horizontal, repeated from header (D-14) */}
          <nav
            aria-label="Footer navigation"
            className="flex justify-center items-center gap-6 mt-8"
          >
            <Link
              href="/about"
              className="type-heading opacity-60 hover:opacity-100 transition-opacity duration-150"
            >
              About
            </Link>
            <Link
              href="/portfolio"
              className="type-heading opacity-60 hover:opacity-100 transition-opacity duration-150"
            >
              Portfolio
            </Link>
            <Link
              href="/contact"
              className="type-heading opacity-60 hover:opacity-100 transition-opacity duration-150"
            >
              Contact
            </Link>
            <Link
              href="/blog"
              className="type-heading opacity-60 hover:opacity-100 transition-opacity duration-150"
            >
              Blog
            </Link>
          </nav>

          {/* Copyright year — auto-generated so it never goes stale */}
          <p className="type-body text-gray text-sm mt-8">
            &copy; {new Date().getFullYear()} Jennie Slade Photography
          </p>
        </div>
      </div>
    </footer>
  )
}
