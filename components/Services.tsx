'use client'

import { useRef } from "react"
import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { motion } from "framer-motion"

gsap.registerPlugin(ScrollTrigger)

interface Service {
  title: string
  description: string
  iconName: string
}

interface ServicesProps {
  loading: boolean
}

const services: Service[] = [
  {
    title: "Brand Mission & Services",
    description: "Strategic brand development and comprehensive service planning to define your brand's core identity and market positioning.",
    iconName: "mission"
  },
  {
    title: "Branding & Logo Design",
    description: "Custom logo design and complete brand identity systems that capture your brand's essence and resonate with your audience.",
    iconName: "branding"
  },
  {
    title: "Video Production & VFX",
    description: "Professional video content creation with cutting-edge visual effects to tell your brand story with cinematic quality.",
    iconName: "video"
  },
  {
    title: "Website Development",
    description: "Modern, responsive websites built with the latest technologies to deliver exceptional user experiences and drive conversions.",
    iconName: "web"
  },
  {
    title: "Social Media Management",
    description: "Complete social media strategy and management to build your community and engage with your audience across all platforms.",
    iconName: "social"
  },
  {
    title: "Paid Advertising",
    description: "Strategic Meta & Google Ads campaigns optimized for maximum ROI and targeted reach to grow your business effectively.",
    iconName: "ads"
  },
  {
    title: "Copywriting & Content Strategy",
    description: "Compelling copy and strategic content planning that converts readers into customers and builds lasting brand connections.",
    iconName: "copy"
  },
  {
    title: "Influencer Content & Brand Building",
    description: "Authentic influencer partnerships and brand building strategies that amplify your reach and establish market authority.",
    iconName: "influencer"
  }
]

export default function Services({ loading }: ServicesProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const cards = cardsRef.current?.querySelectorAll('.service-card')
      
      // Set initial states
      gsap.set([headerRef.current, cards || []], {
        opacity: 0,
        y: 30,
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
      .to(cards || [], {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
      }, "-=0.4")
    },
    { scope: sectionRef, dependencies: [loading] }
  )

  return (
    <motion.section 
      ref={sectionRef} 
      className="relative overflow-hidden w-full py-20 md:py-32" 
      style={{ opacity: loading ? 0 : 1, visibility: loading ? 'hidden' : 'visible' }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
    >
      <div className="container mx-auto px-6 md:px-16">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16 md:mb-24">
          <div className="inline-block bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-8">
            <span className="text-[var(--color-mint-cyan)] font-neue-montreal font-medium text-sm">
              Services
            </span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-gilroy font-bold text-white mb-6 max-w-5xl mx-auto leading-tight">
            Our <span className="italic text-gradient-secondary">comprehensive</span><br />
            digital solutions.
          </h2>
          
          <p className="text-lg md:text-xl font-neue-montreal text-white/80 max-w-3xl mx-auto leading-relaxed">
            Comprehensive digital solutions designed to elevate your brand and drive measurable results across every touchpoint of your customer journey.
          </p>
        </div>

        {/* Services Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-12">
          {services.map((service, index) => (
            <div
              key={index}
              className="service-card group relative p-6 rounded-2xl backdrop-blur-md bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-electric-blue/20"
            >
              {/* Icon Placeholder */}
              <div className="w-12 h-12 mb-4 rounded-xl bg-gradient-primary flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <div className="w-6 h-6 bg-white/90 rounded" />
              </div>

              {/* Content */}
              <h3 className="font-neue-montreal font-medium text-lg text-white mb-3 group-hover:text-gradient-secondary transition-all duration-300">
                {service.title}
              </h3>
              
              <p className="font-gilroy text-sm text-white/70 leading-relaxed group-hover:text-white/90 transition-colors duration-300">
                {service.description}
              </p>

              {/* Hover Effect Border */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-primary opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none" />
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="inline-block p-8 rounded-3xl backdrop-blur-md bg-white/5 border border-white/10">
            <h3 className="font-neue-montreal font-bold text-2xl md:text-3xl text-gradient mb-4">
              Ready to Transform Your Brand?
            </h3>
            <p className="font-gilroy text-white/80 mb-6 max-w-lg mx-auto">
              Let&apos;s discuss how our comprehensive services can elevate your brand to the next level.
            </p>
            <button className="inline-flex items-center px-8 py-4 rounded-full bg-gradient-primary hover:scale-105 transition-all duration-300 font-gilroy font-medium text-white hover:shadow-lg hover:shadow-electric-blue/30">
              Get Started Today
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
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