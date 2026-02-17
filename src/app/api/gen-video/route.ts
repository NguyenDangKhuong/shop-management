import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/utils/connectDb'
import Veo3TokenModel from '@/models/Veo3Token'

const VEO3_API_URL = 'https://aisandbox-pa.googleapis.com/v1/video:batchAsyncGenerateVideoText'
const WS_BRIDGE_URL = process.env.WS_BRIDGE_URL || 'http://localhost:3002'

// POST /api/gen-video
// Body: {
//   prompt: string (required)
//   aspectRatio?: string (default: VIDEO_ASPECT_RATIO_LANDSCAPE)
//   seed?: number (optional — random if not provided)
//   referenceImages?: Array<{imageUsageType, mediaId}>
// }
// All other params (bearerToken, recaptchaToken, sessionId, projectId)
// are auto-fetched from WS bridge → DB fallback
export async function POST(request: NextRequest) {
    try {
        await connectDB()
        const body = await request.json()

        const {
            prompt,
            aspectRatio = 'VIDEO_ASPECT_RATIO_LANDSCAPE',
            referenceImages,
            seed
        } = body

        if (!prompt) {
            return NextResponse.json({
                success: false,
                error: 'Missing required field: prompt'
            }, { status: 400 })
        }

        // ===== 1. Get Bearer token (ya29) + sessionId + projectId from WS bridge =====
        let bearerToken = ''
        let sessionId = ''
        let projectId = ''
        let tokenSource = ''

        try {
            const wsResp = await fetch(`${WS_BRIDGE_URL}/token/fresh`, {
                signal: AbortSignal.timeout(12000)
            })
            if (wsResp.ok) {
                const wsData = await wsResp.json()
                if (wsData.token) {
                    bearerToken = wsData.token
                    sessionId = wsData.sessionId || ''
                    projectId = wsData.projectId || ''
                    tokenSource = `ws-bridge (${wsData.age}s old)`
                    console.log(`🌉 ya29 from WS bridge: ${wsData.age}s old`)
                }
            }
        } catch (wsErr: any) {
            console.log(`🌉 WS bridge unavailable: ${wsErr.message}, falling back to DB`)
        }

        // DB fallback
        if (!bearerToken) {
            const tokenDoc = await Veo3TokenModel.findOne().sort({ updatedAt: -1 })
            if (!tokenDoc || !tokenDoc.value) {
                return NextResponse.json({
                    success: false,
                    error: 'No ya29 token available. Start WS bridge + extension.'
                }, { status: 400 })
            }
            bearerToken = tokenDoc.value
            sessionId = tokenDoc.sessionId || ''
            projectId = tokenDoc.projectId || ''
            tokenSource = 'db'
            console.log('💾 ya29 from DB (fallback)')
        }

        // ===== 2. Get reCAPTCHA token from WS bridge (on-demand) =====
        let recaptchaToken = ''
        let recaptchaSource = ''

        try {
            const wsResp = await fetch(`${WS_BRIDGE_URL}/recaptcha/fresh`, {
                signal: AbortSignal.timeout(16000)
            })
            if (wsResp.ok) {
                const wsData = await wsResp.json()
                if (wsData.token) {
                    recaptchaToken = wsData.token
                    recaptchaSource = `ws-bridge (${wsData.source})`
                    console.log(`🛡️ reCAPTCHA from WS bridge`)
                }
            }
        } catch (wsErr: any) {
            console.log(`🛡️ WS bridge reCAPTCHA unavailable: ${wsErr.message}`)
        }

        if (!recaptchaToken) {
            return NextResponse.json({
                success: false,
                error: 'No reCAPTCHA token available. Ensure WS bridge + extension are running with Flow page open.'
            }, { status: 400 })
        }

        // ===== 3. Build Veo3 API request =====
        const sceneId = crypto.randomUUID()
        const requestSeed = seed || Math.floor(Math.random() * 100000)
        const isPortrait = aspectRatio === 'VIDEO_ASPECT_RATIO_PORTRAIT'
        const videoModelKey = isPortrait ? 'veo_3_1_t2v_fast_portrait' : 'veo_3_1_t2v_fast_landscape'

        const veo3RequestBody: any = {
            clientContext: {
                recaptchaContext: {
                    token: recaptchaToken,
                    applicationType: 'RECAPTCHA_APPLICATION_TYPE_WEB'
                },
                sessionId: sessionId || `;${Date.now()}`,
                projectId: projectId || '',
                tool: 'PINHOLE',
                userPaygateTier: 'PAYGATE_TIER_NOT_PAID'
            },
            requests: [{
                aspectRatio,
                seed: requestSeed,
                textInput: { prompt },
                videoModelKey,
                metadata: { sceneId }
            }]
        }

        if (referenceImages && Array.isArray(referenceImages) && referenceImages.length > 0) {
            veo3RequestBody.requests[0].referenceImages = referenceImages
        }

        console.log('🎬 Gen Video:', {
            prompt: prompt.substring(0, 80) + '...',
            tokenSource,
            recaptchaSource,
            videoModelKey,
            projectId: projectId || '(none)'
        })

        // ===== 4. Call Veo3 API =====
        const response = await fetch(VEO3_API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${bearerToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(veo3RequestBody)
        })

        const responseData = await response.json()

        if (!response.ok) {
            console.error('🎬 Veo3 API error:', JSON.stringify(responseData, null, 2))
            return NextResponse.json({
                success: false,
                error: `Veo3 API error (${response.status})`,
                details: responseData
            }, { status: response.status })
        }

        console.log('🎬 Gen Video: Success!')

        return NextResponse.json({
            success: true,
            data: responseData,
            meta: { tokenSource, recaptchaSource, videoModelKey, projectId }
        })
    } catch (error: any) {
        console.error('❌ Gen Video Error:', error)
        return NextResponse.json({
            success: false,
            error: error.message
        }, { status: 500 })
    }
}

// GET /api/gen-video — Check readiness (WS bridge status)
export async function GET() {
    try {
        const wsStatus = await fetch(`${WS_BRIDGE_URL}/status`, {
            signal: AbortSignal.timeout(3000)
        }).then(r => r.json()).catch(() => null)

        return NextResponse.json({
            success: true,
            ready: !!(wsStatus?.extensionConnected && wsStatus?.hasToken),
            bridge: {
                connected: wsStatus?.extensionConnected || false,
                hasToken: wsStatus?.hasToken || false,
                tokenAge: wsStatus?.tokenAge || null,
                projectId: wsStatus?.projectId || null,
                sessionId: wsStatus?.sessionId || null
            }
        })
    } catch (error: any) {
        return NextResponse.json({
            success: false,
            error: error.message
        }, { status: 500 })
    }
}
