"use client"
import { useRef, useEffect, useState } from "react"
import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { createPortal } from "react-dom"
import ExpectCard from "./ExpectCard"

interface OwnerRevealProps {
  loading: boolean
  founderVideoUrl?: string
}

const OwnerReveal = ({ loading, founderVideoUrl }: OwnerRevealProps) => {
  // Sanity-managed founder video, with the bundled file as a fallback
  const founderVideoSrc = founderVideoUrl || "/Videos/itel.mp4"
  const sectionRef = useRef<HTMLDivElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const word1Ref = useRef<HTMLSpanElement>(null)
  const word2Ref = useRef<HTMLSpanElement>(null)
  const word3Ref = useRef<HTMLSpanElement>(null)
  const word4Ref = useRef<HTMLSpanElement>(null)
  const word5Ref = useRef<HTMLSpanElement>(null)
  const word6Ref = useRef<HTMLSpanElement>(null)
  const ctaCircleRef = useRef<HTMLAnchorElement>(null)
  const videoWrapperRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const glowOrb1Ref = useRef<HTMLDivElement>(null)
  const glowOrb2Ref = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)
  // "What do you expect?" button appears over the video once it settles
  const [buttonRevealed, setButtonRevealed] = useState(false)
  // Founder video grows to fullscreen on click
  const [videoOpen, setVideoOpen] = useState(false)

  useEffect(() => {
    if (!videoOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => { document.body.style.overflow = prev }
  }, [videoOpen])

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Magnetic effect for CTA circle
  useEffect(() => {
    if (isMobile || !ctaCircleRef.current) return

    const circle = ctaCircleRef.current
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = circle.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const deltaX = e.clientX - centerX
      const deltaY = e.clientY - centerY
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
      
      if (distance < 250) {
        const pull = (250 - distance) / 250
        gsap.to(circle, {
          x: deltaX * pull * 0.5,
          y: deltaY * pull * 0.5,
          duration: 0.3,
          ease: "power2.out",
        })
      }
    }

    const handleMouseLeave = () => {
      gsap.to(circle, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: "elastic.out(1, 0.4)",
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    circle.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      circle.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [isMobile])

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger)
      
      if (loading) return

      const section = sectionRef.current
      const pin = pinRef.current
      const word1 = word1Ref.current
      const word2 = word2Ref.current
      const word3 = word3Ref.current
      const word4 = word4Ref.current
      const word5 = word5Ref.current
      const word6 = word6Ref.current
      const ctaCircle = ctaCircleRef.current
      const videoWrapper = videoWrapperRef.current
      const orb1 = glowOrb1Ref.current
      const orb2 = glowOrb2Ref.current

      if (!section || !pin || !word1 || !word2 || !word3 || !word4 || !word5 || !word6 || !ctaCircle || !videoWrapper || !orb1 || !orb2) return

      const scrollDistance = isMobile ? 1700 : 2400

      // Calculate scale for fullscreen video
      const getScaleToFullscreen = () => {
        const vw = window.innerWidth
        const vh = window.innerHeight
        const cardWidth = isMobile ? vw * 0.9 : Math.min(900, vw * 0.8)
        const cardHeight = cardWidth * (9 / 16)
        // On mobile, we want the video to fill the full width at minimum
        // and scale height to cover the screen
        const scaleX = vw / cardWidth
        const scaleY = vh / cardHeight
        // Use max to ensure full coverage
        return Math.max(scaleX, scaleY) * (isMobile ? 1.1 : 1)
      }

      // Set initial states - words scattered
      const scatterMultiplier = isMobile ? 0.6 : 1
      gsap.set(word1, { opacity: 0, y: -80 * scatterMultiplier, x: -100 * scatterMultiplier, rotation: -12, scale: 0.6, force3D: true })
      gsap.set(word2, { opacity: 0, y: 60 * scatterMultiplier, x: 80 * scatterMultiplier, rotation: 8, scale: 0.6, force3D: true })
      gsap.set(word3, { opacity: 0, y: -50 * scatterMultiplier, x: -60 * scatterMultiplier, rotation: -6, scale: 0.6, force3D: true })
      gsap.set(word4, { opacity: 0, y: 70 * scatterMultiplier, x: 50 * scatterMultiplier, rotation: 10, scale: 0.6, force3D: true })
      gsap.set(word5, { opacity: 0, y: -40 * scatterMultiplier, x: -40 * scatterMultiplier, rotation: -8, scale: 0.6, force3D: true })
      gsap.set(word6, { opacity: 0, y: 50 * scatterMultiplier, x: 30 * scatterMultiplier, rotation: 5, scale: 0.6, force3D: true })
      
      gsap.set(ctaCircle, { scale: 0, opacity: 0, rotation: -90 })
      gsap.set(videoWrapper, { scale: 0.3, opacity: 0, borderRadius: "50%" })
      gsap.set(orb1, { scale: 0, opacity: 0 })
      gsap.set(orb2, { scale: 0, opacity: 0 })

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
            // Reveal the button once the video has settled near the end
            const show = self.progress > 0.88
            setButtonRevealed((prev) => (prev === show ? prev : show))
          },
        },
      })

      // Phase 1+2: orbs + words assemble IMMEDIATELY (from timeline position 0) so
      // the section never sits as empty gradient while you scroll into it
      tl.to([orb1, orb2], { scale: 1, opacity: 0.35, duration: 0.05, ease: "power2.out" }, 0)
        .to(
          [word1, word2, word3, word4, word5, word6],
          { opacity: 1, y: 0, x: 0, rotation: 0, scale: 1, duration: 0.06, stagger: 0.018, ease: "back.out(1.7)" },
          0
        )

      // Phase 3: Hold text
      tl.to({}, { duration: 0.08 })

      // Phase 4: CTA circle spins in
      tl.to(ctaCircle, {
        scale: 1,
        opacity: 1,
        rotation: 0,
        duration: 0.1,
        ease: "elastic.out(1, 0.5)",
      })

      // Phase 5: Hold with CTA visible
      tl.to({}, { duration: 0.12 })

      // Phase 6: Text and CTA fade out
      tl.to([word1, word2, word3, word4, word5, word6], {
        opacity: 0,
        y: -50,
        stagger: 0.008,
        duration: 0.06,
        force3D: true,
      })
        .to(ctaCircle, {
          scale: 0.5,
          opacity: 0,
          duration: 0.06,
        }, "-=0.04")

      // Phase 7: Video appears as card
      tl.to(videoWrapper, {
        scale: 1,
        opacity: 1,
        borderRadius: isMobile ? "16px" : "24px",
        duration: 0.12,
        ease: "power3.out",
      })

      // Phase 8: brief beat on the card
      tl.to({}, { duration: 0.03 })

      if (!isMobile) {
        // Desktop only: Video expands to fullscreen
        tl.to(videoWrapper, {
          scale: getScaleToFullscreen,
          borderRadius: "0px",
          duration: 0.15,
          ease: "power2.inOut",
        })

        // Hold fullscreen
        tl.to({}, { duration: 0.1 })

        // Video shrinks back to card
        tl.to(videoWrapper, {
          scale: 1,
          borderRadius: "24px",
          duration: 0.15,
          ease: "power2.inOut",
        })
      }

      // Fade out orbs as soon as the card settles — release the pin promptly into
      // the next section instead of holding the video pinned (that was the dead gap)
      tl.to([orb1, orb2], {
        scale: 0,
        opacity: 0,
        duration: 0.05,
      })

      setTimeout(() => {
        ScrollTrigger.refresh()
      }, 100)
    },
    { scope: sectionRef, dependencies: [loading, isMobile] }
  )

  return (
    <section ref={sectionRef} className="relative w-full">
      <div ref={pinRef} className="relative h-screen w-full overflow-hidden">
        {/* Floating glow orbs */}
        <div
          ref={glowOrb1Ref}
          className="hidden md:block absolute top-1/3 left-1/4 w-64 h-64 md:w-96 md:h-96 rounded-full pointer-events-none blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(45, 230, 199, 0.3) 0%, transparent 70%)" }}
        />
        <div
          ref={glowOrb2Ref}
          className="hidden md:block absolute bottom-1/3 right-1/4 w-72 h-72 md:w-[28rem] md:h-[28rem] rounded-full pointer-events-none blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(0, 85, 255, 0.3) 0%, transparent 70%)" }}
        />

        {/* Text container */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-4">
          {/* Line 1: We will */}
          <div className="flex items-center gap-2 md:gap-4 mb-1 md:mb-2">
            <span
              ref={word1Ref}
              className="font-gilroy font-bold text-3xl md:text-5xl lg:text-6xl xl:text-7xl text-white uppercase tracking-tight"
            >
              We
            </span>
            <span
              ref={word2Ref}
              className="font-gilroy font-bold text-3xl md:text-5xl lg:text-6xl xl:text-7xl text-white uppercase tracking-tight"
            >
              will
            </span>
          </div>

          {/* Line 2: make it */}
          <div className="flex items-center gap-2 md:gap-4 mb-1 md:mb-2">
            <span
              ref={word3Ref}
              className="font-gilroy font-bold text-3xl md:text-5xl lg:text-6xl xl:text-7xl text-white uppercase tracking-tight"
            >
              make
            </span>
            <span
              ref={word4Ref}
              className="font-gilroy font-bold text-3xl md:text-5xl lg:text-6xl xl:text-7xl text-white uppercase tracking-tight"
            >
              it
            </span>
          </div>

          {/* Line 3: work for you */}
          <div className="flex items-center gap-2 md:gap-4">
            <span
              ref={word5Ref}
              className="font-gilroy font-bold text-3xl md:text-5xl lg:text-6xl xl:text-7xl uppercase tracking-tight"
              style={{ color: "var(--color-electric-blue)" }}
            >
              work
            </span>
            <span
              ref={word6Ref}
              className="font-gilroy font-bold text-3xl md:text-5xl lg:text-6xl xl:text-7xl text-white uppercase tracking-tight"
            >
              for you
            </span>
          </div>
        </div>

        {/* CTA Circle Button - with CSS hover */}
        <a
          ref={ctaCircleRef}
          href="https://calendar.app.google/ENRJ1d6t9AM9nwy7A"
          target="_blank"
          rel="noopener noreferrer"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 mt-[180px] md:mt-[220px] flex items-center justify-center w-[140px] h-[140px] md:w-[180px] md:h-[180px] rounded-full cursor-pointer group"
          style={{
            border: "2px solid var(--color-mint-cyan)",
            boxShadow: "0 0 30px rgba(45, 230, 199, 0.2)",
          }}
        >
          {/* Background that fills on hover */}
          <div 
            className="absolute inset-0 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100"
            style={{ background: "linear-gradient(135deg, #2de6c7 0%, #04c8aa 100%)" }}
          />
          {/* Glow on hover */}
          <div 
            className="absolute inset-0 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100"
            style={{ boxShadow: "0 0 60px rgba(45, 230, 199, 0.5), inset 0 0 30px rgba(45, 230, 199, 0.1)" }}
          />
          <span
            className="relative z-10 font-gilroy font-bold text-sm md:text-base uppercase tracking-wider text-center transition-colors duration-300 group-hover:text-[#04082e]"
            style={{ color: "var(--color-mint-cyan)" }}
          >
            Book a<br />Call
          </span>
        </a>

        {/* Video wrapper — click to grow to fullscreen */}
        <div
          ref={videoWrapperRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 w-[95%] md:w-[80%] max-w-[900px] overflow-hidden cursor-pointer group"
          style={{ aspectRatio: "16/9" }}
          onClick={() => setVideoOpen(true)}
        >
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover"
            src={founderVideoSrc}
            autoPlay
            muted
            loop
            playsInline
          />
          {/* Play / expand affordance */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div
              className="flex h-16 w-16 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110"
              style={{
                background: "rgba(255, 255, 255, 0.12)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
              }}
            >
              <svg className="ml-1 h-7 w-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </div>

        {/* "What do you expect?" — on desktop it sits ON the video (centered); on
            mobile it sits UNDER the video so it's easy to tap. The wrapper stays
            click-through so it never blocks tapping the video behind it. */}
        <div
          className={`pointer-events-none absolute left-1/2 z-40 -translate-x-1/2 transition-opacity duration-500
            top-[64%] md:top-1/2 md:-translate-y-1/2
            ${buttonRevealed ? "opacity-100" : "opacity-0"}`}
        >
          <div className={buttonRevealed ? "pointer-events-auto" : "pointer-events-none"}>
            <ExpectCard />
          </div>
        </div>
      </div>

      {/* Fullscreen founder video */}
      {videoOpen &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            className="fixed inset-0 z-[2000] flex items-center justify-center p-4 md:p-8"
            style={{ background: "rgba(4, 8, 46, 0.97)" }}
            onClick={() => setVideoOpen(false)}
          >
            <button
              onClick={() => setVideoOpen(false)}
              aria-label="Close video"
              className="absolute top-6 right-6 flex h-12 w-12 items-center justify-center rounded-full transition-transform duration-300 hover:scale-110"
              style={{
                background: "rgba(255, 255, 255, 0.08)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
              }}
            >
              <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <video
              className="block max-h-[80vh] max-w-[94vw] rounded-2xl"
              style={{ boxShadow: "0 0 100px rgba(45, 230, 199, 0.2)" }}
              src={founderVideoSrc}
              controls
              autoPlay
              playsInline
              onClick={(e) => e.stopPropagation()}
            />
          </div>,
          document.body
        )}
    </section>
  )
}

export default OwnerReveal
