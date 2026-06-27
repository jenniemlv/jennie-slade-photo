/**
 * Senior What to Wear — /seniors/what-to-wear
 *
 * Editorial zine style guide for Class of '27 + '28.
 *
 * Layout synthesizes 3 design agent reports:
 *   - Trend researcher: 8 aesthetic style codes (Old Money, Cowboy Era,
 *     Mob Wife, Clean Girl, etc) currently resonant w/ 17-18yo
 *   - UX designer: scroll-driven, marker doodle annotations, YES/NO sketch
 *     comparisons, no BuzzFeed quiz
 *   - Senior photographer: 2-3 outfit strategy, fabric/texture rules,
 *     color theory by Las Vegas location
 *
 * Sections:
 *   1. Hero — "What to Wear" + intro
 *   2. Pill nav
 *   3. 8 aesthetic vibe tiles (real photo + name + color + key pieces)
 *   4. 2-3 outfit playbook (story arc)
 *   5. Fabric + texture rules
 *   6. Color theory by location
 *   7. YES / NO sketched comparisons
 *   8. Parents corner
 *   9. CTA → pricing + booking
 */

import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Section from '@/components/layout/Section'
import VibeCarousel from './VibeCarousel'
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
const LIME = '#d4e34a'
const CORAL = '#ff5a3c'

export const metadata: Metadata = {
  title: 'What to Wear | Senior Portraits | Jennie Slade Photography',
  description:
    'Class of 2027 + 2028 senior portrait styling guide. 8 aesthetics, location-matched palettes, and pro photographer tips.',
  openGraph: {
    title: 'What to Wear | Senior Portraits | Jennie Slade Photography',
    description: 'Senior portrait styling guide for Class of 2027 + 2028.',
  },
}

