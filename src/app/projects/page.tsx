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
        description: 'Full-stack e-commerce platform for managing a retail shop end-to-end — from catalog and inventory to POS checkout and analytics.',
        features: [
            'Product CRUD with image upload, barcode/QR scanning, and bulk import/export',
            'Category tree with drag-and-drop reordering and nested subcategories',
            'Cart & checkout flow with receipt printing (thermal printer support)',
            'Order management with status tracking, filtering, and history',
            'Dashboard with revenue charts, top products, and daily analytics',
            'Role-based authentication with NextAuth.js (admin/staff)',
            'Responsive design — works on desktop, tablet, and mobile POS',
            'PWA support — installable on mobile with offline capability',
        ],
        tech: ['Next.js 15', 'TypeScript', 'MongoDB', 'Ant Design', 'Tailwind CSS', 'NextAuth.js'],
        color: '#38bdf8',
        emoji: '🛍️',
        image: '/image/projects/shop-management.png',
        link: '/products',
        highlight: 'Core Platform',
    },
    {
        title: 'TikTok Automation',
        description: 'End-to-end TikTok content pipeline: connect multiple accounts, schedule posts with smart timing, and auto-publish via n8n automation.',
        features: [
            'Multi-account management with OAuth2 token refresh flow',
            'Auto-schedule posts with configurable hour gaps (1-6h) and random minute jitter',
            'Video upload pipeline: local → Cloudflare R2 → TikTok Content API',
            'Showcase product linking — attach shop products to TikTok videos',
            'Batch scheduling with drag-and-drop reorder and bulk actions',
            'Auto-cleanup expired scheduled posts via Unix timestamp comparison',
            'n8n webhook integration for fully automated publish workflow',
        ],
        tech: ['TikTok API', 'Cloudinary', 'Cloudflare R2', 'n8n', 'REST API'],
        color: '#c084fc',
        emoji: '🎵',
        image: '/image/projects/tiktok.png',
        highlight: '~500 posts automated',
    },
    {
        title: 'AutoFlow & Prompt Library',
        description: 'AI-powered content generation engine: curate prompt libraries, auto-select random prompts per API call, and generate video content with Veo3.',
        features: [
            'Prompt library CRUD with categories (hook, describe, subject-action)',
            'Random prompt picker API — stateless, returns unused prompts per session',
            'Video prompt generation with product-specific templates (under 90 words)',
            'Fashion-specific prompt builder with garment-focused descriptions',
            'n8n webhook endpoints for automated content pipeline',
            'Reference image management for AI video generation context',
            'Prompt usage tracking and rotation to avoid repetition',
        ],
        tech: ['REST API', 'MongoDB', 'n8n', 'Veo3', 'Google AI'],
        color: '#fbbf24',
        emoji: '⚡',
        highlight: 'AI Content Engine',
    },
    {
        title: 'Facebook Posts Manager',
        description: 'Multi-format Facebook publishing tool: create posts, reel-videos, and reel-links with media upload and scheduled publishing via automation.',
        features: [
            'Support 3 post types: standard post, reel-video, reel-link',
            'Media upload via Cloudinary with automatic format optimization',
            'Cloudflare R2 integration for large video file storage',
            'Scheduled publishing with n8n automation workflows',
            'Post preview and editing before publishing',
            'Multi-page management with separate content queues',
        ],
        tech: ['Facebook Graph API', 'Cloudinary', 'Cloudflare R2', 'n8n'],
        color: '#3b82f6',
        emoji: '📱',
        image: '/image/projects/facebook.png',
        highlight: 'Multi-format Publishing',
    },
    {
        title: 'Shopee Integration',
        description: 'Affiliate marketing bridge: manage Shopee product links, enrich with detailed descriptions, and connect to social media marketing channels.',
        features: [
            'Shopee affiliate link management and tracking',
            'Product enrichment with custom descriptions and images',
            'Deep linking to social media posts (TikTok, Facebook)',
            'Product catalog sync with shop inventory',
            'Commission tracking and analytics dashboard',
        ],
        tech: ['Shopee API', 'MongoDB', 'REST API'],
        color: '#f97316',
        emoji: '🔗',
        image: '/image/projects/shopee.png',
        highlight: 'Affiliate Marketing',
    },
    {
        title: 'Veo3 Media Manager',
        description: 'AI video generation asset manager: orchestrate media uploads, manage generation tokens, and track media IDs for Google Veo3 video creation pipeline.',
        features: [
            'Image upload and management for AI video generation input',
            'Token management for Veo3 API authentication (ya29 tokens)',
            'Media ID tracking for generation job status monitoring',
            'Cloudinary integration for image hosting and transformation',
            'Batch media processing with status tracking',
            'Chrome extension integration for token capture (reCAPTCHA solver)',
        ],
        tech: ['Google Veo3', 'Cloudinary', 'MongoDB', 'Chrome Extension'],
        color: '#10b981',
        emoji: '🎬',
        image: '/image/projects/veo3.png',
        highlight: 'AI Video Pipeline',
    },
]

