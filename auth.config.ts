import type { NextAuthConfig } from 'next-auth'

import { NEXT_AUTH_SECRET } from '@/utils/constants'

// JWT session duration: 1 day
const JWT_MAX_AGE = 24 * 60 * 60 // 1 day in seconds
// Absolute refresh window: 7 days from first login
const REFRESH_WINDOW = 7 * 24 * 60 * 60 // 7 days in seconds

export const authConfig = {
  pages: {
    signIn: '/login'
  },
  secret: NEXT_AUTH_SECRET,
  session: {
    strategy: 'jwt' as const,
    maxAge: JWT_MAX_AGE,
  },
  callbacks: {
    // Route protection - this runs in middleware
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const userRole = auth?.user?.role

      // Admin routes that require role = 0
      const adminRoutes = ['/products', '/orders', '/categories', '/carts']
      const isOnAdminRoute = adminRoutes.some((route) =>
        nextUrl.pathname.startsWith(route)
      )


      if (isOnAdminRoute) {
        // Not logged in - redirect to login
        if (!isLoggedIn) {
          console.log('  ❌ NOT LOGGED IN - Will redirect to /login')
          return false
        }

        // Logged in but not admin (role !== 0)
        if (userRole !== 0) {
          console.log('  ❌ NOT ADMIN - Will redirect to /')
          return Response.redirect(new URL('/', nextUrl))
        }

        console.log('  ✅ ADMIN ACCESS GRANTED')
      }

      return true
    },
    // JWT rotation: refresh token if within 7-day window
    async jwt({ token, user }) {
      if (user) {
        // First login: set role, id, and login timestamp
        token.role = user.role
        token.id = user.id
        token.loginAt = Math.floor(Date.now() / 1000)
      }

      // Check if token is within the 7-day refresh window
      const loginAt = token.loginAt as number | undefined
      if (loginAt) {
        const now = Math.floor(Date.now() / 1000)
        const elapsed = now - loginAt

        if (elapsed > REFRESH_WINDOW) {
          // Beyond 7-day window → force re-login
          console.log('  🔒 Token expired (7-day refresh window)')
          return { ...token, expired: true }
        }

        // Within window → refresh the token expiry
        token.exp = now + JWT_MAX_AGE
      }

      return token
    },
    // Add role to session
    async session({ session, token }) {
      // If token is marked as expired, return empty session
      if (token.expired) {
        return { ...session, user: undefined as any }
      }

      if (session.user) {
        session.user.role = token.role as number
        session.user.id = token.id as string
      }
      return session
    }
  },
  providers: [] // Add providers with an empty array for now
} satisfies NextAuthConfig
