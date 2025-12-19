"use client"
import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"

interface CustomCursorProps {
  loading: boolean
}

const CustomCursor = ({ loading }: CustomCursorProps) => {
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorDotRef = useRef<HTMLDivElement>(null)
  const cursorTextRef = useRef<HTMLSpanElement>(null)
  const [cursorText, setCursorText] = useState("")
  const [isMobile, setIsMobile] = useState(true)

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024 || 'ontouchstart' in window)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    if (loading || isMobile) return

    const cursor = cursorRef.current
    const cursorDot = cursorDotRef.current
    if (!cursor || !cursorDot) return

    // Hide default cursor
    document.body.style.cursor = "none"

    let mouseX = 0
    let mouseY = 0
    let cursorX = 0
    let cursorY = 0
    let dotX = 0
    let dotY = 0

    // Smooth cursor following
    const updateCursor = () => {
      // Outer ring - slower follow
      const diffX = mouseX - cursorX
      const diffY = mouseY - cursorY
      cursorX += diffX * 0.15
      cursorY += diffY * 0.15
      
      // Inner dot - faster follow
      const dotDiffX = mouseX - dotX
      const dotDiffY = mouseY - dotY
      dotX += dotDiffX * 0.35
      dotY += dotDiffY * 0.35

      gsap.set(cursor, { x: cursorX, y: cursorY })
      gsap.set(cursorDot, { x: dotX, y: dotY })

      requestAnimationFrame(updateCursor)
    }
    updateCursor()

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    // Magnetic effect for buttons and links
    const handleMagneticEnter = (e: MouseEvent) => {
      const target = e.currentTarget as HTMLElement
      const rect = target.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      // Get cursor text from data attribute
      const text = target.dataset.cursor || ""
      setCursorText(text)

      gsap.to(cursor, {
        scale: text ? 2.5 : 1.8,
        duration: 0.4,
        ease: "power3.out",
      })

      gsap.to(cursorDot, {
        scale: 0,
        duration: 0.3,
        ease: "power2.out",
      })

      // Magnetic pull
      const handleMagneticMove = (e: MouseEvent) => {
        const deltaX = (e.clientX - centerX) * 0.3
        const deltaY = (e.clientY - centerY) * 0.3
        gsap.to(target, {
          x: deltaX,
          y: deltaY,
          duration: 0.3,
          ease: "power2.out",
        })
      }

      target.addEventListener("mousemove", handleMagneticMove)
      target.dataset.magneticHandler = "true"
    }

    const handleMagneticLeave = (e: MouseEvent) => {
      const target = e.currentTarget as HTMLElement
      
      setCursorText("")

      gsap.to(cursor, {
        scale: 1,
        duration: 0.4,
        ease: "power3.out",
      })

      gsap.to(cursorDot, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      })

      // Reset magnetic position
      gsap.to(target, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.5)",
      })
    }

    // Link hover effect
    const handleLinkEnter = () => {
      gsap.to(cursor, {
        scale: 1.5,
        borderColor: "#2de6c7",
        duration: 0.3,
        ease: "power2.out",
      })
    }

    const handleLinkLeave = () => {
      gsap.to(cursor, {
        scale: 1,
        borderColor: "rgba(255, 255, 255, 0.5)",
        duration: 0.3,
        ease: "power2.out",
      })
    }

    // Add listeners
    window.addEventListener("mousemove", handleMouseMove)

    // Find all magnetic elements
    const magneticElements = document.querySelectorAll("[data-magnetic]")
    magneticElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMagneticEnter as EventListener)
      el.addEventListener("mouseleave", handleMagneticLeave as EventListener)
    })

    // Find all links
    const links = document.querySelectorAll("a, button")
    links.forEach((el) => {
      if (!el.hasAttribute("data-magnetic")) {
        el.addEventListener("mouseenter", handleLinkEnter)
        el.addEventListener("mouseleave", handleLinkLeave)
      }
    })

    return () => {
      document.body.style.cursor = "auto"
      window.removeEventListener("mousemove", handleMouseMove)
      magneticElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMagneticEnter as EventListener)
        el.removeEventListener("mouseleave", handleMagneticLeave as EventListener)
      })
      links.forEach((el) => {
        el.removeEventListener("mouseenter", handleLinkEnter)
        el.removeEventListener("mouseleave", handleLinkLeave)
      })
    }
  }, [loading, isMobile])

  if (isMobile || loading) return null

  return (
    <>
      {/* Outer ring */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          width: "50px",
          height: "50px",
          marginLeft: "-25px",
          marginTop: "-25px",
          borderRadius: "50%",
          border: "1px solid rgba(255, 255, 255, 0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "border-color 0.3s ease",
        }}
      >
        <span
          ref={cursorTextRef}
          className="font-gilroy font-bold text-[8px] text-white uppercase tracking-wider text-center leading-tight"
          style={{
            opacity: cursorText ? 1 : 0,
            transition: "opacity 0.2s ease",
          }}
        >
          {cursorText}
        </span>
      </div>

      {/* Inner dot */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          width: "8px",
          height: "8px",
          marginLeft: "-4px",
          marginTop: "-4px",
          borderRadius: "50%",
          backgroundColor: "#2de6c7",
        }}
      />
    </>
  )
}

export default CustomCursor
