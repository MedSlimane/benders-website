import { fetchProjectBySlug } from '@/lib/sanity'
import { generateProjectMetadata } from '@/lib/seo'
import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  try {
    const project = await fetchProjectBySlug(params.slug)
    
    if (!project) {
      return {
        title: 'Project Not Found | Benders Agency',
        description: 'The requested project could not be found.',
      }
    }

    return generateProjectMetadata(project)
  } catch (error) {
    console.error('Error generating metadata:', error)
    return {
      title: 'Benders Agency',
      description: 'Creative agency specializing in video production and web development',
    }
  }
}
