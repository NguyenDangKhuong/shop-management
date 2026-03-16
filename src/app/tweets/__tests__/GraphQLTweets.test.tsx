import { render, screen, fireEvent, waitFor, act } from '@testing-library/react'
import {
    LazyVideo,
    MediaGrid,
    TweetCard,
    GraphQLTweets,
    formatCount,
    timeAgo,
    formatTweetText,
    ImagePreview,
} from '@/app/tweets/GraphQLTweets'

// Mock DOMPurify
jest.mock('dompurify', () => ({
    sanitize: (input: string) => input,
}))

// Mock fetch
const mockFetch = jest.fn()
global.fetch = mockFetch

// IntersectionObserver mock with trigger support
let intersectionCallback: IntersectionObserverCallback
const mockObserve = jest.fn()
const mockDisconnect = jest.fn()

beforeEach(() => {
    jest.clearAllMocks()
    global.IntersectionObserver = jest.fn().mockImplementation((cb) => {
        intersectionCallback = cb
        return { observe: mockObserve, unobserve: jest.fn(), disconnect: mockDisconnect }
    })
})

const triggerIntersection = (isIntersecting: boolean) => {
    if (intersectionCallback) {
        intersectionCallback(
            [{ isIntersecting } as IntersectionObserverEntry],
            {} as IntersectionObserver
        )
    }
}

// ─── Test Data ──────────────────────────────────────────────────────────
const sampleTweet = {
    id: 't1',
    text: 'Hello @world check https://example.com #trending',
    createdAt: new Date(Date.now() - 3600_000).toISOString(), // 1h ago
    user: {
        name: 'Test User',
        screenName: 'testuser',
        avatar: 'https://pbs.twimg.com/avatar.jpg',
        verified: true,
    },
    metrics: { replies: 5, retweets: 1200, likes: 45000, views: 1_500_000 },
    media: [],
    isRetweet: false,
}

// ─── Utility Functions ──────────────────────────────────────────────────
describe('formatCount', () => {
    it('formats millions', () => {
        expect(formatCount(1_500_000)).toBe('1.5M')
        expect(formatCount(1_000_000)).toBe('1M')
    })

    it('formats thousands', () => {
        expect(formatCount(1_200)).toBe('1.2K')
        expect(formatCount(1_000)).toBe('1K')
    })

    it('returns raw number below 1000', () => {
        expect(formatCount(999)).toBe('999')
        expect(formatCount(0)).toBe('0')
    })
})

describe('timeAgo', () => {
    it('returns seconds format', () => {
        const now = new Date()
        expect(timeAgo(new Date(now.getTime() - 30_000).toISOString())).toBe('30s')
    })

    it('returns minutes format', () => {
        const now = new Date()
        expect(timeAgo(new Date(now.getTime() - 300_000).toISOString())).toBe('5m')
    })

    it('returns hours format', () => {
        const now = new Date()
        expect(timeAgo(new Date(now.getTime() - 7_200_000).toISOString())).toBe('2h')
    })

    it('returns days format', () => {
        const now = new Date()
        expect(timeAgo(new Date(now.getTime() - 172_800_000).toISOString())).toBe('2d')
    })

    it('returns date for older tweets', () => {
        const result = timeAgo('2025-01-15T00:00:00.000Z')
        expect(result).toMatch(/Jan 15/)
    })
})

describe('formatTweetText', () => {
    it('linkifies @mentions', () => {
        const result = formatTweetText('Hello @world')
        expect(result).toContain('@world')
        expect(result).toContain('text-[#ff9900]')
    })

    it('linkifies #hashtags', () => {
        const result = formatTweetText('Check #trending')
        expect(result).toContain('#trending')
    })

    it('removes trailing t.co links', () => {
        const result = formatTweetText('Hello https://t.co/abc123')
        expect(result).not.toContain('t.co')
    })

    it('linkifies remaining URLs', () => {
        const result = formatTweetText('Visit https://example.com')
        expect(result).toContain('href="https://example.com"')
    })
})

