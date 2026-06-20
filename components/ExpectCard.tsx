"use client"
import { useState, useEffect } from "react"
import { createPortal } from "react-dom"
import MagneticButton from "./MagneticButton"

const CAL_URL = "https://cal.com/forms/3a5fbe49-4c14-4ecd-a327-786e05d3ce7c"

// TODO: replace this placeholder copy
const PLACEHOLDER =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."

/**
 * "What do you expect?" button. Clicking opens a FULLSCREEN modal (via portal so
 * it escapes the pinned/overflow-hidden section) holding a flip card.
 * Flips on hover (desktop) and on tap (mobile, which has no hover).
 */
const ExpectCard = () => {
  const [open, setOpen] = useState(false)
  const [flipped, setFlipped] = useState(false)

  const close = () => {
    setOpen(false)
    setFlipped(false)
  }

  // Lock background scroll while the modal is open
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  return (
    <>
      <MagneticButton
        variant="primary"
        size="lg"
        onClick={() => setOpen(true)}
        icon={
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M5 12h14" />
          </svg>
        }
      >
        What do you expect?
      </MagneticButton>

      {open &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            className="fixed inset-0 z-[2000] flex items-center justify-center p-5"
            style={{ background: "rgba(4, 8, 46, 0.96)" }}
            onClick={close}
          >
            {/* Close */}
            <button
              onClick={close}
              aria-label="Close"
              className="absolute top-6 right-6 flex h-12 w-12 items-center justify-center rounded-full transition-transform duration-300 hover:scale-110"
              style={{
                background: "rgba(255, 255, 255, 0.08)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
              }}
            >
              <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Flip card */}
            <div
              className="animate-fade-in w-[330px] md:w-[440px] [perspective:1600px]"
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="relative h-[440px] md:h-[500px] w-full cursor-pointer transition-transform duration-700 [transform-style:preserve-3d]"
                style={{ transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
                onMouseEnter={() => setFlipped(true)}
                onMouseLeave={() => setFlipped(false)}
              >
                {/* Front — placeholder copy (tap on mobile to flip) */}
                <div
                  className="absolute inset-0 flex flex-col justify-center overflow-hidden rounded-3xl p-8 text-left [backface-visibility:hidden]"
                  style={{
                    background: "rgba(8, 12, 40, 0.85)",
                    backdropFilter: "blur(24px)",
                    WebkitBackdropFilter: "blur(24px)",
                    border: "1px solid rgba(255, 255, 255, 0.12)",
                  }}
                  onClick={() => setFlipped(true)}
                >
                  <h3 className="mb-4 font-gilroy font-bold text-2xl md:text-3xl text-white">What to expect</h3>
                  <p className="font-neue-montreal text-sm md:text-base leading-relaxed text-white/70">{PLACEHOLDER}</p>
                  <span className="mt-7 inline-flex items-center gap-2 font-neue-montreal text-xs uppercase tracking-widest text-[#2de6c7]">
                    Hover or tap to book
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>

                {/* Back — Cal.com CTA (placeholder link) */}
                <a
                  href={CAL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 flex flex-col items-center justify-center gap-5 rounded-3xl p-8 text-center [backface-visibility:hidden] [transform:rotateY(180deg)]"
                  style={{
                    background: "linear-gradient(135deg, #2de6c7 0%, #04c8aa 100%)",
                    boxShadow: "0 0 60px rgba(45, 230, 199, 0.35)",
                  }}
                >
                  <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="#04082e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" />
                    <path d="M16 2v4M8 2v4M3 10h18" />
                  </svg>
                  <span className="font-gilroy font-black text-3xl text-[#04082e]">Book a call</span>
                  <span className="inline-flex items-center gap-2 font-neue-montreal text-base font-medium text-[#04082e]/80">
                    Let&apos;s talk
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </span>
                </a>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  )
}

export default ExpectCard
