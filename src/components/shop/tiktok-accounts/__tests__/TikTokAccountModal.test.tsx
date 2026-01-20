import { render, screen, fireEvent } from '@testing-library/react'
import TikTokAccountModal from '../TikTokAccountModal'

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

// Mock deleteCloudinaryImage action
jest.mock('@/actions/cloudinary', () => ({
    deleteCloudinaryImage: jest.fn().mockResolvedValue({ success: true })
}))

describe('TikTokAccountModal', () => {
    const mockSetIsOpen = jest.fn()
    const mockSetEditingAccount = jest.fn()
    const mockOnRefresh = jest.fn()

    const defaultProps = {
        isOpen: true,
        setIsOpen: mockSetIsOpen,
        editingAccount: {},
        setEditingAccount: mockSetEditingAccount,
        onRefresh: mockOnRefresh
    }

    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('renders modal when open', () => {
        render(<TikTokAccountModal {...defaultProps} />)

        expect(screen.getByText('Thêm TikTok Account Mới')).toBeInTheDocument()
    })

    it('shows edit title when editing', () => {
        const editProps = {
            ...defaultProps,
            editingAccount: {
                _id: '1',
                username: '@testuser',
                displayName: 'Test User',
                email: 'test@example.com',
                cookie: 'sessionid=123',
                httpRequest: 'GET /api/test'
            } as any
        }

        render(<TikTokAccountModal {...editProps} />)

        expect(screen.getByText('Sửa TikTok Account')).toBeInTheDocument()
    })

    it('displays all form fields', () => {
        render(<TikTokAccountModal {...defaultProps} />)

        expect(screen.getByText('Username (Account ID)')).toBeInTheDocument()
        expect(screen.getByText('Tên hiển thị')).toBeInTheDocument()
        expect(screen.getByText('Email')).toBeInTheDocument()
        expect(screen.getByText('Cookie')).toBeInTheDocument()
        expect(screen.getByText('HTTP Request')).toBeInTheDocument()
        expect(screen.getByText('Avatar')).toBeInTheDocument()
    })

    it('has correct placeholder for username', () => {
        render(<TikTokAccountModal {...defaultProps} />)

        const input = screen.getByPlaceholderText('@username hoặc account ID')
        expect(input).toBeInTheDocument()
    })

    it('has correct placeholder for display name', () => {
        render(<TikTokAccountModal {...defaultProps} />)

        const input = screen.getByPlaceholderText('VD: My TikTok Shop')
        expect(input).toBeInTheDocument()
    })

    it('has correct placeholder for email', () => {
        render(<TikTokAccountModal {...defaultProps} />)

        const input = screen.getByPlaceholderText('example@email.com')
        expect(input).toBeInTheDocument()
    })

    it('has correct placeholder for cookie', () => {
        render(<TikTokAccountModal {...defaultProps} />)

        const textarea = screen.getByPlaceholderText('sessionid=...; sid_tt=...; ...')
        expect(textarea).toBeInTheDocument()
    })

    it('has correct placeholder for HTTP Request', () => {
        render(<TikTokAccountModal {...defaultProps} />)

        const textarea = screen.getByPlaceholderText('Nhập HTTP Request (tùy chọn)...')
        expect(textarea).toBeInTheDocument()
    })

    it('shows upload avatar button', () => {
        render(<TikTokAccountModal {...defaultProps} />)

        expect(screen.getByText('Upload Avatar')).toBeInTheDocument()
    })

    it('closes modal on cancel', () => {
        render(<TikTokAccountModal {...defaultProps} />)

        const cancelButton = screen.getByText('Cancel')
        fireEvent.click(cancelButton)

        expect(mockSetIsOpen).toHaveBeenCalledWith(false)
    })

    it('populates form fields when editing account with httpRequest', () => {
        const editProps = {
            ...defaultProps,
            editingAccount: {
                _id: '123',
                username: '@testuser',
                displayName: 'Test User',
                email: 'test@example.com',
                cookie: 'sessionid=abc123',
                httpRequest: 'POST /api/upload\nContent-Type: application/json',
                avatar: {
                    url: 'https://example.com/avatar.jpg',
                    type: 'image'
                }
            } as any
        }

        render(<TikTokAccountModal {...editProps} />)

        // Check if form fields are populated
        expect(screen.getByDisplayValue('@testuser')).toBeInTheDocument()
        expect(screen.getByDisplayValue('Test User')).toBeInTheDocument()
        expect(screen.getByDisplayValue('test@example.com')).toBeInTheDocument()
        expect(screen.getByDisplayValue('sessionid=abc123')).toBeInTheDocument()
        expect(screen.getByDisplayValue('POST /api/upload\nContent-Type: application/json')).toBeInTheDocument()
    })

    it('renders with empty httpRequest when not provided', () => {
        const editProps = {
            ...defaultProps,
            editingAccount: {
                _id: '123',
                username: '@testuser',
                displayName: 'Test User',
                email: 'test@example.com',
                cookie: 'sessionid=abc123'
                // No httpRequest field
            } as any
        }

        render(<TikTokAccountModal {...editProps} />)

        const httpRequestField = screen.getByPlaceholderText('Nhập HTTP Request (tùy chọn)...')
        expect(httpRequestField).toHaveValue('')
    })

    it('does not render when closed', () => {
        const closedProps = { ...defaultProps, isOpen: false }

        const { container } = render(<TikTokAccountModal {...closedProps} />)

        expect(container.firstChild).toBeNull()
    })

    it('shows correct button text for create mode', () => {
        render(<TikTokAccountModal {...defaultProps} />)

        expect(screen.getByText('Thêm')).toBeInTheDocument()
    })

    it('shows correct button text for edit mode', () => {
        const editProps = {
            ...defaultProps,
            editingAccount: {
                _id: '1',
                username: '@test'
            } as any
        }

        render(<TikTokAccountModal {...editProps} />)

        expect(screen.getByText('Cập nhật')).toBeInTheDocument()
    })

    it('displays cookie extraction button', () => {
        render(<TikTokAccountModal {...defaultProps} />)

        expect(screen.getByText('Lọc Cookie')).toBeInTheDocument()
    })

    it('extracts cookie from HTTP request when button clicked', () => {
        render(<TikTokAccountModal {...defaultProps} />)

        const httpRequestInput = screen.getByPlaceholderText('Nhập HTTP Request (tùy chọn)...')
        const extractButton = screen.getByText('Lọc Cookie')

        // Simulate pasting HTTP request with cookie header
        const httpRequest = `GET /api/test HTTP/1.1
Host: example.com
Cookie: sessionid=abc123; sid_tt=xyz789
User-Agent: Mozilla/5.0`

        fireEvent.change(httpRequestInput, { target: { value: httpRequest } })
        fireEvent.click(extractButton)

        // Check if cookie field is populated
        const cookieInput = screen.getByPlaceholderText('sessionid=...; sid_tt=...; ...')
        expect(cookieInput).toHaveValue('sessionid=abc123; sid_tt=xyz789')
    })

    it('handles HTTP request without cookie header', () => {
        render(<TikTokAccountModal {...defaultProps} />)

        const httpRequestInput = screen.getByPlaceholderText('Nhập HTTP Request (tùy chọn)...')
        const extractButton = screen.getByText('Lọc Cookie')

        // HTTP request without Cookie header
        const httpRequest = `GET /api/test HTTP/1.1
Host: example.com
User-Agent: Mozilla/5.0`

        fireEvent.change(httpRequestInput, { target: { value: httpRequest } })
        fireEvent.click(extractButton)

        // Cookie field should remain empty or unchanged
        const cookieInput = screen.getByPlaceholderText('sessionid=...; sid_tt=...; ...')
        expect(cookieInput).toHaveValue('')
    })

    it('handles empty HTTP request when extracting cookie', () => {
        render(<TikTokAccountModal {...defaultProps} />)

        const extractButton = screen.getByText('Lọc Cookie')
        fireEvent.click(extractButton)

        // Should handle gracefully without errors
        const cookieInput = screen.getByPlaceholderText('sessionid=...; sid_tt=...; ...')
        expect(cookieInput).toHaveValue('')
    })

    it('extracts cookie from JSON format with http.headers.Cookie', () => {
        render(<TikTokAccountModal {...defaultProps} />)

        const httpRequestInput = screen.getByPlaceholderText('Nhập HTTP Request (tùy chọn)...')
        const extractButton = screen.getByText('Lọc Cookie')

        // JSON format with http.headers.Cookie
        const jsonRequest = JSON.stringify({
            http: {
                headers: {
                    Cookie: '_ttp=2ubyqFJAYrX0uq0aKLuwTSQcmX1; sessionid=e5ece87640568d887ee0d047d7833de9'
                }
            }
        })

        fireEvent.change(httpRequestInput, { target: { value: jsonRequest } })
        fireEvent.click(extractButton)

        const cookieInput = screen.getByPlaceholderText('sessionid=...; sid_tt=...; ...')
        expect(cookieInput).toHaveValue('_ttp=2ubyqFJAYrX0uq0aKLuwTSQcmX1; sessionid=e5ece87640568d887ee0d047d7833de9')
    })

    it('extracts cookie from JSON format with ws.headers.Cookie', () => {
        render(<TikTokAccountModal {...defaultProps} />)

        const httpRequestInput = screen.getByPlaceholderText('Nhập HTTP Request (tùy chọn)...')
        const extractButton = screen.getByText('Lọc Cookie')

        // JSON format with ws.headers.Cookie
        const jsonRequest = JSON.stringify({
            ws: {
                headers: {
                    Cookie: 'store-country-code=vn; tt-target-idc=alisg'
                }
            }
        })

        fireEvent.change(httpRequestInput, { target: { value: jsonRequest } })
        fireEvent.click(extractButton)

        const cookieInput = screen.getByPlaceholderText('sessionid=...; sid_tt=...; ...')
        expect(cookieInput).toHaveValue('store-country-code=vn; tt-target-idc=alisg')
    })

    it('extracts cookie from JSON format with flat headers.Cookie structure', () => {
        render(<TikTokAccountModal {...defaultProps} />)

        const httpRequestInput = screen.getByPlaceholderText('Nhập HTTP Request (tùy chọn)...')
        const extractButton = screen.getByText('Lọc Cookie')

        // JSON format with flat headers.Cookie
        const jsonRequest = JSON.stringify({
            headers: {
                Cookie: 'passport_csrf_token=9084c020564d644a9e46c528aedace6f'
            }
        })

        fireEvent.change(httpRequestInput, { target: { value: jsonRequest } })
        fireEvent.click(extractButton)

        const cookieInput = screen.getByPlaceholderText('sessionid=...; sid_tt=...; ...')
        expect(cookieInput).toHaveValue('passport_csrf_token=9084c020564d644a9e46c528aedace6f')
    })
})
