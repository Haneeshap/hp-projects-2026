import React, { useEffect, useRef, useState } from 'react'
import { sampleJobs } from '../data/sampleJobs'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://127.0.0.1:8000'
export default function SearchBar({
  q,
  setQ,
  location,
  setLocation,
  type,
  setType,
  remote,
  setRemote,
  salaryMin,
  setSalaryMin,
  salaryMax,
  setSalaryMax,
  datePostedDays,
  setDatePostedDays
}: {
  q: string
  setQ: (v: string) => void
  location: string
  setLocation: (v: string) => void
  type: string
  setType: (v: string) => void
  remote: boolean | undefined
  setRemote: (v: boolean | undefined) => void
  salaryMin?: number
  setSalaryMin: (v?: number) => void
  salaryMax?: number
  setSalaryMax: (v?: number) => void
  datePostedDays?: number
  setDatePostedDays: (v?: number) => void
}) {
  const [suggestions, setSuggestions] = useState<Array<{ id: string; label: string }>>([])
  const [open, setOpen] = useState(false)
  const debounceRef = useRef<number | null>(null)
  const wrapperRef = useRef<HTMLDivElement | null>(null)

  const normalizedQuery = q.trim().toLowerCase()

  useEffect(() => {
    if (debounceRef.current) window.clearTimeout(debounceRef.current)
    if (!normalizedQuery) {
      setSuggestions([])
      setOpen(false)
      return
    }

    debounceRef.current = window.setTimeout(async () => {
      // try backend suggestions
      try {
        const res = await fetch(`${API_BASE}/search?q=${encodeURIComponent(normalizedQuery)}`)
        if (res.ok) {
          const data: Array<{ id: string; label: string }> = await res.json()
          setSuggestions(data)
          setOpen(data.length > 0)
          return
        }
      } catch (e) {
        // ignore and fall back
      }

      // fallback: client-side fuzzy match
      const parts = normalizedQuery.split(/\s+/).filter(Boolean)
      const pool = sampleJobs.map((j) => ({ id: j.id, text: `${j.title} ${j.company} ${j.location}` }))
      const matches = pool
        .map((p) => ({ id: p.id, score: parts.reduce((s, ptn) => (p.text.toLowerCase().includes(ptn) ? s + 1 : s), 0) }))
        .filter((m) => m.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 6)
      const items = matches.map((m) => {
        const job = sampleJobs.find((j) => j.id === m.id)!
        return { id: job.id, label: `${job.title} — ${job.company}` }
      })
      setSuggestions(items)
      setOpen(items.length > 0)
    }, 250)

    return () => {
      if (debounceRef.current) window.clearTimeout(debounceRef.current)
    }
  }, [normalizedQuery])

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('click', onDocClick)
    return () => document.removeEventListener('click', onDocClick)
  }, [])

  const onSelect = (label: string) => {
    setQ(label)
    setOpen(false)
  }

  return (
    <div className="flex flex-wrap gap-3 items-center">
      <div className="relative flex-1 min-w-[200px]" ref={wrapperRef}>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search jobs or companies"
          className="w-full border rounded px-3 py-2"
          onFocus={() => { if (suggestions.length) setOpen(true) }}
        />

        {open && suggestions.length > 0 && (
          <ul className="absolute z-30 left-0 right-0 bg-white dark:bg-[#0b1220] text-sm rounded shadow mt-1 overflow-hidden border max-h-56 overflow-auto">
            {suggestions.map((s) => (
              <li
                key={s.id}
                className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-white/5 cursor-pointer"
                onMouseDown={(e) => {
                  // use onMouseDown to avoid blur before click
                  e.preventDefault()
                  onSelect(s.label)
                }}
              >
                {s.label}
              </li>
            ))}
          </ul>
        )}
      </div>

      <input
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Location"
        className="w-40 border rounded px-3 py-2"
      />

      <select value={type} onChange={(e) => setType(e.target.value)} className="border rounded px-2 py-2">
        <option value="">All types</option>
        <option>Full-time</option>
        <option>Part-time</option>
        <option>Contract</option>
      </select>

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={!!remote}
          onChange={(e) => setRemote(e.target.checked ? true : undefined)}
        />
        <span className="text-sm">Remote</span>
      </label>

      <input
        type="number"
        value={salaryMin ?? ''}
        onChange={(e) => setSalaryMin(e.target.value ? Number(e.target.value) : undefined)}
        placeholder="Min salary"
        className="w-28 border rounded px-2 py-2"
      />
      <input
        type="number"
        value={salaryMax ?? ''}
        onChange={(e) => setSalaryMax(e.target.value ? Number(e.target.value) : undefined)}
        placeholder="Max salary"
        className="w-28 border rounded px-2 py-2"
      />

      <select value={datePostedDays ?? ''} onChange={(e) => setDatePostedDays(e.target.value ? Number(e.target.value) : undefined)} className="border rounded px-2 py-2">
        <option value="">Anytime</option>
        <option value={1}>Last 24 hours</option>
        <option value={7}>Last 7 days</option>
        <option value={30}>Last 30 days</option>
      </select>
    </div>
  )
}
