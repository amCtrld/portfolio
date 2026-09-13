import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { PortfolioTabs } from "@/components/portfolio-tabs"
import { getAllYears, getMonthsForYear } from "@/lib/journey"

function normalizeMonthSlug(month: string): string | null {
  const normalized = month.charAt(0).toUpperCase() + month.slice(1).toLowerCase()
  return normalized
}

export async function generateStaticParams() {
  const years = await getAllYears()
  const params: { year: string; month: string }[] = []
  for (const year of years) {
    const months = await getMonthsForYear(year)
    for (const month of months) {
      params.push({ year, month: month.toLowerCase() })
    }
  }
  return params
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ year: string; month: string }>
}): Promise<Metadata> {
  const { year, month } = await params
  const years = await getAllYears()
  if (!years.includes(year)) {
    return {}
  }
  const months = await getMonthsForYear(year)
  const normalized = normalizeMonthSlug(month)
  if (!normalized || !months.includes(normalized)) {
    return {}
  }
  const path = `/journey/${year}/${normalized.toLowerCase()}`
  return {
    title: `${normalized} ${year} Journey`,
    alternates: { canonical: `https://mbugua.nijue.me${path}` },
    openGraph: { url: path },
  }
}

export default async function JourneyMonthPage({
  params,
}: {
  params: Promise<{ year: string; month: string }>
}) {
  const { year, month } = await params
  const years = await getAllYears()
  if (!years.includes(year)) {
    notFound()
  }
  const months = await getMonthsForYear(year)
  const normalized = normalizeMonthSlug(month)
  if (!normalized || !months.includes(normalized)) {
    notFound()
  }
  return <PortfolioTabs initialTab="journey" initialYear={year} initialMonth={normalized} />
}
