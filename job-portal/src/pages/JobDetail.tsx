import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getJobById } from '../api/jobs'

export default function JobDetail(): JSX.Element {
  const { id } = useParams()
  const [job, setJob] = useState<any | null>(null)
  const [applying, setApplying] = useState(false)

  useEffect(() => {
    if (!id) return
    getJobById(id).then((j) => setJob(j ?? null))
  }, [id])

  if (!job) return <div>Job not found</div>

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold">{job.title}</h1>
        <div className="text-sm text-slate-600">{job.company} — {job.location}</div>
      </div>
      <div className="prose">
        <p>{job.description}</p>
      </div>

      {!applying ? (
        <button
          onClick={() => setApplying(true)}
          className="px-4 py-2 bg-indigo-600 text-white rounded"
        >
          Apply
        </button>
      ) : (
        <ApplyForm jobId={job.id} onDone={() => setApplying(false)} />
      )}
    </div>
  )
}

function ApplyForm({ jobId, onDone }: { jobId: string; onDone: () => void }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [cover, setCover] = useState('')

  function submit(e: React.FormEvent) {
    e.preventDefault()
    console.log('Apply', { jobId, name, email, cover })
    alert('Application submitted (mock)')
    onDone()
  }

  return (
    <form onSubmit={submit} className="space-y-3 max-w-md">
      <input className="w-full border px-3 py-2" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" />
      <input className="w-full border px-3 py-2" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <textarea className="w-full border px-3 py-2" value={cover} onChange={(e) => setCover(e.target.value)} placeholder="Cover letter" />
      <div className="flex gap-2">
        <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">Submit</button>
        <button type="button" onClick={() => onDone()} className="px-4 py-2 border rounded">Cancel</button>
      </div>
    </form>
  )
}
