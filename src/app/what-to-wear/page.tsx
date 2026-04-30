/**
 * What to Wear Quiz — /what-to-wear
 *
 * Server Component: exports metadata + renders an editorial cover header,
 * then mounts the interactive QuizClient.
 *
 * Design after 3-designer review:
 * - Centered masthead (not left-justified) per Cereal/Kinfolk/Gentlewoman convention
 * - Scale reduced ~35% from prior draft — current is "shouting"
 * - Single line, "Wear" italic in terracotta accent
 * - 4x more vertical whitespace around the title
 * - Volume number sits BELOW the title (Cereal pattern), not in a top bar
 */

import type { Metadata } from 'next'
import QuizClient from './QuizClient'

export const metadata: Metadata = {
  title: 'What to Wear Quiz | Jennie Slade Photography',
  description:
    'Five quick questions and a custom style guide for your photo session. Colors, outfits, and fabrics that will look incredible on you.',
  openGraph: {
    title: 'What to Wear Quiz | Jennie Slade Photography',
    description:
      'Five quick questions and a custom style guide for your photo session. Colors, outfits, and fabrics that will look incredible on you.',
  },
}

export default function WhatToWearPage() {
  return (
    <main className="bg-off-white">

      {/* ═══════════════════════════════════════════════════════════════════
          COVER — magazine masthead (centered, generous whitespace)
          Single line, smaller scale, terracotta italic word.
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="pt-32 md:pt-44 pb-20 md:pb-32">
        <div className="max-w-5xl mx-auto px-6 md:px-10 text-center">

          {/* Top eyebrow — single centered line, brand-name above title */}
          <p className="font-subheading uppercase tracking-[0.32em] text-[10px] text-charcoal opacity-50 mb-12 md:mb-20">
            Jennie Slade Photography
          </p>

          {/* Hero title — single line, centered, much smaller than before
              "What to Wear." with the period. Italic terracotta accent on "Wear" */}
          <h1
            className="font-editorial font-light text-charcoal leading-[1] tracking-[-0.02em]"
            style={{ fontSize: 'clamp(48px, 9vw, 112px)' }}
          >
            What to{' '}
            <span
              className="font-editorial italic font-normal"
              style={{ color: 'var(--color-terracotta)' }}
            >
              Wear.
            </span>
          </h1>

          {/* Volume number BELOW title — Cereal convention */}
          <p className="font-subheading uppercase tracking-[0.32em] text-[10px] text-charcoal opacity-50 mt-12 md:mt-20">
            The Style Edit · Vol. 01
          </p>

          {/* Subtitle / lede — restrained, centered, narrow column */}
          <div className="mt-20 md:mt-28 max-w-xl mx-auto">
            <p className="font-accent italic text-[18px] md:text-[20px] leading-[1.55] text-charcoal opacity-85">
              The closest thing to a stylist on speed-dial.
            </p>
            <p className="mt-6 font-body text-[15px] md:text-[16px] leading-[1.7] text-charcoal opacity-75">
              Five questions, then a personalized guide for your session. Colors,
              outfits, fabrics — chosen for the way you want to feel on camera.
            </p>
          </div>
        </div>
      </section>

      {/* Hairline divider — terracotta, signals start of the quiz spread */}
      <div className="flex justify-center pb-2">
        <div
          className="w-12 h-px"
          style={{ backgroundColor: 'var(--color-terracotta)' }}
        />
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          QUIZ — interactive client component (full bleed)
          QuizClient owns ALL widths and padding from here down.
          ═══════════════════════════════════════════════════════════════════ */}
      <div className="pt-16 md:pt-24 pb-24 md:pb-32">
        <QuizClient />
      </div>
    </main>
  )
}
