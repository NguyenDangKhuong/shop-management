'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import LanguageSwitcher from '@/components/ui/LanguageSwitcher'
import SiteHeader from '@/components/ui/SiteHeader'
import { useTranslation } from '@/i18n'
import { useLoginUrl } from '@/hooks/useLoginUrl'
import { useStandalone } from '@/hooks/useStandalone'

// Cyberpunk Components
import CyberCard from '@/components/ui/CyberCard'
import TechBadge from '@/components/ui/TechBadge'
import HologramAvatar from '@/components/ui/HologramAvatar'
import { Timeline, TimelineItem } from '@/components/ui/Timeline'

// ─── Data ────────────────────────────────────────────────────────────────────

const experiences = [
    {
        company: 'HCL Technologies Vietnam',
        client: 'ANZ Banking Group',
        location: 'HCM, Vietnam & Melbourne, AU',
        role: 'Technical Lead',
        teamSize: 15,
        period: 'Jun 2023 — Present',
        color: 'var(--neon-cyan)',
        highlights: [
            'Built production features with React 19 (Compiler, Server Actions, Suspense) and Next.js 15 App Router with SSR, Middleware & API Routes.',
            'Achieved zero-runtime CSS using Vanilla Extract — eliminating runtime style injection overhead.',
            'Developed and organized 70+ components from a Design System (Ocean Blue).',
            'Implemented React Hook Form + Zod for type-safe runtime validation.',
            'Established testing pyramid: Jest + Testing Library, Playwright (E2E), Storybook, MSW.',
            'Achieved 98% accessibility score with jest-axe and @axe-core/playwright.',
            'Managed BitBucket/Flag-driven releases with LaunchDarkly — progressive rollouts & kill switches.',
            'Integrated Segment Analytics for user behavior tracking & A/B testing.',
            'Built with TypeScript strict mode (3000+ path aliases, noImplicitAny, strictNullChecks).',
            'Experienced in Micro Frontend architecture — Module Federation, monorepo integration.',
            'ANZ Plus Home page: Key contributor to enterprise-scale design system on Adobe Experience Manager (AEM).',
        ],
        link: 'https://anz.com.au/plus',
    },
    {
        company: 'HCL Technologies Vietnam',
        client: 'Santen Pharmaceutical',
        location: 'HCM, Vietnam & Tokyo, Japan',
        role: 'Senior Frontend Engineer',
        teamSize: 8,
        period: 'Jun 2022 — Jun 2023',
        color: 'var(--neon-purple)',
        highlights: [
            'Developed HR management web application on SharePoint framework.',
            'Built reusable React components for dynamic UI rendering.',
            'Applied Test-Driven Development (TDD) methodology.',
            'Collaborated with cross-functional teams for enterprise HR requirements.',
        ],
    },
    {
        company: 'LIG Technologies Vietnam',
        client: 'Asoview (Outsource)',
        location: 'HCM, Vietnam & Tokyo, Japan',
        role: 'React / WordPress Developer',
        teamSize: 4,
        period: 'Jul 2021 — Feb 2022',
        color: 'var(--neon-green)',
        highlights: [
            'Developed responsive UIs using React, aligned with design and technical standards.',
            'Built and customized WordPress-based websites for clients.',
        ],
    },
    {
        company: 'Asoview Vietnam',
        location: 'HCM, Vietnam & Tokyo, Japan',
        role: 'React Developer',
        teamSize: 6,
        period: 'Jun 2018 — Jun 2021',
        color: 'var(--neon-cyan)',
        highlights: [
            'Developed high-performance e-commerce application using React, Next.js, Redux-thunk.',
            'Built custom API layer and hooks for CRUD transactions & JWT token management.',
            'Expertise in React state management: ImmutableJS, Redux, duck pattern.',
            'Worked closely with clients using Figma, XD for UX collaboration.',
        ],
        link: 'https://asoview.com',
    },
    {
        company: 'Vteach Edu',
        location: 'HCM, Vietnam',
        role: 'Intern — Front-End / PHP Developer',
        teamSize: 3,
        period: 'Nov 2017 — May 2018',
        color: '#f97316',
        highlights: [
            'Supported skills page creation and practiced web development with Laravel (PHP).',
        ],
    },
]

