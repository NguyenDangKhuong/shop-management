'use client'

import { useRouter } from 'next/navigation'
import { GraphQLTweets } from '../GraphQLTweets'

const PINNED_USERNAME = process.env.NEXT_PUBLIC_PINNED_USERNAME || ''

export default function LikesPage() {
    const router = useRouter()
    const handleUserClick = (username: string) => {
        router.push(`/tweets/user/${username}`)
    }

    return <GraphQLTweets key={`likes-${PINNED_USERNAME}`} username={PINNED_USERNAME} onUserClick={handleUserClick} apiEndpoint="/api/tweets/graphql/likes" />
}
