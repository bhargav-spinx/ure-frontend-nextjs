import Link from "next/link";
import type { HomeAcf } from "@/app/lib/wp/types";

const FALLBACK = {
  sub_title: " The Problem",
  statement: "Demand for rare earths is increasing. The supply chain is not constrained by resources. It is constrained by processing.",
  panel_urls: [
    "https://cdn.spinxweb.net/united-rare-earths/uploads/2026/05/pos-refinery.webp",
    "https://cdn.spinxweb.net/united-rare-earths/uploads/2026/05/pos-minerals.webp",
    "https://cdn.spinxweb.net/united-rare-earths/uploads/2026/05/pos-charging.webp",
  ],
  description_left: "Rare earth materials are only usable once they have been separated into individual elements and refined to high-purity specifications. That processing capability barely exists in the United States. Even when materials are mined domestically, they are shipped overseas because the infrastructure to process them is not here.",
  description_right: "United Rare Earths is building that infrastructure. We operate at the most technically complex stage of the supply chain, transforming raw and recycled materials into the high-purity heavy rare earth elements that defense, energy, and advanced manufacturing depend on.",
  cta_label: "What We Do",
  cta_href: "#capabilities",
};

export default function HpWhoWeAre({ data }: { data?: HomeAcf["who_we_are_section"] }) {
  const subTitle  = data?.sub_title         ?? FALLBACK.sub_title;
  const statement = data?.statement         ?? FALLBACK.statement;
  const panels    = (
    data?.panels && data.panels.length
      ? data.panels.map((p) => p.select_image?.url ?? "")
      : FALLBACK.panel_urls
  ).slice(0, 3);
  while (panels.length < 3) panels.push("");
  const left      = data?.description_left  ?? FALLBACK.description_left;
  const right     = data?.description_right ?? FALLBACK.description_right;
  const ctaLabel  = data?.cta_label         ?? FALLBACK.cta_label;
  const ctaHref   = data?.cta_href          ?? FALLBACK.cta_href;
  return (
    <section className="who-we-are-section">
      <div className="container">
        <div className="who-we-are" data-aos="fade-in">
          <div className="who-we-are__panels">
            <div
              className="who-we-are__panel who-we-are__panel--text"
              style={{ backgroundImage: `url('${panels[0]}')` }}
            >
              <div className="who-we-are__panel-overlay" />
              <div className="who-we-are__panel-content">
                <span className="who-we-are__eyebrow">{subTitle}</span>
                <p className="who-we-are__statement">{statement}</p>
              </div>
            </div>
            <div className="who-we-are__panel" style={{ backgroundImage: `url('${panels[1]}')` }} />
            <div className="who-we-are__panel" style={{ backgroundImage: `url('${panels[2]}')` }} />
          </div>
          <div className="who-we-are__body" data-aos="custom-fade-up">
            <div className="who-we-are__col">
              <p>{left}</p>
            </div>
            <div className="who-we-are__divider" aria-hidden="true" />
            <div className="who-we-are__col">
              <p>{right}</p>
              <Link href={ctaHref} className="btn-ghost-dark">{ctaLabel}</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
