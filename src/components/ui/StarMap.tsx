'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface StarMapProps {
    experiences: {
        company: string
        client?: string
        location: string
        role: string
        period: string
        color: string
        highlights: string[]
        teamSize?: number
    }[]
}

export function StarMap({ experiences }: StarMapProps) {
    const [activeIndex, setActiveIndex] = useState<number | null>(null)

    // Generate random positions for the stars (nodes) that look like a constellation
    const nodes = experiences.map((exp, i) => {
        // Just hardcode some nice looking constellation positions for up to 6 items
        const positions = [
            { x: 10, y: 50 },
            { x: 30, y: 20 },
            { x: 50, y: 60 },
            { x: 70, y: 30 },
            { x: 90, y: 80 },
            { x: 80, y: 10 },
        ]
        const pos = positions[i % positions.length]
        return { ...exp, ...pos, id: i }
    })

    return (
        <div className="relative w-full h-[400px] bg-[#050510] rounded-xl border border-border-primary overflow-hidden">
            {/* Background stars */}
            <div className="absolute inset-0 opacity-50" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px', backgroundPosition: '0 0' }} />
            
            {/* Constellation lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
                {nodes.map((node, i) => {
                    if (i === nodes.length - 1) return null
                    const nextNode = nodes[i + 1]
                    return (
                        <motion.line
                            key={`line-${i}`}
                            x1={`${node.x}%`}
                            y1={`${node.y}%`}
                            x2={`${nextNode.x}%`}
                            y2={`${nextNode.y}%`}
                            stroke="rgba(0, 255, 255, 0.2)"
                            strokeWidth="2"
                            strokeDasharray="4 4"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 1, delay: i * 0.3 }}
                        />
                    )
                })}
            </svg>

            {/* Nodes */}
            {nodes.map((node, i) => (
                <div
                    key={node.id}
                    className="absolute w-6 h-6 -ml-3 -mt-3 cursor-pointer group z-10"
                    style={{ left: `${node.x}%`, top: `${node.y}%` }}
                    onMouseEnter={() => setActiveIndex(i)}
                    onMouseLeave={() => setActiveIndex(null)}
                >
                    <motion.div 
                        className="w-full h-full rounded-full flex items-center justify-center"
                        style={{ backgroundColor: `${node.color}20`, boxShadow: `0 0 10px ${node.color}` }}
                        whileHover={{ scale: 1.5 }}
                    >
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: node.color }} />
                    </motion.div>

                    {/* Label */}
                    <div className="absolute top-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-bold tracking-widest uppercase opacity-70 group-hover:opacity-100 transition-opacity" style={{ color: node.color }}>
                        {node.company}
                    </div>
                </div>
            ))}

            {/* Tooltip Overlay */}
            <AnimatePresence>
                {activeIndex !== null && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 10 }}
                        className="absolute bottom-4 left-4 right-4 bg-bg-card/90 backdrop-blur-xl border p-4 rounded-xl shadow-2xl z-20 pointer-events-none"
                        style={{ borderColor: nodes[activeIndex].color }}
                    >
                        <h4 className="font-bold text-sm" style={{ color: nodes[activeIndex].color }}>
                            {nodes[activeIndex].role}
                        </h4>
                        <p className="text-xs text-text-secondary mt-1">
                            {nodes[activeIndex].company} • {nodes[activeIndex].period}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
