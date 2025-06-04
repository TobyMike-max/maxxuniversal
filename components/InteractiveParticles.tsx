'use client'

import { useRef, useEffect, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { Points, PointMaterial, Effects } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'

export default function InteractiveParticles() {
  const pointsRef = useRef<THREE.Points>(null)

  const particles = useMemo(() => {
    const count = 1500
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      positions[i3] = (Math.random() - 0.5) * 12
      positions[i3 + 1] = (Math.random() - 0.5) * 8
      positions[i3 + 2] = (Math.random() - 0.5) * 6
    }
    return new THREE.BufferAttribute(positions, 3)
  }, [])

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (pointsRef.current) {
      pointsRef.current.rotation.y = t * 0.02
      pointsRef.current.rotation.x = Math.sin(t * 0.1) * 0.05
    }
  })

  return (
    <>
      <Points ref={pointsRef} frustumCulled={false}>
        <bufferGeometry>
          <bufferAttribute
            args={[particles.array, 3]} attach="attributes-position"
            {...particles}          />
        </bufferGeometry>
        <PointMaterial
          transparent
          color="#00ffff"
          size={0.03}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>

      {/* 🔥 Postprocessing for Glow */}
      <EffectComposer>
        <Bloom
          luminanceThreshold={0}
          luminanceSmoothing={0.4}
          intensity={1.2} // Play with this to increase glow
        />
      </EffectComposer>
    </>
  )
}
