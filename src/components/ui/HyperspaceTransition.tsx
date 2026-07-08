'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'

export function HyperspaceTransition() {
    const [isTransitioning, setIsTransitioning] = useState(false)
    const pathname = usePathname()
    const isMounted = React.useRef(false)

    useEffect(() => {
        if (!isMounted.current) {
            isMounted.current = true
            return
        }
        
        setIsTransitioning(true)
        const timer = setTimeout(() => {
            setIsTransitioning(false)
        }, 1000)
        
        return () => clearTimeout(timer)
    }, [pathname])

    return (
        <>
            {isTransitioning && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 z-[100] pointer-events-none bg-black overflow-hidden flex items-center justify-center"
                >
                    {/* Flash effect at the end */}
                    <motion.div 
                        className="absolute inset-0 bg-white z-10"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 0, 1, 0] }}
                        transition={{ times: [0, 0.7, 0.8, 1], duration: 1 }}
                    />
                    
                    {/* Stars stretching */}
                    <div className="relative w-full h-full perspective-[800px]">
                        {Array.from({ length: 50 }).map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute top-1/2 left-1/2 w-1 h-1 bg-white rounded-full"
                                initial={{ 
                                    x: (Math.random() - 0.5) * 3000, 
                                    y: (Math.random() - 0.5) * 3000,
                                    scaleZ: 1,
                                    scale: 0.1,
                                    opacity: 0
                                }}
                                animate={{ 
                                    scaleZ: 20,
                                    scale: Math.random() * 5 + 2,
                                    opacity: [0, 1, 0]
                                }}
                                transition={{ 
                                    duration: 0.8, 
                                    ease: "easeIn",
                                    delay: Math.random() * 0.2
                                }}
                                style={{
                                    boxShadow: '0 0 10px #fff, 0 0 20px var(--neon-cyan)',
                                    transformOrigin: 'center center'
                                }}
                            />
                        ))}
                    </div>
                </motion.div>
            )}
        </>
    )
}
