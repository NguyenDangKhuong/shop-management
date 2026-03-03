import { parseTweetResult, parseUnifiedCardMedia } from '@/app/api/tweets/graphql/tweetParser'

/**
 * Helper: Creates a minimal valid tweet result object.
 * This mirrors Twitter's GraphQL API response structure.
 */
function makeTweetResult(overrides: Record<string, any> = {}) {
    return {
        __typename: 'Tweet',
        rest_id: '123',
        legacy: {
            id_str: '123',
            full_text: 'Hello world',
            created_at: 'Mon Jan 01 00:00:00 +0000 2024',
            reply_count: 1,
            retweet_count: 2,
            favorite_count: 3,
            extended_entities: { media: [] },
            ...overrides.legacy,
        },
        core: {
            user_results: {
                result: {
                    legacy: {
                        name: 'Test User',
                        screen_name: 'testuser',
                        profile_image_url_https: 'https://pbs.twimg.com/profile_images/123/photo_normal.jpg',
                        verified: false,
                        ...overrides.userLegacy,
                    },
                    is_blue_verified: false,
                },
            },
        },
        views: { count: '100' },
        ...overrides,
    }
}

/**
 * Helper: Creates a unified_card structure with video media.
 */
function makeUnifiedCard(videoUrl: string, thumbnailUrl: string) {
    const unifiedCardJson = JSON.stringify({
        type: 'mixed_media_single_destination',
        media_entities: {
            'media_1': {
                type: 'video',
                media_url_https: thumbnailUrl,
                original_info: { width: 720, height: 1280 },
                video_info: {
                    variants: [
                        { content_type: 'application/x-mpegURL', url: 'https://example.com/master.m3u8' },
                        { content_type: 'video/mp4', bitrate: 632000, url: videoUrl },
                        { content_type: 'video/mp4', bitrate: 2176000, url: videoUrl.replace('.mp4', '_hd.mp4') },
                    ],
                },
            },
        },
    })

    return {
        legacy: {
            binding_values: [
                { key: 'unified_card', value: { string_value: unifiedCardJson } },
                { key: 'card_url', value: { string_value: 'https://twitter.com' } },
            ],
        },
    }
}

