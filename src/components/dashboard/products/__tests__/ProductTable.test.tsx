import { render, screen, waitFor } from '@testing-library/react'
import ProductTable from '../ProductTable'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'

// Mock Next.js navigation
jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
    usePathname: jest.fn(),
    useSearchParams: jest.fn()
}))

// Mock hooks
jest.mock('@/hooks/usePushNotification', () => ({
    usePushNotification: () => ({ push: jest.fn() })
}))

jest.mock('@/utils/api', () => ({
    remove: jest.fn()
}))

// Mock Ant Design Table to simplify rendering
jest.mock('antd', () => {
    const actual = jest.requireActual('antd')
    return {
        ...actual,
        Table: ({ dataSource, columns }: any) => (
            <div data-testid="products-table">
                {dataSource?.map((product: any) => (
                    <div key={product._id} data-testid="product-row">
                        <span data-testid="product-name">{product.name}</span>
                        <span data-testid="product-sku">{product.sku}</span>
                        <span data-testid="product-price">{product.price}</span>
                    </div>
                ))}
            </div>
        )
    }
})

describe('ProductTable - Functional Tests', () => {
    const mockProducts = [
        {
            _id: '1',
            name: 'Sản phẩm 1',
            price: 100000,
            categoryId: 'cat1',
            sku: 'SKU001',
            storage: 10,
            imageUrl: 'https://example.com/img1.jpg',
            imagePublicId: 'img1',
            isPublic: true
        },
        {
            _id: '2',
            name: 'Sản phẩm 2',
            price: 200000,
            categoryId: 'cat2',
            sku: 'SKU002',
            storage: 5,
            imageUrl: 'https://example.com/img2.jpg',
            imagePublicId: 'img2',
            isPublic: false
        }
    ]

    const mockCategories = [
        { _id: 'cat1', name: 'Danh mục 1' },
        { _id: 'cat2', name: 'Danh mục 2' }
    ]

    beforeEach(() => {
        jest.clearAllMocks()
            ; (useRouter as jest.Mock).mockReturnValue({
                push: jest.fn(),
                replace: jest.fn()
            })
            ; (usePathname as jest.Mock).mockReturnValue('/products')
            ; (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams())
    })

    it('loads and displays product data in table', async () => {
        render(
            <ProductTable
                totalDocs={2}
                products={mockProducts}
                categories={mockCategories}
            />
        )

        // Wait for table to render
        await waitFor(() => {
            expect(screen.getByTestId('products-table')).toBeInTheDocument()
        })

        // Verify products are displayed
        const productRows = screen.getAllByTestId('product-row')
        expect(productRows).toHaveLength(2)

        // Verify product data is rendered
        const productNames = screen.getAllByTestId('product-name')
        expect(productNames[0]).toHaveTextContent('Sản phẩm 1')
        expect(productNames[1]).toHaveTextContent('Sản phẩm 2')

        // Verify SKUs are displayed
        const productSkus = screen.getAllByTestId('product-sku')
        expect(productSkus[0]).toHaveTextContent('SKU001')
        expect(productSkus[1]).toHaveTextContent('SKU002')

        // Verify prices are displayed
        const productPrices = screen.getAllByTestId('product-price')
        expect(productPrices[0]).toHaveTextContent('100000')
        expect(productPrices[1]).toHaveTextContent('200000')
    })

    it('handles empty product list', async () => {
        render(
            <ProductTable
                totalDocs={0}
                products={[]}
                categories={mockCategories}
            />
        )

        await waitFor(() => {
            const table = screen.getByTestId('products-table')
            expect(table).toBeInTheDocument()
        })

        // No product rows should be rendered
        const productRows = screen.queryAllByTestId('product-row')
        expect(productRows).toHaveLength(0)
    })

    it('renders search functionality', () => {
        render(
            <ProductTable
                totalDocs={2}
                products={mockProducts}
                categories={mockCategories}
            />
        )

        // Search input should be present
        const searchInput = screen.getByPlaceholderText(/tìm kiếm sản phẩm/i)
        expect(searchInput).toBeInTheDocument()
    })

    it('renders add product button', () => {
        render(
            <ProductTable
                totalDocs={2}
                products={mockProducts}
                categories={mockCategories}
            />
        )

        // Add button should be present
        const addButton = screen.getByText(/thêm sản phẩm/i)
        expect(addButton).toBeInTheDocument()
    })

    it('displays correct number of products', async () => {
        render(
            <ProductTable
                totalDocs={2}
                products={mockProducts}
                categories={mockCategories}
            />
        )

        await waitFor(() => {
            const productRows = screen.getAllByTestId('product-row')
            expect(productRows).toHaveLength(mockProducts.length)
        })
    })
})
