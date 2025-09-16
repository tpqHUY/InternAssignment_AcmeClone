# DevSamurai – Full-Stack App (NestJS + React)

Minimal full-stack starter with:

* **Backend**: NestJS, Prisma, PostgreSQL, JWT auth (access & refresh)
* **Frontend**: React + Vite, Tailwind CSS, shadcn/ui, React Router, lucide-react
* **Features**: Email/password auth, protected `/users/me`, dashboard with collapsible sidebar, range toolbar, and placeholder lead/contacts cards.

---

## Table of Contents

* [Tech Stack](#tech-stack)
* [Monorepo Layout](#monorepo-layout)
* [Prerequisites](#prerequisites)
* [Quick Start (Local)](#quick-start)
* [Backend Setup (NestJS)](#backend-setup-nestjs)
* [Frontend Setup (React + Vite)](#frontend-setup-react--vite)
* [Run End-to-End](#run-end-to-end)
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
├─ BE_acme/            # NestJS + Prisma backend
│  ├─ src/
│  ├─ prisma/         # schema.prisma, migrations
│  └─ .env
├─ FE_acme/               # React + Vite frontend
│  ├─ src/
│  └─ .env
└─ docs/
   └─ screenshots/    # put images used in README here
```

> If you keep backend & frontend in separate repos, the instructions still apply—just run them in each project root.

---

## Prerequisites

* **Node.js** ≥ 18 (LTS recommended)
* **pnpm** or **npm** (examples use `npm`)
* **PostgreSQL** ≥ 13 (local or via Docker)
* **OpenSSL** (optional, to generate secrets)

---

## Quick Start 
(Local PostGre)

* Create a database (e.g. `nest`)
* Update the URL for your host/port/user/password

```
postgresql://<user>:<password>@localhost:<port>/<db>?schema=public
```

---

## Backend Setup (NestJS)

From `BE_acme/`:

1. **Env file**

Create `BE_acme/.env`:

```env
# Prisma / Postgres
DATABASE_URL="postgresql://postgres:123@localhost:5432/nest?schema=public"

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
npm install        # or npm i
npm prisma:generate  # npx prisma generate
npm prisma:migrate   # npx prisma migrate dev
```

3. **Run**

```bash
npm run start:dev
# Nest application successfully started
```

---

## Frontend Setup (React + Vite)

From `FE_acme/`:

1. **Env file**
   Create `FE_acme/.env` (or `.env.local`):

```env
VITE_API_URL=http://localhost:3000
```

2. **Install & Run**

```bash
npm install        # or npm i
npm run dev
# Vite dev server listening at http://localhost:5173
```

3. **Libraries used**

* Tailwind configured via `postcss`, `tailwind.config.js`
* shadcn/ui installed for `button`, `card`, `dropdown-menu`, etc.
* lucide-react for icons

---

## Run End-to-End

1. Start **Postgres** (local)
2. Start **server** (`npm run start:dev` in `BE_acme/`)
3. Start **web** (`npm run dev` in `FE_acme/`)
4. Visit **[http://localhost:5173](http://localhost:5173)**

   * Sign up → Sign in → Navigate to Dashboard

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
