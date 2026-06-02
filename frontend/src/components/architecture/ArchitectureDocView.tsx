import type {
  ArchitectureSection,
  ArchitectureTable,
  ProjectArchitectureDoc,
} from '../../data/architecture/types'

function ArchitectureTableView({ table }: { table: ArchitectureTable }) {
  return (
    <div className="my-6 overflow-x-auto rounded-xl border border-slate-border/60">
      <table className="w-full min-w-[32rem] border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-slate-border/60 bg-slate-muted/60">
            {table.headers.map((header) => (
              <th
                key={header}
                className="px-4 py-3 font-semibold text-slate-900 dark:text-white"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="border-b border-slate-border/30 last:border-0"
            >
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className="px-4 py-3 align-top text-slate-600 dark:text-slate-400"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function SectionBlock({
  section,
  depth = 0,
}: {
  section: ArchitectureSection
  depth?: number
}) {
  const Heading = depth === 0 ? 'h2' : 'h3'
  const headingClass =
    depth === 0
      ? 'mt-12 text-2xl font-bold text-slate-900 first:mt-0 dark:text-white'
      : 'mt-8 text-xl font-semibold text-slate-900 dark:text-white'

  return (
    <section id={section.id} className="scroll-mt-28">
      <Heading className={headingClass}>{section.title}</Heading>

      {section.paragraphs?.map((paragraph) => (
        <p
          key={paragraph.slice(0, 48)}
          className="mt-4 text-justify leading-relaxed text-slate-600 dark:text-slate-400"
        >
          {paragraph}
        </p>
      ))}

      {section.bullets && (
        <ul className="mt-4 list-disc space-y-2 pl-6 text-slate-600 dark:text-slate-400">
          {section.bullets.map((item) => (
            <li key={item} className="leading-relaxed">
              {item}
            </li>
          ))}
        </ul>
      )}

      {section.table && <ArchitectureTableView table={section.table} />}

      {section.figures?.map((fig) => (
        <figure key={fig.id} className="my-8">
          <div className="overflow-hidden rounded-xl border border-slate-border/60 bg-slate-elevated/50 p-2">
            <img
              src={fig.src}
              alt={fig.alt}
              className="mx-auto h-auto w-full max-w-4xl"
              loading="lazy"
            />
          </div>
          <figcaption className="mt-3 text-center text-sm text-slate-500 dark:text-slate-400">
            {fig.caption}
          </figcaption>
        </figure>
      ))}

      {section.subsections?.map((sub) => (
        <SectionBlock key={sub.id} section={sub} depth={depth + 1} />
      ))}
    </section>
  )
}

export function ArchitectureDocView({ doc }: { doc: ProjectArchitectureDoc }) {
  return (
    <article className="architecture-doc">
      <header className="border-b border-slate-border/40 pb-8">
        <p className="font-mono text-sm uppercase tracking-widest text-teal-muted">
          Backend architecture
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-white md:text-4xl">
          {doc.documentTitle}
        </h1>
        {(doc.version || doc.author || doc.scope) && (
          <dl className="mt-4 flex flex-wrap gap-x-6 gap-y-1 font-mono text-xs text-slate-500">
            {doc.version && (
              <>
                <dt className="sr-only">Version</dt>
                <dd>Version {doc.version}</dd>
              </>
            )}
            {doc.scope && (
              <>
                <dt className="sr-only">Scope</dt>
                <dd>{doc.scope}</dd>
              </>
            )}
            {doc.author && (
              <>
                <dt className="sr-only">Author</dt>
                <dd>{doc.author}</dd>
              </>
            )}
          </dl>
        )}
        <p className="mt-6 text-lg leading-relaxed text-slate-600 dark:text-slate-400">
          {doc.summary}
        </p>
        {doc.pdfDownloadHref && (
          <p className="mt-4">
            <a
              href={doc.pdfDownloadHref}
              download
              className="inline-flex items-center gap-2 text-sm font-medium text-copper hover:text-copper-light"
            >
              Download original PDF
            </a>
          </p>
        )}
      </header>

      <div className="mt-10">
        {doc.sections.map((section) => (
          <SectionBlock key={section.id} section={section} />
        ))}
      </div>
    </article>
  )
}
