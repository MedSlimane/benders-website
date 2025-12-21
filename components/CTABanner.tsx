"use client"
import { useRef } from "react"
import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import MagneticButton from "./MagneticButton"

gsap.registerPlugin(ScrollTrigger)

interface CTABannerProps {
  loading: boolean
}

const CTABanner = ({ loading }: CTABannerProps) => {
  const sectionRef = useRef<HTMLElement>(null)
  const buttonRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (loading) return

    const button = buttonRef.current
    if (!button) return

    gsap.set(button, { y: 30, opacity: 0 })

    gsap.to(button, {
      y: 0,
      opacity: 1,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 95%",
        end: "top 80%",
        scrub: 0.5,
      },
    })

  }, { scope: sectionRef, dependencies: [loading] })

  return (
    <section ref={sectionRef} className="relative py-4 md:py-6 px-4 md:px-8">
      <div ref={buttonRef} className="w-full max-w-7xl mx-auto">
        <MagneticButton
          href="https://calendar.app.google/ENRJ1d6t9AM9nwy7A"
          variant="glass"
          size="lg"
          className="w-full justify-center"
          icon={
            <svg 
              className="w-5 h-5"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          }
        >
          Book a Free Call
        </MagneticButton>
      </div>
    </section>
  )
}

export default CTABanner
