import React from 'react'

export type Lang = 'vi' | 'en'

export interface BlogPost {
    slug: string
    title: Record<Lang, string>
    description: Record<Lang, string>
    date: string
    tags: string[]
    emoji: string
    color: string
    content: Record<Lang, React.ReactNode>
    sections?: { id: string; title: Record<Lang, string> }[]
}
