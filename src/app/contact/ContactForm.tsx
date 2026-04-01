'use client'

/**
 * ContactForm — Client Component
 *
 * Handles the inquiry form for the /contact page.
 *
 * Features:
 *   - All required fields: Name, Email, Session Type, Message
 *   - Optional field: Preferred Date (D-04)
 *   - Conditional field: Other Details — appears when "Other" is selected (D-03)
 *   - Honeypot field: invisible "website" input to catch spam bots (D-08)
 *   - Client-side validation with warm inline error messages (D-05)
 *   - Server Action via submitContactForm (D-06)
 *   - Success state: form replaced by warm confirmation message (D-07)
 *
 * See: src/app/contact/actions.ts for the Server Action.
 * See: CLAUDE.md and 06-CONTEXT.md for all design decisions.
 */

import { useState, useTransition } from 'react'
import Button from '@/components/ui/Button'
import { submitContactForm } from './actions'

// ── Session type options (D-02) ───────────────────────────────────────────────
const SESSION_TYPES = [
  'Wedding',
  'Family',
  'Senior Portraits',
  'Headshots / Corporate',
  'Other',
] as const

// ── Input base class (D-20) ───────────────────────────────────────────────────
// Shared across all input types: text, email, select, textarea, date.
const inputClass =
  'w-full rounded-sm border border-warm-gray bg-white py-3 px-4 type-body ' +
  'focus:border-charcoal focus:ring-1 focus:ring-charcoal focus:outline-none transition-colors'

// ── Small field-level error text ──────────────────────────────────────────────
const errorClass = 'mt-1 text-sm text-red-700'

