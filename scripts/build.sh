#!/bin/sh
# Vercel (and any CI) needs DATABASE_URL to just be *present* for
# `prisma generate` to run — it doesn't need to be reachable, since every
# page that actually queries the database is rendered dynamically at
# request time, not at build time. This lets the very first deploy succeed
# before a real Postgres database has been connected; real content simply
# won't show until DATABASE_URL points at a real database and migrations
# have been run (see README).
set -e

export DATABASE_URL="${DATABASE_URL:-postgresql://placeholder:placeholder@localhost:5432/placeholder}"

npx prisma generate
npx next build
