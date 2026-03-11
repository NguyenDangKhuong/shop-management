import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/utils/connectDb'
import TwitterTokenModel from '@/models/TwitterToken'

/**
 * Follow / Unfollow API (REST v1.1)
 *
 * Endpoints:
 *   POST   /api/tweets/follow  → friendships/create.json (follow)
 *   DELETE /api/tweets/follow  → friendships/destroy.json (unfollow)
 *
 * Request body: { screenName: string }
 *
 * X uses REST v1.1 for follow/unfollow (not GraphQL).
 * Content-Type: application/x-www-form-urlencoded
 */

const DEFAULT_BEARER = process.env.TWITTER_DEFAULT_BEARER || ''

async function getCredentials() {
    try {
        await connectDB()
        const token = await TwitterTokenModel.findOne().sort({ createdAt: -1 })
        if (token) {
            let cookie = ''
            let csrfToken = ''
            if (token.cookie) {
                cookie = token.cookie
                const ct0Match = cookie.match(/ct0=([^;]+)/)
                csrfToken = ct0Match?.[1] || token.ct0 || ''
            } else if (token.authToken && token.ct0) {
                cookie = `auth_token=${token.authToken}; ct0=${token.ct0}`
                if (token.att) cookie += `; att=${token.att}`
                csrfToken = token.ct0
            }
            if (cookie) {
                return { cookie, csrfToken, bearerToken: token.bearerToken || DEFAULT_BEARER }
            }
        }
    } catch {
        console.error('Failed to get credentials from DB')
    }
    return null
}

function makeHeaders(creds: { cookie: string; csrfToken: string; bearerToken: string }) {
    return {
        'authorization': creds.bearerToken,
        'x-csrf-token': creds.csrfToken,
        'cookie': creds.cookie,
        'x-twitter-active-user': 'yes',
        'x-twitter-auth-type': 'OAuth2Session',
        'content-type': 'application/x-www-form-urlencoded',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36',
    }
}

/** POST — Follow user via REST v1.1 */
export async function POST(request: NextRequest) {
    try {
        const { screenName } = await request.json()
        if (!screenName) return NextResponse.json({ error: 'screenName required' }, { status: 400 })

        const creds = await getCredentials()
        if (!creds) return NextResponse.json({ error: 'No Twitter credentials' }, { status: 500 })

        const res = await fetch('https://x.com/i/api/1.1/friendships/create.json', {
            method: 'POST',
            headers: makeHeaders(creds),
            body: new URLSearchParams({ screen_name: screenName, skip_status: 'true' }).toString(),
        })

        const text = await res.text()
        const data = text ? JSON.parse(text) : null
        console.log(`Follow @${screenName}: ${res.status}`, data ? JSON.stringify(data).slice(0, 200) : '(empty)')

        if (!res.ok) {
            const msg = data?.errors?.[0]?.message || ''
            if (msg.includes('already')) return NextResponse.json({ success: true, data: { alreadyFollowing: true } })
            return NextResponse.json({ error: msg || `Twitter returned ${res.status}` }, { status: res.status })
        }

        return NextResponse.json({ success: true, data })
    } catch (err) {
        console.error('Follow error:', err)
        return NextResponse.json({ error: 'Failed to follow' }, { status: 500 })
    }
}

/** DELETE — Unfollow user via REST v1.1 */
export async function DELETE(request: NextRequest) {
    try {
        const { screenName } = await request.json()
        if (!screenName) return NextResponse.json({ error: 'screenName required' }, { status: 400 })

        const creds = await getCredentials()
        if (!creds) return NextResponse.json({ error: 'No Twitter credentials' }, { status: 500 })

        const res = await fetch('https://x.com/i/api/1.1/friendships/destroy.json', {
            method: 'POST',
            headers: makeHeaders(creds),
            body: new URLSearchParams({ screen_name: screenName, skip_status: 'true' }).toString(),
        })

        const text = await res.text()
        const data = text ? JSON.parse(text) : null

        if (!res.ok) return NextResponse.json({ error: data?.errors?.[0]?.message || `Twitter returned ${res.status}` }, { status: res.status })
        return NextResponse.json({ success: true, data })
    } catch (err) {
        console.error('Unfollow error:', err)
        return NextResponse.json({ error: 'Failed to unfollow' }, { status: 500 })
    }
}
