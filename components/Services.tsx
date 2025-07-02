'use client'

import { useRef } from "react"
import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { motion } from "framer-motion"

gsap.registerPlugin(ScrollTrigger)

interface ServicesProps {
  loading: boolean
}

export default function Services({ loading }: ServicesProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const descriptionRef = useRef<HTMLParagraphElement>(null)

  useGSAP(
    () => {
      // Set initial states
      gsap.set([headerRef.current, descriptionRef.current], {
        opacity: 0,
        y: 30,
      })

      if (loading) return

      // Create timeline with ScrollTrigger
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      })

      tl.to([headerRef.current, descriptionRef.current], {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
      })
    },
    { scope: sectionRef, dependencies: [loading] }
  )

  return (
    <motion.section 
      ref={sectionRef} 
      className="relative overflow-hidden w-full" 
      style={{ opacity: loading ? 0 : 1, visibility: loading ? 'hidden' : 'visible' }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
    >
      <div className="container mx-auto px-6 py-2 md:px-16">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16 md:mb-8">
          
          <h2 className="text-4xl md:text-6xl font-gilroy font-bold text-white mb-6 max-w-5xl mx-auto leading-tight">
            Struggling with no clear <br />
            <span className="italic text-gradient-secondary">Creative Strategy</span>
          </h2>
          
          <p className="text-lg md:text-xl font-neue-montreal text-white/80 max-w-3xl mx-auto leading-relaxed">
          you&apos;re wasting your time and money
          </p>
        </div>

        {/* Bridging paragraph to next section */}
      </div>
      
      {/* Background decorative elements */}
      <div className="absolute top-20 left-10 w-2 h-2 bg-[var(--color-mint-cyan)] rounded-full opacity-60"></div>
      <div className="absolute bottom-32 right-16 w-3 h-3 bg-[var(--color-electric-blue)] rounded-full opacity-40"></div>
      <div className="absolute top-1/2 left-1/4 w-1 h-1 bg-white rounded-full opacity-30"></div>
    </motion.section>
  )
} 