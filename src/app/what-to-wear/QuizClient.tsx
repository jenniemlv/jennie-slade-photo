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
  getGroupRecommendations,
  getPieces,
  resolveSessionKey,
  resolveStyleKey,
  fabrics,
  ROLE_LABELS,
  GENDER_LABELS,
  type Answers,
  type Person,
  type PersonRole,
  type Gender,
  type PersonRecommendations,
  type FamilyPalette,
  type ColorSuggestion,
  type Outfit,
  type OutfitPiece,
  type QuizState,
  type GroupRecommendations,
} from './data'
import { GARMENT_CACHE } from './garment-cache'
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

// ── Phase machine ─────────────────────────────────────────────────────────────
// Anchor takes the existing 5-question quiz. After q5 they hit a gate: solo or
// group? Solo path renders existing Results. Group path adds people via mini-
// quizzes (role/style/skinTone/name), then routes to the v2 mood board.
type Phase =
  | { kind: 'anchor-quiz'; step: number }
  | { kind: 'group-gate' }
  | { kind: 'group-roster' }
  | { kind: 'mini-quiz'; personId: string; step: number }
  | { kind: 'results' }
  | { kind: 'mood-board' }

interface DraftPerson {
  id: string
  role: PersonRole | ''
  gender: Gender | ''
  style: string
  skinTone: string
  displayName: string
}

const EMPTY_DRAFT: DraftPerson = {
  id: '',
  role: '',
  gender: '',
  style: '',
  skinTone: '',
  displayName: '',
}

