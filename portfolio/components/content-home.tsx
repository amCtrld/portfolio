"use client"

import { motion } from "framer-motion"

export function ContentHome() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="h-full flex flex-col justify-center max-w-2xl"
    >
      {/* Animated grid background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <div className="relative">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl lg:text-7xl font-bold text-foreground leading-tight tracking-tight text-balance mt-24"
        >
          Building digital
          <br />
          <span className="text-gray-500">experiences</span>
          <br />
          that matter.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 text-lg text-muted-foreground leading-relaxed max-w-lg"
        >
          Currently working on <span className="">BowlRMS, nijue.me and Bidbee</span>{" "}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 flex items-center gap-4"
        >
          <div className="h-px w-12 bg-border" />
          <p className="text-sm text-muted-foreground">Systems Developer & Product Builder</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-24 flex items-center gap-4 px-4 py-2 bg-muted/20 border-l-4 border-border/50"
        >
          <p className="text-sm text-muted-foreground">To serve wholeheartedly,to venture bravely and to build with determination</p>
        </motion.div>
      </div>
    </motion.div>
  )
}
