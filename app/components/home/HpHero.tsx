import CmnBanner from "@/app/components/shared/CmnBanner";
import type { HomeAcf } from "@/app/lib/wp/types";

const FALLBACK = {
  title: "Building the Infrastructure Behind Rare Earth Supply",
  description:
    "Rare earth materials are only usable once they are separated and refined. United Rare Earths is developing the domestic processing capability required to produce high-purity materials and support a resilient supply chain.",
  background_video: "https://cdn.spinxweb.net/united-rare-earths/uploads/2026/05/ure-video.mp4",
  primary_cta_label: "What We Do",
  primary_cta_href: "#capabilities",
  secondary_cta_label: "Our Technology",
  secondary_cta_href: "/technology",
};

export default function HpHero({ data }: { data?: HomeAcf["banner_section"] }) {
  // Hero is multi-line — join repeater rows into a single string (joined by " ")
  // so the markup can wrap them visually via CSS without overcomplicating ACF.
  const lines = data?.hero_lines?.map((l) => l.title).filter(Boolean) ?? [];
  const title       = lines.length ? lines.join(" ") : FALLBACK.title;
  const description = data?.description         ?? FALLBACK.description;
  const videoUrl    = data?.background_video    ?? FALLBACK.background_video;
  const p1Label     = data?.primary_cta_label   ?? FALLBACK.primary_cta_label;
  const p1Href      = data?.primary_cta_href    ?? FALLBACK.primary_cta_href;
  const p2Label     = data?.secondary_cta_label ?? FALLBACK.secondary_cta_label;
  const p2Href      = data?.secondary_cta_href  ?? FALLBACK.secondary_cta_href;
  return (
    <CmnBanner
      variant="home"
      title={title}
      description={description}
      background_video={videoUrl}
      ctas={[
        { label: p1Label, href: p1Href },
        { label: p2Label, href: p2Href },
      ]}
    />
  );
}
