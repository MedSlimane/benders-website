'use client'

import { useRef } from "react"
import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { motion } from "framer-motion"
import Image from "next/image"

gsap.registerPlugin(ScrollTrigger)

interface Service {
  title: string
  description: string
  iconName: string
  videoSrc?: string
  imageSrc?: string
}

interface ServicesProps {
  loading: boolean
}

const services: Service[] = [
  {
    title: "Brand Mission & Services",
    description: "Strategic brand development and comprehensive service planning to define your brand's core identity and market positioning.",
    iconName: "mission",
    imageSrc: "/bending.png"
  },
  {
    title: "Branding & Logo Design",
    description: "Custom logo design and complete brand identity systems that capture your brand's essence and resonate with your audience.",
    iconName: "branding",
    imageSrc: "/logos.jpeg"
  },
  {
    title: "Video Production & VFX",
    description: "Professional video content creation with cutting-edge visual effects to tell your brand story with cinematic quality.",
    iconName: "video",
    videoSrc: "/videos/itel.mp4"
  },
  {
    title: "Website Development",
    description: "Modern, responsive websites built with the latest technologies to deliver exceptional user experiences and drive conversions.",
    iconName: "web",
    imageSrc: "/web.jpeg"
  },
  {
    title: "Social Media Management",
    description: "Complete social media strategy and management to build your community and engage with your audience across all platforms.",
    iconName: "social",
    imageSrc: "/managment.jpeg"
  },
  {
    title: "Paid Advertising",
    description: "Strategic Meta & Google Ads campaigns optimized for maximum ROI and targeted reach to grow your business effectively.",
    iconName: "ads",
    imageSrc: "/advertising.jpeg"
  },
  {
    title: "Copywriting & Content Strategy",
    description: "Compelling copy and strategic content planning that converts readers into customers and builds lasting brand connections.",
    iconName: "copy",
    imageSrc: "/copywriting.jpg"
  },
  {
    title: "Influencer Content & Brand Building",
    description: "Authentic influencer partnerships and brand building strategies that amplify your reach and establish market authority.",
    iconName: "influencer",
    imageSrc: "/influencer.jpeg"
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
      className="relative overflow-hidden w-full" 
      style={{ opacity: loading ? 0 : 1, visibility: loading ? 'hidden' : 'visible' }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
    >
      <div className="container mx-auto px-6 md:px-16">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16 md:mb-24">
          
          <h2 className="text-4xl md:text-6xl font-gilroy font-bold text-white mb-6 max-w-5xl mx-auto leading-tight">
            Our <span className="italic text-gradient-secondary">comprehensive</span><br />
            digital solutions.
          </h2>
          
          <p className="text-lg md:text-xl font-neue-montreal text-white/80 max-w-3xl mx-auto leading-relaxed">
            Comprehensive digital solutions designed to elevate your brand and drive measurable results across every touchpoint of your customer journey.
          </p>
        </div>

        {/* Services Grid – Masonry style */}
        <div
          ref={cardsRef}
          className="grid grid-flow-dense auto-rows-[180px] sm:auto-rows-[220px] md:auto-rows-[250px] grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
        >
          {services.map((service, index) => {
            // Add some variety to the card sizes – adjust as desired
            const spanClass =
               (() => {
                 switch (index) {
                   case 0:
                     return "col-span-2 row-span-2";
                   case 1:
                     return "col-span-1";
                   case 2:
                     return "row-span-2";
                   case 3:
                     return "col-span-1";
                   case 4:
                     return "col-span-1";
                   case 5:
                     return "col-span-1";
                   case 6:
                     return "col-span-1";
                   default:
                     return "col-span-1";
                 }
               })()

            return (
              <div
                key={index}
                className={`service-card group relative overflow-hidden rounded-2xl ${spanClass}`}
              >
                {/* Background media */}
                {service.videoSrc ? (
                  <video
                    src={service.videoSrc}
                    autoPlay
                    loop
                    muted
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : service.imageSrc ? (
                  <Image
                    src={service.imageSrc}
                    alt={service.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/10" />
                )}

                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300" />
                
                {/* Glow effect on hover */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-2xl shadow-[var(--color-electric-blue)]/50 group-hover:shadow-[var(--color-electric-blue)]/80" />

                {/* Title overlay */}
                <div className="absolute bottom-4 left-4 right-4 z-10">
                  <h3 className="font-neue-montreal font-medium text-lg md:text-xl text-white drop-shadow-lg">
                    {service.title}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Background decorative elements */}
      <div className="absolute top-20 left-10 w-2 h-2 bg-[var(--color-mint-cyan)] rounded-full opacity-60"></div>
      <div className="absolute bottom-32 right-16 w-3 h-3 bg-[var(--color-electric-blue)] rounded-full opacity-40"></div>
      <div className="absolute top-1/2 left-1/4 w-1 h-1 bg-white rounded-full opacity-30"></div>
    </motion.section>
  )
} 