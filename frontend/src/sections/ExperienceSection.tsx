import { experiences } from '../data/portfolio'
import { SectionShell } from '../components/SectionShell'
import { ExperienceTimeline } from '../components/ExperienceTimeline'

export function ExperienceSection() {
  return (
    <SectionShell
      id="experience"
      label="Experience"
      title="Professional journey"
      subtitle="A track record of delivering scalable, production-grade backend systems that power high-traffic applications and complex business workflows."
    >
      <ExperienceTimeline experiences={experiences} />
    </SectionShell>
  )
}
