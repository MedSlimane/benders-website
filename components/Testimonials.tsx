"use client"
import { useRef, useEffect, useState } from "react"
import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"

gsap.registerPlugin(ScrollTrigger)

interface Testimonial {
  id: number
  name: string
  handle: string
  avatar: string
  content: string
  role?: string
}

interface TestimonialsProps {
  loading: boolean
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Mohamed Amine Gharbi",
    handle: "transformini_24",
    avatar: "/testo/mouhamed.jpg",
    content: "Working with Benders was a fantastic experience. Their skills are top-tier, and they know how to tell a story that resonates. Highly recommended!",
    role: "Filmmaker"
  },
  {
    id: 2,
    name: "Zied Grombali",
    handle: "ziedgrombali",
    avatar: "/testo/zied.jpg",
    content: "Benders' approach was refreshingly different. They listen intently to your vision and then enhance it in ways you never expected.",
    role: "Creative Director"
  },
  {
    id: 3,
    name: "Aziz Mbarek",
    handle: "mahfelroom",
    avatar: "/testo/aziz.jpg",
    content: "Their expertise in both filmmaking and VFX was evident from start to finish. The creative ideas they brought were beyond our expectations.",
    role: "Brand Manager"
  },
  {
    id: 4,
    name: "Ahmed Amraoui",
    handle: "gameworld.tn",
    avatar: "/testo/ahmed.jpg",
    content: "Working with Benders was a game-changer for our brand. Their cinematic approach turned our concept into a visually stunning masterpiece.",
    role: "Entrepreneur"
  },
  {
    id: 5,
    name: "Emna Sadfii",
    handle: "emnasadfii",
    avatar: "/testo/emna.jpg",
    content: "Benders' eye for detail and ability to blend VFX seamlessly into the narrative is unmatched. They craft experiences that feel alive.",
    role: "Content Creator"
  },
  {
    id: 6,
    name: "Seif Eddine Bayaa",
    handle: "seifeddinebayaa",
    avatar: "/testo/seif.jpeg",
    content: "Benders captured the soul of our event perfectly. The teaser they crafted wasn't just a highlight reel — it was an experience.",
    role: "Event Organizer"
  },
  {
    id: 7,
    name: "Foued Rouchka",
    handle: "foued_rouchka",
    avatar: "/testo/foued.jpeg",
    content: "I gave Benders a rough idea, and they transformed it into a high-energy, mind-blowing visual. They're magicians with the camera!",
    role: "Influencer"
  }
]

// Split testimonials into two rows
const row1Testimonials = testimonials.filter((_, i) => i % 2 === 0)
const row2Testimonials = testimonials.filter((_, i) => i % 2 === 1)

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => {
  return (
    <a
      href={`https://instagram.com/${testimonial.handle}`}
      target="_blank"
      rel="noopener noreferrer"
      className="testimonial-card group relative flex flex-col flex-shrink-0 w-[280px] md:w-[340px] p-5 md:p-6 mx-2 md:mx-3 rounded-2xl cursor-pointer transition-all duration-500 hover:scale-[1.02]"
      style={{
        background: "rgba(255, 255, 255, 0.03)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.05)",
      }}
    >
      {/* Hover glow effect */}
      <div 
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: "radial-gradient(circle at 50% 0%, rgba(45, 230, 199, 0.15) 0%, transparent 60%)",
        }}
      />

      {/* Quote icon */}
      <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-40 transition-opacity duration-300">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-[#2de6c7]">
          <path d="M11 7H7C5.89543 7 5 7.89543 5 9V13C5 14.1046 5.89543 15 7 15H9C9 16.6569 7.65685 18 6 18V20C8.76142 20 11 17.7614 11 15V7Z" fill="currentColor"/>
          <path d="M21 7H17C15.8954 7 15 7.89543 15 9V13C15 14.1046 15.8954 15 17 15H19C19 16.6569 17.6569 18 16 18V20C18.7614 20 21 17.7614 21 15V7Z" fill="currentColor"/>
        </svg>
      </div>

      {/* Content */}
      <p className="relative z-10 text-white/80 text-sm md:text-base leading-relaxed mb-6 font-neue-montreal flex-grow">
        &ldquo;{testimonial.content}&rdquo;
      </p>

      {/* Author */}
      <div className="relative z-10 flex items-center gap-3 pt-4 border-t border-white/10">
        <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden ring-2 ring-white/10 group-hover:ring-[#2de6c7]/30 transition-all duration-300">
          <Image
            src={testimonial.avatar}
            alt={testimonial.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex-1">
          <h4 className="font-gilroy font-semibold text-white text-sm md:text-base">
            {testimonial.name}
          </h4>
          <p className="text-white/50 text-xs md:text-sm">
            {testimonial.role}
          </p>
        </div>
        {/* Instagram icon */}
        <div className="text-white/30 group-hover:text-[#2de6c7] transition-colors duration-300">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
        </div>
      </div>
    </a>
  )
}

