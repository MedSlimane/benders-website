"use client"
import { useRef } from "react"
import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"

gsap.registerPlugin(ScrollTrigger)

interface FooterProps {
  loading: boolean
}

const Footer = ({ loading }: FooterProps) => {
  const footerRef = useRef<HTMLElement>(null)
  const glassCardRef = useRef<HTMLDivElement>(null)
  const topSectionRef = useRef<HTMLDivElement>(null)
  const columnsRef = useRef<(HTMLDivElement | null)[]>([])
  const bigLogoRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (loading) return

    const glassCard = glassCardRef.current
    const topSection = topSectionRef.current
    const columns = columnsRef.current.filter(Boolean)
    const bigLogo = bigLogoRef.current

    // Set initial states
    gsap.set(glassCard, { y: 60, opacity: 0 })
    gsap.set(topSection, { y: 40, opacity: 0 })
    gsap.set(columns, { y: 50, opacity: 0 })
    gsap.set(bigLogo, { y: 80, opacity: 0 })

    // Glass card animation
    gsap.to(glassCard, {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: footerRef.current,
        start: "top 90%",
        toggleActions: "play none none reverse",
      },
    })

    // Top section animation
    gsap.to(topSection, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      delay: 0.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: footerRef.current,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    })

    // Columns stagger animation
    columns.forEach((col, index) => {
      gsap.to(col, {
        y: 0,
        opacity: 1,
        duration: 0.7,
        delay: 0.3 + index * 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      })
    })

    // Big logo reveal
    gsap.to(bigLogo, {
      y: 0,
      opacity: 1,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: bigLogo,
        start: "top 95%",
        toggleActions: "play none none reverse",
      },
    })

  }, { scope: footerRef, dependencies: [loading] })

  const followLinks = [
    { label: "Instagram", href: "https://instagram.com/benders" },
    { label: "LinkedIn", href: "https://linkedin.com/company/benders" },
    { label: "Twitter", href: "https://twitter.com/benders" },
  ]

  const contactLinks = [
    { label: "contact@benders.io", href: "mailto:contact@benders.io" },
  ]

  const legalLinks = [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Use", href: "/terms" },
  ]

  return (
    <footer 
      ref={footerRef} 
      className="relative pt-16 md:pt-24 pb-8 overflow-hidden"
    >
      {/* Top line separator */}
      <div className="w-full px-6 md:px-12 lg:px-16 mb-12">
        <div className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      </div>

      {/* Glass Card Container */}
      <div className="w-full px-4 md:px-8 lg:px-12">
        <div 
          ref={glassCardRef}
          className="relative rounded-3xl p-8 md:p-12 lg:p-16 overflow-hidden"
          style={{
            background: "rgba(255, 255, 255, 0.05)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          {/* Inner glow lines */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#2de6c7]/50 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          {/* Top Section - Newsletter */}
          <div 
            ref={topSectionRef}
            className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12 md:mb-16 pb-8 md:pb-12 border-b border-white/10"
          >
            <p className="font-gilroy font-bold text-white text-xl md:text-2xl">
              COME SAY HI.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-0">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-white/10 border border-white/20 rounded-full sm:rounded-r-none px-6 py-3 text-white font-neue-montreal text-base placeholder:text-white/50 focus:outline-none focus:border-[#2de6c7] w-full sm:w-64"
              />
              <button data-magnetic data-cursor="Join" className="bg-[#2de6c7] text-[#04082e] font-gilroy font-semibold text-sm uppercase tracking-wider px-6 py-3 rounded-full sm:rounded-l-none hover:bg-[#04c8aa] transition-colors">
                Get Updates
              </button>
            </div>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-12 md:mb-16">
            {/* Follow Us */}
            <div ref={(el) => { columnsRef.current[0] = el }}>
              <h4 className="font-gilroy font-bold text-white text-sm uppercase tracking-wider mb-6">
                Follow Us
              </h4>
              <ul className="space-y-3">
                {followLinks.map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-neue-montreal text-white/60 text-sm hover:text-[#2de6c7] transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Us */}
            <div ref={(el) => { columnsRef.current[1] = el }}>
              <h4 className="font-gilroy font-bold text-white text-sm uppercase tracking-wider mb-6">
                Contact Us
              </h4>
              <ul className="space-y-3">
                {contactLinks.map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.href}
                      className="font-neue-montreal text-white/60 text-sm hover:text-[#2de6c7] transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Empty column for spacing on desktop */}
            <div className="hidden md:block" ref={(el) => { columnsRef.current[2] = el }} />

            {/* Legal */}
            <div ref={(el) => { columnsRef.current[3] = el }}>
              <h4 className="font-gilroy font-bold text-white text-sm uppercase tracking-wider mb-6">
                Legal
              </h4>
              <ul className="space-y-3">
                {legalLinks.map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.href}
                      className="font-neue-montreal text-white/60 text-sm hover:text-[#2de6c7] transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Big Logo Section - Inside glass card */}
          <div 
            ref={bigLogoRef}
            className="w-full pt-8 border-t border-white/10"
          >
            <div className="relative w-full flex justify-center items-center">
              <Image
                src="/Benders-logo/png/3@2x.png"
                alt="Benders"
                width={1200}
                height={300}
                className="w-[100%] md:w-[90%] lg:w-[85%] h-auto object-contain opacity-80"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