export default function ContactForm() {
  // ── State ─────────────────────────────────────────────────────────────────
  const [isSuccess, setIsSuccess] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [sessionType, setSessionType] = useState('')
  const [isPending, startTransition] = useTransition()

  // ── Client-side validation ────────────────────────────────────────────────
  function validate(formData: FormData): Record<string, string> {
    const errs: Record<string, string> = {}
    const name = (formData.get('name') as string)?.trim()
    const email = (formData.get('email') as string)?.trim()
    const type = (formData.get('sessionType') as string)?.trim()
    const otherDetails = (formData.get('otherDetails') as string)?.trim()
    const message = (formData.get('message') as string)?.trim()

    if (!name) errs.name = 'Please enter your name'
    if (!email) {
      errs.email = 'Please enter your email address'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = 'Please enter a valid email address'
    }
    if (!type) errs.sessionType = 'Please select a session type'
    if (type === 'Other' && !otherDetails) {
      errs.otherDetails = "Please tell me a bit about what you're looking for"
    }
    if (!message) errs.message = 'Please include a message so I know how to help'

    return errs
  }

  // ── Form submit handler ───────────────────────────────────────────────────
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)

    // Run client-side validation first
    const clientErrors = validate(formData)
    if (Object.keys(clientErrors).length > 0) {
      setErrors(clientErrors)
      return
    }

    // Clear any previous errors, then call the Server Action
    setErrors({})
    startTransition(async () => {
      const result = await submitContactForm(formData)
      if (result.success) {
        setIsSuccess(true)
      } else {
        setErrors(result.errors)
      }
    })
  }

  // ── Success state: replace form with warm confirmation (D-07) ─────────────
  if (isSuccess) {
    return (
      <div className="max-w-xl mx-auto text-center py-12">
        {/* Simple circle-check SVG icon — 48px, charcoal */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-12 h-12 mx-auto mb-6 text-charcoal"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M8 12l3 3 5-5" />
        </svg>

        <p className="type-body mb-3">
          Thank you. I got your message and I&apos;ll be in touch soon.
        </p>
        <p className="type-heading">I usually respond within 24 hours.</p>
      </div>
    )
  }

  // ── Form ─────────────────────────────────────────────────────────────────
  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-label="Contact inquiry form"
      className="max-w-xl mx-auto mt-10"
    >
      {/*
        Honeypot field (D-08) — visually hidden, never visible to real users.
        Placed before the real fields so bots that fill top-to-bottom catch it.
        tabIndex={-1} removes it from keyboard navigation.
        autoComplete="off" prevents browsers from auto-filling it.
      */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px]"
      />

      <div className="space-y-6">

        {/* ── Name (D-01) ───────────────────────────────────────────────── */}
        <div>
          <label htmlFor="name" className="type-heading block mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            autoComplete="name"
            className={inputClass}
            aria-describedby={errors.name ? 'name-error' : undefined}
            onChange={() => setErrors((prev) => ({ ...prev, name: '' }))}
          />
          {errors.name && (
            <p id="name-error" className={errorClass} role="alert">
              {errors.name}
            </p>
          )}
        </div>

        {/* ── Email (D-01) ──────────────────────────────────────────────── */}
        <div>
          <label htmlFor="email" className="type-heading block mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            autoComplete="email"
            className={inputClass}
            aria-describedby={errors.email ? 'email-error' : undefined}
            onChange={() => setErrors((prev) => ({ ...prev, email: '' }))}
          />
          {errors.email && (
            <p id="email-error" className={errorClass} role="alert">
              {errors.email}
            </p>
          )}
        </div>

        {/* ── Session Type (D-01, D-02) ─────────────────────────────────── */}
        <div>
          <label htmlFor="sessionType" className="type-heading block mb-2">
            Session Type
          </label>
          <select
            id="sessionType"
            name="sessionType"
            required
            value={sessionType}
            onChange={(e) => {
              setSessionType(e.target.value)
              setErrors((prev) => ({ ...prev, sessionType: '', otherDetails: '' }))
            }}
            className={inputClass}
            aria-describedby={errors.sessionType ? 'sessionType-error' : undefined}
          >
            <option value="">Select a session type...</option>
            {SESSION_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          {errors.sessionType && (
            <p id="sessionType-error" className={errorClass} role="alert">
              {errors.sessionType}
            </p>
          )}
        </div>

        {/* ── Other Details — conditional, shown when "Other" selected (D-03) */}
        {sessionType === 'Other' && (
          <div>
            <label htmlFor="otherDetails" className="type-heading block mb-2">
              Tell me more about what you&apos;re looking for
            </label>
            <input
              type="text"
              id="otherDetails"
              name="otherDetails"
              required
              className={inputClass}
              aria-describedby={errors.otherDetails ? 'otherDetails-error' : undefined}
              onChange={() => setErrors((prev) => ({ ...prev, otherDetails: '' }))}
            />
            {errors.otherDetails && (
              <p id="otherDetails-error" className={errorClass} role="alert">
                {errors.otherDetails}
              </p>
            )}
          </div>
        )}

        {/* ── Preferred Date — optional (D-04, D-23) ───────────────────── */}
        <div>
          <label htmlFor="preferredDate" className="type-heading block mb-2">
            Preferred Date{' '}
            <span className="text-gray normal-case" style={{ letterSpacing: '0.02em', fontFamily: 'inherit', fontSize: '11px' }}>
              (optional)
            </span>
          </label>
          <input
            type="date"
            id="preferredDate"
            name="preferredDate"
            className={inputClass}
          />
        </div>

        {/* ── Message (D-01, D-22) ─────────────────────────────────────── */}
        <div>
          <label htmlFor="message" className="type-heading block mb-2">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            className={inputClass}
            aria-describedby={errors.message ? 'message-error' : undefined}
            onChange={() => setErrors((prev) => ({ ...prev, message: '' }))}
          />
          {errors.message && (
            <p id="message-error" className={errorClass} role="alert">
              {errors.message}
            </p>
          )}
        </div>

        {/* ── Submit button (D-18) ─────────────────────────────────────── */}
        {/* Centered on mobile, left-aligned / auto-width on md+ */}
        <div className="flex justify-center md:justify-start">
          <Button
            type="submit"
            disabled={isPending}
            className="w-full md:w-auto"
          >
            {isPending ? 'Sending...' : 'Send Message'}
          </Button>
        </div>

      </div>
    </form>
  )
}
