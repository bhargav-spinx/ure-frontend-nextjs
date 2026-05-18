import type { Metadata } from "next";
import { notFound } from "next/navigation";
import "@/styles/pages/news.scss";

import { getPostsPaged } from "@/app/lib/wp/queries";
import { JsonLd, breadcrumbJsonLd } from "@/app/lib/seo/jsonLd";
import NewsListView from "@/app/components/news/NewsListView";

/**
 * /news/p/<n> — pages 2 through totalPages.
 *
 * Generates static params for the next few pages at build (rest render on
 * demand via dynamicParams = true default) and ISR-caches each per the
 * `revalidate` segment-config below.
 */

export const revalidate = 60;

export async function generateStaticParams() {
  // Render on demand — pre-rendering at build was failing under XAMPP load.
  // Each page is ISR-cached on first visit per `revalidate = 60`.
  void getPostsPaged;
  return [];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ n: string }>;
}): Promise<Metadata> {
  const { n } = await params;
  return {
    title: `News — page ${n}`,
    description: `Latest news and announcements from United Rare Earths — page ${n}.`,
    alternates: { canonical: `/news/p/${n}` },
    robots: { index: false, follow: true },
  };
}

export default async function NewsPageN({
  params,
}: {
  params: Promise<{ n: string }>;
}) {
  const { n } = await params;
  const page = parseInt(n, 10);
  if (!page || page < 2) notFound();

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "News", path: "/news" },
          { name: `Page ${page}`, path: `/news/p/${page}` },
        ])}
      />
      <NewsListView page={page} />
    </>
  );
}
