import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LoginForm from '@/components/shop/login/LoginForm'
import { authenticate } from '@/actions/auth'

// Mock the authenticate function
jest.mock('@/actions/auth', () => ({
    authenticate: jest.fn()
}))

// Mock useRouter
const mockPush = jest.fn()
jest.mock('next/navigation', () => ({
    useRouter: () => ({
        push: mockPush
    })
}))

describe('LoginForm', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('renders login form with all fields', () => {
        render(<LoginForm />)

        expect(screen.getByText('Welcome Back')).toBeInTheDocument()
        expect(screen.getByPlaceholderText('Email Address')).toBeInTheDocument()
        expect(screen.getByPlaceholderText('Password')).toBeInTheDocument()
        expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument()
    })

    it('shows validation errors for empty fields', async () => {
        render(<LoginForm />)

        const submitButton = screen.getByRole('button', { name: /login/i })
        fireEvent.click(submitButton)

        // HTML5 validation should prevent submission
        const emailInput = screen.getByPlaceholderText('Email Address') as HTMLInputElement
        const passwordInput = screen.getByPlaceholderText('Password') as HTMLInputElement

        expect(emailInput.validity.valid).toBe(false)
        expect(passwordInput.validity.valid).toBe(false)
    })

    it('submits form with valid credentials', async () => {
        const user = userEvent.setup()
        const mockAuthenticateResponse = { success: true, role: 0 }
            ; (authenticate as jest.Mock).mockResolvedValue(mockAuthenticateResponse)

        render(<LoginForm />)

        const emailInput = screen.getByPlaceholderText('Email Address')
        const passwordInput = screen.getByPlaceholderText('Password')
        const submitButton = screen.getByRole('button', { name: /login/i })

        await user.type(emailInput, 'test@example.com')
        await user.type(passwordInput, 'password123')
        await user.click(submitButton)

        await waitFor(() => {
            expect(authenticate).toHaveBeenCalledWith('test@example.com', 'password123')
            expect(mockPush).toHaveBeenCalledWith('/tiktok-accounts')
        })
    })

    it('redirects to home for non-admin users', async () => {
        const user = userEvent.setup()
        const mockAuthenticateResponse = { success: true, role: 1 }
            ; (authenticate as jest.Mock).mockResolvedValue(mockAuthenticateResponse)

        render(<LoginForm />)

        const emailInput = screen.getByPlaceholderText('Email Address')
        const passwordInput = screen.getByPlaceholderText('Password')
        const submitButton = screen.getByRole('button', { name: /login/i })

        await user.type(emailInput, 'user@example.com')
        await user.type(passwordInput, 'password123')
        await user.click(submitButton)

        await waitFor(() => {
            expect(authenticate).toHaveBeenCalledWith('user@example.com', 'password123')
            expect(mockPush).toHaveBeenCalledWith('/')
        })
    })

    it('shows error message on failed login', async () => {
        const user = userEvent.setup()
        const mockAuthenticateResponse = { success: false, error: 'Invalid credentials.' }
            ; (authenticate as jest.Mock).mockResolvedValue(mockAuthenticateResponse)

        render(<LoginForm />)

        const emailInput = screen.getByPlaceholderText('Email Address')
        const passwordInput = screen.getByPlaceholderText('Password')
        const submitButton = screen.getByRole('button', { name: /login/i })

        await user.type(emailInput, 'wrong@example.com')
        await user.type(passwordInput, 'wrongpassword')
        await user.click(submitButton)

        await waitFor(() => {
            expect(screen.getByText('Invalid credentials.')).toBeInTheDocument()
        })
    })

    it('shows loading state while submitting', async () => {
        const user = userEvent.setup()
        let resolveAuth: any
        const authPromise = new Promise((resolve) => {
            resolveAuth = resolve
        })
            ; (authenticate as jest.Mock).mockReturnValue(authPromise)

        render(<LoginForm />)

        const emailInput = screen.getByPlaceholderText('Email Address')
        const passwordInput = screen.getByPlaceholderText('Password')
        const submitButton = screen.getByRole('button', { name: /login/i })

        await user.type(emailInput, 'test@example.com')
        await user.type(passwordInput, 'password123')
        await user.click(submitButton)

        // Check loading state
        await waitFor(() => {
            expect(screen.getByText('LOGGING IN...')).toBeInTheDocument()
        })

        // Resolve the promise
        resolveAuth({ success: true, role: 0 })

        // Wait for loading to finish
        await waitFor(() => {
            expect(screen.queryByText('LOGGING IN...')).not.toBeInTheDocument()
        })
    })

    it('shows generic error on network failure', async () => {
        const user = userEvent.setup()
            ; (authenticate as jest.Mock).mockRejectedValue(new Error('Network error'))

        render(<LoginForm />)

        const emailInput = screen.getByPlaceholderText('Email Address')
        const passwordInput = screen.getByPlaceholderText('Password')
        const submitButton = screen.getByRole('button', { name: /login/i })

        await user.type(emailInput, 'test@example.com')
        await user.type(passwordInput, 'password123')
        await user.click(submitButton)

        await waitFor(() => {
            expect(screen.getByText('An error occurred during login')).toBeInTheDocument()
        })
    })

    it('renders sign up link', () => {
        render(<LoginForm />)

        const signUpLink = screen.getByText('Sign up')
        expect(signUpLink).toBeInTheDocument()
        expect(signUpLink.closest('a')).toHaveAttribute('href', '/register')
    })
})
