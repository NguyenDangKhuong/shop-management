import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/utils/connectDb'
import Veo3TokenModel from '@/models/Veo3Token'

const VEO3_API_URL = 'https://aisandbox-pa.googleapis.com/v1/video:batchAsyncGenerateVideoText'
const WS_BRIDGE_URL = process.env.WS_BRIDGE_URL || 'http://localhost:3002'
const MAX_RECAPTCHA_RETRIES = 3
const RETRY_DELAY_MS = 3000

// Helper: fetch fresh reCAPTCHA from WS bridge
async function fetchRecaptcha(): Promise<{ token: string; source: string } | null> {
    try {
        const wsResp = await fetch(`${WS_BRIDGE_URL}/recaptcha/fresh`, {
            signal: AbortSignal.timeout(16000)
        })
        if (wsResp.ok) {
            const wsData = await wsResp.json()
            if (wsData.token) {
                return { token: wsData.token, source: wsData.source || 'extension' }
            }
        }
    } catch (wsErr: any) {
        console.log(`🛡️ WS bridge reCAPTCHA unavailable: ${wsErr.message}`)
    }
    return null
}

// Helper: delay
const delay = (ms: number) => new Promise(r => setTimeout(r, ms))

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
            aspectRatio = 'VIDEO_ASPECT_RATIO_PORTRAIT',
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

        // DB fallback (for token, or just for sessionId/projectId if bridge has token but no project)
        if (!bearerToken || !projectId) {
            const tokenDoc = await Veo3TokenModel.findOne().sort({ updatedAt: -1 })
            if (!bearerToken) {
                if (!tokenDoc || !tokenDoc.value) {
                    return NextResponse.json({
                        success: false,
                        error: 'No ya29 token available. Start WS bridge + extension.'
                    }, { status: 400 })
                }
                bearerToken = tokenDoc.value
                tokenSource = 'db'
                console.log('💾 ya29 from DB (fallback)')
            }
            if (!sessionId && tokenDoc?.sessionId) {
                sessionId = tokenDoc.sessionId
                console.log('💾 sessionId from DB')
            }
            if (!projectId && tokenDoc?.projectId) {
                projectId = tokenDoc.projectId
                console.log('💾 projectId from DB')
            }
        }

        // ===== 2. Build base request (reCAPTCHA token filled per attempt) =====
        const sceneId = crypto.randomUUID()
        const requestSeed = seed || Math.floor(Math.random() * 100000)
        const isPortrait = aspectRatio === 'VIDEO_ASPECT_RATIO_PORTRAIT'
        const videoModelKey = isPortrait ? 'veo_3_1_t2v_fast_portrait' : 'veo_3_1_t2v_fast'

        const veo3RequestBody: any = {
            clientContext: {
                recaptchaContext: {
                    token: '', // filled per attempt
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

        // ===== 3. Call Veo3 API with reCAPTCHA retry =====
        let lastError: any = null

        for (let attempt = 1; attempt <= MAX_RECAPTCHA_RETRIES; attempt++) {
            // Get fresh reCAPTCHA token
            const recaptcha = await fetchRecaptcha()
            if (!recaptcha) {
                return NextResponse.json({
                    success: false,
                    error: 'No reCAPTCHA token available. Ensure WS bridge + extension are running with Flow page open.'
                }, { status: 400 })
            }

            veo3RequestBody.clientContext.recaptchaContext.token = recaptcha.token

            console.log(`🎬 Gen Video (attempt ${attempt}/${MAX_RECAPTCHA_RETRIES}):`, {
                prompt: prompt.substring(0, 80) + '...',
                tokenSource,
                videoModelKey,
                projectId: projectId || '(none)'
            })

            const response = await fetch(VEO3_API_URL, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${bearerToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(veo3RequestBody)
            })

            const responseData = await response.json()

            // Success!
            if (response.ok) {
                console.log(`🎬 Gen Video: Success! (attempt ${attempt})`)
                return NextResponse.json({
                    success: true,
                    data: responseData,
                    meta: { tokenSource, recaptchaSource: recaptcha.source, videoModelKey, projectId, attempt }
                })
            }

            // reCAPTCHA 403 → retry with fresh token
            const isRecaptchaError = response.status === 403 &&
                responseData?.error?.message?.includes('reCAPTCHA')

            if (isRecaptchaError && attempt < MAX_RECAPTCHA_RETRIES) {
                console.log(`🛡️ reCAPTCHA rejected (attempt ${attempt}), retrying in ${RETRY_DELAY_MS}ms...`)
                await delay(RETRY_DELAY_MS)
                continue
            }

            // Non-reCAPTCHA error or final attempt → return error
            lastError = responseData
            console.error(`🎬 Veo3 API error (attempt ${attempt}):`, JSON.stringify(responseData, null, 2))
            return NextResponse.json({
                success: false,
                error: `Veo3 API error (${response.status})`,
                details: responseData,
                attempt
            }, { status: response.status })
        }

        return NextResponse.json({
            success: false,
            error: 'Max retries reached',
            details: lastError
        }, { status: 403 })
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
