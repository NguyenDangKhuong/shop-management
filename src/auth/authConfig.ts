import type { NextAuthConfig } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { z } from 'zod'
import { NEXT_AUTH_SECRET } from '@/utils/constants'
import { getUserByEmail } from '@/app/api/user/route'
import connectDb from '@/utils/connectDb'

declare module 'next-auth' {
  interface User {
    role: 'admin' | 'user'
  }
}

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: '/login',
  },
  secret: NEXT_AUTH_SECRET,
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectDb()
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials)

        if (!parsedCredentials.success) return null

        const { email, password } = parsedCredentials.data
        const user = await getUserByEmail(email)

        if (!user) return null

        // TODO: Implement proper password verification
        if (user.password !== password) return null

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          role: user.role,
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isAdmin = auth?.user?.role === 'admin'
      const isOnAdminPage = nextUrl.pathname.startsWith('/admin')
      const isOnUserPage = nextUrl.pathname.startsWith('/user')

      if (isOnAdminPage) {
        if (isLoggedIn && isAdmin) return true
        return false // Redirect to login page
      }

      if (isOnUserPage) {
        if (isLoggedIn) return true
        return false // Redirect to login page
      }

      // Public routes
      return true
    },
    async jwt({ token, user }) {
        if (user) {
          token.role = user.role
          token.name = user.name
        }
        return token
      },
    async session({ session, token }) {
        if (token && session.user) {
            session.user.role = token.role as "admin" | "user"
            session.user.name = token.name as "admin" | "user"
          }
          return session
    },
  },
} satisfies NextAuthConfig
