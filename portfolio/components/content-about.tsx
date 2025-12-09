"use client"

import { motion } from "framer-motion"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Code2, Lightbulb, Rocket, Users } from "lucide-react"

const highlights = [
  {
    icon: Code2,
    title: "Technical Foundation",
    description: "Deep expertise in full-stack development, system architecture, and modern web technologies.",
  },
  {
    icon: Lightbulb,
    title: "Problem Solver",
    description: "Passionate about identifying complex problems and building elegant solutions.",
  },
  {
    icon: Rocket,
    title: "Product Builder",
    description: "Experience taking ideas from concept to production, with a focus on user experience.",
  },
  {
    icon: Users,
    title: "Team Player",
    description: "Collaborative approach to building products, with strong communication skills.",
  },
]

const timeline = [
  {
    year: "2026",
    title: "Planning Launch",
    description: "All three projects, nijue.me, Bidbee, and BowlRMS MVPs are slated for launch in 2026, marking significant milestones in my journey as a product builder.",
  },
  {
    year: "2025",
    title: "Building nijue.me & Bidbee",
    description: "Towards the end of 2025, started working on nijue.me and Bidbee. nijue.me is a platform where you can timeline your journey and showcase your growth while Bidbee is an localized bidding platform.",
  },
  {
    year: "2025",
    title: "BowlRMS Development",
    description: "Began the development of BowlRMS, a comprehensive restaurant management and digital menus tool.",
  },
  {
    year: "2024",
    title: "Systems Engineering, ALX",
    description: "Albeit I participated in the ALX Systems Engineering program for three months, the experience provided me with a strong foundation in systems fundamentals and broadened my perspective on how to approach engineering challenges.",
  },
  {
    year: "2023",
    title: "Started Coding Journey",
    description: "Began learning web development and building small projects.",
  },
  {
    year: "2021",
    title: "Arduino & Electronics Enthusiast",
    description: "Initiated my exploration into electronics and programming through Arduino projects, sparking my passion for technology and innovation.",
  },
]

export function ContentAbout() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="max-w-2xl space-y-12"
    >
      {/* Bio */}
      <section>
        <h2 className="text-3xl font-bold text-foreground mb-6">About Me</h2>
        <p className="text-muted-foreground leading-relaxed text-lg">
          I&apos;m Peter Mbugua, a systems engineer and product builder based in Kenya. I specialize in creating digital
          products that solve real-world problems, with a focus on clean architecture and exceptional user experiences.
        </p>
        <p className="text-muted-foreground leading-relaxed text-lg mt-4">
          When I&apos;m not coding, you&apos;ll find me exploring new technologies, reading about business strategy, or
          working on my next big idea.
        </p>
      </section>

      {/* Highlights */}
      <section>
        <h3 className="text-xl font-semibold text-foreground mb-6">What I Bring</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {highlights.map((item, index) => {
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

      {/* Timeline */}
      <section>
        <h3 className="text-xl font-semibold text-foreground mb-6">Journey</h3>
        <Accordion type="single" collapsible className="w-full">
          {timeline.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border-border">
              <AccordionTrigger className="hover:no-underline py-4">
                <div className="flex items-center gap-4">
                  <span className="text-sm font-mono text-[#ff7d00]">{item.year}</span>
                  <span className="text-foreground">{item.title}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pl-16">{item.description}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </motion.div>
  )
}
