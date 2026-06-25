import { motion } from 'framer-motion'
import { GraduationCap } from 'lucide-react'
import { education } from '../data/portfolio'
import { SectionShell } from '../components/SectionShell'

export function EducationSection() {
  return (
    <SectionShell
      id="education"
      label="Education"
      title="Education"
      subtitle="Academic background and technical foundation."
    >
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
    </SectionShell>
  )
}
