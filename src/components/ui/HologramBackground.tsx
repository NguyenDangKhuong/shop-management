'use client'

import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Stars } from '@react-three/drei'
import * as THREE from 'three'

function WireframeSpaceship() {
    const groupRef = useRef<THREE.Group>(null)

    useFrame((state) => {
        if (!groupRef.current) return
        
        // Gentle floating and rotation
        groupRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.5
        groupRef.current.rotation.y += 0.005
        groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
        
        // Parallax effect with mouse
        const mouseX = (state.mouse.x * Math.PI) / 10
        const mouseY = (state.mouse.y * Math.PI) / 10
        groupRef.current.rotation.y += (mouseX - groupRef.current.rotation.y) * 0.05
        groupRef.current.rotation.x += (-mouseY - groupRef.current.rotation.x) * 0.05
    })

    const material = new THREE.MeshBasicMaterial({ 
        color: 0x00ffff, 
        wireframe: true, 
        transparent: true, 
        opacity: 0.3 
    })

    const engineMaterial = new THREE.MeshBasicMaterial({
        color: 0xbf00ff,
        wireframe: true,
        transparent: true,
        opacity: 0.5
    })

    return (
        <group ref={groupRef}>
            {/* Main Body (Cone) */}
            <mesh rotation={[-Math.PI / 2, 0, 0]}>
                <coneGeometry args={[1, 4, 8]} />
                <primitive object={material} />
            </mesh>

            {/* Wings */}
            <mesh position={[1.5, -1, 0]} rotation={[0, 0, -Math.PI / 6]}>
                <boxGeometry args={[2, 0.1, 1]} />
                <primitive object={material} />
            </mesh>
            <mesh position={[-1.5, -1, 0]} rotation={[0, 0, Math.PI / 6]}>
                <boxGeometry args={[2, 0.1, 1]} />
                <primitive object={material} />
            </mesh>

            {/* Cockpit */}
            <mesh position={[0, 0.5, 0.5]}>
                <sphereGeometry args={[0.6, 8, 8]} />
                <primitive object={engineMaterial} />
            </mesh>

            {/* Outer Rings (Scanner effect) */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[3, 0.02, 16, 100]} />
                <primitive object={material} />
            </mesh>
            <mesh rotation={[Math.PI / 3, 0, 0]}>
                <torusGeometry args={[4, 0.01, 16, 100]} />
                <primitive object={engineMaterial} />
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
                <WireframeSpaceship />
            </Canvas>
        </div>
    )
}