const Testimonials = ({ loading }: TestimonialsProps) => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const row1Ref = useRef<HTMLDivElement>(null)
  const row2Ref = useRef<HTMLDivElement>(null)
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
    if (!title) return

    // Set initial states
    gsap.set(title, { opacity: 0, y: 50 })
    gsap.set(".testimonial-card", { opacity: 0, y: 40, scale: 0.95 })

    // Scroll-triggered animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "top 40%",
        scrub: 1,
      }
    })

    tl.to(title, { opacity: 1, y: 0, duration: 0.4 })
      .to(".testimonial-card", { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        stagger: 0.05,
        duration: 0.3 
      }, "-=0.2")

  }, { scope: sectionRef, dependencies: [loading] })

  // Auto-scroll carousels - Row 1 goes left, Row 2 goes right
  useEffect(() => {
    if (loading || !row1Ref.current || !row2Ref.current) return

    const row1 = row1Ref.current
    const row2 = row2Ref.current
    const cardWidth = isMobile ? 296 : 364 // card width + margin
    const row1Width = row1Testimonials.length * cardWidth
    const row2Width = row2Testimonials.length * cardWidth

    // Row 1: Continuous scroll left using modifiers for seamless loop
    const autoScroll1 = gsap.to(row1, {
      x: `-=${row1Width}`,
      duration: row1Testimonials.length * 6,
      ease: "none",
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize((x: number) => {
          return parseFloat(String(x)) % row1Width
        })
      }
    })

    // Row 2: Continuous scroll right
    const autoScroll2 = gsap.to(row2, {
      x: `+=${row2Width}`,
      duration: row2Testimonials.length * 6,
      ease: "none",
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize((x: number) => {
          const val = parseFloat(String(x)) % row2Width
          return val - row2Width
        })
      }
    })

    // Pause on hover
    const handleMouseEnter1 = () => autoScroll1.pause()
    const handleMouseLeave1 = () => autoScroll1.resume()
    const handleMouseEnter2 = () => autoScroll2.pause()
    const handleMouseLeave2 = () => autoScroll2.resume()

    row1.addEventListener("mouseenter", handleMouseEnter1)
    row1.addEventListener("mouseleave", handleMouseLeave1)
    row2.addEventListener("mouseenter", handleMouseEnter2)
    row2.addEventListener("mouseleave", handleMouseLeave2)

    return () => {
      autoScroll1.kill()
      autoScroll2.kill()
      row1.removeEventListener("mouseenter", handleMouseEnter1)
      row1.removeEventListener("mouseleave", handleMouseLeave1)
      row2.removeEventListener("mouseenter", handleMouseEnter2)
      row2.removeEventListener("mouseleave", handleMouseLeave2)
    }
  }, [loading, isMobile])

  return (
    <section ref={sectionRef} className="relative py-16 md:py-24 overflow-hidden">
      {/* Header */}
      <div className="text-center mb-10 md:mb-14 px-4">
        <h2 
          ref={titleRef}
          className="font-gilroy font-bold text-3xl md:text-5xl lg:text-6xl text-white uppercase tracking-tight"
        >
          Client Feedback
        </h2>
      </div>

      {/* Carousels Container */}
      <div className="flex flex-col gap-4 md:gap-6">
        {/* Row 1 - Scrolls Left */}
        <div className="overflow-hidden">
          <div 
            ref={row1Ref}
            className="flex items-stretch"
            style={{ width: `${row1Testimonials.length * 2 * (isMobile ? 296 : 364)}px` }}
          >
            {/* First set */}
            {row1Testimonials.map((testimonial) => (
              <TestimonialCard key={`r1-first-${testimonial.id}`} testimonial={testimonial} />
            ))}
            {/* Duplicate for seamless loop */}
            {row1Testimonials.map((testimonial) => (
              <TestimonialCard key={`r1-second-${testimonial.id}`} testimonial={testimonial} />
            ))}
          </div>
        </div>

        {/* Row 2 - Scrolls Right (Desktop only, on mobile it's single row) */}
        <div className={`overflow-hidden ${isMobile ? 'hidden' : 'block'}`}>
          <div 
            ref={row2Ref}
            className="flex items-stretch"
            style={{ width: `${row2Testimonials.length * 2 * 364}px` }}
          >
            {/* First set */}
            {row2Testimonials.map((testimonial) => (
              <TestimonialCard key={`r2-first-${testimonial.id}`} testimonial={testimonial} />
            ))}
            {/* Duplicate for seamless loop */}
            {row2Testimonials.map((testimonial) => (
              <TestimonialCard key={`r2-second-${testimonial.id}`} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials
