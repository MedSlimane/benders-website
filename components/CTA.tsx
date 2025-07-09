"use client"
import { useRef } from "react"
import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"
import { motion } from "framer-motion"
import ShinyText from "./ShinyText/ShinyText"

interface CTAProps {
  title?: string
  subtitle?: string
  className?: string
  loading: boolean
}

const CTA = ({ 
  title = "Ready to Transform Your Brand?", 
  subtitle = "Let's discuss how we can help you achieve your marketing goals through creative strategy.",
  className = "",
  loading
}: CTAProps) => {
  const ctaRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useGSAP(
    () => {
      // Set initial states
      gsap.set([titleRef.current, subtitleRef.current, buttonRef.current], {
        opacity: 0,
        y: 30,
      })

      if (loading) return

      // Create timeline for animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ctaRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      })

      tl.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
      })
      .to(subtitleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
      }, "-=0.4")
      .to(buttonRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "back.out(1.7)",
      }, "-=0.4")

      // Button hover effects
      const button = buttonRef.current
      if (button) {
        button.addEventListener('mouseenter', () => {
          gsap.to(button, {
            scale: 1.05,
            duration: 0.3,
            ease: "power2.out",
          })
        })

        button.addEventListener('mouseleave', () => {
          gsap.to(button, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
          })
        })
      }
    },
    { scope: ctaRef, dependencies: [loading] }
  )

  const handleBookingClick = () => {
    window.open('hhttps://calendar.app.google/ENRJ1d6t9AM9nwy7A', '_blank')
  }

  return (
    <motion.section 
      ref={ctaRef} 
      className={`relative w-full py-16 md:py-24 ${className}`}
      style={{ opacity: loading ? 0 : 1, visibility: loading ? 'hidden' : 'visible' }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.8 }}
    >
      <div className="container mx-auto px-6 md:px-16 text-center">
        <h2 
          ref={titleRef}
          className="text-3xl md:text-5xl font-gilroy font-bold text-white mb-6"
        >
          {title}
        </h2>
        
        <p 
          ref={subtitleRef}
          className="text-lg md:text-xl font-neue-montreal text-white mb-8 max-w-3xl mx-auto opacity-90"
        >
          {subtitle}
        </p>
        
        <button 
          ref={buttonRef}
          onClick={handleBookingClick}
          className="bg-[var(--color-electric-blue)] text-white font-bold py-3 px-6 rounded-full hover:bg-[var(--color-blue-medium)] transition-colors duration-300"
        >
          <ShinyText text="Book an appointment" />
        </button>
      </div>
    </motion.section>
  )
}

export default CTA