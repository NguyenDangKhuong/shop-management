'use server'

import { signIn, signOut } from '../../auth'
import UserModel, { User } from '@/models/User'
import { AuthError } from 'next-auth'

interface LoginResult {
    success: boolean
    error?: string
    role?: number
}

interface RegisterResult {
    success: boolean
    error?: string
}

export async function authenticate(email: string, password: string): Promise<LoginResult> {
    try {
        const result = await signIn('credentials', {
            email,
            password,
            redirect: false
        })

        // Get user to check role
        const user = await UserModel.findOne({ email }).lean() as User | null

        return {
            success: true,
            role: user?.role ?? 1
        }
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return { success: false, error: 'Invalid credentials.' }
                default:
                    return { success: false, error: 'Something went wrong.' }
            }
        }
        return { success: false, error: 'Authentication failed.' }
    }
}

export async function register(name: string, email: string, password: string): Promise<RegisterResult> {
    try {
        // Check if user already exists
        const existingUser = await UserModel.findOne({ email }).lean()
        if (existingUser) {
            return { success: false, error: 'Email already registered.' }
        }

        // Create new user with role=1 (regular user), role=0 is admin
        await UserModel.create({
            name,
            email,
            password, // In production, hash this with bcrypt!
            role: 1
        })

        return { success: true }
    } catch (error) {
        console.error('Registration error:', error)
        return { success: false, error: 'Registration failed.' }
    }
}

export async function logout() {
    await signOut({ redirectTo: '/' })
}