const skillCategories = [
    {
        title: 'CORE TECHNOLOGIES',
        color: 'var(--neon-cyan)',
        skills: ['React 19', 'Next.js 15', 'TypeScript', 'JavaScript (ES6+)', 'HTML5', 'CSS3/SCSS'],
    },
    {
        title: 'STATE & FORMS',
        color: 'var(--neon-purple)',
        skills: ['Redux', 'Redux-Thunk', 'ImmutableJS', 'React Hook Form', 'Zod'],
    },
    {
        title: 'TESTING',
        color: 'var(--neon-green)',
        skills: ['Jest', 'Testing Library', 'Playwright', 'Storybook', 'MSW', 'jest-axe', 'axe-core'],
    },
    {
        title: 'STYLING & DESIGN',
        color: 'var(--neon-cyan)',
        skills: ['Vanilla Extract', 'Tailwind CSS', 'Ant Design', 'Figma', 'XD'],
    },
    {
        title: 'ARCHITECTURE & DEVOPS',
        color: '#fbbf24', // Amber
        skills: ['Micro Frontends', 'Module Federation', 'SSR/SSG', 'Monorepo', 'AEM', 'SharePoint'],
    },
    {
        title: 'TOOLS & ANALYTICS',
        color: '#f97316', // Orange
        skills: ['LaunchDarkly', 'Segment Analytics', 'ESLint', 'Prettier', 'Git', 'JIRA'],
    },
    {
        title: 'AI/ML TOOLS',
        color: 'var(--neon-purple)',
        skills: ['Claude AI', 'Cursor IDE', 'GitHub Copilot'],
    },
]

// ─── Component ───────────────────────────────────────────────────────────────

