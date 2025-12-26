import { validateRegisterInput } from '@/utils/validateRegisterInput'
import { User } from '@/models/User'

describe('validateRegisterInput', () => {
    it('returns null for valid input', () => {
        const validInput = {
            name: 'John Doe',
            email: 'john@example.com',
            password: 'password123'
        } as User

        const result = validateRegisterInput(validInput)
        expect(result).toBeNull()
    })

    it('returns error for invalid email format', () => {
        const invalidInput = {
            name: 'John Doe',
            email: 'invalidemail',
            password: 'password123'
        } as User

        const result = validateRegisterInput(invalidInput)
        expect(result).not.toBeNull()
        expect(result?.message).toBe('Email không đúng định dạng')
        expect(result?.errors[0].field).toBe('email')
    })

    it('returns error for name too short', () => {
        const invalidInput = {
            name: 'JD',
            email: 'john@example.com',
            password: 'password123'
        } as User

        const result = validateRegisterInput(invalidInput)
        expect(result).not.toBeNull()
        expect(result?.message).toBe('Tên không đúng')
        expect(result?.errors[0].field).toBe('username')
        expect(result?.errors[0].message).toContain('trên 2 kí tự')
    })

    it('returns error for name with special characters', () => {
        const invalidInput = {
            name: 'John@Doe!',
            email: 'john@example.com',
            password: 'password123'
        } as User

        const result = validateRegisterInput(invalidInput)
        expect(result).not.toBeNull()
        expect(result?.message).toBe('Invalid username')
        expect(result?.errors[0].message).toContain('kí tự đặc biệt')
    })

    it('returns error for password too short', () => {
        const invalidInput = {
            name: 'John Doe',
            email: 'john@example.com',
            password: '12'
        } as User

        const result = validateRegisterInput(invalidInput)
        expect(result).not.toBeNull()
        expect(result?.message).toBe('Invalid password')
        expect(result?.errors[0].field).toBe('password')
        expect(result?.errors[0].message).toContain('trên 2 kí tự')
    })

    it('accepts names with spaces', () => {
        const validInput = {
            name: 'John Michael Doe',
            email: 'john@example.com',
            password: 'password123'
        } as User

        const result = validateRegisterInput(validInput)
        expect(result).toBeNull()
    })

    it('accepts long passwords', () => {
        const validInput = {
            name: 'John Doe',
            email: 'john@example.com',
            password: 'verylongpassword123456789'
        } as User

        const result = validateRegisterInput(validInput)
        expect(result).toBeNull()
    })

    it('rejects various special characters in name', () => {
        const specialChars = ['John!Doe', 'John@Doe', 'John#Doe', 'John$Doe', 'John%Doe']

        specialChars.forEach((name) => {
            const invalidInput = {
                name,
                email: 'john@example.com',
                password: 'password123'
            } as User

            const result = validateRegisterInput(invalidInput)
            expect(result).not.toBeNull()
            expect(result?.errors[0].message).toContain('kí tự đặc biệt')
        })
    })
})
