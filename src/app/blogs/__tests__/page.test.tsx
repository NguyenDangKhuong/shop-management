import { render, screen } from '@testing-library/react'
import BlogsPage from '@/app/blogs/page'

// Mock next/link
jest.mock('next/link', () => {
    return function MockLink({ children, href, ...props }: { children: React.ReactNode; href: string;[key: string]: unknown }) {
        return <a href={href} {...props}>{children}</a>
    }
})

// Mock LangContext
jest.mock('@/app/blogs/components/LangContext', () => ({
    LangProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
    useLang: () => ({
        lang: 'vi' as const,
        setLang: jest.fn(),
        t: (obj: Record<string, string>) => obj.vi,
    }),
}))

// Mock LangSwitcher
jest.mock('@/app/blogs/components/LangSwitcher', () => {
    return function MockLangSwitcher() {
        return <button>🇻🇳 / 🇬🇧</button>
    }
})

// Mock blogData
jest.mock('@/app/blogs/blogData', () => ({
    blogPosts: [
        {
            slug: 'test-post-1',
            title: { vi: 'Test Blog Post 1', en: 'Test Blog Post 1 EN' },
            description: { vi: 'Description for test post 1', en: 'Description for test post 1 EN' },
            date: '2026-01-01',
            tags: ['JavaScript', 'React'],
            emoji: '⚡',
            color: '#fbbf24',
            content: { vi: <div>Test content 1</div>, en: <div>Test content 1 EN</div> },
        },
        {
            slug: 'test-post-2',
            title: { vi: 'Test Blog Post 2', en: 'Test Blog Post 2 EN' },
            description: { vi: 'Description for test post 2', en: 'Description for test post 2 EN' },
            date: '2026-02-01',
            tags: ['TypeScript'],
            emoji: '🔷',
            color: '#3178C6',
            content: { vi: <div>Test content 2</div>, en: <div>Test content 2 EN</div> },
        },
    ],
}))

describe('BlogsPage', () => {
    it('renders the page heading', () => {
        render(<BlogsPage />)

        const heading = screen.getByRole('heading', { name: /blog/i, level: 1 })
        expect(heading).toBeInTheDocument()
    })

    it('displays the blog description in Vietnamese', () => {
        render(<BlogsPage />)

        expect(screen.getByText(/chia sẻ kiến thức frontend/i)).toBeInTheDocument()
    })

    it('renders all blog post cards', () => {
        render(<BlogsPage />)

        expect(screen.getByText('Test Blog Post 1')).toBeInTheDocument()
        expect(screen.getByText('Test Blog Post 2')).toBeInTheDocument()
    })

    it('displays blog post descriptions', () => {
        render(<BlogsPage />)

        expect(screen.getByText('Description for test post 1')).toBeInTheDocument()
        expect(screen.getByText('Description for test post 2')).toBeInTheDocument()
    })

    it('displays tags for each blog post', () => {
        render(<BlogsPage />)

        expect(screen.getByText('JavaScript')).toBeInTheDocument()
        expect(screen.getByText('React')).toBeInTheDocument()
        expect(screen.getByText('TypeScript')).toBeInTheDocument()
    })

    it('displays dates for each blog post', () => {
        render(<BlogsPage />)

        expect(screen.getByText('2026-01-01')).toBeInTheDocument()
        expect(screen.getByText('2026-02-01')).toBeInTheDocument()
    })

    it('renders links to individual blog posts', () => {
        render(<BlogsPage />)

        const links = screen.getAllByRole('link')
        const blogLinks = links.filter(
            (link) => link.getAttribute('href')?.startsWith('/blogs/')
        )
        expect(blogLinks).toHaveLength(2)
        expect(blogLinks[0]).toHaveAttribute('href', '/blogs/test-post-1')
        expect(blogLinks[1]).toHaveAttribute('href', '/blogs/test-post-2')
    })

    it('renders emojis for each blog post', () => {
        render(<BlogsPage />)

        expect(screen.getByText('⚡')).toBeInTheDocument()
        expect(screen.getByText('🔷')).toBeInTheDocument()
    })

    it('renders the TheTapHoa logo link', () => {
        render(<BlogsPage />)

        const logoLinks = screen.getAllByRole('link').filter(
            (link) => link.getAttribute('href') === '/'
        )
        expect(logoLinks.length).toBeGreaterThan(0)
    })

    it('renders footer', () => {
        render(<BlogsPage />)

        expect(screen.getByText(/built with next\.js/i)).toBeInTheDocument()
    })

    it('renders the language switcher', () => {
        render(<BlogsPage />)

        expect(screen.getByText('🇻🇳 / 🇬🇧')).toBeInTheDocument()
    })
})
