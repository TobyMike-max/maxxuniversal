'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import WireframeCube from '@/components/WireFrameCube'
import { Canvas } from '@react-three/fiber'
import Image from 'next/image'


gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  const imageRef = useRef<HTMLDivElement>(null)
  const letterRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const navRef = useRef<HTMLDivElement>(null)
  const cubeRef = useRef<HTMLDivElement>(null)

  const [cubeScale, setCubeScale] = useState(0)


  useEffect(() => {
    const scaleObj = { s: 0 }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#trigger',
        start: 'top top',
        end: '+=3000',
        scrub: true,
        pin: true,
      },
    })

    // Hero image scales
    tl.to(imageRef.current, { scale: 1.4, ease: 'power2.out' }, 0)

    // Letter fades out
    tl.to(letterRef.current, { scale: 0.6, y: -100, opacity: 0 }, 0.4)

    // Text fades
    tl.to(textRef.current, { opacity: 0, y: -50 }, 0.7)

    // Navbar appears
    tl.to(navRef.current, { opacity: 1, y: 0 }, 1)

    // Hero image fades out
    tl.to(imageRef.current, { opacity: 0 }, 1.2)

    // Cube fades in
    tl.to(cubeRef.current, { opacity: 1 }, 1.5)

    // Cube scales up
    tl.to(scaleObj, {
      s: 8,
      onUpdate: () => setCubeScale(scaleObj.s),
    }, 1.9)
  }, [])

  return (
    <main className="relative bg-black text-white">
      {/* Scroll container trigger */}
      <div id="trigger" className="h-[100vh] w-full">

        {/* Sticky content during scroll */}
        <section className="sticky top-0 h-screen w-full overflow-hidden">
          {/* Navbar (initially hidden) */}
          <motion.nav
            ref={navRef}
            className="absolute top-2 left-0 right-0 flex justify-between items-center z-50 px-6 gap-8 text-sm opacity-0 translate-y-[-20px] transition-all z-10"
          >
            <Image src="/logo.png" alt='Logo' width={100} height={100} />
            <ul className="flex gap-6">
              <li>Home</li>
              <li>Projects</li>
              <li>Contact</li>
            </ul>
          </motion.nav>

          {/* Hero Image */}
          <div
            ref={imageRef}
            className="absolute inset-0 bg-cover bg-center transition-transform duration-1000">
            <Image src="/hero.jpg" alt="Hero" height={800} width={600} className="object-contain" />
              </div>

          {/* Letter overlay */}
          <motion.div
            ref={letterRef}
            className="absolute inset-0 flex items-center justify-center text-[20vw] font-bold"
          >
            MAX O
          </motion.div>

          {/* 3D Cube */}
          <div ref={cubeRef} className="absolute inset-0 z-20 opacity-0">
            <Canvas camera={{ position: [0, 0, 6], fov: 75 }}>
              <color attach="background" args={['#000']} />
              <ambientLight intensity={0.6} />
              <directionalLight position={[2, 2, 2]} intensity={1} />
              <WireframeCube scale={cubeScale} />
            </Canvas>
          </div>


          {/* Subtext */} {/* Down arrow */}
          <motion.div ref={textRef} className="absolute bottom-10 w-full text-white flex flex-col items-center justify-center z-10">
                <p className="text-sm mb-2">Scroll to enter</p>
                <div className="animate-bounce border">
                    <svg className="w-6 h-6" fill="none" stroke="white" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </motion.div>
        </section>
      </div>
    </main>
  )
}


//       {/* Feature Sections */}
//       <section className="max-w-6xl mx-auto py-20 px-6 grid md:grid-cols-2 gap-12">
//         {[
//           {
//             title: 'Film & TV',
//             description: 'Visual Effects Without Limits. Innovation Without Compromise.',
//             image: '/images/film-tv.jpg',
//             link: '/film-tv',
//           },
//           {
//             title: 'Advertising',
//             description: 'Your partners. From concept art to final renders.',
//             image: '/images/advertising.jpg',
//             link: '/advertising',
//           },
//           {
//             title: 'Virtual Production',
//             description: 'Combining physical and virtual filmmaking techniques to create cutting-edge media.',
//             image: '/images/virtual-production.jpg',
//             link: '/virtual-production',
//           },
//           {
//             title: 'Milin Studio',
//             description: 'Our New State-of-the-Art Studio facility outside of Prague.',
//             image: '/images/milin-studio.jpg',
//             link: '/milin-studio',
//           },
//         ].map((feature, index) => (
//           <motion.div
//             key={index}
//             className="group relative overflow-hidden rounded-lg shadow-lg"
//             initial={{ opacity: 0, y: 50 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: index * 0.2 }}
//             viewport={{ once: true }}
//           >
//             <Image
//               src={feature.image}
//               alt={feature.title}
//               width={600}
//               height={400}
//               className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
//             />
//             <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-6">
//               <h2 className="text-2xl font-bold mb-2">{feature.title}</h2>
//               <p className="text-sm text-gray-300 mb-4">{feature.description}</p>
//               <Link href={feature.link} className="text-white underline">
//               Find out more
//               </Link>
//             </div>
//           </motion.div>
//         ))}
//       </section>

//       {/* Footer */}
//       <footer className="bg-gray-900 text-gray-400 py-10 px-6">
//         <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between">
//           <div>
//             <h3 className="text-white text-lg mb-2">Contact Us</h3>
//             <p>Žitomírská 7/489, Prague 10, 101 00, Czech Republic</p>
//             <p>info@upp.cz</p>
//             <p>+420 271 722 121</p>
//           </div>
//           <div className="mt-6 md:mt-0">
//             <h3 className="text-white text-lg mb-2">Follow Us</h3>
//             <div className="flex space-x-4">
//               <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
//               <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
//               <a href="https://vimeo.com" target="_blank" rel="noopener noreferrer">Vimeo</a>
//             </div>
//           </div>
//         </div>
//       </footer>
//     </main>
//   ) */}