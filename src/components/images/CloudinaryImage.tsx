'use client'

import { CldImage } from 'next-cloudinary'
import type { CldImageProps } from 'next-cloudinary'

/**
 * Project-wide Cloudinary image wrapper.
 *
 * USE THIS for every Cloudinary-hosted image. Never use <Image src={cloudinaryUrl}> directly
 * because Next.js would double-optimize an already-optimized Cloudinary image.
 *
 * All gallery images must pass explicit width and height props to prevent CLS.
 */
export default function CloudinaryImage(props: CldImageProps) {
  return (
    <CldImage
      {...props}
      // Visually identical to quality=100 but 30-40% smaller file size
      quality={props.quality ?? 80}
    />
  )
}
