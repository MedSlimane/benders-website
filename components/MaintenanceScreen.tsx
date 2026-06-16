"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import Logo from "./Logo"
import MagneticButton from "./MagneticButton"

const CONTACT_EMAIL = "contact@benders.io"

const rotatingWords = ["bigger", "bolder", "sharper", "better"]

const MaintenanceScreen = () => {
  const rootRef = useRef<HTMLDivElement>(null)
  const gradientRef = useRef<HTMLDivElement>(null)
  const logoWrapRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const orb1Ref = useRef<HTMLDivElement>(null)
  const orb2Ref = useRef<HTMLDivElement>(null)
  const rotatingRef = useRef<HTMLSpanElement>(null)

  const [wordIndex, setWordIndex] = useState(0)

  // Entrance + ambient animations
  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches

    const ctx = gsap.context(() => {
      const logoWrap = logoWrapRef.current
      const content = contentRef.current
      const gradient = gradientRef.current

      // Entrance: logo reveals, content rises in after it
      gsap.set(logoWrap, { opacity: 0, scale: 0.92, y: 10 })
      gsap.set(content?.children ?? [], { opacity: 0, y: 24 })

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } })
      tl.to(logoWrap, { opacity: 1, scale: 1, y: 0, duration: 1 })
        .to(
          content?.children ?? [],
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.12 },
          "-=0.4"
        )

      if (prefersReduced) return

      // Slow drifting gradient — same palette as the live site
      gsap.to(gradient, {
        backgroundPosition: "100% 100%",
        duration: 18,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      })

      // Gentle breathing of the logo + soft glow pulse
      gsap.to(logoWrap, {
        scale: 1.025,
        duration: 3.2,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: 1,
      })
      gsap.to(logoWrap, {
        filter: "drop-shadow(0 0 36px rgba(45,230,199,0.45))",
        duration: 2.6,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: 1,
      })

      // Floating decorative orbs
      gsap.to(orb1Ref.current, {
        x: 40,
        y: -30,
        duration: 9,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      })
      gsap.to(orb2Ref.current, {
        x: -36,
        y: 28,
        duration: 11,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      })
    }, rootRef)

    return () => ctx.revert()
  }, [])

  // Rotating accent word (crossfade), like the hero
  useEffect(() => {
    const interval = setInterval(() => {
      const el = rotatingRef.current
      if (!el) return
      gsap.to(el, {
        opacity: 0,
        y: -8,
        duration: 0.35,
        ease: "power2.in",
        onComplete: () => {
          setWordIndex((prev) => (prev + 1) % rotatingWords.length)
          gsap.fromTo(
            el,
            { opacity: 0, y: 8 },
            { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" }
          )
        },
      })
    }, 2600)
    return () => clearInterval(interval)
  }, [])

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden text-white"
    >
      {/* Animated gradient background — mirrors the main site */}
      <div
        ref={gradientRef}
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(135deg, var(--color-midnight-navy) 0%, var(--color-royal-navy) 18%, var(--color-electric-blue) 42%, var(--color-mint-cyan) 60%, var(--color-electric-blue) 76%, var(--color-royal-navy) 90%, var(--color-midnight-navy) 100%)",
          backgroundSize: "100% 300%",
          backgroundPosition: "0% 0%",
        }}
      />

      {/* Floating glow orbs */}
      <div
        ref={orb1Ref}
        className="pointer-events-none absolute top-1/4 left-1/5 h-72 w-72 rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(45,230,199,0.25) 0%, transparent 70%)" }}
      />
      <div
        ref={orb2Ref}
        className="pointer-events-none absolute bottom-1/4 right-1/5 h-80 w-80 rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(0,85,255,0.25) 0%, transparent 70%)" }}
      />

      {/* Subtle dark veil so text stays legible over the bright middle of the gradient */}
      <div className="pointer-events-none absolute inset-0 -z-[5] bg-[#04082e]/35" />

      <main className="relative flex flex-col items-center px-6 text-center">
        {/* Logo */}
        <div ref={logoWrapRef} className="mb-10 md:mb-12 will-change-transform">
          <Logo className="w-[230px] sm:w-[300px] md:w-[360px] h-auto text-white" />
        </div>

        <div ref={contentRef} className="flex flex-col items-center">
          {/* Headline with rotating accent */}
          <h1 className="font-gilroy font-black leading-[1.05] tracking-tight text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
            <span className="block text-white">Something</span>
            <span className="block">
              <span
                ref={rotatingRef}
                className="inline-block"
                style={{
                  background: "linear-gradient(135deg, #2de6c7 0%, #04c8aa 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {rotatingWords[wordIndex]}
              </span>
              <span className="text-white"> is coming.</span>
            </span>
          </h1>

          {/* Subtext */}
          <p className="mt-6 max-w-xl font-neue-montreal text-base md:text-lg text-white/70">
            Our website is getting a major upgrade. We&apos;ll be back online very
            soon. In the meantime, let&apos;s talk.
          </p>

          {/* Primary CTA — direct email, glass button like the rest of the site */}
          <div className="mt-9">
            <MagneticButton
              href={`mailto:${CONTACT_EMAIL}`}
              variant="glass"
              size="lg"
              icon={
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              }
            >
              {CONTACT_EMAIL}
            </MagneticButton>
          </div>
        </div>
      </main>
    </div>
  )
}

export default MaintenanceScreen
