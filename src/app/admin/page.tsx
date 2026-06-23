// /admin — dashboard. Shows recent posts + a link to create a new one.

import Link from 'next/link'
import { redirect } from 'next/navigation'
import { requireAdmin, signOut } from '@/lib/admin-auth'
import { getAllPosts } from '@/lib/blog'

export const metadata = { title: 'Journal Admin' }
export const dynamic = 'force-dynamic'

async function logoutAction() {
  'use server'
  await signOut()
  redirect('/admin/login')
}

export default async function AdminHome() {
  await requireAdmin()
  const posts = await getAllPosts()
  const recent = posts.slice(0, 25)

  return (
    <main className="max-w-3xl mx-auto px-6 pt-20 pb-24">
      <div className="flex items-baseline justify-between mb-10">
        <h1 className="font-accent italic text-[40px] text-charcoal">
          The Journal
        </h1>
        <form action={logoutAction}>
          <button
            type="submit"
            className="type-heading text-gray hover:text-charcoal transition-colors"
          >
            Sign out
          </button>
        </form>
      </div>

      <Link
        href="/admin/new"
        className="block bg-charcoal text-warm-white text-center py-4 type-heading hover:opacity-80 transition-opacity mb-12"
      >
        + Write a new post
      </Link>

      <h2 className="type-heading text-charcoal mb-6">
        Recent posts ({posts.length} total)
      </h2>
      <ul className="divide-y divide-warm-gray">
        {recent.map((p) => (
          <li key={p.slug} className="py-4">
            <Link
              href={`/blog/${p.slug}`}
              target="_blank"
              className="block hover:opacity-70 transition-opacity"
            >
              <p className="type-heading text-gray mb-1">
                {new Date(p.date + 'T00:00:00').toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
              <p className="font-display text-[20px] text-charcoal">{p.title}</p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}
