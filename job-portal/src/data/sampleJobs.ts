export interface Job {
  id: string
  title: string
  company: string
  location: string
  type: string
  salary?: string
  salaryFrom?: number
  salaryTo?: number
  description: string
  logo?: string
  coords?: { lat: number; lon: number }
  datePosted?: string // ISO date
  remote?: boolean
}

export const sampleJobs: Job[] = [
  {
    id: '1',
    title: 'Frontend Engineer',
    company: 'Acme Corp',
    location: 'Remote',
    type: 'Full-time',
    salary: '$90k - $120k',
    salaryFrom: 90000,
    salaryTo: 120000,
    description:
      'Build beautiful web apps using React, TypeScript, and Tailwind CSS. Work closely with design and backend teams.',
    logo: '/logos/acme.png',
    datePosted: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    remote: true
  },
  {
    id: '2',
    title: 'Backend Engineer',
    company: 'DataWorks',
    location: 'New York, NY',
    type: 'Full-time',
    salary: '$110k - $140k',
    salaryFrom: 110000,
    salaryTo: 140000,
    description: 'Design and implement scalable APIs and services in Node.js.',
    logo: '/logos/dataworks.png',
    coords: { lat: 40.7128, lon: -74.006 },
    datePosted: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    remote: false
  },
  {
    id: '3',
    title: 'Product Designer',
    company: 'DesignHub',
    location: 'San Francisco, CA',
    type: 'Contract',
    salary: '$60/hr',
    salaryFrom: 60000,
    salaryTo: 60000,
    description: 'Craft delightful product experiences and UI components.',
    logo: '/logos/designhub.png',
    coords: { lat: 37.7749, lon: -122.4194 },
    datePosted: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    remote: false
  },
  {
    id: '4',
    title: 'DevOps Engineer',
    company: 'CloudScale',
    location: 'Austin, TX',
    type: 'Full-time',
    salary: '$100k - $130k',
    salaryFrom: 100000,
    salaryTo: 130000,
    description: 'Maintain and scale our cloud infrastructure.',
    logo: '/logos/cloudscale.png',
    coords: { lat: 30.2672, lon: -97.7431 },
    datePosted: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    remote: false
  },
  {
    id: '5',
    title: 'Data Scientist',
    company: 'InsightAI',
    location: 'Boston, MA',
    type: 'Part-time',
    salary: '$80k - $100k',
    salaryFrom: 80000,
    salaryTo: 100000,
    description: 'Work on ML pipelines and modeling.',
    logo: '/logos/insightai.png',
    coords: { lat: 42.3601, lon: -71.0589 },
    datePosted: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    remote: true
  },
  {
    id: '6',
    title: 'QA Engineer',
    company: 'Testify',
    location: 'Seattle, WA',
    type: 'Full-time',
    salary: '$75k - $95k',
    salaryFrom: 75000,
    salaryTo: 95000,
    description: 'Ensure product quality across platforms.',
    logo: '/logos/testify.png',
    coords: { lat: 47.6062, lon: -122.3321 },
    datePosted: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    remote: false
  },
  {
    id: '7',
    title: 'Full Stack Developer',
    company: 'Stackly',
    location: 'Chicago, IL',
    type: 'Full-time',
    salary: '$95k - $125k',
    salaryFrom: 95000,
    salaryTo: 125000,
    description: 'Build and maintain end-to-end features.',
    logo: '/logos/stackly.png',
    coords: { lat: 41.8781, lon: -87.6298 },
    datePosted: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    remote: false
  },
  {
    id: '8',
    title: 'Mobile Engineer',
    company: 'AppWorks',
    location: 'Los Angeles, CA',
    type: 'Contract',
    salary: '$70k - $90k',
    salaryFrom: 70000,
    salaryTo: 90000,
    description: 'Develop native mobile applications.',
    logo: '/logos/appworks.png',
    coords: { lat: 34.0522, lon: -118.2437 },
    datePosted: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    remote: false
  }
]
