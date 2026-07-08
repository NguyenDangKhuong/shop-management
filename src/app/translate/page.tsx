import type { Metadata } from 'next'
import TranslateClient from './TranslateClient'

export const metadata: Metadata = {
    title: 'Translate | VI ↔ EN',
    description: 'Dịch tiếng Việt sang tiếng Anh và ngược lại. Vietnamese-English translator powered by AI.',
}

export default function TranslatePage() {
    return <TranslateClient />
}
