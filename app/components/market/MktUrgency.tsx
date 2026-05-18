import type { MarketAcf } from "@/app/lib/wp/types";

const FALLBACK = {
  title: "A Convergence of Urgency",
  rows: [
    { title: "Demand",        description: "Rare earth materials are essential to electric vehicles, renewable energy systems, defense applications, and advanced electronics, all sectors scaling rapidly and simultaneously." },
    { title: "Concentration", description: "Approximately 85% of global processing capacity is concentrated in a single country. China has already restricted the export of several critical minerals, and heavy rare earth processing capacity overseas represents a single point of failure." },
    { title: "Timeline",      description: "There is now broad alignment across government and industry that building domestic processing capability is an immediate priority. What was once a policy discussion has become an operational imperative." },
  ],
  select_image: "https://cdn.spinxweb.net/united-rare-earths/uploads/2026/05/market-why-now-visual.webp",
};

export default function MktUrgency({ data }: { data?: MarketAcf["urgency_section"] }) {
  const title = data?.title ?? FALLBACK.title;
  const rows  = data?.rows && data.rows.length ? data.rows : FALLBACK.rows;
  const image = data?.select_image?.url ?? FALLBACK.select_image;
  return (
    <section className="market-page__section market-page__section--flush">
      <div className="container">
        <div className="market-urgency" data-aos="custom-fade-up">
          <div className="market-urgency__image">
            <img src={image} alt="" width={450} height={700} />
          </div>
          <div className="market-urgency__card">
            <h2 className="market-urgency__title">{title}</h2>
            <dl className="market-urgency__rows">
              {rows.map((r, i) => (
                <div key={i} className="market-urgency__row">
                  <dt>{r.title}</dt>
                  <dd>{r.description}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
