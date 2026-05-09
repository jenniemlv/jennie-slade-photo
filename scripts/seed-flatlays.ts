/**
 * seed-flatlays.ts — pre-warm the garment flat-lay cache for /what-to-wear.
 *
 * Iterates the family outfit matrix, calls Replicate flux-schnell per piece,
 * downloads each image into public/garments/, and rewrites
 * src/app/what-to-wear/garment-cache.ts with the resulting key→path map.
 *
 * Run once after REPLICATE_API_TOKEN is set in .env.local:
 *   npx tsx scripts/seed-flatlays.ts
 *
 * Cost: ~45 images × $0.003 ≈ $0.14 one-time.
 * Safe to re-run; existing cache entries are preserved unless --force is used.
 */

import dotenv from 'dotenv'
import Replicate from 'replicate'
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

// Next.js auto-loads .env.local; this script runs outside Next, so do it manually.
dotenv.config({ path: '.env.local' })
import { outfitsBySession, getPieces } from '../src/app/what-to-wear/data'
import { GARMENT_CACHE as EXISTING_CACHE } from '../src/app/what-to-wear/garment-cache'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const PROJECT_ROOT = path.resolve(__dirname, '..')
const PUBLIC_GARMENTS_DIR = path.join(PROJECT_ROOT, 'public', 'garments')
const CACHE_FILE = path.join(PROJECT_ROOT, 'src', 'app', 'what-to-wear', 'garment-cache.ts')

const FORCE = process.argv.includes('--force')

if (!process.env.REPLICATE_API_TOKEN) {
  console.error('Missing REPLICATE_API_TOKEN in .env.local')
  process.exit(1)
}

const replicate = new Replicate({ auth: process.env.REPLICATE_API_TOKEN })

// Type-specific prompt enhancement. Output: editorial flat-lay, neutral background.
function buildPrompt(pieceType: string, description: string): string {
  const base = 'editorial flat-lay product photography, soft natural overhead light, neutral cream linen background, magazine quality, no people, no mannequin, isolated garment'
  switch (pieceType) {
    case 'top':
      return `${base}. Subject: ${description}. Garment laid flat, sleeves arranged naturally, slight texture visible.`
    case 'bottom':
      return `${base}. Subject: ${description}. Folded once at the waist, leg flat, fabric drape visible.`
    case 'shoes':
      return `${base}. Subject: ${description}. Pair side by side, top-down view.`
    case 'accessory':
      return `${base}. Subject: ${description}. Items arranged minimally on the linen, jewelry photography style.`
    case 'outerwear':
      return `${base}. Subject: ${description}. Coat laid flat, lapels open, sleeves spread.`
    default:
      return `${base}. Subject: ${description}.`
  }
}

interface Job {
  cacheKey: string
  filename: string
  prompt: string
}

function buildJobs(): Job[] {
  const jobs: Job[] = []
  const session = 'family'
  const styles = Object.keys(outfitsBySession.family) as Array<keyof typeof outfitsBySession.family>

  for (const style of styles) {
    const outfits = outfitsBySession.family[style]
    outfits.forEach((outfit, outfitIdx) => {
      const pieces = getPieces(outfit)
      pieces.forEach((piece, pieceIdx) => {
        const cacheKey = `${session}:${style}:${outfitIdx}:${pieceIdx}`
        const filename = `${session}-${style}-${outfitIdx}-${pieceIdx}.jpg`
        const prompt = buildPrompt(piece.type, piece.description)
        jobs.push({ cacheKey, filename, prompt })
      })
    })
  }

  return jobs
}

async function downloadImage(url: string, dest: string): Promise<void> {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`HTTP ${res.status} fetching ${url}`)
  const buf = Buffer.from(await res.arrayBuffer())
  await fs.writeFile(dest, buf)
}

async function generateOne(job: Job, attempt = 1): Promise<string> {
  try {
    // flux-schnell: fast, cheap, good for stylized product shots
    const output = (await replicate.run(
      'black-forest-labs/flux-schnell',
      {
        input: {
          prompt: job.prompt,
          aspect_ratio: '4:5',
          num_outputs: 1,
          num_inference_steps: 4,
          output_format: 'jpg',
          output_quality: 85,
        },
      },
    )) as unknown as string[] | string

    const url = Array.isArray(output) ? output[0] : output
    if (!url) throw new Error(`No output URL for ${job.cacheKey}`)
    return url
  } catch (err) {
    const msg = (err as Error).message
    // Honor Replicate's 429 retry_after; max 5 attempts
    const retryMatch = msg.match(/retry_after"\s*:\s*(\d+)/)
    if (retryMatch && attempt <= 5) {
      const wait = parseInt(retryMatch[1], 10) + 1
      process.stdout.write(`429, waiting ${wait}s ... `)
      await new Promise((r) => setTimeout(r, wait * 1000))
      return generateOne(job, attempt + 1)
    }
    throw err
  }
}

function writeCacheFile(map: Record<string, string>): string {
  const sortedEntries = Object.entries(map).sort(([a], [b]) => a.localeCompare(b))
  const body = sortedEntries
    .map(([k, v]) => `  ${JSON.stringify(k)}: ${JSON.stringify(v)},`)
    .join('\n')
  return `/**
 * GARMENT_CACHE — pre-generated flat-lay images for /what-to-wear mood board.
 *
 * Generated by scripts/seed-flatlays.ts. To regenerate: re-run that script.
 * Key format: \`{sessionKey}:{styleKey}:{outfitIdx}:{pieceIdx}\`
 */
export const GARMENT_CACHE: Record<string, string> = {
${body}
}
`
}

async function main() {
  await fs.mkdir(PUBLIC_GARMENTS_DIR, { recursive: true })

  const jobs = buildJobs()
  console.log(`Found ${jobs.length} flat-lay jobs (~$${(jobs.length * 0.003).toFixed(3)} on flux-schnell).`)

  const cache: Record<string, string> = { ...EXISTING_CACHE }
  let skipped = 0
  let generated = 0
  let failed = 0

  for (let i = 0; i < jobs.length; i++) {
    const job = jobs[i]
    const dest = path.join(PUBLIC_GARMENTS_DIR, job.filename)
    const publicPath = `/garments/${job.filename}`

    if (!FORCE && cache[job.cacheKey]) {
      try {
        await fs.access(dest)
        skipped++
        continue
      } catch {
        // file missing, regenerate
      }
    }

    process.stdout.write(`[${i + 1}/${jobs.length}] ${job.cacheKey} ... `)
    try {
      const url = await generateOne(job)
      await downloadImage(url, dest)
      cache[job.cacheKey] = publicPath
      generated++
      console.log('ok')
      // Save cache after each success so a crash doesn't lose progress
      await fs.writeFile(CACHE_FILE, writeCacheFile(cache), 'utf8')
    } catch (err) {
      failed++
      console.log(`FAIL: ${(err as Error).message}`)
    }
  }

  console.log(`\nDone. Generated: ${generated}. Skipped: ${skipped}. Failed: ${failed}.`)
  console.log(`Cache file: ${CACHE_FILE}`)
  console.log(`Images: ${PUBLIC_GARMENTS_DIR}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
