/**
 * Families Landing - /families
 *
 * Editorial sales page tuned for trust + conversion. Rebuilt after a six-agent
 * review pass (website strategist, editorial designer, photographer, UX/UI,
 * typographer, copywriter). Core fixes from that pass:
 *   - Photos lead, not text: full-bleed hero + a "what your gallery looks like"
 *     spread + a wall-art section so the invisible product becomes visible.
 *   - Emotion first: hero headline carries the fleeting-time ache, not the
 *     deliverable ("wall print").
 *   - One warm display serif (Fraunces roman + italic). Bodoni/Arapey dropped
 *     from this page. Scale pushed to editorial size.
 *   - Scarcity + risk-reversal surfaced next to pricing, not buried in the FAQ.
 *   - One dark interlude for tonal contrast against the cream.
 *
 * Order: hero -> portfolio -> promise -> testimonial -> meet Jennie ->
 *   gallery preview -> experience -> investment (+ scarcity + risk) ->
 *   wall art -> CTA -> testimonial -> FAQ -> dark close.
 *
 * REPLACE MARKERS (search "REPLACE" before publishing):
 *   - Real photos: hero, meet-jennie, testimonial, wall-art image slots
 *   - Testimonial names + quotes (Jennie is sending real ones)
 *   - "800+ families" + "5.0" numbers (use true counts)
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import Section from '@/components/layout/Section'
import GalleryGrid from '@/components/gallery/GalleryGrid'
import ScrollFade from '@/components/ui/ScrollFade'
import { familyImages } from '@/data/galleries'

export const metadata: Metadata = {
  title: 'Las Vegas Family Photographer | Jennie Slade',
  description:
    'Editorial family portraits in Las Vegas. 800+ families since 2007. The photographs your kids will want back when they are thirty.',
  openGraph: {
    title: 'Las Vegas Family Photographer | Jennie Slade',
    description:
      'Editorial family portraits in Las Vegas. 800+ families since 2007. The photographs your kids will want back when they are thirty.',
  },
}

// Fluid editorial type scale (px targets in comments). Display carries real
// size now — the flatness was a scale problem, not a font problem.
const DISPLAY_XL = 'clamp(2.75rem, 7vw, 5.5rem)' // hero ~44 -> 88
const DISPLAY_L = 'clamp(2.25rem, 5vw, 4rem)' //   H2   ~36 -> 64
const DISPLAY_M = 'clamp(1.75rem, 3.5vw, 2.75rem)' // sub  ~28 -> 44
const SERIF = 'var(--font-display)'

// Booking now runs entirely through Pixifi (decided 2026-07-23; Cal.com retired).
// One Pixifi Booking Page holds all three collections as services in a 3-column
// layout, so every "Check availability" button points to this single URL. Pixifi
// handles availability, contract e-sign, deposit, invoice, and reminder emails,
// and shows its own confirmation page afterwards (no redirect back to us).
const BOOKING_URL =
  'https://jenniesladephoto.studio-booking.com/booking/jenniesladefamily/'

// Booking-flow microcopy. The Pixifi page is set to Auto-Booking, so the date
// confirms instantly — the old "I confirm within one business day" promise is
// no longer true. Deliberately silent on *when* the deposit is charged so the
// line stays accurate regardless of the Payment Terms template.
const BOOKING_NOTE =
  'Choose your collection and an open date. Your date is confirmed on the spot, and your contract and invoice arrive by email.'

const PACKAGES = [
  {
    name: 'Signature',
    bestFor: 'A focused session for small families and busy schedules.',
    outcome: 'Enough for a gallery wall grouping and holiday cards.',
    price: '$600',
    duration: '45 minutes',
    lines: ['40 edited images', 'up to 6 people', 'one location'],
    popular: false,
  },
  {
    name: 'Editorial',
    bestFor: 'The full experience. Room to breathe, room to change outfits.',
    outcome: 'Enough wall art for a whole hallway, plus every candid.',
    price: '$795',
    duration: '75 minutes',
    lines: ['75 edited images', 'up to 6 people', 'one location', 'styling guide'],
    popular: true,
  },
  {
    name: 'Heirloom',
    bestFor: 'Milestone years, the whole extended crew, or the big framed piece.',
    outcome: 'The over-the-couch statement print and an album to keep.',
    price: '$995',
    duration: '1.5 to 2 hours',
    lines: [
      '100+ edited images',
      'up to 6 people',
      'one location plus a nearby second stop',
      'style consultation beforehand',
    ],
    popular: false,
  },
]

const EXPERIENCE = [
  {
    n: '01',
    title: 'Pick your date',
    body: BOOKING_NOTE,
  },
  {
    n: '02',
    title: 'Plan together',
    body: 'A style guide, location scouting notes, and any questions answered. I want this session to feel like you.',
  },
  {
    n: '03',
    title: 'The session',
    body: 'A mix of gentle posing, walking and talking, and the candid in between. I will put you in the good light and guide you, then let the real moments happen on their own.',
  },
  {
    n: '04',
    title: 'Your gallery',
    body: 'A private online gallery within two weeks. Download, print, and hold forever.',
  },
]

const FAQ = [
  {
    q: 'What do we wear?',
    a: 'I built a full style quiz so you never have to guess. It suggests palettes, fabrics, and full outfits by family type. Link at the bottom of this page.',
  },
  {
    q: 'Where do we shoot?',
    a: 'Red Rock Canyon for gold-hour desert light (October to April). Valley of Fire for saturated warmth and negative space. Summerlin trails and Floyd Lamb Park for green and water. Your home for lifestyle sessions with newborns and toddlers. I will send two or three options based on your family, the season, and what you want on the wall.',
  },
  {
    q: 'How long until we get the photos?',
    a: 'Two weeks or less. Your private gallery arrives with download rights on every image.',
  },
  {
    q: 'What if a kid melts down?',
    a: 'They will, and that is completely normal. I raised five of my own, so I have seen every kind of meltdown there is. I plan for it: buffer built into every session and a rhythm that expects at least one good breakdown per shoot. The shots right after a meltdown are usually the ones that end up framed. I do not need your kids to perform. I just need them to be with you.',
  },
  {
    q: 'I hate having my photo taken. Can you still shoot us?',
    a: 'Yes, and honestly, most of the moms I work with feel the same. I mix easy posing with movement, so you get flattering shots without ever just stiffly staring down a lens. A lot of what I do is get you laughing at your kid.',
  },
  {
    q: 'My partner is not into this. How do we make it not miserable?',
    a: 'I keep sessions short and moving. Dads and reluctant partners usually forget the camera is there within ten minutes. If it helps, I can send my prep note directly to them.',
  },
  {
    q: 'What if the weather is bad or the wind is really blowing?',
    a: 'If the weather does not cooperate, we find another date that works. Vegas gives us plenty of second chances.',
  },
  {
    q: 'How do I prep my kids so this does not feel like a nightmare?',
    a: 'Tell them we are going on a walk with a lady who has a camera and might make them laugh. No haircuts within a week of the session. No new shoes. Feed them right before. That is it. I take it from there.',
  },
  {
    q: 'Do you help with prints and wall art after?',
    a: 'Yes. Your gallery has a print shop built in, with sizes and framing that match your home, and I can help you design a wall arrangement or an album. Most families print something. The pictures should not just live on your phone.',
  },
  {
    q: 'How do prints work?',
    a: 'Every collection includes your private online gallery of edited images, so the pictures are yours. Prints and wall art are a separate purchase, ordered right from that gallery in professional, archival quality so they last.',
  },
  {
    q: 'What about extended family or grandparents?',
    a: 'Add extra guests for $50 per person over 6. Tell me at booking so I can plan the session flow.',
  },
]

const TESTIMONIAL_LEAD = {
  quote:
    'I honestly have no idea how you got so many good shots! I was hoping for one good one and now I have so many priceless pictures. Thank you!',
  name: 'Karla',
  location: 'Las Vegas',
  when: '',
}

const TESTIMONIAL_CLOSE = {
  quote:
    'Holy cow... that was the easiest family session I have ever had! Thank you Jennie!',
  name: 'Ashley',
  location: 'Las Vegas',
  when: '',
}

export default function FamiliesPage() {
  return (
    <main
      id="main-content"
      className="bg-[color:var(--color-off-white)] text-[color:var(--color-charcoal)]"
      // Vogue-editorial type + "Editorial Stark" palette, scoped to this page.
      // Zodiak display / Inter body+eyebrows / Bodoni italic accent, over a
      // near-black warm ink (#1A1714) that lets the Didone hairlines snap, a
      // cleaner cream, and an oxblood accent replacing boho terracotta. Rest of
      // the site keeps its own warm-taupe tokens.
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
      {/* 1. HERO — full-bleed, oversized headline set into the image. The
          transparent site header overlays this by design. */}
      <section className="relative w-full min-h-[88vh] md:min-h-[92vh] overflow-hidden bg-[color:var(--color-warm-gray-light)]">
        {/* REPLACE: /public/families/hero.jpg — the single most emotional real
            candid Jennie owns (movement, laughter, touch — not a posed lineup). */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/gallery/families/hoogland/hoogland-142.jpg"
          alt="Extended family walking together along a path with Red Rock Canyon behind them, Las Vegas, by Jennie Slade"
          className="absolute inset-0 w-full h-full object-cover object-[center_60%]"
        />
        {/* Directional bottom-left scrim only — keeps type legible without
            dimming the whole frame like an e-comm gradient. */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"
          aria-hidden
        />
        <div className="absolute inset-x-0 bottom-0 p-6 pb-10 md:p-16 md:pb-16 text-[color:var(--color-off-white)]">
          <p className="type-heading text-[color:var(--color-off-white)]/90 mb-4">
            Las Vegas &middot; Family portraiture &middot; Since 2007
          </p>
          <h1
            className="max-w-4xl font-normal leading-[1.02]"
            style={{ fontFamily: SERIF, fontSize: DISPLAY_XL, letterSpacing: '-0.015em' }}
          >
            They will not be this
            <br className="hidden sm:block" /> small next year.
          </h1>
          <p className="mt-5 md:mt-6 max-w-xl type-body text-[color:var(--color-off-white)]/95 text-base md:text-lg">
            Editorial family portraits in Las Vegas. Nineteen years behind the
            camera, five kids of my own who are mostly grown now, so I know
            exactly how fast it goes.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-4">
            <a
              href="#investment"
              className="group inline-flex items-center gap-3 px-8 py-3.5 bg-[color:var(--color-off-white)] text-[color:var(--color-charcoal)] type-heading hover:bg-transparent hover:text-[color:var(--color-off-white)] border border-[color:var(--color-off-white)] transition-colors"
            >
              Check availability
              <span className="w-6 h-px bg-current transition-all group-hover:w-10" aria-hidden />
            </a>
            <p className="type-heading text-[color:var(--color-off-white)]/85">
              Las Vegas families since 2007 &middot; Galleries in two weeks
            </p>
          </div>
        </div>
      </section>

      {/* 2. PORTFOLIO — photographs immediately after the hero (rhythm fix:
          never make a buyer read stats before seeing the work). */}
      <Section>
        <ScrollFade>
          <div className="py-4 md:py-8">
            <p className="type-heading text-center mb-3">Recent families</p>
            <p className="type-body text-sm text-center text-[color:var(--color-gray)] mb-10">
              Tap any image to view it full screen.
            </p>
            <GalleryGrid images={familyImages} aspectRatio="3/2" />
          </div>
        </ScrollFade>
      </Section>

      {/* 3. EDITORIAL PROMISE — pulled left, oversized, biggest non-hero moment. */}
      <Section>
        <ScrollFade>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-start py-8 md:py-16">
            <div className="md:col-span-6">
              <p className="type-heading mb-5">Family sessions</p>
              <h2
                className="font-normal leading-[1.02] text-[color:var(--color-charcoal)]"
                style={{ fontFamily: SERIF, fontSize: DISPLAY_L, letterSpacing: '-0.015em' }}
              >
                The ones you
                <br /> keep.
              </h2>
            </div>
            <div className="md:col-span-6 md:pt-3">
              <p className="type-body text-lg leading-relaxed">
                Since 2007, I have photographed over 800 Las Vegas families. Some
                I meet through a newborn session, then again for senior year. What
                I make for you is not a set of Instagram squares. It is a record
                of who your family is, right now, in the exact way you already
                know them.
              </p>
              <p
                className="text-xl md:text-2xl italic mt-8 leading-snug text-[color:var(--color-charcoal)]"
                style={{ fontFamily: SERIF }}
              >
                For families who want more than another folder of photos nobody
                opens.
              </p>
            </div>
          </div>
        </ScrollFade>
      </Section>

      {/* 4. LEAD TESTIMONIAL — first proof point. REPLACE quote + image. */}
      <Section>
        <ScrollFade>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14 items-center py-4 md:py-10">
            <div className="md:col-span-5">
              <div className="relative aspect-[4/5] overflow-hidden bg-[color:var(--color-warm-gray-light)]">
                {/* REPLACE: /public/families/testimonial-1.jpg — the quoted family. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/gallery/families/hoogland/hoogland-102.jpg"
                  alt="Mother holding her baby at a Las Vegas family session by Jennie Slade"
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>
            <div className="md:col-span-7">
              <p className="type-heading mb-6">In their words</p>
              <blockquote
                className="italic leading-[1.25] font-normal"
                style={{ fontFamily: SERIF, fontSize: DISPLAY_M }}
              >
                &ldquo;{TESTIMONIAL_LEAD.quote}&rdquo;
              </blockquote>
              <p className="type-heading mt-6">
                {[TESTIMONIAL_LEAD.name, TESTIMONIAL_LEAD.location, TESTIMONIAL_LEAD.when]
                  .filter(Boolean)
                  .join(' · ')}
              </p>
            </div>
          </div>
        </ScrollFade>
      </Section>

      {/* 5. MEET JENNIE — overlap composition (offset second image = tension). */}
      <Section variant="muted">
        <ScrollFade>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-center py-6 md:py-12">
            <div className="md:col-span-5">
              <div className="relative aspect-[4/5] overflow-hidden bg-[color:var(--color-warm-gray)]">
                {/* Jennie's own family. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/jennie-family.jpg"
                  alt="Jennie Slade with her own family, Las Vegas family photographer"
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>
            <div className="md:col-span-7 md:pl-6">
              <p className="type-heading mb-4">Hi, I&rsquo;m Jennie</p>
              <h2
                className="font-normal leading-[1.08] mb-6"
                style={{ fontFamily: SERIF, fontSize: DISPLAY_M, letterSpacing: '-0.01em' }}
              >
                Nineteen years behind the camera. Five kids of my own, mostly grown now.
              </h2>
              <p className="type-body text-lg leading-relaxed mb-4">
                I have photographed more than 800 Las Vegas families since 2007.
                Newborns I met at three days old are now applying to college and
                letting me photograph them again for senior year. I know how fast
                this goes because I have watched it happen five times in my own
                house.
              </p>
              <p className="type-body text-lg leading-relaxed">
                My kids keep me honest. I bring snacks. I know the light. I will
                follow your two-year-old up a boulder in a linen dress and get the
                shot.
              </p>
            </div>
          </div>
        </ScrollFade>
      </Section>

      {/* 6. WHAT YOUR GALLERY LOOKS LIKE — show the (otherwise invisible)
          deliverable. Editorial asymmetric spread of one real session. */}
      <Section>
        <ScrollFade>
          <div className="py-6 md:py-12">
            <div className="max-w-2xl mb-10 md:mb-14">
              <p className="type-heading mb-4">Your gallery</p>
              <h2
                className="font-normal leading-[1.05] mb-5"
                style={{ fontFamily: SERIF, fontSize: DISPLAY_M, letterSpacing: '-0.01em' }}
              >
                Here is what you actually go home with.
              </h2>
              <p className="type-body text-lg leading-relaxed">
                Not a highlight reel. The whole story of one afternoon, the way it
                really happened. Every family leaves with a full gallery like this
                one, downloadable and yours to print.
              </p>
            </div>
            {/* One real session — the Hoogland family. The whole story of one
                afternoon: the group, the walk, the details, the little ones. */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              {[
                { s: 'hoogland-135.jpg', a: 'The whole family with Red Rock Canyon behind them', c: 'col-span-2 row-span-2 aspect-square md:aspect-auto' },
                { s: 'hoogland-102.jpg', a: 'Mother holding her baby', c: 'aspect-[3/4]' },
                { s: 'hoogland-118.jpg', a: 'Toddler in a white dress with pink bows', c: 'aspect-[3/4]' },
                { s: 'hoogland-027.jpg', a: 'A daughter laughing in the desert light', c: 'aspect-[3/4]' },
                { s: 'hoogland-115.jpg', a: 'A young family sharing a pregnancy announcement', c: 'aspect-[3/4]' },
                { s: 'hoogland-101.jpg', a: 'The family walking together, candid', c: 'col-span-2 aspect-[3/2]' },
                { s: 'hoogland-076.jpg', a: 'The family gathered under a desert tree', c: 'aspect-[3/2] col-span-2 md:col-span-1 md:aspect-[3/4]' },
                { s: 'hoogland-154.jpg', a: 'The adult kids and their partners at Red Rock', c: 'aspect-[3/4]' },
              ].map((img) => (
                <div key={img.s} className={`${img.c} overflow-hidden bg-[color:var(--color-warm-gray-light)]`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`/images/gallery/families/hoogland/${img.s}`}
                    alt={img.a}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </ScrollFade>
      </Section>

      {/* 7. NUMBERED EXPERIENCE — with oversized ghost numerals behind steps. */}
      <Section>
        <ScrollFade>
          <div className="py-6 md:py-14">
            <p className="type-heading text-center mb-14">How this goes</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-14">
              {EXPERIENCE.map((step) => (
                <div key={step.n} className="relative pl-4">
                  {/* Ghost numeral — depth for zero new fonts. */}
                  <span
                    aria-hidden
                    className="absolute -top-6 -left-2 select-none leading-none text-[color:var(--color-terracotta)]/10"
                    style={{ fontFamily: SERIF, fontSize: '7rem' }}
                  >
                    {step.n}
                  </span>
                  <div className="relative">
                    <h3
                      className="mb-2 text-2xl md:text-3xl font-normal"
                      style={{ fontFamily: SERIF }}
                    >
                      {step.title}
                    </h3>
                    <p className="type-body text-base leading-relaxed max-w-md">{step.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollFade>
      </Section>

      {/* 8. INVESTMENT — Editorial tier elevated. Scarcity + risk-reversal live
          right here, not buried in the FAQ. */}
      <Section id="investment" className="scroll-mt-24 md:scroll-mt-28">
        <ScrollFade>
          <div className="py-6 md:py-12 scroll-mt-24">
            <div className="text-center mb-6 max-w-2xl mx-auto">
              <p className="type-heading mb-4">Investment</p>
              <h2
                className="font-normal leading-tight mb-5"
                style={{ fontFamily: SERIF, fontSize: DISPLAY_M }}
              >
                What it costs, and what you get.
              </h2>
              <p className="type-body text-base text-[color:var(--color-gray)]">
                My families come back year after year, so my collections are built
                for that: enough time to actually shoot and a private gallery of
                edited images that is yours to keep. Professional prints and wall
                art are available separately whenever you want them.
              </p>
            </div>

            {/* Gentle scarcity, no invented specifics. */}
            <p className="text-center type-heading text-[color:var(--color-terracotta)] mb-10">
              Fall sessions book early
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-0">
              {PACKAGES.map((p) => (
                <div
                  key={p.name}
                  className={
                    p.popular
                      ? 'relative px-6 md:px-10 py-12 text-center bg-[color:var(--color-warm-gray-light)]/60 md:scale-[1.04] md:shadow-sm z-10'
                      : 'relative px-6 md:px-10 py-10 text-center md:border-x md:border-[color:var(--color-warm-gray)] md:-mx-px'
                  }
                >
                  {p.popular && (
                    <p className="type-heading text-[color:var(--color-terracotta)] mb-4">
                      Most booked
                    </p>
                  )}
                  <p className="type-heading mb-3">{p.name}</p>
                  <p className="text-sm italic text-[color:var(--color-gray)] mb-5 px-2" style={{ fontFamily: SERIF }}>
                    {p.bestFor}
                  </p>
                  <div
                    className="font-normal leading-none mb-2"
                    style={{ fontFamily: SERIF, fontSize: 'clamp(2.5rem, 4vw, 3.5rem)' }}
                  >
                    {p.price}
                  </div>
                  <p className="type-body text-sm text-[color:var(--color-gray)] mb-4">{p.duration}</p>
                  <p className="type-body text-sm mb-6 px-1 text-[color:var(--color-charcoal)]">
                    {p.outcome}
                  </p>
                  <div className="w-6 h-px bg-[color:var(--color-warm-gray)] mx-auto mb-6" />
                  <ul className="type-body text-sm space-y-2">
                    {p.lines.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                    <li>Private online gallery</li>
                  </ul>
                  <div className="mt-8">
                    <a
                      href={BOOKING_URL}
                      className="type-heading border-b border-[color:var(--color-charcoal)] pb-1 hover:opacity-70 transition-opacity"
                    >
                      Check availability
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Risk-reversal chips — the objection-crushers, at the moment of
                hesitation. */}
            <div className="flex flex-wrap justify-center gap-3 mt-12">
              {[
                'Bad weather? We will find another date.',
                'Your edited digital gallery, yours to keep.',
                'Private gallery in two weeks.',
              ].map((chip) => (
                <span
                  key={chip}
                  className="type-body text-xs md:text-sm px-4 py-2 border border-[color:var(--color-warm-gray)] rounded-full text-[color:var(--color-charcoal)]"
                >
                  {chip}
                </span>
              ))}
            </div>

            <p className="text-xs text-center text-[color:var(--color-gray)] mt-10 px-4 leading-relaxed">
              Add-ons: extra guests $50 per person over 6 &nbsp;&middot;&nbsp; styling
              consult $200 &nbsp;&middot;&nbsp; second location $200 &nbsp;&middot;&nbsp; rush
              72hr gallery $150
            </p>
            <p className="text-xs text-center text-[color:var(--color-gray)] mt-4">
              {BOOKING_NOTE}
            </p>
          </div>
        </ScrollFade>
      </Section>

      {/* 9. WALL ART — the physical product the page keeps promising. */}
      <Section variant="muted">
        <ScrollFade>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14 items-center py-6 md:py-12">
            <div className="md:col-span-7">
              <p className="type-heading mb-4">After the gallery</p>
              <h2
                className="font-normal leading-[1.08] mb-5"
                style={{ fontFamily: SERIF, fontSize: DISPLAY_M, letterSpacing: '-0.01em' }}
              >
                Off the phone. Onto the wall.
              </h2>
              <p className="type-body text-lg leading-relaxed mb-4">
                The digitals should not just live in a folder you never open. Every
                gallery opens into a print shop with sizes and framing matched to
                your home, and I will design a wall arrangement or an heirloom
                album with you if you want one.
              </p>
              <p className="type-body text-base leading-relaxed text-[color:var(--color-gray)]">
                Archival prints, gallery-wrapped canvas, linen albums. The kind of
                thing your kids fight over in thirty years.
              </p>
            </div>
            <div className="md:col-span-5">
              <div className="relative aspect-[4/3] overflow-hidden bg-[color:var(--color-warm-gray)]">
                {/* REPLACE: /public/families/wall-art.jpg — a framed print or album
                    styled in a real home. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/gallery/families/hoogland/hoogland-135.jpg"
                  alt="Large family portrait with Red Rock Canyon behind, Las Vegas, by Jennie Slade"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </ScrollFade>
      </Section>

      {/* 10. PRIMARY CTA. */}
      <Section>
        <div className="max-w-3xl mx-auto py-14 md:py-24 text-center">
          <p className="type-heading mb-4">Before fall fills up</p>
          <h2
            className="font-normal leading-tight mb-8"
            style={{ fontFamily: SERIF, fontSize: DISPLAY_L }}
          >
            Let&rsquo;s get your family on the calendar.
          </h2>
          <p className="type-body text-lg mb-10 max-w-xl mx-auto">
            Fall sessions book early. If you are hoping for October or November,{' '}
            <a
              href="https://ig.me/m/jenniesladephoto"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[color:var(--color-terracotta)] underline underline-offset-4 decoration-1 hover:opacity-70 transition-opacity"
            >
              message me now
            </a>{' '}
            and let&rsquo;s find your date.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a
              href="#investment"
              className="group inline-flex items-center gap-3 px-10 py-4 bg-[color:var(--color-charcoal)] text-[color:var(--color-off-white)] type-heading hover:bg-[color:var(--color-terracotta)] transition-colors"
            >
              Check availability
              <span className="w-6 h-px bg-current transition-all group-hover:w-10" aria-hidden />
            </a>
            <Link
              href="/what-to-wear"
              className="type-heading border-b border-[color:var(--color-charcoal)] pb-1 text-[color:var(--color-charcoal)] hover:opacity-70 transition-opacity"
            >
              Get the style quiz
            </Link>
          </div>
          <p className="text-xs text-[color:var(--color-gray)] mt-6">
            {BOOKING_NOTE}
          </p>
        </div>
      </Section>

      {/* 11. SECOND TESTIMONIAL — short pull-quote. */}
      <Section>
        <div className="max-w-3xl mx-auto py-4 md:py-10 text-center">
          <blockquote
            className="italic leading-[1.3] font-normal text-[color:var(--color-charcoal)]"
            style={{ fontFamily: SERIF, fontSize: DISPLAY_M }}
          >
            &ldquo;{TESTIMONIAL_CLOSE.quote}&rdquo;
          </blockquote>
          <p className="type-heading mt-6">
            {[TESTIMONIAL_CLOSE.name, TESTIMONIAL_CLOSE.location, TESTIMONIAL_CLOSE.when]
              .filter(Boolean)
              .join(' · ')}
          </p>
        </div>
      </Section>

      {/* 12. FAQ. */}
      <Section>
        <div className="max-w-3xl mx-auto py-6 md:py-14">
          <p className="type-heading text-center mb-10">Before you book</p>
          <div className="divide-y divide-[color:var(--color-warm-gray)] border-t border-b border-[color:var(--color-warm-gray)]">
            {FAQ.map((item) => (
              <details key={item.q} className="group py-5">
                <summary className="flex justify-between items-baseline cursor-pointer list-none gap-6">
                  <span className="type-body text-base md:text-lg">{item.q}</span>
                  <span
                    aria-hidden
                    className="type-heading text-[color:var(--color-gray)] transition-opacity group-open:opacity-40 shrink-0"
                  >
                    <span
                      className="w-6 h-px bg-[color:var(--color-gray)] transition-transform group-open:rotate-90 inline-block"
                      aria-hidden
                    />
                  </span>
                </summary>
                <p className="type-body text-base mt-3 leading-relaxed pr-10 md:pr-16">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </Section>

      {/* 13. DARK CLOSE — the one tonal pivot. Oversized italic, cream on charcoal. */}
      <section className="bg-[color:var(--color-charcoal)] text-[color:var(--color-off-white)]">
        <div className="max-w-3xl mx-auto py-24 md:py-36 text-center px-6">
          <p className="type-heading text-[color:var(--color-off-white)]/70 mb-8">
            Not the photos you delete off your phone
          </p>
          <p
            className="italic leading-[1.15] mb-12"
            style={{ fontFamily: SERIF, fontSize: DISPLAY_L, letterSpacing: '-0.01em' }}
          >
            Photographs your kids will want when they are thirty.
          </p>
          <a
            href="#investment"
            className="group inline-flex items-center gap-3 type-heading border-b border-[color:var(--color-off-white)] pb-1 text-[color:var(--color-off-white)] hover:opacity-70 transition-opacity"
          >
            See dates and collections
            <span className="w-6 h-px bg-current transition-all group-hover:w-10" aria-hidden />
          </a>
        </div>
      </section>

      {/* Sticky mobile CTA. Hidden on desktop. */}
      <div
        className="fixed bottom-0 inset-x-0 md:hidden z-40 bg-[color:var(--color-off-white)]/95 backdrop-blur border-t border-[color:var(--color-warm-gray)] px-4 py-3 flex items-center gap-3"
        aria-label="Booking shortcut"
      >
        <div className="flex-1">
          <p className="type-heading">From $600</p>
          <p className="text-base font-normal leading-tight text-[color:var(--color-charcoal)]" style={{ fontFamily: SERIF }}>
            Family sessions
          </p>
        </div>
        <a
          href="#investment"
          className="px-5 py-3 bg-[color:var(--color-charcoal)] text-[color:var(--color-off-white)] type-heading hover:bg-[color:var(--color-terracotta)] transition-colors"
        >
          Check availability
        </a>
      </div>
      <div className="h-20 md:hidden" aria-hidden />
    </main>
  )
}
