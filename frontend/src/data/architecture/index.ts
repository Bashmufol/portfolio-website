import type { ProjectArchitectureDoc } from './types'
import { evochargeArchitecture } from './evocharge'
import { legallyArchitecture } from './legally'
import { terratradeArchitecture } from './terratrade'

const architectureBySlug: Record<string, ProjectArchitectureDoc> = {
  legally: legallyArchitecture,
  terratrade: terratradeArchitecture,
  evocharge: evochargeArchitecture,
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

export { legallyArchitecture, terratradeArchitecture, evochargeArchitecture }
export type { ProjectArchitectureDoc } from './types'
