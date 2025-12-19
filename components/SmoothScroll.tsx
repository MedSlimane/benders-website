"use client"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

interface SmoothScrollProps {
  children: React.ReactNode
  loading: boolean
}

const SmoothScroll = ({ children, loading }: SmoothScrollProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollVelocityRef = useRef(0)

  useEffect(() => {
    if (loading) return

    let lastScrollTop = 0
    let velocity = 0
    let rafId: number

    // Track scroll velocity
    const updateVelocity = () => {
      const currentScroll = window.scrollY
      velocity = (currentScroll - lastScrollTop) * 0.5
      lastScrollTop = currentScroll

      // Clamp velocity
      velocity = Math.max(-50, Math.min(50, velocity))
      scrollVelocityRef.current = velocity

      // Apply skew effect to elements with data-skew
      const skewElements = document.querySelectorAll("[data-skew]")
      skewElements.forEach((el) => {
        gsap.to(el, {
          skewY: velocity * 0.05,
          duration: 0.3,
          ease: "power2.out",
        })
      })

      // Apply scale effect to elements with data-scale-scroll
      const scaleElements = document.querySelectorAll("[data-scale-scroll]")
      scaleElements.forEach((el) => {
        const absVelocity = Math.abs(velocity)
        gsap.to(el, {
          scale: 1 - absVelocity * 0.002,
          duration: 0.3,
          ease: "power2.out",
        })
      })

      rafId = requestAnimationFrame(updateVelocity)
    }

    rafId = requestAnimationFrame(updateVelocity)

    // Parallax layers
    const parallaxElements = document.querySelectorAll("[data-parallax]")
    parallaxElements.forEach((el) => {
      const speed = parseFloat((el as HTMLElement).dataset.parallax || "0.5")
      
      gsap.to(el, {
        y: () => window.scrollY * speed * -1,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      })
    })

    // Text reveal animations
    const revealTexts = document.querySelectorAll("[data-reveal]")
    revealTexts.forEach((el) => {
      const text = el.textContent || ""
      const words = text.split(" ")
      
      el.innerHTML = words
        .map((word) => `<span class="inline-block overflow-hidden"><span class="inline-block reveal-word" style="transform: translateY(100%)">${word}</span></span>`)
        .join(" ")

      const wordSpans = el.querySelectorAll(".reveal-word")
      
      gsap.to(wordSpans, {
        y: 0,
        duration: 0.8,
        stagger: 0.05,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      })
    })

    // Horizontal scroll sections
    const horizontalSections = document.querySelectorAll("[data-horizontal]")
    horizontalSections.forEach((section) => {
      const wrapper = section.querySelector("[data-horizontal-wrapper]")
      if (!wrapper) return

      const items = wrapper.children
      const totalWidth = Array.from(items).reduce((acc, item) => acc + (item as HTMLElement).offsetWidth, 0)

      gsap.to(wrapper, {
        x: () => -(totalWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${totalWidth}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      })
    })

    return () => {
      cancelAnimationFrame(rafId)
      ScrollTrigger.getAll().forEach((st) => st.kill())
    }
  }, [loading])

  return (
    <div ref={containerRef} className="smooth-scroll-container">
      {children}
    </div>
  )
}

export default SmoothScroll
