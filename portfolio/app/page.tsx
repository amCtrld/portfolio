import type { Metadata } from "next"
import { PortfolioTabs } from "@/components/portfolio-tabs"

export const metadata: Metadata = {
  alternates: { canonical: "https://mbugua.nijue.me" },
}

export default function Home() {
  return <PortfolioTabs initialTab="home" />
}
