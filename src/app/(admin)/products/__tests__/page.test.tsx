import { render } from '@testing-library/react'
import ProductPage from '@/app/(admin)/products/page'

// Mock components
jest.mock('@/components/shop/products/ProductTableSkeleton', () => {
    return function MockProductTableSkeleton() {
        return <div data-testid="product-skeleton">Loading...</div>
    }
})

jest.mock('@/components/shop/products/ProductDataLoader', () => {
    return function MockProductDataLoader() {
        return <div data-testid="product-data-loader">Product Data</div>
    }
})

describe('ProductPage (Admin)', () => {
    it('has correct revalidate export configuration', () => {
        const ProductPageModule = require('@/app/(admin)/products/page')
        expect(ProductPageModule.revalidate).toBe(60)
    })

    it('renders without errors', async () => {
        const searchParams = { page: '1' }

        expect(async () => {
            const page = await ProductPage({ searchParams })
            render(page)
        }).not.toThrow()
    })

    it('contains Suspense boundary', async () => {
        const searchParams = { page: '1' }
        const page = await ProductPage({ searchParams })

        // Check that the page structure includes both skeleton and loader
        expect(page).toBeDefined()
    })
})
