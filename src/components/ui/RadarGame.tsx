'use client'

import React, { useEffect, useRef, useState } from 'react'
import { useSoundContext } from '@/contexts/SoundContext'

interface RadarGameProps {
    onClose: () => void
}

export default function RadarGame({ onClose }: { onClose: () => void }) {
    const { isEnabled: soundEnabled } = useSoundContext()
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)

    // Game stats
    const [score, setScore] = useState(0)
    const [highScore, setHighScore] = useState(0)
    const [shields, setShields] = useState(3)
    const [speedMultiplier, setSpeedMultiplier] = useState(1.0)
    const [gameState, setGameState] = useState<'start' | 'playing' | 'gameover'>('start')

    // Mutable game variables to avoid React render delays in requestAnimationFrame
    const stateRef = useRef({
        x: 200,
        playerTargetX: 200,
        bullets: [] as Array<{ x: number, y: number, width: number, height: number, speed: number }>,
        enemies: [] as Array<{ x: number, y: number, r: number, speed: number, hp: number }>,
        particles: [] as Array<{ x: number, y: number, vx: number, vy: number, color: string, alpha: number, size: number }>,
        stars: [] as Array<{ x: number, y: number, speed: number, size: number }>,
        lastShotTime: 0,
        lastSpawnTime: 0,
        gameTime: 0,
        shields: 3,
        score: 0,
        speedMultiplier: 1.0,
        isGameOver: false,
    })

    // Init high score on client
    useEffect(() => {
        const stored = localStorage.getItem('shop_hud_high_score')
        if (stored) {
            setHighScore(parseInt(stored, 10))
        }
    }, [])

    // Retro Sound FX Synthesizer
    const playSynthSound = (type: 'laser' | 'explosion' | 'gameover' | 'start') => {
        if (!soundEnabled) return
        try {
            const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext
            if (!AudioContextClass) return
            const ctx = new AudioContextClass()

            if (type === 'laser') {
                const osc = ctx.createOscillator()
                const gain = ctx.createGain()

                osc.type = 'sawtooth'
                osc.frequency.setValueAtTime(600, ctx.currentTime)
                osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.12)

                gain.gain.setValueAtTime(0.06, ctx.currentTime)
                gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12)

                osc.connect(gain)
                gain.connect(ctx.destination)
                osc.start()
                osc.stop(ctx.currentTime + 0.12)
            } else if (type === 'explosion') {
                const osc = ctx.createOscillator()
                const gain = ctx.createGain()

                osc.type = 'triangle'
                osc.frequency.setValueAtTime(140, ctx.currentTime)
                osc.frequency.linearRampToValueAtTime(10, ctx.currentTime + 0.3)

                gain.gain.setValueAtTime(0.2, ctx.currentTime)
                gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3)

                osc.connect(gain)
                gain.connect(ctx.destination)
                osc.start()
                osc.stop(ctx.currentTime + 0.3)
            } else if (type === 'gameover') {
                const notes = [160, 130, 90]
                notes.forEach((freq, index) => {
                    const osc = ctx.createOscillator()
                    const gain = ctx.createGain()
                    osc.type = 'sawtooth'
                    osc.frequency.setValueAtTime(freq, ctx.currentTime + index * 0.15)
                    gain.gain.setValueAtTime(0.08, ctx.currentTime + index * 0.15)
                    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + index * 0.15 + 0.25)
                    osc.connect(gain)
                    gain.connect(ctx.destination)
                    osc.start(ctx.currentTime + index * 0.15)
                    osc.stop(ctx.currentTime + index * 0.15 + 0.25)
                })
            } else if (type === 'start') {
                const notes = [150, 220, 330, 440]
                notes.forEach((freq, index) => {
                    const osc = ctx.createOscillator()
                    const gain = ctx.createGain()
                    osc.type = 'sine'
                    osc.frequency.setValueAtTime(freq, ctx.currentTime + index * 0.08)
                    gain.gain.setValueAtTime(0.08, ctx.currentTime + index * 0.08)
                    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + index * 0.08 + 0.15)
                    osc.connect(gain)
                    gain.connect(ctx.destination)
                    osc.start(ctx.currentTime + index * 0.08)
                    osc.stop(ctx.currentTime + index * 0.08 + 0.15)
                })
            }
        } catch (e) {
            console.error('AudioContext synth error:', e)
        }
    }

    const resetGameVariables = () => {
        stateRef.current = {
            x: 200,
            playerTargetX: 200,
            bullets: [],
            enemies: [],
            particles: [],
            stars: Array.from({ length: 45 }, () => ({
                x: Math.random() * 400,
                y: Math.random() * 560,
                speed: Math.random() * 1.5 + 0.5,
                size: Math.random() * 1.5 + 0.5
            })),
            lastShotTime: 0,
            lastSpawnTime: 0,
            gameTime: 0,
            shields: 3,
            score: 0,
            speedMultiplier: 1.0,
            isGameOver: false,
        }
        setScore(0)
        setShields(3)
        setSpeedMultiplier(1.0)
    }

    const startPlaying = () => {
        playSynthSound('start')
        resetGameVariables()
        setGameState('playing')
    }

    // Capture keyboard arrows if available
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (gameState !== 'playing') return
            if (e.key === 'ArrowLeft' || e.key === 'a') {
                stateRef.current.playerTargetX = Math.max(20, stateRef.current.playerTargetX - 25)
            } else if (e.key === 'ArrowRight' || e.key === 'd') {
                stateRef.current.playerTargetX = Math.min(380, stateRef.current.playerTargetX + 25)
            }
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [gameState])

    // Game loop inside Canvas
    useEffect(() => {
        if (gameState !== 'playing') return

        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        if (!ctx) return

        let animationFrameId: number
        let lastTime = performance.now()

        const loop = (time: number) => {
            const dt = time - lastTime
            lastTime = time

            const state = stateRef.current

            // 1. Advance Game Timer
            state.gameTime += dt

            // Continuous scale dynamic multiplier: speeds up by 10% every 8s
            const currentMult = 1.0 + (state.gameTime / 8000) * 0.1
            state.speedMultiplier = currentMult
            setSpeedMultiplier(parseFloat(currentMult.toFixed(2)))

            // 2. Clear canvas
            ctx.fillStyle = '#030712'
            ctx.fillRect(0, 0, 400, 560)

            // 3. Draw and scroll stars background
            ctx.fillStyle = 'rgba(6, 182, 212, 0.4)'
            state.stars.forEach(star => {
                star.y += star.speed * (dt / 16) * currentMult
                if (star.y > 560) {
                    star.y = 0
                    star.x = Math.random() * 400
                }
                ctx.fillRect(star.x, star.y, star.size, star.size)
            })

            // 4. Smoothly ease Player Ship position
            state.x += (state.playerTargetX - state.x) * 0.18

            // Draw Player shape (cyan wireframe interceptor)
            ctx.shadowBlur = 8
            ctx.shadowColor = '#00f0ff'
            ctx.strokeStyle = '#00f0ff'
            ctx.fillStyle = 'rgba(0, 240, 255, 0.15)'
            ctx.lineWidth = 1.5
            ctx.beginPath()
            ctx.moveTo(state.x, 500) // nose pointing up
            ctx.lineTo(state.x + 6, 515)
            ctx.lineTo(state.x + 18, 525) // right wing
            ctx.lineTo(state.x + 8, 525)
            ctx.lineTo(state.x + 8, 535) // right engine
            ctx.lineTo(state.x - 8, 535) // left engine
            ctx.lineTo(state.x - 8, 525)
            ctx.lineTo(state.x - 18, 525) // left wing
            ctx.lineTo(state.x - 6, 515)
            ctx.closePath()
            ctx.fill()
            ctx.stroke()
            ctx.shadowBlur = 0

            // Draw glowing thruster flame
            if (Math.random() > 0.3) {
                ctx.fillStyle = '#ff7b00'
                ctx.shadowBlur = 10;
                ctx.shadowColor = '#ff0055';
                ctx.beginPath()
                ctx.moveTo(state.x - 5, 535)
                ctx.lineTo(state.x, 545 + Math.random() * 8)
                ctx.lineTo(state.x + 5, 535)
                ctx.closePath()
                ctx.fill()
                ctx.shadowBlur = 0;
            }

            // 5. Weapon Autoshot: Fire a laser every 220ms
            if (time - state.lastShotTime > 220) {
                state.bullets.push({
                    x: state.x - 1.5,
                    y: 495,
                    width: 3,
                    height: 12,
                    speed: 6.5
                })
                state.lastShotTime = time
                playSynthSound('laser')
            }

            // Update & Draw bullets
            ctx.fillStyle = '#00f0ff'
            ctx.shadowBlur = 10
            ctx.shadowColor = '#00f0ff'
            state.bullets = state.bullets.filter(b => {
                b.y -= b.speed * (dt / 16)
                ctx.fillRect(b.x, b.y, b.width, b.height)
                return b.y > 0
            })
            ctx.shadowBlur = 0

            // 6. Enemy Spawning: Spawn random enemy every 1200ms / speedMultiplier
            const enemySpawnDelay = Math.max(380, 1200 / currentMult)
            if (time - state.lastSpawnTime > enemySpawnDelay) {
                state.enemies.push({
                    x: 20 + Math.random() * 360,
                    y: -20,
                    r: 14 + Math.random() * 4, // enemy bounds size multiplier
                    speed: (1.5 + Math.random() * 1.2) * currentMult,
                    hp: 1
                })
                state.lastSpawnTime = time
            }

            // Update & Draw enemies
            state.enemies = state.enemies.filter(e => {
                e.y += e.speed * (dt / 16)

                // Draw enemy (red/magenta fighter jet)
                ctx.shadowBlur = 8
                ctx.shadowColor = '#ff3366'
                ctx.strokeStyle = '#ff3366'
                ctx.fillStyle = 'rgba(255, 51, 102, 0.15)'
                ctx.lineWidth = 1.5
                ctx.beginPath()
                // Inverted shape (flying down)
                ctx.moveTo(e.x, e.y + 12) // nose pointing down
                ctx.lineTo(e.x + 12, e.y - 4) // right wing
                ctx.lineTo(e.x + 5, e.y - 4)
                ctx.lineTo(e.x + 5, e.y - 12) // tail fin
                ctx.lineTo(e.x - 5, e.y - 12)
                ctx.lineTo(e.x - 5, e.y - 4)
                ctx.lineTo(e.x - 12, e.y - 4) // left wing
                ctx.closePath()
                ctx.fill()
                ctx.stroke()
                ctx.shadowBlur = 0

                // COLLISION 1: Player / Enemy crash detection
                const distToPlayer = Math.sqrt((e.x - state.x) ** 2 + (e.y - 520) ** 2)
                if (distToPlayer < (e.r + 14)) {
                    // Impact!
                    state.shields--
                    setShields(state.shields)
                    playSynthSound('explosion')

                    // Create explosion particles
                    createExplosion(e.x, e.y, '#ff0055', 20)

                    // Check Game Over
                    if (state.shields <= 0) {
                        triggerGameOver()
                    }
                    return false // destroy enemy
                }

                // COLLISION 2: Bullet / Enemy hit detection
                let hitEnemy = false
                state.bullets = state.bullets.filter(b => {
                    if (hitEnemy) return true // skip already hit
                    const distToBullet = Math.sqrt((e.x - b.x) ** 2 + (e.y - b.y) ** 2)
                    if (distToBullet < e.r + 2) {
                        hitEnemy = true
                        return false // destroy bullet
                    }
                    return true
                })

                if (hitEnemy) {
                    state.score += 10
                    setScore(state.score)
                    playSynthSound('explosion')
                    createExplosion(e.x, e.y, '#00f0ff', 12)
                    return false // remove enemy
                }

                // Remove enemy if flies past bottom
                if (e.y > 580) {
                    state.shields--
                    setShields(state.shields)
                    playSynthSound('explosion')
                    if (state.shields <= 0) {
                        triggerGameOver()
                    }
                    return false
                }
                return true
            })

            // 7. Update and Draw particles
            state.particles = state.particles.filter(p => {
                p.x += p.vx * (dt / 16)
                p.y += p.vy * (dt / 16)
                p.alpha -= 0.03 * (dt / 16)

                ctx.save()
                ctx.globalAlpha = Math.max(0, p.alpha)
                ctx.fillStyle = p.color
                ctx.shadowBlur = 5
                ctx.shadowColor = p.color
                ctx.beginPath()
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
                ctx.fill()
                ctx.restore()

                return p.alpha > 0
            })

            if (!state.isGameOver) {
                animationFrameId = requestAnimationFrame(loop)
            }
        }

        const createExplosion = (x: number, y: number, color: string, count: number) => {
            const state = stateRef.current
            for (let i = 0; i < count; i++) {
                const angle = Math.random() * Math.PI * 2
                const speed = Math.random() * 3 + 1
                state.particles.push({
                    x,
                    y,
                    vx: Math.cos(angle) * speed,
                    vy: Math.sin(angle) * speed,
                    color,
                    alpha: 1.0,
                    size: Math.random() * 2 + 1
                })
            }
        }

        const triggerGameOver = () => {
            stateRef.current.isGameOver = true
            playSynthSound('gameover')
            setGameState('gameover')

            // Check Highscore
            const stored = localStorage.getItem('shop_hud_high_score')
            const currentHigh = stored ? parseInt(stored, 10) : 0
            if (stateRef.current.score > currentHigh) {
                localStorage.setItem('shop_hud_high_score', stateRef.current.score.toString())
                setHighScore(stateRef.current.score)
            }
        }

        // Start animation frame
        animationFrameId = requestAnimationFrame(loop)

        return () => {
            cancelAnimationFrame(animationFrameId)
        }
    }, [gameState])

    // Pointer event controls (Mouse hover drag / Touch drag movement)
    const handlePointerMove = (e: React.PointerEvent) => {
        if (gameState !== 'playing' || !canvasRef.current) return
        const rect = canvasRef.current.getBoundingClientRect()
        const clientX = e.clientX
        const xRel = clientX - rect.left
        // Ensure values remain on-screen
        stateRef.current.playerTargetX = Math.max(16, Math.min(384, xRel))
    }

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/90 backdrop-blur-md transition-opacity duration-300"
        >
            <div className="relative w-[440px] max-w-[95vw] bg-slate-950/80 border-2 border-[var(--neon-cyan)] rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(6,182,212,0.3)] p-4 flex flex-col items-center">

                {/* CRT screen scanline overlay */}
                <div className="absolute inset-0 pointer-events-none z-50 mix-blend-overlay bg-gradient-to-b from-transparent 50% to-black/30 bg-[length:100%_4px]" />

                {/* HUD Header */}
                <div className="w-full flex justify-between items-center font-mono text-xs border-b border-[var(--neon-cyan)]/30 pb-2 mb-3 z-10">
                    <div className="flex gap-2">
                        <span className="text-[var(--neon-cyan)] animate-pulse">● INTERCEPT_MODE</span>
                        <span className="text-slate-500">v1.0.9</span>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-slate-500 hover:text-red-400 font-bold px-2 rounded border border-transparent hover:border-red-400/20 active:scale-95 transition"
                    >
                        [ EXIT ]
                    </button>
                </div>

                {/* Score and Stats panels */}
                <div className="w-full flex justify-between font-mono text-[10px] text-[var(--neon-cyan)] mb-2 px-1 z-10">
                    <div>SCORE: <span className="text-white font-bold">{score}</span></div>
                    <div>SHIELD: <span className={shields <= 1 ? "text-red-500 animate-pulse font-bold" : "text-emerald-400 font-bold"}>
                        {Array.from({ length: 3 }, (_, i) => i < shields ? '■' : '□').join(' ')}
                    </span></div>
                    <div>SPEED: <span className="text-amber-400 font-bold">{Math.round(speedMultiplier * 100)}%</span></div>
                </div>

                {/* Main game board screen CANVAS */}
                <div className="relative w-400 h-[560] max-w-[100%] rounded-lg border border-[var(--neon-cyan)]/20 overflow-hidden bg-slate-950">
                    <canvas
                        ref={canvasRef}
                        width={400}
                        height={560}
                        onPointerMove={handlePointerMove}
                        className="w-full h-full cursor-crosshair touch-none"
                    />

                    {/* Screens overlays depending on game states */}
                    {gameState === 'start' && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/90 font-mono p-6 text-center z-20">
                            <svg className="w-12 h-12 text-[var(--neon-cyan)] animate-pulse mb-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-8.24 0M12 2.25v2.25M12 19.5v2.25M2.25 12h2.25M19.5 12h2.25M4.929 4.93l1.591 1.59M17.485 17.485l1.59 1.59M19.5 4.93l-1.59 1.59M5.07 17.485l1.59-1.59"></path>
                            </svg>
                            <h3 className="text-white font-bold tracking-widest text-sm mb-1 uppercase">GRID INTERCEPTOR</h3>
                            <p className="text-[10px] text-slate-500 mb-6 max-w-[260px]">
                                Tactical fighters are entering orbit. Control flight shield vectors to neutralize intruders.
                            </p>

                            <div className="text-[9px] text-[var(--neon-cyan)]/70 text-left bg-slate-900/60 border border-[var(--neon-cyan)]/20 rounded-md p-3 mb-6 w-full max-w-[280px] leading-relaxed">
                                <span className="text-amber-400 font-bold block mb-1">🎮 SYSTEM MODULE CONFIG:</span>
                                • Drag Mouse/Finger to move Interceptor.<br />
                                • Laser beams fire automatically.<br />
                                • Speed increments by +10% every 8s.<br />
                                • High Score persistent link active.
                            </div>

                            <button
                                onClick={startPlaying}
                                className="px-6 py-2 bg-[var(--neon-cyan)]/10 hover:bg-[var(--neon-cyan)]/25 text-[var(--neon-cyan)] font-bold text-xs uppercase tracking-widest rounded border border-[var(--neon-cyan)]/40 hover:border-[var(--neon-cyan)]/80 hover:shadow-[0_0_15px_rgba(0,255,255,0.4)] active:scale-95 transition"
                            >
                                START SYSTEM
                            </button>
                        </div>
                    )}

                    {gameState === 'gameover' && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 font-mono p-6 text-center z-20">
                            <span className="text-red-500 font-bold tracking-widest text-lg mb-2 animate-bounce uppercase">HULL BREACHED</span>
                            <span className="text-[10px] text-slate-500 mb-6 uppercase">System has crashed. Shield Integrity: 0%</span>

                            <div className="grid grid-cols-2 gap-4 text-xs font-bold text-left bg-slate-950 border border-red-500/20 rounded-md p-4 mb-8 w-full max-w-[260px]">
                                <div className="text-slate-500">FINAL SCORE:</div>
                                <div className="text-white text-right">{score}</div>
                                <div className="text-slate-500">HIGH SCORE:</div>
                                <div className="text-[var(--neon-cyan)] text-right">{highScore}</div>
                                <div className="text-slate-500">PEAK VEHICLE SPEED:</div>
                                <div className="text-amber-400 text-right">{Math.round(speedMultiplier * 100)}%</div>
                            </div>

                            <button
                                onClick={startPlaying}
                                className="px-6 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 font-bold text-xs uppercase tracking-widest rounded border border-red-500/30 hover:border-red-500/80 active:scale-95 transition"
                            >
                                REBOOT CONSOLE
                            </button>
                        </div>
                    )}
                </div>

                {/* Footer readouts */}
                <div className="w-full text-center font-mono text-[9px] text-slate-600 mt-3 uppercase tracking-wider z-10">
                    HIGH SCORE LINK: {highScore} PTS // SYSTEM LOCKOUT ACTIVE
                </div>

            </div>
        </div>
    )
}
