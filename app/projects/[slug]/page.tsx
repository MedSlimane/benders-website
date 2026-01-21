"use client"
import { useEffect, useState, useRef } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { fetchProjectBySlug, fetchAllProjects, type Project, type WebProject } from "@/lib/sanity"
import { generateProjectStructuredData } from "@/lib/structured-data"
import CustomCursor from "@/components/CustomCursor"
import MediaGallery from "@/components/MediaGallery"
import { ArrowLeft, ExternalLink, ArrowRight, Sparkles } from "lucide-react"
import Navbar from "@/components/Navbar"
import MagneticButton from "@/components/MagneticButton"
import Footer from "@/components/Footer"
import Preloader from "@/components/preloader"

gsap.registerPlugin(ScrollTrigger)

export default function ProjectPage() {
  const params = useParams()
  const [project, setProject] = useState<Project | null>(null)
  const [moreProjects, setMoreProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  
  const heroRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const metaRef = useRef<HTMLDivElement>(null)
  const backButtonRef = useRef<HTMLAnchorElement>(null)
  const gradientRef = useRef<HTMLDivElement>(null)
  const mainRef = useRef<HTMLDivElement>(null)
  const sectionsRef = useRef<(HTMLElement | null)[]>([])
  const moreProjectsRef = useRef<(HTMLAnchorElement | null)[]>([])
  const floatingOrbsRef = useRef<(HTMLDivElement | null)[]>([])
  
  useEffect(() => {
    async function loadProject() {
      try {
        const data = await fetchProjectBySlug(params.slug as string)
        setProject(data)
        
        // Fetch other projects for "More Projects" section
        const allProjects = await fetchAllProjects()
        const otherProjects = allProjects
          .filter(p => {
            const pSlug = typeof p.slug === 'string' ? p.slug : p.slug?.current
            return pSlug !== params.slug && p.thumbnail
          })
          .slice(0, 3)
        setMoreProjects(otherProjects)
      } catch (error) {
        console.error("Error fetching project:", error)
      } finally {
        // Add delay to ensure preloader animation completes fully
        setTimeout(() => {
          setLoading(false)
        }, 2800)
      }
    }
    
    if (params.slug) {
      loadProject()
    }
  }, [params.slug])

  // Gradient animation
  useEffect(() => {
    if (!loading && gradientRef.current && mainRef.current) {
      gsap.to(gradientRef.current, {
        backgroundPosition: "100% 100%",
        ease: "none",
        scrollTrigger: {
          trigger: mainRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
        },
      })
    }
  }, [loading])

  // Hero animations - smooth and simple
  useGSAP(() => {
    if (loading || !project) return

    const title = titleRef.current
    const subtitle = subtitleRef.current
    const meta = metaRef.current
    const backButton = backButtonRef.current

    if (!title || !subtitle || !meta || !backButton) return

    gsap.set([backButton, title, subtitle, meta], { opacity: 0, y: 60 })

    const tl = gsap.timeline({ delay: 0.2 })
    
    tl.to(backButton, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" })
      .to(title, { opacity: 1, y: 0, duration: 1, ease: "power3.out" }, "-=0.5")
      .to(subtitle, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.6")
      .to(meta, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.5")
  }, { dependencies: [loading, project] })

  // Floating orbs animation
  useGSAP(() => {
    if (loading) return

    floatingOrbsRef.current.forEach((orb, i) => {
      if (!orb) return

      gsap.to(orb, {
        y: `${gsap.utils.random(-30, 30)}`,
        x: `${gsap.utils.random(-20, 20)}`,
        duration: gsap.utils.random(3, 5),
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: i * 0.3,
      })
    })
  }, { dependencies: [loading] })

  // Section reveal animations with parallax
  useGSAP(() => {
    if (loading || !project) return

    sectionsRef.current.forEach((section) => {
      if (!section) return

      gsap.set(section, { opacity: 0, y: 100, rotateX: -15 })

      gsap.to(section, {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
          end: "top 50%",
          scrub: 1.5,
        }
      })

      // Parallax effect for section content
      const content = section.querySelector('.section-content')
      if (content) {
        gsap.to(content, {
          y: -50,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 2,
          }
        })
      }
    })
  }, { dependencies: [loading, project] })

  // More projects animation - simple fade in
  useGSAP(() => {
    if (moreProjects.length === 0) return

    moreProjectsRef.current.forEach((card) => {
      if (!card) return

      gsap.set(card, { opacity: 0, y: 60 })

      gsap.to(card, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top 90%",
          toggleActions: "play none none reverse",
        }
      })
    })
  }, { dependencies: [moreProjects] })

  if (loading) {
    return <Preloader onComplete={() => setLoading(false)} />
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--gradient-body)' }}>
        <div className="text-center">
          <h1 className="font-gilroy font-bold text-4xl text-white mb-4">Project Not Found</h1>
          <Link href="/#work" className="text-[#0055ff] hover:text-[#2de6c7] transition-colors">
            Back to Work
          </Link>
        </div>
      </div>
    )
  }

  const isVideoProject = project._type === 'videoProject'
  const webProject = !isVideoProject ? (project as WebProject) : null

  return (
    <main ref={mainRef} className="relative min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateProjectStructuredData(project)),
        }}
      />
      
      <CustomCursor loading={false} />
      <Navbar />
      
      {/* Benders Logo Bar - Same as main page Hero */}
      <nav className='flex justify-between items-center p-4 w-full md:px-16 md:pt-8'>
        <div className='flex items-center p-2'>
          <Image 
            src="/Benders-logo/png/3@2x.png" 
            alt='Benders Logo' 
            width={150} 
            height={150}
            className="w-[100px] md:w-[150px]" 
          />
        </div>
      </nav>
      
      {/* Animated gradient background */}
      <div 
        ref={gradientRef}
        className="fixed inset-0 -z-10"
        style={{
          background: "linear-gradient(135deg, var(--color-midnight-navy) 0%, var(--color-royal-navy) 15%, var(--color-electric-blue) 40%, var(--color-mint-cyan) 60%, var(--color-electric-blue) 75%, var(--color-royal-navy) 90%, var(--color-midnight-navy) 100%)",
          backgroundSize: "100% 300%",
          backgroundPosition: "0% 0%",
        }}
      />
        {/* Hero Section */}
        <section ref={heroRef} className="relative min-h-[90vh] flex items-center justify-center px-4 pt-40 pb-20">
          {/* Floating decorative orbs */}
          <div ref={(el) => { floatingOrbsRef.current[0] = el }} className="absolute top-20 left-10 w-32 h-32 rounded-full bg-[#2de6c7]/10 blur-3xl pointer-events-none" />
          <div ref={(el) => { floatingOrbsRef.current[1] = el }} className="absolute top-40 right-20 w-40 h-40 rounded-full bg-[#0055ff]/10 blur-3xl pointer-events-none" />
          <div ref={(el) => { floatingOrbsRef.current[2] = el }} className="absolute bottom-32 left-1/4 w-36 h-36 rounded-full bg-[#2de6c7]/8 blur-3xl pointer-events-none" />
          
          {/* Back Button with magnetic effect */}
          <Link
            ref={backButtonRef}
            href="/#work"
            className="fixed top-24 left-8 z-40 group"
          >
            <div className="flex items-center gap-2 px-5 py-3 rounded-full bg-white/5 backdrop-blur-2xl border border-white/10 text-white hover:bg-white/10 hover:border-[#2de6c7]/50 transition-all duration-500">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
              <span className="font-neue-montreal font-medium text-sm">Back</span>
            </div>
          </Link>

          <div className="max-w-7xl mx-auto text-center" style={{ perspective: "1000px" }}>
            <h1 
              ref={titleRef}
              data-skew
              className="font-gilroy font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-white leading-[0.9] tracking-tight mb-8"
            >
              {project.title}
            </h1>
            
            <p 
              ref={subtitleRef}
              className="font-neue-montreal text-white/70 text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto mb-12"
            >
              {project.subtitle}
            </p>

            {/* Meta Info - Premium glass cards with hover effects */}
            <div ref={metaRef} className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
              {project.client && (
                <div className="group px-6 py-3 rounded-full bg-white/[0.03] backdrop-blur-2xl border border-white/[0.08] hover:bg-white/[0.08] hover:border-[#2de6c7]/30 hover:scale-105 transition-all duration-500">
                  <p className="font-neue-montreal text-white/40 text-[10px] uppercase tracking-widest mb-0.5">Client</p>
                  <p className="font-gilroy font-bold text-white text-sm group-hover:text-[#2de6c7] transition-colors duration-300">{project.client}</p>
                </div>
              )}
              {project.year && (
                <div className="group px-6 py-3 rounded-full bg-white/[0.03] backdrop-blur-2xl border border-white/[0.08] hover:bg-white/[0.08] hover:border-[#2de6c7]/30 hover:scale-105 transition-all duration-500">
                  <p className="font-neue-montreal text-white/40 text-[10px] uppercase tracking-widest mb-0.5">Year</p>
                  <p className="font-gilroy font-bold text-white text-sm group-hover:text-[#2de6c7] transition-colors duration-300">{project.year}</p>
                </div>
              )}
              {project.services && project.services.length > 0 && (
                <div className="group px-6 py-3 rounded-full bg-white/[0.03] backdrop-blur-2xl border border-white/[0.08] hover:bg-white/[0.08] hover:border-[#2de6c7]/30 hover:scale-105 transition-all duration-500">
                  <p className="font-neue-montreal text-white/40 text-[10px] uppercase tracking-widest mb-0.5">Services</p>
                  <p className="font-gilroy font-bold text-white text-sm group-hover:text-[#2de6c7] transition-colors duration-300">{project.services.join(" • ")}</p>
                </div>
              )}
              {webProject?.websiteUrl && (
                <MagneticButton
                  href={webProject.websiteUrl}
                  variant="primary"
                  size="md"
                  icon={<ExternalLink className="w-3.5 h-3.5" />}
                >
                  Visit Website
                </MagneticButton>
              )}
            </div>
          </div>
        </section>

        {/* Media Gallery */}
        <MediaGallery project={project} />

        {/* Content Sections - Premium glass style with creative animations */}
        <div className="max-w-6xl mx-auto px-4 space-y-32 py-20" style={{ perspective: "2000px" }}>
          {/* Overview - Only show if data exists */}
          {project.showOverview !== false && project.overview && project.overview.trim() !== '' && (
            <section ref={(el) => { sectionsRef.current[0] = el }} className="relative" style={{ transformStyle: "preserve-3d" }}>
              <div className="absolute -top-20 -left-20 w-60 h-60 bg-[#2de6c7]/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#0055ff]/10 rounded-full blur-3xl pointer-events-none" />
              <div className="section-content relative p-10 md:p-14 rounded-3xl bg-white/[0.02] backdrop-blur-3xl border border-white/[0.08] hover:border-white/[0.15] transition-all duration-700 group">
                <div className="absolute inset-0 bg-gradient-to-br from-[#2de6c7]/5 via-transparent to-[#0055ff]/5 opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-700" />
                <div className="relative">
                  <div className="flex items-center gap-3 mb-6">
                    <Sparkles className="w-6 h-6 text-[#2de6c7]" />
                    <h2 className="font-gilroy font-black text-3xl md:text-4xl lg:text-5xl text-white">OVERVIEW</h2>
                  </div>
                  <p className="font-neue-montreal text-white/70 text-lg md:text-xl leading-relaxed">
                    {project.overview}
                  </p>
                </div>
              </div>
            </section>
          )}

          {/* Challenge - Only show if data exists */}
          {project.showChallenge !== false && project.challenge && project.challenge.trim() !== '' && (
            <section ref={(el) => { sectionsRef.current[1] = el }} className="relative" style={{ transformStyle: "preserve-3d" }}>
              <div className="absolute -top-10 -right-20 w-60 h-60 bg-[#0055ff]/10 rounded-full blur-3xl pointer-events-none" />
              <div className="section-content relative p-10 md:p-14 rounded-3xl bg-white/[0.02] backdrop-blur-3xl border border-white/[0.08] hover:border-white/[0.15] transition-all duration-700 group">
                <div className="absolute inset-0 bg-gradient-to-br from-[#0055ff]/5 via-transparent to-[#2de6c7]/5 opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-700" />
                <div className="relative">
                  <h2 className="font-gilroy font-black text-3xl md:text-4xl lg:text-5xl mb-6">
                    <span className="text-white">THE </span>
                    <span className="text-[#0055ff]">CHALLENGE</span>
                  </h2>
                  <p className="font-neue-montreal text-white/70 text-lg md:text-xl leading-relaxed">
                    {project.challenge}
                  </p>
                </div>
              </div>
            </section>
          )}

          {/* Solution - Only show if data exists */}
          {project.showSolution !== false && project.solution && project.solution.trim() !== '' && (
            <section ref={(el) => { sectionsRef.current[2] = el }} className="relative" style={{ transformStyle: "preserve-3d" }}>
              <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-[#2de6c7]/10 rounded-full blur-3xl pointer-events-none" />
              <div className="section-content relative p-10 md:p-14 rounded-3xl bg-white/[0.02] backdrop-blur-3xl border border-white/[0.08] hover:border-white/[0.15] transition-all duration-700 group">
                <div className="absolute inset-0 bg-gradient-to-br from-[#2de6c7]/5 via-transparent to-[#0055ff]/5 opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-700" />
                <div className="relative">
                  <h2 className="font-gilroy font-black text-3xl md:text-4xl lg:text-5xl mb-6">
                    <span className="text-white">THE </span>
                    <span className="text-[#2de6c7]">SOLUTION</span>
                  </h2>
                  <p className="font-neue-montreal text-white/70 text-lg md:text-xl leading-relaxed">
                    {project.solution}
                  </p>
                </div>
              </div>
            </section>
          )}

          {/* Results - Only show if data exists and has items */}
          {project.showResults !== false && project.results && project.results.length > 0 && (
            <section ref={(el) => { sectionsRef.current[3] = el }} style={{ transformStyle: "preserve-3d" }}>
              <h2 className="font-gilroy font-black text-4xl md:text-5xl lg:text-6xl text-white mb-16 text-center">
                <span className="text-white">THE </span>
                <span className="text-[#2de6c7]">RESULTS</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {project.results.map((result, index) => (
                  <div 
                    key={index}
                    className="group relative p-10 rounded-3xl bg-white/[0.02] backdrop-blur-3xl border border-white/[0.08] hover:bg-white/[0.05] hover:border-[#2de6c7]/40 hover:scale-110 transition-all duration-700"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#2de6c7]/10 to-[#0055ff]/10 opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-700" />
                    <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ boxShadow: "0 0 40px rgba(45, 230, 199, 0.3)" }} />
                    <p className="relative font-gilroy font-black text-6xl md:text-7xl text-[#2de6c7] mb-4 group-hover:scale-110 transition-transform duration-500">
                      {result.value}
                    </p>
                    <p className="relative font-neue-montreal text-white/60 text-sm uppercase tracking-wider">
                      {result.metric}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Insights - Only show if data exists and has items */}
          {project.showInsights !== false && project.insights && project.insights.length > 0 && (
            <section ref={(el) => { sectionsRef.current[4] = el }} style={{ transformStyle: "preserve-3d" }}>
              <h2 className="font-gilroy font-black text-4xl md:text-5xl lg:text-6xl text-white mb-16 text-center">
                <span className="text-white">KEY </span>
                <span className="text-[#0055ff]">INSIGHTS</span>
              </h2>
              <div className="space-y-5">
                {project.insights.map((insight, index) => (
                  <div key={index} className="group flex gap-5 p-8 rounded-2xl bg-white/[0.02] backdrop-blur-3xl border border-white/[0.08] hover:bg-white/[0.05] hover:border-[#2de6c7]/30 hover:translate-x-2 transition-all duration-500">
                    <div className="flex-shrink-0 mt-2">
                      <div className="w-3 h-3 rounded-full bg-[#2de6c7] group-hover:scale-150 group-hover:shadow-[0_0_20px_rgba(45,230,199,0.6)] transition-all duration-300" />
                    </div>
                    <p className="font-neue-montreal text-white/70 text-lg leading-relaxed group-hover:text-white/90 transition-colors duration-300">
                      {insight}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Testimonial - Only show if data exists */}
          {project.showTestimonial !== false && project.testimonial && project.testimonial.quote && project.testimonial.quote.trim() !== '' && (
            <section ref={(el) => { sectionsRef.current[5] = el }} className="relative" style={{ transformStyle: "preserve-3d" }}>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#0055ff]/5 rounded-full blur-3xl pointer-events-none" />
              <div className="section-content relative p-12 md:p-20 rounded-3xl bg-white/[0.02] backdrop-blur-3xl border border-white/[0.08] hover:border-white/[0.15] transition-all duration-700 group">
                <div className="absolute inset-0 bg-gradient-to-br from-[#0055ff]/5 via-transparent to-[#2de6c7]/5 opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-700" />
                <div className="relative">
                  <div className="mb-10">
                    <svg className="w-16 h-16 text-[#2de6c7]/40 group-hover:text-[#2de6c7]/60 transition-colors duration-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>
                  <p className="font-gilroy font-medium text-2xl md:text-4xl text-white mb-10 leading-relaxed">
                    {project.testimonial.quote}
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-1 h-16 bg-gradient-to-b from-[#2de6c7] to-[#0055ff] rounded-full" />
                    <div>
                      <p className="font-gilroy font-bold text-[#2de6c7] text-xl mb-1">
                        {project.testimonial.author}
                      </p>
                      <p className="font-neue-montreal text-white/50 text-sm">
                        {project.testimonial.position}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}
        </div>

        {/* More Projects Section */}
        {moreProjects.length > 0 && (
          <section className="relative px-4 py-40">
            {/* Background decorative elements */}
            <div className="absolute top-20 left-10 w-96 h-96 bg-[#2de6c7]/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#0055ff]/5 rounded-full blur-3xl pointer-events-none" />
            
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-20">
                <p className="font-neue-montreal text-[#2de6c7] text-sm uppercase tracking-widest mb-4 flex items-center justify-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Explore More
                </p>
                <h2 className="font-gilroy font-black text-5xl md:text-7xl lg:text-8xl text-white">
                  More <span className="text-[#2de6c7]">Projects</span>
                </h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {moreProjects.map((proj, index) => {
                  const slugString = typeof proj.slug === 'string' ? proj.slug : proj.slug?.current || ''
                  console.log('Project slug:', slugString, 'Full href:', `/projects/${slugString}`)
                  return (
                    <Link
                      key={proj._id}
                      href={`/projects/${slugString}`}
                      ref={(el) => { moreProjectsRef.current[index] = el }}
                      className="group block cursor-pointer"
                    >
                      <div className="relative rounded-3xl overflow-hidden aspect-[4/5] border border-white/10 hover:border-[#2de6c7]/50 transition-all duration-500 hover:shadow-[0_0_60px_rgba(45,230,199,0.3)] hover:scale-105">
                        <Image
                          src={proj.thumbnail}
                          alt={proj.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#04082e] via-[#04082e]/60 to-transparent opacity-90 group-hover:opacity-95 transition-opacity duration-500" />
                        
                        {/* Animated gradient overlay on hover */}
                        <div className="absolute inset-0 bg-gradient-to-br from-[#2de6c7]/20 via-transparent to-[#0055ff]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        
                        <div className="absolute inset-0 flex flex-col justify-end p-8 pointer-events-none">
                          <h3 className="font-gilroy font-black text-2xl md:text-3xl text-white mb-3 group-hover:text-[#2de6c7] transition-colors duration-300">
                            {proj.title}
                          </h3>
                          <p className="font-neue-montreal text-white/70 text-sm mb-6 group-hover:text-white/90 transition-colors duration-300">
                            {proj.subtitle}
                          </p>
                          <div className="flex items-center gap-2 text-[#2de6c7] font-neue-montreal text-sm font-medium group-hover:gap-4 transition-all duration-300">
                            <span>View Project</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>

              <div className="text-center mt-20">
                <MagneticButton
                  href="/#work"
                  variant="glass"
                  size="lg"
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  View All Projects
                </MagneticButton>
              </div>
            </div>
          </section>
        )}

        {/* Footer - Same as main page */}
        <Footer loading={false} />
    </main>
  )
}
