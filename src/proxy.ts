import { headers } from 'next/headers'
import { type NextRequest, NextResponse } from 'next/server'
import { siteLinks } from '@/config'
import { auth } from '@/lib/auth'

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    const signInUrl = new URL(siteLinks.auth.signIn, request.url)
    signInUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(signInUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/settings/:path*', '/dashboard/:path*'],
}
