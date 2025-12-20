"use client"
import { useRef, useEffect, useState } from "react"
import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"

interface CreativeRevealProps {
  loading: boolean
}

const CreativeReveal = ({ loading }: CreativeRevealProps) => {
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

      if (!section || !pin || !bg || !word1 || !word2 || !word3 || !word4 || !word5 || !word6 || !word7 || !orb1 || !orb2 || !orb3) return

      // Set initial states - words scattered around (smaller scatter on mobile)
      const scatterMultiplier = isMobile ? 0.5 : 1
      gsap.set(word1, { opacity: 0, x: -200 * scatterMultiplier, y: -100 * scatterMultiplier, rotation: -15, scale: 0.5, force3D: true }) // THIS
      gsap.set(word2, { opacity: 0, x: 200 * scatterMultiplier, y: 50 * scatterMultiplier, rotation: 10, scale: 0.5, force3D: true }) // IS
      gsap.set(word3, { opacity: 0, x: -150 * scatterMultiplier, y: 100 * scatterMultiplier, rotation: -8, scale: 0.5, force3D: true }) // WHAT
      gsap.set(word4, { opacity: 0, x: 100 * scatterMultiplier, y: -80 * scatterMultiplier, rotation: 12, scale: 0.5, force3D: true }) // PEOPLE
      gsap.set(word5, { opacity: 0, x: -100 * scatterMultiplier, y: 60 * scatterMultiplier, rotation: -5, scale: 0.5, force3D: true }) // THINK
      gsap.set(word6, { opacity: 0, x: 150 * scatterMultiplier, y: -50 * scatterMultiplier, rotation: 8, scale: 0.5, force3D: true }) // ABOUT
      gsap.set(word7, { opacity: 0, scale: 0, rotation: 0, force3D: true, willChange: "transform, opacity" }) // US

      // Background starts visible but subtle
      gsap.set(bg, { opacity: 0.8 })

      // Orbs start small and scattered (smaller on mobile for performance)
      gsap.set(orb1, { opacity: 0, scale: 0, x: -100 * scatterMultiplier, y: -100 * scatterMultiplier, force3D: true })
      gsap.set(orb2, { opacity: 0, scale: 0, x: 100 * scatterMultiplier, y: 100 * scatterMultiplier, force3D: true })
      gsap.set(orb3, { opacity: 0, scale: 0, x: 0, y: -150 * scatterMultiplier, force3D: true })

      const scrollDistance = isMobile ? 4000 : 7000
      const usMaxScale = isMobile ? 25 : 40 // Smaller scale on mobile for performance

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: `+=${scrollDistance}`,
          pin: pin,
          pinSpacing: true,
          scrub: 3,
          invalidateOnRefresh: true,
        },
      })

      // Phase 1: Orbs float in and start glowing, bg starts fading very slowly
      tl.to(orb1, {
        opacity: 0.6,
        scale: 1,
        x: 0,
        y: 0,
        duration: 0.12,
        ease: "power2.out",
      })
      .to(bg, {
        opacity: 0.6,
        duration: 0.12,
        ease: "none",
      }, "<")
      .to(orb2, {
        opacity: 0.5,
        scale: 1.2,
        x: 0,
        y: 0,
        duration: 0.12,
        ease: "power2.out",
      }, "-=0.08")
      .to(orb3, {
        opacity: 0.4,
        scale: 0.8,
        x: 0,
        y: 0,
        duration: 0.12,
        ease: "power2.out",
      }, "-=0.08")

      // Phase 2: Words fly in one by one and assemble, bg continues fading
      tl.to(word1, {
        opacity: 1,
        x: 0,
        y: 0,
        rotation: 0,
        scale: 1,
        duration: 0.1,
        ease: "back.out(1.7)",
      })
      .to(bg, {
        opacity: 0.5,
        duration: 0.1,
        ease: "none",
      }, "<")
      .to(word2, {
        opacity: 1,
        x: 0,
        y: 0,
        rotation: 0,
        scale: 1,
        duration: 0.1,
        ease: "back.out(1.7)",
      }, "-=0.06")
      .to(word3, {
        opacity: 1,
        x: 0,
        y: 0,
        rotation: 0,
        scale: 1,
        duration: 0.1,
        ease: "back.out(1.7)",
      }, "-=0.06")
      .to(bg, {
        opacity: 0.35,
        duration: 0.1,
        ease: "none",
      }, "<")
      .to(word4, {
        opacity: 1,
        x: 0,
        y: 0,
        rotation: 0,
        scale: 1,
        duration: 0.1,
        ease: "back.out(1.7)",
      }, "-=0.06")
      .to(word5, {
        opacity: 1,
        x: 0,
        y: 0,
        rotation: 0,
        scale: 1,
        duration: 0.1,
        ease: "back.out(1.7)",
      }, "-=0.06")
      .to(bg, {
        opacity: 0.2,
        duration: 0.1,
        ease: "none",
      }, "<")
      .to(word6, {
        opacity: 1,
        x: 0,
        y: 0,
        rotation: 0,
        scale: 1,
        duration: 0.1,
        ease: "back.out(1.7)",
      }, "-=0.06")

      // Phase 3: "US" explodes in big, background almost gone
      .to(word7, {
        opacity: 1,
        scale: 1,
        duration: 0.15,
        ease: "elastic.out(1, 0.5)",
      })
      .to(bg, {
        opacity: 0,
        duration: 0.15,
        ease: "power2.out",
      }, "<")

      // Phase 4: Orbs pulse and move
      .to(orb1, {
        scale: 1.5,
        x: -50,
        y: -30,
        duration: 0.1,
      })
      .to(orb2, {
        scale: 1.8,
        x: 60,
        y: 40,
        duration: 0.1,
      }, "<")
      .to(orb3, {
        scale: 1.2,
        x: -30,
        y: 50,
        duration: 0.1,
      }, "<")

      // Phase 5: "US" gets highlighted
      .to(word7, {
        color: "#2de6c7",
        textShadow: "0 0 80px rgba(45, 230, 199, 0.9), 0 0 120px rgba(45, 230, 199, 0.5)",
        scale: 1.1,
        duration: 0.1,
      })

      // Hold
      .to({}, { duration: 0.1 })

      // Phase 6: Other words fade out
      .to([word1, word2, word3, word4, word5, word6], {
        opacity: 0,
        y: -30,
        stagger: 0.015,
        duration: 0.08,
        force3D: true,
      })

      // Phase 7: "US" zooms in HUGE - beyond the screen (optimized for performance)
      .to(word7, {
        scale: usMaxScale,
        opacity: 0,
        duration: 0.2,
        ease: "power2.in",
        force3D: true,
      })

      // Phase 8: Orbs expand and fade
      .to([orb1, orb2, orb3], {
        scale: isMobile ? 3 : 5,
        opacity: 0,
        duration: 0.12,
        force3D: true,
      }, "-=0.12")

      setTimeout(() => {
        ScrollTrigger.refresh()
      }, 100)
    },
    { scope: sectionRef, dependencies: [loading, isMobile] }
  )

  return (
    <section ref={sectionRef} className="relative w-full">
      <div ref={pinRef} className="relative h-screen w-full overflow-hidden">
        {/* Background that shifts color - gradient that blends with main bg */}
        <div
          ref={bgRef}
          className="absolute inset-0 pointer-events-none"
          style={{ 
            background: "linear-gradient(180deg, transparent 0%, rgba(45, 230, 199, 0.15) 30%, rgba(0, 85, 255, 0.2) 50%, rgba(45, 230, 199, 0.15) 70%, transparent 100%)",
          }}
        />

        {/* Floating glow orbs */}
        <div
          ref={glowOrb1Ref}
          className="absolute top-1/4 left-1/4 w-64 h-64 md:w-96 md:h-96 rounded-full pointer-events-none blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(45, 230, 199, 0.4) 0%, transparent 70%)" }}
        />
        <div
          ref={glowOrb2Ref}
          className="absolute bottom-1/4 right-1/4 w-72 h-72 md:w-[28rem] md:h-[28rem] rounded-full pointer-events-none blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(0, 85, 255, 0.4) 0%, transparent 70%)" }}
        />
        <div
          ref={glowOrb3Ref}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 md:w-[32rem] md:h-[32rem] rounded-full pointer-events-none blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(45, 230, 199, 0.3) 0%, transparent 70%)" }}
        />

        {/* Text container - stacked layout */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-4">
          {/* Line 1: THIS IS */}
          <div className="flex items-center gap-2 md:gap-4 mb-2 md:mb-4">
            <div ref={word1Ref}>
              <span className="font-gilroy font-bold text-2xl md:text-4xl lg:text-5xl text-white uppercase tracking-tight">
                THIS
              </span>
            </div>
            <div ref={word2Ref}>
              <span className="font-gilroy font-bold text-2xl md:text-4xl lg:text-5xl text-white uppercase tracking-tight">
                IS
              </span>
            </div>
          </div>

          {/* Line 2: WHAT PEOPLE */}
          <div className="flex items-center gap-2 md:gap-4 mb-2 md:mb-4">
            <div ref={word3Ref}>
              <span className="font-gilroy font-bold text-2xl md:text-4xl lg:text-5xl text-white uppercase tracking-tight">
                WHAT
              </span>
            </div>
            <div ref={word4Ref}>
              <span className="font-gilroy font-bold text-2xl md:text-4xl lg:text-5xl text-white uppercase tracking-tight">
                PEOPLE
              </span>
            </div>
          </div>

          {/* Line 3: THINK ABOUT */}
          <div className="flex items-center gap-2 md:gap-4 mb-4 md:mb-8">
            <div ref={word5Ref}>
              <span className="font-gilroy font-bold text-2xl md:text-4xl lg:text-5xl text-white uppercase tracking-tight">
                THINK
              </span>
            </div>
            <div ref={word6Ref}>
              <span className="font-gilroy font-bold text-2xl md:text-4xl lg:text-5xl text-white uppercase tracking-tight">
                ABOUT
              </span>
            </div>
          </div>

          {/* Line 4: US - Big and bold */}
          <div ref={word7Ref} style={{ willChange: "transform, opacity" }}>
            <span 
              className="font-gilroy font-black text-[20vw] md:text-[15vw] text-white uppercase leading-none"
              style={{ textShadow: "0 0 40px rgba(45, 230, 199, 0.3)" }}
            >
              US
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CreativeReveal
