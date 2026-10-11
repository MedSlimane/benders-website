"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { useLocale, useTranslations } from "next-intl"
import { absoluteUrl, isLocale, localeFromHost, type Locale } from "@/i18n/config"

// Links to the same page on the other-language domain
// (bendersagency.com <-> benders.tn). On localhost / Vercel previews it
// switches with ?locale= instead, since those hosts serve both languages.
// The English site only shows it once NEXT_PUBLIC_TN_LIVE=true, so nobody is
// sent to benders.tn before that domain is live.
export default function LanguageSwitcher({ className = "" }: { className?: string }) {
  const rawLocale = useLocale()
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "en"
  const other: Locale = locale === "en" ? "tn" : "en"
  const t = useTranslations("common")
  const pathname = usePathname() || "/"

  const [href, setHref] = useState(() => absoluteUrl(other, pathname))
  const [isPreviewHost, setIsPreviewHost] = useState(false)

  useEffect(() => {
    if (localeFromHost(window.location.host) === null) {
      setIsPreviewHost(true)
      setHref(`${pathname}?locale=${other}`)
    } else {
      setHref(absoluteUrl(other, pathname))
    }
  }, [pathname, other])

  const visible = locale === "tn" || isPreviewHost || process.env.NEXT_PUBLIC_TN_LIVE === "true"
  if (!visible) return null

  return (
    <a
      href={href}
      hrefLang={other === "tn" ? "ar-TN" : "en"}
      lang={other === "tn" ? "ar-TN" : "en"}
      aria-label={t("switchToLabel")}
      className={className}
    >
      {t("switchTo")}
    </a>
  )
}
