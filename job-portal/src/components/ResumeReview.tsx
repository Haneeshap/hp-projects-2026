import React, { useEffect, useState } from 'react'
import { reviewResumeLocal, ReviewResult } from '../utils/resumeReviewer'

const STORAGE_KEY = 'resume_builder_data'

export default function ResumeReview() {
  const [result, setResult] = useState<ReviewResult | null>(null)
  const [running, setRunning] = useState(false)

  function loadAndReview() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      const data = raw ? JSON.parse(raw) : {}
      setRunning(true)
      // simulate async
      setTimeout(() => {
        const r = reviewResumeLocal(data)
        setResult(r)
        setRunning(false)
      }, 200)
    } catch (e) {
      setResult(null)
      setRunning(false)
    }
  }

  useEffect(() => {
    loadAndReview()
    const onStorage = (e: StorageEvent) => { if (e.key === STORAGE_KEY) loadAndReview() }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  return (
    <div className="mt-6 p-4 bg-white border rounded">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">AI Resume Review</h3>
        <button onClick={loadAndReview} className="px-3 py-1 bg-indigo-600 text-white rounded">Run Review</button>
      </div>

      {running ? (
        <div className="mt-3 text-sm">Reviewing...</div>
      ) : result ? (
        <div className="mt-3">
          <div className="text-sm">Overall score: <strong>{result.score}%</strong></div>
          <div className="mt-2 grid gap-2 md:grid-cols-2">
            <div>
              <div className="font-semibold">Strengths</div>
              <ul className="list-disc list-inside mt-1 text-sm">
                {result.strengths.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </div>
            <div>
              <div className="font-semibold">Improvements</div>
              <ul className="list-disc list-inside mt-1 text-sm text-rose-700">
                {result.improvements.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-3 text-sm text-slate-500">No resume data found.</div>
      )}
    </div>
  )
}
