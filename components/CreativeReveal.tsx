"use client"
import { useRef, useEffect, useState } from "react"
import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { type VideoTestimonial } from "@/lib/sanity"

interface CreativeRevealProps {
  loading: boolean
  videos: VideoTestimonial[]
}

// Compact glassy video card — same material as the text testimonials
const VideoCard = ({ video, onOpen }: { video: VideoTestimonial; onOpen: (v: VideoTestimonial) => void }) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)

  const handleEnter = () => {
    videoRef.current?.play().then(() => setPlaying(true)).catch(() => {})
  }
  const handleLeave = () => {
    const el = videoRef.current
    if (!el) return
    el.pause()
    el.currentTime = 0
    setPlaying(false)
  }

  return (
    <div
      className="group relative mx-3 md:mx-4 aspect-[16/10] w-[280px] md:w-[520px] flex-shrink-0 overflow-hidden rounded-2xl cursor-pointer transition-transform duration-500 hover:scale-[1.02]"
      style={{
        border: "1px solid rgba(255, 255, 255, 0.1)",
      }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onClick={() => onOpen(video)}
    >
      {/* Just the video */}
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        src={video.videoUrl}
        poster={video.poster}
        muted
        loop
        playsInline
        preload="none"
      />

      {/* Subtle base tint so an unloaded video still reads as a clean tile */}
      <div
        className="pointer-events-none absolute inset-0 bg-[#04082e]/35 transition-opacity duration-500"
        style={{ opacity: playing ? 0 : 1 }}
      />

      {/* Mint border on hover */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ boxShadow: "inset 0 0 0 1px rgba(45,230,199,0.5), 0 0 44px rgba(45,230,199,0.18)" }}
      />

      {/* Play button */}
      <div
        className="absolute inset-0 flex items-center justify-center transition-all duration-500"
        style={{ opacity: playing ? 0 : 1, transform: playing ? "scale(0.6)" : "scale(1)" }}
      >
        <div
          className="flex h-14 w-14 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110"
          style={{
            background: "rgba(255, 255, 255, 0.12)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
          }}
        >
          <svg className="ml-0.5 h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>
    </div>
  )
}

