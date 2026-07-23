/**
 * FamilyBooked — post-booking thank-you for FAMILY sessions.
 *
 * Rendered by /booked when ?session=family. Uses the same Vogue-editorial
 * branding as /families (Zodiak display, Inter body/eyebrows, Bodoni italic
 * accent, Editorial Stark palette) rather than the dark senior thank-you.
 *
 * Payment-honest: Cal.com collects nothing today, so this never claims a
 * deposit was taken. Date is held; contract + invoice follow by email.
 */

import Link from 'next/link'

const SERIF = 'var(--font-display)' // Zodiak, via the scoped var override below
const DISPLAY_XL = 'clamp(3rem, 9vw, 7rem)'
const DISPLAY_L = 'clamp(2.25rem, 5vw, 4rem)'
const DISPLAY_M = 'clamp(1.75rem, 3.5vw, 2.75rem)'

const STATS: [string, string][] = [
  ['Status', 'Confirmed'],
  ['Contract', 'By email'],
  ['Invoice', 'On the way'],
  ['Gallery', 'In 2-3 weeks'],
]

const STEPS = [
  {
    n: '01',
    when: 'Now',
    what: 'Check your inbox',
    detail: 'A confirmation with your date and time. Check the spam folder if five minutes pass.',
  },
  {
    n: '02',
    when: 'Within a day',
    what: 'Contract and invoice',
    detail: 'A short email with your contract to sign and your invoice. Quick, I promise.',
  },
  {
    n: '03',
    when: 'A week before',
    what: 'Prep and location',
    detail: 'A what-to-wear refresher, where we are meeting, and golden hour timing.',
  },
  {
    n: '04',
    when: 'The day before',
    what: 'A text from me',
    detail: 'Location pin, a weather check, and any last little notes.',
  },
  {
    n: '05',
    when: 'Two weeks after',
    what: 'Your gallery',
    detail: 'Your full edited gallery arrives to download, share, and print.',
  },
]

