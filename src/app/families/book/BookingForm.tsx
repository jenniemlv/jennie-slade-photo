'use client'

/**
 * BookingForm — client form for /families/book.
 *
 * Rebuilt after the UX review: five core required fields up top, everything
 * else tucked in an optional "Tell me more" disclosure so a warm IG lead on a
 * phone isn't hit with a 15-field wall. Uses useActionState for inline errors
 * (no crash-to-boundary, typed values preserved) and useFormStatus for a real
 * pending state on the button.
 */

import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import { submitFamilyBooking, type BookingState } from './actions'

const LABEL =
  'block text-[13px] font-medium tracking-[0.08em] uppercase text-[color:var(--color-charcoal)] mb-2'
const OPTIONAL_TAG =
  'text-[11px] font-normal tracking-normal normal-case text-[color:var(--color-gray)] ml-2'
const INPUT =
  'w-full bg-[color:var(--color-white)] border border-[color:var(--color-warm-gray)] px-4 py-3 text-[color:var(--color-charcoal)] text-base placeholder:text-[color:var(--color-gray)] focus:outline-none focus:border-[color:var(--color-terracotta)] focus:ring-1 focus:ring-[color:var(--color-terracotta)]'

const PACKAGES = [
  { key: 'signature', name: 'Signature', meta: '$625 · 45 min · 40 images' },
  { key: 'editorial', name: 'Editorial', meta: '$895 · 75 min · 75 images', popular: true },
  { key: 'heirloom', name: 'Heirloom', meta: '$1,195 · 90 min · 100+ images, two locations' },
]

const initialState: BookingState = { status: 'idle' }

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-[color:var(--color-charcoal)] text-[color:var(--color-off-white)] px-10 py-5 text-[11px] tracking-[0.24em] uppercase hover:bg-[color:var(--color-terracotta)] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
    >
      {pending ? 'Sending your inquiry…' : 'Send inquiry'}
    </button>
  )
}

