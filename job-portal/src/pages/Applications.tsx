import React, { useEffect, useMemo, useState } from 'react'
import { listApplications, updateApplicationStatus, deleteApplication } from '../utils/applications'
import { sampleJobs } from '../data/sampleJobs'

export default function Applications(): JSX.Element {
  const [apps, setApps] = useState<any[]>([])
  const [statusFilter, setStatusFilter] = useState('')
  const [q, setQ] = useState('')

  useEffect(() => {
    setApps(listApplications())
  }, [])

  function refresh() {
    setApps(listApplications())
  }

  function changeStatus(id: string, status: any) {
    updateApplicationStatus(id, status)
    refresh()
  }

  function onDelete(id: string) {
    if (!confirm('Delete this application?')) return
    deleteApplication(id)
    refresh()
  }

  const filtered = useMemo(() => {
    return apps.filter((a) => {
      if (statusFilter && a.status !== statusFilter) return false
      if (!q) return true
      const t = q.toLowerCase()
      const jobTitle = (sampleJobs.find((j) => j.id === a.jobId)?.title || '')
      return a.name.toLowerCase().includes(t) || a.email.toLowerCase().includes(t) || jobTitle.toLowerCase().includes(t) || a.jobId.toLowerCase().includes(t)
    })
  }, [apps, statusFilter, q])

  if (apps.length === 0) return <div className="uppercase font-semibold">NO APPLICATIONS YET.</div>

  function exportCSV() {
    const rows = [['id', 'name', 'email', 'jobId', 'jobTitle', 'status', 'appliedAt']]
    for (const a of apps) {
      const jobTitle = sampleJobs.find((j) => j.id === a.jobId)?.title || ''
      rows.push([a.id, a.name, a.email, a.jobId, jobTitle, a.status, a.appliedAt])
    }
    const csv = rows.map((r) => r.map((c) => '"' + String(c).replace(/"/g, '""') + '"').join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'applications.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-bold uppercase tracking-wider mb-4">APPLICATIONS</h1>

      <div className="mb-4 flex gap-2 items-center">
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by name, email, job or id" className="border p-2 rounded w-80" />
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="border p-2 rounded">
          <option value="">All statuses</option>
          <option>Applied</option>
          <option>Interview</option>
          <option>Rejected</option>
          <option>Hired</option>
        </select>
        <button onClick={refresh} className="px-3 py-1 bg-indigo-600 text-white rounded">Refresh</button>
        <button onClick={exportCSV} className="px-3 py-1 border rounded">Export CSV</button>
      </div>

      <div className="space-y-4">
        {filtered.map((a) => (
          <div key={a.id} className="border rounded p-4 bg-white">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold uppercase tracking-wide">{a.name}</div>
                <div className="text-sm text-slate-600">{a.email} · {sampleJobs.find((j) => j.id === a.jobId)?.title || a.jobId}</div>
              </div>
              <div className="flex items-center gap-2">
                <select value={a.status} onChange={(e) => changeStatus(a.id, e.target.value)} className="border rounded px-2 py-1">
                  <option>Applied</option>
                  <option>Interview</option>
                  <option>Rejected</option>
                  <option>Hired</option>
                </select>
                <div className="text-sm text-slate-500">{new Date(a.appliedAt).toLocaleString()}</div>
                <button onClick={() => onDelete(a.id)} className="px-3 py-1 bg-red-600 text-white rounded">Delete</button>
              </div>
            </div>
            {a.cover ? <div className="mt-2 text-sm">Cover: {a.cover}</div> : null}
          </div>
        ))}
      </div>
    </div>
  )
}
