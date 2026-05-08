type ResumeData = {
  name?: string
  title?: string
  contact?: string
  summary?: string
  skills?: string
  experiences?: Array<{ title?: string; company?: string; description?: string }>
  educations?: Array<any>
}

export type ReviewResult = {
  score: number // 0..100
  strengths: string[]
  improvements: string[]
}

function hasQuantifiable(text?: string) {
  if (!text) return false
  return /\b\d+\b|%|increased|reduced|improved|led to/i.test(text)
}

export function reviewResumeLocal(resume: ResumeData): ReviewResult {
  const strengths: string[] = []
  const improvements: string[] = []

  // Basic presence checks
  if (resume.name) strengths.push('Name present')
  else improvements.push('Add your full name at the top')

  if (resume.contact) strengths.push('Contact information present')
  else improvements.push('Add an email or phone number in the contact section')

  if (resume.title) strengths.push(`Headline: ${resume.title}`)
  else improvements.push('Add a short headline (e.g., Frontend Engineer)')

  if (resume.summary && resume.summary.length > 30) strengths.push('Profile summary present')
  else improvements.push('Add a 2-3 sentence summary describing your focus and impact')

  const skillCount = (resume.skills || '').split(',').map((s) => s.trim()).filter(Boolean).length
  if (skillCount >= 3) strengths.push(`Skills listed (${skillCount})`)
  else improvements.push('List 3-6 core skills (comma separated)')

  const expCount = (resume.experiences || []).length
  if (expCount > 0) strengths.push(`Experience entries: ${expCount}`)
  else improvements.push('Add at least one professional experience with responsibilities')

  // Quantifiable achievements
  const quantCount = (resume.experiences || []).reduce((acc, e) => acc + (hasQuantifiable(e.description) ? 1 : 0), 0)
  if (quantCount > 0) strengths.push(`${quantCount} experience entries include quantifiable results`)
  else improvements.push('Add measurable achievements (metrics, percentages, timeframes) to your experience descriptions')

  // Education check
  if ((resume.educations || []).length > 0) strengths.push('Education listed')

  // Compute score
  let score = 50
  score += resume.name ? 5 : -5
  score += resume.contact ? 10 : -10
  score += resume.title ? 8 : -8
  score += resume.summary && resume.summary.length > 30 ? 7 : -7
  score += Math.min(10, skillCount * 2)
  score += Math.min(10, expCount * 3)
  score += Math.min(10, quantCount * 4)

  score = Math.max(0, Math.min(100, Math.round(score)))

  // Add general tips if too short
  if ((resume.summary || '').length < 30) improvements.push('Expand your summary: mention primary skills and 1-2 achievements')

  return { score, strengths, improvements }
}

export default reviewResumeLocal
