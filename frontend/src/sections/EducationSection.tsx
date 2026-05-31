import { motion } from 'framer-motion'
import { Award, GraduationCap } from 'lucide-react'
import { certifications, education } from '../data/portfolio'
import { SectionShell } from '../components/SectionShell'

export function EducationSection() {
  return (
    <SectionShell
      id="education"
      label="Education"
      title="Education & certifications"
      subtitle="Formal training and industry credentials that complement hands-on engineering experience."
    >
      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-900 dark:text-white">
            <GraduationCap size={20} className="text-copper" />
            Education
          </h3>
          <div className="space-y-4">
            {education.map((item, index) => (
              <motion.div
                key={item.institution}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass rounded-xl p-5"
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">{item.degree}</p>
                    <p className="text-copper-light">{item.institution}</p>
                  </div>
                  <span className="font-mono text-sm text-slate-500">{item.period}</span>
                </div>
                {item.details && (
                  <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">{item.details}</p>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-900 dark:text-white">
            <Award size={20} className="text-teal-muted" />
            Certifications
          </h3>
          <div className="space-y-3">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-4 rounded-xl border border-slate-border/40 bg-slate-elevated/40 p-4"
              >
                <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-copper" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{cert.name}</p>
                  <p className="text-xs text-slate-500">
                    {cert.issuer} · {cert.year}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </SectionShell>
  )
}
