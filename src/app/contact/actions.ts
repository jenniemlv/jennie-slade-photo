'use server'

/**
 * Contact form Server Action — Jennie Slade Photography
 *
 * What this does:
 *   1. Checks for honeypot spam (D-08)
 *   2. Validates all required fields (D-05, D-01, D-02, D-03)
 *   3. Logs form data to console for now (D-06)
 *   4. Returns success or validation errors
 *
 * Email delivery via Resend is stubbed below with clear instructions
 * for wiring it up when Jennie's account is ready (D-06, D-09, D-11).
 */

// RESEND INTEGRATION (when ready):
// 1. npm install resend
// 2. Add RESEND_API_KEY to .env.local
// 3. Uncomment the import and send call below:
// import { Resend } from 'resend'
// const resend = new Resend(process.env.RESEND_API_KEY)

export type ContactFormResult =
  | { success: true }
  | { success: false; errors: Record<string, string> }

export async function submitContactForm(formData: FormData): Promise<ContactFormResult> {
  // ── Honeypot check (D-08) ────────────────────────────────────────────────
  // The "website" field is invisible to real users. Bots often fill every field.
  // If it's filled, silently return success (bots think it worked, they move on).
  const honeypot = formData.get('website')
  if (honeypot) {
    return { success: true }
  }

  // ── Extract fields ───────────────────────────────────────────────────────
  const name = (formData.get('name') as string | null)?.trim() ?? ''
  const email = (formData.get('email') as string | null)?.trim() ?? ''
  const sessionType = (formData.get('sessionType') as string | null)?.trim() ?? ''
  const otherDetails = (formData.get('otherDetails') as string | null)?.trim() ?? ''
  const preferredDate = (formData.get('preferredDate') as string | null)?.trim() ?? ''
  const message = (formData.get('message') as string | null)?.trim() ?? ''

  // ── Server-side validation (D-05) ───────────────────────────────────────
  const errors: Record<string, string> = {}

  if (!name) {
    errors.name = 'Please enter your name'
  }

  if (!email) {
    errors.email = 'Please enter your email address'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'Please enter a valid email address'
  }

  if (!sessionType) {
    errors.sessionType = 'Please select a session type'
  }

  // "Other" requires the additional details field (D-03)
  if (sessionType === 'Other' && !otherDetails) {
    errors.otherDetails = "Please tell me a bit about what you're looking for"
  }

  if (!message) {
    errors.message = "Please include a message so I know how to help"
  }

  if (Object.keys(errors).length > 0) {
    return { success: false, errors }
  }

  // ── Log form data (D-06) ─────────────────────────────────────────────────
  // This is where the email send will go once Resend is configured.
  // For now, log so Jennie can confirm submissions are arriving.
  console.log('[Contact Form] New inquiry received:', {
    name,
    email,
    sessionType,
    otherDetails: sessionType === 'Other' ? otherDetails : undefined,
    preferredDate: preferredDate || undefined,
    message,
  })

  // ── Email send (stub — uncomment when Resend is ready) ──────────────────
  // await resend.emails.send({
  //   from: 'Contact Form <noreply@jennieslade.com>',
  //   to: 'jennie@jennieslade.com',
  //   subject: `New inquiry from ${name} — ${sessionType}`,
  //   html: `
  //     <p><strong>Name:</strong> ${name}</p>
  //     <p><strong>Email:</strong> ${email}</p>
  //     <p><strong>Session Type:</strong> ${sessionType}${otherDetails ? ` — ${otherDetails}` : ''}</p>
  //     ${preferredDate ? `<p><strong>Preferred Date:</strong> ${preferredDate}</p>` : ''}
  //     <p><strong>Message:</strong><br>${message}</p>
  //   `,
  // })

  return { success: true }
}
