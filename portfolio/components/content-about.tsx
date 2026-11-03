"use client"

import { motion } from "framer-motion"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { BookOpen, Cpu, Database, FileUser, Wallet } from "lucide-react"

const highlights = [
  {
    icon: Wallet,
    title: "Built for Kenyan Payments",
    description: "Working with M-Pesa Daraja, Paystack and Tuma Online, built around how people here actually pay.",
  },
  {
    icon: Database,
    title: "Architecture, Fixed Early",
    description: "Migrating BowlRMS from Firebase to Supabase and reworking core data models before launch, not after.",
  },
  {
    icon: Cpu,
    title: "Hardware Roots",
    description: "Started with Arduino and electronics in 2021, then moved into full-stack web development in 2023.",
  },
  {
    icon: BookOpen,
    title: "Building in Public",
    description: "A monthly, unfiltered Journey log of what shipped, what broke and what I learned.",
  },
]

const timeline = [
  {
    year: "2026",
    title: "Pre-Launch Hardening",
    description: "Haven't launched yet. I've spent the better part of 2026 fixing architectural issues across BowlRMS, including the Firebase to Supabase migration and core data model reworks, while adding client-demanded features like Charts of Accounts. Launching soon.",
  },
  {
    year: "2026",
    title: "Planning Launch",
    description: "nijue.me, Bidbee and BowlRMS are all slated to launch their MVPs in 2026, each a milestone in my journey as a product builder.",
  },
  {
    year: "2025",
    title: "Building nijue.me & Bidbee",
    description: "Towards the end of 2025, I started working on nijue.me and Bidbee. nijue.me is a platform for timelining your journey and showcasing your growth, while Bidbee is a localized bidding platform.",
  },
  {
    year: "2025",
    title: "BowlRMS Development",
    description: "Began the development of BowlRMS, a comprehensive restaurant management and digital menu tool.",
  },
  {
    year: "2024",
    title: "Systems Engineering, ALX",
    description: "I took part in the ALX Systems Engineering program for three months. It gave me a strong foundation in systems fundamentals and broadened how I approach engineering challenges.",
  },
  {
    year: "2023",
    title: "Started Coding Journey",
    description: "Began learning web development and building small projects.",
  },
  {
    year: "2021",
    title: "Arduino & Electronics Enthusiast",
    description: "Started exploring electronics and programming through Arduino projects, sparking my passion for technology and innovation.",
  },
]

export function ContentAbout() {
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

      <div className="relative">
      {/* Bio */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-foreground">About Me</h2>
          <Button variant="outline" size="sm" asChild className="text-muted-foreground">
            <a href="/cv.pdf" target="_blank" rel="noopener noreferrer">
              <FileUser className="w-4 h-4" />
              CV
            </a>
          </Button>
        </div>
        <p className="text-muted-foreground leading-relaxed text-lg">
          I&apos;m Peter Mbugua, a systems developer and product builder in Kenya. I started with Arduino boards in 2021,
          began building web software in 2023, and now build full-stack products on Next.js and Supabase, designed
          around how business actually works here, including M-Pesa and local payment rails.
        </p>
        <p className="text-muted-foreground leading-relaxed text-lg mt-4">
          Right now I&apos;m getting BowlRMS, nijue.me and Zawidi ready to launch, reworking the architecture before real
          users arrive. Longer term, I&apos;m working toward Tandu, a platform to make hands-on robotics and STEM
          affordable for Kenyan classrooms.
        </p>
      </section>

      {/* Highlights */}
      <section>
        <h3 className="text-xl font-semibold text-foreground my-6">How I Work</h3>
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

      {/* Tech Stack */}
      <section className="border-y border-border pb-6 mt-6">
        <h3 className="text-xl font-semibold text-foreground my-6">Tech Stack</h3>
        <ul className="space-y-3 text-muted-foreground text-sm leading-relaxed">
          <li>
            <strong className="font-semibold text-foreground">Languages & Frameworks:</strong> JavaScript, TypeScript, SQL, React, Next.js, Node.js, HTML/CSS
          </li>
          <li>
            <strong className="font-semibold text-foreground">Backend & Data:</strong> Supabase, PostgreSQL, Firebase, API Development
          </li>
          <li>
            <strong className="font-semibold text-foreground">DevOps & Infrastructure:</strong> Git, GitHub, Vercel, Bunny.net, Google Cloud, Ubuntu/Linux
          </li>
          <li>
            <strong className="font-semibold text-foreground">Regional Payments:</strong> M-Pesa Daraja API, Paystack, Tuma Online
          </li>
          <li>
            <strong className="font-semibold text-foreground">AI Development Tools:</strong> Claude Code, GitHub Copilot, Continue Extension, Microsoft Foundry
          </li>
          <li>
            <strong className="font-semibold text-foreground">Design:</strong> UI/UX Design, Visual Design
          </li>
        </ul>
      </section>

      {/* Timeline */}
      <section>
        <h3 className="text-xl font-semibold text-foreground my-6">Timeline</h3>
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
      </div>
    </motion.div>
  )
}