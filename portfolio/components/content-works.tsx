"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowUpRight, Clock } from "lucide-react"

const mainProjects = [
  {
    title: "BowlRMS",
    description: "A comprehensive restaurant management and digital menus system built for modern food businesses.",
    status: "active",
    color: "#ff7d00",
    link: "https://bowlrms.com",
  },
  {
    title: "nijue.me",
    description: "A platform that lets professionals share their journey through a timeline, self-pitch video, and AI-powered summary.",
    status: "active",
    color: "cyan",
    link: "https://nijue.me",
  },
  {
    title: "Bidbee",
    description: "A localized market-place that connects buyers and sellers within the community through time-bound auctions.",
    status: "active",
    color: "#4b2c0dff",
    link: "https://bidbee.live",
  },
  {
    title: "Ubantu",
    description: "Community-driven platform fostering collaboration and shared resources.",
    status: "coming",
    color: "#525252",
    link: null,
  },
]

const otherProjects = [
  {
    title: "SkillMint",
    description: "A blockchain based platform that enables institutions to Mint, issue, and verify tamper-proof skill certificates on the blockchain",
    status: "active",
    color: "green",
    link: "https://skillsmint.vercel.app",
  },
  {
    title: "OpenKura",
    description: "Another block-chain based platform that enables decentralized, transparent, secure, and immutable voting on the blockchain.",
    status: "coming",
    color: "#24c06aff",
    link: "https://openkura.vercel.app",
  },
  {
    title: "FridahVA",
    description: "A funnel website built for a US-based team offering Virtual services. Built with Google calendar sync for daily-on-loop updates",
    status: "active",
    color: "#4dafa6ff",
    link: "https://fridahva.vercel.app",
  },
  {
    title: "StoicVA",
    description: "A UK-based funnel website built for the US-based team offering Virtual services. It is also built with Google calendar sync for daily-on-loop updates",
    status: "active",
    color: "maroon",
    link: "https://stoicva.vercel.app",
  },
  {
    title: "Kings and Queens",
    description: "A website built for the Kings and Queens restaurant. It features a royal and premium design, colors and feel.",
    status: "active",
    color: "gold",
    link: "https://kingsnqueens.vercel.app",
  },
]

const ProjectGrid = ({ projects }: { projects: typeof mainProjects }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {projects.map((project, index) => (
      <motion.div
        key={project.title}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.1 }}
      >
        <Card className="bg-card border-border hover:border-white/20 transition-all duration-300 h-full group">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: project.color }} />
              {project.status === "coming" && (
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  Coming soon
                </span>
              )}
            </div>
            <CardTitle className="text-xl text-foreground mt-4 group-hover:text-[#ff7d00] transition-colors">
              {project.title}
            </CardTitle>
            <CardDescription className="text-muted-foreground leading-relaxed">
              {project.description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {project.link ? (
              <Button 
                variant="ghost" 
                className="text-sm text-muted-foreground hover:text-foreground p-0 h-auto"
                onClick={() => window.open(project.link, '_blank')}
              >
                View Project
                <ArrowUpRight className="w-4 h-4 ml-1" />
              </Button>
            ) : (
              <span className="text-sm text-muted-foreground/50">Stay tuned</span>
            )}
          </CardContent>
        </Card>
      </motion.div>
    ))}
  </div>
)

export function ContentWorks() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="max-w-3xl"
    >
      <h2 className="text-3xl font-bold text-foreground mb-8">Works</h2>

      <Tabs defaultValue="main" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8 bg-transparent">
          <TabsTrigger value="main" className="rounded-none border-0 border-b-2 border-muted">Main</TabsTrigger>
          <TabsTrigger value="others" className="rounded-none border-0 border-b-2 border-muted">Others</TabsTrigger>
        </TabsList>
        
        <TabsContent value="main">
          <ProjectGrid projects={mainProjects} />
        </TabsContent>
        
        <TabsContent value="others">
          <ProjectGrid projects={otherProjects} />
        </TabsContent>
      </Tabs>
    </motion.div>
  )
}
