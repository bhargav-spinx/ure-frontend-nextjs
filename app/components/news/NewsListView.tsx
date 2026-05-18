import Link from "next/link";
import { getPageAcf, getPostsPaged } from "@/app/lib/wp/queries";
import type { NewsListAcf, UrePostResponse } from "@/app/lib/wp/types";
import CmnCta from "@/app/components/shared/CmnCta";
import NewsPagination from "@/app/components/news/NewsPagination";

const PER_PAGE = 13;

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

/**
 * Renders the full /news list view for a given page number.
 * Used by both `/news` (static, page 1) and `/news/p/[n]` (ISR, pages 2+).
 */
export default async function NewsListView({ page }: { page: number }) {
  const [acf, postsResult] = await Promise.all([
    getPageAcf<NewsListAcf>("news"),
    getPostsPaged({ page, perPage: PER_PAGE }),
  ]);
  const posts = (postsResult.data ?? []) as UrePostResponse[];
  const totalPages = postsResult.totalPages;
  const [featured, ...rest] = posts;

  return (
    <>
      <section className="news-page-header section-pad-sm">
        <div className="container">
          <div className="row" data-aos="custom-fade-up">
            <div className="col-12">
              <h1 className="news-page-title">{acf?.banner_section?.title ?? "News"}</h1>
            </div>
          </div>
        </div>
      </section>

      <section className="news-listing-section section-pad-sm">
        <div className="container">
          {featured && (
            <Link
              href={`/${featured.slug}`}
              className="news-featured-card"
              data-aos="custom-fade-up"
            >
              <div className="news-featured-card__row">
                <span className="news-featured-card__date">{formatDate(featured.date)}</span>
                <h2 className="news-featured-card__title">{featured.title}</h2>
              </div>
            </Link>
          )}

          <div id="news-listing-content">
            {rest.length > 0 ? (
              <div className="news-text-grid mt-5" data-aos="custom-fade-up">
                {rest.map((p) => (
                  <Link key={p.id} href={`/${p.slug}`} className="news-text-item">
                    <span className="news-text-item__date">{formatDate(p.date)}</span>
                    <h3 className="news-text-item__title">{p.title}</h3>
                  </Link>
                ))}
              </div>
            ) : !featured ? (
              <p style={{ color: "var(--fg-muted)", padding: "32px 0" }}>
                No posts yet — create some in WP admin and they&apos;ll appear here.
              </p>
            ) : null}
          </div>

          <NewsPagination currentPage={page} totalPages={totalPages} />
        </div>
      </section>

      <CmnCta {...(acf?.cta_section ?? {})} />
    </>
  );
}
