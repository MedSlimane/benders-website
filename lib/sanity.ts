import { createClient } from '@sanity/client'
import { createImageUrlBuilder } from '@sanity/image-url'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION!,
  useCdn: true,
  token: process.env.SANITY_API_READ_TOKEN,
})

const builder = createImageUrlBuilder(client)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function urlFor(source: any) {
  return builder.image(source)
}

// Types
export interface VideoProject {
  _id: string
  _type: 'videoProject'
  title: string
  slug: { current: string }
  subtitle: string
  thumbnail: string
  category?: string
  videoType: 'horizontal' | 'reel'
  videos?: Array<{
    videoUrl: string
    caption?: string
  }>
  client?: string
  year?: string
  services?: string[]
  overview?: string
  challenge?: string
  solution?: string
  results?: Array<{
    metric: string
    value: string
  }>
  insights?: string[]
  testimonial?: {
    quote: string
    author: string
    position: string
  }
  showOverview?: boolean
  showChallenge?: boolean
  showSolution?: boolean
  showResults?: boolean
  showInsights?: boolean
  showTestimonial?: boolean
  featured?: boolean
  order?: number
}

export interface WebProject {
  _id: string
  _type: 'webProject'
  title: string
  slug: { current: string }
  subtitle: string
  thumbnail: string
  category?: string
  websiteUrl?: string
  images?: Array<{
    asset: string
    caption?: string
  }>
  client?: string
  year?: string
  services?: string[]
  technologies?: string[]
  overview?: string
  challenge?: string
  solution?: string
  results?: Array<{
    metric: string
    value: string
  }>
  insights?: string[]
  testimonial?: {
    quote: string
    author: string
    position: string
  }
  showOverview?: boolean
  showChallenge?: boolean
  showSolution?: boolean
  showResults?: boolean
  showInsights?: boolean
  showTestimonial?: boolean
  featured?: boolean
  order?: number
}

export type Project = VideoProject | WebProject

export interface VideoTestimonial {
  _id: string
  name: string
  company?: string
  quote?: string
  videoUrl?: string
  poster?: string
}

export interface SiteSettings {
  heroVideoUrl?: string
  founderVideoUrl?: string
  contactEmail?: string
  bookingUrl?: string
  social?: {
    instagram?: string
    linkedin?: string
    twitter?: string
  }
}

export interface Testimonial {
  _id: string
  name: string
  role?: string
  content: string
  avatar?: string
  handle?: string
}

// Query Helper Functions

/**
 * Fetches all projects (both video and web) ordered by display order
 * @returns Promise<Project[]> Array of all projects
 */
export async function fetchAllProjects(): Promise<Project[]> {
  try {
    const query = `*[_type in ["videoProject", "webProject"]] | order(order asc, _createdAt desc) {
      _id,
      _type,
      title,
      subtitle,
      "slug": slug.current,
      "thumbnail": thumbnail.asset->url,
      category,
      services,
      results,
      featured,
      order
    }`
    
    const projects = await client.fetch<Project[]>(query)
    return projects
  } catch (error) {
    console.error('Error fetching projects:', error)
    throw new Error('Failed to fetch projects')
  }
}

/**
 * Fetches all video testimonials, ordered. Returns [] if there are none.
 * @returns Promise<VideoTestimonial[]>
 */
export async function fetchVideoTestimonials(): Promise<VideoTestimonial[]> {
  try {
    const query = `*[_type == "videoTestimonial"] | order(order asc, _createdAt desc) {
      _id,
      name,
      company,
      quote,
      "videoUrl": select(videoSource == "url" => videoUrl, videoFile.asset->url),
      "poster": posterImage.asset->url
    }`

    const items = await client.fetch<VideoTestimonial[]>(query)
    return (items || []).filter((t) => t.videoUrl)
  } catch (error) {
    console.error('Error fetching video testimonials:', error)
    return []
  }
}

/**
 * Fetches a single project by its slug
 * @param slug - The project slug
 * @returns Promise<Project | null> The project or null if not found
 */
export async function fetchProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const query = `*[_type in ["videoProject", "webProject"] && slug.current == $slug][0]{
      ...,
      "thumbnail": thumbnail.asset->url,
      "images": images[]{
        "asset": asset->url,
        caption
      },
      videos[]{
        videoUrl,
        caption
      }
    }`
    
    const project = await client.fetch<Project | null>(query, { slug })
    return project
  } catch (error) {
    console.error('Error fetching project by slug:', error)
    throw new Error(`Failed to fetch project with slug: ${slug}`)
  }
}

/**
 * Fetches the single Site Settings document (hero/founder videos, contact, socials, booking).
 * Video URLs are resolved to a direct URL whether uploaded or external.
 */
export async function fetchSiteSettings(): Promise<SiteSettings | null> {
  try {
    const query = `*[_type == "siteSettings"][0]{
      "heroVideoUrl": select(heroVideo.videoSource == "url" => heroVideo.videoUrl, heroVideo.videoFile.asset->url),
      "founderVideoUrl": select(founderVideo.videoSource == "url" => founderVideo.videoUrl, founderVideo.videoFile.asset->url),
      contactEmail,
      bookingUrl,
      social
    }`
    return await client.fetch<SiteSettings | null>(query)
  } catch (error) {
    console.error('Error fetching site settings:', error)
    return null
  }
}

/**
 * Fetches text testimonials, ordered. Returns [] if there are none.
 */
export async function fetchTestimonials(): Promise<Testimonial[]> {
  try {
    const query = `*[_type == "testimonial"] | order(order asc, _createdAt desc){
      _id,
      name,
      role,
      content,
      handle,
      "avatar": avatar.asset->url
    }`
    const items = await client.fetch<Testimonial[]>(query)
    return items || []
  } catch (error) {
    console.error('Error fetching testimonials:', error)
    return []
  }
}

/**
 * Fetches the next project in the sequence with circular navigation
 * @param currentOrder - The order number of the current project
 * @returns Promise<Project | null> The next project or null if none found
 */
export async function fetchNextProject(currentOrder: number): Promise<Project | null> {
  try {
    // First, try to get the next project with a higher order
    const nextQuery = `*[_type in ["videoProject", "webProject"] && order > $currentOrder] | order(order asc)[0]{
      _id,
      _type,
      title,
      subtitle,
      "slug": slug.current,
      "thumbnail": thumbnail.asset->url,
      order
    }`
    
    let nextProject = await client.fetch<Project | null>(nextQuery, { currentOrder })
    
    // If no next project found, wrap around to the first project (circular navigation)
    if (!nextProject) {
      const firstQuery = `*[_type in ["videoProject", "webProject"]] | order(order asc, _createdAt desc)[0]{
        _id,
        _type,
        title,
        subtitle,
        "slug": slug.current,
        "thumbnail": thumbnail.asset->url,
        order
      }`
      
      nextProject = await client.fetch<Project | null>(firstQuery)
    }
    
    return nextProject
  } catch (error) {
    console.error('Error fetching next project:', error)
    return null
  }
}
