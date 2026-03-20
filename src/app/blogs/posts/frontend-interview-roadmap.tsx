import { BlogPost } from '../types'
import { Heading2, Paragraph, Highlight, Callout } from '../components/BlogComponents'
import dynamic from 'next/dynamic'
import { LoadingFallback } from './roadmap-sections/LoadingFallback'
import { RoadmapProgressProvider } from '../components/RoadmapProgressProvider'

// Lazy-loaded Phase sections — each loads its own JS chunk on demand
const Phase1 = dynamic(() => import('./roadmap-sections/Phase1CSFoundation'), { loading: () => <LoadingFallback /> })
const Phase2 = dynamic(() => import('./roadmap-sections/Phase2JavaScript'), { loading: () => <LoadingFallback /> })
const Phase3 = dynamic(() => import('./roadmap-sections/Phase3ReactFrontend'), { loading: () => <LoadingFallback /> })
const Phase4 = dynamic(() => import('./roadmap-sections/Phase4DSA'), { loading: () => <LoadingFallback /> })
const Phase5 = dynamic(() => import('./roadmap-sections/Phase5SystemDesign'), { loading: () => <LoadingFallback /> })
const Phase6 = dynamic(() => import('./roadmap-sections/Phase6MockInterview'), { loading: () => <LoadingFallback /> })

// EN Lazy-loaded Phase sections
const Phase1En = dynamic(() => import('./roadmap-sections/en/Phase1CSFoundation'), { loading: () => <LoadingFallback /> })
const Phase2En = dynamic(() => import('./roadmap-sections/en/Phase2JavaScript'), { loading: () => <LoadingFallback /> })
const Phase3En = dynamic(() => import('./roadmap-sections/en/Phase3ReactFrontend'), { loading: () => <LoadingFallback /> })
const Phase4En = dynamic(() => import('./roadmap-sections/en/Phase4DSA'), { loading: () => <LoadingFallback /> })
const Phase5En = dynamic(() => import('./roadmap-sections/en/Phase5SystemDesign'), { loading: () => <LoadingFallback /> })
const Phase6En = dynamic(() => import('./roadmap-sections/en/Phase6MockInterview'), { loading: () => <LoadingFallback /> })

