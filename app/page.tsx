'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import WireframeCube from '@/components/WireFrameCube'
import { Canvas } from '@react-three/fiber'
import Image from 'next/image'
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { OrbitControls } from '@react-three/drei';
import CinematicSection from '@/components/CinematicSection'
import SceneCanvas from '@/components/SceneCanvas'
import ParticlesBackground from '@/components/ParticlesBackground'
import Link from 'next/link'


gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  const imageRef = useRef<HTMLDivElement>(null)
  const letterRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const navRef = useRef<HTMLDivElement>(null)
  const cubeRef = useRef<HTMLDivElement>(null)
  const filmTVRef = useRef<HTMLDivElement>(null)
  const advertRef = useRef<HTMLDivElement>(null)
  const virtualProdRef = useRef<HTMLDivElement>(null)
  const milinRef = useRef<HTMLDivElement>(null)

  const [cubeScale, setCubeScale] = useState(0)
  const [rotateCube, setRotateCube] = useState(false)

  const mobile = [
    {
      refName: filmTVRef, source: '/images/film-tv.jpg', alt: 'Film & TV', p: 'Visual Effects Without Limits. Innovation Without Compromise.', link: 'film-tv'
    },
    {
      refName: advertRef, source: '/images/advertising.jpg', alt: 'Advertising', p: 'Your partners. From concept art to final renders.', link: 'advertising'
    },
    {
      refName: virtualProdRef, source: '/images/virtual-production.jpg', alt: 'Virtual Production', p: 'Combining physical and virtual filmmaking techniques to create cutting-edge media.', link: 'virtual-production'
    },
    {
      refName: milinRef, source: '/images/milin-studio.jpg', alt: 'Milin Studio', p: 'Our New State-of-the-Art Studio facility outside of Prague.', link: 'milin-studio'
    },
  ]
  useEffect(() => {
    const isDesktop = window.innerWidth >= 1024;

    if (isDesktop) {
      const scaleObj = { s: 2 }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '#trigger',
          start: 'top top',
          end: '+=3000',
          scrub: true,
          pin: true,
          onUpdate: self => {
            const progress = self.progress
            // Rotate cube when scroll progress is greater than 0.07
            if (progress > 0.07) {
              setRotateCube(true)
            } else {
              setRotateCube(false)
            }
          }
        },
      })

      // Hero image scales
      tl.to(imageRef.current, { scale: 1.4, ease: 'power2.out' }, 0)

      // Letter fades out
      tl.to(letterRef.current, {
        // scale: 0.6,
        opacity: 0,
        duration: 0.15,
        ease: 'power1.inOut',
        transformOrigin: 'center center',
      }, 0)

      // Step 4: Continue transforming the square until it's invisible
      // tl.to(letterRef.current?.firstChild as HTMLElement, {
      //   scale: 0,
      //   opacity: 0,
      //   rotateY: 90,
      // }, 0.4)

      // Text fades
      tl.to(textRef.current, { opacity: 0, y: -50 }, 0.1)

      // Navbar appears
      tl.to(navRef.current, { opacity: 1, y: 0 }, 0.4)

      // Hero image fades out
      tl.to(imageRef.current, { opacity: 0 }, 1)

      // Cube fades in
      tl.to(cubeRef.current, { opacity: 1 }, 0)

      // Cube scales up
      tl.to(scaleObj, {
        s: 10,
        onUpdate: () => setCubeScale(scaleObj.s),
      }, 0.1)

      // Cube fades out
      tl.to(cubeRef.current, { opacity: 0 }, 0.7)

      tl.to(filmTVRef.current, { opacity: 1 }, 0.75)

      tl.to(advertRef.current, { opacity: 1 }, 0.9)

      tl.to(virtualProdRef.current, { opacity: 1 }, 1.0)

      tl.to(milinRef.current, { opacity: 1 }, 1.2)

    } else {
      setRotateCube(false)
      setCubeScale(1)

      // Optional: Scroll to next section directly on scroll
      const handleMobileScroll = () => {
        const scrollY = window.scrollY
        const threshold = window.innerHeight * 0.3 // adjust as needed

        if (scrollY > threshold) {
          document.getElementById('mobile-section')?.scrollIntoView({ behavior: 'smooth' })
          window.removeEventListener('scroll', handleMobileScroll)
        }
      }

      window.addEventListener('scroll', handleMobileScroll)

      return () => {
        window.removeEventListener('scroll', handleMobileScroll)
      }
    }
  }, [])




  return (
    <main className="relative bg-black text-white">
      {/* Scroll container trigger */}
      <div id="trigger" className="h-[300vh] w-full">

        {/* Sticky content during scroll */}
        <section className="sticky top-0 h-screen w-full overflow-hidden">
          {/* Navbar (initially hidden) */}
          <motion.nav
            ref={navRef}
            className="absolute top-2 left-0 right-0 flex justify-between items-center px-6 gap-8 text-sm opacity-0 translate-y-[-20px] transition-all z-10"
          >
            <Image src="/logo.png" alt='Logo' width={100} height={100} />
            <ul className="flex gap-6">
              <li>Home</li>
              <li>Projects</li>
              <li>Contact</li>
            </ul>
          </motion.nav>

          <ParticlesBackground />
          {/* Hero Image */}
          <div
            ref={imageRef}
            className="absolute inset-0 bg-cover bg-center transition-transform duration-1000">
            <Image src="/" alt="Hero" width={600} height={100} className="object-contain" />
          </div>

          {/* Letter overlay */}
          <div
            ref={letterRef}
            className="absolute inset-0 z-30 flex items-center justify-center text-[20vw] font-bold"
          >
            <motion.div
              className="bg-[#37B8B8] w-[150px] h-[150px]"
              style={{ borderRadius: '4px' }}
            />
          </div>

          {/* 3D Cube */}
          <div ref={cubeRef} className="absolute inset-0 opacity-0">
            <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
              {/* <color attach="background" args={['#000']} /> */}
              {/* <ambientLight intensity={0.1} /> */}
              {/* <directionalLight position={[2, 2, 2]} intensity={0.5} /> */}
              {/* <pointLight position={[0, 0, 3]} intensity={1.2} color="#00ffff" /> */}
              <WireframeCube scale={cubeScale} rotateCube={rotateCube} post={[-10, 2, 0]} />
              <WireframeCube scale={cubeScale} rotateCube={rotateCube} post={[4, 3, 0]} />
              <WireframeCube scale={cubeScale} rotateCube={rotateCube} post={[-8, -8, 0]} />
              <WireframeCube scale={cubeScale} rotateCube={rotateCube} post={[0, 7, 9]} />
              <EffectComposer>
                <Bloom
                  luminanceThreshold={0}
                  luminanceSmoothing={0.9}
                  intensity={0.6}
                  height={200}
                />
              </EffectComposer>
              <OrbitControls enableZoom={false} />
            </Canvas>

          </div>
          {/* 

          {/* Subtext */} {/* Down arrow */}
          <motion.div ref={textRef} className="absolute bottom-10 w-full text-white flex flex-col items-center justify-center z-10">
            <p className="text-sm mb-2">Scroll to enter</p>
            <div className="animate-bounce border rounded-ml">
              <svg className="w-6 h-6" fill="none" stroke="white" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </motion.div>
        </section>


        <section id="mobile-section" className="top-0 h-[250vh] w-full overflow-hidden">
          {
            mobile.map(elem => (
              <motion.div
                key={elem.link}
                ref={elem.refName}
                className="relative overflow-hidden rounded-lg shadow-lg text-white opacity-[0.8] mb-4"
              // initial={{ opacity: 0, y: 50 }}
              // whileInView={{ opacity: 1, y: 0 }}
              // transition={{ duration: 0.6, delay: index * 0.2 }}
              // viewport={{ once: true }}
              >
                <Image
                  src={elem.source}
                  alt={elem.alt}
                  width={600}
                  height={400}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center p-6">
                  <h2 className="text-2xl font-bold mb-2">{elem.alt}</h2>
                  <p className="text-sm text-gray-300 mb-4">{elem.p}</p>
                  <Link href={elem.link} className="text-white underline">
                    Find out more
                  </Link>
                </div>
              </motion.div>
            ))
          }

          {/* Feature Sections */}

          {/* Footer */}
          <footer className="bg-gray-900 text-gray-400 py-10 px-6">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between">
              <div>
                <h3 className="text-white text-lg mb-2">Contact Us</h3>
                <p>Žitomírská 7/489, Prague 10, 101 00, Czech Republic</p>
                <p>info@upp.cz</p>
                <p>+420 271 722 121</p>
              </div>
              <div className="mt-6 md:mt-0">
                <h3 className="text-white text-lg mb-2">Follow Us</h3>
                <div className="flex space-x-4">
                  <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
                  <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                  <a href="https://vimeo.com" target="_blank" rel="noopener noreferrer">Vimeo</a>
                </div>
              </div>
            </div>
          </footer>
        </section>

      </div>
    </main>
  )
}



