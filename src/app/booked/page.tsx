/**
 * /booked — Post-booking thank-you (V2: editorial dark redesign)
 *
 * Cal.com redirects clients here after successful booking + deposit.
 * Sets expectations for the next 24-48hr.
 *
 * Palette: ink + carbon + bone + signal red (one accent).
 * Magazine flatplan typography: folio numbers, running heads, hairline rules.
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import { Fraunces, Space_Grotesk } from 'next/font/google'

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['300', '400', '600', '900'],
  style: ['normal', 'italic'],
  variable: '--font-fraunces',
  display: 'swap',
})
const grotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-grotesk',
  display: 'swap',
})

const INK = '#0A0A0A'
const CARBON = '#1A1A1A'
const GRAPHITE = '#2A2A2A'
const BONE = '#E8E2D5'
const STATIC = '#A8A39A'
const SIGNAL = '#FF3B1F'

export const metadata: Metadata = {
  title: "Confirmed | Jennie Slade Photography",
  description: "Your senior session is on the calendar.",
  robots: { index: false, follow: false },
}

const NEXT_STEPS = [
  {
    num: '01',
    when: 'NOW',
    what: 'Check your inbox',
    detail: 'Confirmation w/ date, time, deposit receipt. Spam folder if 5 minutes pass.',
  },
  {
    num: '02',
    when: 'T + 24H',
    what: 'Welcome + contract',
    detail: 'Short email w/ contract to sign + a few logistics questions. Quick.',
  },
  {
    num: '03',
    when: 'T − 7 DAYS',
    what: 'Prep + location',
    detail: 'What-to-wear refresher, meeting spot, golden hour timing. HMUA referrals on request.',
  },
  {
    num: '04',
    when: 'T − 24H',
    what: 'Text reminder',
    detail: 'Location pin, weather check, last-minute notes.',
  },
  {
    num: '05',
    when: 'T + 2-3 WK',
    what: 'Gallery delivery',
    detail: 'Full edited gallery via Pixieset. Download, share, order prints.',
  },
] as const

// ─────────────────────────────────────────────────────────────────────
// Folio header — running across top of each section, magazine flatplan
// ─────────────────────────────────────────────────────────────────────
function Folio({ n, title }: { n: string; title: string }) {
  return (
    <div className="flex items-center justify-between mb-12 md:mb-16">
      <p
        className="text-[10px] md:text-xs tracking-[0.3em] uppercase"
        style={{ fontFamily: 'var(--font-grotesk)', color: STATIC, fontWeight: 500 }}
      >
        § {n} &mdash; {title}
      </p>
      <p
        className="text-[10px] md:text-xs tracking-[0.3em] uppercase"
        style={{ fontFamily: 'var(--font-grotesk)', color: STATIC, fontWeight: 500 }}
      >
        Jennie Slade &middot; Vol. 02 &middot; F/W 26
      </p>
    </div>
  )
}

export default function BookedPage() {
  return (
    <main
      id="main-content"
      className={`${fraunces.variable} ${grotesk.variable} overflow-x-hidden`}
      style={{ backgroundColor: INK, color: BONE }}
    >
      {/* ── Hairline rule top under header ──────────────────────────── */}
      <div style={{ height: 1, backgroundColor: GRAPHITE }} className="mt-24 md:mt-28" aria-hidden="true" />

      {/* ── 1. Hero — confirmation ───────────────────────────────────── */}
      <section className="px-6 md:px-10 pt-12 md:pt-16 pb-24 md:pb-32">
        <div className="max-w-[1500px] mx-auto">
          <Folio n="001" title="Confirmation" />

          <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-end">
            <div className="md:col-span-7">
              <span
                style={{ backgroundColor: SIGNAL, color: BONE }}
                className="inline-block px-3 py-1.5 text-[10px] md:text-xs tracking-[0.3em] uppercase font-bold mb-6"
              >
                Confirmed &middot; Deposit Received
              </span>

              <h1
                className="font-[family-name:var(--font-fraunces)] italic font-[400] leading-[0.82] tracking-tight mb-8"
                style={{ fontSize: 'clamp(80px, 16vw, 280px)', color: BONE }}
              >
                you&apos;re in.
              </h1>

              <p
                className="text-base md:text-lg max-w-xl"
                style={{ fontFamily: 'var(--font-grotesk)', color: STATIC, lineHeight: 1.6 }}
              >
                Your date is held. Deposit is in. Below is exactly what
                happens between now and your session so nothing sneaks up
                on you.
              </p>
            </div>

            <div className="md:col-span-5">
              <div className="grid grid-cols-2 gap-px" style={{ backgroundColor: GRAPHITE }}>
                {[
                  ['STATUS', 'Confirmed'],
                  ['DEPOSIT', 'Received'],
                  ['BALANCE', 'Due day of'],
                  ['GALLERY', 'In 2-3 weeks'],
                ].map(([label, value]) => (
                  <div key={label} className="p-5 md:p-6" style={{ backgroundColor: INK }}>
                    <p
                      className="text-[9px] md:text-[10px] tracking-[0.3em] uppercase mb-2"
                      style={{ fontFamily: 'var(--font-grotesk)', color: STATIC, fontWeight: 500 }}
                    >
                      {label}
                    </p>
                    <p
                      className="font-[family-name:var(--font-fraunces)] italic"
                      style={{ fontSize: 'clamp(20px, 2vw, 28px)', color: BONE, fontWeight: 400, lineHeight: 1.1 }}
                    >
                      {value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div style={{ height: 1, backgroundColor: GRAPHITE }} aria-hidden="true" />

      {/* ── 2. Timeline ──────────────────────────────────────────────── */}
      <section className="px-6 md:px-10 py-24 md:py-32">
        <div className="max-w-[1500px] mx-auto">
          <Folio n="002" title="What Happens Next" />

          <div className="grid md:grid-cols-12 gap-8 md:gap-12 mb-16">
            <div className="md:col-span-5">
              <h2
                className="font-[family-name:var(--font-fraunces)] italic leading-[0.85] tracking-tight"
                style={{ fontSize: 'clamp(56px, 9vw, 140px)', color: BONE, fontWeight: 400 }}
              >
                the roadmap.
              </h2>
            </div>
            <div className="md:col-span-7 md:pt-6">
              <p
                className="text-base md:text-lg max-w-xl"
                style={{ fontFamily: 'var(--font-grotesk)', color: STATIC, lineHeight: 1.7 }}
              >
                Five touch points between now and gallery delivery. Each
                one removes a question before you ask it.
              </p>
            </div>
          </div>

          <ol className="max-w-5xl mx-auto">
            {NEXT_STEPS.map((step, i) => (
              <li
                key={step.num}
                className="grid md:grid-cols-[80px_180px_1fr] gap-4 md:gap-8 py-8 md:py-10 items-baseline"
                style={{ borderTop: i === 0 ? `1px solid ${GRAPHITE}` : 'none', borderBottom: `1px solid ${GRAPHITE}` }}
              >
                <span
                  className="font-[family-name:var(--font-fraunces)] italic leading-none"
                  style={{ fontSize: 'clamp(48px, 5vw, 72px)', color: SIGNAL, fontWeight: 400 }}
                >
                  {step.num}
                </span>
                <span
                  className="text-[10px] md:text-xs tracking-[0.3em] uppercase"
                  style={{ fontFamily: 'var(--font-grotesk)', color: STATIC, fontWeight: 600 }}
                >
                  {step.when}
                </span>
                <div>
                  <p
                    className="font-[family-name:var(--font-fraunces)] italic mb-2"
                    style={{ fontSize: 'clamp(22px, 2.5vw, 32px)', color: BONE, fontWeight: 400, lineHeight: 1.15 }}
                  >
                    {step.what}
                  </p>
                  <p
                    className="text-sm md:text-base max-w-xl"
                    style={{ fontFamily: 'var(--font-grotesk)', color: STATIC, lineHeight: 1.6 }}
                  >
                    {step.detail}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <div style={{ height: 1, backgroundColor: GRAPHITE }} aria-hidden="true" />

      {/* ── 3. While you wait — 2 cross-links ───────────────────────── */}
      <section className="px-6 md:px-10 py-24 md:py-32">
        <div className="max-w-[1500px] mx-auto">
          <Folio n="003" title="In The Meantime" />

          <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-end mb-16">
            <div className="md:col-span-7">
              <h2
                className="font-[family-name:var(--font-fraunces)] italic leading-[0.85] tracking-tight"
                style={{ fontSize: 'clamp(48px, 7vw, 120px)', color: BONE, fontWeight: 400 }}
              >
                while you wait.
              </h2>
            </div>
            <div className="md:col-span-5">
              <p
                className="text-base"
                style={{ fontFamily: 'var(--font-grotesk)', color: STATIC, lineHeight: 1.7 }}
              >
                Two things that make session prep simpler when the date
                gets close.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2" style={{ gap: 1, backgroundColor: GRAPHITE }}>
            <Link
              href="/seniors/what-to-wear"
              className="block p-10 md:p-12 transition-colors group"
              style={{ backgroundColor: CARBON }}
            >
              <p
                className="text-[10px] tracking-[0.3em] uppercase mb-6"
                style={{ fontFamily: 'var(--font-grotesk)', color: STATIC, fontWeight: 600 }}
              >
                § A &mdash; STYLING
              </p>
              <h3
                className="font-[family-name:var(--font-fraunces)] italic mb-6 leading-[0.95]"
                style={{ fontSize: 'clamp(36px, 4.5vw, 64px)', color: BONE, fontWeight: 400 }}
              >
                What to Wear
              </h3>
              <p
                className="text-sm md:text-base mb-8 max-w-md"
                style={{ fontFamily: 'var(--font-grotesk)', color: STATIC, lineHeight: 1.6 }}
              >
                10 aesthetics. Color palettes by Las Vegas location. Real
                photographer styling tips. Mood boards.
              </p>
              <span
                className="inline-block text-xs tracking-[0.3em] uppercase pb-1 transition-colors"
                style={{ fontFamily: 'var(--font-grotesk)', color: SIGNAL, borderBottom: `1px solid ${SIGNAL}`, fontWeight: 700 }}
              >
                Open the guide &rarr;
              </span>
            </Link>

            <a
              href="https://locations.jennieslade.com/las-vegas-photo-locations.html"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-10 md:p-12 transition-colors group"
              style={{ backgroundColor: CARBON }}
            >
              <p
                className="text-[10px] tracking-[0.3em] uppercase mb-6"
                style={{ fontFamily: 'var(--font-grotesk)', color: STATIC, fontWeight: 600 }}
              >
                § B &mdash; LOCATIONS
              </p>
              <h3
                className="font-[family-name:var(--font-fraunces)] italic mb-6 leading-[0.95]"
                style={{ fontSize: 'clamp(36px, 4.5vw, 64px)', color: BONE, fontWeight: 400 }}
              >
                Location Guide
              </h3>
              <p
                className="text-sm md:text-base mb-8 max-w-md"
                style={{ fontFamily: 'var(--font-grotesk)', color: STATIC, lineHeight: 1.6 }}
              >
                Every Las Vegas spot I shoot. Photo examples for each.
                Helps you visualize where we&apos;ll be.
              </p>
              <span
                className="inline-block text-xs tracking-[0.3em] uppercase pb-1 transition-colors"
                style={{ fontFamily: 'var(--font-grotesk)', color: SIGNAL, borderBottom: `1px solid ${SIGNAL}`, fontWeight: 700 }}
              >
                Browse all 16 spots &rarr;
              </span>
            </a>
          </div>
        </div>
      </section>

      <div style={{ height: 1, backgroundColor: GRAPHITE }} aria-hidden="true" />

      {/* ── 4. Stay in touch ──────────────────────────────────────────── */}
      <section className="px-6 md:px-10 py-24 md:py-32">
        <div className="max-w-[1500px] mx-auto">
          <Folio n="004" title="Stay In Touch" />

          <div className="text-center max-w-3xl mx-auto">
            <h2
              className="font-[family-name:var(--font-fraunces)] italic mb-10 leading-[0.85] tracking-tight"
              style={{ fontSize: 'clamp(56px, 10vw, 160px)', color: BONE, fontWeight: 400 }}
            >
              follow along.
            </h2>
            <p
              className="text-base md:text-lg mb-12 max-w-xl mx-auto"
              style={{ fontFamily: 'var(--font-grotesk)', color: STATIC, lineHeight: 1.7 }}
            >
              Behind-the-scenes, sneak peeks, Las Vegas spots. Or reply to
              your confirmation email w/ any question.
            </p>

            <div className="flex flex-col sm:flex-row gap-px justify-center items-stretch max-w-md mx-auto" style={{ backgroundColor: GRAPHITE }}>
              <a
                href="https://instagram.com/jenniesladephoto"
                target="_blank"
                rel="noopener noreferrer"
                style={{ backgroundColor: SIGNAL, color: BONE }}
                className="flex-1 px-8 py-5 text-xs tracking-[0.3em] uppercase font-bold hover:opacity-90 transition-opacity text-center"
              >
                Instagram
              </a>
              <a
                href="mailto:jennie@jennieslade.com"
                style={{ backgroundColor: CARBON, color: BONE, border: `1px solid ${GRAPHITE}` }}
                className="flex-1 px-8 py-5 text-xs tracking-[0.3em] uppercase font-bold hover:opacity-90 transition-opacity text-center"
              >
                Email
              </a>
            </div>
          </div>
        </div>
      </section>

      <div style={{ height: 1, backgroundColor: GRAPHITE }} aria-hidden="true" />

      {/* ── Footer running line ──────────────────────────────────────── */}
      <div className="px-6 md:px-10 py-8 flex flex-wrap items-center justify-between gap-4">
        <p
          className="text-[10px] tracking-[0.3em] uppercase"
          style={{ fontFamily: 'var(--font-grotesk)', color: STATIC, fontWeight: 500 }}
        >
          Jennie Slade Photography &middot; Las Vegas, NV
        </p>
        <p
          className="text-[10px] tracking-[0.3em] uppercase"
          style={{ fontFamily: 'var(--font-grotesk)', color: STATIC, fontWeight: 500 }}
        >
          Confirmation Number &middot; <span style={{ color: BONE }}>auto-generated via Cal.com</span>
        </p>
      </div>
    </main>
  )
}
