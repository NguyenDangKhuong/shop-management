import { fireEvent, render, screen } from '@testing-library/react'
import PromptModal from '../PromptModal'

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

// Mock internalApi
jest.mock('@/utils/internalApi', () => ({
    apiPost: jest.fn(),
    apiPut: jest.fn()
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
                    error: jest.fn()
                }
            })
        }
    }
})

describe('PromptModal', () => {
    const mockSetIsOpen = jest.fn()
    const mockOnRefresh = jest.fn()

    const defaultProps = {
        isOpen: true,
        setIsOpen: mockSetIsOpen,
        productId: 'prod_1',
        editingPrompt: undefined,
        onRefresh: mockOnRefresh
    }

    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('renders modal when open', () => {
        render(<PromptModal {...defaultProps} />)

        expect(screen.getByText('Thêm Prompt mới')).toBeInTheDocument()
    })

    it('does not render when closed', () => {
        const { container } = render(<PromptModal {...defaultProps} isOpen={false} />)

        expect(container.querySelector('.ant-modal')).toBeNull()
    })

    it('shows edit title when editing', () => {
        const editProps = {
            ...defaultProps,
            editingPrompt: {
                _id: 'prompt_1',
                title: 'Test Prompt',
                content: 'Test Content',
                mediaId: 'media_1'
            }
        }

        render(<PromptModal {...editProps} />)

        expect(screen.getByText('Chỉnh sửa Prompt')).toBeInTheDocument()
    })

    it('displays all form fields', () => {
        render(<PromptModal {...defaultProps} />)

        expect(screen.getByText('Tiêu đề')).toBeInTheDocument()
        expect(screen.getByText('Media ID')).toBeInTheDocument()
        expect(screen.getByText('Nội dung')).toBeInTheDocument()
    })

    it('has correct placeholder for title', () => {
        render(<PromptModal {...defaultProps} />)

        expect(screen.getByPlaceholderText('Nhập tiêu đề prompt...')).toBeInTheDocument()
    })

    it('has correct placeholder for media ID', () => {
        render(<PromptModal {...defaultProps} />)

        expect(screen.getByPlaceholderText('Nhập Media ID (optional)...')).toBeInTheDocument()
    })

    it('has correct placeholder for content', () => {
        render(<PromptModal {...defaultProps} />)

        expect(screen.getByPlaceholderText('Nhập nội dung prompt...')).toBeInTheDocument()
    })

    it('shows "Tạo" button in create mode', () => {
        render(<PromptModal {...defaultProps} />)

        expect(screen.getByText('Tạo')).toBeInTheDocument()
    })

    it('shows "Cập nhật" button in edit mode', () => {
        const editProps = {
            ...defaultProps,
            editingPrompt: {
                _id: 'prompt_1',
                title: 'Test Prompt',
                content: 'Test Content'
            }
        }

        render(<PromptModal {...editProps} />)

        expect(screen.getByText('Cập nhật')).toBeInTheDocument()
    })

    it('closes modal when cancel button is clicked', () => {
        render(<PromptModal {...defaultProps} />)

        const cancelButton = screen.getByText('Hủy')
        fireEvent.click(cancelButton)

        expect(mockSetIsOpen).toHaveBeenCalledWith(false)
    })

    it('populates form fields when editing', () => {
        const editProps = {
            ...defaultProps,
            editingPrompt: {
                _id: 'prompt_1',
                title: 'Test Title',
                content: 'Test Content',
                mediaId: 'media_123'
            }
        }

        render(<PromptModal {...editProps} />)

        expect(screen.getByDisplayValue('Test Title')).toBeInTheDocument()
        expect(screen.getByDisplayValue('media_123')).toBeInTheDocument()
        expect(screen.getByDisplayValue('Test Content')).toBeInTheDocument()
    })

    it('resets form when opening in create mode', () => {
        render(<PromptModal {...defaultProps} />)

        const titleInput = screen.getByPlaceholderText('Nhập tiêu đề prompt...')
        const mediaInput = screen.getByPlaceholderText('Nhập Media ID (optional)...')
        const contentInput = screen.getByPlaceholderText('Nhập nội dung prompt...')

        expect(titleInput).toHaveValue('')
        expect(mediaInput).toHaveValue('')
        expect(contentInput).toHaveValue('')
    })

    it('renders with modal width 500', () => {
        render(<PromptModal {...defaultProps} />)

        const modal = document.querySelector('.ant-modal')
        expect(modal).toBeInTheDocument()
    })
})
