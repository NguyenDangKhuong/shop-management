import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { HomeFeed } from '@/app/tweets/HomeFeed'

// Mock next/navigation
const mockPush = jest.fn()
jest.mock('next/navigation', () => ({
    useRouter: () => ({ push: mockPush }),
}))

// Mock fetch
const mockFetch = jest.fn()
global.fetch = mockFetch

// Mock IntersectionObserver
global.IntersectionObserver = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
}))

const sampleTweet = {
    id: '123456',
    text: 'Hello from HomeFeed',
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
        cursors: { top: 'top-1', bottom: 'bottom-1' },
    },
}

function mockHomeFetch() {
    mockFetch.mockImplementation((url: string) => {
        if (url.includes('/api/tweets/home')) {
            return Promise.resolve({ json: () => Promise.resolve(homeResponse) })
        }
        return Promise.resolve({ json: () => Promise.resolve({ success: false }) })
    })
}

describe('HomeFeed', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('fetches for_you tweets when tab is for_you', async () => {
        mockHomeFetch()
        render(<HomeFeed tab="for_you" />)

        await waitFor(() => {
            expect(mockFetch).toHaveBeenCalledWith(
                expect.stringContaining('tab=for_you&count=20')
            )
        })
    })

    it('fetches following tweets when tab is following', async () => {
        mockHomeFetch()
        render(<HomeFeed tab="following" />)

        await waitFor(() => {
            expect(mockFetch).toHaveBeenCalledWith(
                expect.stringContaining('tab=following&count=20')
            )
        })
    })

    it('displays tweets after fetch', async () => {
        mockHomeFetch()
        render(<HomeFeed tab="for_you" />)

        await waitFor(() => {
            expect(screen.getByText('Hello from HomeFeed')).toBeInTheDocument()
        })
    })

    it('shows For You header when tab is for_you', async () => {
        mockHomeFetch()
        render(<HomeFeed tab="for_you" />)

        await waitFor(() => {
            expect(screen.getByText('For You')).toBeInTheDocument()
        })
    })

    it('shows Following header when tab is following', async () => {
        mockHomeFetch()
        render(<HomeFeed tab="following" />)

        await waitFor(() => {
            expect(screen.getByText('Following')).toBeInTheDocument()
        })
    })

    it('shows tweet count', async () => {
        mockHomeFetch()
        render(<HomeFeed tab="for_you" />)

        await waitFor(() => {
            expect(screen.getByText('1 tweets')).toBeInTheDocument()
        })
    })

    it('navigates to user page when @username clicked', async () => {
        mockHomeFetch()
        render(<HomeFeed tab="for_you" />)

        await waitFor(() => {
            expect(screen.getByText('Hello from HomeFeed')).toBeInTheDocument()
        })

        fireEvent.click(screen.getByText('@testuser'))

        expect(mockPush).toHaveBeenCalledWith('/tweets/user/testuser')
    })

    it('shows error message on failed fetch', async () => {
        mockFetch.mockImplementation(() =>
            Promise.resolve({
                json: () => Promise.resolve({ success: false, error: 'Rate limited' }),
            })
        )
        render(<HomeFeed tab="for_you" />)

        await waitFor(() => {
            expect(screen.getByText('Rate limited')).toBeInTheDocument()
        })
    })

    it('shows network error on rejection', async () => {
        mockFetch.mockImplementation(() => Promise.reject(new Error('fail')))
        render(<HomeFeed tab="for_you" />)

        await waitFor(() => {
            expect(screen.getByText('Network error')).toBeInTheDocument()
        })
    })

    it('shows retry button on error', async () => {
        mockFetch.mockImplementation(() =>
            Promise.resolve({
                json: () => Promise.resolve({ success: false, error: 'Error' }),
            })
        )
        render(<HomeFeed tab="for_you" />)

        await waitFor(() => {
            expect(screen.getByText('Thử lại')).toBeInTheDocument()
        })
    })
})
