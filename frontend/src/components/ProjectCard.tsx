import { ExternalLink } from 'lucide-react'
import { GitHubIcon } from './SocialIcons'
import { motion } from 'framer-motion'
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
      className="group glass flex flex-col rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-copper/30 hover:shadow-xl hover:shadow-copper/5"
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <h3 className="text-lg font-semibold text-slate-900 group-hover:text-copper-light dark:text-white">
          {project.title}
        </h3>
        <span className="shrink-0 rounded-full border border-teal-muted/30 bg-teal-muted/10 px-2.5 py-0.5 font-mono text-xs text-teal-glow">
          {project.category}
        </span>
      </div>

      <p className="mb-5 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
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

      <div className="flex gap-3 border-t border-slate-border/40 pt-4">
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-slate-600 transition-colors hover:text-copper-light dark:text-slate-400"
          >
            <GitHubIcon className="h-4 w-4" />
            Code
          </a>
        )}
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-slate-600 transition-colors hover:text-teal-glow dark:text-slate-400"
          >
            <ExternalLink size={16} />
            Live Demo
          </a>
        )}
      </div>
    </motion.article>
  )
}
