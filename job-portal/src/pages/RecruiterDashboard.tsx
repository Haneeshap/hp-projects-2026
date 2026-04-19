import React, { useEffect, useState } from 'react'
import sampleJobs from '../data/sampleJobs'
import JobForm from '../components/JobForm'

function loadRecruiterJobs() {
  try {
    const raw = localStorage.getItem('recruiterJobs')
    return raw ? JSON.parse(raw) : []
  } catch (e) {
    return []
  }
}

function saveRecruiterJobs(arr: any[]) {
  localStorage.setItem('recruiterJobs', JSON.stringify(arr))
}

export default function RecruiterDashboard(): JSX.Element {
  const [jobs, setJobs] = useState<any[]>([])
  const [editing, setEditing] = useState<any | null>(null)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    const rJobs = loadRecruiterJobs()
    setJobs([...rJobs])
  }, [])

  function refresh() {
    setJobs(loadRecruiterJobs())
  }

  function handleCreate() {
    setEditing(null)
    setShowForm(true)
  }

  function handleSave(job: any) {
    const list = loadRecruiterJobs()
    if (!job.id) {
      job.id = `r-${Date.now()}`
      list.unshift(job)
    } else {
      const idx = list.findIndex((s: any) => s.id === job.id)
      if (idx >= 0) list[idx] = job
    }
    saveRecruiterJobs(list)
    setShowForm(false)
    refresh()
  }

  function handleEdit(job: any) {
    setEditing(job)
    setShowForm(true)
  }

  function handleDelete(id: string) {
    if (!confirm('Delete this job?')) return
    const list = loadRecruiterJobs().filter((j: any) => j.id !== id)
    saveRecruiterJobs(list)
    refresh()
  }

  const combined = [...jobs]

  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-bold uppercase tracking-wider mb-4">Recruiter Dashboard</h1>
      <div className="mb-4 flex gap-2">
        <button onClick={handleCreate} className="bg-green-600 text-white px-4 py-2 rounded">Create Job</button>
        <button onClick={() => { saveRecruiterJobs([]); refresh() }} className="px-4 py-2 border rounded">Clear My Jobs</button>
      </div>

      {showForm ? (
        <div className="mb-4">
          <JobForm initial={editing || {}} onCancel={() => setShowForm(false)} onSave={handleSave} />
        </div>
      ) : null}

      <div className="space-y-4">
        {combined.length === 0 ? (
          <div className="text-sm text-slate-600">No recruiter jobs yet. Create one above.</div>
        ) : (
          combined.map((j: any) => (
            <div key={j.id} className="border rounded p-4 bg-white flex items-center justify-between">
              <div>
                <div className="font-semibold">{j.title} <span className="text-sm text-slate-500">@ {j.company}</span></div>
                <div className="text-sm text-slate-600">{j.location} · {j.type} {j.remote ? '· Remote' : ''}</div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => handleEdit(j)} className="px-3 py-1 border rounded">Edit</button>
                <button onClick={() => handleDelete(j.id)} className="px-3 py-1 bg-red-600 text-white rounded">Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
