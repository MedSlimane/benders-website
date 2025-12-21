"use client"
import Image from "next/image"
import { useRef, useEffect, useState } from "react"
import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import BIcon from "./BIcon"
import MagneticButton from "./MagneticButton"

interface HeroProps {
  loading: boolean
}

// Rotating words for "Systems"
const rotatingWords = ["Systems", "Strategies", "Funnels", "Brands"]

// Animated Hero Text with cursor circle and rotating word
const AnimatedHeroText = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const cursorRef = useRef<HTMLDivElement>(null)
  const rotatingWordRef = useRef<HTMLSpanElement>(null)
  const [currentWordIndex, setCurrentWordIndex] = useState(0)

  // Rotate words every 5 seconds with crossfade
  useEffect(() => {
    const interval = setInterval(() => {
      if (rotatingWordRef.current) {
        // Simple fade out
        gsap.to(rotatingWordRef.current, {
          opacity: 0,
          duration: 0.4,
          ease: "power2.inOut",
          onComplete: () => {
            setCurrentWordIndex((prev) => (prev + 1) % rotatingWords.length)
            // Fade in
            gsap.to(rotatingWordRef.current, {
              opacity: 1,
              duration: 0.4,
              ease: "power2.inOut"
            })
          }
        })
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (!cursorRef.current) return
    gsap.set(cursorRef.current, {
      xPercent: -50,
      yPercent: -50,
      scale: 0,
    })
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !cursorRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    gsap.to(cursorRef.current, {
      x: x,
      y: y,
      duration: 0.12,
      ease: "power2.out",
    })
  }

  const handleMouseEnter = () => {
    if (cursorRef.current) {
      gsap.to(cursorRef.current, {
        scale: 1,
        duration: 0.4,
        ease: "back.out(1.7)",
      })
    }
  }

  const handleMouseLeave = () => {
    if (cursorRef.current) {
      gsap.to(cursorRef.current, {
        scale: 0,
        duration: 0.25,
        ease: "power2.in",
      })
    }
  }

  const handleClick = () => {
    window.open('https://calendar.app.google/ENRJ1d6t9AM9nwy7A', '_blank')
  }

  return (
    <div 
      ref={containerRef}
      className="relative cursor-none"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {/* Custom cursor circle with CTA - with blend mode, dark text */}
      <div 
        ref={cursorRef}
        className="absolute pointer-events-none z-20 w-[120px] h-[120px] md:w-[160px] md:h-[160px] rounded-full flex items-center justify-center"
        style={{
          background: "linear-gradient(135deg, #2de6c7 0%, #04c8aa 100%)",
          mixBlendMode: "difference",
        }}
      >
        <span className="text-black font-gilroy font-bold text-[9px] md:text-[11px] text-center leading-tight px-2 uppercase tracking-wide">
          Book a<br />free call
        </span>
      </div>

      {/* Line 1: We build */}
      <h1 className="font-gilroy font-bold text-[2.25rem] sm:text-[3rem] md:text-[4.5rem] lg:text-[6rem] xl:text-[7rem] text-white leading-[1.05] tracking-[-0.03em]">
        We build
      </h1>
      
      {/* Line 2: Rotating word + that print */}
      <h1 className="font-gilroy font-bold text-[2.25rem] sm:text-[3rem] md:text-[4.5rem] lg:text-[6rem] xl:text-[7rem] text-white leading-[1.05] tracking-[-0.03em] flex flex-wrap items-baseline">
        <span 
          ref={rotatingWordRef}
          className="inline-block"
          style={{
            background: "linear-gradient(135deg, #2de6c7 0%, #04c8aa 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {rotatingWords[currentWordIndex]}
        </span>
        <span className="whitespace-pre"> that print</span>
      </h1>

      {/* Line 3: "money" - white with quotes */}
      <h1 className="font-gilroy font-bold text-[2.25rem] sm:text-[3rem] md:text-[4.5rem] lg:text-[6rem] xl:text-[7rem] leading-[1.05] tracking-[-0.03em] text-white pr-4">
        <span className="italic">&ldquo;money&rdquo;</span>
      </h1>
    </div>
  )
}

const Hero = ({ loading }: HeroProps) => {
  const heroRef = useRef<HTMLElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const subtitleRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLDivElement>(null)
  const videoTriggerRef = useRef<HTMLDivElement>(null)
  const videoPinRef = useRef<HTMLDivElement>(null)
  const videoWrapperRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const controlsRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Video control handlers
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger)

      // Set initial states for logo and subtitle
      gsap.set(logoRef.current, {
        opacity: 0,
        y: 30,
      })
      gsap.set(subtitleRef.current, {
        opacity: 0,
        y: 30,
      })
      gsap.set(buttonRef.current, {
        opacity: 0,
        y: 40,
        scale: 0.9,
      })

      if (loading) return

      // Entry animation timeline
      const tl = gsap.timeline({ delay: 0.3 })

      tl.to(logoRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
      })
      .to(subtitleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
      }, "-=0.2")
      .to(buttonRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.7,
        ease: "back.out(1.7)",
      }, "-=0.4")

      // Desktop only: Scroll-driven video expansion with pinning
      if (!isMobile && videoTriggerRef.current && videoPinRef.current && videoWrapperRef.current) {
        const wrapper = videoWrapperRef.current

        // Calculate scale needed to go from card to fullscreen
        const getScaleToFullscreen = () => {
          const vw = window.innerWidth
          const cardWidth = Math.min(1200, vw * 0.9)
          return vw / cardWidth
        }

        // Set initial state - card size
        gsap.set(wrapper, {
          scale: 1,
          borderRadius: "24px",
        })

        // Create the scroll animation with pinning
        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: videoTriggerRef.current,
            start: "top top",
            end: "+=2500", // Reduced scroll distance
            pin: videoPinRef.current,
            pinSpacing: true,
            scrub: 1.5,
            invalidateOnRefresh: true,
            id: "heroVideo",
          },
        })

        // Phase 1: Gradually expand to fullscreen (0% - 25% of scroll)
        scrollTl.to(wrapper, {
          scale: getScaleToFullscreen,
          borderRadius: "0px",
          duration: 0.25,
          ease: "none",
          onUpdate: function() {
            // Show controls when scale is close to fullscreen
            const progress = this.progress()
            if (progress > 0.8) {
              setIsFullscreen(true)
            } else {
              setIsFullscreen(false)
            }
          }
        })

        // Phase 2: Stay fullscreen while scrolling (25% - 75% of scroll)
        scrollTl.to({}, { duration: 0.5 })

        // Phase 3: Gradually shrink back to card (75% - 100% of scroll)
        scrollTl.to(wrapper, {
          scale: 1,
          borderRadius: "24px",
          duration: 0.25,
          ease: "none",
          onUpdate: function() {
            // Hide controls when shrinking
            const progress = this.progress()
            if (progress > 0.2) {
              setIsFullscreen(false)
            }
          }
        })
      }

      ScrollTrigger.refresh()
    },
    { scope: heroRef, dependencies: [loading, isMobile] },
  )

  return (
    <section 
      ref={heroRef} 
      className={`relative w-full flex flex-col ${loading ? 'opacity-0' : ''}`}
    >
      {/* Logo Bar */}
      <nav className='flex justify-between items-center p-4 w-full md:px-16 md:pt-8'>
        <div ref={logoRef} className='flex items-center p-2'>
          <Image 
            src="/Benders-logo/png/3@2x.png" 
            alt='Benders Logo' 
            width={150} 
            height={150}
            className="w-[100px] md:w-[150px]" 
          />
        </div>
        {/* B Icon - Hidden on mobile/tablet, shown on desktop */}
        <div className='hidden lg:flex items-center p-2'>
          <BIcon className="w-[40px] h-[40px] md:w-[50px] md:h-[50px] text-white" />
        </div>
      </nav>

      {/* Hero Content - Left Aligned, Big Text */}
      <div className="relative z-10 flex flex-col items-start px-4 sm:px-6 md:px-16 pt-[12vh] sm:pt-[15vh] md:pt-[25vh] pb-8 sm:pb-12 md:pb-28">
        <div className="text-left w-full">
          {/* Huge Headline Text */}
          <div ref={subtitleRef}>
            <AnimatedHeroText />
          </div>
          
          {/* Book a Call Button - Primary CTA */}
          <div ref={buttonRef} className="mt-10 md:mt-14">
            <MagneticButton
              href="https://calendar.app.google/ENRJ1d6t9AM9nwy7A"
              variant="glass"
              size="lg"
              icon={
                <svg 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5"
                >
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              }
            >
              Book a Free Call
            </MagneticButton>
          </div>
        </div>
      </div>

      {/* Mobile Video Section - Static card with "See Showreel" button */}
      {isMobile && (
        <div className="relative w-full px-4 pb-8 mt-6">
          <div className="relative w-full rounded-2xl overflow-hidden" style={{ aspectRatio: "16/9" }}>
            <video
              ref={videoRef}
              className="absolute inset-0 h-full w-full object-cover"
              src="/Videos/itel.mp4"
              autoPlay
              muted
              loop
              playsInline
            />
            {/* See Showreel Button */}
            <button
              onClick={() => {
                if (videoRef.current) {
                  videoRef.current.requestFullscreen?.()
                  videoRef.current.muted = false
                  setIsMuted(false)
                }
              }}
              className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full"
              aria-label="See Showreel"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="black" className="w-5 h-5">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
              <span className="text-black font-gilroy font-semibold text-sm">See Showreel</span>
            </button>
          </div>
        </div>
      )}

      {/* Desktop Video Section with Pin Trigger - Scroll animation */}
      {!isMobile && (
        <div ref={videoTriggerRef} className="relative w-full">
          {/* This element gets pinned on desktop */}
          <div 
            ref={videoPinRef}
            className="w-full h-screen flex items-center justify-center overflow-hidden"
          >
            {/* Video wrapper - animates on desktop */}
            <div
              ref={videoWrapperRef}
              className="relative overflow-hidden"
              style={{
                width: "90%",
                maxWidth: "1200px",
                borderRadius: "24px",
                aspectRatio: "16/9",
              }}
            >
              <video
                ref={videoRef}
                className="absolute inset-0 h-full w-full object-cover"
                src="/Videos/itel.mp4"
                autoPlay
                muted
                loop
                playsInline
              />
              
              {/* Video Controls - Only visible when fullscreen on desktop */}
              <div 
                ref={controlsRef}
                className={`absolute bottom-4 right-4 flex items-center gap-0 bg-black/80 backdrop-blur-sm rounded-full transition-all duration-300 ${
                  isFullscreen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
                }`}
              >
                {/* Play/Pause Button */}
                <button
                  onClick={togglePlay}
                  className="p-3 hover:bg-white/10 transition-colors rounded-l-full"
                  aria-label={isPlaying ? "Pause video" : "Play video"}
                >
                  {isPlaying ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="10" y1="15" x2="10" y2="9" />
                      <line x1="14" y1="15" x2="14" y2="9" />
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                      <circle cx="12" cy="12" r="10" />
                      <polygon points="10 8 16 12 10 16 10 8" fill="white" />
                    </svg>
                  )}
                </button>

                {/* Divider */}
                <div className="w-px h-5 bg-white/30" />

                {/* Mute/Unmute Button */}
                <button
                  onClick={toggleMute}
                  className="p-3 hover:bg-white/10 transition-colors rounded-r-full"
                  aria-label={isMuted ? "Unmute video" : "Mute video"}
                >
                  {isMuted ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="white" />
                      <line x1="23" y1="9" x2="17" y2="15" />
                      <line x1="17" y1="9" x2="23" y2="15" />
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="white" />
                      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default Hero