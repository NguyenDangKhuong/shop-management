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
        <div className="font-sans min-h-screen flex flex-col items-center p-4 md:p-8 relative overflow-x-hidden">
            {/* Grid + Glow */}
            <div className="fixed inset-0 pointer-events-none z-[-1] opacity-20" style={{ backgroundImage: 'linear-gradient(var(--border-primary) 1px, transparent 1px), linear-gradient(90deg, var(--border-primary) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
            <div className="fixed top-[-15%] left-[-15%] w-[55%] h-[55%] rounded-full bg-[var(--neon-cyan)] opacity-[0.06] blur-[150px] pointer-events-none z-[-1]" />
            <div className="fixed bottom-[-15%] right-[-15%] w-[60%] h-[60%] rounded-full bg-[var(--neon-purple)] opacity-[0.05] blur-[180px] pointer-events-none z-[-1]" />
            {/* Header */}
            <header className="w-full max-w-5xl mx-auto flex justify-between items-center mb-12 z-20">
                <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--neon-cyan)] to-[var(--neon-purple)] flex items-center justify-center font-bold text-white shadow-lg">
                        K
                    </div>
                    <span className="font-bold text-xl tracking-tight text-text-primary">
                        Khuong<span className="text-[var(--neon-cyan)]">.Dev</span>
                    </span>
                </Link>

                <Link
                    href="/"
                    className="text-sm text-text-secondary hover:text-text-primary transition flex items-center gap-1"
                >
                    ← Back
                </Link>
            </header>

            {/* Title */}
            <div className="w-full max-w-5xl mx-auto mb-10 z-10">
                <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-2">
                    Projects
                </h1>
                <p className="text-text-secondary max-w-2xl">
                    A unified ecosystem built from scratch — connecting shop management, social media content automation, and AI video generation into a single platform.
                </p>
            </div>

            {/* Architecture Overview */}
            <div className="w-full max-w-5xl mx-auto mb-8 z-10">
                <div className="cyber-card" style={{ '--cyber-accent': 'var(--neon-cyan)' } as React.CSSProperties}>
                    <div className="relative z-10">
                        <div className="text-sm text-text-secondary mb-3 font-medium">🏗️ System Architecture</div>
                        <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-text-secondary">
                            <span className="px-3 py-1.5 rounded-full border" style={{ backgroundColor: 'color-mix(in srgb, #38bdf8 15%, transparent)', borderColor: 'color-mix(in srgb, #38bdf8 30%, transparent)' }}>🛍️ Shop</span>
                            <span className="text-text-muted">→</span>
                            <span className="px-3 py-1.5 rounded-full border" style={{ backgroundColor: 'color-mix(in srgb, #f97316 15%, transparent)', borderColor: 'color-mix(in srgb, #f97316 30%, transparent)' }}>🔗 Shopee</span>
                            <span className="text-text-muted">→</span>
                            <span className="px-3 py-1.5 rounded-full border" style={{ backgroundColor: 'color-mix(in srgb, #fbbf24 15%, transparent)', borderColor: 'color-mix(in srgb, #fbbf24 30%, transparent)' }}>⚡ AutoFlow</span>
                            <span className="text-text-muted">→</span>
                            <span className="px-3 py-1.5 rounded-full border" style={{ backgroundColor: 'color-mix(in srgb, #10b981 15%, transparent)', borderColor: 'color-mix(in srgb, #10b981 30%, transparent)' }}>🎬 Veo3</span>
                            <span className="text-text-muted">→</span>
                            <span className="px-3 py-1.5 rounded-full border" style={{ backgroundColor: 'color-mix(in srgb, #c084fc 15%, transparent)', borderColor: 'color-mix(in srgb, #c084fc 30%, transparent)' }}>🎵 TikTok</span>
                            <span className="text-text-muted">/</span>
                            <span className="px-3 py-1.5 rounded-full border" style={{ backgroundColor: 'color-mix(in srgb, #3b82f6 15%, transparent)', borderColor: 'color-mix(in srgb, #3b82f6 30%, transparent)' }}>📱 Facebook</span>
                        </div>
                        <p className="text-xs text-text-muted text-center mt-3">Products → Affiliate Links → AI Prompts → Video Generation → Auto-publish to Social Media</p>
                    </div>
                </div>
            </div>

            {/* Skills */}
            <div className="w-full max-w-5xl mx-auto mb-8 z-10">
                <h2 className="text-xl font-semibold text-text-primary mb-4">🛠️ Tech Stack & Skills</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                        { category: 'Core', color: '#38bdf8', skills: ['TypeScript (strict mode)', 'JavaScript ES2024+', 'HTML5 / CSS3', 'Vanilla Extract (CSS-in-JS)'] },
                        { category: 'Frameworks & Libraries', color: '#c084fc', skills: ['React 19 (Compiler, Suspense)', 'Next.js 15 (App Router, SSR)', 'React Hook Form + Zod', 'Ant Design / Tailwind CSS'] },
                        { category: 'Testing & Quality', color: '#10b981', skills: ['Jest + Testing Library', 'Playwright (E2E)', 'Storybook / MSW', 'Lighthouse CI (98% A11Y)'] },
                        { category: 'DevOps & Infrastructure', color: '#f97316', skills: ['MongoDB / Mongoose', 'Cloudinary / Cloudflare R2', 'n8n Automation', 'NextAuth.js'] },
                        { category: 'Architecture', color: '#fbbf24', skills: ['Micro Frontend', 'Module Federation', 'Design Systems (70+ components)', 'REST API / GraphQL'] },
                        { category: 'Tools & Workflow', color: '#ec4899', skills: ['ESLint / Prettier (Oxc)', 'LaunchDarkly (Feature Flags)', 'Segment Analytics', 'Claude AI / Cursor / Copilot'] },
                    ].map((group) => (
                        <div
                            key={group.category}
                            className="cyber-card"
                            style={{ '--cyber-accent': group.color } as React.CSSProperties}
                        >
                            <div className="relative z-10">
                                <div className="flex items-center gap-2 mb-3">
                                    <div className="w-2 h-2 rounded-full shadow-[0_0_6px]" style={{ backgroundColor: group.color, boxShadow: `0 0 8px ${group.color}` }} />
                                    <span className="text-sm font-medium text-text-primary">{group.category}</span>
                                </div>
                                <div className="space-y-1.5">
                                    {group.skills.map((skill) => (
                                        <div key={skill} className="text-xs text-text-secondary flex items-center gap-2">
                                            <span style={{ color: group.color }}>▸</span>
                                            {skill}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Project Grid */}
            <div className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 z-10">
                {projects.map((project) => (
                    <div
                        key={project.title}
                        className="cyber-card hover-cyber-glow group cursor-default flex flex-col !overflow-hidden"
                        style={{ '--cyber-accent': project.color } as React.CSSProperties}
                    >
                        {/* Screenshot */}
                        {project.image && (
                            <div className="w-[calc(100%+3rem)] -mx-6 -mt-6 h-48 relative overflow-hidden border-b border-border-dim mb-4">
                                <Image
                                    src={project.image}
                                    alt={`${project.title} demo`}
                                    fill
                                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#030712]/80 to-transparent" />
                                {project.highlight && (
                                    <div
                                        className="absolute top-3 right-3 px-2.5 py-1 rounded-md text-xs font-medium backdrop-blur-sm border"
                                        style={{
                                            backgroundColor: `color-mix(in srgb, ${project.color} 20%, transparent)`,
                                            borderColor: `color-mix(in srgb, ${project.color} 40%, transparent)`,
                                            color: project.color,
                                        }}
                                    >
                                        {project.highlight}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Content */}
                        <div className="space-y-4 flex-1 flex flex-col relative z-10">
                            <div className="flex items-center gap-3">
                                <span className="text-2xl">{project.emoji}</span>
                                <div>
                                    <h2 className="text-lg font-semibold text-text-primary group-hover:text-[var(--neon-cyan)] transition">
                                        {project.title}
                                    </h2>
                                    {!project.image && project.highlight && (
                                        <span className="text-xs font-medium mt-0.5 inline-block" style={{ color: project.color }}>
                                            {project.highlight}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <p className="text-sm text-text-secondary leading-relaxed">
                                {project.description}
                            </p>

                            {project.features && (
                                <div className="space-y-1.5 flex-1">
                                    {project.features.map((feature, i) => (
                                        <div key={i} className="flex items-start gap-2 text-xs text-text-secondary">
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
                                        className="px-2.5 py-1 text-xs rounded-md border text-text-secondary"
                                        style={{ borderColor: `color-mix(in srgb, ${project.color} 30%, transparent)`, backgroundColor: `color-mix(in srgb, ${project.color} 10%, transparent)` }}
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
            <footer className="w-full max-w-5xl mx-auto mt-16 pt-8 pb-6 border-t border-border-primary z-20 text-center">
                <p className="text-sm text-text-muted">
                    Built with Next.js 15, TypeScript, MongoDB & ❤️
                </p>
            </footer>
        </div>
    )
}
