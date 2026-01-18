"use client"
import { useRef, useEffect } from "react"
import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Flag, Palette, Code, Video, Target, MessageSquare } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

interface ServicesSectionProps {
  loading: boolean
}

interface Service {
  id: number
  title: string
  description: string
  icon: React.ReactNode
}

const services: Service[] = [
  {
    id: 1,
    title: "Brand Strategy",
    description: "Positioning, offers, messaging, roadmap.",
    icon: <Flag className="w-8 h-8" strokeWidth={1.5} />,
  },
  {
    id: 2,
    title: "Visual Identity",
    description: "Logo, brand system, guidelines, assets.",
    icon: <Palette className="w-8 h-8" strokeWidth={1.5} />,
  },
  {
    id: 3,
    title: "Web Development",
    description: "Landing pages, websites, Webflow/Next.js.",
    icon: <Code className="w-8 h-8" strokeWidth={1.5} />,
  },
  {
    id: 4,
    title: "Video Production",
    description: "Ads, reels, motion, VFX, post-production.",
    icon: <Video className="w-8 h-8" strokeWidth={1.5} />,
  },
  {
    id: 5,
    title: "Digital Marketing",
    description: "Funnels, ads, tracking, optimization.",
    icon: <Target className="w-8 h-8" strokeWidth={1.5} />,
  },
  {
    id: 6,
    title: "Social Media",
    description: "Content system, strategy, community growth.",
    icon: <MessageSquare className="w-8 h-8" strokeWidth={1.5} />,
  },
]

const ServiceCard = ({ 
  service,
}: { 
  service: Service
}) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const borderRef = useRef<HTMLDivElement>(null)
  const glowTopRef = useRef<HTMLDivElement>(null)
  const glowBottomRef = useRef<HTMLDivElement>(null)
  const iconRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const card = cardRef.current
    const border = borderRef.current
    const glowTop = glowTopRef.current
    const glowBottom = glowBottomRef.current
    const icon = iconRef.current
    const title = titleRef.current
    const desc = descRef.current
    
    if (!card || !border || !glowTop || !glowBottom || !icon || !title || !desc) return

    const handleMouseEnter = () => {
      // Border glow intensifies - more subtle
      gsap.to(border, {
        boxShadow: "0 0 30px rgba(0, 85, 255, 0.4), inset 0 0 30px rgba(0, 85, 255, 0.15)",
        duration: 0.6,
        ease: "power2.out",
      })

      // Corner glows intensify - smoother
      gsap.to([glowTop, glowBottom], {
        opacity: 0.8,
        scale: 1.15,
        duration: 0.6,
        ease: "power2.out",
      })

      // Icon lifts and glows - smoother
      gsap.to(icon, {
        y: -4,
        scale: 1.08,
        boxShadow: "0 0 15px rgba(0, 85, 255, 0.4)",
        duration: 0.5,
        ease: "power2.out",
      })

      // Title brightens - smoother
      gsap.to(title, {
        color: "#ffffff",
        duration: 0.4,
        ease: "power2.out",
      })

      // Description brightens - smoother
      gsap.to(desc, {
        color: "rgba(255, 255, 255, 0.75)",
        duration: 0.4,
        ease: "power2.out",
      })

      // Card lifts slightly - smoother
      gsap.to(card, {
        y: -6,
        duration: 0.6,
        ease: "power2.out",
      })
    }

    const handleMouseLeave = () => {
      gsap.to(border, {
        boxShadow: "0 0 15px rgba(0, 85, 255, 0.25), inset 0 0 15px rgba(0, 85, 255, 0.08)",
        duration: 0.6,
        ease: "power2.out",
      })

      gsap.to([glowTop, glowBottom], {
        opacity: 0.5,
        scale: 1,
        duration: 0.6,
        ease: "power2.out",
      })

      gsap.to(icon, {
        y: 0,
        scale: 1,
        boxShadow: "0 0 0px rgba(0, 85, 255, 0)",
        duration: 0.5,
        ease: "power2.out",
      })

      gsap.to(title, {
        color: "rgba(255, 255, 255, 0.9)",
        duration: 0.4,
        ease: "power2.out",
      })

      gsap.to(desc, {
        color: "rgba(255, 255, 255, 0.5)",
        duration: 0.4,
        ease: "power2.out",
      })

      gsap.to(card, {
        y: 0,
        duration: 0.6,
        ease: "power2.out",
      })
    }

    card.addEventListener("mouseenter", handleMouseEnter)
    card.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      card.removeEventListener("mouseenter", handleMouseEnter)
      card.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  return (
    <div
      ref={cardRef}
      className="service-card relative cursor-pointer"
      style={{ willChange: "transform" }}
    >
      {/* Glowing border container */}
      <div
        ref={borderRef}
        className="relative rounded-2xl p-[1.5px] transition-all duration-500"
        style={{
          background: "linear-gradient(135deg, rgba(0, 85, 255, 0.3) 0%, rgba(0, 85, 255, 0.15) 50%, rgba(0, 85, 255, 0.3) 100%)",
          boxShadow: "0 0 15px rgba(0, 85, 255, 0.25), inset 0 0 15px rgba(0, 85, 255, 0.08)",
        }}
      >
        {/* Top-right corner glow */}
        <div 
          ref={glowTopRef}
          className="absolute -top-6 -right-6 w-28 h-28 rounded-full pointer-events-none opacity-50 transition-all duration-500"
          style={{
            background: "radial-gradient(circle, rgba(0, 85, 255, 0.7) 0%, rgba(0, 85, 255, 0.4) 30%, transparent 70%)",
            filter: "blur(30px)",
            willChange: "opacity, transform",
          }}
        />

        {/* Bottom-left corner glow */}
        <div 
          ref={glowBottomRef}
          className="absolute -bottom-6 -left-6 w-28 h-28 rounded-full pointer-events-none opacity-50 transition-all duration-500"
          style={{
            background: "radial-gradient(circle, rgba(0, 85, 255, 0.7) 0%, rgba(0, 85, 255, 0.4) 30%, transparent 70%)",
            filter: "blur(30px)",
            willChange: "opacity, transform",
          }}
        />

        {/* Card content */}
        <div className="relative p-6 md:p-8 rounded-2xl bg-[#0a0f2e]/95 backdrop-blur-xl overflow-hidden">
          {/* Icon */}
          <div 
            ref={iconRef}
            className="w-14 h-14 rounded-full border border-[#0055ff]/40 flex items-center justify-center mb-6 text-[#0055ff] bg-[#0055ff]/5 transition-all duration-300"
            style={{ willChange: "transform, box-shadow" }}
          >
            {service.icon}
          </div>

          {/* Title */}
          <h3 
            ref={titleRef}
            className="font-gilroy font-bold text-white/90 text-xl md:text-2xl mb-3 transition-colors duration-300"
          >
            {service.title}
          </h3>

          {/* Description */}
          <p 
            ref={descRef}
            className="font-neue-montreal text-white/50 text-sm md:text-base transition-colors duration-300"
          >
            {service.description}
          </p>
        </div>
      </div>
    </div>
  )
}

