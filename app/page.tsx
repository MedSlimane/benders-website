"use client"

import Hero from "@/components/Hero"
import LogoCarousel from "@/components/LogoCarousel"
import ProcessSection from "@/components/ProcessSection"
import Preloader from "@/components/preloader"
import CTA from "@/components/CTA"
import Testimonials from "@/components/Testimonials"
import Services from "@/components/Services"
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
      <div className={`content-transition ${loading ? 'loading-hidden' : 'opacity-100'}`}>
        <Hero loading={loading} />
        <LogoCarousel loading={loading} />
        <Services loading={loading} />
        <ProcessSection loading={loading} />
        <Testimonials loading={loading} />
        <CTA loading={loading} />
      </div>
    </main>
  )
}
