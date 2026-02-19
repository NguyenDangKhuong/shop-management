import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ResetPasswordForm from '@/components/shop/login/ResetPasswordForm'

// Mock fetch
global.fetch = jest.fn()

// Mock useRouter
const mockPush = jest.fn()
jest.mock('next/navigation', () => ({
    useRouter: () => ({
        push: mockPush
    }),
    useSearchParams: () => ({
        get: (key: string) => {
            const params: Record<string, string> = {
                token: 'test-token-123',
                email: 'test@example.com'
            }
            return params[key] || null
        }
    })
}))

describe('ResetPasswordForm', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('renders the form with password fields', () => {
        render(<ResetPasswordForm />)

        expect(screen.getByText('Reset Password')).toBeInTheDocument()
        expect(screen.getByPlaceholderText('New Password')).toBeInTheDocument()
        expect(screen.getByPlaceholderText('Confirm Password')).toBeInTheDocument()
        expect(screen.getByRole('button', { name: /reset password/i })).toBeInTheDocument()
    })

    it('shows error when passwords do not match', async () => {
        const user = userEvent.setup()

        render(<ResetPasswordForm />)

        await user.type(screen.getByPlaceholderText('New Password'), 'password123')
        await user.type(screen.getByPlaceholderText('Confirm Password'), 'differentpass')
        await user.click(screen.getByRole('button', { name: /reset password/i }))

        await waitFor(() => {
            expect(screen.getByText('Passwords do not match')).toBeInTheDocument()
        })
    })

    it('shows error when password is too short', async () => {
        const user = userEvent.setup()

        render(<ResetPasswordForm />)

        await user.type(screen.getByPlaceholderText('New Password'), '12345')
        await user.type(screen.getByPlaceholderText('Confirm Password'), '12345')
        await user.click(screen.getByRole('button', { name: /reset password/i }))

        await waitFor(() => {
            expect(screen.getByText('Password must be at least 6 characters')).toBeInTheDocument()
        })
    })

    it('submits successfully and shows success message', async () => {
        const user = userEvent.setup()
            ; (fetch as jest.Mock).mockResolvedValue({
                json: () => Promise.resolve({ success: true })
            })

        render(<ResetPasswordForm />)

        await user.type(screen.getByPlaceholderText('New Password'), 'newpassword123')
        await user.type(screen.getByPlaceholderText('Confirm Password'), 'newpassword123')
        await user.click(screen.getByRole('button', { name: /reset password/i }))

        await waitFor(() => {
            expect(screen.getByText(/password reset successfully/i)).toBeInTheDocument()
        })

        expect(fetch).toHaveBeenCalledWith('/api/auth/reset-password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: 'test@example.com',
                token: 'test-token-123',
                password: 'newpassword123'
            })
        })
    })

    it('shows API error message', async () => {
        const user = userEvent.setup()
            ; (fetch as jest.Mock).mockResolvedValue({
                json: () => Promise.resolve({ success: false, error: 'Invalid or expired token' })
            })

        render(<ResetPasswordForm />)

        await user.type(screen.getByPlaceholderText('New Password'), 'newpassword123')
        await user.type(screen.getByPlaceholderText('Confirm Password'), 'newpassword123')
        await user.click(screen.getByRole('button', { name: /reset password/i }))

        await waitFor(() => {
            expect(screen.getByText('Invalid or expired token')).toBeInTheDocument()
        })
    })

    it('renders back to login link', () => {
        render(<ResetPasswordForm />)

        const backLink = screen.getByText('← Back to Login')
        expect(backLink).toBeInTheDocument()
        expect(backLink.closest('a')).toHaveAttribute('href', '/login')
    })
})

describe('ResetPasswordForm — invalid link', () => {
    beforeEach(() => {
        jest.clearAllMocks()

        // Override useSearchParams to return null values
        jest.spyOn(require('next/navigation'), 'useSearchParams').mockReturnValue({
            get: () => null
        })
    })

    it('shows invalid link message when token/email missing', () => {
        render(<ResetPasswordForm />)

        expect(screen.getByText('Invalid Reset Link')).toBeInTheDocument()
        expect(screen.getByText(/request a new reset link/i)).toBeInTheDocument()
    })
})
