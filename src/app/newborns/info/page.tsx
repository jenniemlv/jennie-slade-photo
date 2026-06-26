/**
 * Newborn Info Hub — /newborns/info
 *
 * Lifestyle in-home newborn session landing page.
 * Hero, story, transparent pricing, gallery, testimonials, FAQ, dual CTA
 * (book + download PDF guides).
 *
 * Server Component. Static content only.
 */

import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Section from '@/components/layout/Section'

export const metadata: Metadata = {
  title: 'Lifestyle Newborn Sessions | Las Vegas | Jennie Slade',
  description:
    'In-home lifestyle newborn photography in Las Vegas. Three transparent collections starting at $475. View the session guide, see investment details, and reserve your date.',
  openGraph: {
    title: 'Lifestyle Newborn Sessions | Jennie Slade Photography',
    description:
      'Relaxed, in-home newborn photography for your growing family. Sessions begin at $475.',
  },
}

// Pricing pulled from JSlade-Newborn-Investment-2026.pdf
const COLLECTIONS = [
  {
    name: 'The Mini',
    price: '$475',
    duration: '30-minute in-home session',
    images: '15 hand-edited images',
    note: 'Perfect for a second or third baby',
    highlight: false,
  },
  {
    name: 'The Lifestyle',
    price: '$750',
    duration: '90-minute in-home session',
    images: '40 hand-edited images',
    note: 'My signature session — most loved',
    highlight: true,
  },
  {
    name: 'The Heirloom',
    price: '$1,250',
    duration: '2-hour in-home session',
    images: '60+ hand-edited images + $200 album credit',
    note: 'Unhurried, priority turnaround',
    highlight: false,
  },
] as const

const PROCESS = [
  {
    step: '01',
    name: 'Reach out',
    body:
      'Email me during your second or third trimester. Share your due date and the collection you are drawn to. We will pencil in a tentative window.',
  },
  {
    step: '02',
    name: 'Reserve',
    body:
      'A signed contract and $200 retainer hold your date. The retainer applies to your collection total.',
  },
  {
    step: '03',
    name: 'Welcome baby',
    body:
      'Once your little one arrives, message me and we lock in the actual session day around feeding and sleep.',
  },
  {
    step: '04',
    name: 'Soak it in',
    body:
      'We shoot at your home, mid-morning, at baby\'s pace. Your gallery arrives within about ten days.',
  },
] as const

const FAQS = [
  {
    q: 'When should we schedule the session?',
    a: 'The classic newborn window is the first two to three weeks. Babies are sleepiest and curl up most beautifully then. Past three weeks is still right on time — older newborns photograph just as well, the energy is just a little different.',
  },
  {
    q: 'What is a lifestyle session vs. posed studio?',
    a: 'I shoot in your home, with natural window light, no props or stiff posing. I will gently guide you closer to the light, but mostly I capture the real moments — feeding, snuggling, siblings meeting baby. Your house is the studio.',
  },
  {
    q: 'What if baby comes early or late?',
    a: 'Newborns keep their own calendars. We pencil in a tentative date during pregnancy and lock in the real one once your little one is here. There is no fee to shift the date when baby decides.',
  },
  {
    q: 'How long is the session and how many images do we get?',
    a: 'The signature Lifestyle session is 90 minutes with 40 hand-edited images. The Mini is 30 minutes with 15 images. The Heirloom is two hours with 60+ images plus an album credit.',
  },
  {
    q: 'When do we see the photos?',
    a: 'Full galleries are typically ready within ten days. A sneak peek arrives within 48 hours so you have something to hold onto right away. Heirloom collection clients get priority turnaround.',
  },
  {
    q: 'What about siblings, partners, and pets?',
    a: 'All included. Siblings are always invited at no extra fee. Pets are encouraged. Every session already includes hand-edited color and black-and-white images.',
  },
  {
    q: 'Can we upgrade after we see the gallery?',
    a: 'Yes. You can always move up a collection once your images are delivered. Extra detailed edits, Fresh 48 add-ons, and rush delivery are all available a la carte.',
  },
] as const

