'use client'

import React, { useEffect, useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface DecryptTextProps {
    text: string
    className?: string
    delay?: number
    speed?: number
}

const CHARS = '!@#$%^&*()_+-=[]{}|;:\",./<>?0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'

export function DecryptText({ text, className = '', delay = 0, speed = 30 }: DecryptTextProps) {
    const [displayText, setDisplayText] = useState(() => process.env.NODE_ENV === 'test' ? text : '')
    const ref = useRef<HTMLSpanElement>(null)
    const isInView = useInView(ref, { once: true, margin: "-10% 0px" })

    useEffect(() => {
        if (process.env.NODE_ENV === 'test') {
            setDisplayText(text)
            return
        }

        if (!isInView) {
            setDisplayText('')
            return
        }

        let timeoutId: NodeJS.Timeout
        let iteration = 0
        const totalIterations = text.length * 2 // How many times we scramble before settling

        // Initial delay
        timeoutId = setTimeout(() => {
            const intervalId = setInterval(() => {
                setDisplayText(() => {
                    const mapped = text.split('').map((char, index) => {
                        // Keep spaces as spaces
                        if (char === ' ') return ' '
                        
                        // If we've passed this character's reveal time, show the real char
                        if (index < iteration / 2) {
                            return text[index]
                        }
                        
                        // Otherwise, show a random char
                        return CHARS[Math.floor(Math.random() * CHARS.length)]
                    })
                    
                    return mapped.join('')
                })

                iteration += 1

                if (iteration >= totalIterations) {
                    clearInterval(intervalId)
                    setDisplayText(text) // Ensure final state is exactly the text
                }
            }, speed)

            return () => clearInterval(intervalId)
        }, delay * 1000)

        return () => clearTimeout(timeoutId)
    }, [isInView, text, delay, speed])

    return (
        <motion.span
            ref={ref}
            className={`inline-block font-mono ${className}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
        >
            {displayText || text.replace(/./g, ' ')}
        </motion.span>
    )
}
