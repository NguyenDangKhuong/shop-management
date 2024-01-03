import { useRouter } from 'next/router'

import { useEffect } from 'react'

import { useSession } from 'next-auth/react'

export const useCheckAuth = () => {
  const router = useRouter()

  const { status, data } = useSession()
  const isAdmin = data?.user.isAdmin || false

  useEffect(() => {
    // logged in but go to user modifier pages => redirect to internal page
    if (
      status === 'authenticated' &&
      (router.route === '/auth/signin' ||
        router.route === '/register' ||
        router.route === '/forgot-password' ||
        router.route === '/change-password')
    ) {
      isAdmin ? router.replace('/dashboard') : router.replace('/')
    } else if (
      // not logged in and don't go to user modifier pages => if go to normal page => kick to signin page
      status === 'unauthenticated' &&
      router.route !== '/auth/signin' &&
      router.route !== '/register' &&
      router.route !== '/forgot-password' &&
      router.route !== '/change-password'
    ) {
      router.replace('/auth/signin')
    }

    // protect admin page
    if (status === 'authenticated' && !isAdmin) {
      router.replace('/')
    }
  }, [status])

  return {
    status,
    isAuthenticated: status === 'authenticated',
    isAdmin
  }
}
