"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, Instagram, Mail, MailPlus, ExternalLink, Twitter } from "lucide-react"
import { NijueIcon } from "@/components/ui/nijue-icon"

const nijueLink = {
  name: "nijue.me",
  href: "https://nijue.me/mbugua",
  description: "My professional timeline profile",
}

const socialLinks = [
  {
    name: "GitHub",
    icon: Github,
    href: "https://github.com/amCtrld",
    description: "Check out my coding journey",
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    href: "https://linkedin.com/in/petembugua",
    description: "Connect professionally",
  },
  {
    name: "Twitter / X",
    icon: Twitter,
    href: "https://twitter.com/mbugua_",
    description: "Follow my thoughts",
  },
  {
    name: "Instagram",
    icon: Instagram,
    href: "https://instagram.com/knscpt",
    description: "Behind the scenes",
  },
]

const contactLinks = [
  {
    name: "Work Email",
    icon: MailPlus,
    href: "mailto:ceo@bowlrms.com",
    description: "Get in touch, let's work together",
  },
  {
    name: "Personal Email",
    icon: Mail,
    href: "mailto:petrembugua@gmail.com",
    description: "Say hello, let's connect",
  },
]

const productLinks = [
  {
    name: "BowlRMS",
    href: "https://bowlrms.com",
    color: "#ff7d00",
  },
  {
    name: "nijue.me",
    href: "https://nijue.me",
    color: "cyan",
  },
  {
    name: "Bidbee",
    href: "https://bidbee.live",
    color: "#4b2c0dff",
  },
]

export function ContentLinks() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="max-w-xl space-y-12 relative"
    >
      {/* Grid background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <div className="relative">
      <h2 className="text-3xl font-bold text-foreground">Links</h2>

      {/* Social Links */}
      <section className="mt-4">
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">Social</h3>
        <div className="space-y-2">
          {/* Nijue Link - rendered separately for custom icon sizing */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0 }}
          >
            <Button
              variant="ghost"
              className="w-full justify-between h-auto py-4 px-4 rounded-xl hover:bg-white/5 group"
              asChild
            >
              <a href={nijueLink.href} target="_blank" rel="noopener noreferrer">
                <div className="flex items-center gap-4">
                  <NijueIcon className="size-6 text-muted-foreground group-hover:text-foreground transition-colors" />
                  <div className="text-left">
                    <p className="text-foreground font-medium">{nijueLink.name}</p>
                    <p className="text-sm text-muted-foreground">{nijueLink.description}</p>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </Button>
          </motion.div>

          {socialLinks.map((link, index) => {
            const Icon = link.icon
            return (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: (index + 1) * 0.05 }}
              >
                <Button
                  variant="ghost"
                  className="w-full justify-between h-auto py-4 px-4 rounded-xl hover:bg-white/5 group"
                  asChild
                >
                  <a href={link.href} target="_blank" rel="noopener noreferrer">
                    <div className="flex items-center gap-4">
                      <Icon className="size-5 text-muted-foreground group-hover:text-foreground transition-colors" />
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
      <section className="mt-4">
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
                      <Icon className="size-5 text-muted-foreground group-hover:text-foreground transition-colors" />
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
      </div>
    </motion.div>
  )
}
