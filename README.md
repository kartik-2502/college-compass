# College Compass

A production-oriented MVP for college discovery and decision-making. Search institutes, view detailed profiles, compare side-by-side, and save shortlists with authentication.

Inspired by platforms like [Careers360](https://www.careers360.com/) and [Collegedunia](https://collegedunia.com/).

## Features

| Feature | Description |
|---------|-------------|
| **College listing + search** | Server-side search with filters (state, type, fees, rating), sorting, and pagination |
| **College detail pages** | Overview, courses, placements, and reviews — all from the database |
| **Compare colleges** | Side-by-side comparison of 2–3 colleges (fees, placements, ratings, location) |
| **Auth + saved items** | Register/login, save colleges, save comparisons |

## Tech stack

- **Frontend:** Next.js 16 (App Router), React 19, Tailwind CSS 4
- **Backend:** Next.js Route Handlers (REST APIs)
- **Database:** Neon PostgreSQL via Prisma 6
- **Auth:** NextAuth.js v5 (credentials provider)
- **Validation:** Zod

## Getting started

### Prerequisites

- Node.js 20+
- npm

### Setup

```bash
# Install dependencies
npm install

# Copy .env.example to .env and set your Neon DATABASE_URL

# Create database schema and seed 60 colleges
npm run db:setup

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Demo account

- **Email:** `demo@collegecompass.in`
- **Password:** `demo1234`

## API endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/colleges` | Search/list colleges (query: `q`, `state`, `type`, `minFees`, `maxFees`, `minRating`, `sort`, `page`, `limit`) |
| GET | `/api/colleges/[slug]` | College detail by slug |
| GET | `/api/compare?ids=id1,id2` | Compare 2–3 colleges |
| POST | `/api/auth/register` | Create account |
| GET/POST/DELETE | `/api/saved/colleges` | Manage saved colleges (auth required) |
| GET/POST/DELETE | `/api/saved/comparisons` | Manage saved comparisons (auth required) |

## Project structure

```
src/
├── app/              # Pages and API routes
├── components/       # UI components (colleges, compare, auth, layout)
├── lib/              # DB client, business logic, validations
└── prisma/           # Schema + seed data (60 Indian colleges)
```

## Deployment

### Vercel (recommended)

1. Push to GitHub and import in Vercel
2. Set environment variables:
   - `DATABASE_URL` — use [Turso](https://turso.tech/), [Neon](https://neon.tech/), or Vercel Postgres
   - `AUTH_SECRET` — random 32+ char string
   - `NEXTAUTH_URL` — your production URL
3. Update `prisma/schema.prisma` datasource to `postgresql` if using Postgres
4. Run migrations on deploy: add `prisma db push` to build or use `prisma migrate deploy`

### Docker / self-hosted

```bash
npm run build
npm run db:setup
npm start
```

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run db:setup` | Push schema + seed database |
| `npm run db:seed` | Re-seed data only |

## License

MIT
