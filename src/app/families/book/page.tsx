/**
 * Family Booking Form - /families/book
 *
 * Server Component shell around the client <BookingForm />. Five core required
 * fields; the rest live in an optional disclosure (UX review). Submits to the
 * submitFamilyBooking server action -> Zapier -> Pixifi (client + event +
 * invoice); Pixifi's Workflow rule emails the contract on event creation.
 *
 * TODO(iCal): wire "Check my date" to a real availability read (Jennie has an
 * .ics feed). For now: free-text date + honest "I confirm within one business
 * day" promise so the CTA does not over-sell a live lookup.
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import Section from '@/components/layout/Section'
import BookingForm from './BookingForm'

export const metadata: Metadata = {
  title: 'Book a Family Session | Jennie Slade Photography',
  description:
    'Reserve your family portrait session. Pick a collection, hold your date, and receive your contract and invoice automatically.',
  robots: { index: false, follow: false },
}

export default async function FamilyBookPage({
  searchParams,
}: {
  searchParams: Promise<{ pkg?: string }>
}) {
  const { pkg } = await searchParams

  return (
    <main
      id="main-content"
      className="pt-32 md:pt-40 bg-[color:var(--color-off-white)] text-[color:var(--color-charcoal)] min-h-screen"
      // Vogue-editorial type + Editorial Stark palette, scoped (matches /families).
      style={
        {
          '--font-display': 'var(--font-zodiak)',
          '--font-body': 'var(--font-inter)',
          '--font-heading': 'var(--font-inter)',
          '--font-accent': 'var(--font-bodoni)',
          '--color-off-white': '#F9F8F4',
          '--color-cream': '#F9F8F4',
          '--color-charcoal': '#1A1714',
          '--color-gray': '#6B6560',
          '--color-warm-gray': '#D8D4CD',
          '--color-warm-gray-light': '#ECE8E1',
          '--color-terracotta': '#8B3A2F',
        } as React.CSSProperties
      }
    >
      <Section>
        <div className="max-w-2xl mx-auto py-8 md:py-16">
          <p className="type-heading text-center mb-4">Hold your date</p>
          <h1
            className="text-center mb-6 font-normal leading-[1.05]"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.25rem, 5vw, 3.5rem)',
              letterSpacing: '-0.01em',
            }}
          >
            Let&rsquo;s get you on the calendar.
          </h1>
          <p className="type-body text-base md:text-lg text-center max-w-lg mx-auto mb-12">
            Tell me a little about your family. Once you send this, I confirm your
            date within one business day, then your contract and $300 retainer
            invoice arrive by email.
          </p>

          <BookingForm initialPkg={pkg} />

          <div className="text-center mt-12">
            <Link href="/families" className="type-heading hover:text-[color:var(--color-terracotta)] transition-colors">
              Back to family sessions
            </Link>
          </div>
        </div>
      </Section>
    </main>
  )
}
