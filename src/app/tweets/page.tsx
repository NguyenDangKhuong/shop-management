import { Metadata } from 'next'
import Link from 'next/link'
import { TweetSearch } from './TweetSearch'

export const metadata: Metadata = {
    title: 'Tweets - Nguyen Dang Khuong',
    description: 'Các bài viết nổi bật từ X (Twitter) về Frontend, JavaScript, React và công nghệ.',
}

export default function TweetsPage() {
    return (
        <div className="bg-[#0a0a0a] text-slate-200 font-sans min-h-screen flex flex-col items-center p-4 md:p-8 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-slate-900 via-[#0a0a0a] to-[#0a0a0a] relative">
            {/* Header */}
            <header className="w-full max-w-3xl mx-auto flex items-center mb-12 z-20">
                {/* Mobile */}
                <div className="flex md:hidden items-center w-full">
                    <Link href="/" className="text-sm text-slate-400 hover:text-white transition">←</Link>
                    <div className="flex-1 flex justify-center">
                        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#38bdf8] to-[#c084fc] flex items-center justify-center font-bold text-white shadow-lg">Y</div>
                            <span className="font-bold text-xl tracking-tight text-white">The<span className="text-[#38bdf8]">TapHoa</span></span>
                        </Link>
                    </div>
                    <div className="w-4" />
                </div>
                {/* Desktop */}
                <div className="hidden md:flex justify-between items-center w-full">
                    <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#38bdf8] to-[#c084fc] flex items-center justify-center font-bold text-white shadow-lg">Y</div>
                        <span className="font-bold text-xl tracking-tight text-white">The<span className="text-[#38bdf8]">TapHoa</span></span>
                    </Link>
                    <Link href="/" className="text-sm text-slate-400 hover:text-white transition flex items-center gap-1">← Back</Link>
                </div>
            </header>

            {/* Title */}
            <div className="w-full max-w-3xl mx-auto mb-8 z-10">
                <div className="flex items-center gap-3 mb-2">
                    <span className="text-3xl">𝕏</span>
                    <h1 className="text-3xl md:text-4xl font-bold text-white">Tweets</h1>
                </div>
                <p className="text-slate-400">
                    Paste link tweet từ X để xem trực tiếp trên trang.
                </p>
            </div>

            {/* Tweet Search + Dynamic Tweets */}
            <TweetSearch />

            {/* Footer */}
            <footer className="w-full max-w-3xl mx-auto mt-16 pt-8 pb-6 border-t border-slate-700/50 z-20 text-center">
                <p className="text-sm text-slate-500">Built with Next.js, TypeScript & MongoDB</p>
            </footer>

            {/* Background */}
            <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 overflow-hidden" aria-hidden="true">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 rounded-full blur-[100px]" />
            </div>
        </div>
    )
}
