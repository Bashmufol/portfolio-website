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
}

export interface Education {
  institution: string
  degree: string
  period: string
  details?: string
}

export interface Accomplishment {
  title: string
  description: string
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

What I enjoy most is the day-to-day engineering: cleaning up code so the next person can follow it, learning from senior developers, and doing my part in CI/CD so features ship on time. I pick things up quickly, I communicate clearly, and I'm looking for a team where I can keep growing as a backend engineer.`,
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
    company: 'Sysserve',
    role: 'Java Backend Developer',
    period: 'Dec 2022 — Jul 2025',
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
    company: 'IRL IT Solutions',
    role: 'Computer Operator',
    period: 'Jul 2019 — Sep 2021',
    location: 'Kaduna, Nigeria',
    highlights: [
      'Conducted ICT training sessions for clients.',
      'Provided technical troubleshooting for computer systems, reducing system downtime.',
      'Collaborated with the IT team to resolve system and database issues.',
      'Operated and maintained computer systems for CBT services.',
      'Provided front-desk technical assistance, enhancing client satisfaction through clear communication and effective problem resolution.',
    ],
  },
]

export const projects: Project[] = [
  {
    title: 'Legally',
    description:
      'Legally is a web app that helps people understand everyday legal questions (tenancy, land, employment, police encounters, and more) in plain language. It is not a substitute for a lawyer, but a starting point for clarity. Legally lets users describe a situation by text, voice, or uploads such as photos and PDFs. The app works out which country and region apply, runs research through a chain of AI providers with fallback when one fails, and returns a summary, legal points with source links where possible, practical steps, and contacts for relevant organisations. Voice and files are processed so the system can respond to real evidence, not only typed questions. Sessions and uploads expire after inactivity so data is not kept without use.',
    tech: ['Java 21', 'Spring Boot 4', 'Spring AI', 'Firebase', 'Google Cloud', 'JUnit', 'Docker'],
    github: 'https://github.com/Bashmufol/Legally',
    demo: 'https://legally-7f34d.web.app/',
  },
  {
    title: 'PriceWise',
    description:
      'Product price comparison web app that scrapes e-commerce sites with JSoup, sorts results by price, and helps users find the best deals quickly.',
    tech: ['Spring Boot', 'Thymeleaf', 'Bootstrap', 'JSoup'],
    github: 'https://github.com/bashmufol',
  },
  {
    title: 'Authentication API',
    description:
      'Secure authentication API with JWT-based login and session handling, user management, and token-based password reset.',
    tech: ['Spring Boot', 'Spring Security', 'JWT', 'MySQL'],
    github: 'https://github.com/bashmufol',
  },
]

export const education: Education[] = [
  {
    institution: 'University of Ilorin, Nigeria',
    degree: 'Bachelor of Science',
    period: 'Expected Oct 2026',
    details:
      'Relevant coursework: Data Structures, Algorithms, Database Systems. Technical project: built a Java-based inventory system for lab samples, reducing entry errors.',
  },
]

export const accomplishments: Accomplishment[] = [
  {
    title: 'AAF Scholarship Beneficiary',
    description: 'Awarded for academic excellence and leadership potential.',
  },
  {
    title: 'Organizing Member, Google Developer Student Clubs',
    description:
      'Contributed to planning, coordinating, and executing impactful tech events and initiatives for the student developer community.',
  },
  {
    title: "NSBS Students' Representative Council Leadership Award",
    description:
      'Honored for student leadership roles and initiatives impacting 800+ students.',
  },
]

export const socialLinks: SocialLink[] = [
  { label: 'GitHub', href: 'https://github.com/bashmufol', icon: 'github' },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/bashir-muhammed',
    icon: 'linkedin',
  },
  { label: 'Email', href: 'mailto:bashmufol@gmail.com', icon: 'mail' },
]

export const contact = {
  email: 'bashmufol@gmail.com',
  headline: "Let's connect",
  subtext:
    "Whether you're hiring, collaborating on a project, or just want to say hello — I'd love to hear from you.",
}
