import type { Metadata } from "next";
import "@/styles/pages/home.scss";

import { getPageAcf } from "@/app/lib/wp/queries";
import { JsonLd, breadcrumbJsonLd, organizationJsonLd } from "@/app/lib/seo/jsonLd";
import type { HomeAcf } from "@/app/lib/wp/types";

import CmnCta from "@/app/components/shared/CmnCta";
import HpHero from "@/app/components/home/HpHero";
import HpProblem from "@/app/components/home/HpProblem";
import HpWhoWeAre from "@/app/components/home/HpWhoWeAre";
import HpSeparation from "@/app/components/home/HpSeparation";
import HpCapabilities from "@/app/components/home/HpCapabilities";
import HpHeavyRe from "@/app/components/home/HpHeavyRe";
import HpSupplyChain from "@/app/components/home/HpSupplyChain";
import HpIndustries from "@/app/components/home/HpIndustries";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Home",
  description: "Securing the rare earth supply chain — domestic separation and refining infrastructure.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "United Rare Earths",
    description: "Securing the rare earth supply chain.",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export default async function HomePage() {
  const acf = await getPageAcf<HomeAcf>("home");
  return (
    <>
      <JsonLd data={organizationJsonLd()} />
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }])} />
      <HpHero          data={acf?.banner_section} />
      <HpProblem       data={acf?.problem_section} />
      <HpWhoWeAre      data={acf?.who_we_are_section} />
      <HpSeparation    data={acf?.separation_statement} />
      <HpCapabilities  data={acf?.capabilities_section} />
      <HpHeavyRe       data={acf?.heavy_re_focus_section} />
      <HpSupplyChain   data={acf?.supply_chain_section} />
      <HpIndustries    data={acf?.industries_section} />
      <CmnCta {...(acf?.cta_section ?? {})} />
    </>
  );
}
