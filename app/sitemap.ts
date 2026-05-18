import type { MetadataRoute } from "next";
import { getPosts } from "@/app/lib/wp/queries";

export const revalidate = 3600;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

// Public, indexable routes only. `/privacy`, `/thank-you`,
// `/do-not-sell-my-info`, and `/news/p/<n>` are intentionally excluded —
// utility / paginated pages don't need their own sitemap entries.
const STATIC_ROUTES = [
  "",
  "about",
  "technology",
  "market",
  "news",
  "contact",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((path) => ({
    url: `${SITE_URL}/${path}`.replace(/\/$/, "") || SITE_URL,
    lastModified: now,
    changeFrequency: "weekly",
    priority: path === "" ? 1.0 : 0.7,
  }));

  const posts = await getPosts({ perPage: 50 });
  const postEntries: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${SITE_URL}/${p.slug}`,
    lastModified: new Date(p.modified || p.date),
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  return [...staticEntries, ...postEntries];
}
