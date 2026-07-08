// Re-export everything from the modular structure
export type { BlogPost } from './types'
export { blogPosts } from './posts'

import { blogPosts } from './posts'
import type { BlogPost } from './types'

export function getBlogBySlug(slug: string): BlogPost | undefined {
    return blogPosts.find((post) => post.slug === slug)
}

export function getAllSlugs(): string[] {
    return blogPosts.map((post) => post.slug)
}
