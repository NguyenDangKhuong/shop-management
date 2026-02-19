import { NextResponse } from 'next/server'
import crypto from 'crypto'
import connectDb from '@/utils/connectDb'
import UserModel from '@/models/User'
import PasswordResetTokenModel from '@/models/PasswordResetToken'
import { sendEmail } from '@/utils/sendEmail'

export async function POST(request: Request) {
    try {
        const { email } = await request.json()

        if (!email) {
            return NextResponse.json(
                { success: false, error: 'Email is required' },
                { status: 400 }
            )
        }

        await connectDb()

        // Always return success to prevent email enumeration
        const user = await UserModel.findOne({ email }).lean()
        if (!user) {
            return NextResponse.json({ success: true })
        }

        // Delete any existing tokens for this email
        await PasswordResetTokenModel.deleteMany({ email })

        // Generate token
        const rawToken = crypto.randomUUID()
        const hashedToken = crypto.createHash('sha256').update(rawToken).digest('hex')

        // Save hashed token to DB (expires in 1 hour)
        await PasswordResetTokenModel.create({
            email,
            token: hashedToken,
            expiresAt: new Date(Date.now() + 60 * 60 * 1000)
        })

        // Build reset link
        const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
        const resetLink = `${appUrl}/reset-password?token=${rawToken}&email=${encodeURIComponent(email)}`

        // Send email
        await sendEmail(
            email,
            'Reset Password - TheTapHoa',
            `
      <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 24px;">
        <h2 style="color: #333; margin-bottom: 16px;">🔐 Reset Password</h2>
        <p style="color: #555; font-size: 14px; line-height: 1.6;">
          Bạn đã yêu cầu đặt lại mật khẩu. Click nút bên dưới để tiếp tục:
        </p>
        <a href="${resetLink}" 
           style="display: inline-block; background: linear-gradient(135deg, #00e5ff, #b927fc); color: white; padding: 12px 32px; border-radius: 8px; text-decoration: none; font-weight: bold; margin: 20px 0;">
          Đặt lại mật khẩu
        </a>
        <p style="color: #999; font-size: 12px; margin-top: 20px;">
          Link này sẽ hết hạn sau 1 giờ. Nếu bạn không yêu cầu reset, hãy bỏ qua email này.
        </p>
      </div>
      `
        )

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Forgot password error:', error)
        return NextResponse.json(
            { success: false, error: 'Something went wrong' },
            { status: 500 }
        )
    }
}