export default function LandingPage() {
    const { t, language, setLanguage } = useTranslation()
    const loginUrl = useLoginUrl()
    const { isStandalone } = useStandalone()

    return (
        <div className="font-sans min-h-screen flex flex-col items-center pt-0 relative transition-colors duration-300 overflow-x-hidden">
            {/* Global Background Grid Pattern */}
            <div className="fixed inset-0 pointer-events-none z-[-1] opacity-20" style={{ backgroundImage: 'linear-gradient(var(--border-primary) 1px, transparent 1px), linear-gradient(90deg, var(--border-primary) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
            
            {/* Ambient Background Glow Orbs — Nebula effect */}
            <div className="fixed top-[-15%] left-[-15%] w-[55%] h-[55%] rounded-full bg-[var(--neon-cyan)] opacity-[0.06] blur-[150px] pointer-events-none z-[-1]" />
            <div className="fixed bottom-[-15%] right-[-15%] w-[60%] h-[60%] rounded-full bg-[var(--neon-purple)] opacity-[0.05] blur-[180px] pointer-events-none z-[-1]" />
            <div className="fixed top-[30%] left-[50%] w-[40%] h-[40%] rounded-full bg-[#0066ff] opacity-[0.04] blur-[130px] pointer-events-none z-[-1]" />

            <SiteHeader
                maxWidth="max-w-[1400px]"
                rightSlot={
                    <div className="flex items-center gap-3">
                        <LanguageSwitcher lang={language} onToggle={() => setLanguage(language === 'en' ? 'vi' : 'en')} />
                        {!isStandalone && (
                            <Link href={loginUrl} className="theme-btn px-4 py-1.5 rounded-md text-sm font-bold tracking-wide uppercase hover:shadow-[0_0_15px_var(--neon-cyan)] border-border-primary">
                                {t('landing.login')}
                            </Link>
                        )}
                    </div>
                }
            />

            <main className="max-w-[1400px] w-full mx-auto relative z-10 mt-6 px-4 md:px-8 pb-32">
                <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 lg:gap-8">
                    
                    {/* ════ LEFT COLUMN ════ */}
                    <div className="xl:col-span-8 flex flex-col gap-6 lg:gap-8">
                        
                        {/* Hero Section */}
                        <CyberCard glowColor="cyan" className="p-8 md:p-12 border-t-4 border-t-accent-primary">
                            <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-12 relative z-10">
                                <div className="flex-1 space-y-6">
                                    <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-text-muted uppercase">
                                        <span className="w-4 h-0.5 bg-accent-primary" /> HERO SECTION
                                    </div>
                                    <h1 className="text-5xl md:text-7xl font-black text-text-primary leading-[1.1] tracking-tight">
                                        Hello, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-primary to-[var(--neon-purple)] animate-pulse" style={{ textShadow: '0 0 20px rgba(176, 38, 255, 0.3)' }}>Khuong.</span><br />
                                        <span className="text-3xl md:text-5xl text-text-secondary mt-2 block">Front-End Developer</span>
                                    </h1>
                                    <h2 className="text-xl md:text-2xl font-bold text-text-primary flex items-center gap-3">
                                        8+ Years <span className="w-1.5 h-1.5 rounded-full bg-accent-primary shadow-[0_0_10px_var(--neon-cyan)]" /> React <span className="text-accent-primary">Specialist</span>
                                    </h2>
                                    <p className="text-text-secondary leading-relaxed max-w-xl text-lg">
                                        {t('landing.purpose')}
                                    </p>
                                    <div className="pt-6 flex flex-wrap gap-4">
                                        <Link href="/projects" className="group relative px-6 py-3 rounded-lg overflow-hidden border border-accent-primary text-accent-primary font-bold transition hover:bg-accent-primary/10">
                                            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-accent-primary/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                                            <span className="relative flex items-center gap-2">🚀 Side Projects</span>
                                        </Link>
                                        <Link href="/blogs" className="group relative px-6 py-3 rounded-lg overflow-hidden border border-[var(--neon-purple)] text-[var(--neon-purple)] font-bold transition hover:bg-[var(--neon-purple)]/10">
                                            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-[var(--neon-purple)]/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                                            <span className="relative flex items-center gap-2">📝 Blog</span>
                                        </Link>
                                        <Link href="/cv" className="group relative px-6 py-3 rounded-lg overflow-hidden border border-[var(--neon-green)] text-[var(--neon-green)] font-bold transition hover:bg-[var(--neon-green)]/10">
                                            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-[var(--neon-green)]/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                                            <span className="relative flex items-center gap-2">📄 Download CV</span>
                                        </Link>
                                    </div>
                                </div>
                                <div className="shrink-0 scale-110 md:scale-125 transform-gpu mt-8 md:mt-0 md:mr-10">
                                    <HologramAvatar src="/image/home/avatar.png" alt="Khuong" size={300} color="var(--neon-cyan)" />
                                </div>
                            </div>
                            {/* Scroll Down Indicator */}
                            <div className="flex items-center justify-end gap-2 mt-6 text-text-muted text-xs font-bold tracking-widest uppercase animate-bounce">
                                SCROLL DOWN <span className="text-accent-primary">↓</span>
                            </div>
                        </CyberCard>

                        {/* About Me */}
                        <CyberCard glowColor="purple">
                            <h2 className="text-xl font-bold text-text-primary mb-6 flex items-center gap-3 uppercase tracking-wider">
                                <span className="text-[var(--neon-purple)]">👤</span> ABOUT ME
                            </h2>
                            <p className="text-text-secondary leading-relaxed mb-10 text-lg">
                                {t('landing.aboutText')}
                            </p>
                            
                            {/* Horizontal Timeline */}
                            <div className="relative h-1.5 bg-border-primary rounded-full mx-4 mb-4">
                                <div className="absolute top-0 left-0 h-full w-[80%] bg-gradient-to-r from-[var(--neon-cyan)] to-[var(--neon-purple)] rounded-full shadow-[0_0_15px_var(--neon-cyan)]" />
                                
                                <div className="absolute top-1/2 left-[0%] -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-bg-card border-2 border-[var(--neon-cyan)] rounded-full z-10" />
                                <div className="absolute top-1/2 left-[25%] -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-bg-card border-2 border-[var(--neon-cyan)] rounded-full z-10" />
                                <div className="absolute top-1/2 left-[55%] -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-bg-card border-2 border-[var(--neon-cyan)] rounded-full z-10" />
                                <div className="absolute top-1/2 left-[80%] -translate-x-1/2 -translate-y-1/2 w-5 h-5 bg-[var(--neon-purple)] rounded-full shadow-[0_0_15px_var(--neon-purple)] z-20 animate-pulse" />
                                <div className="absolute top-1/2 left-[100%] -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-bg-card border-2 border-border-primary rounded-full z-10" />

                                <div className="absolute top-6 left-0 -translate-x-1/2 text-xs font-bold text-text-muted">2014</div>
                                <div className="absolute top-6 left-[25%] -translate-x-1/2 text-xs font-bold text-text-muted">2018</div>
                                <div className="absolute top-6 left-[55%] -translate-x-1/2 text-xs font-bold text-text-muted">2022</div>
                                <div className="absolute top-6 left-[80%] -translate-x-1/2 text-center text-xs font-bold text-[var(--neon-purple)]">
                                    Present<br /><span className="text-[10px] text-[var(--neon-purple)]/70">Tech Lead</span>
                                </div>
                                <div className="absolute top-6 left-[100%] -translate-x-1/2 text-xs font-bold text-text-muted">2030</div>
                            </div>
                        </CyberCard>

                        {/* Work Experience */}
                        <CyberCard glowColor="green">
                            <h2 className="text-xl font-bold text-text-primary mb-8 flex items-center gap-3 uppercase tracking-wider">
                                <span className="text-[var(--neon-green)]">💼</span> WORK EXPERIENCE
                            </h2>
                            <Timeline>
                                {experiences.map((exp, i) => (
                                    <TimelineItem 
                                        key={i} 
                                        color={exp.color} 
                                        title={exp.role} 
                                        subtitle={`${exp.company}${exp.client ? ` • ${exp.client}` : ''} — ${exp.location}`} 
                                        date={exp.period}
                                        teamSize={exp.teamSize}
                                    >
                                        <ul className="space-y-2 mt-2">
                                            {exp.highlights.map((h, j) => (
                                                <li key={j} className="flex items-start gap-2">
                                                    <span className="text-[10px] mt-1.5" style={{ color: exp.color }}>►</span>
                                                    <span>{h}</span>
                                                </li>
                                            ))}
                                        </ul>
                                        {exp.link && (
                                            <a href={exp.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wide mt-4 hover:underline" style={{ color: exp.color }}>
                                                🔗 {exp.link}
                                            </a>
                                        )}
                                    </TimelineItem>
                                ))}
                            </Timeline>
                        </CyberCard>

                    </div>


                    {/* ════ RIGHT COLUMN ════ */}
                    <div className="xl:col-span-4 flex flex-col gap-6 lg:gap-8">
                        
                        {/* Tech Stack */}
                        <CyberCard glowColor="cyan">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-sm font-bold text-text-primary uppercase tracking-widest">TECH STACK</h2>
                                <span className="text-xs text-text-muted font-mono">VIEW ALL</span>
                            </div>
                            <div className="grid grid-cols-4 gap-3">
                                <TechIcon name="React" color="#61DAFB"><ReactIcon /></TechIcon>
                                <TechIcon name="Next.js" color="#FFFFFF"><NextJsIcon /></TechIcon>
                                <TechIcon name="TypeScript" color="#3178C6"><TypeScriptIcon /></TechIcon>
                                <TechIcon name="Tailwind" color="#38bdf8"><TailwindIcon /></TechIcon>
                                <TechIcon name="Figma" color="#A259FF"><FigmaIcon /></TechIcon>
                                <TechIcon name="Redux" color="#764ABC"><ReduxIcon /></TechIcon>
                                <TechIcon name="Node.js" color="#339933"><NodeJsIcon /></TechIcon>
                                <TechIcon name="Git" color="#F05032"><GitIcon /></TechIcon>
                            </div>
                        </CyberCard>

                        {/* Featured Side Project */}
                        <CyberCard glowColor="purple">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-sm font-bold text-text-primary uppercase tracking-widest">FEATURED SIDE PROJECT</h2>
                                <span className="text-xs text-text-muted font-mono">VIEW ALL</span>
                            </div>
                            <div className="rounded-xl overflow-hidden mb-4 border border-border-primary relative group">
                                <div className="absolute inset-0 bg-[var(--neon-purple)]/20 opacity-0 group-hover:opacity-100 transition duration-300 z-10" />
                                <Image
                                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format&fit=crop"
                                    alt="Project Mockup"
                                    width={400}
                                    height={200}
                                    className="w-full h-auto object-cover transform group-hover:scale-105 transition duration-500"
                                />
                            </div>
                            <h3 className="text-lg font-bold text-text-primary mb-2 text-shadow-glow">E-commerce App</h3>
                            <p className="text-sm text-text-secondary mb-4">A modern e-commerce application built with React, TypeScript and Node.js.</p>
                            <div className="flex flex-wrap gap-2 mb-4">
                                <span className="px-2 py-1 text-[10px] uppercase tracking-wider rounded-sm border border-border-dim text-text-secondary">React</span>
                                <span className="px-2 py-1 text-[10px] uppercase tracking-wider rounded-sm border border-border-dim text-text-secondary">Next.js</span>
                                <span className="px-2 py-1 text-[10px] uppercase tracking-wider rounded-sm border border-border-dim text-text-secondary">TypeScript</span>
                            </div>
                            <div className="flex gap-4 text-xs font-bold uppercase tracking-wide">
                                <Link href="/products" className="text-[var(--neon-purple)] flex items-center gap-1 hover:underline">
                                    <span>🌐</span> Live Demo
                                </Link>
                                <Link href={loginUrl} className="text-text-secondary hover:text-text-primary flex items-center gap-1 hover:underline">
                                    <span>🔐</span> Admin Panel
                                </Link>
                            </div>
                        </CyberCard>

                        {/* Contact & Performance Stats */}
                        <div className="grid grid-cols-2 gap-4">
                            <CyberCard glowColor="cyan" className="p-5 flex flex-col justify-center">
                                <h2 className="text-xs font-bold text-text-primary mb-3 uppercase tracking-widest">CONTACT</h2>
                                <div className="flex gap-3 text-text-secondary">
                                    <a href="mailto:nguyendangkhuong96@gmail.com" className="hover:text-[var(--neon-cyan)] transition-colors"><EmailIcon /></a>
                                    <a href="https://linkedin.com/in/nguyendangkhuong" target="_blank" rel="noopener noreferrer" className="hover:text-[#0A66C2] transition-colors"><LinkedInIcon /></a>
                                    <a href="https://github.com/NguyenDangKhuong" target="_blank" rel="noopener noreferrer" className="hover:text-text-primary transition-colors"><GitHubIcon /></a>
                                    <a href="#" className="hover:text-text-primary transition-colors"><TwitterIcon /></a>
                                </div>
                            </CyberCard>

                            <CyberCard glowColor="green" className="p-5 flex flex-col justify-center items-center text-center">
                                <h2 className="text-xs font-bold text-text-primary mb-3 uppercase tracking-widest w-full">PERFORMANCE STATS</h2>
                                <div className="flex gap-3">
                                    <PerformanceBadge score="100" label="Performance" />
                                    <PerformanceBadge score="100" label="Accessibility" />
                                    <PerformanceBadge score="100" label="Best Practices" />
                                </div>
                            </CyberCard>
                        </div>

                        {/* Education */}
                        <CyberCard glowColor="cyan">
                            <h2 className="text-sm font-bold text-text-primary mb-4 flex items-center gap-2 uppercase tracking-widest">
                                🎓 EDUCATION
                            </h2>
                            <div className="relative">
                                <h3 className="text-sm font-bold text-text-primary">Ho Chi Minh University of Science (HCMUS)</h3>
                                <p className="text-xs text-text-secondary mt-1">Faculty of Information Technology</p>
                                <p className="text-xs text-text-muted">HCM, Vietnam</p>
                                <span className="inline-block mt-3 text-[10px] font-bold px-3 py-1 rounded-sm border border-[var(--neon-cyan)]/40 text-[var(--neon-cyan)] bg-[var(--neon-cyan)]/10">
                                    Jul 2014 — Jul 2018
                                </span>
                            </div>
                        </CyberCard>

                        {/* Skills & Expertise */}
                        <CyberCard glowColor="purple">
                            <h2 className="text-sm font-bold text-text-primary mb-6 flex items-center gap-2 uppercase tracking-widest">
                                🛠️ SKILLS & EXPERTISE
                            </h2>
                            <div className="space-y-6">
                                {skillCategories.map((cat) => (
                                    <div key={cat.title} className="p-4 rounded-xl border border-border-dim bg-bg-surface-dim/30">
                                        <h3 className="text-xs font-bold mb-3 tracking-widest" style={{ color: cat.color }}>
                                            {cat.title}
                                        </h3>
                                        <div className="flex flex-wrap gap-2">
                                            {cat.skills.map((skill) => (
                                                <TechBadge key={skill} label={skill} color={cat.color} />
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CyberCard>

                    </div>
                </div>
            </main>

            {/* Floating Dock Footer */}
            <div className="fixed bottom-16 left-1/2 -translate-x-1/2 z-50">
                <div className="glass-card !rounded-2xl !p-2 !border-[rgba(255,255,255,0.15)] flex items-center gap-2 shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-text-muted px-3 border-r border-border-dim hidden md:inline-block">
                        TOOLS
                    </span>
                    <Link href="/flashcards" className="group flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-bg-tag transition-colors">
                        <span className="text-lg group-hover:scale-125 transition-transform duration-300 drop-shadow-md">🃏</span>
                        <span className="text-xs font-bold text-text-secondary group-hover:text-text-primary hidden sm:inline-block">Flashcards</span>
                    </Link>
                    <Link href="/leetcode" className="group flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-bg-tag transition-colors">
                        <span className="text-lg group-hover:scale-125 transition-transform duration-300 drop-shadow-md">🧩</span>
                        <span className="text-xs font-bold text-text-secondary group-hover:text-text-primary hidden sm:inline-block">LeetCode</span>
                    </Link>
                    <Link href="/translate" className="group flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-bg-tag transition-colors">
                        <span className="text-lg group-hover:scale-125 transition-transform duration-300 drop-shadow-md">🌐</span>
                        <span className="text-xs font-bold text-text-secondary group-hover:text-text-primary hidden sm:inline-block">Translate</span>
                    </Link>
                    <Link href="/clarity" className="group flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-bg-tag transition-colors">
                        <span className="text-lg group-hover:scale-125 transition-transform duration-300 drop-shadow-md">🎯</span>
                        <span className="text-xs font-bold text-text-secondary group-hover:text-text-primary hidden sm:inline-block">Clarity</span>
                    </Link>
                </div>
            </div>

            {/* Static Footer */}
            <footer className="w-full border-t border-border-dim py-6 px-4 md:px-8">
                <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-text-muted">
                    <span>© 2025 Khuong Dev. All rights reserved.</span>
                    <div className="flex items-center gap-6">
                        <Link href="/privacy" className="hover:text-text-primary transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-text-primary transition-colors italic">Terms of Service</Link>
                    </div>
                </div>
            </footer>

        </div>
    )
}

// ─── Helper Components ───────────────────────────────────────────────────────

function TechIcon({ children, name, color }: { children: React.ReactNode; name: string; color: string }) {
    return (
        <div
            className="w-full aspect-square rounded-xl bg-bg-surface-dim border border-border-dim flex flex-col items-center justify-center p-3 hover:scale-110 hover:border-border-primary transition-all duration-300 cursor-pointer"
            style={{ boxShadow: `inset 0 0 10px color-mix(in srgb, ${color} 10%, transparent)` }}
            title={name}
        >
            <div className="w-8 h-8 mb-2 opacity-90">{children}</div>
            <span className="text-[9px] font-bold tracking-wider uppercase text-text-secondary truncate w-full text-center">{name}</span>
        </div>
    )
}

function PerformanceBadge({ score, label }: { score: string; label: string }) {
    return (
        <div className="flex flex-col items-center gap-1">
            <div className="w-14 h-14 rounded-full border-2 border-[var(--neon-green)] flex flex-col items-center justify-center bg-[var(--neon-green)]/10 shadow-[0_0_10px_var(--neon-green)] relative group">
                <span className="text-sm font-black text-[var(--neon-green)] leading-none" style={{ textShadow: '0 0 5px var(--neon-green)' }}>{score}</span>
                
                <svg className="absolute inset-[-2px] w-[calc(100%+4px)] h-[calc(100%+4px)] rotate-[-90deg]">
                    <circle cx="50%" cy="50%" r="46%" fill="none" stroke="var(--neon-green)" strokeWidth="2" strokeDasharray="100 100" />
                </svg>
            </div>
            <span className="text-[8px] font-bold text-[var(--neon-green)]/70 leading-none text-center">{label}</span>
        </div>
    )
}

// ─── SVG Icons ───────────────────────────────────────────────────────────────

function ReactIcon() { return <svg xmlns="http://www.w3.org/2000/svg" viewBox="-11.5 -10.23174 23 20.46348" className="w-full h-full text-[#61DAFB] fill-current"><circle cx="0" cy="0" r="2.05" fill="#61dafb" /><g stroke="#61dafb" strokeWidth="1" fill="none"><ellipse rx="11" ry="4.2" /><ellipse rx="11" ry="4.2" transform="rotate(60)" /><ellipse rx="11" ry="4.2" transform="rotate(120)" /></g></svg> }
function NextJsIcon() { return <svg className="w-full h-full text-text-primary fill-current" viewBox="0 0 128 128"><path d="M64 0C28.7 0 0 28.7 0 64s28.7 64 64 64 64-28.7 64-64S99.3 0 64 0zm23 100.6L49.7 47.9H41v37.8h8.6v-27l33.1 46.5h10.3V42.3H87v58.3zM64 118c-29.8 0-54-24.2-54-54S34.2 10 64 10s54 24.2 54 54-24.2 54-54 54z"></path></svg> }
function TypeScriptIcon() { return <svg className="w-full h-full text-[#3178C6] fill-current" viewBox="0 0 128 128"><path d="M21.4 6.78h85.32v114.44H21.4V6.78zm19.63 86.42c3.37 4.71 8.06 6.91 13.68 6.91 5.99 0 9.23-2.59 9.23-6.91 0-4.57-3.63-6.5-8.72-8.58l-4.14-1.67c-8.72-3.59-13.13-8.9-13.13-16.28 0-12.32 10.29-18.26 23.05-18.26 8.46 0 15.38 2.33 19.63 7.63l-7.76 9.3c-4.37-4.41-8.5-6.04-12.83-6.04-5.64 0-8.41 2.59-8.41 6.29 0 4.37 2.99 6.25 9.3 8.64l3.7 1.41c10.61 3.93 14.45 9.39 14.45 17.12 0 13.55-10.34 19.46-24.38 19.46-10.75 0-18.83-3.53-23.36-9.3l7.74-9.72zm60.76-30.74v59.08H89V63.25h-9.94v-12.1h29.43v12.1h-9.94z"></path></svg> }
function TailwindIcon() { return <svg className="w-full h-full text-[#38bdf8] fill-current" viewBox="0 0 24 24"><path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C7.666,17.818,9.027,19.2,12.001,19.2c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z"></path></svg> }
function FigmaIcon() { return <svg className="w-full h-full fill-current" viewBox="0 0 38 57" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19 28.5C19 25.9804 20.0009 23.5641 21.7825 21.7825C23.5641 20.0009 25.9804 19 28.5 19C31.0196 19 33.4359 20.0009 35.2175 21.7825C36.9991 23.5641 38 25.9804 38 28.5C38 31.0196 36.9991 33.4359 35.2175 35.2175C33.4359 36.9991 31.0196 38 28.5 38C25.9804 38 23.5641 36.9991 21.7825 35.2175C20.0009 33.4359 19 31.0196 19 28.5Z" fill="#1ABCFE" /><path d="M0 47.5C0 44.9804 1.00089 42.5641 2.78249 40.7825C4.56408 39.0009 6.98044 38 9.5 38H19V47.5C19 50.0196 17.9991 52.4359 16.2175 54.2175C14.4359 55.9991 12.0196 57 9.5 57C6.98044 57 4.56408 55.9991 2.78249 54.2175C1.00089 52.4359 0 50.0196 0 47.5Z" fill="#0ACF83" /><path d="M19 0V19H28.5C31.0196 19 33.4359 17.9991 35.2175 16.2175C36.9991 14.4359 38 12.0196 38 9.5C38 6.98044 36.9991 4.56408 35.2175 2.78249C33.4359 1.00089 31.0196 0 28.5 0H19Z" fill="#FF7262" /><path d="M0 9.5C0 12.0196 1.00089 14.4359 2.78249 16.2175C4.56408 17.9991 6.98044 19 9.5 19H19V0H9.5C6.98044 0 4.56408 1.00089 2.78249 2.78249C1.00089 4.56408 0 6.98044 0 9.5Z" fill="#F24E1E" /><path d="M0 28.5C0 31.0196 1.00089 33.4359 2.78249 35.2175C4.56408 36.9991 6.98044 38 9.5 38H19V19H9.5C6.98044 19 4.56408 20.0009 2.78249 21.7825C1.00089 23.5641 0 25.9804 0 28.5Z" fill="#A259FF" /></svg> }
function ReduxIcon() { return <svg className="w-full h-full" viewBox="0 0 100 100"><path fill="#764ABC" d="M65.6 65.4c3.4-.4 6-3.3 5.8-6.8-.2-3.5-3.2-6.3-6.8-6.3h-.2c-3.7.1-6.6 3.2-6.4 6.9.1 1.8.8 3.4 2 4.5-4.2 8.2-10.5 14.3-20.1 19.3-6.5 3.4-13.2 4.6-19.9 3.7-5.5-.7-9.8-3.1-12.6-7-4.2-5.8-4.5-12.2-1-18.5 2.5-4.5 6.3-7.8 8.7-9.6-.5-1.5-1.2-4.1-1.7-5.9C1.2 55.5-2.3 67.4 1.5 76.2c2.8 6.5 8.5 10.6 16.1 10.6 1.9 0 3.8-.2 5.7-.6 12.2-2.5 21.4-10 27.1-20.8zM84.3 49.3c-9.5-11.1-23.5-17.2-39.4-17.2h-2c-1.2-2.2-3.5-3.7-6.1-3.7h-.2c-3.7.1-6.6 3.2-6.4 6.9.2 3.5 3.2 6.3 6.8 6.3h.2c2.7-.1 5-1.8 6.1-4.1h2.2c9.5 0 18.5 2.8 26.6 8.2 6.2 4.1 10.6 9.4 13.1 15.6 2.1 5.2 2 10.3-.2 14.7-3.4 6.7-9.1 10.3-16.6 10.3-4.8 0-9.4-1.5-11.8-2.6-1.3 1.1-3.7 3-5.3 4.2 5 2.3 10.1 3.6 14.9 3.6 11.1 0 19.3-6.2 22.5-12.3 3.4-6.7 3.2-18.2-4.4-29.9zM32.4 67.1c.2 3.5 3.2 6.3 6.8 6.3h.2c3.7-.1 6.6-3.2 6.4-6.9-.2-3.5-3.2-6.3-6.8-6.3h-.2c-.3 0-.5 0-.8.1-4.7-7.9-6.7-16.5-5.9-25.8.6-7 3-13.1 7.1-18.1 3.4-4.2 10-6.2 14.5-6.4 12.5-.2 17.8 15.3 18.2 21.5 1.5.4 4.1 1.3 5.9 1.9C76.8 16.2 66.9 4.3 55.4 4.3c-10.8 0-20.7 7.8-24.6 19.4-5.3 15.6-1.9 30.5 5 42.3-1.1 1.5-1.7 3.4-1.6 5.5l.2-.4z" /></svg> }
function NodeJsIcon() { return <svg className="w-full h-full" viewBox="0 0 128 128"><path fill="#339933" d="M112.771 30.334L68.674 4.729c-2.781-1.584-6.402-1.584-9.205 0L14.901 30.334C12.031 31.985 10 35.088 10 38.407v51.142c0 3.319 2.084 6.423 4.954 8.083l11.775 6.688c5.628 2.772 7.617 2.772 10.178 2.772 8.333 0 13.093-5.039 13.093-13.828V42.159c0-.744-.593-1.339-1.337-1.339h-5.877c-.744 0-1.339.595-1.339 1.339v51.105c0 3.927-4.088 7.828-10.723 4.513l-12.311-7.056c-.462-.263-.737-.756-.737-1.283V38.407c0-.528.277-1.02.74-1.283l44.068-25.636c.449-.267 1.053-.267 1.503 0l44.068 25.636c.462.263.739.756.739 1.283v51.142c0 .527-.277 1.02-.74 1.283l-44.068 25.636c-.449.267-1.053.267-1.503 0l-11.561-6.83c-.358-.207-.816-.276-1.176-.097-3.234 1.643-3.85 1.853-6.88 2.812-.744.237-1.854.593.417 1.713l15.056 8.905c1.396.793 2.99 1.212 4.604 1.212 1.614 0 3.208-.419 4.604-1.212l44.068-25.636c2.871-1.66 4.954-4.763 4.954-8.083V38.407c0-3.319-2.084-6.422-4.954-8.073zM77.91 81.445c-11.726 0-14.309-3.235-15.17-9.066-.1-.628-.633-1.099-1.278-1.099h-5.975c-.745 0-1.339.674-1.339 1.417 0 7.833 4.264 17.147 23.762 17.147 14.235 0 22.399-5.583 22.399-15.369 0-9.707-6.555-12.296-20.353-14.138-13.937-1.859-15.347-2.818-15.347-6.118 0-2.718 1.214-6.354 11.659-6.354 9.327 0 12.775 2.013 14.184 8.305.131.58.63 1.003 1.225 1.003h6.035c.375 0 .735-.162.979-.435.246-.271.369-.634.329-1.003-1.005-11.882-8.934-17.416-22.752-17.416-13.009 0-20.759 5.489-20.759 14.698 0 9.977 7.718 12.745 20.201 13.969 14.944 1.465 15.516 3.652 15.516 6.593 0 5.107-4.1 7.283-13.737 7.283z" /></svg> }
function GitIcon() { return <svg className="w-full h-full" viewBox="0 0 128 128"><path fill="#F05032" d="M124.742 58.378l-55.117-55.117c-3.172-3.174-8.32-3.174-11.497 0l-11.444 11.446 14.518 14.518c3.375-1.139 7.243-.375 9.932 2.314 2.703 2.706 3.462 6.607 2.293 9.993l13.992 13.993c3.385-1.167 7.292-.413 9.994 2.295 3.78 3.777 3.78 9.9 0 13.679a9.673 9.673 0 01-13.683 0 9.677 9.677 0 01-2.105-10.521L68.574 45.818l-.002 34.341c.922.455 1.791 1.063 2.559 1.828 3.779 3.777 3.779 9.898 0 13.683-3.779 3.777-9.904 3.777-13.679 0-3.778-3.784-3.778-9.905 0-13.683a9.556 9.556 0 013.702-2.458V45.085a9.58 9.58 0 01-3.702-2.458c-2.726-2.728-3.468-6.66-2.259-10.053L40.818 18.2 3.266 55.765c-3.178 3.176-3.178 8.322 0 11.499l55.117 55.114c3.174 3.174 8.32 3.174 11.499 0l54.86-54.858c3.174-3.176 3.174-8.327 0-11.5v.358z" /></svg> }
function EmailIcon() { return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" /></svg> }
function LinkedInIcon() { return <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg> }
function TwitterIcon() { return <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16H20L8.267 4z" /><path d="M4 20l6.768-6.768M20 4l-6.768 6.768" /></svg> }
function GitHubIcon() { return <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg> }
