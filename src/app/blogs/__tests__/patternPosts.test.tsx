import { blogPosts, getBlogBySlug } from '@/app/blogs/blogData'

const newPatternSlugs = [
    'hash-map-pattern',
    'two-pointers-pattern',
    'sliding-window-pattern',
    'stack-pattern',
    'bfs-dfs-pattern',
    'binary-search-pattern',
    'dynamic-programming-pattern',
    'js-common-functions',
]

describe('Algorithm Pattern & JS Functions Posts', () => {
    it('all new posts should be registered in blogPosts', () => {
        const allSlugs = blogPosts.map((p) => p.slug)
        newPatternSlugs.forEach((slug) => {
            expect(allSlugs).toContain(slug)
        })
    })

    newPatternSlugs.forEach((slug) => {
        describe(slug, () => {
            it('should be retrievable via getBlogBySlug', () => {
                const post = getBlogBySlug(slug)
                expect(post).toBeDefined()
            })

            it('should have bilingual title (vi and en)', () => {
                const post = getBlogBySlug(slug)!
                expect(post.title).toHaveProperty('vi')
                expect(post.title).toHaveProperty('en')
                expect(post.title.vi.length).toBeGreaterThan(0)
                expect(post.title.en.length).toBeGreaterThan(0)
            })

            it('should have bilingual description', () => {
                const post = getBlogBySlug(slug)!
                expect(post.description).toHaveProperty('vi')
                expect(post.description).toHaveProperty('en')
            })

            it('should have bilingual content', () => {
                const post = getBlogBySlug(slug)!
                expect(post.content).toHaveProperty('vi')
                expect(post.content).toHaveProperty('en')
            })

            it('should have valid metadata', () => {
                const post = getBlogBySlug(slug)!
                expect(post.tags.length).toBeGreaterThan(0)
                expect(post.emoji).toBeTruthy()
                expect(post.color).toMatch(/^#[0-9a-fA-F]{6}$/)
                expect(new Date(post.date).toString()).not.toBe('Invalid Date')
            })
        })
    })

    it('all pattern slugs should be unique', () => {
        const uniqueSlugs = new Set(newPatternSlugs)
        expect(uniqueSlugs.size).toBe(newPatternSlugs.length)
    })

    it('pattern posts should have the Algorithm tag', () => {
        const patternSlugs = newPatternSlugs.filter((s) => s.endsWith('-pattern'))
        patternSlugs.forEach((slug) => {
            const post = getBlogBySlug(slug)!
            expect(post.tags).toContain('Algorithm')
        })
    })

    it('js-common-functions should have the JavaScript tag', () => {
        const post = getBlogBySlug('js-common-functions')!
        expect(post.tags).toContain('JavaScript')
    })
})
