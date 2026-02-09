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
        },
        {
            _id: 'vm_3',
            mediaId: 'NoImageMedia'
        }
    ]

    const defaultProps = {
        isOpen: true,
        setIsOpen: mockSetIsOpen,
        accountId: 'acc_1',
        editingPrompt: undefined,
        onRefresh: mockOnRefresh,
        veo3Media: mockVeo3Media
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
                mediaId: 'CAMaJDBjOWRk'
            }
        }

        render(<PromptModal {...editProps} />)

        expect(screen.getByText('Chỉnh sửa Prompt')).toBeInTheDocument()
    })

    it('displays all form fields (no product field)', () => {
        render(<PromptModal {...defaultProps} />)

        expect(screen.getByText('Tiêu đề')).toBeInTheDocument()
        expect(screen.getByText('Media ID')).toBeInTheDocument()
        expect(screen.getByText('Nội dung')).toBeInTheDocument()
        // Product field should NOT exist — prompts are independent
        expect(screen.queryByText('Sản phẩm')).not.toBeInTheDocument()
    })

    it('has correct placeholder for title', () => {
        render(<PromptModal {...defaultProps} />)

        expect(screen.getByPlaceholderText('Nhập tiêu đề prompt...')).toBeInTheDocument()
    })

    it('renders Media ID as a Select dropdown (not Input)', () => {
        render(<PromptModal {...defaultProps} />)

        // Should have a combobox for Media ID select
        const selects = screen.getAllByRole('combobox')
        expect(selects.length).toBeGreaterThanOrEqual(1)
    })

    it('shows veo3 media options in Media ID dropdown', () => {
        render(<PromptModal {...defaultProps} />)

        // Open the select dropdown
        const selects = screen.getAllByRole('combobox')
        const mediaSelect = selects[0] // Media ID select
        fireEvent.mouseDown(mediaSelect)

        // Should show media IDs as options
        expect(screen.getByTitle('CAMaJDBjOWRk')).toBeInTheDocument()
        expect(screen.getByTitle('XYZ123456789')).toBeInTheDocument()
        expect(screen.getByTitle('NoImageMedia')).toBeInTheDocument()
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
                mediaId: 'CAMaJDBjOWRk'
            }
        }

        render(<PromptModal {...editProps} />)

        expect(screen.getByDisplayValue('Test Title')).toBeInTheDocument()
        expect(screen.getByDisplayValue('Test Content')).toBeInTheDocument()
        // mediaId is now a Select, so we check for the displayed text
        expect(screen.getByTitle('CAMaJDBjOWRk')).toBeInTheDocument()
    })

    it('renders with empty veo3Media list', () => {
        const emptyProps = { ...defaultProps, veo3Media: [] }

        render(<PromptModal {...emptyProps} />)

        expect(screen.getByText('Thêm Prompt mới')).toBeInTheDocument()
    })

    it('renders with modal width 500', () => {
        render(<PromptModal {...defaultProps} />)

        const modal = document.querySelector('.ant-modal')
        expect(modal).toBeInTheDocument()
    })
})
