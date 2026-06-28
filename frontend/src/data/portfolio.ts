export interface SocialLink {
  label: string
  href: string
  icon: 'github' | 'linkedin' | 'mail'
}

export interface SkillCategory {
  name: string
  skills: { name: string; level: number }[]
}

export interface Experience {
  company: string
  role: string
  period: string
  location: string
  highlights: string[]
}

export interface Project {
  slug: string
  title: string
  description: string
  tech: string[]
  github?: string
  demo?: string
}

export interface Education {
  institution: string
  degree: string
  period: string
  details?: string
}

export const navLinks = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
] as const

export type SectionId = (typeof navLinks)[number]['id'] | 'hero'

export const hero = {
  name: 'Bashir Muhammed',
  title: 'Java Backend Developer',
  tagline:
    'Building resilient, scalable systems with Spring Boot, clean architecture, and a focus on measurable business impact.',
  availability: 'Open to opportunities',
  location: 'Lagos, Nigeria',
  yearsExperience: 3,
}

export const about = {
  summary: `I've spent the last few years on Java backend work, building REST APIs and keeping services running in production. That meant working closely with databases, containerizing applications with Docker, and supporting deployments on AWS and Kubernetes.

What I enjoy most is the day-to-day engineering: cleaning up code so the next person can follow it, learning from senior engineers, and doing my part in CI/CD so features ship on time. I pick things up quickly, I communicate clearly, and I'm looking for a team where I can keep growing as a backend engineer.`,
}

export const skillCategories: SkillCategory[] = [
  {
    name: 'Backend',
    skills: [
      { name: 'Core Java', level: 90 },
      { name: 'Spring Boot', level: 88 },
      { name: 'MySQL', level: 85 },
      { name: 'PostgreSQL', level: 80 },
      { name: 'MongoDB', level: 75 },
      { name: 'Redis', level: 72 },
      { name: 'Microservices', level: 70 },
    ],
  },
  {
    name: 'Cloud & DevOps',
    skills: [
      { name: 'AWS (ECS, Lambda)', level: 75 },
      { name: 'Docker', level: 82 },
      { name: 'Kubernetes', level: 70 },
      { name: 'Git', level: 90 },
      { name: 'GitHub Actions', level: 78 },
      { name: 'GitLab CI', level: 75 },
    ],
  },
  {
    name: 'Engineering Practices',
    skills: [
      { name: 'OOP', level: 90 },
      { name: 'SOLID Principles', level: 85 },
      { name: 'Design Patterns', level: 80 },
      { name: 'System Design', level: 72 },
      { name: 'Testing', level: 78 },
    ],
  },
  {
    name: 'Frontend (Supporting)',
    skills: [
      { name: 'HTML', level: 80 },
      { name: 'Thymeleaf', level: 82 },
      { name: 'CSS', level: 75 },
      { name: 'Bootstrap', level: 78 },
    ],
  },
]

export const experiences: Experience[] = [
  {
    company: 'Turing',
    role: 'Java Engineer (AI Systems) — Contractor',
    period: 'May 2025 — Jan 2026',
    location: 'Remote',
    highlights: [
      'Developed, optimized, and maintained high-performance Java components for training and aligning large language models (LLMs).',
      'Built tools and workflows to support Reinforcement Learning with Human Feedback (RLHF), improving reward modeling pipelines.',
      'Led efforts on Supervised Fine-Tuning (SFT), collaborating with researchers to curate and structure high-quality task-specific datasets.',
      'Delivered insights and performance recommendations through peer reviews and evaluation reports.',
    ],
  },
  {
    company: 'Sysserve',
    role: 'Java Backend Developer',
    period: 'Jun 2023 — Nov 2025',
    location: 'Lagos, Nigeria',
    highlights: [
      'Developed and maintained backend services with Java and Spring Boot.',
      'Built and optimized REST APIs consumed by different applications.',
      'Gained experience with Docker, Kubernetes, and AWS by containerizing applications and supporting deployments.',
      'Contributed to CI/CD pipelines using GitHub Actions and GitLab CI, improving code release processes.',
      'Worked with senior developers to refactor code for better readability and maintainability.',
      'Collaborated with cross-functional teams to deliver features on time and support ongoing product improvements.',
    ],
  },
  {
    company: 'Awibi Medtech',
    role: 'Backend Developer Intern',
    period: 'Apr 2021 — Apr 2022',
    location: 'Ilorin, Nigeria',
    highlights: [
      'Assisted in developing secure REST APIs using Spring Boot for the Awibi Electronic Health Record system, improving how clinics manage patient data.',
      'Optimized database queries to ensure sensitive medical records could be retrieved quickly and securely.',
      'Wrote unit tests and fixed backend bugs to increase the stability and accuracy of the core healthcare platform.',
      'Collaborated with the engineering team to troubleshoot system issues, participate in code reviews, and manage version control using Git.',
    ],
  },
]

