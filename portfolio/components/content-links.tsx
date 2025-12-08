"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, Instagram, Mail, Globe, ExternalLink, Twitter } from "lucide-react"

const socialLinks = [
  {
    name: "GitHub",
    icon: Github,
    href: "https://github.com",
    description: "Check out my code",
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    href: "https://linkedin.com",
    description: "Connect professionally",
  },
  {
    name: "Twitter / X",
    icon: Twitter,
    href: "https://twitter.com",
    description: "Follow my thoughts",
  },
  {
    name: "Instagram",
    icon: Instagram,
    href: "https://instagram.com",
    description: "Behind the scenes",
  },
]

const contactLinks = [
  {
    name: "Email",
    icon: Mail,
    href: "mailto:hello@petermbugua.com",
    description: "Get in touch",
  },
  {
    name: "Website",
    icon: Globe,
    href: "https://petermbugua.com",
    description: "Personal domain",
  },
]

const productLinks = [
  {
    name: "BowlRMS",
    href: "#",
    color: "#ff7d00",
  },
  {
    name: "nijue.me",
    href: "#",
    color: "#0099ff",
  },
  {
    name: "Bidbee",
    href: "#",
    color: "#a40000",
  },
]

export function ContentLinks() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="max-w-xl space-y-12"
    >
      <h2 className="text-3xl font-bold text-foreground">Links</h2>

      {/* Social Links */}
      <section>
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">Social</h3>
        <div className="space-y-2">
          {socialLinks.map((link, index) => {
            const Icon = link.icon
            return (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Button
                  variant="ghost"
                  className="w-full justify-between h-auto py-4 px-4 rounded-xl hover:bg-white/5 group"
                  asChild
                >
                  <a href={link.href} target="_blank" rel="noopener noreferrer">
                    <div className="flex items-center gap-4">
                      <Icon className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                      <div className="text-left">
                        <p className="text-foreground font-medium">{link.name}</p>
                        <p className="text-sm text-muted-foreground">{link.description}</p>
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </Button>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* Contact Links */}
      <section>
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">Contact</h3>
        <div className="space-y-2">
          {contactLinks.map((link, index) => {
            const Icon = link.icon
            return (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: (socialLinks.length + index) * 0.05 }}
              >
                <Button
                  variant="ghost"
                  className="w-full justify-between h-auto py-4 px-4 rounded-xl hover:bg-white/5 group"
                  asChild
                >
                  <a href={link.href} target="_blank" rel="noopener noreferrer">
                    <div className="flex items-center gap-4">
                      <Icon className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                      <div className="text-left">
                        <p className="text-foreground font-medium">{link.name}</p>
                        <p className="text-sm text-muted-foreground">{link.description}</p>
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </Button>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* Product Links */}
      <section>
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">Products</h3>
        <div className="flex flex-wrap gap-3">
          {productLinks.map((link, index) => (
            <motion.div
              key={link.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Button
                variant="outline"
                className="border-border hover:border-white/20 rounded-full bg-transparent"
                asChild
              >
                <a href={link.href} target="_blank" rel="noopener noreferrer">
                  <span className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: link.color }} />
                  {link.name}
                </a>
              </Button>
            </motion.div>
          ))}
        </div>
      </section>
    </motion.div>
  )
}
