"use client"

import Hero from "@/components/Hero"
import LogoCarousel from "@/components/LogoCarousel"
import ProcessSection from "@/components/ProcessSection"
import Preloader from "@/components/preloader"
import CTA from "@/components/CTA"
import Testimonials from "@/components/Testimonials"
// import Services from "@/components/Services"
import { useState, useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export default function Home() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
  }, [])

  return (
    <main role="main">
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      <div className={`content-transition ${loading ? 'loading-hidden' : 'opacity-100'}`}>
        <section id="hero" aria-label="Hero section">
          <Hero loading={loading} />
        </section>
        <section id="clients" aria-label="Our clients">
          <LogoCarousel loading={loading} />
        </section>
        {/* <section id="services" aria-label="Our services">
          <Services loading={loading} />
        </section> */}
        <section id="process" aria-label="Our process">
          <ProcessSection loading={loading} />
        </section>
        <section id="testimonials" aria-label="Client testimonials">
          <Testimonials loading={loading} />
        </section>
        <section id="contact" aria-label="Contact us">
          <CTA loading={loading} />
        </section>
      </div>
    </main>
  )
}
