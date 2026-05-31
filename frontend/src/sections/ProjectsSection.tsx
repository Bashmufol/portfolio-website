import { useMemo, useState } from 'react'
import { projects } from '../data/portfolio'
import { SectionShell } from '../components/SectionShell'
import { ProjectCard } from '../components/ProjectCard'

type Filter = 'all' | 'backend' | 'fullstack'

const filters: { value: Filter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'backend', label: 'Backend' },
  { value: 'fullstack', label: 'Full-stack' },
]

export function ProjectsSection() {
  const [filter, setFilter] = useState<Filter>('all')

  const filtered = useMemo(
    () => (filter === 'all' ? projects : projects.filter((p) => p.category === filter)),
    [filter],
  )

  return (
    <SectionShell
      id="projects"
      label="Projects"
      title="Selected work"
      subtitle="Representative projects showcasing API design, microservices architecture, and production-ready delivery."
      className="bg-slate-elevated/20"
    >
      <div className="mb-8 flex flex-wrap gap-2">
        {filters.map(({ value, label }) => (
          <button
            key={value}
            type="button"
            onClick={() => setFilter(value)}
            className={`rounded-lg px-4 py-2 font-mono text-sm font-medium transition-all ${
              filter === value
                ? 'bg-copper text-slate-deep shadow-lg shadow-copper/20'
                : 'border border-slate-border bg-slate-elevated/50 text-slate-400 hover:border-copper/30 hover:text-slate-200'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((project, index) => (
          <ProjectCard key={project.title} project={project} index={index} />
        ))}
      </div>
    </SectionShell>
  )
}
