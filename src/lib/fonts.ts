// src/lib/fonts.ts
// All font definitions in one place — imported only by layout.tsx.
// Never import next/font in individual components (creates duplicate instances).
//
// Font direction: Lauren Fair / Tec Petaja editorial aesthetic
// - Cormorant: light, elegant display serif (replaces Libre Baskerville for titles)
// - Lora: warm, refined body serif (replaces Libre Baskerville for body text)
// - Montserrat Light: clean sans-serif for small uppercase labels
// - Arapey Italic: accent/testimonial font

import { Cormorant, Lora, Montserrat, Arapey, Bodoni_Moda } from 'next/font/google'
import localFont from 'next/font/local'

// Cormorant — elegant, light display serif for titles and headlines
// Similar to Goldenbook (Lauren Fair). Delicate, refined, editorial.
export const cormorant = Cormorant({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

// Lora — warm, calligraphic body serif
// Similar to Larken (Lauren Fair). Elegant but very readable at body sizes.
export const lora = Lora({
  subsets: ['latin'],
  weight: ['400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-lora',
  display: 'swap',
})

// Montserrat — clean sans-serif for small uppercase headings/labels
export const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400'],
  variable: '--font-montserrat',
  display: 'swap',
})

// Arapey — accent serif for testimonials and editorial callouts
export const arapey = Arapey({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-arapey',
  display: 'swap',
})

// Bodoni Moda — high-contrast didone for editorial hero moments.
// Used selectively on the What to Wear quiz results screen for "Vogue-spread"
// impact alongside the brand's softer Cormorant Light. Heavy weights only —
// the brand's everyday display stays Cormorant.
export const bodoniModa = Bodoni_Moda({
  subsets: ['latin'],
  weight: ['400', '500', '700', '800'],
  style: ['normal', 'italic'],
  variable: '--font-bodoni',
  display: 'swap',
})

// Apparel — premium font from Fort Foundry (self-hosted)
// Falls back to Georgia until Jennie provides the real .woff2 file.
export const apparel = localFont({
  src: '../../public/fonts/apparel-regular.woff2',
  variable: '--font-apparel',
  display: 'swap',
  fallback: ['Georgia', 'serif'],
})

// Destiny — custom script font (self-hosted)
// Falls back to cursive until Jennie provides the real .woff2 file.
export const destiny = localFont({
  src: '../../public/fonts/destiny-webfont.woff2',
  variable: '--font-destiny',
  display: 'swap',
  fallback: ['cursive'],
})
