"use client";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AvatarBlock } from "@/components/avatar-block";
import {
  Home,
  User,
  Link2,
  Camera,
  CodeXml,
  FilePenLine,
  Goal,
} from "lucide-react";
import { motion } from "framer-motion";

interface RightPanelProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const navItems = [
  { value: "home", label: "Home", icon: Home },
  { value: "about", label: "About", icon: User },
  { value: "works", label: "Works", icon: CodeXml },
  { value: "links", label: "Links", icon: Link2 },
  { value: "photos", label: "Photos", icon: Camera },
  { value: "journey", label: "Journey", icon: FilePenLine },
  { value: "vision", label: "Vision", icon: Goal },
];

export function RightPanel({ activeTab, setActiveTab }: RightPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      // gap-12 is now the ONLY spacing between header, tabs and footer.
      // overflow-y-auto stops flex children from being squeezed when content is taller than the viewport.
      className="w-[380px] min-w-[380px] h-full border-l border-border bg-card/50 flex flex-col items-center gap-12 py-12 px-8 overflow-y-auto"
    >
      {/* Header: shrink-0 so it never gets compressed */}
      <div className="shrink-0 flex flex-col items-center gap-6">
        <AvatarBlock />
        <p className="text-muted-foreground text-sm text-center leading-relaxed">
          <span className="font-bold text-foreground">Peter Mbugua:</span> Building with JavaScript.
        </p>
      </div>

      {/* Navigation Tabs */}
      <TabsList className="shrink-0 flex flex-col w-full h-auto bg-transparent gap-2 p-0">
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

      {/* Footer: mt-auto pins it to the bottom when there's spare room */}
      <div className="mt-auto shrink-0">
        <p className="text-xs text-muted-foreground/60">© 2025 Peter Mbugua</p>
      </div>
    </motion.div>
  );
}