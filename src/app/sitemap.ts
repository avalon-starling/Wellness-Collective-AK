import type { MetadataRoute } from "next";
import { db } from "@/lib/db";

const STATIC_ROUTES = [
  "",
  "/find-wellness",
  "/join-the-collective",
  "/events",
  "/for-providers",
  "/about",
  "/verification",
  "/resources",
  "/wellness-weekend",
  "/apply",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://wellnesscollectiveak.com";

  let dynamicRoutes: string[] = [];
  try {
    const [practitioners, events, resources] = await Promise.all([
      db.practitioner.findMany({ where: { published: true }, select: { slug: true } }),
      db.event.findMany({ where: { published: true }, select: { slug: true } }),
      db.resource.findMany({ where: { published: true }, select: { slug: true } }),
    ]);
    dynamicRoutes = [
      ...practitioners.map((p) => `/find-wellness/${p.slug}`),
      ...events.map((e) => `/events/${e.slug}`),
      ...resources.map((r) => `/resources/${r.slug}`),
    ];
  } catch {
    // Database not reachable at build time — ship the static routes only.
  }

  return [...STATIC_ROUTES, ...dynamicRoutes].map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
  }));
}
