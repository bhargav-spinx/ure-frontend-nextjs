import type { MarketAcf } from "@/app/lib/wp/types";

const FALLBACK = {
  sub_title: "The Current Landscape",
  title: "A supply chain built on concentration",
  description:
    "<p>Rare earth elements are found and mined across multiple countries. But the ability to process those materials, specifically the separation and refining stages, is overwhelmingly concentrated in one place.</p>" +
    "<p>China controls an estimated 80 to 90 percent of global rare earth processing capacity. This means that regardless of where materials are sourced, the vast majority must pass through a single country's infrastructure before they can be used.</p>" +
    "<p>This concentration has created a structural imbalance. Many countries, including the United States, can access raw materials but lack the domestic infrastructure to turn them into usable elements at scale.</p>",
};

export default function MktLandscape({ data }: { data?: MarketAcf["landscape_section"] }) {
  const subTitle    = data?.sub_title   ?? FALLBACK.sub_title;
  const title       = data?.title       ?? FALLBACK.title;
  const description = data?.description ?? FALLBACK.description;
  return (
    <section className="market-page__section">
      <div className="container">
        <div className="cmn-landscape" data-aos="custom-fade-up">
          <p className="cmn-landscape__eyebrow">{subTitle}</p>
          <div className="cmn-landscape__row">
            <h2 className="cmn-landscape__title">{title}</h2>
            <div className="cmn-landscape__body-wrap">
              <div className="cmn-landscape__divider" aria-hidden="true" />
              <div className="cmn-landscape__body" dangerouslySetInnerHTML={{ __html: description }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
