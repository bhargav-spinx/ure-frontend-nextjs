import Link from "next/link";
import type { HomeAcf } from "@/app/lib/wp/types";

type Item = {
  title: string;
  description: string;
  icon_url: string;
  hover_url: string;
  big?: boolean;
};

const FALLBACK_ITEMS: Item[] = [
  {
    title: "Separation", big: true,
    description: "The most technically complex and constrained step in the supply chain, where mixed materials are transformed into individual elements",
    icon_url:  "https://cdn.spinxweb.net/united-rare-earths/uploads/2026/05/cap-separation.svg",
    hover_url: "https://cdn.spinxweb.net/united-rare-earths/uploads/2026/05/cap-hover-separation.webp",
  },
  {
    title: "Refining",
    description: "Purifying separated elements into high-quality materials ready for industrial use",
    icon_url:  "https://cdn.spinxweb.net/united-rare-earths/uploads/2026/05/cap-refining.svg",
    hover_url: "https://cdn.spinxweb.net/united-rare-earths/uploads/2026/05/cap-hover-refining.webp",
  },
  {
    title: "Recycling",
    description: "Recovering rare earth elements from existing materials to support a more resilient and circular supply chain",
    icon_url:  "https://cdn.spinxweb.net/united-rare-earths/uploads/2026/05/cap-recycling.svg",
    hover_url: "https://cdn.spinxweb.net/united-rare-earths/uploads/2026/05/cap-hover-recycling.webp",
  },
];

export default function HpCapabilities({ data }: { data?: HomeAcf["capabilities_section"] }) {
  const subTitle = data?.sub_title ?? "Our Technology";
  const items: Item[] = (data?.items && data.items.length)
    ? data.items.map((it, i) => ({
        title: it.title ?? FALLBACK_ITEMS[i % FALLBACK_ITEMS.length].title,
        description: it.description ?? FALLBACK_ITEMS[i % FALLBACK_ITEMS.length].description,
        icon_url:  it.select_image?.url ?? FALLBACK_ITEMS[i % FALLBACK_ITEMS.length].icon_url,
        hover_url: it.hover_image?.url  ?? FALLBACK_ITEMS[i % FALLBACK_ITEMS.length].hover_url,
        big: i === 0,
      }))
    : FALLBACK_ITEMS;
  const [big, ...rest] = items;
  const ctaLabel = data?.cta_label ?? "Our Technology";
  const ctaHref  = data?.cta_href  ?? "/technology";

  return (
    <section id="capabilities" className="capabilities-section bg-cream section-pad">
      <div className="container">
        <div className="cap-eyebrow" data-aos="custom-fade-up">
          <span className="eyebrow">{subTitle}</span>
        </div>
        <div className="cap-grid" data-aos="custom-fade-up">
          {big && (
            <div
              className="cap-card cap-card--big"
              style={{ ["--cap-hover" as never]: `url('${big.hover_url}')` }}
            >
              <div className="cap-card__top">
                <h2 className="cap-card__title">{big.title}</h2>
              </div>
              <div className="cap-card__icon">
                <img src={big.icon_url} alt="" width={180} height={180} loading="lazy" />
              </div>
              <div className="cap-card__bottom">
                <p className="cap-card__body">{big.description}</p>
              </div>
            </div>
          )}
          <div className="cap-stack">
            {rest.map((it, i) => (
              <div
                key={i}
                className="cap-card cap-card--small"
                style={{ ["--cap-hover" as never]: `url('${it.hover_url}')` }}
              >
                <div className="cap-card__top">
                  <h2 className="cap-card__title">{it.title}</h2>
                  <div className="cap-card__icon">
                    <img src={it.icon_url} alt="" width={71} height={55} loading="lazy" />
                  </div>
                </div>
                <div className="cap-card__bottom">
                  <p className="cap-card__body">{it.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="cap-cta" data-aos="custom-fade-up">
          <Link href={ctaHref} className="btn-ghost-dark">{ctaLabel}</Link>
        </div>
      </div>
    </section>
  );
}
