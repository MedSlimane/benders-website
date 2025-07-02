"use client"

import { motion } from "framer-motion"
import { AlertTriangle, BadgePercent, TrendingUp } from "lucide-react"

interface ProblemSolutionCardsProps {
  loading: boolean
}

const cards = [
  {
    id: 1,
    title: "Stalled Growth",
    description: "We uncover hidden opportunities & launch data-driven campaigns that scale.",
    icon: <AlertTriangle className="w-6 h-6 md:w-8 md:h-8" />,
  },
  {
    id: 2,
    title: "Weak ROI",
    description: "Conversion-centric creative and targeted ads maximise every marketing dollar.",
    icon: <BadgePercent className="w-6 h-6 md:w-8 md:h-8" />,
  },
  {
    id: 3,
    title: "Fragmented Brand",
    description: "A cohesive identity that resonates across every customer touchpoint.",
    icon: <TrendingUp className="w-6 h-6 md:w-8 md:h-8" />,
  },
]

export default function ProblemSolutionCards({ loading }: ProblemSolutionCardsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: loading ? 0 : 1, y: loading ? 30 : 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
    >
      {cards.map((card) => (
        <div
          key={card.id}
          className="solution-card group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 lg:p-8 transition-all duration-500 hover:bg-white/10 hover:border-white/20 hover:scale-105 hover:-translate-y-2 mx-2"
        >
          {/* Icon */}
          <div className="w-14 h-14 lg:w-16 lg:h-16 bg-[var(--color-electric-blue)]/20 rounded-xl flex items-center justify-center text-[var(--color-mint-cyan)] mb-4 lg:mb-6 transition-all duration-300 mx-auto">
            {card.icon}
          </div>

          {/* Title */}
          <h3 className="text-lg lg:text-xl xl:text-2xl font-gilroy font-bold text-white mb-3 lg:mb-4 text-center">
            {card.title}
          </h3>

          {/* Description */}
          <p className="text-white/70 font-neue-montreal leading-relaxed text-sm lg:text-base text-center">
            {card.description}
          </p>
        </div>
      ))}
    </motion.div>
  )
} 