export default function ProjectsPage() {
    return (
        <div className="bg-[#0a0a0a] text-slate-200 font-sans min-h-screen flex flex-col items-center p-4 md:p-8 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-slate-900 via-[#0a0a0a] to-[#0a0a0a] relative">
            {/* Header */}
            <header className="w-full max-w-5xl mx-auto flex justify-between items-center mb-12 z-20">
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
            <div className="w-full max-w-5xl mx-auto mb-10 z-10">
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                    Projects
                </h1>
                <p className="text-slate-400 max-w-2xl">
                    A unified ecosystem built from scratch — connecting shop management, social media content automation, and AI video generation into a single platform.
                </p>
            </div>

            {/* Architecture Overview */}
            <div className="w-full max-w-5xl mx-auto mb-8 z-10">
                <div className="rounded-2xl bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-emerald-500/10 border border-white/10 p-6">
                    <div className="text-sm text-slate-400 mb-3 font-medium">🏗️ System Architecture</div>
                    <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-slate-300">
                        <span className="px-3 py-1.5 rounded-full bg-[#38bdf8]/15 border border-[#38bdf8]/30">🛍️ Shop</span>
                        <span className="text-slate-500">→</span>
                        <span className="px-3 py-1.5 rounded-full bg-[#f97316]/15 border border-[#f97316]/30">🔗 Shopee</span>
                        <span className="text-slate-500">→</span>
                        <span className="px-3 py-1.5 rounded-full bg-[#fbbf24]/15 border border-[#fbbf24]/30">⚡ AutoFlow</span>
                        <span className="text-slate-500">→</span>
                        <span className="px-3 py-1.5 rounded-full bg-[#10b981]/15 border border-[#10b981]/30">🎬 Veo3</span>
                        <span className="text-slate-500">→</span>
                        <span className="px-3 py-1.5 rounded-full bg-[#c084fc]/15 border border-[#c084fc]/30">🎵 TikTok</span>
                        <span className="text-slate-500">/</span>
                        <span className="px-3 py-1.5 rounded-full bg-[#3b82f6]/15 border border-[#3b82f6]/30">📱 Facebook</span>
                    </div>
                    <p className="text-xs text-slate-500 text-center mt-3">Products → Affiliate Links → AI Prompts → Video Generation → Auto-publish to Social Media</p>
                </div>
            </div>

            {/* Project Grid */}
            <div className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 z-10">
                {projects.map((project) => (
                    <div
                        key={project.title}
                        className="rounded-2xl bg-slate-800/40 border border-white/10 overflow-hidden hover:border-white/20 hover:bg-slate-800/60 transition-all duration-300 group cursor-default flex flex-col"
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
                                {/* Highlight Badge */}
                                {project.highlight && (
                                    <div
                                        className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-medium backdrop-blur-sm border"
                                        style={{
                                            backgroundColor: `${project.color}20`,
                                            borderColor: `${project.color}40`,
                                            color: project.color,
                                        }}
                                    >
                                        {project.highlight}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Content */}
                        <div className="p-6 space-y-4 flex-1 flex flex-col">
                            <div className="flex items-center gap-3">
                                <span className="text-2xl">{project.emoji}</span>
                                <div>
                                    <h2 className="text-lg font-semibold text-white group-hover:text-[#38bdf8] transition">
                                        {project.title}
                                    </h2>
                                    {/* Highlight for cards without image */}
                                    {!project.image && project.highlight && (
                                        <span
                                            className="text-xs font-medium mt-0.5 inline-block"
                                            style={{ color: project.color }}
                                        >
                                            {project.highlight}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <p className="text-sm text-slate-400 leading-relaxed">
                                {project.description}
                            </p>

                            {/* Features */}
                            {project.features && (
                                <div className="space-y-1.5 flex-1">
                                    {project.features.map((feature, i) => (
                                        <div key={i} className="flex items-start gap-2 text-xs text-slate-400">
                                            <span className="mt-0.5 flex-shrink-0" style={{ color: project.color }}>▸</span>
                                            <span className="leading-relaxed">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            )}

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
            <footer className="w-full max-w-5xl mx-auto mt-16 pt-8 pb-6 border-t border-slate-700/50 z-20 text-center">
                <p className="text-sm text-slate-500">
                    Built with Next.js 15, TypeScript, MongoDB & ❤️
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
