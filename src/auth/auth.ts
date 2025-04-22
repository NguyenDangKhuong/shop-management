// 'use client'

// import NextAuth from 'next-auth'
// import { authConfig } from './authConfig'


// export const { auth, signIn, signOut } = NextAuth({
//   ...authConfig,
// })

// src/auth/auth.ts
import NextAuth from 'next-auth'
import { authConfig } from './authConfig'

export const { auth } = NextAuth(authConfig)

