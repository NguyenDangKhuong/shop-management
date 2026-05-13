'use client'

import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

interface ScrollRevealProps {
    children: React.ReactNode
    className?: string
    delay?: number
    duration?: number
    direction?: 'up' | 'down' | 'left' | 'right' | 'none'
    once?: boolean
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
    children,
    className,
    delay = 0,
    duration = 0.5,
    direction = 'up',
    once = true,
}) => {
    const ref = useRef(null)
    const isInView = useInView(ref, { once, margin: '-50px' })

    const variants = {
        hidden: {
            opacity: 0,
            y: direction === 'up' ? 40 : direction === 'down' ? -40 : 0,
            x: direction === 'left' ? 40 : direction === 'right' ? -40 : 0,
            scale: direction === 'none' ? 0.95 : 1,
        },
        visible: {
            opacity: 1,
            y: 0,
            x: 0,
            scale: 1,
            transition: {
                duration,
                delay,
                ease: [0.25, 0.1, 0.25, 1], // Cubic bezier for smooth cinematic feel
            },
        },
    }

    return (
        <motion.div
            ref={ref}
            variants={variants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className={cn('will-change-transform', className)}
        >
            {children}
        </motion.div>
    )
}
