import { matchJobs } from '../utils/aiMatcher'
import { sampleJobs } from '../data/sampleJobs'

test('matchJobs scores obvious skill overlap highest', () => {
  const resume = {
    skills: 'React, TypeScript, Tailwind',
    title: 'Frontend Engineer',
    summary: 'Building web apps with React and TypeScript',
    experiences: [{ title: 'Frontend Engineer', company: 'Acme Corp', description: 'React, TypeScript' }]
  }

  const matches = matchJobs(resume, sampleJobs, 3)
  expect(matches.length).toBeGreaterThan(0)
  // expect the first match to be Frontend Engineer (id '1') from sample data
  expect(matches[0].job.id).toBe('1')
})
