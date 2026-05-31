import { experiences } from '../data/portfolio'
import { SectionShell } from '../components/SectionShell'
import { ExperienceTimeline } from '../components/ExperienceTimeline'

export function ExperienceSection() {
  return (
    <SectionShell
      id="experience"
      label="Experience"
      title="Professional journey"
      subtitle="A track record of delivering impactful backend solutions across fintech, SaaS, and data platforms."
    >
      <ExperienceTimeline experiences={experiences} />
    </SectionShell>
  )
}
