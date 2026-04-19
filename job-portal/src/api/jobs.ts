import { sampleJobs, Job } from '../data/sampleJobs'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://127.0.0.1:8000'

// Enhanced API wrapper: try backend, fall back to in-memory sampleJobs.
export async function fetchJobs(query?: {
  q?: string
  location?: string
  type?: string
  remote?: boolean
  salaryMin?: number
  salaryMax?: number
  datePostedDays?: number
  page?: number
  pageSize?: number
}): Promise<{ results: Job[]; total: number }> {
  // Try backend request first
  try {
    const params = new URLSearchParams()
    if (query?.q) params.set('q', query.q)
    if (query?.location) params.set('location', query.location)
    if (query?.type) params.set('type', query.type)
    if (typeof query?.remote === 'boolean') params.set('remote', String(query.remote))
    // backend currently ignores salary/date pagination — keep page/pageSize client-side
    const url = `${API_BASE}/jobs?${params.toString()}`
    const res = await fetch(url)
    if (res.ok) {
      const data: Job[] = await res.json()
      const total = data.length
      const page = query?.page && query.page > 0 ? query.page : 1
      const pageSize = query?.pageSize && query.pageSize > 0 ? query.pageSize : 6
      const start = (page - 1) * pageSize
      return { results: data.slice(start, start + pageSize), total }
    }
  } catch (e) {
    // network failed — fall back to local
  }

  // Fallback: local filtering (previous behavior)
  await new Promise((r) => setTimeout(r, 120))
  let results = sampleJobs.slice()
  if (query?.q) {
    const q = query.q.toLowerCase()
    results = results.filter((j) => j.title.toLowerCase().includes(q) || j.company.toLowerCase().includes(q) || j.description.toLowerCase().includes(q))
  }
  if (query?.location) {
    const loc = query.location.toLowerCase()
    results = results.filter((j) => j.location.toLowerCase().includes(loc))
  }
  if (query?.type) {
    results = results.filter((j) => j.type.toLowerCase() === query.type?.toLowerCase())
  }
  if (typeof query?.remote === 'boolean') {
    results = results.filter((j) => !!j.remote === query.remote)
  }
  if (query?.salaryMin) {
    results = results.filter((j) => (j.salaryTo ?? j.salaryFrom ?? 0) >= query.salaryMin!)
  }
  if (query?.salaryMax) {
    results = results.filter((j) => (j.salaryFrom ?? j.salaryTo ?? 0) <= query.salaryMax!)
  }
  if (query?.datePostedDays) {
    const cutoff = Date.now() - query.datePostedDays * 24 * 60 * 60 * 1000
    results = results.filter((j) => (j.datePosted ? new Date(j.datePosted).getTime() >= cutoff : false))
  }

  const total = results.length
  const page = query?.page && query.page > 0 ? query.page : 1
  const pageSize = query?.pageSize && query.pageSize > 0 ? query.pageSize : 6
  const start = (page - 1) * pageSize
  const paged = results.slice(start, start + pageSize)
  return { results: paged, total }
}

export async function getJobById(id: string): Promise<Job | undefined> {
  try {
    const res = await fetch(`${API_BASE}/jobs/${encodeURIComponent(id)}`)
    if (res.ok) return (await res.json()) as Job
  } catch (e) {}
  await new Promise((r) => setTimeout(r, 120))
  return sampleJobs.find((j) => j.id === id)
}
