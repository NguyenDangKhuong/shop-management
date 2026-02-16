// Mock Response.redirect for jsdom environment
const mockResponse = { status: 302 }
global.Response = {
    redirect: jest.fn(() => mockResponse),
} as any

import { authConfig } from '../../auth.config'

// Extract callbacks for testing
const { jwt, session, authorized } = authConfig.callbacks

describe('Auth Config', () => {
    describe('JWT Configuration', () => {
        it('has session strategy set to jwt', () => {
            expect(authConfig.session.strategy).toBe('jwt')
        })

        it('has maxAge set to 1 day (86400 seconds)', () => {
            expect(authConfig.session.maxAge).toBe(86400)
        })

        it('sign-in page is /login', () => {
            expect(authConfig.pages.signIn).toBe('/login')
        })
    })

    describe('JWT Callback - Token Rotation', () => {
        it('sets loginAt, role, and id on first login', async () => {
            const now = Math.floor(Date.now() / 1000)
            const token = {} as any
            const user = { id: 'user-1', role: 0 } as any

            const result = await jwt({ token, user } as any)

            expect(result.role).toBe(0)
            expect(result.id).toBe('user-1')
            expect(result.loginAt).toBeGreaterThanOrEqual(now)
            expect(result.loginAt).toBeLessThanOrEqual(now + 1)
        })

        it('refreshes token expiry within 7-day window', async () => {
            const now = Math.floor(Date.now() / 1000)
            const token = {
                loginAt: now - 3600, // logged in 1 hour ago
                role: 0,
                id: 'user-1',
            } as any

            const result = await jwt({ token, user: undefined } as any)

            expect(result.exp).toBeGreaterThanOrEqual(now + 86400 - 1)
            expect(result.expired).toBeUndefined()
        })

        it('marks token as expired beyond 7-day window', async () => {
            const now = Math.floor(Date.now() / 1000)
            const token = {
                loginAt: now - (8 * 24 * 3600), // logged in 8 days ago
                role: 0,
                id: 'user-1',
            } as any

            const result = await jwt({ token, user: undefined } as any)

            expect(result.expired).toBe(true)
        })

        it('does not expire token at exactly 7 days', async () => {
            const now = Math.floor(Date.now() / 1000)
            const token = {
                loginAt: now - (7 * 24 * 3600) + 10, // just under 7 days
                role: 0,
                id: 'user-1',
            } as any

            const result = await jwt({ token, user: undefined } as any)

            expect(result.expired).toBeUndefined()
            expect(result.exp).toBeDefined()
        })

        it('returns token as-is when no loginAt is set', async () => {
            const token = { role: 0, id: 'user-1' } as any

            const result = await jwt({ token, user: undefined } as any)

            expect(result).toEqual(token)
        })
    })

    describe('Session Callback', () => {
        it('adds role and id to session from token', async () => {
            const session = { user: { name: 'Test' } } as any
            const token = { role: 0, id: 'user-1' } as any

            const result = await (authConfig.callbacks.session as any)({ session, token })

            expect(result.user.role).toBe(0)
            expect(result.user.id).toBe('user-1')
        })

        it('clears user when token is expired', async () => {
            const session = { user: { name: 'Test' } } as any
            const token = { expired: true, role: 0, id: 'user-1' } as any

            const result = await (authConfig.callbacks.session as any)({ session, token })

            expect(result.user).toBeUndefined()
        })
    })

    describe('Route Authorization', () => {
        const createRequest = (pathname: string) => ({
            request: { nextUrl: { pathname } },
        })

        // Public routes - should be accessible without auth
        it.each([
            ['/', 'landing page'],
            ['/cv', 'CV page'],
            ['/projects', 'projects page'],
            ['/login', 'login page'],
            ['/register', 'register page'],
            ['/privacy', 'privacy page'],
            ['/terms', 'terms page'],
            ['/shopee-links', 'shopee links page'],
        ])('allows access to %s (%s) without auth', (route) => {
            const result = authorized({
                ...createRequest(route),
                auth: null,
            } as any)

            expect(result).toBe(true)
        })

        // Protected routes - should require login + admin
        it.each([
            ['/products'],
            ['/orders'],
            ['/categories'],
            ['/carts'],
            ['/facebook-posts'],
            ['/tiktok-accounts'],
            ['/veo3-tokens'],
        ])('denies access to %s when not logged in', (route) => {
            const result = authorized({
                ...createRequest(route),
                auth: null,
            } as any)

            expect(result).toBe(false)
        })

        it('grants admin access for role 0', () => {
            const result = authorized({
                ...createRequest('/products'),
                auth: { user: { role: 0 } },
            } as any)

            expect(result).toBe(true)
        })

        it('redirects non-admin users from protected routes', () => {
            const result = authorized({
                request: { nextUrl: new URL('http://localhost/products') },
                auth: { user: { role: 1 } },
            } as any)

            expect(result).toBeTruthy()
            expect(result).not.toBe(true)
        })
    })
})
