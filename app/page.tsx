"use client"

import Hero from "@/components/Hero"
import LogoCarousel from "@/components/LogoCarousel"
import ProcessSection from "@/components/ProcessSection"
import Preloader from "@/components/preloader"
import { useState } from "react"

export default function Home() {
  const [loading, setLoading] = useState(true)


  return (
    <main>
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      <Hero loading={loading} />
      <LogoCarousel />
      <ProcessSection />
    </main>
  )
}
