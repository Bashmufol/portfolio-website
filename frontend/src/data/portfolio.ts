// Replace placeholder content below with your personal details.

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
  title: string
  description: string
  tech: string[]
  github?: string
  demo?: string
  category: 'backend' | 'fullstack'
}

export interface Education {
  institution: string
  degree: string
  period: string
  details?: string
}

export interface Certification {
  name: string
  issuer: string
  year: string
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
  name: 'Alex Morgan',
  title: 'Java Backend Engineer',
  tagline:
    'Building resilient, scalable systems with Spring Boot, clean architecture, and a focus on measurable business impact.',
  availability: 'Open to opportunities',
  location: 'San Francisco, CA',
  yearsExperience: 6,
}

export const about = {
  summary: `I'm a backend engineer specializing in Java and the Spring ecosystem. I design and deliver production-grade APIs, microservices, and data pipelines that power high-traffic enterprise applications.

My approach combines solid domain modeling, test-driven development, and pragmatic DevOps — ensuring systems are not only well-architected but also operable in production. I thrive in collaborative teams where code quality and clear communication matter.`,
  highlights: [
    '6+ years building REST APIs & event-driven microservices',
    'Deep expertise in Spring Boot, JPA/Hibernate, and PostgreSQL',
    'Experience with CI/CD, Docker, Kubernetes, and AWS',
    'Strong advocate for clean code, code reviews, and mentoring',
  ],
}

export const skillCategories: SkillCategory[] = [
  {
    name: 'Languages',
    skills: [
      { name: 'Java', level: 95 },
      { name: 'Kotlin', level: 70 },
      { name: 'SQL', level: 90 },
      { name: 'TypeScript', level: 65 },
    ],
  },
  {
    name: 'Frameworks',
    skills: [
      { name: 'Spring Boot', level: 95 },
      { name: 'Spring Security', level: 85 },
      { name: 'Spring Data JPA', level: 90 },
      { name: 'Hibernate', level: 85 },
    ],
  },
  {
    name: 'Tools & Platforms',
    skills: [
      { name: 'PostgreSQL', level: 90 },
      { name: 'Redis', level: 80 },
      { name: 'Docker', level: 85 },
      { name: 'Kubernetes', level: 75 },
      { name: 'AWS', level: 80 },
      { name: 'Kafka', level: 75 },
    ],
  },
  {
    name: 'Practices',
    skills: [
      { name: 'REST API Design', level: 95 },
      { name: 'TDD / JUnit', level: 90 },
      { name: 'CI/CD', level: 85 },
      { name: 'Agile / Scrum', level: 90 },
    ],
  },
]

export const experiences: Experience[] = [
  {
    company: 'FinTech Solutions Inc.',
    role: 'Senior Java Backend Engineer',
    period: '2022 — Present',
    location: 'Remote',
    highlights: [
      'Led migration of monolithic payment service to 8 Spring Boot microservices, reducing deployment time by 70%.',
      'Designed event-driven order processing pipeline handling 50K+ transactions/day with Kafka and idempotent consumers.',
      'Introduced contract testing and improved API test coverage from 62% to 91%.',
    ],
  },
  {
    company: 'CloudScale Systems',
    role: 'Java Backend Developer',
    period: '2019 — 2022',
    location: 'San Francisco, CA',
    highlights: [
      'Built multi-tenant SaaS APIs serving 200+ enterprise clients with Spring Boot and PostgreSQL.',
      'Optimized critical query paths, cutting p99 latency from 800ms to 120ms.',
      'Mentored 3 junior developers on Spring best practices and code review standards.',
    ],
  },
  {
    company: 'DataFlow Analytics',
    role: 'Junior Java Developer',
    period: '2018 — 2019',
    location: 'Oakland, CA',
    highlights: [
      'Developed REST endpoints and batch jobs for ETL pipelines processing 2M+ records daily.',
      'Implemented JWT-based authentication and role-based access control.',
      'Contributed to migration from Java 8 to Java 11 with zero production incidents.',
    ],
  },
]

export const projects: Project[] = [
  {
    title: 'OrderFlow Microservices',
    description:
      'Event-driven order management platform with saga orchestration, dead-letter handling, and observability dashboards.',
    tech: ['Java 21', 'Spring Boot 3', 'Kafka', 'PostgreSQL', 'Redis'],
    github: 'https://github.com',
    category: 'backend',
  },
  {
    title: 'AuthGateway API',
    description:
      'Centralized OAuth2/OIDC authorization server with JWT issuance, refresh token rotation, and rate limiting.',
    tech: ['Spring Security', 'Spring Boot', 'Redis', 'PostgreSQL'],
    github: 'https://github.com',
    demo: 'https://example.com',
    category: 'backend',
  },
  {
    title: 'InventorySync Service',
    description:
      'Real-time inventory synchronization across warehouses with optimistic locking and conflict resolution.',
    tech: ['Java', 'Spring Data JPA', 'RabbitMQ', 'Docker'],
    github: 'https://github.com',
    category: 'backend',
  },
  {
    title: 'DevPortal Platform',
    description:
      'Internal developer portal with API documentation, service catalog, and deployment status — full-stack delivery.',
    tech: ['Spring Boot', 'React', 'PostgreSQL', 'Kubernetes'],
    github: 'https://github.com',
    demo: 'https://example.com',
    category: 'fullstack',
  },
  {
    title: 'MetricsCollector',
    description:
      'Lightweight metrics aggregation service with Prometheus exporters and custom Micrometer dashboards.',
    tech: ['Spring Boot', 'Micrometer', 'Prometheus', 'Grafana'],
    github: 'https://github.com',
    category: 'backend',
  },
  {
    title: 'TaskBoard API',
    description:
      'Kanban-style project management REST API with WebSocket notifications and team collaboration features.',
    tech: ['Spring Boot', 'WebSocket', 'PostgreSQL', 'React'],
    github: 'https://github.com',
    demo: 'https://example.com',
    category: 'fullstack',
  },
]

export const education: Education[] = [
  {
    institution: 'University of California, Berkeley',
    degree: 'B.S. Computer Science',
    period: '2014 — 2018',
    details: 'Focus on software engineering and distributed systems.',
  },
]

export const certifications: Certification[] = [
  { name: 'Oracle Certified Professional: Java SE 17 Developer', issuer: 'Oracle', year: '2023' },
  { name: 'Spring Professional Certification', issuer: 'VMware Tanzu', year: '2022' },
  { name: 'AWS Certified Developer – Associate', issuer: 'Amazon Web Services', year: '2021' },
]

export const socialLinks: SocialLink[] = [
  { label: 'GitHub', href: 'https://github.com', icon: 'github' },
  { label: 'LinkedIn', href: 'https://linkedin.com', icon: 'linkedin' },
  { label: 'Email', href: 'mailto:alex.morgan@example.com', icon: 'mail' },
]

export const contact = {
  email: 'alex.morgan@example.com',
  headline: "Let's build something great together",
  subtext:
    "Whether you have a role in mind, a project to discuss, or just want to connect — I'd love to hear from you.",
}
