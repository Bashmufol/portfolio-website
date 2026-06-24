import type { ProjectArchitectureDoc } from './types'

const figure = (
  id: string,
  caption: string,
  page: number,
): { id: string; caption: string; src: string; alt: string } => ({
  id,
  caption,
  src: `/architecture/legally/page-${page}.png`,
  alt: caption,
})

export const legallyArchitecture: ProjectArchitectureDoc = {
  slug: 'legally',
  projectTitle: 'Legally',
  documentTitle: 'Legally Backend — System Design Document',
  version: '1.0',
  author: 'Bashir Mufol (portfolio)',
  scope: 'Spring Boot API (legally-backend)',
  summary:
    'Architecture of the Legally backend: HTTP request flow, multi-provider AI legal and contact research, and integration with PostgreSQL, Firebase, Google Cloud, and external LLM services.',
  pdfDownloadHref:
    '/architecture/legally/legally-backend-system-design-with-diagrams.pdf',
  sections: [
    {
      id: 'purpose',
      title: '1. Purpose',
      paragraphs: [
        'This document describes the architecture of the Legally backend: how HTTP requests flow, how legal and contact research run through a multi-provider AI chain, and how the API integrates with PostgreSQL, Firebase, Google Cloud, and external LLM services.',
        'Legally provides general legal information, not legal advice. The backend accepts multimodal input, resolves jurisdiction, returns cited guidance where possible, and persists session-scoped consultation history.',
      ],
    },
    {
      id: 'system-context',
      title: '2. System context',
      paragraphs: [
        'The React web client calls the Spring Boot API over HTTPS with a Firebase ID token and an optional session header (X-Legally-Session-Id). The API is stateless at the HTTP layer; user and session state live in PostgreSQL.',
        'External dependencies:',
      ],
      table: {
        headers: ['Dependency', 'Role'],
        rows: [
          ['Cloud Run', 'Hosts the Spring Boot container'],
          ['Cloud SQL (PostgreSQL)', 'Users, sessions, consultations, upload metadata'],
          ['Firebase Auth', 'Anonymous sign-in; JWT verification on the API'],
          ['Firebase Storage', 'Production file uploads'],
          [
            'Gemini API',
            'Legal analysis, contacts, media digest, Google Search grounding',
          ],
          [
            'Google Speech-to-Text',
            'Voice transcription (separate from Gemini quota)',
          ],
          [
            'Groq, OpenRouter, Mistral, Cloudflare, Hugging Face',
            'Optional fallback LLMs (OpenAI-compatible APIs)',
          ],
        ],
      },
      figures: [
        figure(
          'fig-1',
          'Figure 1: System context — clients, API, data stores, and external services.',
          2,
        ),
      ],
    },
    {
      id: 'goals',
      title: '3. Goals and constraints',
      table: {
        headers: ['Goal', 'Implementation'],
        rows: [
          [
            'Jurisdiction-aware answers',
            'JurisdictionService, text parsing (Nigeria/US states, city phrases), optional Gemini detection',
          ],
          [
            'Resilience when one AI fails',
            'Ordered LegalLlmProvider and ContactLlmProvider chains',
          ],
          [
            'Multimodal consults',
            'Uploads, Gemini media digest, Speech-to-Text, Gemini native multimodal',
          ],
          [
            'No fabricated law on total failure',
            'Explicit no-information and media-failed responses',
          ],
          [
            'Session privacy',
            'Configurable TTL (default 72h), scheduled cleanup, new-session wipe',
          ],
          ['Secrets not in source', 'API keys via environment variables / .env'],
        ],
      },
      paragraphs: [
        'Non-goals: Billing, lawyer marketplace, static statute database. Legal text is generated at request time.',
      ],
    },
    {
      id: 'layered',
      title: '4. Layered architecture',
      figures: [
        figure(
          'fig-2',
          'Figure 2: Layered backend architecture from REST controllers through persistence.',
          3,
        ),
      ],
      subsections: [
        {
          id: 'controllers',
          title: 'REST controllers',
          table: {
            headers: ['Controller', 'Base path', 'Purpose'],
            rows: [
              ['ConsultController', '/api', 'POST /consult'],
              ['UploadController', '/api/uploads', 'Multipart uploads'],
              ['HistoryController', '/api/history', 'Consultation history'],
              ['SessionController', '/api/session', 'New session / cleanup'],
              ['LegalDocumentController', '/api/documents', 'Draft agreements/letters'],
              ['DemandLetterController', '/api/demand-letter', 'Demand letters'],
            ],
          },
        },
      ],
    },
    {
      id: 'security',
      title: '5. Request pipeline (security)',
      paragraphs: [
        'Every /api/** request passes through filters before controllers:',
      ],
      bullets: [
        'GeminiQuotaCircuitBreakerFilter — Resets per-request ThreadLocal breakers for Gemini and OpenRouter; clears them in finally.',
        'FirebaseAuthenticationFilter — Validates Authorization: Bearer <Firebase JWT> or assigns guest principal when Firebase is disabled.',
        'SessionHeaderFilter — Binds X-Legally-Session-Id for scoping history and uploads.',
        'Spring Security — Stateless; CSRF disabled for API usage.',
        'Public routes: /actuator/health, /actuator/info, OPTIONS, and local GET /api/uploads/files/**.',
      ],
      figures: [
        figure(
          'fig-3',
          'Figure 3: Security filter chain for /api/** requests.',
          4,
        ),
      ],
    },
    {
      id: 'consult-flow',
      title: '6. Consult flow (core workflow)',
      figures: [
        figure(
          'fig-4',
          'Figure 4: End-to-end consult workflow from POST /api/consult to response.',
          4,
        ),
      ],
      paragraphs: [
        'The consult pipeline orchestrates jurisdiction resolution, media processing, ordered LLM invocation, contact research, and persistence of consultation records scoped to the user session.',
      ],
    },
    {
      id: 'llm-chain',
      title: '7. Multi-LLM legal provider chain',
      paragraphs: [
        'Providers implement LegalLlmProvider. Spring wires an ordered List<LegalLlmProvider> from LegalLlmConfiguration using LLM_PROVIDER_ORDER (default includes gemini first).',
        'Typical order: gemini → groq → openrouter → mistral → cloudflare → huggingface (only configured providers are added).',
        'Per provider:',
      ],
      bullets: [
        'Skip if not configured (missing API key/model).',
        'If supportsNativeMultimodal() is false: send text prompt with digest; do not attach raw bytes.',
        'If true (GeminiLegalLlmProvider): attach media parts; enable Google Search grounding.',
        'Accept result only if LlmResponseParser.hasSubstantiveLegalContent().',
        'If attachments exist but both digest and transcript are empty → media processing failed response.',
        'Otherwise → no-information response with suggested next steps (may still fetch contacts).',
        'Contact research uses the same pattern via ContactLlmProvider and ContactResponseParser validation rules.',
      ],
      figures: [
        figure(
          'fig-5',
          'Figure 5: Ordered legal and contact LLM failover chains.',
          6,
        ),
      ],
    },
    {
      id: 'jurisdiction',
      title: '8. Jurisdiction resolution',
      bullets: [
        'Parse user message for country/state/city (NigerianJurisdictionData, UsJurisdictionData, SubregionFromText, country regexes).',
        'Else use device location fields from request body.',
        'Else optional GeminiService.detectJurisdictionFromInputs when user clearly names another place in text or media.',
        'If still unresolved, return dedicated response (no legal LLM run).',
      ],
      paragraphs: [
        'Resolved jurisdiction drives prompts, API response metadata (jurisdictionCountry, jurisdictionRegion, locationSource), and contact research.',
      ],
    },
    {
      id: 'data-model',
      title: '9. Data model (PostgreSQL)',
      table: {
        headers: ['Entity', 'Purpose'],
        rows: [
          ['AppUser', 'Firebase UID'],
          ['UserSession', 'Session ID, last activity'],
          ['ConsultationRecord', 'Scenario + full response JSON'],
          ['MediaUploadRecord', 'Storage path, MIME type, session'],
          ['DemandLetterRecord', 'Generated demand letter content'],
        ],
      },
      paragraphs: [
        'Relationships: User → many Sessions → many Consultations / Uploads / Demand letters.',
      ],
      figures: [
        figure(
          'fig-6',
          'Figure 6: Core PostgreSQL entities and relationships.',
          7,
        ),
      ],
    },
    {
      id: 'file-storage',
      title: '10. File storage',
      paragraphs: [
        'StorageService stores uploads in Firebase Storage (firebase:// paths) when Firebase is enabled, else local disk under backend/uploads/. LLM services read bytes via StorageService.readBytes() for digest and Gemini multimodal calls.',
      ],
      figures: [
        figure(
          'fig-7',
          'Figure 7: Upload storage paths and read flow for LLM services.',
          8,
        ),
      ],
    },
    {
      id: 'deployment',
      title: '11. Deployment (production)',
      table: {
        headers: ['Component', 'Technology'],
        rows: [
          ['API', 'Cloud Run (Docker image from backend/Dockerfile)'],
          [
            'Database',
            'Cloud SQL PostgreSQL via socket factory (legally.database.mode=cloud-sql)',
          ],
          ['Auth / files', 'Firebase'],
          ['Frontend', 'Static hosting (separate); CORS_ALLOWED_ORIGINS on API'],
        ],
      },
      paragraphs: [
        'Configuration is externalised through LegallyProperties and environment variables (GEMINI_API_KEY, LLM_PROVIDER_ORDER, DATABASE_URL, etc.).',
      ],
      figures: [
        figure(
          'fig-8',
          'Figure 8: Production deployment topology on Google Cloud.',
          8,
        ),
      ],
    },
    {
      id: 'failure-handling',
      title: '12. Failure handling',
      table: {
        headers: ['Scenario', 'Behaviour'],
        rows: [
          ['Gemini 429', 'Per-request circuit breaker; skip further Gemini in same request'],
          [
            'OpenRouter 429',
            'OpenRouterRateLimitCircuitBreaker; no HTTP auto-retry',
          ],
          ['All legal providers fail', 'No-information response; contacts may still run'],
          ['Media unreadable', 'Media processing failed response'],
          ['Unknown jurisdiction', 'Jurisdiction unresolved response'],
        ],
      },
    },
    {
      id: 'stack',
      title: '13. Technology stack',
      bullets: [
        'Java 21, Spring Boot 4',
        'Spring Web, Security, Data JPA, Validation, Actuator',
        'PostgreSQL, HikariCP, Cloud SQL socket factory',
        'Firebase Admin SDK',
        'RestClient (Apache HttpClient 5, automatic retries disabled on 429)',
        'Jackson, Jsoup',
        'JUnit 5',
        'Maven, Docker',
      ],
    },
    {
      id: 'highlights',
      title: '14. Design highlights for reviewers',
      bullets: [
        'Provider pattern with ordered failover for legal and contact chains.',
        'Clear separation between application services and llm integration package.',
        'Per-request circuit breakers to avoid hammering rate-limited APIs within one consult.',
        'Dual multimodal path: Gemini native vs digest + text-only fallbacks.',
        'First-class degraded responses for jurisdiction, media, and no-information cases.',
        'Session-scoped retention with scheduled purge.',
      ],
      paragraphs: [
        'Document generated for portfolio use. Reflects the com.legally backend codebase.',
      ],
    },
  ],
}
