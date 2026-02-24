import React from 'react'

export interface BlogPost {
    slug: string
    title: string
    description: string
    date: string
    tags: string[]
    emoji: string
    color: string
    content: React.ReactNode
}
