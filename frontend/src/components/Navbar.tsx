import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { hero, navLinks, type SectionId } from '../data/portfolio'
import { scrollToSection, useScrollSpy } from '../hooks/useScrollSpy'
import { Button } from './Button'
import { ThemeToggle } from './ThemeToggle'

const sectionIds: SectionId[] = ['hero', ...navLinks.map((l) => l.id)]

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const onHome = location.pathname === '/'
  const activeSection = useScrollSpy(sectionIds)

  useEffect(() => {
    if (!mobileOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileOpen(false)
    }

    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [mobileOpen])

  const handleNavClick = (id: string) => {
    setMobileOpen(false)
    if (!onHome) {
      navigate(`/#${id}`)
      return
    }
    scrollToSection(id)
  }

  const handleLogoClick = () => {
    setMobileOpen(false)
    if (!onHome) {
      navigate('/')
      return
    }
    scrollToSection('hero')
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top)]">
      <nav
        className="glass border-b border-slate-border/40"
        aria-label="Main navigation"
      >
        <div className="section-container flex h-16 items-center justify-between">
          <button
            type="button"
            onClick={handleLogoClick}
            className="min-h-11 font-mono text-sm font-semibold text-copper transition-colors hover:text-copper-light"
          >
            {hero.name.split(' ')[0]}
            <span className="text-teal-muted">.</span>
            dev
          </button>

          <ul className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <li key={link.id}>
                <button
                  type="button"
                  onClick={() => handleNavClick(link.id)}
                  className={`min-h-11 rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
                    activeSection === link.id
                      ? 'text-copper-light'
                      : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
                  }`}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-3 md:flex">
            <ThemeToggle />
            <Button variant="secondary" onClick={() => handleNavClick('contact')}>
              Get in Touch
            </Button>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              type="button"
              className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md text-slate-600 dark:text-slate-300"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <>
            <button
              type="button"
              className="fixed inset-0 top-16 z-40 bg-slate-deep/60 backdrop-blur-sm md:hidden"
              aria-label="Close menu"
              onClick={() => setMobileOpen(false)}
            />
            <div className="relative z-50 border-t border-slate-border/40 bg-slate-deep/95 backdrop-blur-xl md:hidden">
              <ul className="section-container flex flex-col gap-1 py-4">
                {navLinks.map((link) => (
                  <li key={link.id}>
                    <button
                      type="button"
                      onClick={() => handleNavClick(link.id)}
                      className={`block min-h-11 w-full rounded-md px-3 py-3 text-left text-sm font-medium ${
                        activeSection === link.id
                          ? 'bg-slate-elevated text-copper-light'
                          : 'text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
                <li className="pt-2">
                  <Button
                    variant="primary"
                    className="w-full"
                    onClick={() => handleNavClick('contact')}
                  >
                    Get in Touch
                  </Button>
                </li>
              </ul>
            </div>
          </>
        )}
      </nav>
    </header>
  )
}
