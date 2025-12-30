import { render, screen } from '@testing-library/react'
import DashboardTitle from '@/components/dashboard/DashboardTitle'

describe('DashboardTitle Component', () => {
    it('renders page name correctly', () => {
        render(<DashboardTitle pageName="products" totalDocs={100} />)

        // Use getByRole for the heading
        expect(screen.getByRole('heading', { name: /products/i })).toBeInTheDocument()
    })

    it('displays total document count', () => {
        render(<DashboardTitle pageName="categories" totalDocs={50} />)

        expect(screen.getByText(/50/)).toBeInTheDocument()
    })

    it('handles zero total docs', () => {
        render(<DashboardTitle pageName="orders" totalDocs={0} />)

        expect(screen.getByText(/0/)).toBeInTheDocument()
    })

    it('handles large numbers correctly', () => {
        render(<DashboardTitle pageName="items" totalDocs={999999} />)

        expect(screen.getByText(/999999/)).toBeInTheDocument()
    })

    it('capitalizes page name properly', () => {
        render(<DashboardTitle pageName="danh mục" totalDocs={25} />)

        // Use getByRole for the heading
        expect(screen.getByRole('heading', { name: /danh mục/i })).toBeInTheDocument()
    })
})
