import React, { useEffect, useState } from 'react'
import { fetchJobs } from '../api/jobs'
import JobCard from '../components/JobCard'
import SearchBar from '../components/SearchBar'

export default function JobsList(): JSX.Element {
  const [jobs, setJobs] = useState<any[]>([])
  const [q, setQ] = useState('')
  const [location, setLocation] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let active = true
    setLoading(true)
    fetchJobs({ q, location }).then((res) => {
      if (!active) return
      setJobs(res)
      setLoading(false)
    })
    return () => {
      active = false
    }
  }, [q, location])

  return (
    <div>
      <div className="mb-6">
        <SearchBar q={q} setQ={setQ} location={location} setLocation={setLocation} />
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}
    </div>
  )
}
