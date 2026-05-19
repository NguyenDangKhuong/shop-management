'use client'

import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Stars } from '@react-three/drei'
import * as THREE from 'three'

import { Html, Line } from '@react-three/drei'

const TARGETS: Record<string, { pos: [number, number, number], label: string }> = {
    hero: { pos: [0, 0, -4.3], label: "YAMATO_CANNON" },
    features: { pos: [0, 0.5, -1], label: "MAIN_GENERATOR" },
    about: { pos: [0, 0.6, 2], label: "HULL_PLATING" },
    experience: { pos: [-2.8, -0.2, -1], label: "PORT_WEAPONS" },
    techstack: { pos: [2.8, -0.2, -1], label: "STARBOARD_WEAPONS" },
    project: { pos: [-2.8, -0.2, 2.5], label: "PORT_THRUSTER" },
    contact: { pos: [2.8, -0.2, 2.5], label: "STARBOARD_THRUSTER" },
    education: { pos: [0, 2.1, 2.5], label: "COMMAND_BRIDGE" },
    skills: { pos: [0, 0.2, 3.8], label: "MAIN_DRIVE" },
}

function FocusHUD() {
    const [targetKey, setTargetKey] = React.useState<string | null>(null)
    const reticleRef = useRef<THREE.Mesh>(null)

    React.useEffect(() => {
        const handleHover = (e: any) => setTargetKey(e.detail)
        window.addEventListener('setHoveredSection', handleHover)
        return () => window.removeEventListener('setHoveredSection', handleHover)
    }, [])

    useFrame((state, delta) => {
        if (reticleRef.current) {
            reticleRef.current.rotation.z += delta * 2
            reticleRef.current.rotation.x += delta
        }
    })

    if (!targetKey || !TARGETS[targetKey]) return null

    const target = TARGETS[targetKey]
    const lineEnd: [number, number, number] = [target.pos[0] > 0 ? 5 : -5, target.pos[1] + 2, target.pos[2]]

    return (
        <group>
            {/* Target Reticle */}
            <mesh ref={reticleRef} position={target.pos}>
                <torusGeometry args={[0.8, 0.02, 16, 32]} />
                <meshBasicMaterial color={0xff3366} wireframe transparent opacity={0.8} />
            </mesh>
            <mesh position={target.pos}>
                <sphereGeometry args={[0.1, 8, 8]} />
                <meshBasicMaterial color={0xff3366} wireframe transparent opacity={1} />
            </mesh>
            
            {/* Laser Line */}
            <Line
                points={[target.pos, lineEnd]}
                color="#ff3366"
                lineWidth={1.5}
                transparent
                opacity={0.6}
            />

            {/* Cyberpunk Label */}
            <Html position={lineEnd} center className="pointer-events-none">
                <div className="flex items-center gap-2">
                    {target.pos[0] < 0 && <div className="w-8 h-[1px] bg-[var(--neon-purple)] shadow-[0_0_8px_var(--neon-purple)]" />}
                    <div className="bg-bg-surface/80 backdrop-blur-sm border border-[var(--neon-purple)] px-3 py-1 rounded-sm shadow-[0_0_15px_rgba(191,0,255,0.3)]">
                        <span className="text-[10px] font-bold tracking-widest text-[var(--neon-purple)] uppercase whitespace-nowrap">
                            [ TARGET : {target.label} ]
                        </span>
                    </div>
                    {target.pos[0] >= 0 && <div className="w-8 h-[1px] bg-[var(--neon-purple)] shadow-[0_0_8px_var(--neon-purple)]" />}
                </div>
            </Html>
        </group>
    )
}

