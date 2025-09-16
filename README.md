Awesome — here’s a clean, production-ready **README.md** you can drop into your repo. I wrote it to cover both the NestJS backend and the React (Vite) frontend you’ve been building, with clear setup steps, assumptions/trade-offs, and slots for screenshots / demo.

---

# DevSamurai – Full-Stack App (NestJS + React)

Minimal full-stack starter with:

* **Backend**: NestJS, Prisma, PostgreSQL, JWT auth (access & refresh)
* **Frontend**: React + Vite, Tailwind CSS, shadcn/ui, React Router, lucide-react
* **Features**: Email/password auth, protected `/users/me`, dashboard with collapsible sidebar, range toolbar, and placeholder lead/contacts cards.

> These pages are meant for reference in terms of **layout**, **behavior**, and **minimal styling**.

---

## Table of Contents

* [Tech Stack](#tech-stack)
* [Monorepo Layout](#monorepo-layout)
* [Prerequisites](#prerequisites)
* [Quick Start (Docker or Local)](#quick-start-docker-or-local)
* [Backend Setup (NestJS)](#backend-setup-nestjs)
* [Frontend Setup (React + Vite)](#frontend-setup-react--vite)
* [Run End-to-End](#run-end-to-end)
* [API Cheatsheet](#api-cheatsheet)
* [Assumptions / Trade-offs](#assumptions--trade-offs)
* [Screenshots / Demo](#screenshots--demo)
* [Development Notes](#development-notes)

---

## Tech Stack

**Backend**

* NestJS, Prisma ORM
* PostgreSQL
* JWT (access + refresh)
* Zod / class-validator (DTOs)

**Frontend**

* React 18 + Vite
* Tailwind CSS, shadcn/ui components
* React Router
* lucide-react icons
* Zustand store for auth (`useAuthStore`)

---

## Monorepo Layout

```
.
├─ server/            # NestJS + Prisma backend
│  ├─ src/
│  ├─ prisma/         # schema.prisma, migrations
│  └─ .env
├─ web/               # React + Vite frontend
│  ├─ src/
│  └─ .env
└─ docs/
   └─ screenshots/    # put images used in README here
```

> If you keep backend & frontend in separate repos, the instructions still apply—just run them in each project root.

---

## Prerequisites

* **Node.js** ≥ 18 (LTS recommended)
* **pnpm** or **npm** (examples use `pnpm`)
* **PostgreSQL** ≥ 13 (local or via Docker)
* **OpenSSL** (optional, to generate secrets)

---

## Quick Start (Docker or Local)

### Option A – Use Docker for Postgres (recommended)

From project root:

```bash
# Create a simple docker-compose.yml if you don't have one:
cat > docker-compose.yml <<'YAML'
version: "3.8"
services:
  db:
    image: postgres:16
    restart: unless-stopped
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: 123
      POSTGRES_DB: nest
    ports:
      - "5434:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data
volumes:
  pgdata:
YAML

docker compose up -d
```

Then set `DATABASE_URL` to:

```
postgresql://postgres:123@localhost:5434/nest?schema=public
```

### Option B – Use your local Postgres

* Create a database (e.g. `nest`)
* Update the URL for your host/port/user/password

```
postgresql://<user>:<password>@localhost:<port>/<db>?schema=public
```

---

## Backend Setup (NestJS)

From `server/`:

1. **Env file**

Create `server/.env`:

```env
# Prisma / Postgres
DATABASE_URL="postgresql://postgres:123@localhost:5434/nest?schema=public"

# JWT secrets (use long, random strings)
JWT_SECRET=super-secret-key-minimum-32-characters-long
JWT_REFRESH_SECRET=super-secret-refresh-key-minimum-32-characters-long-different-from-jwt-secret

# Optional
PORT=3000
```

> Generate secrets quickly:
>
> ```bash
> openssl rand -base64 32
> ```

2. **Install & Migrate**

```bash
pnpm install        # or npm i
pnpm prisma:generate  # npx prisma generate
pnpm prisma:migrate   # npx prisma migrate dev
```

3. **Run**

```bash
pnpm start:dev
# Nest application successfully started
```

---

## Frontend Setup (React + Vite)

From `web/`:

1. **Env file**
   Create `web/.env` (or `.env.local`):

```env
VITE_API_URL=http://localhost:3000
```

2. **Install & Run**

```bash
pnpm install        # or npm i
pnpm dev
# Vite dev server listening at http://localhost:5173
```

3. **Libraries used**

* Tailwind configured via `postcss`, `tailwind.config.js`
* shadcn/ui installed for `button`, `card`, `dropdown-menu`, etc.
* lucide-react for icons

---

## Run End-to-End

1. Start **Postgres** (Docker or local)
2. Start **server** (`pnpm start:dev` in `server/`)
3. Start **web** (`pnpm dev` in `web/`)
4. Visit **[http://localhost:5173](http://localhost:5173)**

   * Sign up → Sign in → Navigate to Dashboard

---

## API Cheatsheet

**Auth**

* `POST /auth/signup` → `{ email, password, name? }`
* `POST /auth/signin` → `{ email, password }` → `{ access_token, refresh_token }`
* `POST /auth/refresh` → `{ refresh_token }`
* `GET /users/me` (Bearer access\_token) → current user

**Quick test**

```bash
# Signup
curl -s -X POST http://localhost:3000/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Secret123!","name":"Huy"}'

# Signin
ACCESS=$(curl -s -X POST http://localhost:3000/auth/signin \
 -H "Content-Type: application/json" \
 -d '{"email":"test@example.com","password":"Secret123!"}' | jq -r .access_token)

# Me
curl -s http://localhost:3000/users/me -H "Authorization: Bearer $ACCESS"
```

---

## Assumptions / Trade-offs

* **Auth payload**
  We keep JWT payload minimal (`sub`, `email`, optional `name`). The frontend calls `/users/me` after sign-in to hydrate the full profile.
  *Trade-off*: extra request on login; benefit is safer/leaner tokens.

* **Access/Refresh token storage**
  By default stored in memory / localStorage (client).
  *Trade-off*: Simpler integration; for higher security consider httpOnly cookies + CSRF.

* **UI “reference” scope**
  Dashboard cards (lead counts, lists) are placeholders for layout & behavior; data wiring is minimal.
  *Trade-off*: Faster UX iteration; not production analytics.

* **Sidebar collapse**
  We synchronize paddings/heights between expanded and collapsed states to avoid visual shift; trigger button sits in the top header.
  *Trade-off*: Slightly more CSS to keep positions aligned, but smoother UX.

* **Styling**
  Minimal Tailwind + shadcn tokens (`text-muted-foreground`, neutral palette).
  *Trade-off*: Lightweight styling over heavy design system; easier to customize later.

* **Forms**
  Email/password only; social buttons are placeholders (Google/Microsoft).
  *Trade-off*: Keeps auth simple; OAuth can be added later.

* **Database**
  Single Postgres schema `public`. No heavy seeds included.
  *Trade-off*: Straightforward setup; you can add seed scripts as needed.

---

## Screenshots / Demo

> Put images in `docs/screenshots/` and link them here.

* Dashboard (expanded sidebar)
  `![Dashboard](docs/screenshots/dashboard-expanded.png)`

* Dashboard (collapsed sidebar)
  `![Dashboard (collapsed)](docs/screenshots/dashboard-collapsed.png)`

* Auth (Sign in / Sign up)
  `![Sign In](docs/screenshots/signin.png)`

**Demo (if deployed):**
`https://your-demo-url.example.com`
*(Replace with your live link if available.)*

---

## Development Notes

* **Coding standards**: Prettier + ESLint recommended.
* **CORS**: Enable in Nest if front/back on different ports.
* **.env tips**: Never commit secrets; use `.env.example`.
* **Build**:

  * Server: `pnpm build` → `dist/`
  * Web: `pnpm build` → `dist/` (static)
* **Deployment**:

  * Backend: any Node host / Docker.
  * Frontend: static hosting (Vercel/Netlify/S3 + CDN).
  * Set `VITE_API_URL` to your backend URL.

---

If you want me to tailor the README to your exact repo structure (names, scripts, any special middleware), just paste the GitHub link and I’ll align the commands/paths and add a `.env.example` plus final screenshots section.
