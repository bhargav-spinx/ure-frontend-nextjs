import type { Metadata } from "next";
import "@/styles/pages/news.scss";

import { JsonLd, breadcrumbJsonLd } from "@/app/lib/seo/jsonLd";
import NewsListView from "@/app/components/news/NewsListView";

/**
 * /news — static page 1.
 *
 * Pages 2+ live at /news/p/<n> (see app/news/p/[n]/page.tsx) so this route
 * stays fully static. Both views share NewsListView.
 *
 * Visiting /news?page=2 with the old URL pattern just renders page 1 (the
 * search param is ignored). The pagination links below will route to the
 * new /news/p/<n> path.
 */

export const revalidate = 60;

export const metadata: Metadata = {
  title: "News",
  description: "Latest news and announcements from United Rare Earths.",
  alternates: { canonical: "/news" },
  openGraph: {
    title: "News | United Rare Earths",
    description: "Latest news and announcements from United Rare Earths.",
    url: "/news",
    type: "website",
  },
  twitter: {
    title: "News | United Rare Earths",
    description: "Latest news and announcements from United Rare Earths.",
  },
};

export default async function NewsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([ 
          { name: "Home", path: "/" },
          { name: "News", path: "/news" },
        ])}
      />
      <NewsListView page={1} />
    </>
  );
}
