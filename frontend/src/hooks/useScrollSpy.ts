import { useEffect, useState } from 'react'
import type { SectionId } from '../data/portfolio'

export function useScrollSpy(sectionIds: SectionId[], offset = 120) {
  const [activeSection, setActiveSection] = useState<SectionId>(sectionIds[0])

  useEffect(() => {
    const handleScroll = () => {
      let current: SectionId = sectionIds[0]

      for (const id of sectionIds) {
        const element = document.getElementById(id)
        if (!element) continue

        const top = element.getBoundingClientRect().top
        if (top - offset <= 0) {
          current = id
        }
      }

      setActiveSection(current)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [sectionIds, offset])

  return activeSection
}

export function scrollToSection(id: string) {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
