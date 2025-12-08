"use client"

import { motion } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function AvatarBlock() {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative"
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,rgba(0,153,255,0.15),transparent_70%)] blur-xl scale-150" />

      {/* Avatar */}
      <Avatar className="w-32 h-32 border-2 border-white/10 relative">
        <AvatarImage src="/Actual.jpg" alt="Peter Mbugua" className="object-cover" />
        <AvatarFallback className="text-2xl bg-secondary text-foreground">PM</AvatarFallback>
      </Avatar>
    </motion.div>
  )
}
