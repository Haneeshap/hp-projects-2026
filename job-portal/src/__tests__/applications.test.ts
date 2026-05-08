import { addApplication, listApplications, updateApplicationStatus } from '../utils/applications'

beforeEach(() => {
  localStorage.clear()
})

test('addApplication persists and can update status', () => {
  const a = addApplication({ jobId: '1', name: 'Alice', email: 'a@example.com', status: 'Applied' })
  const all = listApplications()
  expect(all.length).toBe(1)
  expect(all[0].id).toBe(a.id)

  const ok = updateApplicationStatus(a.id, 'Interview')
  expect(ok).toBe(true)
  const updated = listApplications()[0]
  expect(updated.status).toBe('Interview')
})
