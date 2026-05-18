import Link from "next/link";
import type { MarketAcf } from "@/app/lib/wp/types";

const FALLBACK = {
  select_image: "https://cdn.spinxweb.net/united-rare-earths/uploads/2026/05/market-globe-us.png",
  title: "United Rare Earth is addressing the most critical gap",
  description:
    "<p>The rare earth supply chain is not limited by access to raw materials. It is limited by the ability to process them. Separation and refining is the primary bottleneck, and for heavy rare earth elements, the gap is widest and the stakes are highest. United Rare Earths is building that processing capability domestically.</p>" +
    "<p>We are the enabling layer. The step that transforms materials into usable inputs and allows the rest of the ecosystem to function.</p>",
  cta_label: "Our Technology",
  cta_href: "/technology",
};

export default function MktGap({ data }: { data?: MarketAcf["gap_section"] }) {
  const image       = data?.select_image?.url ?? FALLBACK.select_image;
  const title       = data?.title             ?? FALLBACK.title;
  const description = data?.description       ?? FALLBACK.description;
  const ctaLabel    = data?.cta_label         ?? FALLBACK.cta_label;
  const ctaHref     = data?.cta_href          ?? FALLBACK.cta_href;
  return (
    <section className="market-page__section market-page__section--gap">
      <div className="container">
        <div className="market-gap" data-aos="custom-fade-up">
          <div className="market-gap__image">
            <img src={image} alt="" width={485} height={485} />
          </div>
          <div className="market-gap__content">
            <div className="market-gap__divider" aria-hidden="true" />
            <div className="market-gap__body">
              <h2 className="market-gap__title">{title}</h2>
              <div className="market-gap__copy" dangerouslySetInnerHTML={{ __html: description }} />
              <Link href={ctaHref} className="market-gap__cta">{ctaLabel}</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