function newPersonId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) return crypto.randomUUID()
  return `p_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
}

// Mini-quiz screen layout per role. Children skip the style screen (forced
// casual). All others answer role → gender → style → skinTone → name.
function miniQuizScreens(role: PersonRole | ''): Array<'role' | 'gender' | 'style' | 'skinTone' | 'name'> {
  if (role === '') return ['role']
  if (role === 'child') return ['role', 'gender', 'skinTone', 'name']
  return ['role', 'gender', 'style', 'skinTone', 'name']
}

export default function QuizClient() {
  const [phase, setPhase] = useState<Phase>({ kind: 'anchor-quiz', step: 0 })
  const [anchorAnswers, setAnchorAnswers] = useState<Answers>(EMPTY_ANSWERS)
  const [group, setGroup] = useState<Person[]>([])
  const [draft, setDraft] = useState<DraftPerson>(EMPTY_DRAFT)

  // ── Anchor quiz handlers (writes to anchorAnswers) ──────────────────────────
  function handleAnchorAnswer(value: string) {
    if (phase.kind !== 'anchor-quiz') return
    const q = questions[phase.step]
    setAnchorAnswers((prev) => ({ ...prev, [q.key]: value }))
    const nextStep = phase.step + 1
    setTimeout(() => {
      if (nextStep >= questions.length) {
        setPhase({ kind: 'group-gate' })
      } else {
        setPhase({ kind: 'anchor-quiz', step: nextStep })
      }
    }, 250)
  }

  function handleAnchorBack() {
    if (phase.kind === 'anchor-quiz' && phase.step > 0) {
      setPhase({ kind: 'anchor-quiz', step: phase.step - 1 })
    }
  }

  // ── Group gate handlers ─────────────────────────────────────────────────────
  function handleSoloChoice() {
    setPhase({ kind: 'results' })
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function handleGroupChoice() {
    setPhase({ kind: 'group-roster' })
  }

  function handleGateBack() {
    setPhase({ kind: 'anchor-quiz', step: questions.length - 1 })
  }

  // ── Group roster handlers ───────────────────────────────────────────────────
  function handleAddPerson() {
    const id = newPersonId()
    setDraft({ ...EMPTY_DRAFT, id })
    setPhase({ kind: 'mini-quiz', personId: id, step: 0 })
  }

  function handleRemovePerson(id: string) {
    setGroup((prev) => prev.filter((p) => p.id !== id))
  }

  function handleRosterDone() {
    setPhase({ kind: 'mood-board' })
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function handleRosterBack() {
    setPhase({ kind: 'group-gate' })
  }

  // ── Mini-quiz handlers ──────────────────────────────────────────────────────
  // Auto-advancing fields (single-tap): role, gender, style, skinTone.
  function handleMiniAnswer(field: 'role' | 'gender' | 'style' | 'skinTone', value: string) {
    if (phase.kind !== 'mini-quiz') return
    setDraft((prev) => ({ ...prev, [field]: value }))
    const screensForCurrentRole = miniQuizScreens(
      field === 'role' ? (value as PersonRole) : draft.role,
    )
    const nextStep = phase.step + 1
    setTimeout(() => {
      if (nextStep >= screensForCurrentRole.length) {
        commitDraftToGroup({ ...draft, [field]: value })
      } else {
        setPhase({ kind: 'mini-quiz', personId: phase.personId, step: nextStep })
      }
    }, 200)
  }

  // Name field: update on every keystroke without advancing phase.
  function handleMiniNameChange(value: string) {
    setDraft((prev) => ({ ...prev, displayName: value }))
  }

  // Commit draft (called by "Add to group" button or "Skip" link).
  function handleMiniCommit() {
    if (phase.kind !== 'mini-quiz') return
    commitDraftToGroup(draft)
  }

  function commitDraftToGroup(d: DraftPerson) {
    if (!d.role) return
    const person: Person = {
      id: d.id,
      role: d.role,
      gender: d.gender || undefined,
      displayName: d.displayName || ROLE_LABELS[d.role],
      isAnchor: false,
      answers: {
        sessionType: anchorAnswers.sessionType,
        style: d.role === 'child' ? 'casual' : (d.style || anchorAnswers.style),
        confidence: anchorAnswers.confidence,
        vibe: anchorAnswers.vibe,
        skinTone: d.skinTone || anchorAnswers.skinTone,
      },
    }
    setGroup((prev) => [...prev, person])
    setDraft(EMPTY_DRAFT)
    setPhase({ kind: 'group-roster' })
  }

  function handleMiniBack() {
    if (phase.kind !== 'mini-quiz') return
    if (phase.step === 0) {
      setDraft(EMPTY_DRAFT)
      setPhase({ kind: 'group-roster' })
    } else {
      setPhase({ kind: 'mini-quiz', personId: phase.personId, step: phase.step - 1 })
    }
  }

  // ── Restart / share / email (unchanged from solo path) ──────────────────────
  function handleRestart() {
    setPhase({ kind: 'anchor-quiz', step: 0 })
    setAnchorAnswers(EMPTY_ANSWERS)
    setGroup([])
    setDraft(EMPTY_DRAFT)
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

  // ── Phase routing ───────────────────────────────────────────────────────────
  if (phase.kind === 'anchor-quiz') {
    return (
      <Quiz
        currentStep={phase.step}
        answers={anchorAnswers}
        onAnswer={handleAnchorAnswer}
        onBack={handleAnchorBack}
      />
    )
  }

  if (phase.kind === 'group-gate') {
    return <GroupGate onSolo={handleSoloChoice} onGroup={handleGroupChoice} onBack={handleGateBack} />
  }

  if (phase.kind === 'group-roster') {
    return (
      <GroupRoster
        anchorAnswers={anchorAnswers}
        group={group}
        onAdd={handleAddPerson}
        onRemove={handleRemovePerson}
        onDone={handleRosterDone}
        onBack={handleRosterBack}
      />
    )
  }

  if (phase.kind === 'mini-quiz') {
    return (
      <MiniQuiz
        step={phase.step}
        draft={draft}
        addedCount={group.length}
        onAnswer={handleMiniAnswer}
        onNameChange={handleMiniNameChange}
        onCommit={handleMiniCommit}
        onBack={handleMiniBack}
      />
    )
  }

  if (phase.kind === 'mood-board') {
    return (
      <MoodBoardStub
        anchorAnswers={anchorAnswers}
        group={group}
        onRestart={handleRestart}
      />
    )
  }

  // results (solo path)
  return (
    <Results
      answers={anchorAnswers}
      onRestart={handleRestart}
      onShare={handleShare}
      onEmail={handleEmail}
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
  const hasAnyShopUrl = recs.outfits.some((o) => o.shopMyUrl)

  // Solo flat-lays for the hero outfit (top, bottom, accessory).
  const sessionKey = resolveSessionKey(answers.sessionType)
  const styleKey = resolveStyleKey(answers.style)
  const heroPiecesFlatLayUrls: Array<string | undefined> = [0, 1, 2].map(
    (pieceIdx) => GARMENT_CACHE[`${sessionKey}:${styleKey}:0:${pieceIdx}`],
  )
  const heroTopFlatLay = heroPiecesFlatLayUrls[0]

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
          <HeroOutfitCard
            outfit={recs.outfits[0]}
            index={0}
            photo={heroTopFlatLay ? { src: heroTopFlatLay, alt: recs.outfits[0].top } : undefined}
          />
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
      {/* 05 — The Edit (flat-lay grid of recommended pieces) */}
      {heroPiecesFlatLayUrls.some(Boolean) && (
        <section className="mb-20 md:mb-28">
          <div className="max-w-5xl mx-auto px-6 md:px-10 mb-10">
            <SectionHeader number="05" eyebrow="The Edit" title="The pieces, laid out" variant="hero" />
            <p className="font-accent italic text-[17px] md:text-[18px] leading-[1.6] text-charcoal opacity-80 max-w-xl">
              Tap any piece to shop it.
            </p>
          </div>

          <div className="max-w-5xl mx-auto px-6 md:px-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
              {getPieces(recs.outfits[0]).map((piece, i) => (
                <FlatLayTile
                  key={i}
                  piece={piece}
                  paletteHex={recs.colors.primary.hex}
                  flatLayUrl={heroPiecesFlatLayUrls[i]}
                />
              ))}
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

// ─────────────────────────────────────────────────────────────────────────────
// GROUP GATE — "is this guide for just you, or for a group?"
// ─────────────────────────────────────────────────────────────────────────────

function GroupGate({
  onSolo,
  onGroup,
  onBack,
}: {
  onSolo: () => void
  onGroup: () => void
  onBack: () => void
}) {
  return (
    <div className="max-w-3xl mx-auto px-6 md:px-10 animate-fade-in">
      <div className="mb-12 md:mb-16 flex items-center justify-between gap-6">
        <div className="font-subheading uppercase tracking-[0.2em] text-[11px] text-charcoal opacity-60">
          One more thing
        </div>
        <span className="font-subheading uppercase tracking-[0.2em] text-[11px] text-charcoal opacity-60">
          Almost there
        </span>
      </div>

      <div className="flex items-baseline gap-5 md:gap-8 mb-7">
        <span
          className="font-editorial italic font-medium leading-[0.85] flex-shrink-0"
          style={{
            fontSize: 'clamp(48px, 9vw, 80px)',
            color: 'var(--color-terracotta)',
            opacity: 0.8,
          }}
        >
          ✦
        </span>
        <div className="flex-1 pt-1">
          <p className="font-subheading uppercase tracking-[0.2em] text-[10px] text-charcoal opacity-60 mb-3">
            The Question
          </p>
          <h2
            className="font-display font-light text-charcoal leading-[1.15] tracking-[-0.005em]"
            style={{ fontSize: 'clamp(24px, 3.6vw, 36px)' }}
          >
            Is this guide for just you, or for a group?
          </h2>
        </div>
      </div>

      <p className="font-accent italic text-[16px] md:text-[18px] text-charcoal opacity-70 mb-10 max-w-xl">
        If a family or couple session, we&apos;ll build a coordinated palette so
        everyone photographs together.
      </p>

      <div className="flex flex-col gap-2 md:gap-3">
        <GateOption letter="A" label="Just me" desc="Personalized for you alone" onClick={onSolo} />
        <GateOption
          letter="B"
          label="It’s a group"
          desc="Family, partner, kids — coordinated by family palette"
          onClick={onGroup}
        />
      </div>

      <button
        onClick={onBack}
        className="mt-10 font-subheading uppercase tracking-[0.18em] text-[11px] text-charcoal flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity cursor-pointer py-3 -mx-1 px-1 min-h-[44px]"
      >
        <span aria-hidden="true">←</span>
        Back
      </button>
    </div>
  )
}

function GateOption({
  letter,
  label,
  desc,
  onClick,
}: {
  letter: string
  label: string
  desc: string
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className="group flex items-stretch w-full text-left rounded-sm overflow-hidden transition-all duration-200 cursor-pointer min-h-[64px] bg-warm-gray-light text-charcoal hover:bg-warm-gray"
    >
      <div
        className="flex items-center justify-center w-12 md:w-14 flex-shrink-0 font-editorial italic font-medium text-[20px] md:text-[22px] border-r border-charcoal/10"
        style={{ color: 'var(--color-terracotta)' }}
      >
        {letter}
      </div>
      <div className="flex items-start justify-between gap-4 flex-1 p-4 md:p-5">
        <div className="flex-1">
          <div
            className="font-display font-light leading-[1.2] mb-1 tracking-[0.005em]"
            style={{ fontSize: 'clamp(17px, 2vw, 20px)' }}
          >
            {label}
          </div>
          <div className="font-body text-[13px] md:text-[14px] leading-[1.5] opacity-75">
            {desc}
          </div>
        </div>
        <span
          aria-hidden="true"
          className="flex-shrink-0 mt-1 text-[18px] leading-none transition-all duration-200 opacity-30 group-hover:opacity-100 group-hover:translate-x-1"
        >
          →
        </span>
      </div>
    </button>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// GROUP ROSTER — list current people, add another or finish
// ─────────────────────────────────────────────────────────────────────────────

function GroupRoster({
  anchorAnswers,
  group,
  onAdd,
  onRemove,
  onDone,
  onBack,
}: {
  anchorAnswers: Answers
  group: Person[]
  onAdd: () => void
  onRemove: (id: string) => void
  onDone: () => void
  onBack: () => void
}) {
  const sessionLabel =
    questions[0].options.find((o) => o.value === anchorAnswers.sessionType)?.label || 'session'

  return (
    <div className="max-w-3xl mx-auto px-6 md:px-10 animate-fade-in">
      <div className="mb-12 md:mb-16 flex items-center justify-between gap-6">
        <div className="font-subheading uppercase tracking-[0.2em] text-[11px] text-charcoal opacity-60">
          The Group
        </div>
        <span className="font-subheading uppercase tracking-[0.2em] text-[11px] text-charcoal opacity-60">
          {group.length} added
        </span>
      </div>

      <p
        className="font-subheading uppercase tracking-[0.32em] text-[10px] mb-6"
        style={{ color: 'var(--color-terracotta)' }}
      >
        For your {sessionLabel.split(' ')[0]} Session
      </p>
      <h2
        className="font-display font-light text-charcoal leading-[1.15] tracking-[-0.005em] mb-6"
        style={{ fontSize: 'clamp(28px, 4vw, 44px)' }}
      >
        Who else is in the photo?
      </h2>
      <p className="font-accent italic text-[16px] md:text-[18px] text-charcoal opacity-70 mb-10 max-w-xl">
        Add each person below — partner, kids, grandparents. Two questions each,
        and we&apos;ll dress everyone in a coordinated family palette.
      </p>

      {/* Anchor (always present, can't be removed) */}
      <div className="border-t border-warm-gray pt-5 pb-5 flex items-center justify-between">
        <div>
          <p className="font-subheading uppercase tracking-[0.18em] text-[10px] text-charcoal opacity-60 mb-1">
            You · Anchor
          </p>
          <p
            className="font-editorial font-normal text-charcoal leading-tight"
            style={{ fontSize: 'clamp(18px, 2vw, 22px)' }}
          >
            The palette starts with you
          </p>
        </div>
        <span className="font-subheading uppercase tracking-[0.18em] text-[10px] text-charcoal opacity-40">
          Locked
        </span>
      </div>

      {/* Added people */}
      {group.map((p) => (
        <div key={p.id} className="border-t border-warm-gray pt-5 pb-5 flex items-center justify-between gap-4">
          <div>
            <p className="font-subheading uppercase tracking-[0.18em] text-[10px] text-charcoal opacity-60 mb-1">
              {ROLE_LABELS[p.role]} · {p.displayName}
            </p>
            <p
              className="font-editorial font-normal text-charcoal leading-tight"
              style={{ fontSize: 'clamp(18px, 2vw, 22px)' }}
            >
              In the family palette
            </p>
          </div>
          <button
            onClick={() => onRemove(p.id)}
            className="font-subheading uppercase tracking-[0.18em] text-[10px] text-charcoal opacity-60 hover:opacity-100 px-3 py-2 min-h-[44px] cursor-pointer"
            aria-label={`Remove ${p.displayName}`}
          >
            Remove
          </button>
        </div>
      ))}

      {/* Add another */}
      <button
        onClick={onAdd}
        className="mt-6 w-full border border-dashed border-charcoal/30 hover:border-charcoal/60 transition-colors py-7 px-6 cursor-pointer min-h-[64px] text-center"
      >
        <p
          className="font-editorial italic font-medium leading-tight mb-1"
          style={{ fontSize: 'clamp(20px, 2.4vw, 26px)', color: 'var(--color-terracotta)' }}
        >
          + Add another person
        </p>
        <p className="font-body text-[13px] text-charcoal opacity-60">
          Two questions: role and skin tone
        </p>
      </button>

      {/* Done / Back */}
      <div className="mt-12 flex items-center justify-between gap-4">
        <button
          onClick={onBack}
          className="font-subheading uppercase tracking-[0.18em] text-[11px] text-charcoal flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity cursor-pointer py-3 -mx-1 px-1 min-h-[44px]"
        >
          <span aria-hidden="true">←</span>
          Back
        </button>
        <button
          onClick={onDone}
          disabled={group.length === 0}
          className="inline-flex items-center gap-3 px-7 py-4 bg-charcoal text-off-white font-subheading uppercase tracking-[0.15em] text-[11px] hover:bg-black transition-colors min-h-[44px] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
        >
          Show our mood board
          <span aria-hidden="true" className="font-editorial italic text-[18px]">→</span>
        </button>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// MINI-QUIZ — role/style/skinTone/name screens for an added person
// ─────────────────────────────────────────────────────────────────────────────

const ROLE_OPTIONS: Array<{ value: PersonRole; label: string; desc: string }> = [
  { value: 'partner', label: 'Partner / Spouse', desc: 'Adult, paired with the anchor' },
  { value: 'teen', label: 'Teen', desc: 'High school years' },
  { value: 'child', label: 'Child', desc: 'Younger kid — we’ll keep their look comfortable' },
  { value: 'grandparent', label: 'Grandparent', desc: 'Family elder' },
  { value: 'other', label: 'Someone else', desc: 'Sibling, in-law, or other family' },
]

const GENDER_OPTIONS: Array<{ value: Gender; label: string; desc: string }> = [
  { value: 'woman', label: 'Woman / Girl', desc: 'Tops, bottoms, dresses, jewelry styled feminine' },
  { value: 'man', label: 'Man / Boy', desc: 'Button-ups, trousers, jeans, watches styled masculine' },
  { value: 'non-binary', label: 'Non-binary / Either', desc: 'We’ll pull from gender-neutral options' },
]

const SKIN_TONE_OPTIONS = questions.find((q) => q.key === 'skinTone')!.options
const STYLE_OPTIONS = questions.find((q) => q.key === 'style')!.options

function MiniQuiz({
  step,
  draft,
  addedCount,
  onAnswer,
  onNameChange,
  onCommit,
  onBack,
}: {
  step: number
  draft: DraftPerson
  addedCount: number
  onAnswer: (field: 'role' | 'gender' | 'style' | 'skinTone', value: string) => void
  onNameChange: (value: string) => void
  onCommit: () => void
  onBack: () => void
}) {
  const screens = miniQuizScreens(draft.role)
  const currentScreen = screens[step]
  const personLabel = draft.role ? ROLE_LABELS[draft.role] : 'Person'
  const totalScreens = screens.length

  return (
    <div className="max-w-3xl mx-auto px-6 md:px-10 animate-fade-in">
      <div className="mb-12 md:mb-16 flex items-center justify-between gap-6">
        <div className="font-subheading uppercase tracking-[0.2em] text-[11px] text-charcoal opacity-60">
          Adding {personLabel} · #{addedCount + 1}
        </div>
        <span className="font-subheading uppercase tracking-[0.2em] text-[11px] text-charcoal opacity-60">
          {String(step + 1).padStart(2, '0')} / {String(totalScreens).padStart(2, '0')}
        </span>
      </div>

      {currentScreen === 'role' && (
        <MiniScreen
          eyebrow="Their Role"
          title="Who is this person?"
          subtitle="We use this to coordinate cuts, comfort, and palette."
        >
          <div className="flex flex-col gap-2 md:gap-3">
            {ROLE_OPTIONS.map((opt, idx) => (
              <MiniOption
                key={opt.value}
                letter={OPTION_LETTERS[idx]}
                label={opt.label}
                desc={opt.desc}
                selected={draft.role === opt.value}
                onClick={() => onAnswer('role', opt.value)}
              />
            ))}
          </div>
        </MiniScreen>
      )}

      {currentScreen === 'gender' && (
        <MiniScreen
          eyebrow="Their Look"
          title={`What clothing direction for ${personLabel.toLowerCase()}?`}
          subtitle="This shapes the cuts and silhouettes we suggest. You can override anytime."
        >
          <div className="flex flex-col gap-2 md:gap-3">
            {GENDER_OPTIONS.map((opt, idx) => (
              <MiniOption
                key={opt.value}
                letter={OPTION_LETTERS[idx]}
                label={opt.label}
                desc={opt.desc}
                selected={draft.gender === opt.value}
                onClick={() => onAnswer('gender', opt.value)}
              />
            ))}
          </div>
        </MiniScreen>
      )}

      {currentScreen === 'style' && (
        <MiniScreen
          eyebrow="Their Style"
          title={`How would you describe ${personLabel.toLowerCase()}'s style?`}
          subtitle="Pick the one that feels most like them."
        >
          <div className="flex flex-col gap-2 md:gap-3">
            {STYLE_OPTIONS.map((opt, idx) => (
              <MiniOption
                key={opt.value}
                letter={OPTION_LETTERS[idx]}
                label={opt.label}
                desc={opt.desc}
                selected={draft.style === opt.value}
                onClick={() => onAnswer('style', opt.value)}
              />
            ))}
          </div>
        </MiniScreen>
      )}

      {currentScreen === 'skinTone' && (
        <MiniScreen
          eyebrow="Their Tone"
          title={`What works best with ${personLabel.toLowerCase()}'s skin tone?`}
          subtitle="This shapes the palette slot they sit in."
        >
          <div className="flex flex-col gap-2 md:gap-3">
            {SKIN_TONE_OPTIONS.map((opt, idx) => (
              <MiniOption
                key={opt.value}
                letter={OPTION_LETTERS[idx]}
                label={opt.label}
                desc={opt.desc}
                selected={draft.skinTone === opt.value}
                onClick={() => onAnswer('skinTone', opt.value)}
              />
            ))}
          </div>
        </MiniScreen>
      )}

      {currentScreen === 'name' && (
        <MiniScreen
          eyebrow="Their Name"
          title={`Want to label ${personLabel.toLowerCase()}'s look?`}
          subtitle={`Optional. We'll use "${ROLE_LABELS[draft.role || 'other']}" if you skip.`}
        >
          <div className="flex flex-col gap-4">
            <input
              type="text"
              value={draft.displayName}
              onChange={(e) => onNameChange(e.target.value)}
              placeholder={ROLE_LABELS[draft.role || 'other']}
              className="w-full bg-warm-gray-light text-charcoal font-body text-[16px] md:text-[18px] px-5 py-4 rounded-sm border border-transparent focus:border-charcoal/30 focus:outline-none min-h-[56px]"
              maxLength={40}
            />
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={onCommit}
                className="font-subheading uppercase tracking-[0.18em] text-[11px] text-charcoal opacity-60 hover:opacity-100 transition-opacity cursor-pointer py-3 px-3 min-h-[44px]"
              >
                Skip
              </button>
              <button
                onClick={onCommit}
                className="inline-flex items-center gap-3 px-6 py-3.5 bg-charcoal text-off-white font-subheading uppercase tracking-[0.15em] text-[11px] hover:bg-black transition-colors min-h-[44px] cursor-pointer"
              >
                Add to group
                <span aria-hidden="true" className="font-editorial italic text-[18px]">→</span>
              </button>
            </div>
          </div>
        </MiniScreen>
      )}

      <button
        onClick={onBack}
        className="mt-10 font-subheading uppercase tracking-[0.18em] text-[11px] text-charcoal flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity cursor-pointer py-3 -mx-1 px-1 min-h-[44px]"
      >
        <span aria-hidden="true">←</span>
        Back
      </button>
    </div>
  )
}

