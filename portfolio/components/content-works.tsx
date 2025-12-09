"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, Clock } from "lucide-react"

const projects = [
  {
    title: "BowlRMS",
    description: "A comprehensive restaurant management system for modern food businesses.",
    status: "active",
    color: "#ff7d00",
    link: "https://bowlrms.com",
  },
  {
    title: "nijue.me",
    description: "A platform for sharing knowledge and connecting with like-minded individuals.",
    status: "active",
    color: "cyan",
    link: "https://nijue.me",
  },
  {
    title: "Bidbee",
    description: "An intelligent bidding platform that streamlines procurement processes.",
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

export function ContentWorks() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="max-w-3xl"
    >
      <h2 className="text-3xl font-bold text-foreground mb-8">Works</h2>

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
                <CardTitle className="text-xl text-foreground mt-4 group-hover:text-electric-blue transition-colors">
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
    </motion.div>
  )
}
