'use client'

import { useState } from 'react'
import { TweetSearch } from './TweetSearch'
import { GraphQLTimeline } from './GraphQLTimeline'
import { GraphQLTweets } from './GraphQLTweets'
import { HomeFeed } from './HomeFeed'
import { BackToTop } from './BackToTop'

/**
 * TweetsClient — Client wrapper for the tweets page.
 *
 * Manages navigation between:
 *   1. Home view: For You / Following tabs + GraphQL Timeline + Search
 *   2. User profile view: Shows tweets from a specific @username
 *
 * When a username is clicked anywhere in the app, it navigates to the
 * user profile view. The back button returns to the home view.
 */
export function TweetsClient() {
    const [selectedUser, setSelectedUser] = useState<string | null>(null)

    const handleUserClick = (username: string) => {
        setSelectedUser(username)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const handleBack = () => {
        setSelectedUser(null)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    // ─── User Profile View ───────────────────────────────────────────────
    if (selectedUser) {
        return (
            <>
                {/* Header with back button */}
                <div className="w-full max-w-3xl mx-auto mb-4 z-10 px-4 md:px-0">
                    <button
                        onClick={handleBack}
                        className="flex items-center gap-2 text-slate-400 hover:text-white transition mb-4 cursor-pointer"
                    >
                        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                            <path d="M7.414 13l5.043 5.04-1.414 1.42L3.586 12l7.457-7.46 1.414 1.42L7.414 11H21v2H7.414z" />
                        </svg>
                        <span className="text-sm font-medium">Back</span>
                    </button>

                    <div className="flex items-center gap-3 mb-2">
                        <span className="text-3xl">👤</span>
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold text-white">@{selectedUser}</h1>
                            <p className="text-slate-500 text-sm">Tweets from this user</p>
                        </div>
                    </div>
                </div>

                {/* User's tweets */}
                <div className="w-full max-w-3xl mx-auto z-10 px-4 md:px-0">
                    <GraphQLTweets username={selectedUser} onUserClick={handleUserClick} />
                </div>
            </>
        )
    }

    // ─── Home View ───────────────────────────────────────────────────────
    return (
        <>
            {/* Title */}
            <div className="w-full max-w-3xl mx-auto mb-8 z-10 px-4 md:px-0">
                <div className="flex items-center gap-3 mb-2">
                    <span className="text-3xl">𝕏</span>
                    <h1 className="text-3xl md:text-4xl font-bold text-white">Tweets</h1>
                </div>
                <p className="text-slate-400">
                    Paste link tweet từ X để xem trực tiếp trên trang.
                </p>
            </div>

            {/* Home Feed — For You / Following tabs */}
            <HomeFeed onUserClick={handleUserClick} />

            {/* GraphQL Tweets — Custom rendered with pagination */}
            <GraphQLTimeline />

            {/* Tweet Search + Dynamic Tweets (Embed) */}
            <TweetSearch />

            <BackToTop />
        </>
    )
}
