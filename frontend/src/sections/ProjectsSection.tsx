import { projects } from '../data/portfolio'
import { SectionShell } from '../components/SectionShell'
import { ProjectCard } from '../components/ProjectCard'

export function ProjectsSection() {
  return (
    <SectionShell
      id="projects"
      label="Projects"
      title="Selected work"
      subtitle="Representative projects showcasing API design, microservices architecture, and production-ready delivery."
      className="section-alt"
    >
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <ProjectCard key={project.title} project={project} index={index} />
        ))}
      </div>
    </SectionShell>
  )
}
