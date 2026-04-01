/**
 * Contact Page — Jennie Slade Photography
 *
 * This is a Server Component (no 'use client').
 * ContactForm is a Client Component rendered as a child — this is fine in Next.js App Router.
 *
 * Page structure (top to bottom):
 *   1. Header + Intro + ContactForm  — the primary conversion action
 *   2. Investment section            — supplementary context, comes AFTER the form
 *
 * Design decisions:
 *   D-14: "Get in Touch" heading, type-title, centered
 *   D-15: Warm first-person intro above the form
 *   D-16: Form centered, max-w-xl
 *   D-12: Investment section, editorial warm presentation
 *   D-13b: Heading is "Investment," not "Pricing"
 *   D-13c: Simple editorial list with starting-at prices
 *   D-13d: Custom session note in type-accent at bottom
 *   D-19: pt-32 md:pt-40 for header clearance
 *
 * Voice: First person. Warm, inviting. Not salesy. No em dashes.
 * See CLAUDE.md and 06-CONTEXT.md for full guidelines.
 */

import type { Metadata } from 'next'
import Section from '@/components/layout/Section'
import ScrollFade from '@/components/ui/ScrollFade'
import ContactForm from './ContactForm'

export const metadata: Metadata = {
  title: 'Contact | Jennie Slade Photography',
  description:
    'Get in touch with Jennie Slade Photography in Las Vegas. Inquire about family portraits, senior photos, weddings, and headshot sessions.',
}

// ── Investment / Pricing data (D-13) ─────────────────────────────────────────
// Editorial presentation — warm, simple, inviting. Not a pricing table.
const investmentItems = [
  {
    name: 'Families',
    startingAt: '$500',
    description: 'Relaxed sessions that capture your family exactly as you are right now.',
  },
  {
    name: 'Seniors',
    startingAt: '$500',
    description: 'A milestone worth celebrating with portraits that feel like you.',
  },
  {
    name: 'Headshots / Corporate',
    startingAt: '$500',
    description: 'Professional portraits for your brand, your business, your next chapter.',
  },
  {
    name: 'Weddings',
    startingAt: '$3,000',
    description: 'Full day coverage of your love story, from getting ready to the last dance.',
  },
]

export default function ContactPage() {
  return (
    <main>

      {/* ── Section 1: Header + Intro + Contact Form ──────────────────────────
          NOT wrapped in ScrollFade — should be immediately visible on page load.
          pt-32 md:pt-40 clears the fixed header (D-19).                        */}
      <Section variant="default" className="pt-32 md:pt-40">
        <div className="text-center">

          {/* Page title — Cormorant Light uppercase (D-14) */}
          <h1 className="type-title">Get in Touch</h1>

          {/* Warm intro paragraph — first person, inviting (D-15) */}
          <p className="type-body max-w-2xl mx-auto mt-6">
            I&apos;d love to hear about what you have in mind. Whether it&apos;s a family session
            at Red Rock, senior portraits, or your wedding day, every story is worth capturing.
            Fill out the form below and I&apos;ll get back to you soon.
          </p>

        </div>

        {/* ContactForm renders below the intro, centered on the page (D-16) */}
        <ContactForm />

      </Section>

      {/* Decorative divider between form and investment sections */}
      <div className="flex justify-center py-4">
        <div className="w-16 border-t border-warm-gray" />
      </div>

      {/* ── Section 2: Investment ──────────────────────────────────────────────
          Comes AFTER the form — form is the primary action, pricing is context.
          Uses muted variant for visual rhythm (cream alternating with warm-gray-light). */}
      <ScrollFade>
        <Section variant="muted">
          <div className="text-center">

            {/* Section heading — "Investment" per D-13b. NOT "Pricing." */}
            <h2 className="type-title">Investment</h2>

            {/* Short warm intro — framing investment in memories (D-13b) */}
            <p className="type-body max-w-2xl mx-auto mt-6">
              Every session is an investment in memories your family will treasure forever.
              Here&apos;s a place to start.
            </p>

            {/* ── Investment list — editorial, warm, simple (D-13c) ─────────── */}
            <ul className="max-w-lg mx-auto mt-12 list-none" aria-label="Session types and starting prices">
              {investmentItems.map((item, index) => (
                <li
                  key={item.name}
                  className={`py-6 text-center ${index > 0 ? 'border-t border-warm-gray' : ''}`}
                >
                  {/* Session name — Apparel uppercase (type-subheading) */}
                  <p className="type-subheading mb-1">{item.name}</p>

                  {/* Starting-at price — body text */}
                  <p className="type-body">starting at {item.startingAt}</p>

                  {/* One-line description — muted body text */}
                  <p className="type-body text-gray mt-1">{item.description}</p>
                </li>
              ))}
            </ul>

            {/* Custom session note (D-13d) — Arapey italic, centered */}
            <p className="type-accent mt-8 max-w-lg mx-auto">
              Want something custom? I love creating sessions that are uniquely yours.
              Just tell me what you&apos;re envisioning.
            </p>

          </div>
        </Section>
      </ScrollFade>

    </main>
  )
}
