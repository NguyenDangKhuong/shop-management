import '@testing-library/jest-dom'
import React from 'react'
import en from '@/i18n/en'

// Mock i18n — return English translations by default
jest.mock('@/i18n', () => ({
    useTranslation: () => ({
        language: 'en',
        setLanguage: jest.fn(),
        t: (key: string) => (en as Record<string, string>)[key] || key,
    }),
    LanguageProvider: ({ children }: { children: React.ReactNode }) => children,
}))

// Suppress console errors for expected React testing warnings
const originalError = console.error
beforeAll(() => {
    console.error = (...args: any[]) => {
        const stringified = args[0]?.toString() || ''

        // Suppress specific known warnings and test errors
        if (
            stringified.includes('Warning: An update to') ||
            stringified.includes('Not wrapped in act') ||
            stringified.includes('Network error') ||
            stringified.includes('Instance created by `useForm` is not connected')
        ) {
            return
        }
        originalError.call(console, ...args)
    }
})

afterAll(() => {
    console.error = originalError
})

// Mock Next.js router
jest.mock('next/navigation', () => ({
    useRouter() {
        return {
            push: jest.fn(),
            replace: jest.fn(),
            prefetch: jest.fn(),
            back: jest.fn(),
            pathname: '/',
            query: {},
            asPath: '/'
        }
    },
    usePathname() {
        return '/'
    },
    useSearchParams() {
        return new URLSearchParams()
    }
}))

// Mock Next.js Link component
jest.mock('next/link', () => {
    return ({ children, href }: any) => {
        return React.createElement('a', { href }, children)
    }
})

// Mock IntersectionObserver for Framer Motion
class MockIntersectionObserver {
    observe = jest.fn()
    disconnect = jest.fn()
    unobserve = jest.fn()
}

if (typeof window !== 'undefined') {
    Object.defineProperty(window, 'IntersectionObserver', {
        writable: true,
        configurable: true,
        value: MockIntersectionObserver
    })
}

if (typeof global !== 'undefined') {
    Object.defineProperty(global, 'IntersectionObserver', {
        writable: true,
        configurable: true,
        value: MockIntersectionObserver
    })
}
