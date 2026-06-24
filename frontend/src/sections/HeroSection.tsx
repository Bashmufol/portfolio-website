import { ArrowDown, Download, Mail, MapPin } from 'lucide-react'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { hero } from '../data/portfolio'
import { scrollToSection } from '../hooks/useScrollSpy'
import { Button } from '../components/Button'

function TypingTagline({ text }: { text: string }) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    let index = 0
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReduced) {
      setDisplayed(text)
      setDone(true)
      return
    }

    const interval = setInterval(() => {
      index += 1
      setDisplayed(text.slice(0, index))
      if (index >= text.length) {
        clearInterval(interval)
        setDone(true)
      }
    }, 28)

    return () => clearInterval(interval)
  }, [text])

  return (
    <p className="max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-400 md:text-xl">
      {displayed}
      {!done && <span className="ml-0.5 inline-block h-5 w-0.5 animate-pulse bg-copper" />}
    </p>
  )
}

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[100dvh] scroll-mt-0 items-center pt-16"
    >
      <div className="section-container relative py-16 sm:py-20 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-teal-muted/30 bg-teal-muted/10 px-4 py-1.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-glow opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-teal-glow" />
            </span>
            <span className="text-sm font-medium text-teal-glow">{hero.availability}</span>
          </div>

          <p className="font-mono text-sm uppercase tracking-widest text-slate-500">
            Hello, I'm
          </p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl dark:text-white md:text-7xl">
            <span className="text-gradient">{hero.name}</span>
          </h1>
          <p className="mt-4 font-mono text-lg text-copper sm:text-xl md:text-2xl">{hero.title}</p>

          <div className="mt-6">
            <TypingTagline text={hero.tagline} />
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-500">
            <span className="inline-flex items-center gap-1.5">
              <MapPin size={14} className="shrink-0 text-copper" />
              {hero.location}
            </span>
            <span className="hidden h-1 w-1 rounded-full bg-slate-border sm:block" />
            <span className="font-mono">{hero.yearsExperience}+ years experience</span>
          </div>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
            <Button className="w-full sm:w-auto" onClick={() => scrollToSection('projects')}>
              View Projects
            </Button>
            <Button href="/resume.pdf" download variant="secondary" className="w-full sm:w-auto">
              <Download size={16} />
              Download Resume
            </Button>
            <Button
              variant="ghost"
              className="w-full sm:w-auto"
              onClick={() => scrollToSection('contact')}
            >
              <Mail size={16} />
              Contact Me
            </Button>
          </div>
        </motion.div>

        <motion.button
          type="button"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          onClick={() => scrollToSection('about')}
          className="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-slate-500 transition-colors hover:text-copper sm:bottom-10"
          aria-label="Scroll to about section"
        >
          <span className="text-xs uppercase tracking-widest">Explore</span>
          <ArrowDown size={18} className="animate-bounce" />
        </motion.button>
      </div>
    </section>
  )
}
