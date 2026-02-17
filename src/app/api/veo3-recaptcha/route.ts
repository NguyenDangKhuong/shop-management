import { NextResponse } from 'next/server'

const WS_BRIDGE_URL = process.env.WS_BRIDGE_URL || 'http://localhost:3002'

// GET /api/veo3-recaptcha — Get fresh reCAPTCHA token from WS bridge
export async function GET() {
    try {
        const wsResp = await fetch(`${WS_BRIDGE_URL}/recaptcha/fresh`, {
            signal: AbortSignal.timeout(16000)
        })

        if (!wsResp.ok) {
            const errData = await wsResp.json().catch(() => ({}))
            return NextResponse.json({
                success: false,
                error: errData.error || `WS bridge returned ${wsResp.status}`
            }, { status: wsResp.status })
        }

        const data = await wsResp.json()

        return NextResponse.json({
            success: true,
            token: data.token,
            source: data.source,
            timestamp: data.timestamp
        })
    } catch (err: any) {
        return NextResponse.json({
            success: false,
            error: `WS bridge unavailable: ${err.message}. Ensure ws-bridge is running.`
        }, { status: 503 })
    }
}
