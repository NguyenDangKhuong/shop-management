import { Metadata } from 'next'
import LeetCodePlayground from './LeetCodePlayground'
import { PUBLIC_SITE_NAME } from '@/utils/constants'

export const metadata: Metadata = {
    title: `LeetCode JS Playground | ${PUBLIC_SITE_NAME}`,
    description: 'Practice LeetCode problems with JavaScript — online code editor with auto-test, hints, and progress tracking.',
}

export default function LeetCodePage() {
    return <LeetCodePlayground />
}
