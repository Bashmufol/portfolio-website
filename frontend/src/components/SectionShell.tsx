import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface SectionShellProps {
  id: string
  label: string
  title: string
  subtitle?: string
  children: ReactNode
  className?: string
}

export function SectionShell({
  id,
  label,
  title,
  subtitle,
  children,
  className = '',
}: SectionShellProps) {
  return (
    <section id={id} className={`scroll-mt-24 py-20 md:py-28 ${className}`}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="mb-12 md:mb-16"
        >
          <p className="font-mono text-sm font-medium uppercase tracking-widest text-teal-muted">
            {label}
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-white md:text-4xl">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-4 max-w-2xl text-lg text-slate-400">{subtitle}</p>
          )}
        </motion.div>
        {children}
      </div>
    </section>
  )
}
