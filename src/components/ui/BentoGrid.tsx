'use client'

import React from 'react'
import { Cpu, Layout, Zap, Database } from 'lucide-react'
import { ScrollReveal, cn } from './ScrollReveal'
import { useTranslation } from '@/i18n'

export const BentoGrid = () => {
    const { t } = useTranslation()

    const features = [
        {
            title: t('landing.bentoModernArch'),
            description: t('landing.bentoModernArchDesc'),
            icon: <Cpu className="w-6 h-6 text-neon-cyan" />,
            className: 'md:col-span-2',
        },
        {
            title: t('landing.bentoCinematicUI'),
            description: t('landing.bentoCinematicUIDesc'),
            icon: <Layout className="w-6 h-6 text-neon-purple" />,
            className: 'md:col-span-1',
        },
        {
            title: t('landing.bentoHighPerf'),
            description: t('landing.bentoHighPerfDesc'),
            icon: <Zap className="w-6 h-6 text-neon-green" />,
            className: 'md:col-span-1',
        },
        {
            title: t('landing.bentoFullstack'),
            description: t('landing.bentoFullstackDesc'),
            icon: <Database className="w-6 h-6 text-accent-primary" />,
            className: 'md:col-span-2',
        },
    ]

    return (
        <section className="py-24 px-4 max-w-6xl mx-auto">
            <ScrollReveal direction="up" className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold text-text-primary mb-4 tracking-tight">
                    Powered by <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-neon-cyan">{t('landing.bentoHeading')}</span>
                </h2>
                <p className="text-text-secondary max-w-2xl mx-auto text-lg">
                    {t('landing.bentoDescription')}
                </p>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {features.map((feature, idx) => (
                    <ScrollReveal
                        key={idx}
                        delay={idx * 0.1}
                        direction="up"
                        className={cn('h-full', feature.className)}
                    >
                        <div className="cyber-card hover-cyber-glow h-full flex flex-col justify-between group cursor-default">
                            <div>
                                <div className="w-12 h-12 rounded-xl bg-bg-surface-dim flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-border-dim">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold text-text-primary mb-3">
                                    {feature.title}
                                </h3>
                                <p className="text-text-secondary leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        </div>
                    </ScrollReveal>
                ))}
            </div>
        </section>
    )
}
