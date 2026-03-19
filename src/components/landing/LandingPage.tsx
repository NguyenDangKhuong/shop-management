'use client'

import Link from 'next/link'
import Image from 'next/image'
import LanguageSwitcher from '@/components/ui/LanguageSwitcher'
import SiteHeader from '@/components/ui/SiteHeader'
import { useTranslation } from '@/i18n'
import { useLoginUrl } from '@/hooks/useLoginUrl'
import { useStandalone } from '@/hooks/useStandalone'

// ─── Data ────────────────────────────────────────────────────────────────────

const experiences = [
    {
        company: 'HCL Technologies Vietnam',
        client: 'ANZ Banking Group',
        location: 'HCM, Vietnam & Melbourne, AU',
        role: 'Technical Lead',
        teamSize: 15,
        period: 'Jun 2023 — Present',
        color: '#38bdf8',
        highlights: [
            'Built production features with React 19 (Compiler, Server Actions, Suspense) and Next.js 15 App Router with SSR, Middleware & API Routes',
            'Achieved zero-runtime CSS using Vanilla Extract — eliminating runtime style injection overhead',
            'Developed and consumed 70+ components from internal Design System (Ocean Blue)',
            'Implemented React Hook Form + Zod for type-safe runtime validation',
            'Established testing pyramid: Jest + Testing Library, Playwright (E2E), Storybook, MSW',
            'Achieved 98% accessibility score with jest-axe and @axe-core/playwright',
            'Managed feature flag-driven releases with LaunchDarkly — progressive rollouts & kill switches',
            'Integrated Segment Analytics for user behavior tracking & A/B testing',
            'Built with TypeScript strict mode (300+ path aliases, noImplicitAny, strictNullChecks)',
            'Experienced in Micro Frontend architecture — Module Federation, monorepo integration',
            'ANZ Plus Home page: Key contributor to enterprise-scale design system on Adobe Experience Manager (AEM)',
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
        color: '#c084fc',
        highlights: [
            'Developed HR management web application on SharePoint framework',
            'Built reusable React components for dynamic UI rendering',
            'Applied Test-Driven Development (TDD) methodology',
            'Collaborated with cross-functional teams for enterprise HR requirements',
        ],
    },
    {
        company: 'LIG Technologies Vietnam',
        client: 'Asoview (Outsource)',
        location: 'HCM, Vietnam & Tokyo, Japan',
        role: 'React / WordPress Developer',
        teamSize: 4,
        period: 'Jul 2021 — Feb 2022',
        color: '#fbbf24',
        highlights: [
            'Developed responsive UIs using React, aligned with design and technical standards',
            'Built and customized WordPress-based websites for clients',
        ],
    },
    {
        company: 'Asoview Vietnam',
        client: null,
        location: 'HCM, Vietnam & Tokyo, Japan',
        role: 'React Developer',
        teamSize: 6,
        period: 'Jun 2018 — Jun 2021',
        color: '#10b981',
        highlights: [
            'Developed high-performance e-commerce application using React, Next.js, Redux-thunk',
            'Built custom API layer and hooks for CRUD transactions & JWT token management',
            'Expertise in React state management: ImmutableJS, Redux, duck pattern',
            'Worked closely with clients using Figma, XD for UX collaboration',
        ],
        link: 'https://asoview.com',
    },
    {
        company: 'VTech Web',
        client: null,
        location: 'HCM, Vietnam',
        role: 'Intern — Front-End / PHP Developer',
        teamSize: 2,
        period: 'Nov 2017 — May 2018',
        color: '#f97316',
        highlights: [
            'Supported sales page creation and practiced web development with Laravel (PHP)',
        ],
    },
]

const skillCategories = [
    {
        title: 'Core Technologies',
        color: '#38bdf8',
        skills: ['React 19', 'Next.js 15', 'TypeScript', 'JavaScript ES6+', 'HTML5', 'CSS3/SCSS'],
    },
    {
        title: 'State & Forms',
        color: '#c084fc',
        skills: ['Redux', 'Redux-Thunk', 'ImmutableJS', 'React Hook Form', 'Zod'],
    },
    {
        title: 'Testing',
        color: '#10b981',
        skills: ['Jest', 'Testing Library', 'Playwright', 'Storybook', 'MSW', 'jest-axe', 'axe-core'],
    },
    {
        title: 'Styling & Design',
        color: '#f472b6',
        skills: ['Vanilla Extract', 'Tailwind CSS', 'Ant Design', 'Figma', 'XD'],
    },
    {
        title: 'Architecture & DevOps',
        color: '#fbbf24',
        skills: ['Micro Frontends', 'Module Federation', 'SSR/SSG', 'Monorepo', 'AEM', 'SharePoint'],
    },
    {
        title: 'Tools & Analytics',
        color: '#f97316',
        skills: ['LaunchDarkly', 'Segment Analytics', 'ESLint', 'Prettier', 'syncpack', 'Git', 'JIRA'],
    },
    {
        title: 'AI/ML Tools',
        color: '#818cf8',
        skills: ['Claude AI', 'Cursor IDE', 'GitHub Copilot'],
    },
]

// ─── Component ───────────────────────────────────────────────────────────────

export default function LandingPage() {
    const { t, language, setLanguage } = useTranslation()
    const loginUrl = useLoginUrl()
    const { isStandalone } = useStandalone()

    return (
        <>
            {/* Preconnect to external domains for faster loading */}
            <link rel="preconnect" href="https://images.unsplash.com" />
            <link rel="dns-prefetch" href="https://images.unsplash.com" />

            <div className="font-sans min-h-screen flex flex-col items-center relative transition-colors duration-300" style={{ backgroundColor: 'var(--bg-page)', color: 'var(--text-primary)' }}>
                <SiteHeader
                    maxWidth="max-w-6xl"
                    noPadding
                    rightSlot={
                        <>
                            <LanguageSwitcher lang={language} onToggle={() => setLanguage(language === 'en' ? 'vi' : 'en')} />
                            {!isStandalone && (
                                <Link
                                    href={loginUrl}
                                    className="group relative px-3 py-2 md:px-6 rounded-full bg-[var(--bg-tag)] border border-[var(--border-primary)] overflow-hidden transition-all hover:border-[#38bdf8]/50 hover:shadow-[0_0_20px_rgba(56,189,248,0.2)]"
                                >
                                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                                    <span className="relative font-medium text-sm text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] flex items-center gap-2">
                                        <span className="hidden md:inline">{t('landing.login')}</span>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="2"
                                            stroke="currentColor"
                                            className="w-4 h-4"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                                            />
                                        </svg>
                                    </span>
                                </Link>
                            )}
                        </>
                    }
                />

                <main className="max-w-6xl w-full mx-auto relative z-10 px-4 md:px-8 mt-4 md:mt-8">
                    {/* ═══ TOP BENTO GRID ═══ */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Left Column - Hero & About */}
                        <div className="lg:col-span-2 flex flex-col gap-6">
                            {/* Hero Section */}
                            <div className="glass-card flex flex-col-reverse md:flex-row items-center justify-between gap-8 relative overflow-hidden">
                                <div className="absolute -top-20 -left-20 w-64 h-64 bg-[#38bdf8]/20 rounded-full blur-3xl -z-10"></div>

                                <div className="flex-1 space-y-4">
                                    <span className="text-[var(--text-secondary)] font-medium">{t('landing.heroSection')}</span>
                                    <h1 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] leading-tight">
                                        {t('landing.heroGreeting')} <span className="text-[#c084fc]">{t('landing.heroName')}</span>.<br />
                                        {t('landing.heroSub')}
                                    </h1>
                                    <p className="text-sm text-[var(--text-secondary)] italic leading-relaxed">
                                        {t('landing.purpose')}
                                    </p>
                                    <div className="pt-4 flex flex-wrap gap-3">
                                        <Link
                                            href="/projects"
                                            className="inline-block px-6 py-3 rounded-full bg-[var(--bg-tag)] border border-[#38bdf8]/50 text-[var(--text-primary)] font-semibold transition hover:bg-[#38bdf8]/20 shadow-[0_0_15px_rgba(56,189,248,0.3)]"
                                        >
                                            🚀 {t('landing.viewProjects')}
                                        </Link>
                                        <Link
                                            href="/blogs"
                                            className="inline-block px-6 py-3 rounded-full bg-[var(--bg-tag)] border border-[#c084fc]/50 text-[var(--text-primary)] font-semibold transition hover:bg-[#c084fc]/20 shadow-[0_0_15px_rgba(192,132,252,0.3)]"
                                        >
                                            📝 Blog
                                        </Link>
                                        <Link
                                            href="/cv"
                                            className="inline-block px-6 py-3 rounded-full bg-[var(--bg-tag)] border border-[#10b981]/50 text-[var(--text-primary)] font-semibold transition hover:bg-[#10b981]/20 shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                                        >
                                            📄 {t('landing.downloadCV')}
                                        </Link>

                                    </div>
                                </div>

                                <div className="relative shrink-0">
                                    <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-[var(--border-primary)] shadow-[0_0_15px_rgba(192,132,252,0.3)]">
                                        <Image
                                            src="/image/home/avatar.jpg"
                                            alt="Khuong - Developer Portrait"
                                            width={256}
                                            height={256}
                                            priority
                                            quality={85}
                                            className="w-full h-full object-cover grayscale-[30%]"
                                            sizes="(max-width: 768px) 192px, 256px"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* About Section */}
                            <div className="glass-card flex-1 space-y-6 relative overflow-hidden">
                                <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#c084fc]/10 rounded-full blur-3xl -z-10"></div>

                                <h2 className="text-xl font-semibold text-[var(--text-primary)]">{t('landing.about')}</h2>
                                <p className="text-[var(--text-secondary)] max-w-2xl leading-relaxed">
                                    {t('landing.aboutText')}
                                </p>

                                <div className="pt-8 pb-4">
                                    <div className="relative h-1 bg-[var(--bg-surface-dim)] rounded-full">
                                        <div className="absolute top-0 left-0 h-full w-[80%] bg-gradient-to-r from-[#38bdf8] to-[#c084fc] rounded-full shadow-[0_0_15px_rgba(56,189,248,0.3)]"></div>

                                        <div className="absolute -top-1 left-[0%] w-3 h-3 bg-[#10b981] rounded-full shadow-[0_0_15px_rgba(16,185,129,0.3)]"></div>
                                        <div className="absolute -top-1 left-[15%] w-3 h-3 bg-[#38bdf8] rounded-full shadow-[0_0_15px_rgba(56,189,248,0.3)]"></div>
                                        <div className="absolute -top-1 left-[50%] w-3 h-3 bg-[#38bdf8] rounded-full shadow-[0_0_15px_rgba(56,189,248,0.3)]"></div>
                                        <div className="absolute -top-1 left-[80%] w-3 h-3 bg-[#c084fc] rounded-full shadow-[0_0_15px_rgba(192,132,252,0.3)]"></div>
                                        <div className="absolute -top-1 left-[100%] w-3 h-3 bg-[var(--bg-surface-dim)] rounded-full"></div>

                                        <div className="absolute top-4 left-0 text-xs text-[var(--text-muted)]">2014</div>
                                        <div className="absolute top-4 left-[15%] text-xs text-[var(--text-muted)]">2018</div>
                                        <div className="absolute top-4 left-[50%] text-xs text-[var(--text-muted)]">2022</div>
                                        <div className="absolute top-4 left-[80%] -translate-x-1/2 text-center text-xs text-[#c084fc] font-bold">
                                            {t('landing.present')}<br />
                                            {t('landing.skiller')}
                                        </div>
                                        <div className="absolute top-4 right-0 text-xs text-[var(--text-muted)]">2030</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Tech Stack, Project, Contact */}
                        <div className="flex flex-col gap-6">
                            {/* Tech Stack */}
                            <div className="glass-card space-y-4">
                                <h2 className="text-xl font-semibold text-[var(--text-primary)]">{t('landing.techStack')}</h2>
                                <div className="flex flex-wrap gap-3">
                                    <TechIcon name="React" color="#61DAFB">
                                        <ReactIcon />
                                    </TechIcon>
                                    <TechIcon name="Next.js" color="#FFFFFF">
                                        <NextJsIcon />
                                    </TechIcon>
                                    <TechIcon name="TypeScript" color="#3178C6">
                                        <TypeScriptIcon />
                                    </TechIcon>
                                    <TechIcon name="Tailwind" color="#38bdf8">
                                        <TailwindIcon />
                                    </TechIcon>
                                    <TechIcon name="Figma" color="#A259FF">
                                        <FigmaIcon />
                                    </TechIcon>
                                    <TechIcon name="Jest" color="#C21325">
                                        <JestIcon />
                                    </TechIcon>
                                    <TechIcon name="Playwright" color="#45BA4B">
                                        <PlaywrightIcon />
                                    </TechIcon>
                                    <TechIcon name="Git" color="#F05032">
                                        <GitIcon />
                                    </TechIcon>
                                </div>
                            </div>

                            {/* Featured Project */}
                            <div className="glass-card p-0 overflow-hidden group cursor-pointer">
                                <div className="bg-[var(--bg-surface-dim)] h-40 w-full relative flex items-center justify-center overflow-hidden">
                                    <Image
                                        src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format&fit=crop"
                                        alt="Project Mockup"
                                        width={600}
                                        height={400}
                                        loading="lazy"
                                        quality={75}
                                        className="w-[80%] h-auto object-cover rounded-t-lg shadow-2xl transition-transform duration-500 group-hover:scale-105"
                                        sizes="(max-width: 768px) 100vw, 600px"
                                    />
                                </div>

                                <div className="p-6 space-y-3">
                                    <h3 className="text-lg font-semibold text-[var(--text-primary)] group-hover:text-[#38bdf8] transition">
                                        {t('landing.featuredProject')}
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="px-2 py-1 text-xs rounded-full bg-[var(--bg-tag)] text-[var(--text-secondary)] border border-[var(--border-primary)]">
                                            React
                                        </span>
                                        <span className="px-2 py-1 text-xs rounded-full bg-[var(--bg-tag)] text-[var(--text-secondary)] border border-[var(--border-primary)]">
                                            Next.js
                                        </span>
                                        <span className="px-2 py-1 text-xs rounded-full bg-[var(--bg-tag)] text-[var(--text-secondary)] border border-[var(--border-primary)]">
                                            TypeScript
                                        </span>
                                    </div>
                                    <div className="flex gap-4 pt-2 text-sm font-medium">
                                        <Link href="/products" className="text-[#38bdf8] hover:underline">
                                            {t('landing.liveDemo')}
                                        </Link>
                                        <Link href={loginUrl} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:underline">
                                            {t('landing.adminPanel')}
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            {/* Contact & Performance Stats */}
                            <div className="grid grid-cols-2 gap-6">
                                <div className="glass-card space-y-3 flex flex-col justify-center">
                                    <h2 className="text-base font-semibold text-[var(--text-primary)]">{t('landing.contact')}</h2>
                                    <a
                                        href="mailto:nguyendangkhuong96@gmail.com"
                                        className="text-sm text-[var(--text-secondary)] flex items-center gap-2 hover:text-[#38bdf8] transition"
                                    >
                                        <EmailIcon />
                                    </a>
                                    <div className="flex gap-3 text-[var(--text-secondary)] pt-1">
                                        <a href="https://linkedin.com/in/nguyendangkhuong" target="_blank" rel="noopener noreferrer" className="hover:text-[#0A66C2] transition">
                                            <LinkedInIcon />
                                        </a>
                                        <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--text-primary)] transition">
                                            <TwitterIcon />
                                        </a>
                                        <a href="https://github.com/NguyenDangKhuong" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--text-primary)] transition">
                                            <GitHubIcon />
                                        </a>
                                    </div>
                                </div>

                                <div className="glass-card space-y-3 flex flex-col justify-center items-center">
                                    <h2 className="text-sm font-semibold text-[var(--text-primary)] w-full text-left">{t('landing.performanceStats')}</h2>
                                    <div className="flex gap-2">
                                        <PerformanceBadge score="100" label="SEO" />
                                        <PerformanceBadge score="100" label="PERF" />
                                        <PerformanceBadge score="100" label="A11Y" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>



                    {/* ═══ WORK EXPERIENCE ═══ */}
                    <section className="mt-12">
                        <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-8 flex items-center gap-3">
                            💼 {t('landing.experience')}
                        </h2>

                        <div className="relative">
                            {/* Vertical line */}
                            <div className="absolute left-4 md:left-6 top-0 bottom-0 w-px bg-gradient-to-b from-[#38bdf8] via-[#c084fc] to-[#10b981] opacity-30" />

                            <div className="space-y-6">
                                {experiences.map((exp, i) => (
                                    <div key={i} className="relative pl-12 md:pl-16">
                                        {/* Dot */}
                                        <div
                                            className="absolute left-2.5 md:left-4.5 top-8 w-3 h-3 rounded-full ring-4 ring-gray-50 ring-[var(--ring-bg)]"
                                            style={{ backgroundColor: exp.color }}
                                        />

                                        <div className="glass-card space-y-3 hover:border-white/20 transition-all duration-300">
                                            {/* Header */}
                                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-1">
                                                <div>
                                                    <h3 className="text-lg font-semibold text-[var(--text-primary)]">
                                                        {exp.role}
                                                    </h3>
                                                    <p className="text-sm text-[var(--text-secondary)]">
                                                        {exp.company}
                                                        {exp.client && <span className="text-[#38bdf8]"> → {exp.client}</span>}
                                                        {' · '}{exp.location}
                                                    </p>
                                                </div>
                                                <div className="flex items-center gap-2 shrink-0">
                                                    <span
                                                        className="text-xs px-2.5 py-1 rounded-full border font-medium"
                                                        style={{ color: exp.color, borderColor: `${exp.color}40`, backgroundColor: `${exp.color}15` }}
                                                    >
                                                        {exp.period}
                                                    </span>
                                                    <span className="text-xs text-[var(--text-muted)] bg-[var(--bg-tag)] px-2 py-1 rounded-full">
                                                        👥 {exp.teamSize}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Bullets */}
                                            <ul className="space-y-1.5 text-sm text-[var(--text-secondary)]">
                                                {exp.highlights.map((h, j) => (
                                                    <li key={j} className="flex items-start gap-2">
                                                        <span className="text-[10px] mt-1.5 shrink-0" style={{ color: exp.color }}>▸</span>
                                                        {h}
                                                    </li>
                                                ))}
                                            </ul>

                                            {/* Link */}
                                            {exp.link && (
                                                <a
                                                    href={exp.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-1 text-sm font-medium hover:underline"
                                                    style={{ color: exp.color }}
                                                >
                                                    🔗 {exp.link}
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* ═══ EDUCATION ═══ */}
                    <section className="mt-12">
                        <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-8 flex items-center gap-3">
                            🎓 {t('landing.education')}
                        </h2>

                        <div className="glass-card flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative overflow-hidden">
                            <div className="absolute -top-16 -right-16 w-48 h-48 bg-[#38bdf8]/10 rounded-full blur-3xl -z-10" />
                            <div className="space-y-1">
                                <h3 className="text-lg font-semibold text-[var(--text-primary)]">
                                    Ho Chi Minh University of Science (HCMUS)
                                </h3>
                                <p className="text-sm text-[var(--text-secondary)]">
                                    Faculty of Information Technology
                                </p>
                                <p className="text-xs text-[var(--text-muted)]">
                                    HCM, Vietnam
                                </p>
                            </div>
                            <span className="text-xs px-3 py-1.5 rounded-full border border-[#38bdf8]/40 text-[#38bdf8] bg-[#38bdf8]/10 font-medium shrink-0">
                                Jul 2014 — Jul 2018
                            </span>
                        </div>
                    </section>

                    {/* ═══ SKILLS & EXPERTISE ═══ */}
                    <section className="mt-12">
                        <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-8 flex items-center gap-3">
                            🛠️ {t('landing.skills')}
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {skillCategories.map((cat) => (
                                <div key={cat.title} className="glass-card space-y-3">
                                    <h3
                                        className="text-sm font-semibold uppercase tracking-wider"
                                        style={{ color: cat.color }}
                                    >
                                        {cat.title}
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {cat.skills.map((skill) => (
                                            <span
                                                key={skill}
                                                className="px-2.5 py-1 text-xs rounded-full border text-[var(--text-secondary)]"
                                                style={{ borderColor: `${cat.color}30`, backgroundColor: `${cat.color}10` }}
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </main>

                {/* Footer with Terms and Privacy Policy */}
                <footer className="w-full max-w-6xl mx-auto mt-12 pt-8 pb-6 border-t border-[var(--border-primary)] z-20 px-4 md:px-8">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
                        <p className="text-[var(--text-secondary)]">
                            {t('landing.footer')}
                        </p>
                        <div className="flex items-center gap-6">
                            <Link
                                href="/flashcards"
                                className="text-[var(--text-secondary)] hover:text-[#fbbf24] transition-colors"
                                title="Algorithm Flashcards"
                            >
                                🃏 Flashcards
                            </Link>
                            <Link
                                href="/leetcode"
                                className="text-[var(--text-secondary)] hover:text-[#ffa116] transition-colors"
                                title="LeetCode Practice"
                            >
                                🧩 LeetCode
                            </Link>
                            <Link
                                href="/translate"
                                className="text-[var(--text-secondary)] hover:text-[#60a5fa] transition-colors"
                                title="Vietnamese ↔ English Translator"
                            >
                                🌐 Translate
                            </Link>
                            <Link
                                href="/clarity"
                                className="text-[var(--text-secondary)] hover:text-[#a78bfa] transition-colors"
                                title="Monthly Planning & Reflection"
                            >
                                🎯 Clarity
                            </Link>
                            <Link
                                href="/privacy"
                                className="text-[var(--text-secondary)] hover:text-[#38bdf8] transition-colors underline"
                            >
                                {t('landing.privacy')}
                            </Link>
                            <Link
                                href="/terms"
                                className="text-[var(--text-secondary)] hover:text-[#38bdf8] transition-colors underline"
                            >
                                {t('landing.terms')}
                            </Link>
                        </div>
                    </div>
                </footer>

                {/* Background Gradients - Optimized */}
                <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 overflow-hidden" aria-hidden="true">
                    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[var(--bg-glow-blue)] rounded-full blur-[100px]" />
                    <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[var(--bg-glow-purple)] rounded-full blur-[100px]" />
                </div>
            </div>
        </>
    )
}

// ─── Helper Components ───────────────────────────────────────────────────────

function TechIcon({ children, name }: { children: React.ReactNode; name: string; color: string }) {
    return (
        <div
            className="w-14 h-14 rounded-2xl bg-[var(--bg-tag)] border border-[var(--border-primary)] flex items-center justify-center p-2 hover:scale-110 transition-transform shadow-sm"
            title={name}
        >
            {children}
        </div>
    )
}

function PerformanceBadge({ score, label }: { score: string; label: string }) {
    return (
        <div className="w-12 h-12 rounded-full border-[3px] border-green-500 flex flex-col items-center justify-center bg-green-500/10 shadow-[0_0_10px_rgba(34,197,94,0.3)]">
            <span className="text-xs font-bold text-green-400 leading-none">{score}</span>
            <span className="text-[8px] text-green-600 leading-none">{label}</span>
        </div>
    )
}

// ─── SVG Icons ───────────────────────────────────────────────────────────────

function ReactIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="-11.5 -10.23174 23 20.46348" className="w-full h-full text-[#61DAFB] fill-current">
            <circle cx="0" cy="0" r="2.05" fill="#61dafb" />
            <g stroke="#61dafb" strokeWidth="1" fill="none">
                <ellipse rx="11" ry="4.2" />
                <ellipse rx="11" ry="4.2" transform="rotate(60)" />
                <ellipse rx="11" ry="4.2" transform="rotate(120)" />
            </g>
        </svg>
    )
}

function NextJsIcon() {
    return (
        <svg className="w-full h-full text-[var(--text-primary)] fill-current" viewBox="0 0 128 128">
            <path d="M64 0C28.7 0 0 28.7 0 64s28.7 64 64 64 64-28.7 64-64S99.3 0 64 0zm23 100.6L49.7 47.9H41v37.8h8.6v-27l33.1 46.5h10.3V42.3H87v58.3zM64 118c-29.8 0-54-24.2-54-54S34.2 10 64 10s54 24.2 54 54-24.2 54-54 54z"></path>
        </svg>
    )
}

function TypeScriptIcon() {
    return (
        <svg className="w-full h-full text-[#3178C6] fill-current" viewBox="0 0 128 128">
            <path d="M21.4 6.78h85.32v114.44H21.4V6.78zm19.63 86.42c3.37 4.71 8.06 6.91 13.68 6.91 5.99 0 9.23-2.59 9.23-6.91 0-4.57-3.63-6.5-8.72-8.58l-4.14-1.67c-8.72-3.59-13.13-8.9-13.13-16.28 0-12.32 10.29-18.26 23.05-18.26 8.46 0 15.38 2.33 19.63 7.63l-7.76 9.3c-4.37-4.41-8.5-6.04-12.83-6.04-5.64 0-8.41 2.59-8.41 6.29 0 4.37 2.99 6.25 9.3 8.64l3.7 1.41c10.61 3.93 14.45 9.39 14.45 17.12 0 13.55-10.34 19.46-24.38 19.46-10.75 0-18.83-3.53-23.36-9.3l7.74-9.72zm60.76-30.74v59.08H89V63.25h-9.94v-12.1h29.43v12.1h-9.94z"></path>
        </svg>
    )
}

function TailwindIcon() {
    return (
        <svg className="w-full h-full text-[#38bdf8] fill-current" viewBox="0 0 24 24">
            <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C7.666,17.818,9.027,19.2,12.001,19.2c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z"></path>
        </svg>
    )
}

function FigmaIcon() {
    return (
        <svg className="w-full h-full fill-current" viewBox="0 0 38 57" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 28.5C19 25.9804 20.0009 23.5641 21.7825 21.7825C23.5641 20.0009 25.9804 19 28.5 19C31.0196 19 33.4359 20.0009 35.2175 21.7825C36.9991 23.5641 38 25.9804 38 28.5C38 31.0196 36.9991 33.4359 35.2175 35.2175C33.4359 36.9991 31.0196 38 28.5 38C25.9804 38 23.5641 36.9991 21.7825 35.2175C20.0009 33.4359 19 31.0196 19 28.5Z" fill="#1ABCFE" />
            <path d="M0 47.5C0 44.9804 1.00089 42.5641 2.78249 40.7825C4.56408 39.0009 6.98044 38 9.5 38H19V47.5C19 50.0196 17.9991 52.4359 16.2175 54.2175C14.4359 55.9991 12.0196 57 9.5 57C6.98044 57 4.56408 55.9991 2.78249 54.2175C1.00089 52.4359 0 50.0196 0 47.5Z" fill="#0ACF83" />
            <path d="M19 0V19H28.5C31.0196 19 33.4359 17.9991 35.2175 16.2175C36.9991 14.4359 38 12.0196 38 9.5C38 6.98044 36.9991 4.56408 35.2175 2.78249C33.4359 1.00089 31.0196 0 28.5 0H19Z" fill="#FF7262" />
            <path d="M0 9.5C0 12.0196 1.00089 14.4359 2.78249 16.2175C4.56408 17.9991 6.98044 19 9.5 19H19V0H9.5C6.98044 0 4.56408 1.00089 2.78249 2.78249C1.00089 4.56408 0 6.98044 0 9.5Z" fill="#F24E1E" />
            <path d="M0 28.5C0 31.0196 1.00089 33.4359 2.78249 35.2175C4.56408 36.9991 6.98044 38 9.5 38H19V19H9.5C6.98044 19 4.56408 20.0009 2.78249 21.7825C1.00089 23.5641 0 25.9804 0 28.5Z" fill="#A259FF" />
        </svg>
    )
}

function JestIcon() {
    return (
        <svg className="w-full h-full" viewBox="0 0 128 128">
            <path fill="#99425B" d="M124.129 63.02c0-7.218-5.854-13.073-13.073-13.073-.541 0-1.074.042-1.6.114l-6.86-34.833a5.14 5.14 0 001.629-3.746V5.14A5.14 5.14 0 0099.084 0H28.916a5.14 5.14 0 00-5.14 5.14v6.343a5.14 5.14 0 001.728 3.834l-6.846 34.769c-.477-.06-.962-.096-1.455-.096-7.218 0-13.072 5.855-13.072 13.073 0 5.078 2.905 9.477 7.13 11.636a13.04 13.04 0 00-.058 1.208c0 4.67 2.47 8.764 6.168 11.057a13.04 13.04 0 00-.054 1.182c0 7.218 5.855 13.073 13.073 13.073.693 0 1.37-.06 2.03-.17l1.567 7.96a5.14 5.14 0 00-1.728 3.834v6.343a5.14 5.14 0 005.14 5.14h42.168a5.14 5.14 0 005.14-5.14v-6.344a5.14 5.14 0 00-1.626-3.747l1.581-8.028c.608.091 1.227.152 1.862.152 7.218 0 13.073-5.855 13.073-13.073 0-.401-.025-.795-.06-1.187 3.756-2.283 6.283-6.413 6.283-11.13 0-.396-.025-.787-.06-1.174 4.152-2.18 6.997-6.54 6.997-11.57z" />
            <path fill="#FFF" d="M95.634 4.903H32.366v6.782h63.268V4.903zm-3.984 9.906H36.35l-6.712 34.096a13.07 13.07 0 016.442 5.018l4.094-20.804c.328-1.667 1.458-5.157 5.093-5.157h37.467c3.631 0 4.763 3.488 5.093 5.16l4.088 20.768a13.074 13.074 0 016.442-5.05L91.649 14.81zM45.658 66.27l-2.6 13.206 1.23-.277a4.627 4.627 0 011.138-.121 5.207 5.207 0 013.9 1.72c.182.206.348.428.498.665l4.445-22.6c.469-2.384-.46-4.317-2.469-5.137a6.12 6.12 0 00-2.295-.452c-3.104 0-4.881 2.952-5.447 5.84-.606 3.097.268 5.603 1.6 7.156zm36.786 0c1.332-1.553 2.206-4.06 1.6-7.157-.565-2.887-2.343-5.839-5.447-5.839a6.128 6.128 0 00-2.294.452c-2.01.82-2.938 2.753-2.47 5.137l4.446 22.6a5.17 5.17 0 01.498-.665 5.207 5.207 0 013.9-1.72c.386 0 .767.04 1.138.121l1.229.277-2.6-13.206zm-5.084 25.833a5.207 5.207 0 01-3.9-1.72 5.207 5.207 0 01-3.9 1.72 4.627 4.627 0 01-1.137-.121 5.207 5.207 0 01-3.9 1.72 4.627 4.627 0 01-1.138-.121l-.313.07-.308 1.565h19.38l-.312-1.586-.313-.07a4.627 4.627 0 01-1.137.121 5.207 5.207 0 01-3.9-1.72 4.63 4.63 0 01-1.137.121 4.627 4.627 0 01-1.138-.121l.035.008a5.207 5.207 0 01-3.899 1.712 4.627 4.627 0 01-1.137-.121l.035.008a5.219 5.219 0 01.663.186 4.638 4.638 0 001.137.121 5.207 5.207 0 003.9-1.72 4.638 4.638 0 001.138.121 4.627 4.627 0 001.138-.121 5.207 5.207 0 003.9 1.72 4.627 4.627 0 001.137-.121c.232-.067.455-.118.663-.186a4.627 4.627 0 01-1.137.121zM95.634 113.418H32.366v6.78h63.268v-6.78z" />
        </svg>
    )
}

function PlaywrightIcon() {
    return (
        <svg className="w-full h-full" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M32 8C18.745 8 8 18.745 8 32s10.745 24 24 24 24-10.745 24-24S45.255 8 32 8z" fill="#2EAD33" />
            <path d="M44 28c-2 0-4 1-5 3l-2-1c1-3 4-5 7-5 4 0 8 3 8 8s-4 8-8 8c-3 0-6-2-7-5l2-1c1 2 3 3 5 3 3 0 5-2 5-5s-2-5-5-5zM20 28c-3 0-5 2-5 5s2 5 5 5c2 0 4-1 5-3l2 1c-1 3-4 5-7 5-4 0-8-3-8-8s4-8 8-8c3 0 6 2 7 5l-2 1c-1-2-3-3-5-3z" fill="#fff" />
        </svg>
    )
}

function GitIcon() {
    return (
        <svg className="w-full h-full" viewBox="0 0 128 128">
            <path fill="#F05032" d="M124.742 58.378l-55.117-55.117c-3.172-3.174-8.32-3.174-11.497 0l-11.444 11.446 14.518 14.518c3.375-1.139 7.243-.375 9.932 2.314 2.703 2.706 3.462 6.607 2.293 9.993l13.992 13.993c3.385-1.167 7.292-.413 9.994 2.295 3.78 3.777 3.78 9.9 0 13.679a9.673 9.673 0 01-13.683 0 9.677 9.677 0 01-2.105-10.521L68.574 45.818l-.002 34.341c.922.455 1.791 1.063 2.559 1.828 3.779 3.777 3.779 9.898 0 13.683-3.779 3.777-9.904 3.777-13.679 0-3.778-3.784-3.778-9.905 0-13.683a9.556 9.556 0 013.702-2.458V45.085a9.58 9.58 0 01-3.702-2.458c-2.726-2.728-3.468-6.66-2.259-10.053L40.818 18.2 3.266 55.765c-3.178 3.176-3.178 8.322 0 11.499l55.117 55.114c3.174 3.174 8.32 3.174 11.499 0l54.86-54.858c3.174-3.176 3.174-8.327 0-11.5v.358z" />
        </svg>
    )
}

function EmailIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
        </svg>
    )
}

function LinkedInIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
            <rect x="2" y="9" width="4" height="12" />
            <circle cx="4" cy="4" r="2" />
        </svg>
    )
}

function TwitterIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4l11.733 16H20L8.267 4z" />
            <path d="M4 20l6.768-6.768M20 4l-6.768 6.768" />
        </svg>
    )
}

function GitHubIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
        </svg>
    )
}
