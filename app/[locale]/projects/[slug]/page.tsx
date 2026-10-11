import type { Metadata } from "next"
import { setRequestLocale } from "next-intl/server"
import { fetchProjectBySlug } from "@/lib/sanity"
import { generateProjectMetadata } from "@/lib/seo"
import { isLocale } from "@/i18n/config"
import ProjectPageClient from "@/components/ProjectPageClient"

type Params = Promise<{ locale: string; slug: string }>

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale, slug } = await params
  if (!isLocale(locale)) return {}
  try {
    const project = await fetchProjectBySlug(slug, locale)
    if (!project) return { title: "Project Not Found", robots: { index: false } }
    return generateProjectMetadata(project, locale)
  } catch {
    return {}
  }
}

export default async function ProjectPage({ params }: { params: Params }) {
  const { locale } = await params
  setRequestLocale(locale)
  return <ProjectPageClient />
}