// 8 aesthetics — each w/ multi-photo carousel (her actual senior photos)
const AESTHETICS = [
  {
    name: 'Old Money',
    tagline: 'Quiet luxury, zero logos.',
    images: [
      { src: '/images/seniors/real/tivoli.jpg', alt: 'Senior boy in white shirt and tie at Tivoli' },
      { src: '/images/seniors/real/old-money.jpg', alt: 'Senior boy blue blazer sunglasses at Red Rock' },
      { src: '/images/seniors/real/smith-center.jpg', alt: 'Senior boy in blue blazer at Smith Center' },
      { src: '/images/seniors/real/sunglasses-boy.jpg', alt: 'Senior boy in sunglasses and blue blazer at Red Rock' },
      { src: '/images/seniors/real/clean-preppy.jpg', alt: 'Senior boy white shirt and khaki' },
    ],
    palette: ['#f4ede0', '#c9a87c', '#4a4a4a', '#1a1a1a'],
    pieces: ['Cashmere or silk', 'Tailored trousers', 'Pearl drop earrings', 'Slick low ponytail'],
    boy: 'Charcoal sweater over collared shirt, gray trousers, white sneakers or loafers.',
    location: 'Tivoli · JW Marriott',
  },
  {
    name: 'Cowboy Era',
    tagline: 'Modern ranch — not costume.',
    images: [
      { src: '/images/seniors/real/mt-charleston.jpg', alt: 'Cowboy Era senior at Mt Charleston' },
      { src: '/images/seniors/real/cowboy.jpg', alt: 'Senior in cowboy boots ranch country' },
      { src: '/images/seniors/real/cowboy2.jpg', alt: 'Senior in denim overalls at Red Rock' },
    ],
    palette: ['#e6dcc8', '#a85a3e', '#5d6b3e', '#3a2520'],
    pieces: ['Prairie dress + structured bodice', 'Real cowboy boots', 'Tooled leather belt', 'Loose Western waves'],
    boy: 'Chambray pearl-snap, raw denim, brown belt, real boots, felt hat.',
    location: 'Spring Mountain Ranch · Valley of Fire',
  },
  {
    name: 'Desert Boho 2.0',
    tagline: 'Earthy + sculptural. NOT 2014 Coachella.',
    images: [
      { src: '/images/seniors/real/valley-of-fire.jpg', alt: 'Desert Boho senior Valley of Fire' },
      { src: '/images/seniors/real/wetlands.jpg', alt: 'Senior rust dress Wetlands dry grass' },
      { src: '/images/seniors/real/whitelace-girl.jpg', alt: 'Senior white lace boho dress' },
      { src: '/images/seniors/real/calico-basin.jpg', alt: 'Senior lavender dress Calico Basin' },
      { src: '/images/seniors/real/boho2.jpg', alt: 'Boho senior portrait' },
      { src: '/images/seniors/real/boho3.jpg', alt: 'Boho senior portrait' },
      { src: '/images/seniors/real/extra-1.jpg', alt: 'Boho senior in floral maxi dress' },
      { src: '/images/seniors/real/extra-2.jpg', alt: 'Boho senior cream sweater floral pants at Joshua tree' },
    ],
    palette: ['#f4ede0', '#c4884a', '#8a9a73', '#d4c5a8'],
    pieces: ['Bias-cut slip or linen prairie', 'Suede ankle boots', 'Gold hoops', 'Natural waves'],
    boy: 'Cream or olive linen shirt half-tucked, raw denim, brown leather boot.',
    location: 'Valley of Fire · Calico Basin · Wetlands',
  },
  {
    name: 'Mob Wife',
    tagline: 'Sultry, not scandalous.',
    images: [
      { src: '/images/seniors/real/mob-wife.jpg', alt: 'Mob Wife senior lavender tulle gold hoops' },
      { src: '/images/seniors/real/las-vegas-strip.jpg', alt: 'Mob Wife senior black dress at Welcome to Las Vegas sign' },
      { src: '/images/seniors/real/neon-museum.jpg', alt: 'Senior at Neon Museum giant star sign' },
    ],
    palette: ['#0a0a0a', '#c9a23f', '#8a4538', '#3d1e1a'],
    pieces: ['Black slip or tulle gown', 'Faux fur shrug', 'Gold hoops + layered chains', 'Voluminous blowout'],
    boy: 'All-black fit, leather jacket, gold chain, slick hair, clean stubble.',
    location: 'Strip · Neon Museum',
  },
  {
    name: 'College Core',
    tagline: 'Sweatshirt + school spirit.',
    images: [
      { src: '/images/seniors/real/bostoncollege-girl.jpg', alt: 'Senior in Boston College sweatshirt' },
      { src: '/images/seniors/real/preppy.jpg', alt: 'Senior in red Utah sweatshirt at Red Rock' },
      { src: '/images/seniors/real/preppy2.jpg', alt: 'Senior in UNLV sweatshirt at Red Rock' },
    ],
    palette: ['#7a1a2e', '#1a2e4a', '#f4ede0', '#c9a23f'],
    pieces: ['Vintage college crewneck or sweatshirt', 'Denim skirt or biker shorts', 'Fresh sneakers', 'Hair down + natural'],
    boy: 'College tee or hoodie, casual jeans, sneakers, hat optional. Where you committed.',
    location: 'Red Rock · Calico Basin · Spring Mountain Ranch',
  },
  {
    name: 'Y2K Editorial',
    tagline: '2003 magazine spread, reborn.',
    images: [
      { src: '/images/seniors/real/neon-museum.jpg', alt: 'Y2K senior Neon Museum vintage' },
      { src: '/images/seniors/real/y2k.jpg', alt: 'Y2K senior red top wide-leg jeans Valley of Fire' },
      { src: '/images/seniors/real/y2k2.jpg', alt: 'Y2K senior black mini dress at mural' },
      { src: '/images/seniors/real/y2k3.jpg', alt: 'Y2K senior gray polo pink sneakers at pink mural' },
      { src: '/images/seniors/real/downtown.jpg', alt: 'Senior boy turquoise wall Downtown' },
    ],
    palette: ['#1a1a1a', '#5d7a99', '#c8c8c8', '#7a5a3a'],
    pieces: ['Low-rise denim', 'Baby tee or band tee', 'Leather jacket', 'Smudgy eyeliner'],
    boy: 'Vintage tee, baggy jeans, Sambas or Vans, silver chain, shag cut.',
    location: 'Neon Museum · Downtown',
  },
  {
    name: 'Sports Core',
    tagline: 'Letterman + main-character energy.',
    images: [
      { src: '/images/seniors/real/jw-marriott.jpg', alt: 'Sports Core Jagger PV varsity jacket' },
      { src: '/images/seniors/real/letterman-boy.jpg', alt: 'Senior boy Mead varsity letterman' },
      { src: '/images/seniors/real/tunnel-boy.jpg', alt: 'Athletic senior boy backlit tunnel' },
      { src: '/images/seniors/real/sports.jpg', alt: 'Senior golf player with club and Travis Mathew polo' },
    ],
    palette: ['#1f2924', '#f4ede0', '#5a8f5a', '#a8a8a8'],
    pieces: ['Vintage varsity jacket', 'Crew tank', 'Fresh sneakers', 'Gold name chain'],
    boy: 'Letterman + white tee, fresh sneakers, gold chain. Bring the ball.',
    location: 'Downtown · Spring Mountain Ranch · stadium',
  },
  {
    name: 'Clean Girl',
    tagline: 'Skin > clothes.',
    images: [
      { src: '/images/seniors/real/dry-lake-bed.jpg', alt: 'Clean Girl senior Dry Lake Bed' },
      { src: '/images/seniors/real/clean-desert.jpg', alt: 'Clean Girl senior black top white shorts dry lake' },
      { src: '/images/seniors/real/clean-girl2.jpg', alt: 'Clean Girl senior white bubble dress park' },
      { src: '/images/seniors/real/old-money2.jpg', alt: 'Clean Girl senior black top white shorts close-up' },
    ],
    palette: ['#f4ede0', '#d4c4a8', '#8a6a4a', '#c9a23f'],
    pieces: ['White tank + straight jeans', 'Gold hoops', 'Slicked bun', 'Glossy lip'],
    boy: 'Plain white tee, raw denim, gold chain, clean fade, dewy skin.',
    location: 'Tunnels · Dry Lake Bed · Wetlands',
  },
  {
    name: 'Preppy Revival',
    tagline: 'Ralph Lauren Core. Polo match.',
    images: [
      { src: '/images/seniors/real/smith-center.jpg', alt: 'Preppy senior blue blazer Smith Center' },
      { src: '/images/seniors/real/preppy3.jpg', alt: 'Preppy senior in chambray button-down at tunnel' },
      { src: '/images/seniors/real/preppy4.jpg', alt: 'Preppy senior PV varsity letterman checkered pants' },
      { src: '/images/seniors/real/jw-marriott.jpg', alt: 'Preppy senior at JW Marriott garden' },
    ],
    palette: ['#2c4a3a', '#1a2e4a', '#f4ede0', '#7a1a2e'],
    pieces: ['Pleated skirt or argyle vest', 'White button-down', 'Cable knit', 'Loafers + knee socks'],
    boy: 'Navy blazer, oxford shirt, chinos, brown loafers. Side part.',
    location: 'JW Marriott · Tivoli · Smith Center',
  },
  {
    name: 'Graduated',
    tagline: 'Cap, gown, cords, sunset.',
    images: [
      { src: '/images/seniors/real/floyd-lamb.jpg', alt: 'Senior graduation cap gown Floyd Lamb golden hour' },
      { src: '/images/seniors/real/graduated.jpg', alt: 'Senior in graduation cap gown medals and cords' },
    ],
    palette: ['#0a4a2e', '#c9a23f', '#1a1a1a', '#f4ede0'],
    pieces: ['Cap + gown w/ all your cords + medals', 'Hair styled simple', 'Statement earrings', 'Sneakers or low heel under gown'],
    boy: 'Cap + gown, dress shirt + tie under, polished shoes peeking out.',
    location: 'Floyd Lamb Park · Spring Mountain Ranch · campus',
  },
] as const

