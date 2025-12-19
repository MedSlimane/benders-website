'use client'

import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

interface LogoCarouselProps {
  loading: boolean
}

const logos = [
  { src: "/logos/itel.png", alt: "Itel" },
  { src: "/logos/alania.png", alt: "Alania" },
  { src: "/logos/riha.png", alt: "Riha" },
  { src: "/logos/expert.png", alt: "Expert" },
  { src: "/logos/abtal.png", alt: "Abtal" },
  { src: "/logos/gameworld.png", alt: "Gameworld" },
  { src: "/logos/loryx.png", alt: "Loryx" },
  { src: "/logos/geant.png", alt: "Geant" },
  { src: "/logos/qqcqq.png", alt: "QQCQQ" },
]

// Split logos into groups - 3 for mobile, 4 for desktop (handled in render)
const mobileGroups = [
  logos.slice(0, 3),
  logos.slice(3, 6),
  logos.slice(6, 9),
]

const desktopGroups = [
  logos.slice(0, 4),
  logos.slice(4, 8),
]

export default function LogoCarousel({ loading }: LogoCarouselProps) {
  const [currentGroup, setCurrentGroup] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const logoGroups = isMobile ? mobileGroups : desktopGroups

  // Auto-switch between logo groups every 4 seconds
  useEffect(() => {
    if (loading) return
    
    const interval = setInterval(() => {
      setCurrentGroup((prev) => (prev + 1) % logoGroups.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [loading, logoGroups.length])

  return (
    <motion.section 
      className="py-6 md:py-14" 
      style={{ opacity: loading ? 0 : 1, visibility: loading ? 'hidden' : 'visible' }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      {/* Logo Grid - 3 on mobile, 4 on desktop with fade transition */}
      <div className="relative w-full max-w-6xl mx-auto px-6 md:px-8">
        <div className="relative h-16 md:h-24">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${currentGroup}-${isMobile ? 'mobile' : 'desktop'}`}
              className="absolute inset-0 grid grid-cols-3 md:grid-cols-4 gap-8 md:gap-16 items-center justify-items-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              {logoGroups[currentGroup]?.map((logo, index) => (
                <div 
                  key={index} 
                  className="h-12 md:h-20 w-full flex items-center justify-center"
                >
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={180}
                    height={70}
                    className="w-auto h-full max-w-[90px] md:max-w-[160px] object-contain filter brightness-0 invert opacity-80"
                  />
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.section>
  )
}
