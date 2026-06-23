// /admin/login — password gate for the journal admin.

import { redirect } from 'next/navigation'
import { signIn, isSignedIn } from '@/lib/admin-auth'

export const metadata = { title: 'Admin Login' }

async function loginAction(formData: FormData) {
  'use server'
  const password = String(formData.get('password') ?? '')
  const ok = await signIn(password)
  if (ok) redirect('/admin')
  redirect('/admin/login?error=1')
}

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  if (await isSignedIn()) redirect('/admin')
  const sp = await searchParams
  const hasError = sp.error === '1'

  return (
    <main className="min-h-screen flex items-center justify-center px-6 bg-warm-white">
      <div className="max-w-sm w-full">
        <h1 className="font-accent italic text-[36px] text-charcoal text-center mb-2">
          The Journal
        </h1>
        <p className="type-heading text-gray text-center mb-10">Admin sign in</p>

        <form action={loginAction} className="space-y-5">
          <div>
            <label
              htmlFor="password"
              className="block type-heading text-charcoal mb-2"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              autoFocus
              className="w-full border border-warm-gray px-4 py-3 type-body focus:outline-none focus:border-charcoal"
            />
          </div>

          {hasError && (
            <p className="text-red-600 type-heading">Wrong password.</p>
          )}

          <button
            type="submit"
            className="w-full bg-charcoal text-warm-white py-3 type-heading hover:opacity-80 transition-opacity"
          >
            Sign in
          </button>
        </form>
      </div>
    </main>
  )
}
