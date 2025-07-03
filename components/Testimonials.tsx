"use client"
import { useRef, useEffect } from "react"
import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { motion } from "framer-motion"

gsap.registerPlugin(ScrollTrigger)

interface Testimonial {
  id: number
  name: string
  handle: string
  avatar: string
  content: string
  platform: 'twitter' | 'instagram' | 'linkedin'
  verified?: boolean
  likes?: number
  time?: string
}

interface TestimonialsProps {
  loading: boolean
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Mohamed Amine Gharbi",
    handle: "mohamed_amine_gharbi",
    avatar: "/api/placeholder/40/40",
    content: "Working with Benders was a fantastic experience. As VFX artists, their skills are top-tier, and as filmmakers, they know how to tell a story that resonates. The team has a rare combination of technical ability and artistic vision that makes every project they touch better than you could ever imagine. Highly recommended!",
    platform: "instagram",
    verified: true
  },
  {
    id: 2,
    name: "Zied Grombali",
    handle: "zied_grombali",
    avatar: "/api/placeholder/40/40",
    content: "I've worked with many filmmakers and VFX artists, but Benders' approach was refreshingly different. They listen intently to your vision and then enhance it in ways you never expected. Their work not only meets the brief but often exceeds it. I will definitely be collaborating with them again in the future.",
    platform: "instagram",
    verified: true
  },
  {
    id: 3,
    name: "Aziz Mbarek",
    handle: "aziz_mbarek",
    avatar: "/api/placeholder/40/40",
    content: "We hired Benders for a commercial project, and their expertise in both filmmaking and VFX was evident from start to finish. The creative ideas they brought to the table were beyond our expectations, and the final piece truly stood out. Their attention to detail, coupled with their technical know-how, made them a valuable asset to our team.",
    platform: "instagram",
    verified: true
  },
  {
    id: 4,
    name: "Ahmed Amraoui",
    handle: "ahmed_amraoui",
    avatar: "/api/placeholder/40/40",
    content: "Working with Benders was a game-changer for our brand. Their cinematic approach and VFX expertise turned our simple concept into a visually stunning masterpiece that left our audience in awe.",
    platform: "instagram",
    verified: true
  },
  {
    id: 5,
    name: "Emna Sadfii",
    handle: "emna_sadfii",
    avatar: "/api/placeholder/40/40",
    content: "Benders' eye for detail and ability to blend VFX seamlessly into the narrative is unmatched. They don't just edit — they craft an experience that feels alive and powerful.",
    platform: "instagram",
    verified: true
  },
  {
    id: 6,
    name: "Seif Eddine Bayaa",
    handle: "seif_eddine_bayaa",
    avatar: "/api/placeholder/40/40",
    content: "Benders captured the soul of our event perfectly. The teaser they crafted wasn't just a highlight reel — it was an experience. Their edits amplified the energy and excitement, making viewers feel like they were right there with us, reliving the moment.",
    platform: "instagram",
    verified: true
  },
  {
    id: 7,
    name: "Foued Rouchka",
    handle: "foued_rouchka",
    avatar: "/api/placeholder/40/40",
    content: "I gave Benders a rough idea, and they transformed it into a high-energy, mind-blowing visual that boosted my engagement like crazy. They're magicians with the camera and effects!",
    platform: "instagram",
    verified: true
  }
]

const getPlatformUrl = (platform: string, handle: string) => {
  switch (platform) {
    case 'twitter':
      return `https://twitter.com/${handle}`
    case 'instagram':
      return `https://instagram.com/${handle}`
    case 'linkedin':
      return `https://linkedin.com/in/${handle}` // Placeholder, might need adjustment
    default:
      return '#'
  }
}