function MiniScreen({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow: string
  title: string
  subtitle: string
  children: React.ReactNode
}) {
  return (
    <div>
      <div className="flex items-baseline gap-5 md:gap-8 mb-7">
        <span
          className="font-editorial italic font-medium leading-[0.85] flex-shrink-0"
          style={{
            fontSize: 'clamp(48px, 9vw, 80px)',
            color: 'var(--color-terracotta)',
            opacity: 0.8,
          }}
        >
          ✦
        </span>
        <div className="flex-1 pt-1">
          <p className="font-subheading uppercase tracking-[0.2em] text-[10px] text-charcoal opacity-60 mb-3">
            {eyebrow}
          </p>
          <h2
            className="font-display font-light text-charcoal leading-[1.15] tracking-[-0.005em]"
            style={{ fontSize: 'clamp(24px, 3.6vw, 36px)' }}
          >
            {title}
          </h2>
        </div>
      </div>
      <p className="font-accent italic text-[16px] md:text-[18px] text-charcoal opacity-70 mb-10 max-w-xl">
        {subtitle}
      </p>
      {children}
    </div>
  )
}

function MiniOption({
  letter,
  label,
  desc,
  selected,
  onClick,
}: {
  letter: string
  label: string
  desc: string
  selected: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
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
        {letter}
      </div>
      <div className="flex items-start justify-between gap-4 flex-1 p-4 md:p-5">
        <div className="flex-1">
          <div
            className="font-display font-light leading-[1.2] mb-1 tracking-[0.005em]"
            style={{ fontSize: 'clamp(17px, 2vw, 20px)' }}
          >
            {label}
          </div>
          <div className="font-body text-[13px] md:text-[14px] leading-[1.5] opacity-75">
            {desc}
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
}

// ─────────────────────────────────────────────────────────────────────────────
// MOOD BOARD — group results spread (anchor + family palette + per-person looks)
// ─────────────────────────────────────────────────────────────────────────────
//
// Scaffold: flat-lay tiles render as styled placeholders (color-block + piece
// name) until step 5 wires Replicate flux-schnell generation. Per-piece dots
// + ShopMy product URLs land in step 6. Email gate + family photo upload are
// upstream of this component (steps 7-8).

interface MoodBoardProps {
  anchorAnswers: Answers
  group: Person[]
  /** Optional family photo data URL — used as visual anchor at top. */
  familyPhoto?: string | null
  /** Map of outfit-piece-key → flat-lay image URL (data URL or remote). Empty = placeholders. */
  flatLays?: Record<string, string>
  onRestart: () => void
}

function MoodBoardStub(props: MoodBoardProps) {
  return <MoodBoard {...props} />
}

function MoodBoard({
  anchorAnswers,
  group,
  familyPhoto = null,
  flatLays = {},
  onRestart,
}: MoodBoardProps) {
  const sessionLabel =
    questions[0].options.find((o) => o.value === anchorAnswers.sessionType)?.label || 'session'

  // Build anchor Person from anchorAnswers
  const anchor: Person = {
    id: 'anchor',
    role: 'anchor',
    displayName: 'You',
    isAnchor: true,
    answers: anchorAnswers,
  }
  const quizState: QuizState = { anchor, group, isGroup: true }
  const groupRecs = getGroupRecommendations(quizState)

  if (!groupRecs) {
    // Defensive fallback — should never hit since we only route here when isGroup
    return (
      <div className="max-w-3xl mx-auto px-6 md:px-10 py-16 text-center">
        <p className="font-body text-charcoal">Something went off-script. Restart and try again.</p>
      </div>
    )
  }

  const outfitIndices = computeOutfitIndices(groupRecs.people)

  return (
    <div className="animate-fade-in">
      {/* ═══════════════════════════════════════════════════════════════════
          HERO MASTHEAD
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="max-w-5xl mx-auto px-6 md:px-10 mb-16 md:mb-24 text-center">
        <p
          className="font-subheading uppercase tracking-[0.32em] text-[10px] mb-10 md:mb-14"
          style={{ color: 'var(--color-terracotta)' }}
        >
          Vol. 02 · For Your {sessionLabel.split(' ')[0]} Session
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
            Family Mood Board.
          </span>
        </h1>
        <div className="mt-12 md:mt-16 max-w-xl mx-auto">
          <p className="font-accent italic text-[18px] md:text-[20px] leading-[1.55] text-charcoal opacity-85">
            One coordinated palette. {groupRecs.people.length} people, dressed to photograph together.
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          FAMILY PHOTO ANCHOR (optional, if uploaded)
          ═══════════════════════════════════════════════════════════════════ */}
      {familyPhoto && (
        <section className="max-w-5xl mx-auto px-6 md:px-10 mb-16 md:mb-24">
          <div className="relative w-full aspect-[16/10] overflow-hidden bg-warm-gray-light">
            <Image
              src={familyPhoto}
              alt="Your family photo, used as the anchor of this board."
              fill
              unoptimized
              className="object-cover"
            />
          </div>
          <p className="mt-4 font-body italic text-[13px] text-charcoal opacity-60 text-center">
            Your family photo — the visual anchor of this board.
          </p>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════════════════
          FAMILY LOOKBOOK COMPOSITE — full editorial spread, all family in one frame
          ═══════════════════════════════════════════════════════════════════ */}
      <FamilyLookbookComposite groupRecs={groupRecs} outfitIndices={outfitIndices} flatLays={flatLays} />

      {/* ═══════════════════════════════════════════════════════════════════
          01 — FAMILY PALETTE  (4-slot strip)
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="max-w-5xl mx-auto px-6 md:px-10 mb-16 md:mb-24">
        <SectionHeader
          number="01"
          eyebrow="The Family Palette"
          title="Four colors. One story."
          variant="hero"
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {(['dominant', 'complement', 'neutral', 'accentTonal'] as const).map((slot) => (
            <PaletteSwatch key={slot} slot={slot} color={groupRecs.familyPalette[slot]} />
          ))}
        </div>
        <p className="mt-8 font-accent italic text-[15px] md:text-[16px] text-charcoal opacity-75 max-w-2xl">
          Coordinate, don&apos;t match. Each person sits in one of these tones — the photographs
          read as a single warm world.
        </p>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          02 — THE LOOKS  (per-person flat-lays)
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="max-w-5xl mx-auto px-6 md:px-10 mb-16 md:mb-24">
        <SectionHeader
          number="02"
          eyebrow="The Looks"
          title="Built for each of you"
          variant="hero"
        />

        <div className="flex flex-col gap-12 md:gap-16">
          {groupRecs.people.map((personRecs) => (
            <PersonLookSection
              key={personRecs.person.id}
              personRecs={personRecs}
              outfitIdx={outfitIndices[personRecs.person.id] ?? 0}
              flatLays={flatLays}
            />
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          03 — NOTES (shared avoid + tips)
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="max-w-5xl mx-auto px-6 md:px-10 mb-16 md:mb-24">
        <SectionHeader
          number="03"
          eyebrow="The Notes"
          title="What works, what doesn't"
          variant="compact"
        />
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          <div className="md:col-span-5">
            <p
              className="font-subheading uppercase tracking-[0.2em] text-[10px] mb-4"
              style={{ color: 'var(--color-terracotta)' }}
            >
              Avoid
            </p>
            <ul className="space-y-3">
              {groupRecs.sharedAvoid.map((note, i) => (
                <li
                  key={i}
                  className="font-body text-[14px] md:text-[15px] leading-[1.6] text-charcoal opacity-85 pl-5 relative before:content-['—'] before:absolute before:left-0 before:opacity-50"
                >
                  {note}
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-7">
            <p
              className="font-subheading uppercase tracking-[0.2em] text-[10px] mb-4"
              style={{ color: 'var(--color-terracotta)' }}
            >
              Tips
            </p>
            <ul className="space-y-3">
              {groupRecs.sharedTips.map((tip, i) => (
                <li
                  key={i}
                  className="font-body text-[14px] md:text-[15px] leading-[1.6] text-charcoal opacity-85 pl-5 relative before:content-['—'] before:absolute before:left-0 before:opacity-50"
                >
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          PULL QUOTE
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="bg-charcoal text-off-white mb-16 md:mb-24 py-16 md:py-24 px-6 md:px-10">
        <div className="max-w-3xl mx-auto text-center">
          <p
            className="font-editorial font-light italic leading-[1.15]"
            style={{ fontSize: 'clamp(24px, 3.6vw, 40px)' }}
          >
            “When everyone in the frame feels like themselves, the photo
            stops being a photo and starts being the memory.”
          </p>
          <p
            className="mt-8 font-subheading uppercase tracking-[0.32em] text-[11px]"
            style={{ color: 'var(--color-terracotta)' }}
          >
            — Jennie
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          ACTIONS
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="max-w-5xl mx-auto px-6 md:px-10 mb-20 text-center">
        <button
          onClick={onRestart}
          className="font-subheading uppercase tracking-[0.18em] text-[11px] text-charcoal opacity-60 hover:opacity-100 transition-opacity cursor-pointer py-3 px-3 min-h-[44px]"
        >
          Retake the quiz
        </button>
      </section>
    </div>
  )
}

// ── Palette swatch ────────────────────────────────────────────────────────────

function PaletteSwatch({
  slot,
  color,
}: {
  slot: 'dominant' | 'complement' | 'neutral' | 'accentTonal'
  color: ColorSuggestion
}) {
  const slotLabel =
    slot === 'dominant' ? 'Dominant' :
    slot === 'complement' ? 'Complement' :
    slot === 'neutral' ? 'Neutral' :
    'Accent'

  return (
    <div>
      <div
        className="relative w-full aspect-[3/4] overflow-hidden"
        style={{ backgroundColor: color.hex }}
        aria-label={`${color.name} swatch`}
      >
        <span className="absolute bottom-3 right-3 font-subheading uppercase tracking-[0.18em] text-[9px] text-charcoal/60 mix-blend-multiply">
          {color.hex}
        </span>
      </div>
      <p
        className="mt-3 font-subheading uppercase tracking-[0.2em] text-[9px] mb-1"
        style={{ color: 'var(--color-terracotta)' }}
      >
        {slotLabel}
      </p>
      <p
        className="font-editorial font-normal text-charcoal leading-tight"
        style={{ fontSize: 'clamp(16px, 1.8vw, 20px)' }}
      >
        {color.name}
      </p>
    </div>
  )
}

// ── Per-person look section ───────────────────────────────────────────────────

function PersonLookSection({
  personRecs,
  outfitIdx,
  flatLays,
}: {
  personRecs: PersonRecommendations
  outfitIdx: number
  flatLays: Record<string, string>
}) {
  const { person, recommendations, assignedPrimary } = personRecs
  const heroOutfit: Outfit | undefined = recommendations.outfits[outfitIdx] || recommendations.outfits[0]
  if (!heroOutfit) return null
  const pieces = getPieces(heroOutfit)
  const roleLabel = ROLE_LABELS[person.role]

  return (
    <article className="border-t border-warm-gray pt-10 md:pt-12">
      {/* Eyebrow row: assigned palette swatch + role + name */}
      <div className="flex items-center gap-4 mb-6">
        <span
          className="block w-6 h-6 rounded-sm flex-shrink-0"
          style={{ backgroundColor: assignedPrimary.hex }}
          aria-label={`${assignedPrimary.name} palette tone`}
        />
        <div>
          <p
            className="font-subheading uppercase tracking-[0.2em] text-[10px] mb-0.5"
            style={{ color: 'var(--color-terracotta)' }}
          >
            {roleLabel}
            {person.displayName && person.displayName !== roleLabel ? ` · ${person.displayName}` : ''}
          </p>
          <p
            className="font-editorial font-normal text-charcoal leading-tight"
            style={{ fontSize: 'clamp(20px, 2.4vw, 26px)' }}
          >
            In {assignedPrimary.name}
          </p>
        </div>
      </div>

      {/* Why text */}
      <p className="font-accent italic text-[15px] md:text-[16px] text-charcoal opacity-85 mb-8 max-w-xl">
        {heroOutfit.why}
      </p>

      {/* Flat-lay tiles (3-up grid, placeholders until generation lands) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 mb-6">
        {pieces.map((piece, i) => {
          const key = pieceKeyForPerson(person, i, outfitIdx)
          return (
            <FlatLayTile
              key={i}
              piece={piece}
              paletteHex={assignedPrimary.hex}
              flatLayUrl={flatLays[key] || GARMENT_CACHE[key]}
            />
          )
        })}
      </div>

      {/* Per-piece purchase list */}
      <div className="border-t border-warm-gray pt-5">
        <p className="font-subheading uppercase tracking-[0.2em] text-[10px] text-charcoal opacity-60 mb-4">
          Shop the look
        </p>
        <ul className="flex flex-col gap-3">
          {pieces.map((piece, i) => (
            <PieceShopRow key={i} piece={piece} />
          ))}
        </ul>
      </div>
    </article>
  )
}

/**
 * Compute outfit index per person so people in the same style bucket don't
 * collide on the same hero outfit. Walks people in order, tracking how many
 * times each style has been used so far. Each person gets the next slot
 * (0/1/2 wrap) within their style bucket.
 *
 * Example: 4-person family all pick 'classic' → indices 0/1/2/0 (mom in
 * cable-knit, partner in turtleneck, teen in white button-up, child wraps to
 * cable-knit but with their own palette tone). Different styles get
 * independent counters.
 */
function computeOutfitIndices(people: PersonRecommendations[]): Record<string, number> {
  const result: Record<string, number> = {}
  const usedByStyle: Record<string, number> = {}
  for (const p of people) {
    const styleKey = p.person.answers.style || 'classic'
    const used = usedByStyle[styleKey] ?? 0
    result[p.person.id] = used % 3
    usedByStyle[styleKey] = used + 1
  }
  return result
}

function pieceKeyForPerson(person: Person, pieceIdx: number, outfitIdx: number): string {
  // Cache key = outfit identity, not person identity. Same outfit shared
  // across people gets the same image.
  const session = resolveSessionKey(person.answers.sessionType)
  const style = resolveStyleKey(person.answers.style)
  return `${session}:${style}:${outfitIdx}:${pieceIdx}`
}

// ── Flat-lay tile (placeholder + future generated image slot) ─────────────────

function FlatLayTile({
  piece,
  paletteHex,
  flatLayUrl,
}: {
  piece: OutfitPiece
  paletteHex: string
  flatLayUrl?: string
}) {
  const buyHref = piece.shopMyProductUrl || LTK_FALLBACK_URL

  const tileBody = (
    <>
      {flatLayUrl ? (
        <Image
          src={flatLayUrl}
          alt={piece.name}
          fill
          unoptimized
          className="object-cover"
        />
      ) : (
        <>
          {/* Editorial placeholder: subtle palette tint with type label */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(180deg, ${paletteHex}22 0%, ${paletteHex}55 100%)`,
            }}
          />
          <div className="absolute inset-0 flex items-end justify-start p-5 md:p-6">
            <div>
              <p
                className="font-subheading uppercase tracking-[0.32em] text-[9px] mb-2"
                style={{ color: 'var(--color-terracotta)' }}
              >
                {piece.type}
              </p>
              <p
                className="font-editorial italic font-normal text-charcoal leading-tight"
                style={{ fontSize: 'clamp(16px, 1.8vw, 20px)' }}
              >
                {piece.name}
              </p>
            </div>
          </div>
        </>
      )}
      {/* Shop pin: appears in the corner when image is loaded */}
      {flatLayUrl && (
        <span
          aria-hidden="true"
          className="absolute top-3 right-3 inline-flex items-center justify-center w-8 h-8 rounded-full bg-charcoal text-off-white font-subheading uppercase tracking-[0.1em] text-[10px] shadow-md"
        >
          →
        </span>
      )}
    </>
  )

  return (
    <a
      href={buyHref}
      target="_blank"
      rel="noopener noreferrer"
      className="group block relative"
      aria-label={`Shop ${piece.name}`}
    >
      <figure className="relative w-full aspect-[3/4] overflow-hidden bg-warm-gray-light">
        {tileBody}
      </figure>
    </a>
  )
}

// ── Per-piece shop row ────────────────────────────────────────────────────────

function PieceShopRow({ piece }: { piece: OutfitPiece }) {
  const href = piece.shopMyProductUrl || LTK_FALLBACK_URL
  const hasProductUrl = !!piece.shopMyProductUrl

  return (
    <li className="flex items-center justify-between gap-4 py-2">
      <div className="flex-1 min-w-0">
        <p className="font-subheading uppercase tracking-[0.18em] text-[9px] text-charcoal opacity-50 mb-0.5">
          {piece.type}
        </p>
        <p className="font-body text-[14px] md:text-[15px] text-charcoal truncate">
          {piece.name}
        </p>
      </div>
      <div className="flex items-center gap-3 flex-shrink-0">
        {piece.priceDisplay && (
          <span className="font-subheading uppercase tracking-[0.15em] text-[11px] text-charcoal opacity-70">
            {piece.priceDisplay}
          </span>
        )}
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-charcoal text-off-white font-subheading uppercase tracking-[0.15em] text-[10px] hover:bg-black transition-colors min-h-[44px]"
        >
          {hasProductUrl ? 'Buy' : 'Browse'}
          <span aria-hidden="true" className="font-editorial italic text-[14px]">→</span>
        </a>
      </div>
    </li>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// PHOTO UPLOAD STEP — optional, client-side data URL only, never sent to server
// ─────────────────────────────────────────────────────────────────────────────

function PhotoUploadStep({
  addedCount,
  onSelected,
  onSkip,
  onBack,
}: {
  addedCount: number
  onSelected: (dataUrl: string) => void
  onSkip: () => void
  onBack: () => void
}) {
  function handleFile(file: File) {
    if (file.size > 10 * 1024 * 1024) {
      alert('Photo is over 10MB. Try a smaller version.')
      return
    }
    const reader = new FileReader()
    reader.onload = () => {
      const result = reader.result
      if (typeof result === 'string') onSelected(result)
    }
    reader.onerror = () => alert("Couldn't read that file. Try another.")
    reader.readAsDataURL(file)
  }

  return (
    <div className="max-w-3xl mx-auto px-6 md:px-10 animate-fade-in">
      <div className="mb-12 md:mb-16 flex items-center justify-between gap-6">
        <div className="font-subheading uppercase tracking-[0.2em] text-[11px] text-charcoal opacity-60">
          One last thing
        </div>
        <span className="font-subheading uppercase tracking-[0.2em] text-[11px] text-charcoal opacity-60">
          {addedCount + 1} people
        </span>
      </div>

      <div className="flex items-baseline gap-5 md:gap-8 mb-7">
        <span
          className="font-editorial italic font-medium leading-[0.85] flex-shrink-0"
          style={{
            fontSize: 'clamp(48px, 9vw, 80px)',
            color: 'var(--color-terracotta)',
            opacity: 0.8,
          }}
        >
          ✦
        </span>
        <div className="flex-1 pt-1">
          <p className="font-subheading uppercase tracking-[0.2em] text-[10px] text-charcoal opacity-60 mb-3">
            Optional
          </p>
          <h2
            className="font-display font-light text-charcoal leading-[1.15] tracking-[-0.005em]"
            style={{ fontSize: 'clamp(24px, 3.6vw, 36px)' }}
          >
            Drop a recent family photo.
          </h2>
        </div>
      </div>

      <p className="font-accent italic text-[16px] md:text-[18px] text-charcoal opacity-70 mb-10 max-w-xl">
        We&apos;ll use it as the visual anchor of your mood board. Stays on your
        device — never uploaded.
      </p>

      <label className="block w-full border-2 border-dashed border-charcoal/30 hover:border-charcoal/60 transition-colors py-12 px-6 cursor-pointer text-center min-h-[140px]">
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp,image/heic"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0]
            if (f) handleFile(f)
          }}
        />
        <p
          className="font-editorial italic font-medium leading-tight mb-2"
          style={{ fontSize: 'clamp(20px, 2.4vw, 28px)', color: 'var(--color-terracotta)' }}
        >
          Choose a photo
        </p>
        <p className="font-body text-[13px] text-charcoal opacity-60">
          JPEG, PNG, or HEIC. Up to 10MB.
        </p>
      </label>

      <div className="mt-10 flex items-center justify-between gap-4">
        <button
          onClick={onBack}
          className="font-subheading uppercase tracking-[0.18em] text-[11px] text-charcoal flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity cursor-pointer py-3 -mx-1 px-1 min-h-[44px]"
        >
          <span aria-hidden="true">←</span>
          Back
        </button>
        <button
          onClick={onSkip}
          className="font-subheading uppercase tracking-[0.18em] text-[11px] text-charcoal opacity-60 hover:opacity-100 transition-opacity cursor-pointer py-3 px-3 min-h-[44px]"
        >
          Skip — go straight to the board →
        </button>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// FAMILY LOOKBOOK COMPOSITE — single editorial spread of the whole family's
// looks, palette + all per-person tiles arranged as one cohesive frame.
// ─────────────────────────────────────────────────────────────────────────────

function FamilyLookbookComposite({
  groupRecs,
  outfitIndices,
  flatLays,
}: {
  groupRecs: GroupRecommendations
  outfitIndices: Record<string, number>
  flatLays: Record<string, string>
}) {
  const palette = groupRecs.familyPalette

  return (
    <section className="max-w-6xl mx-auto px-4 md:px-8 mb-20 md:mb-28">
      {/* Cover-style header above the composite */}
      <div className="text-center mb-8 md:mb-10">
        <p
          className="font-subheading uppercase tracking-[0.32em] text-[10px] mb-4"
          style={{ color: 'var(--color-terracotta)' }}
        >
          The Lookbook
        </p>
        <h2
          className="font-editorial font-light text-charcoal leading-[1.05] tracking-[-0.015em]"
          style={{ fontSize: 'clamp(28px, 4.5vw, 52px)' }}
        >
          All of you,{' '}
          <span
            className="font-editorial italic font-normal"
            style={{ color: 'var(--color-terracotta)' }}
          >
            dressed together.
          </span>
        </h2>
      </div>

      {/* THE COMPOSITE — single bordered editorial frame */}
      <div
        className="relative border border-charcoal/10 overflow-hidden"
        style={{ backgroundColor: '#F8F4EF' }}
      >
        {/* Magazine masthead-style top bar */}
        <div className="border-b border-charcoal/10 px-5 md:px-8 py-4 flex items-center justify-between gap-4">
          <p
            className="font-subheading uppercase tracking-[0.32em] text-[9px] md:text-[10px]"
            style={{ color: 'var(--color-terracotta)' }}
          >
            Vol. 02 · The Family Edit
          </p>
          <p className="font-subheading uppercase tracking-[0.18em] text-[9px] md:text-[10px] text-charcoal opacity-50">
            {groupRecs.people.length} Looks · {groupRecs.people.reduce((sum, p) => sum + getPieces(p.recommendations.outfits[0]).length, 0)} Pieces
          </p>
        </div>

        {/* PALETTE STRIP — full bleed, edge to edge */}
        <div className="grid grid-cols-4">
          {(['dominant', 'complement', 'neutral', 'accentTonal'] as const).map((slot) => {
            const c = palette[slot]
            return (
              <div
                key={slot}
                className="relative aspect-[3/1] md:aspect-[4/1]"
                style={{ backgroundColor: c.hex }}
                aria-label={`${c.name} palette tone`}
              >
                <span className="absolute bottom-2 left-2 font-subheading uppercase tracking-[0.18em] text-[8px] md:text-[9px] text-charcoal/60 mix-blend-multiply">
                  {c.name}
                </span>
                <span className="absolute bottom-2 right-2 font-subheading uppercase tracking-[0.18em] text-[8px] md:text-[9px] text-charcoal/50 mix-blend-multiply">
                  {c.hex}
                </span>
              </div>
            )
          })}
        </div>

        {/* PER-PERSON TILE CLUSTERS — editorial grid */}
        <div className="px-5 md:px-8 py-8 md:py-10">
          <div
            className="grid gap-6 md:gap-8"
            style={{
              gridTemplateColumns: `repeat(${Math.min(groupRecs.people.length, 2)}, minmax(0, 1fr))`,
            }}
          >
            {groupRecs.people.map((personRecs) => (
              <LookbookPersonCluster
                key={personRecs.person.id}
                personRecs={personRecs}
                outfitIdx={outfitIndices[personRecs.person.id] ?? 0}
                flatLays={flatLays}
              />
            ))}
          </div>
        </div>

        {/* MAGAZINE FOOTER */}
        <div className="border-t border-charcoal/10 px-5 md:px-8 py-4 flex items-center justify-between gap-4">
          <p className="font-accent italic text-[12px] md:text-[13px] text-charcoal opacity-65">
            Styled in your family palette.
          </p>
          <p
            className="font-subheading uppercase tracking-[0.32em] text-[9px] md:text-[10px]"
            style={{ color: 'var(--color-terracotta)' }}
          >
            — Jennie
          </p>
        </div>
      </div>
    </section>
  )
}

function LookbookPersonCluster({
  personRecs,
  outfitIdx,
  flatLays,
}: {
  personRecs: PersonRecommendations
  outfitIdx: number
  flatLays: Record<string, string>
}) {
  const { person, recommendations, assignedPrimary } = personRecs
  const heroOutfit = recommendations.outfits[outfitIdx] || recommendations.outfits[0]
  if (!heroOutfit) return null
  const pieces = getPieces(heroOutfit)
  const roleLabel = ROLE_LABELS[person.role]
  const displayName =
    person.displayName && person.displayName !== roleLabel ? person.displayName : roleLabel

  return (
    <div>
      {/* Cluster header */}
      <div className="flex items-center gap-3 mb-4">
        <span
          className="block w-4 h-4 rounded-sm flex-shrink-0"
          style={{ backgroundColor: assignedPrimary.hex }}
          aria-label={`${assignedPrimary.name} palette tone`}
        />
        <div className="flex-1 min-w-0">
          <p
            className="font-subheading uppercase tracking-[0.2em] text-[9px] md:text-[10px] mb-0.5"
            style={{ color: 'var(--color-terracotta)' }}
          >
            {roleLabel}
          </p>
          <p
            className="font-editorial font-normal text-charcoal leading-tight truncate"
            style={{ fontSize: 'clamp(15px, 1.7vw, 19px)' }}
          >
            {displayName} · {assignedPrimary.name}
          </p>
        </div>
      </div>

      {/* Tile mosaic — 3 pieces in a 2-row asymmetric layout */}
      <div className="grid grid-cols-2 gap-2 md:gap-3">
        {/* Hero tile (top piece) — spans both columns, taller */}
        {pieces[0] && (
          <div className="col-span-2">
            <LookbookTile
              piece={pieces[0]}
              paletteHex={assignedPrimary.hex}
              flatLayUrl={flatLays[pieceKeyForPerson(person, 0, outfitIdx)] || GARMENT_CACHE[pieceKeyForPerson(person, 0, outfitIdx)]}
              aspect="aspect-[16/10]"
            />
          </div>
        )}
        {/* Two smaller tiles below */}
        {pieces[1] && (
          <LookbookTile
            piece={pieces[1]}
            paletteHex={assignedPrimary.hex}
            flatLayUrl={flatLays[pieceKeyForPerson(person, 1, outfitIdx)] || GARMENT_CACHE[pieceKeyForPerson(person, 1, outfitIdx)]}
            aspect="aspect-[3/4]"
          />
        )}
        {pieces[2] && (
          <LookbookTile
            piece={pieces[2]}
            paletteHex={assignedPrimary.hex}
            flatLayUrl={flatLays[pieceKeyForPerson(person, 2, outfitIdx)] || GARMENT_CACHE[pieceKeyForPerson(person, 2, outfitIdx)]}
            aspect="aspect-[3/4]"
          />
        )}
      </div>

      {/* Cluster caption */}
      <p className="mt-4 font-accent italic text-[12px] md:text-[13px] text-charcoal opacity-70 leading-snug">
        {recommendations.outfits[0]?.why}
      </p>
    </div>
  )
}

function LookbookTile({
  piece,
  paletteHex,
  flatLayUrl,
  aspect,
}: {
  piece: OutfitPiece
  paletteHex: string
  flatLayUrl?: string
  aspect: string
}) {
  const buyHref = piece.shopMyProductUrl || LTK_FALLBACK_URL

  const tileBody = (
    <>
      {flatLayUrl ? (
        <Image
          src={flatLayUrl}
          alt={piece.name}
          fill
          unoptimized
          className="object-cover"
        />
      ) : (
        <>
          {/* Editorial palette wash — diagonal gradient + subtle paper texture */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(135deg, ${paletteHex}1a 0%, ${paletteHex}55 100%)`,
            }}
          />
          {/* Garment silhouette hint via simple shape — type-specific */}
          <GarmentSilhouette type={piece.type} hex={paletteHex} />
          {/* Caption */}
          <div className="absolute inset-x-0 bottom-0 px-3 md:px-4 py-2 md:py-3">
            <p
              className="font-subheading uppercase tracking-[0.2em] text-[8px] md:text-[9px] mb-0.5"
              style={{ color: 'var(--color-terracotta)' }}
            >
              {piece.type}
            </p>
            <p
              className="font-editorial italic font-normal text-charcoal leading-tight line-clamp-2"
              style={{ fontSize: 'clamp(11px, 1.2vw, 14px)' }}
            >
              {piece.name}
            </p>
          </div>
        </>
      )}
      {/* Shop pin (only when generated image present) */}
      {flatLayUrl && (
        <span
          aria-hidden="true"
          className="absolute top-2 right-2 inline-flex items-center justify-center w-7 h-7 rounded-full bg-charcoal text-off-white text-[10px] font-subheading shadow-md"
        >
          →
        </span>
      )}
    </>
  )

  return (
    <a
      href={buyHref}
      target="_blank"
      rel="noopener noreferrer"
      className="group block relative"
      aria-label={`Shop ${piece.name}`}
    >
      <figure className={`relative w-full ${aspect} overflow-hidden bg-warm-gray-light`}>
        {tileBody}
      </figure>
    </a>
  )
}

/**
 * Simple SVG garment silhouettes — palette-tinted abstract shapes that hint at
 * the piece type without trying to look photoreal. Replaced by real flat-lay
 * images once the AI generation pipeline lands (step 5).
 */
function GarmentSilhouette({ type, hex }: { type: string; hex: string }) {
  const stroke = `${hex}66`
  const fill = `${hex}22`

  return (
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      {type === 'top' && (
        <path
          d="M30 25 L25 35 L25 65 L40 70 L60 70 L75 65 L75 35 L70 25 L60 30 L50 32 L40 30 Z"
          fill={fill}
          stroke={stroke}
          strokeWidth="0.6"
        />
      )}
      {type === 'bottom' && (
        <path
          d="M35 30 L30 75 L42 75 L46 50 L50 75 L62 75 L60 30 Z"
          fill={fill}
          stroke={stroke}
          strokeWidth="0.6"
        />
      )}
      {type === 'shoes' && (
        <>
          <ellipse cx="35" cy="55" rx="14" ry="6" fill={fill} stroke={stroke} strokeWidth="0.6" />
          <ellipse cx="65" cy="55" rx="14" ry="6" fill={fill} stroke={stroke} strokeWidth="0.6" />
        </>
      )}
      {type === 'accessory' && (
        <>
          <circle cx="50" cy="40" r="14" fill="none" stroke={stroke} strokeWidth="0.8" />
          <circle cx="50" cy="40" r="9" fill={fill} stroke={stroke} strokeWidth="0.5" />
        </>
      )}
      {type === 'outerwear' && (
        <path
          d="M25 28 L20 38 L20 70 L35 75 L42 50 L42 75 L58 75 L58 50 L65 75 L80 70 L80 38 L75 28 L65 32 L50 35 L35 32 Z"
          fill={fill}
          stroke={stroke}
          strokeWidth="0.6"
        />
      )}
    </svg>
  )
}
