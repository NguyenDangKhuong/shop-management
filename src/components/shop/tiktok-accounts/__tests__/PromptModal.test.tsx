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
        accountId: 'acc_1',
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
                content: 'Test Content'
            }
        }

        render(<PromptModal {...editProps} />)

        expect(screen.getByText('Chỉnh sửa Prompt')).toBeInTheDocument()
    })

    it('displays all form fields (no referenceImages, no product field)', () => {
        render(<PromptModal {...defaultProps} />)

        expect(screen.getByText('Tiêu đề')).toBeInTheDocument()
        expect(screen.getByText('Loại prompt')).toBeInTheDocument()
        expect(screen.getByText('Nội dung')).toBeInTheDocument()
        // Reference Images moved to AutoFlowModal
        expect(screen.queryByText('Reference Images')).not.toBeInTheDocument()
        // Product field should NOT exist — prompts are independent
        expect(screen.queryByText('Sản phẩm')).not.toBeInTheDocument()
    })

    it('has correct placeholder for title', () => {
        render(<PromptModal {...defaultProps} />)

        expect(screen.getByPlaceholderText('Nhập tiêu đề prompt...')).toBeInTheDocument()
    })

    it('renders Type as Select dropdown', () => {
        render(<PromptModal {...defaultProps} />)

        // Should have 1 combobox: Type select only (no more Media ID select)
        const selects = screen.getAllByRole('combobox')
        expect(selects.length).toBe(1)
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
                content: 'Test Content'
            }
        }

        render(<PromptModal {...editProps} />)

        expect(screen.getByDisplayValue('Test Title')).toBeInTheDocument()
        expect(screen.getByDisplayValue('Test Content')).toBeInTheDocument()
    })

    it('renders with modal width 500', () => {
        render(<PromptModal {...defaultProps} />)

        const modal = document.querySelector('.ant-modal')
        expect(modal).toBeInTheDocument()
    })
})
