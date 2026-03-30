/**
 * WelcomeSection — editorial intro section for the homepage.
 *
 * This is a Server Component (no 'use client') — no interactivity needed here.
 *
 * Purpose:
 *   Communicates Jennie's warm personality, 20+ year story, and generational
 *   continuity (newborns she photographed are now heading to college).
 *   This section is the emotional handshake between the hero image and the rest
 *   of the site. Story-first, never sales-first.
 *
 * Voice:
 *   First person throughout. No em dashes. No corporate language. Short paragraphs.
 *   Warm, conversational, real. See CLAUDE.md for full voice guidelines.
 *
 * Layout:
 *   White background (Section default variant). Content centered at max-w-2xl
 *   for comfortable editorial reading line. "Meet Jennie" secondary CTA links to /about.
 */

import Section from '@/components/layout/Section'
import Button from '@/components/ui/Button'

export default function WelcomeSection() {
  return (
    <Section variant="default">
      <div className="max-w-2xl mx-auto text-center">

        {/* Decorative section label — Montserrat uppercase, small */}
        <h2 className="type-heading mb-8">Hello There</h2>

        {/* Paragraph 1 — generational continuity, 20+ years */}
        <p className="type-body mb-6">
          Some of the babies I photographed in my first year are heading off to college now. That still blows my mind.
          For over twenty years, I&apos;ve been showing up for Las Vegas families at every stage. The tiny newborn yawns,
          the chaotic toddler giggles, the awkward middle school years, and now the cap-and-gown moments. Getting to
          watch your families grow up has been the greatest gift of my career.
        </p>

        {/* Paragraph 2 — relaxed, fun sessions, real moments */}
        <p className="type-body mb-6">
          I&apos;m not the photographer who makes you stand stiff and say cheese. I&apos;m the one who makes your kids
          laugh so hard they forget I&apos;m even there. Sessions with me are relaxed, fun, and full of real moments.
          The ones you&apos;ll actually want to frame.
        </p>

        {/* Paragraph 3 — invitation, soft CTA */}
        <p className="type-body mb-6">
          If you&apos;re looking for someone who genuinely cares about your family&apos;s story, and who will still be
          here to photograph your grandkids someday, I&apos;d love to hear from you.
        </p>

        {/* CTA — secondary button linking to the About page */}
        <div className="mt-8">
          <Button variant="secondary" href="/about">Meet Jennie</Button>
        </div>

      </div>
    </Section>
  )
}
