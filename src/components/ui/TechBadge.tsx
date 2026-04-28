import React from 'react'

interface TechBadgeProps {
    label: string
    icon?: React.ReactNode
    color?: string
}

export default function TechBadge({ label, icon, color = 'var(--neon-cyan)' }: TechBadgeProps) {
    return (
        <span
            className="group flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-md border border-border-dim text-text-secondary transition-all duration-300 hover:text-text-primary bg-bg-surface-dim hover:bg-bg-tag cursor-default"
            style={{ 
                '--badge-color': color,
                // Add a very subtle hover border color matching the tech icon
                borderColor: `color-mix(in srgb, ${color} 20%, transparent)`,
            } as React.CSSProperties}
            title={label}
        >
            {icon && (
                <span className="w-3.5 h-3.5 flex items-center justify-center opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" style={{ color }}>
                    {icon}
                </span>
            )}
            <span className="font-medium tracking-wide">
                {label}
            </span>
            <style jsx>{`
                .group:hover {
                    border-color: color-mix(in srgb, var(--badge-color) 40%, transparent) !important;
                    box-shadow: 0 0 10px color-mix(in srgb, var(--badge-color) 15%, transparent);
                }
            `}</style>
        </span>
    )
}
