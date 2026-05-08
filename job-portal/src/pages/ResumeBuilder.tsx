import React from 'react'
import ResumeForm from '../components/ResumeForm'
import ResumeMatcher from '../components/ResumeMatcher'
import ResumeReview from '../components/ResumeReview'

export default function ResumeBuilder(): JSX.Element {
  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-bold uppercase tracking-wider mb-4">Resume Builder</h1>
      <ResumeForm />
      <ResumeMatcher />
      <ResumeReview />
    </div>
  )
}
