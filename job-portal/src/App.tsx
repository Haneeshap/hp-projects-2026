import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import JobsList from './pages/JobsList'
import JobDetail from './pages/JobDetail'

export default function App(): JSX.Element {
  return (
    <BrowserRouter>
      <div className="app max-w-4xl mx-auto">
        <header className="flex items-center justify-between py-6">
          <Link to="/" className="text-2xl font-bold text-slate-800">JobPortal</Link>
          <nav>
            <Link to="/" className="text-sm text-slate-600 hover:text-slate-800">Jobs</Link>
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<JobsList />} />
            <Route path="/jobs/:id" element={<JobDetail />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}
