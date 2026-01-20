"use client"
import { useRef } from "react"
import Image from "next/image"
import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"
import { type Project, type VideoProject } from "@/lib/sanity"

interface ProjectHeroProps {
  project: Project
}

export default function ProjectHero({ project }: ProjectHeroProps) {
  const mediaRef = useRef<HTMLDivElement>(null)
  
  useGSAP(() => {
    if (!mediaRef.current) return

    gsap.set(mediaRef.current, { opacity: 0, scale: 0.95, y: 40 })
    
    gsap.to(mediaRef.current, {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 1.2,
      delay: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: mediaRef.current,
        start: "top 90%",
        toggleActions: "play none none reverse"
      }
    })
  }, [])

  const isVideoProject = project._type === 'videoProject'
  const videoProject = isVideoProject ? (project as VideoProject) : null

  return (
    <section className="relative px-4 py-20">
      <div className="max-w-7xl mx-auto">
        <div 
          ref={mediaRef}
          className="relative rounded-3xl overflow-hidden"
          style={{
            aspectRatio: isVideoProject && videoProject?.videoType === 'reel' ? '9/16' : '16/9',
            maxWidth: isVideoProject && videoProject?.videoType === 'reel' ? '600px' : '100%',
            margin: '0 auto'
          }}
        >
          {/* Glowing border effect */}
          <div className="absolute inset-0 rounded-3xl p-[2px] bg-gradient-to-br from-[#0055ff]/40 via-[#0055ff]/20 to-[#2de6c7]/40">
            <div className="w-full h-full rounded-3xl bg-[#0a0f2e]" />
          </div>

          {/* Media Content */}
          <div className="relative z-10">
            {isVideoProject && videoProject?.videos && videoProject.videos.length > 0 ? (
              <video
                src={videoProject.videos[0].videoUrl}
                controls
                className="w-full h-full object-cover rounded-3xl"
                poster={project.thumbnail}
              />
            ) : (
              <Image
                src={project.thumbnail}
                alt={project.title}
                width={1920}
                height={1080}
                className="w-full h-full object-cover rounded-3xl"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
