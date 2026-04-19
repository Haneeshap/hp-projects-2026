import React from 'react'
import { getBookmarkedIds } from '../utils/bookmarks'
import { sampleJobs } from '../data/sampleJobs'
import JobCard from '../components/JobCard'

export default function Bookmarks(): JSX.Element {
  const ids = getBookmarkedIds()
  const jobs = sampleJobs.filter((j) => ids.includes(j.id))

  if (jobs.length === 0) return <div className="uppercase font-semibold">NO BOOKMARKS YET.</div>

  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-bold uppercase tracking-wider mb-4">BOOKMARKS</h1>
      <div className="flex flex-col gap-4">
        {jobs.map((j) => (
          <JobCard key={j.id} job={j} />
        ))}
      </div>
    </div>
  )
}
