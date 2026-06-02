export interface ArchitectureFigure {
  id: string
  caption: string
  src: string
  alt: string
}

export interface ArchitectureTable {
  headers: string[]
  rows: string[][]
}

export interface ArchitectureSection {
  id: string
  title: string
  paragraphs?: string[]
  bullets?: string[]
  table?: ArchitectureTable
  figures?: ArchitectureFigure[]
  subsections?: ArchitectureSection[]
}

export interface ProjectArchitectureDoc {
  slug: string
  projectTitle: string
  documentTitle: string
  version?: string
  author?: string
  scope?: string
  summary: string
  pdfDownloadHref?: string
  sections: ArchitectureSection[]
}
