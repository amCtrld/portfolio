"use client";

import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AvatarBlock } from "@/components/avatar-block";
import {
  Home,
  User,
  Briefcase,
  Link2,
  Camera,
  FilePenLine,
} from "lucide-react";
import { motion } from "framer-motion";

interface RightPanelProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const navItems = [
  { value: "home", label: "Home", icon: Home },
  { value: "about", label: "About", icon: User },
  { value: "works", label: "Works", icon: Briefcase },
  { value: "links", label: "Links", icon: Link2 },
  { value: "photos", label: "Photos", icon: Camera },
  { value: "journey", label: "Journey", icon: FilePenLine },
];

export function RightPanel({ activeTab, setActiveTab }: RightPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-[380px] min-w-[380px] h-full border-l border-border bg-card/50 flex flex-col items-center py-12 px-8"
    >
      <div className="mb-12">
        {/* Avatar Block */}
        <AvatarBlock />

        {/* Tagline */}
        <p className="text-muted-foreground text-sm text-center mt-6 mb-10 leading-relaxed">
          Peter Mbugua — Building with JavaScript.
        </p>
      </div>

      {/* Navigation Tabs */}
      <TabsList className="flex flex-col w-full bg-transparent gap-2 mt-12">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.value;
          return (
            <TabsTrigger
              key={item.value}
              value={item.value}
              onClick={() => setActiveTab(item.value)}
              className={`
                w-full justify-start gap-3 px-4 py-3 rounded-xl text-sm font-medium
                transition-all duration-200 ease-out
                ${
                  isActive
                    ? "bg-white/10 text-foreground border border-white/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                }
              `}
            >
              <Icon className="w-4 h-4" />
              {item.label}
            </TabsTrigger>
          );
        })}
      </TabsList>

      {/* Footer */}
      <div className="mt-auto pt-8">
        <p className="text-xs text-muted-foreground/60">© 2025 Peter Mbugua</p>
      </div>
    </motion.div>
  );
}
