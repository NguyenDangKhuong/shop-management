import { ADMIN_URL, SITE_DOMAIN } from '@/utils/constants'

// Hostnames where login works natively (cookie domain matches)
const VERCEL_HOST = new URL(ADMIN_URL).hostname // thetaphoa.vercel.app
const SITE_HOST = SITE_DOMAIN                   // shop.thetaphoa.store

/**
 * Returns the correct login URL based on the current hostname.
 * When browsing on proxy domains (e.g. khuong.theworkpc.com),
 * redirects to the Vercel app for login (cookie domain must match).
 */
export function useLoginUrl(): string {
    if (typeof window === 'undefined') return '/login'

    const hostname = window.location.hostname
    const isOwnDomain =
        hostname === 'localhost' ||
        hostname === VERCEL_HOST ||
        hostname === SITE_HOST

    return isOwnDomain ? '/login' : `${ADMIN_URL}/login`
}
