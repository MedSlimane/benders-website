"use client"
import About from "@/components/about"
import Hero from "@/components/Hero"
import Preloader from "@/components/preloader"
import { useState } from "react"

export default function Home() {
  const [loading, setLoading] = useState(true)

  return (
    <main>
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      <Hero loading={loading} />
      <About />
    </main>
  )
}
