import React from 'react'

interface TimelineItemProps {
    color?: string
    title: string
    subtitle?: string
    date?: string
    teamSize?: number
    children?: React.ReactNode
}

interface TimelineProps {
    children: React.ReactNode
    className?: string
}

export function TimelineItem({ color = 'var(--neon-cyan)', title, subtitle, date, teamSize, children }: TimelineItemProps) {
    return (
        <div className="relative pl-10 md:pl-12 pb-8 last:pb-0 group">
            {/* Timeline Vertical Line segment */}
            <div className="absolute left-[11px] top-6 bottom-0 w-px bg-border-dim group-last:hidden" />
            
            {/* Timeline Dot (Glowing Node) */}
            <div 
                className="absolute left-0 top-1.5 w-6 h-6 rounded-full border-4 border-bg-page flex items-center justify-center transition-all duration-300 group-hover:scale-110 z-10"
                style={{ backgroundColor: color }}
            >
                <div className="w-2 h-2 rounded-full bg-white opacity-80" />
                {/* Glow ring */}
                <div 
                    className="absolute inset-0 rounded-full animate-ping opacity-20"
                    style={{ backgroundColor: color }}
                />
            </div>

            <div className="flex flex-col gap-1.5 pt-1">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-1">
                    <h3 className="text-lg font-bold text-text-primary group-hover:text-text-primary transition-colors" style={{ textShadow: `0 0 10px color-mix(in srgb, ${color} 30%, transparent)` }}>
                        {title}
                    </h3>
                    <div className="flex items-center gap-2">
                        {date && (
                            <span 
                                className="text-xs font-medium px-2.5 py-1 rounded-md border"
                                style={{ 
                                    color: color, 
                                    borderColor: `color-mix(in srgb, ${color} 30%, transparent)`, 
                                    backgroundColor: `color-mix(in srgb, ${color} 10%, transparent)` 
                                }}
                            >
                                {date}
                            </span>
                        )}
                        {teamSize && (
                            <span className="text-xs font-medium px-2 py-1 rounded-md border border-border-dim text-text-muted flex items-center gap-1">
                                ★ {teamSize}
                            </span>
                        )}
                    </div>
                </div>
                
                {subtitle && (
                    <p className="text-sm font-medium text-text-secondary">
                        {subtitle}
                    </p>
                )}

                <div className="mt-3 text-sm text-text-secondary leading-relaxed">
                    {children}
                </div>
            </div>
        </div>
    )
}

export function Timeline({ children, className = '' }: TimelineProps) {
    return (
        <div className={`relative ${className}`}>
            {/* Global Timeline Vertical Line (background) */}
            <div className="absolute left-[11px] top-4 bottom-4 w-px bg-gradient-to-b from-transparent via-border-primary to-transparent opacity-50" />
            
            <div className="space-y-0">
                {children}
            </div>
        </div>
    )
}
