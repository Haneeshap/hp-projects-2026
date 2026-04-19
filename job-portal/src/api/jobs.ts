import { sampleJobs, Job } from '../data/sampleJobs'

// Simple mock API. Replace with axios calls to a real backend when available.
export async function fetchJobs(query?: { q?: string; location?: string }): Promise<Job[]> {
  await new Promise((r) => setTimeout(r, 200))
  let results = sampleJobs.slice()
  if (query?.q) {
    const q = query.q.toLowerCase()
    results = results.filter((j) => j.title.toLowerCase().includes(q) || j.company.toLowerCase().includes(q) || j.description.toLowerCase().includes(q))
  }
  if (query?.location) {
    const loc = query.location.toLowerCase()
    results = results.filter((j) => j.location.toLowerCase().includes(loc))
  }
  return results
}

export async function getJobById(id: string): Promise<Job | undefined> {
  await new Promise((r) => setTimeout(r, 150))
  return sampleJobs.find((j) => j.id === id)
}
