/**
 * Senior Info Hub — /seniors/info  (V5: full creative-director rebuild)
 *
 * Applied creative director recommendations:
 *  - Palette: evergreen + cream + acid lime + hot coral (replaced mustard)
 *  - Fonts: Fraunces italic (display) + Permanent Marker (handwriting) + Space Grotesk (labels)
 *  - 8 AI-generated Bring It All composites (Higgsfield nano_banana_flash)
 *  - Hero photo composite already baked-in (Class of '27 marker overlay)
 *  - Layered Adidas-Samba scrapbook (overlap, varied sizes/rotations)
 *  - Curated top 8 senior portraits (grace, kayla, ava, bryce, cole, kenzi, tatum, rilee)
 *  - Cut "Note from Jennie" redundant paragraph
 *  - Added parent trust band, 4-step timeline, yearbook deadline urgency
 */

import type { Metadata } from 'next'
import Image from 'next/image'
import Section from '@/components/layout/Section'
import LocationGrid from './LocationGrid'
import { Fraunces, Permanent_Marker, Space_Grotesk } from 'next/font/google'

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['300', '400', '600', '900'],
  style: ['normal', 'italic'],
  variable: '--font-fraunces',
  display: 'swap',
})

const marker = Permanent_Marker({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-marker',
  display: 'swap',
})

const grotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-grotesk',
  display: 'swap',
})

const EVERGREEN = '#1f2924'
const CREAM = '#f4ede0'
const LIME = '#d4e34a'      // Acid lime — Gen Z accent (replaces mustard)
const CORAL = '#ff5a3c'     // Hot coral — CTAs + marker handwriting

export const metadata: Metadata = {
  title: 'Senior Portraits | Jennie Slade Photography | Las Vegas',
  description:
    'Editorial senior portrait sessions in Las Vegas. Class of 2027 & 2028. Real pricing. Real-time booking.',
  openGraph: {
    title: 'Senior Portraits | Jennie Slade Photography',
    description: 'Editorial senior portraits in Las Vegas. Class of 2027 & 2028.',
  },
}

const CAL_BASE = 'https://cal.com/jennie-slade-photo'

const HERO_PORTRAIT = '/images/seniors/hero-class-of-27.jpg'

// Curated 8 senior portraits — all different seniors, varied locations + moods
// Using highest-resolution location photos (2400px) from Downloads
const SCRAPBOOK = [
  { src: '/images/seniors/real/tunnel-boy.jpg', alt: 'Senior boy backlit tunnel Las Vegas', rotate: -3, size: 'large', y: 0 },
  { src: '/images/seniors/real/jw-marriott.jpg', alt: 'Jagger PV varsity jacket JW Marriott', rotate: 2, size: 'medium', y: 40 },
  { src: '/images/seniors/real/mt-charleston.jpg', alt: 'Senior rust dress cowboy boots Mt Charleston', rotate: -1.5, size: 'large', y: 80 },
  { src: '/images/seniors/real/neon-museum.jpg', alt: 'Senior green dress giant star Neon Museum', rotate: 3, size: 'medium', y: 20 },
  { src: '/images/seniors/real/dry-lake-bed.jpg', alt: 'Senior blonde white sweater Dry Lake Bed', rotate: -2, size: 'small', y: 100 },
  { src: '/images/seniors/real/valley-of-fire.jpg', alt: 'Senior white lace dress Valley of Fire', rotate: 2.5, size: 'medium', y: 0 },
  { src: '/images/seniors/real/las-vegas-strip.jpg', alt: 'Senior black dress Welcome to Las Vegas sign', rotate: -2.5, size: 'large', y: 60 },
  { src: '/images/seniors/real/floyd-lamb.jpg', alt: 'Senior graduation cap and gown Floyd Lamb golden hour', rotate: 1.5, size: 'medium', y: 30 },
] as const

