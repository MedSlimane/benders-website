'use client'

import { useRef, useState, useMemo } from "react"
import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { motion } from "framer-motion"

// Register GSAP plugins just once
gsap.registerPlugin(ScrollTrigger)

// TYPES ------------------------------------------------------
interface Service {
  title: string
  description: string
  /* High-level category used for filtering (e.g. "Brand", "Web", ...) */
  category: string
  /* Small tag shown top-right on the card (can be empty) */
  tag?: string
  /* Image URL – can be local (public/...) or remote. */
  image: string
}

interface ServicesProps {
  loading: boolean
}

// DATA -------------------------------------------------------
const services: Service[] = [
  {
    title: "Brand Mission & Services",
    description:
      "Strategic brand development and comprehensive service planning to define your brand's core identity and market positioning.",
    category: "Brand",
    tag: "B2B",
    image: "https://images.unsplash.com/photo-1529612700005-0aa055b16109?auto=format&fit=crop&w=934&q=80",
  },
  {
    title: "Branding & Logo Design",
    description:
      "Custom logo design and complete brand identity systems that capture your brand's essence and resonate with your audience.",
    category: "Brand",
    tag: "B2B",
    image: "https://images.unsplash.com/photo-1507149833265-60c372daea22?auto=format&fit=crop&w=934&q=80",
  },
  {
    title: "Video Production & VFX",
    description:
      "Professional video content creation with cutting-edge visual effects to tell your brand story with cinematic quality.",
    category: "Content",
    tag: "B2C",
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=934&q=80",
  },
  {
    title: "Website Development",
    description:
      "Modern, responsive websites built with the latest technologies to deliver exceptional user experiences and drive conversions.",
    category: "Web",
    tag: "B2B",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=934&q=80",
  },
  {
    title: "Social Media Management",
    description:
      "Complete social media strategy and management to build your community and engage with your audience across all platforms.",
    category: "Marketing",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=934&q=80",
  },
  {
    title: "Paid Advertising",
    description:
      "Strategic Meta & Google Ads campaigns optimized for maximum ROI and targeted reach to grow your business effectively.",
    category: "Marketing",
    image: "https://images.unsplash.com/photo-1555465301-9e78153191a2?auto=format&fit=crop&w=934&q=80",
  },
  {
    title: "Copywriting & Content Strategy",
    description:
      "Compelling copy and strategic content planning that converts readers into customers and builds lasting brand connections.",
    category: "Content",
    tag: "B2B",
    image: "https://images.unsplash.com/photo-1529078155058-5d716f45d604?auto=format&fit=crop&w=934&q=80",
  },
  {
    title: "Influencer Content & Brand Building",
    description:
      "Authentic influencer partnerships and brand building strategies that amplify your reach and establish market authority.",
    category: "Content",
    image: "https://images.unsplash.com/photo-1573166364524-2f6ff90f2df2?auto=format&fit=crop&w=934&q=80",
  },
]

const categories = ["All", "Brand", "Web", "Content", "Marketing"]

// COMPONENT --------------------------------------------------
export default function Services({ loading }: ServicesProps) {
  /* Filtering logic */
  const [activeCat, setActiveCat] = useState<string>("All")
  const filteredServices = useMemo(() => {
    if (activeCat === "All") return services
    return services.filter((s) => s.category === activeCat)
  }, [activeCat])

  /* Refs used by GSAP */
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  // ANIMATIONS ----------------------------------------------
  useGSAP(
    () => {
      const cards = cardsRef.current?.querySelectorAll(".service-card")

      gsap.set([headerRef.current, cards || []], { opacity: 0, y: 30 })
      if (loading) return

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      })

      tl.to(headerRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
      }).to(
        cards || [],
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
        },
        "-=0.4",
      )
    },
    { scope: sectionRef, dependencies: [loading, activeCat] },
  )

  return (
    <motion.section
      ref={sectionRef}
      className="relative w-full py-20 md:py-32 overflow-hidden"
      style={{ opacity: loading ? 0 : 1, visibility: loading ? "hidden" : "visible" }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
    >
      <div className="container mx-auto px-6 md:px-16">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-12 md:mb-20">
          <h2 className="text-4xl md:text-6xl font-gilroy font-bold text-white mb-6 leading-tight">
            Explore Our <span className="italic text-gradient-secondary">Services</span>
          </h2>
          <p className="text-lg md:text-xl font-neue-montreal text-white/80 max-w-3xl mx-auto leading-relaxed">
            Comprehensive digital solutions designed to elevate your brand and drive measurable results.
          </p>
        </div>

        {/* FILTER BAR */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-10 select-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCat(cat)}
              className={`px-4 py-1.5 rounded-md text-sm md:text-base font-medium font-neue-montreal transition-colors duration-200 ${
                activeCat === cat
                  ? "bg-gradient-primary text-white"
                  : "bg-white/10 hover:bg-white/20 text-white/70"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* MASONRY GRID */}
        <div
          ref={cardsRef}
          className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6"
        >
          {filteredServices.map((service, index) => (
            <div
              key={index}
              className="service-card relative mb-6 break-inside-avoid overflow-hidden rounded-2xl group cursor-pointer hover:scale-[1.02] transition-transform duration-500"
            >
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              {/* TAG TOP-RIGHT */}
              {service.tag && (
                <span className="absolute top-2 right-2 bg-white/90 text-black text-xs font-semibold px-2 py-0.5 rounded-md">
                  {service.tag}
                </span>
              )}

              {/* TITLE & DESCRIPTION */}
              <div className="absolute bottom-4 left-4 pr-4">
                <h3 className="text-lg font-gilroy font-bold text-white mb-1 leading-snug">
                  {service.title}
                </h3>
                <p className="text-sm font-neue-montreal text-white/80 line-clamp-3 max-w-xs">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative dots (kept from previous version) */}
      <div className="absolute top-20 left-10 w-2 h-2 bg-[var(--color-mint-cyan)] rounded-full opacity-60"></div>
      <div className="absolute bottom-32 right-16 w-3 h-3 bg-[var(--color-electric-blue)] rounded-full opacity-40"></div>
      <div className="absolute top-1/2 left-1/4 w-1 h-1 bg-white rounded-full opacity-30"></div>
    </motion.section>
  )
} 