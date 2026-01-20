/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { useRef, useState } from "react"
import Image from "next/image"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { Play, Pause, Volume2, VolumeX } from "lucide-react"
import { urlFor } from "@/lib/sanity"
import type { Project, VideoProject, WebProject } from "@/lib/sanity"

gsap.registerPlugin(ScrollTrigger)

interface MediaGalleryProps {
  project: Project
}

interface VideoControlsProps {
  videoRef: React.RefObject<HTMLVideoElement | null>
}

const VideoControls = ({ videoRef }: VideoControlsProps) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)

  const togglePlay = () => {
    if (!videoRef.current) return
    
    if (isPlaying) {
      videoRef.current.pause()
    } else {
      videoRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  const toggleMute = () => {
    if (!videoRef.current) return
    
    videoRef.current.muted = !isMuted
    setIsMuted(!isMuted)
  }

  return (
    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between z-20">
      <button
        onClick={togglePlay}
        className="flex items-center justify-center w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white transition-all duration-300 group"
        aria-label={isPlaying ? "Pause video" : "Play video"}
      >
        {isPlaying ? (
          <Pause className="w-5 h-5 text-black" />
        ) : (
          <Play className="w-5 h-5 text-black ml-0.5" />
        )}
      </button>

      <button
        onClick={toggleMute}
        className="flex items-center justify-center w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white transition-all duration-300"
        aria-label={isMuted ? "Unmute video" : "Mute video"}
      >
        {isMuted ? (
          <VolumeX className="w-5 h-5 text-black" />
        ) : (
          <Volume2 className="w-5 h-5 text-black" />
        )}
      </button>
    </div>
  )
}

const MediaGallery = ({ project }: MediaGalleryProps) => {
  const galleryRef = useRef<HTMLDivElement>(null)
  const itemsRef = useRef<(HTMLDivElement | null)[]>([])
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])

  const isVideoProject = project._type === 'videoProject'
  const webProject = !isVideoProject ? (project as WebProject) : null

  const media = isVideoProject ? (project as VideoProject).videos : webProject?.images
  const hasMultipleMedia = media && media.length > 1

  // Determine aspect ratio
  const aspectRatio = isVideoProject && (project as VideoProject).videoType === 'reel' ? '9/16' : '16/9'
  const maxWidth = isVideoProject && (project as VideoProject).videoType === 'reel' ? '600px' : '100%'

  useGSAP(() => {
    if (!media || media.length === 0) return

    itemsRef.current.forEach((item) => {
      if (!item) return

      gsap.set(item, { opacity: 0, y: 80, scale: 0.95 })

      gsap.to(item, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: item,
          start: "top 85%",
          end: "top 60%",
          scrub: 1,
        }
      })
    })
  }, { scope: galleryRef, dependencies: [media] })

  if (!media || media.length === 0) {
    return null
  }

  return (
    <section ref={galleryRef} className="relative px-4 py-20">
      <div className="max-w-7xl mx-auto">
        <div 
          className={`
            ${hasMultipleMedia ? 'grid grid-cols-1 md:grid-cols-2 gap-8' : 'flex justify-center'}
          `}
        >
          {media.map((item, index) => (
            <div
              key={index}
              ref={(el) => { itemsRef.current[index] = el }}
              className="relative"
              style={{
                aspectRatio: aspectRatio,
                maxWidth: hasMultipleMedia ? '100%' : maxWidth,
                margin: hasMultipleMedia ? '0' : '0 auto'
              }}
            >
              {/* Glowing border effect */}
              <div className="absolute inset-0 rounded-3xl p-[2px] bg-gradient-to-br from-[#0055ff]/40 via-[#0055ff]/20 to-[#2de6c7]/40">
                <div className="w-full h-full rounded-3xl bg-[#0a0f2e]" />
              </div>

              {/* Media Content */}
              <div className="relative z-10 w-full h-full rounded-3xl overflow-hidden">
                {isVideoProject ? (
                  <>
                    <video
                      ref={(el) => { videoRefs.current[index] = el }}
                      src={
                        (item as any).videoSource === 'file' && (item as any).videoFile?.asset?.url
                          ? (item as any).videoFile.asset.url
                          : (item as any).videoUrl
                      }
                      className="w-full h-full object-cover"
                      loop
                      muted
                      playsInline
                      preload="metadata"
                      poster={
                        (item as any).posterImage
                          ? urlFor((item as any).posterImage).width(800).format('webp').url()
                          : urlFor(project.thumbnail).width(800).format('webp').url()
                      }
                      aria-label={(item as { caption?: string }).caption || `${project.title} video`}
                    />
                    <VideoControls 
                      videoRef={{ current: videoRefs.current[index] ?? null }} 
                    />
                  </>
                ) : (
                  <Image
                    src={(item as { asset?: string; url?: string }).asset || (item as { asset?: string; url?: string }).url || project.thumbnail}
                    alt={(item as { caption?: string }).caption || project.title}
                    fill
                    className="object-cover"
                  />
                )}
              </div>

              {/* Caption */}
              {(item as { caption?: string }).caption && (
                <p className="mt-4 font-neue-montreal text-white/60 text-sm md:text-base text-center">
                  {(item as { caption?: string }).caption}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default MediaGallery
