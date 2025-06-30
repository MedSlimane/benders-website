"use client"

import Hero from "@/components/Hero"
import LogoCarousel from "@/components/LogoCarousel"
import ProcessSection from "@/components/ProcessSection"
import Services from "@/components/Services"
import Preloader from "@/components/preloader"
import CTA from "@/components/CTA"
import Testimonials from "@/components/Testimonials"
import { useState, useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export default function Home() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
  }, [])

  return (
    <main>
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      <Hero loading={loading} />
      <LogoCarousel />
      <Services />
      <ProcessSection />
      <Testimonials />
      <CTA />
    </main>
  )
}