const viContent = (
    <RoadmapProgressProvider>
        <Paragraph>
            Muốn vào <Highlight>Google, Meta, Amazon, Apple, Microsoft</Highlight> (FAANG) hay các big tech khác
            ở vị trí <Highlight>Frontend Engineer</Highlight>? Bài viết này là lộ trình chi tiết từ A-Z —
            đặc biệt dành cho bạn nào cảm thấy bị <Highlight>hỏng kiến thức nền tảng</Highlight> và muốn rebuild lại từ đầu.
        </Paragraph>

        <Callout type="info">
            Lộ trình này chia thành <Highlight>6 giai đoạn</Highlight>, mỗi giai đoạn khoảng 4-6 tuần.
            Tổng cộng cần <Highlight>6-9 tháng</Highlight> nếu học nghiêm túc mỗi ngày 2-3 giờ.
        </Callout>

        {/* ===== OVERVIEW ===== */}
        <Heading2>🗺️ Tổng quan lộ trình</Heading2>

        <div className="my-6 p-4 rounded-xl bg-[var(--bg-tag)] border border-[var(--border-primary)]">
            <div className="flex flex-col items-center gap-2 text-sm">
                <div className="px-4 py-2 rounded-lg bg-red-500/20 text-red-300 border border-red-500/30 w-fit font-semibold">Phase 1 — Nền tảng CS (4-6 tuần)</div>
                <div className="text-slate-600">↓</div>
                <div className="px-4 py-2 rounded-lg bg-yellow-500/20 text-yellow-300 border border-yellow-500/30 w-fit font-semibold">Phase 2 — JavaScript Master (4-6 tuần)</div>
                <div className="text-slate-600">↓</div>
                <div className="px-4 py-2 rounded-lg bg-blue-500/20 text-blue-300 border border-blue-500/30 w-fit font-semibold">Phase 3 — React & Frontend (4-6 tuần)</div>
                <div className="text-slate-600">↓</div>
                <div className="px-4 py-2 rounded-lg bg-green-500/20 text-green-300 border border-green-500/30 w-fit font-semibold">Phase 4 — DSA / LeetCode (6-8 tuần)</div>
                <div className="text-slate-600">↓</div>
                <div className="px-4 py-2 rounded-lg bg-purple-500/20 text-purple-300 border border-purple-500/30 w-fit font-semibold">Phase 5 — System Design (4-6 tuần)</div>
                <div className="text-slate-600">↓</div>
                <div className="px-4 py-2 rounded-lg bg-pink-500/20 text-pink-300 border border-pink-500/30 w-fit font-semibold">Phase 6 — Mock Interview & Behavioral (2-4 tuần)</div>
            </div>
        </div>

        {/* ===== LAZY-LOADED PHASES ===== */}
        <Phase1 />
        <Phase2 />
        <Phase3 />
        <Phase4 />
        <Phase5 />
        <Phase6 />

        {/* ===== TIMELINE ===== */}
        <Heading2>📅 Timeline gợi ý (6-9 tháng)</Heading2>

        <div className="my-6 overflow-x-auto">
            <table className="w-full text-sm border-collapse">
                <thead>
                    <tr className="border-b border-[var(--border-primary)]">
                        <th className="text-left p-3 text-[var(--text-secondary)] font-medium">Tháng</th>
                        <th className="text-left p-3 text-[var(--text-secondary)] font-medium">Phase</th>
                        <th className="text-left p-3 text-[var(--text-secondary)] font-medium">Focus</th>
                        <th className="text-left p-3 text-[var(--text-secondary)] font-medium">Output</th>
                    </tr>
                </thead>
                <tbody className="text-[var(--text-secondary)]">
                    <tr className="border-b border-gray-100">
                        <td className="p-3 text-red-400 font-bold">1-2</td>
                        <td className="p-3">CS + JS Core</td>
                        <td className="p-3">Networking, JS engine, closures</td>
                        <td className="p-3">Implement 10 JS utilities</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                        <td className="p-3 text-blue-400 font-bold">3-4</td>
                        <td className="p-3">React + FE</td>
                        <td className="p-3">Hooks, patterns, CSS, perf</td>
                        <td className="p-3">Build 3 UI components thuần</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                        <td className="p-3 text-green-400 font-bold">4-6</td>
                        <td className="p-3">DSA</td>
                        <td className="p-3">LeetCode Easy → Medium</td>
                        <td className="p-3">150 bài, 30 phút/bài</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                        <td className="p-3 text-purple-400 font-bold">6-7</td>
                        <td className="p-3">System Design</td>
                        <td className="p-3">FE architecture, performance</td>
                        <td className="p-3">Design 5 systems</td>
                    </tr>
                    <tr>
                        <td className="p-3 text-pink-400 font-bold">8-9</td>
                        <td className="p-3">Mock + Behavioral</td>
                        <td className="p-3">Mock interview, STAR stories</td>
                        <td className="p-3">10+ mock sessions</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <Heading2>📌 Tóm tắt</Heading2>

        <div className="my-6 space-y-3">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
                <span className="text-red-400 mt-0.5">1.</span>
                <span className="text-[var(--text-secondary)]"><Highlight>Nền tảng CS</Highlight> — đừng skip, đây là thứ phân biệt junior và senior</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
                <span className="text-yellow-400 mt-0.5">2.</span>
                <span className="text-[var(--text-secondary)]"><Highlight>JS sâu</Highlight> — hiểu cơ chế, không chỉ syntax. Implement từ scratch</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
                <span className="text-blue-400 mt-0.5">3.</span>
                <span className="text-[var(--text-secondary)]"><Highlight>React + FE</Highlight> — build UI thuần, hiểu rendering, performance</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
                <span className="text-green-400 mt-0.5">4.</span>
                <span className="text-[var(--text-secondary)]"><Highlight>DSA</Highlight> — 150 bài LeetCode, focus patterns không phải số lượng</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
                <span className="text-purple-400 mt-0.5">5.</span>
                <span className="text-[var(--text-secondary)]"><Highlight>System Design</Highlight> — thiết kế FE architecture, không chỉ vẽ diagram</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
                <span className="text-pink-400 mt-0.5">6.</span>
                <span className="text-[var(--text-secondary)]"><Highlight>Mock + Behavioral</Highlight> — practice nói to, chuẩn bị câu chuyện STAR</span>
            </div>
        </div>

        <Callout type="tip">
            Nhớ: <Highlight>Consistency &gt; Intensity</Highlight>. Mỗi ngày 2-3 giờ đều đặn tốt hơn
            cày 10 giờ cuối tuần rồi nghỉ cả tuần. Hãy biến việc học thành thói quen hàng ngày!
        </Callout>
    </RoadmapProgressProvider>
)

