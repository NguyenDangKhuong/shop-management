import { render, waitFor } from '@testing-library/react'

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
    id: '999',
    text: 'Pinned user tweet',
    createdAt: '2026-03-05T00:00:00.000Z',
    user: {
        name: 'Pinned User',
        screenName: 'pinneduser',
        avatar: 'https://pbs.twimg.com/test.jpg',
        verified: true,
    },
    metrics: { replies: 1, retweets: 2, likes: 3, views: 10 },
    media: [],
    isRetweet: false,
}

function mockGraphQLFetch() {
    mockFetch.mockImplementation((url: string) => {
        if (url.includes('/api/tweets/graphql')) {
            return Promise.resolve({
                json: () => Promise.resolve({
                    success: true,
                    data: {
                        tweets: [sampleTweet],
                        cursors: { bottom: '' },
                    },
                }),
            })
        }
        return Promise.resolve({ json: () => Promise.resolve({ success: false }) })
    })
}

describe('Sub-page routing', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('PinnedPage renders GraphQLTweets with pinned username', async () => {
        mockGraphQLFetch()

        // Lazy import to pick up mocks
        const { default: PinnedPage } = await import('@/app/tweets/pinned/page')
        render(<PinnedPage />)

        await waitFor(() => {
            expect(mockFetch).toHaveBeenCalledWith(
                expect.stringContaining('/api/tweets/graphql?')
            )
        })
    })

    it('LikesPage renders GraphQLTweets with likes endpoint', async () => {
        mockGraphQLFetch()

        const { default: LikesPage } = await import('@/app/tweets/likes/page')
        render(<LikesPage />)

        await waitFor(() => {
            expect(mockFetch).toHaveBeenCalledWith(
                expect.stringContaining('/api/tweets/graphql/likes?')
            )
        })
    })

    it('ForYouPage renders HomeFeed with for_you tab', async () => {
        mockFetch.mockImplementation(() =>
            Promise.resolve({
                json: () => Promise.resolve({
                    success: true,
                    data: {
                        tweets: [{ ...sampleTweet, text: 'For You tweet' }],
                        cursors: { bottom: '' },
                    },
                }),
            })
        )

        const { default: ForYouPage } = await import('@/app/tweets/for-you/page')
        render(<ForYouPage />)

        await waitFor(() => {
            expect(mockFetch).toHaveBeenCalledWith(
                expect.stringContaining('tab=for_you')
            )
        })
    })

    it('FollowingPage renders HomeFeed with following tab', async () => {
        mockFetch.mockImplementation(() =>
            Promise.resolve({
                json: () => Promise.resolve({
                    success: true,
                    data: {
                        tweets: [{ ...sampleTweet, text: 'Following tweet' }],
                        cursors: { bottom: '' },
                    },
                }),
            })
        )

        const { default: FollowingPage } = await import('@/app/tweets/following/page')
        render(<FollowingPage />)

        await waitFor(() => {
            expect(mockFetch).toHaveBeenCalledWith(
                expect.stringContaining('tab=following')
            )
        })
    })
})
