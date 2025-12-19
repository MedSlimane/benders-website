"use client"
import { useRef, useEffect, useState } from "react"
import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"

interface WorkSectionProps {
  loading: boolean
}

interface Project {
  id: number
  title: string
  subtitle: string
  image: string
  size: "large" | "small"
}

const projects: Project[] = [
  {
    id: 1,
    title: "ITEL",
    subtitle: "Brand Identity",
    image: "/advertising.jpeg",
    size: "small",
  },
  {
    id: 2,
    title: "RIHA",
    subtitle: "Web Design",
    image: "/influencer.jpeg",
    size: "large",
  },
  {
    id: 3,
    title: "GAMEWORLD",
    subtitle: "Digital Campaign",
    image: "/web.jpeg",
    size: "small",
  },
  {
    id: 4,
    title: "ABTAL",
    subtitle: "Brand Strategy",
    image: "/copywriting.jpg",
    size: "large",
  },
]

// Large card component with blurred background and noise texture
const LargeCard = ({ project, cardRef }: { project: Project; cardRef: React.RefObject<HTMLDivElement | null> }) => {
  const blurRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!blurRef.current || !cardRef.current) return

    // Blur becomes more visible as card scrolls out of view
    gsap.fromTo(
      blurRef.current,
      { opacity: 0.6 },
      {
        opacity: 1,
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top center",
          end: "bottom top",
          scrub: 1,
        },
      }
    )
  }, { scope: cardRef })

  return (
    <div
      ref={cardRef}
      className="relative overflow-hidden rounded-2xl md:rounded-3xl cursor-pointer group aspect-[16/10] md:aspect-[16/10]"
    >
      {/* Blurred background image - same image */}
      <div 
        ref={blurRef}
        className="absolute inset-0 z-0"
      >
        <Image
          src={project.image}
          alt=""
          fill
          className="object-cover blur-2xl scale-150 saturate-[0.8]"
        />
      </div>

      {/* Noise texture overlay for grainy effect */}
      <div 
        className="absolute inset-0 z-[1] opacity-[0.35] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
        }}
      />

      {/* Subtle gradient overlay for depth */}
      <div className="absolute inset-0 z-[2] bg-gradient-to-br from-white/5 via-transparent to-black/10 pointer-events-none" />

      {/* Sharp image on the right */}
      <div className="absolute right-4 top-4 bottom-4 w-[55%] md:w-[50%] rounded-xl md:rounded-2xl overflow-hidden z-10 shadow-2xl">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      {/* Arrow button */}
      <button data-magnetic className="absolute top-4 left-4 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300 z-20">
        <svg 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="black" 
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-4 h-4 md:w-5 md:h-5 rotate-[-45deg]"
        >
          <path d="M5 12h14" />
          <path d="M12 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  )
}

// Small card component - simple image
const SmallCard = ({ project, cardRef }: { project: Project; cardRef: React.RefObject<HTMLDivElement | null> }) => {
  return (
    <div
      ref={cardRef}
      className="relative overflow-hidden rounded-2xl md:rounded-3xl cursor-pointer group aspect-[16/10] md:aspect-[16/11]"
    >
      <Image
        src={project.image}
        alt={project.title}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />

      {/* Arrow button */}
      <button data-magnetic className="absolute top-4 left-4 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300 z-10">
        <svg 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="black" 
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-4 h-4 md:w-5 md:h-5 rotate-[-45deg]"
        >
          <path d="M5 12h14" />
          <path d="M12 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  )
}

const WorkSection = ({ loading }: WorkSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null)
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

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger)

      if (loading) return

      const content = contentRef.current
      const title = titleRef.current
      const subtitle = subtitleRef.current

      if (!content || !title || !subtitle) return

      // Set initial states
      gsap.set(title, { y: 80, opacity: 0 })
      gsap.set(subtitle, { y: 40, opacity: 0 })

      // Animate title and subtitle
      gsap.to(title, {
        y: 0,
        opacity: 1,
        scrollTrigger: {
          trigger: content,
          start: "top 85%",
          end: "top 55%",
          scrub: 1,
        },
      })

      gsap.to(subtitle, {
        y: 0,
        opacity: 1,
        scrollTrigger: {
          trigger: content,
          start: "top 80%",
          end: "top 50%",
          scrub: 1,
        },
      })

      // Parallax effect on cards + fade in animation
      cardsRef.current.forEach((card, index) => {
        if (!card) return
        
        const speed = projects[index]?.size === "large" ? 40 : 25
        
        // Set initial state - hidden and offset
        gsap.set(card, { y: 60, opacity: 0 })
        
        // Fade in animation - smoother
        gsap.to(card, {
          y: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: card,
            start: "top 95%",
            end: "top 70%",
            scrub: 0.8,
          },
        })
        
        // Parallax movement - smoother
        gsap.to(card, {
          y: -speed,
          scrollTrigger: {
            trigger: card,
            start: "top 65%",
            end: "bottom top",
            scrub: 0.8,
          },
        })
      })
    },
    { scope: sectionRef, dependencies: [loading, isMobile] }
  )

  // Group projects into pairs (small on left, large on right)
  const projectPairs = []
  for (let i = 0; i < projects.length; i += 2) {
    projectPairs.push(projects.slice(i, i + 2))
  }

  return (
    <section ref={sectionRef} className="relative">
      <div ref={contentRef} className="relative min-h-screen pt-24 md:pt-32 pb-20">
        {/* Title */}
        <div className="text-center mb-16 md:mb-24 px-4">
          <h2 
            ref={titleRef}
            data-skew
            className="font-gilroy font-black text-5xl md:text-7xl lg:text-[8rem] text-white leading-none tracking-tight"
          >
            OUR WORK
          </h2>
          <p 
            ref={subtitleRef}
            className="font-neue-montreal text-white/60 text-base md:text-lg mt-4 md:mt-6"
          >
            See what we&apos;ve got brewing.
          </p>
        </div>

        {/* Project Pairs */}
        <div className="w-full px-3 md:px-4 lg:px-6">
          {projectPairs.map((pair, pairIndex) => {
            // Reverse order for odd rows (second row has small on right)
            const isReversed = pairIndex % 2 === 1
            const orderedPair = isReversed ? [...pair].reverse() : pair
            
            return (
              <div 
                key={pairIndex}
                className="flex flex-col md:flex-row justify-between gap-16 md:gap-8 mb-20 md:mb-56 items-start"
              >
                {orderedPair.map((project, index) => {
                  const isLarge = project.size === "large"
                  const cardIndex = pairIndex * 2 + (isReversed ? 1 - index : index)
                  const cardRef = { current: cardsRef.current[cardIndex] } as React.RefObject<HTMLDivElement | null>
                  
                  return (
                    <div
                      key={project.id}
                      ref={(el) => { cardsRef.current[cardIndex] = el }}
                      className={`
                        ${isLarge ? 'md:w-[52%]' : 'md:w-[34%]'}
                        w-full
                      `}
                    >
                      {/* Card */}
                      {isLarge ? (
                        <LargeCard project={project} cardRef={cardRef} />
                      ) : (
                        <SmallCard project={project} cardRef={cardRef} />
                      )}

                      {/* Title & Subtitle below card */}
                      <div className="mt-4 md:mt-5">
                        <h3 className="font-gilroy font-bold text-white text-lg md:text-xl">
                          {project.title}
                        </h3>
                        <p className="font-neue-montreal text-white/50 text-sm md:text-base mt-1">
                          {project.subtitle}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default WorkSection
