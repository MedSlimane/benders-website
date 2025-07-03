'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

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
  { src: "/logos/room.png", alt: "Room" },
]

export default function LogoCarousel({ loading }: LogoCarouselProps) {
  return (
    <motion.section 
      className="py-4" 
      style={{ opacity: loading ? 0 : 1, visibility: loading ? 'hidden' : 'visible' }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <motion.div 
        className="text-center mb-5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <h2 className="font-neue-montreal font-medium text-md text-white/90">
          Brands that <span className="text-gradient-secondary text-xl font-bold">Scale</span> with us :
        </h2>
      </motion.div>

      <div className="relative w-full overflow-hidden">
        {/* Gradient overlays */}
        <div className="absolute top-0 left-0 w-[150px] h-full bg-gradient-to-r from-[#04082e] to-transparent z-10"></div>
        <div className="absolute top-0 right-0 w-[150px] h-full bg-gradient-to-l from-[#04082e] to-transparent z-10"></div>
        
        {/* Logo container */}
        <motion.div
          className="flex items-center"
          animate={{
            x: ["0%", "-50%"]
          }}
          transition={{
            duration: 18,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {/* First set of logos */}
          <div className="flex items-center">
            {logos.map((logo, index) => (
              <div 
                key={index} 
                className="mx-8 p-4 h-24 w-40 flex items-center justify-center flex-shrink-0"
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={200}
                  height={80}
                  className="w-auto h-full object-contain filter brightness-0 invert opacity-80 hover:opacity-100 transition-opacity"
                />
              </div>
            ))}
          </div>
          
          {/* Duplicate set for seamless loop */}
          <div className="flex items-center">
            {logos.map((logo, index) => (
              <div 
                key={`dup-${index}`} 
                className="mx-8 p-4 h-24 w-40 flex items-center justify-center flex-shrink-0"
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={200}
                  height={80}
                  className="w-auto h-full object-contain filter brightness-0 invert opacity-80 hover:opacity-100 transition-opacity"
                />
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div 
        className="text-center mt-5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <h2 className="font-neue-montreal font-medium text-white/90">
          You Could Be <span className="text-gradient-secondary text-xl font-bold">Next</span>
        </h2>
      </motion.div>
    </motion.section>
  )
} 