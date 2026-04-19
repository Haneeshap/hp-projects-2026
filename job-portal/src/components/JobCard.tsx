import React, { useState } from 'react'
import { Job } from '../data/sampleJobs'
import { Link } from 'react-router-dom'
import { isBookmarked, toggleBookmark } from '../utils/bookmarks'

export default function JobCard({ job, className }: { job: Job; className?: string }) {
  const imgSrc = job.logo ?? '/logos/fallback.svg'
  const [bookmarked, setBookmarked] = useState<boolean>(isBookmarked(job.id))

  function onToggleBookmark() {
    toggleBookmark(job.id)
    setBookmarked((s) => !s)
  }

  return (
    <div className={`border border-slate-200 rounded-lg p-5 shadow-md bg-white hover:shadow-lg transition-shadow duration-150 ${className ?? ''}`}>
      <div className="flex justify-between items-start gap-4">
        <div className="flex items-center gap-4">
          <img src={imgSrc} alt={`${job.company} logo`} className="w-16 h-16 object-contain rounded bg-white p-1" />
          <div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">{job.title}</h2>
            <div className="text-xs md:text-sm text-slate-600 uppercase tracking-wider mt-1">{job.company} — {job.location}</div>
          </div>
        </div>
        <div className="text-sm text-slate-500">{job.type}</div>
      </div>
      <p className="mt-3 text-sm text-slate-700 line-clamp-3">{job.description}</p>
      <div className="mt-4 flex items-center justify-between">
        <div className="text-sm text-slate-600">{job.salary}</div>
        <div className="flex items-center gap-3">
          <button onClick={onToggleBookmark} className={`px-3 py-1.5 rounded text-sm ${bookmarked ? 'bg-yellow-200 text-yellow-800' : 'bg-gray-100 text-slate-800'}`}>
            {bookmarked ? 'Bookmarked' : 'Bookmark'}
          </button>
          <Link to={`/jobs/${job.id}`} className="inline-block px-3 py-1.5 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700">View</Link>
        </div>
      </div>
    </div>
  )
}
