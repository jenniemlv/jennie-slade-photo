import { NextRequest, NextResponse } from 'next/server'

/**
 * Multi-domain routing for jennieslade.com.
 *
 * family-info.jennieslade.com — serves the family info hub at root.
 *   - "/" rewrites to "/families/info" (URL stays clean)
 *   - other paths pass through (e.g. "/what-to-wear" still works)
 *
 * newborns.jennieslade.com — serves the newborn info hub at root.
 *   - "/" rewrites to "/newborns/info"
 *
 * All other hosts (localhost, jennie-slade-photo.vercel.app, jennieslade.com)
 * behave normally with no rewrites.
 *
 * Extend by adding more host blocks below.
 */

const FAMILY_INFO_HOST = 'family-info.jennieslade.com'
const NEWBORN_INFO_HOST = 'newborns.jennieslade.com'

export function middleware(req: NextRequest) {
  const host = req.headers.get('host') ?? ''
  const url = req.nextUrl

  // ── family-info.jennieslade.com ──────────────────────────────────────────
  if (host === FAMILY_INFO_HOST) {
    if (url.pathname === '/') {
      url.pathname = '/families/info'
      return NextResponse.rewrite(url)
    }
  }

  // ── newborns.jennieslade.com ─────────────────────────────────────────────
  if (host === NEWBORN_INFO_HOST) {
    if (url.pathname === '/') {
      url.pathname = '/newborns/info'
      return NextResponse.rewrite(url)
    }
  }

  return NextResponse.next()
}

// Skip static assets + Next internals so middleware runs only on real pages.
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|images|fonts|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|woff|woff2|ttf)).*)'],
}
