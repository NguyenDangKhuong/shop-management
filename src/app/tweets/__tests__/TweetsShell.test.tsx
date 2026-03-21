import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { TweetsShell } from '@/app/tweets/TweetsShell'

// Mock next/navigation
const mockPush = jest.fn()
const mockBack = jest.fn()
let mockPathname = '/tweets/for-you'

jest.mock('next/navigation', () => ({
    useRouter: () => ({ push: mockPush, back: mockBack }),
    usePathname: () => mockPathname,
    Link: jest.fn(({ href, children, className }: any) => (
        <a href={href} className={className}>{children}</a>
    )),
}))

// Mock next/link
jest.mock('next/link', () => {
    return jest.fn(({ href, children, className }: any) => (
        <a href={href} className={className}>{children}</a>
    ))
})

// Mock fetch
const mockFetch = jest.fn()
global.fetch = mockFetch

// Mock child components
jest.mock('@/app/tweets/TweetSearch', () => ({
    TweetSearch: () => <div data-testid="tweet-search">TweetSearch</div>,
}))
jest.mock('@/app/tweets/BackToTop', () => ({
    BackToTop: () => <div data-testid="back-to-top">BackToTop</div>,
}))

describe('TweetsShell', () => {
    beforeEach(() => {
        jest.clearAllMocks()
        mockPathname = '/tweets/for-you'
        mockFetch.mockImplementation((url: string) => {
            if (url.includes('/api/twitter-users')) {
                return Promise.resolve({
                    json: () => Promise.resolve({
                        success: true,
                        data: [{ _id: 'u1', username: 'saveduser1' }],
                    }),
                })
            }
            return Promise.resolve({ json: () => Promise.resolve({ success: false }) })
        })
    })

    it('renders title', () => {
        render(<TweetsShell><div>content</div></TweetsShell>)
        expect(screen.getByText('Tweets')).toBeInTheDocument()
    })

    it('renders all tab links', () => {
        render(<TweetsShell><div>content</div></TweetsShell>)
        expect(screen.getByText('For You')).toBeInTheDocument()
        expect(screen.getByText('Following')).toBeInTheDocument()
        expect(screen.getByText('Liked')).toBeInTheDocument()
    })

    it('renders tab links with correct href', () => {
        render(<TweetsShell><div>content</div></TweetsShell>)
        const forYouLink = screen.getByText('For You').closest('a')
        const followingLink = screen.getByText('Following').closest('a')
        expect(forYouLink).toHaveAttribute('href', '/tweets/for-you')
        expect(followingLink).toHaveAttribute('href', '/tweets/following')
    })

    it('renders children', () => {
        render(<TweetsShell><div data-testid="child">Hello</div></TweetsShell>)
        expect(screen.getByTestId('child')).toBeInTheDocument()
    })

    it('renders TweetSearch component', () => {
        render(<TweetsShell><div>content</div></TweetsShell>)
        expect(screen.getByTestId('tweet-search')).toBeInTheDocument()
    })

    it('renders BackToTop component', () => {
        render(<TweetsShell><div>content</div></TweetsShell>)
        expect(screen.getByTestId('back-to-top')).toBeInTheDocument()
    })

    it('shows Browse user button', () => {
        render(<TweetsShell><div>content</div></TweetsShell>)
        expect(screen.getByText('Browse user')).toBeInTheDocument()
    })

    it('shows search input when Browse user clicked', () => {
        render(<TweetsShell><div>content</div></TweetsShell>)
        fireEvent.click(screen.getByText('Browse user'))
        expect(screen.getByPlaceholderText('Enter @username to browse...')).toBeInTheDocument()
    })

    it('navigates to user page on search submit', async () => {
        render(<TweetsShell><div>content</div></TweetsShell>)

        fireEvent.click(screen.getByText('Browse user'))

        const input = screen.getByPlaceholderText('Enter @username to browse...')
        fireEvent.change(input, { target: { value: 'elonmusk' } })
        fireEvent.click(screen.getByText('Browse', { selector: 'button' }))

        expect(mockPush).toHaveBeenCalledWith('/tweets/user/elonmusk')
    })

    it('navigates on Enter key', async () => {
        render(<TweetsShell><div>content</div></TweetsShell>)

        fireEvent.click(screen.getByText('Browse user'))

        const input = screen.getByPlaceholderText('Enter @username to browse...')
        fireEvent.change(input, { target: { value: 'vercel' } })
        fireEvent.keyDown(input, { key: 'Enter' })

        expect(mockPush).toHaveBeenCalledWith('/tweets/user/vercel')
    })

    it('strips @ prefix from input', async () => {
        render(<TweetsShell><div>content</div></TweetsShell>)

        fireEvent.click(screen.getByText('Browse user'))

        const input = screen.getByPlaceholderText('Enter @username to browse...')
        fireEvent.change(input, { target: { value: '@reactjs' } })
        fireEvent.click(screen.getByText('Browse', { selector: 'button' }))

        expect(mockPush).toHaveBeenCalledWith('/tweets/user/reactjs')
    })

    it('shows saved user tags after expanding search', async () => {
        render(<TweetsShell><div>content</div></TweetsShell>)

        fireEvent.click(screen.getByText('Browse user'))

        await waitFor(() => {
            expect(screen.getByText('@saveduser1')).toBeInTheDocument()
        })
    })

    it('navigates when clicking user tag', async () => {
        render(<TweetsShell><div>content</div></TweetsShell>)

        fireEvent.click(screen.getByText('Browse user'))

        await waitFor(() => {
            expect(screen.getByText('@saveduser1')).toBeInTheDocument()
        })

        fireEvent.click(screen.getByText('@saveduser1'))
        expect(mockPush).toHaveBeenCalledWith('/tweets/user/saveduser1')
    })

    it('shows back button when on user page', () => {
        mockPathname = '/tweets/user/testuser'
        render(<TweetsShell><div>content</div></TweetsShell>)
        expect(screen.getByText('Back to feed')).toBeInTheDocument()
    })

    it('calls router.back when back button clicked', () => {
        mockPathname = '/tweets/user/testuser'
        render(<TweetsShell><div>content</div></TweetsShell>)

        fireEvent.click(screen.getByText('Back to feed'))
        expect(mockBack).toHaveBeenCalled()
    })

    it('does not show back button on feed pages', () => {
        mockPathname = '/tweets/for-you'
        render(<TweetsShell><div>content</div></TweetsShell>)
        expect(screen.queryByText('Back to feed')).not.toBeInTheDocument()
    })
})
