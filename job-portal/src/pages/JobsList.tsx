import React, { useEffect, useState } from 'react'
import { fetchJobs } from '../api/jobs'
import JobCard from '../components/JobCard'
import SearchBar from '../components/SearchBar'

const PAGE_SIZE = 4

export default function JobsList(): JSX.Element {
  const [jobs, setJobs] = useState<any[]>([])
  const [q, setQ] = useState('')
  const [location, setLocation] = useState('')
  const [type, setType] = useState('')
  const [remote, setRemote] = useState<boolean | undefined>(undefined)
  const [salaryMin, setSalaryMin] = useState<number | undefined>(undefined)
  const [salaryMax, setSalaryMax] = useState<number | undefined>(undefined)
  const [datePostedDays, setDatePostedDays] = useState<number | undefined>(undefined)
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let active = true
    setLoading(true)
    setPage(1)
    fetchJobs({ q, location, type, remote, salaryMin, salaryMax, datePostedDays, page: 1, pageSize: PAGE_SIZE }).then((res) => {
      if (!active) return
      setJobs(res.results)
      setTotal(res.total)
      setLoading(false)
    })
    return () => {
      active = false
    }
  }, [q, location, type, remote, salaryMin, salaryMax, datePostedDays])

  return (
    <div>
      <div className="mb-6">
        <SearchBar q={q} setQ={setQ} location={location} setLocation={setLocation} />
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
            {jobs.map((job, idx) => {
              const isFeatured = idx === 0
              const isSmallVariant = idx > 0 && idx < 4
              const wrapperClass = isFeatured ? 'md:col-span-2' : 'md:col-span-1'
              const cardClass = isFeatured ? 'p-6 text-base' : isSmallVariant ? 'p-4 text-sm' : 'p-4'
              return (
                <div key={job.id} className={wrapperClass}>
                  <JobCard job={job} className={cardClass} />
                </div>
              )
            })}
          </div>

          {jobs.length < total && (
            <div className="mt-6 text-center">
              <button
                className="px-4 py-2 bg-white text-slate-800 rounded shadow"
                onClick={async () => {
                  setLoading(true)
                  const nextPage = page + 1
                  const res = await fetchJobs({ q, location, type, remote, salaryMin, salaryMax, datePostedDays, page: nextPage, pageSize: PAGE_SIZE })
                  setJobs((s) => [...s, ...res.results])
                  setPage(nextPage)
                  setTotal(res.total)
                  setLoading(false)
                }}
              >
                Load more
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
