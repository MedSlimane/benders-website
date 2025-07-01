"use client"
import { useRef } from "react"
import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { motion } from "framer-motion"
import { Search, Rocket, TrendingUp } from "lucide-react"

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
  const mobileTimelineRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      // Get elements from both desktop and mobile timelines
      const desktopCards = timelineRef.current?.querySelectorAll('.timeline-card')
      const mobileCards = mobileTimelineRef.current?.querySelectorAll('.timeline-card')
      const desktopLine = timelineRef.current?.querySelector('.timeline-line')
      const mobileLine = mobileTimelineRef.current?.querySelector('.timeline-line')
      const desktopDots = timelineRef.current?.querySelectorAll('.timeline-dot')
      const mobileDots = mobileTimelineRef.current?.querySelectorAll('.timeline-dot')
      
      // Combine elements
      const allCards = [...(desktopCards || []), ...(mobileCards || [])]
      const allDots = [...(desktopDots || []), ...(mobileDots || [])]
      const currentLine = desktopLine || mobileLine
      
      // Set initial states
      gsap.set([headingRef.current, descriptionRef.current], {
        opacity: 0,
        y: 30,
      })
      
      gsap.set(allCards, {
        opacity: 0,
        scale: 0.8,
        y: 50,
      })

      if (currentLine) {
        // Set initial state based on whether it's mobile (vertical) or desktop (horizontal)
        const isMobile = window.innerWidth < 768
        gsap.set(currentLine, {
          ...(isMobile ? { height: 0 } : { width: 0 }),
        })
      }

      gsap.set(allDots, {
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
      
      if (currentLine) {
        // Check if it's mobile (vertical) or desktop (horizontal) timeline
        const isMobile = window.innerWidth < 768
        tl.to(currentLine, {
          ...(isMobile ? { height: "100%" } : { width: "100%" }),
          duration: 1.5,
          ease: "power2.inOut",
        }, "-=0.3")
      }
      
      tl.to(allDots, {
        scale: 1,
        opacity: 1,
        duration: 0.4,
        stagger: 0.2,
        ease: "back.out(2)",
      }, "-=0.8")
      .to(allCards, {
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
      icon: <Search size={32} />
    },
    {
      id: 2,
      title: "Launch & Optimize",
      description: "We don't just deliver - we measure, refine, and scale",
      icon: <Rocket size={32} />
    },
    {
      id: 3,
      title: "Growth & Scale",
      description: "Your dedicated partner for sustainable, measurable growth",
      icon: <TrendingUp size={32} />
    }
  ]

  return (
    <motion.section 
      ref={sectionRef} 
      className={`relative overflow-hidden w-full py-16 md:py-16 ${className}`}
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
              {processSteps.map((step) => (
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

                 
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Timeline - Vertical */}
        <div className="block md:hidden">
          <div ref={mobileTimelineRef} className="relative max-w-md mx-auto">
            {/* Vertical Timeline Line Background */}
            <div className="absolute left-8 top-0 bottom-0 w-1 bg-white/10 rounded-full"></div>
            {/* Vertical Timeline Line Animated */}
            <div className="timeline-line absolute left-8 top-0 w-1 bg-gradient-to-b from-[var(--color-electric-blue)] via-[var(--color-mint-cyan)] to-[var(--color-electric-blue)] rounded-full h-0"></div>
            
            {/* Mobile Steps */}
            <div className="space-y-16">
              {processSteps.map((step) => (
                <div key={step.id} className="timeline-card relative flex items-start">
                  {/* Step Number */}
                  <div className="timeline-dot w-16 h-16 bg-[var(--color-electric-blue)] rounded-full flex items-center justify-center text-white font-bold text-xl z-10 border-4 border-white/20 flex-shrink-0">
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