// ─── LazyVideo ──────────────────────────────────────────────────────────
describe('LazyVideo', () => {
    it('renders with poster overlay but no source initially', () => {
        const { container } = render(
            <LazyVideo src="/video.mp4" poster="/poster.jpg" isGif={false} />
        )

        const video = container.querySelector('video')!
        expect(video).toBeInTheDocument()
        expect(video.getAttribute('preload')).toBe('none')
        // Poster is now an overlay img, not a video attribute
        const posterImg = container.querySelector('img[src="/poster.jpg"]')
        expect(posterImg).toBeInTheDocument()
        expect(container.querySelector('source')).toBeNull()
    })

    it('loads source when scrolled into view', () => {
        const { container } = render(
            <LazyVideo src="/video.mp4" poster="/poster.jpg" isGif={false} />
        )

        expect(container.querySelector('source')).toBeNull()

        act(() => triggerIntersection(true))

        const source = container.querySelector('source')
        expect(source).toBeInTheDocument()
        expect(source?.getAttribute('src')).toBe('/video.mp4')
    })

    it('keeps source after scrolling away (does not unload)', () => {
        const { container } = render(
            <LazyVideo src="/video.mp4" poster="/poster.jpg" isGif={false} />
        )

        act(() => triggerIntersection(true))
        expect(container.querySelector('source')).toBeInTheDocument()

        act(() => triggerIntersection(false))
        expect(container.querySelector('source')).toBeInTheDocument()
    })

    it('shows GIF badge for animated_gif type', () => {
        render(
            <LazyVideo src="/gif.mp4" poster="/gif-poster.jpg" isGif={true} />
        )

        expect(screen.getByText('GIF')).toBeInTheDocument()
    })

    it('does not show GIF badge for regular video', () => {
        render(
            <LazyVideo src="/video.mp4" poster="/poster.jpg" isGif={false} />
        )

        expect(screen.queryByText('GIF')).not.toBeInTheDocument()
    })

    it('sets loop and muted for GIFs', () => {
        const { container } = render(
            <LazyVideo src="/gif.mp4" poster="/poster.jpg" isGif={true} />
        )

        const video = container.querySelector('video')!
        expect(video).toHaveAttribute('loop')
        expect(video.muted).toBe(true)
    })

    it('uses IntersectionObserver with 200px rootMargin', () => {
        render(
            <LazyVideo src="/video.mp4" poster="/poster.jpg" isGif={false} />
        )

        expect(IntersectionObserver).toHaveBeenCalledWith(
            expect.any(Function),
            { rootMargin: '200px' }
        )
        expect(mockObserve).toHaveBeenCalled()
    })
})

// ─── MediaGrid ──────────────────────────────────────────────────────────
describe('MediaGrid', () => {
    it('returns null for empty media', () => {
        const { container } = render(
            <MediaGrid media={[]} videoProxyUrl="" />
        )
        expect(container.firstChild).toBeNull()
    })

    it('renders photos with lazy loading', () => {
        const media = [
            { type: 'photo' as const, url: '/img1.jpg', width: 800, height: 600 },
        ]

        const { container } = render(
            <MediaGrid media={media} videoProxyUrl="" />
        )

        const img = container.querySelector('img')!
        expect(img).toBeInTheDocument()
        expect(img.getAttribute('loading')).toBe('lazy')
        expect(img.getAttribute('src')).toBe('/img1.jpg')
    })

    it('renders videos as LazyVideo components', () => {
        const media = [
            { type: 'video' as const, url: '/poster.jpg', width: 1280, height: 720, videoUrl: 'https://video.twimg.com/test.mp4' },
        ]

        const { container } = render(
            <MediaGrid media={media} videoProxyUrl="" />
        )

        const video = container.querySelector('video')!
        expect(video).toBeInTheDocument()
        expect(video.getAttribute('preload')).toBe('none')
    })

    it('uses video proxy URL when provided', () => {
        const media = [
            { type: 'video' as const, url: '/poster.jpg', width: 1280, height: 720, videoUrl: 'https://video.twimg.com/test.mp4' },
        ]

        const { container } = render(
            <MediaGrid media={media} videoProxyUrl="https://proxy.example.com" />
        )

        // Load the source first
        act(() => triggerIntersection(true))

        const source = container.querySelector('source')!
        expect(source.getAttribute('src')).toContain('proxy.example.com')
    })

    it('calls onImageClick for photo clicks', () => {
        const onImageClick = jest.fn()
        const media = [
            { type: 'photo' as const, url: '/img1.jpg', width: 800, height: 600 },
        ]

        const { container } = render(
            <MediaGrid media={media} videoProxyUrl="" onImageClick={onImageClick} />
        )

        fireEvent.click(container.querySelector('img')!)
        expect(onImageClick).toHaveBeenCalledWith('/img1.jpg')
    })

    it('renders multiple photos in grid', () => {
        const media = [
            { type: 'photo' as const, url: '/img1.jpg', width: 400, height: 400 },
            { type: 'photo' as const, url: '/img2.jpg', width: 400, height: 400 },
            { type: 'photo' as const, url: '/img3.jpg', width: 400, height: 400 },
        ]

        const { container } = render(
            <MediaGrid media={media} videoProxyUrl="" />
        )

        expect(container.querySelectorAll('img')).toHaveLength(3)
    })
})

