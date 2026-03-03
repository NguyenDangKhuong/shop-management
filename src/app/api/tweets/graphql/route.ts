import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/utils/connectDb'
import TwitterTokenModel from '@/models/TwitterToken'
import { ParsedTweet, parseTweetResult } from './tweetParser'

/**
 * Twitter GraphQL API Proxy — Hỗ trợ pagination
 *
 * Flow:
 *   Client → /api/tweets/graphql?username=xxx&cursor=yyy
 *   → Server lấy cookie từ DB
 *   → Gọi x.com/i/api/graphql/UserTweets (hoặc UserByScreenName)
 *   → Parse JSON → Trả về tweets + cursor cho pagination
 *
 * Không cần Twitter API key (dùng cookie của account)
 */

const GRAPHQL_QUERY_ID = 'Y9WM4Id6UcGFE8Z-hbnixw'
const BEARER_TOKEN = 'Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA'

// In-memory cache for cookie
let cachedCookie: { cookie: string; csrfToken: string; ts: number } | null = null
const COOKIE_CACHE_TTL = 5 * 60 * 1000

// In-memory cache for user IDs (username -> userId)
const userIdCache = new Map<string, string>()

// Features object required by Twitter GraphQL
const FEATURES = {
    profile_label_improvements_pcf_label_in_post_enabled: false,
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
    creator_subscriptions_quote_tweet_preview_enabled: false,
    freedom_of_speech_not_reach_fetch_enabled: true,
    standardized_nudges_misinfo: true,
    tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled: true,
    rweb_video_timestamps_enabled: true,
    longform_notetweets_rich_text_read_enabled: true,
    longform_notetweets_inline_media_enabled: true,
    responsive_web_enhance_cards_enabled: false,
}

async function getCredentials(): Promise<{ cookie: string; csrfToken: string } | null> {
    if (cachedCookie && Date.now() - cachedCookie.ts < COOKIE_CACHE_TTL) {
        return { cookie: cachedCookie.cookie, csrfToken: cachedCookie.csrfToken }
    }
    try {
        await connectDB()
        const token = await TwitterTokenModel.findOne().sort({ createdAt: -1 })
        if (token) {
            let cookie = ''
            let csrfToken = ''

            if (token.cookie) {
                // Full cookie string available
                cookie = token.cookie
                const ct0Match = cookie.match(/ct0=([^;]+)/)
                csrfToken = ct0Match?.[1] || token.ct0 || ''
            } else if (token.authToken && token.ct0) {
                // Build cookie from individual fields
                cookie = `auth_token=${token.authToken}; ct0=${token.ct0}`
                if (token.att) cookie += `; att=${token.att}`
                csrfToken = token.ct0
            }

            if (cookie) {
                cachedCookie = { cookie, csrfToken, ts: Date.now() }
                return { cookie, csrfToken }
            }
        }
    } catch {
        console.error('Failed to get credentials from DB')
    }

    // Fallback to env
    const cookie = process.env.TWITTER_COOKIE || ''
    const ct0Match = cookie.match(/ct0=([^;]+)/)
    return cookie ? { cookie, csrfToken: ct0Match?.[1] || '' } : null
}

async function getUserId(username: string, headers: Record<string, string>): Promise<string | null> {
    const cached = userIdCache.get(username.toLowerCase())
    if (cached) return cached

    try {
        const variables = JSON.stringify({ screen_name: username, withSafetyModeUserFields: true })
        const features = JSON.stringify({
            hidden_profile_subscriptions_enabled: true,
            rweb_tipjar_consumption_enabled: true,
            responsive_web_graphql_exclude_directive_enabled: true,
            verified_phone_label_enabled: false,
            highlights_tweets_tab_ui_enabled: true,
            responsive_web_twitter_article_tweet_consumption_enabled: true,
            creator_subscriptions_tweet_preview_api_enabled: true,
            responsive_web_graphql_skip_user_profile_image_extensions_enabled: false,
            responsive_web_graphql_timeline_navigation_enabled: true,
        })
        const url = `https://x.com/i/api/graphql/qW5u-DAuXpMEG0zA1F7UGQ/UserByScreenName?variables=${encodeURIComponent(variables)}&features=${encodeURIComponent(features)}`
        const res = await fetch(url, { headers })
        if (!res.ok) return null

        const data = await res.json()
        const userId = data?.data?.user?.result?.rest_id
        if (userId) {
            userIdCache.set(username.toLowerCase(), userId)
            return userId
        }
    } catch { }
    return null
}

