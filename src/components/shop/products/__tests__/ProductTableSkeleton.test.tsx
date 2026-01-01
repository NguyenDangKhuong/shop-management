import { render } from '@testing-library/react'
import ProductTableSkeleton from '../ProductTableSkeleton'

// Mock Ant Design components to avoid complexity
jest.mock('antd', () => ({
    ...jest.requireActual('antd'),
    Table: ({ children }: any) => <div data-testid="mock-table">{children}</div>,
    Input: ({ children }: any) => <input data-testid="mock-input">{children}</input>,
    Button: ({ children }: any) => <button data-testid="mock-button">{children}</button>
}))

describe('ProductTableSkeleton', () => {
    it('renders without crashing', () => {
        const { container } = render(<ProductTableSkeleton />)
        expect(container).toBeInTheDocument()
    })

    it('has animate-pulse class for loading animation', () => {
        const { container } = render(<ProductTableSkeleton />)

        const animatedElement = container.querySelector('.animate-pulse')
        expect(animatedElement).toBeInTheDocument()
    })

    it('renders title skeleton with correct structure', () => {
        const { container } = render(<ProductTableSkeleton />)

        // Title skeleton elements
        const titleElements = container.querySelectorAll('.mb-6 > .h-8')
        expect(titleElements.length).toBeGreaterThan(0)
    })

    it('renders search bar skeleton', () => {
        const { container } = render(<ProductTableSkeleton />)

        // Search bar skeleton
        const searchElements = container.querySelectorAll('.h-10')
        expect(searchElements.length).toBeGreaterThanOrEqual(2) // Search + button
    })

    it('renders skeleton rows', () => {
        const { container } = render(<ProductTableSkeleton />)

        // Each row has h-24 class
        const rows = container.querySelectorAll('.h-24')
        expect(rows.length).toBe(10) // Should have 10 rows
    })

    it('applies gray backgrounds to skeleton elements', () => {
        const { container } = render(<ProductTableSkeleton />)

        const grayBg = container.querySelectorAll('[class*="bg-gray"]')
        expect(grayBg.length).toBeGreaterThan(10)
    })

    it('renders pagination skeleton', () => {
        const { container } = render(<ProductTableSkeleton />)

        // Pagination at bottom
        const pagination = container.querySelector('.mt-4')
        expect(pagination).toBeInTheDocument()
    })

    it('renders complete skeleton structure', () => {
        const { container } = render(<ProductTableSkeleton />)

        // Check major sections exist
        const sections = {
            title: container.querySelector('.mb-6'),
            table: container.querySelector('.border'),
            pagination: container.querySelector('.mt-4')
        }

        expect(sections.title).toBeInTheDocument()
        expect(sections.table).toBeInTheDocument()
        expect(sections.pagination).toBeInTheDocument()
    })
})
