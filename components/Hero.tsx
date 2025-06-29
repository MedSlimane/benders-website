"use client"
import Image from "next/image"
import { useRef } from "react"
import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"
import InlineTextEffect from "./InlineTextEffect"
import "./inline-text-effect.css"
import ShinyText from "./ShinyText/ShinyText"

interface HeroProps {
  loading: boolean
}

const Hero = ({ loading }: HeroProps) => {
  const heroRef = useRef<HTMLElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const paragraphRef = useRef<HTMLParagraphElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const headingSpans = headingRef.current?.querySelectorAll("h1 > span > span")

      // Set initial states
      gsap.set(
        [
          logoRef.current,
          paragraphRef.current,
          buttonRef.current,
        ],
        {
          opacity: 0,
          y: 30,
        },
      )
      gsap.set(headingSpans || [], { yPercent: 100 })
      gsap.set(imageRef.current, {
        opacity: 0,
        x: 100,
        scale: 0.8,
      })

      if (loading) return

      const tl = gsap.timeline({ delay: 0.2 })

      tl.to(logoRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
      })
      .to(headingSpans || [], {
        yPercent: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power2.out",
      }, "-=0.4")
      .to(paragraphRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
      }, "-=0.6")
      .to(buttonRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "back.out(1.7)",
      }, "-=0.4")
      .to(imageRef.current, {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 1.2,
        ease: "power2.out",
      }, "-=0.8")

      gsap.to(imageRef.current, {
        y: "-10px",
        duration: 2,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1,
        delay: tl.duration() - 0.5,
      })

      const button = buttonRef.current
      if (button) {
        button.addEventListener('mouseenter', () => {
          gsap.to(button, {
            scale: 1.05,
            duration: 0.3,
            ease: "power2.out",
          })
        })

        button.addEventListener('mouseleave', () => {
          gsap.to(button, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
          })
        })
      }
    },
    { scope: heroRef, dependencies: [loading] },
  )

  return (
      <section ref={heroRef} className='relative overflow-hidden w-full h-screen gradient-tertiary'>
          <nav className='flex justify-between items-center p-4 w-full m-5'>
            <div ref={logoRef} className='flex items-center gap-8 p-2'>
                <Image src="/Benders-logo/png/3@2x.png" alt='Benders Logo' width={100} height={100} />
            </div>
          </nav>

          <div className="relative z-10 flex items-center justify-between h-[calc(100vh-88px)] px-16">
              <div className="flex-1 text-white">
                  <h1 ref={headingRef} className="text-6xl font-gilroy font-bold mb-6">
                      <span className="block overflow-hidden">
                          <span className="block">We Help <InlineTextEffect hoverText="BEND">Brands</InlineTextEffect></span>
                      </span>
                      <span className="block overflow-hidden">
                          <span className="block text-4xl font-normal font-neue-montreal mt-2">
                              Grow Through <InlineTextEffect hoverText="YOUR">Creative</InlineTextEffect> <InlineTextEffect hoverText="WILL">Strategy.</InlineTextEffect>
                          </span>
                      </span>
                  </h1>
                  <p ref={paragraphRef} className="text-xl font-neue-montreal mb-8 max-w-2xl">
                     We Design And Manage Marketing Campaigns That Drive Results. 
                  </p>
                  <button ref={buttonRef} className="bg-[var(--color-electric-blue)] text-white font-bold py-3 px-6 rounded-full hover:bg-[var(--color-blue-medium)] transition-colors duration-300">
                      <ShinyText text="Get in Touch" />
                  </button>
              </div>
              <div ref={imageRef} className="flex-1 mt-10 flex justify-center items-center">
                  <Image 
                      src="/bender-man/bender-man.png" 
                      alt="Hero Image"
                      width={600}
                      height={600}
                      className="object-cover"
                  />
              </div>
          </div>
      </section>
  )
}

export default Hero