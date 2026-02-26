import { Metadata } from 'next'
import LeetCodePlayground from './LeetCodePlayground'

export const metadata: Metadata = {
    title: 'LeetCode JS Playground | TheTapHoa',
    description: 'Practice LeetCode problems with JavaScript — online code editor with auto-test, hints, and progress tracking.',
}

export default function LeetCodePage() {
    return <LeetCodePlayground />
}
