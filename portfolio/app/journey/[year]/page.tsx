import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { PortfolioTabs } from "@/components/portfolio-tabs"
import { getAllYears } from "@/lib/journey"

export async function generateStaticParams() {
  const years = await getAllYears()
  return years.map((year) => ({ year }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ year: string }>
}): Promise<Metadata> {
  const { year } = await params
  const years = await getAllYears()
  if (!years.includes(year)) {
    return {}
  }
  const path = `/journey/${year}`
  return {
    title: `${year} Journey`,
    alternates: { canonical: `https://mbugua.nijue.me${path}` },
    openGraph: { url: path },
  }
}

export default async function JourneyYearPage({
  params,
}: {
  params: Promise<{ year: string }>
}) {
  const { year } = await params
  const years = await getAllYears()
  if (!years.includes(year)) {
    notFound()
  }
  return <PortfolioTabs initialTab="journey" initialYear={year} />
}
