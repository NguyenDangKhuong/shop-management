import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
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

          // Check password — support both bcrypt hash and legacy plain text
          const storedPassword = user.password ?? ''
          const isBcryptHash = storedPassword.startsWith('$2a$') || storedPassword.startsWith('$2b$')

          let isValid = false
          if (isBcryptHash) {
            isValid = bcrypt.compareSync(password, storedPassword)
          } else {
            // Legacy plain text check — auto-migrate to bcrypt
            isValid = password === storedPassword
            if (isValid) {
              const hashed = bcrypt.hashSync(password, 10)
              await UserModel.updateOne({ _id: user._id }, { password: hashed })
              console.log('  🔄 Password migrated to bcrypt for:', email)
            }
          }

          if (!isValid) {
            console.log('Invalid password')
            return null
          }

          // Return user object with role
          return {
            id: String(user._id),
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
