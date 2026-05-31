# Java Developer Portfolio

A professional full-stack portfolio website built with **Spring Boot 4.0.6** and **React 19 + TypeScript + Tailwind CSS 4**. Designed to showcase backend engineering expertise with a polished, distinctive UI.

## Features

- Single-page portfolio with Hero, About, Skills, Experience, Projects, Education, and Contact sections
- Static content managed in one TypeScript file (`frontend/src/data/portfolio.ts`)
- Contact form with client + server validation, sending email via SMTP
- Responsive design with scroll-spy navigation and subtle animations
- Production-ready single JAR deployment (Spring Boot serves the React build)

## Prerequisites

- **Java 21** (required for Spring Boot 4)
- **Maven 3.9+**
- **Node.js 20+** and npm
- SMTP credentials (e.g. Gmail App Password) for the contact form

## Project Structure

```
porfolio-site/
├── backend/          # Spring Boot 4.0.6 API
├── frontend/         # React + TypeScript + Tailwind
├── .env.example      # Environment variable template
└── README.md
```

## Quick Start (Development)

### 1. Configure environment

Copy the example env file and fill in your SMTP details:

```bash
cp .env.example .env
```

Set the variables in your shell or IDE run configuration before starting the backend.

**Windows PowerShell example:**

```powershell
$env:MAIL_USERNAME="your-email@gmail.com"
$env:MAIL_PASSWORD="your-app-password"
$env:MAIL_TO="your-email@gmail.com"
$env:MAIL_FROM="your-email@gmail.com"
```

### 2. Start the backend

```bash
cd backend
mvn spring-boot:run
```

Backend runs at `http://localhost:8080`. Health check: `http://localhost:8080/actuator/health`.

### 3. Start the frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at `http://localhost:5173` with API requests proxied to the backend.

## Personalizing Content

Edit [`frontend/src/data/portfolio.ts`](frontend/src/data/portfolio.ts) to update:

- Name, title, tagline, location
- About summary and highlights
- Skills, experience, projects
- Education and certifications
- Social links and contact email

Replace [`frontend/public/resume.pdf`](frontend/public/resume.pdf) with your actual resume.

## Production Build (Single JAR)

```bash
# Build frontend
cd frontend
npm run build

# Package backend (copies frontend/dist into static resources)
cd ../backend
mvn clean package -DskipTests

# Run
java -jar target/portfolio-backend-1.0.0.jar
```

Visit `http://localhost:8080` — the JAR serves both the React app and the API.

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/actuator/health` | Health check |
| POST | `/api/contact` | Submit contact form (JSON body) |

**Contact request body:**

```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "subject": "Job Opportunity",
  "message": "I'd like to discuss a backend role..."
}
```

## Gmail SMTP Setup

1. Enable 2-Factor Authentication on your Google account
2. Generate an [App Password](https://myaccount.google.com/apppasswords)
3. Use `smtp.gmail.com`, port `587`, and the app password as `MAIL_PASSWORD`

## Security Notes

- Never commit `.env` or SMTP credentials
- Server-side validation is enforced on all contact submissions
- Consider adding rate limiting before deploying to a public URL

## Tech Stack

| Layer | Technology |
|-------|------------|
| Backend | Spring Boot 4.0.6, Java 21, Spring Mail, Jakarta Validation |
| Frontend | React 19, TypeScript, Vite 6, Tailwind CSS 4 |
| UI | Framer Motion, Lucide Icons, React Hook Form, Zod |

## License

MIT — customize freely for your personal portfolio.