export default function BookingForm({ initialPkg }: { initialPkg?: string }) {
  const [state, formAction] = useActionState(submitFamilyBooking, initialState)
  const v = state.values ?? {}
  const selectedPkg =
    initialPkg && PACKAGES.some((p) => p.key === initialPkg) ? initialPkg : 'editorial'
  // Client-side min date so the native picker can't offer the past.
  const today = new Date().toISOString().slice(0, 10)

  return (
    <form action={formAction} className="space-y-8">
      {/* ── Core: the five fields that let Jennie reply ─────────────────── */}
      <fieldset className="space-y-6">
        <div>
          <label htmlFor="name" className={LABEL}>
            Your name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            defaultValue={v.name ?? ''}
            className={INPUT}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="email" className={LABEL}>
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              defaultValue={v.email ?? ''}
              className={INPUT}
            />
          </div>
          <div>
            <label htmlFor="phone" className={LABEL}>
              Phone
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              inputMode="tel"
              autoComplete="tel"
              defaultValue={v.phone ?? ''}
              className={INPUT}
            />
          </div>
        </div>

        {/* Package as selectable cards, Editorial pre-selected. */}
        <div>
          <span className={LABEL}>Collection</span>
          <div className="space-y-3">
            {PACKAGES.map((opt) => (
              <label
                key={opt.key}
                className="flex items-start gap-4 p-4 bg-[color:var(--color-white)] border border-[color:var(--color-warm-gray)] cursor-pointer hover:border-[color:var(--color-terracotta)] transition-colors has-[:checked]:border-[color:var(--color-terracotta)] has-[:checked]:bg-[color:var(--color-warm-gray-light)]/50"
              >
                <input
                  type="radio"
                  name="package"
                  value={opt.key}
                  required
                  defaultChecked={(v.package || selectedPkg) === opt.key}
                  className="mt-1.5 accent-[color:var(--color-terracotta)]"
                />
                <span>
                  <span className="block type-body text-base text-[color:var(--color-charcoal)]">
                    {opt.name}
                    {opt.popular && (
                      <span className="ml-2 text-[11px] uppercase tracking-[0.12em] text-[color:var(--color-terracotta)]">
                        most booked
                      </span>
                    )}
                  </span>
                  <span className="block type-body text-sm text-[color:var(--color-gray)]">
                    {opt.meta}
                  </span>
                </span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="preferred_date" className={LABEL}>
            Preferred date
          </label>
          <input
            id="preferred_date"
            name="preferred_date"
            type="date"
            required
            min={today}
            defaultValue={v.preferred_date ?? ''}
            className={INPUT}
          />
        </div>
      </fieldset>

      {/* ── Optional: everything Jennie can also sort out in follow-up ──── */}
      <details className="group border-t border-[color:var(--color-warm-gray)] pt-6">
        <summary className="flex items-center justify-between cursor-pointer list-none">
          <span className="text-[13px] font-medium tracking-[0.08em] uppercase text-[color:var(--color-charcoal)]">
            Want to tell me more now?
            <span className={OPTIONAL_TAG}>optional</span>
          </span>
          <span
            aria-hidden
            className="w-6 h-px bg-[color:var(--color-gray)] transition-transform group-open:rotate-90 shrink-0"
          />
        </summary>

        <div className="space-y-6 pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="backup_date" className={LABEL}>
                Backup date
              </label>
              <input
                id="backup_date"
                name="backup_date"
                type="date"
                min={today}
                defaultValue={v.backup_date ?? ''}
                className={INPUT}
              />
            </div>
            <div>
              <label htmlFor="time_pref" className={LABEL}>
                Time of day
              </label>
              <select
                id="time_pref"
                name="time_pref"
                defaultValue={v.time_pref ?? ''}
                className={INPUT}
              >
                <option value="">No preference</option>
                <option value="morning">Morning (before 10am)</option>
                <option value="golden">Evening golden hour</option>
                <option value="either">Either works</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="adults" className={LABEL}>
                Adults in the session
              </label>
              <input
                id="adults"
                name="adults"
                type="number"
                min={1}
                max={12}
                inputMode="numeric"
                defaultValue={v.adults ?? '2'}
                className={INPUT}
              />
            </div>
            <div>
              <label htmlFor="kids_ages" className={LABEL}>
                Kids &amp; ages
              </label>
              <input
                id="kids_ages"
                name="kids_ages"
                type="text"
                placeholder="e.g. 12, 9, 6, 4, 1"
                defaultValue={v.kids_ages ?? ''}
                className={INPUT}
              />
            </div>
          </div>

          <div>
            <label htmlFor="location_vibe" className={LABEL}>
              Location vibe
            </label>
            <select
              id="location_vibe"
              name="location_vibe"
              defaultValue={v.location_vibe ?? ''}
              className={INPUT}
            >
              <option value="">No preference — suggest one</option>
              <option value="desert">Desert (Red Rock / Valley of Fire)</option>
              <option value="trail">Summerlin trail / park</option>
              <option value="home">At home / lifestyle</option>
              <option value="urban">Urban downtown</option>
            </select>
          </div>

          <div>
            <label htmlFor="mobility" className={LABEL}>
              Anything I should know?
            </label>
            <textarea
              id="mobility"
              name="mobility"
              rows={3}
              placeholder="Mobility, twins, pregnancy, a wild toddler — all welcome."
              defaultValue={v.mobility ?? ''}
              className={INPUT}
            />
          </div>

          <div>
            <label htmlFor="pinterest_url" className={LABEL}>
              Pinterest board or reference link
            </label>
            <input
              id="pinterest_url"
              name="pinterest_url"
              type="url"
              placeholder="https://..."
              defaultValue={v.pinterest_url ?? ''}
              className={INPUT}
            />
          </div>

          <div>
            <label htmlFor="heard_from" className={LABEL}>
              How did you hear about me?
            </label>
            <input
              id="heard_from"
              name="heard_from"
              type="text"
              defaultValue={v.heard_from ?? ''}
              className={INPUT}
            />
          </div>
        </div>
      </details>

      {/* Inline error — replaces the old crash-to-boundary behavior. */}
      {state.status === 'error' && state.message && (
        <p
          role="alert"
          aria-live="polite"
          className="type-body text-sm text-[color:var(--color-terracotta)] bg-[color:var(--color-terracotta)]/10 border border-[color:var(--color-terracotta)]/30 px-4 py-3"
        >
          {state.message}
        </p>
      )}

      <div className="pt-2">
        <SubmitButton />
        <p className="text-xs text-center text-[color:var(--color-gray)] mt-4 leading-relaxed">
          I confirm your date personally within one business day. Your contract and
          $300 retainer invoice follow by email — the retainer holds your date, and
          nothing is charged just to inquire.
        </p>
      </div>
    </form>
  )
}
