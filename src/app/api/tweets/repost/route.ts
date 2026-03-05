import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/utils/connectDb'
import TwitterTokenModel from '@/models/TwitterToken'

/**
 * Repost (Retweet) API
 *
 * POST /api/tweets/repost  { tweetId: string }
 * DELETE /api/tweets/repost { tweetId: string }  (unretweet)
 */

const DEFAULT_BEARER = 'Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA'

// Known mutation IDs for retweet/unretweet
const CREATE_RETWEET_QID = 'ojPdsZsimiJrUGLR1sjUtA'
const DELETE_RETWEET_QID = 'iQtK4dl5hBmXewYZuEOKVw'

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

// POST — Retweet
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
            headers: {
                'authorization': creds.bearerToken,
                'x-csrf-token': creds.csrfToken,
                'cookie': creds.cookie,
                'x-twitter-active-user': 'yes',
                'x-twitter-auth-type': 'OAuth2Session',
                'content-type': 'application/json',
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36',
            },
            body: JSON.stringify({
                variables: { tweet_id: tweetId, dark_request: false },
                queryId: CREATE_RETWEET_QID,
            }),
        })

        const data = await res.json()

        if (!res.ok) {
            return NextResponse.json({ error: data?.errors?.[0]?.message || `Twitter returned ${res.status}` }, { status: res.status })
        }

        return NextResponse.json({ success: true, data })
    } catch (err) {
        console.error('Repost error:', err)
        return NextResponse.json({ error: 'Failed to repost' }, { status: 500 })
    }
}

// DELETE — Unretweet
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
            method: 'POST',
            headers: {
                'authorization': creds.bearerToken,
                'x-csrf-token': creds.csrfToken,
                'cookie': creds.cookie,
                'x-twitter-active-user': 'yes',
                'x-twitter-auth-type': 'OAuth2Session',
                'content-type': 'application/json',
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36',
            },
            body: JSON.stringify({
                variables: { source_tweet_id: tweetId, dark_request: false },
                queryId: DELETE_RETWEET_QID,
            }),
        })

        const data = await res.json()

        if (!res.ok) {
            return NextResponse.json({ error: data?.errors?.[0]?.message || `Twitter returned ${res.status}` }, { status: res.status })
        }

        return NextResponse.json({ success: true, data })
    } catch (err) {
        console.error('Unrepost error:', err)
        return NextResponse.json({ error: 'Failed to unrepost' }, { status: 500 })
    }
}
