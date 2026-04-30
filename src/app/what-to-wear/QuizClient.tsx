'use client'

/**
 * QuizClient — five-question style quiz with an editorial-magazine results spread.
 *
 * Step model:
 *   currentStep 0..4  → question screens
 *   currentStep 5     → results screen
 *
 * Design direction (post 3-designer review):
 * - Single accent color: terracotta (--color-terracotta #A85A3E)
 *   Used in 3 places only: section numbers, hairlines under section headers,
 *   "— Jennie" pull-quote signature, plus quiz-screen number/letters.
 * - Bodoni Moda for hero/section numbers + pull quotes
 * - Type sizes cut ~30% from prior draft (was "shouting")
 * - Photo sizes reduced — hero outfit at 8/4 split (not 7/5), masonry hero 3/4
 * - SectionHeader has TWO variants: "hero" (sections 01, 05) and "compact" (02-04)
 * - Mobile collapsibles for Notes + Alternates via <details>
 * - Mobile horizontal-scroll carousel for photo masonry
 * - ShopMy fallback CTA when no outfit has shopMyUrl
 * - Touch targets >=44px on every interactive element
 * - Spacing rhythm varies (related sections close, mode-shifts far)
 */

import { useState } from 'react'
import Image from 'next/image'
import Button from '@/components/ui/Button'
import {
  questions,
  getRecommendations,
  fabrics,
  type Answers,
} from './data'
import { getGalleryFor } from './gallery-manifest'

const EMPTY_ANSWERS: Answers = {
  sessionType: '',
  style: '',
  confidence: '',
  vibe: '',
  skinTone: '',
}

const OPTION_LETTERS = ['A', 'B', 'C', 'D', 'E', 'F']

// LTK fallback URL — used when an outfit has no specific ShopMy collection
const LTK_FALLBACK_URL = 'https://www.shopltk.com/explore/jen.slayed'

