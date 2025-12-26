import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { z } from 'zod'

import { authConfig } from './auth.config'
import UserModel, { User } from './src/models/User'
import connectDb from './src/utils/connectDb'

export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials)

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data

          // Connect to database
          await connectDb()

          // Find user by email
          const user = await UserModel.findOne({ email }).lean<User>()

          if (!user) {
            console.log('User not found')
            return null
          }

          // Check password (in production, use bcrypt.compare!)
          if (password !== user.password) {
            console.log('Invalid password')
            return null
          }

          // Return user object with role
          return {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
          }
        }

        return null
      }
    })
  ]
})
