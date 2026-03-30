'use client'

/**
 * ScrollFade — wraps any content with a subtle fade-in animation on scroll.
 *
 * How it works:
 *   Uses IntersectionObserver to detect when the wrapped element enters the
 *   viewport. Once 15% of the element is visible, it fades in from a slight
 *   upward offset (opacity 0 + 16px translate-y) to fully visible.
 *
 *   The animation fires once only (observer.disconnect() after first trigger).
 *   This is intentional — sections shouldn't re-animate on scroll-back-up.
 *
 * Usage:
 *   <ScrollFade>
 *     <WelcomeSection />
 *   </ScrollFade>
 *
 * Note: Do not apply background colors to ScrollFade. Only opacity and
 * transform are controlled here. Background is set by the child component.
 */

import { useRef, useState, useEffect } from 'react'

interface ScrollFadeProps {
  children: React.ReactNode
  className?: string
}

export default function ScrollFade({ children, className = '' }: ScrollFadeProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    // Trigger when 15% of the element enters the viewport (D-15)
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          // Fire once only — disconnect after first trigger (D-16)
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )

    observer.observe(element)

    // Cleanup on unmount
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isVisible
          ? 'opacity-100 translate-y-0'   // Visible: fully shown, no offset
          : 'opacity-0 translate-y-4'     // Hidden: transparent, 16px upward drift
      } ${className}`}
    >
      {children}
    </div>
  )
}
