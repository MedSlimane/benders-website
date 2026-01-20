"use client"
import { useRef } from "react"
import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

interface ProjectSectionProps {
  title: string
  content: React.ReactNode
  show?: boolean
}

export default function ProjectSection({ title, content, show = true }: ProjectSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!show || !sectionRef.current || !titleRef.current || !contentRef.current) return

    gsap.set([titleRef.current, contentRef.current], { opacity: 0, y: 60 })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 85%",
        toggleActions: "play none none reverse"
      }
    })

    tl.to(titleRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out"
    })
    .to(contentRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out"
    }, "-=0.4")
  }, { dependencies: [show] })

  if (!show) return null

  return (
    <section ref={sectionRef} className="relative px-4 py-16 md:py-24">
      <div className="max-w-5xl mx-auto">
        {/* Section Title */}
        <h2 
          ref={titleRef}
          className="font-gilroy font-bold text-3xl md:text-4xl lg:text-5xl text-white mb-8 md:mb-12"
        >
          {title}
        </h2>

        {/* Content */}
        <div ref={contentRef}>
          {content}
        </div>
      </div>

      {/* Decorative line */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  )
}
