import type { ProjectArchitectureDoc } from './types'
import { authenticationApiArchitecture } from './authentication-api'
import { legallyArchitecture } from './legally'
import { pricewiseArchitecture } from './pricewise'

const architectureBySlug: Record<string, ProjectArchitectureDoc> = {
  legally: legallyArchitecture,
  pricewise: pricewiseArchitecture,
  'authentication-api': authenticationApiArchitecture,
}

export function getArchitectureBySlug(
  slug: string | undefined,
): ProjectArchitectureDoc | undefined {
  if (!slug) return undefined
  return architectureBySlug[slug]
}

export function getArchitecturePath(slug: string): string {
  return `/projects/${slug}/architecture`
}

export { legallyArchitecture, pricewiseArchitecture, authenticationApiArchitecture }
export type { ProjectArchitectureDoc } from './types'
