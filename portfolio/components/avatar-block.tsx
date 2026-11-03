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

const BADGE_SIZE = 24 
const NOTCH_GAP = 5 
const NOTCH_RADIUS = BADGE_SIZE / 2 + NOTCH_GAP
const NOTCH_CENTER = "85.4%"


const notchMask = `radial-gradient(circle at ${NOTCH_CENTER} ${NOTCH_CENTER}, transparent ${NOTCH_RADIUS}px, #000 ${NOTCH_RADIUS + 0.5}px)`

function StareheBadge() {
  return (
    <div className="hidden md:block absolute bottom-[14.6%] right-[14.6%] translate-x-1/2 translate-y-1/2 z-10">
      <TooltipProvider delayDuration={100}>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              type="button"
              aria-label="Starehe Boys' Centre"
              className="flex h-7 w-7 p-1.5 gap-1 rounded-full cursor-pointer transition-transform hover:scale-110"
            >
              <div className="w-1/2 h-full bg-red-600 rounded-full" />
              <div className="w-1/2 h-full bg-blue-400 rounded-full" />
            </button>
          </TooltipTrigger>
          <TooltipContent
            side="right"
            className="bg-background/95 backdrop-blur-sm border border-border"
          >
            <div className="text-center">
              <Link
                href="https://stareheboyscentre.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-muted-foreground"
              >
                SBC | C&apos;19
              </Link>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
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

      {/* w-fit keeps this wrapper exactly the avatar's size, so the badge's % offsets are reliable */}
      <div className="relative w-fit">
        <Avatar
          className="w-32 h-32 border-2 border-white/10 relative"
          style={{ maskImage: notchMask, WebkitMaskImage: notchMask }}
        >
          <AvatarImage src="/Actual.JPG" alt="Peter Mbugua" className="object-cover" />
          <AvatarFallback className="text-2xl bg-secondary text-foreground">PM</AvatarFallback>
        </Avatar>

        
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 overflow-hidden rounded-full"
        >
          <span
            className="absolute rounded-full border-2 border-white/10"
            style={{
              width: NOTCH_RADIUS * 2,
              height: NOTCH_RADIUS * 2,
              left: NOTCH_CENTER,
              top: NOTCH_CENTER,
              transform: "translate(-50%, -50%)",
            }}
          />
        </div>

        <StareheBadge />
      </div>
    </motion.div>
  )
}