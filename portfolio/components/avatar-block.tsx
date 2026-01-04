"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

function StareheBadge() {
  const badgeContent = (
    <div className="flex h-6 w-6 gap-1 rounded-full cursor-pointer transition-transform hover:scale-110">
      <div className="w-1/2 h-full bg-red-600 rounded-full" />
      <div className="w-1/2 h-full bg-blue-400 rounded-full" />
    </div>
  )

  const tooltipText = (
    <div className="text-center">
      <Link href="https://stareheboyscentre.org/" target="_blank" rel="noopener noreferrer" className="font-medium text-muted-foreground">SBC | C'19</Link>
    </div>
  );

  return (
    <>
      <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10">
        <TooltipProvider delayDuration={100}>
          <Tooltip>
            <TooltipTrigger asChild>
              {badgeContent}
            </TooltipTrigger>
            <TooltipContent side="right" className="bg-background/95 backdrop-blur-sm border border-border">
              {tooltipText}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </>
  )
}

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

      <div className="relative">
        <Avatar className="w-32 h-32 border-2 border-white/10 relative">
          <AvatarImage src="/Actual.JPG" alt="Peter Mbugua" className="object-cover" />
          <AvatarFallback className="text-2xl bg-secondary text-foreground">PM</AvatarFallback>
        </Avatar>

        <StareheBadge />

      </div>
    </motion.div>
  )
}
