"use client"
import { useRef, useEffect, useState } from "react"
import { gsap } from "gsap"

interface MagneticButtonProps {
  children: React.ReactNode
  href?: string
  onClick?: () => void
  variant?: "primary" | "secondary" | "glass"
  size?: "sm" | "md" | "lg"
  className?: string
  icon?: React.ReactNode
  magnetic?: boolean
}

const MagneticButton = ({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  className = "",
  icon,
  magnetic = true,
}: MagneticButtonProps) => {
  const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null)
  const contentRef = useRef<HTMLSpanElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const rippleRef = useRef<HTMLDivElement>(null)
  const borderRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(true)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    if (isMobile || !magnetic) return

    const button = buttonRef.current
    const content = contentRef.current
    const glow = glowRef.current
    const border = borderRef.current
    if (!button || !content) return

    // Create quickTo for smooth magnetic effect
    const xTo = gsap.quickTo(button, "x", { duration: 0.4, ease: "power3.out" })
    const yTo = gsap.quickTo(button, "y", { duration: 0.4, ease: "power3.out" })
    const contentXTo = gsap.quickTo(content, "x", { duration: 0.3, ease: "power3.out" })
    const contentYTo = gsap.quickTo(content, "y", { duration: 0.3, ease: "power3.out" })

    const handleMouseMove = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const deltaX = e.clientX - centerX
      const deltaY = e.clientY - centerY

      // Magnetic pull on button
      xTo(deltaX * 0.35)
      yTo(deltaY * 0.35)

      // Content moves slightly more for parallax feel
      contentXTo(deltaX * 0.15)
      contentYTo(deltaY * 0.15)

      // Move glow to cursor position
      if (glow) {
        const glowX = e.clientX - rect.left
        const glowY = e.clientY - rect.top
        gsap.to(glow, {
          x: glowX,
          y: glowY,
          duration: 0.3,
          ease: "power2.out",
        })
      }
    }

    const handleMouseEnter = () => {
      // Scale up with elastic ease
      gsap.to(button, {
        scale: 1.05,
        duration: 0.4,
        ease: "back.out(1.7)",
      })

      // Show glow
      if (glow) {
        gsap.to(glow, {
          opacity: 1,
          scale: 1,
          duration: 0.4,
          ease: "power2.out",
        })
      }

      // Animate border gradient
      if (border) {
        gsap.to(border, {
          opacity: 1,
          duration: 0.3,
        })
      }
    }

    const handleMouseLeave = () => {
      // Reset position with elastic bounce
      gsap.to(button, {
        x: 0,
        y: 0,
        scale: 1,
        duration: 0.7,
        ease: "elastic.out(1, 0.4)",
      })

      gsap.to(content, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "power3.out",
      })

      // Hide glow
      if (glow) {
        gsap.to(glow, {
          opacity: 0,
          scale: 0.5,
          duration: 0.4,
          ease: "power2.in",
        })
      }

      // Hide border
      if (border) {
        gsap.to(border, {
          opacity: 0.5,
          duration: 0.3,
        })
      }
    }

    const handleClick = (e: MouseEvent) => {
      if (!rippleRef.current) return

      const rect = button.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      // Create ripple effect
      gsap.set(rippleRef.current, {
        x: x,
        y: y,
        scale: 0,
        opacity: 1,
      })

      gsap.to(rippleRef.current, {
        scale: 4,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
      })

      // Button press effect
      gsap.to(button, {
        scale: 0.95,
        duration: 0.1,
        ease: "power2.in",
        onComplete: () => {
          gsap.to(button, {
            scale: 1.05,
            duration: 0.3,
            ease: "back.out(1.7)",
          })
        },
      })
    }

    button.addEventListener("mousemove", handleMouseMove as EventListener)
    button.addEventListener("mouseenter", handleMouseEnter)
    button.addEventListener("mouseleave", handleMouseLeave)
    button.addEventListener("click", handleClick as EventListener)

    return () => {
      button.removeEventListener("mousemove", handleMouseMove as EventListener)
      button.removeEventListener("mouseenter", handleMouseEnter)
      button.removeEventListener("mouseleave", handleMouseLeave)
      button.removeEventListener("click", handleClick as EventListener)
    }
  }, [isMobile, magnetic])

  // Size classes - responsive for mobile
  const sizeClasses = {
    sm: "px-4 py-2 text-xs md:px-5 md:py-2.5 md:text-sm",
    md: "px-5 py-2.5 text-sm md:px-7 md:py-3.5 md:text-base",
    lg: "px-6 py-3 text-sm md:px-10 md:py-5 md:text-lg",
  }

  // Variant styles
  const variantStyles = {
    primary: {
      bg: "bg-[#2de6c7]",
      text: "text-[#04082e]",
      border: "border-[#2de6c7]",
      glow: "#2de6c7",
    },
    secondary: {
      bg: "bg-white/10",
      text: "text-white",
      border: "border-white/30",
      glow: "#ffffff",
    },
    glass: {
      bg: "bg-white/5",
      text: "text-white",
      border: "border-white/20",
      glow: "#2de6c7",
    },
  }

  const style = variantStyles[variant]

  const buttonContent = (
    <>
      {/* Animated border gradient */}
      <div
        ref={borderRef}
        className="absolute inset-0 rounded-full opacity-50 pointer-events-none"
        style={{
          background: `linear-gradient(90deg, transparent, ${style.glow}, transparent)`,
          backgroundSize: "200% 100%",
          animation: "shimmer 2s linear infinite",
          padding: "1px",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />

      {/* Glass background */}
      <div
        className={`absolute inset-0 rounded-full ${style.bg} backdrop-blur-md border ${style.border}`}
        style={{
          boxShadow: variant === "primary" 
            ? "0 0 30px rgba(45, 230, 199, 0.3), inset 0 1px 0 rgba(255,255,255,0.2)"
            : "inset 0 1px 0 rgba(255,255,255,0.1), 0 4px 20px rgba(0,0,0,0.2)",
        }}
      />

      {/* Cursor-following glow */}
      <div
        ref={glowRef}
        className="absolute w-20 h-20 rounded-full pointer-events-none opacity-0"
        style={{
          background: `radial-gradient(circle, ${style.glow}40 0%, transparent 70%)`,
          transform: "translate(-50%, -50%)",
          filter: "blur(10px)",
        }}
      />

      {/* Ripple effect container */}
      <div
        ref={rippleRef}
        className="absolute w-10 h-10 rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${style.glow}60 0%, transparent 70%)`,
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Content */}
      <span
        ref={contentRef}
        className={`relative z-10 flex items-center gap-2 font-gilroy font-semibold ${style.text} tracking-wide`}
      >
        {icon && <span className="flex-shrink-0">{icon}</span>}
        {children}
      </span>
    </>
  )

  const commonClasses = `
    relative overflow-hidden rounded-full cursor-pointer
    ${sizeClasses[size]}
    ${className}
  `

  if (href) {
    return (
      <a
        ref={buttonRef as React.RefObject<HTMLAnchorElement>}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={commonClasses}
        style={{ display: "inline-flex", alignItems: "center", justifyContent: "center" }}
      >
        {buttonContent}
      </a>
    )
  }

  return (
    <button
      ref={buttonRef as React.RefObject<HTMLButtonElement>}
      onClick={onClick}
      className={commonClasses}
      style={{ display: "inline-flex", alignItems: "center", justifyContent: "center" }}
    >
      {buttonContent}
    </button>
  )
}

export default MagneticButton
