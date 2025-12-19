"use client"
import { useRef, useState, useEffect } from "react"
import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import BIcon from "./BIcon"

gsap.registerPlugin(ScrollTrigger)

interface ContactSectionProps {
  loading: boolean
}

const ContactSection = ({ loading }: ContactSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const leftCardRef = useRef<HTMLDivElement>(null)
  const bIconRef = useRef<HTMLDivElement>(null)
  const emailRef = useRef<HTMLDivElement>(null)
  const bottomTextRef = useRef<HTMLParagraphElement>(null)
  const formFieldsRef = useRef<(HTMLDivElement | null)[]>([])
  const submitBtnRef = useRef<HTMLButtonElement>(null)

  const [formData, setFormData] = useState({
    topic: "",
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    title: "",
    message: ""
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsSubmitting(false)
  }

  // Smooth breathing animation for B icon using CSS
  useEffect(() => {
    if (!bIconRef.current || loading) return

    // Simple smooth breathing with CSS animation - faster
    bIconRef.current.style.animation = "breathe 2.5s ease-in-out infinite"
    
    return () => {
      if (bIconRef.current) {
        bIconRef.current.style.animation = ""
      }
    }
  }, [loading])

  useGSAP(() => {
    if (loading) return

    const title = titleRef.current
    const subtitle = subtitleRef.current
    const leftCard = leftCardRef.current
    const bIcon = bIconRef.current
    const email = emailRef.current
    const bottomText = bottomTextRef.current
    const formFields = formFieldsRef.current.filter(Boolean)
    const submitBtn = submitBtnRef.current

    // Set initial states
    gsap.set(title, { y: 80, opacity: 0 })
    gsap.set(subtitle, { y: 40, opacity: 0 })
    gsap.set(leftCard, { x: -100, opacity: 0, scale: 0.95 })
    gsap.set(bIcon, { scale: 0.5, opacity: 0 })
    gsap.set(email, { y: 30, opacity: 0 })
    gsap.set(bottomText, { y: 20, opacity: 0 })
    gsap.set(formFields, { y: 50, opacity: 0, x: 30 })
    gsap.set(submitBtn, { y: 30, opacity: 0, scale: 0.9 })

    // Title animation
    gsap.to(title, {
      y: 0,
      opacity: 1,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 85%",
        end: "top 55%",
        scrub: 1,
      },
    })

    // Subtitle animation
    gsap.to(subtitle, {
      y: 0,
      opacity: 1,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "top 50%",
        scrub: 1,
      },
    })

    // Left card reveal
    gsap.to(leftCard, {
      x: 0,
      opacity: 1,
      scale: 1,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: leftCard,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    })

    // B Icon reveal
    gsap.to(bIcon, {
      scale: 1,
      opacity: 0.6,
      duration: 1,
      delay: 0.4,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: leftCard,
        start: "top 75%",
        toggleActions: "play none none reverse",
      },
    })

    // Email reveal
    gsap.to(email, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      delay: 0.6,
      ease: "power2.out",
      scrollTrigger: {
        trigger: leftCard,
        start: "top 75%",
        toggleActions: "play none none reverse",
      },
    })

    // Bottom text reveal
    gsap.to(bottomText, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      delay: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: leftCard,
        start: "top 75%",
        toggleActions: "play none none reverse",
      },
    })

    // Form fields staggered reveal
    formFields.forEach((field) => {
      gsap.to(field, {
        y: 0,
        opacity: 1,
        x: 0,
        duration: 0.7,
        ease: "back.out(1.2)",
        scrollTrigger: {
          trigger: field,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      })
    })

    // Submit button
    gsap.to(submitBtn, {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.8,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: submitBtn,
        start: "top 95%",
        toggleActions: "play none none reverse",
      },
    })

  }, { scope: sectionRef, dependencies: [loading] })

  return (
    <section ref={sectionRef} className="relative py-24 md:py-32">
      <div className="w-full px-3 md:px-4 lg:px-6">
        {/* Title */}
        <div className="text-center mb-16 md:mb-24">
          <h2 
            ref={titleRef}
            data-skew
            className="font-gilroy font-black text-5xl md:text-7xl lg:text-[8rem] text-white leading-none tracking-tight"
          >
            GET IN TOUCH
          </h2>
          <p 
            ref={subtitleRef}
            className="font-neue-montreal text-white/60 text-base md:text-lg mt-4 md:mt-6"
          >
            Let&apos;s create something extraordinary together.
          </p>
        </div>

        {/* Content Grid - Full Width */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          
          {/* Left Card - Contact Info with B Icon */}
          <div 
            ref={leftCardRef}
            className="relative rounded-3xl p-10 md:p-14 lg:p-16 overflow-hidden min-h-[500px] md:min-h-[580px] flex flex-col"
            style={{
              background: "linear-gradient(135deg, #2de6c7 0%, #04c8aa 50%, #058071 100%)",
            }}
          >
            {/* Noise texture overlay */}
            <div 
              className="absolute inset-0 opacity-[0.15] mix-blend-overlay pointer-events-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                backgroundRepeat: 'repeat',
              }}
            />

            {/* Card Title */}
            <h3 className="font-gilroy font-black text-4xl md:text-5xl lg:text-6xl text-[#04082e] leading-tight mb-8 relative z-10">
              GET IN<br />TOUCH
            </h3>

            {/* B Icon with breathing - Centered */}
            <div className="flex-grow flex items-center justify-center relative z-10">
              <div 
                ref={bIconRef}
                className="w-32 h-32 md:w-44 md:h-44 lg:w-52 lg:h-52"
                style={{
                  opacity: 0.5,
                }}
              >
                <BIcon className="w-full h-full text-[#1a1a1a]" />
              </div>
            </div>

            {/* Email */}
            <div ref={emailRef} className="text-center relative z-10 mt-8">
              <a 
                href="mailto:contact@benders.io"
                className="font-neue-montreal text-[#04082e] text-lg md:text-xl lg:text-2xl underline underline-offset-4 hover:text-[#04082e]/80 transition-colors font-medium"
              >
                contact@benders.io
              </a>
            </div>

            {/* Bottom Text */}
            <p 
              ref={bottomTextRef}
              className="font-neue-montreal text-[#04082e]/70 text-sm md:text-base text-center mt-6 leading-relaxed relative z-10"
            >
              Or, fill out the form and let the internet do its thing.<br />
              The right person will get back to you within 24 hours.
            </p>
          </div>

          {/* Right Side - Form */}
          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
            {/* Topic Select */}
            <div ref={(el) => { formFieldsRef.current[0] = el }}>
              <select
                name="topic"
                value={formData.topic}
                onChange={handleChange}
                className="w-full bg-transparent border border-white/20 rounded-xl px-5 py-4 text-white font-neue-montreal text-base focus:outline-none focus:border-[#2de6c7] transition-colors appearance-none cursor-pointer"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 1rem center',
                  backgroundSize: '1.25rem',
                }}
              >
                <option value="" className="bg-[#04082e]">Select your topic</option>
                <option value="branding" className="bg-[#04082e]">Branding & Identity</option>
                <option value="web" className="bg-[#04082e]">Web Development</option>
                <option value="marketing" className="bg-[#04082e]">Digital Marketing</option>
                <option value="video" className="bg-[#04082e]">Video Production</option>
                <option value="other" className="bg-[#04082e]">Other</option>
              </select>
            </div>

            {/* First Name */}
            <div ref={(el) => { formFieldsRef.current[1] = el }}>
              <input
                type="text"
                name="firstName"
                placeholder="First name"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full bg-transparent border border-white/20 rounded-xl px-5 py-4 text-white font-neue-montreal text-base placeholder:text-white/50 focus:outline-none focus:border-[#2de6c7] transition-colors"
              />
            </div>

            {/* Last Name */}
            <div ref={(el) => { formFieldsRef.current[2] = el }}>
              <input
                type="text"
                name="lastName"
                placeholder="Last name"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full bg-transparent border border-white/20 rounded-xl px-5 py-4 text-white font-neue-montreal text-base placeholder:text-white/50 focus:outline-none focus:border-[#2de6c7] transition-colors"
              />
            </div>

            {/* Email */}
            <div ref={(el) => { formFieldsRef.current[3] = el }}>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-transparent border border-white/20 rounded-xl px-5 py-4 text-white font-neue-montreal text-base placeholder:text-white/50 focus:outline-none focus:border-[#2de6c7] transition-colors"
              />
            </div>

            {/* Company */}
            <div ref={(el) => { formFieldsRef.current[4] = el }}>
              <input
                type="text"
                name="company"
                placeholder="Company"
                value={formData.company}
                onChange={handleChange}
                className="w-full bg-transparent border border-white/20 rounded-xl px-5 py-4 text-white font-neue-montreal text-base placeholder:text-white/50 focus:outline-none focus:border-[#2de6c7] transition-colors"
              />
            </div>

            {/* Title */}
            <div ref={(el) => { formFieldsRef.current[5] = el }}>
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={formData.title}
                onChange={handleChange}
                className="w-full bg-transparent border border-white/20 rounded-xl px-5 py-4 text-white font-neue-montreal text-base placeholder:text-white/50 focus:outline-none focus:border-[#2de6c7] transition-colors"
              />
            </div>

            {/* Message */}
            <div ref={(el) => { formFieldsRef.current[6] = el }}>
              <textarea
                name="message"
                placeholder="How can we help?"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full bg-transparent border border-white/20 rounded-xl px-5 py-4 text-white font-neue-montreal text-base placeholder:text-white/50 focus:outline-none focus:border-[#2de6c7] transition-colors resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              ref={submitBtnRef}
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-full py-4 px-8 text-white/70 font-gilroy font-semibold text-sm uppercase tracking-wider hover:bg-[#2de6c7] hover:text-[#04082e] hover:border-[#2de6c7] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "PLEASE WAIT..." : "SEND MESSAGE"}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default ContactSection
