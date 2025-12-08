"use client"

import { TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Home, User, Briefcase, Link2, Camera } from "lucide-react"

interface MobileHeaderProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

const navItems = [
  { value: "home", icon: Home },
  { value: "about", icon: User },
  { value: "works", icon: Briefcase },
  { value: "links", icon: Link2 },
  { value: "photos", icon: Camera },
]

export function MobileHeader({ activeTab, setActiveTab }: MobileHeaderProps) {
  return (
    <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Avatar & Name */}
        <div className="flex items-center gap-3">
          <Avatar className="w-10 h-10 border border-white/10">
            <AvatarImage src="/Actual.JPG" alt="Peter Mbugua" />
            <AvatarFallback className="text-xs bg-secondary">PM</AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium text-foreground">Peter Mbugua</span>
        </div>
      </div>

      {/* Horizontal Tabs */}
      <TabsList className="flex w-full bg-transparent px-2 pb-2 gap-1">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.value
          return (
            <TabsTrigger
              key={item.value}
              value={item.value}
              onClick={() => setActiveTab(item.value)}
              className={`
                flex-1 py-2 px-3 rounded-lg text-xs
                transition-all duration-200
                ${isActive ? "bg-white/10 text-foreground" : "text-muted-foreground"}
              `}
            >
              <Icon className="w-4 h-4" />
            </TabsTrigger>
          )
        })}
      </TabsList>
    </div>
  )
}
