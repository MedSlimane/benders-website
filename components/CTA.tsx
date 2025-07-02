"use client"
import { useRef, useEffect } from "react"
import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"
import { motion } from "framer-motion"

interface CTAProps {
  title?: string
  subtitle?: string
  className?: string
  loading: boolean
}

// Add type declaration for window.calendar
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    calendar?: any;
  }
}

const CTA = ({ 
  title = "Ready to Transform Your Brand?", 
  subtitle = "Let's discuss how we can help you achieve your marketing goals through creative strategy.",
  className = "",
  loading
}: CTAProps) => {
  const ctaRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const buttonTargetRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      // Set initial states
      gsap.set([titleRef.current, subtitleRef.current], {
        opacity: 0,
        y: 30,
      })

      if (loading) return

      // Create timeline for animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ctaRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      })

      tl.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
      })
      .to(subtitleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
      }, "-=0.4")

      // Button hover effects
      const button = buttonTargetRef.current
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
    { scope: ctaRef, dependencies: [loading] }
  )

  // Load Google Calendar Scheduling Button script and CSS, and initialize the button
  useEffect(() => {
    if (loading) return;
    // Load CSS
    if (!document.getElementById('gcal-scheduling-css')) {
      const link = document.createElement('link');
      link.id = 'gcal-scheduling-css';
      link.rel = 'stylesheet';
      link.href = 'https://calendar.google.com/calendar/scheduling-button-script.css';
      document.head.appendChild(link);
    }
    // Load Script
    if (!document.getElementById('gcal-scheduling-script')) {
      const script = document.createElement('script');
      script.id = 'gcal-scheduling-script';
      script.src = 'https://calendar.google.com/calendar/scheduling-button-script.js';
      script.async = true;
      script.onload = () => {
        if (window.calendar && buttonTargetRef.current) {
          window.calendar.schedulingButton.load({
            url: 'https://calendar.google.com/calendar/appointments/schedules/AcZssZ31zb6ylOEMCB2-9Ry7xOENsETmqbZZQG9l8PV_v2lYL9E81yyeglqpPqSq_Za1sYB9N3YCURuz?gv=true',
            color: '#039BE5',
            label: 'Book an appointment',
            target: buttonTargetRef.current,
          });
        }
      };
      document.body.appendChild(script);
    } else {
      // Script already loaded
      if (window.calendar && buttonTargetRef.current) {
        window.calendar.schedulingButton.load({
          url: 'https://calendar.google.com/calendar/appointments/schedules/AcZssZ31zb6ylOEMCB2-9Ry7xOENsETmqbZZQG9l8PV_v2lYL9E81yyeglqpPqSq_Za1sYB9N3YCURuz?gv=true',
          color: '#039BE5',
          label: 'Book an appointment',
          target: buttonTargetRef.current,
        });
      }
    }
  }, [loading]);

  return (
    <motion.section 
      ref={ctaRef} 
      className={`relative w-full py-16 md:py-24 ${className}`}
      style={{ opacity: loading ? 0 : 1, visibility: loading ? 'hidden' : 'visible' }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.8 }}
    >
      <div className="container mx-auto px-6 md:px-16 text-center">
        <h2 
          ref={titleRef}
          className="text-3xl md:text-5xl font-gilroy font-bold text-white mb-6"
        >
          {title}
        </h2>
        
        <p 
          ref={subtitleRef}
          className="text-lg md:text-xl font-neue-montreal text-white mb-8 max-w-3xl mx-auto opacity-90"
        >
          {subtitle}
        </p>
        
        <div ref={buttonTargetRef} className="flex justify-center">
          <button
            type="button"
            className="bg-[var(--color-electric-blue)] text-white font-bold py-4 px-8 rounded-full hover:bg-[var(--color-blue-medium)] transition-colors duration-300 shadow-lg"
            onClick={() => {
              window.open('https://calendar.google.com/calendar/appointments/schedules/AcZssZ31zb6ylOEMCB2-9Ry7xOENsETmqbZZQG9l8PV_v2lYL9E81yyeglqpPqSq_Za1sYB9N3YCURuz?gv=true', '_blank', 'noopener,noreferrer');
            }}
          >
            Book an appointment
          </button>
        </div>
      </div>
    </motion.section>
  )
}

export default CTA 