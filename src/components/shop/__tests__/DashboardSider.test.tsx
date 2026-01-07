import { render, screen } from '@testing-library/react'
import { usePathname } from 'next/navigation'
import DashboardSider from '../DashboardSider'

// Mock Next.js navigation
jest.mock('next/navigation', () => ({
    usePathname: jest.fn()
}))

describe('DashboardSider', () => {
    beforeEach(() => {
        (usePathname as jest.Mock).mockReturnValue('/shopee-links')

        // Mock global fetch
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve({ success: true, data: [] })
            })
        ) as jest.Mock
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    it('should render the logo', () => {
        render(<DashboardSider collapsed={false} />)
        const logo = screen.getByAltText('logo')
        expect(logo).toBeInTheDocument()
        expect(logo).toHaveAttribute('src', '/image/logo.png')
    })

    it('should render all menu items in correct order', () => {
        render(<DashboardSider collapsed={false} />)

        const menuItems = [
            'TikTok Accounts',
            'Shopee Links',
            'Facebook Posts',
            'Thanh toán',
            'Sản phẩm',
            'Danh mục',
            'Thống kê'
        ]

        menuItems.forEach((item) => {
            expect(screen.getByText(item)).toBeInTheDocument()
        })

        // Verify order by checking DOM order
        const links = screen.getAllByRole('link')
        expect(links[1]).toHaveTextContent('TikTok Accounts') // First menu item (index 1 because logo is index 0)
        expect(links[2]).toHaveTextContent('Shopee Links')
        expect(links[3]).toHaveTextContent('Facebook Posts')
        expect(links[4]).toHaveTextContent('Thanh toán')
        expect(links[5]).toHaveTextContent('Sản phẩm')
        expect(links[6]).toHaveTextContent('Danh mục')
        expect(links[7]).toHaveTextContent('Thống kê')
    })

    it('should have correct navigation links', () => {
        render(<DashboardSider collapsed={false} />)

        expect(screen.getByText('TikTok Accounts').closest('a')).toHaveAttribute('href', '/tiktok-accounts')
        expect(screen.getByText('Shopee Links').closest('a')).toHaveAttribute('href', '/shopee-links')
        expect(screen.getByText('Facebook Posts').closest('a')).toHaveAttribute('href', '/facebook-posts')
        expect(screen.getByText('Thanh toán').closest('a')).toHaveAttribute('href', '/carts')
        expect(screen.getByText('Sản phẩm').closest('a')).toHaveAttribute('href', '/products')
        expect(screen.getByText('Danh mục').closest('a')).toHaveAttribute('href', '/categories')
        expect(screen.getByText('Thống kê').closest('a')).toHaveAttribute('href', '/orders')
    })

    it('should render when collapsed', () => {
        render(<DashboardSider collapsed={true} />)
        const logo = screen.getByAltText('logo')
        expect(logo).toBeInTheDocument()
    })

    it('should have TikTok Accounts as first menu item', () => {
        render(<DashboardSider collapsed={false} />)
        const links = screen.getAllByRole('link')
        // Index 1 because logo link is at index 0
        expect(links[1]).toHaveTextContent('TikTok Accounts')
        expect(links[1]).toHaveAttribute('href', '/tiktok-accounts')
    })

    it('should render all required icons', () => {
        const { container } = render(<DashboardSider collapsed={false} />)

        // Check for icon classes - Ant Design uses these classes for icons
        expect(container.querySelector('.anticon-shopping')).toBeInTheDocument() // ShoppingOutlined
        expect(container.querySelector('.anticon-facebook')).toBeInTheDocument() // FacebookOutlined
        expect(container.querySelector('.anticon-tik-tok')).toBeInTheDocument() // TikTokOutlined
        expect(container.querySelector('.anticon-shopping-cart')).toBeInTheDocument() // ShoppingCartOutlined
        expect(container.querySelector('.anticon-table')).toBeInTheDocument() // TableOutlined
        expect(container.querySelector('.anticon-book')).toBeInTheDocument() // BookOutlined
        expect(container.querySelector('.anticon-bar-chart')).toBeInTheDocument() // BarChartOutlined
    })

    it('should use dark theme for menu', () => {
        const { container } = render(<DashboardSider collapsed={false} />)
        const menu = container.querySelector('.ant-menu')
        expect(menu).toHaveClass('ant-menu-dark')
    })

    it('should handle different active paths', () => {
        (usePathname as jest.Mock).mockReturnValue('/facebook-posts')
        render(<DashboardSider collapsed={false} />)
        expect(screen.getByText('Facebook Posts')).toBeInTheDocument()
    })
})
