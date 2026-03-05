import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/utils/connectDb'
import TwitterTokenModel from '@/models/TwitterToken'

// GET - Get current token
export async function GET() {
    try {
        await connectDB()
        const token = await TwitterTokenModel.findOne().sort({ createdAt: -1 })
        if (!token) {
            return NextResponse.json({ success: true, data: null })
        }
        // Mask sensitive values for display
        return NextResponse.json({
            success: true,
            data: {
                _id: token._id,
                authToken: token.authToken.slice(0, 6) + '...',
                ct0: token.ct0.slice(0, 6) + '...',
                att: token.att ? token.att.slice(0, 6) + '...' : null,
                updatedAt: token.updatedAt,
            }
        })
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknown error'
        return NextResponse.json({ success: false, error: message }, { status: 500 })
    }
}

// POST - Save/update token (parses cookie text to extract auth_token and ct0)
export async function POST(request: NextRequest) {
    try {
        await connectDB()
        const body = await request.json()
        const { cookieText, bearerToken, userTweetsQueryId, userByScreenNameQueryId, homeTimelineQueryId, homeLatestTimelineQueryId } = body

        if (!cookieText || typeof cookieText !== 'string') {
            return NextResponse.json({ success: false, error: 'Cookie text is required' }, { status: 400 })
        }

        // Parse various formats:
        // "auth_token: xxx\nct0: yyy" or "auth_token=xxx; ct0=yyy" or mixed
        const text = cookieText.trim()

        let authToken = ''
        let ct0 = ''
        let att = ''

        // Try key: value format (from browser devtools)
        const authMatch = text.match(/auth_token[:\s=]+([^\s;,\n]+)/i)
        const ct0Match = text.match(/ct0[:\s=]+([^\s;,\n]+)/i)
        const attMatch = text.match(/att[:\s=]+([^\s;,\n]+)/i)

        if (authMatch) authToken = authMatch[1].trim()
        if (ct0Match) ct0 = ct0Match[1].trim()
        if (attMatch) att = attMatch[1].trim()

        if (!authToken || !ct0) {
            return NextResponse.json({
                success: false,
                error: 'Không tìm thấy auth_token hoặc ct0. Paste lại cookie từ DevTools.'
            }, { status: 400 })
        }

        // Use full cookie string if it looks like a full cookie, otherwise build minimal
        const cookie = text.includes(';') && text.includes('=')
            ? text  // Full cookie string — keep as-is
            : `auth_token=${authToken}; ct0=${ct0}${att ? `; att=${att}` : ''}`

        // Delete old tokens, keep only latest
        await TwitterTokenModel.deleteMany({})

        const newToken = await TwitterTokenModel.create({
            authToken,
            ct0,
            att: att || undefined,
            cookie,
            bearerToken: bearerToken || undefined,
            userTweetsQueryId: userTweetsQueryId || undefined,
            userByScreenNameQueryId: userByScreenNameQueryId || undefined,
            homeTimelineQueryId: homeTimelineQueryId || undefined,
            homeLatestTimelineQueryId: homeLatestTimelineQueryId || undefined,
        })

        return NextResponse.json({
            success: true,
            data: {
                _id: newToken._id,
                authToken: authToken.slice(0, 6) + '...',
                ct0: ct0.slice(0, 6) + '...',
                att: att ? att.slice(0, 6) + '...' : null,
                bearerToken: bearerToken ? 'saved' : null,
                queryIds: {
                    userTweets: userTweetsQueryId || null,
                    userByScreenName: userByScreenNameQueryId || null,
                    homeTimeline: homeTimelineQueryId || null,
                    homeLatestTimeline: homeLatestTimelineQueryId || null,
                },
            }
        })
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknown error'
        return NextResponse.json({ success: false, error: message }, { status: 500 })
    }
}

// DELETE - Remove token
export async function DELETE() {
    try {
        await connectDB()
        await TwitterTokenModel.deleteMany({})
        return NextResponse.json({ success: true, message: 'Token deleted' })
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknown error'
        return NextResponse.json({ success: false, error: message }, { status: 500 })
    }
}
