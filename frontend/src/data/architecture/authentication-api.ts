import type { ProjectArchitectureDoc } from './types'

export const authenticationApiArchitecture: ProjectArchitectureDoc = {
  slug: 'authentication-api',
  projectTitle: 'Authentication API',
  documentTitle: 'Authentication API — Backend Architecture',
  summary:
    'REST API for user registration, JWT authentication, role-based access, and secure password reset flows backed by MySQL.',
  sections: [
    {
      id: 'overview',
      title: '1. Overview',
      paragraphs: [
        'Stateless API built with Spring Boot and Spring Security. Clients authenticate with JWT access tokens; refresh and password-reset tokens are persisted with expiry and single-use semantics.',
      ],
    },
    {
      id: 'security',
      title: '2. Security architecture',
      bullets: [
        'Spring Security filter chain with JWT bearer authentication.',
        'BCrypt password hashing for credentials at rest.',
        'Role-based authorization on protected endpoints.',
        'CSRF disabled for pure API usage; CORS configured per environment.',
      ],
    },
    {
      id: 'endpoints',
      title: '3. API surface',
      table: {
        headers: ['Area', 'Endpoints (representative)'],
        rows: [
          ['Auth', 'POST /auth/register, POST /auth/login, POST /auth/refresh'],
          ['Users', 'GET/PUT /users/me (authenticated)'],
          ['Password reset', 'POST /auth/forgot-password, POST /auth/reset-password'],
        ],
      },
    },
    {
      id: 'data',
      title: '4. Data model',
      table: {
        headers: ['Entity', 'Purpose'],
        rows: [
          ['User', 'Credentials, roles, profile fields'],
          ['RefreshToken', 'Rotating refresh token storage'],
          ['PasswordResetToken', 'Time-limited reset links'],
        ],
      },
    },
    {
      id: 'stack',
      title: '5. Technology stack',
      bullets: [
        'Java, Spring Boot, Spring Security',
        'Spring Data JPA, MySQL',
        'JWT (jjwt or equivalent)',
        'JUnit, Mockito',
      ],
    },
  ],
}