function WireframeBattlecruiser() {
    const groupRef = useRef<THREE.Group>(null)

    const targetRotation = useRef(0)

    useFrame((state, delta) => {
        if (!groupRef.current) return
        
        // Base isometric RTS rotation (angled top-down view)
        const baseRotX = Math.PI / 6
        const baseRotY = -Math.PI / 6

        // Heavy slow hovering
        groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.2
        groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.4) * 0.02
        
        // Calculate scroll rotation
        const scrollY = window.scrollY
        const vh = window.innerHeight
        
        // Start rotating only after passing ~80% of the hero section
        const scrollOffset = Math.max(0, scrollY - vh * 0.8)
        
        // Target rotation based on scroll (adjust 0.003 for speed)
        targetRotation.current = baseRotY + scrollOffset * 0.003

        // Apply rotation with smooth easing (lerp)
        groupRef.current.rotation.x = baseRotX
        groupRef.current.rotation.y = THREE.MathUtils.lerp(
            groupRef.current.rotation.y, 
            targetRotation.current, 
            delta * 5 // Easing speed
        )
    })

    return (
        <group ref={groupRef} scale={[0.8, 0.8, 0.8]}>
            <FocusHUD />
            
            {/* --- FRONT HAMMERHEAD --- */}
            <mesh position={[0, 0, -3.5]}>
                <boxGeometry args={[3.5, 0.8, 1.5]} />
                <meshBasicMaterial color={0x00ffff} wireframe transparent opacity={0.3} />
            </mesh>
            {/* Yamato Cannon (Front center) */}
            <mesh position={[0, 0, -4.3]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.3, 0.3, 0.5, 16]} />
                <meshBasicMaterial color={0xbf00ff} wireframe transparent opacity={0.5} />
            </mesh>
            {/* Front Red Accents */}
            <mesh position={[-1.2, 0, -4.2]}>
                <boxGeometry args={[0.6, 0.6, 0.5]} />
                <meshBasicMaterial color={0xff3366} wireframe transparent opacity={0.6} />
            </mesh>
            <mesh position={[1.2, 0, -4.2]}>
                <boxGeometry args={[0.6, 0.6, 0.5]} />
                <meshBasicMaterial color={0xff3366} wireframe transparent opacity={0.6} />
            </mesh>

            {/* --- CENTRAL NECK --- */}
            <mesh position={[0, 0.2, -1]}>
                <boxGeometry args={[1.5, 1, 4]} />
                <meshBasicMaterial color={0x00ffff} wireframe transparent opacity={0.3} />
            </mesh>
            <mesh position={[0, 0.8, -1]}>
                <boxGeometry args={[0.8, 0.4, 3.5]} />
                <meshBasicMaterial color={0x00ffff} wireframe transparent opacity={0.3} />
            </mesh>

            {/* --- REAR MAIN HULL --- */}
            <mesh position={[0, 0, 2]}>
                <boxGeometry args={[3, 1.2, 3]} />
                <meshBasicMaterial color={0x00ffff} wireframe transparent opacity={0.3} />
            </mesh>

            {/* --- COMMAND TOWER (BRIDGE) --- */}
            {/* Base */}
            <mesh position={[0, 1, 2.5]}>
                <boxGeometry args={[2, 0.8, 2]} />
                <meshBasicMaterial color={0x00ffff} wireframe transparent opacity={0.3} />
            </mesh>
            {/* Mid Tower */}
            <mesh position={[0, 1.6, 2.5]}>
                <boxGeometry args={[1.5, 0.6, 1.5]} />
                <meshBasicMaterial color={0x00ffff} wireframe transparent opacity={0.3} />
            </mesh>
            {/* Top Command Deck */}
            <mesh position={[0, 2.1, 2.3]}>
                <boxGeometry args={[1.2, 0.5, 1]} />
                <meshBasicMaterial color={0xbf00ff} wireframe transparent opacity={0.5} />
            </mesh>
            <mesh position={[0, 2.1, 2.8]}>
                <boxGeometry args={[1.4, 0.4, 0.8]} />
                <meshBasicMaterial color={0x00ffff} wireframe transparent opacity={0.3} />
            </mesh>

            {/* --- WING CONNECTORS --- */}
            <mesh position={[-2, 0, 1.5]}>
                <boxGeometry args={[1.5, 0.8, 1.5]} />
                <meshBasicMaterial color={0x00ffff} wireframe transparent opacity={0.3} />
            </mesh>
            <mesh position={[2, 0, 1.5]}>
                <boxGeometry args={[1.5, 0.8, 1.5]} />
                <meshBasicMaterial color={0x00ffff} wireframe transparent opacity={0.3} />
            </mesh>

            {/* --- LATERAL WINGS (Weapon Pods) --- */}
            {/* Left Wing */}
            <mesh position={[-2.8, -0.2, 0]}>
                <boxGeometry args={[1, 0.8, 4.5]} />
                <meshBasicMaterial color={0x00ffff} wireframe transparent opacity={0.3} />
            </mesh>
            {/* Right Wing */}
            <mesh position={[2.8, -0.2, 0]}>
                <boxGeometry args={[1, 0.8, 4.5]} />
                <meshBasicMaterial color={0x00ffff} wireframe transparent opacity={0.3} />
            </mesh>

            {/* Wing Front Accents (Red) */}
            <mesh position={[-2.8, 0, -2.5]}>
                <boxGeometry args={[0.8, 0.6, 1]} />
                <meshBasicMaterial color={0xff3366} wireframe transparent opacity={0.6} />
            </mesh>
            <mesh position={[2.8, 0, -2.5]}>
                <boxGeometry args={[0.8, 0.6, 1]} />
                <meshBasicMaterial color={0xff3366} wireframe transparent opacity={0.6} />
            </mesh>

            {/* Wing Cannons (Front tips) */}
            <mesh position={[-2.8, -0.2, -3.2]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.15, 0.2, 1.5, 8]} />
                <meshBasicMaterial color={0xbf00ff} wireframe transparent opacity={0.5} />
            </mesh>
            <mesh position={[2.8, -0.2, -3.2]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.15, 0.2, 1.5, 8]} />
                <meshBasicMaterial color={0xbf00ff} wireframe transparent opacity={0.5} />
            </mesh>

            {/* --- REAR ENGINES --- */}
            {/* Main Center Engine */}
            <mesh position={[0, 0.2, 3.8]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.6, 0.5, 1, 16]} />
                <meshBasicMaterial color={0xff3366} wireframe transparent opacity={0.6} />
            </mesh>
            {/* Left Engine */}
            <mesh position={[-1, 0, 3.8]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.4, 0.3, 0.8, 16]} />
                <meshBasicMaterial color={0xff3366} wireframe transparent opacity={0.6} />
            </mesh>
            {/* Right Engine */}
            <mesh position={[1, 0, 3.8]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.4, 0.3, 0.8, 16]} />
                <meshBasicMaterial color={0xff3366} wireframe transparent opacity={0.6} />
            </mesh>
            
            {/* Lower Side Engines */}
            <mesh position={[-2.8, -0.2, 2.5]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.3, 0.2, 0.8, 16]} />
                <meshBasicMaterial color={0xff3366} wireframe transparent opacity={0.6} />
            </mesh>
            <mesh position={[2.8, -0.2, 2.5]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.3, 0.2, 0.8, 16]} />
                <meshBasicMaterial color={0xff3366} wireframe transparent opacity={0.6} />
            </mesh>
        </group>
    )
}

export default function HologramBackground() {
    return (
        <div className="fixed inset-0 z-[-1] pointer-events-none opacity-60">
            <Canvas
                camera={{ position: [0, 0, 10], fov: 50 }}
                gl={{ antialias: false, alpha: true }}
                dpr={[1, 1.5]} // Optimize for mobile
            >
                <ambientLight intensity={0.5} />
                <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
                <WireframeBattlecruiser />
            </Canvas>
        </div>
    )
}
