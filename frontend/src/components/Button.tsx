import type { ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
  href?: string
  onClick?: () => void
  type?: 'button' | 'submit'
  disabled?: boolean
  className?: string
  download?: boolean
}

const variants = {
  primary:
    'bg-copper text-white hover:bg-copper-light shadow-lg shadow-copper/20 dark:text-slate-deep',
  secondary:
    'border border-slate-border bg-slate-elevated/80 text-slate-700 hover:border-copper/50 hover:text-copper-light dark:text-slate-200',
  ghost:
    'text-slate-600 hover:text-copper-light hover:bg-slate-elevated/50 dark:text-slate-300',
}

export function Button({
  children,
  variant = 'primary',
  href,
  onClick,
  type = 'button',
  disabled,
  className = '',
  download,
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${className}`

  if (href) {
    const isExternal = href.startsWith('http')
    return (
      <a
        href={href}
        className={classes}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        download={download}
        onClick={onClick}
      >
        {children}
      </a>
    )
  }

  return (
    <button type={type} className={classes} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  )
}
