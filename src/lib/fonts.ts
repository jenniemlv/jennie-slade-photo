// src/lib/fonts.ts
// All font definitions in one place — imported only by layout.tsx.
// Never import next/font in individual components (creates duplicate instances).
//
// Font direction: Lauren Fair / Tec Petaja editorial aesthetic
// - Cormorant: light, elegant display serif (replaces Libre Baskerville for titles)
// - Lora: warm, refined body serif (replaces Libre Baskerville for body text)
// - Montserrat Light: clean sans-serif for small uppercase labels
// - Arapey Italic: accent/testimonial font

import { Fraunces, Lora, Montserrat, Archivo, Arapey, Bodoni_Moda, Inter } from 'next/font/google'
import localFont from 'next/font/local'

// ── Vogue-editorial system (families pages) ────────────────────────────────
// Zodiak (Fontshare, self-hosted) — high-contrast editorial Didone for display.
// Inter — cold neutral grotesque for body + eyebrows. The Didone/grotesque
// tension is the fashion-magazine formula. Bodoni Moda Italic (below) is the
// caption/pull-quote accent. Scoped to /families via CSS-var overrides on
// <main>, so the rest of the site keeps its Cormorant/Lora tokens.
export const zodiak = localFont({
  src: [
    { path: '../../public/fonts/Zodiak-Thin.woff2', weight: '100', style: 'normal' },
    { path: '../../public/fonts/Zodiak-Light.woff2', weight: '300', style: 'normal' },
    { path: '../../public/fonts/Zodiak-Regular.woff2', weight: '400', style: 'normal' },
    { path: '../../public/fonts/Zodiak-Bold.woff2', weight: '700', style: 'normal' },
    { path: '../../public/fonts/Zodiak-LightItalic.woff2', weight: '300', style: 'italic' },
    { path: '../../public/fonts/Zodiak-Italic.woff2', weight: '400', style: 'italic' },
  ],
  variable: '--font-zodiak',
  display: 'swap',
  fallback: ['Bodoni Moda', 'Georgia', 'serif'],
})

// Inter — neutral Swiss grotesque for body + labels on the Vogue pages.
export const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-inter',
  display: 'swap',
})

// Display serif — Fraunces (variable) replacing Cormorant.
// Fraunces has more character + higher contrast + editorial punch. Used by
// The Cut, T Brand Studio, and modern editorial photog sites in 2026.
// Export name kept as `cormorant` and CSS var `--font-cormorant` so the rest
// of the codebase and globals.css continue to work without churn.
export const cormorant = Fraunces({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
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

// Montserrat — legacy label sans (kept for pages still pointing at it directly).
export const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400'],
  variable: '--font-montserrat',
  display: 'swap',
})

// Archivo — neutral 2026-current grotesque for small uppercase labels/kickers.
// Replaces thin Montserrat as the --font-heading token: a 500-weight grotesque
// reads modern where thin geometric sans reads 2018 wedding-template.
export const archivo = Archivo({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-archivo',
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