export async function GET(req: NextRequest) {
    const username = req.nextUrl.searchParams.get('username')
    const cursor = req.nextUrl.searchParams.get('cursor')
    const count = parseInt(req.nextUrl.searchParams.get('count') || '20')

    if (!username) {
        return NextResponse.json({ error: 'username required' }, { status: 400 })
    }

    const creds = await getCredentials()
    if (!creds) {
        return NextResponse.json({ error: 'No Twitter credentials configured' }, { status: 500 })
    }

    const headers: Record<string, string> = {
        'authorization': BEARER_TOKEN,
        'x-csrf-token': creds.csrfToken,
        'cookie': creds.cookie,
        'x-twitter-active-user': 'yes',
        'x-twitter-auth-type': 'OAuth2Session',
        'x-twitter-client-language': 'en',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36',
    }

    try {
        // Step 1: Get user ID
        const userId = await getUserId(username, headers)
        if (!userId) {
            return NextResponse.json({ error: `User @${username} not found` }, { status: 404 })
        }

        // Step 2: Fetch tweets
        const variables: any = {
            userId,
            count: Math.min(count, 40),
            includePromotedContent: false,
            withQuickPromoteEligibilityTweetFields: true,
            withVoice: true,
        }
        if (cursor) {
            variables.cursor = cursor
        }

        const fieldToggles = { withArticlePlainText: false }
        const url = `https://x.com/i/api/graphql/${GRAPHQL_QUERY_ID}/UserTweets?variables=${encodeURIComponent(JSON.stringify(variables))}&features=${encodeURIComponent(JSON.stringify(FEATURES))}&fieldToggles=${encodeURIComponent(JSON.stringify(fieldToggles))}`
        const res = await fetch(url, { headers })

        if (!res.ok) {
            return NextResponse.json({ error: `Twitter returned ${res.status}` }, { status: res.status })
        }

        const data = await res.json()

        // Parse response
        const instructions = data?.data?.user?.result?.timeline?.timeline?.instructions || []
        const tweets: ParsedTweet[] = []
        let cursorTop = ''
        let cursorBottom = ''

        for (const inst of instructions) {
            if (inst.type === 'TimelineAddEntries') {
                for (const entry of inst.entries || []) {
                    const entryId = entry.entryId || ''

                    if (entryId.startsWith('tweet-')) {
                        const tweetResult = entry.content?.itemContent?.tweet_results?.result
                        if (tweetResult) {
                            const parsed = parseTweetResult(tweetResult)
                            if (parsed) tweets.push(parsed)
                        }
                    } else if (entryId.startsWith('cursor-bottom')) {
                        cursorBottom = entry.content?.value || ''
                    } else if (entryId.startsWith('cursor-top')) {
                        cursorTop = entry.content?.value || ''
                    }
                }
            }
        }

        return NextResponse.json({
            success: true,
            data: {
                tweets,
                cursors: { top: cursorTop, bottom: cursorBottom },
                userId,
            },
        }, {
            headers: {
                'Cache-Control': 'public, s-maxage=120, stale-while-revalidate=300',
            },
        })
    } catch (err) {
        console.error('GraphQL API error:', err)
        return NextResponse.json({ error: 'Failed to fetch tweets' }, { status: 500 })
    }
}
