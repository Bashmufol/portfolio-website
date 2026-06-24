import { useLocation, useNavigate } from 'react-router-dom'
import { hero, navLinks } from '../data/portfolio'
import { scrollToSection } from '../hooks/useScrollSpy'

export function Footer() {
  const year = new Date().getFullYear()
  const location = useLocation()
  const navigate = useNavigate()
  const onHome = location.pathname === '/'

  const handleNavClick = (id: string) => {
    if (!onHome) {
      navigate(`/#${id}`)
      return
    }
    scrollToSection(id)
  }

  return (
    <footer className="border-t border-slate-border/40 bg-slate-deep/80 py-12 pb-[calc(3rem+env(safe-area-inset-bottom))]">
      <div className="section-container">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="font-mono text-sm font-semibold text-copper">
              {hero.name}
            </p>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-500">{hero.title}</p>
          </div>

          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap gap-x-6 gap-y-3">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <button
                    type="button"
                    onClick={() => handleNavClick(link.id)}
                    className="min-h-11 text-sm text-slate-600 transition-colors hover:text-copper-light dark:text-slate-400"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-slate-border/30 pt-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {year} {hero.name}. All rights reserved.</p>
          <p className="font-mono text-xs">React · TypeScript · Tailwind CSS</p>
        </div>
      </div>
    </footer>
  )
}
