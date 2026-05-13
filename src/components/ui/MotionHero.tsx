'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, ArrowRight, Download, BookOpen } from 'lucide-react'
import HologramAvatar from '@/components/ui/HologramAvatar'
import { useTranslation } from '@/i18n'
import Link from 'next/link'

const TYPEWRITER_WORDS = ['Khuong.', 'Developer.', 'Creative.']
const TYPE_SPEED = 120
const DELETE_SPEED = 70
const PAUSE_DURATION = 2500

function useTypewriter(words: string[]) {
    const [display, setDisplay] = useState('')
    const state = React.useRef({ wordIndex: 0, charIndex: 0, isDeleting: false })

    useEffect(() => {
        const loop = () => {
            const { wordIndex, charIndex, isDeleting } = state.current
            const currentWord = words[wordIndex]

            if (!isDeleting) {
                if (charIndex < currentWord.length) {
                    state.current.charIndex++
                    setDisplay(currentWord.slice(0, state.current.charIndex))
                    return TYPE_SPEED
                } else {
                    state.current.isDeleting = true
                    return PAUSE_DURATION
                }
            } else {
                if (charIndex > 0) {
                    state.current.charIndex--
                    setDisplay(currentWord.slice(0, state.current.charIndex))
                    return DELETE_SPEED
                } else {
                    state.current.isDeleting = false
                    state.current.wordIndex = (wordIndex + 1) % words.length
                    return TYPE_SPEED
                }
            }
        }

        let timeout: NodeJS.Timeout
        const schedule = () => {
            const delay = loop()
            timeout = setTimeout(schedule, delay)
        }
        timeout = setTimeout(schedule, 500)

        return () => clearTimeout(timeout)
    }, [words])

    return display
}

