/**
 * Section — layout primitive that wraps every content block on the site.
 *
 * Usage:
 *   <Section>                     — white background (default)
 *   <Section variant="muted">     — off-white background (#f0eeeb)
 *   <Section variant="warm">      — warm-gray-light background (#e3e0da)
 *
 * The inner div constrains content to max-width 1200px with consistent
 * horizontal padding (24px mobile, 32px desktop) and 80px vertical padding.
 * Pass an additional `className` to override or extend styles on the outer element.
 */

type SectionVariant = 'default' | 'muted' | 'warm'

interface SectionProps {
  children: React.ReactNode
  variant?: SectionVariant
  className?: string
  id?: string
}

// Complete class strings are required — Tailwind v4 scans statically and cannot
// detect dynamically constructed class names (e.g., `bg-${variant}`).
const variantClasses: Record<SectionVariant, string> = {
  default: 'bg-off-white',
  muted: 'bg-warm-gray-light',
  warm: 'bg-warm-gray',
}

export default function Section({
  children,
  variant = 'default',
  className = '',
  id,
}: SectionProps) {
  return (
    <section
      id={id}
      className={`${variantClasses[variant]} py-20 ${className}`}
    >
      {/* Mobile: 24px padding. Desktop (md+): 32px padding. Max-width 1200px centered. */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
        {children}
      </div>
    </section>
  )
}
