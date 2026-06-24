import { Mail } from 'lucide-react'
import { contact, socialLinks } from '../data/portfolio'
import { SectionShell } from '../components/SectionShell'
import { ContactForm } from '../components/ContactForm'
import { GitHubIcon, LinkedInIcon } from '../components/SocialIcons'

const iconMap = {
  github: GitHubIcon,
  linkedin: LinkedInIcon,
  mail: Mail,
}

export function ContactSection() {
  return (
    <SectionShell
      id="contact"
      label="Contact"
      title={contact.headline}
      subtitle={contact.subtext}
      className="section-alt"
    >
      <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <p className="mb-6 text-slate-600 dark:text-slate-400">
            Prefer direct contact? Reach out through any of these channels.
          </p>
          <ul className="space-y-4">
            {socialLinks.map((link) => {
              const Icon = iconMap[link.icon]
              return (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="glass group flex items-center gap-4 rounded-xl p-4 transition-colors hover:border-copper/30"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-muted transition-colors group-hover:bg-copper/20">
                      {link.icon === 'mail' ? (
                        <Icon size={20} className="text-copper" />
                      ) : (
                        <Icon className="h-5 w-5 text-copper" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900 dark:text-white">{link.label}</p>
                      <p className="break-all text-xs text-slate-500">
                        {link.icon === 'mail' ? contact.email : link.href.replace('https://', '')}
                      </p>
                    </div>
                  </a>
                </li>
              )
            })}
          </ul>
        </div>

        <ContactForm />
      </div>
    </SectionShell>
  )
}
