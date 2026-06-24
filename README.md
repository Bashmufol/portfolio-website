# Java Developer Portfolio

A professional portfolio website built with **React 19**, **TypeScript**, and **Tailwind CSS 4**. Contact form powered by **Formspree**. Designed to showcase backend engineering expertise through project write-ups and architecture documentation.

## Features

- Hero, About, Skills, Experience, Projects, Education, and Contact sections
- Content managed in [`frontend/src/data/portfolio.ts`](frontend/src/data/portfolio.ts)
- Contact form via Formspree (no server required)
- Per-project **Backend architecture** pages (`/projects/{slug}/architecture`)
- Light/dark mode, responsive layout, scroll-spy navigation
- Deployable as a static site on Vercel

## Project structure

```
porfolio-site/
├── frontend/          # React app (deploy this folder to Vercel)
│   ├── src/
│   ├── public/
│   ├── vercel.json    # SPA routing for architecture pages
│   └── .env.example
└── README.md
```

## Local development

### 1. Formspree setup

1. Create a free account at [formspree.io](https://formspree.io)
2. Create a new form and set the notification email to your inbox
3. Copy the form ID from `https://formspree.io/f/YOUR_FORM_ID` (use **only** `YOUR_FORM_ID`)

### 2. Environment variables

```bash
cd frontend
cp .env.example .env
```

Edit `frontend/.env`:

```
VITE_FORMSPREE_FORM_ID=your-form-id-here
```

### 3. Run the dev server

```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173). Restart the dev server after any `.env` change.

### 4. Production build (optional local test)

```bash
cd frontend
npm run build
npm run preview
```

---

## Deploy to Vercel (step-by-step)

### Prerequisites

- GitHub account
- [Vercel](https://vercel.com) account (sign up with GitHub)
- This repository pushed to GitHub
- Formspree form ID ready

### Step 1 — Push code to GitHub

If the project is not on GitHub yet:

```bash
cd porfolio-site
git init
git add .
git commit -m "Portfolio site — React frontend for Vercel"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/portfolio-website.git
git push -u origin main
```

Use your actual repo name (e.g. `portfolio-website`).

### Step 2 — Import project in Vercel

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click **Add New…** → **Project**
3. Under **Import Git Repository**, find your repo and click **Import**
4. If GitHub is not connected, click **Install** and authorize Vercel for your account

### Step 3 — Configure the project

On the **Configure Project** screen, set:

| Setting | Value |
|--------|--------|
| **Framework Preset** | Vite (auto-detected) |
| **Root Directory** | `frontend` — click **Edit**, select `frontend`, confirm |
| **Build Command** | `npm run build` (default) |
| **Output Directory** | `dist` (default) |
| **Install Command** | `npm install` (default) |

Do **not** deploy yet — add the environment variable first.

### Step 4 — Add Formspree environment variable

1. Expand **Environment Variables**
2. Add:

| Name | Value |
|------|--------|
| `VITE_FORMSPREE_FORM_ID` | Your Formspree form ID (e.g. `hjsdsdsu`) — **not** the full URL |

3. Enable for **Production**, **Preview**, and **Development**

### Step 5 — Deploy

1. Click **Deploy**
2. Wait for the build to finish (usually 1–3 minutes)
3. Vercel shows a URL like `https://portfolio-website-xxx.vercel.app`

### Step 6 — Verify the site

Check these URLs (replace with your domain):

- `/` — home page loads
- `/projects/legally/architecture` — architecture page (no 404)
- Contact form — submit a test message; confirm email in Formspree/inbox

If architecture pages return 404, confirm [`frontend/vercel.json`](frontend/vercel.json) is committed and **Root Directory** is `frontend`.

### Step 7 — Custom domain (optional)

1. Vercel project → **Settings** → **Domains**
2. Add your domain (e.g. `bashirmuhammed.dev`)
3. Follow DNS instructions (A/CNAME records at your registrar)
4. Wait for SSL (automatic)

Update portfolio links in `portfolio.ts`, LinkedIn, and GitHub profile README.

### Step 8 — Automatic deployments

Every push to `main` triggers a new production deploy. Pull requests get preview URLs.

---

## Personalizing content

Edit [`frontend/src/data/portfolio.ts`](frontend/src/data/portfolio.ts) for profile text, projects, and links.

Replace [`frontend/public/resume.pdf`](frontend/public/resume.pdf) with your CV.

Architecture docs live under [`frontend/src/data/architecture/`](frontend/src/data/architecture/).

## Tech stack

| Layer | Technology |
|-------|------------|
| UI | React 19, TypeScript, Tailwind CSS 4, Framer Motion |
| Build | Vite |
| Contact | Formspree |
| Hosting | Vercel |

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Contact form: "not configured" | Set `VITE_FORMSPREE_FORM_ID` in Vercel env vars and **redeploy** |
| Contact works locally but not on Vercel | Env var must be set in Vercel dashboard; rebuild after adding |
| `/projects/.../architecture` 404 | Root Directory = `frontend`; `vercel.json` present |
| Old content after deploy | Hard refresh (Ctrl+Shift+R) or check latest deploy in Vercel |
| Formspree spam | Enable reCAPTCHA in Formspree form settings |

## License

MIT — customize freely for your personal portfolio.
