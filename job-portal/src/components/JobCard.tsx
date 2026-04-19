import React from 'react'
import { Job } from '../data/sampleJobs'
import { Link } from 'react-router-dom'

export default function JobCard({ job }: { job: Job }) {
  return (
    <div className="border rounded-lg p-4 shadow-sm bg-white">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-lg font-semibold text-slate-800">{job.title}</h2>
          <div className="text-sm text-slate-600">{job.company} — {job.location}</div>
        </div>
        <div className="text-sm text-slate-500">{job.type}</div>
      </div>
      <p className="mt-3 text-sm text-slate-700">{job.description}</p>
      <div className="mt-4 flex items-center justify-between">
        <div className="text-sm text-slate-600">{job.salary}</div>
        <Link to={`/jobs/${job.id}`} className="text-indigo-600 hover:underline">View</Link>
      </div>
    </div>
  )
}
