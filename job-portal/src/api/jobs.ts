import { sampleJobs, Job } from '../data/sampleJobs'

// Enhanced mock API with filtering and simple pagination.
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
  await new Promise((r) => setTimeout(r, 250))
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
  await new Promise((r) => setTimeout(r, 150))
  return sampleJobs.find((j) => j.id === id)
}
