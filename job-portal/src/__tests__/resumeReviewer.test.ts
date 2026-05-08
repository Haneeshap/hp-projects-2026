import { reviewResumeLocal } from '../utils/resumeReviewer'

test('reviewResumeLocal returns strengths and improvements and a score in range', () => {
  const resume = {
    name: 'Alice',
    contact: 'a@example.com',
    title: 'Frontend Engineer',
    summary: 'Experienced frontend engineer building React apps.',
    skills: 'React, TypeScript, Tailwind',
    experiences: [{ title: 'Frontend Engineer', company: 'Acme', description: 'Built UI and increased performance by 30%' }],
    educations: [{ school: 'Uni', degree: 'BS' }]
  }

  const r = reviewResumeLocal(resume as any)
  expect(r.score).toBeGreaterThanOrEqual(0)
  expect(r.score).toBeLessThanOrEqual(100)
  expect(r.strengths.length).toBeGreaterThan(0)
  expect(r.improvements.length).toBeGreaterThanOrEqual(0)
})
