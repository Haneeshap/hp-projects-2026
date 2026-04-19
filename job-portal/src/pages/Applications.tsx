import React, { useEffect, useState } from 'react'
import { listApplications, updateApplicationStatus } from '../utils/applications'

export default function Applications(): JSX.Element {
  const [apps, setApps] = useState<any[]>([])

  useEffect(() => {
    setApps(listApplications())
  }, [])

  function changeStatus(id: string, status: any) {
    updateApplicationStatus(id, status)
    setApps(listApplications())
  }

  if (apps.length === 0) return <div className="uppercase font-semibold">NO APPLICATIONS YET.</div>

  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-bold uppercase tracking-wider mb-4">APPLICATIONS</h1>
      <div className="space-y-4">
        {apps.map((a) => (
          <div key={a.id} className="border rounded p-4 bg-white">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold uppercase tracking-wide">{a.name}</div>
                <div className="text-sm text-slate-600">{a.email} · {a.jobId}</div>
              </div>
              <div className="flex items-center gap-2">
                <select value={a.status} onChange={(e) => changeStatus(a.id, e.target.value)} className="border rounded px-2 py-1">
                  <option>Applied</option>
                  <option>Interview</option>
                  <option>Rejected</option>
                  <option>Hired</option>
                </select>
                <div className="text-sm text-slate-500">{new Date(a.appliedAt).toLocaleString()}</div>
              </div>
            </div>
            {a.cover ? <div className="mt-2 text-sm">Cover: {a.cover}</div> : null}
          </div>
        ))}
      </div>
    </div>
  )
}
