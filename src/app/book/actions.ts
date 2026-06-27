'use server'

/**
 * Booking Server Action — Jennie Slade Photography
 *
 * Phase 1 (now): validate + log + return success.
 *
 * Roadmap (extension points stubbed below — wire each one when ready):
 *   - Resend: send confirmation email to client + notification to Jennie
 *   - Lead store: persist to Supabase/Firebase/JSON for CRM dashboard
 *   - Flodesk: subscribe to "Photography Inquiry" segment, trigger nurture flow
 *   - Stripe: when client picks a deposit/package, create Checkout Session
 *   - Contracts: generate session contract (HelloSign / DocuSeal / homemade)
 *
 * Lead schema (mirror in DB/CRM):
 *   id (uuid), createdAt, status, name, email, phone,
 *   sessionType, packageInterest, preferredDates[], preferredTime,
 *   groupSize, locationPreference, message,
 *   flodeskSubscribed, contractId, stripePaymentIntentId
 */

export type BookingFormResult =
  | { success: true; leadId: string }
  | { success: false; errors: Record<string, string> }

export type LeadStatus =
  | 'inquiry'
  | 'quoted'
  | 'contract-sent'
  | 'deposit-paid'
  | 'session-booked'
  | 'completed'
  | 'cancelled'

export interface Lead {
  id: string
  createdAt: string
  status: LeadStatus
  name: string
  email: string
  phone: string
  sessionType: string
  packageInterest: string
  preferredDates: string[]
  preferredTime: string
  groupSize: string
  locationPreference: string
  message: string
  flodeskSubscribed: boolean
  contractId: string | null
  stripePaymentIntentId: string | null
}

function generateLeadId(): string {
  // Short readable ID for inbox subject lines, not security-critical.
  // Format: JSL-YYYYMMDD-XXXX
  const now = new Date()
  const datePart = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}`
  const randPart = Math.random().toString(36).substring(2, 6).toUpperCase()
  return `JSL-${datePart}-${randPart}`
}

export async function submitBookingForm(formData: FormData): Promise<BookingFormResult> {
  // ── Honeypot check ───────────────────────────────────────────────────────
  if (formData.get('website')) {
    return { success: true, leadId: 'spam-ignored' }
  }

  // ── Extract fields ───────────────────────────────────────────────────────
  const name = (formData.get('name') as string | null)?.trim() ?? ''
  const email = (formData.get('email') as string | null)?.trim() ?? ''
  const phone = (formData.get('phone') as string | null)?.trim() ?? ''
  const sessionType = (formData.get('sessionType') as string | null)?.trim() ?? ''
  const packageInterest = (formData.get('packageInterest') as string | null)?.trim() ?? ''
  const date1 = (formData.get('date1') as string | null)?.trim() ?? ''
  const date2 = (formData.get('date2') as string | null)?.trim() ?? ''
  const date3 = (formData.get('date3') as string | null)?.trim() ?? ''
  const preferredTime = (formData.get('preferredTime') as string | null)?.trim() ?? ''
  const groupSize = (formData.get('groupSize') as string | null)?.trim() ?? ''
  const locationPreference = (formData.get('locationPreference') as string | null)?.trim() ?? ''
  const message = (formData.get('message') as string | null)?.trim() ?? ''

  // ── Validation ──────────────────────────────────────────────────────────
  const errors: Record<string, string> = {}

  if (!name) errors.name = 'Please enter your name'
  if (!email) {
    errors.email = 'Please enter your email address'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'Please enter a valid email address'
  }
  if (!phone) errors.phone = 'Please enter a phone number'
  if (!sessionType) errors.sessionType = 'Please pick a session type'
  if (!date1) errors.date1 = 'Please give me at least one preferred date'
  if (!message) errors.message = 'Tell me a little about what you have in mind'

  if (Object.keys(errors).length > 0) {
    return { success: false, errors }
  }

  // ── Build lead record ───────────────────────────────────────────────────
  const lead: Lead = {
    id: generateLeadId(),
    createdAt: new Date().toISOString(),
    status: 'inquiry',
    name,
    email,
    phone,
    sessionType,
    packageInterest,
    preferredDates: [date1, date2, date3].filter(Boolean),
    preferredTime,
    groupSize,
    locationPreference,
    message,
    flodeskSubscribed: false,
    contractId: null,
    stripePaymentIntentId: null,
  }

  // ── Log lead (Phase 1 storage) ───────────────────────────────────────────
  console.log('[Booking] New lead:', lead)

  // ── Phase 2: persist to lead store ──────────────────────────────────────
  // TODO: Save to Supabase / Firebase / Postgres.
  // await leadStore.create(lead)

  // ── Phase 3: Resend notification ────────────────────────────────────────
  // TODO: npm install resend, set RESEND_API_KEY.
  // await resend.emails.send({
  //   from: 'Booking <noreply@jennieslade.com>',
  //   to: 'jennie@jennieslade.com',
  //   subject: `New booking lead ${lead.id} — ${lead.sessionType} — ${lead.name}`,
  //   html: renderInternalLeadEmail(lead),
  // })
  // await resend.emails.send({
  //   from: 'Jennie Slade <jennie@jennieslade.com>',
  //   to: lead.email,
  //   subject: `Got your inquiry — talk soon`,
  //   html: renderClientConfirmationEmail(lead),
  // })

  // ── Phase 4: Flodesk subscribe + segment ────────────────────────────────
  // TODO: POST to Flodesk API. Subscribe to "Inquiries" segment based on sessionType.
  // await flodesk.subscribe({
  //   email: lead.email,
  //   first_name: lead.name.split(' ')[0],
  //   segments: [FLODESK_SEGMENT_BY_SESSION[lead.sessionType]],
  //   source: 'booking-form',
  // })

  // ── Phase 5: Stripe deposit (when client opts in) ───────────────────────
  // TODO: If lead.packageInterest is set + deposit flow enabled,
  // create a Stripe Checkout Session and return the URL in BookingFormResult
  // so the client redirects to pay the deposit.

  // ── Phase 6: Contract draft ─────────────────────────────────────────────
  // TODO: When package + date locked in, generate a session contract draft
  // (DocuSeal or in-house signature) and email to client for sign.

  return { success: true, leadId: lead.id }
}
