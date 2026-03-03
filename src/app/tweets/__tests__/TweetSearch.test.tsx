import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { TweetSearch } from '@/app/tweets/TweetSearch'

// Mock fetch
const mockFetch = jest.fn()
global.fetch = mockFetch

/**
 * Helper: expand the collapsed "Embed Tweets" section.
 * In jsdom, both mobile overlay + desktop section render (no CSS media queries),
 * so `mainContent` appears twice. We use getAllBy and pick the last toggle (desktop).
 */
const expandSection = () => {
    const toggles = screen.getAllByRole('button', { name: /Embed Tweets/ })
    fireEvent.click(toggles[toggles.length - 1])
}

/**
 * Helper: click ⚙️ toggle to show controls (input + Thêm button).
 * Must wait for fetch calls to complete first, then expand section.
 */
const openControls = async () => {
    await waitFor(() => expect(mockFetch).toHaveBeenCalledTimes(2))
    expandSection()
    // After expanding, mainContent renders in BOTH mobile + desktop views in jsdom.
    // The controls toggle will also appear twice — grab all and click the first.
    const toggles = screen.getAllByTitle('Hiển thị/Ẩn controls')
    fireEvent.click(toggles[0])
}

describe('TweetSearch', () => {
    beforeEach(() => {
        jest.clearAllMocks()
        // Default: return empty users list on mount (fetchUsers)
        mockFetch.mockResolvedValueOnce({
            json: () => Promise.resolve({ success: true, data: [] })
        })
        // Default: no cookie status (fetchCookieStatus)
        mockFetch.mockResolvedValueOnce({
            json: () => Promise.resolve({ success: false })
        })
    })

    it('renders the add input and button after toggling controls', async () => {
        render(<TweetSearch />)

        await openControls()

        // mainContent renders twice (mobile+desktop), so use getAllBy
        expect(screen.getAllByPlaceholderText(/Nhập username/)[0]).toBeInTheDocument()
        expect(screen.getAllByRole('button', { name: /Thêm/ })[0]).toBeInTheDocument()
    })

    it('shows empty state when no users saved', async () => {
        render(<TweetSearch />)

        await waitFor(() => expect(mockFetch).toHaveBeenCalledTimes(2))
        expandSection()

        await waitFor(() => {
            expect(screen.getAllByText(/Thêm username X/)[0]).toBeInTheDocument()
        })
    })

    it('adds a username via POST', async () => {
        render(<TweetSearch />)

        await openControls()

        const input = screen.getAllByPlaceholderText(/Nhập username/)[0]
        fireEvent.change(input, { target: { value: 'vercel' } })

        mockFetch.mockResolvedValueOnce({
            json: () => Promise.resolve({
                success: true,
                data: { _id: '1', username: 'vercel' }
            })
        })

        fireEvent.click(screen.getAllByRole('button', { name: /Thêm/ })[0])

        await waitFor(() => {
            expect(mockFetch).toHaveBeenCalledWith('/api/twitter-users', expect.objectContaining({
                method: 'POST',
                body: JSON.stringify({ username: 'vercel' }),
            }))
        })
    })

    it('strips @ prefix from username', async () => {
        render(<TweetSearch />)

        await openControls()

        const input = screen.getAllByPlaceholderText(/Nhập username/)[0]
        fireEvent.change(input, { target: { value: '@reactjs' } })

        mockFetch.mockResolvedValueOnce({
            json: () => Promise.resolve({
                success: true,
                data: { _id: '2', username: 'reactjs' }
            })
        })

        fireEvent.click(screen.getAllByRole('button', { name: /Thêm/ })[0])

        await waitFor(() => {
            expect(mockFetch).toHaveBeenCalledWith('/api/twitter-users', expect.objectContaining({
                body: JSON.stringify({ username: 'reactjs' }),
            }))
        })
    })

    it('shows error for duplicate username', async () => {
        render(<TweetSearch />)

        await openControls()

        const input = screen.getAllByPlaceholderText(/Nhập username/)[0]
        fireEvent.change(input, { target: { value: 'vercel' } })

        mockFetch.mockResolvedValueOnce({
            json: () => Promise.resolve({
                success: false,
                error: 'Username đã tồn tại'
            })
        })

        fireEvent.click(screen.getAllByRole('button', { name: /Thêm/ })[0])

        await waitFor(() => {
            expect(screen.getAllByText('Username đã tồn tại')[0]).toBeInTheDocument()
        })
    })

    it('disables button when input is empty', async () => {
        render(<TweetSearch />)

        await openControls()

        expect(screen.getAllByRole('button', { name: /Thêm/ })[0]).toBeDisabled()
    })

    it('adds username on Enter key', async () => {
        render(<TweetSearch />)

        await openControls()

        const input = screen.getAllByPlaceholderText(/Nhập username/)[0]
        fireEvent.change(input, { target: { value: 'nextjs' } })

        mockFetch.mockResolvedValueOnce({
            json: () => Promise.resolve({
                success: true,
                data: { _id: '3', username: 'nextjs' }
            })
        })

        fireEvent.keyDown(input, { key: 'Enter' })

        await waitFor(() => {
            expect(mockFetch).toHaveBeenCalledWith('/api/twitter-users', expect.objectContaining({
                method: 'POST',
            }))
        })
    })

    it('loads and displays saved users on mount', async () => {
        mockFetch.mockReset()
        // Mock fetchUsers
        mockFetch.mockResolvedValueOnce({
            json: () => Promise.resolve({
                success: true,
                data: [
                    { _id: '1', username: 'vercel' },
                    { _id: '2', username: 'reactjs' },
                ]
            })
        })
        // Mock fetchCookieStatus
        mockFetch.mockResolvedValueOnce({
            json: () => Promise.resolve({ success: false })
        })

        render(<TweetSearch />)

        // Wait for fetches to complete, then expand to see content
        await waitFor(() => expect(mockFetch).toHaveBeenCalledTimes(2))
        expandSection()

        // Check user tags exist (may appear twice due to mobile+desktop rendering)
        await waitFor(() => {
            expect(screen.getAllByTitle('Xóa @vercel')[0]).toBeInTheDocument()
        })
        expect(screen.getAllByTitle('Xóa @reactjs')[0]).toBeInTheDocument()
    })

    it('shows confirm popup when clicking delete', async () => {
        mockFetch.mockReset()
        mockFetch.mockResolvedValueOnce({
            json: () => Promise.resolve({
                success: true,
                data: [{ _id: '1', username: 'vercel' }]
            })
        })
        mockFetch.mockResolvedValueOnce({
            json: () => Promise.resolve({ success: false })
        })

        render(<TweetSearch />)

        await waitFor(() => expect(mockFetch).toHaveBeenCalledTimes(2))
        expandSection()

        await waitFor(() => {
            expect(screen.getAllByTitle('Xóa @vercel')[0]).toBeInTheDocument()
        })

        fireEvent.click(screen.getAllByTitle('Xóa @vercel')[0])

        expect(screen.getByText('Xóa username?')).toBeInTheDocument()
        expect(screen.getByRole('button', { name: 'Hủy' })).toBeInTheDocument()
        expect(screen.getByRole('button', { name: 'Xóa' })).toBeInTheDocument()
    })

    it('cancels delete on Hủy click', async () => {
        mockFetch.mockReset()
        mockFetch.mockResolvedValueOnce({
            json: () => Promise.resolve({
                success: true,
                data: [{ _id: '1', username: 'vercel' }]
            })
        })
        mockFetch.mockResolvedValueOnce({
            json: () => Promise.resolve({ success: false })
        })

        render(<TweetSearch />)

        await waitFor(() => expect(mockFetch).toHaveBeenCalledTimes(2))
        expandSection()

        await waitFor(() => {
            expect(screen.getAllByTitle('Xóa @vercel')[0]).toBeInTheDocument()
        })

        fireEvent.click(screen.getAllByTitle('Xóa @vercel')[0])
        fireEvent.click(screen.getByRole('button', { name: 'Hủy' }))

        expect(screen.queryByText('Xóa username?')).not.toBeInTheDocument()
        expect(screen.getAllByTitle('Xóa @vercel')[0]).toBeInTheDocument()
    })
})
