'use client'

import { useEffect, useState, useCallback, useRef } from 'react'

interface TocItem {
    id: string
    text: string
    level: 2 | 3
}

export function TableOfContents() {
    const [items, setItems] = useState<TocItem[]>([])
    const [activeId, setActiveId] = useState<string>('')
    const [mobileOpen, setMobileOpen] = useState(false)
    const observerRef = useRef<IntersectionObserver | null>(null)
    const mutationRef = useRef<MutationObserver | null>(null)

    // Scan headings from the article
    useEffect(() => {
        const article = document.querySelector('article')
        if (!article) return

        function scanHeadings() {
            const headings = article!.querySelectorAll('h2[id], h3[id]')
            const allItems: TocItem[] = Array.from(headings).map((heading) => ({
                id: heading.id,
                text: heading.textContent?.replace(/^[^\w\s]*\s*/, '') || '',
                level: heading.tagName === 'H2' ? 2 : 3,
            }))

            // Filter out h3 headings with duplicate text (e.g., repeated "Problem", "Solution")
            const h3TextCount = new Map<string, number>()
            allItems.filter((i) => i.level === 3).forEach((i) => {
                h3TextCount.set(i.text, (h3TextCount.get(i.text) || 0) + 1)
            })
            const tocItems = allItems.filter(
                (item) => item.level === 2 || (h3TextCount.get(item.text) || 0) <= 1
            )
            setItems(tocItems)

            // Reconnect IntersectionObserver with new headings
            observerRef.current?.disconnect()
            observerRef.current = new IntersectionObserver(
                (entries) => {
                    const visible = entries.find((e) => e.isIntersecting)
                    if (visible) {
                        setActiveId(visible.target.id)
                    }
                },
                { rootMargin: '-80px 0px -70% 0px', threshold: 0 }
            )
            headings.forEach((h) => observerRef.current?.observe(h))
        }

        scanHeadings()

        let debounceTimer: ReturnType<typeof setTimeout>
        mutationRef.current = new MutationObserver(() => {
            clearTimeout(debounceTimer)
            debounceTimer = setTimeout(scanHeadings, 150)
        })
        mutationRef.current.observe(article, { childList: true, subtree: true })

        return () => {
            clearTimeout(debounceTimer)
            observerRef.current?.disconnect()
            mutationRef.current?.disconnect()
        }
    }, [])

    const scrollTo = useCallback((id: string) => {
        const el = document.getElementById(id)
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' })
            history.replaceState(null, '', `#${id}`)
        }
        setMobileOpen(false)
    }, [])

    if (items.length < 2) return null

    const tocList = (
        <>
            <div className="text-xs font-bold text-text-muted uppercase tracking-wider mb-3">
                📑 Mục lục
            </div>
            <ul className="space-y-0.5 border-l border-border-primary">
                {items.map((item) => (
                    <li key={item.id}>
                        <button
                            onClick={() => scrollTo(item.id)}
                            className={`
                                block w-full text-left text-xs leading-relaxed py-1 transition-all duration-200 border-l-2 -ml-px
                                ${item.level === 3 ? 'pl-5' : 'pl-3'}
                                ${activeId === item.id
                                    ? 'border-[#38bdf8] text-[#38bdf8] font-medium'
                                    : 'border-transparent text-text-muted hover:text-text-secondary hover:border-border-primary'
                                }
                            `}
                            title={item.text}
                        >
                            <span className="line-clamp-2">{item.text}</span>
                        </button>
                    </li>
                ))}
            </ul>
        </>
    )

    return (
        <>
            {/* Desktop — fixed left sidebar */}
            <nav
                className="hidden xl:block fixed top-24 z-20 w-52 max-h-[calc(100vh-8rem)] overflow-y-auto scrollbar-thin"
                style={{ left: 'max(1rem, calc((100vw - 48rem) / 2 - 14rem))' }}
                aria-label="Table of contents"
            >
                {tocList}
            </nav>

            {/* Mobile — floating button + drawer */}
            <button
                onClick={() => setMobileOpen(true)}
                className="xl:hidden fixed bottom-20 left-4 z-50 w-10 h-10 rounded-full bg-bg-surface-dim border border-border-primary text-text-secondary hover:text-text-primary transition-all duration-300 flex items-center justify-center shadow-lg"
                aria-label="Open table of contents"
            >
                📑
            </button>

            {/* Mobile drawer overlay */}
            {mobileOpen && (
                <div className="xl:hidden fixed inset-0 z-50" onClick={() => setMobileOpen(false)}>
                    {/* Backdrop */}
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
                    {/* Drawer */}
                    <nav
                        className="absolute left-0 top-0 h-full w-72 bg-bg-page border-r border-border-primary p-6 pt-16 overflow-y-auto shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                        aria-label="Table of contents"
                    >
                        <button
                            onClick={() => setMobileOpen(false)}
                            className="absolute top-4 right-4 text-text-muted hover:text-text-primary transition text-xl"
                            aria-label="Close table of contents"
                        >
                            ✕
                        </button>
                        {tocList}
                    </nav>
                </div>
            )}
        </>
    )
}
