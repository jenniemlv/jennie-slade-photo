# Jennie Slade Photography - Design Specification
## Extracted from Showit Design Settings (March 29, 2026)

---

## BRAND COLORS

| Swatch | Color | Approximate Hex | Usage |
|--------|-------|-----------------|-------|
| 1 | Black | #000000 | Titles, primary buttons, link color (on dark sections) |
| 2 | Dark Charcoal | #1a1a1a or #222222 | Paragraph text, headings, link color (on light sections) |
| 3 | Medium Gray | #6b6b6b | Secondary text, subheadings |
| 4 | Light Blue/Periwinkle | #b8c5d4 | Accent, soft highlights |
| 5 | Teal/Sage | #5f8f8b | Accent, brand pop color |
| 6 | Light Warm Gray | #d4d1cb | Backgrounds, section dividers |
| 7 | Lighter Warm Gray | #e3e0da | Alternate section backgrounds |
| 8 | Off-White/Near-White | #f0eeeb | Light backgrounds, cards |

Note: Hex codes are approximated from screenshots. Use a color picker on the
live site or in Showit to confirm exact values before building.

---

## FONTS

### Active Font Families

**Custom Fonts (uploaded to Showit):**
- Apparel Italic Light
- Apparel Italic Regular
- Apparel Light
- Apparel Regular

**Google Fonts:**
- Arapey (Normal + Italic) - elegant serif
- Cormorant Light - refined serif
- Libre Baskerville (Normal + Italic) - classic serif

**Custom/Script:**
- Destiny Webfont - handwritten/script style

### Font Sourcing for New Site
- Apparel: This is a premium font (by Fort Foundry). You likely purchased it or
  it came with your Showit template. You'll need the .woff/.woff2 files to
  self-host on your new site. Check your font purchase/download folder.
- Arapey: Free on Google Fonts (https://fonts.google.com/specimen/Arapey)
- Cormorant: Free on Google Fonts (https://fonts.google.com/specimen/Cormorant)
- Libre Baskerville: Free on Google Fonts (https://fonts.google.com/specimen/Libre+Baskerville)
- Destiny Webfont: Script/signature font. Check your downloads or font purchase history.

---

## TYPE STYLES (Typography Hierarchy)

### Title
- Font: Libre Baskerville
- Size: 30px (desktop)
- Color: 1 (Black)
- Letter Case: Uppercase
- Letter Spacing: 0.02em
- Line Height: 1.2
- Bottom Margin: 20px
- Inline Links: Color 1, Underline, Hover at 80% opacity

### Heading
- Font: Montserrat (Normal weight)
- Size: 12px (desktop)
- Color: 2 (Dark Charcoal)
- Letter Case: Uppercase
- Letter Spacing: 0.02em
- Line Height: 1.8
- Bottom Margin: 20px
- Text Align: Left (options shown)
- Inline Links: Color 2, Underline, Hover at 80% opacity

### Subheading
- Font: Apparel Regular
- Size: 15px
- Color: 2 (Dark Charcoal)
- Letter Case: Uppercase
- Letter Spacing: 0.07em
- Line Height: 1.1
- Bottom Margin: 18px
- Inline Links: Color 2, Underline, Hover at 80% opacity

### Paragraph
- Font: Libre Baskerville
- Size: 11px (mobile) - likely larger on desktop
- Color: 2 (Dark Charcoal)
- Letter Case: Normal (sentence case)
- Letter Spacing: 0.02em
- Line Height: 1.9
- Bottom Margin: 16px
- Inline Links: Color 2, Underline, Hover at 80% opacity

---

## BUTTONS

### Primary Button
- Background: Color 1 (Black), 100% opacity
- Text Color: Color (appears white/light on dark background)
- Font: Apparel Regular
- Text Size: 15px
- Letter Case: Uppercase
- Letter Spacing: 0.07em
- Line Height: 1.1
- Padding: Top 10px, Bottom 10px, Left 14px, Right 14px
- Border Color: Color 1 (Black), 100% opacity
- Border Size: 0px (no visible border in normal state)
- Corner Radius: 10px
- States: Normal + Hover

### Secondary Button
- Style: Outlined/ghost button (border only, no fill)
- Appears to use same font and sizing as primary
- Border visible with text inside

---

## DESIGN SYSTEM SUMMARY FOR CLAUDE CODE

When building the new site, use this CSS variable system:

```css
:root {
  /* Brand Colors */
  --color-black: #000000;
  --color-charcoal: #1a1a1a;
  --color-gray: #6b6b6b;
  --color-blue-mist: #b8c5d4;
  --color-teal-sage: #5f8f8b;
  --color-warm-gray: #d4d1cb;
  --color-warm-gray-light: #e3e0da;
  --color-off-white: #f0eeeb;
  --color-white: #ffffff;

  /* Typography */
  --font-display: 'Libre Baskerville', Georgia, serif;
  --font-heading: 'Montserrat', sans-serif;
  --font-subheading: 'Apparel', sans-serif;
  --font-body: 'Libre Baskerville', Georgia, serif;
  --font-accent: 'Arapey', serif;
  --font-script: 'Destiny', cursive;

  /* Spacing */
  --spacing-xs: 8px;
  --spacing-sm: 16px;
  --spacing-md: 24px;
  --spacing-lg: 48px;
  --spacing-xl: 80px;
}
```

### Design Feel
- Editorial, airy, sophisticated
- Lots of whitespace, let photos breathe
- Serif-dominant typography (Libre Baskerville for titles and body)
- Uppercase headings with generous letter spacing
- Neutral warm palette with teal/sage as the only color accent
- Clean buttons with subtle rounded corners
- Overall mood: timeless, warm, professional photographer
