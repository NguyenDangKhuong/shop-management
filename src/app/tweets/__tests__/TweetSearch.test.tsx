import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { TweetSearch } from '@/app/tweets/TweetSearch'

// Mock fetch
const mockFetch = jest.fn()
global.fetch = mockFetch

describe('TweetSearch', () => {
    beforeEach(() => {
        jest.clearAllMocks()
        // Default: return empty users list on mount
        mockFetch.mockResolvedValueOnce({
            json: () => Promise.resolve({ success: true, data: [] })
        })
    })

    it('renders the add input and button', async () => {
        render(<TweetSearch />)

        await waitFor(() => {
            expect(screen.getByPlaceholderText(/Nhập username/)).toBeInTheDocument()
            expect(screen.getByRole('button', { name: /Thêm/ })).toBeInTheDocument()
        })
    })

    it('shows empty state when no users saved', async () => {
        render(<TweetSearch />)

        await waitFor(() => {
            expect(screen.getByText(/Thêm username X/)).toBeInTheDocument()
        })
    })

    it('adds a username via POST', async () => {
        render(<TweetSearch />)

        await waitFor(() => expect(mockFetch).toHaveBeenCalledTimes(1))

        const input = screen.getByPlaceholderText(/Nhập username/)
        fireEvent.change(input, { target: { value: 'vercel' } })

        mockFetch.mockResolvedValueOnce({
            json: () => Promise.resolve({
                success: true,
                data: { _id: '1', username: 'vercel' }
            })
        })

        fireEvent.click(screen.getByRole('button', { name: /Thêm/ }))

        await waitFor(() => {
            expect(mockFetch).toHaveBeenCalledWith('/api/twitter-users', expect.objectContaining({
                method: 'POST',
                body: JSON.stringify({ username: 'vercel' }),
            }))
        })
    })

    it('strips @ prefix from username', async () => {
        render(<TweetSearch />)

        await waitFor(() => expect(mockFetch).toHaveBeenCalledTimes(1))

        const input = screen.getByPlaceholderText(/Nhập username/)
        fireEvent.change(input, { target: { value: '@reactjs' } })

        mockFetch.mockResolvedValueOnce({
            json: () => Promise.resolve({
                success: true,
                data: { _id: '2', username: 'reactjs' }
            })
        })

        fireEvent.click(screen.getByRole('button', { name: /Thêm/ }))

        await waitFor(() => {
            expect(mockFetch).toHaveBeenCalledWith('/api/twitter-users', expect.objectContaining({
                body: JSON.stringify({ username: 'reactjs' }),
            }))
        })
    })

    it('shows error for duplicate username', async () => {
        render(<TweetSearch />)

        await waitFor(() => expect(mockFetch).toHaveBeenCalledTimes(1))

        const input = screen.getByPlaceholderText(/Nhập username/)
        fireEvent.change(input, { target: { value: 'vercel' } })

        mockFetch.mockResolvedValueOnce({
            json: () => Promise.resolve({
                success: false,
                error: 'Username đã tồn tại'
            })
        })

        fireEvent.click(screen.getByRole('button', { name: /Thêm/ }))

        await waitFor(() => {
            expect(screen.getByText('Username đã tồn tại')).toBeInTheDocument()
        })
    })

    it('disables button when input is empty', async () => {
        render(<TweetSearch />)

        await waitFor(() => {
            expect(screen.getByRole('button', { name: /Thêm/ })).toBeDisabled()
        })
    })

    it('adds username on Enter key', async () => {
        render(<TweetSearch />)

        await waitFor(() => expect(mockFetch).toHaveBeenCalledTimes(1))

        const input = screen.getByPlaceholderText(/Nhập username/)
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
        mockFetch.mockResolvedValueOnce({
            json: () => Promise.resolve({
                success: true,
                data: [
                    { _id: '1', username: 'vercel' },
                    { _id: '2', username: 'reactjs' },
                ]
            })
        })

        render(<TweetSearch />)

        // Check for Tất cả filter button (appears when users exist)
        await waitFor(() => {
            expect(screen.getByText('Tất cả')).toBeInTheDocument()
        })

        // Check user tags exist via title attributes
        expect(screen.getByTitle('Xóa @vercel')).toBeInTheDocument()
        expect(screen.getByTitle('Xóa @reactjs')).toBeInTheDocument()
    })

    it('shows confirm popup when clicking delete', async () => {
        mockFetch.mockReset()
        mockFetch.mockResolvedValueOnce({
            json: () => Promise.resolve({
                success: true,
                data: [{ _id: '1', username: 'vercel' }]
            })
        })

        render(<TweetSearch />)

        await waitFor(() => {
            expect(screen.getByTitle('Xóa @vercel')).toBeInTheDocument()
        })

        fireEvent.click(screen.getByTitle('Xóa @vercel'))

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

        render(<TweetSearch />)

        await waitFor(() => {
            expect(screen.getByTitle('Xóa @vercel')).toBeInTheDocument()
        })

        fireEvent.click(screen.getByTitle('Xóa @vercel'))
        fireEvent.click(screen.getByRole('button', { name: 'Hủy' }))

        expect(screen.queryByText('Xóa username?')).not.toBeInTheDocument()
        expect(screen.getByTitle('Xóa @vercel')).toBeInTheDocument()
    })
})
