"use client"
import { useRef } from "react"
import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useTranslations } from "next-intl"
import { Flag, Palette, Code, Video, Target, MessageSquare } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

interface ServicesSectionProps {
  loading: boolean
}

type ServiceKey =
  | "brandStrategy"
  | "visualIdentity"
  | "webDevelopment"
  | "videoProduction"
  | "digitalMarketing"
  | "socialMedia"

interface Service {
  id: number
  key: ServiceKey
  icon: React.ReactNode
}

// Titles/descriptions live in messages/<locale>/services.json under items.<key>
const services: Service[] = [
  { id: 1, key: "brandStrategy", icon: <Flag className="h-6 w-6" strokeWidth={1.5} /> },
  { id: 2, key: "visualIdentity", icon: <Palette className="h-6 w-6" strokeWidth={1.5} /> },
  { id: 3, key: "webDevelopment", icon: <Code className="h-6 w-6" strokeWidth={1.5} /> },
  { id: 4, key: "videoProduction", icon: <Video className="h-6 w-6" strokeWidth={1.5} /> },
  { id: 5, key: "digitalMarketing", icon: <Target className="h-6 w-6" strokeWidth={1.5} /> },
  { id: 6, key: "socialMedia", icon: <MessageSquare className="h-6 w-6" strokeWidth={1.5} /> },
]

const ServicesSection = ({ loading }: ServicesSectionProps) => {
  const t = useTranslations("services")
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const rowsRef = useRef<(HTMLDivElement | null)[]>([])

  useGSAP(() => {
    if (loading) return

    const title = titleRef.current
    const subtitle = subtitleRef.current
    const content = contentRef.current
    const rows = rowsRef.current.filter(Boolean)
    if (!title || !subtitle || !content) return

    gsap.set(title, { y: 50, opacity: 0 })
    gsap.set(subtitle, { y: 24, opacity: 0 })
    gsap.set(rows, { y: 40, opacity: 0 })

    const tl = gsap.timeline({
      scrollTrigger: { trigger: content, start: "top 80%", toggleActions: "play none none reverse" },
    })

    tl.to(title, { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" })
      .to(subtitle, { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" }, "-=0.5")
      .to(rows, { y: 0, opacity: 1, duration: 0.7, stagger: 0.08, ease: "power3.out" }, "-=0.3")
  }, { scope: sectionRef, dependencies: [loading] })

  return (
    <section ref={sectionRef} className="relative overflow-hidden">
      <div ref={contentRef} className="relative pt-24 md:pt-32 pb-20 md:pb-28">
        {/* Header */}
        <div className="mb-12 md:mb-16 px-4 text-center">
          <h2
            ref={titleRef}
            data-skew
            className="font-gilroy font-black text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white leading-none tracking-tight mb-4"
          >
            {t("title")}
          </h2>
          <p ref={subtitleRef} className="mx-auto max-w-2xl font-neue-montreal text-white/60 text-sm md:text-base lg:text-lg">
            {t("subtitle")}
          </p>
        </div>

        {/* Editorial list */}
        <div className="mx-auto w-full max-w-5xl px-4 md:px-6">
          {services.map((service, index) => (
            <div
              key={service.id}
              ref={(el) => { rowsRef.current[index] = el }}
              className="group relative grid grid-cols-[auto_1fr_auto] items-center gap-4 md:gap-10 rounded-2xl border-t border-white/10 px-3 py-6 transition-colors duration-300 last:border-b hover:bg-white/[0.025] md:px-5 md:py-8"
            >
              {/* Mint accent bar — grows on hover */}
              <span className="pointer-events-none absolute start-0 top-1/2 h-0 w-[3px] -translate-y-1/2 rounded-full bg-[#2de6c7] transition-all duration-300 group-hover:h-3/5" />

              {/* Index */}
              <span className="font-gilroy font-black text-lg md:text-2xl tabular-nums text-white/25 transition-colors duration-300 group-hover:text-[#2de6c7]">
                {String(index + 1).padStart(2, "0")}
              </span>

              {/* Title + description */}
              <div className="min-w-0">
                <h3 className="font-gilroy font-bold text-2xl md:text-4xl lg:text-5xl leading-tight text-white/90 transition-colors duration-300 group-hover:text-white">
                  {t(`items.${service.key}.title`)}
                </h3>
                <p className="mt-1.5 font-neue-montreal text-sm md:text-base text-white/45 transition-colors duration-300 group-hover:text-white/70">
                  {t(`items.${service.key}.description`)}
                </p>
              </div>

              {/* Icon — fills mint on hover */}
              <div className="flex h-11 w-11 md:h-14 md:w-14 flex-shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/70 transition-all duration-300 group-hover:scale-105 group-hover:border-[#2de6c7] group-hover:bg-[#2de6c7] group-hover:text-[#04082e]">
                {service.icon}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Subtle background orbs cohesive with the site gradient */}
      <div className="pointer-events-none absolute top-1/4 -left-32 h-[500px] w-[500px] rounded-full opacity-[0.04]" style={{ background: "radial-gradient(circle, #2de6c7 0%, transparent 70%)", filter: "blur(100px)" }} />
      <div className="pointer-events-none absolute bottom-1/4 -right-32 h-[400px] w-[400px] rounded-full opacity-[0.04]" style={{ background: "radial-gradient(circle, #0055ff 0%, transparent 70%)", filter: "blur(80px)" }} />
    </section>
  )
}

export default ServicesSection
