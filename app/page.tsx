"use client"

import Hero from "@/components/Hero"
import SoulScience from "@/components/SoulScience"
import LogoCarousel from "@/components/LogoCarousel"
import WorkSection from "@/components/WorkSection"
import ContactSection from "@/components/ContactSection"
import Footer from "@/components/Footer"
import CustomCursor from "@/components/CustomCursor"
import SmoothScroll from "@/components/SmoothScroll"
// import ProcessSection from "@/components/ProcessSection"
import Preloader from "@/components/preloader"
// import CTA from "@/components/CTA"
// import Testimonials from "@/components/Testimonials"
// import Services from "@/components/Services"
import { useState, useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export default function Home() {
  const [loading, setLoading] = useState(true)
  const mainRef = useRef<HTMLDivElement>(null)
  const gradientRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    
    // Refresh ScrollTrigger after all components mount
    if (!loading && gradientRef.current) {
      // Animate gradient position based on scroll - very light scrub
      gsap.to(gradientRef.current, {
        backgroundPosition: "100% 100%",
        ease: "none",
        scrollTrigger: {
          trigger: mainRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5, // Faster response
          id: "gradientBg",
        },
      })

      const timer = setTimeout(() => {
        ScrollTrigger.refresh()
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [loading])

  return (
    <main role="main" ref={mainRef}>
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      
      {/* Custom Cursor - Desktop only */}
      <CustomCursor loading={loading} />
      
      {/* Single unified gradient background that covers everything */}
      <div 
        ref={gradientRef}
        className={`fixed inset-0 -z-10 transition-opacity duration-300 ${loading ? 'opacity-0' : 'opacity-100'}`}
        style={{
          background: "linear-gradient(135deg, var(--color-midnight-navy) 0%, var(--color-royal-navy) 15%, var(--color-electric-blue) 40%, var(--color-mint-cyan) 60%, var(--color-electric-blue) 75%, var(--color-royal-navy) 90%, var(--color-midnight-navy) 100%)",
          backgroundSize: "100% 300%",
          backgroundPosition: "0% 0%",
        }}
      />

      <SmoothScroll loading={loading}>
        <div className={`content-transition ${loading ? 'loading-hidden' : 'opacity-100'}`}>
        <section id="hero" aria-label="Hero section">
          <Hero loading={loading} />
        </section>
        <section id="soul-science" aria-label="Soul and Science">
          <SoulScience loading={loading} />
        </section>
        <section id="clients" aria-label="Our clients">
          <LogoCarousel loading={loading} />
        </section>
        
        {/* Work section */}
        <section id="work" aria-label="Our work">
          <WorkSection loading={loading} />
        </section>

        {/* Contact section */}
        <section id="contact" aria-label="Get in touch">
          <ContactSection loading={loading} />
        </section>

        {/* Footer */}
        <Footer loading={loading} />
        </div>
      </SmoothScroll>

        {/* <section id="services" aria-label="Our services">
          <Services loading={loading} />
        </section> */}
        {/* <section id="process" aria-label="Our process">
          <ProcessSection loading={loading} />
        </section>
        <section id="testimonials" aria-label="Client testimonials">
          <Testimonials loading={loading} />
        </section>
        <section id="contact" aria-label="Contact us">
          <CTA loading={loading} />
        </section> */}

    </main>
  )
}
