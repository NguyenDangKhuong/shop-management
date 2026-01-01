import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import RegisterForm from '@/components/shop/register/RegisterForm'
import { register } from '@/actions/auth'

// Mock the register function
jest.mock('@/actions/auth', () => ({
    register: jest.fn()
}))

// Mock useRouter
const mockPush = jest.fn()
jest.mock('next/navigation', () => ({
    useRouter: () => ({
        push: mockPush
    })
}))

describe('RegisterForm', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('renders register form with all fields', () => {
        render(<RegisterForm />)

        expect(screen.getByText('Create Account')).toBeInTheDocument()
        expect(screen.getByPlaceholderText('Full Name')).toBeInTheDocument()
        expect(screen.getByPlaceholderText('Email Address')).toBeInTheDocument()
        expect(screen.getByPlaceholderText('Password')).toBeInTheDocument()
        expect(screen.getByPlaceholderText('Confirm Password')).toBeInTheDocument()
        expect(screen.getByRole('button', { name: /sign up/i })).toBeInTheDocument()
    })

    it('shows validation errors for empty fields', async () => {
        render(<RegisterForm />)

        const submitButton = screen.getByRole('button', { name: /sign up/i })
        fireEvent.click(submitButton)

        // HTML5 validation should prevent submission
        const nameInput = screen.getByPlaceholderText('Full Name') as HTMLInputElement
        const emailInput = screen.getByPlaceholderText('Email Address') as HTMLInputElement
        const passwordInput = screen.getByPlaceholderText('Password') as HTMLInputElement

        expect(nameInput.validity.valid).toBe(false)
        expect(emailInput.validity.valid).toBe(false)
        expect(passwordInput.validity.valid).toBe(false)
    })

    it('shows error when passwords do not match', async () => {
        const user = userEvent.setup()

        render(<RegisterForm />)

        const nameInput = screen.getByPlaceholderText('Full Name')
        const emailInput = screen.getByPlaceholderText('Email Address')
        const passwordInput = screen.getByPlaceholderText('Password')
        const confirmPasswordInput = screen.getByPlaceholderText('Confirm Password')
        const submitButton = screen.getByRole('button', { name: /sign up/i })

        await user.type(nameInput, 'John Doe')
        await user.type(emailInput, 'john@example.com')
        await user.type(passwordInput, 'password123')
        await user.type(confirmPasswordInput, 'password456')
        await user.click(submitButton)

        await waitFor(() => {
            expect(screen.getByText('Passwords do not match!')).toBeInTheDocument()
        })

        // Should not call register
        expect(register).not.toHaveBeenCalled()
    })

    it('submits form with valid data', async () => {
        const user = userEvent.setup()
        const mockRegisterResponse = { success: true }
            ; (register as jest.Mock).mockResolvedValue(mockRegisterResponse)

        render(<RegisterForm />)

        const nameInput = screen.getByPlaceholderText('Full Name')
        const emailInput = screen.getByPlaceholderText('Email Address')
        const passwordInput = screen.getByPlaceholderText('Password')
        const confirmPasswordInput = screen.getByPlaceholderText('Confirm Password')
        const submitButton = screen.getByRole('button', { name: /sign up/i })

        await user.type(nameInput, 'John Doe')
        await user.type(emailInput, 'john@example.com')
        await user.type(passwordInput, 'password123')
        await user.type(confirmPasswordInput, 'password123')
        await user.click(submitButton)

        await waitFor(() => {
            expect(register).toHaveBeenCalledWith('John Doe', 'john@example.com', 'password123')
            expect(mockPush).toHaveBeenCalledWith('/login')
        })
    })

    it('shows error message when email already exists', async () => {
        const user = userEvent.setup()
        const mockRegisterResponse = { success: false, error: 'Email already registered.' }
            ; (register as jest.Mock).mockResolvedValue(mockRegisterResponse)

        render(<RegisterForm />)

        const nameInput = screen.getByPlaceholderText('Full Name')
        const emailInput = screen.getByPlaceholderText('Email Address')
        const passwordInput = screen.getByPlaceholderText('Password')
        const confirmPasswordInput = screen.getByPlaceholderText('Confirm Password')
        const submitButton = screen.getByRole('button', { name: /sign up/i })

        await user.type(nameInput, 'Jane Doe')
        await user.type(emailInput, 'existing@example.com')
        await user.type(passwordInput, 'password123')
        await user.type(confirmPasswordInput, 'password123')
        await user.click(submitButton)

        await waitFor(() => {
            expect(screen.getByText('Email already registered.')).toBeInTheDocument()
        })
    })

    it('shows loading state while submitting', async () => {
        const user = userEvent.setup()
        let resolveRegister: any
        const registerPromise = new Promise((resolve) => {
            resolveRegister = resolve
        })
            ; (register as jest.Mock).mockReturnValue(registerPromise)

        render(<RegisterForm />)

        const nameInput = screen.getByPlaceholderText('Full Name')
        const emailInput = screen.getByPlaceholderText('Email Address')
        const passwordInput = screen.getByPlaceholderText('Password')
        const confirmPasswordInput = screen.getByPlaceholderText('Confirm Password')
        const submitButton = screen.getByRole('button', { name: /sign up/i })

        await user.type(nameInput, 'John Doe')
        await user.type(emailInput, 'john@example.com')
        await user.type(passwordInput, 'password123')
        await user.type(confirmPasswordInput, 'password123')
        await user.click(submitButton)

        // Check loading state
        await waitFor(() => {
            expect(screen.getByText('CREATING ACCOUNT...')).toBeInTheDocument()
        })

        // Resolve the promise
        resolveRegister({ success: true })

        // Wait for loading to finish
        await waitFor(() => {
            expect(screen.queryByText('CREATING ACCOUNT...')).not.toBeInTheDocument()
        })
    })

    it('shows generic error on network failure', async () => {
        const user = userEvent.setup()
            ; (register as jest.Mock).mockRejectedValue(new Error('Network error'))

        render(<RegisterForm />)

        const nameInput = screen.getByPlaceholderText('Full Name')
        const emailInput = screen.getByPlaceholderText('Email Address')
        const passwordInput = screen.getByPlaceholderText('Password')
        const confirmPasswordInput = screen.getByPlaceholderText('Confirm Password')
        const submitButton = screen.getByRole('button', { name: /sign up/i })

        await user.type(nameInput, 'John Doe')
        await user.type(emailInput, 'john@example.com')
        await user.type(passwordInput, 'password123')
        await user.type(confirmPasswordInput, 'password123')
        await user.click(submitButton)

        await waitFor(() => {
            expect(screen.getByText('An error occurred during registration')).toBeInTheDocument()
        })
    })

    it('has minimum name length requirement', () => {
        render(<RegisterForm />)

        const nameInput = screen.getByPlaceholderText('Full Name') as HTMLInputElement

        // Check that minLength attribute is set
        expect(nameInput).toHaveAttribute('minLength', '2')
        expect(nameInput).toBeRequired()
    })

    it('has minimum password length requirement', () => {
        render(<RegisterForm />)

        const passwordInput = screen.getByPlaceholderText('Password') as HTMLInputElement

        // Check that minLength attribute is set
        expect(passwordInput).toHaveAttribute('minLength', '6')
        expect(passwordInput).toBeRequired()
    })

    it('renders login link', () => {
        render(<RegisterForm />)

        const loginLink = screen.getByText('Login')
        expect(loginLink).toBeInTheDocument()
        expect(loginLink.closest('a')).toHaveAttribute('href', '/login')
    })
})
