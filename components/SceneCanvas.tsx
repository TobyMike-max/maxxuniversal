'use client'

import { Canvas } from '@react-three/fiber'
import { useRef, useEffect } from 'react'
import { Box, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function GrowingBox() {
  const ref = useRef<THREE.Mesh>(null)

  useEffect(() => {
    gsap.to(ref.current!.scale, {
      x: 8,
      y: 8,
      z: 8,
      scrollTrigger: {
        trigger: '#scroll-wrapper',
        start: 'top+=1200 top',
        end: 'top+=1800 top',
        scrub: true,
      }
    })
  }, [])

  return (
    <Box ref={ref} args={[1, 1, 1]}>
      <meshBasicMaterial wireframe color="white" />
    </Box>
  )
}

export default function SceneCanvas() {
  return (
    <Canvas className="absolute inset-0 z-0" camera={{ position: [0, 0, 5], fov: 60 }}>
      <ambientLight />
      <GrowingBox />
      <OrbitControls enableZoom={false} />
    </Canvas>
  )
}
