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
  { id: 'senior-01', src: '/images/seniors/real/tunnel-boy.jpg', alt: 'Senior boy backlit at Tunnels Las Vegas' },
  { id: 'senior-02', src: '/images/seniors/real/valley-of-fire.jpg', alt: 'Senior girl white lace dress at Valley of Fire' },
  { id: 'senior-03', src: '/images/seniors/real/mt-charleston.jpg', alt: 'Senior girl rust dress cowboy boots at Mt Charleston' },
  { id: 'senior-04', src: '/images/seniors/real/jw-marriott.jpg', alt: 'Senior boy varsity jacket at JW Marriott Las Vegas' },
  { id: 'senior-05', src: '/images/seniors/real/las-vegas-strip.jpg', alt: 'Senior girl black dress at Welcome to Las Vegas sign' },
  { id: 'senior-06', src: '/images/seniors/real/neon-museum.jpg', alt: 'Senior girl green dress at Neon Museum' },
  { id: 'senior-07', src: '/images/seniors/real/floyd-lamb.jpg', alt: 'Senior graduation cap and gown at Floyd Lamb Park' },
  { id: 'senior-08', src: '/images/seniors/real/dry-lake-bed.jpg', alt: 'Senior blonde girl white sweater floral skirt at Dry Lake Bed' },
  { id: 'senior-09', src: '/images/seniors/real/letterman-boy.jpg', alt: 'Senior boy Mead varsity letterman jacket' },
  { id: 'senior-10', src: '/images/seniors/real/downtown.jpg', alt: 'Senior boy on turquoise wall Downtown Las Vegas' },
  { id: 'senior-11', src: '/images/seniors/real/wetlands.jpg', alt: 'Senior girl rust dress at Las Vegas Wetlands' },
  { id: 'senior-12', src: '/images/seniors/real/smith-center.jpg', alt: 'Senior boy blue blazer rainbow columns at Smith Center' },
  { id: 'senior-13', src: '/images/seniors/real/calico-basin.jpg', alt: 'Senior girl lavender dress at Calico Basin' },
  { id: 'senior-14', src: '/images/seniors/real/calico-desert.jpg', alt: 'Senior girl white dress at Calico Desert' },
  { id: 'senior-15', src: '/images/seniors/real/blue-desert.jpg', alt: 'Senior girl green dress at Blue Desert' },
  { id: 'senior-16', src: '/images/seniors/real/tivoli.jpg', alt: 'Senior boy white shirt and tie at Tivoli' },
  { id: 'senior-17', src: '/images/seniors/real/old-money.jpg', alt: 'Senior boy blue blazer at Red Rock' },
  { id: 'senior-18', src: '/images/seniors/real/sunglasses-boy.jpg', alt: 'Senior boy sunglasses and blue blazer at Red Rock' },
  { id: 'senior-19', src: '/images/seniors/real/clean-preppy.jpg', alt: 'Senior boy white shirt and khaki' },
  { id: 'senior-20', src: '/images/seniors/real/preppy3.jpg', alt: 'Senior boy chambray button-down at tunnel' },
  { id: 'senior-21', src: '/images/seniors/real/preppy4.jpg', alt: 'Senior PV varsity letterman at Neon Museum' },
  { id: 'senior-22', src: '/images/seniors/real/preppy.jpg', alt: 'Senior in red Utah sweatshirt at Red Rock' },
  { id: 'senior-23', src: '/images/seniors/real/preppy2.jpg', alt: 'Senior in UNLV sweatshirt at Red Rock' },
  { id: 'senior-24', src: '/images/seniors/real/bostoncollege-girl.jpg', alt: 'Senior girl Boston College sweatshirt' },
  { id: 'senior-25', src: '/images/seniors/real/cowboy.jpg', alt: 'Senior girl denim cowboy boots Western' },
  { id: 'senior-26', src: '/images/seniors/real/cowboy2.jpg', alt: 'Senior girl in overalls at Red Rock' },
  { id: 'senior-27', src: '/images/seniors/real/whitelace-girl.jpg', alt: 'Senior girl white lace boho dress' },
  { id: 'senior-28', src: '/images/seniors/real/boho2.jpg', alt: 'Senior girl boho portrait' },
  { id: 'senior-29', src: '/images/seniors/real/boho3.jpg', alt: 'Senior girl boho portrait golden trees' },
  { id: 'senior-30', src: '/images/seniors/real/extra-1.jpg', alt: 'Senior girl floral maxi dress' },
  { id: 'senior-31', src: '/images/seniors/real/extra-2.jpg', alt: 'Senior girl cream sweater at Joshua tree' },
  { id: 'senior-32', src: '/images/seniors/real/utah-flag.jpg', alt: 'Senior girl with red Utah flag at Red Rock' },
  { id: 'senior-33', src: '/images/seniors/real/twirl-girl.jpg', alt: 'Senior girl twirling on sand' },
  { id: 'senior-34', src: '/images/seniors/real/clean-desert.jpg', alt: 'Senior girl black top white shorts Dry Lake Bed' },
  { id: 'senior-35', src: '/images/seniors/real/clean-girl2.jpg', alt: 'Senior girl white bubble dress in park' },
  { id: 'senior-36', src: '/images/seniors/real/old-money2.jpg', alt: 'Senior girl black top white shorts close-up Dry Lake' },
  { id: 'senior-37', src: '/images/seniors/real/mob-wife.jpg', alt: 'Senior girl lavender tulle gold hoops' },
  { id: 'senior-38', src: '/images/seniors/real/y2k.jpg', alt: 'Senior girl red top wide-leg jeans Valley of Fire' },
  { id: 'senior-39', src: '/images/seniors/real/y2k2.jpg', alt: 'Senior girl black mini dress at HAPPY mural' },
  { id: 'senior-40', src: '/images/seniors/real/y2k3.jpg', alt: 'Senior girl gray polo pink sneakers at pink mural' },
  { id: 'senior-41', src: '/images/seniors/real/sports.jpg', alt: 'Senior boy with golf club and Travis Mathew polo' },
  { id: 'senior-42', src: '/images/seniors/real/graduated.jpg', alt: 'Senior in graduation cap gown medals and cords' },
  { id: 'senior-43', src: '/images/seniors/real/twoboys-redrock.jpg', alt: 'Two senior boys at Red Rock Canyon' },
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