// ─── TweetCard ──────────────────────────────────────────────────────────
describe('TweetCard', () => {
    it('renders tweet text and user info', () => {
        render(<TweetCard tweet={sampleTweet} videoProxyUrl="" />)

        expect(screen.getByText('Test User')).toBeInTheDocument()
        expect(screen.getByText('@testuser')).toBeInTheDocument()
    })

    it('shows verified badge', () => {
        const { container } = render(<TweetCard tweet={sampleTweet} videoProxyUrl="" />)
        expect(container.querySelector('svg.fill-\\[\\#ff9900\\]')).toBeInTheDocument()
    })

    it('formats metrics correctly', () => {
        render(<TweetCard tweet={sampleTweet} videoProxyUrl="" />)

        expect(screen.getByText('1.2K')).toBeInTheDocument() // retweets
        expect(screen.getByText('45K')).toBeInTheDocument() // likes
        expect(screen.getByText('1.5M')).toBeInTheDocument() // views
    })

    it('shows retweet indicator for retweets', () => {
        const retweet = {
            ...sampleTweet,
            isRetweet: true,
            retweetUser: { name: 'Retweeter', screenName: 'retweeter' },
        }

        render(<TweetCard tweet={retweet} videoProxyUrl="" />)
        expect(screen.getByText(/Retweeter reposted/)).toBeInTheDocument()
    })

    it('calls onUserClick when @username clicked', () => {
        const onUserClick = jest.fn()
        render(<TweetCard tweet={sampleTweet} videoProxyUrl="" onUserClick={onUserClick} />)

        fireEvent.click(screen.getByText('@testuser'))
        expect(onUserClick).toHaveBeenCalledWith('testuser')
    })

    it('renders quoted tweet', () => {
        const tweetWithQuote = {
            ...sampleTweet,
            quotedTweet: {
                ...sampleTweet,
                id: 'q1',
                text: 'Quoted content here',
                user: { name: 'QuotedUser', screenName: 'quoteduser', avatar: '/q.jpg', verified: false },
            },
        }

        render(<TweetCard tweet={tweetWithQuote} videoProxyUrl="" />)
        expect(screen.getByText('QuotedUser')).toBeInTheDocument()
        expect(screen.getByText('@quoteduser')).toBeInTheDocument()
    })

    it('handles follow button click', async () => {
        mockFetch.mockResolvedValueOnce({
            json: () => Promise.resolve({ success: true }),
        })

        render(<TweetCard tweet={sampleTweet} videoProxyUrl="" />)

        const followBtn = screen.getByText('Follow')
        await act(async () => { fireEvent.click(followBtn) })

        await waitFor(() => {
            expect(mockFetch).toHaveBeenCalledWith('/api/tweets/follow', expect.objectContaining({
                method: 'POST',
                body: JSON.stringify({ screenName: 'testuser' }),
            }))
        })
    })
})