// Color-by-location matrix (from photographer agent)
const COLOR_THEORY = [
  { location: 'Red Rock + Calico Basin', wear: 'Cream, camel, rust, terracotta, olive, butter yellow', avoid: 'Bright red, neon, hot pink' },
  { location: 'Mt Charleston pines', wear: 'Emerald, burgundy, mustard, navy, oxblood, plum', avoid: 'Forest green, brown' },
  { location: 'Strip neon (night)', wear: 'Black, white, oxblood, metallic, structured leather', avoid: 'Pastels, beige' },
  { location: 'Tunnels + underpasses', wear: 'Monochrome head-to-toe — black, white, or oxblood', avoid: 'Multi-color outfits' },
  { location: 'Wetlands + dry grass', wear: 'Rust, cream, sage, butter, dusty blue', avoid: 'Bright green, yellow-gold' },
  { location: 'Downtown murals', wear: 'Color-blocked primaries, vintage band tees', avoid: 'Neutrals (you vanish)' },
] as const

// Fabric do / don't
const FABRICS_YES = [
  'Linen',
  'Raw or vintage denim',
  'Wool knits + cashmere',
  'Tulle, chiffon, organza',
  'Suede + leather',
  'Heavy cotton, twill',
] as const

const FABRICS_NO = [
  'Cheap polyester satin',
  'Thin jersey tees',
  'Rayon',
  'Sequins',
  'Sheer white cotton midday',
  'Velvet in summer',
] as const

