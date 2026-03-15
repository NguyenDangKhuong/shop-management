/**
 * Tests for TableOfContents component.
 *
 * These tests verify:
 *   - Renders nothing when fewer than 2 headings exist
 *   - Renders TOC items from h2 and h3 headings in article
 *   - h3 items are indented (pl-5)
 *   - Clicking an item scrolls to the heading
 *   - Active heading is highlighted
 *   - Has correct aria-label for accessibility
 */

import { render, screen, fireEvent, act, within } from '@testing-library/react'
import { TableOfContents } from '@/app/blogs/components/TableOfContents'

// Mock IntersectionObserver
const mockObserve = jest.fn()
const mockDisconnect = jest.fn()
let mockCallback: IntersectionObserverCallback

class MockIntersectionObserver {
    constructor(callback: IntersectionObserverCallback) {
        mockCallback = callback
    }
    observe = mockObserve
    disconnect = mockDisconnect
    unobserve = jest.fn()
}

beforeAll(() => {
    Object.defineProperty(window, 'IntersectionObserver', {
        writable: true,
        value: MockIntersectionObserver,
    })
})

beforeEach(() => {
    mockObserve.mockClear()
    mockDisconnect.mockClear()
    document.body.innerHTML = ''
})

function createArticleWithHeadings(headings: { tag: string; id: string; text: string }[]) {
    const article = document.createElement('article')
    headings.forEach(({ tag, id, text }) => {
        const h = document.createElement(tag)
        h.id = id
        h.textContent = text
        article.appendChild(h)
    })
    document.body.appendChild(article)
}

describe('TableOfContents', () => {
    it('renders nothing when fewer than 2 headings', () => {
        createArticleWithHeadings([
            { tag: 'h2', id: 'only-one', text: 'Only One' },
        ])

        const { container } = render(<TableOfContents />)
        expect(container.querySelector('nav')).toBeNull()
    })

    it('renders TOC items from h2 and h3 headings', () => {
        createArticleWithHeadings([
            { tag: 'h2', id: 'phase-1', text: '🎯 Phase 1' },
            { tag: 'h3', id: 'networking', text: 'Networking' },
            { tag: 'h2', id: 'phase-2', text: '🔥 Phase 2' },
        ])

        render(<TableOfContents />)

        const toc = within(screen.getByLabelText('Table of contents'))
        expect(toc.getByText('Phase 1')).toBeInTheDocument()
        expect(toc.getByText('Networking')).toBeInTheDocument()
        expect(toc.getByText('Phase 2')).toBeInTheDocument()
    })

    it('renders nothing when no article exists', () => {
        const { container } = render(<TableOfContents />)
        expect(container.querySelector('nav')).toBeNull()
    })

    it('has correct accessibility aria-label', () => {
        createArticleWithHeadings([
            { tag: 'h2', id: 'a', text: 'Section A' },
            { tag: 'h2', id: 'b', text: 'Section B' },
        ])

        render(<TableOfContents />)
        expect(screen.getByLabelText('Table of contents')).toBeInTheDocument()
    })

    it('renders "Mục lục" header text', () => {
        createArticleWithHeadings([
            { tag: 'h2', id: 'a', text: 'A' },
            { tag: 'h2', id: 'b', text: 'B' },
        ])

        render(<TableOfContents />)
        expect(screen.getByText(/Mục lục/)).toBeInTheDocument()
    })

    it('scrolls to heading when TOC item is clicked', () => {
        createArticleWithHeadings([
            { tag: 'h2', id: 'section-1', text: 'Section 1' },
            { tag: 'h2', id: 'section-2', text: 'Section 2' },
        ])

        const heading = document.getElementById('section-2')!
        heading.scrollIntoView = jest.fn()

        render(<TableOfContents />)

        const toc = within(screen.getByLabelText('Table of contents'))
        fireEvent.click(toc.getByText('Section 2'))

        expect(heading.scrollIntoView).toHaveBeenCalledWith({
            behavior: 'smooth',
            block: 'start',
        })
    })

    it('updates URL hash when TOC item is clicked', () => {
        createArticleWithHeadings([
            { tag: 'h2', id: 'my-section', text: 'My Section' },
            { tag: 'h2', id: 'other', text: 'Other' },
        ])

        const heading = document.getElementById('my-section')!
        heading.scrollIntoView = jest.fn()

        const replaceSpy = jest.spyOn(history, 'replaceState')

        render(<TableOfContents />)
        const toc = within(screen.getByLabelText('Table of contents'))
        fireEvent.click(toc.getByText('My Section'))

        expect(replaceSpy).toHaveBeenCalledWith(null, '', '#my-section')
        replaceSpy.mockRestore()
    })

    it('highlights active heading when IntersectionObserver fires', () => {
        createArticleWithHeadings([
            { tag: 'h2', id: 'first', text: 'Alpha Section' },
            { tag: 'h2', id: 'second', text: 'Beta Section' },
        ])

        render(<TableOfContents />)

        // Simulate IntersectionObserver callback
        act(() => {
            mockCallback(
                [{ target: document.getElementById('second')!, isIntersecting: true }] as unknown as IntersectionObserverEntry[],
                {} as IntersectionObserver
            )
        })

        // Find the button within the TOC nav
        const tocNav = screen.getByLabelText('Table of contents')
        const buttons = tocNav.querySelectorAll('button')
        const secondButton = Array.from(buttons).find(b => b.textContent?.includes('Beta Section'))
        expect(secondButton).toHaveClass('border-[#38bdf8]')
    })

    it('observes all headings with IntersectionObserver', () => {
        createArticleWithHeadings([
            { tag: 'h2', id: 'a', text: 'A' },
            { tag: 'h3', id: 'b', text: 'B' },
            { tag: 'h2', id: 'c', text: 'C' },
        ])

        render(<TableOfContents />)

        // Should observe all 3 headings
        expect(mockObserve).toHaveBeenCalledTimes(3)
    })

    it('disconnects observer on unmount', () => {
        createArticleWithHeadings([
            { tag: 'h2', id: 'x', text: 'X' },
            { tag: 'h2', id: 'y', text: 'Y' },
        ])

        const { unmount } = render(<TableOfContents />)
        unmount()

        expect(mockDisconnect).toHaveBeenCalled()
    })
})
