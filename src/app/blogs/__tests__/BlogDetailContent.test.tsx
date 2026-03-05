/**
 * Tests for BlogDetailContent sticky header and back-to-top button.
 *
 * These tests verify:
 *   - Header renders with logo, navigation, theme toggle, and lang switcher
 *   - Back to top button exists (initially hidden)
 *   - Post metadata renders (title, description, tags, date)
 *   - Related posts render correctly
 */

import { render, screen, fireEvent } from '@testing-library/react'

// Mock LangContext — provides { t, lang } to BlogDetailContent
jest.mock('@/app/blogs/components/LangContext', () => ({
    useLang: () => ({ t: (obj: { vi: string; en: string }) => obj.vi, lang: 'vi' as const }),
}))

// Mock ThemeToggle + LangSwitcher
jest.mock('@/components/ui/ThemeToggle', () => {
    const MockThemeToggle = () => <button>ThemeToggle</button>
    MockThemeToggle.displayName = 'ThemeToggle'
    return MockThemeToggle
})
jest.mock('@/app/blogs/components/LangSwitcher', () => {
    const MockLangSwitcher = () => <button>LangSwitcher</button>
    MockLangSwitcher.displayName = 'LangSwitcher'
    return MockLangSwitcher
})

import { BlogDetailContent } from '@/app/blogs/components/BlogDetailContent'

const mockPost = {
    slug: 'test-post',
    title: { vi: 'Tiêu đề test', en: 'Test Title' },
    description: { vi: 'Mô tả test', en: 'Test Description' },
    date: '2026-03-05',
    tags: ['React', 'TypeScript'],
    emoji: '🧪',
    color: '#38bdf8',
    content: {
        vi: <div>Nội dung tiếng Việt</div>,
        en: <div>English Content</div>,
    },
}

const mockRelated = [
    {
        slug: 'related-1',
        title: { vi: 'Bài viết liên quan 1', en: 'Related Post 1' },
        description: { vi: 'Mô tả 1', en: 'Desc 1' },
        date: '2026-03-01',
        tags: ['Next.js'],
        emoji: '📝',
        color: '#c084fc',
        content: { vi: <div />, en: <div /> },
    },
]

describe('BlogDetailContent', () => {
    it('renders post title and description', () => {
        render(<BlogDetailContent post={mockPost} relatedPosts={[]} />)

        expect(screen.getByText('Tiêu đề test')).toBeInTheDocument()
        expect(screen.getByText('Mô tả test')).toBeInTheDocument()
    })

    it('renders post tags', () => {
        render(<BlogDetailContent post={mockPost} relatedPosts={[]} />)

        expect(screen.getByText('React')).toBeInTheDocument()
        expect(screen.getByText('TypeScript')).toBeInTheDocument()
    })

    it('renders post emoji and date', () => {
        render(<BlogDetailContent post={mockPost} relatedPosts={[]} />)

        expect(screen.getByText('🧪')).toBeInTheDocument()
        expect(screen.getByText(/2026-03-05/)).toBeInTheDocument()
    })

    it('renders post content', () => {
        render(<BlogDetailContent post={mockPost} relatedPosts={[]} />)

        expect(screen.getByText('Nội dung tiếng Việt')).toBeInTheDocument()
    })

    it('renders "Tất cả bài viết" back link on desktop', () => {
        render(<BlogDetailContent post={mockPost} relatedPosts={[]} />)

        expect(screen.getAllByText('← Tất cả bài viết')[0]).toBeInTheDocument()
    })

    it('renders logo with TheTapHoa text', () => {
        render(<BlogDetailContent post={mockPost} relatedPosts={[]} />)

        // Logo renders in both mobile and desktop views
        expect(screen.getAllByText('TapHoa').length).toBeGreaterThanOrEqual(1)
    })

    it('renders ThemeToggle and LangSwitcher', () => {
        render(<BlogDetailContent post={mockPost} relatedPosts={[]} />)

        expect(screen.getAllByText('ThemeToggle').length).toBeGreaterThanOrEqual(1)
        expect(screen.getAllByText('LangSwitcher').length).toBeGreaterThanOrEqual(1)
    })

    it('renders related posts when provided', () => {
        render(<BlogDetailContent post={mockPost} relatedPosts={mockRelated} />)

        expect(screen.getByText('Bài viết khác')).toBeInTheDocument()
        expect(screen.getByText('Bài viết liên quan 1')).toBeInTheDocument()
    })

    it('does not render related posts section when empty', () => {
        render(<BlogDetailContent post={mockPost} relatedPosts={[]} />)

        expect(screen.queryByText('Bài viết khác')).not.toBeInTheDocument()
    })

    it('renders back to top button (initially hidden via CSS)', () => {
        render(<BlogDetailContent post={mockPost} relatedPosts={[]} />)

        // Button exists but hidden (opacity-0) — we can still find by aria-label
        const btn = screen.getByLabelText('Back to top')
        expect(btn).toBeInTheDocument()
    })

    it('calls scrollTo when back to top button is clicked', () => {
        const scrollToMock = jest.fn()
        window.scrollTo = scrollToMock

        render(<BlogDetailContent post={mockPost} relatedPosts={[]} />)

        const btn = screen.getByLabelText('Back to top')
        fireEvent.click(btn)

        expect(scrollToMock).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' })
    })

    it('renders footer text', () => {
        render(<BlogDetailContent post={mockPost} relatedPosts={[]} />)

        expect(screen.getByText(/Built with Next.js/)).toBeInTheDocument()
    })
})
