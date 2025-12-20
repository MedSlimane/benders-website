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
  const becauseRef = useRef<HTMLDivElement>(null)
  const weDidRef = useRef<HTMLDivElement>(null)
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([])
  const weDidWordsRef = useRef<(HTMLSpanElement | null)[]>([])
  const [isMobile, setIsMobile] = useState(false)
  
  // Mobile refs
  const mobileSectionRef = useRef<HTMLDivElement>(null)
  const mobilePinRef = useRef<HTMLDivElement>(null)
  const mobileCircleRef = useRef<HTMLDivElement>(null)
  const mobileText1Ref = useRef<HTMLDivElement>(null)
  const mobileText2Ref = useRef<HTMLDivElement>(null)
  const mobileText3Ref = useRef<HTMLDivElement>(null)
  const mobileText4Ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Mobile scroll animation - full screen pinned like desktop
  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger)
      
      if (loading || !isMobile) return

      const section = mobileSectionRef.current
      const pin = mobilePinRef.current
      const circle = mobileCircleRef.current
      const text1 = mobileText1Ref.current
      const text2 = mobileText2Ref.current
      const text3 = mobileText3Ref.current
      const text4 = mobileText4Ref.current

      if (!section || !pin || !circle || !text1 || !text2 || !text3 || !text4) return

      // Set initial states
      gsap.set(circle, { scale: 0, opacity: 1 })
      gsap.set(text1, { opacity: 1, y: 50 })
      gsap.set(text2, { opacity: 0, scale: 0.5 })
      gsap.set(text3, { opacity: 0, scale: 0.5 })
      gsap.set(text4, { opacity: 0, y: 30 })

      // Create timeline - full screen pinned animation like desktop
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=4000",
          pin: pin,
          pinSpacing: true,
          scrub: 3,
          invalidateOnRefresh: true,
        },
      })

      // Phase 0: Text scrolls into center
      tl.to(text1, {
        y: 0,
        duration: 0.1,
        ease: "none",
      })

      // Hold
      .to({}, { duration: 0.05 })

      // Phase 1: Circle expands from center
      .to(circle, {
        scale: 3,
        duration: 0.2,
        ease: "none",
      })
      
      // Phase 2: First text fades out
      .to(text1, {
        opacity: 0,
        duration: 0.1,
      }, "<0.1")

      // Phase 3: WHY US scales in
      .to(text2, {
        opacity: 1,
        scale: 1,
        duration: 0.15,
        ease: "back.out(1.7)",
      })

      // Hold WHY US
      .to({}, { duration: 0.1 })

      // Phase 4: WHY US fades, BECAUSE appears
      .to(text2, {
        opacity: 0,
        scale: 1.2,
        duration: 0.1,
      })
      .to(text3, {
        opacity: 1,
        scale: 1,
        duration: 0.15,
        ease: "back.out(1.7)",
      }, "-=0.05")

      // Hold BECAUSE
      .to({}, { duration: 0.1 })

      // Phase 5: BECAUSE fades, final text appears
      .to(text3, {
        opacity: 0,
        scale: 0.8,
        duration: 0.1,
      })
      .to(text4, {
        opacity: 1,
        y: 0,
        duration: 0.15,
        ease: "power3.out",
      }, "-=0.05")

      // Hold final text
      .to({}, { duration: 0.1 })

      // Phase 6: Everything fades, circle shrinks
      .to(text4, {
        opacity: 0,
        y: -20,
        duration: 0.1,
      })
      .to(circle, {
        scale: 0,
        duration: 0.2,
        ease: "none",
      }, "-=0.05")

      // Phase 7: First text fades back in
      .to(text1, {
        opacity: 1,
        y: 0,
        duration: 0.05,
      })

      setTimeout(() => {
        ScrollTrigger.refresh()
      }, 100)
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
      const because = becauseRef.current
      const weDid = weDidRef.current
      const letters = letterRefs.current.filter(Boolean)
      const weDidWords = weDidWordsRef.current.filter(Boolean)

      if (!section || !pin || !circle || !mainText || !marqueeText || !because || !weDid) return

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
      gsap.set(because, {
        opacity: 0,
      })
      gsap.set(weDid, {
        opacity: 0,
      })
      
      // Set each letter initial state - scattered and rotated
      letters.forEach((letter) => {
        gsap.set(letter, {
          opacity: 0,
          y: gsap.utils.random(-200, 200),
          x: gsap.utils.random(-300, 300),
          rotation: gsap.utils.random(-180, 180),
          scale: gsap.utils.random(0.3, 2),
        })
      })

      // Set "We did that" words initial state
      weDidWords.forEach((word) => {
        gsap.set(word, {
          opacity: 0,
          y: 100,
          rotateX: -90,
        })
      })

      // Create the scroll animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=9000",
          pin: pin,
          pinSpacing: true,
          scrub: 3,
          invalidateOnRefresh: true,
          id: "soulScience",
        },
      })

      // Phase 0: Main text scrolls into center
      tl.to(mainText, {
        y: 0,
        duration: 0.10,
        ease: "none",
      })

      // Phase 1: Hold text in center
      tl.to({}, { duration: 0.05 })

      // Phase 2: Circle grows from center
      tl.to(circle, {
        scale: 3,
        duration: 0.20,
        ease: "none",
      })
      .to(mainText, {
        opacity: 0,
        duration: 0.10,
      }, "<0.10")

      // Phase 3: Show marquee text and scroll it left
      tl.to(marqueeText, {
        opacity: 1,
        duration: 0.02,
      })
      .to(marqueeText, {
        xPercent: -150,
        duration: 0.20,
        ease: "none",
      }, "<")

      // Phase 4: Fade out marquee, show "Because" container
      tl.to(marqueeText, {
        opacity: 0,
        duration: 0.05,
      })
      .to(because, {
        opacity: 1,
        duration: 0.02,
      })

      // Phase 5: WILD "Because" animation - letters fly in from chaos
      letters.forEach((letter, i) => {
        tl.to(letter, {
          opacity: 1,
          y: 0,
          x: 0,
          rotation: 0,
          scale: 1,
          duration: 0.15,
          ease: "back.out(1.7)",
        }, `-=${i === 0 ? 0 : 0.12}`)
      })

      // Phase 6: Letters do a wave effect
      tl.to(letters, {
        y: -30,
        stagger: {
          each: 0.02,
          from: "start",
        },
        duration: 0.08,
        ease: "power2.out",
      })
      .to(letters, {
        y: 0,
        stagger: {
          each: 0.02,
          from: "start",
        },
        duration: 0.08,
        ease: "bounce.out",
      })

      // Phase 7: Color shift wave
      tl.to(letters, {
        color: "#2de6c7",
        stagger: {
          each: 0.015,
          from: "center",
        },
        duration: 0.05,
      })
      .to(letters, {
        color: "var(--color-electric-blue)",
        stagger: {
          each: 0.015,
          from: "edges",
        },
        duration: 0.05,
      })

      // Phase 8: Because fades out
      tl.to(because, {
        opacity: 0,
        scale: 0.8,
        duration: 0.08,
      })

      // Phase 9: "We did that multiple times" appears
      tl.to(weDid, {
        opacity: 1,
        duration: 0.02,
      })
      
      // Words flip in one by one
      weDidWords.forEach((word, i) => {
        tl.to(word, {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.12,
          ease: "back.out(1.7)",
        }, `-=${i === 0 ? 0 : 0.08}`)
      })

      // Hold for a moment
      tl.to({}, { duration: 0.10 })

      // Phase 10: Circle shrinks, "We did that" fades
      tl.to(circle, {
        scale: 0,
        duration: 0.20,
        ease: "none",
      })
      .to(weDid, {
        opacity: 0,
        y: -50,
        duration: 0.10,
      }, "<0.05")

      // Phase 11: Main text fades back in
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

  const becauseText = "BECAUSE"
  const weDidText = ["We", "did", "that", "multiple", "times"]

  // Mobile version - full screen pinned like desktop
  if (isMobile) {
    return (
      <section ref={mobileSectionRef} className="relative w-full">
        {/* Pinned container - full screen */}
        <div ref={mobilePinRef} className="relative h-screen w-full overflow-hidden">
          {/* Expanding circle - same mint color as desktop */}
          <div
            ref={mobileCircleRef}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vmax] h-[150vmax] rounded-full pointer-events-none"
            style={{ background: "var(--color-mint-cyan)" }}
          />

          {/* Text 1: Results That Speak Louder */}
          <div
            ref={mobileText1Ref}
            className="absolute inset-0 flex items-center justify-center z-10 px-6"
          >
            <h2 className="font-gilroy font-bold text-3xl text-white text-center leading-tight uppercase">
              Results That<br />Speak Louder
            </h2>
          </div>

          {/* Text 2: WHY US */}
          <div
            ref={mobileText2Ref}
            className="absolute inset-0 flex items-center justify-center z-20 px-6"
          >
            <h2 
              className="font-gilroy font-black text-[18vw] uppercase tracking-tight"
              style={{ color: "var(--color-electric-blue)" }}
            >
              WHY US
            </h2>
          </div>

          {/* Text 3: BECAUSE */}
          <div
            ref={mobileText3Ref}
            className="absolute inset-0 flex items-center justify-center z-20 px-6"
          >
            <h2 
              className="font-gilroy font-black text-[14vw] uppercase tracking-tight"
              style={{ 
                color: "var(--color-electric-blue)",
                textShadow: "0 0 40px rgba(45, 230, 199, 0.5)",
              }}
            >
              BECAUSE
            </h2>
          </div>

          {/* Text 4: We did that multiple times */}
          <div
            ref={mobileText4Ref}
            className="absolute inset-0 flex items-center justify-center z-20 px-6"
          >
            <h2 
              className="font-gilroy font-bold text-2xl text-center leading-tight"
              style={{ color: "var(--color-electric-blue)" }}
            >
              We did that<br />multiple times
            </h2>
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
            Results That<br />Speak Louder
          </h2>
        </div>

        {/* Horizontal scrolling text - WHY US */}
        <div
          ref={marqueeTextRef}
          className="absolute inset-0 flex items-center z-20 pointer-events-none"
        >
          <h2 
            className="font-gilroy font-black text-[20vw] md:text-[25vw] whitespace-nowrap uppercase tracking-tight"
            style={{
              color: "var(--color-electric-blue)",
            }}
          >
            WHY US
          </h2>
        </div>

        {/* BECAUSE - Wild animated text */}
        <div
          ref={becauseRef}
          className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none"
        >
          <h2 className="font-gilroy font-black text-[12vw] md:text-[15vw] uppercase tracking-tight flex">
            {becauseText.split("").map((letter, i) => (
              <span
                key={i}
                ref={(el) => { letterRefs.current[i] = el }}
                className="inline-block"
                style={{
                  color: "var(--color-electric-blue)",
                  textShadow: "0 0 40px rgba(45, 230, 199, 0.5)",
                }}
              >
                {letter}
              </span>
            ))}
          </h2>
        </div>

        {/* We did that multiple times - Flip in animation */}
        <div
          ref={weDidRef}
          className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none"
          style={{ perspective: "1000px" }}
        >
          <h2 className="font-gilroy font-bold text-[6vw] md:text-[5vw] text-center leading-tight flex flex-wrap justify-center gap-x-[0.3em]">
            {weDidText.map((word, i) => (
              <span
                key={i}
                ref={(el) => { weDidWordsRef.current[i] = el }}
                className="inline-block"
                style={{
                  color: "var(--color-electric-blue)",
                  transformStyle: "preserve-3d",
                }}
              >
                {word}
              </span>
            ))}
          </h2>
        </div>
      </div>
    </section>
  )
}

export default SoulScience