// ─── ImagePreview ───────────────────────────────────────────────────────
describe('ImagePreview', () => {
    it('renders image and close button', () => {
        render(
            <ImagePreview
                images={['/img1.jpg', '/img2.jpg']}
                index={0}
                onClose={jest.fn()}
                onNavigate={jest.fn()}
            />
        )

        expect(screen.getByText('1 / 2')).toBeInTheDocument()
        expect(screen.getByText('✕')).toBeInTheDocument()
    })

    it('calls onClose on Escape key', () => {
        const onClose = jest.fn()
        render(
            <ImagePreview images={['/img1.jpg']} index={0} onClose={onClose} onNavigate={jest.fn()} />
        )

        fireEvent.keyDown(document, { key: 'Escape' })
        expect(onClose).toHaveBeenCalled()
    })

    it('navigates with arrow keys', () => {
        const onNavigate = jest.fn()
        render(
            <ImagePreview images={['/a.jpg', '/b.jpg', '/c.jpg']} index={1} onClose={jest.fn()} onNavigate={onNavigate} />
        )

        fireEvent.keyDown(document, { key: 'ArrowLeft' })
        expect(onNavigate).toHaveBeenCalledWith(0)

        fireEvent.keyDown(document, { key: 'ArrowRight' })
        expect(onNavigate).toHaveBeenCalledWith(2)
    })

    it('does not show counter for single image', () => {
        render(
            <ImagePreview images={['/img1.jpg']} index={0} onClose={jest.fn()} onNavigate={jest.fn()} />
        )

        expect(screen.queryByText(/\//)).not.toBeInTheDocument()
    })
})

// ─── GraphQLTweets ──────────────────────────────────────────────────────
describe('GraphQLTweets', () => {
    const tweetsResponse = {
        success: true,
        data: {
            tweets: [sampleTweet],
            cursors: { bottom: 'cursor-1' },
        },
    }

    it('shows user timeline header for regular endpoint', async () => {
        mockFetch.mockResolvedValueOnce({
            json: () => Promise.resolve(tweetsResponse),
        })

        const { container } = render(<GraphQLTweets username="testuser" />)

        await waitFor(() => {
            expect(container.querySelector('img[src="https://pbs.twimg.com/avatar.jpg"]')).toBeInTheDocument()
            expect(container.textContent).toContain('Test User')
        })
    })

    it('shows liked header for likes endpoint', async () => {
        mockFetch.mockResolvedValueOnce({
            json: () => Promise.resolve(tweetsResponse),
        })

        render(<GraphQLTweets username="pinned" apiEndpoint="/api/tweets/graphql/likes" />)

        await waitFor(() => {
            expect(screen.getByText('Liked by')).toBeInTheDocument()
            expect(screen.getByText('@pinned')).toBeInTheDocument()
            expect(screen.getByText('❤️')).toBeInTheDocument()
        })
    })

    it('shows loading spinner initially', () => {
        mockFetch.mockReturnValue(new Promise(() => { })) // never resolves
        render(<GraphQLTweets username="testuser" />)

        const spinner = document.querySelector('.animate-spin')
        expect(spinner).toBeInTheDocument()
    })

    it('shows error and retry button on failure', async () => {
        mockFetch.mockResolvedValueOnce({
            json: () => Promise.resolve({ success: false, error: 'API error' }),
        })

        render(<GraphQLTweets username="testuser" />)

        await waitFor(() => {
            expect(screen.getByText('API error')).toBeInTheDocument()
            expect(screen.getByText('Thử lại')).toBeInTheDocument()
        })
    })

    it('shows tweet count in header', async () => {
        mockFetch.mockResolvedValueOnce({
            json: () => Promise.resolve(tweetsResponse),
        })

        render(<GraphQLTweets username="testuser" />)

        await waitFor(() => {
            expect(screen.getByText('1 tweets')).toBeInTheDocument()
        })
    })

    it('fetches tweets with correct username param', async () => {
        mockFetch.mockResolvedValueOnce({
            json: () => Promise.resolve(tweetsResponse),
        })

        render(<GraphQLTweets username="myuser" />)

        await waitFor(() => {
            expect(mockFetch).toHaveBeenCalledWith(
                expect.stringContaining('username=myuser')
            )
        })
    })
})