const PACKAGES = [
  {
    label: 'THE ESSENTIALS',
    priceWhole: '550',
    duration: '45 minute session',
    rows: [
      '35 edited images',
      '1 to 2 outfits',
      '1 in-town location',
      'Online viewing gallery',
      'Print release included',
    ],
    notes: null,
    featured: false,
    bookingUrl: `${CAL_BASE}/senior-mini-session`,
  },
  {
    label: 'THE EXPERIENCE',
    priceWhole: '850',
    duration: '1.5 hour golden hour',
    rows: [
      '80 edited images',
      'Up to 3 outfits',
      '1 location + quick second stop',
      'Yearbook headshot included',
      '$100 print credit',
      'Online viewing gallery',
    ],
    notes: 'Most Booked',
    featured: true,
    bookingUrl: `${CAL_BASE}/senior-signature-session`,
  },
  {
    label: 'THE EDITORIAL',
    priceWhole: '1,450',
    duration: '2.5 hour session',
    rows: [
      '120+ edited images',
      'Unlimited outfits',
      '2 locations (Valley of Fire & Mt Charleston included, no fee)',
      'Parent portraits included',
      '10x10 lay-flat magazine album',
      'Yearbook headshot included',
    ],
    notes: null,
    featured: false,
    bookingUrl: `${CAL_BASE}/senior-editorial-session`,
  },
] as const

const ADD_ONS = [
  { name: 'Additional location', price: '$200' },
  { name: 'Additional outfit', price: '$75' },
  { name: 'Best friend or sibling join', price: '$175 / person' },
  { name: 'Parent or family portraits', price: '$200' },
  { name: 'Cap and gown mini add-on', price: '$200' },
  { name: 'Standalone cap and gown mini', price: '$350' },
  { name: 'Album upgrade to 12x12', price: '$300' },
  { name: 'Yearbook ad design', price: '$125' },
  { name: 'Hair and makeup referrals', price: 'Provided' },
] as const

const BRING_IT_ALL = [
  { label: 'your dog', src: '/images/seniors/bring-it/dog-v2.jpg' },
  { label: 'your truck', src: '/images/seniors/bring-it/truck-v2.jpg' },
  { label: 'your guitar', src: '/images/seniors/bring-it/guitar-v2.jpg' },
  { label: 'your best friend', src: '/images/seniors/bring-it/friends-v2.jpg' },
  { label: 'your jersey', src: '/images/seniors/bring-it/jersey-v2.jpg' },
  { label: 'your car', src: '/images/seniors/bring-it/car-v2.jpg' },
  { label: 'your camera', src: '/images/seniors/bring-it/camera-v2.jpg' },
  { label: 'your skateboard', src: '/images/seniors/bring-it/skateboard-v2.jpg' },
] as const

const TIMELINE = [
  { n: '01', t: 'Book', d: 'Pick a collection + a date. $200 retainer secures your spot.' },
  { n: '02', t: 'Plan', d: 'Outfit consultation, location confirmation, and what-to-wear guide one week out.' },
  { n: '03', t: 'Shoot', d: 'Golden hour session w/ direction. Bring all your stuff. No awkward poses.' },
  { n: '04', t: 'Gallery', d: 'Full edited gallery delivered via Pixieset within 2 to 3 weeks.' },
] as const

const NAV = [
  ['Investment', '#pricing'],
  ['Add-Ons', '#add-ons'],
  ['What to Wear', '/seniors/what-to-wear'],
  ['Bring It All', '#bring-it'],
  ['Locations', '#locations'],
  ['FAQ', '#faq'],
  ['Book', '#book'],
] as const

const FAQS = [
  {
    q: 'When should I book?',
    a: 'Junior year spring through senior fall is the sweet spot. If your yearbook deadline is October, book by mid-August. Reach out 6 to 8 weeks ahead.',
  },
  {
    q: 'What time of day?',
    a: 'Golden hour. Sessions start about 90 minutes before sunset for the softest, warmest light.',
  },
  {
    q: 'Hair and makeup?',
    a: 'Not bundled, but I have a short list of artists I love. You book direct, usually $250 to $350. I coordinate timing so they finish right before our call time.',
  },
  {
    q: 'Can my best friend or sibling jump in?',
    a: 'Yes. Add them on for $175 and we work them in.',
  },
  {
    q: 'Family portraits at the end?',
    a: 'Editorial includes parent portraits. Experience can add it for $200 using the last 20 minutes.',
  },
  {
    q: 'When do I get my photos?',
    a: 'Within 2 to 3 weeks of your session, delivered through Pixieset for download, share, and prints.',
  },
  {
    q: 'Cap and gown?',
    a: 'Add a 30 minute mini to Experience or Editorial for $200, or book standalone for $350 in the spring.',
  },
  {
    q: 'Bad weather?',
    a: 'Unsafe conditions = we reschedule, no charge. I keep a few rain dates open each season.',
  },
  {
    q: 'Travel outside Las Vegas?',
    a: 'Dry Lake Bed and Ghost Town near Searchlight carry a $100 travel fee. Editorial Senior includes Valley of Fire & Mt Charleston with no extra fee.',
  },
] as const

