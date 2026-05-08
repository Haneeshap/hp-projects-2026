import React, { useState, useEffect } from 'react'

type Experience = { id: string; title: string; company: string; from: string; to: string; description: string }
type Education = { id: string; school: string; degree: string; from: string; to: string }

const STORAGE_KEY = 'resume_builder_data'

export default function ResumeForm() {
  const [name, setName] = useState('')
  const [title, setTitle] = useState('')
  const [contact, setContact] = useState('')
  const [summary, setSummary] = useState('')
  const [skills, setSkills] = useState('')
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [educations, setEducations] = useState<Education[]>([])

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const data = JSON.parse(raw)
        setName(data.name || '')
        setTitle(data.title || '')
        setContact(data.contact || '')
        setSummary(data.summary || '')
        setSkills(data.skills || '')
        setExperiences(data.experiences || [])
        setEducations(data.educations || [])
      }
    } catch (e) {}
  }, [])

  useEffect(() => {
    const data = { name, title, contact, summary, skills, experiences, educations }
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)) } catch (e) {}
  }, [name, title, contact, summary, skills, experiences, educations])

  function addExperience() {
    setExperiences((s) => [...s, { id: String(Date.now()), title: '', company: '', from: '', to: '', description: '' }])
  }

  function updateExperience(id: string, patch: Partial<Experience>) {
    setExperiences((s) => s.map((e) => (e.id === id ? { ...e, ...patch } : e)))
  }

  function removeExperience(id: string) {
    setExperiences((s) => s.filter((e) => e.id !== id))
  }

  function addEducation() {
    setEducations((s) => [...s, { id: String(Date.now()), school: '', degree: '', from: '', to: '' }])
  }

  function updateEducation(id: string, patch: Partial<Education>) {
    setEducations((s) => s.map((e) => (e.id === id ? { ...e, ...patch } : e)))
  }

  function removeEducation(id: string) {
    setEducations((s) => s.filter((e) => e.id !== id))
  }

  function clear() {
    if (!confirm('Clear all resume data?')) return
    setName('')
    setTitle('')
    setContact('')
    setSummary('')
    setSkills('')
    setExperiences([])
    setEducations([])
    localStorage.removeItem(STORAGE_KEY)
  }

  function exportJSON() {
    const data = { name, title, contact, summary, skills, experiences, educations }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${(name || 'resume').replace(/\s+/g, '_')}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div>
        <h2 className="text-xl font-semibold mb-3">Edit Resume</h2>
        <div className="space-y-2">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" className="w-full border p-2 rounded" />
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title (e.g., Frontend Engineer)" className="w-full border p-2 rounded" />
          <input value={contact} onChange={(e) => setContact(e.target.value)} placeholder="Contact (email, phone)" className="w-full border p-2 rounded" />
          <textarea value={summary} onChange={(e) => setSummary(e.target.value)} placeholder="Summary" className="w-full border p-2 rounded" rows={4} />
          <input value={skills} onChange={(e) => setSkills(e.target.value)} placeholder="Skills (comma separated)" className="w-full border p-2 rounded" />

          <div className="border-t pt-3">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Experience</h3>
              <button onClick={addExperience} className="px-3 py-1 bg-blue-600 text-white rounded">Add</button>
            </div>
            <div className="space-y-2 mt-2">
              {experiences.map((exp) => (
                <div key={exp.id} className="border p-2 rounded">
                  <div className="flex gap-2">
                    <input value={exp.title} onChange={(e) => updateExperience(exp.id, { title: e.target.value })} placeholder="Role" className="flex-1 border p-1 rounded" />
                    <input value={exp.company} onChange={(e) => updateExperience(exp.id, { company: e.target.value })} placeholder="Company" className="w-40 border p-1 rounded" />
                  </div>
                  <div className="flex gap-2 mt-2">
                    <input value={exp.from} onChange={(e) => updateExperience(exp.id, { from: e.target.value })} placeholder="From" className="border p-1 rounded" />
                    <input value={exp.to} onChange={(e) => updateExperience(exp.id, { to: e.target.value })} placeholder="To" className="border p-1 rounded" />
                    <button onClick={() => removeExperience(exp.id)} className="px-2 py-1 bg-red-600 text-white rounded ml-auto">Remove</button>
                  </div>
                  <textarea value={exp.description} onChange={(e) => updateExperience(exp.id, { description: e.target.value })} placeholder="Description" className="w-full border p-1 rounded mt-2" rows={3} />
                </div>
              ))}
            </div>
          </div>

          <div className="border-t pt-3">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Education</h3>
              <button onClick={addEducation} className="px-3 py-1 bg-blue-600 text-white rounded">Add</button>
            </div>
            <div className="space-y-2 mt-2">
              {educations.map((ed) => (
                <div key={ed.id} className="border p-2 rounded">
                  <div className="flex gap-2">
                    <input value={ed.school} onChange={(e) => updateEducation(ed.id, { school: e.target.value })} placeholder="School" className="flex-1 border p-1 rounded" />
                    <input value={ed.degree} onChange={(e) => updateEducation(ed.id, { degree: e.target.value })} placeholder="Degree" className="w-48 border p-1 rounded" />
                  </div>
                  <div className="flex gap-2 mt-2">
                    <input value={ed.from} onChange={(e) => updateEducation(ed.id, { from: e.target.value })} placeholder="From" className="border p-1 rounded" />
                    <input value={ed.to} onChange={(e) => updateEducation(ed.id, { to: e.target.value })} placeholder="To" className="border p-1 rounded" />
                    <button onClick={() => removeEducation(ed.id)} className="px-2 py-1 bg-red-600 text-white rounded ml-auto">Remove</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-2 mt-4">
            <button onClick={() => window.print()} className="px-4 py-2 bg-indigo-600 text-white rounded">Print / Save as PDF</button>
            <button onClick={exportJSON} className="px-4 py-2 border rounded">Export JSON</button>
            <button onClick={clear} className="px-4 py-2 bg-red-600 text-white rounded">Clear</button>
          </div>
        </div>
      </div>

      <div className="p-4 bg-white border rounded">
        <h2 className="text-xl font-semibold mb-3">Preview</h2>
        <div id="resume-preview" className="prose">
          <h1 className="text-2xl">{name || 'Your Name'}</h1>
          <div className="text-sm text-slate-600">{title}</div>
          <div className="mt-2 text-sm">{contact}</div>
          <p className="mt-3">{summary}</p>
          {skills && (
            <div>
              <h3 className="font-medium mt-3">Skills</h3>
              <div>{skills.split(',').map((s) => s.trim()).filter(Boolean).join(', ')}</div>
            </div>
          )}

          {experiences.length > 0 && (
            <div>
              <h3 className="font-medium mt-3">Experience</h3>
              <div className="space-y-2">
                {experiences.map((e) => (
                  <div key={e.id}>
                    <div className="font-semibold">{e.title} — <span className="text-sm font-normal">{e.company}</span></div>
                    <div className="text-sm text-slate-600">{e.from} — {e.to}</div>
                    <div>{e.description}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {educations.length > 0 && (
            <div>
              <h3 className="font-medium mt-3">Education</h3>
              <div className="space-y-2">
                {educations.map((ed) => (
                  <div key={ed.id}>
                    <div className="font-semibold">{ed.school}</div>
                    <div className="text-sm text-slate-600">{ed.degree} · {ed.from} — {ed.to}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
