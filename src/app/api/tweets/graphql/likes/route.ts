import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/utils/connectDb'
import TwitterTokenModel from '@/models/TwitterToken'
import { ParsedTweet, parseTweetResult } from '../tweetParser'

/**
 * Twitter Likes Timeline API — Fetch tweets liked by a user
 *
 * Flow:
 *   Client → /api/tweets/graphql/likes?username=xxx&cursor=yyy
 *   → Server lấy cookie từ DB
 *   → Gọi x.com/i/api/graphql/Likes
 *   → Parse JSON → Trả về liked tweets + cursor cho pagination
 */

const DEFAULT_BEARER = process.env.TWITTER_DEFAULT_BEARER || ''
const DEFAULT_USER_BY_SCREEN_NAME_QID = process.env.TWITTER_USER_BY_SCREEN_NAME_QID || ''

// GraphQL query ID for Likes timeline — sniff from DevTools > Network > "Likes"
const LIKES_QID = process.env.TWITTER_LIKES_QID || 'a2vYKkx2AtoCmEIRO8Gfbw'

let cachedCreds: {
    cookie: string; csrfToken: string
    bearerToken: string
    userByScreenNameQueryId: string
    ts: number
} | null = null
const CACHE_TTL = 5 * 60 * 1000

const userIdCache = new Map<string, string>()

const FEATURES = {
    rweb_video_screen_enabled: false,
    profile_label_improvements_pcf_label_in_post_enabled: true,
    responsive_web_profile_redirect_enabled: false,
    rweb_tipjar_consumption_enabled: false,
    verified_phone_label_enabled: false,
    creator_subscriptions_tweet_preview_api_enabled: true,
    responsive_web_graphql_timeline_navigation_enabled: true,
    responsive_web_graphql_skip_user_profile_image_extensions_enabled: false,
    premium_content_api_read_enabled: false,
    communities_web_enable_tweet_community_results_fetch: true,
    c9s_tweet_anatomy_moderator_badge_enabled: true,
    responsive_web_grok_analyze_button_fetch_trends_enabled: false,
    responsive_web_grok_analyze_post_followups_enabled: true,
    responsive_web_jetfuel_frame: true,
    responsive_web_grok_share_attachment_enabled: true,
    responsive_web_grok_annotations_enabled: true,
    articles_preview_enabled: true,
    responsive_web_edit_tweet_api_enabled: true,
    graphql_is_translatable_rweb_tweet_is_translatable_enabled: true,
    view_counts_everywhere_api_enabled: true,
    longform_notetweets_consumption_enabled: true,
    responsive_web_twitter_article_tweet_consumption_enabled: true,
    tweet_awards_web_tipping_enabled: false,
    content_disclosure_indicator_enabled: true,
    content_disclosure_ai_generated_indicator_enabled: true,
    responsive_web_grok_show_grok_translated_post: false,
    responsive_web_grok_analysis_button_from_backend: true,
    post_ctas_fetch_enabled: false,
    freedom_of_speech_not_reach_fetch_enabled: true,
    standardized_nudges_misinfo: true,
    tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled: true,
    longform_notetweets_rich_text_read_enabled: true,
    longform_notetweets_inline_media_enabled: false,
    responsive_web_grok_image_annotation_enabled: true,
    responsive_web_grok_imagine_annotation_enabled: true,
    responsive_web_grok_community_note_auto_translation_is_enabled: false,
    responsive_web_enhance_cards_enabled: false,
}

async function getCredentials() {
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
                const ct0Match = cookie.match(/ct0=([^;]+)/)
                csrfToken = ct0Match?.[1] || token.ct0 || ''
            } else if (token.authToken && token.ct0) {
                cookie = `auth_token=${token.authToken}; ct0=${token.ct0}`
                if (token.att) cookie += `; att=${token.att}`
                csrfToken = token.ct0
            }
            if (cookie) {
                cachedCreds = {
                    cookie, csrfToken,
                    bearerToken: token.bearerToken || DEFAULT_BEARER,
                    userByScreenNameQueryId: token.userByScreenNameQueryId || DEFAULT_USER_BY_SCREEN_NAME_QID,
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

async function getUserId(username: string, headers: Record<string, string>, userByScreenNameQId: string): Promise<string | null> {
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
        const url = `https://x.com/i/api/graphql/${userByScreenNameQId}/UserByScreenName?variables=${encodeURIComponent(variables)}&features=${encodeURIComponent(features)}`
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
        'authorization': creds.bearerToken,
        'x-csrf-token': creds.csrfToken,
        'cookie': creds.cookie,
        'x-twitter-active-user': 'yes',
        'x-twitter-auth-type': 'OAuth2Session',
        'x-twitter-client-language': 'en',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36',
    }

    try {
        const userId = await getUserId(username, headers, creds.userByScreenNameQueryId)
        if (!userId) {
            return NextResponse.json({ error: `User @${username} not found` }, { status: 404 })
        }

        const variables: any = {
            userId,
            count: Math.min(count, 40),
            includePromotedContent: false,
            withClientEventToken: false,
            withBirdwatchNotes: false,
            withVoice: true,
        }
        if (cursor) {
            variables.cursor = cursor
        }

        const fieldToggles = { withArticlePlainText: false }
        const url = `https://x.com/i/api/graphql/${LIKES_QID}/Likes?variables=${encodeURIComponent(JSON.stringify(variables))}&features=${encodeURIComponent(JSON.stringify(FEATURES))}&fieldToggles=${encodeURIComponent(JSON.stringify(fieldToggles))}`
        const res = await fetch(url, { headers })

        if (!res.ok) {
            return NextResponse.json({ error: `Twitter returned ${res.status}` }, { status: res.status })
        }

        const data = await res.json()

        // Parse response — try multiple paths (Twitter changes structure between endpoints)
        const userResult = data?.data?.user?.result
        const instructions =
            userResult?.timeline_v2?.timeline?.instructions ||
            userResult?.timeline?.timeline?.instructions ||
            []
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
        console.error('Likes API error:', err)
        return NextResponse.json({ error: 'Failed to fetch liked tweets' }, { status: 500 })
    }
}