// Lookup for scrapbook polaroid sizing
const POLAROID_SIZE: Record<string, string> = {
  large: 'col-span-2 row-span-2',
  medium: 'col-span-1 row-span-2',
  small: 'col-span-1 row-span-1',
}

export default function SeniorInfoPage() {
  return (
    <main
      id="main-content"
      className={`${fraunces.variable} ${marker.variable} ${grotesk.variable} overflow-x-hidden`}
    >

      {/* ── 1. Hero — evergreen + huge "seniors" + AI composite photo ──── */}
      <section
        style={{ backgroundColor: EVERGREEN, color: CREAM }}
        className="pt-28 md:pt-32 pb-16 md:pb-24 relative"
      >
        <div className="max-w-[1500px] mx-auto px-6 md:px-10">

          <h1
            aria-label="Seniors"
            className="font-[family-name:var(--font-fraunces)] italic font-[600] leading-[0.85] tracking-tight text-center select-none mb-10"
            style={{ fontSize: 'clamp(96px, 24vw, 420px)', color: CREAM }}
          >
            seniors
          </h1>

          {/* AI composite hero — Class of '27 marker doodles baked in */}
          <div className="relative aspect-[21/9] max-w-5xl mx-auto overflow-hidden">
            <Image
              src={HERO_PORTRAIT}
              alt="Class of 2027 senior portrait by Jennie Slade Photography, Las Vegas"
              fill
              sizes="(min-width: 1280px) 1280px, (min-width: 768px) 90vw, 100vw"
              quality={95}
              className="object-cover"
              priority
            />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-5 mt-8">
            <span
              style={{ backgroundColor: LIME, color: EVERGREEN }}
              className="px-4 py-1.5 text-[10px] md:text-xs tracking-[0.25em] uppercase font-semibold"
            >
              Class of &apos;27 &amp; &apos;28
            </span>
            <span
              className="text-xs md:text-sm tracking-[0.25em] uppercase opacity-70"
              style={{ fontFamily: 'var(--font-grotesk)' }}
            >
              Investment Guide
            </span>
          </div>
        </div>
      </section>

      {/* ── 2. Yearbook deadline urgency band ─────────────────────────── */}
      <section style={{ backgroundColor: CORAL, color: CREAM }} className="py-3 md:py-4 text-center">
        <p
          className="text-xs md:text-sm tracking-[0.2em] uppercase"
          style={{ fontFamily: 'var(--font-grotesk)', fontWeight: 600 }}
        >
          Yearbook deadlines start October &nbsp;·&nbsp; Class of &apos;27 booking now &nbsp;·&nbsp; <a href="#book" className="underline underline-offset-4">grab your slot →</a>
        </p>
      </section>

      {/* ── 3. Pill nav (sticky-feel, no redundant intro paragraph) ───── */}
      <Section>
        <nav aria-label="On-page sections" className="flex flex-wrap justify-center gap-2 md:gap-3">
          {NAV.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="px-5 py-2.5 text-xs md:text-sm tracking-[0.15em] uppercase border border-charcoal text-charcoal hover:bg-charcoal hover:text-off-white transition-colors"
              style={{ fontFamily: 'var(--font-grotesk)', fontWeight: 500 }}
            >
              {label}
            </a>
          ))}
        </nav>
      </Section>

      {/* ── 4. Pricing — DARK band w/ light cards ─────────────────────── */}
      <section id="pricing" style={{ backgroundColor: EVERGREEN, color: CREAM }} className="py-24 md:py-32">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="text-center mb-16 md:mb-20">
            <p
              className="text-[10px] tracking-[0.3em] uppercase opacity-60 mb-3"
              style={{ fontFamily: 'var(--font-grotesk)' }}
            >
              The Collections
            </p>
            <h2
              className="font-[family-name:var(--font-fraunces)] italic font-[400] tracking-tight leading-none"
              style={{ fontSize: 'clamp(56px, 10vw, 140px)', color: CREAM }}
            >
              Investment
            </h2>
            <p className="type-body max-w-xl mx-auto mt-8" style={{ color: `${CREAM}cc` }}>
              Every session includes pre-session planning, location and outfit
              guidance, and a private online gallery for download and sharing.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8 items-stretch">
            {PACKAGES.map((pkg) => (
              <article
                key={pkg.label}
                style={{ backgroundColor: CREAM, color: '#4b4746' }}
                className={[
                  'relative p-10 md:p-12 flex flex-col text-center',
                  pkg.featured ? 'md:-translate-y-6 md:pb-16 shadow-2xl' : '',
                ].join(' ')}
              >
                {pkg.notes && (
                  <span
                    style={{ backgroundColor: LIME, color: EVERGREEN }}
                    className="absolute -top-3 left-1/2 -translate-x-1/2 px-5 py-1.5 text-[10px] tracking-[0.25em] uppercase whitespace-nowrap font-semibold"
                  >
                    {pkg.notes}
                  </span>
                )}

                <p
                  className="text-[10px] tracking-[0.3em] uppercase text-charcoal/60 mb-6"
                  style={{ fontFamily: 'var(--font-grotesk)' }}
                >
                  {pkg.label}
                </p>

                <div className="flex justify-center items-start mb-3">
                  <span
                    className="font-[family-name:var(--font-fraunces)] text-charcoal text-xl md:text-2xl mt-4 mr-1"
                    style={{ fontWeight: 400 }}
                  >$</span>
                  <span
                    className="font-[family-name:var(--font-fraunces)] italic text-charcoal leading-none tracking-tight"
                    style={{ fontSize: 'clamp(64px, 9vw, 110px)', fontWeight: 400 }}
                  >
                    {pkg.priceWhole}
                  </span>
                </div>
                <p
                  className="text-[10px] tracking-[0.25em] uppercase text-charcoal/60 mb-6"
                  style={{ fontFamily: 'var(--font-grotesk)' }}
                >
                  {pkg.duration}
                </p>

                <div className="w-10 h-px mx-auto mb-8" style={{ backgroundColor: LIME }} aria-hidden="true" />

                <ul className="type-body text-sm space-y-3 mb-10 flex-1 text-left max-w-[280px] mx-auto">
                  {pkg.rows.map((row) => (
                    <li key={row} className="flex gap-3">
                      <span style={{ color: CORAL }} className="flex-shrink-0" aria-hidden="true">·</span>
                      <span>{row}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={pkg.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={
                    pkg.featured
                      ? { backgroundColor: CORAL, color: CREAM }
                      : { borderColor: EVERGREEN, color: EVERGREEN }
                  }
                  className={[
                    'block w-full px-6 py-4 text-xs tracking-[0.25em] uppercase transition-opacity hover:opacity-80',
                    pkg.featured ? '' : 'border-2 bg-transparent',
                  ].join(' ')}
                >
                  Book {pkg.label.replace('THE ', '')}
                </a>
              </article>
            ))}
          </div>

          <p
            className="text-center text-[10px] tracking-[0.3em] uppercase mt-16"
            style={{ color: `${CREAM}80`, fontFamily: 'var(--font-grotesk)' }}
          >
            $200 retainer secures your date · Remaining balance due day of session
          </p>
        </div>
      </section>

      {/* ── 5. Parent trust band — testimonial + delivery promise ─────── */}
      <Section>
        <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-center max-w-5xl mx-auto">
          <div className="md:col-span-7 order-2 md:order-1">
            <p
              className="text-[10px] tracking-[0.3em] uppercase text-charcoal/60 mb-4"
              style={{ fontFamily: 'var(--font-grotesk)' }}
            >
              From a Senior Mom
            </p>
            <blockquote>
              <p
                className="font-[family-name:var(--font-fraunces)] italic text-charcoal leading-[1.2] mb-6"
                style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 400 }}
              >
                &ldquo;She said her mom cried when she saw the gallery. That&apos;s
                a yes from us. Jennie gets these kids in a way I can&apos;t.
                Worth every dollar.&rdquo;
              </p>
              <p
                className="text-xs tracking-[0.2em] uppercase text-charcoal/60"
                style={{ fontFamily: 'var(--font-grotesk)', fontWeight: 600 }}
              >
                — Sarah M., Class of &apos;26 Mom
              </p>
            </blockquote>
          </div>

          <div className="md:col-span-5 order-1 md:order-2">
            <div className="grid grid-cols-3 gap-2">
              {[CORAL, LIME, EVERGREEN].map((color, i) => (
                <div key={color} className="text-center p-4" style={{ backgroundColor: color, color: i === 1 ? EVERGREEN : CREAM }}>
                  <p
                    className="font-[family-name:var(--font-fraunces)] italic leading-none mb-1"
                    style={{ fontSize: 'clamp(28px, 3.5vw, 40px)', fontWeight: 400 }}
                  >
                    {['2-3', '20+', '100%'][i]}
                  </p>
                  <p
                    className="text-[8px] md:text-[9px] tracking-[0.2em] uppercase"
                    style={{ fontFamily: 'var(--font-grotesk)', fontWeight: 600 }}
                  >
                    {['Weeks to gallery', 'Years experience', 'Print release'][i]}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ── 6. Add-Ons + What to Expect ───────────────────────────────── */}
      <Section variant="muted">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 max-w-5xl mx-auto">
          <div id="add-ons">
            <p
              className="text-[10px] tracking-[0.3em] uppercase text-charcoal/60 mb-3"
              style={{ fontFamily: 'var(--font-grotesk)' }}
            >
              A La Carte
            </p>
            <h3
              className="font-[family-name:var(--font-fraunces)] italic text-charcoal mb-8"
              style={{ fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 400 }}
            >
              Add-Ons
            </h3>
            <ul className="space-y-4">
              {ADD_ONS.map((item) => (
                <li key={item.name} className="flex items-baseline gap-2">
                  <span className="type-body text-sm">{item.name}</span>
                  <span
                    className="flex-1 border-b border-dotted border-charcoal/30 mb-1"
                    aria-hidden="true"
                  />
                  <span
                    className="text-xs whitespace-nowrap uppercase tracking-[0.15em]"
                    style={{ color: CORAL, fontWeight: 700, fontFamily: 'var(--font-grotesk)' }}
                  >
                    {item.price}
                  </span>
                </li>
              ))}
            </ul>
            <p
              className="mt-8 text-lg md:text-xl"
              style={{ fontFamily: 'var(--font-marker)', color: CORAL }}
            >
              yes, even your dog 🐶
            </p>
          </div>

          <div>
            <p
              className="text-[10px] tracking-[0.3em] uppercase text-charcoal/60 mb-3"
              style={{ fontFamily: 'var(--font-grotesk)' }}
            >
              How It Works
            </p>
            <h3
              className="font-[family-name:var(--font-fraunces)] italic text-charcoal mb-8"
              style={{ fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 400 }}
            >
              Process
            </h3>

            <ol className="space-y-6">
              {TIMELINE.map((step) => (
                <li key={step.n} className="grid grid-cols-[auto_1fr] gap-4 items-start">
                  <span
                    className="font-[family-name:var(--font-fraunces)] italic leading-none"
                    style={{ fontSize: 'clamp(36px, 5vw, 56px)', color: CORAL, fontWeight: 400 }}
                  >
                    {step.n}
                  </span>
                  <div>
                    <p
                      className="text-sm tracking-[0.2em] uppercase mb-1"
                      style={{ fontFamily: 'var(--font-grotesk)', fontWeight: 600 }}
                    >
                      {step.t}
                    </p>
                    <p className="type-body text-sm">{step.d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Section>

      {/* ── 7. BRING IT ALL — AI sketch composites ────────────────────── */}
      <section id="bring-it" style={{ backgroundColor: EVERGREEN, color: CREAM }} className="py-24 md:py-32">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 text-center">
          <p
            className="text-[10px] tracking-[0.3em] uppercase opacity-60 mb-3"
            style={{ fontFamily: 'var(--font-grotesk)' }}
          >
            What Makes Your Session Yours
          </p>
          <h2
            className="font-[family-name:var(--font-fraunces)] italic tracking-tight leading-none"
            style={{ fontSize: 'clamp(56px, 11vw, 160px)', fontWeight: 400, color: CREAM }}
          >
            Bring It All
          </h2>
          <p className="type-body max-w-2xl mx-auto mt-8 mb-16 md:mb-20" style={{ color: `${CREAM}cc` }}>
            The stuff that makes you you. The things you can&apos;t imagine
            senior year without. Bring them. They belong in your photos.
          </p>

          {/* Illustrated zine tile grid w/ playful hover */}
          <ul className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto">
            {BRING_IT_ALL.map((item) => (
              <li
                key={item.label}
                className="bring-it-tile relative aspect-square cursor-pointer"
                style={{
                  backgroundColor: '#243029',
                  border: '1px solid rgba(244, 237, 224, 0.15)',
                  transition: 'transform 200ms cubic-bezier(.34,1.56,.64,1), border-color 200ms ease, box-shadow 200ms ease',
                }}
              >
                <div className="relative w-full h-full overflow-hidden">
                  <Image
                    src={item.src}
                    alt={item.label}
                    fill
                    sizes="(min-width: 1024px) 280px, (min-width: 768px) 25vw, 50vw"
                    quality={90}
                    className="object-cover"
                  />
                </div>
              </li>
            ))}
          </ul>

          <style>{`
            .bring-it-tile:hover {
              transform: rotate(-2deg) translateY(-4px);
              border: 2px solid #ff5a3c !important;
              box-shadow: 8px 8px 0 #d4e34a;
            }
          `}</style>

          <p
            className="text-xl md:text-2xl mt-12 max-w-xl mx-auto"
            style={{ fontFamily: 'var(--font-marker)', color: LIME }}
          >
            seriously, bring whatever. nothing&apos;s too weird.
          </p>
        </div>
      </section>

      {/* ── 8. Scrapbook — layered Adidas Samba overlap ───────────────── */}
      <Section>
        <div className="text-center mb-16 md:mb-20">
          <p
            className="text-[10px] tracking-[0.3em] uppercase text-charcoal/60 mb-3"
            style={{ fontFamily: 'var(--font-grotesk)' }}
          >
            Recent Sessions
          </p>
          <h2
            className="font-[family-name:var(--font-fraunces)] italic text-charcoal"
            style={{ fontSize: 'clamp(40px, 6vw, 80px)', fontWeight: 400 }}
          >
            Senior Stories
          </h2>
        </div>

        {/* Layered polaroid grid — vary sizes + Y offsets + rotation */}
        <div className="grid grid-cols-4 md:grid-cols-6 gap-3 md:gap-5 max-w-6xl mx-auto auto-rows-[110px] md:auto-rows-[140px]">
          {SCRAPBOOK.map((img) => (
            <div
              key={img.src}
              className={`relative bg-white p-2 pb-6 shadow-xl ${POLAROID_SIZE[img.size]}`}
              style={{
                transform: `rotate(${img.rotate}deg) translateY(${img.y}px)`,
              }}
            >
              <div className="relative w-full h-full overflow-hidden" style={{ backgroundColor: '#d4d1cb' }}>
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(min-width: 1024px) 320px, (min-width: 768px) 33vw, 50vw"
                  quality={90}
                  className="object-cover"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Pull-quote breaking the grid */}
        <blockquote className="max-w-3xl mx-auto text-center mt-32 md:mt-40">
          <p
            className="font-[family-name:var(--font-fraunces)] italic text-charcoal leading-[1.15]"
            style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}
          >
            &ldquo;I was so nervous about photos
            <span style={{ color: CORAL }}> but Jennie made it actually fun.</span>&rdquo;
          </p>
          <p
            className="text-xs tracking-[0.2em] uppercase text-charcoal/60 mt-6"
            style={{ fontFamily: 'var(--font-grotesk)', fontWeight: 600 }}
          >
            — Class of &apos;26 Senior
          </p>
        </blockquote>
      </Section>

      {/* ── 9. Locations ──────────────────────────────────────────────── */}
      <Section id="locations" variant="muted">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <div className="flex items-center justify-center gap-3 mb-3">
              <p
                className="text-[10px] tracking-[0.3em] uppercase text-charcoal/60"
                style={{ fontFamily: 'var(--font-grotesk)' }}
              >
                Where We Shoot
              </p>
              <span
                style={{ backgroundColor: CORAL, color: CREAM }}
                className="px-2.5 py-0.5 text-[10px] tracking-[0.2em] uppercase font-bold"
              >
                16 spots
              </span>
            </div>
            <h2
              className="font-[family-name:var(--font-fraunces)] italic text-charcoal mb-6 leading-[0.95]"
              style={{ fontSize: 'clamp(40px, 6vw, 80px)', fontWeight: 400 }}
            >
              Las Vegas Locations
            </h2>
            <p className="type-body max-w-xl mx-auto">
              Hover any spot to preview. Red rock, alpine snow, urban neon,
              tunnels, downtown murals, private ranch. Full visual guide
              w/ photo examples for each.
            </p>
          </div>

          {/* Interactive client component */}
          <LocationGrid fontGroteskVar="var(--font-grotesk)" />

          <div className="text-center mt-12">
            <a
              href="https://locations.jennieslade.com/las-vegas-photo-locations.html"
              target="_blank"
              rel="noopener noreferrer"
              style={{ backgroundColor: EVERGREEN, color: CREAM }}
              className="inline-block px-8 py-4 text-xs tracking-[0.25em] uppercase hover:opacity-80 transition-opacity"
            >
              Browse the Full Location Guide
            </a>
            <p className="type-body text-gray text-xs mt-6 max-w-xl mx-auto">
              Dry Lake Bed and Ghost Town near Searchlight: $100 travel fee.
              Editorial Senior includes Valley of Fire &amp; Mt Charleston
              at no extra fee.
            </p>
          </div>
        </div>
      </Section>

      {/* ── 10. FAQ ───────────────────────────────────────────────────── */}
      <Section id="faq">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <p
            className="text-[10px] tracking-[0.3em] uppercase text-charcoal/60 mb-3"
            style={{ fontFamily: 'var(--font-grotesk)' }}
          >
            Good to Know
          </p>
          <h2
            className="font-[family-name:var(--font-fraunces)] italic text-charcoal"
            style={{ fontSize: 'clamp(40px, 6vw, 80px)', fontWeight: 400 }}
          >
            FAQ
          </h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-6">
          {FAQS.map((faq) => (
            <details key={faq.q} className="border-b border-warm-gray pb-6 group">
              <summary className="cursor-pointer list-none flex justify-between items-center gap-4">
                <span
                  className="font-[family-name:var(--font-fraunces)] text-charcoal text-base md:text-lg"
                  style={{ fontWeight: 500 }}
                >
                  {faq.q}
                </span>
                <span
                  aria-hidden="true"
                  className="text-2xl leading-none transition-transform group-open:rotate-45"
                  style={{ color: CORAL }}
                >
                  +
                </span>
              </summary>
              <p className="type-body mt-4">{faq.a}</p>
            </details>
          ))}
        </div>
      </Section>

      {/* ── 11. Footer band — "see you at golden hour" ────────────────── */}
      <section id="book" style={{ backgroundColor: EVERGREEN, color: CREAM }} className="py-24 md:py-32 text-center px-6">
        <p
          className="text-[10px] tracking-[0.3em] uppercase opacity-60 mb-6"
          style={{ fontFamily: 'var(--font-grotesk)' }}
        >
          Next Step
        </p>
        <h2
          className="font-[family-name:var(--font-fraunces)] italic tracking-tight mb-8 leading-[1.05]"
          style={{ fontSize: 'clamp(48px, 9vw, 140px)', fontWeight: 400, color: CREAM }}
        >
          See you at <br/>golden hour.
        </h2>
        <p className="type-body max-w-xl mx-auto mb-12" style={{ color: `${CREAM}cc` }}>
          Pick your collection and grab a date in real time. $200 retainer
          holds your spot. Remaining balance due day of session.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
          <a
            href={CAL_BASE}
            target="_blank"
            rel="noopener noreferrer"
            style={{ backgroundColor: CORAL, color: CREAM }}
            className="inline-block px-8 py-4 text-xs tracking-[0.25em] uppercase hover:opacity-90 transition-opacity w-full sm:w-auto font-semibold"
          >
            See All Booking Options
          </a>
          <a
            href="mailto:jennie@jennieslade.com"
            style={{ borderColor: CREAM, color: CREAM }}
            className="inline-block border px-8 py-4 text-xs tracking-[0.25em] uppercase hover:bg-off-white hover:text-charcoal transition-colors w-full sm:w-auto"
          >
            Ask a Question
          </a>
        </div>

        <p
          className="text-[10px] tracking-[0.3em] uppercase mt-16"
          style={{ color: `${CREAM}66`, fontFamily: 'var(--font-grotesk)' }}
        >
          Jennie Slade Photography · Las Vegas · jennieslade.com
        </p>
      </section>
    </main>
  )
}
