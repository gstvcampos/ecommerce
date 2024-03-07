import NextAuth from 'next-auth'
import authConfig from './auth.config'

import { NextResponse } from 'next/server'
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  privateRoutes,
} from './routes'

const { auth } = NextAuth(authConfig)

export default auth((req) => {
  const { nextUrl } = req
  const isLoogedIn = !!req.auth
  console.log(req.auth?.user)

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
  const isAuthRoute = authRoutes.includes(nextUrl.pathname)
  const isPrivateRoute = privateRoutes.includes(nextUrl.pathname)

  if (isApiAuthRoute) return

  if (isAuthRoute) {
    if (isLoogedIn) {
      return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
    }
    return
  }

  if (!isLoogedIn && isPrivateRoute) {
    let callbackUrl = nextUrl.pathname
    if (nextUrl.search) callbackUrl += nextUrl.search

    const encodedCallbackUrl = encodeURIComponent(callbackUrl)

    return NextResponse.redirect(
      new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, nextUrl),
    )
  }
})

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
