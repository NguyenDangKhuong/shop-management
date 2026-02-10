import { fireEvent, render, screen } from '@testing-library/react'
import AutoFlowModal from '../AutoFlowModal'

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

// Mock useCloudinaryUpload hook
jest.mock('@/hooks/useCloudinaryUpload', () => ({
    useCloudinaryUpload: jest.fn(() => ({
        openWidget: jest.fn(),
        isUploading: false
    }))
}))

// Mock cloudinary actions
jest.mock('@/actions/cloudinary', () => ({
    deleteCloudinaryImage: jest.fn()
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

describe('AutoFlowModal', () => {
    const mockSetIsOpen = jest.fn()
    const mockOnRefresh = jest.fn()

    const mockProducts = [
        {
            product_id: 'prod_1',
            title: 'Sản phẩm A',
            images: [{ url_list: ['https://img.example.com/a.jpg'] }]
        },
        {
            product_id: 'prod_2',
            title: 'Sản phẩm B',
            images: [{ url_list: ['https://img.example.com/b.jpg'] }]
        },
        {
            product_id: 'prod_3',
            title: 'Sản phẩm C',
            images: [{ url_list: ['https://img.example.com/c.jpg'] }]
        }
    ]

    const mockAutoflows = [
        {
            _id: 'af_1',
            accountId: 'acc_1',
            productId: 'prod_1',
            productTitle: 'Sản phẩm A',
            enabled: true
        }
    ]

    const mockShopeeLinks = [
        {
            _id: 'sl_1',
            name: 'Đèn hoàng hôn',
            description: 'Đèn chiếu hoàng hôn RGB 16 màu',
            productUrl: 'https://shopee.vn/product/1',
            mediaFile: { url: 'https://img.example.com/lamp.jpg', type: 'image' }
        },
        {
            _id: 'sl_2',
            name: 'Tai nghe Bluetooth',
            description: 'Tai nghe không dây chống ồn',
            productUrl: 'https://shopee.vn/product/2',
            mediaFile: { url: 'https://img.example.com/headphone.jpg', type: 'image' }
        },
        {
            _id: 'sl_3',
            name: 'Sản phẩm không có description',
            productUrl: 'https://shopee.vn/product/3',
            mediaFile: { url: 'https://img.example.com/other.jpg', type: 'image' }
        }
    ]

    const mockPrompts = [
        {
            _id: 'pr_1',
            title: 'Prompt Alpha',
            content: 'Nội dung prompt alpha...',
            accountId: 'acc_1'
        },
        {
            _id: 'pr_2',
            title: 'Prompt Beta',
            content: 'Nội dung prompt beta...',
            accountId: 'acc_1'
        }
    ]

    const defaultProps = {
        isOpen: true,
        setIsOpen: mockSetIsOpen,
        accountId: 'acc_1',
        products: mockProducts,
        autoflows: mockAutoflows,
        editingAutoFlow: undefined,
        onRefresh: mockOnRefresh,
        shopeeLinks: mockShopeeLinks,
        allPrompts: mockPrompts
    }

    beforeEach(() => {
        jest.clearAllMocks()
    })

    // --- Basic Rendering ---

    it('renders modal when open', () => {
        render(<AutoFlowModal {...defaultProps} />)

        expect(screen.getByText('Thêm AutoFlow mới')).toBeInTheDocument()
    })

    it('does not render when closed', () => {
        const { container } = render(<AutoFlowModal {...defaultProps} isOpen={false} />)

        expect(container.querySelector('.ant-modal')).toBeNull()
    })

    it('shows edit title when editing an existing autoflow', () => {
        const editProps = {
            ...defaultProps,
            editingAutoFlow: {
                _id: 'af_1',
                productId: 'prod_1',
                productTitle: 'Sản phẩm A'
            }
        }

        render(<AutoFlowModal {...editProps} />)

        expect(screen.getByText('Chỉnh sửa AutoFlow')).toBeInTheDocument()
    })

    it('shows "Tạo" button in create mode', () => {
        render(<AutoFlowModal {...defaultProps} />)

        expect(screen.getByText('Tạo')).toBeInTheDocument()
    })

    it('shows "Cập nhật" button in edit mode', () => {
        const editProps = {
            ...defaultProps,
            editingAutoFlow: {
                _id: 'af_1',
                productId: 'prod_1'
            }
        }

        render(<AutoFlowModal {...editProps} />)

        expect(screen.getByText('Cập nhật')).toBeInTheDocument()
    })

    // --- Form Fields ---

    it('displays all form fields including video and prompts', () => {
        render(<AutoFlowModal {...defaultProps} />)

        expect(screen.getByText('Sản phẩm')).toBeInTheDocument()
        expect(screen.getByText('Shopee Link')).toBeInTheDocument()
        expect(screen.getByText('n8n URL')).toBeInTheDocument()
        expect(screen.getByText('Chọn Prompts')).toBeInTheDocument()
        expect(screen.getByText('Videos (0)')).toBeInTheDocument()
    })

    it('has n8n URL input with correct placeholder', () => {
        render(<AutoFlowModal {...defaultProps} />)

        expect(screen.getByPlaceholderText('Nhập n8n webhook URL (optional)...')).toBeInTheDocument()
    })

    it('populates n8nUrl when editing an autoflow with n8nUrl', () => {
        const editProps = {
            ...defaultProps,
            editingAutoFlow: {
                _id: 'af_1',
                productId: 'prod_1',
                productTitle: 'Sản phẩm A',
                n8nUrl: 'https://my-n8n.com/webhook/12345'
            }
        }

        render(<AutoFlowModal {...editProps} />)

        expect(screen.getByDisplayValue('https://my-n8n.com/webhook/12345')).toBeInTheDocument()
    })

    it('n8nUrl field is empty when editing autoflow without n8nUrl', () => {
        const editProps = {
            ...defaultProps,
            editingAutoFlow: {
                _id: 'af_1',
                productId: 'prod_1',
                productTitle: 'Sản phẩm A'
            }
        }

        render(<AutoFlowModal {...editProps} />)

        const n8nInput = screen.getByPlaceholderText('Nhập n8n webhook URL (optional)...')
        expect(n8nInput).toHaveValue('')
    })

    // --- Product Select ---

    it('filters out products that already have an autoflow', () => {
        render(<AutoFlowModal {...defaultProps} />)

        const selects = screen.getAllByRole('combobox')
        const productSelect = selects[0]
        fireEvent.mouseDown(productSelect)

        expect(screen.queryByTitle('Sản phẩm A')).not.toBeInTheDocument()
        expect(screen.getByTitle('Sản phẩm B')).toBeInTheDocument()
        expect(screen.getByTitle('Sản phẩm C')).toBeInTheDocument()
    })

    it('allows selecting the current product when editing', () => {
        const editProps = {
            ...defaultProps,
            editingAutoFlow: {
                _id: 'af_1',
                productId: 'prod_1',
                productTitle: 'Sản phẩm A'
            }
        }

        render(<AutoFlowModal {...editProps} />)

        const selects = screen.getAllByRole('combobox')
        const productSelect = selects[0]
        fireEvent.mouseDown(productSelect)

        const matches = screen.getAllByTitle('Sản phẩm A')
        expect(matches.length).toBeGreaterThanOrEqual(1)
    })

    // --- Shopee Link Select ---

    it('shows shopee link options in dropdown', () => {
        render(<AutoFlowModal {...defaultProps} />)

        const selects = screen.getAllByRole('combobox')
        const shopeeSelect = selects[1]
        fireEvent.mouseDown(shopeeSelect)

        expect(screen.getByTitle('Đèn hoàng hôn')).toBeInTheDocument()
        expect(screen.getByTitle('Tai nghe Bluetooth')).toBeInTheDocument()
        expect(screen.getByTitle('Sản phẩm không có description')).toBeInTheDocument()
    })

    // --- Prompt Select ---

    it('displays prompt select as multi-select field', () => {
        render(<AutoFlowModal {...defaultProps} />)

        expect(screen.getByText('Chọn Prompts')).toBeInTheDocument()
    })

    it('populates promptIds when editing autoflow with prompts', () => {
        const editProps = {
            ...defaultProps,
            editingAutoFlow: {
                _id: 'af_1',
                productId: 'prod_1',
                productTitle: 'Sản phẩm A',
                promptIds: ['pr_1']
            }
        }

        render(<AutoFlowModal {...editProps} />)

        // The selected prompt title should be displayed
        expect(screen.getByTitle('Prompt Alpha')).toBeInTheDocument()
    })

    // --- Video Upload ---

    it('shows upload button when no video is set', () => {
        render(<AutoFlowModal {...defaultProps} />)

        expect(screen.getByText('🎬 Thêm Video')).toBeInTheDocument()
    })

    it('shows video preview when editing autoflow with video', () => {
        const editProps = {
            ...defaultProps,
            editingAutoFlow: {
                _id: 'af_1',
                productId: 'prod_1',
                productTitle: 'Sản phẩm A',
                videoFile: {
                    url: 'https://cloudinary.com/test/video.mp4',
                    publicId: 'test/video',
                    type: 'video'
                }
            }
        }

        render(<AutoFlowModal {...editProps} />)

        // Should show the video element, not the upload button
        const video = document.querySelector('video')
        expect(video).toBeInTheDocument()
        expect(video?.getAttribute('src')).toBe('https://cloudinary.com/test/video.mp4')

        // Upload button should still be visible (can add more videos)
        expect(screen.getByText('🎬 Thêm Video')).toBeInTheDocument()
    })

    it('shows delete button when video is present', () => {
        const editProps = {
            ...defaultProps,
            editingAutoFlow: {
                _id: 'af_1',
                productId: 'prod_1',
                productTitle: 'Sản phẩm A',
                videoFile: {
                    url: 'https://cloudinary.com/test/video.mp4',
                    publicId: 'test/video',
                    type: 'video'
                }
            }
        }

        render(<AutoFlowModal {...editProps} />)

        // Should have a delete button (Ant Design DeleteOutlined renders specific markup)
        const deleteButton = document.querySelector('[title="Xóa video"]')
        expect(deleteButton).toBeInTheDocument()
    })

    // --- Modal Actions ---

    it('closes modal when cancel button is clicked', () => {
        render(<AutoFlowModal {...defaultProps} />)

        const cancelButton = screen.getByText('Hủy')
        fireEvent.click(cancelButton)

        expect(mockSetIsOpen).toHaveBeenCalledWith(false)
    })

    // --- Edge Cases ---

    it('renders with empty products list', () => {
        const emptyProps = { ...defaultProps, products: [], autoflows: [] }

        render(<AutoFlowModal {...emptyProps} />)

        expect(screen.getByText('Thêm AutoFlow mới')).toBeInTheDocument()
    })

    it('renders with empty shopeeLinks list', () => {
        const emptyProps = { ...defaultProps, shopeeLinks: [] }

        render(<AutoFlowModal {...emptyProps} />)

        expect(screen.getByText('Shopee Link')).toBeInTheDocument()
    })

    it('renders without shopeeLinks prop', () => {
        const { shopeeLinks, ...propsWithoutLinks } = defaultProps

        render(<AutoFlowModal {...propsWithoutLinks} />)

        expect(screen.getByText('Shopee Link')).toBeInTheDocument()
    })

    it('renders with empty allPrompts list', () => {
        const emptyProps = { ...defaultProps, allPrompts: [] }

        render(<AutoFlowModal {...emptyProps} />)

        expect(screen.getByText('Chọn Prompts')).toBeInTheDocument()
    })

    it('renders without allPrompts prop', () => {
        const { allPrompts, ...propsWithoutPrompts } = defaultProps

        render(<AutoFlowModal {...propsWithoutPrompts} />)

        expect(screen.getByText('Chọn Prompts')).toBeInTheDocument()
    })
})
