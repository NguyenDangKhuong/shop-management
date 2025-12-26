import NextAuth from 'next-auth'

import { authConfig } from './auth.config'

// Export auth for middleware (without Credentials provider to avoid Edge Runtime issues)
export const { auth } = NextAuth(authConfig)
