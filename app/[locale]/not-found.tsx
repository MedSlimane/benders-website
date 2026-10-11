import Link from "next/link"
import { useTranslations } from "next-intl"

export default function NotFound() {
  const t = useTranslations("common")
  return (
    <main
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: "var(--gradient-body)" }}
    >
      <div className="text-center">
        <p className="font-gilroy font-black text-7xl md:text-9xl text-[#2de6c7] mb-4">404</p>
        <h1 className="font-gilroy font-bold text-3xl md:text-4xl text-white mb-8">{t("notFoundTitle")}</h1>
        <Link
          href="/"
          className="inline-block rounded-full px-8 py-3 font-neue-montreal font-medium text-[#04082e]"
          style={{ background: "linear-gradient(135deg, #2de6c7 0%, #04c8aa 100%)" }}
        >
          {t("backHome")}
        </Link>
      </div>
    </main>
  )
}
