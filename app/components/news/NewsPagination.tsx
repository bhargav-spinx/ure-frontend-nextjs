import Link from "next/link";

/**
 * URL pattern: page 1 = `/news` (static), pages 2+ = `/news/p/<n>` (ISR).
 * Page 1 stays at the canonical `/news` so SEO doesn't see two URLs for the
 * same content.
 */
function pageHref(p: number): string {
  return p === 1 ? "/news" : `/news/p/${p}`;
}

export default function NewsPagination({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  if (totalPages <= 1) return null;
  return (
    <div id="news-pagination" className="mt-5">
      {currentPage > 1 && (
        <Link
          href={pageHref(currentPage - 1)}
          className="prev page-numbers"
          data-page={currentPage - 1}
          rel="prev"
        >
          Previous
        </Link>
      )}

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
        <Link
          key={p}
          href={pageHref(p)}
          className={`page-numbers ${p === currentPage ? "current" : ""}`}
          data-page={p}
          aria-current={p === currentPage ? "page" : undefined}
        >
          {p}
        </Link>
      ))}

      {currentPage < totalPages && (
        <Link
          href={pageHref(currentPage + 1)}
          className="next page-numbers"
          data-page={currentPage + 1}
          rel="next"
        >
          Next
        </Link>
      )}
    </div>
  );
}
