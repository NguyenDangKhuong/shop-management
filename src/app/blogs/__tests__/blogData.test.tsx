import { blogPosts, getBlogBySlug, getAllSlugs } from '@/app/blogs/blogData'

describe('blogData', () => {
    describe('blogPosts', () => {
        it('should have at least one blog post', () => {
            expect(blogPosts.length).toBeGreaterThan(0)
        })

        it('each post should have required fields', () => {
            blogPosts.forEach((post) => {
                expect(post.slug).toBeTruthy()
                expect(post.title).toBeTruthy()
                expect(post.description).toBeTruthy()
                expect(post.date).toBeTruthy()
                expect(post.tags.length).toBeGreaterThan(0)
                expect(post.emoji).toBeTruthy()
                expect(post.color).toBeTruthy()
                expect(post.content).toBeTruthy()
            })
        })

        it('each post should have a unique slug', () => {
            const slugs = blogPosts.map((p) => p.slug)
            const uniqueSlugs = new Set(slugs)
            expect(uniqueSlugs.size).toBe(slugs.length)
        })

        it('each post date should be a valid date string', () => {
            blogPosts.forEach((post) => {
                const date = new Date(post.date)
                expect(date.toString()).not.toBe('Invalid Date')
            })
        })

        it('each post color should be a valid hex color', () => {
            blogPosts.forEach((post) => {
                expect(post.color).toMatch(/^#[0-9a-fA-F]{6}$/)
            })
        })
    })

    describe('getBlogBySlug', () => {
        it('returns the correct blog post for a valid slug', () => {
            const post = getBlogBySlug('callback-promise-async-await')
            expect(post).toBeDefined()
            expect(post?.title).toContain('Callback')
            expect(post?.title).toContain('Promise')
            expect(post?.title).toContain('Async/Await')
        })

        it('returns undefined for an invalid slug', () => {
            const post = getBlogBySlug('non-existent-slug')
            expect(post).toBeUndefined()
        })
    })

    describe('getAllSlugs', () => {
        it('returns an array of all slugs', () => {
            const slugs = getAllSlugs()
            expect(Array.isArray(slugs)).toBe(true)
            expect(slugs.length).toBe(blogPosts.length)
        })

        it('contains the callback-promise-async-await slug', () => {
            const slugs = getAllSlugs()
            expect(slugs).toContain('callback-promise-async-await')
        })
    })
})
