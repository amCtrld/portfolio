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
    year: "2024",
    title: "Building BowlRMS & Bidbee",
    description: "Leading product development for restaurant management and bidding platforms.",
  },
  {
    year: "2023",
    title: "Launched nijue.me",
    description: "Created a platform for sharing knowledge and connecting with others.",
  },
  {
    year: "2022",
    title: "Systems Engineering",
    description: "Focused on building scalable backend systems and infrastructure.",
  },
  {
    year: "2021",
    title: "Started Coding Journey",
    description: "Began learning web development and building small projects.",
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
                <Icon className="w-5 h-5 text-electric-blue mb-3" />
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
                  <span className="text-sm font-mono text-electric-blue">{item.year}</span>
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
