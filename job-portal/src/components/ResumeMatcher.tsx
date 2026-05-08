import React, { useEffect, useState } from 'react'
import { sampleJobs } from '../data/sampleJobs'
import { matchJobs } from '../utils/aiMatcher'
import { Link } from 'react-router-dom'

const STORAGE_KEY = 'resume_builder_data'

export default function ResumeMatcher() {
  const [matches, setMatches] = useState<Array<{ job: any; score: number }>>([])

  function loadAndMatch() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      const data = raw ? JSON.parse(raw) : {}
      const res = matchJobs(data, sampleJobs, 8)
      setMatches(res)
    } catch (e) {
      setMatches([])
    }
  }

  useEffect(() => {
    loadAndMatch()
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) loadAndMatch()
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">AI Job Matches</h3>
        <button onClick={loadAndMatch} className="px-3 py-1 bg-indigo-600 text-white rounded">Refresh</button>
      </div>
      {matches.length === 0 ? (
        <div className="text-sm text-slate-600 mt-2">No matches yet — fill resume and click Refresh.</div>
      ) : (
        <ul className="mt-3 space-y-2">
          {matches.map(({ job, score }) => (
            <li key={job.id} className="border p-3 rounded flex items-start justify-between bg-white">
              <div>
                <div className="font-semibold">{job.title} <span className="text-sm text-slate-600">@ {job.company}</span></div>
                <div className="text-sm text-slate-500">{job.location} · {job.type}</div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-sm text-slate-700">Score: {(score * 100).toFixed(0)}%</div>
                <Link to={`/jobs/${job.id}`} className="px-3 py-1 bg-green-600 text-white rounded">View</Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
