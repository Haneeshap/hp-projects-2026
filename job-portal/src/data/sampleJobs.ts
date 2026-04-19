export interface Job {
  id: string
  title: string
  company: string
  location: string
  type: string
  salary?: string
  description: string
}

export const sampleJobs: Job[] = [
  {
    id: '1',
    title: 'Frontend Engineer',
    company: 'Acme Corp',
    location: 'Remote',
    type: 'Full-time',
    salary: '$90k - $120k',
    description:
      'Build beautiful web apps using React, TypeScript, and Tailwind CSS. Work closely with design and backend teams.'
  },
  {
    id: '2',
    title: 'Backend Engineer',
    company: 'DataWorks',
    location: 'New York, NY',
    type: 'Full-time',
    salary: '$110k - $140k',
    description: 'Design and implement scalable APIs and services in Node.js.'
  },
  {
    id: '3',
    title: 'Product Designer',
    company: 'DesignHub',
    location: 'San Francisco, CA',
    type: 'Contract',
    salary: '$60/hr',
    description: 'Craft delightful product experiences and UI components.'
  }
]
