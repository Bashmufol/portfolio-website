import { motion } from 'framer-motion'
import { Briefcase } from 'lucide-react'
import type { Experience } from '../data/portfolio'

interface ExperienceTimelineProps {
  experiences: Experience[]
}

export function ExperienceTimeline({ experiences }: ExperienceTimelineProps) {
  return (
    <div className="relative">
      <div
        className="absolute bottom-0 left-[19px] top-0 w-px bg-gradient-to-b from-copper/50 via-slate-border to-transparent md:left-1/2 md:-translate-x-px"
        aria-hidden
      />

      <div className="space-y-12">
        {experiences.map((exp, index) => (
          <motion.div
            key={`${exp.company}-${exp.period}`}
            initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`relative flex flex-col gap-6 md:flex-row ${
              index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
            }`}
          >
            <div className="hidden flex-1 md:block" />

            <div className="absolute left-0 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-copper/40 bg-slate-elevated md:left-1/2 md:-translate-x-1/2">
              <Briefcase size={16} className="text-copper" />
            </div>

            <div className="glass ml-14 flex-1 rounded-xl p-6 md:ml-0">
              <div className="mb-4 flex flex-wrap items-start justify-between gap-2">
                <div>
                  <h3 className="text-lg font-semibold text-white">{exp.role}</h3>
                  <p className="text-copper-light">{exp.company}</p>
                </div>
                <div className="text-right">
                  <p className="font-mono text-sm text-slate-400">{exp.period}</p>
                  <p className="text-xs text-slate-500">{exp.location}</p>
                </div>
              </div>
              <ul className="space-y-2">
                {exp.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="flex gap-2 text-sm leading-relaxed text-slate-400"
                  >
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-teal-muted" />
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
