"use client"
import { useRef, useState, useEffect } from "react"
import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"

interface VideoTestimonialsProps {
  loading: boolean
}

const VideoTestimonials = ({ loading }: VideoTestimonialsProps) => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const mobileSectionRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])
  const mobileCardsRef = useRef<(HTMLDivElement | null)[]>([])
  const [activeVideo, setActiveVideo] = useState<number | null>(null)
  const [fullscreenVideo, setFullscreenVideo] = useState<number | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Desktop horizontal scroll
  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger)
      
      if (loading || isMobile) return

      const section = sectionRef.current
      const track = trackRef.current

      if (!section || !track) return

      const totalScroll = track.scrollWidth - window.innerWidth

      gsap.to(track, {
        x: -totalScroll,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${totalScroll}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      })
    },
    { scope: sectionRef, dependencies: [loading, isMobile] }
  )

  // Mobile vertical scroll animations
  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger)
      
      if (loading || !isMobile) return

      mobileCardsRef.current.forEach((card) => {
        if (!card) return
        
        gsap.fromTo(card, 
          { opacity: 0, y: 60, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              end: "top 50%",
              scrub: 1,
            },
          }
        )
      })
    },
    { scope: mobileSectionRef, dependencies: [loading, isMobile] }
  )

  const videos = [
    {
      id: 1,
      src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      name: "Sarah Johnson",
      company: "TechStart Inc.",
      quote: "They transformed our entire digital presence",
    },
    {
      id: 2,
      src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
      name: "Michael Chen",
      company: "Growth Labs",
      quote: "Best agency we've ever worked with",
    },
    {
      id: 3,
      src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
      name: "Emma Williams",
      company: "Digital Ventures",
      quote: "Results exceeded all expectations",
    },
  ]

  const handleVideoInteraction = (index: number, isActive: boolean) => {
    setActiveVideo(isActive ? index : null)
    const videoEl = document.getElementById(`vid-${index}`) as HTMLVideoElement
    if (videoEl) {
      if (isActive) {
        videoEl.play()
      } else {
        videoEl.pause()
        videoEl.currentTime = 0
      }
    }
  }

  const openFullscreen = (index: number, e: React.MouseEvent) => {
    e.stopPropagation()
    setFullscreenVideo(index)
    document.body.style.overflow = "hidden"
  }

  const closeFullscreen = () => {
    setFullscreenVideo(null)
    document.body.style.overflow = ""
  }

  // Mobile Layout - Vertical stacked big cards
  if (isMobile) {
    return (
      <>
        <section ref={mobileSectionRef} className="relative w-full py-6 px-3">
          <div className="flex flex-col gap-4">
            {videos.map((video, index) => (
              <div
                key={video.id}
                ref={(el) => { mobileCardsRef.current[index] = el }}
                className="relative group"
                onClick={() => openFullscreen(index, { stopPropagation: () => {} } as React.MouseEvent)}
              >
                {/* Video Card - Full width, big */}
                <div 
                  className="relative aspect-video rounded-xl overflow-hidden"
                  style={{
                    background: "rgba(255, 255, 255, 0.03)",
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3), inset 0 0 30px rgba(255, 255, 255, 0.02)",
                  }}
                >
                  {/* Video */}
                  <video
                    className="absolute inset-0 w-full h-full object-cover"
                    src={video.src}
                    muted
                    loop
                    playsInline
                    preload="metadata"
                  />

                  {/* Gradient overlay */}
                  <div 
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: `
                        linear-gradient(180deg, rgba(4, 8, 46, 0.2) 0%, transparent 30%, transparent 50%, rgba(4, 8, 46, 0.9) 100%)
                      `,
                    }}
                  />

                  {/* Play button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center"
                      style={{
                        background: "rgba(255, 255, 255, 0.08)",
                        backdropFilter: "blur(20px)",
                        WebkitBackdropFilter: "blur(20px)",
                        border: "1px solid rgba(255, 255, 255, 0.15)",
                        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
                      }}
                    >
                      <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>

                  {/* Client info */}
                  <div 
                    className="absolute bottom-0 left-0 right-0 p-3"
                    style={{
                      background: "linear-gradient(180deg, transparent 0%, rgba(4, 8, 46, 0.8) 100%)",
                    }}
                  >
                    <p className="text-white/70 text-xs mb-1 italic">&quot;{video.quote}&quot;</p>
                    <h3 className="font-gilroy font-bold text-base text-white mb-0.5">
                      {video.name}
                    </h3>
                    <p 
                      className="font-neue-montreal text-xs"
                      style={{ color: "var(--color-mint-cyan)" }}
                    >
                      {video.company}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Fullscreen Modal - Mobile */}
        {fullscreenVideo !== null && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(4, 8, 46, 0.98)" }}
            onClick={closeFullscreen}
          >
            <button 
              className="absolute top-4 right-4 w-12 h-12 rounded-full flex items-center justify-center z-10"
              style={{
                background: "rgba(255, 255, 255, 0.08)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
              }}
              onClick={closeFullscreen}
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div 
              className="relative w-full aspect-video rounded-xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <video
                className="w-full h-full object-cover"
                src={videos[fullscreenVideo].src}
                controls
                autoPlay
                playsInline
              />
            </div>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center">
              <h3 className="font-gilroy font-bold text-lg text-white mb-1">
                {videos[fullscreenVideo].name}
              </h3>
              <p className="font-neue-montreal text-sm" style={{ color: "var(--color-mint-cyan)" }}>
                {videos[fullscreenVideo].company}
              </p>
            </div>
          </div>
        )}
      </>
    )
  }

  // Desktop Layout - Horizontal scroll
  return (
    <>
      <section ref={sectionRef} className="relative w-full h-screen overflow-hidden">
        {/* Horizontal scrolling track */}
        <div 
          ref={trackRef}
          className="flex items-center h-full gap-8 md:gap-12 pl-8 md:pl-16 pr-[50vw]"
          style={{ width: "fit-content" }}
        >
          {videos.map((video, index) => (
            <div
              key={video.id}
              ref={(el) => { cardsRef.current[index] = el }}
              className="relative flex-shrink-0 group"
              style={{ 
                width: "75vw",
                maxWidth: "1000px",
                perspective: "1000px",
              }}
              onMouseEnter={() => handleVideoInteraction(index, true)}
              onMouseLeave={() => handleVideoInteraction(index, false)}
            >
              {/* Main video card - GLASSY STYLE */}
              <div 
                className="relative aspect-video rounded-3xl overflow-hidden cursor-pointer transition-all duration-700"
                style={{
                  background: "rgba(255, 255, 255, 0.03)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  border: activeVideo === index 
                    ? "1px solid rgba(45, 230, 199, 0.4)" 
                    : "1px solid rgba(255, 255, 255, 0.08)",
                  boxShadow: activeVideo === index 
                    ? "0 0 80px rgba(45, 230, 199, 0.15), 0 40px 80px rgba(0, 0, 0, 0.4), inset 0 0 60px rgba(45, 230, 199, 0.05)" 
                    : "0 20px 60px rgba(0, 0, 0, 0.3), inset 0 0 30px rgba(255, 255, 255, 0.02)",
                  transform: activeVideo === index ? "translateY(-10px)" : "translateY(0)",
                }}
                onClick={(e) => openFullscreen(index, e)}
              >
                {/* Video */}
                <video
                  id={`vid-${index}`}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000"
                  style={{ 
                    transform: activeVideo === index ? "scale(1.05)" : "scale(1)",
                  }}
                  src={video.src}
                  muted
                  loop
                  playsInline
                  preload="metadata"
                />

                {/* Cinematic gradient overlay */}
                <div 
                  className="absolute inset-0 pointer-events-none transition-opacity duration-700"
                  style={{
                    background: `
                      linear-gradient(180deg, rgba(4, 8, 46, 0.3) 0%, transparent 30%, transparent 50%, rgba(4, 8, 46, 0.9) 100%),
                      linear-gradient(90deg, rgba(4, 8, 46, 0.4) 0%, transparent 20%, transparent 80%, rgba(4, 8, 46, 0.4) 100%)
                    `,
                    opacity: activeVideo === index ? 0.5 : 1,
                  }}
                />

                {/* Glowing border on hover - glassy */}
                <div 
                  className="absolute inset-0 rounded-3xl pointer-events-none transition-opacity duration-500"
                  style={{
                    border: "1px solid rgba(45, 230, 199, 0.3)",
                    boxShadow: "inset 0 0 30px rgba(45, 230, 199, 0.1)",
                    opacity: activeVideo === index ? 1 : 0,
                  }}
                />

                {/* Play button - center - GLASSY */}
                <div 
                  className="absolute inset-0 flex items-center justify-center transition-all duration-500"
                  style={{ 
                    opacity: activeVideo === index ? 0 : 1,
                    transform: activeVideo === index ? "scale(0.5)" : "scale(1)",
                  }}
                >
                  <div 
                    className="w-20 h-20 md:w-28 md:h-28 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                    style={{
                      background: "rgba(255, 255, 255, 0.08)",
                      backdropFilter: "blur(20px)",
                      WebkitBackdropFilter: "blur(20px)",
                      border: "1px solid rgba(255, 255, 255, 0.15)",
                      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2), inset 0 0 20px rgba(255, 255, 255, 0.05)",
                    }}
                  >
                    <svg className="w-8 h-8 md:w-10 md:h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>

                {/* Expand icon - top right - GLASSY */}
                <div 
                  className="absolute top-6 right-6 transition-all duration-500"
                  style={{ 
                    opacity: activeVideo === index ? 1 : 0,
                    transform: activeVideo === index ? "translateY(0) scale(1)" : "translateY(-20px) scale(0.8)",
                  }}
                >
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{
                      background: "rgba(255, 255, 255, 0.08)",
                      backdropFilter: "blur(20px)",
                      WebkitBackdropFilter: "blur(20px)",
                      border: "1px solid rgba(255, 255, 255, 0.12)",
                      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
                    }}
                  >
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                    </svg>
                  </div>
                </div>

                {/* Quote badge - top left - GLASSY */}
                <div 
                  className="absolute top-6 left-6 transition-all duration-500"
                  style={{ 
                    opacity: activeVideo === index ? 1 : 0,
                    transform: activeVideo === index ? "translateX(0)" : "translateX(-20px)",
                  }}
                >
                  <div 
                    className="px-5 py-2.5 rounded-full"
                    style={{
                      background: "rgba(255, 255, 255, 0.08)",
                      backdropFilter: "blur(20px)",
                      WebkitBackdropFilter: "blur(20px)",
                      border: "1px solid rgba(255, 255, 255, 0.12)",
                      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
                    }}
                  >
                    <span className="text-white text-sm font-medium">&quot;{video.quote}&quot;</span>
                  </div>
                </div>

                {/* Client info - bottom - GLASSY background */}
                <div 
                  className="absolute bottom-0 left-0 right-0 p-6 md:p-10"
                  style={{
                    background: "linear-gradient(180deg, transparent 0%, rgba(4, 8, 46, 0.6) 50%, rgba(4, 8, 46, 0.9) 100%)",
                  }}
                >
                  <div 
                    className="transition-transform duration-500"
                    style={{ transform: activeVideo === index ? "translateY(-10px)" : "translateY(0)" }}
                  >
                    <h3 className="font-gilroy font-bold text-2xl md:text-3xl text-white mb-2">
                      {video.name}
                    </h3>
                    <p 
                      className="font-neue-montreal text-base md:text-lg"
                      style={{ color: "var(--color-mint-cyan)" }}
                    >
                      {video.company}
                    </p>
                  </div>
                </div>

                {/* Ambient glow */}
                <div 
                  className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-3/4 h-40 rounded-full blur-3xl pointer-events-none transition-opacity duration-700"
                  style={{
                    background: "var(--color-mint-cyan)",
                    opacity: activeVideo === index ? 0.2 : 0,
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Scroll indicator - GLASSY */}
        <div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 px-5 py-2.5 rounded-full"
          style={{
            background: "rgba(255, 255, 255, 0.05)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          <span className="text-sm font-neue-montreal text-white/60">Scroll to explore</span>
          <svg className="w-5 h-5 text-white/60 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </section>

      {/* Fullscreen Modal */}
      {fullscreenVideo !== null && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
          style={{ background: "rgba(4, 8, 46, 0.98)" }}
          onClick={closeFullscreen}
        >
          <button 
            className="absolute top-6 right-6 w-14 h-14 rounded-full flex items-center justify-center z-10 transition-all duration-300 hover:scale-110"
            style={{
              background: "rgba(255, 255, 255, 0.08)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
            }}
            onClick={closeFullscreen}
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div 
            className="relative w-full max-w-6xl aspect-video rounded-2xl overflow-hidden"
            style={{ boxShadow: "0 0 100px rgba(45, 230, 199, 0.2)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <video
              className="w-full h-full object-cover"
              src={videos[fullscreenVideo].src}
              controls
              autoPlay
              playsInline
            />
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
            <h3 className="font-gilroy font-bold text-2xl text-white mb-1">
              {videos[fullscreenVideo].name}
            </h3>
            <p className="font-neue-montreal" style={{ color: "var(--color-mint-cyan)" }}>
              {videos[fullscreenVideo].company}
            </p>
          </div>
        </div>
      )}
    </>
  )
}

export default VideoTestimonials