const PlatformIcon = ({ platform }: { platform: string }) => {
  const iconClass = "w-4 h-4 fill-current"
  
  switch (platform) {
    case 'twitter':
      return (
        <svg className={iconClass} viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
        </svg>
      )
    case 'instagram':
      return (
        <svg className={iconClass} viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      )
    case 'linkedin':
      return (
        <svg className={iconClass} viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      )
    default:
      return null
  }
}

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => {
  const url = getPlatformUrl('instagram', testimonial.handle)
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col flex-shrink-0 w-80 bg-white rounded-xl p-6 shadow-lg border border-gray-100 mx-4 h-full transition-transform hover:scale-105 focus:scale-105 outline-none"
      tabIndex={0}
      aria-label={`View ${testimonial.name}'s Instagram profile`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-pink-400 to-yellow-500"></div>
            </div>
            {testimonial.verified && (
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-pink-500 rounded-full flex items-center justify-center">
                <svg className="w-2.5 h-2.5 text-white fill-current" viewBox="0 0 20 20">
                  <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                </svg>
              </div>
            )}
          </div>
          <div>
            <div className="font-bold text-gray-900 text-sm">{testimonial.name}</div>
            <div className="text-gray-500 text-xs">@{testimonial.handle}</div>
          </div>
        </div>
        <PlatformIcon platform="instagram" />
      </div>

      {/* Content */}
      <div className="flex-grow text-gray-800 text-sm leading-relaxed mb-4 font-neue-montreal">
        {testimonial.content}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-gray-500 text-xs">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4 text-red-500 fill-current" viewBox="0 0 20 20">
              <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"/>
            </svg>
            <span>{testimonial.likes}</span>
          </div>
        </div>
        <div>{testimonial.time}</div>
      </div>
    </a>
  )
}

const Testimonials = ({ loading }: TestimonialsProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const carouselRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)

  useGSAP(() => {
    // Title animation
    gsap.set(titleRef.current, { opacity: 0, y: 30 })
    
    if (loading) return

    const titleTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    })

    titleTl.to(titleRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out"
    })

    // Cards animation
    const cards = carouselRef.current?.querySelectorAll('.testimonial-card')
    if (cards) {
      gsap.set(cards, { opacity: 0, y: 50 })
      
      gsap.to(cards, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: carouselRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      })
    }
  }, { scope: containerRef, dependencies: [loading] })

  useEffect(() => {
    const carousel = carouselRef.current
    if (!carousel) return

    // Auto-scroll animation
    const totalWidth = testimonials.length * 320 // card width + margin
    const animationDuration = testimonials.length * 3 // 3 seconds per card

    const autoScroll = gsap.to(carousel, {
      x: -totalWidth,
      duration: animationDuration,
      ease: "none",
      repeat: -1,
      repeatDelay: 1
    })

    const pauseAnimation = () => autoScroll.pause()
    const resumeAnimation = () => autoScroll.resume()

    carousel.addEventListener('mouseenter', pauseAnimation)
    carousel.addEventListener('mouseleave', resumeAnimation)

    return () => {
      autoScroll.kill()
      if (carousel) {
        carousel.removeEventListener('mouseenter', pauseAnimation)
        carousel.removeEventListener('mouseleave', resumeAnimation)
      }
    }
  }, [])

  return (
    <motion.section 
      ref={containerRef} 
      className="py-16 md:py-24 overflow-hidden" 
      style={{ opacity: loading ? 0 : 1, visibility: loading ? 'hidden' : 'visible' }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.7 }}
    >
      <div className="container mx-auto px-6 md:px-16">
        <h2 
          ref={titleRef}
          className="text-3xl md:text-5xl font-gilroy font-bold text-center text-white mb-12"
        >
          What Our Clients Say
        </h2>
        
        <div className="relative">
          <div 
            ref={carouselRef}
            className="flex items-stretch"
            style={{ width: `${testimonials.length * 320 * 2}px` }}
          >
            {/* First set */}
            {testimonials.map((testimonial) => (
              <div key={`first-${testimonial.id}`} className="testimonial-card">
                <TestimonialCard testimonial={testimonial} />
              </div>
            ))}
            {/* Duplicate set for seamless loop */}
            {testimonials.map((testimonial) => (
              <div key={`second-${testimonial.id}`} className="testimonial-card">
                <TestimonialCard testimonial={testimonial} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  )
}

export default Testimonials 