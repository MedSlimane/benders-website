'use client'

import { useRef, useState } from "react"
import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { motion, AnimatePresence } from "framer-motion"

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
    videoSrc: "/videos/sample.mp4"
  },
  {
    title: "Branding & Logo Design",
    description: "Custom logo design and complete brand identity systems that capture your brand's essence and resonate with your audience.",
    iconName: "branding",
    imageSrc: "/Benders-logo/png/1@2x.png"
  },
  {
    title: "Video Production & VFX",
    description: "Professional video content creation with cutting-edge visual effects to tell your brand story with cinematic quality.",
    iconName: "video",
    videoSrc: "/videos/mongela.mp4"
  },
  {
    title: "Website Development",
    description: "Modern, responsive websites built with the latest technologies to deliver exceptional user experiences and drive conversions.",
    iconName: "web",
    imageSrc: "/Benders-logo/png/1@2x.png"
  },
  {
    title: "Social Media Management",
    description: "Complete social media strategy and management to build your community and engage with your audience across all platforms.",
    iconName: "social",
    imageSrc: "/Benders-logo/png/1@2x.png"
  },
  {
    title: "Paid Advertising",
    description: "Strategic Meta & Google Ads campaigns optimized for maximum ROI and targeted reach to grow your business effectively.",
    iconName: "ads",
    imageSrc: "/Benders-logo/png/1@2x.png"
  },
  {
    title: "Copywriting & Content Strategy",
    description: "Compelling copy and strategic content planning that converts readers into customers and builds lasting brand connections.",
    iconName: "copy",
    imageSrc: "/Benders-logo/png/1@2x.png"
  },
  {
    title: "Influencer Content & Brand Building",
    description: "Authentic influencer partnerships and brand building strategies that amplify your reach and establish market authority.",
    iconName: "influencer",
    imageSrc: "/Benders-logo/png/1@2x.png"
  }
]

export default function Services({ loading }: ServicesProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const [activeService, setActiveService] = useState<Service | null>(null)

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

        {/* Services Grid – Masonry style */}
        <div
          ref={cardsRef}
          className="grid grid-flow-dense auto-rows-[180px] sm:auto-rows-[220px] md:auto-rows-[250px] grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
        >
          {services.map((service, index) => {
            // Add some variety to the card sizes – adjust as desired
            const spanClass =
              index  === 0
                ? "md:col-span-2 md:row-span-2"
                : index % 5 === 0
                ? "md:col-span-2"
                : index % 3 === 0
                ? "md:col-span-1"
                : "md:col-span-1";

            return (
              <div
                key={index}
                className={`service-card group relative overflow-hidden rounded-2xl cursor-pointer ${spanClass}`}
                onClick={() => setActiveService(service)}
              >
                {/* Background layer – swap for an actual image / icon if available */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/10 group-hover:scale-105 transition-transform duration-500" />

                {/* Title overlay */}
                <div className="absolute bottom-4 left-4 right-4 z-10">
                  <h3 className="font-neue-montreal font-medium text-lg md:text-xl text-white drop-shadow-lg">
                    {service.title}
                  </h3>
                </div>

                {/* Optional description on hover */}
                <div className="absolute inset-0 flex items-center justify-center text-center px-8 opacity-0 group-hover:opacity-100 bg-black/60 transition-opacity duration-500">
                  <p className="font-gilroy text-sm md:text-base text-white leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            );
          })}
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

      {/* Full-screen modal */}
      <AnimatePresence>
        {activeService && (
          <motion.div
            key="service-modal"
            className="fixed inset-0 z-[1000] flex items-center justify-center  backdrop-blur-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative w-full h-full md:w-5/6 md:h-4/5 flex flex-col md:flex-row overflow-hidden"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 120, damping: 16 }}
            >
              {/* Close button */}
              <button
                className="absolute top-4 right-4 z-20 text-white hover:text-[var(--color-mint-cyan)] transition-colors"
                onClick={() => setActiveService(null)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-7 h-7"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Text section */}
              <div className="md:w-1/2 w-full h-1/2 md:h-full p-8 md:p-12 flex items-center justify-center gradient-primary">
                <div className="max-w-lg text-center md:text-left">
                  <h2 className="font-gilroy text-3xl md:text-4xl text-white mb-6 drop-shadow-lg">
                    {activeService.title}
                  </h2>
                  <p className="font-neue-montreal text-lg text-white/80 leading-relaxed">
                    {activeService.description}
                  </p>
                </div>
              </div>

              {/* Media section */}
              <div className="md:w-1/2 w-full h-auto md:h-full flex items-center justify-center bg-black/20 p-4">
                {/* Preserve media aspect ratio */}
                {activeService.videoSrc ? (
                  <video
                    src={activeService.videoSrc}
                    autoPlay
                    loop
                    muted
                    controls
                    className="max-w-full max-h-full w-auto h-auto object-contain"
                  />
                ) : (
                  <img
                    src={activeService.imageSrc || ""}
                    alt={activeService.title}
                    className="max-w-full max-h-full w-auto h-auto object-contain"
                  />
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  )
} 