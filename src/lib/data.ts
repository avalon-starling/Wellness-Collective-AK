import "server-only";
import { db } from "./db";
import type { Format, VerificationLevel } from "@prisma/client";

export interface DirectoryFilters {
  q?: string;
  modality?: string;
  town?: string;
  format?: Format;
  accepting?: boolean;
  verified?: boolean;
}

export async function getPractitioners(filters: DirectoryFilters = {}) {
  const { q, modality, town, format, accepting, verified } = filters;

  return db.practitioner.findMany({
    where: {
      published: true,
      ...(q
        ? {
            OR: [
              { name: { contains: q, mode: "insensitive" } },
              { primaryModality: { contains: q, mode: "insensitive" } },
              { town: { contains: q, mode: "insensitive" } },
              { modalities: { has: q } },
            ],
          }
        : {}),
      ...(modality ? { modalities: { has: modality } } : {}),
      ...(town ? { town } : {}),
      ...(format ? { format } : {}),
      ...(accepting ? { accepting: true } : {}),
      ...(verified ? { verificationLevel: { in: ["VERIFIED", "MEMBER", "FEATURED"] as VerificationLevel[] } } : {}),
    },
    orderBy: [{ verificationLevel: "desc" }, { createdAt: "desc" }],
  });
}

export async function getPractitionerBySlug(slug: string) {
  return db.practitioner.findFirst({ where: { slug, published: true } });
}

export async function getDirectoryFacets() {
  const practitioners = await db.practitioner.findMany({
    where: { published: true },
    select: { modalities: true, town: true },
  });
  const modalities = new Set<string>();
  const towns = new Set<string>();
  for (const p of practitioners) {
    p.modalities.forEach((m) => modalities.add(m));
    towns.add(p.town);
  }
  return {
    modalities: Array.from(modalities).sort(),
    towns: Array.from(towns).sort(),
    total: practitioners.length,
  };
}

export async function getUpcomingEvents(opts: { modality?: string; limit?: number } = {}) {
  return db.event.findMany({
    where: {
      published: true,
      startsAt: { gte: new Date(new Date().toDateString()) },
      ...(opts.modality ? { modality: opts.modality } : {}),
    },
    orderBy: { startsAt: "asc" },
    take: opts.limit,
  });
}

export async function getEventBySlug(slug: string) {
  return db.event.findFirst({ where: { slug, published: true } });
}

export async function getFlagshipEvent() {
  const upcoming = await db.event.findFirst({
    where: { isFlagship: true, published: true, startsAt: { gte: new Date() } },
    orderBy: { startsAt: "asc" },
  });
  if (upcoming) return upcoming;
  return db.event.findFirst({ where: { isFlagship: true, published: true }, orderBy: { startsAt: "desc" } });
}

export async function getPublishedResources(opts: { category?: string } = {}) {
  return db.resource.findMany({
    where: {
      published: true,
      publishedAt: { not: null },
      ...(opts.category ? { category: opts.category } : {}),
    },
    orderBy: { publishedAt: "desc" },
  });
}

export async function getResourceBySlug(slug: string) {
  return db.resource.findFirst({ where: { slug, published: true } });
}

export async function getDirectoryStats() {
  const [total, verified, modalities, towns] = await Promise.all([
    db.practitioner.count({ where: { published: true } }),
    db.practitioner.count({
      where: { published: true, verificationLevel: { in: ["VERIFIED", "MEMBER", "FEATURED"] } },
    }),
    db.practitioner.findMany({ where: { published: true }, select: { modalities: true } }),
    db.practitioner.findMany({ where: { published: true }, select: { town: true }, distinct: ["town"] }),
  ]);
  const modalitySet = new Set<string>();
  modalities.forEach((p) => p.modalities.forEach((m) => modalitySet.add(m)));
  return {
    total,
    verifiedPct: total ? Math.round((verified / total) * 100) : 100,
    modalityCount: modalitySet.size,
    townCount: towns.length,
  };
}
