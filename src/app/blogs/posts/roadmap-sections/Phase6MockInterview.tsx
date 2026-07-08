'use client'
import { Heading2, Heading3, Paragraph, Highlight, Callout } from '../../components/BlogComponents'

export default function Phase6MockInterview() {
    return (
        <>
            <Heading2>Phase 6 — Mock Interview & Behavioral (2-4 tuần)</Heading2>

            <Heading3>6.1 Mock Interview</Heading3>
            <div className="my-4 space-y-2">
                <div className="flex items-start gap-3 p-3 rounded-lg bg-bg-tag border border-gray-200">
                    <span className="text-pink-400">🎤</span>
                    <span className="text-slate-300 text-sm"><strong>Pramp.com</strong> — mock interview miễn phí với người thật</span>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg bg-bg-tag border border-gray-200">
                    <span className="text-pink-400">🎤</span>
                    <span className="text-slate-300 text-sm"><strong>interviewing.io</strong> — anonymous mock interview với engineers từ big tech</span>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg bg-bg-tag border border-gray-200">
                    <span className="text-pink-400">🎤</span>
                    <span className="text-slate-300 text-sm">Rủ bạn bè mock lẫn nhau — <strong>practice nói to lên</strong> khi giải bài!</span>
                </div>
            </div>

            <Heading3>6.2 Behavioral Interview (STAR Method)</Heading3>
            <Paragraph>
                Big tech đánh giá <Highlight>culture fit</Highlight> rất nghiêm túc.
                Chuẩn bị 5-7 câu chuyện theo format <Highlight>STAR</Highlight>:
            </Paragraph>

            <div className="my-4 grid grid-cols-2 md:grid-cols-4 gap-2">
                <div className="rounded-xl bg-blue-500/10 border border-blue-500/20 p-3 text-center">
                    <div className="text-blue-400 font-bold text-lg">S</div>
                    <div className="text-text-secondary text-xs">Situation</div>
                </div>
                <div className="rounded-xl bg-purple-500/10 border border-purple-500/20 p-3 text-center">
                    <div className="text-purple-400 font-bold text-lg">T</div>
                    <div className="text-text-secondary text-xs">Task</div>
                </div>
                <div className="rounded-xl bg-green-500/10 border border-green-500/20 p-3 text-center">
                    <div className="text-green-400 font-bold text-lg">A</div>
                    <div className="text-text-secondary text-xs">Action</div>
                </div>
                <div className="rounded-xl bg-yellow-500/10 border border-yellow-500/20 p-3 text-center">
                    <div className="text-yellow-400 font-bold text-lg">R</div>
                    <div className="text-text-secondary text-xs">Result</div>
                </div>
            </div>

            <div className="my-4 space-y-2">
                {[
                    'Kể về một lần bạn giải quyết conflict trong team?',
                    'Dự án khó nhất bạn từng làm?',
                    'Khi nào bạn phải đưa ra quyết định kỹ thuật khó?',
                    'Bạn từng fail điều gì và học được gì?',
                    'Làm sao bạn handle deadline gấp?',
                ].map(q => (
                    <div key={q} className="flex items-center gap-3 p-2.5 rounded-lg bg-pink-500/5 border border-pink-500/10">
                        <span className="text-pink-400 text-xs">❓</span>
                        <span className="text-slate-300 text-sm">{q}</span>
                    </div>
                ))}
            </div>

            <Callout type="warning">
                Behavioral interview <Highlight>không thể cram</Highlight> — bạn cần chuẩn bị câu chuyện thật từ kinh nghiệm thật.
                Viết ra giấy, luyện nói to, record lại nghe và sửa.
            </Callout>

            {/* ===== TIMELINE ===== */}
        </>
    )
}