describe('parseTweetResult', () => {
    it('parses a basic tweet with text and no media', () => {
        const result = parseTweetResult(makeTweetResult())
        expect(result).not.toBeNull()
        expect(result!.id).toBe('123')
        expect(result!.text).toBe('Hello world')
        expect(result!.user.screenName).toBe('testuser')
        expect(result!.media).toHaveLength(0)
        expect(result!.isRetweet).toBe(false)
    })

    it('parses tweet with photo media from extended_entities', () => {
        const result = parseTweetResult(makeTweetResult({
            legacy: {
                id_str: '456',
                full_text: 'Photo tweet',
                created_at: 'Mon Jan 01 00:00:00 +0000 2024',
                reply_count: 0, retweet_count: 0, favorite_count: 0,
                extended_entities: {
                    media: [{
                        type: 'photo',
                        media_url_https: 'https://pbs.twimg.com/media/test.jpg',
                        original_info: { width: 800, height: 600 },
                    }],
                },
            },
        }))
        expect(result!.media).toHaveLength(1)
        expect(result!.media[0].type).toBe('photo')
        expect(result!.media[0].url).toBe('https://pbs.twimg.com/media/test.jpg')
        expect(result!.media[0].width).toBe(800)
    })

    it('parses tweet with video and picks highest bitrate mp4', () => {
        const result = parseTweetResult(makeTweetResult({
            legacy: {
                id_str: '789',
                full_text: 'Video tweet',
                created_at: 'Mon Jan 01 00:00:00 +0000 2024',
                reply_count: 0, retweet_count: 0, favorite_count: 0,
                extended_entities: {
                    media: [{
                        type: 'video',
                        media_url_https: 'https://pbs.twimg.com/thumb.jpg',
                        original_info: { width: 1280, height: 720 },
                        video_info: {
                            variants: [
                                { content_type: 'application/x-mpegURL', url: 'https://example.com/master.m3u8' },
                                { content_type: 'video/mp4', bitrate: 256000, url: 'https://video.twimg.com/low.mp4' },
                                { content_type: 'video/mp4', bitrate: 2176000, url: 'https://video.twimg.com/high.mp4' },
                                { content_type: 'video/mp4', bitrate: 832000, url: 'https://video.twimg.com/med.mp4' },
                            ],
                        },
                    }],
                },
            },
        }))
        expect(result!.media).toHaveLength(1)
        expect(result!.media[0].type).toBe('video')
        expect(result!.media[0].videoUrl).toBe('https://video.twimg.com/high.mp4')
    })

    it('unwraps TweetWithVisibilityResults wrapper', () => {
        const result = parseTweetResult({
            __typename: 'TweetWithVisibilityResults',
            tweet: makeTweetResult({ legacy: { id_str: 'wrapped', full_text: 'Wrapped tweet', created_at: 'Mon Jan 01 00:00:00 +0000 2024', reply_count: 0, retweet_count: 0, favorite_count: 0, extended_entities: { media: [] } } }),
        })
        expect(result).not.toBeNull()
        expect(result!.id).toBe('wrapped')
    })

    it('handles retweets — extracts original tweet data', () => {
        const originalUser = { name: 'Original', screen_name: 'original_user', profile_image_url_https: 'https://img.com/orig_normal.jpg', verified: true }
        const result = parseTweetResult(makeTweetResult({
            legacy: {
                id_str: 'rt_outer',
                full_text: 'RT @original_user: Hello',
                created_at: 'Mon Jan 01 00:00:00 +0000 2024',
                reply_count: 0, retweet_count: 0, favorite_count: 0,
                extended_entities: { media: [] },
                retweeted_status_result: {
                    result: {
                        __typename: 'Tweet',
                        rest_id: 'orig_123',
                        legacy: {
                            id_str: 'orig_123',
                            full_text: 'Hello from original',
                            created_at: 'Mon Jan 01 00:00:00 +0000 2024',
                            reply_count: 5, retweet_count: 10, favorite_count: 20,
                            extended_entities: { media: [] },
                        },
                        core: { user_results: { result: { legacy: originalUser } } },
                        views: { count: '500' },
                    },
                },
            },
        }))
        expect(result!.isRetweet).toBe(true)
        expect(result!.retweetUser?.screenName).toBe('testuser')
        expect(result!.user.screenName).toBe('original_user')
        expect(result!.text).toBe('Hello from original')
    })

    it('falls back to unified_card media when extended_entities is empty (retweet with card)', () => {
        const card = makeUnifiedCard(
            'https://video.twimg.com/amplify_video/123/vid/720x1280/test.mp4',
            'https://pbs.twimg.com/amplify_video_thumb/123/img/thumb.jpg'
        )
        const result = parseTweetResult(makeTweetResult({
            legacy: {
                id_str: 'rt_card',
                full_text: 'RT @card_user: Video from card',
                created_at: 'Mon Jan 01 00:00:00 +0000 2024',
                reply_count: 0, retweet_count: 0, favorite_count: 0,
                extended_entities: { media: [] },
                retweeted_status_result: {
                    result: {
                        __typename: 'Tweet',
                        rest_id: 'card_123',
                        legacy: {
                            id_str: 'card_123',
                            full_text: 'Video from card',
                            created_at: 'Mon Jan 01 00:00:00 +0000 2024',
                            reply_count: 0, retweet_count: 0, favorite_count: 0,
                            extended_entities: { media: [] },
                        },
                        core: { user_results: { result: { legacy: { name: 'Card User', screen_name: 'card_user', profile_image_url_https: 'https://img.com/card_normal.jpg', verified: false } } } },
                        card, // unified_card attached to the retweet result
                        views: { count: '200' },
                    },
                },
            },
        }))
        expect(result!.media).toHaveLength(1)
        expect(result!.media[0].type).toBe('video')
        expect(result!.media[0].url).toBe('https://pbs.twimg.com/amplify_video_thumb/123/img/thumb.jpg')
        // Should pick the highest bitrate mp4 (_hd variant)
        expect(result!.media[0].videoUrl).toContain('_hd.mp4')
    })

    it('returns null for invalid input', () => {
        expect(parseTweetResult(null)).toBeNull()
        expect(parseTweetResult(undefined)).toBeNull()
        expect(parseTweetResult({})).toBeNull()
        expect(parseTweetResult({ legacy: {} })).toBeNull() // no user
    })

    it('parses metrics correctly', () => {
        const result = parseTweetResult(makeTweetResult({
            legacy: {
                id_str: 'metrics',
                full_text: 'Metrics test',
                created_at: 'Mon Jan 01 00:00:00 +0000 2024',
                reply_count: 42,
                retweet_count: 100,
                favorite_count: 500,
                extended_entities: { media: [] },
            },
            views: { count: '10000' },
        }))
        expect(result!.metrics.replies).toBe(42)
        expect(result!.metrics.retweets).toBe(100)
        expect(result!.metrics.likes).toBe(500)
        expect(result!.metrics.views).toBe(10000)
    })

    it('upgrades avatar URL from _normal to _bigger', () => {
        const result = parseTweetResult(makeTweetResult())
        expect(result!.user.avatar).toBe('https://pbs.twimg.com/profile_images/123/photo_bigger.jpg')
    })
})