export const projects: Project[] = [
  {
    slug: 'legally',
    title: 'Legally',
    description:
      'Legally is a web app that helps people understand everyday legal questions (tenancy, land, employment, police encounters, and more) in plain language. It lets users describe a situation by text, voice, or uploads such as photos and PDFs. The app works out which jurisdiction apply and returns a summary, legal points with source links where possible, practical steps, and contacts to reach out to. I built the backend in Java 21 with Spring Boot as a REST API on Google Cloud Run, using PostgreSQL (Cloud SQL) for sessions and history, Firebase for authentication and file storage, and a provider-chain design that orchestrates Gemini and fallback LLMs through Google Speech-to-Text and custom integration services.',
    tech: ['Java 21', 'Spring Boot 4', 'Spring AI', 'Firebase', 'Google Cloud', 'JUnit', 'Docker'],
    github: 'https://github.com/Bashmufol/Legally',
    demo: 'https://legally-7f34d.web.app/',
  },
  {
    slug: 'terratrade',
    title: 'Terratrade',
    description:
      'Terratrade is a platform that helps Nigerian farmers, local aggregators, and international buyers move crops from farm gate to export batch with trust built in at every step. Users work through role-based portals to list harvests, map farm plots, source stock within a corridor, build export batches, and complete buyer contracts with escrow-backed payments. The app returns traceability maps, per-crop compliance checklists, document scorecards, RFQ match analysis, and practical workflow status from listing to release of funds. The server is built with Java 21 and Spring Boot, offering JWT-secured REST APIs over PostgreSQL and PostGIS, with Flyway-managed migrations and modular integrations for escrow payments and external document analysis.',
    tech: [
      'Java 21',
      'Spring Boot 4',
      'Maven',
      'REST APIs',
      'JWT',
      'PostgreSQL',
      'PostGIS',
      'Flyway',
      'Payment Integration',
      'Docker',
      'Swagger',
      'OpenAPI',
    ],
    demo: 'https://terratrade-50d.pages.dev/',
  },
  {
    slug: 'evocharge',
    title: 'EvoCharge',
    description:
      'EvoCharge is an EV charging intelligence application built for Nigeria’s fragmented public charging market. It unifies station data from multiple operators into a single normalized model so drivers can discover chargers by city, status, and connector type, compare options through a weighted EvoScore ranking engine, and get location-aware recommendations based on distance, availability, wait time, and reliability. The platform also exposes network analytics, live station status streaming, and a natural-language charging advisor that suggests ranked stations from plain-English queries. The backend is implemented in Java 21 with Spring Boot, exposing versioned REST APIs backed by DynamoDB, server-sent events for real-time updates, and AWS integrations for containerized deployment on ECS, event-driven status pulses via EventBridge and Lambda, and generative AI through Amazon Bedrock.',
    tech: [
      'Java 21',
      'Spring Boot',
      'REST APIs',
      'Maven',
      'DynamoDB',
      'AWS',
      'AWS CDK',
      'AWS SDK v2',
      'SSE',
      'Docker',
      'CI/CD',
      'Modular Integrations',
      'Cloud-native Architecture',
    ],
    github: 'https://github.com/Bashmufol/EvoCharge',
    demo: 'https://d2zlb8ixz2ivq7.cloudfront.net/',
  },
]

export const education: Education[] = [
  {
    institution: 'University of Ilorin, Nigeria',
    degree: 'Bachelor of Science',
    period: 'Expected Oct 2026',
    details:
      'Relevant coursework: Data Structures, Algorithms, Database Systems.',
  },
]

export const socialLinks: SocialLink[] = [
  { label: 'GitHub', href: 'https://github.com/bashmufol', icon: 'github' },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/bashir-muhammed',
    icon: 'linkedin',
  },
  { label: 'Email', href: 'mailto:bashirmuhammed0923@gmail.com', icon: 'mail' },
]

export const contact = {
  email: 'bashirmuhammed0923@gmail.com',
  headline: "Let's connect",
  subtext:
    "Whether you're hiring, collaborating on a project, or just want to say hello — I'd love to hear from you.",
}
