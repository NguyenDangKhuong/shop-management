'use client'

import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Stars } from '@react-three/drei'
import * as THREE from 'three'

function WireframeBattleship() {
    const groupRef = useRef<THREE.Group>(null)

    useFrame((state) => {
        if (!groupRef.current) return
        
        // Heavy ship floating is slower and more majestic
        groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.3
        groupRef.current.rotation.y += 0.002
        groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.4) * 0.05
        
        // Parallax effect with mouse (heavier feeling, less responsive)
        const mouseX = (state.mouse.x * Math.PI) / 12
        const mouseY = (state.mouse.y * Math.PI) / 12
        groupRef.current.rotation.y += (mouseX - groupRef.current.rotation.y) * 0.02
        groupRef.current.rotation.x += (-mouseY - groupRef.current.rotation.x) * 0.02
    })

    return (
        <group ref={groupRef}>
            {/* Main Hull (Wedge Shape) */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} scale={[1, 1, 0.2]}>
                <coneGeometry args={[2.5, 7, 4]} />
                <meshBasicMaterial color={0x00ffff} wireframe transparent opacity={0.3} />
            </mesh>

            {/* Central Ridge (Spine) */}
            <mesh position={[0, 0.3, 0.5]}>
                <boxGeometry args={[0.5, 0.4, 4.5]} />
                <meshBasicMaterial color={0x00ffff} wireframe transparent opacity={0.3} />
            </mesh>

            {/* Bridge Tower (Rear Top) */}
            <mesh position={[0, 0.7, 1.8]}>
                <boxGeometry args={[1.5, 0.6, 1.2]} />
                <meshBasicMaterial color={0xbf00ff} wireframe transparent opacity={0.5} />
            </mesh>
            
            {/* Command Deck */}
            <mesh position={[0, 1.1, 1.8]}>
                <boxGeometry args={[0.8, 0.3, 0.6]} />
                <meshBasicMaterial color={0x00ffff} wireframe transparent opacity={0.3} />
            </mesh>

            {/* Radar / Sensor Dome */}
            <mesh position={[0, 1.3, 1.6]}>
                <sphereGeometry args={[0.15, 8, 8]} />
                <meshBasicMaterial color={0xbf00ff} wireframe transparent opacity={0.5} />
            </mesh>

            {/* Left Wing / Cannons */}
            <mesh position={[-1.2, 0, 1]} rotation={[0, 0, Math.PI / 16]}>
                <boxGeometry args={[1, 0.05, 3]} />
                <meshBasicMaterial color={0x00ffff} wireframe transparent opacity={0.3} />
            </mesh>

            {/* Right Wing / Cannons */}
            <mesh position={[1.2, 0, 1]} rotation={[0, 0, -Math.PI / 16]}>
                <boxGeometry args={[1, 0.05, 3]} />
                <meshBasicMaterial color={0x00ffff} wireframe transparent opacity={0.3} />
            </mesh>

            {/* Main Thrusters (Rear) */}
            {/* Center Engine */}
            <mesh position={[0, 0, 3.5]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.3, 0.25, 0.5, 8]} />
                <meshBasicMaterial color={0xbf00ff} wireframe transparent opacity={0.5} />
            </mesh>
            {/* Left Engine */}
            <mesh position={[-0.8, 0, 3.4]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.2, 0.15, 0.4, 8]} />
                <meshBasicMaterial color={0xbf00ff} wireframe transparent opacity={0.5} />
            </mesh>
            {/* Right Engine */}
            <mesh position={[0.8, 0, 3.4]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.2, 0.15, 0.4, 8]} />
                <meshBasicMaterial color={0xbf00ff} wireframe transparent opacity={0.5} />
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
                <WireframeBattleship />
            </Canvas>
        </div>
    )
}
