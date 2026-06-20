"use client"

import Hero from "@/components/Hero"
import SoulScience from "@/components/SoulScience"
import LogoCarousel from "@/components/LogoCarousel"
import WorkSection from "@/components/WorkSection"
import ContactSection from "@/components/ContactSection"
import Footer from "@/components/Footer"
import CustomCursor from "@/components/CustomCursor"
import SmoothScroll from "@/components/SmoothScroll"
import ServicesSection from "@/components/ServicesSection"
import CTABanner from "@/components/CTABanner"
import CreativeReveal from "@/components/CreativeReveal"
import OwnerReveal from "@/components/OwnerReveal"
import Testimonials from "@/components/Testimonials"
import Preloader from "@/components/preloader"
import { useState, useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { fetchVideoTestimonials, type VideoTestimonial } from "@/lib/sanity"

export default function Home() {
  const [loading, setLoading] = useState(true)
  const [testimonials, setTestimonials] = useState<VideoTestimonial[]>([])
  const mainRef = useRef<HTMLDivElement>(null)
  const gradientRef = useRef<HTMLDivElement>(null)

  // Load client video testimonials (the section is hidden entirely if there are none)
  useEffect(() => {
    fetchVideoTestimonials()
      .then(setTestimonials)
      .catch(() => setTestimonials([]))
  }, [])

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    
    // Refresh ScrollTrigger after all components mount
    if (!loading && gradientRef.current) {
      // Animating a full-screen 300%-tall gradient on every scroll frame is a heavy
      // repaint on phones (and causes visible color stepping). Keep it static on mobile.
      const isMobile = window.innerWidth < 768
      let tween: gsap.core.Tween | undefined
      if (!isMobile) {
        tween = gsap.to(gradientRef.current, {
          backgroundPosition: "100% 100%",
          ease: "none",
          scrollTrigger: {
            trigger: mainRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.5,
            id: "gradientBg",
          },
        })
      }

      const timer = setTimeout(() => {
        ScrollTrigger.refresh()
      }, 100)
      return () => {
        clearTimeout(timer)
        tween?.scrollTrigger?.kill()
        tween?.kill()
      }
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
        <section id="services" aria-label="Our services">
          <ServicesSection loading={loading} />
        </section>
        
        {/* CTA Banner */}
        <CTABanner loading={loading} />
        
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

        {/* CTA Banner after Work */}
        <div className="-mt-12 md:-mt-20 relative z-20">
          <CTABanner loading={loading} />
        </div>

        {/* Creative Reveal — "what people think about us" dissolves straight into
            the client videos. Only rendered when there are testimonial videos. */}
        {testimonials.length > 0 && (
          <section id="creative-reveal" aria-label="What people think about us — client stories" className="-mt-[36rem] md:-mt-[50rem] relative z-10 pointer-events-none">
            <CreativeReveal loading={loading} videos={testimonials} />
          </section>
        )}

        {/* Owner Reveal — founder video + "What do you expect?" button overlaid at the end */}
        <section id="owner-reveal" aria-label="Meet the founder">
          <OwnerReveal loading={loading} />
        </section>

        {/* Client Feedback - Text testimonials carousel */}
        <section id="client-feedback" aria-label="Client feedback">
          <Testimonials loading={loading} />
        </section>

        {/* Contact section */}
        <section id="contact" aria-label="Get in touch">
          <ContactSection loading={loading} />
        </section>

        {/* Footer */}
        <Footer loading={loading} />
        </div>
      </SmoothScroll>
    </main>
  )
}