const ServicesSection = ({ loading }: ServicesSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useGSAP(() => {
    if (loading) return

    const title = titleRef.current
    const subtitle = subtitleRef.current
    const content = contentRef.current
    const cards = cardsRef.current.filter(Boolean)

    if (!title || !subtitle || !content) return

    // Set initial states
    gsap.set(title, { y: 60, opacity: 0, scale: 0.95 })
    gsap.set(subtitle, { y: 30, opacity: 0 })

    // Title reveal with scale - smoother
    gsap.to(title, {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 1.4,
      ease: "power3.out",
      scrollTrigger: {
        trigger: content,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    })

    // Subtitle reveal - smoother
    gsap.to(subtitle, {
      y: 0,
      opacity: 1,
      duration: 1.2,
      delay: 0.3,
      ease: "power3.out",
      scrollTrigger: {
        trigger: content,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    })

    // Cards staggered reveal - smoother
    cards.forEach((card, index) => {
      if (!card) return

      gsap.set(card, { 
        y: 80, 
        opacity: 0,
        scale: 0.95,
      })
      
      gsap.to(card, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1.2,
        delay: index * 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      })
    })

  }, { scope: sectionRef, dependencies: [loading] })

  return (
    <section ref={sectionRef} className="relative overflow-hidden">
      <div ref={contentRef} className="relative min-h-screen pt-24 md:pt-32 pb-20">
        {/* Title - Centered */}
        <div className="text-center mb-12 md:mb-16 lg:mb-20 px-4">
          <h2 
            ref={titleRef}
            data-skew
            className="font-gilroy font-black text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white leading-none tracking-tight mb-4"
          >
            OUR SERVICES
          </h2>
          <p 
            ref={subtitleRef}
            className="font-neue-montreal text-white/60 text-sm md:text-base lg:text-lg max-w-2xl mx-auto"
          >
            Everything you need to build, launch, and scale your brand.
          </p>
        </div>

        {/* Service Cards Grid */}
        <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8" style={{ perspective: "1000px" }}>
            {services.map((service, index) => (
              <div
                key={service.id}
                ref={(el) => { cardsRef.current[index] = el }}
              >
                <ServiceCard service={service} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Background decorative orbs */}
      <div 
        className="absolute top-1/4 -left-32 w-[500px] h-[500px] rounded-full opacity-[0.03] pointer-events-none"
        style={{
          background: "radial-gradient(circle, #0055ff 0%, transparent 70%)",
          filter: "blur(100px)",
        }}
      />
      <div 
        className="absolute bottom-1/4 -right-32 w-[400px] h-[400px] rounded-full opacity-[0.03] pointer-events-none"
        style={{
          background: "radial-gradient(circle, #2de6c7 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
    </section>
  )
}

export default ServicesSection
