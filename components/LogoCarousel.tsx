'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Fragment } from 'react'

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
      className="pt-8" 
      style={{ opacity: loading ? 0 : 1, visibility: loading ? 'hidden' : 'visible' }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <motion.div 
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <h2 className="font-neue-montreal font-medium text-md text-white/90 ">
          Brands that <span className="text-gradient-secondary text-xl font-bold"> Scale</span> with us :
        </h2>
      </motion.div>

      <div className="logos">
        <motion.div
          animate={{
            x: "-50%",
          }}
          transition={{
            repeat: Infinity,
            duration: 30,
            ease: "linear",
          }}
          className="logos-slide flex flex-none gap-16 pr-16"
        >
          {Array.from({ length: 2 }).map((_, i) => (
            <Fragment key={i}>
              {logos.map((logo, index) => (
                <div key={`${i}-${index}`} className="slide-item">
                  <div className="logo-container">
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      width={200}
                      height={80}
                      className="logo-image"
                      style={{ objectFit: 'contain' }}
                    />
                  </div>
                </div>
              ))}
            </Fragment>
          ))}
        </motion.div>
      </div>

      <motion.div 
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <h2 className="font-neue-montreal font-medium text-white/90">
          You Could Be <span className="text-gradient-secondary text-xl font-bold">Next</span>
        </h2>
      </motion.div>
    </motion.section>
  );
} 