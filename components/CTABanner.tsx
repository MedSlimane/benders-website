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
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-[#2de6c7]"
            >
              <path d="M5 12h14" />
              <path d="M12 5l7 7-7 7" />
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
