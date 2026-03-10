import { Metadata } from 'next'
import { TweetsFeed } from './TweetsFeed'
import { TweetSearch } from './TweetSearch'
import { BackToTop } from './BackToTop'

export const metadata: Metadata = {
    title: 'X Tweets',
    description: 'View tweets from X (Twitter).',
    icons: [],
    manifest: null,
}

export default function TweetsPage() {
    return (
        <div className="bg-[#0a0a0a] text-slate-200 font-sans min-h-screen flex flex-col items-center px-0 py-4 md:p-8 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-slate-900 via-[#0a0a0a] to-[#0a0a0a] relative">
            {/* Title */}
            <div className="w-full max-w-3xl mx-auto mb-8 z-10 px-4 md:px-0">
                <div className="flex items-center gap-3 mb-2">
                    <span className="text-3xl">𝕏</span>
                    <h1 className="text-3xl md:text-4xl font-bold text-white">Tweets</h1>
                </div>
            </div>

            {/* Unified Feed — For You / Following / User timeline */}
            <TweetsFeed />

            {/* Tweet Search + Dynamic Tweets (Embed) */}
            <TweetSearch />

            <BackToTop />

            {/* Background */}
            <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 overflow-hidden" aria-hidden="true">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 rounded-full blur-[100px]" />
            </div>
        </div>
    )
}
