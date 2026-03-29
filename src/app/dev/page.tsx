/**
 * /dev — Foundation verification page
 *
 * PURPOSE: Visually verify that fonts, colors, and typography are configured correctly.
 * This page is the primary test artifact for Phase 1.
 *
 * REMOVE BEFORE LAUNCH.
 *
 * What to check:
 * - Title text renders in Libre Baskerville (serif), 30px, uppercase
 * - Heading text renders in Montserrat (sans-serif), 12px, uppercase
 * - Subheading renders in Georgia fallback (until Apparel .woff2 is provided), 15px, uppercase
 *   NOTE: If subheading looks identical to body text, the Apparel font slot is broken
 * - Body text renders in Libre Baskerville, 16px, with visibly airy 1.9 line-height
 * - Accent text renders in Arapey (serif, slightly different from Libre Baskerville)
 * - All color swatches show WARM tones (beige/yellow undertone), not cool grays
 * - Placeholder block is solid #d4d1cb at 3:2 aspect ratio
 */
export default function DevPage() {
  return (
    <main className="p-8 md:p-16 max-w-4xl mx-auto space-y-16">
      {/* Page header */}
      <div className="border-b border-warm-gray pb-8">
        <p className="type-heading mb-2">Foundation Verification</p>
        <p className="type-body text-gray">
          Phase 1 test page. Every section below should match the design-spec.md exactly.
          Remove this page before launch.
        </p>
      </div>

      {/* Typography hierarchy */}
      <section className="space-y-8">
        <p className="type-heading">Typography Hierarchy</p>

        <div className="space-y-6">
          <div className="space-y-1">
            <p className="text-xs text-gray uppercase tracking-wide">Title — Libre Baskerville, 30px, uppercase, 0.02em</p>
            <h1 className="type-title">Because Memories Make Us Who We Are</h1>
          </div>

          <div className="space-y-1">
            <p className="text-xs text-gray uppercase tracking-wide">Heading — Montserrat, 12px, uppercase, 0.02em</p>
            <h2 className="type-heading">Portrait Photography in Las Vegas</h2>
          </div>

          <div className="space-y-1">
            <p className="text-xs text-gray uppercase tracking-wide">Subheading — Apparel (Georgia fallback), 15px, uppercase, 0.07em</p>
            <h3 className="type-subheading">Families, Weddings, Seniors</h3>
            <p className="text-xs text-teal-sage">
              If this looks like body text instead of a distinct sans-serif, the Apparel font slot is broken.
            </p>
          </div>

          <div className="space-y-1">
            <p className="text-xs text-gray uppercase tracking-wide">Body — Libre Baskerville, 16px, 1.9 line-height, 0.02em</p>
            <p className="type-body max-w-prose">
              You know that feeling when you look at an old photo and it takes you right back?
              The way the light fell, the way everyone was laughing, the tiny details you forgot
              you remembered. That is what I chase with every session. Real moments, real joy,
              frozen in time so you never lose them.
            </p>
          </div>

          <div className="space-y-1">
            <p className="text-xs text-gray uppercase tracking-wide">Accent — Arapey, 16px</p>
            <p className="type-accent">Capturing your story for over twenty years</p>
          </div>
        </div>
      </section>

      {/* Color palette */}
      <section className="space-y-8">
        <p className="type-heading">Brand Color Palette</p>
        <p className="type-body text-gray text-sm">
          All grays must have a warm (beige/yellow) undertone. If any swatch looks cool or blue-gray, the colors are wrong.
        </p>
        <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
          <div className="space-y-2">
            <div className="h-20 bg-black rounded" />
            <p className="text-xs text-gray">Black #000000</p>
          </div>
          <div className="space-y-2">
            <div className="h-20 bg-charcoal rounded" />
            <p className="text-xs text-gray">Charcoal #1a1a1a</p>
          </div>
          <div className="space-y-2">
            <div className="h-20 bg-gray rounded" />
            <p className="text-xs text-gray">Gray #6b6b6b</p>
          </div>
          <div className="space-y-2">
            <div className="h-20 bg-blue-mist rounded" />
            <p className="text-xs text-gray">Blue Mist #b8c5d4</p>
          </div>
          <div className="space-y-2">
            <div className="h-20 bg-teal-sage rounded" />
            <p className="text-xs text-gray">Teal Sage #5f8f8b</p>
          </div>
          <div className="space-y-2">
            <div className="h-20 bg-warm-gray rounded" />
            <p className="text-xs text-gray">Warm Gray #d4d1cb</p>
          </div>
          <div className="space-y-2">
            <div className="h-20 bg-warm-gray-light rounded" />
            <p className="text-xs text-gray">Warm Gray Light #e3e0da</p>
          </div>
          <div className="space-y-2">
            <div className="h-20 bg-off-white rounded border border-warm-gray" />
            <p className="text-xs text-gray">Off White #f0eeeb</p>
          </div>
          <div className="space-y-2">
            <div className="h-20 bg-white rounded border border-warm-gray" />
            <p className="text-xs text-gray">White #ffffff</p>
          </div>
        </div>
      </section>

      {/* Image placeholder */}
      <section className="space-y-8">
        <p className="type-heading">Image Placeholder</p>
        <p className="type-body text-gray text-sm">
          Solid warm-gray block at 3:2 aspect ratio. This is what every image slot looks like until real photography is added.
        </p>
        <div
          className="bg-warm-gray w-full max-w-lg rounded"
          style={{ aspectRatio: '3/2' }}
          aria-hidden="true"
        />
        <div
          className="bg-warm-gray w-full max-w-sm rounded"
          style={{ aspectRatio: '4/5' }}
          aria-hidden="true"
        />
      </section>

      {/* Font loading check */}
      <section className="space-y-4 border-t border-warm-gray pt-8">
        <p className="type-heading">Font Loading Checklist</p>
        <ul className="type-body text-sm space-y-2 list-disc pl-6">
          <li>Title should be a <strong>serif</strong> font (Libre Baskerville), NOT sans-serif</li>
          <li>Heading should be a <strong>sans-serif</strong> font (Montserrat), clearly different from body</li>
          <li>Subheading should be <strong>Georgia</strong> (Apparel fallback), visually distinct from body serif</li>
          <li>Body should be a <strong>serif</strong> font (Libre Baskerville) with generous line spacing</li>
          <li>Accent should be a <strong>serif</strong> font (Arapey), subtly different from Libre Baskerville</li>
          <li>Open Network tab: NO requests to <code>fonts.googleapis.com</code> should appear</li>
        </ul>
      </section>
    </main>
  )
}
