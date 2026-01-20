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