export default function QuizClient() {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Answers>(EMPTY_ANSWERS)

  const isCompleted = currentStep >= questions.length

  function handleAnswer(value: string) {
    const q = questions[currentStep]
    setAnswers((prev) => ({ ...prev, [q.key]: value }))
    setTimeout(() => setCurrentStep((s) => s + 1), 250)
  }

  function handleBack() {
    if (currentStep > 0) setCurrentStep(currentStep - 1)
  }

  function handleRestart() {
    setCurrentStep(0)
    setAnswers(EMPTY_ANSWERS)
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function handleShare() {
    const shareData = {
      title: 'My Photo Session Style Guide',
      text: 'I just got my custom style guide from Jennie Slade Photography.',
      url: 'https://jennieslade.com/what-to-wear',
    }
    if (typeof navigator !== 'undefined' && navigator.share) {
      navigator.share(shareData).catch(() => {})
    } else if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(shareData.url)
      alert('Link copied. Share it on Instagram Stories.')
    }
  }

  function handleEmail() {
    const subject = encodeURIComponent('My Photo Session Style Guide')
    const body = encodeURIComponent(
      'My custom style guide from Jennie Slade Photography. Saving this for my session.\n\nTake the quiz: https://jennieslade.com/what-to-wear'
    )
    window.location.href = `mailto:?subject=${subject}&body=${body}`
  }

  if (isCompleted) {
    return (
      <Results
        answers={answers}
        onRestart={handleRestart}
        onShare={handleShare}
        onEmail={handleEmail}
      />
    )
  }

  return (
    <Quiz
      currentStep={currentStep}
      answers={answers}
      onAnswer={handleAnswer}
      onBack={handleBack}
    />
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Quiz screen
// ─────────────────────────────────────────────────────────────────────────────

interface QuizProps {
  currentStep: number
  answers: Answers
  onAnswer: (value: string) => void
  onBack: () => void
}

function Quiz({ currentStep, answers, onAnswer, onBack }: QuizProps) {
  const q = questions[currentStep]

  return (
    <div className="max-w-3xl mx-auto px-6 md:px-10">
      {/* ── Progress strip — TOC-style ticks, terracotta accent on current ── */}
      <div className="mb-12 md:mb-16 flex items-center justify-between gap-6">
        <div className="font-subheading uppercase tracking-[0.2em] text-[11px] text-charcoal opacity-60">
          The Quiz
        </div>
        <div className="flex items-center gap-2">
          {questions.map((_, i) => {
            const state = i < currentStep ? 'done' : i === currentStep ? 'current' : 'pending'
            return (
              <div
                key={i}
                className={[
                  'transition-all duration-300',
                  state === 'done' && 'w-6 h-px bg-charcoal',
                  state === 'current' && 'w-10 h-px',
                  state === 'pending' && 'w-6 h-px bg-warm-gray',
                ].filter(Boolean).join(' ')}
                style={state === 'current' ? { backgroundColor: 'var(--color-terracotta)' } : undefined}
              />
            )
          })}
          <span className="ml-3 font-subheading uppercase tracking-[0.2em] text-[11px] text-charcoal opacity-60">
            {String(currentStep + 1).padStart(2, '0')} / {String(questions.length).padStart(2, '0')}
          </span>
        </div>
      </div>

      {/* ── Question header — terracotta number, smaller scale ── */}
      <div className="animate-fade-in">
        <div className="flex items-baseline gap-5 md:gap-8 mb-7">
          <span
            className="font-editorial italic font-medium leading-[0.85] flex-shrink-0"
            style={{
              fontSize: 'clamp(48px, 9vw, 80px)',
              color: 'var(--color-terracotta)',
              opacity: 0.8,
            }}
          >
            {String(currentStep + 1).padStart(2, '0')}
          </span>
          <div className="flex-1 pt-1">
            <p className="font-subheading uppercase tracking-[0.2em] text-[10px] text-charcoal opacity-60 mb-3">
              The Question
            </p>
            <h2
              className="font-display font-light text-charcoal leading-[1.15] tracking-[-0.005em]"
              style={{ fontSize: 'clamp(24px, 3.6vw, 36px)' }}
            >
              {q.title}
            </h2>
          </div>
        </div>

        <p className="font-accent italic text-[16px] md:text-[18px] text-charcoal opacity-70 mb-10 max-w-xl">
          {q.subtitle}
        </p>

        {/* ── Options — letter-prefixed editorial choices ── */}
        <div className="flex flex-col gap-2 md:gap-3">
          {q.options.map((option, idx) => {
            const selected = answers[q.key] === option.value
            return (
              <button
                key={option.value}
                onClick={() => onAnswer(option.value)}
                className={[
                  'group flex items-stretch w-full text-left rounded-sm overflow-hidden',
                  'transition-all duration-200 cursor-pointer min-h-[64px]',
                  selected
                    ? 'bg-charcoal text-off-white'
                    : 'bg-warm-gray-light text-charcoal hover:bg-warm-gray',
                ].join(' ')}
              >
                <div
                  className={[
                    'flex items-center justify-center w-12 md:w-14 flex-shrink-0',
                    'font-editorial italic font-medium text-[20px] md:text-[22px]',
                    'border-r',
                    selected ? 'border-off-white/20' : 'border-charcoal/10',
                  ].join(' ')}
                  style={!selected ? { color: 'var(--color-terracotta)' } : undefined}
                >
                  {OPTION_LETTERS[idx]}
                </div>

                <div className="flex items-start justify-between gap-4 flex-1 p-4 md:p-5">
                  <div className="flex-1">
                    <div
                      className="font-display font-light leading-[1.2] mb-1 tracking-[0.005em]"
                      style={{ fontSize: 'clamp(17px, 2vw, 20px)' }}
                    >
                      {option.label}
                    </div>
                    <div className="font-body text-[13px] md:text-[14px] leading-[1.5] opacity-75">
                      {option.desc}
                    </div>
                  </div>
                  <span
                    aria-hidden="true"
                    className={[
                      'flex-shrink-0 mt-1 text-[18px] leading-none transition-all duration-200',
                      selected
                        ? 'opacity-100 translate-x-0'
                        : 'opacity-30 group-hover:opacity-100 group-hover:translate-x-1',
                    ].join(' ')}
                  >
                    →
                  </span>
                </div>
              </button>
            )
          })}
        </div>

        {currentStep > 0 && (
          <button
            onClick={onBack}
            className="mt-10 font-subheading uppercase tracking-[0.18em] text-[11px] text-charcoal flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity cursor-pointer py-3 -mx-1 px-1 min-h-[44px]"
          >
            <span aria-hidden="true">←</span>
            Back
          </button>
        )}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Results screen
// ─────────────────────────────────────────────────────────────────────────────

interface ResultsProps {
  answers: Answers
  onRestart: () => void
  onShare: () => void
  onEmail: () => void
}

function Results({ answers, onRestart, onShare, onEmail }: ResultsProps) {
  const recs = getRecommendations(answers)
  const sessionLabel =
    questions[0].options.find((o) => o.value === answers.sessionType)?.label || 'session'
  const gallery = getGalleryFor(answers.sessionType, 7)
  const heroPhoto = gallery[0]
  const galleryRest = gallery.slice(1, 6)
  const hasAnyShopUrl = recs.outfits.some((o) => o.shopMyUrl)

  return (
    <div className="animate-fade-in">

      {/* ═══════════════════════════════════════════════════════════════════
          HERO SPREAD — centered masthead treatment, smaller scale
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="max-w-5xl mx-auto px-6 md:px-10 mb-20 md:mb-28 text-center">
        <p
          className="font-subheading uppercase tracking-[0.32em] text-[10px] mb-10 md:mb-14"
          style={{ color: 'var(--color-terracotta)' }}
        >
          Vol. 01 · For Your {sessionLabel.split(' ')[0]} Session
        </p>

        <h1
          className="font-editorial font-light text-charcoal leading-[1] tracking-[-0.02em]"
          style={{ fontSize: 'clamp(40px, 7vw, 88px)' }}
        >
          Your{' '}
          <span
            className="font-editorial italic font-normal"
            style={{ color: 'var(--color-terracotta)' }}
          >
            Style Story.
          </span>
        </h1>

        <div className="mt-12 md:mt-16 max-w-xl mx-auto">
          <p className="font-accent italic text-[18px] md:text-[20px] leading-[1.55] text-charcoal opacity-85">
            Built around the way you answered.
          </p>
          <p className="mt-5 font-body text-[15px] md:text-[16px] leading-[1.7] text-charcoal opacity-75">
            The colors that read true on your skin, the fabrics that move on
            camera, and the outfits that&apos;ll feel like you — not a costume.
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          01 — COLORS  (asymmetric 7/5: one hero swatch + two small stacked)
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="max-w-5xl mx-auto px-6 md:px-10 mb-20 md:mb-28">
        <SectionHeader number="01" eyebrow="The Palette" title="Colors that work for you" variant="hero" />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4">
          {/* Primary — hero swatch (col-span-7), hex annotation inside */}
          <div className="md:col-span-7">
            <div
              className="relative w-full aspect-[5/4] md:aspect-[7/5] overflow-hidden"
              style={{ backgroundColor: recs.colors.primary.hex }}
              aria-label={`${recs.colors.primary.name} color swatch`}
            >
              {/* Hex annotation in bottom-right (editorial credit style) */}
              <span
                className="absolute bottom-3 right-3 md:bottom-4 md:right-4 font-subheading uppercase tracking-[0.18em] text-[10px] text-charcoal/60 mix-blend-multiply"
              >
                {recs.colors.primary.hex}
              </span>
            </div>
            <div className="mt-5 md:mt-6">
              <p
                className="font-subheading uppercase tracking-[0.2em] text-[10px] mb-2"
                style={{ color: 'var(--color-terracotta)' }}
              >
                Primary
              </p>
              <p
                className="font-editorial font-normal text-charcoal mb-3 leading-tight"
                style={{ fontSize: 'clamp(28px, 3.4vw, 40px)' }}
              >
                {recs.colors.primary.name}
              </p>
              <p className="font-body text-[14px] md:text-[15px] leading-[1.65] text-charcoal opacity-80 max-w-md">
                {recs.colors.primary.why}
              </p>
            </div>
          </div>

          {/* Secondary + Accent — stacked on right (col-span-5) */}
          <div className="md:col-span-5 flex flex-col gap-3 md:gap-4">
            {(['secondary', 'accent'] as const).map((key) => {
              const c = recs.colors[key]
              return (
                <div key={key} className="flex-1">
                  <div
                    className="relative w-full aspect-[3/2] overflow-hidden"
                    style={{ backgroundColor: c.hex }}
                    aria-label={`${c.name} color swatch`}
                  >
                    <span className="absolute bottom-3 right-3 font-subheading uppercase tracking-[0.18em] text-[10px] text-charcoal/60 mix-blend-multiply">
                      {c.hex}
                    </span>
                  </div>
                  <div className="mt-4">
                    <p
                      className="font-subheading uppercase tracking-[0.2em] text-[10px] mb-1.5"
                      style={{ color: 'var(--color-terracotta)' }}
                    >
                      {key}
                    </p>
                    <p
                      className="font-editorial font-normal text-charcoal mb-2 leading-tight"
                      style={{ fontSize: 'clamp(20px, 2.4vw, 26px)' }}
                    >
                      {c.name}
                    </p>
                    <p className="font-body text-[13px] md:text-[14px] leading-[1.6] text-charcoal opacity-80">
                      {c.why}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          02 — THE LOOKS  (compact section header)
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="max-w-5xl mx-auto px-6 md:px-10 mb-16 md:mb-20">
        <SectionHeader number="02" eyebrow="The Looks" title="Three outfits, built for you" variant="compact" />

        {/* Hero outfit */}
        {recs.outfits[0] && (
          <HeroOutfitCard outfit={recs.outfits[0]} index={0} photo={heroPhoto} />
        )}

        {/* Alternates — collapsed on mobile, side-by-side on desktop */}
        {recs.outfits.length > 1 && (
          <>
            {/* Mobile: collapsible */}
            <details className="md:hidden mt-5 group">
              <summary className="cursor-pointer list-none flex items-center justify-between py-4 border-t border-warm-gray min-h-[44px]">
                <span className="font-subheading uppercase tracking-[0.18em] text-[11px] text-charcoal">
                  See {recs.outfits.length - 1} more looks
                </span>
                <span
                  className="font-editorial italic text-[20px] transition-transform group-open:rotate-90"
                  style={{ color: 'var(--color-terracotta)' }}
                  aria-hidden="true"
                >
                  →
                </span>
              </summary>
              <div className="flex flex-col gap-4 mt-4">
                {recs.outfits.slice(1).map((outfit, i) => (
                  <OutfitCard key={i + 1} outfit={outfit} index={i + 1} />
                ))}
              </div>
            </details>

            {/* Desktop: always visible side-by-side */}
            <div className="hidden md:grid grid-cols-2 gap-6 mt-6">
              {recs.outfits.slice(1).map((outfit, i) => (
                <OutfitCard key={i + 1} outfit={outfit} index={i + 1} />
              ))}
            </div>
          </>
        )}

        {/* Fallback CTA: when none of the outfits have ShopMy collections */}
        {!hasAnyShopUrl && (
          <div className="mt-8 bg-warm-gray-light p-7 md:p-8 text-center">
            <p className="font-subheading uppercase tracking-[0.18em] text-[10px] text-charcoal opacity-60 mb-3">
              Shop the Style Edit
            </p>
            <p className="font-body text-[15px] leading-[1.6] text-charcoal opacity-80 mb-6 max-w-md mx-auto">
              Curated edits for this exact look are coming. In the meantime,
              browse the full Style Edit on LTK.
            </p>
            <a
              href={LTK_FALLBACK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-3.5 bg-charcoal text-off-white font-subheading uppercase tracking-[0.15em] text-[12px] hover:bg-black transition-colors min-h-[44px]"
            >
              Browse on LTK
              <span aria-hidden="true" className="font-editorial italic text-[18px]">→</span>
            </a>
          </div>
        )}
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          03 — FABRICS  (compact section header, related-content spacing)
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="max-w-5xl mx-auto px-6 md:px-10 mb-16 md:mb-20">
        <SectionHeader number="03" eyebrow="The Material" title="Fabrics to prioritize" variant="compact" />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          <div className="md:col-span-4">
            <p className="font-accent italic text-[17px] md:text-[18px] leading-[1.6] text-charcoal opacity-80">
              These photograph beautifully and move with you. Light catches them right.
            </p>
          </div>
          <div className="md:col-span-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-7">
              {fabrics.map((f, i) => (
                <div key={f.name} className="flex gap-4">
                  <span
                    className="font-editorial italic font-normal text-[20px] flex-shrink-0 leading-none mt-1"
                    style={{ color: 'var(--color-terracotta)', opacity: 0.7 }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <p
                      className="font-editorial font-normal text-charcoal mb-1.5 leading-tight"
                      style={{ fontSize: 'clamp(18px, 1.8vw, 22px)' }}
                    >
                      {f.name}
                    </p>
                    <p className="font-body text-[13px] md:text-[14px] leading-[1.6] text-charcoal opacity-75">
                      {f.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-8 pt-5 border-t border-warm-gray font-body italic text-[13px] text-charcoal opacity-60">
              Skip: stiff fabrics, anything overly shiny, heavy knits that bunch.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          04 — NOTES (Avoid + Tips) — compact header, mobile accordion
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="max-w-5xl mx-auto px-6 md:px-10 mb-20 md:mb-28">
        <SectionHeader number="04" eyebrow="The Notes" title="A few things to remember" variant="compact" />

        {/* Mobile: two stacked accordions (closed by default) */}
        <div className="md:hidden flex flex-col gap-3">
          <NotesAccordion title="What to skip" items={recs.avoid} />
          <NotesAccordion title="Pro tips from behind the camera" items={recs.tips} />
        </div>

        {/* Desktop: two-column always-visible */}
        <div className="hidden md:grid grid-cols-12 gap-16">
          <div className="col-span-5">
            <p className="font-subheading uppercase tracking-[0.18em] text-[11px] text-charcoal opacity-60 mb-6">
              What to skip
            </p>
            <NotesList items={recs.avoid} />
          </div>
          <div className="col-span-7 border-l border-warm-gray pl-16">
            <p className="font-subheading uppercase tracking-[0.18em] text-[11px] text-charcoal opacity-60 mb-6">
              Pro tips from behind the camera
            </p>
            <NotesList items={recs.tips} />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          05 — REAL SESSIONS (full-bleed editorial moodboard)
          Mobile: hero + horizontal scroll-snap carousel
          Desktop: contact-sheet grid with mixed aspects + italic captions
          ═══════════════════════════════════════════════════════════════════ */}
      {gallery.length > 0 && (
        <section className="mb-20 md:mb-28">
          <div className="max-w-5xl mx-auto px-6 md:px-10 mb-10">
            <SectionHeader number="05" eyebrow="The Reference" title="See it in real photos" variant="hero" />
            <p className="font-accent italic text-[17px] md:text-[18px] leading-[1.6] text-charcoal opacity-80 max-w-xl">
              A glimpse of past {sessionLabel.toLowerCase()} sessions in this aesthetic.
              Yours will be its own story.
            </p>
          </div>

          {/* Hero photo — capped at 60vh on mobile to avoid screen-eating */}
          {heroPhoto && (
            <div className="px-6 md:px-10 mb-3 md:mb-5">
              <div className="max-w-5xl mx-auto">
                <div
                  className="relative w-full overflow-hidden bg-warm-gray"
                  style={{ aspectRatio: '3 / 4', maxHeight: 'min(60vh, 720px)' }}
                >
                  <Image
                    src={heroPhoto.src}
                    alt={heroPhoto.alt}
                    fill
                    sizes="(min-width: 1024px) 1024px, 100vw"
                    className="object-cover"
                    priority={false}
                  />
                </div>
                <p className="mt-3 font-body italic text-[12px] text-charcoal opacity-60">
                  Photographed by Jennie Slade, Las Vegas.
                </p>
              </div>
            </div>
          )}

          {/* Mobile: horizontal scroll-snap */}
          <div className="md:hidden mt-5">
            <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory scroll-px-6 px-6 pb-2 -mx-0">
              {galleryRest.map((photo) => (
                <div
                  key={photo.src}
                  className="snap-start shrink-0 w-[70vw] aspect-[3/4] relative overflow-hidden bg-warm-gray"
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="70vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Desktop: contact-sheet grid with mixed aspects */}
          <div className="hidden md:block px-6 md:px-10">
            <div className="max-w-5xl mx-auto grid grid-cols-6 gap-4">
              {galleryRest.slice(0, 5).map((photo, i) => {
                // Mixed rhythm: 3-up portrait row, then 2-up + 1 wider
                const layouts = [
                  'col-span-2 aspect-[3/4]',
                  'col-span-2 aspect-[3/4]',
                  'col-span-2 aspect-[3/4]',
                  'col-span-3 aspect-[4/3]',
                  'col-span-3 aspect-[4/3]',
                ]
                return (
                  <figure key={photo.src} className={layouts[i] || 'col-span-2 aspect-[3/4]'}>
                    <div className="relative w-full h-full overflow-hidden bg-warm-gray">
                      <Image
                        src={photo.src}
                        alt={photo.alt}
                        fill
                        sizes="33vw"
                        className="object-cover transition-transform duration-700 ease-out hover:scale-[1.03]"
                      />
                    </div>
                    {/* Italic caption on first + last only — "human edit" signal */}
                    {(i === 0 || i === 4) && (
                      <figcaption className="mt-2 font-body italic text-[11px] text-charcoal opacity-50">
                        {i === 0 ? 'On location, Calico Basin.' : 'Golden hour, Floyd Lamb.'}
                      </figcaption>
                    )}
                  </figure>
                )
              })}
            </div>
          </div>

          <div className="max-w-5xl mx-auto px-6 md:px-10 mt-8 no-print">
            <a
              href="/portfolio"
              className="inline-flex items-center gap-2 py-3 -mx-1 px-1 font-subheading uppercase tracking-[0.18em] text-[11px] text-charcoal opacity-70 hover:opacity-100 transition-opacity min-h-[44px]"
            >
              See the full portfolio
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════════════════
          PULL-QUOTE — full-width inverted, smaller mobile padding
          Body paragraph hidden on mobile (mode-shift; pull quotes work brief)
          Terracotta "— Jennie" signature
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="bg-charcoal text-off-white py-16 md:py-32 mb-20 md:mb-28">
        <div className="max-w-3xl mx-auto px-6 md:px-10">
          <p className="font-subheading uppercase tracking-[0.32em] text-[10px] opacity-50 mb-8 md:mb-12 text-center">
            A Note · From Jennie
          </p>

          <p
            className="font-editorial italic font-normal text-off-white leading-[1.2] text-center"
            style={{ fontSize: 'clamp(24px, 3.6vw, 40px)' }}
          >
            &ldquo;When you feel good in what you&apos;re wearing, it shows in
            the photos. I&apos;ve got the technical part. You bring the realness.&rdquo;
          </p>

          {/* Body context — desktop only */}
          <p className="hidden md:block mt-12 font-body text-[15px] leading-[1.8] opacity-80 max-w-2xl mx-auto text-center">
            These recommendations exist to give you confidence — so you can stop
            second-guessing your closet and just be yourself in front of the
            camera. The best photos always come from people who feel like themselves.
          </p>

          <div className="flex justify-center mt-8 md:mt-10">
            <p
              className="font-accent italic text-[20px]"
              style={{ color: 'var(--color-terracotta)' }}
            >
              — Jennie
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          CTA — primary booking
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="max-w-3xl mx-auto px-6 md:px-10 mb-24 text-center">
        <p className="font-subheading uppercase tracking-[0.32em] text-[10px] text-charcoal opacity-60 mb-6">
          The Next Step
        </p>
        <h2
          className="font-editorial font-light text-charcoal leading-[1] mb-8"
          style={{ fontSize: 'clamp(32px, 5vw, 56px)' }}
        >
          Now let&apos;s{' '}
          <span
            className="font-editorial italic font-normal"
            style={{ color: 'var(--color-terracotta)' }}
          >
            make the photos.
          </span>
        </h2>
        <p className="font-body text-[16px] leading-[1.7] text-charcoal opacity-80 mb-10 max-w-md mx-auto">
          You know what to wear. Let&apos;s book the session.
        </p>
        <Button href="/contact">Schedule Your Session</Button>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          FOOTER CHROME — LTK + Action chips + Restart
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="max-w-3xl mx-auto px-6 md:px-10 pb-20">
        <div className="border-t border-warm-gray pt-10 mb-10 text-center no-print">
          <p className="font-subheading uppercase tracking-[0.18em] text-[10px] text-charcoal opacity-60 mb-3">
            More from Jennie
          </p>
          <p className="font-body text-[15px] text-charcoal opacity-80 mb-6 max-w-md mx-auto">
            I curate looks on LTK that match these aesthetics — for moments
            beyond your session.
          </p>
          <a
            href={LTK_FALLBACK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block py-3 px-2 -mx-2 font-subheading uppercase tracking-[0.15em] text-[12px] text-charcoal underline decoration-warm-gray underline-offset-4 hover:decoration-charcoal transition-all min-h-[44px]"
          >
            Browse my LTK →
          </a>
        </div>

        <div className="flex flex-wrap gap-2 justify-center mb-8 no-print">
          <ActionChip onClick={() => typeof window !== 'undefined' && window.print()}>Save as PDF</ActionChip>
          <ActionChip onClick={onShare}>Share</ActionChip>
          <ActionChip onClick={onEmail}>Email to Me</ActionChip>
        </div>

        <div className="text-center no-print">
          <button
            onClick={onRestart}
            className="font-subheading uppercase tracking-[0.18em] text-[11px] text-charcoal opacity-60 hover:opacity-100 transition-opacity cursor-pointer py-3 px-4 -mx-4 min-h-[44px]"
          >
            Retake the quiz
          </button>
        </div>
      </section>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Component primitives
// ─────────────────────────────────────────────────────────────────────────────

/**
 * SectionHeader — magazine-style numbered section divider.
 * Two variants:
 *  - "hero" (sections 01, 05) — big numerals, full hairline rule, deserves attention
 *  - "compact" (02, 03, 04) — smaller, single-line, repeating sections without overdoing
 *
 * Number is in terracotta (the accent), hairline rule below is also terracotta.
 * These are the "wayfinding" moments — they earn the brand color.
 */
function SectionHeader({
  number,
  eyebrow,
  title,
  variant,
}: {
  number: string
  eyebrow: string
  title: string
  variant: 'hero' | 'compact'
}) {
  if (variant === 'hero') {
    return (
      <div className="mb-10 md:mb-14">
        <div className="flex items-baseline gap-5 md:gap-8 mb-5 pb-5">
          <span
            className="font-editorial italic font-medium leading-none flex-shrink-0"
            style={{
              fontSize: 'clamp(48px, 7vw, 80px)',
              color: 'var(--color-terracotta)',
              opacity: 0.85,
            }}
          >
            {number}
          </span>
          <div className="flex-1 pt-2">
            <p className="font-subheading uppercase tracking-[0.22em] text-[10px] md:text-[11px] text-charcoal opacity-60 mb-3">
              {eyebrow}
            </p>
            <h2
              className="font-editorial font-light text-charcoal leading-[1.05] tracking-[-0.005em]"
              style={{ fontSize: 'clamp(24px, 3.6vw, 38px)' }}
            >
              {title}
            </h2>
          </div>
        </div>
        {/* Terracotta hairline rule — short, left-aligned to the number gutter */}
        <div
          className="h-px w-16"
          style={{ backgroundColor: 'var(--color-terracotta)' }}
        />
      </div>
    )
  }

  // Compact — single-line treatment, smaller number, demoted hierarchy
  return (
    <div className="mb-8 md:mb-10">
      <div className="flex items-baseline gap-4 md:gap-6 pb-3 border-b border-warm-gray">
        <span
          className="font-editorial italic font-medium leading-none"
          style={{
            fontSize: 'clamp(24px, 3vw, 36px)',
            color: 'var(--color-terracotta)',
            opacity: 0.85,
          }}
        >
          {number}
        </span>
        <div className="flex-1 flex items-baseline gap-3 md:gap-4 flex-wrap">
          <p className="font-subheading uppercase tracking-[0.22em] text-[10px] text-charcoal opacity-50">
            {eyebrow}
          </p>
          <span className="text-charcoal opacity-30">·</span>
          <h2
            className="font-editorial font-normal text-charcoal leading-tight"
            style={{ fontSize: 'clamp(18px, 2.2vw, 24px)' }}
          >
            {title}
          </h2>
        </div>
      </div>
    </div>
  )
}

/**
 * HeroOutfitCard — first outfit, full editorial spread treatment.
 * Now 8/4 split (was 7/5) — text gets more room, photo less dominant.
 * Photo is aspect-[3/4], capped height. Primary "Shop this look" CTA in
 * the top-right of the text column for early visibility, plus the
 * edge-to-edge dark Shop bar at the bottom for committed scrollers.
 */
function HeroOutfitCard({
  outfit,
  index,
  photo,
}: {
  outfit: ReturnType<typeof getRecommendations>['outfits'][number]
  index: number
  photo: { src: string; alt: string } | undefined
}) {
  const shopHref = outfit.shopMyUrl

  return (
    <article className="bg-warm-gray-light overflow-hidden mb-5 md:mb-6">
      <div className="grid grid-cols-1 md:grid-cols-12">
        {/* Left: outfit details (8 cols on desktop) */}
        <div className="md:col-span-8 p-7 md:p-10 lg:p-12 flex flex-col">
          {/* Top row: number + eyebrow on left, primary Shop CTA on right */}
          <div className="flex items-start justify-between gap-4 mb-7">
            <div className="flex items-center gap-4">
              <span
                className="font-editorial italic font-normal leading-none"
                style={{
                  fontSize: 'clamp(32px, 4vw, 44px)',
                  color: 'var(--color-terracotta)',
                  opacity: 0.85,
                }}
              >
                {String(index + 1).padStart(2, '0')}
              </span>
              <div>
                <p className="font-subheading uppercase tracking-[0.22em] text-[10px] text-charcoal opacity-60 mb-1">
                  Look One
                </p>
                <p
                  className="font-editorial font-medium text-charcoal leading-tight"
                  style={{ fontSize: 'clamp(18px, 2vw, 22px)' }}
                >
                  The Hero Outfit
                </p>
              </div>
            </div>

            {/* Top-right primary Shop CTA — only when outfit has shopMyUrl */}
            {shopHref && (
              <a
                href={shopHref}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:inline-flex items-center gap-2 px-4 py-2.5 bg-charcoal text-off-white font-subheading uppercase tracking-[0.15em] text-[10px] hover:bg-black transition-colors no-print min-h-[40px] flex-shrink-0"
              >
                Shop this look
                <span aria-hidden="true" className="font-editorial italic text-[14px]">→</span>
              </a>
            )}
          </div>

          {/* Outfit details */}
          <div className="space-y-3 md:space-y-4 mb-6">
            <OutfitItem label="Top" value={outfit.top} />
            <OutfitItem label="Bottom" value={outfit.bottom} />
            <OutfitItem label="Accessories" value={outfit.accessories} />
          </div>

          {/* Italic "why" caption */}
          <div className="border-t border-warm-gray pt-5 md:pt-6">
            <p className="font-accent italic text-[16px] md:text-[17px] leading-[1.6] text-charcoal max-w-md">
              {outfit.why}
            </p>
          </div>
        </div>

        {/* Right: photo (4 cols on desktop, 3:4 aspect, capped height) */}
        <div
          className="md:col-span-4 relative bg-warm-gray"
          style={{ aspectRatio: '3 / 4', maxHeight: '480px' }}
        >
          {photo ? (
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(min-width: 768px) 33vw, 100vw"
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-warm-gray flex items-center justify-center">
              <span className="font-subheading uppercase tracking-[0.18em] text-[10px] text-charcoal opacity-40">
                Sample Look
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Edge-to-edge bottom Shop bar (full width, primary affiliate path) */}
      {shopHref && <ShopBar href={shopHref} index={index} />}
    </article>
  )
}

/**
 * OutfitCard — alternate outfit (smaller, side-by-side on desktop).
 * Text-only with the dark Shop bar.
 */
function OutfitCard({
  outfit,
  index,
}: {
  outfit: ReturnType<typeof getRecommendations>['outfits'][number]
  index: number
}) {
  return (
    <article className="bg-warm-gray-light overflow-hidden flex flex-col">
      <div className="p-6 md:p-7 flex-1">
        <div className="flex items-center gap-3 mb-5">
          <span
            className="font-editorial italic font-normal leading-none"
            style={{
              fontSize: 'clamp(24px, 2.8vw, 32px)',
              color: 'var(--color-terracotta)',
              opacity: 0.85,
            }}
          >
            {String(index + 1).padStart(2, '0')}
          </span>
          <p className="font-subheading uppercase tracking-[0.22em] text-[10px] text-charcoal opacity-60">
            Alternate Look
          </p>
        </div>

        <div className="space-y-3 mb-5">
          <OutfitItem label="Top" value={outfit.top} compact />
          <OutfitItem label="Bottom" value={outfit.bottom} compact />
          <OutfitItem label="Accessories" value={outfit.accessories} compact />
        </div>

        <div className="border-t border-warm-gray pt-4">
          <p className="font-accent italic text-[14px] md:text-[15px] leading-[1.55] text-charcoal">
            {outfit.why}
          </p>
        </div>
      </div>

      {outfit.shopMyUrl && <ShopBar href={outfit.shopMyUrl} index={index} compact />}
    </article>
  )
}

/**
 * ShopBar — edge-to-edge dark affiliate footer on outfit cards.
 * Compact variant for alternate outfit cards (slightly smaller padding).
 */
function ShopBar({
  href,
  index,
  compact = false,
}: {
  href: string
  index: number
  compact?: boolean
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={[
        'group flex items-center justify-between gap-6 bg-charcoal text-off-white hover:bg-black no-print cursor-pointer',
        compact ? 'px-6 md:px-7 py-4 md:py-5' : 'px-7 md:px-10 py-5 md:py-6',
      ].join(' ')}
      style={{ transition: 'background-color 200ms ease-out' }}
      aria-label={`Shop the look for outfit ${index + 1} — opens ShopMy in a new tab`}
    >
      <div className="flex flex-col gap-1">
        <span
          className="font-editorial italic font-normal leading-none"
          style={{ fontSize: compact ? 'clamp(18px, 2vw, 22px)' : 'clamp(20px, 2.4vw, 26px)' }}
        >
          Shop this look
        </span>
        <span className="font-subheading uppercase tracking-[0.18em] text-[10px] opacity-65">
          Curated picks · across price tiers
        </span>
      </div>
      <span
        className="font-editorial italic font-normal leading-none transition-transform duration-300 ease-out group-hover:translate-x-1"
        style={{ fontSize: compact ? 'clamp(24px, 2.8vw, 32px)' : 'clamp(28px, 3.2vw, 36px)' }}
        aria-hidden="true"
      >
        →
      </span>
    </a>
  )
}

/**
 * OutfitItem — a single label + value row in an outfit card.
 */
function OutfitItem({
  label,
  value,
  compact = false,
}: {
  label: string
  value: string
  compact?: boolean
}) {
  return (
    <div className="flex gap-4 md:gap-5 items-baseline">
      <span
        className={`font-subheading uppercase tracking-[0.18em] text-charcoal opacity-50 flex-shrink-0 ${
          compact ? 'w-20 text-[9px]' : 'w-24 text-[10px]'
        }`}
      >
        {label}
      </span>
      <span
        className={`font-body text-charcoal leading-[1.5] flex-1 ${
          compact ? 'text-[14px]' : 'text-[15px] md:text-[16px]'
        }`}
      >
        {value}
      </span>
    </div>
  )
}

/**
 * NotesList — clean numbered list, used inside both desktop columns.
 */
function NotesList({ items }: { items: string[] }) {
  return (
    <div className="flex flex-col gap-5">
      {items.map((item, i) => (
        <div key={i} className="flex gap-4">
          <span
            className="font-editorial italic font-normal text-[18px] leading-none mt-1 flex-shrink-0 w-7"
            style={{ color: 'var(--color-terracotta)', opacity: 0.7 }}
          >
            {String(i + 1).padStart(2, '0')}
          </span>
          <p className="font-body text-[14px] md:text-[15px] leading-[1.7] text-charcoal opacity-90 flex-1">
            {item}
          </p>
        </div>
      ))}
    </div>
  )
}

/**
 * NotesAccordion — mobile-only collapsible for Notes section.
 * Uses native <details> for graceful PDF print + no-JS fallback.
 */
function NotesAccordion({ title, items }: { title: string; items: string[] }) {
  return (
    <details className="bg-warm-gray-light group">
      <summary className="cursor-pointer list-none flex items-center justify-between p-5 min-h-[56px]">
        <span className="font-subheading uppercase tracking-[0.18em] text-[11px] text-charcoal">
          {title}
        </span>
        <span
          className="font-editorial italic text-[20px] transition-transform group-open:rotate-90"
          style={{ color: 'var(--color-terracotta)' }}
          aria-hidden="true"
        >
          →
        </span>
      </summary>
      <div className="px-5 pb-6 pt-1">
        <NotesList items={items} />
      </div>
    </details>
  )
}

/**
 * ActionChip — secondary action button in footer chrome.
 * Touch target minimum 44px.
 */
function ActionChip({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="font-subheading uppercase tracking-[0.15em] text-[11px] text-charcoal bg-warm-gray-light hover:bg-warm-gray transition-colors duration-150 px-5 py-3.5 cursor-pointer min-h-[44px]"
    >
      {children}
    </button>
  )
}
