import { motion } from 'framer-motion'
import { skillCategories } from '../data/portfolio'
import { SectionShell } from '../components/SectionShell'
import { SkillBar } from '../components/SkillBar'

export function SkillsSection() {
  return (
    <SectionShell
      id="skills"
      label="Skills"
      title="Technical expertise"
      subtitle="A deep toolkit spanning the Java ecosystem, cloud infrastructure, and modern engineering practices."
      className="section-alt"
    >
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {skillCategories.map((category, catIndex) => (
          <motion.div
            key={category.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: catIndex * 0.1 }}
            className="glass rounded-xl p-6"
          >
            <h3 className="mb-6 flex items-center gap-2 font-mono text-sm font-semibold uppercase tracking-wider text-copper">
              <span className="h-px w-6 bg-copper/50" />
              {category.name}
            </h3>
            <div className="space-y-4">
              {category.skills.map((skill, skillIndex) => (
                <SkillBar
                  key={skill.name}
                  name={skill.name}
                  level={skill.level}
                  delay={catIndex * 0.1 + skillIndex * 0.05}
                />
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </SectionShell>
  )
}
