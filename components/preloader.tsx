"use client"
import { useLayoutEffect, useRef } from "react"
import { gsap } from "gsap"
import Logo from "./Logo"

interface PreloaderProps {
  onComplete: () => void
}

const Preloader = ({ onComplete }: PreloaderProps) => {
  const preloaderRef = useRef<HTMLDivElement>(null)
  const logoWrapperRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const logoWrapper = logoWrapperRef.current
      if (!logoWrapper) return

      const icon = logoWrapper.querySelector("#logo-icon")
      const text = logoWrapper.querySelector("#logo-text")
      const svg = logoWrapper.querySelector("svg")

      if (!icon || !text || !svg) return

      const initialWidth = window.innerWidth < 768 ? 300 : 400
      gsap.set(svg, { width: initialWidth, height: "auto" })

      // Calculate the necessary shift to center the icon
      const iconRect = icon.getBoundingClientRect()
      const wrapperRect = logoWrapper.getBoundingClientRect()
      const iconCenterX = iconRect.left + iconRect.width / 2
      const wrapperCenterX = wrapperRect.left + wrapperRect.width / 2
      const shiftX = wrapperCenterX - iconCenterX

      // Initial states
      gsap.set(logoWrapper, { opacity: 1, scale: 1, willChange: "transform" })
      gsap.set(text, { opacity: 1, willChange: "opacity" })
      gsap.set(svg, {
        x: 0,
        willChange: "transform",
        force3D: true,
        rotation: 0.01,
      })

      const tl = gsap.timeline({
        onComplete: () => {
          onComplete()
          if (preloaderRef.current) {
            gsap.to(preloaderRef.current, {
              opacity: 0,
              duration: 0.8,
              ease: "power3.inOut",
              onComplete: () => {
                if (preloaderRef.current) {
                  preloaderRef.current.style.display = "none"
                }
              },
            })
          }
        },
      })

      // 1. Fade out text
      tl.to(text, {
        opacity: 0,
        duration: 0.8,
        ease: "power2.in",
      })
        // 2. Center the icon
        .to(
          svg,
          {
            x: shiftX,
            duration: 1,
            ease: "power2.inOut",
          },
          "<",
        )
        // 3. Zoom in
        .to(
          logoWrapper,
          {
            scale: 200,
            duration: 1.8,
            ease: "expo.in",
          },
          "+=0.2",
        )
        // 4. Fade out the whole thing during the zoom
        .to(
          logoWrapper,
          {
            opacity: 0,
            duration: 1,
          },
          "-=0.8",
        )
    }, preloaderRef)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 flex justify-center items-center z-[100] text-white"
    >
      <div ref={logoWrapperRef} style={{ overflow: "hidden" }}>
        <Logo className="w-[300px] sm:w-[400px] h-auto" />
      </div>
    </div>
  )
}

export default Preloader 