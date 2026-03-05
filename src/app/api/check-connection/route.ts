import { NextResponse } from 'next/server'
import connectDB from '@/utils/connectDb'

/**
 * Health check endpoint — verifies MongoDB connection is alive.
 * Used by carts page to auto-reload if connection drops.
 *
 * GET /api/check-connection → { connected: boolean, success: boolean }
 */
export async function GET() {
    try {
        await connectDB()
        return NextResponse.json({ connected: true, success: true })
    } catch {
        return NextResponse.json({ connected: false, success: false })
    }
}
