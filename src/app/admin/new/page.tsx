// /admin/new — write a new journal post. Commits MDX (and any uploaded
// images) to the GitHub repo. Vercel auto-redeploys on push in production.
//
// Local-dev note: in development the working tree is writable, so we
// ALSO write the files locally for instant preview. In production
// (Vercel), the GitHub commit triggers a rebuild and the post appears
// after that build finishes.

import Link from 'next/link'
import { redirect } from 'next/navigation'
import { existsSync } from 'node:fs'
import fs from 'node:fs/promises'
import path from 'node:path'
import { requireAdmin } from '@/lib/admin-auth'
import { commitFile } from '@/lib/github'

export const metadata = { title: 'New Journal Post' }
export const dynamic = 'force-dynamic'

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)
}

function escapeQuotes(s: string): string {
  return (s ?? '').replace(/\\/g, '\\\\').replace(/"/g, '\\"')
}

async function createPostAction(formData: FormData) {
  'use server'
  await requireAdmin()

  const title = String(formData.get('title') ?? '').trim()
  const date = String(formData.get('date') ?? '').trim()
  const excerpt = String(formData.get('excerpt') ?? '').trim()
  const body = String(formData.get('body') ?? '').trim()
  const customSlug = String(formData.get('slug') ?? '').trim()

  if (!title || !date || !excerpt || !body) {
    redirect('/admin/new?error=missing')
  }

  const slug = customSlug ? slugify(customSlug) : `${date}-${slugify(title)}`

  // Handle image uploads
  const imageEntries = formData.getAll('images').filter(
    (f): f is File => f instanceof File && f.size > 0,
  )

  const imagePaths: string[] = []
  let featuredImage = ''
  for (let i = 0; i < imageEntries.length; i++) {
    const file = imageEntries[i]
    const ext = (path.extname(file.name) || '.jpg').toLowerCase()
    const safeName = `${String(i + 1).padStart(2, '0')}${ext}`
    const repoPath = `public/journal/${slug}/${safeName}`
    const buf = Buffer.from(await file.arrayBuffer())
    await commitFile({
      path: repoPath,
      content: buf,
      message: `journal: add image ${safeName} for ${slug}`,
    })
    // Mirror locally for dev preview
    if (process.env.NODE_ENV !== 'production') {
      const localPath = path.join(process.cwd(), repoPath)
      await fs.mkdir(path.dirname(localPath), { recursive: true })
      await fs.writeFile(localPath, buf)
    }
    const publicPath = `/journal/${slug}/${safeName}`
    imagePaths.push(publicPath)
    if (i === 0) featuredImage = publicPath
  }

  // Build MDX
  const fm = [
    '---',
    `title: "${escapeQuotes(title)}"`,
    `date: "${date}"`,
    `excerpt: "${escapeQuotes(excerpt)}"`,
    `featuredImage: "${escapeQuotes(featuredImage)}"`,
    '---',
  ].join('\n')

  const imageBlock = imagePaths.length
    ? '\n\n' +
      imagePaths.map((p) => `<img src="${p}" alt="" />`).join('\n\n')
    : ''

  const mdx = `${fm}\n\n${body}${imageBlock}\n`
  const mdxRepoPath = `content/posts/${slug}.mdx`

  await commitFile({
    path: mdxRepoPath,
    content: mdx,
    message: `journal: ${title}`,
  })

  if (process.env.NODE_ENV !== 'production') {
    const localPath = path.join(process.cwd(), mdxRepoPath)
    await fs.mkdir(path.dirname(localPath), { recursive: true })
    if (existsSync(localPath)) {
      // Don't clobber an existing file in dev
      redirect(`/admin/new?error=duplicate&slug=${encodeURIComponent(slug)}`)
    }
    await fs.writeFile(localPath, mdx)
  }

  redirect(`/blog/${slug}`)
}

const ERROR_MESSAGES: Record<string, string> = {
  missing: 'Please fill in the title, date, excerpt, and body.',
  duplicate: 'A post with that slug already exists. Try a different title or set a custom slug.',
}

export default async function NewPostPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; slug?: string }>
}) {
  await requireAdmin()
  const sp = await searchParams
  const errMsg = sp.error ? ERROR_MESSAGES[sp.error] ?? 'Something went wrong.' : null

  const today = new Date().toISOString().slice(0, 10)

  return (
    <main className="max-w-2xl mx-auto px-6 pt-20 pb-24">
      <Link
        href="/admin"
        className="type-heading text-gray hover:text-charcoal transition-colors"
      >
        &larr; Back to admin
      </Link>

      <h1 className="font-accent italic text-[40px] text-charcoal mt-4 mb-10">
        New post
      </h1>

      {errMsg && (
        <p className="bg-red-50 border border-red-200 text-red-700 p-4 mb-6 type-body">
          {errMsg}
        </p>
      )}

      <form action={createPostAction} className="space-y-6" encType="multipart/form-data">
        <div>
          <label htmlFor="title" className="block type-heading text-charcoal mb-2">
            Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            required
            className="w-full border border-warm-gray px-4 py-3 type-body focus:outline-none focus:border-charcoal"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="date" className="block type-heading text-charcoal mb-2">
              Date
            </label>
            <input
              id="date"
              name="date"
              type="date"
              defaultValue={today}
              required
              className="w-full border border-warm-gray px-4 py-3 type-body focus:outline-none focus:border-charcoal"
            />
          </div>
          <div>
            <label htmlFor="slug" className="block type-heading text-charcoal mb-2">
              Slug <span className="text-gray normal-case">(optional)</span>
            </label>
            <input
              id="slug"
              name="slug"
              type="text"
              placeholder="auto from title"
              className="w-full border border-warm-gray px-4 py-3 type-body focus:outline-none focus:border-charcoal"
            />
          </div>
        </div>

        <div>
          <label htmlFor="excerpt" className="block type-heading text-charcoal mb-2">
            Excerpt
          </label>
          <textarea
            id="excerpt"
            name="excerpt"
            rows={2}
            required
            className="w-full border border-warm-gray px-4 py-3 type-body focus:outline-none focus:border-charcoal"
          />
          <p className="type-heading text-gray mt-1">
            Shown on the journal index. 1–2 sentences.
          </p>
        </div>

        <div>
          <label htmlFor="body" className="block type-heading text-charcoal mb-2">
            Body <span className="text-gray normal-case">(Markdown)</span>
          </label>
          <textarea
            id="body"
            name="body"
            rows={16}
            required
            className="w-full border border-warm-gray px-4 py-3 type-body font-mono text-sm focus:outline-none focus:border-charcoal"
            placeholder={`Write the post in Markdown.\n\n## A heading\n\nA paragraph.`}
          />
        </div>

        <div>
          <label htmlFor="images" className="block type-heading text-charcoal mb-2">
            Images <span className="text-gray normal-case">(optional)</span>
          </label>
          <input
            id="images"
            name="images"
            type="file"
            accept="image/*"
            multiple
            className="block w-full type-body"
          />
          <p className="type-heading text-gray mt-1">
            First image becomes the featured image. All images are appended to the post.
          </p>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-charcoal text-warm-white py-4 type-heading hover:opacity-80 transition-opacity"
          >
            Publish post
          </button>
          <p className="type-heading text-gray text-center mt-3">
            Commits MDX + images to GitHub. In production, Vercel rebuilds in ~1 minute.
          </p>
        </div>
      </form>
    </main>
  )
}
