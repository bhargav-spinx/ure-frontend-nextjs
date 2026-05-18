import type { Metadata } from "next";
import "@/styles/pages/news-detail.scss";

import { getPageAcf } from "@/app/lib/wp/queries";
import { JsonLd, breadcrumbJsonLd } from "@/app/lib/seo/jsonLd";
import type { StaticMessageAcf } from "@/app/lib/wp/types";
import StaticArticle from "@/app/components/shared/StaticArticle";
import CmnCta from "@/app/components/shared/CmnCta";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Do Not Sell My Info",
  description: "Information about how to exercise your privacy rights regarding the sale of personal information.",
  alternates: { canonical: "/do-not-sell-my-info" },
};

const FALLBACK_DESCRIPTION =
  "<p>United Rare Earths does not sell your personal information to third parties.</p>" +
  "<p>If you wish to opt out of any data sharing that may qualify as a sale under your local privacy laws, please contact us at <a href=\"mailto:info@unitedre.com\">info@unitedre.com</a> with your request.</p>";

export default async function DoNotSellPage() {
  const acf = await getPageAcf<StaticMessageAcf>("do-not-sell-my-info");
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Do Not Sell My Info", path: "/do-not-sell-my-info" },
        ])}
      />
      <StaticArticle
        slug="do-not-sell-my-info"
        title="Do Not Sell My Info"
        description={acf?.description ?? FALLBACK_DESCRIPTION}
      />
      <CmnCta />
    </>
  );
}
