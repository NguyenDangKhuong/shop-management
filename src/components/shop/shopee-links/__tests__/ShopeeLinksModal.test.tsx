import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import ShopeeLinksModal from '../ShopeeLinksModal'

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

describe('ShopeeLinksModal', () => {
    const mockSetIsOpen = jest.fn()
    const mockSetEditingLink = jest.fn()
    const mockOnRefresh = jest.fn()

    const defaultProps = {
        isOpen: true,
        setIsOpen: mockSetIsOpen,
        editingLink: {},
        setEditingLink: mockSetEditingLink,
        onRefresh: mockOnRefresh
    }

    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('renders modal when open', () => {
        render(<ShopeeLinksModal {...defaultProps} />)

        expect(screen.getByText('Thêm Shopee Link Mới')).toBeInTheDocument()
    })

    it('shows edit title when editing', () => {
        const editProps = {
            ...defaultProps,
            editingLink: {
                _id: '1',
                name: 'Test Product',
                imageUrl: 'https://example.com/image.jpg',
                productUrl: 'https://shopee.vn/product/123'
            } as any
        }

        render(<ShopeeLinksModal {...editProps} />)

        expect(screen.getByText('Sửa Shopee Link')).toBeInTheDocument()
    })

    it('displays all form fields', () => {
        render(<ShopeeLinksModal {...defaultProps} />)

        expect(screen.getByText('Tên sản phẩm')).toBeInTheDocument()
        expect(screen.getByText('Hình ảnh sản phẩm')).toBeInTheDocument()
        expect(screen.getByText('Link sản phẩm Shopee')).toBeInTheDocument()
    })

    it('shows upload button', () => {
        render(<ShopeeLinksModal {...defaultProps} />)

        expect(screen.getByText('Upload Hình Ảnh')).toBeInTheDocument()
    })

    it('has correct placeholder for product name', () => {
        render(<ShopeeLinksModal {...defaultProps} />)

        const input = screen.getByPlaceholderText('VD: Áo thun nam cotton...')
        expect(input).toBeInTheDocument()
    })

    it('has correct placeholder for product URL', () => {
        render(<ShopeeLinksModal {...defaultProps} />)

        const input = screen.getByPlaceholderText('https://shopee.vn/product/...')
        expect(input).toBeInTheDocument()
    })

    it('closes modal on cancel', () => {
        render(<ShopeeLinksModal {...defaultProps} />)

        const cancelButton = screen.getByText('Cancel')
        fireEvent.click(cancelButton)

        expect(mockSetIsOpen).toHaveBeenCalledWith(false)
    })

    it('submits form with apiPost when creating new link', async () => {
        const { apiPost } = require('@/utils/internalApi')
        apiPost.mockResolvedValue({ success: true })

        render(<ShopeeLinksModal {...defaultProps} />)

        const okButton = screen.getByText('Thêm')
        fireEvent.click(okButton)

        await waitFor(() => {
            expect(apiPost).toHaveBeenCalledWith('/api/shopee-links', expect.any(Object))
        })
    })

    it('submits form with apiPut when editing existing link', async () => {
        const { apiPut } = require('@/utils/internalApi')
        apiPut.mockResolvedValue({ success: true })

        const editProps = {
            ...defaultProps,
            editingLink: { _id: '1', name: 'Test', imageUrl: 'url', productUrl: 'url' } as any
        }

        render(<ShopeeLinksModal {...editProps} />)

        const okButton = screen.getByText('Cập nhật')
        fireEvent.click(okButton)

        await waitFor(() => {
            expect(apiPut).toHaveBeenCalledWith(
                '/api/shopee-links',
                expect.objectContaining({ id: '1' })
            )
        })
    })

    it('calls onRefresh after successful submit', async () => {
        const { apiPost } = require('@/utils/internalApi')
        apiPost.mockResolvedValue({ success: true })

        render(<ShopeeLinksModal {...defaultProps} />)

        const okButton = screen.getByText('Thêm')
        fireEvent.click(okButton)

        await waitFor(() => {
            expect(mockOnRefresh).toHaveBeenCalled()
        })
    })

    it('does not render when closed', () => {
        const closedProps = { ...defaultProps, isOpen: false }

        const { container } = render(<ShopeeLinksModal {...closedProps} />)

        expect(container.firstChild).toBeNull()
    })
})
