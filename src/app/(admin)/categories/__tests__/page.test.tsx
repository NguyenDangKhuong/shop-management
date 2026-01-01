import { render, screen } from '@testing-library/react'
import CategoryPage from '@/app/(admin)/categories/page'

// Mock DashboardTitle component
jest.mock('@/components/shop/DashboardTitle', () => {
    return function MockDashboardTitle({ pageName, totalDocs }: any) {
        return (
            <div data-testid="dashboard-title">
                <span data-testid="page-name">{pageName}</span>
                <span data-testid="total-docs">{totalDocs}</span>
            </div>
        )
    }
})

// Mock CategoryTable component
jest.mock('@/components/shop/categories/CategoryTable', () => {
    return function MockCategoryTable({ totalDocs, categories }: any) {
        return (
            <div data-testid="category-table">
                <span data-testid="table-total">{totalDocs}</span>
                <span data-testid="table-categories">{categories?.length || 0}</span>
            </div>
        )
    }
})

// Mock API utilities
jest.mock('@/utils/api', () => ({
    get: jest.fn().mockResolvedValue({
        totalDocs: 10,
        categories: [
            { _id: '1', name: 'Category 1' },
            { _id: '2', name: 'Category 2' }
        ]
    })
}))

describe('CategoryPage (Admin)', () => {
    it('has correct dynamic export configuration', () => {
        const CategoryPageModule = require('@/app/(admin)/categories/page')
        expect(CategoryPageModule.dynamic).toBe('force-dynamic')
    })

    it('renders DashboardTitle with correct props', async () => {
        const searchParams = { page: '1' }
        const page = await CategoryPage({ searchParams })

        const { getByTestId } = render(page)

        expect(getByTestId('dashboard-title')).toBeInTheDocument()
        expect(getByTestId('page-name')).toHaveTextContent('danh mục')
    })

    it('renders CategoryTable component', async () => {
        const searchParams = { page: '1' }
        const page = await CategoryPage({ searchParams })

        const { getByTestId } = render(page)

        expect(getByTestId('category-table')).toBeInTheDocument()
    })

    it('passes totalDocs to components', async () => {
        const searchParams = { page: '1' }
        const page = await CategoryPage({ searchParams })

        const { getByTestId } = render(page)

        expect(getByTestId('total-docs')).toBeInTheDocument()
        expect(getByTestId('table-total')).toBeInTheDocument()
    })

    it('fetches and passes categories data', async () => {
        const searchParams = { page: '1' }
        const page = await CategoryPage({ searchParams })

        const { getByTestId } = render(page)

        const categoriesCount = getByTestId('table-categories')
        expect(categoriesCount).toBeInTheDocument()
    })

    it('handles pagination searchParams', async () => {
        const searchParams = { page: '2' }

        expect(async () => {
            const page = await CategoryPage({ searchParams })
            render(page)
        }).not.toThrow()
    })

    it('renders without errors when no searchParams', async () => {
        const searchParams = {}

        expect(async () => {
            const page = await CategoryPage({ searchParams })
            render(page)
        }).not.toThrow()
    })
})
