import type { Metadata } from "next";
import "@/styles/pages/news-detail.scss";

import { getPageAcf } from "@/app/lib/wp/queries";
import { JsonLd, breadcrumbJsonLd } from "@/app/lib/seo/jsonLd";
import type { StaticMessageAcf } from "@/app/lib/wp/types";
import StaticArticle from "@/app/components/shared/StaticArticle";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Thank you",
  description: "Thanks for getting in touch.",
  alternates: { canonical: "/thank-you" },
  robots: { index: false, follow: false },
};

const FALLBACK_DESCRIPTION =
  "<p>Thanks for reaching out. We&rsquo;ve received your message and will respond shortly.</p>" +
  "<p><a href=\"/\">Back to the homepage</a></p>";

export default async function ThankYouPage() {
  const acf = await getPageAcf<StaticMessageAcf>("thank-you");
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Thank you", path: "/thank-you" },
        ])}
      />
      <StaticArticle
        slug="thank-you"
        title="Thank you"
        description={acf?.description ?? FALLBACK_DESCRIPTION}
      />
    </>
  );
}
