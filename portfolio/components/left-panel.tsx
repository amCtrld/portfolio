"use client"

import type React from "react"

import { motion } from "framer-motion"

interface LeftPanelProps {
  children: React.ReactNode
}

export function LeftPanel({ children }: LeftPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="flex-1 h-full overflow-y-auto"
    >
      <div className="min-h-full p-8 lg:p-12">{children}</div>
    </motion.div>
  )
}
