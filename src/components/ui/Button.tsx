/**
 * Button — primary and secondary CTA button component.
 *
 * Usage:
 *   <Button href="/contact">Get in Touch</Button>       — primary link button
 *   <Button variant="secondary" href="/portfolio">      — secondary link button
 *   <Button onClick={handleClick}>Submit</Button>       — primary button (no href)
 *
 * When `href` is provided, renders as a Next.js <Link> (anchor tag).
 * Otherwise renders as a <button> element.
 *
 * Typography uses the .type-subheading class (Apparel font, 15px, uppercase, 0.07em spacing).
 * This is intentional — buttons are styled as subheadings per the design spec (D-17).
 */

import Link from 'next/link'

type ButtonVariant = 'primary' | 'secondary'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  href?: string
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

// Complete class strings required — no dynamic construction (Tailwind v4 static scanner).
const variantClasses: Record<ButtonVariant, string> = {
  // Primary: black bg, white text, 80% opacity on hover (D-17)
  primary: 'bg-black text-white border border-black hover:opacity-80',
  // Secondary: transparent bg, black border, inverts to black bg/white text on hover (D-18)
  secondary: 'bg-transparent text-black border border-black hover:bg-black hover:text-white',
}

export default function Button({
  variant = 'primary',
  href,
  children,
  className = '',
  onClick,
  ...rest
}: ButtonProps) {
  const baseClasses = `type-subheading inline-block px-[14px] py-[10px] rounded-[10px] transition-all duration-150 cursor-pointer ${variantClasses[variant]} ${className}`

  if (href) {
    return (
      <Link href={href} className={baseClasses}>
        {children}
      </Link>
    )
  }

  return (
    <button onClick={onClick} className={baseClasses} {...rest}>
      {children}
    </button>
  )
}
