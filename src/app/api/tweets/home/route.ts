import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/utils/connectDb'
import TwitterTokenModel from '@/models/TwitterToken'
import { ParsedTweet, parseTweetResult } from '../graphql/tweetParser'

/**
 * Home Timeline API — For You + Following feeds
 *
 * GET /api/tweets/home?tab=for_you|following&cursor=xxx&count=20
 *
 * How it works:
 *   1. Read credentials from MongoDB (cookie, bearer, queryIds)
 *   2. Build X's GraphQL query URL with variables (count, cursor) and features
 *   3. Parse response: extract tweets from instructions[].entries[]
 *   4. Return parsed tweets + cursor for pagination
 *
 * Tab mapping:
 *   - for_you   → HomeTimeline endpoint (algorithmic feed)
 *   - following  → HomeLatestTimeline endpoint (chronological feed)
 *
 * Caching:
 *   - DB credentials cached in-memory for 5 min (avoids hitting MongoDB per request)
 *   - Response includes Cache-Control header for CDN caching
 */

// Fallback defaults (used if not stored in DB)
const DEFAULT_BEARER = 'Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA'
const DEFAULT_QUERY_IDS = {
    for_you: 'HJFjzBgCs16TqxewQOeLNg',
    following: 'zhX91JE87mWvfprhYE97xA',
}

const ENDPOINTS = {
    for_you: 'HomeTimeline',
    following: 'HomeLatestTimeline',
}

const FEATURES = {
    rweb_tipjar_consumption_enabled: true,
    responsive_web_graphql_exclude_directive_enabled: true,
    verified_phone_label_enabled: false,
    creator_subscriptions_tweet_preview_api_enabled: true,
    responsive_web_graphql_timeline_navigation_enabled: true,
    responsive_web_graphql_skip_user_profile_image_extensions_enabled: false,
    communities_web_enable_tweet_community_results_fetch: true,
    c9s_tweet_anatomy_moderator_badge_enabled: true,
    articles_preview_enabled: true,
    responsive_web_edit_tweet_api_enabled: true,
    graphql_is_translatable_rweb_tweet_is_translatable_enabled: true,
    view_counts_everywhere_api_enabled: true,
    longform_notetweets_consumption_enabled: true,
    responsive_web_twitter_article_tweet_consumption_enabled: true,
    tweet_awards_web_tipping_enabled: false,
    freedom_of_speech_not_reach_fetch_enabled: true,
    standardized_nudges_misinfo: true,
    tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled: true,
    rweb_video_timestamps_enabled: true,
    longform_notetweets_rich_text_read_enabled: true,
    longform_notetweets_inline_media_enabled: true,
    responsive_web_enhance_cards_enabled: false,
}

// In-memory cache for credentials (avoids hitting MongoDB on every request)
// TTL: 5 minutes — credential changes (new cookie, token rotation) are infrequent
let cachedCreds: {
    cookie: string; csrfToken: string
    bearerToken: string
    queryIds: { for_you: string; following: string }
    ts: number
} | null = null
const CACHE_TTL = 5 * 60 * 1000 // 5 minutes

/**
 * Load credentials from DB with in-memory caching.
 * 
 * Priority for cookie:
 *   1. Full cookie string (token.cookie) — preferred, contains all fields
 *   2. Individual fields (authToken + ct0 + att) — fallback, builds minimal cookie
 * 
 * CSRF token is extracted from ct0 cookie value.
 * Bearer token and query IDs fall back to hardcoded defaults if not in DB.
 */
async function getCredentials() {
    // Return cached credentials if still fresh
    if (cachedCreds && Date.now() - cachedCreds.ts < CACHE_TTL) {
        return cachedCreds
    }
    try {
        await connectDB()
        const token = await TwitterTokenModel.findOne().sort({ createdAt: -1 })
        if (token) {
            let cookie = ''
            let csrfToken = ''
            if (token.cookie) {
                cookie = token.cookie
                // Extract ct0 (CSRF token) from the cookie string
                const ct0Match = cookie.match(/ct0=([^;]+)/)
                csrfToken = ct0Match?.[1] || token.ct0 || ''
            } else if (token.authToken && token.ct0) {
                // Build minimal cookie from individual fields
                cookie = `auth_token=${token.authToken}; ct0=${token.ct0}`
                if (token.att) cookie += `; att=${token.att}`
                csrfToken = token.ct0
            }
            if (cookie) {
                cachedCreds = {
                    cookie, csrfToken,
                    bearerToken: token.bearerToken || DEFAULT_BEARER,
                    queryIds: {
                        for_you: token.homeTimelineQueryId || DEFAULT_QUERY_IDS.for_you,
                        following: token.homeLatestTimelineQueryId || DEFAULT_QUERY_IDS.following,
                    },
                    ts: Date.now(),
                }
                return cachedCreds
            }
        }
    } catch {
        console.error('Failed to get credentials from DB')
    }
    return null
}

