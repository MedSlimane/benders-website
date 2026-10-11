import type { Metadata } from "next"
import { getTranslations, setRequestLocale } from "next-intl/server"
import MaintenanceScreen from "@/components/MaintenanceScreen"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "maintenance" })
  return {
    title: { absolute: t("metaTitle") },
    description: t("metaDescription"),
    // Don't index the maintenance page as the site's content
    robots: { index: false, follow: false },
  }
}

export default async function MaintenancePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  return <MaintenanceScreen />
}
