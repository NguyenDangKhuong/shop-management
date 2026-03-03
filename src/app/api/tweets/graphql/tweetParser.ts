/**
 * Tweet parsing utilities for Twitter's GraphQL API responses.
 * Extracted into a separate file to enable unit testing without
 * importing Next.js server-side modules (NextRequest, etc.)
 */

export interface ParsedTweet {
    id: string
    text: string
    createdAt: string
    user: {
        name: string
        screenName: string
        avatar: string
        verified: boolean
    }
    metrics: {
        replies: number
        retweets: number
        likes: number
        views: number
    }
    media: {
        type: 'photo' | 'video' | 'animated_gif'
        url: string
        width: number
        height: number
        videoUrl?: string
    }[]
    isRetweet: boolean
    retweetUser?: {
        name: string
        screenName: string
    }
    quotedTweet?: ParsedTweet
}

/**
 * Parse a raw tweet result from Twitter's GraphQL API into our ParsedTweet format.
 * Handles:
 * - TweetWithVisibilityResults wrapper (restricted tweets)
 * - Retweet unwrapping: extracts the original tweet's legacy data, user info, and card
 * - Media extraction from extended_entities (native media) with fallback to unified_card
 * - Quoted tweet parsing (recursive)
 * - View count from either the outer result or the inner retweet result
 */
export function parseTweetResult(result: any): ParsedTweet | null {
    try {
        // Handle TweetWithVisibilityResults wrapper
        if (result?.__typename === 'TweetWithVisibilityResults') {
            result = result.tweet
        }
        if (!result?.legacy) return null

        const legacy = result.legacy
        const user = result.core?.user_results?.result?.legacy
        if (!user) return null

        // Check if this tweet is a retweet — if so, unwrap to get the original tweet's data.
        // We keep track of tweetResult (full object) separately from tweetLegacy (legacy data)
        // because the card property lives on the full result, not inside legacy.
        const isRetweet = !!legacy.retweeted_status_result
        let tweetLegacy = legacy
        let tweetUser = user
        let tweetResult = result // Full result object — needed for card access on retweets
        let retweetUser = undefined

        if (isRetweet) {
            retweetUser = { name: user.name, screenName: user.screen_name }
            const rtResult = legacy.retweeted_status_result?.result
            if (rtResult?.__typename === 'TweetWithVisibilityResults') {
                tweetLegacy = rtResult.tweet?.legacy || legacy
                tweetUser = rtResult.tweet?.core?.user_results?.result?.legacy || user
                tweetResult = rtResult.tweet || result
            } else if (rtResult) {
                tweetLegacy = rtResult.legacy || legacy
                tweetUser = rtResult.core?.user_results?.result?.legacy || user
                tweetResult = rtResult
            }
        }

        // Parse media from extended_entities
        const extMedia = tweetLegacy.extended_entities?.media || []
        let media = extMedia.map((m: any) => {
            const item: any = {
                type: m.type,
                url: m.media_url_https,
                width: m.original_info?.width || 0,
                height: m.original_info?.height || 0,
            }
            if (m.type === 'video' || m.type === 'animated_gif') {
                const variants = m.video_info?.variants || []
                const mp4s = variants.filter((v: any) => v.content_type === 'video/mp4')
                if (mp4s.length > 0) {
                    const best = mp4s.reduce((a: any, b: any) => (b.bitrate || 0) > (a.bitrate || 0) ? b : a)
                    item.videoUrl = best.url
                }
            }
            return item
        })

        // Fallback: Some tweets (especially retweets of promoted/external content) use
        // Twitter's unified_card format instead of native extended_entities.
        // The unified_card contains a JSON blob with media_entities that have the same
        // video_info structure as extended_entities.
        if (media.length === 0 && tweetResult.card) {
            const cardMedia = parseUnifiedCardMedia(tweetResult.card)
            if (cardMedia.length > 0) {
                media = cardMedia
            }
        }

        // Parse quoted tweet
        let quotedTweet = undefined
        const qtResult = tweetLegacy.quoted_status_result?.result || result.quoted_status_result?.result
        if (qtResult) {
            quotedTweet = parseTweetResult(qtResult) || undefined
        }

        // Views
        const views = parseInt(result.views?.count || tweetResult.views?.count || '0')

        return {
            id: tweetLegacy.id_str || result.rest_id,
            text: tweetLegacy.full_text || '',
            createdAt: tweetLegacy.created_at || '',
            user: {
                name: tweetUser.name,
                screenName: tweetUser.screen_name,
                avatar: tweetUser.profile_image_url_https?.replace('_normal', '_bigger') || '',
                verified: tweetUser.verified || result.core?.user_results?.result?.is_blue_verified || false,
            },
            metrics: {
                replies: tweetLegacy.reply_count || 0,
                retweets: tweetLegacy.retweet_count || 0,
                likes: tweetLegacy.favorite_count || 0,
                views,
            },
            media,
            isRetweet,
            retweetUser,
            quotedTweet,
        }
    } catch {
        return null
    }
}

/**
 * Parse media from Twitter's unified_card format.
 * 
 * Twitter uses unified_card for tweets that embed external video content (e.g. promoted tweets,
 * retweets of ad content). The card structure is:
 *   card.legacy.binding_values[] → find key='unified_card' → value.string_value (JSON string)
 * 
 * Inside the JSON:
 *   { media_entities: { [id]: { type, media_url_https, video_info: { variants } } } }
 * 
 * The media_entities have the same structure as extended_entities, so we extract
 * video URLs using the same bitrate-based selection logic.
 */
export function parseUnifiedCardMedia(card: any): ParsedTweet['media'] {
    try {
        // Extract the unified_card JSON from binding_values array
        const bindingValues = card.legacy?.binding_values || []
        const unifiedCardValue = bindingValues.find((v: any) => v.key === 'unified_card')?.value?.string_value
        if (!unifiedCardValue) return []

        // Parse the JSON blob and iterate over media_entities
        const uc = JSON.parse(unifiedCardValue)
        const mediaEntities = uc.media_entities || {}
        const result: ParsedTweet['media'] = []

        for (const [, me] of Object.entries(mediaEntities) as [string, any][]) {
            const item: any = {
                type: me.type || 'photo',
                url: me.media_url_https || '',
                width: me.original_info?.width || 0,
                height: me.original_info?.height || 0,
            }
            if (me.type === 'video' || me.type === 'animated_gif') {
                const variants = me.video_info?.variants || []
                const mp4s = variants.filter((v: any) => v.content_type === 'video/mp4')
                if (mp4s.length > 0) {
                    const best = mp4s.reduce((a: any, b: any) => (b.bitrate || 0) > (a.bitrate || 0) ? b : a)
                    item.videoUrl = best.url
                }
            }
            result.push(item)
        }

        return result
    } catch {
        return []
    }
}
