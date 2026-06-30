import { projects } from '../data/portfolio'
import { SectionShell } from '../components/SectionShell'
import { ProjectCard } from '../components/ProjectCard'

export function ProjectsSection() {
  return (
    <SectionShell
      id="projects"
      label="Projects"
      title="Selected work"
      subtitle="A selection of backend systems I've designed and shipped in Java and Spring Boot, each built for live use with reliable and solid API design, clean integrations, and maintainable code."
      className="section-alt"
    >
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project, index) => (
          <ProjectCard key={project.slug} project={project} index={index} />
        ))}
      </div>
    </SectionShell>
  )
}
