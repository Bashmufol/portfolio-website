import { motion } from 'framer-motion'
import { CheckCircle2, Code2 } from 'lucide-react'
import { about, hero } from '../data/portfolio'
import { SectionShell } from '../components/SectionShell'

export function AboutSection() {
  return (
    <SectionShell
      id="about"
      label="About"
      title="Engineering with purpose"
      subtitle="Passionate about building systems that are reliable, maintainable, and deliver real value."
    >
      <div className="grid items-center gap-12 lg:grid-cols-[280px_1fr]">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto lg:mx-0"
        >
          <div className="relative aspect-square w-64 overflow-hidden rounded-2xl border border-slate-border/60 bg-slate-elevated lg:w-72">
            <div className="absolute inset-0 bg-gradient-to-br from-copper/20 via-transparent to-teal-muted/20" />
            <div className="flex h-full flex-col items-center justify-center gap-3 p-6">
              <div className="flex h-24 w-24 items-center justify-center rounded-full border border-copper/30 bg-slate-muted">
                <Code2 size={40} className="text-copper" />
              </div>
              <p className="text-center font-mono text-xs text-slate-500">
                Replace with your photo
              </p>
            </div>
          </div>
          <div className="mt-4 text-center lg:text-left">
            <p className="font-semibold text-slate-900 dark:text-white">{hero.name}</p>
            <p className="text-sm text-slate-500">{hero.location}</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="space-y-4 leading-relaxed text-slate-600 dark:text-slate-400">
            {about.summary.split('\n\n').map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </div>

          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {about.highlights.map((item, index) => (
              <motion.li
                key={item}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="flex gap-3 rounded-lg border border-slate-border/40 bg-slate-elevated/40 p-4 text-sm text-slate-700 dark:text-slate-300"
              >
                <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-teal-muted" />
                {item}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </SectionShell>
  )
}
