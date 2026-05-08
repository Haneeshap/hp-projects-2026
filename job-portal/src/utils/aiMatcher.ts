import { Job } from '../data/sampleJobs'

type ResumeData = {
  name?: string
  title?: string
  contact?: string
  summary?: string
  skills?: string
  experiences?: Array<{ title?: string; company?: string; description?: string }>
  educations?: Array<any>
}

function tokenize(text?: string) {
  if (!text) return [] as string[]
  return text
    .toLowerCase()
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, ' ')
    .split(/\s+/)
    .filter(Boolean)
}

export function matchJobs(resume: ResumeData, jobs: Job[], topN = 5) {
  const skillSet = (resume.skills || '')
    .split(',')
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean)

  const summaryTokens = tokenize(resume.summary || '')
  const titleTokens = tokenize(resume.title || '')
  const expTokens = (resume.experiences || []).flatMap((e) => tokenize(`${e.title || ''} ${e.company || ''} ${e.description || ''}`))

  function scoreFor(job: Job) {
    // skill overlap
    const jobText = `${job.title} ${job.company} ${job.description} ${job.location}`.toLowerCase()
    const jobTokens = tokenize(jobText)
    const skillMatches = skillSet.filter((s) => jobText.includes(s)).length
    const skillScore = skillSet.length > 0 ? skillMatches / skillSet.length : 0

    // title similarity
    const titleMatch = titleTokens.some((t) => job.title.toLowerCase().includes(t)) ? 1 : 0

    // summary/experience overlap
    const summaryMatchCount = summaryTokens.reduce((acc, t) => (jobTokens.includes(t) ? acc + 1 : acc), 0)
    const expMatchCount = expTokens.reduce((acc, t) => (jobTokens.includes(t) ? acc + 1 : acc), 0)

    // recency boost (prefer recently posted)
    let recency = 0
    if (job.datePosted) {
      const days = (Date.now() - new Date(job.datePosted).getTime()) / (24 * 60 * 60 * 1000)
      recency = days <= 7 ? 1 : days <= 30 ? 0.6 : 0.2
    }

    const score = skillScore * 0.6 + titleMatch * 0.2 + (summaryMatchCount + expMatchCount) * 0.02 + recency * 0.18
    return Math.min(1, score)
  }

  const scored = jobs.map((j) => ({ job: j, score: scoreFor(j) })).sort((a, b) => b.score - a.score)
  return scored.slice(0, topN)
}

export default matchJobs
