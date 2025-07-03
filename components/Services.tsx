'use client'

import { useRef } from "react"
import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { motion } from "framer-motion"
import { 
  Target, 
  Palette, 
  Video, 
  Code, 
  Users, 
  TrendingUp, 
  PenTool, 
  Star 
} from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

interface ServicesProps {
  loading: boolean
}

export default function Services({ loading }: ServicesProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const descriptionRef = useRef<HTMLParagraphElement>(null)
  const servicesGridRef = useRef<HTMLDivElement>(null)

  const services = [
    {
      id: 1,
      title: "Brand Mission & Services",
      description: "Define your brand's purpose and create a comprehensive service strategy that resonates with your target audience.",
      icon: <Target className="w-8 h-8 md:w-10 md:h-10" />
    },
    {
      id: 2,
      title: "Branding & Logo Design",
      description: "Craft memorable visual identities that capture your brand essence and stand out in competitive markets.",
      icon: <Palette className="w-8 h-8 md:w-10 md:h-10" />
    },
    {
      id: 3,
      title: "Video Production & VFX",
      description: "Create stunning visual content with professional video production and cutting-edge visual effects.",
      icon: <Video className="w-8 h-8 md:w-10 md:h-10" />
    },
    {
      id: 4,
      title: "Website Development",
      description: "Build responsive, high-performance websites that convert visitors into customers and drive business growth.",
      icon: <Code className="w-8 h-8 md:w-10 md:h-10" />
    },
    {
      id: 5,
      title: "Social Media Management",
      description: "Engage your audience with strategic social media campaigns that build community and drive engagement.",
      icon: <Users className="w-8 h-8 md:w-10 md:h-10" />
    },
    {
      id: 6,
      title: "Paid Advertising (Meta & Google Ads)",
      description: "Maximize ROI with targeted advertising campaigns across Meta and Google platforms for optimal reach.",
      icon: <TrendingUp className="w-8 h-8 md:w-10 md:h-10" />
    },
    {
      id: 7,
      title: "Copywriting & Content Strategy",
      description: "Craft compelling copy and develop content strategies that communicate your message effectively.",
      icon: <PenTool className="w-8 h-8 md:w-10 md:h-10" />
    },
    {
      id: 8,
      title: "Influencer Content & Brand Building",
      description: "Leverage influencer partnerships and authentic content creation to build brand authority and trust.",
      icon: <Star className="w-8 h-8 md:w-10 md:h-10" />
    }
  ]

  useGSAP(
    () => {
      const serviceCards = servicesGridRef.current?.querySelectorAll('.service-card')
      
      // Set initial states
      gsap.set([headerRef.current, descriptionRef.current], {
        opacity: 0,
        y: 30,
      })

      gsap.set(serviceCards, {
        opacity: 0,
        scale: 0.8,
        y: 50,
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

      tl.to(headerRef.current, {
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
      .to(serviceCards, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "back.out(1.4)",
      }, "-=0.3")
    },
    { scope: sectionRef, dependencies: [loading] }
  )

  return (
    <motion.section 
      ref={sectionRef} 
      className="relative overflow-hidden w-full py-16 md:py-24" 
      style={{ opacity: loading ? 0 : 1, visibility: loading ? 'hidden' : 'visible' }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
    >
      <div className="container mx-auto px-6 md:px-16">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <div ref={headerRef}>
            <h2 className="text-4xl md:text-6xl font-gilroy font-bold text-white mb-6 max-w-5xl mx-auto leading-tight">
              Our
              <span className="font-black text-gradient-secondary"> Services </span>
              <br />
              That Drive Growth
            </h2>
          </div>
          
          <p 
            ref={descriptionRef}
            className="text-lg md:text-xl font-neue-montreal text-white/80 max-w-3xl mx-auto leading-relaxed"
          >
            Comprehensive digital solutions designed to elevate your brand and accelerate your business growth.
          </p>
        </div>

        {/* Services Grid */}
        <div ref={servicesGridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {services.map((service) => (
            <div 
              key={service.id}
              className="service-card group"
            >
              {/* Service Card */}
              <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8 h-full transition-all duration-500 group-hover:bg-white/10 group-hover:border-white/20 group-hover:scale-105 group-hover:-translate-y-2">
                
                {/* Icon */}
                <div className="w-16 h-16 md:w-20 md:h-20 bg-[var(--color-electric-blue)]/20 rounded-xl flex items-center justify-center text-[var(--color-mint-cyan)] mb-6 md:mb-8 group-hover:bg-[var(--color-electric-blue)]/30 transition-all duration-300 mx-auto">
                  {service.icon}
                </div>
                
                {/* Content */}
                <div className="text-center">
                  <h3 className="text-lg md:text-xl xl:text-2xl font-gilroy font-bold text-white mb-3 md:mb-4 leading-tight">
                    {service.title}
                  </h3>
                  
                  <p className="text-white/70 font-neue-montreal leading-relaxed text-sm md:text-base">
                    {service.description}
                  </p>
                </div>

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[var(--color-electric-blue)]/5 to-[var(--color-mint-cyan)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Background decorative elements */}
      <div className="absolute top-20 left-10 w-2 h-2 bg-[var(--color-mint-cyan)] rounded-full opacity-60"></div>
      <div className="absolute bottom-32 right-16 w-3 h-3 bg-[var(--color-electric-blue)] rounded-full opacity-40"></div>
      <div className="absolute top-1/2 left-1/4 w-1 h-1 bg-white rounded-full opacity-30"></div>
      <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-[var(--color-mint-cyan)] rounded-full opacity-50"></div>
    </motion.section>
  )
}