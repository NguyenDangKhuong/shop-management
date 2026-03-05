import { render, screen, fireEvent, waitFor, act } from '@testing-library/react'
import { TweetsFeed } from '@/app/tweets/TweetsFeed'

// Mock fetch globally
const mockFetch = jest.fn()
global.fetch = mockFetch

// Mock IntersectionObserver
const mockObserve = jest.fn()
const mockDisconnect = jest.fn()
global.IntersectionObserver = jest.fn().mockImplementation(() => ({
    observe: mockObserve,
    unobserve: jest.fn(),
    disconnect: mockDisconnect,
}))

// Sample tweet data for mock responses
const sampleTweet = {
    id: '123456',
    text: 'Hello World',
    createdAt: '2026-03-05T00:00:00.000Z',
    user: {
        name: 'Test User',
        screenName: 'testuser',
        avatar: 'https://pbs.twimg.com/test.jpg',
        verified: false,
    },
    metrics: { replies: 5, retweets: 10, likes: 20, views: 100 },
    media: [],
    isRetweet: false,
}

const homeResponse = {
    success: true,
    data: {
        tweets: [sampleTweet],
        cursors: { top: 'cursor-top-1', bottom: 'cursor-bottom-1' },
        tab: 'for_you',
    },
}

const usersResponse = {
    success: true,
    data: [{ _id: 'u1', username: 'saveduser1' }],
}

/**
 * Helper: mock both /api/twitter-users and /api/tweets/home calls
 */
function mockDefaultFetches() {
    mockFetch.mockImplementation((url: string) => {
        if (url.includes('/api/twitter-users')) {
            return Promise.resolve({ json: () => Promise.resolve(usersResponse) })
        }
        if (url.includes('/api/tweets/home')) {
            return Promise.resolve({ json: () => Promise.resolve(homeResponse) })
        }
        return Promise.resolve({ json: () => Promise.resolve({ success: false }) })
    })
}

describe('TweetsFeed', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('renders tab buttons for For You and Following', async () => {
        mockDefaultFetches()
        render(<TweetsFeed />)

        expect(screen.getByText('For You')).toBeInTheDocument()
        expect(screen.getByText('Following')).toBeInTheDocument()
    })

    it('fetches for_you tweets on mount', async () => {
        mockDefaultFetches()
        render(<TweetsFeed />)

        await waitFor(() => {
            expect(mockFetch).toHaveBeenCalledWith(
                expect.stringContaining('/api/tweets/home?tab=for_you&count=20')
            )
        })
    })

    it('displays tweets after successful fetch', async () => {
        mockDefaultFetches()
        render(<TweetsFeed />)

        await waitFor(() => {
            expect(screen.getByText('Hello World')).toBeInTheDocument()
        })
    })

    it('shows error message when fetch fails', async () => {
        mockFetch.mockImplementation((url: string) => {
            if (url.includes('/api/twitter-users')) {
                return Promise.resolve({ json: () => Promise.resolve(usersResponse) })
            }
            return Promise.resolve({
                json: () => Promise.resolve({ success: false, error: 'Rate limited' }),
            })
        })

        render(<TweetsFeed />)

        await waitFor(() => {
            expect(screen.getByText('Rate limited')).toBeInTheDocument()
        })
    })

    it('shows network error on fetch rejection', async () => {
        mockFetch.mockImplementation((url: string) => {
            if (url.includes('/api/twitter-users')) {
                return Promise.resolve({ json: () => Promise.resolve(usersResponse) })
            }
            return Promise.reject(new Error('Network error'))
        })

        render(<TweetsFeed />)

        await waitFor(() => {
            expect(screen.getByText('Network error')).toBeInTheDocument()
        })
    })

    it('switches tabs and re-fetches tweets', async () => {
        mockDefaultFetches()
        render(<TweetsFeed />)

        await waitFor(() => {
            expect(screen.getByText('Hello World')).toBeInTheDocument()
        })

        // Switch to Following tab
        fireEvent.click(screen.getByText('Following'))

        await waitFor(() => {
            expect(mockFetch).toHaveBeenCalledWith(
                expect.stringContaining('tab=following')
            )
        })
    })

    it('renders browse user toggle button', async () => {
        mockDefaultFetches()
        render(<TweetsFeed />)

        expect(screen.getByText('Browse user')).toBeInTheDocument()
    })

    it('shows search input after clicking browse user', async () => {
        mockDefaultFetches()
        render(<TweetsFeed />)

        fireEvent.click(screen.getByText('Browse user'))
        expect(screen.getByPlaceholderText('Enter @username to browse...')).toBeInTheDocument()
        expect(screen.getByText('Browse', { selector: 'button' })).toBeInTheDocument()
    })

    it('shows saved user tags after expanding search', async () => {
        mockDefaultFetches()
        render(<TweetsFeed />)

        fireEvent.click(screen.getByText('Browse user'))

        await waitFor(() => {
            expect(screen.getByText('@saveduser1')).toBeInTheDocument()
        })
    })

    it('navigates to user timeline when @username clicked in tweet', async () => {
        mockDefaultFetches()
        render(<TweetsFeed />)

        await waitFor(() => {
            expect(screen.getByText('Hello World')).toBeInTheDocument()
        })

        // Click the @username link in the tweet
        fireEvent.click(screen.getByText('@testuser'))

        // Should show back button
        await waitFor(() => {
            expect(screen.getByText(/Back to feed/)).toBeInTheDocument()
        })
    })

    it('shows tweet count in header', async () => {
        mockDefaultFetches()
        render(<TweetsFeed />)

        await waitFor(() => {
            expect(screen.getByText('1 tweets')).toBeInTheDocument()
        })
    })

    it('handles repost button click', async () => {
        mockDefaultFetches()
        render(<TweetsFeed />)

        await waitFor(() => {
            expect(screen.getByText('Hello World')).toBeInTheDocument()
        })

        // Mock repost API call
        mockFetch.mockResolvedValueOnce({
            json: () => Promise.resolve({ success: true }),
        })

        // Find and click the repost button (has repost count "10")
        const repostButton = screen.getByText('10')
        await act(async () => {
            fireEvent.click(repostButton.closest('button')!)
        })

        await waitFor(() => {
            expect(mockFetch).toHaveBeenCalledWith('/api/tweets/repost', expect.objectContaining({
                method: 'POST',
                body: JSON.stringify({ tweetId: '123456' }),
            }))
        })
    })

    it('handles like button click', async () => {
        mockDefaultFetches()
        render(<TweetsFeed />)

        await waitFor(() => {
            expect(screen.getByText('Hello World')).toBeInTheDocument()
        })

        // Mock like API call
        mockFetch.mockResolvedValueOnce({
            json: () => Promise.resolve({ success: true }),
        })

        // Find and click the like button (has like count "20")
        const likeButton = screen.getByText('20')
        await act(async () => {
            fireEvent.click(likeButton.closest('button')!)
        })

        await waitFor(() => {
            expect(mockFetch).toHaveBeenCalledWith('/api/tweets/like', expect.objectContaining({
                method: 'POST',
                body: JSON.stringify({ tweetId: '123456' }),
            }))
        })
    })
})
