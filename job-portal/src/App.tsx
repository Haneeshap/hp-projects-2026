import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import JobsList from './pages/JobsList'
import JobDetail from './pages/JobDetail'
import Bookmarks from './pages/Bookmarks'
import Applications from './pages/Applications'
import RecruiterDashboard from './pages/RecruiterDashboard'
import ThemeToggle from './components/ThemeToggle'

export default function App(): JSX.Element {
  return (
    <BrowserRouter>
      <div className="app max-w-7xl mx-auto">
        <header className="flex items-center justify-start py-6 w-full">
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="text-6xl md:text-7xl font-extrabold tracking-tight uppercase text-white bg-black/40 px-6 py-3 rounded-md inline-block"
              style={{ fontFamily: 'Montserrat, system-ui', textShadow: '0 6px 18px rgba(2,6,23,0.7)' }}
            >
              FIND YOUR JOBS
            </Link>
            <span className="text-white/70 uppercase tracking-wider"> -- </span>
            <Link to="/bookmarks" className="uppercase tracking-wider text-sm md:text-base text-white/90 bg-white/10 px-3 py-2 rounded">BOOKMARKS</Link>
            <span className="text-white/70">--</span>
            <Link to="/applications" className="uppercase tracking-wider text-sm md:text-base text-white/90 bg-white/10 px-3 py-2 rounded">APPLICATIONS</Link>
          </div>
          <div className="ml-auto">
            <ThemeToggle />
          </div>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<JobsList />} />
            <Route path="/jobs/:id" element={<JobDetail />} />
            <Route path="/bookmarks" element={<Bookmarks />} />
            <Route path="/applications" element={<Applications />} />
            <Route path="/recruiter" element={<RecruiterDashboard />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}
