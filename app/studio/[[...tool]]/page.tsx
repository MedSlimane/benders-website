"use client"
import dynamic from "next/dynamic"

// Load the Studio browser-only — it relies on client APIs (createContext) and
// must never be server-rendered/prerendered during the build.
const Studio = dynamic(() => import("./Studio"), { ssr: false })

export default function StudioPage() {
  return <Studio />
}
