"use client"

import { motion } from "framer-motion"
import AccordionGallery from "@/components/AccordionGallery"

const photos = [
  {
    image: "/autojack.jpg",
    label: "Robotics project",
    alt: "Working on an autojack robotics project",
    link: "",
  },
  {
    image: "/bike.jpeg",
    label: "A day out on my bike",
    alt: "Standing with a bicycle outdoors",
    link: "",
  },
  {
    image: "/me1.jpeg",
    label: "Portrait",
    alt: "Black and white portrait",
    link: "",
  },
  {
    image: "/me2.jpg",
    label: "A quiet moment",
    alt: "Portrait indoors",
    link: "",
  },
  {
    image: "/me3.jpg",
    label: "Outdoors",
    alt: "Smiling outdoors",
    link: "",
  },
  {
    image: "/me4.jpg",
    label: "Cycling with friends",
    alt: "Cycling with a group of friends",
    link: "",
  },
  {
    image: "/me5.jpg",
    label: "School days",
    alt: "A group of students outside a building",
    link: "",
  },
  {
    image: "/me6.jpg",
    label: "Portrait",
    alt: "Low-light portrait",
    link: "",
  },
  {
    image: "/me7.jpg",
    label: "Portrait with headphones",
    alt: "Wearing headphones",
    link: "",
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
      <h2 className="text-3xl font-bold text-foreground mb-8">Photos</h2>
      <AccordionGallery items={photos} defaultIndex={0} height={460} />
      <p className="text-sm text-muted-foreground text-center mt-8">
        A glimpse into my world — work, travel, and everything in between.
      </p>
    </motion.div>
  )
}
