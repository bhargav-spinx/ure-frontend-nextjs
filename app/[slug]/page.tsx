import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import "@/styles/pages/news-detail.scss";

import { getPostBySlug, getPosts } from "@/app/lib/wp/queries";
import { JsonLd, articleJsonLd, breadcrumbJsonLd } from "@/app/lib/seo/jsonLd";
import type { NewsPostAcf } from "@/app/lib/wp/types";
import CmnCta from "@/app/components/shared/CmnCta";

/**
 * /<slug> — single news post.
 *
 * Lives at the root level so URLs look like `/ure-files-patent-...` rather
 * than `/news-detail/ure-files-patent-...`. The static page routes
 * (`/about`, `/contact`, `/news`, etc.) take precedence over this dynamic
 * segment, so reserved slugs are protected automatically. Don't name a post
 * the same as a static route ("about", "contact", "do-not-sell-my-info",
 * "market", "news", "privacy", "technology", "thank-you") — the post would
 * be unreachable.
 */

export const revalidate = 60;

// Slugs the root-level catch-all must NOT shadow.
const RESERVED_SLUGS = new Set([
  "about", "contact", "do-not-sell-my-info", "market", "news",
  "privacy", "technology", "thank-you",
]);

export async function generateStaticParams() {
  // Render on demand. Pre-rendering at build was failing under XAMPP's
  // parallel-build-worker load (sustained 500s even with wpFetch retries).
  // Pages still ISR-cache on first visit per `revalidate = 60`. For prod
  // against a properly-tuned WP host, return real slugs here so they get
  // pre-rendered. See memory entry `feedback_build_time_wp_strict_fetch`.
  void getPosts; // keep the import wired for when pre-rendering is re-enabled
  return [];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (RESERVED_SLUGS.has(slug)) return { title: "Not found" };
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Not found" };
  const title = post.title.rendered;
  const description = post.excerpt.rendered.replace(/<[^>]*>/g, "").slice(0, 160);
  return {
    title,
    description,
    alternates: { canonical: `/${slug}` },
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.modified,
      images: post.featured_image?.url ? [{ url: post.featured_image.url }] : undefined,
    },
    twitter: { card: "summary_large_image" },
  };
}

/** "May 15, 2026" → "05.15.2026" — matches the news-detail.scss `__date` style. */
function formatDate(d: string) {
  const dt = new Date(d);
  const mm = String(dt.getMonth() + 1).padStart(2, "0");
  const dd = String(dt.getDate()).padStart(2, "0");
  const yy = dt.getFullYear();
  return `${mm}.${dd}.${yy}`;
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (RESERVED_SLUGS.has(slug)) notFound();

  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const acf = (post.acf as NewsPostAcf | undefined) ?? undefined;
  const bannerUrl = acf?.background_image?.url ?? post.featured_image?.url ?? null;
  const bodyHtml  = acf?.description ?? post.content.rendered;

  return (
    <>
      <JsonLd data={articleJsonLd(post, `/${slug}`)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "News", path: "/news" },
          { name: post.title.rendered, path: `/${slug}` },
        ])}
      />

      <article className="news-detail">
        {bannerUrl && (
          <div className="news-detail__hero">
            <img src={bannerUrl} alt={post.featured_image?.alt ?? ""} />
          </div>
        )}

        <div className="container">
          <div className="news-detail__layout">
            <aside className="news-detail__meta">
              <span className="news-detail__date">{formatDate(post.date)}</span>
            </aside>

            <div className="news-detail__body">
              <h1 className="news-detail__title">{post.title.rendered}</h1>

              <div
                className="news-detail__rich"
                dangerouslySetInnerHTML={{ __html: bodyHtml }}
              />

              <Link href="/news" className="news-detail__back">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path d="M15.833 10H4.167M4.167 10l5-5M4.167 10l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>Back to all news</span>
              </Link>
            </div>
          </div>
        </div>
      </article>

      <CmnCta />
    </>
  );
}
