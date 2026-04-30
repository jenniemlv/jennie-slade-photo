/**
 * Gallery manifest — maps quiz session-type answers to portfolio photos
 * shown at the bottom of the results screen.
 *
 * To add photos:
 *   1. Drop new files into /public/images/gallery/{seniors,families,couples,headshots,branding}/
 *   2. Add an entry below with src + alt
 *
 * Empty arrays render no gallery section for that session type — the page
 * gracefully hides it instead of showing an empty state.
 */

export interface GalleryPhoto {
  src: string
  alt: string
}

export const galleryBySession: Record<string, GalleryPhoto[]> = {
  seniors: [
    { src: '/images/gallery/seniors/ava-senior-1.jpg', alt: 'Las Vegas senior portrait of Ava' },
    { src: '/images/gallery/seniors/ava-senior-2.jpg', alt: 'Las Vegas senior portrait of Ava at the Wetlands' },
    { src: '/images/gallery/seniors/ava-senior-3.jpg', alt: 'Las Vegas senior portrait of Ava at the Wetlands' },
    { src: '/images/gallery/seniors/bryce-senior-1.jpg', alt: 'Las Vegas senior portrait of Bryce' },
    { src: '/images/gallery/seniors/cj-senior-1.jpg', alt: 'Las Vegas senior portrait of CJ' },
    { src: '/images/gallery/seniors/cole-senior-1.jpg', alt: 'Las Vegas senior portrait of Cole in the desert' },
    { src: '/images/gallery/seniors/grace-senior-1.jpg', alt: 'Las Vegas senior portrait of Grace on the Strip' },
    { src: '/images/gallery/seniors/grace-senior-2.jpg', alt: 'Las Vegas senior portrait of Grace on the Strip' },
    { src: '/images/gallery/seniors/kayla-senior-1.jpg', alt: 'Las Vegas senior portrait of Kayla at the Dry Lake Bed' },
    { src: '/images/gallery/seniors/kayla-senior-2.jpg', alt: 'Las Vegas senior portrait of Kayla at the Dry Lake Bed' },
    { src: '/images/gallery/seniors/kennedy-senior-1.jpg', alt: 'Las Vegas senior portrait of Kennedy' },
    { src: '/images/gallery/seniors/kenzi-senior-1.jpg', alt: 'Las Vegas senior portrait of Kenzi' },
    { src: '/images/gallery/seniors/rilee-senior-1.jpg', alt: 'Las Vegas senior portrait of Rilee' },
    { src: '/images/gallery/seniors/riley-senior-1.jpg', alt: 'Las Vegas senior portrait of Riley in the desert' },
    { src: '/images/gallery/seniors/tatum-senior-1.jpg', alt: 'Las Vegas senior portrait of Tatum' },
    { src: '/images/gallery/seniors/jackson-mission-1.jpg', alt: 'Missionary portrait of Jackson at the tunnels' },
    { src: '/images/gallery/seniors/jackson-mission-2.jpg', alt: 'Missionary portrait of Jackson at the tunnels' },
    { src: '/images/gallery/seniors/brian-senior-1.jpg', alt: 'Las Vegas senior portrait of Brian at Floyd Lamb Park' },
  ],

  family: [
    { src: '/images/gallery/families/anderson-family-1.jpg', alt: 'Anderson family portrait at the Las Vegas Wetlands' },
    { src: '/images/gallery/families/anderson-family-2.jpg', alt: 'Anderson family portrait at the Neon Museum' },
    { src: '/images/gallery/families/anderson-family-3.jpg', alt: 'Anderson family portrait at the Neon Museum' },
    { src: '/images/gallery/families/carr-family-1.jpg', alt: 'Carr family portrait at the Dry Lake Bed' },
    { src: '/images/gallery/families/carr-family-2.jpg', alt: 'Carr family portrait at the Dry Lake Bed' },
    { src: '/images/gallery/families/emick-family-1.jpg', alt: 'Emick family portrait at Spring Mountain' },
    { src: '/images/gallery/families/emick-family-2.jpg', alt: 'Emick family portrait at Spring Mountain' },
    { src: '/images/gallery/families/emick-family-3.jpg', alt: 'Emick family portrait at Spring Mountain' },
    { src: '/images/gallery/families/fife-family-1.jpg', alt: 'Fife family portrait at Mt Charleston' },
    { src: '/images/gallery/families/fife-family-2.jpg', alt: 'Fife family portrait at Mt Charleston' },
    { src: '/images/gallery/families/fife-family-3.jpg', alt: 'Fife family portrait at Mt Charleston' },
    { src: '/images/gallery/families/garber-family-1.jpg', alt: 'Garber family portrait' },
    { src: '/images/gallery/families/garber-family-2.jpg', alt: 'Garber family portrait' },
    { src: '/images/gallery/families/garber-family-3.jpg', alt: 'Garber family portrait at the Blue Desert' },
    { src: '/images/gallery/families/mcpeterson-family-1.jpg', alt: 'McPeterson family portrait at the Wetlands' },
    { src: '/images/gallery/families/mcpeterson-family-2.jpg', alt: 'McPeterson family portrait at the Wetlands' },
    { src: '/images/gallery/families/milar-family-1.jpg', alt: 'Milar family portrait' },
    { src: '/images/gallery/families/milar-family-2.jpg', alt: 'Milar family portrait' },
    { src: '/images/gallery/families/milar-family-3.jpg', alt: 'Milar family portrait' },
    { src: '/images/gallery/families/peterson-family-1.jpg', alt: 'Peterson family portrait' },
    { src: '/images/gallery/families/thomas-family-1.jpg', alt: 'Thomas family portrait at the Wetlands' },
  ],

  couples: [
    // TODO: drop couples/engagement/anniversary photos into /public/images/gallery/couples/
  ],

  headshots: [
    // TODO: drop corporate/professional headshot photos into /public/images/gallery/headshots/
  ],

  branding: [
    // TODO: drop personal-brand / lifestyle photos into /public/images/gallery/branding/
  ],
}

/**
 * Returns up to `limit` photos for a session type, randomly shuffled so the
 * grid feels fresh on repeat visits. Returns [] if no photos are available
 * (the gallery section will be hidden in that case).
 */
/**
 * Deterministic — must produce identical output during SSR and on the client to
 * avoid React hydration mismatches. We slice from a stable manifest order; for
 * variety on repeat visits, shuffle in a useEffect on the client side instead
 * of doing it here.
 */
export function getGalleryFor(sessionType: string, limit = 6): GalleryPhoto[] {
  if (sessionType === 'unsure') {
    const blended = [...(galleryBySession.family || []), ...(galleryBySession.seniors || [])]
    return blended.slice(0, limit)
  }
  const photos = galleryBySession[sessionType] || []
  return photos.slice(0, limit)
}
