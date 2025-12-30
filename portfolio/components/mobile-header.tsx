"use client"

import { TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Home, User, Briefcase, Link2, Camera, FilePenLine } from "lucide-react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

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
  { value: "journey", icon: FilePenLine },
]

function StareheBadge() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="flex h-5 w-5 gap-0.5 rounded-full cursor-pointer transition-transform hover:scale-110">
          <div className="w-1/2 h-full bg-red-600 rounded-full" />
          <div className="w-1/2 h-full bg-blue-400 rounded-full" />
        </div>
      </PopoverTrigger>
      <PopoverContent side="right" className="w-auto bg-background/95 backdrop-blur-sm border-border p-3">
        <div className="text-center">
          <p className="font-medium">Starehe</p>
          <p className="text-xs text-muted-foreground">Class of 2019</p>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export function MobileHeader({ activeTab, setActiveTab }: MobileHeaderProps) {
  return (
    <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Avatar & Name */}
        <div className="flex items-center gap-3">

          <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_left,rgba(0,153,255,0.15),transparent_70%)] blur-xl scale-100" />
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_right,rgba(0,153,255,0.15),transparent_70%)] blur-xl scale-100" />

          <div className="relative">
            <Avatar className="w-24 h-24 border border-white/10">
              <AvatarImage src="/Actual.JPG" alt="Peter Mbugua" />
              <AvatarFallback className="text-xs bg-secondary">PM</AvatarFallback>
            </Avatar>
            {/* Starehe Badge */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10">
              <StareheBadge />
            </div>
          </div>
          <div className="grid leading-tight ml-4">
            <span className="text-md font-bold text-foreground">
              Peter Mbugua
            </span>
            <span className="text-sm font-normal">Building with JavaScript</span>
          </div>
        </div>
      </div>

      {/* Horizontal Tabs */}
      <TabsList className="flex w-full bg-transparent px-2 pb-2 gap-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.value;
          return (
            <TabsTrigger
              key={item.value}
              value={item.value}
              onClick={() => setActiveTab(item.value)}
              className={`
                flex-1 py-2 px-3 rounded-none text-md border-0 border-b-2 border-muted
                transition-all duration-200
                ${
                  isActive
                    ? "bg-white/10 text-foreground"
                    : "text-muted-foreground"
                }
              `}
            >
              <Icon className="w-6 h-6" />
            </TabsTrigger>
          );
        })}
      </TabsList>
    </div>
  );
}
