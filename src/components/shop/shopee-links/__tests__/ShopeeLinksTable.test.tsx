import { render, screen, waitFor } from '@testing-library/react'
import ShopeeLinksTable from '../ShopeeLinksTable'

// Mock Next.js Image
jest.mock('next/image', () => ({
    __esModule: true,
    default: (props: any) => {
        // eslint-disable-next-line @next/next/no-img-element
        return <img {...props} alt={props.alt} />
    }
}))

// Mock internalApi
jest.mock('@/utils/internalApi', () => ({
    apiGet: jest.fn(),
    apiDelete: jest.fn()
}))

// Mock ShopeeLinksModal
jest.mock('../ShopeeLinksModal', () => {
    return function MockShopeeLinksModal({ isOpen }: any) {
        return isOpen ? <div data-testid="shopee-modal">Modal</div> : null
    }
})

// Mock Ant Design components
jest.mock('antd', () => {
    const actual = jest.requireActual('antd')
    return {
        ...actual,
        Table: ({ dataSource, columns: _columns }: any) => (
            <div data-testid="shopee-table">
                {dataSource?.map((link: any) => (
                    <div key={link._id} data-testid="shopee-row">
                        <span data-testid="link-name">{link.name}</span>
                        <span data-testid="link-url">{link.productUrl}</span>
                    </div>
                ))}
            </div>
        ),
        Image: (props: any) => <img {...props} data-testid="product-image" alt={props.alt} />,
        Button: ({ children, onClick }: any) => (
            <button onClick={onClick} data-testid="button">
                {children}
            </button>
        ),
        App: {
            useApp: () => ({
                message: {
                    success: jest.fn(),
                    error: jest.fn()
                }
            })
        },
        Popconfirm: ({ children, onConfirm }: any) => (
            <div data-testid="popconfirm" onClick={onConfirm}>
                {children}
            </div>
        )
    }
})

describe('ShopeeLinksTable', () => {
    const mockLinks = [
        {
            _id: '1',
            name: 'Áo thun nam cotton',
            imageUrl: 'https://example.com/image1.jpg',
            productUrl: 'https://shopee.vn/product/123',
            createdAt: '2026-01-01T10:00:00Z'
        },
        {
            _id: '2',
            name: 'Giày thể thao',
            imageUrl: 'https://example.com/image2.jpg',
            productUrl: 'https://shopee.vn/product/456',
            createdAt: '2026-01-02T10:00:00Z'
        }
    ]

    beforeEach(() => {
        jest.clearAllMocks()
        const { apiGet } = require('@/utils/internalApi')
        apiGet.mockResolvedValue({
            success: true,
            data: mockLinks
        })
    })

    it('renders table with shopee links', async () => {
        render(<ShopeeLinksTable />)

        await waitFor(() => {
            expect(screen.getByTestId('shopee-table')).toBeInTheDocument()
        })
    })

    it('displays link data correctly', async () => {
        render(<ShopeeLinksTable />)

        await waitFor(() => {
            expect(screen.getByText('Áo thun nam cotton')).toBeInTheDocument()
            expect(screen.getByText('Giày thể thao')).toBeInTheDocument()
        })
    })

    it('shows add new link button', async () => {
        render(<ShopeeLinksTable />)

        await waitFor(() => {
            expect(screen.getByText('Thêm Shopee Link')).toBeInTheDocument()
        })
    })

    it('displays product images', async () => {
        render(<ShopeeLinksTable />)

        await waitFor(() => {
            const images = screen.getAllByTestId('product-image')
            expect(images.length).toBeGreaterThan(0)
        })
    })

    it('handles empty links list', async () => {
        const { apiGet } = require('@/utils/internalApi')
        apiGet.mockResolvedValue({
            success: true,
            data: []
        })

        render(<ShopeeLinksTable />)

        await waitFor(() => {
            const table = screen.getByTestId('shopee-table')
            expect(table).toBeInTheDocument()
        })

        const rows = screen.queryAllByTestId('shopee-row')
        expect(rows).toHaveLength(0)
    })

    it('fetches links on mount', async () => {
        const { apiGet } = require('@/utils/internalApi')

        render(<ShopeeLinksTable />)

        await waitFor(() => {
            expect(apiGet).toHaveBeenCalledWith('/api/shopee-links')
        })
    })
})
