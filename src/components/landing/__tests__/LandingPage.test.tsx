import { render, screen } from '@testing-library/react'
import LandingPage from '@/components/landing/LandingPage'

// Mock Next.js Image component
jest.mock('next/image', () => ({
    __esModule: true,
    default: (props: any) => {
        // Filter out Next.js specific props that don't apply to <img>
        const { priority, quality, loading, sizes, ...imgProps } = props
        // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
        return <img {...imgProps} />
    }
}))

describe('LandingPage Component', () => {
    it('renders hero section with name "Khuong"', () => {
        render(<LandingPage />)

        expect(screen.getByText(/hello, i'm/i)).toBeInTheDocument()
        expect(screen.getAllByText(/khuong/i).length).toBeGreaterThan(0)
        expect(screen.getByText(/i build accessible web experiences/i)).toBeInTheDocument()
    })

    it('displays login button with correct link', () => {
        render(<LandingPage />)

        const loginLink = screen.getByRole('link', { name: /login/i })
        expect(loginLink).toBeInTheDocument()
        expect(loginLink).toHaveAttribute('href', '/login')
    })

    it('shows TheTapHoa branding', () => {
        render(<LandingPage />)

        // Text appears multiple times, check it exists
        expect(screen.getAllByText(/taphoa/i).length).toBeGreaterThan(0)
    })

    it('renders "View Projects" button', () => {
        render(<LandingPage />)

        const viewProjectsLink = screen.getByRole('link', { name: /view projects/i })
        expect(viewProjectsLink).toBeInTheDocument()
        expect(viewProjectsLink).toHaveAttribute('href', '/projects')
    })

    it('displays tech stack section', () => {
        render(<LandingPage />)

        expect(screen.getByRole('heading', { name: /tech stack/i })).toBeInTheDocument()
    })

    it('shows about me section with description', () => {
        render(<LandingPage />)

        expect(screen.getByRole('heading', { name: /about me/i })).toBeInTheDocument()
        expect(screen.getByText(/i'm khuong, a front-end developer based in ho chi minh city/i)).toBeInTheDocument()
    })

    it('renders featured project section', () => {
        render(<LandingPage />)

        expect(screen.getByText(/featured project: e-commerce app/i)).toBeInTheDocument()
        expect(screen.getByRole('link', { name: /live demo/i })).toHaveAttribute('href', '/products')
        expect(screen.getByRole('link', { name: /admin panel/i })).toHaveAttribute('href', '/login')
    })

    it('displays contact section with email', () => {
        render(<LandingPage />)

        expect(screen.getByRole('heading', { name: /contact/i })).toBeInTheDocument()
        const emailLink = document.querySelector('a[href="mailto:nguyendangkhuong96@gmail.com"]')
        expect(emailLink).toBeInTheDocument()
    })

    it('shows performance stats badges', () => {
        render(<LandingPage />)

        expect(screen.getByRole('heading', { name: /performance stats/i })).toBeInTheDocument()

        // Use getAllByText since these labels appear multiple times
        const seoLabels = screen.getAllByText(/SEO/i)
        expect(seoLabels.length).toBeGreaterThan(0)

        const perfLabels = screen.getAllByText(/PERF/i)
        expect(perfLabels.length).toBeGreaterThan(0)

        const a11yLabels = screen.getAllByText(/A11Y/i)
        expect(a11yLabels.length).toBeGreaterThan(0)
    })

    it('renders dark mode toggle', () => {
        render(<LandingPage />)

        expect(screen.getByText(/dark mode/i)).toBeInTheDocument()
    })

    it('displays developer portrait image', () => {
        render(<LandingPage />)

        const portrait = screen.getByAltText(/khuong.*developer portrait/i)
        expect(portrait).toBeInTheDocument()
        expect(portrait).toHaveAttribute('src', '/image/home/avatar.jpg')
    })

    it('shows project mockup image', () => {
        render(<LandingPage />)

        const mockup = screen.getByAltText(/project mockup/i)
        expect(mockup).toBeInTheDocument()
    })

    it('displays timeline with dates', () => {
        render(<LandingPage />)

        expect(screen.getByText(/2018/i)).toBeInTheDocument()
        expect(screen.getByText(/2022/i)).toBeInTheDocument()
        expect(screen.getByText(/present/i)).toBeInTheDocument()
    })

    it('renders technology tags for featured project', () => {
        render(<LandingPage />)

        // Check that these technologies appear (they appear multiple times)
        expect(screen.getAllByText(/react/i).length).toBeGreaterThanOrEqual(1)
        expect(screen.getAllByText(/typescript/i).length).toBeGreaterThanOrEqual(1)
    })
})
