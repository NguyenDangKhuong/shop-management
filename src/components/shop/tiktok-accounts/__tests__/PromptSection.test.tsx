import { render, screen } from '@testing-library/react'
import PromptSection from '../PromptSection'

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

// Mock PromptModal
jest.mock('../PromptModal', () => {
    return function MockPromptModal() {
        return null
    }
})

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

describe('PromptSection', () => {
    const mockOnRefresh = jest.fn()
    const mockOnAutoFlowRefresh = jest.fn()

    const mockPrompts = [
        {
            _id: 'p_1',
            title: 'Test Prompt 1',
            content: 'This is the content of prompt 1',
            type: 'describe',
            subPrompt: 'Sub prompt text',
            order: 0
        },
        {
            _id: 'p_2',
            title: 'Hook Prompt',
            content: 'This is a hook prompt',
            type: 'hook',
            order: 1
        },
        {
            _id: 'p_3',
            title: 'No Type Prompt',
            content: 'Prompt without type',
            order: 2
        }
    ]

    const defaultProps = {
        allPrompts: mockPrompts,
        promptsLoading: false,
        onRefresh: mockOnRefresh,
        onAutoFlowRefresh: mockOnAutoFlowRefresh
    }

    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('renders add button', () => {
        render(<PromptSection {...defaultProps} />)

        expect(screen.getByText('Thêm')).toBeInTheDocument()
    })

    it('renders all prompts', () => {
        render(<PromptSection {...defaultProps} />)

        expect(screen.getByText('Test Prompt 1')).toBeInTheDocument()
        expect(screen.getByText('Hook Prompt')).toBeInTheDocument()
        expect(screen.getByText('No Type Prompt')).toBeInTheDocument()
    })

    it('shows prompt content', () => {
        render(<PromptSection {...defaultProps} />)

        expect(screen.getByText('This is the content of prompt 1')).toBeInTheDocument()
        expect(screen.getByText('This is a hook prompt')).toBeInTheDocument()
    })

    it('shows sub-prompt when present', () => {
        render(<PromptSection {...defaultProps} />)

        expect(screen.getByText(/Sub prompt text/)).toBeInTheDocument()
    })

    it('shows type badges for describe and hook', () => {
        render(<PromptSection {...defaultProps} />)

        expect(screen.getByText(/Describe/)).toBeInTheDocument()
        expect(screen.getByText(/🪝 Hook/)).toBeInTheDocument()
    })

    it('shows loading spinner when loading', () => {
        render(<PromptSection {...defaultProps} promptsLoading={true} />)

        expect(document.querySelector('.ant-spin')).toBeInTheDocument()
    })

    it('shows empty message when no prompts', () => {
        render(<PromptSection {...defaultProps} allPrompts={[]} />)

        expect(screen.getByText('Chưa có prompt nào')).toBeInTheDocument()
    })

    it('shows action buttons for each prompt', () => {
        render(<PromptSection {...defaultProps} />)

        const copyButtons = screen.getAllByTitle('Copy nội dung')
        expect(copyButtons).toHaveLength(3)

        const editButtons = screen.getAllByTitle('Sửa')
        expect(editButtons).toHaveLength(3)

        const duplicateButtons = screen.getAllByTitle('Nhân bản')
        expect(duplicateButtons).toHaveLength(3)

        const deleteButtons = screen.getAllByTitle('Xóa')
        expect(deleteButtons).toHaveLength(3)
    })
})
