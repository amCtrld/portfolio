import { NextRequest, NextResponse } from "next/server"
import { getJourneyData, getAllYears, getMonthsForYear } from "@/lib/journey"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const year = searchParams.get("year")
  const month = searchParams.get("month")
  const action = searchParams.get("action")

  // Get all years
  if (action === "years") {
    const years = await getAllYears()
    return NextResponse.json({ years })
  }

  // Get months for a specific year
  if (action === "months" && year) {
    const months = await getMonthsForYear(year)
    return NextResponse.json({ months })
  }

  // Get journey entry for specific year and month
  if (year && month) {
    const entry = await getJourneyData(year, month)
    if (entry) {
      return NextResponse.json(entry)
    } else {
      return NextResponse.json({ error: "Entry not found" }, { status: 404 })
    }
  }

  return NextResponse.json({ error: "Missing parameters" }, { status: 400 })
}
