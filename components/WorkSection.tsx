"use client"
import { useRef, useEffect, useState, useMemo } from "react"
import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { fetchAllProjects } from "@/lib/sanity"

gsap.registerPlugin(ScrollTrigger)

interface WorkSectionProps {
  loading: boolean
}

interface DisplayProject {
  _id: string
  title: string
  subtitle: string
  thumbnail: string
  slug: string
  category?: string
  topResult?: { metric: string; value: string }
}

// Category metadata — order controls the tab order; labels are what visitors see
const CATEGORY_ORDER = ["ai", "web", "photography", "video", "social", "seo", "branding"] as const
const CATEGORY_LABELS: Record<string, string> = {
  ai: "AI Products",
  web: "Web Development",
  photography: "Photography",
  video: "Video Production",
  social: "Social Media",
  seo: "SEO",
  branding: "Branding",
}

const ProjectCard = ({ project }: { project: DisplayProject }) => {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="work-card group block overflow-hidden rounded-2xl transition-all duration-500 hover:-translate-y-1.5"
      style={{
        background: "rgba(255, 255, 255, 0.03)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(255, 255, 255, 0.08)",
      }}
    >
      {/* Thumbnail */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={project.thumbnail}
          alt={project.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#04082e]/80 via-transparent to-transparent" />

        {/* Headline result chip */}
        {project.topResult?.value && (
          <div
            className="absolute left-4 top-4 rounded-full px-3 py-1.5 font-gilroy font-bold text-sm text-[#04082e]"
            style={{ background: "linear-gradient(135deg, #2de6c7 0%, #04c8aa 100%)" }}
          >
            {project.topResult.value}
          </div>
        )}

        {/* Arrow */}
        <div className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-[#04082e] transition-all duration-300 group-hover:scale-110 group-hover:bg-[#2de6c7]">
          <ArrowUpRight className="h-5 w-5" />
        </div>
      </div>

      {/* Content — title + the value it drove */}
      <div className="p-5 md:p-6">
        <h3 className="font-gilroy font-bold text-lg md:text-xl text-white transition-colors duration-300 group-hover:text-[#2de6c7]">
          {project.title}
        </h3>
        {project.topResult?.metric ? (
          <p className="mt-1.5 font-neue-montreal text-sm text-white/55">
            <span className="font-semibold text-[#2de6c7]">{project.topResult.value}</span>{" "}
            {project.topResult.metric}
          </p>
        ) : (
          <p className="mt-1.5 font-neue-montreal text-sm text-white/50">{project.subtitle}</p>
        )}
      </div>
    </Link>
  )
}

const WorkSection = ({ loading }: WorkSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const tabsRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  const [projects, setProjects] = useState<DisplayProject[]>([])
  const [dataLoading, setDataLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState<string>("all")

  // Fetch projects from Sanity (client side)
  useEffect(() => {
    async function loadProjects() {
      try {
        const fetched = await fetchAllProjects()
        const display: DisplayProject[] = fetched
          .filter((p) => p.thumbnail)
          .map((p) => {
            const slug = typeof p.slug === "string" ? p.slug : p.slug?.current || ""
            const results = (p as { results?: { metric: string; value: string }[] }).results
            return {
              _id: p._id,
              title: p.title,
              subtitle: p.subtitle,
              thumbnail: p.thumbnail,
              slug,
              category: (p as { category?: string }).category,
              topResult: results && results.length > 0 ? results[0] : undefined,
            }
          })
        setProjects(display)
      } catch (error) {
        console.error("Failed to load projects:", error)
      } finally {
        setDataLoading(false)
      }
    }
    loadProjects()
  }, [])

  const isReady = !loading && !dataLoading

  // Which category tabs to show (only those that actually have projects)
  const tabs = useMemo(() => {
    const present = CATEGORY_ORDER.filter((c) => projects.some((p) => p.category === c))
    return ["all", ...present]
  }, [projects])

  const filtered = useMemo(
    () => (activeCategory === "all" ? projects : projects.filter((p) => p.category === activeCategory)),
    [projects, activeCategory]
  )

  // Header entrance
  useGSAP(() => {
    if (!isReady) return
    const els = [titleRef.current, subtitleRef.current, tabsRef.current].filter(Boolean)
    gsap.set(els, { y: 40, opacity: 0 })
    gsap.to(els, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.12,
      ease: "power3.out",
      scrollTrigger: { trigger: contentRef.current, start: "top 80%", toggleActions: "play none none reverse" },
    })
  }, { scope: sectionRef, dependencies: [isReady] })

  // Cards animate in on first load and on every filter change
  useGSAP(() => {
    if (!isReady || !gridRef.current) return
    const cards = gridRef.current.querySelectorAll(".work-card")
    gsap.fromTo(
      cards,
      { opacity: 0, y: 30, scale: 0.97 },
      { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.06, ease: "power3.out" }
    )
  }, { scope: sectionRef, dependencies: [isReady, activeCategory, filtered.length] })

  // Empty state
  if (isReady && projects.length === 0) {
    return (
      <section ref={sectionRef} className="relative">
        <div ref={contentRef} className="relative pt-24 md:pt-32 pb-20">
          <div className="text-center px-4">
            <h2 ref={titleRef} data-skew className="font-gilroy font-black text-4xl md:text-5xl lg:text-5xl xl:text-[7rem] text-white leading-none tracking-tight">
              OUR WORK
            </h2>
            <p ref={subtitleRef} className="font-neue-montreal text-white/60 text-sm md:text-base mt-3 md:mt-4">
              No projects available yet.
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section ref={sectionRef} className="relative">
      <div ref={contentRef} className="relative pt-24 md:pt-32 pb-20">
        {/* Title */}
        <div className="text-center mb-8 md:mb-10 px-4">
          <h2 ref={titleRef} data-skew className="font-gilroy font-black text-4xl md:text-5xl lg:text-5xl xl:text-[7rem] text-white leading-none tracking-tight">
            OUR WORK
          </h2>
          <p ref={subtitleRef} className="font-neue-montreal text-white/60 text-sm md:text-base mt-3 md:mt-4">
            Real projects, real outcomes — filter by what you need.
          </p>
        </div>

        {/* Category filter tabs */}
        <div ref={tabsRef} className="mb-10 md:mb-14 flex flex-wrap items-center justify-center gap-2.5 px-4">
          {tabs.map((tab) => {
            const active = activeCategory === tab
            return (
              <button
                key={tab}
                onClick={() => setActiveCategory(tab)}
                className="rounded-full px-4 py-2 font-neue-montreal text-sm transition-all duration-300"
                style={
                  active
                    ? { background: "linear-gradient(135deg, #2de6c7 0%, #04c8aa 100%)", color: "#04082e", fontWeight: 600 }
                    : { background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.7)", border: "1px solid rgba(255,255,255,0.1)" }
                }
              >
                {tab === "all" ? "All" : CATEGORY_LABELS[tab]}
              </button>
            )
          })}
        </div>

        {/* Project grid */}
        <div className="w-full max-w-7xl mx-auto px-4 md:px-6">
          <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7">
            {filtered.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default WorkSection
