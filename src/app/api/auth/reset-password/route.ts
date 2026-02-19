import { NextResponse } from 'next/server'
import crypto from 'crypto'
import bcrypt from 'bcryptjs'
import connectDb from '@/utils/connectDb'
import UserModel from '@/models/User'
import PasswordResetTokenModel from '@/models/PasswordResetToken'

export async function POST(request: Request) {
    try {
        const { email, token, password } = await request.json()

        if (!email || !token || !password) {
            return NextResponse.json(
                { success: false, error: 'Missing required fields' },
                { status: 400 }
            )
        }

        if (password.length < 6) {
            return NextResponse.json(
                { success: false, error: 'Password must be at least 6 characters' },
                { status: 400 }
            )
        }

        await connectDb()

        // Hash the incoming token to compare with stored hash
        const hashedToken = crypto.createHash('sha256').update(token).digest('hex')

        // Find valid token
        const resetToken = await PasswordResetTokenModel.findOne({
            email,
            token: hashedToken,
            expiresAt: { $gt: new Date() }
        })

        if (!resetToken) {
            return NextResponse.json(
                { success: false, error: 'Invalid or expired token' },
                { status: 400 }
            )
        }

        // Update user password
        const hashedPassword = bcrypt.hashSync(password, 10)
        await UserModel.updateOne({ email }, { password: hashedPassword })

        // Delete used token
        await PasswordResetTokenModel.deleteMany({ email })

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Reset password error:', error)
        return NextResponse.json(
            { success: false, error: 'Something went wrong' },
            { status: 500 }
        )
    }
}
