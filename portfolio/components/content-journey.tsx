"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronDown } from "lucide-react"
import ReactMarkdown from "react-markdown"

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

interface JourneyEntry {
  year: string
  month: string
  monthNum: number
  content: string
}

export function ContentJourney() {
  const [years, setYears] = useState<string[]>([])
  const [months, setMonths] = useState<string[]>([])
  const [selectedYear, setSelectedYear] = useState<string | null>(null)
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null)
  const [journeyEntry, setJourneyEntry] = useState<JourneyEntry | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showYearDropdown, setShowYearDropdown] = useState(false)
  const [showMonthDropdown, setShowMonthDropdown] = useState(false)

  // Fetch years on mount
  useEffect(() => {
    const fetchYears = async () => {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch("/api/journey?action=years")
        if (!res.ok) {
          throw new Error(`API error: ${res.status}`)
        }
        const data = await res.json()
        console.log("Years fetched:", data.years)
        setYears(data.years)
        if (data.years && data.years.length > 0) {
          setSelectedYear(data.years[0])
        } else {
          setError("No years found in Journey folder")
        }
      } catch (error) {
        const errorMsg = error instanceof Error ? error.message : "Unknown error"
        console.error("Failed to fetch years:", errorMsg)
        setError(`Failed to load years: ${errorMsg}`)
      } finally {
        setLoading(false)
      }
    }

    fetchYears()
  }, [])

  // Fetch months when year changes
  useEffect(() => {
    if (!selectedYear) return

    const fetchMonths = async () => {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch(`/api/journey?action=months&year=${selectedYear}`)
        if (!res.ok) {
          throw new Error(`API error: ${res.status}`)
        }
        const data = await res.json()
        console.log(`Months for ${selectedYear}:`, data.months)
        setMonths(data.months)
        if (data.months && data.months.length > 0) {
          setSelectedMonth(data.months[0])
        } else {
          setSelectedMonth(null)
          setError(`No entries found for year ${selectedYear}`)
        }
      } catch (error) {
        const errorMsg = error instanceof Error ? error.message : "Unknown error"
        console.error(`Failed to fetch months for ${selectedYear}:`, errorMsg)
        setMonths([])
        setSelectedMonth(null)
        setError(`Failed to load months: ${errorMsg}`)
      } finally {
        setLoading(false)
      }
    }

    fetchMonths()
  }, [selectedYear])

  // Fetch journey entry when month changes
  useEffect(() => {
    if (!selectedYear || !selectedMonth) {
      setJourneyEntry(null)
      return
    }

    const fetchEntry = async () => {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch(`/api/journey?year=${selectedYear}&month=${selectedMonth}`)
        if (res.ok) {
          const data = await res.json()
          console.log(`Entry loaded for ${selectedMonth} ${selectedYear}`)
          setJourneyEntry(data)
        } else {
          console.warn(`No entry for ${selectedMonth} ${selectedYear}`)
          setJourneyEntry(null)
        }
      } catch (error) {
        const errorMsg = error instanceof Error ? error.message : "Unknown error"
        console.error(`Failed to fetch entry for ${selectedMonth} ${selectedYear}:`, errorMsg)
        setJourneyEntry(null)
        setError(`Failed to load entry: ${errorMsg}`)
      } finally {
        setLoading(false)
      }
    }

    fetchEntry()
  }, [selectedYear, selectedMonth])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="max-w-3xl relative"
    >
      {/* Grid background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <div className="relative">
      <h2 className="text-3xl font-bold text-foreground mb-8">Journey</h2>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        {/* Year Filter */}
        <div className="relative flex-1">
          <button
            onClick={() => setShowYearDropdown(!showYearDropdown)}
            className="w-full px-4 py-3 rounded-xl border border-border bg-card hover:border-white/20 transition-colors flex items-center justify-between text-foreground"
          >
            <span className="text-sm font-medium">
              {selectedYear ? `Year: ${selectedYear}` : "Select Year"}
            </span>
            <ChevronDown
              className={`w-4 h-4 transition-transform ${showYearDropdown ? "rotate-180" : ""}`}
            />
          </button>

          {showYearDropdown && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-xl shadow-lg z-10"
            >
              {years.map((year) => (
                <button
                  key={year}
                  onClick={() => {
                    setSelectedYear(year)
                    setShowYearDropdown(false)
                  }}
                  className={`w-full text-left px-4 py-3 hover:bg-white/5 transition-colors first:rounded-t-xl last:rounded-b-xl ${
                    selectedYear === year ? "bg-white/10 text-[#ff7d00]" : "text-foreground"
                  }`}
                >
                  {year}
                </button>
              ))}
            </motion.div>
          )}
        </div>

        {/* Month Filter */}
        <div className="relative flex-1">
          <button
            onClick={() => setShowMonthDropdown(!showMonthDropdown)}
            className="w-full px-4 py-3 rounded-xl border border-border bg-card hover:border-white/20 transition-colors flex items-center justify-between text-foreground"
          >
            <span className="text-sm font-medium">
              {selectedMonth ? `Month: ${selectedMonth}` : "Select Month"}
            </span>
            <ChevronDown
              className={`w-4 h-4 transition-transform ${showMonthDropdown ? "rotate-180" : ""}`}
            />
          </button>

          {showMonthDropdown && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-xl shadow-lg z-10 max-h-60 overflow-y-auto"
            >
              {MONTHS.map((month) => {
                const isAvailable = months.includes(month)
                return (
                  <button
                    key={month}
                    onClick={() => {
                      if (isAvailable) {
                        setSelectedMonth(month)
                        setShowMonthDropdown(false)
                      }
                    }}
                    disabled={!isAvailable}
                    className={`w-full text-left px-4 py-3 transition-colors first:rounded-t-xl last:rounded-b-xl ${
                      isAvailable ? "hover:bg-white/5 cursor-pointer" : "opacity-30 cursor-not-allowed"
                    } ${
                      selectedMonth === month && isAvailable
                        ? "bg-white/10 text-[#ff7d00]"
                        : "text-foreground"
                    }`}
                  >
                    {month}
                  </button>
                )
              })}
            </motion.div>
          )}
        </div>
      </div>

      {/* Close dropdowns when clicking outside */}
      {(showYearDropdown || showMonthDropdown) && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => {
            setShowYearDropdown(false)
            setShowMonthDropdown(false)
          }}
        />
      )}

      {/* Content */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Card className="bg-card border-red-500/30 border-2">
            <CardHeader>
              <CardTitle className="text-foreground">Error</CardTitle>
              <CardDescription className="text-red-400">{error}</CardDescription>
            </CardHeader>
          </Card>
        </motion.div>
      )}

      {loading ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-muted-foreground py-12"
        >
          Loading...
        </motion.div>
      ) : journeyEntry ? (
        <motion.div
          key={`${selectedYear}-${selectedMonth}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Card className="bg-card border-border hover:border-white/20 transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-2xl text-foreground">
                {selectedMonth} {selectedYear}
              </CardTitle>
              <CardDescription className="text-sm text-muted-foreground">
                Monthly reflection and updates
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="prose prose-invert max-w-none text-muted-foreground prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-[#ff7d00] hover:prose-a:underline text-sm">
                <ReactMarkdown>{journeyEntry.content}</ReactMarkdown>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">No Entry</CardTitle>
              <CardDescription className="text-muted-foreground">
                {selectedMonth && selectedYear
                  ? `No entry available for ${selectedMonth} ${selectedYear}`
                  : "Select a month to view your journey"}
              </CardDescription>
            </CardHeader>
          </Card>
        </motion.div>
      )}
      </div>
    </motion.div>
  )
}
