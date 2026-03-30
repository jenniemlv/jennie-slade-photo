'use client'

/**
 * PageTransition — wraps page content with a subtle CSS fade-in on every route change.
 *
 * How it works:
 *   The `key={pathname}` prop forces React to unmount and remount this component
 *   whenever the URL pathname changes. On remount, the .animate-fade-in CSS class
 *   triggers a fresh @keyframes fade-in animation (200ms ease-in-out), creating
 *   a soft crossfade feel as new pages appear.
 *
 * IMPORTANT: This component wraps only the <main> content in layout.tsx.
 * Header and Footer must remain OUTSIDE this wrapper so they persist visually
 * across route changes and do not flicker. See Plan 03 for wiring into layout.tsx.
 *
 * Usage (in layout.tsx):
 *   <Header />
 *   <PageTransition>
 *     <main id="main-content">{children}</main>
 *   </PageTransition>
 *   <Footer />
 */

import { usePathname } from 'next/navigation'

interface PageTransitionProps {
  children: React.ReactNode
}

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname()

  return (
    <div key={pathname} className="animate-fade-in">
      {children}
    </div>
  )
}
