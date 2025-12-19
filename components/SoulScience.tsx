"use client"
import { useRef, useEffect, useState } from "react"
import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"

interface SoulScienceProps {
  loading: boolean
}

const SoulScience = ({ loading }: SoulScienceProps) => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const circleRef = useRef<HTMLDivElement>(null)
  const mainTextRef = useRef<HTMLDivElement>(null)
  const marqueeTextRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)
  
  // Mobile refs
  const mobileSectionRef = useRef<HTMLDivElement>(null)
  const mobileTextRef = useRef<HTMLDivElement>(null)
  const mobileCircleRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Mobile scroll animation
  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger)
      
      if (loading || !isMobile) return

      const section = mobileSectionRef.current
      const text = mobileTextRef.current
      const circle = mobileCircleRef.current

      if (!section || !text || !circle) return

      // Set initial states - circle starts invisible and small
      gsap.set(circle, {
        opacity: 0,
        scale: 0,
      })

      // Circle grows from center as you scroll
      gsap.to(circle, {
        opacity: 1,
        scale: 1,
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          end: "top 20%",
          scrub: 1.5,
        },
      })
    },
    { scope: mobileSectionRef, dependencies: [loading, isMobile] }
  )

  // Desktop scroll animation
  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger)
      
      if (loading || isMobile) return

      const section = sectionRef.current
      const pin = pinRef.current
      const circle = circleRef.current
      const mainText = mainTextRef.current
      const marqueeText = marqueeTextRef.current

      if (!section || !pin || !circle || !mainText || !marqueeText) return

      // Set initial states
      gsap.set(circle, {
        scale: 0,
        opacity: 1,
      })
      gsap.set(marqueeText, {
        xPercent: 100,
        opacity: 0,
      })
      gsap.set(mainText, {
        opacity: 1,
        y: 150,
      })

      // Create the scroll animation - 2X SLOWER
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=9000", // 2x scroll distance
          pin: pin,
          pinSpacing: true,
          scrub: 3, // 2x scrub
          invalidateOnRefresh: true,
          id: "soulScience",
        },
      })

      // Phase 0: Main text scrolls into center (0% - 10%)
      tl.to(mainText, {
        y: 0,
        duration: 0.10,
        ease: "none",
      })

      // Phase 1: Hold text in center (10% - 15%)
      tl.to({}, { duration: 0.05 })

      // Phase 2: Circle grows from center (15% - 35%)
      tl.to(circle, {
        scale: 3,
        duration: 0.20,
        ease: "none",
      })
      .to(mainText, {
        opacity: 0,
        duration: 0.10,
      }, "<0.10")

      // Phase 3: Show marquee text and scroll it left (35% - 70%)
      tl.to(marqueeText, {
        opacity: 1,
        duration: 0.02,
      })
      .to(marqueeText, {
        xPercent: -150,
        duration: 0.33,
        ease: "none",
      }, "<")

      // Phase 4: Circle starts shrinking WHILE text is still moving
      tl.to(circle, {
        scale: 0,
        duration: 0.25,
        ease: "none",
      }, "-=0.15")
      .to(marqueeText, {
        opacity: 0,
        duration: 0.05,
      }, "<0.10")

      // Phase 5: Main text fades back in (95% - 100%)
      tl.to(mainText, {
        opacity: 1,
        y: 0,
        duration: 0.05,
      })

      setTimeout(() => {
        ScrollTrigger.refresh()
      }, 100)
    },
    { scope: sectionRef, dependencies: [loading, isMobile] }
  )

  // Mobile version - text first, then circle grows from center on scroll
  if (isMobile) {
    return (
      <section ref={mobileSectionRef} className="relative w-full py-16 px-4">
        {/* Container for text and circle overlay */}
        <div className="relative flex flex-col items-center justify-center min-h-[420px]">
          {/* Main text - visible first */}
          <div ref={mobileTextRef} className="text-center z-0">
            <h2 className="font-gilroy font-bold text-3xl text-white leading-tight">
              We&apos;re a modern<br />creative agency
            </h2>
          </div>

          {/* Circle with Soul & Science - grows from center on scroll */}
          <div 
            ref={mobileCircleRef}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[240px] h-[240px] rounded-full flex flex-col items-center justify-center z-10"
            style={{ background: "var(--color-mint-cyan)" }}
          >
            <h2 
              className="font-gilroy font-black text-2xl text-center uppercase leading-tight"
              style={{ color: "var(--color-electric-blue)" }}
            >
              SOUL &<br />SCIENCE
            </h2>
            <button className="mt-3 flex items-center gap-1.5 text-xs font-gilroy font-semibold uppercase tracking-wide"
              style={{ color: "var(--color-electric-blue)" }}
            >
              Learn More
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 8l4 4-4 4M8 12h8" />
              </svg>
            </button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section ref={sectionRef} className="relative w-full">
      {/* Pinned container */}
      <div ref={pinRef} className="relative h-screen w-full overflow-hidden">
        {/* Circle that expands */}
        <div
          ref={circleRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vmax] h-[150vmax] rounded-full pointer-events-none"
          style={{
            background: "var(--color-mint-cyan)",
          }}
        />

        {/* Main centered text */}
        <div
          ref={mainTextRef}
          className="absolute inset-0 flex items-center justify-center z-10"
        >
          <h2 className="font-gilroy font-bold text-4xl md:text-5xl lg:text-6xl text-white text-center leading-tight uppercase">
            We&apos;re A Modern<br />Creative Agency
          </h2>
        </div>

        {/* Horizontal scrolling text */}
        <div
          ref={marqueeTextRef}
          className="absolute inset-0 flex items-center z-20 pointer-events-none"
        >
          <h2 
            className="font-gilroy font-black text-[15vw] md:text-[18vw] whitespace-nowrap uppercase tracking-tight"
            style={{
              color: "var(--color-electric-blue)",
            }}
          >
            SOUL & SCIENCE
          </h2>
        </div>
      </div>
    </section>
  )
}

export default SoulScience
