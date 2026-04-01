/**
 * src/data/galleries.ts
 * Gallery image data for all three portfolio categories.
 *
 * To add images: add a new object to the relevant array. That's it.
 *
 * The `src` field can be:
 *   - A local path:        '/images/gallery/weddings/photo.jpg'
 *   - A Cloudinary public ID: 'jennie-slade/weddings/photo'
 *
 * When using Cloudinary IDs, the GalleryGrid component renders them
 * via CloudinaryImage. When using local paths, it uses Next.js Image.
 *
 * Placeholder mode: src = '' renders a warm-gray placeholder block.
 * The placeholder is replaced by swapping in the real src value.
 */

export interface GalleryImage {
  id: string
  src: string
  alt: string
}

// ---------------------------------------------------------------------------
// Weddings — aspect-[3/2] landscape (12 images)
// ---------------------------------------------------------------------------
export const weddingImages: GalleryImage[] = [
  { id: 'wedding-01', src: '', alt: 'Bride and groom first look, Las Vegas desert ceremony' },
  { id: 'wedding-02', src: '', alt: 'Wedding reception details, candlelit table setting Las Vegas venue' },
  { id: 'wedding-03', src: '', alt: 'Couple exchanging vows at outdoor Las Vegas desert venue' },
  { id: 'wedding-04', src: '', alt: 'Bridal party portrait, Red Rock Canyon overlook' },
  { id: 'wedding-05', src: '', alt: 'First dance under string lights, Las Vegas reception' },
  { id: 'wedding-06', src: '', alt: 'Wedding ceremony exit with sparklers, Las Vegas' },
  { id: 'wedding-07', src: '', alt: 'Bride getting ready portrait, natural window light Las Vegas' },
  { id: 'wedding-08', src: '', alt: 'Groom and groomsmen laughing before ceremony, Las Vegas' },
  { id: 'wedding-09', src: '', alt: 'Wedding bouquet detail, desert wildflowers Las Vegas' },
  { id: 'wedding-10', src: '', alt: 'Sunset couple portrait, Las Vegas Strip backdrop' },
  { id: 'wedding-11', src: '', alt: 'Father daughter dance, emotional Las Vegas reception' },
  { id: 'wedding-12', src: '', alt: 'Wedding ceremony wide shot, outdoor desert venue Las Vegas' },
]

// ---------------------------------------------------------------------------
// Families — aspect-[3/2] landscape (12 images)
// ---------------------------------------------------------------------------
export const familyImages: GalleryImage[] = [
  { id: 'family-01', src: '', alt: 'Las Vegas family portrait session, Red Rock Canyon' },
  { id: 'family-02', src: '', alt: 'Mother and daughter laughing, outdoor family photos Las Vegas' },
  { id: 'family-03', src: '', alt: 'Family of five walking together, Las Vegas park setting' },
  { id: 'family-04', src: '', alt: 'Newborn baby portrait, cozy home session Las Vegas' },
  { id: 'family-05', src: '', alt: 'Extended family group photo, three generations together Las Vegas' },
  { id: 'family-06', src: '', alt: 'Toddler playing in fall leaves, Henderson Nevada park' },
  { id: 'family-07', src: '', alt: 'Parents with newborn, lifestyle family session Las Vegas' },
  { id: 'family-08', src: '', alt: 'Siblings hugging portrait, Red Rock Canyon trail' },
  { id: 'family-09', src: '', alt: 'Family candid moment, kids running at sunset Las Vegas' },
  { id: 'family-10', src: '', alt: 'Holiday family mini session, Las Vegas outdoor location' },
  { id: 'family-11', src: '', alt: 'Father and son portrait, desert landscape background Nevada' },
  { id: 'family-12', src: '', alt: 'Family maternity session, golden hour Las Vegas desert' },
]

// ---------------------------------------------------------------------------
// Seniors — aspect-[2/3] portrait (12 images)
// ---------------------------------------------------------------------------
export const seniorImages: GalleryImage[] = [
  { id: 'senior-01', src: '', alt: 'Las Vegas high school senior portrait, urban downtown' },
  { id: 'senior-02', src: '', alt: 'Senior girl portrait, Red Rock Canyon golden hour' },
  { id: 'senior-03', src: '', alt: 'Class of 2026 senior session, desert wildflowers Nevada' },
  { id: 'senior-04', src: '', alt: 'Senior boy portrait, varsity letterman jacket Las Vegas' },
  { id: 'senior-05', src: '', alt: 'High school senior laughing candidly, Las Vegas park' },
  { id: 'senior-06', src: '', alt: 'Senior portrait with guitar, artistic Las Vegas session' },
  { id: 'senior-07', src: '', alt: 'Graduation cap and gown portrait, Nevada desert landscape' },
  { id: 'senior-08', src: '', alt: 'Senior girl portrait, natural light in open field Nevada' },
  { id: 'senior-09', src: '', alt: 'Athletic senior portrait, Las Vegas sports complex' },
  { id: 'senior-10', src: '', alt: 'Senior portrait at Seven Magic Mountains, Las Vegas' },
  { id: 'senior-11', src: '', alt: 'High school senior duo session, best friends portrait Las Vegas' },
  { id: 'senior-12', src: '', alt: 'Senior boy casual portrait, downtown Las Vegas murals' },
]

// ---------------------------------------------------------------------------
// Headshots & Corporate — aspect-[2/3] portrait (12 images)
// ---------------------------------------------------------------------------
export const headshotImages: GalleryImage[] = [
  { id: 'headshot-01', src: '', alt: 'Professional headshot, Las Vegas studio lighting' },
  { id: 'headshot-02', src: '', alt: 'Corporate team headshot, modern Las Vegas office' },
  { id: 'headshot-03', src: '', alt: 'Executive portrait, natural light Las Vegas' },
  { id: 'headshot-04', src: '', alt: 'Business branding portrait, downtown Las Vegas' },
  { id: 'headshot-05', src: '', alt: 'LinkedIn professional headshot, studio Las Vegas' },
  { id: 'headshot-06', src: '', alt: 'Entrepreneur branding session, Las Vegas workspace' },
  { id: 'headshot-07', src: '', alt: 'Corporate headshot, clean white background Las Vegas' },
  { id: 'headshot-08', src: '', alt: 'Professional portrait, outdoor Las Vegas setting' },
  { id: 'headshot-09', src: '', alt: 'Team branding photos, Las Vegas business office' },
  { id: 'headshot-10', src: '', alt: 'Actor headshot, dramatic lighting Las Vegas studio' },
  { id: 'headshot-11', src: '', alt: 'Real estate agent headshot, professional Las Vegas' },
  { id: 'headshot-12', src: '', alt: 'Creative professional portrait, artistic Las Vegas backdrop' },
]
