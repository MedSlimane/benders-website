"use client"
import { useRef } from "react"
import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

interface ProcessSectionProps {
  className?: string
}

const ProcessSection = ({ className = "" }: ProcessSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const descriptionRef = useRef<HTMLParagraphElement>(null)
  const stepsRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const steps = stepsRef.current?.querySelectorAll('.process-step')
      
      // Set initial states
      gsap.set([headingRef.current, descriptionRef.current], {
        opacity: 0,
        y: 30,
      })
      
      gsap.set(steps || [], {
        opacity: 0,
        y: 50,
      })

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
      .to(steps || [], {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.2,
        ease: "power2.out",
      }, "-=0.3")
    },
    { scope: sectionRef }
  )

  const processSteps = [
    {
      id: 1,
      title: "Strategic Planning",
      description: "We define your goals, target audience, and campaign objectives, then craft a tailored proposal with the right influencers and expected results.",
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"/>
          <path d="21 21l-4.35-4.35"/>
          <circle cx="11" cy="11" r="3" fill="currentColor"/>
        </svg>
      )
    },
    {
      id: 2,
      title: "Campaign Management",
      description: "We handle everything—from creating the brief to reviewing and approving content—making sure your campaign runs smoothly from start to finish.",
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
          <circle cx="9" cy="9" r="2"/>
          <path d="M21 15.5c-.621-1.5-2.5-2.5-4-2.5s-3.379 1-4 2.5"/>
        </svg>
      )
    },
    {
      id: 3,
      title: "Performance & Insights",
      description: "After the campaign, we provide a detailed report with key results and insights to help you measure success and plan for future growth.",
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2v20M2 12h20"/>
          <path d="m15 9-3 3 3 3"/>
          <circle cx="18" cy="12" r="2" fill="currentColor"/>
          <path d="M8 21V7"/>
          <circle cx="12" cy="17" r="1" fill="currentColor"/>
        </svg>
      )
    }
  ]

  return (
    <section 
      ref={sectionRef} 
      className={`relative overflow-hidden w-full py-20 md:py-32 gradient-primary ${className}`}
    >
      <div className="container mx-auto px-6 md:px-16">
        {/* Header */}
        <div className="text-center mb-16 md:mb-24">
          <div className="inline-block bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-8">
            <span className="text-[var(--color-mint-cyan)] font-neue-montreal font-medium text-sm">
              Process
            </span>
          </div>
          
          <h2 
            ref={headingRef}
            className="text-4xl md:text-6xl font-gilroy font-bold text-white mb-6 max-w-5xl mx-auto leading-tight"
          >
            Our simple 3-step process<br />
            to <span className="italic text-gradient-secondary">skyrocket</span> your business.
          </h2>
          
          <p 
            ref={descriptionRef}
            className="text-lg md:text-xl font-neue-montreal text-white/80 max-w-3xl mx-auto leading-relaxed"
          >
            Our three-step process makes influencer marketing easy and effective. 
            We handle everything—from planning to execution to tracking results—so 
            your brand can grow without the hassle.
          </p>
        </div>

        {/* Process Steps */}
        <div ref={stepsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {processSteps.map((step, index) => (
            <div 
              key={step.id}
              className="process-step relative group"
            >
              {/* Step Number */}
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-[var(--color-electric-blue)] rounded-full flex items-center justify-center text-white font-bold text-sm z-10">
                {step.id}
              </div>
              
              {/* Card */}
              <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 h-full transition-all duration-500 group-hover:bg-white/10 group-hover:border-white/20 group-hover:scale-105">
                {/* Icon */}
                <div className="w-16 h-16 bg-[var(--color-electric-blue)]/20 rounded-xl flex items-center justify-center text-[var(--color-mint-cyan)] mb-6 group-hover:bg-[var(--color-electric-blue)]/30 transition-all duration-300">
                  {step.icon}
                </div>
                
                {/* Content */}
                <h3 className="text-xl md:text-2xl font-gilroy font-bold text-white mb-4">
                  {step.title}
                </h3>
                
                <p className="text-white/70 font-neue-montreal leading-relaxed">
                  {step.description}
                </p>
                
                {/* Connector Line (except for last item) */}
                {index < processSteps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-6 w-12 h-px bg-gradient-to-r from-[var(--color-electric-blue)] to-transparent opacity-30"></div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Background decorative elements */}
      <div className="absolute top-20 left-10 w-2 h-2 bg-[var(--color-mint-cyan)] rounded-full opacity-60"></div>
      <div className="absolute bottom-32 right-16 w-3 h-3 bg-[var(--color-electric-blue)] rounded-full opacity-40"></div>
      <div className="absolute top-1/2 left-1/4 w-1 h-1 bg-white rounded-full opacity-30"></div>
    </section>
  )
}

export default ProcessSection 