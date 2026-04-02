import type { Metadata } from 'next'
import { cormorant, lora, montserrat, arapey, apparel, destiny } from '@/lib/fonts'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import PageTransition from '@/components/ui/PageTransition'
import './globals.css'

export const metadata: Metadata = {
  // metadataBase lets all pages use relative OG image paths (e.g., '/images/og-default.png')
  metadataBase: new URL('https://jennieslade.com'),
  title: {
    // Child pages fully replace the title with their own optimized version
    default: 'Las Vegas Portrait Photographer | Jennie Slade',
    template: '%s',
  },
  description:
    'Families, weddings, seniors, and headshots photographed with warmth and heart. Over 20 years capturing Las Vegas memories.',
  openGraph: {
    type: 'website',
    siteName: 'Jennie Slade Photography',
    locale: 'en_US',
    images: [
      {
        url: '/images/og-default.png',
        width: 1200,
        height: 630,
        alt: 'Jennie Slade Photography — Las Vegas Portrait Photographer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
  },
  // Generates canonical URLs automatically for every page relative to metadataBase
  alternates: {
    canonical: './',
  },
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
        cormorant.variable,
        lora.variable,
        montserrat.variable,
        arapey.variable,
        apparel.variable,
        destiny.variable,
      ].join(' ')}
    >
      <body>
        {/*
          LocalBusiness + Photographer JSON-LD structured data.
          Placed before all visible content so Google crawlers see it immediately.
          Covers all 5 service offerings and Las Vegas service area for local SEO.
        */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': ['LocalBusiness', 'Photographer'],
              name: 'Jennie Slade Photography',
              url: 'https://jennieslade.com',
              email: 'jennie@jennieslade.com',
              description:
                'Las Vegas portrait photographer specializing in families, weddings, seniors, and headshots. Over 20 years of experience.',
              image: 'https://jennieslade.com/images/og-default.png',
              priceRange: '$$',
              areaServed: {
                '@type': 'City',
                name: 'Las Vegas',
                containedInPlace: {
                  '@type': 'State',
                  name: 'Nevada',
                },
              },
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Las Vegas',
                addressRegion: 'NV',
                addressCountry: 'US',
              },
              sameAs: ['https://instagram.com/jenniesladephoto'],
              hasOfferCatalog: {
                '@type': 'OfferCatalog',
                name: 'Photography Services',
                itemListElement: [
                  { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Wedding Photography' } },
                  { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Family Photography' } },
                  { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Senior Portraits' } },
                  { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Headshots' } },
                  { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Corporate Photography' } },
                ],
              },
            }),
          }}
        />

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
