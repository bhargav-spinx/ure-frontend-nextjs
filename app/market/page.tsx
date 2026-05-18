import type { Metadata } from "next";
import "@/styles/pages/market.scss";

import { getPageAcf } from "@/app/lib/wp/queries";
import { JsonLd, breadcrumbJsonLd } from "@/app/lib/seo/jsonLd";
import type { MarketAcf } from "@/app/lib/wp/types";

import CmnBanner from "@/app/components/shared/CmnBanner";
import CmnCta from "@/app/components/shared/CmnCta";
import MktLandscape from "@/app/components/market/MktLandscape";
import MktStats from "@/app/components/market/MktStats";
import MktSupplyShift from "@/app/components/market/MktSupplyShift";
import MktStake from "@/app/components/market/MktStake";
import MktUrgency from "@/app/components/market/MktUrgency";
import MktIndustries from "@/app/components/market/MktIndustries";
import MktGap from "@/app/components/market/MktGap";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Market",
  description:
    "Why rare earth processing has become one of the most urgent infrastructure challenges facing the United States.",
  alternates: { canonical: "/market" },
  openGraph: {
    title: "Market | United Rare Earths",
    description: "Why rare earth processing has become one of the most urgent infrastructure challenges facing the United States.",
    url: "/market",
    type: "website",
  },
  twitter: {
    title: "Market | United Rare Earths",
    description: "Why rare earth processing has become one of the most urgent infrastructure challenges facing the United States.",
  },
};

export default async function MarketPage() {
  const acf = await getPageAcf<MarketAcf>("market");
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Market", path: "/market" },
        ])}
      />
      <CmnBanner
        variant="inner"
        sub_title={acf?.banner_section?.sub_title || "Market Opportunity"}
        title={
          acf?.banner_section?.title ||
          "Why rare earth processing has become one of the most urgent infrastructure challenges facing the United States."
        }
        background_image={
          acf?.banner_section?.background_image ?? {
            url: "https://cdn.spinxweb.net/united-rare-earths/uploads/2026/05/hero-market.jpg",
            width: 1920,
            height: 1080,
          }
        }
      />
      <div className="market-page bg-cream">
        <MktLandscape   data={acf?.landscape_section} />
        <MktStats       data={acf?.stats_section} />
        <MktSupplyShift data={acf?.supply_shift_section} />
        <MktStake       data={acf?.stake_section} />
        <MktUrgency     data={acf?.urgency_section} />
        <MktIndustries  data={acf?.industries_section} />
        <MktGap         data={acf?.gap_section} />
      </div>
      <CmnCta {...(acf?.cta_section ?? {})} />
    </>
  );
}