export default function FamilyBooked() {
  return (
    <main
      id="main-content"
      className="pt-28 md:pt-36 bg-[color:var(--color-off-white)] text-[color:var(--color-charcoal)]"
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
      {/* 1. HERO — confirmation */}
      <section className="max-w-[1100px] mx-auto px-6 md:px-8 pt-10 md:pt-16 pb-16 md:pb-24">
        <p className="type-heading text-[color:var(--color-terracotta)] mb-6">
          Confirmed &middot; Your date is held
        </p>
        <h1
          className="font-normal leading-[0.98] mb-8"
          style={{ fontFamily: SERIF, fontSize: DISPLAY_XL, letterSpacing: '-0.02em' }}
        >
          You&rsquo;re on the calendar.
        </h1>
        <p className="type-body text-lg max-w-xl mb-12">
          Your date is held. Nothing was charged to book. Below is exactly what
          happens next, and your contract and invoice are on the way to your
          inbox.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 border-t border-l border-[color:var(--color-warm-gray)]">
          {STATS.map(([label, value]) => (
            <div
              key={label}
              className="border-b border-r border-[color:var(--color-warm-gray)] p-5 md:p-6"
            >
              <p className="type-heading mb-2">{label}</p>
              <p
                className="italic leading-none"
                style={{ fontFamily: SERIF, fontSize: 'clamp(20px, 2vw, 30px)' }}
              >
                {value}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 2. WHAT HAPPENS NEXT */}
      <section className="border-t border-[color:var(--color-warm-gray)]">
        <div className="max-w-[1100px] mx-auto px-6 md:px-8 py-16 md:py-24">
          <div className="grid md:grid-cols-12 gap-8 md:gap-12 mb-12 md:mb-16 items-end">
            <div className="md:col-span-7">
              <p className="type-heading mb-4">What happens next</p>
              <h2
                className="font-normal leading-[1.02]"
                style={{ fontFamily: SERIF, fontSize: DISPLAY_L, letterSpacing: '-0.015em' }}
              >
                From here to your gallery.
              </h2>
            </div>
            <div className="md:col-span-5">
              <p className="type-body text-base text-[color:var(--color-gray)]">
                Five little touch points between now and delivery. Each one takes
                a question off your plate before you have to ask it.
              </p>
            </div>
          </div>

          <ol className="border-t border-[color:var(--color-warm-gray)]">
            {STEPS.map((step) => (
              <li
                key={step.n}
                className="grid md:grid-cols-[70px_160px_1fr] gap-3 md:gap-8 py-7 md:py-9 items-baseline border-b border-[color:var(--color-warm-gray)]"
              >
                <span
                  className="leading-none text-[color:var(--color-terracotta)]"
                  style={{ fontFamily: SERIF, fontSize: 'clamp(40px, 4vw, 60px)' }}
                >
                  {step.n}
                </span>
                <span className="type-heading">{step.when}</span>
                <div>
                  <p
                    className="mb-2 leading-tight"
                    style={{ fontFamily: SERIF, fontSize: DISPLAY_M }}
                  >
                    {step.what}
                  </p>
                  <p className="type-body text-base max-w-xl">{step.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 3. WHILE YOU WAIT */}
      <section className="border-t border-[color:var(--color-warm-gray)]">
        <div className="max-w-[1100px] mx-auto px-6 md:px-8 py-16 md:py-24">
          <p className="type-heading mb-4">While you wait</p>
          <h2
            className="font-normal leading-[1.02] mb-12 md:mb-16"
            style={{ fontFamily: SERIF, fontSize: DISPLAY_L, letterSpacing: '-0.015em' }}
          >
            Two things that make prep easy.
          </h2>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            <Link
              href="/what-to-wear"
              className="group block p-8 md:p-10 bg-[color:var(--color-warm-gray-light)]/50 border border-[color:var(--color-warm-gray)] hover:border-[color:var(--color-charcoal)] transition-colors"
            >
              <p className="type-heading mb-6">The style quiz</p>
              <h3
                className="mb-5 leading-[1.05]"
                style={{ fontFamily: SERIF, fontSize: DISPLAY_M }}
              >
                What to wear
              </h3>
              <p className="type-body text-base text-[color:var(--color-gray)] mb-8">
                Palettes by Las Vegas location, fabrics, and full outfits by
                family type. Never guess what to put everyone in.
              </p>
              <span className="type-heading text-[color:var(--color-terracotta)] inline-flex items-center gap-3">
                Take the quiz
                <span className="w-6 h-px bg-current transition-all group-hover:w-10" aria-hidden />
              </span>
            </Link>

            <a
              href="https://locations.jennieslade.com/las-vegas-photo-locations.html"
              target="_blank"
              rel="noopener noreferrer"
              className="group block p-8 md:p-10 bg-[color:var(--color-warm-gray-light)]/50 border border-[color:var(--color-warm-gray)] hover:border-[color:var(--color-charcoal)] transition-colors"
            >
              <p className="type-heading mb-6">Locations</p>
              <h3
                className="mb-5 leading-[1.05]"
                style={{ fontFamily: SERIF, fontSize: DISPLAY_M }}
              >
                Where we&rsquo;ll shoot
              </h3>
              <p className="type-body text-base text-[color:var(--color-gray)] mb-8">
                Every Las Vegas spot I shoot, with real photo examples, so you can
                picture where we will be.
              </p>
              <span className="type-heading text-[color:var(--color-terracotta)] inline-flex items-center gap-3">
                Browse the spots
                <span className="w-6 h-px bg-current transition-all group-hover:w-10" aria-hidden />
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* 4. FOLLOW ALONG */}
      <section className="border-t border-[color:var(--color-warm-gray)]">
        <div className="max-w-[900px] mx-auto px-6 md:px-8 py-20 md:py-28 text-center">
          <p className="type-heading mb-6">Stay in touch</p>
          <h2
            className="font-normal leading-[1.02] mb-8"
            style={{ fontFamily: SERIF, fontSize: DISPLAY_L, letterSpacing: '-0.015em' }}
          >
            Follow along until then.
          </h2>
          <p className="type-body text-lg max-w-xl mx-auto mb-10">
            Behind the scenes, sneak peeks, and Las Vegas spots. Or just reply to
            your confirmation email with any question at all.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="https://instagram.com/jenniesladephoto"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 bg-[color:var(--color-charcoal)] text-[color:var(--color-off-white)] type-heading hover:bg-[color:var(--color-terracotta)] transition-colors"
            >
              Instagram
            </a>
            <a
              href="mailto:jennie@jennieslade.com"
              className="type-heading border-b border-[color:var(--color-charcoal)] pb-1 hover:opacity-70 transition-opacity"
            >
              Email me
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <div className="border-t border-[color:var(--color-warm-gray)]">
        <div className="max-w-[1100px] mx-auto px-6 md:px-8 py-8 flex flex-wrap items-center justify-between gap-4">
          <p className="type-heading">Jennie Slade Photography &middot; Las Vegas, NV</p>
          <p className="type-heading">Booked via Cal.com</p>
        </div>
      </div>
    </main>
  )
}
