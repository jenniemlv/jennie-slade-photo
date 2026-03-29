// src/lib/fonts.ts
// All font definitions in one place — imported only by layout.tsx.
// Never import next/font in individual components (creates duplicate instances).

import { Libre_Baskerville, Montserrat, Arapey } from 'next/font/google'
import localFont from 'next/font/local'

// Libre Baskerville — used for titles, body text, display (D-04)
export const libreBaskerville = Libre_Baskerville({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--font-libre-baskerville',
  display: 'swap',
})

// Montserrat — used for headings (Montserrat uppercase, small size) (D-04)
export const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-montserrat',
  display: 'swap',
})

// Arapey — used for accent text (D-04)
export const arapey = Arapey({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-arapey',
  display: 'swap',
})

// Apparel — premium font from Fort Foundry (self-hosted) (D-05)
// Falls back to Georgia until Jennie provides the real .woff2 file.
// To swap in real font: replace public/fonts/apparel-regular.woff2 with the real file.
// Path is relative to THIS file (src/lib/fonts.ts) → ../../public/fonts/
export const apparel = localFont({
  src: '../../public/fonts/apparel-regular.woff2',
  variable: '--font-apparel',
  display: 'swap',
  fallback: ['Georgia', 'serif'],
})

// Destiny — custom script font (self-hosted) (D-05)
// Falls back to cursive until Jennie provides the real .woff2 file.
// To swap in real font: replace public/fonts/destiny-webfont.woff2 with the real file.
export const destiny = localFont({
  src: '../../public/fonts/destiny-webfont.woff2',
  variable: '--font-destiny',
  display: 'swap',
  fallback: ['cursive'],
})
