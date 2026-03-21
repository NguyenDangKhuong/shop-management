import { Metadata } from 'next'
import { TweetsShell } from './TweetsShell'

export const metadata: Metadata = {
    title: {
        absolute: 'X Tweets',
    },
    description: 'View tweets from X (Twitter).',
    icons: [],
    manifest: null,
}

export default function TweetsLayout({ children }: { children: React.ReactNode }) {
    return <TweetsShell>{children}</TweetsShell>
}
