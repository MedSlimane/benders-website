"use client"
import { useRef, useEffect, useState } from "react"
import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

interface ServicesSectionProps {
  loading: boolean
}

interface Service {
  id: number
  title: string
  description: string
  number: string
  gradient: string
}

const services: Service[] = [
  {
    id: 1,
    title: "Brand Strategy",
    description: "Define your brand's purpose and create a comprehensive strategy that resonates with your audience.",
    number: "01",
    gradient: "from-[#2de6c7]/20 via-[#2de6c7]/5 to-transparent",
  },
  {
    id: 2,
    title: "Visual Identity",
    description: "Craft memorable visual identities that capture your brand essence and stand out from the crowd.",
    number: "02",
    gradient: "from-[#0055ff]/20 via-[#0055ff]/5 to-transparent",
  },
  {
    id: 3,
    title: "Web Development",
    description: "Build responsive, high-performance websites that convert visitors into loyal customers.",
    number: "03",
    gradient: "from-[#2de6c7]/20 via-[#2de6c7]/5 to-transparent",
  },
  {
    id: 4,
    title: "Video Production",
    description: "Create stunning visual content with professional video production, motion graphics and VFX.",
    number: "04",
    gradient: "from-[#0055ff]/20 via-[#0055ff]/5 to-transparent",
  },
  {
    id: 5,
    title: "Digital Marketing",
    description: "Maximize ROI with targeted campaigns across Meta, Google and emerging platforms.",
    number: "05",
    gradient: "from-[#2de6c7]/20 via-[#2de6c7]/5 to-transparent",
  },
  {
    id: 6,
    title: "Social Media",
    description: "Engage your audience with strategic campaigns that build community and drive growth.",
    number: "06",
    gradient: "from-[#0055ff]/20 via-[#0055ff]/5 to-transparent",
  },
]

