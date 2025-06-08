'use client'

import { useRef, useEffect } from 'react'
import { Box } from '@react-three/drei'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function GrowingBox() {
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
      <meshBasicMaterial wireframe color="#00ffff" />
    </Box>
  )
}
