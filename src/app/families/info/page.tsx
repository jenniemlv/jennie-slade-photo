/**
 * Family Info Hub — /families/info
 *
 * Standalone family-facing info page. Live at family-info.jennieslade.com.
 * Pricing, locations link, what-to-wear, FAQs, booking CTA.
 *
 * Server Component. Static content only.
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import Section from '@/components/layout/Section'

export const metadata: Metadata = {
  title: 'Family Session Info | Pricing, Locations, FAQ | Jennie Slade',
  description:
    'Everything you need to plan a Las Vegas family session: pricing, location ideas, what to wear, FAQs, and how to book.',
  openGraph: {
    title: 'Family Session Info | Jennie Slade Photography',
    description:
      'Pricing, locations, what to wear, and FAQs for your Las Vegas family session.',
  },
}

// Pricing pulled from JSladeFamilies.pdf (2026 family pricing guide).
const PACKAGES = [
  {
    name: 'Package One',
    price: '$800',
    duration: '1.5 hour session',
    images: '80–100 edited images',
    group: 'Up to 7 people',
    notes: null,
  },
  {
    name: 'Package Two',
    price: '$650',
    duration: '1 hour session',
    images: '60 edited images',
    group: 'Up to 7 people',
    notes: null,
  },
  {
    name: 'Package Three',
    price: '$500',
    duration: '30 minute session',
    images: '30 edited images',
    group: 'Summerlin area only',
    notes: 'Returning clients only',
  },
] as const

const FAQS = [
  {
    q: 'How far in advance should I book?',
    a: 'Spring and fall fill up fast. I recommend booking 6 to 8 weeks ahead, especially for October and November sessions. Summer and winter sessions are usually more flexible.',
  },
  {
    q: 'What time of day do you shoot?',
    a: 'Almost always golden hour. Sessions start about 90 minutes before sunset for the softest, warmest light. I will confirm the exact time once we lock in your date.',
  },
  {
    q: 'How many people are included?',
    a: 'Packages One and Two cover up to 7 people. Larger families (extended, grandparents, multi-generational) are absolutely welcome. Reach out and I will quote based on group size.',
  },
  {
    q: 'When will I get my photos?',
    a: 'You will receive your full gallery within 2 to 3 weeks of your session. I deliver everything through Pixieset, where you can download, share, and order prints.',
  },
  {
    q: 'Do you provide outfit guidance?',
    a: 'Yes. I built a full What to Wear guide with editor-curated palettes and shoppable picks. It works for couples, families, and big groups.',
  },
  {
    q: 'What if the weather is bad?',
    a: 'Las Vegas weather is mostly forgiving, but if conditions are unsafe we will reschedule at no charge. I keep a few rain dates open each season.',
  },
  {
    q: 'Do you travel outside Las Vegas?',
    a: 'Yes. Most local locations are included. A few of the further spots (Dry Lake Bed, Ghost Town near Searchlight) carry a $100 travel fee. Destinations beyond that are quoted individually.',
  },
] as const

export default function FamilyInfoPage() {
  return (
    <main id="main-content" className="pt-32 md:pt-40">
      {/* ── Hero / intro ─────────────────────────────────────────────── */}
      <Section>
        <div className="max-w-2xl mx-auto text-center mb-8">
          <p className="type-subheading text-gray mb-4">Family Sessions</p>
          <h1 className="type-title mb-6">Everything You Need to Plan Your Session</h1>
          <p className="type-body">
            I&apos;ve been photographing Las Vegas families for over twenty years. Below
            is everything you might want to know before we book, from pricing to
            location ideas to what to wear. If you can&apos;t find what you&apos;re looking
            for, just reach out.
          </p>
        </div>

        <nav aria-label="On-page sections" className="flex flex-wrap justify-center gap-x-8 gap-y-3 mt-8">
          {[
            ['Pricing', '#pricing'],
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
          <h2 className="type-title mb-6">Family Packages</h2>
          <p className="type-body">
            Every session includes pre-session planning, location and outfit
            guidance, and a private online gallery for download and sharing.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
          {PACKAGES.map((pkg) => (
            <div
              key={pkg.name}
              className="bg-white p-8 md:p-10 flex flex-col text-center border border-warm-gray"
            >
              <p className="type-subheading text-gray mb-3">{pkg.name}</p>
              <p className="font-display text-4xl text-charcoal mb-6 tracking-wide">{pkg.price}</p>
              <ul className="type-body space-y-2 mb-6 flex-1">
                <li>{pkg.duration}</li>
                <li>{pkg.images}</li>
                <li>{pkg.group}</li>
              </ul>
              {pkg.notes && (
                <p className="type-heading text-teal-sage">{pkg.notes}</p>
              )}
            </div>
          ))}
        </div>

        <p className="type-body text-center text-gray mt-10 max-w-xl mx-auto">
          Larger groups, extended family, or multi-family sessions? Send me a
          note and I&apos;ll put together a custom quote.
        </p>
      </Section>

      {/* ── Locations ────────────────────────────────────────────────── */}
      <Section id="locations">
        <div className="max-w-2xl mx-auto text-center">
          <p className="type-subheading text-gray mb-3">Where We&apos;ll Shoot</p>
          <h2 className="type-title mb-6">Las Vegas Location Guide</h2>
          <p className="type-body mb-8">
            Las Vegas has more variety than people expect. Red rock, alpine
            snow, urban neon, open desert, manicured gardens. I put together
            a full visual guide of every location I shoot, with photo examples
            for each one.
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
            Dry Lake Bed near Jean and Ghost Town near Searchlight carry a $100 travel fee.
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
            curated palette and shoppable picks based on your family&apos;s
            answers.
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
            Send me a note with the rough date you have in mind and a little
            about your family. I&apos;ll reply with availability and walk you
            through the rest. Online self-scheduling through Pixieset is coming
            soon.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="https://jennieslade.com/contact"
              className="inline-block bg-charcoal text-off-white px-8 py-4 type-heading hover:bg-teal-sage transition-colors w-full sm:w-auto"
            >
              Get in Touch
            </a>
            <a
              href="https://jennieslade.com/portfolio"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border border-charcoal text-charcoal px-8 py-4 type-heading hover:bg-charcoal hover:text-off-white transition-colors w-full sm:w-auto"
            >
              See the Gallery
            </a>
          </div>
        </div>
      </Section>
    </main>
  )
}
