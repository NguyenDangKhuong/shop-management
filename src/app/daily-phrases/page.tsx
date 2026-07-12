import { Metadata } from 'next'
import DailyPhrasesClient from './DailyPhrasesClient'

export const metadata: Metadata = {
    title: 'Daily English Phrases — Standup & Dev',
    description: 'Learn English phrases for daily standups, code reviews, and corporate meetings with spaced repetition.',
}

export default function DailyPhrasesPage() {
    return <DailyPhrasesClient />
}
