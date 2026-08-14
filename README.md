# The Wellness Collective — wellnesscollectiveak.com

Alaska's directory and community for wellness practitioners. Next.js (App
Router) + Postgres (Prisma) + Square, deployed on Vercel.

## Stack

- **Next.js 15 / React 19** — server components + server actions, no
  separate API layer for admin CRUD.
- **Prisma + Postgres** — practitioners, applications, events, RSVPs,
  resources, newsletter subscribers.
- **Single-admin auth** — no user table. One operator signs in at
  `/admin/login` with credentials stored in env vars; a signed cookie
  (via `jose`) protects everything under `/admin`.
- **Square** — membership checkout via Square's hosted Payment Links,
  called directly over REST (`src/lib/square.ts`). No SDK dependency.
  Every "Join" button falls back to the `/apply` form if Square isn't
  configured yet, so nothing is ever a dead end.
- **Tailwind CSS** — the "Sanctuary" design system (palette, type, the
  flower-of-life motif) lives in `tailwind.config.ts` and
  `src/components/`.

## Local setup

```bash
npm install
cp .env.example .env       # fill in DATABASE_URL at minimum
npm run db:push            # creates tables directly from schema.prisma
npm run db:seed            # seeds two starter Resources articles
npm run dev
```

`db:push` is the fastest way to get tables into a fresh database and is
fine for this project (single operator, no migration history to protect
yet). Switch to `db:migrate:dev` / `db:migrate` later if you want tracked
migration files.

### Admin login

Generate the two admin secrets and put them in `.env`:

```bash
openssl rand -base64 32     # → SESSION_SECRET
npx tsx -e "import bcrypt from 'bcryptjs'; bcrypt.hash(process.argv[1], 10).then(console.log)" "your-password-here"
# → ADMIN_PASSWORD_HASH
```

Set `ADMIN_EMAIL` to whatever email you want to sign in with, then visit
`/admin/login`.

## Deploying (Vercel)

1. Import this repo as a Vercel project.
2. **Storage → Create Database → Postgres** sets `DATABASE_URL`
   automatically. Otherwise add it yourself (any Postgres works — Neon,
   Supabase, RDS, etc).
3. Add the rest of the env vars from `.env.example` in Project Settings →
   Environment Variables. (The build succeeds even without `DATABASE_URL`
   set — every page that reads the database renders per-request rather
   than at build time — but the site won't show real data, and `/admin`
   won't be usable, until it's connected.)
4. After the first deploy, create the tables in the production database
   once: run `npx prisma db push` locally with `DATABASE_URL` pointed at
   production (or `vercel env pull` first to grab it).
5. Point `wellnesscollectiveak.com`'s DNS at the Vercel project (Vercel's
   dashboard gives you the exact A/CNAME records once you add the domain).

## Turning on real payments

The site works fully without Square — "Join" buttons redirect to the free
`/apply` form. To go live with billing:

1. Create the five plans in Square Dashboard → Items & Orders →
   Subscriptions (Provider monthly/annual, Professional monthly/annual,
   Founding annual) and copy each **Subscription Plan Variation ID**.
2. Set `SQUARE_ACCESS_TOKEN`, `SQUARE_LOCATION_ID`,
   `SQUARE_ENVIRONMENT=production`, and the five `SQUARE_PLAN_*` vars.
3. That's it — no code changes needed.

## Content model

Everything editable lives behind `/admin` — practitioners, provider
applications (approve → auto-creates a published practitioner), events
(including the Wellness Weekend flagship flag), and Resources articles
(plain-text markdown, rendered by a small built-in renderer in
`src/lib/markdown.tsx` — no markdown package dependency).

Membership pricing/copy and verification-level copy are centralized in
`src/lib/content.ts` — edit there rather than hunting through pages.
