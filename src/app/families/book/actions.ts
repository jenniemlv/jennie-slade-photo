'use server'

/**
 * Server action for the family booking form.
 *
 * Posts the booking payload to a Zapier "Catch Hook" webhook. Zapier then:
 *   1. Creates a client in Pixifi
 *   2. Creates an event (session) linked to the client
 *   3. Creates the invoice for the selected package
 *   4. Pixifi's own Workflow rule auto-emails the contract on event creation
 * Plus a separate Zap step pings Jennie for personal follow-up within minutes.
 *
 * Shaped for React `useActionState`: signature is (prevState, formData) and it
 * RETURNS a BookingState on validation/transport failure (so the client can
 * show an inline error and keep the user's typed values) instead of throwing
 * to the error boundary and nuking the whole form. Only success redirects.
 *
 * Env: ZAPIER_FAMILY_BOOKING_WEBHOOK — full Zapier Catch Hook URL.
 * NOTE: Pixifi has no public REST API (research 2026-06-11). Zapier is the
 * only supported integration path.
 */

import { redirect } from 'next/navigation'

export type BookingState = {
  status: 'idle' | 'error'
  message?: string
  // Echo back submitted values so a remount (no-JS path) can refill the form.
  values?: Record<string, string>
}

const PACKAGE_LABELS: Record<string, string> = {
  signature: 'Signature - $625 / 45 min',
  editorial: 'Editorial - $895 / 75 min',
  heirloom: 'Heirloom - $1,195 / 90 min',
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function submitFamilyBooking(
  _prev: BookingState,
  formData: FormData
): Promise<BookingState> {
  const get = (k: string) => String(formData.get(k) ?? '').trim()

  const values: Record<string, string> = {
    name: get('name'),
    email: get('email'),
    phone: get('phone'),
    package: get('package'),
    preferred_date: get('preferred_date'),
    backup_date: get('backup_date'),
    time_pref: get('time_pref'),
    adults: get('adults'),
    kids_ages: get('kids_ages'),
    location_vibe: get('location_vibe'),
    mobility: get('mobility'),
    pinterest_url: get('pinterest_url'),
    notes: get('notes'),
    heard_from: get('heard_from'),
  }

  // Friendly, field-aware validation. Only the five core fields gate submit.
  if (!values.name) return { status: 'error', message: 'Add your name so I know who I am talking to.', values }
  if (!EMAIL_RE.test(values.email))
    return { status: 'error', message: 'That email does not look right. Mind checking it?', values }
  if (!values.phone) return { status: 'error', message: 'Add a phone number so I can reach you fast.', values }
  if (!values.package)
    return { status: 'error', message: 'Pick a collection so I can send the right invoice.', values }
  if (!values.preferred_date) return { status: 'error', message: 'Add the date you are hoping for.', values }

  // Guard against past dates (belt to the browser's min attribute).
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const picked = new Date(`${values.preferred_date}T00:00:00`)
  if (Number.isNaN(picked.getTime()) || picked < today)
    return { status: 'error', message: 'That date has passed. Pick an upcoming one.', values }

  const payload = {
    ...values,
    package_key: values.package,
    package_label: PACKAGE_LABELS[values.package] ?? 'unspecified',
    adults: Number(values.adults || 0),
    session_type: 'family',
    submitted_at: new Date().toISOString(),
    source: 'jennieslade.com/families/book',
  }

  const webhook = process.env.ZAPIER_FAMILY_BOOKING_WEBHOOK
  if (!webhook) {
    console.error('[families/book] ZAPIER_FAMILY_BOOKING_WEBHOOK not set')
    return {
      status: 'error',
      message: 'Booking is not fully wired up yet. Text me and I will hold your date personally.',
      values,
    }
  }

  try {
    const res = await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      // Bound the wait so a hung hook never freezes the form.
      signal: AbortSignal.timeout(8000),
    })
    if (!res.ok) {
      console.error('[families/book] Zapier webhook failed', res.status)
      return {
        status: 'error',
        message: 'Something hiccuped on my end. Your info is safe, tap send again.',
        values,
      }
    }
  } catch (err) {
    console.error('[families/book] Zapier webhook threw', err)
    return {
      status: 'error',
      message: 'That did not go through. Your info is safe, give it another tap.',
      values,
    }
  }

  // Success only. Redirect to the tailored confirmation.
  redirect(`/booked?session=family&pkg=${payload.package_key}`)
}
