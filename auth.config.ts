import type { NextAuthConfig } from 'next-auth'

import { NEXT_AUTH_SECRET } from '@/utils/constants'

export const authConfig = {
  pages: {
    signIn: '/login'
  },
  secret: NEXT_AUTH_SECRET,
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
    // Add role to JWT token
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
        token.id = user.id
      }
      return token
    },
    // Add role to session
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as number
        session.user.id = token.id as string
      }
      return session
    }
  },
  providers: [] // Add providers with an empty array for now
} satisfies NextAuthConfig
