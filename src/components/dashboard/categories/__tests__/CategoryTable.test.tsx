import { render, screen, waitFor } from '@testing-library/react'
import CategoryTable from '@/components/dashboard/categories/CategoryTable'
import { Category } from '@/models/Category'

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

// Mock Ant Design Table
jest.mock('antd', () => {
    const actual = jest.requireActual('antd')
    return {
        ...actual,
        Table: ({ dataSource, columns }: any) => (
            <div data-testid="category-table">
                {dataSource?.map((category: any) => (
                    <div key={category._id} data-testid="category-row">
                        <span data-testid="category-name">{category.name}</span>
                    </div>
                ))}
            </div>
        )
    }
})

const { useRouter, usePathname, useSearchParams } = require('next/navigation')

describe('CategoryTable Component', () => {
    const mockCategories: Category[] = [
        { _id: '1', name: 'Danh mục 1' },
        { _id: '2', name: 'Danh mục 2' },
        { _id: '3', name: 'Danh mục 3' }
    ]

    beforeEach(() => {
        jest.clearAllMocks()
            ; (useRouter as jest.Mock).mockReturnValue({
                push: jest.fn(),
                replace: jest.fn()
            })
            ; (usePathname as jest.Mock).mockReturnValue('/categories')
            ; (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams())
    })

    it('renders table with category data', async () => {
        render(<CategoryTable totalDocs={3} categories={mockCategories} />)

        await waitFor(() => {
            expect(screen.getByTestId('category-table')).toBeInTheDocument()
        })

        const categoryRows = screen.getAllByTestId('category-row')
        expect(categoryRows).toHaveLength(3)
    })

    it('displays category names correctly', async () => {
        render(<CategoryTable totalDocs={3} categories={mockCategories} />)

        await waitFor(() => {
            const categoryNames = screen.getAllByTestId('category-name')
            expect(categoryNames[0]).toHaveTextContent('Danh mục 1')
            expect(categoryNames[1]).toHaveTextContent('Danh mục 2')
            expect(categoryNames[2]).toHaveTextContent('Danh mục 3')
        })
    })

    it('handles empty category list', async () => {
        render(<CategoryTable totalDocs={0} categories={[]} />)

        await waitFor(() => {
            const table = screen.getByTestId('category-table')
            expect(table).toBeInTheDocument()
        })

        const categoryRows = screen.queryAllByTestId('category-row')
        expect(categoryRows).toHaveLength(0)
    })

    it('renders add category button', () => {
        render(<CategoryTable totalDocs={3} categories={mockCategories} />)

        const addButton = screen.getByText(/thêm danh mục/i)
        expect(addButton).toBeInTheDocument()
    })

    it('displays correct number of categories', async () => {
        render(<CategoryTable totalDocs={3} categories={mockCategories} />)

        await waitFor(() => {
            const categoryRows = screen.getAllByTestId('category-row')
            expect(categoryRows).toHaveLength(mockCategories.length)
        })
    })

    it('renders with single category', async () => {
        const singleCategory: Category[] = [{ _id: '1', name: 'Only Category' }]

        render(<CategoryTable totalDocs={1} categories={singleCategory} />)

        await waitFor(() => {
            expect(screen.getByText('Only Category')).toBeInTheDocument()
        })
    })

    it('maintains category data integrity', async () => {
        render(<CategoryTable totalDocs={3} categories={mockCategories} />)

        await waitFor(() => {
            const categoryNames = screen.getAllByTestId('category-name')

            // Verify all categories are rendered in order
            mockCategories.forEach((category, index) => {
                expect(categoryNames[index]).toHaveTextContent(category.name)
            })
        })
    })
})
