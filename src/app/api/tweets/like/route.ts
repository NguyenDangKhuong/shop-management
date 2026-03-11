import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/utils/connectDb'
import TwitterTokenModel from '@/models/TwitterToken'

/**
 * Like / Unlike API
 *
 * Endpoints:
 *   POST   /api/tweets/like  → FavoriteTweet (like a tweet)
 *   DELETE /api/tweets/like  → UnfavoriteTweet (unlike a tweet)
 *
 * Request body: { tweetId: string }
 *
 * How it works:
 *   1. Read auth credentials (cookie, CSRF token, bearer) from MongoDB
 *   2. Call X's internal GraphQL mutation (FavoriteTweet or UnfavoriteTweet)
 *   3. X may return empty body on success → we safely parse with res.text()
 *
 * Query IDs:
 *   GraphQL operation hashes from x.com's web client.
 *   To find updated IDs: DevTools → Network → filter "FavoriteTweet" → copy queryId
 */

const DEFAULT_BEARER = process.env.TWITTER_DEFAULT_BEARER || ''

// GraphQL mutation IDs — sniffed from x.com DevTools
const FAVORITE_QID = 'lI07N6Otwv1PhnEgXILM7A'
const UNFAVORITE_QID = 'ZYKSe-w7KEslx3JhSIk5LA'

/**
 * Fetch auth credentials from MongoDB.
 * Returns cookie string, CSRF token, and bearer token.
 */
async function getCredentials() {
    try {
        await connectDB()
        const token = await TwitterTokenModel.findOne().sort({ createdAt: -1 })
        if (token) {
            let cookie = ''
            let csrfToken = ''
            // Prefer full cookie string if available
            if (token.cookie) {
                cookie = token.cookie
                const ct0Match = cookie.match(/ct0=([^;]+)/)
                csrfToken = ct0Match?.[1] || token.ct0 || ''
            } else if (token.authToken && token.ct0) {
                // Build minimal cookie from individual fields
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

/**
 * Build request headers mimicking x.com's web client.
 */
function makeHeaders(creds: { cookie: string; csrfToken: string; bearerToken: string }) {
    return {
        'authorization': creds.bearerToken,
        'x-csrf-token': creds.csrfToken,
        'cookie': creds.cookie,
        'x-twitter-active-user': 'yes',
        'x-twitter-auth-type': 'OAuth2Session',
        'content-type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36',
    }
}

/**
 * POST — FavoriteTweet (like)
 *
 * Variables: { tweet_id: string }
 * Possible X responses:
 *   200 → success (returns { data: { favorite_tweet: "Done" } })
 *   403 → already liked (we treat as success)
 *   429 → rate limited
 */
export async function POST(request: NextRequest) {
    try {
        const { tweetId } = await request.json()
        if (!tweetId) return NextResponse.json({ error: 'tweetId required' }, { status: 400 })

        const creds = await getCredentials()
        if (!creds) return NextResponse.json({ error: 'No Twitter credentials' }, { status: 500 })

        const res = await fetch(`https://x.com/i/api/graphql/${FAVORITE_QID}/FavoriteTweet`, {
            method: 'POST',
            headers: makeHeaders(creds),
            body: JSON.stringify({
                variables: { tweet_id: tweetId },
                queryId: FAVORITE_QID,
            }),
        })

        // X may return empty body on success → safely parse
        const text = await res.text()
        const data = text ? JSON.parse(text) : null
        console.log(`Like ${tweetId}: ${res.status}`, data ? JSON.stringify(data).slice(0, 200) : '(empty)')

        if (!res.ok) {
            const msg = data?.errors?.[0]?.message || ''
            // 403 = already liked → treat as success (idempotent)
            if (res.status === 403 || msg.includes('already favorited')) {
                return NextResponse.json({ success: true, data: { alreadyLiked: true } })
            }
            return NextResponse.json({ error: msg || `Twitter returned ${res.status}` }, { status: res.status })
        }

        return NextResponse.json({ success: true, data })
    } catch (err) {
        console.error('Like error:', err)
        return NextResponse.json({ error: 'Failed to like' }, { status: 500 })
    }
}

/**
 * DELETE — UnfavoriteTweet (unlike)
 *
 * Variables: { tweet_id: string }
 * Note: unlike repost, unfavorite uses tweet_id (not source_tweet_id)
 */
export async function DELETE(request: NextRequest) {
    try {
        const { tweetId } = await request.json()
        if (!tweetId) return NextResponse.json({ error: 'tweetId required' }, { status: 400 })

        const creds = await getCredentials()
        if (!creds) return NextResponse.json({ error: 'No Twitter credentials' }, { status: 500 })

        const res = await fetch(`https://x.com/i/api/graphql/${UNFAVORITE_QID}/UnfavoriteTweet`, {
            method: 'POST', // GraphQL mutations always use POST
            headers: makeHeaders(creds),
            body: JSON.stringify({
                variables: { tweet_id: tweetId },
                queryId: UNFAVORITE_QID,
            }),
        })

        // Safe parse — X may return empty body
        const text = await res.text()
        const data = text ? JSON.parse(text) : null

        if (!res.ok) return NextResponse.json({ error: data?.errors?.[0]?.message || `Twitter returned ${res.status}` }, { status: res.status })
        return NextResponse.json({ success: true, data })
    } catch (err) {
        console.error('Unlike error:', err)
        return NextResponse.json({ error: 'Failed to unlike' }, { status: 500 })
    }
}
