"use client"

import { motion } from "framer-motion"
import { Network, HandCoins, Waypoints, FlaskConical } from "lucide-react"

const pillars = [
  {
    icon: Network,
    title: "The Castle & Bricks",
    description:
      "A central classroom hub, the Castle, coordinates student kits, or Bricks, over a local wireless mesh. Go-Gated components unlock as learners master each engineering challenge.",
  },
  {
    icon: HandCoins,
    title: "Lease-to-Own & Regional Pooling",
    description:
      "Robust, reusable kits are shared across schools and learner groups, with affordable termly access that avoids prohibitive upfront costs.",
  },
]

export function ContentVision() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="max-w-2xl relative"
    >
      {/* Grid background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <div className="relative space-y-8">
        {/* Intro */}
        <section>
          <h2 className="text-3xl font-bold text-foreground mb-6">Vision: Tandu Platforms</h2>
          <p className="text-muted-foreground leading-relaxed text-lg">
            Democratizing practical STEM and robotics across Kenya and beyond. Tandu comes from{" "}
            <em>utandu</em>, the Swahili word for a spider web, symbolizing connectivity, structure, and
            resilience.
          </p>
          <p className="text-muted-foreground leading-relaxed text-lg mt-4">
            Its mission is to make hands-on engineering affordable and accessible, bridging the gap between
            classroom theory and working with real hardware.
          </p>
        </section>

        {/* Ecosystem */}
        <section>
          <h3 className="text-xl font-semibold text-foreground mb-6">The Ecosystem</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {pillars.map((item, index) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="p-4 rounded-xl bg-card border border-border hover:border-white/20 transition-colors"
                >
                  <Icon className="w-5 h-5 text-[#ff7d00] mb-3" />
                  <h4 className="font-medium text-foreground mb-1">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </motion.div>
              )
            })}
          </div>
        </section>

        {/* Horizon */}
        <section className="border-y border-border pb-6">
          <h3 className="text-xl font-semibold text-foreground my-6">The Ultimate Horizon: Regional STEM Labs</h3>
          <ul className="space-y-3 text-muted-foreground text-sm leading-relaxed">
            <li className="flex items-start gap-3">
              <FlaskConical className="w-4 h-4 mt-0.5 shrink-0 text-[#ff7d00]" />
              <span>
                <strong className="font-semibold text-foreground">Open-access hubs:</strong> regional spaces where
                learners advance from classroom kits to prototyping and robotics fabrication.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Waypoints className="w-4 h-4 mt-0.5 shrink-0 text-[#ff7d00]" />
              <span>
                <strong className="font-semibold text-foreground">Community & showcase:</strong> places to
                demonstrate innovations, host robotics leagues, collaborate, and build real-world solutions.
              </span>
            </li>
          </ul>
        </section>
      </div>
    </motion.div>
  )
}