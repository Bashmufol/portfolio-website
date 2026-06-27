import { motion } from 'framer-motion'
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
      <div className="grid items-center gap-10 md:grid-cols-[minmax(0,240px)_1fr] md:gap-12 lg:grid-cols-[280px_1fr]">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto w-full max-w-xs md:mx-0 md:max-w-none"
        >
          <div className="relative mx-auto aspect-square w-full max-w-[16rem] overflow-hidden rounded-2xl border border-slate-border/60 bg-slate-elevated sm:max-w-xs lg:max-w-[18rem]">
            <img
              src="/Profile.jpg"
              alt={`Portrait of ${hero.name}`}
              className="h-full w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-copper/10 via-transparent to-teal-muted/10" />
          </div>
          <div className="mt-4 text-center md:text-left">
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
          <div className="prose-readable space-y-4 text-slate-600 dark:text-slate-400">
            {about.summary.split('\n\n').map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </div>
        </motion.div>
      </div>
    </SectionShell>
  )
}
