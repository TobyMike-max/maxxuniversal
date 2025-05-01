'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function Navbar() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY
      setVisible(scrollTop > window.innerHeight * 0.2)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: visible ? 1 : 0 }}
      className="fixed top-0 left-0 w-full z-50 p-6 flex justify-between bg-black/40 backdrop-blur-md"
    >
      <span className="text-xl font-bold">LOGO</span>
      <ul className="flex gap-6">
        <li>Home</li>
        <li>Projects</li>
        <li>Contact</li>
      </ul>
    </motion.nav>
  )
}
