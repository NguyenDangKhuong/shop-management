// Blog post metadata for listing — content rendered via WebView
import { API_BASE_URL } from './api'

export interface BlogPostMeta {
    slug: string
    title: { vi: string; en: string }
    description: { vi: string; en: string }
    date: string
    tags: string[]
    emoji: string
    color: string
}

// Get the full blog URL for WebView
export const getBlogUrl = (slug: string) => `${API_BASE_URL}/blogs/${slug}`

export const blogPosts: BlogPostMeta[] = [
    {
        slug: 'hash-map-pattern',
        title: { vi: 'Hash Map Pattern', en: 'Hash Map Pattern' },
        description: {
            vi: 'Giải thích chi tiết Hash Map/Set với các bài LeetCode',
            en: 'Deep dive into Hash Map/Set with LeetCode problems',
        },
        date: '2026-02-26',
        tags: ['Algorithm', 'Hash Map', 'LeetCode'],
        emoji: '🗂️',
        color: '#4ade80',
    },
    {
        slug: 'frontend-interview-roadmap',
        title: { vi: 'Frontend Interview Roadmap', en: 'Frontend Interview Roadmap' },
        description: {
            vi: 'Lộ trình ôn thi phỏng vấn Frontend',
            en: 'Frontend interview preparation roadmap',
        },
        date: '2026-02-25',
        tags: ['Interview', 'Frontend', 'Roadmap'],
        emoji: '🗺️',
        color: '#60a5fa',
    },
    {
        slug: 'data-types-structures',
        title: { vi: 'Data Types & Structures', en: 'Data Types & Structures' },
        description: {
            vi: 'Kiểu dữ liệu và cấu trúc dữ liệu trong JavaScript',
            en: 'Data types and data structures in JavaScript',
        },
        date: '2026-02-24',
        tags: ['JavaScript', 'Data Structures'],
        emoji: '📦',
        color: '#fbbf24',
    },
    {
        slug: 'algorithm-patterns',
        title: { vi: 'Algorithm Patterns', en: 'Algorithm Patterns' },
        description: {
            vi: '7 pattern thuật toán cốt lõi cho phỏng vấn',
            en: '7 core algorithm patterns for interviews',
        },
        date: '2026-02-26',
        tags: ['Algorithm', 'Patterns'],
        emoji: '🧩',
        color: '#a78bfa',
    },
]
