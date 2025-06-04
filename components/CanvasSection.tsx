'use client'

import { useRef, useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import WireframeCube from './WireFrameCube'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function CanvasSection() {
    const containerRef = useRef<HTMLDivElement>(null)
    const [scale, setScale] = useState(0) // starting hidden

    useEffect(() => {
        const scaleVal = { s: 0 }

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '#trigger',
                start: 'top top',
                end: '+=3000',
                scrub: true,
            },
        })

        tl.to(scaleVal, {
            s: 1,
            onUpdate: () => setScale(scaleVal.s),
        }, 1.3) // Starts after image/letter transition

        tl.to(scaleVal, {
            s: 8, // Scale up to fill screen
            onUpdate: () => setScale(scaleVal.s),
        }, 1.8)

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill())
        }
    }, [])

    return (
        <div ref={containerRef} className="absolute inset-0 z-20">
            <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
                <color attach="background" args={['#000']} />
                <ambientLight intensity={0.6} />
                <directionalLight position={[2, 2, 2]} intensity={1} />
                <WireframeCube scale={scale} />
            </Canvas>

        </div>
    )
}