const enContent = (
    <RoadmapProgressProvider>
        <Paragraph>
            Want to get into <Highlight>Google, Meta, Amazon, Apple, Microsoft</Highlight> (FAANG) or other big tech companies
            as a <Highlight>Frontend Engineer</Highlight>? This article is a detailed A-Z roadmap —
            especially for those who feel their <Highlight>fundamentals are weak</Highlight> and want to rebuild from scratch.
        </Paragraph>

        <Callout type="info">
            This roadmap is divided into <Highlight>6 phases</Highlight>, each approximately 4-6 weeks.
            Total time needed: <Highlight>6-9 months</Highlight> if you study seriously 2-3 hours daily.
        </Callout>

        {/* ===== OVERVIEW ===== */}
        <Heading2>🗺️ Roadmap Overview</Heading2>

        <div className="my-6 p-4 rounded-xl bg-[var(--bg-tag)] border border-[var(--border-primary)]">
            <div className="flex flex-col items-center gap-2 text-sm">
                <div className="px-4 py-2 rounded-lg bg-red-500/20 text-red-300 border border-red-500/30 w-fit font-semibold">Phase 1 — CS Fundamentals (4-6 weeks)</div>
                <div className="text-slate-600">↓</div>
                <div className="px-4 py-2 rounded-lg bg-yellow-500/20 text-yellow-300 border border-yellow-500/30 w-fit font-semibold">Phase 2 — JavaScript Master (4-6 weeks)</div>
                <div className="text-slate-600">↓</div>
                <div className="px-4 py-2 rounded-lg bg-blue-500/20 text-blue-300 border border-blue-500/30 w-fit font-semibold">Phase 3 — React & Frontend (4-6 weeks)</div>
                <div className="text-slate-600">↓</div>
                <div className="px-4 py-2 rounded-lg bg-green-500/20 text-green-300 border border-green-500/30 w-fit font-semibold">Phase 4 — DSA / LeetCode (6-8 weeks)</div>
                <div className="text-slate-600">↓</div>
                <div className="px-4 py-2 rounded-lg bg-purple-500/20 text-purple-300 border border-purple-500/30 w-fit font-semibold">Phase 5 — System Design (4-6 weeks)</div>
                <div className="text-slate-600">↓</div>
                <div className="px-4 py-2 rounded-lg bg-pink-500/20 text-pink-300 border border-pink-500/30 w-fit font-semibold">Phase 6 — Mock Interview & Behavioral (2-4 weeks)</div>
            </div>
        </div>

        {/* ===== LAZY-LOADED PHASES ===== */}
        <Phase1En />
        <Phase2En />
        <Phase3En />
        <Phase4En />
        <Phase5En />
        <Phase6En />

        {/* ===== TIMELINE ===== */}
        <Heading2>📅 Suggested Timeline (6-9 months)</Heading2>

        <div className="my-6 overflow-x-auto">
            <table className="w-full text-sm border-collapse">
                <thead>
                    <tr className="border-b border-[var(--border-primary)]">
                        <th className="text-left p-3 text-[var(--text-secondary)] font-medium">Month</th>
                        <th className="text-left p-3 text-[var(--text-secondary)] font-medium">Phase</th>
                        <th className="text-left p-3 text-[var(--text-secondary)] font-medium">Focus</th>
                        <th className="text-left p-3 text-[var(--text-secondary)] font-medium">Output</th>
                    </tr>
                </thead>
                <tbody className="text-[var(--text-secondary)]">
                    <tr className="border-b border-gray-100">
                        <td className="p-3 text-red-400 font-bold">1-2</td>
                        <td className="p-3">CS + JS Core</td>
                        <td className="p-3">Networking, JS engine, closures</td>
                        <td className="p-3">Implement 10 JS utilities</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                        <td className="p-3 text-blue-400 font-bold">3-4</td>
                        <td className="p-3">React + FE</td>
                        <td className="p-3">Hooks, patterns, CSS, perf</td>
                        <td className="p-3">Build 3 pure UI components</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                        <td className="p-3 text-green-400 font-bold">4-6</td>
                        <td className="p-3">DSA</td>
                        <td className="p-3">LeetCode Easy → Medium</td>
                        <td className="p-3">150 problems, 30 min each</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                        <td className="p-3 text-purple-400 font-bold">6-7</td>
                        <td className="p-3">System Design</td>
                        <td className="p-3">FE architecture, performance</td>
                        <td className="p-3">Design 5 systems</td>
                    </tr>
                    <tr>
                        <td className="p-3 text-pink-400 font-bold">8-9</td>
                        <td className="p-3">Mock + Behavioral</td>
                        <td className="p-3">Mock interviews, STAR stories</td>
                        <td className="p-3">10+ mock sessions</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <Heading2>📌 Summary</Heading2>

        <div className="my-6 space-y-3">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
                <span className="text-red-400 mt-0.5">1.</span>
                <span className="text-[var(--text-secondary)]"><Highlight>CS Fundamentals</Highlight> — don&apos;t skip, this is what separates juniors from seniors</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
                <span className="text-yellow-400 mt-0.5">2.</span>
                <span className="text-[var(--text-secondary)]"><Highlight>Deep JS</Highlight> — understand mechanisms, not just syntax. Implement from scratch</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
                <span className="text-blue-400 mt-0.5">3.</span>
                <span className="text-[var(--text-secondary)]"><Highlight>React + FE</Highlight> — build pure UI, understand rendering, performance</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
                <span className="text-green-400 mt-0.5">4.</span>
                <span className="text-[var(--text-secondary)]"><Highlight>DSA</Highlight> — 150 LeetCode problems, focus on patterns not quantity</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
                <span className="text-purple-400 mt-0.5">5.</span>
                <span className="text-[var(--text-secondary)]"><Highlight>System Design</Highlight> — design FE architecture, not just draw diagrams</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-tag)] border border-gray-200">
                <span className="text-pink-400 mt-0.5">6.</span>
                <span className="text-[var(--text-secondary)]"><Highlight>Mock + Behavioral</Highlight> — practice speaking out loud, prepare STAR stories</span>
            </div>
        </div>

        <Callout type="tip">
            Remember: <Highlight>Consistency &gt; Intensity</Highlight>. Studying 2-3 hours daily consistently is better than
            cramming 10 hours on weekends then taking a week off. Make learning a daily habit!
        </Callout>
    </RoadmapProgressProvider>
)

const frontendInterviewRoadmap: BlogPost = {
    slug: 'frontend-interview-roadmap',
    title: {
        vi: 'Lộ trình phỏng vấn Frontend vào Big Tech — Từ zero đến offer',
        en: 'Frontend Big Tech Interview Roadmap — From Zero to Offer',
    },
    description: {
        vi: 'Lộ trình 6-9 tháng chi tiết để chuẩn bị phỏng vấn Frontend tại FAANG: CS nền tảng, JavaScript sâu, React, DSA, System Design và Behavioral.',
        en: 'A detailed 6-9 month roadmap to prepare for Frontend interviews at FAANG: CS fundamentals, deep JavaScript, React, DSA, System Design, and Behavioral.',
    },
    date: '2025-09-03',
    tags: ['Career', 'Interview', 'Roadmap'],
    emoji: '🎯',
    color: '#f97316',
    content: { vi: viContent, en: enContent },
}

export default frontendInterviewRoadmap
