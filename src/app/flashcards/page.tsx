import { Metadata } from 'next'
import FlashcardApp from './FlashcardApp'
import { PUBLIC_SITE_NAME } from '@/utils/constants'

export const metadata: Metadata = {
    title: `Algorithm Flashcards | ${PUBLIC_SITE_NAME}`,
    description: 'Interactive flashcards to memorize LeetCode algorithm patterns — HashMap, Two Pointers, Sliding Window, Stack, Binary Search, BFS/DFS, DP and more.',
}

export default function FlashcardsPage() {
    return <FlashcardApp />
}