export const MotionHero = () => {
    const { t } = useTranslation()
    const yearsOfExperience = new Date().getFullYear() - 2018
    const typedText = useTypewriter(TYPEWRITER_WORDS)

    return (
        <div className="cyber-card relative w-full min-h-[calc(100vh-8rem)] flex flex-col md:flex-row items-center justify-center gap-12 overflow-hidden hover-cyber-glow group p-8 md:p-16">
            
            {/* Ambient Background Grid & Glows - Bound to Card */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-20" style={{ backgroundImage: 'linear-gradient(var(--border-primary) 1px, transparent 1px), linear-gradient(90deg, var(--border-primary) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
            
            <motion.div 
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3], rotate: [0, 90, 0] }}
                transition={{ repeat: Infinity, duration: 15, ease: "easeInOut" }}
                className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-neon-purple/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none -z-10" 
            />
            
            <motion.div 
                animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.5, 0.2], rotate: [0, -90, 0] }}
                transition={{ repeat: Infinity, duration: 20, ease: "easeInOut", delay: 2 }}
                className="absolute bottom-0 left-0 w-[50rem] h-[50rem] bg-neon-cyan/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none -z-10" 
            />

            {/* Left Content */}
            <div className="z-10 flex flex-col items-start text-left flex-1 max-w-2xl">
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, x: -30, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                    transition={{ duration: 0.6, type: 'spring', bounce: 0.4 }}
                    className="flex items-center gap-2 px-4 py-2 rounded-full border border-border-primary bg-bg-surface-dim/30 backdrop-blur-md mb-6 hover:bg-bg-surface-dim/50 transition-colors cursor-default group/badge"
                >
                    <Sparkles className="w-4 h-4 text-neon-cyan animate-pulse" />
                    <motion.span 
                        className="text-sm font-bold text-text-secondary tracking-wide uppercase font-mono"
                        animate={{ opacity: [0.7, 1, 0.7] }}
                        transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                    >
                        {yearsOfExperience}+ Years • React Specialist
                    </motion.span>
                    <motion.span
                        className="w-2 h-4 bg-neon-cyan ml-1"
                        animate={{ opacity: [1, 0] }}
                        transition={{ repeat: Infinity, duration: 0.8, ease: 'steps(1)' }}
                    />
                </motion.div>

                {/* Main Headline */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: [0.2, 0.65, 0.3, 0.9] }}
                    className="text-5xl md:text-7xl font-black tracking-tight text-text-primary leading-[1.1] mb-6"
                >
                    <motion.span
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        Hello, I&apos;m{' '}
                    </motion.span>
                    <br className="hidden md:block" />
                    <motion.span 
                        className="relative inline-block mt-2"
                        initial={{ opacity: 0, scale: 0.8, filter: 'blur(8px)' }}
                        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                        transition={{ duration: 0.8, delay: 0.5, type: 'spring', bounce: 0.3 }}
                    >
                        <span className="absolute inset-0 bg-gradient-to-r from-neon-cyan to-neon-purple blur-2xl opacity-40 mix-blend-screen"></span>
                        <span 
                            className="relative text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan via-accent-primary to-neon-purple"
                            style={{ backgroundSize: '200% 200%' }}
                        >
                            {typedText}
                        </span>
                        <motion.span
                            className="inline-block w-[4px] h-[0.85em] bg-neon-cyan ml-1 align-middle rounded-sm"
                            animate={{ opacity: [1, 0] }}
                            transition={{ repeat: Infinity, duration: 0.6, ease: 'steps(1)' }}
                        />
                    </motion.span>{' '}<br />
                    <motion.span 
                        className="text-3xl md:text-5xl text-text-secondary inline-flex items-center gap-3"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.7 }}
                    >
                        <motion.span
                            animate={{ opacity: [0.6, 1, 0.6] }}
                            transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
                        >
                            Front-End Developer
                        </motion.span>
                        <motion.span 
                            className="inline-block w-3 h-3 rounded-full bg-neon-green shadow-[0_0_10px_var(--neon-green)]"
                            animate={{ scale: [1, 1.3, 1], opacity: [0.8, 1, 0.8] }}
                            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                        />
                    </motion.span>
                </motion.h1>

                {/* Sub-headline */}
                <motion.p
                    initial={{ opacity: 0, y: 20, filter: 'blur(5px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ duration: 0.7, delay: 0.9 }}
                    className="text-lg md:text-xl text-text-secondary mb-10 leading-relaxed max-w-xl relative"
                >
                    <motion.span
                        className="absolute -left-4 top-0 bottom-0 w-[2px] bg-gradient-to-b from-neon-cyan via-neon-purple to-transparent rounded-full"
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: 1 }}
                        transition={{ duration: 0.8, delay: 1.1, ease: 'easeOut' }}
                        style={{ transformOrigin: 'top' }}
                    />
                    {t('landing.purpose')}
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="flex flex-wrap gap-4 w-full"
                >
                    <Link href="/blogs" className="group/blog relative px-6 py-3 rounded-full font-bold text-text-primary border border-border-primary bg-bg-surface-dim/20 backdrop-blur-md hover:border-neon-purple/50 hover:scale-105 active:scale-95 shadow-[0_0_25px_-10px_var(--neon-purple)] hover:shadow-[0_0_40px_-10px_var(--neon-purple)] transition-all flex items-center justify-center gap-2 overflow-hidden">
                        <span className="relative z-10 flex items-center gap-2">
                            <BookOpen className="w-5 h-5 text-neon-purple group-hover/blog:animate-pulse" />
                            Blog
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-neon-purple to-neon-cyan opacity-0 group-hover/blog:opacity-15 transition-opacity" />
                    </Link>
                    
                    <Link href="/cv" className="group/cv relative px-6 py-3 rounded-full font-bold text-text-primary border border-border-primary bg-bg-surface-dim/20 backdrop-blur-md hover:border-neon-green/50 hover:scale-105 active:scale-95 shadow-[0_0_25px_-10px_var(--neon-green)] hover:shadow-[0_0_40px_-10px_var(--neon-green)] transition-all flex items-center justify-center gap-2 overflow-hidden">
                        <span className="relative z-10 flex items-center gap-2">
                            <Download className="w-5 h-5 text-neon-green group-hover/cv:animate-bounce" />
                            Download CV
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-neon-green to-neon-cyan opacity-0 group-hover/cv:opacity-15 transition-opacity" />
                    </Link>

                    <Link href="/projects" className="group/proj relative px-6 py-3 bg-text-primary text-bg-page rounded-full font-bold overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_-10px_var(--neon-cyan)] flex items-center justify-center gap-2">
                        <span className="relative z-10 flex items-center gap-2">
                            🚀 Side Projects
                            <ArrowRight className="w-5 h-5 transition-transform group-hover/proj:translate-x-1" />
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan to-neon-purple opacity-0 group-hover/proj:opacity-20 transition-opacity" />
                    </Link>
                </motion.div>
            </div>

            {/* Right Content - Massive Floating Avatar */}
            <motion.div 
                initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 1, delay: 0.3, type: 'spring', bounce: 0.3 }}
                className="z-10 relative flex-1 flex items-center justify-center mt-12 md:mt-0"
            >
                {/* Continuous floating animation */}
                <motion.div
                    animate={{ y: [0, -20, 0], rotate: [0, 2, -2, 0] }}
                    transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                    className="relative"
                >
                    {/* Glowing Aura behind Avatar */}
                    <div className="absolute inset-0 bg-neon-cyan/30 blur-[80px] rounded-full mix-blend-screen pointer-events-none" />
                    <div className="absolute inset-[-20%] bg-neon-purple/20 blur-[100px] rounded-full mix-blend-screen pointer-events-none animate-pulse" />
                    
                    {/* The Avatar itself */}
                    <div className="relative border-4 border-neon-cyan/20 rounded-full p-4 bg-bg-surface-dim/30 backdrop-blur-xl shadow-[0_0_50px_-10px_var(--neon-cyan)]">
                        <HologramAvatar src="/image/home/avatar.png" alt="Khuong" size={350} color="var(--neon-cyan)" />
                        
                        {/* Floating Tech Badges */}
                        <motion.div 
                            animate={{ y: [0, 15, 0] }}
                            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }}
                            className="absolute -top-6 -right-6 bg-bg-card border border-border-primary px-4 py-2 rounded-2xl shadow-xl flex items-center gap-2 backdrop-blur-md"
                        >
                            <span className="text-2xl">⚡</span>
                            <span className="font-bold text-xs">Performance</span>
                        </motion.div>

                        <motion.div 
                            animate={{ y: [0, -15, 0] }}
                            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 2 }}
                            className="absolute -bottom-6 -left-6 bg-bg-card border border-border-primary px-4 py-2 rounded-2xl shadow-xl flex items-center gap-2 backdrop-blur-md"
                        >
                            <span className="text-2xl">🎯</span>
                            <span className="font-bold text-xs">Pixel Perfect</span>
                        </motion.div>
                    </div>
                </motion.div>
            </motion.div>

        </div>
    )
}
