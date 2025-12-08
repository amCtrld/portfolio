"use client"

import { useState } from "react"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { RightPanel } from "@/components/right-panel"
import { LeftPanel } from "@/components/left-panel"
import { ContentHome } from "@/components/content-home"
import { ContentAbout } from "@/components/content-about"
import { ContentWorks } from "@/components/content-works"
import { ContentLinks } from "@/components/content-links"
import { ContentPhotos } from "@/components/content-photos"
import { MobileHeader } from "@/components/mobile-header"

export default function Home() {
  const [activeTab, setActiveTab] = useState("home")

  return (
    <div className="min-h-screen w-full bg-background">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
        {/* Mobile Header - visible on small screens */}
        <MobileHeader activeTab={activeTab} setActiveTab={setActiveTab} />

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
          </LeftPanel>

          {/* Right Panel - fixed sidebar */}
          <RightPanel activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>

        {/* Mobile Layout - stacked */}
        <div className="lg:hidden min-h-screen pt-[30vh]">
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
          </div>
        </div>
      </Tabs>
    </div>
  )
}
