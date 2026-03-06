import { Metadata } from 'next'
import FlashcardApp from './FlashcardApp'

export const metadata: Metadata = {
    title: 'Algorithm Flashcards | TheTapHoa',
    description: 'Interactive flashcards to memorize LeetCode algorithm patterns — HashMap, Two Pointers, Sliding Window, Stack, Binary Search, BFS/DFS, DP and more.',
}

export default function FlashcardsPage() {
    return <FlashcardApp />
}