// Curated photos from /public/images/newborn/
const GALLERY = [
  { src: '/images/newborn/new-mom-cheek.jpg', alt: 'Mother holding newborn close', orientation: 'tall' },
  { src: '/images/newborn/new-sibling-hands.jpg', alt: 'Siblings reaching for newborn', orientation: 'wide' },
  { src: '/images/newborn/new-bw-cover.jpg', alt: 'Sleeping newborn in black and white', orientation: 'wide' },
  { src: '/images/newborn/new-siblings-looking.jpg', alt: 'Siblings looking at newborn', orientation: 'tall' },
  { src: '/images/newborn/new-orange-bow.jpg', alt: 'Newborn with orange bow', orientation: 'tall' },
  { src: '/images/newborn/new-crib.jpg', alt: 'Newborn in white crib', orientation: 'wide' },
  { src: '/images/newborn/new-mom-mauve.jpg', alt: 'Newborn in mother\'s arms', orientation: 'tall' },
  { src: '/images/newborn/new-family-dog.jpg', alt: 'Family with newborn and dog', orientation: 'wide' },
  { src: '/images/newborn/new-parents-baby.jpg', alt: 'Parents with newborn', orientation: 'tall' },
] as const

export default function NewbornInfoPage() {
  return (
    <main id="main-content" className="pt-32 md:pt-40">
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <Section>
        <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-center">
          <div className="md:col-span-5 md:order-1">
            <p className="type-subheading text-gray mb-4">In-home Newborn · Las Vegas</p>
            <h1 className="type-title mb-6 leading-tight">
              Your first weeks at home,<br />
              <span className="italic text-teal-sage">quietly</span> remembered.
            </h1>
            <p className="type-body mb-8">
              I have been photographing families in Las Vegas for over eighteen years.
              Newborn sessions are slow, soft, and entirely at your pace. No props.
              No stiff posing. Just the real way these days felt.
            </p>
            <p className="type-subheading text-gray mb-8">
              Collections begin at $475
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#book"
                className="inline-block bg-charcoal text-off-white px-8 py-4 type-heading hover:bg-teal-sage transition-colors text-center"
              >
                Reserve Your Date
              </a>
              <a
                href="/guides/newborn-guide.html"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block border border-charcoal text-charcoal px-8 py-4 type-heading hover:bg-charcoal hover:text-off-white transition-colors text-center"
              >
                View the Session Guide
              </a>
            </div>
          </div>
          <div className="md:col-span-7 md:order-2">
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image
                src="/images/newborn/new-mom-cheek.jpg"
                alt="Mother holding newborn close"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 60vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </Section>

      {/* ── Trust strip ──────────────────────────────────────────────── */}
      <Section variant="muted">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            ['18+', 'Years photographing Las Vegas families'],
            ['4', 'Newborn families a month — that is it'],
            ['~10 days', 'Full gallery turnaround'],
            ['B&W', 'Color and black and white in every session'],
          ].map(([num, label]) => (
            <div key={label as string}>
              <p className="font-display text-3xl md:text-4xl text-teal-sage tracking-wide mb-2">{num}</p>
              <p className="type-heading text-gray">{label}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Story / Meet Jennie ──────────────────────────────────────── */}
      <Section>
        <div className="max-w-3xl mx-auto text-center">
          <p className="type-accent text-teal-sage italic text-xl md:text-2xl leading-relaxed mb-6">
            &ldquo;The best newborn photos are not perfect. They are honest.&rdquo;
          </p>
          <p className="type-body">
            These first weeks feel endless when you are in them, and then suddenly they
            are gone. My style is simple and unposed — I want the way your baby curls
            into your chest. The way your toddler wants to kiss the baby and then
            immediately wants a snack. The quiet, the chaos, the love. All of it.
          </p>
        </div>
      </Section>

      {/* ── Process / What to expect ─────────────────────────────────── */}
      <Section id="process" variant="warm">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <p className="type-subheading text-gray mb-3">What to Expect</p>
          <h2 className="type-title mb-6">From Hello to Gallery</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 max-w-5xl mx-auto">
          {PROCESS.map((step) => (
            <div key={step.step}>
              <p className="font-display text-teal-sage text-3xl italic mb-3">{step.step}</p>
              <h3 className="type-subheading mb-3">{step.name}</h3>
              <p className="type-body text-sm leading-relaxed">{step.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Investment / Pricing ────────────────────────────────────── */}
      <Section id="pricing">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <p className="type-subheading text-gray mb-3">Investment</p>
          <h2 className="type-title mb-6">Three Collections</h2>
          <p className="type-body">
            Every collection includes hand-edited color and black-and-white images,
            a private online gallery, personal print release, and siblings (and pets)
            at no additional fee.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
          {COLLECTIONS.map((c) => (
            <div
              key={c.name}
              className={`p-8 md:p-10 flex flex-col text-center border ${
                c.highlight
                  ? 'border-teal-sage bg-white relative'
                  : 'border-warm-gray bg-white'
              }`}
            >
              {c.highlight && (
                <p className="type-heading text-teal-sage absolute -top-3 left-1/2 -translate-x-1/2 bg-white px-3">
                  Most Loved
                </p>
              )}
              <p className="type-subheading text-gray mb-3">{c.name}</p>
              <p className="font-display text-4xl text-charcoal mb-6 tracking-wide">{c.price}</p>
              <ul className="type-body space-y-2 mb-6 flex-1">
                <li>{c.duration}</li>
                <li>{c.images}</li>
              </ul>
              <p className="type-heading text-teal-sage">{c.note}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="/guides/newborn-investment.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block border border-charcoal text-charcoal px-8 py-4 type-heading hover:bg-charcoal hover:text-off-white transition-colors"
          >
            View the Full Investment Guide
          </a>
          <p className="type-body text-gray text-sm mt-6 max-w-xl mx-auto">
            A la carte add-ons (Fresh 48, rush delivery, extra detailed edits) and
            heirloom keepsakes (linen album, birth story box) are detailed in the guide.
          </p>
        </div>
      </Section>

      {/* ── Gallery ──────────────────────────────────────────────────── */}
      <Section id="gallery" variant="muted">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <p className="type-subheading text-gray mb-3">A Look Inside</p>
          <h2 className="type-title mb-6">Recent Sessions</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 max-w-5xl mx-auto">
          {GALLERY.map((img) => (
            <div
              key={img.src}
              className={`relative overflow-hidden ${
                img.orientation === 'wide' ? 'aspect-[3/2]' : 'aspect-[2/3]'
              }`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </Section>

      {/* ── FAQ ──────────────────────────────────────────────────────── */}
      <Section id="faq">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <p className="type-subheading text-gray mb-3">Good to Know</p>
          <h2 className="type-title mb-6">Frequently Asked</h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-8">
          {FAQS.map((faq) => (
            <details key={faq.q} className="border-b border-warm-gray pb-6 group">
              <summary className="type-subheading cursor-pointer list-none flex justify-between items-center gap-4">
                <span>{faq.q}</span>
                <span
                  aria-hidden="true"
                  className="text-teal-sage text-2xl leading-none transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="type-body mt-4">{faq.a}</p>
            </details>
          ))}
        </div>
      </Section>

      {/* ── Book / Dual CTA ─────────────────────────────────────────── */}
      <Section id="book" variant="warm">
        <div className="max-w-2xl mx-auto text-center">
          <p className="type-subheading text-gray mb-3">Next Step</p>
          <h2 className="type-title mb-6">Let&apos;s Plan Yours</h2>
          <p className="type-body mb-10">
            I book four newborn families a month. If you have a due date in mind,
            send me a note now — even before baby arrives. We can pencil in a window
            and lock the date once they are here.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/contact"
              className="inline-block bg-charcoal text-off-white px-8 py-4 type-heading hover:bg-teal-sage transition-colors w-full sm:w-auto"
            >
              Reserve Your Date
            </Link>
            <a
              href="/guides/newborn-guide.html"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border border-charcoal text-charcoal px-8 py-4 type-heading hover:bg-charcoal hover:text-off-white transition-colors w-full sm:w-auto"
            >
              Download the Guide
            </a>
          </div>

          <p className="type-body text-gray text-sm mt-10">
            Prefer to talk first? Email me at{' '}
            <a href="mailto:jennie@jennieslade.com" className="text-charcoal underline">
              jennie@jennieslade.com
            </a>
          </p>
        </div>
      </Section>
    </main>
  )
}
