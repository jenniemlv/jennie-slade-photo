/**
 * Senior Info Hub — /seniors/info
 *
 * Standalone senior-facing info page. Pricing, locations link, what-to-wear,
 * FAQs, booking CTA. Mirrors /families/info structure.
 *
 * Server Component. Static content only.
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import Section from '@/components/layout/Section'

export const metadata: Metadata = {
  title: 'Senior Session Info | Pricing, Locations, FAQ | Jennie Slade',
  description:
    'Everything you need to plan a Las Vegas senior portrait session: pricing, location ideas, what to wear, FAQs, and how to book.',
  openGraph: {
    title: 'Senior Session Info | Jennie Slade Photography',
    description:
      'Pricing, locations, what to wear, and FAQs for your Las Vegas senior portrait session.',
  },
}

// Cal.com booking URLs — confirm slugs match the actual event types in cal.com/jennie-slade-photo
const CAL_BASE = 'https://cal.com/jennie-slade-photo'

// Pricing set 2026 with Jennie (research synthesis from Las Vegas / Summerlin market).
const PACKAGES = [
  {
    name: 'Mini Senior',
    price: '$550',
    duration: '45 minute session',
    images: '35 edited images',
    extras: ['1 to 2 outfits', 'Summerlin or Red Rock'],
    notes: 'Returning client / sibling pricing',
    featured: false,
    bookingUrl: `${CAL_BASE}/senior-mini`,
  },
  {
    name: 'Signature Senior',
    price: '$850',
    duration: '1.5 hour golden hour session',
    images: '80 edited images',
    extras: [
      'Up to 3 outfits',
      '1 location plus a quick second stop',
      'Yearbook headshot included',
      '$100 print credit',
    ],
    notes: 'Most booked',
    featured: true,
    bookingUrl: `${CAL_BASE}/senior-signature-session`,
  },
  {
    name: 'Editorial Senior',
    price: '$1,450',
    duration: '2.5 hour session',
    images: '120+ edited images',
    extras: [
      'Unlimited outfits',
      '2 locations (Valley of Fire, Red Rock, or private ranch)',
      'Parent or family portraits included',
      '10x10 lay-flat magazine album (Millers)',
      'Yearbook headshot included',
    ],
    notes: null,
    featured: false,
    bookingUrl: `${CAL_BASE}/senior-editorial`,
  },
] as const

const ADD_ONS = [
  { name: 'Additional location', price: '$200' },
  { name: 'Additional outfit', price: '$75' },
  { name: 'Best friend or sibling join', price: '$175 per person' },
  { name: 'Parent or family portraits add-on', price: '$200' },
  { name: 'Album upgrade to 12x12', price: '$300' },
  { name: 'Yearbook ad design', price: '$125' },
] as const

const FAQS = [
  {
    q: 'When should I book my senior session?',
    a: 'Junior year spring through senior year fall is the sweet spot. If your school yearbook deadline is October, I recommend booking by mid-August at the latest. Spring and early fall fill fastest. Reach out 6 to 8 weeks ahead to lock in your date.',
  },
  {
    q: 'What time of day do you shoot?',
    a: 'Almost always golden hour. Sessions start about 90 minutes before sunset for the softest, warmest light. I will confirm the exact time once we lock in your date.',
  },
  {
    q: 'Do you offer hair and makeup?',
    a: 'I do not bundle it into a package, but I have a short list of hair and makeup artists I love and trust in Las Vegas. I will share the list and you book directly with the artist, usually $250 to $350. I will coordinate the timing so they finish right before our call time.',
  },
  {
    q: 'Can my best friend or sibling jump in for a few shots?',
    a: 'Absolutely. It is one of my favorite parts of senior sessions. Add the friend or sibling on as a $175 add-on and we will work them into part of the shoot.',
  },
  {
    q: 'What if I want family portraits at the end?',
    a: 'I include a parent or family portrait set in the Editorial Senior package. For Signature, you can add it on for $200 and we will use the last 20 minutes of your session.',
  },
  {
    q: 'When will I get my photos?',
    a: 'You will receive your full gallery within 2 to 3 weeks of your session. I deliver everything through Pixieset, where you can download, share, and order prints.',
  },
  {
    q: 'Do you provide outfit guidance?',
    a: 'Yes. I built a full What to Wear guide with editor-curated palettes and shoppable picks. It works great for senior sessions, especially if you are bringing 2 or 3 looks.',
  },
  {
    q: 'What about cap and gown photos?',
    a: 'I can add a 30 minute cap and gown mini onto any Signature or Editorial session for $200, or book it as a standalone $350 mini in the spring. Most seniors do these closer to graduation, separate from their main portrait session.',
  },
  {
    q: 'What if the weather is bad?',
    a: 'Las Vegas weather is mostly forgiving, but if conditions are unsafe we will reschedule at no charge. I keep a few rain dates open each season.',
  },
  {
    q: 'Do you travel outside Las Vegas?',
    a: 'Yes. Most local locations are included. Valley of Fire, Dry Lake Bed, and Ghost Town near Searchlight carry a $100 travel fee. Destinations beyond that are quoted individually.',
  },
] as const

export default function SeniorInfoPage() {
  return (
    <main id="main-content" className="pt-32 md:pt-40">
      {/* ── Hero / intro ─────────────────────────────────────────────── */}
      <Section>
        <div className="max-w-2xl mx-auto text-center mb-8">
          <p className="type-subheading text-gray mb-4">Senior Sessions</p>
          <h1 className="type-title mb-6">Everything You Need to Plan Your Session</h1>
          <p className="type-body">
            Senior year is a big deal and your portraits should feel like you,
            not a stiff yearbook photo. Below is everything you might want to
            know before we book, from pricing to location ideas to what to
            wear. If you can&apos;t find what you&apos;re looking for, just
            reach out.
          </p>
        </div>

        <nav aria-label="On-page sections" className="flex flex-wrap justify-center gap-x-8 gap-y-3 mt-8">
          {[
            ['Pricing', '#pricing'],
            ['Add-Ons', '#add-ons'],
            ['Locations', '#locations'],
            ['What to Wear', '#what-to-wear'],
            ['FAQ', '#faq'],
            ['Book', '#book'],
          ].map(([label, href]) => (
            <a key={href} href={href} className="type-heading opacity-60 hover:opacity-100 transition-opacity">
              {label}
            </a>
          ))}
        </nav>
      </Section>

      {/* ── Pricing ──────────────────────────────────────────────────── */}
      <Section id="pricing" variant="muted">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <p className="type-subheading text-gray mb-3">Investment</p>
          <h2 className="type-title mb-6">Senior Packages</h2>
          <p className="type-body">
            Every session includes pre-session planning, location and outfit
            guidance, and a private online gallery for download and sharing.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
          {PACKAGES.map((pkg) => (
            <div
              key={pkg.name}
              className={[
                'p-8 md:p-10 flex flex-col text-center border',
                pkg.featured
                  ? 'bg-white border-teal-sage shadow-sm md:scale-[1.02]'
                  : 'bg-white border-warm-gray',
              ].join(' ')}
            >
              <p className="type-subheading text-gray mb-3">{pkg.name}</p>
              <p className="font-display text-4xl text-charcoal mb-6 tracking-wide">{pkg.price}</p>
              <ul className="type-body space-y-2 mb-6 flex-1">
                <li>{pkg.duration}</li>
                <li>{pkg.images}</li>
                {pkg.extras.map((extra) => (
                  <li key={extra}>{extra}</li>
                ))}
              </ul>
              {pkg.notes && (
                <p className="type-heading text-teal-sage mb-6">{pkg.notes}</p>
              )}
              <a
                href={pkg.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={[
                  'block w-full px-6 py-3 type-heading transition-colors',
                  pkg.featured
                    ? 'bg-charcoal text-off-white hover:bg-teal-sage'
                    : 'border border-charcoal text-charcoal hover:bg-charcoal hover:text-off-white',
                ].join(' ')}
              >
                Book This Package
              </a>
            </div>
          ))}
        </div>

        <p className="type-body text-center text-gray mt-10 max-w-xl mx-auto">
          Want something not listed? Send me a note and I&apos;ll put together
          a custom quote.
        </p>
      </Section>

      {/* ── Add-Ons ──────────────────────────────────────────────────── */}
      <Section id="add-ons">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <p className="type-subheading text-gray mb-3">Make It Yours</p>
          <h2 className="type-title mb-6">A La Carte Add-Ons</h2>
          <p className="type-body">
            Build on any package. Add a friend, an outfit, a second location,
            or a cap and gown mini.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <ul className="divide-y divide-warm-gray">
            {ADD_ONS.map((item) => (
              <li
                key={item.name}
                className="flex justify-between items-baseline gap-6 py-5"
              >
                <span className="type-body">{item.name}</span>
                <span className="type-heading text-charcoal whitespace-nowrap">
                  {item.price}
                </span>
              </li>
            ))}
          </ul>

          <p className="type-body text-gray text-sm text-center mt-8">
            Hair and makeup is not bundled in any package. I have a short list
            of trusted Las Vegas artists I&apos;ll share when you book.
            Typical investment is $250 to $350 paid directly to the artist.
          </p>
        </div>
      </Section>

      {/* ── Locations ────────────────────────────────────────────────── */}
      <Section id="locations" variant="muted">
        <div className="max-w-2xl mx-auto text-center">
          <p className="type-subheading text-gray mb-3">Where We&apos;ll Shoot</p>
          <h2 className="type-title mb-6">Las Vegas Location Guide</h2>
          <p className="type-body mb-8">
            Las Vegas has more variety than people expect. Red rock, alpine
            snow, urban neon, open desert, manicured gardens, private ranch.
            I put together a full visual guide of every location I shoot,
            with photo examples for each one.
          </p>
          <a
            href="https://locations.jennieslade.com/las-vegas-photo-locations.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-charcoal text-off-white px-8 py-4 type-heading hover:bg-teal-sage transition-colors"
          >
            Browse the Location Guide
          </a>
          <p className="type-body text-gray text-sm mt-6">
            Valley of Fire, Dry Lake Bed near Jean, and Ghost Town near Searchlight carry a $100 travel fee.
          </p>
        </div>
      </Section>

      {/* ── What to Wear teaser ──────────────────────────────────────── */}
      <Section id="what-to-wear" variant="warm">
        <div className="max-w-2xl mx-auto text-center">
          <p className="type-subheading text-gray mb-3">Styling</p>
          <h2 className="type-title mb-6">Not Sure What to Wear?</h2>
          <p className="type-body mb-8">
            Two ways to get styled. Browse the full visual guide with palettes
            and outfit inspiration, or take the quick interactive quiz for a
            curated palette and shoppable picks. Perfect if you&apos;re
            bringing 2 or 3 looks.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="https://whattowear.jennieslade.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-charcoal text-off-white px-8 py-4 type-heading hover:bg-teal-sage transition-colors w-full sm:w-auto"
            >
              Open the Style Guide
            </a>
            <Link
              href="/what-to-wear"
              className="inline-block border border-charcoal text-charcoal px-8 py-4 type-heading hover:bg-charcoal hover:text-off-white transition-colors w-full sm:w-auto"
            >
              Try the Quiz
            </Link>
          </div>
        </div>
      </Section>

      {/* ── FAQ ──────────────────────────────────────────────────────── */}
      <Section id="faq">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <p className="type-subheading text-gray mb-3">Good to Know</p>
          <h2 className="type-title mb-6">Frequently Asked</h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-8">
          {FAQS.map((faq) => (
            <details key={faq.q} className="border-b border-warm-gray pb-6 group">
              <summary className="type-subheading cursor-pointer list-none flex justify-between items-center gap-4">
                <span>{faq.q}</span>
                <span
                  aria-hidden="true"
                  className="text-teal-sage text-2xl leading-none transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="type-body mt-4">{faq.a}</p>
            </details>
          ))}
        </div>
      </Section>

      {/* ── Book / Contact CTA ──────────────────────────────────────── */}
      <Section id="book" variant="muted">
        <div className="max-w-2xl mx-auto text-center">
          <p className="type-subheading text-gray mb-3">Next Step</p>
          <h2 className="type-title mb-6">Ready to Book?</h2>
          <p className="type-body mb-10">
            Pick your package above and grab a date in real time. Deposit holds
            your spot. Have a question first? Send me a quick note.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href={CAL_BASE}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-charcoal text-off-white px-8 py-4 type-heading hover:bg-teal-sage transition-colors w-full sm:w-auto"
            >
              See All Booking Options
            </a>
            <a
              href="mailto:jennie@jennieslade.com"
              className="inline-block border border-charcoal text-charcoal px-8 py-4 type-heading hover:bg-charcoal hover:text-off-white transition-colors w-full sm:w-auto"
            >
              Ask a Question
            </a>
          </div>
        </div>
      </Section>
    </main>
  )
}
