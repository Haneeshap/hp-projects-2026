import React, { useState } from 'react'

type Props = {
  initial?: any
  onCancel?: () => void
  onSave: (job: any) => void
}

export default function JobForm({ initial = {}, onCancel, onSave }: Props) {
  const [title, setTitle] = useState(initial.title || '')
  const [company, setCompany] = useState(initial.company || '')
  const [location, setLocation] = useState(initial.location || '')
  const [type, setType] = useState(initial.type || 'Full-time')
  const [salaryFrom, setSalaryFrom] = useState(initial.salaryFrom || '')
  const [salaryTo, setSalaryTo] = useState(initial.salaryTo || '')
  const [remote, setRemote] = useState(!!initial.remote)
  const [description, setDescription] = useState(initial.description || '')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const job = {
      ...initial,
      title,
      company,
      location,
      type,
      salaryFrom: salaryFrom ? Number(salaryFrom) : undefined,
      salaryTo: salaryTo ? Number(salaryTo) : undefined,
      remote,
      description,
    }
    onSave(job)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 bg-white p-4 rounded shadow">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Job title" className="border p-2 rounded" />
        <input value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Company" className="border p-2 rounded" />
        <input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Location" className="border p-2 rounded" />
        <select value={type} onChange={(e) => setType(e.target.value)} className="border p-2 rounded">
          <option>Full-time</option>
          <option>Part-time</option>
          <option>Contract</option>
          <option>Internship</option>
        </select>
        <input value={salaryFrom} onChange={(e) => setSalaryFrom(e.target.value)} placeholder="Salary from" className="border p-2 rounded" />
        <input value={salaryTo} onChange={(e) => setSalaryTo(e.target.value)} placeholder="Salary to" className="border p-2 rounded" />
      </div>
      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={remote} onChange={(e) => setRemote(e.target.checked)} /> Remote
        </label>
      </div>
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" className="w-full border p-2 rounded" rows={6} />
      <div className="flex gap-2 justify-end">
        <button type="button" onClick={onCancel} className="px-4 py-2 border rounded">Cancel</button>
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Save Job</button>
      </div>
    </form>
  )
}
