import { ArrowLeft } from 'lucide-react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { ArchitectureDocView } from '../components/architecture/ArchitectureDocView'
import { getArchitectureBySlug } from '../data/architecture'
import { projects } from '../data/portfolio'

export function ProjectArchitecturePage() {
  const { slug } = useParams<{ slug: string }>()
  const doc = getArchitectureBySlug(slug)
  const project = projects.find((p) => p.slug === slug)

  if (!doc || !project) {
    return <Navigate to="/#projects" replace />
  }

  return (
    <div className="section-container py-28 md:py-32">
      <Link
        to="/#projects"
        className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition-colors hover:text-copper-light dark:text-slate-400"
      >
        <ArrowLeft size={16} aria-hidden />
        Back to projects
      </Link>

      <p className="mb-2 font-mono text-sm text-copper">{project.title}</p>

      <ArchitectureDocView doc={doc} />
    </div>
  )
}
