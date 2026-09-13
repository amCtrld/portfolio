import type { Metadata } from "next"
import { notFound, redirect } from "next/navigation"
import { PortfolioTabs } from "@/components/portfolio-tabs"

const TABS = ["home", "about", "works", "links", "photos", "journey"] as const

type Tab = (typeof TABS)[number]

const TAB_TITLES: Record<Exclude<Tab, "home">, string> = {
  about: "About",
  works: "Works",
  links: "Links",
  photos: "Photos",
  journey: "Journey",
}

export function generateStaticParams() {
  return (TABS.filter((tab) => tab !== "home") as Exclude<Tab, "home">[]).map((tab) => ({
    tab,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tab: string }>
}): Promise<Metadata> {
  const { tab } = await params
  if (!(TABS as readonly string[]).includes(tab) || tab === "home") {
    return {}
  }
  const title = TAB_TITLES[tab as Exclude<Tab, "home">]
  const path = `/${tab}`
  return {
    title,
    alternates: { canonical: `https://mbugua.nijue.me${path}` },
    openGraph: { url: path },
  }
}

export default async function TabPage({ params }: { params: Promise<{ tab: string }> }) {
  const { tab } = await params
  if (!(TABS as readonly string[]).includes(tab)) {
    notFound()
  }
  if (tab === "home") {
    redirect("/")
  }
  return <PortfolioTabs initialTab={tab} />
}
