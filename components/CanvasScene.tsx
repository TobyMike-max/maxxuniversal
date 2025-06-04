'use client'

import { Canvas } from '@react-three/fiber'
import { Environment, useGLTF, PerspectiveCamera } from '@react-three/drei'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import * as THREE from 'three'

gsap.registerPlugin(ScrollTrigger)

function Model() {
  const { scene } = useGLTF('/model.gltf')
  return <primitive object={scene} />
}

function CameraController() {
    const cameraRef = useRef<THREE.PerspectiveCamera>(null)
  
    useEffect(() => {
      const camera = cameraRef.current
      if (!camera) return
  
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: '#scroll-wrapper',
          start: 'top top',
          end: '+=3000', // adjust based on number of scenes
          scrub: 1,
          pin: true,
        },
      })
  
      // Move to Scene 1 (default position)
      timeline.to(camera.position, { x: 0, y: 0, z: 8 }, 0)
  
      // Scene 2 (slide camera right and forward)
      timeline.to(camera.position, { x: 3, y: 0, z: 4 }, 1)
  
      // Scene 3 (move camera left and up)
      timeline.to(camera.position, { x: -3, y: 2, z: 3 }, 2)
    }, [])
  
    return <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 0, 5]} fov={45} />
  }
  

export default function CanvasScene() {
  return (
    <Canvas className="w-full h-screen" id="webgl-canvas">
      <ambientLight intensity={1} />
      <Environment preset="night" />
      <CameraController />
      <Model />
    </Canvas>
  )
}
