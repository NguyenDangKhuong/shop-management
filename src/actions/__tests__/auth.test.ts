import bcrypt from 'bcryptjs'

// Mock next-auth to prevent ESM import issues
jest.mock('next-auth', () => ({
    AuthError: class AuthError extends Error {
        type: string
        constructor(type: string) {
            super(type)
            this.type = type
        }
    },
}))

// Mock auth module
jest.mock('../../../auth', () => ({
    signIn: jest.fn(),
    signOut: jest.fn(),
}))

jest.mock('@/models/User', () => ({
    __esModule: true,
    default: {
        findOne: jest.fn(),
        create: jest.fn(),
    },
}))

import { authenticate, register, logout } from '@/actions/auth'
import { signIn, signOut } from '../../../auth'
import UserModel from '@/models/User'

describe('Auth Actions', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    describe('authenticate', () => {
        it('returns success with role on valid login', async () => {
            const mockSignIn = signIn as jest.Mock
            const mockFindOne = UserModel.findOne as jest.Mock

            mockSignIn.mockResolvedValue(undefined)
            mockFindOne.mockReturnValue({
                lean: () => ({ _id: 'user-1', role: 0 })
            })

            const result = await authenticate('admin@test.com', 'password123')

            expect(mockSignIn).toHaveBeenCalledWith('credentials', {
                email: 'admin@test.com',
                password: 'password123',
                redirect: false,
            })
            expect(result).toEqual({ success: true, role: 0 })
        })

        it('returns default role 1 when user not found after login', async () => {
            const mockSignIn = signIn as jest.Mock
            const mockFindOne = UserModel.findOne as jest.Mock

            mockSignIn.mockResolvedValue(undefined)
            mockFindOne.mockReturnValue({ lean: () => null })

            const result = await authenticate('user@test.com', 'password123')

            expect(result).toEqual({ success: true, role: 1 })
        })

        it('returns error on CredentialsSignin', async () => {
            const { AuthError } = require('next-auth')
            const credError = new AuthError('CredentialsSignin')
            const mockSignIn = signIn as jest.Mock
            mockSignIn.mockRejectedValue(credError)

            const result = await authenticate('wrong@test.com', 'wrongpass')

            expect(result.success).toBe(false)
            expect(result.error).toBe('Invalid credentials.')
        })

        it('returns generic error on unknown error', async () => {
            const mockSignIn = signIn as jest.Mock
            mockSignIn.mockRejectedValue(new Error('Network error'))

            const result = await authenticate('test@test.com', 'password')

            expect(result).toEqual({ success: false, error: 'Authentication failed.' })
        })
    })

    describe('register', () => {
        it('creates user with bcrypt hashed password', async () => {
            const mockFindOne = UserModel.findOne as jest.Mock
            const mockCreate = UserModel.create as jest.Mock

            mockFindOne.mockReturnValue({ lean: () => null })
            mockCreate.mockResolvedValue({})

            const result = await register('Test User', 'test@test.com', 'password123')

            expect(result).toEqual({ success: true })
            expect(mockCreate).toHaveBeenCalledTimes(1)

            // Verify password was hashed
            const createCall = mockCreate.mock.calls[0][0]
            expect(createCall.name).toBe('Test User')
            expect(createCall.email).toBe('test@test.com')
            expect(createCall.role).toBe(1)
            // Password should be bcrypt hash, not plain text
            expect(createCall.password).not.toBe('password123')
            expect(createCall.password.startsWith('$2a$') || createCall.password.startsWith('$2b$')).toBe(true)
            // Verify the hash matches the original password
            expect(bcrypt.compareSync('password123', createCall.password)).toBe(true)
        })

        it('returns error when email already exists', async () => {
            const mockFindOne = UserModel.findOne as jest.Mock
            mockFindOne.mockReturnValue({ lean: () => ({ _id: 'existing-user' }) })

            const result = await register('Test', 'existing@test.com', 'password123')

            expect(result).toEqual({ success: false, error: 'Email already registered.' })
            expect(UserModel.create).not.toHaveBeenCalled()
        })

        it('returns error on database failure', async () => {
            const mockFindOne = UserModel.findOne as jest.Mock
            const mockCreate = UserModel.create as jest.Mock

            mockFindOne.mockReturnValue({ lean: () => null })
            mockCreate.mockRejectedValue(new Error('DB error'))

            const result = await register('Test', 'test@test.com', 'password123')

            expect(result).toEqual({ success: false, error: 'Registration failed.' })
        })

        it('creates user with role 1 (regular user)', async () => {
            const mockFindOne = UserModel.findOne as jest.Mock
            const mockCreate = UserModel.create as jest.Mock

            mockFindOne.mockReturnValue({ lean: () => null })
            mockCreate.mockResolvedValue({})

            await register('Test', 'test@test.com', 'password123')

            const createCall = mockCreate.mock.calls[0][0]
            expect(createCall.role).toBe(1)
        })
    })

    describe('logout', () => {
        it('calls signOut with redirect to /', async () => {
            const mockSignOut = signOut as jest.Mock
            mockSignOut.mockResolvedValue(undefined)

            await logout()

            expect(mockSignOut).toHaveBeenCalledWith({ redirectTo: '/' })
        })
    })
})
