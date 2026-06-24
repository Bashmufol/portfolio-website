import { ExternalLink, Layers } from 'lucide-react'
import { GitHubIcon } from './SocialIcons'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { getArchitecturePath } from '../data/architecture'
import type { Project } from '../data/portfolio'

interface ProjectCardProps {
  project: Project
  index: number
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="group glass flex flex-col rounded-xl p-5 transition-all duration-300 sm:p-6 [@media(hover:hover)]:hover:-translate-y-1 [@media(hover:hover)]:hover:border-copper/30 [@media(hover:hover)]:hover:shadow-xl [@media(hover:hover)]:hover:shadow-copper/5"
    >
      <h3 className="mb-4 text-lg font-semibold text-slate-900 group-hover:text-copper-light dark:text-white">
        {project.title}
      </h3>

      <p className="prose-readable mb-5 flex-1 text-sm text-slate-600 dark:text-slate-400">
        {project.description}
      </p>

      <div className="mb-5 flex flex-wrap gap-2">
        {project.tech.map((tech) => (
          <span
            key={tech}
            className="rounded-md bg-slate-muted/80 px-2 py-1 font-mono text-xs text-slate-700 dark:text-slate-300"
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-3 border-t border-slate-border/40 pt-4 sm:gap-x-5">
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-1.5 text-sm text-slate-600 transition-colors hover:text-copper-light dark:text-slate-400"
          >
            <GitHubIcon className="h-4 w-4 shrink-0" />
            Code
          </a>
        )}
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-1.5 text-sm text-slate-600 transition-colors hover:text-teal-glow dark:text-slate-400"
          >
            <ExternalLink size={16} className="shrink-0" />
            Live Demo
          </a>
        )}
        <Link
          to={getArchitecturePath(project.slug)}
          className="inline-flex min-h-11 items-center gap-1.5 text-sm text-slate-600 transition-colors hover:text-teal-glow dark:text-slate-400"
        >
          <Layers size={16} className="shrink-0" aria-hidden />
          <span className="sm:hidden">Architecture</span>
          <span className="hidden sm:inline">Backend architecture</span>
        </Link>
      </div>
    </motion.article>
  )
}
