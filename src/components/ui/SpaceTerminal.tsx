'use client'

import React, { useState, useEffect, useRef } from 'react'

export function SpaceTerminal() {
    const [history, setHistory] = useState<{ text: string, type: 'in' | 'out' }[]>([
        { text: '> INITIALIZING CONTACT MODULE...', type: 'out' },
        { text: '> UPLINK ESTABLISHED.', type: 'out' },
        { text: '> TYPE "help" FOR AVAILABLE COMMANDS.', type: 'out' }
    ])
    const [input, setInput] = useState('')
    const endRef = useRef<HTMLDivElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)

    const scrollToBottom = () => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight
        }
    }

    useEffect(() => {
        scrollToBottom()
    }, [history])

    const handleCommand = (e: React.FormEvent) => {
        e.preventDefault()
        if (!input.trim()) return

        const cmd = input.trim().toLowerCase()
        const newHistory = [...history, { text: `> ${input}`, type: 'in' as const }]

        switch (cmd) {
            case 'help':
                newHistory.push({ text: 'AVAILABLE COMMANDS:', type: 'out' })
                newHistory.push({ text: '  contact --email  : SHOW EMAIL ADDRESS', type: 'out' })
                newHistory.push({ text: '  download --cv    : DOWNLOAD RESUME', type: 'out' })
                newHistory.push({ text: '  whoami           : SHOW USER INFO', type: 'out' })
                newHistory.push({ text: '  clear            : CLEAR TERMINAL', type: 'out' })
                break
            case 'contact --email':
                newHistory.push({ text: 'EMAIL: nguyendangkhuong96@gmail.com', type: 'out' })
                break
            case 'download --cv':
                newHistory.push({ text: 'DOWNLOADING CV... [LINK OPENS IN NEW TAB]', type: 'out' })
                window.open('#', '_blank') // Replace with actual CV link
                break
            case 'whoami':
                newHistory.push({ text: 'GUEST_USER_9942 // ACCESS LEVEL: VISITOR', type: 'out' })
                break
            case 'clear':
                setHistory([])
                setInput('')
                return
            default:
                newHistory.push({ text: `COMMAND NOT FOUND: ${cmd}`, type: 'out' })
        }

        setHistory(newHistory)
        setInput('')
    }

    return (
        <div className="w-full h-64 bg-[#0a0a0a] rounded-xl border border-[var(--neon-cyan)]/30 p-4 font-mono text-xs md:text-sm overflow-hidden relative shadow-[0_0_20px_rgba(0,255,255,0.1)]">
            {/* Scanline Overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] z-10" />
            
            <div ref={containerRef} className="h-full overflow-y-auto space-y-2 pr-2 scrollbar-hide text-[var(--neon-cyan)] text-shadow-glow scroll-smooth">
                {history.map((line, i) => (
                    <div key={i} className={`${line.type === 'in' ? 'opacity-70' : 'opacity-100'} break-all`}>
                        {line.text}
                    </div>
                ))}
                
                <form onSubmit={handleCommand} className="flex items-center gap-2 mt-2">
                    <span>{'>'}</span>
                    <input 
                        type="text" 
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="flex-1 bg-transparent outline-none border-none text-[var(--neon-cyan)] focus:ring-0"
                        spellCheck="false"
                        autoComplete="off"
                    />
                </form>
                <div ref={endRef} />
            </div>
        </div>
    )
}
