import { render, screen, fireEvent, waitFor, act } from '@testing-library/react'
import { HomeFeed } from '@/app/tweets/HomeFeed'

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

const successResponse = {
    success: true,
    data: {
        tweets: [sampleTweet],
        cursors: { top: 'cursor-top-1', bottom: 'cursor-bottom-1' },
        tab: 'for_you',
    },
}

describe('HomeFeed', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('renders tab buttons for For You and Following', async () => {
        mockFetch.mockResolvedValueOnce({
            json: () => Promise.resolve(successResponse),
        })

        render(<HomeFeed />)

        expect(screen.getByText('For You')).toBeInTheDocument()
        expect(screen.getByText('Following')).toBeInTheDocument()
    })

    it('fetches for_you tweets on mount when expanded', async () => {
        mockFetch.mockResolvedValueOnce({
            json: () => Promise.resolve(successResponse),
        })

        render(<HomeFeed />)

        await waitFor(() => {
            expect(mockFetch).toHaveBeenCalledWith(
                expect.stringContaining('/api/tweets/home?tab=for_you&count=20')
            )
        })
    })

    it('displays tweets after successful fetch', async () => {
        mockFetch.mockResolvedValueOnce({
            json: () => Promise.resolve(successResponse),
        })

        render(<HomeFeed />)

        await waitFor(() => {
            expect(screen.getByText('Hello World')).toBeInTheDocument()
        })
    })

    it('shows error message when fetch fails', async () => {
        mockFetch.mockResolvedValueOnce({
            json: () => Promise.resolve({ success: false, error: 'Rate limited' }),
        })

        render(<HomeFeed />)

        await waitFor(() => {
            expect(screen.getByText('Rate limited')).toBeInTheDocument()
        })
    })

    it('shows network error on fetch rejection', async () => {
        mockFetch.mockRejectedValueOnce(new Error('Network error'))

        render(<HomeFeed />)

        await waitFor(() => {
            expect(screen.getByText('Network error')).toBeInTheDocument()
        })
    })

    it('switches tabs and re-fetches tweets', async () => {
        // Initial for_you fetch
        mockFetch.mockResolvedValueOnce({
            json: () => Promise.resolve(successResponse),
        })

        render(<HomeFeed />)

        await waitFor(() => {
            expect(mockFetch).toHaveBeenCalledTimes(1)
        })

        // Switch to Following tab
        mockFetch.mockResolvedValueOnce({
            json: () => Promise.resolve({
                ...successResponse,
                data: { ...successResponse.data, tab: 'following' },
            }),
        })

        fireEvent.click(screen.getByText('Following'))

        await waitFor(() => {
            expect(mockFetch).toHaveBeenCalledWith(
                expect.stringContaining('tab=following')
            )
        })
    })

    it('collapses feed and shows message', async () => {
        mockFetch.mockResolvedValueOnce({
            json: () => Promise.resolve(successResponse),
        })

        render(<HomeFeed />)

        await waitFor(() => {
            expect(screen.getByText('Hello World')).toBeInTheDocument()
        })

        // Click header to collapse
        fireEvent.click(screen.getByText('Home Feed'))

        expect(screen.getByText('Feed collapsed to save bandwidth')).toBeInTheDocument()
    })

    it('does not refetch same tab on click', async () => {
        mockFetch.mockResolvedValueOnce({
            json: () => Promise.resolve(successResponse),
        })

        render(<HomeFeed />)

        await waitFor(() => {
            expect(mockFetch).toHaveBeenCalledTimes(1)
        })

        // Click same tab — should NOT trigger new fetch
        fireEvent.click(screen.getByText('For You'))

        expect(mockFetch).toHaveBeenCalledTimes(1)
    })

    it('calls onUserClick when username is clicked', async () => {
        mockFetch.mockResolvedValueOnce({
            json: () => Promise.resolve(successResponse),
        })

        const onUserClick = jest.fn()
        render(<HomeFeed onUserClick={onUserClick} />)

        await waitFor(() => {
            expect(screen.getByText('Hello World')).toBeInTheDocument()
        })

        // Click the @username link
        fireEvent.click(screen.getByText('@testuser'))

        expect(onUserClick).toHaveBeenCalledWith('testuser')
    })

    it('shows tweet count in header', async () => {
        mockFetch.mockResolvedValueOnce({
            json: () => Promise.resolve(successResponse),
        })

        render(<HomeFeed />)

        await waitFor(() => {
            expect(screen.getByText('1 tweets')).toBeInTheDocument()
        })
    })

    it('handles repost button click', async () => {
        mockFetch.mockResolvedValueOnce({
            json: () => Promise.resolve(successResponse),
        })

        render(<HomeFeed />)

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
        mockFetch.mockResolvedValueOnce({
            json: () => Promise.resolve(successResponse),
        })

        render(<HomeFeed />)

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
