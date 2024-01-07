'use client'

import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { z } from 'zod'

import { authConfig } from '../auth.config'
import UserModel, { User } from './models/User'

// import bcrypt from 'bcrypt';

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      // @ts-ignore
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials)
        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data
          console.log(email, password)
          if (!email) return
          // const existedUser: User | null = await UserModel.findOne({ email }).lean()
          // if (!existedUser) return null;
          // if (password !== existedUser?.password) return null;
          // return existedUser;
        }
        return null
      }
    })
  ]
})
