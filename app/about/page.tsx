import type { Metadata } from "next";
import "@/styles/pages/about.scss";

import { getPageAcf } from "@/app/lib/wp/queries";
import { JsonLd, breadcrumbJsonLd } from "@/app/lib/seo/jsonLd";
import type { AboutAcf } from "@/app/lib/wp/types";

import CmnBanner from "@/app/components/shared/CmnBanner";
import CmnCta from "@/app/components/shared/CmnCta";
import AbOverview from "@/app/components/about/AbOverview";
import AbOperate from "@/app/components/about/AbOperate";
import AbBottleneckLead from "@/app/components/about/AbBottleneckLead";
import AbBottleneck from "@/app/components/about/AbBottleneck";
import AbLeadership from "@/app/components/about/AbLeadership";
import HpCapabilities from "@/app/components/home/HpCapabilities";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "About",
  description:
    "United Rare Earths is building the separation and refining infrastructure to turn raw and recycled materials into usable, high-purity elements.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About | United Rare Earths",
    description: "United Rare Earths is building the separation and refining infrastructure to turn raw and recycled materials into usable, high-purity elements.",
    url: "/about",
    type: "website",
  },
  twitter: {
    title: "About | United Rare Earths",
    description: "United Rare Earths is building the separation and refining infrastructure to turn raw and recycled materials into usable, high-purity elements.",
  },
};

export default async function AboutPage() {
  const acf = await getPageAcf<AboutAcf>("about");
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />
      <CmnBanner
        variant="inner"
        sub_title={acf?.banner_section?.sub_title || " About URE"}
        title={
          acf?.banner_section?.title ||
          "United Rare Earths is building the separation and refining infrastructure required to turn raw and recycled materials into usable, high-purity elements."
        }
        background_image={
          acf?.banner_section?.background_image ?? {
            url: "https://cdn.spinxweb.net/united-rare-earths/uploads/2026/05/hero-about.jpg",
            width: 1920,
            height: 1080,
          }
        }
      />
      <AbOverview data={acf?.overview_section} />

      {/*
        Operate / About / Bottleneck are 3 separate ACF groups for editorial
        clarity, but render inside one `.operate-section` so the original SCSS
        cascade (`.operate-section > .operate-inner > .operate-hero +
        .about-bottleneck > .about-bottleneck__lead + .about-bottleneck__grid`)
        stays intact.
      */}
      <section className="operate-section">
        <div className="container">
          <div className="operate-inner">
            <AbOperate data={acf?.operate_section} />
            <div className="about-bottleneck" data-aos="fade-in">
              <AbBottleneckLead data={acf?.about_section} />
              <AbBottleneck    data={acf?.bottleneck_section} />
            </div>
          </div>
        </div>
      </section>

      <HpCapabilities data={acf?.capabilities_section} />
      <AbLeadership data={acf?.leadership_section} />
      <CmnCta {...(acf?.cta_section ?? {})} />
    </>
  );
}
