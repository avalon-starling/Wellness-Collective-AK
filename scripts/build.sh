#!/bin/sh
# Vercel (and any CI) needs DATABASE_URL to just be *present* for
# `prisma generate` to run — it doesn't need to be reachable, since every
# page that actually queries the database is rendered dynamically at
# request time, not at build time. This lets the very first deploy succeed
# before a real Postgres database has been connected.
#
# Once a real DATABASE_URL *is* set (e.g. via Vercel Storage → Postgres),
# this script also syncs prisma/schema.prisma to that database on every
# build — so connecting Postgres is the only manual step; nobody has to
# remember to run `prisma db push` by hand.
set -e

if [ -z "$DATABASE_URL" ]; then
  echo "DATABASE_URL not set — building with a placeholder. Connect a real Postgres database (Vercel Storage → Postgres) before the site can serve real data."
  export DATABASE_URL="postgresql://placeholder:placeholder@localhost:5432/placeholder"
  PLACEHOLDER_DB=1
fi

npx prisma generate

if [ -z "$PLACEHOLDER_DB" ]; then
  echo "Syncing database schema..."
  npx prisma db push --accept-data-loss --skip-generate
fi

npx next build
