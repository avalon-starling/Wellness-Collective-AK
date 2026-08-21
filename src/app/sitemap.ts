import type { MetadataRoute } from "next";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";
export const revalidate = 3600; // Revalidate hourly for fresh content

const STATIC_ROUTES: Array<{
  path: string;
  priority: number;
  changeFrequency: "daily" | "weekly" | "monthly";
}> = [
  { path: "", priority: 1.0, changeFrequency: "daily" },
  { path: "/find-wellness", priority: 0.9, changeFrequency: "daily" },
  { path: "/events", priority: 0.9, changeFrequency: "daily" },
  { path: "/resources", priority: 0.8, changeFrequency: "weekly" },
  { path: "/for-providers", priority: 0.8, changeFrequency: "weekly" },
  { path: "/join-the-collective", priority: 0.8, changeFrequency: "monthly" },
  { path: "/wellness-weekend", priority: 0.8, changeFrequency: "weekly" },
  { path: "/apply", priority: 0.7, changeFrequency: "monthly" },
  { path: "/about", priority: 0.6, changeFrequency: "monthly" },
  { path: "/verification", priority: 0.6, changeFrequency: "monthly" },
  { path: "/terms", priority: 0.3, changeFrequency: "monthly" },
  { path: "/privacy", priority: 0.3, changeFrequency: "monthly" },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://wellnesscollectiveak.com";

  const staticEntries = STATIC_ROUTES.map((route) => ({
    url: `${base}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency as
      | "daily"
      | "weekly"
      | "monthly"
      | "yearly"
      | "always"
      | "never",
    priority: route.priority,
  }));

  let dynamicEntries: MetadataRoute.Sitemap = [];

  try {
    const [practitioners, events, resources] = await Promise.all([
      db.practitioner.findMany({
        where: { published: true },
        select: { slug: true, updatedAt: true },
      }),
      db.event.findMany({
        where: { published: true },
        select: { slug: true, updatedAt: true },
      }),
      db.resource.findMany({
        where: { published: true },
        select: { slug: true, updatedAt: true },
      }),
    ]);

    dynamicEntries = [
      ...practitioners.map((p) => ({
        url: `${base}/find-wellness/${p.slug}`,
        lastModified: p.updatedAt,
        changeFrequency: "weekly" as const,
        priority: 0.7,
      })),
      ...events.map((e) => ({
        url: `${base}/events/${e.slug}`,
        lastModified: e.updatedAt,
        changeFrequency: "weekly" as const,
        priority: 0.6,
      })),
      ...resources.map((r) => ({
        url: `${base}/resources/${r.slug}`,
        lastModified: r.updatedAt,
        changeFrequency: "monthly" as const,
        priority: 0.5,
      })),
    ];
  } catch {
    // Database not reachable at build time — ship static routes only
    console.warn("Sitemap: Database unavailable, using static routes only");
  }

  return [...staticEntries, ...dynamicEntries];
}