describe('parseUnifiedCardMedia', () => {
    it('extracts video from unified_card', () => {
        const card = makeUnifiedCard(
            'https://video.twimg.com/test.mp4',
            'https://pbs.twimg.com/thumb.jpg'
        )
        const media = parseUnifiedCardMedia(card)
        expect(media).toHaveLength(1)
        expect(media[0].type).toBe('video')
        expect(media[0].url).toBe('https://pbs.twimg.com/thumb.jpg')
        expect(media[0].videoUrl).toContain('_hd.mp4') // highest bitrate
    })

    it('handles photo-only unified_card', () => {
        const cardJson = JSON.stringify({
            media_entities: {
                'media_1': {
                    type: 'photo',
                    media_url_https: 'https://pbs.twimg.com/card_img/photo.jpg',
                    original_info: { width: 1200, height: 675 },
                },
            },
        })
        const card = {
            legacy: {
                binding_values: [
                    { key: 'unified_card', value: { string_value: cardJson } },
                ],
            },
        }
        const media = parseUnifiedCardMedia(card)
        expect(media).toHaveLength(1)
        expect(media[0].type).toBe('photo')
        expect(media[0].videoUrl).toBeUndefined()
    })

    it('returns empty array when no unified_card binding value', () => {
        const card = { legacy: { binding_values: [{ key: 'other', value: {} }] } }
        expect(parseUnifiedCardMedia(card)).toEqual([])
    })

    it('returns empty array on invalid JSON', () => {
        const card = {
            legacy: {
                binding_values: [
                    { key: 'unified_card', value: { string_value: '{{invalid json' } },
                ],
            },
        }
        expect(parseUnifiedCardMedia(card)).toEqual([])
    })

    it('returns empty array for null/undefined input', () => {
        expect(parseUnifiedCardMedia(null)).toEqual([])
        expect(parseUnifiedCardMedia(undefined)).toEqual([])
        expect(parseUnifiedCardMedia({})).toEqual([])
    })

    it('handles multiple media entities', () => {
        const cardJson = JSON.stringify({
            media_entities: {
                'media_1': {
                    type: 'photo',
                    media_url_https: 'https://pbs.twimg.com/photo1.jpg',
                    original_info: { width: 800, height: 600 },
                },
                'media_2': {
                    type: 'video',
                    media_url_https: 'https://pbs.twimg.com/thumb2.jpg',
                    original_info: { width: 1280, height: 720 },
                    video_info: {
                        variants: [
                            { content_type: 'video/mp4', bitrate: 2000000, url: 'https://video.twimg.com/vid2.mp4' },
                        ],
                    },
                },
            },
        })
        const card = {
            legacy: {
                binding_values: [
                    { key: 'unified_card', value: { string_value: cardJson } },
                ],
            },
        }
        const media = parseUnifiedCardMedia(card)
        expect(media).toHaveLength(2)
    })
})
