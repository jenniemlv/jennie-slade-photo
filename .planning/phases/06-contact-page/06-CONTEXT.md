# Phase 6: Contact Page - Context

**Gathered:** 2026-04-01
**Status:** Ready for planning

<domain>
## Phase Boundary

Build the contact/inquiry page with a simple form that validates, shows success confirmation, and has spam protection. Email delivery via Resend will be wired as a placeholder Server Action (Jennie doesn't have a Resend account yet — the form works visually and validates, but email sending is stubbed until Resend is configured).

</domain>

<decisions>
## Implementation Decisions

### Form Fields
- **D-01:** Fields in order: Name (required), Email (required), Session Type (dropdown, required), Preferred Date (date picker, optional), Message (textarea, required).
- **D-02:** Session type dropdown options: Wedding, Family, Senior Portraits, Headshots / Corporate, Other.
- **D-03:** When "Other" is selected, a text input appears below the dropdown asking "Tell me more about what you're looking for." This field becomes required when Other is selected.
- **D-04:** Preferred date is optional — not everyone knows their date yet.

### Form Behavior
- **D-05:** Client-side validation with clear inline error messages below each field. Red text but warm tone ("Please enter your name" not "Error: field required").
- **D-06:** Form submission via Next.js Server Action. For now, the action logs the form data to console and returns success. When Resend is set up, it will send an email to jennie@jennieslade.com.
- **D-07:** Success state: form fields hide, replaced by a warm confirmation message ("Thank you! I'll be in touch soon.") with a subtle check icon.
- **D-08:** Honeypot field: hidden input named "website" — if filled (by bots), submission is silently rejected.

### Email Delivery (Deferred)
- **D-09:** Resend will be the email service (free tier, 100/day). Jennie does not have an account yet. The Server Action is structured for Resend but currently stubbed.
- **D-10:** Email goes to jennie@jennieslade.com.
- **D-11:** When Resend is configured later: npm install resend, add RESEND_API_KEY to .env.local, uncomment the send call in the Server Action. No code restructuring needed.

### Pricing
- **D-12:** Include a simple pricing section above or near the form. Soft, warm presentation. Not a pricing table. More like editorial text with "starting at" ranges.
- **D-13:** Pricing details (from Jennie):
  - Families: starting at $500
  - Seniors: starting at $500
  - Individual Headshots: starting at $200 (5 edited images)
  - Corporate Teams: $150/person (3 edited images per person)
  - Teams of 10+: $100/person
  - Weddings: starting at $3,000
- **D-13b:** Keep it warm and inviting. Use "Investment" as the heading, not "Pricing." Frame it as investing in memories.
- **D-13c:** Simple editorial layout. List each session type with "starting at $X" and a one-line description. Not a pricing table or card grid. Clean, minimal, warm.
- **D-13d:** Add a note at the bottom: "Want something custom? I love creating sessions that are uniquely yours. Just tell me what you're envisioning." This covers the custom session option Jennie mentioned.

### Page Layout
- **D-14:** Page heading "Get in Touch" in type-title, centered.
- **D-15:** Short warm intro paragraph above the form (first person, inviting, not salesy).
- **D-16:** Form centered on the page, max-w-xl or max-w-lg for comfortable width.
- **D-17:** Warm cream background (default Section). Form inputs with warm-gray borders, cream/off-white fill.
- **D-18:** Submit button: primary style (warm taupe bg, cream text).
- **D-19:** Top padding for header clearance (pt-32 md:pt-40).

### Form Styling
- **D-20:** Input fields: rounded-sm border, border-warm-gray, bg-white (warm white), py-3 px-4. Focus state: border-charcoal with subtle ring.
- **D-21:** Labels above each field in type-heading style (small uppercase Montserrat).
- **D-22:** Textarea: 5 rows minimum, same styling as inputs.
- **D-23:** Date input: native HTML date picker (simple, works everywhere).

### Claude's Discretion
- Exact intro copy (follow jennie-slade-voice)
- Exact success message copy
- Error message wording
- Form spacing and layout details
- Whether to add a small note about response time ("I usually respond within 24 hours")
- Accessibility: proper label/input associations, aria attributes

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Brand & Design
- `CLAUDE.md` — Voice guidelines, design system
- `.claude/skills/jennie-slade-photo-brand/SKILL.md` — Full brand style guide with layout patterns

### Existing Components
- `src/components/layout/Section.tsx` — Section wrapper
- `src/components/ui/Button.tsx` — Primary/secondary buttons
- `src/components/ui/ScrollFade.tsx` — Scroll animations
- `src/app/globals.css` — Brand colors, typography classes

### Research
- `.planning/research/STACK.md` — Resend v6.9.4 + Server Actions recommended
- `.planning/research/ARCHITECTURE.md` — Contact form architecture guidance

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `Section` component with cream background (default variant)
- `Button` with primary variant (warm taupe)
- ScrollFade for sections below the fold
- Typography classes (type-title, type-heading, type-body)

### Established Patterns
- Server Components by default, `'use client'` for interactivity
- pt-32 md:pt-40 for header clearance
- Warm taupe (#4b4746) text, cream (#f8f4ef) backgrounds
- Form is the first `'use client'` page-level component in the project

### Integration Points
- `src/app/contact/page.tsx` — New page
- `src/app/contact/actions.ts` — Server Action for form handling
- About page CTA button already links to /contact
- Homepage doesn't link to /contact directly (nav does)

</code_context>

<specifics>
## Specific Ideas

- The contact page should feel like an invitation, not a form. "I'd love to hear from you" energy.
- Keep it simple — 5 fields max (plus honeypot). Don't overwhelm potential clients.
- The "Other" option with a text field is smart — covers engagement sessions, events, commercial work, etc.
- Success message should feel personal: "Thank you! I got your message and I'll be in touch soon."
- No CAPTCHA. Honeypot is invisible to real users and catches most bots.

</specifics>

<deferred>
## Deferred Ideas

- Resend account setup and email delivery (V2 — when ready to deploy)
- DNS TXT record verification for jennieslade.com on Resend
- Auto-response email to the client after form submission

</deferred>

---

*Phase: 06-contact-page*
*Context gathered: 2026-04-01*
