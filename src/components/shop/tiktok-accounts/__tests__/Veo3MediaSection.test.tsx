import { render, screen } from '@testing-library/react'
import Veo3MediaSection from '../Veo3MediaSection'

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

// Mock useCloudinaryUpload hook
jest.mock('@/hooks/useCloudinaryUpload', () => ({
    useCloudinaryUpload: jest.fn(() => ({
        openWidget: jest.fn(),
        isUploading: false
    }))
}))

// Mock cloudinary actions
jest.mock('@/actions/cloudinary', () => ({
    deleteCloudinaryImage: jest.fn().mockResolvedValue(undefined)
}))

// Mock cloudinary config
jest.mock('@/utils/cloudinaryConfig', () => ({
    veo3MediaUploadConfig: {}
}))

// Mock Ant Design App context
jest.mock('antd', () => {
    const actual = jest.requireActual('antd')
    return {
        ...actual,
        App: {
            useApp: () => ({
                message: {
                    success: jest.fn(),
                    error: jest.fn(),
                    info: jest.fn()
                }
            })
        }
    }
})

describe('Veo3MediaSection', () => {
    const mockOnRefresh = jest.fn()

    const mockVeo3Media = [
        {
            _id: 'vm_1',
            mediaId: 'CAMaJDBjOWRk',
            mediaFile: {
                url: 'https://res.cloudinary.com/test/image/upload/v1/veo3/abc.jpg',
                type: 'image',
                publicId: 'veo3/abc'
            }
        },
        {
            _id: 'vm_2',
            mediaId: 'XYZ123456789',
            mediaFile: null
        }
    ]

    const defaultProps = {
        accountId: 'acc_1',
        veo3Media: mockVeo3Media,
        veo3MediaLoading: false,
        onRefresh: mockOnRefresh
    }

    beforeEach(() => {
        jest.clearAllMocks()
    })

    // --- Basic Rendering ---

    it('renders add media input and buttons', () => {
        render(<Veo3MediaSection {...defaultProps} />)

        expect(screen.getByPlaceholderText('Nhập Media ID...')).toBeInTheDocument()
        expect(screen.getByText('📷 Upload')).toBeInTheDocument()
        expect(screen.getByText('Thêm')).toBeInTheDocument()
    })

    it('renders media list with items', () => {
        render(<Veo3MediaSection {...defaultProps} />)

        expect(screen.getByText('CAMaJDBjOWRk')).toBeInTheDocument()
        expect(screen.getByText('XYZ123456789')).toBeInTheDocument()
    })

    it('shows thumbnail for media with image', () => {
        render(<Veo3MediaSection {...defaultProps} />)

        const img = screen.getByAltText('CAMaJDBjOWRk')
        expect(img).toBeInTheDocument()
        expect(img).toHaveAttribute('src', 'https://res.cloudinary.com/test/image/upload/v1/veo3/abc.jpg')
    })

    it('shows "No image" for media without file', () => {
        render(<Veo3MediaSection {...defaultProps} />)

        expect(screen.getByText('No image')).toBeInTheDocument()
    })

    it('shows loading spinner when loading', () => {
        render(<Veo3MediaSection {...defaultProps} veo3MediaLoading={true} />)

        expect(screen.getByPlaceholderText('Nhập Media ID...')).toBeInTheDocument()
        // Spin component renders
        expect(document.querySelector('.ant-spin')).toBeInTheDocument()
    })

    it('shows empty message when no media', () => {
        render(<Veo3MediaSection {...defaultProps} veo3Media={[]} />)

        expect(screen.getByText('Chưa có media nào')).toBeInTheDocument()
    })

    it('disables add button when media ID is empty', () => {
        render(<Veo3MediaSection {...defaultProps} />)

        const addButton = screen.getByText('Thêm').closest('button')
        expect(addButton).toBeDisabled()
    })

    it('shows delete image button only for media with publicId', () => {
        render(<Veo3MediaSection {...defaultProps} />)

        const deleteImageButtons = screen.getAllByTitle('Xóa hình')
        expect(deleteImageButtons).toHaveLength(1) // Only vm_1 has mediaFile.publicId
    })

    it('shows edit and upload buttons for each media item', () => {
        render(<Veo3MediaSection {...defaultProps} />)

        const editButtons = screen.getAllByTitle('Sửa Media ID')
        expect(editButtons).toHaveLength(2)

        const uploadButtons = screen.getAllByTitle('Upload hình')
        // 2 items + 1 in the add section
        expect(uploadButtons.length).toBeGreaterThanOrEqual(2)
    })
})