// YES / NO comparisons (each item is a styling rule)
const YES_NO = [
  { yes: 'One statement piece + three quiet supports', no: 'Two equally bold pieces fighting' },
  { yes: 'Texture (knit, suede, linen)', no: 'Busy small prints (moire on camera)' },
  { yes: 'Outfit you already own + love', no: 'Buy-everything-new from one store' },
  { yes: 'Match outfit to the BACKGROUND', no: 'Match outfit to the season' },
  { yes: 'Nude seamless underwear', no: 'Visible bra straps + panty lines' },
  { yes: 'Vintage band tee', no: 'Logo screen-print across the chest' },
] as const

// Outfit stack — story arc
const OUTFIT_STACK = [
  { num: '01', label: 'POLISHED', desc: 'Cream slip dress + tailored blazer. Hero shot material.' },
  { num: '02', label: 'PERSONALITY', desc: 'The texture moment. Knit, denim jacket, suede, vintage.' },
  { num: '03', label: 'STATEMENT', desc: 'Long dress in saturated color, leather, or your sport jersey.' },
] as const

// Parent corner
const PARENT_TIPS = [
  {
    worry: 'Boys who don\'t care.',
    fix: 'Let him pick ONE outfit (his real hoodie, his real boots). Mom picks the other two. He cooperates because he got a win. His outfit usually = parents\' favorite frame.',
  },
  {
    worry: 'Girls who overthink.',
    fix: 'Cap at 3 outfits. 1 hour shopping max. No new clothes within 48 hours of session. New = uncomfortable = stiff on camera.',
  },
  {
    worry: 'Modesty concerns.',
    fix: 'Tell Jennie upfront. She poses around it — no off-shoulder, no high slits, lower angles only. Easy fix when she knows in advance.',
  },
  {
    worry: '"Looks like every other yearbook."',
    fix: 'Fixed by location + light + outfit story — not by poses. Mt Charleston in burgundy wool at golden hour will not look like the gym backdrop. Promise.',
  },
] as const

const NAV = [
  ['Pick a Vibe', '#aesthetics'],
  ['The Stack', '#stack'],
  ['Fabric', '#fabric'],
  ['Color by Location', '#color'],
  ['Yes / No', '#yes-no'],
  ['Parents', '#parents'],
] as const

