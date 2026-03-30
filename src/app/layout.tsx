import type { Metadata } from 'next'
import { libreBaskerville, montserrat, arapey, apparel, destiny } from '@/lib/fonts'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import PageTransition from '@/components/ui/PageTransition'
import './globals.css'

export const metadata: Metadata = {
  title: 'Jennie Slade Photography',
  description:
    'Las Vegas portrait photographer specializing in families, weddings, and senior portraits. Over 20 years of capturing memories.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={[
        libreBaskerville.variable,
        montserrat.variable,
        arapey.variable,
        apparel.variable,
        destiny.variable,
      ].join(' ')}
    >
      <body>
        {/*
          Skip-to-content link — first element in body for keyboard and screen reader users.
          Hidden by default (sr-only), visible when focused so keyboard users can jump past nav.
          Targets #main-content on the <main> element below.
        */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-white focus:px-4 focus:py-2 focus:type-body"
        >
          Skip to main content
        </a>

        {/*
          Layout shell structure:
          - Header: persists across routes, outside PageTransition so it never fades
          - PageTransition: wraps ONLY <main>, triggers CSS fade-in on route change
          - Footer: persists across routes, outside PageTransition so it never fades
        */}
        <Header />
        <PageTransition>
          <main id="main-content">{children}</main>
        </PageTransition>
        <Footer />
      </body>
    </html>
  )
}
