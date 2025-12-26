import { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  /**
   * Extend User to include role
   */
  interface User {
    role?: number
    id?: string
  }

  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      role?: number
      id?: string
    } & DefaultSession['user']
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role?: number
    id?: string
  }
}

declare global {
  var mongoose: {
    conn: any
    promise: any
  }
}

export { }