export async function GET(req: NextRequest) {
    const tab = (req.nextUrl.searchParams.get('tab') || 'for_you') as 'for_you' | 'following'
    const cursor = req.nextUrl.searchParams.get('cursor')
    const count = parseInt(req.nextUrl.searchParams.get('count') || '20')

    if (!['for_you', 'following'].includes(tab)) {
        return NextResponse.json({ error: 'tab must be for_you or following' }, { status: 400 })
    }

    const creds = await getCredentials()
    if (!creds) {
        return NextResponse.json({ error: 'No Twitter credentials configured' }, { status: 500 })
    }

    const headers: Record<string, string> = {
        'authorization': creds.bearerToken,
        'x-csrf-token': creds.csrfToken,
        'cookie': creds.cookie,
        'x-twitter-active-user': 'yes',
        'x-twitter-auth-type': 'OAuth2Session',
        'x-twitter-client-language': 'vi',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36',
    }

    try {
        const variables: Record<string, unknown> = {
            count: Math.min(count, 40),
            includePromotedContent: false,
            latestControlAvailable: true,
            requestContext: 'launch',
        }
        if (cursor) {
            variables.cursor = cursor
        }

        const queryId = creds.queryIds[tab]
        const endpoint = ENDPOINTS[tab]
        const url = `https://x.com/i/api/graphql/${queryId}/${endpoint}?variables=${encodeURIComponent(JSON.stringify(variables))}&features=${encodeURIComponent(JSON.stringify(FEATURES))}`

        const res = await fetch(url, { headers })

        if (!res.ok) {
            return NextResponse.json({ error: `Twitter returned ${res.status}` }, { status: res.status })
        }

        const data = await res.json()

        // Parse response — X returns data in instructions > entries format
        // HomeTimeline response structure:
        //   data.home.home_timeline_urt.instructions[]
        //     each instruction has entries[] with:
        //       - tweet- entries: single tweets
        //       - homeConversation- entries: conversations (thread of tweets)
        //       - cursor-bottom/cursor-top entries: pagination cursors
        const instructions = data?.data?.home?.home_timeline_urt?.instructions || []
        const tweets: ParsedTweet[] = []
        let cursorTop = ''
        let cursorBottom = ''

        for (const inst of instructions) {
            const entries = inst.entries || inst.moduleItems || []
            for (const entry of entries) {
                const entryId = entry.entryId || ''

                if (entryId.startsWith('tweet-') || entryId.startsWith('homeConversation-')) {
                    // Single tweet — extract from itemContent.tweet_results
                    const tweetResult = entry.content?.itemContent?.tweet_results?.result
                    if (tweetResult) {
                        const parsed = parseTweetResult(tweetResult)
                        if (parsed) tweets.push(parsed)
                    }
                    // Conversation module — multiple tweets nested in items[]
                    const items = entry.content?.items
                    if (items) {
                        for (const item of items) {
                            const tr = item?.item?.itemContent?.tweet_results?.result
                            if (tr) {
                                const parsed = parseTweetResult(tr)
                                if (parsed) tweets.push(parsed)
                            }
                        }
                    }
                } else if (entryId.startsWith('cursor-bottom') || entryId.includes('cursor-bottom')) {
                    // Bottom cursor — used for "load more" / infinite scroll
                    cursorBottom = entry.content?.value || ''
                } else if (entryId.startsWith('cursor-top') || entryId.includes('cursor-top')) {
                    // Top cursor — used for "check for new tweets"
                    cursorTop = entry.content?.value || ''
                }
            }
        }

        return NextResponse.json({
            success: true,
            data: {
                tweets,
                cursors: { top: cursorTop, bottom: cursorBottom },
                tab,
            },
        }, {
            headers: {
                'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
            },
        })
    } catch (err) {
        console.error('Home Timeline API error:', err)
        return NextResponse.json({ error: 'Failed to fetch home timeline' }, { status: 500 })
    }
}
