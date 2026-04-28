import React from 'react'
import Image from 'next/image'

interface HologramAvatarProps {
    src: string
    alt: string
    size?: number
    color?: string
}

export default function HologramAvatar({ 
    src, 
    alt, 
    size = 256,
    color = 'var(--neon-cyan)'
}: HologramAvatarProps) {
    return (
        <div 
            className="relative flex items-center justify-center"
            style={{ width: size, height: size, '--holo-color': color } as React.CSSProperties}
        >
            {/* Outer Rotating Ring 1 */}
            <div className="absolute inset-[-10%] rounded-full border-t-2 border-r-2 border-transparent animate-[spin_10s_linear_infinite]" 
                 style={{ borderTopColor: 'var(--holo-color)', borderRightColor: 'color-mix(in srgb, var(--holo-color) 30%, transparent)' }} 
            />
            
            {/* Outer Rotating Ring 2 (Counter-spin) */}
            <div className="absolute inset-[-20%] rounded-full border-b-2 border-l-2 border-transparent animate-[spin_15s_linear_infinite_reverse]" 
                 style={{ borderBottomColor: 'var(--holo-color)', borderLeftColor: 'color-mix(in srgb, var(--holo-color) 30%, transparent)' }} 
            />
            
            {/* Inner Dashboard Dashed Ring */}
            <div className="absolute inset-0 rounded-full border border-dashed border-border-input opacity-50 animate-[spin_20s_linear_infinite]" />
            
            {/* Base Platform Glow */}
            <div className="absolute bottom-[-10%] w-[120%] h-[20%] rounded-[100%] blur-xl opacity-30 pointer-events-none" 
                 style={{ backgroundColor: 'var(--holo-color)' }}
            />
            
            {/* Base Platform Rings (Ellipses for 3D effect) */}
            <div className="absolute bottom-[-5%] w-[110%] h-[15%] rounded-[100%] border opacity-60 pointer-events-none" 
                 style={{ borderColor: 'var(--holo-color)', boxShadow: '0 0 10px var(--holo-color), inset 0 0 10px var(--holo-color)' }}
            />
            <div className="absolute bottom-[-8%] w-[120%] h-[15%] rounded-[100%] border opacity-30 pointer-events-none" 
                 style={{ borderColor: 'var(--holo-color)' }}
            />

            {/* Avatar Image container */}
            <div className="relative w-full h-full rounded-full overflow-hidden bg-gradient-to-b from-transparent to-bg-card z-10 flex items-end justify-center">
                <Image
                    src={src}
                    alt={alt}
                    width={size}
                    height={size}
                    priority
                    quality={100}
                    className="w-full h-auto object-cover object-bottom scale-[5]"
                />
            </div>
            
            {/* Scanner line overlay effect */}
            <div className="absolute inset-0 rounded-full overflow-hidden z-20 pointer-events-none">
                <div className="w-full h-1 bg-white opacity-20 blur-[1px] shadow-[0_0_10px_#fff] animate-[scan_3s_ease-in-out_infinite]" />
            </div>

            <style jsx>{`
                @keyframes scan {
                    0% { transform: translateY(-100%); }
                    50% { transform: translateY(${size}px); }
                    100% { transform: translateY(-100%); }
                }
            `}</style>
        </div>
    )
}
