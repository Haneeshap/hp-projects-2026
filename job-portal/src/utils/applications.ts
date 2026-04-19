export interface Application {
  id: string
  jobId: string
  name: string
  email: string
  cover?: string
  resume?: string
  status: 'Applied' | 'Interview' | 'Rejected' | 'Hired'
  appliedAt: string
}

function readAll(): Application[] {
  try {
    const v = localStorage.getItem('applications')
    return v ? JSON.parse(v) : []
  } catch (e) {
    return []
  }
}

function saveAll(items: Application[]) {
  try {
    localStorage.setItem('applications', JSON.stringify(items))
  } catch (e) {
    // ignore
  }
}

export function addApplication(app: Omit<Application, 'id' | 'appliedAt'>) {
  const id = `app_${Date.now()}`
  const a: Application = { ...app, id, appliedAt: new Date().toISOString() }
  const cur = readAll()
  cur.unshift(a)
  saveAll(cur)
  return a
}

export function listApplications(): Application[] {
  return readAll()
}

export function updateApplicationStatus(id: string, status: Application['status']) {
  const cur = readAll()
  const idx = cur.findIndex((c) => c.id === id)
  if (idx >= 0) {
    cur[idx].status = status
    saveAll(cur)
    return true
  }
  return false
}
