"use client"
import { useRef, useState, useEffect } from "react"
import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import BIcon from "./BIcon"
import MagneticButton from "./MagneticButton"


gsap.registerPlugin(ScrollTrigger)

interface ContactSectionProps {
  loading: boolean
}

const ContactSection = ({ loading }: ContactSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const titleCharsRef = useRef<(HTMLSpanElement | null)[]>([])
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const leftCardRef = useRef<HTMLDivElement>(null)
  const bIconRef = useRef<HTMLDivElement>(null)
  const emailRef = useRef<HTMLDivElement>(null)
  const bottomTextRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const dividerRef = useRef<HTMLDivElement>(null)
  const orTextRef = useRef<HTMLSpanElement>(null)
  const formFieldsRef = useRef<(HTMLDivElement | null)[]>([])
  const submitBtnRef = useRef<HTMLButtonElement>(null)
  const glowOrbRef = useRef<HTMLDivElement>(null)

  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsSubmitting(false)
  }

  useEffect(() => {
    const bIcon = bIconRef.current
    if (!bIcon || loading) return
    bIcon.style.animation = "breathe 2.5s ease-in-out infinite"
    return () => { if (bIcon) bIcon.style.animation = "" }
  }, [loading])


  useGSAP(() => {
    if (loading) return

    const titleChars = titleCharsRef.current.filter(Boolean)
    const subtitle = subtitleRef.current
    const leftCard = leftCardRef.current
    const bIcon = bIconRef.current
    const email = emailRef.current
    const bottomText = bottomTextRef.current
    const cta = ctaRef.current
    const divider = dividerRef.current
    const orText = orTextRef.current
    const formFields = formFieldsRef.current.filter(Boolean)
    const submitBtn = submitBtnRef.current
    const glowOrb = glowOrbRef.current

    // Premium scattered effect for title chars
    titleChars.forEach((char) => {
      gsap.set(char, { y: 100 + Math.random() * 40, opacity: 0, rotateX: -90, scale: 0.5, force3D: true })
    })
    
    gsap.set(subtitle, { y: 40, opacity: 0, filter: "blur(10px)" })
    gsap.set(leftCard, { x: -100, opacity: 0, scale: 0.9, rotateY: 12 })
    gsap.set(bIcon, { scale: 0, opacity: 0, rotation: -180 })
    gsap.set(email, { y: 30, opacity: 0, scale: 0.8 })
    gsap.set(bottomText, { y: 20, opacity: 0 })
    gsap.set(cta, { y: 50, opacity: 0, scale: 0.85 })
    gsap.set(divider, { scaleX: 0, opacity: 0 })
    gsap.set(orText, { scale: 0, opacity: 0 })
    gsap.set(formFields, { y: 40, opacity: 0, x: 30 })
    gsap.set(submitBtn, { y: 30, opacity: 0, scale: 0.9 })
    gsap.set(glowOrb, { scale: 0, opacity: 0 })

    // Title chars staggered reveal
    const titleTl = gsap.timeline({
      scrollTrigger: { trigger: sectionRef.current, start: "top 80%", end: "top 45%", scrub: 1.5 },
    })
    titleTl.to(titleChars, {
      y: 0, opacity: 1, rotateX: 0, scale: 1,
      stagger: { amount: 0.5, from: "random" },
      ease: "back.out(1.7)",
    })

    // Subtitle blur reveal
    gsap.to(subtitle, {
      y: 0, opacity: 1, filter: "blur(0px)",
      scrollTrigger: { trigger: sectionRef.current, start: "top 75%", end: "top 50%", scrub: 1 },
    })

    // Glow orb
    gsap.to(glowOrb, {
      scale: 1, opacity: 0.5, duration: 2, ease: "power2.out",
      scrollTrigger: { trigger: leftCard, start: "top 85%", toggleActions: "play none none reverse" },
    })

    // Left card 3D reveal
    gsap.to(leftCard, {
      x: 0, opacity: 1, scale: 1, rotateY: 0, duration: 1.2, ease: "power4.out",
      scrollTrigger: { trigger: leftCard, start: "top 85%", toggleActions: "play none none reverse" },
    })

    // B Icon spin reveal
    gsap.to(bIcon, {
      scale: 1, opacity: 0.6, rotation: 0, duration: 1, delay: 0.3, ease: "elastic.out(1, 0.5)",
      scrollTrigger: { trigger: leftCard, start: "top 80%", toggleActions: "play none none reverse" },
    })

    // Email pop
    gsap.to(email, {
      y: 0, opacity: 1, scale: 1, duration: 0.7, delay: 0.5, ease: "back.out(2)",
      scrollTrigger: { trigger: leftCard, start: "top 80%", toggleActions: "play none none reverse" },
    })

    // Bottom text
    gsap.to(bottomText, {
      y: 0, opacity: 1, duration: 0.6, delay: 0.6, ease: "power2.out",
      scrollTrigger: { trigger: leftCard, start: "top 80%", toggleActions: "play none none reverse" },
    })

    // CTA bounce
    gsap.to(cta, {
      y: 0, opacity: 1, scale: 1, duration: 0.9, ease: "elastic.out(1, 0.6)",
      scrollTrigger: { trigger: cta, start: "top 92%", toggleActions: "play none none reverse" },
    })

    // Divider expand
    const dividerTl = gsap.timeline({
      scrollTrigger: { trigger: divider, start: "top 92%", toggleActions: "play none none reverse" },
    })
    dividerTl.to(divider, { scaleX: 1, opacity: 1, duration: 0.7, ease: "power3.out" })
      .to(orText, { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(2)" }, "-=0.2")

    // Form fields stagger
    formFields.forEach((field, index) => {
      gsap.to(field, {
        y: 0, opacity: 1, x: 0, duration: 0.6, delay: index * 0.1, ease: "power3.out",
        scrollTrigger: { trigger: field, start: "top 95%", toggleActions: "play none none reverse" },
      })
    })

    // Submit button
    gsap.to(submitBtn, {
      y: 0, opacity: 1, scale: 1, duration: 0.7, ease: "back.out(1.7)",
      scrollTrigger: { trigger: submitBtn, start: "top 98%", toggleActions: "play none none reverse" },
    })
  }, { scope: sectionRef, dependencies: [loading] })

  const titleText = "GET IN TOUCH"
  const titleChars = titleText.split("")


  return (
    <section ref={sectionRef} className="relative py-20 md:py-28 lg:py-32 overflow-hidden">
      {/* Floating glow orb */}
      <div
        ref={glowOrbRef}
        className="absolute top-1/4 right-1/4 w-[400px] h-[400px] rounded-full pointer-events-none blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(45, 230, 199, 0.15) 0%, transparent 70%)" }}
      />

      <div className="w-full px-4 md:px-8 lg:px-12 xl:px-16 relative z-10">
        {/* Title */}
        <div className="text-center mb-10 md:mb-12 lg:mb-14">
          <h2 
            ref={titleRef}
            data-skew
            className="font-gilroy font-black text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white leading-none tracking-tight inline-flex flex-wrap justify-center"
            style={{ perspective: "1000px" }}
          >
            {titleChars.map((char, i) => (
              <span
                key={i}
                ref={(el) => { titleCharsRef.current[i] = el }}
                className={char === " " ? "w-3 md:w-4" : ""}
                style={{ display: "inline-block", transformStyle: "preserve-3d" }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </h2>
          <p ref={subtitleRef} className="font-neue-montreal text-white/60 text-sm md:text-base mt-3">
            Let&apos;s create something extraordinary together.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-stretch">
          
          {/* Left Card */}
          <div 
            ref={leftCardRef}
            className="relative rounded-2xl lg:rounded-3xl p-8 md:p-10 lg:p-12 overflow-hidden min-h-[380px] md:min-h-[420px] lg:min-h-[450px] flex flex-col"
            style={{ background: "linear-gradient(135deg, #2de6c7 0%, #04c8aa 50%, #058071 100%)", transformStyle: "preserve-3d" }}
          >
            <div 
              className="absolute inset-0 opacity-[0.15] mix-blend-overlay pointer-events-none"
              style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`, backgroundRepeat: 'repeat' }}
            />
            <h3 className="font-gilroy font-black text-2xl md:text-3xl lg:text-4xl text-[#04082e] leading-tight mb-4 relative z-10">GET IN<br />TOUCH</h3>
            <div className="flex-grow flex items-center justify-center relative z-10">
              <div ref={bIconRef} className="w-20 h-20 md:w-28 md:h-28 lg:w-32 lg:h-32" style={{ opacity: 0.5 }}>
                <BIcon className="w-full h-full text-[#1a1a1a]" />
              </div>
            </div>
            <div ref={emailRef} className="text-center relative z-10 mt-4">
              <a href="mailto:contact@benders.io" className="font-neue-montreal text-[#04082e] text-sm md:text-base lg:text-lg underline underline-offset-4 hover:text-[#04082e]/80 transition-colors font-medium">
                contact@benders.io
              </a>
            </div>
            <p ref={bottomTextRef} className="font-neue-montreal text-[#04082e]/70 text-xs md:text-sm text-center mt-3 relative z-10">
              We&apos;ll get back to you within 24 hours.
            </p>
          </div>

          {/* Right Side */}
          <div className="flex flex-col justify-between h-full">
            {/* CTA */}
            <div ref={ctaRef} className="mb-5">
              <MagneticButton
                href="https://calendar.app.google/ENRJ1d6t9AM9nwy7A"
                variant="glass"
                size="lg"
                className="w-full justify-center"
                icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#2de6c7]"><path d="M5 12h14" /><path d="M12 5l7 7-7 7" /></svg>}
              >
                Book a Free Call
              </MagneticButton>
            </div>

            {/* OR Divider */}
            <div ref={dividerRef} className="flex items-center gap-4 my-4 origin-center">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
              <span ref={orTextRef} className="font-gilroy font-bold text-white/40 text-xs uppercase tracking-widest">or</span>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3">
              <div ref={(el) => { formFieldsRef.current[0] = el }}>
                <input type="text" name="name" placeholder="Your name" value={formData.name} onChange={handleChange} onFocus={() => setFocusedField("name")} onBlur={() => setFocusedField(null)} required
                  className="w-full rounded-xl px-4 py-3 text-white font-neue-montreal text-sm placeholder:text-white/40 focus:outline-none transition-all duration-300"
                  style={{ background: focusedField === "name" ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.05)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", border: focusedField === "name" ? "1px solid rgba(45,230,199,0.5)" : "1px solid rgba(255,255,255,0.1)", boxShadow: focusedField === "name" ? "0 0 25px rgba(45,230,199,0.1)" : "none" }}
                />
              </div>
              <div ref={(el) => { formFieldsRef.current[1] = el }}>
                <input type="email" name="email" placeholder="Your email" value={formData.email} onChange={handleChange} onFocus={() => setFocusedField("email")} onBlur={() => setFocusedField(null)} required
                  className="w-full rounded-xl px-4 py-3 text-white font-neue-montreal text-sm placeholder:text-white/40 focus:outline-none transition-all duration-300"
                  style={{ background: focusedField === "email" ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.05)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", border: focusedField === "email" ? "1px solid rgba(45,230,199,0.5)" : "1px solid rgba(255,255,255,0.1)", boxShadow: focusedField === "email" ? "0 0 25px rgba(45,230,199,0.1)" : "none" }}
                />
              </div>
              <div ref={(el) => { formFieldsRef.current[2] = el }}>
                <textarea name="message" placeholder="Tell us about your project..." value={formData.message} onChange={handleChange} onFocus={() => setFocusedField("message")} onBlur={() => setFocusedField(null)} required rows={3}
                  className="w-full rounded-xl px-4 py-3 text-white font-neue-montreal text-sm placeholder:text-white/40 focus:outline-none transition-all duration-300 resize-none"
                  style={{ background: focusedField === "message" ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.05)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", border: focusedField === "message" ? "1px solid rgba(45,230,199,0.5)" : "1px solid rgba(255,255,255,0.1)", boxShadow: focusedField === "message" ? "0 0 25px rgba(45,230,199,0.1)" : "none" }}
                />
              </div>
              <button ref={submitBtnRef} type="submit" disabled={isSubmitting}
                className="w-full rounded-full py-3 px-6 font-gilroy font-semibold text-sm uppercase tracking-wider transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02]"
                style={{ background: "rgba(255,255,255,0.08)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.8)" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "linear-gradient(135deg, #2de6c7 0%, #04c8aa 100%)"; e.currentTarget.style.color = "#04082e"; e.currentTarget.style.borderColor = "#2de6c7"; e.currentTarget.style.boxShadow = "0 0 35px rgba(45,230,199,0.4)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; e.currentTarget.style.color = "rgba(255,255,255,0.8)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; e.currentTarget.style.boxShadow = "none"; }}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactSection
