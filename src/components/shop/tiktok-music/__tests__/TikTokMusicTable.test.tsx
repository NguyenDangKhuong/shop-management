import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import TikTokMusicTable from '../TikTokMusicTable'

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
    })),
})

// Mock react-device-detect
jest.mock('react-device-detect', () => ({
    isMobile: false
}))

// Mock useCloudinaryUpload hook
const mockOpenWidget = jest.fn()
jest.mock('@/hooks/useCloudinaryUpload', () => ({
    useCloudinaryUpload: jest.fn(() => ({
        openWidget: mockOpenWidget,
        isUploading: false
    }))
}))

// Mock cloudinaryConfig
jest.mock('@/utils/cloudinaryConfig', () => ({
    tiktokMusicUploadConfig: {},
    createUploadWidget: jest.fn()
}))

// Mock internalApi
const mockApiGet = jest.fn()
const mockApiPost = jest.fn()
const mockApiPut = jest.fn()
const mockApiDelete = jest.fn()
jest.mock('@/utils/internalApi', () => ({
    apiGet: (...args: any[]) => mockApiGet(...args),
    apiPost: (...args: any[]) => mockApiPost(...args),
    apiPut: (...args: any[]) => mockApiPut(...args),
    apiDelete: (...args: any[]) => mockApiDelete(...args)
}))

// Mock deleteCloudinaryImage
jest.mock('@/actions/cloudinary', () => ({
    deleteCloudinaryImage: jest.fn().mockResolvedValue({ success: true })
}))

// Mock Ant Design App context
const mockMessage = {
    success: jest.fn(),
    error: jest.fn(),
    warning: jest.fn()
}
jest.mock('antd', () => {
    const actual = jest.requireActual('antd')
    return {
        ...actual,
        App: {
            useApp: () => ({
                message: mockMessage
            })
        }
    }
})

describe('TikTokMusicTable', () => {
    beforeEach(() => {
        jest.clearAllMocks()
        mockApiGet.mockResolvedValue({
            success: true,
            data: [
                {
                    _id: 'music_1',
                    name: 'Bài hát test',
                    music: { url: 'https://example.com/music.mp3', type: 'audio', publicId: 'test_id' },
                    createdAt: '2026-02-09T00:00:00Z'
                },
                {
                    _id: 'music_2',
                    name: 'Bài hát không có file',
                    createdAt: '2026-02-09T00:00:00Z'
                }
            ]
        })
    })

    it('renders the page title', async () => {
        render(<TikTokMusicTable />)

        await waitFor(() => {
            expect(screen.getByText(/TikTok Music/)).toBeInTheDocument()
        })
    })

    it('renders the add button', async () => {
        render(<TikTokMusicTable />)

        await waitFor(() => {
            expect(screen.getByText('Thêm nhạc')).toBeInTheDocument()
        })
    })

    it('opens modal when clicking add button', async () => {
        render(<TikTokMusicTable />)

        await waitFor(() => {
            expect(screen.getByText('Thêm nhạc')).toBeInTheDocument()
        })

        fireEvent.click(screen.getByText('Thêm nhạc'))

        expect(screen.getByText('Thêm bài hát mới')).toBeInTheDocument()
    })

    it('modal shows name input field', async () => {
        render(<TikTokMusicTable />)

        await waitFor(() => {
            expect(screen.getByText('Thêm nhạc')).toBeInTheDocument()
        })

        fireEvent.click(screen.getByText('Thêm nhạc'))

        // 'Tên bài hát' appears in table column header + modal label
        const labels = screen.getAllByText('Tên bài hát')
        expect(labels.length).toBeGreaterThanOrEqual(2)
        expect(screen.getByPlaceholderText('Nhập tên bài hát...')).toBeInTheDocument()
    })

    it('modal shows file upload section', async () => {
        render(<TikTokMusicTable />)

        await waitFor(() => {
            expect(screen.getByText('Thêm nhạc')).toBeInTheDocument()
        })

        fireEvent.click(screen.getByText('Thêm nhạc'))

        // 'File nhạc' appears both in table header and modal form label
        const fileNhacLabels = screen.getAllByText('File nhạc')
        expect(fileNhacLabels.length).toBeGreaterThanOrEqual(2) // table column + modal label

        // 'Upload nhạc' in the modal
        const uploadButtons = screen.getAllByText('Upload nhạc')
        expect(uploadButtons.length).toBeGreaterThanOrEqual(1)
    })

    it('modal has Lưu and Hủy buttons', async () => {
        render(<TikTokMusicTable />)

        await waitFor(() => {
            expect(screen.getByText('Thêm nhạc')).toBeInTheDocument()
        })

        fireEvent.click(screen.getByText('Thêm nhạc'))

        expect(screen.getByText('Lưu')).toBeInTheDocument()
        expect(screen.getByText('Hủy')).toBeInTheDocument()
    })

    it('submits form with name and music data', async () => {
        mockApiPost.mockResolvedValue({ success: true })

        render(<TikTokMusicTable />)

        await waitFor(() => {
            expect(screen.getByText('Thêm nhạc')).toBeInTheDocument()
        })

        fireEvent.click(screen.getByText('Thêm nhạc'))

        const nameInput = screen.getByPlaceholderText('Nhập tên bài hát...')
        fireEvent.change(nameInput, { target: { value: 'New Song' } })

        fireEvent.click(screen.getByText('Lưu'))

        await waitFor(() => {
            expect(mockApiPost).toHaveBeenCalledWith('/api/tiktok-music', expect.objectContaining({
                name: 'New Song'
            }))
        })
    })

    it('shows edit modal with correct title when editing', async () => {
        render(<TikTokMusicTable />)

        await waitFor(() => {
            expect(screen.getByText('Bài hát test')).toBeInTheDocument()
        })

        // Click edit icon - find the edit icons
        const editIcons = document.querySelectorAll('.anticon-edit')
        expect(editIcons.length).toBeGreaterThan(0)
        fireEvent.click(editIcons[0])

        expect(screen.getByText('Cập nhật bài hát')).toBeInTheDocument()
    })

    it('loads music list on mount', async () => {
        render(<TikTokMusicTable />)

        await waitFor(() => {
            expect(mockApiGet).toHaveBeenCalledWith('/api/tiktok-music')
        })
    })

    it('displays music items in the table', async () => {
        render(<TikTokMusicTable />)

        await waitFor(() => {
            expect(screen.getByText('Bài hát test')).toBeInTheDocument()
            expect(screen.getByText('Bài hát không có file')).toBeInTheDocument()
        })
    })

    it('shows upload button for items without music file', async () => {
        render(<TikTokMusicTable />)

        await waitFor(() => {
            expect(screen.getByText('Bài hát không có file')).toBeInTheDocument()
        })

        // The table should have Upload buttons for items without music
        const uploadButtons = screen.getAllByText('Upload')
        expect(uploadButtons.length).toBeGreaterThan(0)
    })

    it('opens upload widget when clicking Upload nhạc in modal', async () => {
        render(<TikTokMusicTable />)

        await waitFor(() => {
            expect(screen.getByText('Thêm nhạc')).toBeInTheDocument()
        })

        fireEvent.click(screen.getByText('Thêm nhạc'))

        // Find the Upload nhạc button(s) — modal's is the one we want
        const uploadButtons = screen.getAllByText('Upload nhạc')
        fireEvent.click(uploadButtons[0])

        expect(mockOpenWidget).toHaveBeenCalled()
    })
})
