import React from 'react'

interface CyberCardProps {
    children: React.ReactNode
    className?: string
    glowColor?: 'cyan' | 'purple' | 'green' | 'none'
    hoverEffect?: boolean
}

export default function CyberCard({
    children,
    className = '',
    glowColor = 'none',
    hoverEffect = true,
}: CyberCardProps) {
    // Map the glowColor to the CSS variable for hover effects
    const glowVar =
        glowColor === 'cyan' ? 'var(--neon-cyan)' :
        glowColor === 'purple' ? 'var(--neon-purple)' :
        glowColor === 'green' ? 'var(--neon-green)' :
        'rgba(255,255,255,0.1)'

    const style = {
        '--cyber-accent': glowVar
    } as React.CSSProperties

    return (
        <div
            className={`cyber-card ${hoverEffect ? 'hover-cyber-glow' : ''} ${className}`}
            style={style}
        >
            {/* Optional decorative corner elements can go here */}
            {children}
        </div>
    )
}
