import { promises as fs } from "fs"
import path from "path"

export interface JourneyEntry {
  year: string
  month: string
  monthNum: number
  content: string
}

const JOURNEY_DIR = path.resolve(process.cwd(), "Journey")

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

export async function getJourneyData(year?: string, month?: string): Promise<JourneyEntry | null> {
  try {
    if (!year || !month) {
      return null
    }

    const monthNum = MONTHS.indexOf(month)
    if (monthNum === -1) {
      return null
    }

    const filePath = path.resolve(JOURNEY_DIR, year, `${month}.md`)
    const content = await fs.readFile(filePath, "utf-8")

    return {
      year,
      month,
      monthNum,
      content,
    }
  } catch (error) {
    console.error(`Error reading journey data for ${year}/${month}:`, error)
    return null
  }
}

export async function getAllYears(): Promise<string[]> {
  try {
    const entries = await fs.readdir(JOURNEY_DIR, { withFileTypes: true })
    const years = entries
      .filter((entry) => entry.isDirectory() && /^\d{4}$/.test(entry.name))
      .map((entry) => entry.name)
      .sort()
      .reverse()

    return years
  } catch (error) {
    console.error("Error reading journey years:", error)
    return []
  }
}

export async function getMonthsForYear(year: string): Promise<string[]> {
  try {
    const yearPath = path.resolve(JOURNEY_DIR, year)
    const files = await fs.readdir(yearPath)
    
    const availableMonths = files
      .filter((file) => file.endsWith(".md"))
      .map((file) => file.replace(".md", ""))
      .filter((month) => MONTHS.includes(month))
      .sort((a, b) => MONTHS.indexOf(a) - MONTHS.indexOf(b))

    return availableMonths
  } catch (error) {
    console.error(`Error reading months for year ${year}:`, error)
    return []
  }
}

export function getMonthNumber(month: string): number {
  return MONTHS.indexOf(month)
}

export function getAllMonths(): string[] {
  return MONTHS
}
