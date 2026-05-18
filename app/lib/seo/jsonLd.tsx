import type { WpPost } from "@/app/lib/wp/types";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const SITE_NAME = "United Rare Earths";
const ORG_LOGO  = `${SITE_URL}/images/upload/ure-logo.svg`;

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${SITE_URL}${it.path}`,
    })),
  };
}

/**
 * NewsArticle JSON-LD for `/<slug>`.
 *
 * NewsArticle is a stricter Article subtype that Google uses for the News
 * sitemap + Discover surfaces. Use `Article` if the content isn't news.
 */
export function articleJsonLd(post: WpPost, path: string) {
  const description = post.excerpt?.rendered?.replace(/<[^>]*>/g, "").trim() || undefined;
  const image = post.featured_image?.url;
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: post.title.rendered,
    ...(description && { description }),
    ...(image && { image: [image] }),
    datePublished: post.date,
    dateModified: post.modified || post.date,
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}${path}` },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: ORG_LOGO },
    },
  };
}

/**
 * Organization JSON-LD — emit once on the homepage so Google has a structured
 * record of who runs the site (name, logo, social profiles).
 */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: { "@type": "ImageObject", url: ORG_LOGO },
    description: "United Rare Earths is building U.S.-based separation and refining infrastructure for heavy rare earth elements.",
    // Add sameAs entries when social/profile URLs are confirmed:
    // sameAs: [
    //   "https://www.linkedin.com/company/united-rare-earths",
    //   "https://twitter.com/unitedrareearths",
    // ],
  };
}
