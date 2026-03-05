import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/utils/connectDb'
import TwitterTokenModel from '@/models/TwitterToken'

/**
 * Repost (Retweet) / Unrepost API
 *
 * Endpoints:
 *   POST   /api/tweets/repost  → CreateRetweet (repost a tweet)
 *   DELETE /api/tweets/repost  → DeleteRetweet (undo repost)
 *
 * Request body: { tweetId: string }
 *
 * How it works:
 *   1. Read auth credentials (cookie, CSRF token, bearer) from MongoDB
 *   2. Call X's internal GraphQL mutation (CreateRetweet or DeleteRetweet)
 *   3. X may return empty body on success → we safely parse with res.text()
 *   4. If X returns 403 "already retweeted" → treat as success (idempotent)
 *
 * Query IDs:
 *   These are GraphQL operation hashes used by x.com's web client.
 *   They can change when X deploys new versions.
 *   To find updated IDs: DevTools → Network → filter "CreateRetweet" → copy queryId from URL
 */

const DEFAULT_BEARER = 'Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA'

// GraphQL mutation IDs — sniffed from x.com DevTools
const CREATE_RETWEET_QID = 'ojPdsZsimiJrUGLR1sjUtA'
const DELETE_RETWEET_QID = 'iQtK4dl5hBmXewYZuEOKVw'

/**
 * Fetch auth credentials from MongoDB.
 * Returns cookie string, CSRF token, and bearer token.
 * Falls back to DEFAULT_BEARER if bearerToken not stored in DB.
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
                return {
                    cookie, csrfToken,
                    bearerToken: token.bearerToken || DEFAULT_BEARER,
                }
            }
        }
    } catch {
        console.error('Failed to get credentials from DB')
    }
    return null
}

/**
 * Build request headers for X's GraphQL API.
 * Mimics a real browser request to avoid detection.
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
 * POST — CreateRetweet
 *
 * Calls X's CreateRetweet GraphQL mutation.
 * Variables: { tweet_id: string, dark_request: false }
 *
 * Possible responses from X:
 *   200 + body  → success, returns retweet data
 *   200 + empty → success (some clients get empty response)
 *   403         → already retweeted (we treat as success for idempotency)
 *   404         → tweet not found OR queryId has changed
 *   429         → rate limited
 */
export async function POST(request: NextRequest) {
    try {
        const { tweetId } = await request.json()
        if (!tweetId) {
            return NextResponse.json({ error: 'tweetId required' }, { status: 400 })
        }

        const creds = await getCredentials()
        if (!creds) {
            return NextResponse.json({ error: 'No Twitter credentials' }, { status: 500 })
        }

        const res = await fetch(`https://x.com/i/api/graphql/${CREATE_RETWEET_QID}/CreateRetweet`, {
            method: 'POST',
            headers: makeHeaders(creds),
            body: JSON.stringify({
                variables: { tweet_id: tweetId, dark_request: false },
                queryId: CREATE_RETWEET_QID,
            }),
        })

        // X may return empty body on success → safely parse
        const text = await res.text()
        const data = text ? JSON.parse(text) : null
        console.log(`Repost ${tweetId}: ${res.status}`, data ? JSON.stringify(data).slice(0, 200) : '(empty)')

        // Check for "already retweeted" error — X may return this with HTTP 200 OR 403
        const errMsg = data?.errors?.[0]?.message || ''
        const errCode = data?.errors?.[0]?.code
        if (errCode === 327 || errMsg.includes('already retweeted')) {
            return NextResponse.json({ success: true, data: { alreadyReposted: true } })
        }

        if (!res.ok) {
            // 404 often means queryId has changed — include helpful debug info
            if (res.status === 404) {
                console.error(`Repost 404 — queryId "${CREATE_RETWEET_QID}" may be outdated. Check DevTools → Network → CreateRetweet`)
            }
            return NextResponse.json({ error: errMsg || `Twitter returned ${res.status}` }, { status: res.status })
        }

        return NextResponse.json({ success: true, data })
    } catch (err) {
        console.error('Repost error:', err)
        return NextResponse.json({ error: 'Failed to repost' }, { status: 500 })
    }
}

/**
 * DELETE — DeleteRetweet (undo repost)
 *
 * Calls X's DeleteRetweet GraphQL mutation.
 * Variables: { source_tweet_id: string, dark_request: false }
 * Note: uses source_tweet_id (not tweet_id) — this is the original tweet's ID
 */
export async function DELETE(request: NextRequest) {
    try {
        const { tweetId } = await request.json()
        if (!tweetId) {
            return NextResponse.json({ error: 'tweetId required' }, { status: 400 })
        }

        const creds = await getCredentials()
        if (!creds) {
            return NextResponse.json({ error: 'No Twitter credentials' }, { status: 500 })
        }

        const res = await fetch(`https://x.com/i/api/graphql/${DELETE_RETWEET_QID}/DeleteRetweet`, {
            method: 'POST', // GraphQL mutations always use POST even for "delete" operations
            headers: makeHeaders(creds),
            body: JSON.stringify({
                variables: { source_tweet_id: tweetId, dark_request: false },
                queryId: DELETE_RETWEET_QID,
            }),
        })

        // Safe parse — X may return empty body
        const text = await res.text()
        const data = text ? JSON.parse(text) : null

        if (!res.ok) {
            return NextResponse.json({ error: data?.errors?.[0]?.message || `Twitter returned ${res.status}` }, { status: res.status })
        }

        return NextResponse.json({ success: true, data })
    } catch (err) {
        console.error('Unrepost error:', err)
        return NextResponse.json({ error: 'Failed to unrepost' }, { status: 500 })
    }
}
