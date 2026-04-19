import React from 'react'

export default function SearchBar({
  q,
  setQ,
  location,
  setLocation
}: {
  q: string
  setQ: (v: string) => void
  location: string
  setLocation: (v: string) => void
}) {
  return (
    <div className="flex gap-2">
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search jobs or companies"
        className="flex-1 border rounded px-3 py-2"
      />
      <input
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Location"
        className="w-40 border rounded px-3 py-2"
      />
    </div>
  )
}
