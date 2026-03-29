import type { Metadata } from 'next'
import { libreBaskerville, montserrat, arapey, apparel, destiny } from '@/lib/fonts'
import './globals.css'

export const metadata: Metadata = {
  title: 'Jennie Slade Photography',
  description:
    'Las Vegas portrait photographer specializing in families, weddings, and senior portraits. Over 20 years of capturing memories.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={[
        libreBaskerville.variable,
        montserrat.variable,
        arapey.variable,
        apparel.variable,
        destiny.variable,
      ].join(' ')}
    >
      <body>{children}</body>
    </html>
  )
}
