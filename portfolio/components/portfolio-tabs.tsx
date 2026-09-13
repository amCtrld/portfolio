"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { RightPanel } from "@/components/right-panel"
import { LeftPanel } from "@/components/left-panel"
import { ContentHome } from "@/components/content-home"
import { ContentAbout } from "@/components/content-about"
import { ContentWorks } from "@/components/content-works"
import { ContentLinks } from "@/components/content-links"
import { ContentPhotos } from "@/components/content-photos"
import { ContentJourney } from "@/components/content-journey"
import { MobileHeader } from "@/components/mobile-header"

interface PortfolioTabsProps {
  initialTab: string
  initialYear?: string
  initialMonth?: string
}

const TABS = ["home", "about", "works", "links", "photos", "journey"] as const

function normalizeMonthName(month?: string | null): string | undefined {
  if (!month) return undefined
  return month.charAt(0).toUpperCase() + month.slice(1).toLowerCase()
}

function tabToPath(tab: string, year?: string | null, month?: string | null): string {
  if (tab !== "journey") {
    return tab === "home" ? "/" : `/${tab}`
  }
  if (year && month) {
    return `/journey/${year}/${month.toLowerCase()}`
  }
  if (year) {
    return `/journey/${year}`
  }
  return "/journey"
}

function parsePath(pathname: string): { tab: string; year?: string; month?: string } {
  const segments = pathname.split("/").filter(Boolean)
  if (segments.length === 0) {
    return { tab: "home" }
  }
  const [first, second, third] = segments
  if (!(TABS as readonly string[]).includes(first)) {
    return { tab: "home" }
  }
  if (first !== "journey") {
    return { tab: first }
  }
  if (second && third) {
    return { tab: "journey", year: second, month: normalizeMonthName(third) }
  }
  if (second) {
    return { tab: "journey", year: second }
  }
  return { tab: "journey" }
}

export function PortfolioTabs({ initialTab, initialYear, initialMonth }: PortfolioTabsProps) {
  const [activeTab, setActiveTab] = useState(initialTab)
  const [journeyContext, setJourneyContext] = useState<{ year?: string; month?: string }>({
    year: initialYear,
    month: initialMonth,
  })
  const journeyContextRef = useRef(journeyContext)
  journeyContextRef.current = journeyContext

  // Back/forward buttons: URL changes without remounting, so sync state from pathname.
  useEffect(() => {
    const onPopState = () => {
      const parsed = parsePath(window.location.pathname)
      setActiveTab(parsed.tab)
      if (parsed.tab === "journey") {
        setJourneyContext((prev) => ({
          year: parsed.year ?? prev.year,
          month: parsed.month ?? prev.month,
        }))
      }
    }
    window.addEventListener("popstate", onPopState)
    return () => window.removeEventListener("popstate", onPopState)
  }, [])

  const handleTabChange = useCallback((tab: string) => {
    setActiveTab(tab)
    const ctx = journeyContextRef.current
    const target =
      tab === "journey" && ctx.year && ctx.month
        ? tabToPath(tab, ctx.year, ctx.month)
        : tabToPath(tab)
    if (window.location.pathname !== target) {
      window.history.pushState(null, "", target)
    }
  }, [])

  const handleJourneyNavigate = useCallback((year: string, month: string) => {
    setJourneyContext({ year, month })
  }, [])

  return (
    <div className="min-h-screen w-full bg-background">
      <Tabs value={activeTab} onValueChange={handleTabChange} className="h-full">
        {/* Mobile Header - visible on small screens */}
        <MobileHeader activeTab={activeTab} setActiveTab={handleTabChange} />

        {/* Desktop Layout - split screen */}
        <div className="hidden lg:flex h-screen w-screen">
          {/* Left Panel - scrollable content */}
          <LeftPanel>
            <TabsContent value="home" className="mt-0 h-full">
              <ContentHome />
            </TabsContent>
            <TabsContent value="about" className="mt-0 h-full">
              <ContentAbout />
            </TabsContent>
            <TabsContent value="works" className="mt-0 h-full">
              <ContentWorks />
            </TabsContent>
            <TabsContent value="links" className="mt-0 h-full">
              <ContentLinks />
            </TabsContent>
            <TabsContent value="photos" className="mt-0 h-full">
              <ContentPhotos />
            </TabsContent>
            <TabsContent value="journey" className="mt-0 h-full">
              <ContentJourney
                initialYear={journeyContext.year}
                initialMonth={journeyContext.month}
                onNavigate={handleJourneyNavigate}
              />
            </TabsContent>
          </LeftPanel>

          {/* Right Panel - fixed sidebar */}
          <RightPanel activeTab={activeTab} setActiveTab={handleTabChange} />
        </div>

        {/* Mobile Layout - stacked */}
        <div className="lg:hidden min-h-screen pt-[150px] pb-20">
          <div className="p-6">
            <TabsContent value="home" className="mt-0">
              <ContentHome />
            </TabsContent>
            <TabsContent value="about" className="mt-0">
              <ContentAbout />
            </TabsContent>
            <TabsContent value="works" className="mt-0">
              <ContentWorks />
            </TabsContent>
            <TabsContent value="links" className="mt-0">
              <ContentLinks />
            </TabsContent>
            <TabsContent value="photos" className="mt-0">
              <ContentPhotos />
            </TabsContent>
            <TabsContent value="journey" className="mt-0">
              <ContentJourney
                initialYear={journeyContext.year}
                initialMonth={journeyContext.month}
                onNavigate={handleJourneyNavigate}
              />
            </TabsContent>
          </div>
        </div>
      </Tabs>
    </div>
  )
}
