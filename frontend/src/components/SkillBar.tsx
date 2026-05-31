import { motion } from 'framer-motion'

interface SkillBarProps {
  name: string
  level: number
  delay?: number
}

export function SkillBar({ name, level, delay = 0 }: SkillBarProps) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-sm">
        <span className="font-medium text-slate-200">{name}</span>
        <span className="font-mono text-xs text-slate-500">{level}%</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-slate-muted">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-copper to-teal-muted"
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}
