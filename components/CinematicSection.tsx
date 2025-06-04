'use client'

import { useGLTF, Html, OrbitControls } from '@react-three/drei'
import { useRef, useLayoutEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function CinematicSection() {
  const modelRef = useRef<THREE.Group>(null)
  const { scene, camera } = useThree()
  const gltf = useGLTF('/scene.gltf') // Make sure this path matches the public path

  // Light setup
  const directionalLightRef = useRef<THREE.DirectionalLight>(null)
  const pointLightRef = useRef<THREE.PointLight>(null)

  useLayoutEffect(() => {
    if (!modelRef.current) return

    // Position model offscreen initially
    modelRef.current.position.set(0, 0, 0)
    modelRef.current.rotation.set(0, 0, 0)

    ScrollTrigger.create({
      trigger: '#space-section',
      start: 'top center',
      end: 'bottom center',
      scrub: 2,
      onUpdate: (self) => {
        const progress = self.progress

        gsap.to(modelRef.current!.position, {
          y: THREE.MathUtils.lerp(-5, 0, progress),
          z: THREE.MathUtils.lerp(-10, 0, progress),
        })

        gsap.to(camera.position, {
          z: THREE.MathUtils.lerp(0, 1.5, progress),
        })

        gsap.to(modelRef.current!.rotation, {
          y: THREE.MathUtils.lerp(0, Math.PI * 0.5, progress),
        })
      },
    })

    gsap.fromTo(
      '#space-text-1',
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '#space-section',
          start: 'top center',
          end: 'top top',
          scrub: true,
        },
      }
    )

    gsap.fromTo(
      '#space-text-2',
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '#space-section',
          start: 'center center',
          end: 'center top',
          scrub: true,
        },
      }
    )
  }, [])

  useFrame(() => {
    // Slight parallax
    if (modelRef.current) {
      // modelRef.current.rotation.z += 0.0005
      modelRef.current.scale.y += 0.0005
      modelRef.current.scale.x += 0.0005
      modelRef.current.scale.z += 0.0005
    }
  })

  return (
    <>
      <group ref={modelRef} dispose={null}>
        <primitive object={gltf.scene} />
      </group>

      <Html position={[0, 0, 0]}>
        <div id="space-text-1" className="floating-text text-white text-3xl font-bold opacity-0">
          Welcome to Deep Space
        </div>
      </Html>

      <Html position={[0, 1.2, 0]}>
        <div id="space-text-2" className="floating-text text-white text-xl opacity-0">
          Explore the unknown
        </div>
      </Html>
      <OrbitControls />
      <directionalLight
        ref={directionalLightRef}
        intensity={1}
        position={[2, 2, 5]}
        castShadow
      />
      <pointLight
        ref={pointLightRef}
        intensity={3}
        distance={10}
        position={[0, 1, 2]}
      // color="#ffffff"
      />
    </>
  )
}
