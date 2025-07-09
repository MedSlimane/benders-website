"use client"
import { useRef } from "react"
import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"

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
      // Get all elements that need animation
      const allCards = sectionRef.current?.querySelectorAll('.timeline-card') || []
      const allArrows = sectionRef.current?.querySelectorAll('.process-arrow') || []
      
      console.log('ProcessSection Animation Debug:', {
        loading,
        allCardsLength: allCards.length,
        allArrowsLength: allArrows.length,
        sectionRef: sectionRef.current,
        isMobile: window.innerWidth < 768
      })
      
      // Set initial states only if elements exist
      if (headingRef.current && descriptionRef.current) {
        gsap.set([headingRef.current, descriptionRef.current], {
          opacity: 0,
          y: 30,
        })
      }
      
      if (allCards.length > 0) {
        gsap.set(allCards, {
          opacity: 0,
          scale: 0.8,
          y: 50,
        })
      }

      if (allArrows.length > 0) {
        gsap.set(allArrows, {
          opacity: 0,
          scale: 0.5,
        })
      }

      if (loading) return

      // Create timeline with ScrollTrigger
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
          onEnter: () => console.log('ScrollTrigger entered'),
          onLeave: () => console.log('ScrollTrigger left'),
        }
      })

      // Animate header elements
      if (headingRef.current) {
        tl.to(headingRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
        })
      }

      if (descriptionRef.current) {
        tl.to(descriptionRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
        }, "-=0.4")
      }

      // Animate all cards with stagger for better mobile experience
      if (allCards.length > 0) {
        tl.to(allCards, {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.3,
          ease: "back.out(1.4)",
        }, "-=0.3")
      }

      // Animate all arrows with stagger
      if (allArrows.length > 0) {
        tl.to(allArrows, {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.2,
          ease: "back.out(1.7)",
        }, "-=0.4")
      }
    },
    { scope: sectionRef, dependencies: [loading] }
  )

  const processSteps = [
    {
      id: 1,
      title: "Discovery & Strategy",
      description: "We start by understanding your goals — then audit your brand to uncover the clearest path to growth.",
      videoSrc: "/logos/evidence.webm" // Using WebM for better transparency support
    },
    {
      id: 2,
      title: "Launch & Optimize",
      description: "We bring your vision to life, then fine-tune every detail to align with your goals and maximize results.",
      videoSrc: "/logos/rocket.webm" // Using WebM for better transparency support
    },
    {
      id: 3,
      title: "Growth & Scale",
      description: "With your long-term success in mind, we scale what works and become your partner in consistent growth.",
      videoSrc: "/logos/growth.webm" // Using WebM for better transparency support
    }
  ]  

  return (
    <section 
      ref={sectionRef} 
      className={`relative overflow-hidden w-full py-16 md:py-16 pb-8 md:pb-10 ${className}`}
      style={{ opacity: loading ? 0 : 1, visibility: loading ? 'hidden' : 'visible' }}
    >
      <div className="container mx-auto px-6 md:px-16 pt-8">
        {/* Header */}
        <div className="text-center mb-5">
          
            <h2 
            ref={headingRef}
            className="text-4xl md:text-6xl font-gilroy font-bold text-white mb-6 max-w-3xl mx-auto leading-tight"
            >
            Our Strategic <br />
            <span className="font-black italic text-gradient-secondary"> Process </span>  
            for Exceptional Growth
            </h2>
          <p 
            ref={descriptionRef}
            className="text-sm md:text-md font-neue-montreal text-white/80 max-w-3xl mx-auto leading-relaxed"
          >
           A clear strategy rooted in real insights. Creative that stands out and converts. Execution that adapts, improves, and scales. From discovery to optimization to long-term growth — we partner with you every step of the way.
          </p>
        </div>

        {/* Desktop Timeline */}
        <div className="hidden md:block">
          <div ref={timelineRef} className="relative max-w-6xl mx-auto">
            {/* Process Cards */}
            <div className="grid grid-cols-3 gap-12 lg:gap-16">
              {processSteps.map((step) => (
                <div 
                  key={step.id}
                  className="timeline-card relative group mt-8"
                >
                  {/* Main Card */}
                  <div className="relative backdrop-blur-sm rounded-2xl p-6 lg:p-8 transition-all duration-500">
                    {/* Animated Video Icon */}
                    <div className="w-24 h-24 lg:w-28 lg:h-28 rounded-xl flex items-center justify-center mb-4 lg:mb-6 transition-all duration-300 mx-auto mt-4 overflow-hidden">
                      <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover mix-blend-screen brightness-150 contrast-125"
                        style={{ filter: 'drop-shadow(0 0 10px rgba(45, 230, 199, 0.3))' }}
                      >
                        <source src={step.videoSrc} type="video/webm" />
                        {/* Fallback for when video doesn't load */}
                        <div className="w-full h-full bg-[var(--color-electric-blue)]/20 rounded-xl flex items-center justify-center">
                          <div className="w-8 h-8 bg-[var(--color-mint-cyan)] rounded-full"></div>
                        </div>
                      </video>
                    </div>
                    
                    {/* Content */}
                    <div className="text-center">
                      <h3 className="text-lg lg:text-xl xl:text-2xl font-gilroy font-bold text-white mb-3 lg:mb-4">
                        {step.title}
                      </h3>
                      
                      <p className="text-white/70 font-neue-montreal leading-relaxed text-sm md:text-sm">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Custom positioned arrows */}
            <div className="absolute top-1/2 left-0 right-0 transform -translate-y-1/2 pointer-events-none">
              {/* First Arrow: Between process 1 and 2 */}
              <div className="process-arrow absolute" style={{ left: 'calc(33.33% - 1rem)' }}>
                <svg 
                  width="60" 
                  height="20" 
                  viewBox="0 0 60 20" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-[var(--color-mint-cyan)]"
                >
                  <path 
                    d="M0 10 L50 10 M45 5 L50 10 L45 15" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              {/* Second Arrow: Between process 2 and 3 */}
              <div className="process-arrow absolute" style={{ left: 'calc(66.66% + 2rem)' }}>
                <svg 
                  width="60" 
                  height="20" 
                  viewBox="0 0 60 20" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-[var(--color-mint-cyan)]"
                >
                  <path 
                    d="M0 10 L50 10 M45 5 L50 10 L45 15" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Timeline - Vertical with Centered Layout */}
        <div className="block md:hidden">
          <div ref={mobileTimelineRef} className="relative max-w-sm mx-auto">
            {/* Mobile Steps */}
            <div className="space-y-8">
              {processSteps.map((step, index) => (
                <div key={step.id} className="flex flex-col items-center">
                  {/* Process Card */}
                  <div className="timeline-card relative w-full">
                    <div className="relative backdrop-blur-sm rounded-2xl p-6">
                      {/* Animated Video Icon - Centered */}
                      <div className="w-20 h-20 rounded-xl flex items-center justify-center mb-4 mx-auto mt-4 overflow-hidden">
                        <video
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="w-full h-full object-cover mix-blend-screen brightness-150 contrast-125"
                          style={{ filter: 'drop-shadow(0 0 10px rgba(45, 230, 199, 0.3))' }}
                        >
                          <source src={step.videoSrc} type="video/webm" />
                          {/* Fallback for when video doesn't load */}
                          <div className="w-full h-full bg-[var(--color-electric-blue)]/20 rounded-xl flex items-center justify-center">
                            <div className="w-8 h-8 bg-[var(--color-mint-cyan)] rounded-full"></div>
                          </div>
                        </video>
                      </div>
                      
                      {/* Content - Centered */}
                      <div className="text-center">
                        <h3 className="text-lg font-gilroy font-bold text-white mb-3">
                          {step.title}
                        </h3>
                        
                        <p className="text-white/70 font-neue-montreal leading-relaxed text-sm">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Vertical Arrow (except for last item) */}
                  {index < processSteps.length - 1 && (
                    <div className="process-arrow flex items-center justify-center my-4">
                 
                        <ArrowDown className="w-5 h-5 text-[var(--color-mint-cyan)]" />
             
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProcessSection