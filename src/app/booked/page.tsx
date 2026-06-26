/**
 * /booked — Post-booking thank-you page
 *
 * Cal.com redirects clients here after successful booking + deposit.
 * Sets expectations for the next 24-48hr (contract, prep email, what to wear).
 *
 * Server Component. Static content only.
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import Section from '@/components/layout/Section'

export const metadata: Metadata = {
  title: "You're Booked! | Jennie Slade Photography",
  description:
    "Your session is booked. Here's what happens next.",
  robots: { index: false, follow: false },
}

const NEXT_STEPS = [
  {
    when: 'Right now',
    what: 'Check your email',
    detail:
      'A booking confirmation just landed in your inbox with the date, time, and deposit receipt. If you don\'t see it in 5 minutes, peek in your spam folder.',
  },
  {
    when: 'Within 24 hours',
    what: 'I send you a welcome note + contract',
    detail:
      'A short email from me with your session contract to sign and a few logistics questions. Quick and painless.',
  },
  {
    when: 'About a week before your session',
    what: 'Prep email + location confirmation',
    detail:
      'I send a what-to-wear refresher, the exact meeting spot, and golden-hour timing. If you want hair and makeup, I\'ll send my favorite artist referrals.',
  },
  {
    when: '24 hours before',
    what: 'Friendly text reminder',
    detail:
      'Quick text with the location pin, weather check, and any last-minute notes.',
  },
  {
    when: 'Within 2 to 3 weeks after',
    what: 'Your gallery is ready',
    detail:
      'I deliver your full edited gallery through Pixieset where you can download, share, and order prints.',
  },
] as const

export default function BookedPage() {
  return (
    <main id="main-content" className="pt-32 md:pt-40">
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <Section>
        <div className="max-w-2xl mx-auto text-center">
          <p className="type-subheading text-teal-sage mb-4">Confirmed</p>
          <h1 className="type-title mb-6">You&apos;re Booked</h1>
          <p className="type-body">
            I&apos;m so excited to work with you. Your deposit is in, your date
            is held, and we&apos;re officially on the calendar. Here&apos;s
            exactly what happens between now and your session so nothing
            sneaks up on you.
          </p>
        </div>
      </Section>

      {/* ── What happens next ────────────────────────────────────────── */}
      <Section variant="muted">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <p className="type-subheading text-gray mb-3">The Roadmap</p>
          <h2 className="type-title mb-6">What Happens Next</h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-10">
          {NEXT_STEPS.map((step) => (
            <div key={step.when} className="border-l-2 border-teal-sage pl-6">
              <p className="type-subheading text-gray mb-1">{step.when}</p>
              <p className="type-heading mb-2">{step.what}</p>
              <p className="type-body">{step.detail}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── While you wait ───────────────────────────────────────────── */}
      <Section variant="warm">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <p className="type-subheading text-gray mb-3">In The Meantime</p>
          <h2 className="type-title mb-6">A Couple of Things to Browse</h2>
          <p className="type-body">
            Two things that will make your session prep a lot easier when
            it&apos;s time.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          <Link
            href="/what-to-wear"
            className="block bg-white p-8 border border-warm-gray hover:border-teal-sage transition-colors text-center"
          >
            <p className="type-subheading text-gray mb-2">Styling</p>
            <p className="type-heading mb-3">Try the What to Wear Quiz</p>
            <p className="type-body text-sm text-gray">
              Get a curated palette and shoppable picks based on your answers.
            </p>
          </Link>

          <a
            href="https://locations.jennieslade.com/las-vegas-photo-locations.html"
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-white p-8 border border-warm-gray hover:border-teal-sage transition-colors text-center"
          >
            <p className="type-subheading text-gray mb-2">Scouting</p>
            <p className="type-heading mb-3">Browse Location Guide</p>
            <p className="type-body text-sm text-gray">
              Every Las Vegas spot I shoot, with photo examples for each one.
            </p>
          </a>
        </div>
      </Section>

      {/* ── Follow + contact ─────────────────────────────────────────── */}
      <Section>
        <div className="max-w-2xl mx-auto text-center">
          <p className="type-subheading text-gray mb-3">Stay In Touch</p>
          <h2 className="type-title mb-6">Follow Along</h2>
          <p className="type-body mb-8">
            For behind-the-scenes from sessions, sneak peeks, and Las Vegas
            location inspiration, come hang out on Instagram. If you have a
            question before then, just reply to your confirmation email.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="https://instagram.com/jenniesladephoto"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-charcoal text-off-white px-8 py-4 type-heading hover:bg-teal-sage transition-colors w-full sm:w-auto"
            >
              Follow on Instagram
            </a>
            <a
              href="mailto:jennie@jennieslade.com"
              className="inline-block border border-charcoal text-charcoal px-8 py-4 type-heading hover:bg-charcoal hover:text-off-white transition-colors w-full sm:w-auto"
            >
              Email Me
            </a>
          </div>
        </div>
      </Section>
    </main>
  )
}
