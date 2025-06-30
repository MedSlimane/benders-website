"use client"
import { useRef } from "react"
import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { motion } from "framer-motion"

gsap.registerPlugin(ScrollTrigger)

interface ProcessSectionProps {
  className?: string
  loading: boolean
}

const ProcessSection = ({ className = "", loading }: ProcessSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const descriptionRef = useRef<HTMLParagraphElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const cards = timelineRef.current?.querySelectorAll('.timeline-card')
      const line = timelineRef.current?.querySelector('.timeline-line')
      const dots = timelineRef.current?.querySelectorAll('.timeline-dot')
      
      // Set initial states
      gsap.set([headingRef.current, descriptionRef.current], {
        opacity: 0,
        y: 30,
      })
      
      gsap.set(cards || [], {
        opacity: 0,
        scale: 0.8,
        y: 50,
      })

      if (line) {
        gsap.set(line, {
          width: 0,
        })
      }

      gsap.set(dots || [], {
        scale: 0,
        opacity: 0,
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

      tl.to(headingRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
      })
      .to(descriptionRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
      }, "-=0.4")
      
      if (line) {
        tl.to(line, {
          width: "100%",
          duration: 1.5,
          ease: "power2.inOut",
        }, "-=0.3")
      }
      
      tl.to(dots || [], {
        scale: 1,
        opacity: 1,
        duration: 0.4,
        stagger: 0.2,
        ease: "back.out(2)",
      }, "-=0.8")
      .to(cards || [], {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.3,
        ease: "back.out(1.4)",
      }, "-=0.6")
    },
    { scope: sectionRef, dependencies: [loading] }
  )

  const processSteps = [
    {
      id: 1,
      title: "Discovery & Strategy",
      description: "We audit your current presence and identify growth opportunities",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3"/>
          <path d="M12 1v6m0 6v6"/>
          <path d="m15.4 6.4 4.2-4.2"/>
          <path d="M18.4 18.4l-4.2-4.2"/>
          <path d="m8.6 6.4-4.2-4.2"/>
          <path d="M5.6 18.4l4.2-4.2"/>
        </svg>
      )
    },
    {
      id: 2,
      title: "Launch & Optimize",
      description: "We don't just deliver - we measure, refine, and scale",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7 10v12"/>
          <path d="M15 5v17"/>
          <path d="M5 8l4-4 4 4"/>
          <path d="M13 3l4 4-4 4"/>
        </svg>
      )
    },
    {
      id: 3,
      title: "Growth & Scale",
      description: "Your dedicated partner for sustainable, measurable growth",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 3v18h18"/>
          <path d="M7 12l3-3 3 3 5-5"/>
          <circle cx="7" cy="12" r="1" fill="currentColor"/>
          <circle cx="13" cy="9" r="1" fill="currentColor"/>
          <circle cx="18" cy="7" r="1" fill="currentColor"/>
        </svg>
      )
    }
  ]

  return (
    <motion.section 
      ref={sectionRef} 
      className={`relative overflow-hidden w-full py-20 md:py-32 ${className}`}
      style={{ opacity: loading ? 0 : 1, visibility: loading ? 'hidden' : 'visible' }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.6 }}
    >
      <div className="container mx-auto px-6 md:px-16">
        {/* Header */}
        <div className="text-center mb-16 md:mb-24">
          
          <h2 
            ref={headingRef}
            className="text-4xl md:text-6xl font-gilroy font-bold text-white mb-6 max-w-5xl mx-auto leading-tight"
          >
            How We
            <span className="font-black text-gradient-secondary"> Grow  </span>  <br />
            Brands in Just 3 Steps.
          </h2>
          
          <p 
            ref={descriptionRef}
            className="text-lg md:text-xl font-neue-montreal text-white/80 max-w-3xl mx-auto leading-relaxed"
          >
            A clear strategy. Powerful creative. Precise execution — all focused on driving growth.
          </p>
        </div>

        {/* Desktop Timeline */}
        <div className="hidden md:block">
          <div ref={timelineRef} className="relative max-w-6xl mx-auto">
            {/* Timeline Line Container */}
            <div className="relative mb-16">
              {/* Background Line */}
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-white/10 rounded-full transform -translate-y-1/2"></div>
              {/* Animated Line */}
              <div className="timeline-line absolute top-1/2 left-0 h-1 bg-gradient-to-r from-[var(--color-electric-blue)] via-[var(--color-mint-cyan)] to-[var(--color-electric-blue)] rounded-full transform -translate-y-1/2 w-0"></div>
            </div>

            {/* Process Cards */}
            <div className="grid grid-cols-3 mt-15 gap-12 lg:gap-16">
              {processSteps.map((step, index) => (
                <div 
                  key={step.id}
                  className="timeline-card relative group"
                >
                  {/* Main Card */}
                  <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 lg:p-8 transition-all duration-500 group-hover:bg-white/10 group-hover:border-white/20 group-hover:scale-105 group-hover:-translate-y-2">
                    {/* Step Number */}
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-[var(--color-electric-blue)] rounded-full flex items-center justify-center text-white font-bold text-sm border-2 border-white/20 z-10">
                      {step.id}
                    </div>
                    
                    {/* Icon */}
                    <div className="w-14 h-14 lg:w-16 lg:h-16 bg-[var(--color-electric-blue)]/20 rounded-xl flex items-center justify-center text-[var(--color-mint-cyan)] mb-4 lg:mb-6 group-hover:bg-[var(--color-electric-blue)]/30 transition-all duration-300 mx-auto mt-4">
                      {step.icon}
                    </div>
                    
                    {/* Content */}
                    <div className="text-center">
                      <h3 className="text-lg lg:text-xl xl:text-2xl font-gilroy font-bold text-white mb-3 lg:mb-4">
                        {step.title}
                      </h3>
                      
                      <p className="text-white/70 font-neue-montreal leading-relaxed text-sm lg:text-base">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {/* Arrow Connector */}
                  {index < processSteps.length - 1 && (
                    <div className="absolute top-1/2 -right-6 lg:-right-8 transform -translate-y-1/2 z-10">
                      <div className="flex items-center">
                        <div className="w-6 h-6 bg-[var(--color-electric-blue)] rotate-45 border-2 border-white/20 group-hover:scale-110 transition-all duration-300"></div>
                        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-[var(--color-mint-cyan)] rounded-full"></div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Timeline - Vertical */}
        <div className="block md:hidden">
          <div className="relative max-w-md mx-auto">
            {/* Vertical Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-[var(--color-electric-blue)] via-[var(--color-mint-cyan)] to-[var(--color-electric-blue)] rounded-full"></div>
            
            {/* Mobile Steps */}
            <div className="space-y-16">
              {processSteps.map((step) => (
                <div key={step.id} className="relative flex items-start">
                  {/* Step Number */}
                  <div className="w-16 h-16 bg-[var(--color-electric-blue)] rounded-full flex items-center justify-center text-white font-bold text-xl z-10 border-4 border-white/20 flex-shrink-0">
                    {step.id}
                  </div>
                  
                  {/* Content Card */}
                  <div className="ml-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 flex-1">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-[var(--color-electric-blue)]/20 rounded-lg flex items-center justify-center text-[var(--color-mint-cyan)] mr-4">
                        {step.icon}
                      </div>
                      <h3 className="text-lg font-gilroy font-bold text-white">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-white/70 font-neue-montreal leading-relaxed text-sm">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Background decorative elements */}
      <div className="absolute top-20 left-10 w-2 h-2 bg-[var(--color-mint-cyan)] rounded-full opacity-60"></div>
      <div className="absolute bottom-32 right-16 w-3 h-3 bg-[var(--color-electric-blue)] rounded-full opacity-40"></div>
      <div className="absolute top-1/2 left-1/4 w-1 h-1 bg-white rounded-full opacity-30"></div>
    </motion.section>
  )
}

export default ProcessSection 