const CreativeReveal = ({ loading, videos }: CreativeRevealProps) => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const word1Ref = useRef<HTMLDivElement>(null)
  const word2Ref = useRef<HTMLDivElement>(null)
  const word3Ref = useRef<HTMLDivElement>(null)
  const word4Ref = useRef<HTMLDivElement>(null)
  const word5Ref = useRef<HTMLDivElement>(null)
  const word6Ref = useRef<HTMLDivElement>(null)
  const word7Ref = useRef<HTMLDivElement>(null)
  const glowOrb1Ref = useRef<HTMLDivElement>(null)
  const glowOrb2Ref = useRef<HTMLDivElement>(null)
  const glowOrb3Ref = useRef<HTMLDivElement>(null)
  const marqueeLayerRef = useRef<HTMLDivElement>(null)
  const row1Ref = useRef<HTMLDivElement>(null)
  const row2Ref = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [fullscreenVideo, setFullscreenVideo] = useState<VideoTestimonial | null>(null)
  // The videos only become interactive once revealed — before that the marquee
  // layer must stay click-through so it never blocks the section it overlaps
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Master timeline: words assemble → US dissolves on the back layer while the
  // video marquee rises in front of it. One scrubbed timeline = perfect sync.
  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger)
      if (loading) return

      const section = sectionRef.current
      const pin = pinRef.current
      const bg = bgRef.current
      const word1 = word1Ref.current
      const word2 = word2Ref.current
      const word3 = word3Ref.current
      const word4 = word4Ref.current
      const word5 = word5Ref.current
      const word6 = word6Ref.current
      const word7 = word7Ref.current
      const orb1 = glowOrb1Ref.current
      const orb2 = glowOrb2Ref.current
      const orb3 = glowOrb3Ref.current
      const marquee = marqueeLayerRef.current

      if (!section || !pin || !bg || !word1 || !word2 || !word3 || !word4 || !word5 || !word6 || !word7 || !orb1 || !orb2 || !orb3 || !marquee) return

      const scatterMultiplier = isMobile ? 0.5 : 1
      gsap.set(word1, { opacity: 0, x: -200 * scatterMultiplier, y: -100 * scatterMultiplier, rotation: -15, scale: 0.5, force3D: true })
      gsap.set(word2, { opacity: 0, x: 200 * scatterMultiplier, y: 50 * scatterMultiplier, rotation: 10, scale: 0.5, force3D: true })
      gsap.set(word3, { opacity: 0, x: -150 * scatterMultiplier, y: 100 * scatterMultiplier, rotation: -8, scale: 0.5, force3D: true })
      gsap.set(word4, { opacity: 0, x: 100 * scatterMultiplier, y: -80 * scatterMultiplier, rotation: 12, scale: 0.5, force3D: true })
      gsap.set(word5, { opacity: 0, x: -100 * scatterMultiplier, y: 60 * scatterMultiplier, rotation: -5, scale: 0.5, force3D: true })
      gsap.set(word6, { opacity: 0, x: 150 * scatterMultiplier, y: -50 * scatterMultiplier, rotation: 8, scale: 0.5, force3D: true })
      gsap.set(word7, { opacity: 0, scale: 0, rotation: 0, force3D: true, willChange: "transform, opacity" })

      gsap.set(bg, { opacity: 0.8 })
      gsap.set(orb1, { opacity: 0, scale: 0, x: -100 * scatterMultiplier, y: -100 * scatterMultiplier, force3D: true })
      gsap.set(orb2, { opacity: 0, scale: 0, x: 100 * scatterMultiplier, y: 100 * scatterMultiplier, force3D: true })
      gsap.set(orb3, { opacity: 0, scale: 0, x: 0, y: -150 * scatterMultiplier, force3D: true })

      // Video marquee starts hidden, slightly below and shrunk
      gsap.set(marquee, { opacity: 0, y: 80, scale: 0.96, force3D: true })

      const scrollDistance = isMobile ? 2300 : 2900
      // US grows large but lives BEHIND the videos and fades out, so any upscale
      // softness is masked by the cards in front and by its own fade
      const usMaxScale = isMobile ? 3.5 : 8

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: `+=${scrollDistance}`,
          pin: pin,
          pinSpacing: true,
          scrub: 2,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            // Videos are fully revealed in the last stretch of the timeline
            const isRevealed = self.progress > 0.72
            setRevealed((prev) => (prev === isRevealed ? prev : isRevealed))
          },
        },
      })

      // Phase 1: orbs float in, bg starts fading
      tl.to(orb1, { opacity: 0.6, scale: 1, x: 0, y: 0, duration: 0.12, ease: "power2.out" })
        .to(bg, { opacity: 0.6, duration: 0.12, ease: "none" }, "<")
        .to(orb2, { opacity: 0.5, scale: 1.2, x: 0, y: 0, duration: 0.12, ease: "power2.out" }, "-=0.08")
        .to(orb3, { opacity: 0.4, scale: 0.8, x: 0, y: 0, duration: 0.12, ease: "power2.out" }, "-=0.08")

      // Phase 2: words fly in and assemble
      tl.to(word1, { opacity: 1, x: 0, y: 0, rotation: 0, scale: 1, duration: 0.1, ease: "back.out(1.7)" })
        .to(bg, { opacity: 0.5, duration: 0.1, ease: "none" }, "<")
        .to(word2, { opacity: 1, x: 0, y: 0, rotation: 0, scale: 1, duration: 0.1, ease: "back.out(1.7)" }, "-=0.06")
        .to(word3, { opacity: 1, x: 0, y: 0, rotation: 0, scale: 1, duration: 0.1, ease: "back.out(1.7)" }, "-=0.06")
        .to(bg, { opacity: 0.35, duration: 0.1, ease: "none" }, "<")
        .to(word4, { opacity: 1, x: 0, y: 0, rotation: 0, scale: 1, duration: 0.1, ease: "back.out(1.7)" }, "-=0.06")
        .to(word5, { opacity: 1, x: 0, y: 0, rotation: 0, scale: 1, duration: 0.1, ease: "back.out(1.7)" }, "-=0.06")
        .to(bg, { opacity: 0.2, duration: 0.1, ease: "none" }, "<")
        .to(word6, { opacity: 1, x: 0, y: 0, rotation: 0, scale: 1, duration: 0.1, ease: "back.out(1.7)" }, "-=0.06")

      // Phase 3: US explodes in, bg almost gone
      tl.to(word7, { opacity: 1, scale: 1, duration: 0.15, ease: "elastic.out(1, 0.5)" })
        .to(bg, { opacity: 0, duration: 0.15, ease: "power2.out" }, "<")

      // Phase 4: US highlight — color only, no text-shadow (shadow forces a repaint
      // on every scaled frame and makes the zoom shaky, especially on mobile)
      tl.to(word7, {
        color: "#2de6c7",
        scale: 1.1,
        duration: 0.12,
      })

      // brief hold to let "US" land
      tl.to({}, { duration: 0.08 })

      // Phase 5: supporting words fade out
      tl.to([word1, word2, word3, word4, word5, word6], {
        opacity: 0,
        y: -30,
        stagger: 0.015,
        duration: 0.08,
        force3D: true,
      })

      // Phase 6 (THE HANDOFF): US grows + dissolves on the back layer while the
      // video marquee rises in FRONT of it — locked together on this timeline
      tl.to(word7, { scale: usMaxScale, opacity: 0, duration: 0.32, ease: "power1.in", force3D: true })
        .to([orb1, orb2, orb3], { scale: isMobile ? 3 : 5, opacity: 0, duration: 0.3, force3D: true }, "<")
        .to(marquee, { opacity: 1, y: 0, scale: 1, duration: 0.26, ease: "power3.out" }, "<0.06")

      // Phase 7: brief hold on the videos, then release straight into the next
      // section — keeps the handoff tight with no dead scroll
      tl.to({}, { duration: 0.12 })

      setTimeout(() => {
        ScrollTrigger.refresh()
      }, 100)
    },
    { scope: sectionRef, dependencies: [loading, isMobile] }
  )

  // Two continuous marquee rows scrolling opposite ways — same feel as the text testimonials
  useEffect(() => {
    if (loading || !row1Ref.current || !row2Ref.current) return
    gsap.registerPlugin(ScrollTrigger)

    const row1 = row1Ref.current
    const row2 = row2Ref.current
    const cardWidth = isMobile ? 304 : 552 // card width + horizontal margins
    const setWidth = videos.length * cardWidth

    const auto1 = gsap.to(row1, {
      x: `-=${setWidth}`,
      duration: videos.length * 8,
      ease: "none",
      repeat: -1,
      modifiers: { x: gsap.utils.unitize((x: number) => parseFloat(String(x)) % setWidth) },
    })

    // Row 2 starts offset and scrolls the opposite direction
    gsap.set(row2, { x: -setWidth })
    const auto2 = gsap.to(row2, {
      x: `+=${setWidth}`,
      duration: videos.length * 8,
      ease: "none",
      repeat: -1,
      modifiers: { x: gsap.utils.unitize((x: number) => (parseFloat(String(x)) % setWidth) - setWidth) },
    })

    const layer = marqueeLayerRef.current
    const pause = () => { auto1.pause(); auto2.pause() }
    const resume = () => { auto1.resume(); auto2.resume() }
    layer?.addEventListener("mouseenter", pause)
    layer?.addEventListener("mouseleave", resume)

    return () => {
      auto1.kill()
      auto2.kill()
      layer?.removeEventListener("mouseenter", pause)
      layer?.removeEventListener("mouseleave", resume)
    }
  }, [loading, isMobile, videos.length])

  const openFullscreen = (video: VideoTestimonial) => {
    setFullscreenVideo(video)
    document.body.style.overflow = "hidden"
  }
  const closeFullscreen = () => {
    setFullscreenVideo(null)
    document.body.style.overflow = ""
  }

  const marqueeItems = [...videos, ...videos, ...videos, ...videos]
  const reversed = [...videos].reverse()
  const marqueeItems2 = [...reversed, ...reversed, ...reversed, ...reversed]

  return (
    <section ref={sectionRef} className="relative w-full">
      <div ref={pinRef} className="relative h-screen w-full overflow-hidden">
        {/* Background that shifts color */}
        <div
          ref={bgRef}
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, transparent 0%, rgba(45, 230, 199, 0.15) 30%, rgba(0, 85, 255, 0.2) 50%, rgba(45, 230, 199, 0.15) 70%, transparent 100%)",
          }}
        />

        {/* Floating glow orbs */}
        {/* Decorative blurred orbs — hidden on mobile (animating large blurs every
            scroll frame is the biggest source of jank on phones) */}
        <div ref={glowOrb1Ref} className="hidden md:block absolute top-1/4 left-1/4 w-64 h-64 md:w-96 md:h-96 rounded-full pointer-events-none blur-3xl" style={{ background: "radial-gradient(circle, rgba(45, 230, 199, 0.4) 0%, transparent 70%)" }} />
        <div ref={glowOrb2Ref} className="hidden md:block absolute bottom-1/4 right-1/4 w-72 h-72 md:w-[28rem] md:h-[28rem] rounded-full pointer-events-none blur-3xl" style={{ background: "radial-gradient(circle, rgba(0, 85, 255, 0.4) 0%, transparent 70%)" }} />
        <div ref={glowOrb3Ref} className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 md:w-[32rem] md:h-[32rem] rounded-full pointer-events-none blur-3xl" style={{ background: "radial-gradient(circle, rgba(45, 230, 199, 0.3) 0%, transparent 70%)" }} />

        {/* Words layer (back) */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4 pointer-events-none">
          <div className="flex items-center gap-2 md:gap-4 mb-2 md:mb-4">
            <div ref={word1Ref}><span className="font-gilroy font-bold text-2xl md:text-4xl lg:text-5xl text-white uppercase tracking-tight">THIS</span></div>
            <div ref={word2Ref}><span className="font-gilroy font-bold text-2xl md:text-4xl lg:text-5xl text-white uppercase tracking-tight">IS</span></div>
          </div>
          <div className="flex items-center gap-2 md:gap-4 mb-2 md:mb-4">
            <div ref={word3Ref}><span className="font-gilroy font-bold text-2xl md:text-4xl lg:text-5xl text-white uppercase tracking-tight">WHAT</span></div>
            <div ref={word4Ref}><span className="font-gilroy font-bold text-2xl md:text-4xl lg:text-5xl text-white uppercase tracking-tight">PEOPLE</span></div>
          </div>
          <div className="flex items-center gap-2 md:gap-4 mb-4 md:mb-8">
            <div ref={word5Ref}><span className="font-gilroy font-bold text-2xl md:text-4xl lg:text-5xl text-white uppercase tracking-tight">THINK</span></div>
            <div ref={word6Ref}><span className="font-gilroy font-bold text-2xl md:text-4xl lg:text-5xl text-white uppercase tracking-tight">ABOUT</span></div>
          </div>
          <div ref={word7Ref} style={{ willChange: "transform, opacity" }}>
            <span className="font-gilroy font-black text-[20vw] md:text-[15vw] text-white uppercase leading-none">
              US
            </span>
          </div>
        </div>

        {/* Video marquee layer (front) — two rows that rise as US dissolves behind */}
        <div
          ref={marqueeLayerRef}
          className={`absolute inset-0 z-20 flex flex-col justify-center gap-5 md:gap-8 ${revealed ? "pointer-events-auto" : "pointer-events-none"}`}
        >
          <div className="w-full overflow-hidden">
            <div ref={row1Ref} className="flex items-stretch" style={{ width: "max-content" }}>
              {marqueeItems.map((video, index) => (
                <VideoCard key={`r1-${video._id}-${index}`} video={video} onOpen={openFullscreen} />
              ))}
            </div>
          </div>
          <div className="w-full overflow-hidden">
            <div ref={row2Ref} className="flex items-stretch" style={{ width: "max-content" }}>
              {marqueeItems2.map((video, index) => (
                <VideoCard key={`r2-${video._id}-${index}`} video={video} onOpen={openFullscreen} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Modal */}
      {fullscreenVideo !== null && (
        <div
          className="fixed inset-0 z-[2000] flex items-center justify-center p-4 md:p-8 pointer-events-auto"
          style={{ background: "rgba(4, 8, 46, 0.98)" }}
          onClick={closeFullscreen}
        >
          <button
            className="absolute top-6 right-6 z-10 flex h-14 w-14 items-center justify-center rounded-full transition-all duration-300 hover:scale-110"
            style={{
              background: "rgba(255, 255, 255, 0.08)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.12)",
            }}
            onClick={closeFullscreen}
            aria-label="Close video"
          >
            <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Fit the video to its natural shape — works for landscape (YouTube-style)
              AND vertical reels, and fits a portrait phone without cropping */}
          <video
            className="block max-h-[78vh] max-w-[94vw] rounded-2xl"
            style={{ boxShadow: "0 0 100px rgba(45, 230, 199, 0.2)" }}
            src={fullscreenVideo.videoUrl}
            controls
            autoPlay
            playsInline
            onClick={(e) => e.stopPropagation()}
          />

          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 px-4 text-center">
            <h3 className="font-gilroy font-bold text-lg md:text-xl text-white mb-0.5">{fullscreenVideo.name}</h3>
            <p className="font-neue-montreal text-sm" style={{ color: "var(--color-mint-cyan)" }}>{fullscreenVideo.company}</p>
          </div>
        </div>
      )}
    </section>
  )
}

export default CreativeReveal
