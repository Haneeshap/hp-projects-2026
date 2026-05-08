import { fetchJobs } from '../api/jobs'
import { sampleJobs } from '../data/sampleJobs'

test('fetchJobs returns data and respects pagination', async () => {
  const res = await fetchJobs()
  expect(res.total).toBe(sampleJobs.length)
  expect(res.results.length).toBeGreaterThan(0)

  const paged = await fetchJobs({ page: 2, pageSize: 3 })
  expect(paged.results.length).toBeLessThanOrEqual(3)
  expect(paged.total).toBe(sampleJobs.length)
})

test('fetchJobs filters by query', async () => {
  const first = sampleJobs[0]
  const q = first.title.split(' ')[0]
  const res = await fetchJobs({ q })
  expect(res.total).toBeGreaterThan(0)
  const ids = res.results.map((r) => r.id)
  expect(ids).toContain(first.id)
})
