import Link from 'next/link'
import Image from 'next/image'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Projects - Nguyen Dang Khuong',
    description: 'Portfolio projects by Nguyen Dang Khuong - Full-stack Developer',
}

const projects = [
    {
        title: 'Shop Management System',
        description: 'A comprehensive shop management system: products, orders, categories, and carts. Supports QR/barcode scanning, receipt printing, and drag & drop product sorting.',
        tech: ['Next.js 15', 'TypeScript', 'MongoDB', 'Ant Design', 'Tailwind CSS'],
        color: '#38bdf8',
        emoji: '🛍️',
        image: '/image/projects/shop-management.png',
        link: '/products',
    },
    {
        title: 'TikTok Automation',
        description: 'Manage TikTok accounts, schedule posts automatically, and integrate showcase products. Supports video upload via Cloudinary & MinIO.',
        tech: ['TikTok API', 'Cloudinary', 'MinIO', 'n8n'],
        color: '#c084fc',
        emoji: '🎵',
        image: '/image/projects/tiktok.png',
    },
    {
        title: 'AutoFlow & Prompt Library',
        description: 'Automated content generation system: manage a prompt library, auto-pick random prompts & videos per API call. Integrated with n8n webhooks.',
        tech: ['REST API', 'MongoDB', 'n8n', 'Veo3'],
        color: '#fbbf24',
        emoji: '⚡',
    },
    {
        title: 'Facebook Posts Manager',
        description: 'Manage Facebook posts: supports post, reel-video, and reel-link types. Upload media via Cloudinary with scheduled publishing.',
        tech: ['Facebook API', 'Cloudinary', 'MinIO'],
        color: '#3b82f6',
        emoji: '📱',
        image: '/image/projects/facebook.png',
    },
    {
        title: 'Shopee Integration',
        description: 'Manage Shopee affiliate links, connect products with detailed descriptions for marketing channels.',
        tech: ['Shopee API', 'MongoDB'],
        color: '#f97316',
        emoji: '🔗',
        image: '/image/projects/shopee.png',
    },
    {
        title: 'Veo3 Media Manager',
        description: 'Manage media assets for AI video generation (Veo3). Upload images, manage tokens and media IDs for automated video creation.',
        tech: ['Cloudinary', 'Veo3 API', 'MongoDB'],
        color: '#10b981',
        emoji: '🎬',
        image: '/image/projects/veo3.png',
    },
]

export default function ProjectsPage() {
    return (
        <div className="bg-[#0a0a0a] text-slate-200 font-sans min-h-screen flex flex-col items-center p-4 md:p-8 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-slate-900 via-[#0a0a0a] to-[#0a0a0a] relative">
            {/* Header */}
            <header className="w-full max-w-4xl mx-auto flex justify-between items-center mb-12 z-20">
                <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#38bdf8] to-[#c084fc] flex items-center justify-center font-bold text-white shadow-lg">
                        Y
                    </div>
                    <span className="font-bold text-xl tracking-tight text-white">
                        The<span className="text-[#38bdf8]">TapHoa</span>
                    </span>
                </Link>

                <Link
                    href="/"
                    className="text-sm text-slate-400 hover:text-white transition flex items-center gap-1"
                >
                    ← Back
                </Link>
            </header>

            {/* Title */}
            <div className="w-full max-w-4xl mx-auto mb-10 z-10">
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                    Projects
                </h1>
                <p className="text-slate-400">
                    Features and projects built within the TheTapHoa ecosystem.
                </p>
            </div>

            {/* Project Grid */}
            <div className="w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 z-10">
                {projects.map((project) => (
                    <div
                        key={project.title}
                        className="rounded-2xl bg-slate-800/40 border border-white/10 overflow-hidden hover:border-white/20 hover:bg-slate-800/60 transition-all duration-300 group cursor-default"
                        style={{ boxShadow: `0 0 30px ${project.color}10` }}
                    >
                        {/* Screenshot */}
                        {project.image && (
                            <div className="w-full h-48 relative overflow-hidden border-b border-white/10">
                                <Image
                                    src={project.image}
                                    alt={`${project.title} demo`}
                                    fill
                                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                            </div>
                        )}

                        {/* Content */}
                        <div className="p-6 space-y-4">
                            <div className="flex items-center gap-3">
                                <span className="text-2xl">{project.emoji}</span>
                                <h2 className="text-lg font-semibold text-white group-hover:text-[#38bdf8] transition">
                                    {project.title}
                                </h2>
                            </div>

                            <p className="text-sm text-slate-400 leading-relaxed">
                                {project.description}
                            </p>

                            <div className="flex flex-wrap gap-2 pt-1">
                                {project.tech.map((t) => (
                                    <span
                                        key={t}
                                        className="px-2.5 py-1 text-xs rounded-full border border-white/10 text-slate-300"
                                        style={{ backgroundColor: `${project.color}15` }}
                                    >
                                        {t}
                                    </span>
                                ))}
                            </div>

                            {project.link && (
                                <div className="pt-2">
                                    <Link
                                        href={project.link}
                                        className="text-sm font-medium hover:underline transition"
                                        style={{ color: project.color }}
                                    >
                                        View Demo →
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Footer */}
            <footer className="w-full max-w-4xl mx-auto mt-16 pt-8 pb-6 border-t border-slate-700/50 z-20 text-center">
                <p className="text-sm text-slate-500">
                    Built with Next.js, TypeScript & MongoDB
                </p>
            </footer>

            {/* Background Gradients */}
            <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 overflow-hidden" aria-hidden="true">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 rounded-full blur-[100px]" />
            </div>
        </div>
    )
}