export default function WhatToWearPage() {
  return (
    <main
      id="main-content"
      className={`${fraunces.variable} ${marker.variable} ${grotesk.variable} overflow-x-hidden`}
    >
      {/* ── 1. Hero ──────────────────────────────────────────────────── */}
      <section
        style={{ backgroundColor: EVERGREEN, color: CREAM }}
        className="pt-28 md:pt-32 pb-16 md:pb-24"
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 text-center">
          <p
            className="text-xs md:text-sm tracking-[0.4em] uppercase mb-4 opacity-70"
            style={{ fontFamily: 'var(--font-grotesk)' }}
          >
            Class of &apos;27 &amp; &apos;28 &nbsp;·&nbsp; Style Guide
          </p>
          <h1
            className="font-[family-name:var(--font-fraunces)] italic leading-[0.9] mb-8"
            style={{ fontSize: 'clamp(64px, 14vw, 220px)', fontWeight: 400, color: CREAM }}
          >
            what to wear
          </h1>
          <p
            className="max-w-2xl mx-auto text-base md:text-lg"
            style={{ fontFamily: 'var(--font-grotesk)', color: `${CREAM}cc` }}
          >
            Eight aesthetics. Six color-matched locations. One photographer
            who&apos;s been styling seniors for 20 years. Scroll for the real
            playbook.
          </p>

          {/* Pill nav */}
          <nav aria-label="On-page sections" className="flex flex-wrap justify-center gap-2 md:gap-3 mt-12">
            {NAV.map(([label, href]) => (
              <a
                key={href}
                href={href}
                className="px-4 py-2 text-xs md:text-sm tracking-[0.15em] uppercase border transition-colors"
                style={{
                  fontFamily: 'var(--font-grotesk)',
                  fontWeight: 500,
                  borderColor: `${CREAM}66`,
                  color: CREAM,
                }}
              >
                {label}
              </a>
            ))}
          </nav>
        </div>
      </section>

      {/* ── 1.5. Mood boards — sketchbook flat-lays ──────────────────── */}
      <Section>
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <p
            className="text-[10px] tracking-[0.3em] uppercase text-charcoal/60 mb-3"
            style={{ fontFamily: 'var(--font-grotesk)' }}
          >
            A Sketchbook
          </p>
          <h2
            className="font-[family-name:var(--font-fraunces)] italic text-charcoal mb-6"
            style={{ fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 400 }}
          >
            Style Notes
          </h2>
          <p className="type-body">
            Two pages from the style notebook. Print, screenshot, send to
            your group chat. Steal the looks.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto">
          {[
            { src: '/images/seniors/moodboards/girls.jpg', label: 'For Her', alt: 'Senior girl style mood board' },
            { src: '/images/seniors/moodboards/boys.jpg', label: 'For Him', alt: 'Senior boy style mood board' },
          ].map((m, i) => (
            <div
              key={m.src}
              className="relative shadow-xl"
              style={{ transform: `rotate(${i === 0 ? '-0.8deg' : '0.8deg'})` }}
            >
              <span
                className="absolute -top-3 left-6 z-10 px-3 py-1 text-[10px] tracking-[0.3em] uppercase font-bold"
                style={{ backgroundColor: CORAL, color: CREAM, fontFamily: 'var(--font-grotesk)' }}
              >
                {m.label}
              </span>
              <div className="relative aspect-[16/9] overflow-hidden bg-warm-gray">
                <Image
                  src={m.src}
                  alt={m.alt}
                  fill
                  sizes="(min-width: 768px) 45vw, 100vw"
                  quality={95}
                  className="object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── 2. Aesthetics grid ───────────────────────────────────────── */}
      <Section id="aesthetics">
        <div className="text-center mb-12 md:mb-16 max-w-2xl mx-auto">
          <p
            className="text-[10px] tracking-[0.3em] uppercase text-charcoal/60 mb-3"
            style={{ fontFamily: 'var(--font-grotesk)' }}
          >
            Step One
          </p>
          <h2
            className="font-[family-name:var(--font-fraunces)] italic text-charcoal mb-6"
            style={{ fontSize: 'clamp(40px, 6vw, 80px)', fontWeight: 400 }}
          >
            Pick a Vibe
          </h2>
          <p className="type-body">
            Don&apos;t pick a style. Find the one that already feels like you.
            Each comes w/ key pieces, color story, and the Las Vegas location
            built for it.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto">
          {AESTHETICS.map((a, i) => (
            <article
              key={a.name}
              style={{ transform: `rotate(${i % 2 === 0 ? '-0.5deg' : '0.5deg'})` }}
            >
              <div className="relative mb-4">
                <VibeCarousel
                  images={a.images}
                  aestheticName={a.name}
                  accent={LIME}
                />
                {/* Marker handwritten label overlay (above carousel) */}
                <span
                  className="absolute top-4 left-4 z-20 px-3 py-1 text-xs tracking-[0.25em] uppercase font-bold pointer-events-none"
                  style={{ backgroundColor: LIME, color: EVERGREEN, fontFamily: 'var(--font-grotesk)' }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span
                  className="absolute bottom-12 right-4 z-20 text-2xl md:text-3xl pointer-events-none"
                  style={{ fontFamily: 'var(--font-marker)', color: CREAM, textShadow: '0 2px 8px rgba(0,0,0,0.6)' }}
                >
                  {a.name.toLowerCase()}
                </span>
              </div>

              <div className="grid grid-cols-[1fr_auto] items-end gap-4 mb-4">
                <h3
                  className="font-[family-name:var(--font-fraunces)] italic text-charcoal leading-none"
                  style={{ fontSize: 'clamp(28px, 3vw, 40px)', fontWeight: 400 }}
                >
                  {a.name}
                </h3>
                <div className="flex gap-1">
                  {a.palette.map((color) => (
                    <span
                      key={color}
                      className="w-5 h-5 md:w-6 md:h-6 rounded-full border border-charcoal/20"
                      style={{ backgroundColor: color }}
                      aria-label={`palette swatch ${color}`}
                    />
                  ))}
                </div>
              </div>
              <p className="type-body text-sm italic mb-4" style={{ color: CORAL }}>
                {a.tagline}
              </p>

              <ul className="grid grid-cols-2 gap-x-4 gap-y-1 type-body text-sm mb-4">
                {a.pieces.map((p) => (
                  <li key={p} className="flex gap-2">
                    <span style={{ color: CORAL }}>·</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>

              <p className="text-xs text-charcoal/70 mb-2" style={{ fontFamily: 'var(--font-grotesk)' }}>
                <span style={{ fontWeight: 700 }}>Boys: </span>
                {a.boy}
              </p>
              <p
                className="text-[10px] tracking-[0.25em] uppercase"
                style={{ fontFamily: 'var(--font-grotesk)', color: CORAL, fontWeight: 700 }}
              >
                Best at: {a.location}
              </p>
            </article>
          ))}
        </div>
      </Section>

      {/* ── 3. Outfit Stack — story arc ──────────────────────────────── */}
      <section id="stack" style={{ backgroundColor: EVERGREEN, color: CREAM }} className="py-24 md:py-32">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <p
              className="text-[10px] tracking-[0.3em] uppercase opacity-60 mb-3"
              style={{ fontFamily: 'var(--font-grotesk)' }}
            >
              Step Two
            </p>
            <h2
              className="font-[family-name:var(--font-fraunces)] italic leading-none mb-6"
              style={{ fontSize: 'clamp(48px, 8vw, 120px)', fontWeight: 400, color: CREAM }}
            >
              Bring 2-3 Looks
            </h2>
            <p style={{ color: `${CREAM}cc`, fontFamily: 'var(--font-grotesk)' }}>
              Pick outfits that talk to each other. Think story arc, not
              variety. Polished → personality → statement.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
            {OUTFIT_STACK.map((o) => (
              <div
                key={o.num}
                className="p-8 md:p-10 text-center"
                style={{ border: `1px solid ${CREAM}33`, backgroundColor: '#243029' }}
              >
                <p
                  className="font-[family-name:var(--font-fraunces)] italic leading-none mb-4"
                  style={{ fontSize: 'clamp(56px, 8vw, 96px)', color: CORAL, fontWeight: 400 }}
                >
                  {o.num}
                </p>
                <p
                  className="text-xs tracking-[0.3em] uppercase mb-4"
                  style={{ fontFamily: 'var(--font-grotesk)', color: LIME, fontWeight: 600 }}
                >
                  {o.label}
                </p>
                <p style={{ color: `${CREAM}cc` }}>{o.desc}</p>
              </div>
            ))}
          </div>

          <p
            className="text-center mt-12 text-xl md:text-2xl max-w-2xl mx-auto"
            style={{ fontFamily: 'var(--font-marker)', color: LIME }}
          >
            one outfit should photograph beautifully WITHOUT the face. that&apos;s the hero shot.
          </p>
        </div>
      </section>

      {/* ── 4. Fabric + Texture ──────────────────────────────────────── */}
      <Section id="fabric" variant="muted">
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <p
            className="text-[10px] tracking-[0.3em] uppercase text-charcoal/60 mb-3"
            style={{ fontFamily: 'var(--font-grotesk)' }}
          >
            Step Three
          </p>
          <h2
            className="font-[family-name:var(--font-fraunces)] italic text-charcoal"
            style={{ fontSize: 'clamp(40px, 6vw, 80px)', fontWeight: 400 }}
          >
            Fabric Matters
          </h2>
          <p className="type-body mt-4">
            Texture beats print. Every time.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-16 max-w-4xl mx-auto">
          <div>
            <p
              className="text-xl md:text-2xl mb-6"
              style={{ fontFamily: 'var(--font-marker)', color: LIME }}
            >
              wear ✓
            </p>
            <ul className="space-y-3">
              {FABRICS_YES.map((f) => (
                <li key={f} className="flex gap-3 items-start">
                  <span style={{ color: LIME, fontWeight: 700 }}>·</span>
                  <span className="type-body">{f}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p
              className="text-xl md:text-2xl mb-6"
              style={{ fontFamily: 'var(--font-marker)', color: CORAL }}
            >
              skip ✗
            </p>
            <ul className="space-y-3">
              {FABRICS_NO.map((f) => (
                <li key={f} className="flex gap-3 items-start">
                  <span style={{ color: CORAL, fontWeight: 700 }}>·</span>
                  <span className="type-body">{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* ── 5. Color theory by location ──────────────────────────────── */}
      <Section id="color">
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <p
            className="text-[10px] tracking-[0.3em] uppercase text-charcoal/60 mb-3"
            style={{ fontFamily: 'var(--font-grotesk)' }}
          >
            Step Four
          </p>
          <h2
            className="font-[family-name:var(--font-fraunces)] italic text-charcoal"
            style={{ fontSize: 'clamp(40px, 6vw, 80px)', fontWeight: 400 }}
          >
            Color by Location
          </h2>
          <p className="type-body mt-4">
            Match your outfit to the BACKGROUND. Not the season.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <ul className="divide-y divide-warm-gray">
            {COLOR_THEORY.map((c) => (
              <li key={c.location} className="py-6 grid md:grid-cols-[1fr_2fr] gap-4 md:gap-8">
                <p
                  className="font-[family-name:var(--font-fraunces)] italic text-charcoal"
                  style={{ fontSize: 'clamp(20px, 2.5vw, 28px)', fontWeight: 400 }}
                >
                  {c.location}
                </p>
                <div className="space-y-2 text-sm">
                  <p>
                    <span
                      className="text-xs tracking-[0.2em] uppercase mr-2"
                      style={{ color: LIME, fontFamily: 'var(--font-grotesk)', fontWeight: 700 }}
                    >Wear:</span>
                    {c.wear}
                  </p>
                  <p>
                    <span
                      className="text-xs tracking-[0.2em] uppercase mr-2"
                      style={{ color: CORAL, fontFamily: 'var(--font-grotesk)', fontWeight: 700 }}
                    >Avoid:</span>
                    {c.avoid}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* ── 6. YES / NO comparisons ─────────────────────────────────── */}
      <Section id="yes-no" variant="muted">
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <p
            className="text-[10px] tracking-[0.3em] uppercase text-charcoal/60 mb-3"
            style={{ fontFamily: 'var(--font-grotesk)' }}
          >
            Quick Reference
          </p>
          <h2
            className="font-[family-name:var(--font-fraunces)] italic text-charcoal"
            style={{ fontSize: 'clamp(40px, 6vw, 80px)', fontWeight: 400 }}
          >
            Yes / No
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-4 md:gap-6 max-w-5xl mx-auto">
          {YES_NO.map((row) => (
            <div
              key={row.yes}
              className="grid grid-cols-2 gap-2 md:gap-3 bg-white p-4 md:p-6"
              style={{ border: '1px solid rgba(0,0,0,0.06)' }}
            >
              <div className="text-center p-3" style={{ backgroundColor: `${LIME}33`, border: `2px solid ${LIME}` }}>
                <p
                  className="text-2xl mb-2"
                  style={{ fontFamily: 'var(--font-marker)', color: '#3a5a1f' }}
                >yes ✓</p>
                <p className="type-body text-xs">{row.yes}</p>
              </div>
              <div className="text-center p-3" style={{ backgroundColor: `${CORAL}1a`, border: `2px solid ${CORAL}` }}>
                <p
                  className="text-2xl mb-2"
                  style={{ fontFamily: 'var(--font-marker)', color: CORAL }}
                >no ✗</p>
                <p className="type-body text-xs">{row.no}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── 7. Parents corner ────────────────────────────────────────── */}
      <section id="parents" style={{ backgroundColor: EVERGREEN, color: CREAM }} className="py-24 md:py-32">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <p
              className="text-[10px] tracking-[0.3em] uppercase opacity-60 mb-3"
              style={{ fontFamily: 'var(--font-grotesk)' }}
            >
              From One Senior Mom to Another
            </p>
            <h2
              className="font-[family-name:var(--font-fraunces)] italic leading-none mb-6"
              style={{ fontSize: 'clamp(40px, 7vw, 100px)', fontWeight: 400, color: CREAM }}
            >
              Parents.
            </h2>
            <p style={{ color: `${CREAM}cc`, fontFamily: 'var(--font-grotesk)' }}>
              The four anxieties I hear every consultation, and how we
              handle each one before the session.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
            {PARENT_TIPS.map((p) => (
              <div
                key={p.worry}
                className="p-8"
                style={{ backgroundColor: '#243029', border: `1px solid ${CREAM}22` }}
              >
                <p
                  className="text-lg md:text-xl mb-4"
                  style={{ fontFamily: 'var(--font-marker)', color: LIME }}
                >
                  &ldquo;{p.worry}&rdquo;
                </p>
                <p style={{ color: `${CREAM}cc`, fontFamily: 'var(--font-grotesk)' }} className="text-sm">
                  {p.fix}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. CTA — book ─────────────────────────────────────────────── */}
      <section style={{ backgroundColor: CREAM }} className="py-24 md:py-32 text-center px-6">
        <p
          className="text-[10px] tracking-[0.3em] uppercase text-charcoal/60 mb-6"
          style={{ fontFamily: 'var(--font-grotesk)' }}
        >
          You picked your vibe?
        </p>
        <h2
          className="font-[family-name:var(--font-fraunces)] italic tracking-tight leading-none text-charcoal mb-8"
          style={{ fontSize: 'clamp(56px, 12vw, 180px)', fontWeight: 400 }}
        >
          let&apos;s shoot it.
        </h2>
        <p
          className="max-w-xl mx-auto mb-12 text-charcoal/70"
          style={{ fontFamily: 'var(--font-grotesk)' }}
        >
          Pick your collection. Grab a date. $200 retainer holds your spot.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
          <Link
            href="/seniors/info#pricing"
            style={{ backgroundColor: EVERGREEN, color: CREAM }}
            className="inline-block px-8 py-4 text-xs tracking-[0.25em] uppercase hover:opacity-90 transition-opacity w-full sm:w-auto font-semibold"
          >
            See Pricing &amp; Book
          </Link>
          <Link
            href="/seniors"
            style={{ borderColor: EVERGREEN, color: EVERGREEN }}
            className="inline-block border-2 px-8 py-4 text-xs tracking-[0.25em] uppercase hover:bg-charcoal hover:text-off-white transition-colors w-full sm:w-auto"
          >
            See the Gallery
          </Link>
        </div>
      </section>
    </main>
  )
}
