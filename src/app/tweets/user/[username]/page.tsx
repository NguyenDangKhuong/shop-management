'use client'

import { use } from 'react'
import { useRouter } from 'next/navigation'
import { GraphQLTweets } from '../../GraphQLTweets'

export default function UserTimelinePage({ params }: { params: Promise<{ username: string }> }) {
    const router = useRouter()
    const { username } = use(params)

    const handleUserClick = (clickedUsername: string) => {
        router.push(`/tweets/user/${clickedUsername}`)
    }

    return <GraphQLTweets key={username} username={username} onUserClick={handleUserClick} />
}
