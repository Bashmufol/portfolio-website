import type { ProjectArchitectureDoc } from './types'

const figure = (
  id: string,
  caption: string,
  page: number,
): { id: string; caption: string; src: string; alt: string } => ({
  id,
  caption,
  src: `/architecture/evocharge/page-${page}.png`,
  alt: caption,
})

export const evochargeArchitecture: ProjectArchitectureDoc = {
  slug: 'evocharge',
  projectTitle: 'EvoCharge',
  documentTitle: 'EvoCharge Backend — System Design Document',
  version: '1.1',
  author: 'Bashir Muhammed',
  scope: 'EvoCharge API and AWS Infrastructure',
  summary:
    'Backend platform for EV charging station discovery, EvoScore recommendations, operational analytics, live SSE status updates, and Bedrock-powered advisory — built with Java 21, Spring Boot 4, DynamoDB, and AWS CDK-managed ECS Fargate infrastructure.',
  pdfDownloadHref: '/architecture/evocharge/evocharge-backend-system-design.pdf',
  sections: [
    {
      id: 'summary',
      title: '1. System summary',
      paragraphs: [
        'EvoCharge provides a backend platform for charging station discovery, recommendation, operational analytics, and live status updates. The system aggregates operator data into a unified schema and exposes this data through a REST API and SSE stream.',
        'The backend is designed for clear service boundaries, managed infrastructure, and predictable runtime behavior under fluctuating traffic. Production workloads run on Amazon ECS Fargate behind an Application Load Balancer, with DynamoDB as the primary data store.',
        'The core design goal is to keep read operations fast and deterministic while adding optional AI enrichment on advisor endpoints.',
      ],
    },
    {
      id: 'goals',
      title: '2. Design goals and constraints',
      table: {
        headers: ['Area', 'Design decision', 'Rationale'],
        rows: [
          [
            'Latency',
            'DynamoDB-backed read paths for stations and operators',
            'Low and stable response time for high-frequency discovery traffic',
          ],
          [
            'Scalability',
            'Containerized API on ECS Fargate',
            'Horizontal scaling without host management',
          ],
          [
            'Reliability',
            'ALB health checks plus stateless API tasks',
            'Automatic replacement of unhealthy tasks',
          ],
          [
            'Maintainability',
            'AWS CDK stack separation (Network, Data, API, Web edge)',
            'Safer deployments and clearer ownership boundaries',
          ],
          [
            'AI integration',
            'Bedrock invoked only on advisor endpoint',
            'Core API routes stay deterministic and cost controlled',
          ],
          [
            'Operational simplicity',
            'Managed AWS services over self-hosted components',
            'Reduced maintenance effort and faster release velocity',
          ],
        ],
      },
      subsections: [
        {
          id: 'nfr',
          title: 'Target non-functional profile',
          table: {
            headers: ['Category', 'Target', 'Notes'],
            rows: [
              [
                'Read latency',
                'P95 under 300 ms for discovery endpoints',
                'DynamoDB query paths and lightweight API transformations',
              ],
              [
                'Availability',
                'Service continuity with automatic task replacement',
                'ALB health checks and ECS self-healing behavior',
              ],
              [
                'Recovery behavior',
                'Graceful degradation for advisor feature',
                'Fallback response when Bedrock call fails',
              ],
              [
                'Deployment safety',
                'Zero to low interruption rollout',
                'Task definition revisions and forced rolling deployment',
              ],
            ],
          },
        },
      ],
    },
    {
      id: 'architecture',
      title: '3. High-level backend architecture',
      paragraphs: [
        'Key runtime path: CloudFront /api/* → ALB → ECS API → DynamoDB / Bedrock / S3.',
        'Operational path: EventBridge → Lambda pulse → API, with logs in CloudWatch.',
      ],
      bullets: [
        'CloudFront and ALB: CloudFront handles edge routing for /api/* to ALB. ALB performs health checks on API tasks.',
        'ECS Fargate API: Spring Boot service hosts REST endpoints and SSE stream endpoints.',
        'DynamoDB: Separate operators and stations tables support filtered discovery and analytical aggregation.',
        'Bedrock: Advisor endpoint composes station context and calls Claude Haiku 4.5 for natural-language responses.',
        'EventBridge and Lambda: Scheduled pulse path drives status update simulation and stream freshness checks.',
        'CloudWatch: Centralized logs for API and Lambda diagnostics.',
      ],
      figures: [
        figure(
          'fig-1',
          'Figure 1: Backend deployment architecture on AWS.',
          2,
        ),
      ],
    },
    {
      id: 'request-flow',
      title: '4. Request and data flow design',
      paragraphs: [
        'Advisor path calls Bedrock only for /advisor requests. Core discovery endpoints remain fast and deterministic through DynamoDB reads.',
      ],
      figures: [
        figure(
          'fig-2',
          'Figure 2: Request execution flow for REST, advisor, and pulse pathways.',
          3,
        ),
      ],
      subsections: [
        {
          id: 'endpoint-model',
          title: 'Endpoint processing model',
          table: {
            headers: ['Endpoint group', 'Primary path', 'Secondary path'],
            rows: [
              [
                '/operators, /stations, /nearby',
                'Controller → Service → DynamoDB',
                'Optional seed bootstrap if storage is not initialized',
              ],
              [
                '/recommend',
                'Controller → EvoScore service → station ranking',
                'None',
              ],
              [
                '/advisor',
                'Recommendation path + Bedrock invocation',
                'Template fallback response when Bedrock fails',
              ],
              [
                '/events/stream',
                'SSE subscription and status events',
                'EventBridge and Lambda pulse keep live signal cadence',
              ],
            ],
          },
        },
        {
          id: 'lifecycle',
          title: 'Detailed request lifecycle',
          table: {
            headers: ['Step', 'Description', 'Outcome'],
            rows: [
              [
                'Ingress',
                'Client request reaches CloudFront and is routed to ALB for /api/*.',
                'Request enters protected compute path.',
              ],
              [
                'Routing',
                'ALB forwards only to healthy ECS tasks.',
                'Failed tasks are isolated automatically.',
              ],
              [
                'Domain execution',
                'Controller validates input, service layer executes business logic.',
                'Consistent API behavior and reusable logic paths.',
              ],
              [
                'Data operations',
                'Repository reads or writes through DynamoDB tables.',
                'Low latency access for station and operator datasets.',
              ],
              [
                'AI enrichment',
                'Advisor endpoint calls Bedrock and merges textual advisory output.',
                'Readable recommendation explanation for users.',
              ],
              [
                'Response',
                'JSON or SSE payload returns through ALB and CloudFront.',
                'Stable contract for external clients.',
              ],
            ],
          },
        },
      ],
    },
    {
      id: 'api-domain',
      title: '5. API and domain design',
      table: {
        headers: ['Domain', 'Endpoint group', 'Purpose'],
        rows: [
          ['/api/v1/health', 'Health', 'Readiness and liveliness signal for load balancer and monitoring'],
          [
            '/operators, /stations, /nearby',
            'Discovery',
            'Filtered charging station discovery and lookup flows',
          ],
          ['/recommend', 'Recommendation', 'EvoScore ranking based on user context and station quality factors'],
          [
            '/analytics/summary, /analytics/demand-by-area',
            'Analytics',
            'Operational and planning metrics from backend data',
          ],
          ['/events/stream', 'Live updates', 'SSE channel for real-time status notifications'],
          [
            '/advisor',
            'Advisor',
            'Natural language recommendation assistant with Bedrock integration',
          ],
        ],
      },
      subsections: [
        {
          id: 'services',
          title: 'Service layer structure',
          bullets: [
            'StationService — listing, filtering, and proximity search',
            'RecommendationService and EvoScoreService — deterministic ranking',
            'AnalyticsService — summary and demand aggregation',
            'AdvisorService — Bedrock prompt orchestration and fallback handling',
            'Pulse and event services — SSE emission and periodic status changes',
            'Seeder service — controlled startup data initialization',
          ],
        },
      ],
    },
    {
      id: 'data-model',
      title: '6. Data model and access strategy',
      table: {
        headers: ['Entity', 'Purpose', 'Key fields'],
        rows: [
          ['Operator', 'Represents charging network owner', 'id, name, contact metadata'],
          [
            'Station',
            'Represents physical charging location',
            'id, city, area, status, connectors, waitMinutes, reliabilityScore',
          ],
          ['Recommendation', 'Runtime ranking output', 'distanceKm, evoScore, station reference'],
          ['Status Event', 'Live update payload for SSE clients', 'stationId, status, timestamp'],
        ],
      },
      paragraphs: [
        'Recommendation ranking is weighted and deterministic. Current weights: distance (30%), availability (25%), wait time (20%), reliability (15%), and connector match (10%).',
      ],
      subsections: [
        {
          id: 'access-patterns',
          title: 'DynamoDB access patterns',
          table: {
            headers: ['Access pattern', 'Typical query', 'Optimization notes'],
            rows: [
              [
                'Station detail fetch',
                'Get by station id',
                'Primary key lookup for low latency deterministic reads',
              ],
              [
                'Filtered station list',
                'City, operator, status, connector filters',
                'Service-side composition and ranking from normalized records',
              ],
              [
                'Nearby search',
                'Lat/lng and radius input',
                'Distance computed in service layer after candidate retrieval',
              ],
              [
                'Demand analytics',
                'Area-level grouped summary',
                'Aggregation path optimized for dashboard reads',
              ],
            ],
          },
        },
      ],
    },
    {
      id: 'security',
      title: '7. Security and compliance posture',
      table: {
        headers: ['Control area', 'Implementation', 'Risk addressed'],
        rows: [
          [
            'Identity and access',
            'IAM task role with scoped permissions for DynamoDB, S3, Bedrock, and Location',
            'Prevents broad credential exposure and privilege escalation',
          ],
          [
            'Network boundary',
            'ALB ingress with ECS tasks in VPC and NAT managed egress',
            'Reduces direct exposure of runtime containers',
          ],
          [
            'Secret handling',
            'No static cloud keys in source or container images',
            'Avoids credential leakage through code distribution channels',
          ],
          [
            'Transport security',
            'CloudFront edge and controlled API ingress route',
            'Protects client traffic and standardizes request pathing',
          ],
          [
            'Auditability',
            'CloudWatch logs for API and Lambda execution flows',
            'Supports incident investigation and runtime verification',
          ],
        ],
      },
    },
    {
      id: 'reliability',
      title: '8. Reliability, failure handling, and observability',
      table: {
        headers: ['Failure scenario', 'Current behavior', 'User impact', 'Mitigation'],
        rows: [
          [
            'Unhealthy API task',
            'ALB removes task from target pool',
            'Minimal if healthy tasks remain',
            'ECS launches replacement task automatically',
          ],
          [
            'Bedrock call failure',
            'Advisor service returns fallback message',
            'Advisor quality reduced, core API unaffected',
            'Retry strategy and fallback text path',
          ],
          [
            'DynamoDB throttling or errors',
            'Endpoint returns controlled error',
            'Data retrieval delayed or failed for specific call',
            'Capacity tuning and request optimization',
          ],
          [
            'Pulse scheduler interruption',
            'SSE cadence drops temporarily',
            'Live status updates slow down',
            'EventBridge schedule and Lambda monitoring',
          ],
        ],
      },
      paragraphs: [
        'Observability is built around CloudWatch logs and health endpoints. API logs cover request lifecycle and downstream service calls. Lambda logs cover pulse triggers and API reachability. ALB health checks provide a direct availability signal for task routing.',
      ],
    },
    {
      id: 'operations',
      title: '9. Operational architecture',
      table: {
        headers: ['Concern', 'Current implementation', 'Production benefit'],
        rows: [
          [
            'Deployments',
            'CDK provision + ECR image rollout to ECS task revisions',
            'Repeatable release process and traceable changes',
          ],
          [
            'Health and readiness',
            'ALB health check on /api/v1/health',
            'Only healthy tasks receive traffic',
          ],
          [
            'Observability',
            'CloudWatch logs for API and Lambda',
            'Fast root cause analysis during incidents',
          ],
          [
            'Security model',
            'IAM task role with scoped service permissions',
            'No long-lived credentials in code or containers',
          ],
          [
            'Scalability path',
            'Stateless API tasks and managed services',
            'Straightforward horizontal scaling',
          ],
          [
            'Release process',
            'Docker image build, ECR push, ECS task revision update',
            'Clear rollback by switching to prior task definition revision',
          ],
        ],
      },
    },
    {
      id: 'cost',
      title: '10. Cost and scalability considerations',
      table: {
        headers: ['Dimension', 'Current state', 'Scale strategy'],
        rows: [
          [
            'Compute cost',
            'Single Fargate service with right-sized CPU and memory',
            'Scale tasks by traffic profile and tune resource class',
          ],
          [
            'Database cost',
            'DynamoDB on-demand mode',
            'Move to provisioned with auto scaling for stable high traffic',
          ],
          [
            'AI cost',
            'Bedrock invoked on advisor endpoints only',
            'Rate-limit advisor path and cache repeated advisory context',
          ],
          [
            'Network and edge',
            'ALB plus CloudFront API path routing',
            'Introduce tighter cache policy for non-personalized responses',
          ],
        ],
      },
    },
    {
      id: 'roadmap',
      title: '11. Future technical roadmap',
      bullets: [
        'Authentication and tenant isolation',
        'Operator ingestion connectors',
        'Formal API versioning policy',
        'Automated load and chaos testing',
        'Distributed tracing integration',
        'SLO dashboards and alert rules',
      ],
      paragraphs: [
        'The next evolution is to replace seed ingestion with authenticated operator pipelines and enforce tenant-aware data boundaries.',
      ],
    },
    {
      id: 'evaluation',
      title: '12. Engineering evaluation',
      paragraphs: [
        'This backend is built with practical production patterns. It cleanly separates ingress, compute, data, events, and AI services. The API path remains efficient for core data retrieval while advanced advisor responses are isolated to dedicated endpoint logic.',
        'From a hiring perspective, this project demonstrates strong backend ownership across service design, cloud infrastructure, deployment automation, and runtime operations.',
      ],
      bullets: [
        'Java and Spring Boot service architecture with clean endpoint grouping',
        'AWS infrastructure design using ECS, ALB, DynamoDB, EventBridge, Lambda, and Bedrock',
        'Operational delivery with containerized deployment and revision-based rollouts',
        'Resilience planning with controlled fallback behavior and health-driven routing',
        'Production thinking through observability, security scope, and scalability planning',
      ],
    },
  ],
}
