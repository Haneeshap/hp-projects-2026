import React from 'react'

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
  return (
    <div className="flex flex-wrap gap-3 items-center">
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search jobs or companies"
        className="flex-1 min-w-[200px] border rounded px-3 py-2"
      />
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
