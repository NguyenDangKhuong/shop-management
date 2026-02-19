import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ForgotPasswordForm from '@/components/shop/login/ForgotPasswordForm'

// Mock fetch
global.fetch = jest.fn()

describe('ForgotPasswordForm', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('renders the form with email input and submit button', () => {
        render(<ForgotPasswordForm />)

        expect(screen.getByText('Forgot Password')).toBeInTheDocument()
        expect(screen.getByPlaceholderText('Email Address')).toBeInTheDocument()
        expect(screen.getByRole('button', { name: /send reset link/i })).toBeInTheDocument()
    })

    it('renders back to login link', () => {
        render(<ForgotPasswordForm />)

        const loginLink = screen.getByText('Login')
        expect(loginLink).toBeInTheDocument()
        expect(loginLink.closest('a')).toHaveAttribute('href', '/login')
    })

    it('shows success message after submitting', async () => {
        const user = userEvent.setup()
            ; (fetch as jest.Mock).mockResolvedValue({
                json: () => Promise.resolve({ success: true })
            })

        render(<ForgotPasswordForm />)

        const emailInput = screen.getByPlaceholderText('Email Address')
        const submitButton = screen.getByRole('button', { name: /send reset link/i })

        await user.type(emailInput, 'test@example.com')
        await user.click(submitButton)

        await waitFor(() => {
            expect(screen.getByText(/check your email/i)).toBeInTheDocument()
        })

        expect(fetch).toHaveBeenCalledWith('/api/auth/forgot-password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: 'test@example.com' })
        })
    })

    it('shows error message on API failure', async () => {
        const user = userEvent.setup()
            ; (fetch as jest.Mock).mockResolvedValue({
                json: () => Promise.resolve({ success: false, error: 'Something went wrong' })
            })

        render(<ForgotPasswordForm />)

        const emailInput = screen.getByPlaceholderText('Email Address')
        const submitButton = screen.getByRole('button', { name: /send reset link/i })

        await user.type(emailInput, 'test@example.com')
        await user.click(submitButton)

        await waitFor(() => {
            expect(screen.getByText('Something went wrong')).toBeInTheDocument()
        })
    })

    it('shows loading state while submitting', async () => {
        const user = userEvent.setup()
        let resolveRequest: any
            ; (fetch as jest.Mock).mockReturnValue(
                new Promise((resolve) => { resolveRequest = resolve })
            )

        render(<ForgotPasswordForm />)

        const emailInput = screen.getByPlaceholderText('Email Address')
        const submitButton = screen.getByRole('button', { name: /send reset link/i })

        await user.type(emailInput, 'test@example.com')
        await user.click(submitButton)

        await waitFor(() => {
            expect(screen.getByText('SENDING...')).toBeInTheDocument()
        })

        resolveRequest({ json: () => Promise.resolve({ success: true }) })

        await waitFor(() => {
            expect(screen.queryByText('SENDING...')).not.toBeInTheDocument()
        })
    })

    it('shows error on network failure', async () => {
        const user = userEvent.setup()
            ; (fetch as jest.Mock).mockRejectedValue(new Error('Network error'))

        render(<ForgotPasswordForm />)

        const emailInput = screen.getByPlaceholderText('Email Address')
        const submitButton = screen.getByRole('button', { name: /send reset link/i })

        await user.type(emailInput, 'test@example.com')
        await user.click(submitButton)

        await waitFor(() => {
            expect(screen.getByText('An error occurred. Please try again.')).toBeInTheDocument()
        })
    })
})
