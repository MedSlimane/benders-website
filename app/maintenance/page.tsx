import type { Metadata } from "next"
import MaintenanceScreen from "@/components/MaintenanceScreen"

export const metadata: Metadata = {
  title: "We'll be back soon | Benders Agency",
  description:
    "Benders Agency is getting a major upgrade. We'll be back online very soon. In the meantime, reach us at contact@benders.io.",
  // Don't index the maintenance page as the site's content
  robots: { index: false, follow: false },
}

export default function MaintenancePage() {
  return <MaintenanceScreen />
}
