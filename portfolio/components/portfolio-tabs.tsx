"use client"

import { useCallback, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
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

export function PortfolioTabs({ initialTab, initialYear, initialMonth }: PortfolioTabsProps) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState(initialTab)
  const [journeyContext, setJourneyContext] = useState<{ year?: string; month?: string }>({
    year: initialYear,
    month: initialMonth,
  })

  useEffect(() => {
    setActiveTab(initialTab)
  }, [initialTab])

  useEffect(() => {
    setJourneyContext({ year: initialYear, month: initialMonth })
  }, [initialYear, initialMonth])

  const handleTabChange = useCallback(
    (tab: string) => {
      setActiveTab(tab)
      if (tab === "journey" && journeyContext.year && journeyContext.month) {
        router.push(tabToPath(tab, journeyContext.year, journeyContext.month), { scroll: false })
      } else {
        router.push(tabToPath(tab), { scroll: false })
      }
    },
    [router, journeyContext]
  )

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
                initialYear={initialYear}
                initialMonth={initialMonth}
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
                initialYear={initialYear}
                initialMonth={initialMonth}
                onNavigate={handleJourneyNavigate}
              />
            </TabsContent>
          </div>
        </div>
      </Tabs>
    </div>
  )
}
