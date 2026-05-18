import type { Metadata } from "next";
import "@/styles/pages/technology.scss";

import { getPageAcf } from "@/app/lib/wp/queries";
import { JsonLd, breadcrumbJsonLd } from "@/app/lib/seo/jsonLd";
import type { TechnologyAcf } from "@/app/lib/wp/types";

import CmnBanner from "@/app/components/shared/CmnBanner";
import CmnCta from "@/app/components/shared/CmnCta";
import TechOverview from "@/app/components/technology/TechOverview";
import TechProcessLead from "@/app/components/technology/TechProcessLead";
import TechProcessWhy from "@/app/components/technology/TechProcessWhy";
import TechProcessCards from "@/app/components/technology/TechProcessCards";
import TechOrnlLab from "@/app/components/technology/TechOrnlLab";
import TechFaq from "@/app/components/technology/TechFaq";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Technology",
  description:
    "The supply chain is not constrained by resources. It is constrained by processing, and we aim to solve this.",
  alternates: { canonical: "/technology" },
  openGraph: {
    title: "Technology | United Rare Earths",
    description: "The supply chain is not constrained by resources. It is constrained by processing, and we aim to solve this.",
    url: "/technology",
    type: "website",
  },
  twitter: {
    title: "Technology | United Rare Earths",
    description: "The supply chain is not constrained by resources. It is constrained by processing, and we aim to solve this.",
  },
};

export default async function TechnologyPage() {
  const acf = await getPageAcf<TechnologyAcf>("technology");
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Technology", path: "/technology" },
        ])}
      />
      <CmnBanner
        variant="inner"
        sub_title={acf?.banner_section?.sub_title || "Technology"}
        title={
          acf?.banner_section?.title ||
          "The supply chain is not constrained by resources. It is constrained by processing, and we aim to solve this."
        }
        background_image={
          acf?.banner_section?.background_image ?? {
            url: "https://cdn.spinxweb.net/united-rare-earths/uploads/2026/05/hero-technology.jpg",
            width: 1920,
            height: 1080,
          }
        }
      />
      <TechOverview data={acf?.overview_section} />
      <section className="tech-process bg-cream">
        <TechProcessLead  data={acf?.process_lead} />
        <TechProcessWhy   data={acf?.process_why} />
        <TechProcessCards data={acf?.process_cards} />
      </section>
      <TechOrnlLab data={acf?.ornl_lab_section} />
      <TechFaq     data={acf?.faq_section} />
      <CmnCta {...(acf?.cta_section ?? {})} />
    </>
  );
}
