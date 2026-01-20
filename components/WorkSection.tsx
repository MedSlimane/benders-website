"use client"
import { useRef, useEffect, useState } from "react"
import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"
import { fetchAllProjects } from "@/lib/sanity"

interface WorkSectionProps {
  loading: boolean
}

interface DisplayProject {
  _id: string
  title: string
  subtitle: string
  thumbnail: string
  slug: string  // Changed from { current: string } to string
  size: "large" | "small"
}

// Large card component with blurred background and noise texture
const LargeCard = ({ project }: { project: DisplayProject }) => {
  const cardRef = useRef<HTMLDivElement>(null)
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
      className="relative overflow-hidden rounded-2xl md:rounded-3xl group aspect-[16/10] md:aspect-[16/10]"
    >
      {/* Blurred background image - same image */}
      <div 
        ref={blurRef}
        className="absolute inset-0 z-0"
      >
        <Image
          src={project.thumbnail}
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
          src={project.thumbnail}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      {/* Arrow icon */}
      <div className="absolute top-4 left-4 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300 z-20 pointer-events-none">
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
      </div>
    </div>
  )
}

// Small card component - simple image
const SmallCard = ({ project }: { project: DisplayProject }) => {
  return (
    <div
      className="relative overflow-hidden rounded-2xl md:rounded-3xl group aspect-[16/10] md:aspect-[16/11]"
    >
      <Image
        src={project.thumbnail}
        alt={project.title}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />

      {/* Arrow icon */}
      <div className="absolute top-4 left-4 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300 z-10 pointer-events-none">
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
      </div>
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
  const [projects, setProjects] = useState<DisplayProject[]>([])
  const [dataLoading, setDataLoading] = useState(true)

  // Fetch projects from Sanity
  useEffect(() => {
    async function loadProjects() {
      try {
        const fetchedProjects = await fetchAllProjects()
        
        // Transform projects and assign alternating sizes
        // Filter out projects without thumbnails
        const displayProjects: DisplayProject[] = fetchedProjects
          .filter(project => project.thumbnail) // Only show projects with thumbnails
          .map((project, index) => {
            // Extract slug string - handle both object and string formats
            const slugString = typeof project.slug === 'string' 
              ? project.slug 
              : project.slug?.current || ''
            
            console.log('Project slug:', slugString) // Debug log
            return {
              _id: project._id,
              title: project.title,
              subtitle: project.subtitle,
              thumbnail: project.thumbnail,
              slug: slugString,
              size: index % 2 === 0 ? 'small' : 'large' // Alternate small/large
            }
          })
        
        setProjects(displayProjects)
      } catch (error) {
        console.error('Failed to load projects:', error)
      } finally {
        setDataLoading(false)
      }
    }

    loadProjects()
  }, [])

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Combined loading state
  const isReady = !loading && !dataLoading

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger)

      if (!isReady) return

      const content = contentRef.current
      const title = titleRef.current
      const subtitle = subtitleRef.current

      if (!content || !title || !subtitle) return

      // Set initial states
      gsap.set(title, { y: 50, opacity: 0 })
      gsap.set(subtitle, { y: 30, opacity: 0 })

      // Animate title and subtitle
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

      // Card animations with parallax
      cardsRef.current.forEach((card, index) => {
        if (!card) return
        
        const speed = projects[index]?.size === "large" ? 40 : 25
        
        // Set initial state
        gsap.set(card, { y: 60, opacity: 0 })
        
        // Fade in animation
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
        
        // Parallax movement
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
    { scope: sectionRef, dependencies: [isReady, isMobile, projects] }
  )

  // Group projects into pairs (small on left, large on right)
  const projectPairs = []
  for (let i = 0; i < projects.length; i += 2) {
    projectPairs.push(projects.slice(i, i + 2))
  }

  // Empty state
  if (projects.length === 0 && !dataLoading) {
    return (
      <section ref={sectionRef} className="relative">
        <div ref={contentRef} className="relative min-h-screen pt-24 md:pt-32 pb-0">
          <div className="text-center mb-12 md:mb-16 lg:mb-20 px-4">
            <h2 
              ref={titleRef}
              data-skew
              className="font-gilroy font-black text-4xl md:text-5xl lg:text-5xl xl:text-[7rem] text-white leading-none tracking-tight"
            >
              OUR WORK
            </h2>
            <p 
              ref={subtitleRef}
              className="font-neue-montreal text-white/60 text-sm md:text-base mt-3 md:mt-4"
            >
              No projects available yet.
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section ref={sectionRef} className="relative">
      <div ref={contentRef} className="relative min-h-screen pt-24 md:pt-32 pb-0">
        {/* Title */}
        <div className="text-center mb-12 md:mb-16 lg:mb-20 px-4">
          <h2 
            ref={titleRef}
            data-skew
            className="font-gilroy font-black text-4xl md:text-5xl lg:text-5xl xl:text-[7rem] text-white leading-none tracking-tight"
          >
            OUR WORK
          </h2>
          <p 
            ref={subtitleRef}
            className="font-neue-montreal text-white/60 text-sm md:text-base mt-3 md:mt-4"
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
                className="flex flex-col md:flex-row justify-between gap-12 md:gap-8 mb-12 md:mb-20 items-start"
              >
                {orderedPair.map((project, index) => {
                  const isLarge = project.size === "large"
                  const cardIndex = pairIndex * 2 + (isReversed ? 1 - index : index)
                  
                  return (
                    <div
                      key={project._id}
                      ref={(el) => {
                        cardsRef.current[cardIndex] = el
                      }}
                      className={`
                        ${isLarge ? 'md:w-[52%]' : 'md:w-[34%]'}
                        w-full
                      `}
                    >
                      <div 
                        onClick={() => {
                          window.location.href = `/projects/${project.slug}`
                        }}
                      >
                        {isLarge ? (
                          <LargeCard project={project} />
                        ) : (
                          <SmallCard project={project} />
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
