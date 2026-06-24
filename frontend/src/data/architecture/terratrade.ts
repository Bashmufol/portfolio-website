import type { ProjectArchitectureDoc } from './types'

const figure = (
  id: string,
  caption: string,
  page: number,
): { id: string; caption: string; src: string; alt: string } => ({
  id,
  caption,
  src: `/architecture/terratrade/page-${page}.png`,
  alt: caption,
})

export const terratradeArchitecture: ProjectArchitectureDoc = {
  slug: 'terratrade',
  projectTitle: 'Terratrade',
  documentTitle: 'Terratrade Backend — System Design Document',
  version: '1.0',
  author: 'Bashir Muhammed',
  scope: 'Spring Boot API (Terratrade API)',
  summary:
    'Role-based REST API for cross-border agricultural trade: harvest listings, geo-based sourcing, export batching, compliance document review, RFQ matching, escrow payments, and traceability — built with Java 21, Spring Boot 4, PostgreSQL + PostGIS, and JWT security.',
  pdfDownloadHref: '/architecture/terratrade/Terratrade-Backend-System-Design.pdf',
  sections: [
    {
      id: 'purpose',
      title: '1. Purpose and scope',
      paragraphs: [
        'Terratrade is a cross-border agricultural trade platform. The backend exposes a REST API that supports three user roles: farmer, aggregator, and international buyer. It handles harvest listings, geo-based sourcing, export batching, compliance document review, RFQ matching, escrow payments, and activity notifications.',
        'This document describes the backend only: architecture, modules, data model, security, integrations, and deployment. It is intended for engineers reviewing the system design or onboarding to the codebase.',
      ],
    },
    {
      id: 'system-context',
      title: '2. System context',
      paragraphs: [
        'The API sits between client applications and external services. All business state is stored in PostgreSQL. File uploads are served through a storage abstraction. Payment and document analysis are delegated to integration services.',
      ],
      figures: [
        figure(
          'fig-1',
          'Figure 1: System context — clients call the API; the API persists data and calls external services.',
          1,
        ),
      ],
    },
    {
      id: 'stack',
      title: '3. Technology stack',
      table: {
        headers: ['Layer', 'Technology', 'Role'],
        rows: [
          ['Runtime', 'Java 21', 'Language and JVM runtime'],
          ['Framework', 'Spring Boot 4.0.6', 'REST API, DI, configuration'],
          ['Persistence', 'Spring Data JPA, Hibernate', 'ORM and repositories'],
          ['Database', 'PostgreSQL + PostGIS', 'Relational data and geo queries'],
          ['Migrations', 'Flyway', 'Versioned schema (V1, V2)'],
          ['Security', 'Spring Security, JWT (JJWT)', 'Stateless authentication'],
          ['API docs', 'Springdoc OpenAPI', 'Swagger UI at /swagger-ui'],
          ['Integrations', 'RestClient, Spring AI', 'Payments, document analysis'],
          ['Build', 'Maven', 'Dependency management and packaging'],
          ['Deploy', 'Docker, Fly.io', 'Container hosting with volume for uploads'],
        ],
      },
    },
    {
      id: 'layered',
      title: '4. Layered architecture',
      paragraphs: [
        'The backend follows a conventional Spring layered design. Controllers handle HTTP. Services hold business rules and orchestration. Repositories access the database. Integration packages isolate third-party calls. DTO records decouple API contracts from JPA entities.',
      ],
      figures: [
        figure(
          'fig-2',
          'Figure 2: Layered backend architecture.',
          2,
        ),
      ],
    },
    {
      id: 'packages',
      title: '5. Package structure',
      table: {
        headers: ['Package', 'Responsibility'],
        rows: [
          ['web', 'REST controllers, request mapping, validation entry points'],
          ['service', 'Business logic, transactions, orchestration across repositories'],
          ['repository', 'Spring Data JPA interfaces and custom queries'],
          ['domain.entity', 'JPA entity classes mapped to tables'],
          ['domain.enums', 'Status enums: harvest, batch, escrow, compliance'],
          ['dto', 'Java records for API request and response shapes'],
          ['security', 'JWT filter, security config, user principal'],
          ['integration.opay', 'Checkout and payout HTTP clients'],
          ['integration.gemini', 'Compliance document audit via Spring AI'],
          ['exception', 'Global exception handler, ApiException'],
          ['seed', 'DemoDataSeeder for pitch and local testing'],
        ],
      },
    },
    {
      id: 'api-surface',
      title: '6. API surface (by domain)',
      table: {
        headers: ['Prefix', 'Controller', 'Domain'],
        rows: [
          ['/api/v1/auth', 'AuthController', 'Register, login, JWT issuance'],
          ['/api/v1/farmer', 'FarmerController', 'Plots, harvests, watches, sales'],
          ['/api/v1/aggregator', 'AggregatorController', 'Sourcing, cart, batches, RFQs'],
          ['/api/v1/buyer', 'BuyerPortalController', 'Marketplace, orders, watches'],
          ['/api/v1/rfqs', 'BuyerController', 'RFQ CRUD, interest, award'],
          ['/api/v1/escrow', 'EscrowController', 'Local and global escrow flows'],
          ['/api/v1/batches', 'BatchController', 'Batch build, transparency, scorecard'],
          ['/api/v1/batches/{id}/documents', 'ComplianceController', 'Document upload and audit'],
          ['/api/v1/demo', 'DemoController', 'Demo data reset and seed (public)'],
          ['/api/v1/webhooks', 'OpayWebhookController', 'Payment callback handling'],
          ['/api/v1/catalog', 'CatalogController', 'Crops, states (public)'],
          ['/api/v1/files', 'FileController', 'Serve uploaded documents and images'],
        ],
      },
    },
    {
      id: 'security',
      title: '7. Security architecture',
      paragraphs: [
        'Authentication is stateless. The client sends a Bearer JWT on protected routes. Spring Security validates the token, loads the user, and attaches a role-aware principal. Passwords are hashed with BCrypt at registration.',
        'Public endpoints (no JWT): /api/v1/auth/**, /api/v1/demo/**, /api/v1/catalog/**, /api/v1/webhooks/** (payment callbacks), /actuator/health, Swagger UI, GET /api/v1/files/**.',
        'Role checks are enforced in services and through method security where needed. CORS origins are configured via environment variable CORS_ORIGINS.',
      ],
      figures: [
        figure(
          'fig-3',
          'Figure 3: Request path for authenticated API calls.',
          3,
        ),
      ],
    },
    {
      id: 'data-model',
      title: '8. Data model overview',
      paragraphs: [
        'The schema is defined in Flyway migrations. V1 creates the baseline tables. V2 adds PostGIS boundaries, plot location triggers, and geo alert columns. Hibernate validates the schema at startup (ddl-auto=validate).',
      ],
      table: {
        headers: ['Table group', 'Tables'],
        rows: [
          ['Catalog', 'crop_catalog, state_region'],
          ['Users', 'users'],
          ['Farmer', 'farm_plot, harvest_listing, harvest_attachment, demand_watch'],
          ['Aggregator', 'buying_post, cart_item, batch, batch_contribution'],
          ['Buyer', 'buyer_rfq, rfq_interest, buyer_batch_watch, sample_request'],
          ['Payments', 'escrow_transaction, escrow_cart_link, payment_payout'],
          ['Compliance', 'compliance_document, rfq_document'],
          ['Audit', 'platform_activity, audit_log, harvest_change_log'],
        ],
      },
      figures: [
        figure(
          'fig-4',
          'Figure 4: Core entity relationships (simplified).',
          3,
        ),
      ],
    },
    {
      id: 'local-escrow',
      title: '9. Core workflow: local escrow (aggregator to farmer)',
      paragraphs: [
        'Local escrow protects farmers and aggregators during domestic sourcing. The aggregator adds harvests to a cart, funds escrow through the payment gateway, and confirms delivery. The service then triggers split payouts to farmers.',
        'EscrowService orchestrates cart validation, payment, milestone updates, and payout records.',
        'Escrow milestones progress through BOOKED, DELIVERED, COMPLIANT, and RELEASED. Each transition is logged in audit_log. Mock mode allows demo checkout without live payment credentials.',
      ],
      figures: [
        figure(
          'fig-5',
          'Figure 5: Local escrow milestone flow.',
          4,
        ),
      ],
    },
    {
      id: 'compliance',
      title: '10. Core workflow: export batch and compliance',
      paragraphs: [
        'After harvests are purchased, the aggregator builds a batch from paid cart items. Documents are uploaded per crop checklist. The compliance service sends PDFs to the LLM integration, stores extracted fields and flags, and computes a scorecard. Batches reach EXPORT_READY when the score threshold is met.',
      ],
      figures: [
        figure(
          'fig-6',
          'Figure 6: Compliance vault processing pipeline.',
          4,
        ),
      ],
    },
    {
      id: 'geo',
      title: '11. Geo and traceability',
      bullets: [
        'Plot pin validation against state boundary polygons',
        'Radius harvest search with ST_DWithin from aggregator hub',
        'Batch transparency footprint (convex hull across contributing plots)',
        'Geo-filtered demand and batch watches',
        'Database trigger keeps farm_plot.location geometry in sync with latitude and longitude for origin proof and buyer transparency maps',
      ],
      paragraphs: [
        'GeoService uses JDBC against PostGIS for operations that go beyond standard JPA queries.',
      ],
    },
    {
      id: 'integrations',
      title: '12. Integration layer',
      bullets: [
        'Payment gateway (OpayCheckoutService, OpayPayoutService) — creates escrow checkout sessions, processes split payouts to farmer wallets, mock mode for demo; webhook controller receives payment status callbacks',
        'Document analysis (ComplianceAuditService) — Spring AI ChatClient sends PDF + prompt, extracts certificate fields as JSON, scores against batch and RFQ criteria, runs asynchronously with @Async',
        'File storage (StorageService) — abstraction over local disk (Fly volume at /app/uploads) with optional S3-compatible endpoint; used for harvest photos, compliance PDFs, and RFQ documents; served via FileController',
      ],
    },
    {
      id: 'services',
      title: '13. Key service responsibilities',
      table: {
        headers: ['Service', 'Responsibility'],
        rows: [
          ['AuthService', 'Registration, login, JWT creation, password encoding'],
          ['MarketplaceService', 'Harvest listings, plots, buying posts, cart operations'],
          ['EscrowService', 'Local and global escrow lifecycle, payouts'],
          ['BatchService', 'Batch creation, contributions, transparency response'],
          ['ComplianceService', 'Document upload, audit trigger, scorecard assembly'],
          ['RfqBoardService', 'RFQ board, supplier interest, award, PO generation'],
          ['RfqMatchService', 'Batch fit scoring against buyer RFQ criteria'],
          ['GeoService', 'PostGIS queries for boundaries, radius, footprint'],
          ['ActivityService', 'Platform notifications and unread counts'],
          ['AuditLogService', 'Immutable audit trail for escrow and compliance events'],
        ],
      },
    },
    {
      id: 'deployment',
      title: '14. Deployment architecture',
      paragraphs: [
        'Configuration is externalised through environment variables: database URL, JWT secret, CORS origins, payment keys, and storage paths. Health checks expose /actuator/health for platform monitoring.',
      ],
      figures: [
        figure(
          'fig-7',
          'Figure 7: Production deployment topology (backend focus).',
          6,
        ),
      ],
    },
    {
      id: 'decisions',
      title: '15. Design decisions',
      table: {
        headers: ['Decision', 'Rationale'],
        rows: [
          ['Stateless JWT auth', 'Simple scaling on Fly.io without session store'],
          ['Flyway over ddl-auto update', 'Reproducible schema across local, demo, and production'],
          ['DTO records separate from entities', 'Stable API contracts, no lazy-loading leaks'],
          ['Integration package isolation', 'Payment and LLM clients swappable without touching domain logic'],
          ['JDBC for geo queries', 'PostGIS functions are clearer and more efficient in native SQL'],
          ['Mock payment mode', 'Enables full demo flow without live merchant credentials'],
          ['Per-crop compliance catalog', 'Sesame, cocoa, and ginger each carry distinct document rules'],
          ['Audit log table', 'Traceable record for escrow and compliance state changes'],
        ],
      },
    },
    {
      id: 'summary',
      title: '16. Summary',
      paragraphs: [
        'Terratrade backend is a role-based Spring Boot API that models the full agricultural export chain in PostgreSQL, secures access with JWT, integrates payment and document analysis services, and uses PostGIS for location-aware sourcing and traceability.',
        'The design prioritises clear layering, versioned schema, and demo-ready flows that map directly to real farm-to-export business steps.',
        'Repository path: backend/src/main/java/com/terratrade/ · Migrations: backend/src/main/resources/db/migration/ · API docs: /swagger-ui · Health: /actuator/health',
      ],
    },
  ],
}
