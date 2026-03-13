'use client'
import { Heading2, Heading3, Paragraph, Highlight, Callout } from '../../../components/BlogComponents'

export default function Phase6MockInterview() {
    return (
        <>
            <Heading2>Phase 6 — Mock Interview & Behavioral (2-4 weeks)</Heading2>

            <Heading3>6.1 Mock Interview</Heading3>
            <div className="my-4 space-y-2">
                <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
                    <span className="text-pink-400">🎤</span>
                    <span className="text-slate-300 text-sm"><strong>Pramp.com</strong> — free mock interviews with real people</span>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
                    <span className="text-pink-400">🎤</span>
                    <span className="text-slate-300 text-sm"><strong>interviewing.io</strong> — anonymous mock interviews with big tech engineers</span>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
                    <span className="text-pink-400">🎤</span>
                    <span className="text-slate-300 text-sm">Practice with friends — <strong>think out loud</strong> while solving problems!</span>
                </div>
            </div>

            <Heading3>6.2 Behavioral Interview (STAR Method)</Heading3>
            <Paragraph>
                Big tech evaluates <Highlight>culture fit</Highlight> very seriously.
                Prepare 5-7 stories using the <Highlight>STAR</Highlight> format:
            </Paragraph>

            <div className="my-4 grid grid-cols-2 md:grid-cols-4 gap-2">
                <div className="rounded-xl bg-blue-500/10 border border-blue-500/20 p-3 text-center">
                    <div className="text-blue-400 font-bold text-lg">S</div>
                    <div className="text-[var(--text-secondary)] text-xs">Situation</div>
                </div>
                <div className="rounded-xl bg-purple-500/10 border border-purple-500/20 p-3 text-center">
                    <div className="text-purple-400 font-bold text-lg">T</div>
                    <div className="text-[var(--text-secondary)] text-xs">Task</div>
                </div>
                <div className="rounded-xl bg-green-500/10 border border-green-500/20 p-3 text-center">
                    <div className="text-green-400 font-bold text-lg">A</div>
                    <div className="text-[var(--text-secondary)] text-xs">Action</div>
                </div>
                <div className="rounded-xl bg-yellow-500/10 border border-yellow-500/20 p-3 text-center">
                    <div className="text-yellow-400 font-bold text-lg">R</div>
                    <div className="text-[var(--text-secondary)] text-xs">Result</div>
                </div>
            </div>

            <div className="my-4 space-y-2">
                {[
                    'Tell me about a time you resolved a conflict in your team?',
                    'What\'s the hardest project you\'ve worked on?',
                    'When did you have to make a tough technical decision?',
                    'Tell me about a time you failed and what you learned?',
                    'How do you handle tight deadlines?',
                ].map(q => (
                    <div key={q} className="flex items-center gap-3 p-2.5 rounded-lg bg-pink-500/5 border border-pink-500/10">
                        <span className="text-pink-400 text-xs">❓</span>
                        <span className="text-slate-300 text-sm">{q}</span>
                    </div>
                ))}
            </div>

            <Callout type="warning">
                Behavioral interviews <Highlight>can&apos;t be crammed</Highlight> — you need to prepare real stories from real experience.
                Write them down, practice speaking out loud, record yourself and improve.
            </Callout>

        </>
    )
}
