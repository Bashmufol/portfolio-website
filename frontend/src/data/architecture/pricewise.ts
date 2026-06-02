import type { ProjectArchitectureDoc } from './types'

export const pricewiseArchitecture: ProjectArchitectureDoc = {
  slug: 'pricewise',
  projectTitle: 'PriceWise',
  documentTitle: 'PriceWise — Backend Architecture',
  summary:
    'Server-rendered Spring Boot application that scrapes e-commerce listings, normalises product data, and presents sorted price comparisons through Thymeleaf views.',
  sections: [
    {
      id: 'overview',
      title: '1. Overview',
      paragraphs: [
        'PriceWise is a monolithic Spring Boot service. The backend owns scraping orchestration, HTML parsing, persistence of scrape results, and MVC controllers that render Bootstrap templates.',
      ],
    },
    {
      id: 'components',
      title: '2. Core components',
      table: {
        headers: ['Layer', 'Responsibility'],
        rows: [
          ['Web (Thymeleaf)', 'Search UI, results pages, error handling'],
          ['Scraper services', 'JSoup-based fetch and parse per retailer adapter'],
          ['Domain model', 'Product, offer, retailer metadata'],
          ['Persistence', 'JPA entities for cached scrape runs (where configured)'],
        ],
      },
    },
    {
      id: 'flow',
      title: '3. Request flow',
      bullets: [
        'User submits product search from Thymeleaf form.',
        'Controller delegates to scraper service with timeout and user-agent policy.',
        'Parser extracts title, price, URL; results sorted ascending by price.',
        'Model attributes passed to view; partial failures surfaced per retailer.',
      ],
    },
    {
      id: 'stack',
      title: '4. Technology stack',
      bullets: [
        'Java, Spring Boot, Spring Web MVC',
        'Thymeleaf, Bootstrap',
        'JSoup for HTML parsing',
        'Maven',
      ],
    },
  ],
}
