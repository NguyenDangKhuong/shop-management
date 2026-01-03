import Link from 'next/link'
import Image from 'next/image'

export default function LandingPage() {
    return (
        <>
            {/* Preconnect to external domains for faster loading */}
            <link rel="preconnect" href="https://images.unsplash.com" />
            <link rel="dns-prefetch" href="https://images.unsplash.com" />

            <div className="bg-[#0a0a0a] text-slate-200 font-sans min-h-screen flex flex-col items-center p-4 md:p-8 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-slate-900 via-[#0a0a0a] to-[#0a0a0a] relative">
                {/* Header with Login Button */}
                <header className="w-full max-w-6xl mx-auto flex justify-between items-center mb-8 z-20">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#38bdf8] to-[#c084fc] flex items-center justify-center font-bold text-white shadow-lg">
                            Y
                        </div>
                        <span className="font-bold text-xl tracking-tight text-white">
                            The<span className="text-[#38bdf8]">TapHoa</span>
                        </span>
                    </div>

                    <Link
                        href="/login"
                        className="group relative px-6 py-2 rounded-full bg-slate-800/40 border border-white/10 overflow-hidden transition-all hover:border-[#38bdf8]/50 hover:shadow-[0_0_20px_rgba(56,189,248,0.2)]"
                    >
                        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                        <span className="relative font-medium text-sm text-slate-300 group-hover:text-white flex items-center gap-2">
                            Login
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
                </header>

                <main className="max-w-6xl w-full mx-auto relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Left Column - Hero & About */}
                        <div className="lg:col-span-2 flex flex-col gap-6">
                            {/* Hero Section */}
                            <div className="glass-card flex flex-col-reverse md:flex-row items-center justify-between gap-8 relative overflow-hidden">
                                <div className="absolute -top-20 -left-20 w-64 h-64 bg-[#38bdf8]/20 rounded-full blur-3xl -z-10"></div>

                                <div className="flex-1 space-y-4">
                                    <span className="text-slate-400 font-medium">Hero Section</span>
                                    <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                                        Hello, I&apos;m <span className="text-[#c084fc]">Khuong</span>.<br />
                                        I build accessible web experiences.
                                    </h1>
                                    <div className="pt-4">
                                        <Link
                                            href="/products"
                                            className="inline-block px-6 py-3 rounded-full bg-slate-800/50 border border-[#38bdf8]/50 text-white font-semibold transition hover:bg-[#38bdf8]/20 shadow-[0_0_15px_rgba(56,189,248,0.3)]"
                                        >
                                            View Projects
                                        </Link>
                                    </div>
                                </div>

                                <div className="relative shrink-0">
                                    <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-slate-700/50 shadow-[0_0_15px_rgba(192,132,252,0.3)]">
                                        <Image
                                            src="https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=400&auto=format&fit=crop"
                                            alt="Developer Portrait"
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

                            {/* About Section with Timeline */}
                            <div className="glass-card flex-1 space-y-6 relative overflow-hidden">
                                <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#c084fc]/10 rounded-full blur-3xl -z-10"></div>

                                <h2 className="text-xl font-semibold text-white">About Me</h2>
                                <p className="text-slate-400 max-w-2xl">
                                    I&apos;m Alex, a front-end developer based in Los Angeles. I&apos;m passionate about creating
                                    intuitive, dynamic user experiences and clean, efficient code. Currently focused on the React
                                    ecosystem.
                                </p>

                                <div className="pt-8 pb-4">
                                    <div className="relative h-1 bg-slate-700/50 rounded-full">
                                        <div className="absolute top-0 left-0 h-full w-[70%] bg-gradient-to-r from-[#38bdf8] to-[#c084fc] rounded-full shadow-[0_0_15px_rgba(56,189,248,0.3)]"></div>

                                        <div className="absolute -top-1 left-[0%] w-3 h-3 bg-[#38bdf8] rounded-full shadow-[0_0_15px_rgba(56,189,248,0.3)]"></div>
                                        <div className="absolute -top-1 left-[30%] w-3 h-3 bg-[#38bdf8] rounded-full shadow-[0_0_15px_rgba(56,189,248,0.3)]"></div>
                                        <div className="absolute -top-1 left-[70%] w-3 h-3 bg-[#c084fc] rounded-full shadow-[0_0_15px_rgba(192,132,252,0.3)]"></div>
                                        <div className="absolute -top-1 left-[100%] w-3 h-3 bg-slate-600 rounded-full"></div>

                                        <div className="absolute top-4 left-0 text-xs text-slate-500">2018</div>
                                        <div className="absolute top-4 left-[30%] text-xs text-slate-500">2022</div>
                                        <div className="absolute top-4 left-[70%] -translate-x-1/2 text-center text-xs text-[#c084fc] font-bold">
                                            Present<br />
                                            Skiller
                                        </div>
                                        <div className="absolute top-4 right-0 text-xs text-slate-500">2030</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Tech Stack, Project, Contact */}
                        <div className="flex flex-col gap-6">
                            {/* Tech Stack */}
                            <div className="glass-card space-y-4">
                                <h2 className="text-xl font-semibold text-white">Tech Stack</h2>
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
                                </div>
                            </div>

                            {/* Featured Project */}
                            <div className="glass-card p-0 overflow-hidden group cursor-pointer">
                                <div className="bg-slate-800/50 h-40 w-full relative flex items-center justify-center overflow-hidden">
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
                                    <h3 className="text-lg font-semibold text-white group-hover:text-[#38bdf8] transition">
                                        Featured Project: E-commerce App
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="px-2 py-1 text-xs rounded-full bg-slate-700/50 text-slate-300 border border-white/10">
                                            React
                                        </span>
                                        <span className="px-2 py-1 text-xs rounded-full bg-slate-700/50 text-slate-300 border border-white/10">
                                            Next.js
                                        </span>
                                        <span className="px-2 py-1 text-xs rounded-full bg-slate-700/50 text-slate-300 border border-white/10">
                                            TypeScript
                                        </span>
                                    </div>
                                    <div className="flex gap-4 pt-2 text-sm font-medium">
                                        <Link href="/products" className="text-[#38bdf8] hover:underline">
                                            Live Demo
                                        </Link>
                                        <Link href="/login" className="text-slate-400 hover:text-white hover:underline">
                                            Admin Panel
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            {/* Contact & Performance Stats */}
                            <div className="grid grid-cols-2 gap-6">
                                <div className="glass-card space-y-3 flex flex-col justify-center">
                                    <h2 className="text-base font-semibold text-white">Contact</h2>
                                    <a
                                        href="mailto:email@gmail.com"
                                        className="text-sm text-slate-400 flex items-center gap-2 hover:text-[#38bdf8] transition"
                                    >
                                        <EmailIcon />
                                        email@gmail.com
                                    </a>
                                    <div className="flex gap-3 text-slate-400 pt-1">
                                        <a href="#" className="hover:text-white transition">
                                            <InstagramIcon />
                                        </a>
                                        <a href="#" className="hover:text-white transition">
                                            <TwitterIcon />
                                        </a>
                                        <a href="#" className="hover:text-white transition">
                                            <GitHubIcon />
                                        </a>
                                    </div>
                                </div>

                                <div className="glass-card space-y-3 flex flex-col justify-center items-center">
                                    <h2 className="text-sm font-semibold text-white w-full text-left">Performance Stats</h2>
                                    <div className="flex gap-2">
                                        <PerformanceBadge score="100" label="SEO" />
                                        <PerformanceBadge score="100" label="PERF" />
                                        <PerformanceBadge score="100" label="A11Y" />
                                    </div>
                                </div>
                            </div>

                            {/* Dark Mode Toggle */}
                            <div className="glass-card flex items-center justify-between py-4">
                                <span className="font-medium text-white">Dark Mode</span>
                                <div className="w-14 h-8 bg-[#38bdf8]/20 rounded-full p-1 relative border border-[#38bdf8]/30 shadow-[0_0_15px_rgba(56,189,248,0.3)] cursor-pointer">
                                    <div className="w-6 h-6 bg-[#38bdf8] rounded-full shadow-sm absolute right-1 transition-all"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

                {/* Footer with Terms and Privacy Policy */}
                <footer className="w-full max-w-6xl mx-auto mt-12 pt-8 pb-6 border-t border-slate-700/50 z-20">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
                        <p className="text-slate-400">
                            © 2026 TheTapHoa. All rights reserved.
                        </p>
                        <div className="flex items-center gap-6">
                            <Link
                                href="/privacy"
                                className="text-slate-400 hover:text-[#38bdf8] transition-colors underline"
                            >
                                Privacy Policy
                            </Link>
                            <Link
                                href="/terms"
                                className="text-slate-400 hover:text-[#38bdf8] transition-colors underline"
                            >
                                Terms of Service
                            </Link>
                        </div>
                    </div>
                </footer>

                {/* Background Gradients - Optimized */}
                <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 overflow-hidden" aria-hidden="true">
                    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[100px]" />
                    <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 rounded-full blur-[100px]" />
                </div>
            </div>
        </>
    )
}

// Helper Components
function TechIcon({ children, name }: { children: React.ReactNode; name: string; color: string }) {
    return (
        <div
            className="w-14 h-14 rounded-2xl bg-slate-800/80 border border-white/20 flex items-center justify-center p-2 hover:scale-110 transition-transform shadow-sm"
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

// SVG Icons
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
        <svg className="w-full h-full text-white fill-current" viewBox="0 0 128 128">
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

function EmailIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
        </svg>
    )
}

function InstagramIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
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