const ServiceCard = ({ 
  service,
  index,
}: { 
  service: Service
  index: number
}) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const numberRef = useRef<HTMLSpanElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const card = cardRef.current
    const bg = bgRef.current
    const number = numberRef.current
    const title = titleRef.current
    const line = lineRef.current
    const desc = descRef.current
    const glow = glowRef.current
    if (!card || !bg || !number || !title || !line || !desc || !glow) return

    // Smooth cursor tracking for glow
    const xTo = gsap.quickTo(glow, "x", { duration: 0.5, ease: "power3.out" })
    const yTo = gsap.quickTo(glow, "y", { duration: 0.5, ease: "power3.out" })

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect()
      xTo(e.clientX - rect.left)
      yTo(e.clientY - rect.top)
    }

    const handleMouseEnter = () => {
      // Background gradient reveal - smoother
      gsap.to(bg, {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "power2.out",
      })

      // Glow appears smoothly
      gsap.to(glow, {
        opacity: 1,
        scale: 1.1,
        duration: 0.6,
        ease: "power2.out",
      })

      // Number subtle scale and color
      gsap.to(number, {
        scale: 1.05,
        color: "#2de6c7",
        duration: 0.6,
        ease: "power2.out",
      })

      // Title shifts right smoothly
      gsap.to(title, {
        x: 12,
        color: "#ffffff",
        duration: 0.6,
        ease: "power2.out",
      })

      // Line expands smoothly
      gsap.to(line, {
        scaleX: 1,
        opacity: 1,
        duration: 0.7,
        ease: "power2.out",
      })

      // Description fades in smoothly
      gsap.to(desc, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        delay: 0.05,
        ease: "power2.out",
      })
    }

    const handleMouseLeave = () => {
      gsap.to(bg, {
        opacity: 0,
        scale: 0.98,
        duration: 0.5,
        ease: "power2.out",
      })

      gsap.to(glow, {
        opacity: 0,
        scale: 1,
        duration: 0.4,
        ease: "power2.out",
      })

      gsap.to(number, {
        scale: 1,
        color: "rgba(255,255,255,0.15)",
        duration: 0.5,
        ease: "power2.out",
      })

      gsap.to(title, {
        x: 0,
        color: "rgba(255,255,255,0.8)",
        duration: 0.5,
        ease: "power2.out",
      })

      gsap.to(line, {
        scaleX: 0,
        opacity: 0,
        duration: 0.4,
        ease: "power2.out",
      })

      gsap.to(desc, {
        opacity: 0,
        y: 8,
        duration: 0.4,
        ease: "power2.out",
      })
    }

    card.addEventListener("mousemove", handleMouseMove)
    card.addEventListener("mouseenter", handleMouseEnter)
    card.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      card.removeEventListener("mousemove", handleMouseMove)
      card.removeEventListener("mouseenter", handleMouseEnter)
      card.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  const isEven = index % 2 === 0

  return (
    <div
      ref={cardRef}
      className="service-card relative cursor-pointer overflow-hidden"
    >
      {/* Animated background gradient */}
      <div
        ref={bgRef}
        className={`absolute inset-0 bg-gradient-to-r ${service.gradient} opacity-0 scale-95 rounded-2xl`}
      />

      {/* Cursor-following glow orb */}
      <div
        ref={glowRef}
        className="absolute w-[300px] h-[300px] rounded-full pointer-events-none opacity-0"
        style={{
          background: isEven 
            ? "radial-gradient(circle, rgba(45, 230, 199, 0.15) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(0, 85, 255, 0.15) 0%, transparent 70%)",
          transform: "translate(-50%, -50%)",
          filter: "blur(40px)",
        }}
      />

      {/* Main content */}
      <div className="relative py-5 md:py-6 px-4 md:px-6 flex items-center gap-4 md:gap-6">
        {/* Large number */}
        <span 
          ref={numberRef}
          className="font-gilroy font-black text-4xl md:text-5xl lg:text-6xl text-white/[0.15] select-none transition-transform"
          style={{ minWidth: "60px", textAlign: "center" }}
        >
          {service.number}
        </span>

        {/* Title and description */}
        <div className="flex-1 overflow-hidden">
          <h3 
            ref={titleRef}
            className="font-gilroy font-bold text-white/80 text-lg md:text-xl lg:text-2xl mb-1"
          >
            {service.title}
          </h3>
          
          {/* Animated line */}
          <div 
            ref={lineRef}
            className="h-[1.5px] w-full max-w-[120px] mb-2 origin-left scale-x-0 opacity-0"
            style={{
              background: isEven 
                ? "linear-gradient(90deg, #2de6c7, transparent)"
                : "linear-gradient(90deg, #0055ff, transparent)",
            }}
          />
          
          <p 
            ref={descRef}
            className="font-neue-montreal text-white/50 text-xs md:text-sm max-w-sm opacity-0 translate-y-2"
          >
            {service.description}
          </p>
        </div>
      </div>

      {/* Bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-white/[0.06]" />
    </div>
  )
}

const ServicesSection = ({ loading }: ServicesSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useGSAP(() => {
    if (loading) return

    const title = titleRef.current
    const subtitle = subtitleRef.current
    const content = contentRef.current
    const cards = cardsRef.current.filter(Boolean)

    if (!title || !subtitle || !content) return

    // Set initial states
    gsap.set(title, { y: 50, opacity: 0 })
    gsap.set(subtitle, { y: 30, opacity: 0 })

    // Title reveal - faster trigger
    gsap.to(title, {
      y: 0,
      opacity: 1,
      scrollTrigger: {
        trigger: content,
        start: "top 95%",
        end: "top 75%",
        scrub: 0.5,
      },
    })

    // Subtitle reveal - faster
    gsap.to(subtitle, {
      y: 0,
      opacity: 1,
      scrollTrigger: {
        trigger: content,
        start: "top 92%",
        end: "top 72%",
        scrub: 0.5,
      },
    })

    // Cards staggered reveal - much earlier trigger
    cards.forEach((card, index) => {
      if (!card) return

      const direction = index % 2 === 0 ? -1 : 1

      gsap.set(card, { 
        y: 40, 
        opacity: 0,
        rotateX: 5,
        x: direction * 20,
      })
      
      gsap.to(card, {
        y: 0,
        opacity: 1,
        rotateX: 0,
        x: 0,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top 98%",
          toggleActions: "play none none reverse",
        },
      })
    })

  }, { scope: sectionRef, dependencies: [loading, isMobile] })

  return (
    <section ref={sectionRef} className="relative">
      <div ref={contentRef} className="relative min-h-screen pt-24 md:pt-32 pb-20">
        {/* Title - Centered like WorkSection */}
        <div className="text-center mb-12 md:mb-16 lg:mb-20 px-4">
          <h2 
            ref={titleRef}
            data-skew
            className="font-gilroy font-black text-4xl md:text-5xl lg:text-5xl xl:text-[7rem] text-white leading-none tracking-tight"
          >
            OUR SERVICES
          </h2>
          <p 
            ref={subtitleRef}
            className="font-neue-montreal text-white/60 text-sm md:text-base mt-3 md:mt-4"
          >
            Everything you need to build, launch, and scale your brand.
          </p>
        </div>

        {/* Service Cards */}
        <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
          {/* Top border */}
          <div className="h-px bg-white/[0.06] mb-0" />
          
          {services.map((service, index) => (
            <div
              key={service.id}
              ref={(el) => { cardsRef.current[index] = el }}
              style={{ perspective: "1000px" }}
            >
              <ServiceCard 
                service={service}
                index={index}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Background decorative orbs */}
      <div 
        className="absolute top-1/4 -left-32 w-[500px] h-[500px] rounded-full opacity-[0.03] pointer-events-none"
        style={{
          background: "radial-gradient(circle, #2de6c7 0%, transparent 70%)",
          filter: "blur(100px)",
        }}
      />
      <div 
        className="absolute bottom-1/4 -right-32 w-[400px] h-[400px] rounded-full opacity-[0.03] pointer-events-none"
        style={{
          background: "radial-gradient(circle, #0055ff 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
    </section>
  )
}

export default ServicesSection
