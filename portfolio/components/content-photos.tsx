"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const photos = [
  {
    src: "/autojack.jpg",
    alt: "Cityscape",
    span: "col-span-2",
  },
  {
    src: "/bike.jpeg",
    alt: "Workspace",
    span: "col-span-1",
  },
  {
    src: "/me2.jpg",
    alt: "Architecture",
    span: "col-span-1",
  },
  {
    src: "/me7.jpg",
    alt: "Team meeting",
    span: "col-span-2",
  },
  {
    src: "/me3.jpg",
    alt: "Mountains",
    span: "col-span-1",
  },
  {
    src: "/me6.jpg",
    alt: "Street",
    span: "col-span-1",
  },
  {
    src: "/me4.jpg",
    alt: "Tech setup",
    span: "col-span-1",
  },
  {
    src: "/me5.jpg",
    alt: "Design studio",
    span: "col-span-1",
  },
]

export function ContentPhotos() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="max-w-4xl relative"
    >
      {/* Grid background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <div className="relative">
      <h2 className="text-3xl font-bold text-foreground mb-8">Photos</h2>
      <div className="text-lg text-muted-foreground text-center italic py-4">
        Still working on the content...
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {photos.map((photo, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className={`${photo.span} relative aspect-square rounded-xl overflow-hidden group`}
          >
            <Image
              src={photo.src || "/placeholder.svg"}
              alt={photo.alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
          </motion.div>
        ))}
      </div>

      <p className="text-sm text-muted-foreground text-center mt-8">
        A glimpse into my world — work, travel, and everything in between.
      </p>
      </div>
    </motion.div>
  )
}
