import type { MarketAcf } from "@/app/lib/wp/types";

const FALLBACK = {
  title: "What's at Stake",
  rows: [
    { title: "Supply chain vulnerability", description: "Reliance on foreign processing exposes the U.S. to disruptions from geopolitical tensions, trade restrictions, and export controls that could cut off access without warning." },
    { title: "National security exposure", description: "Rare earth elements are critical to defense technologies. Dependence on external processing limits control over access to the materials that advanced weapons systems, communications, and aerospace platforms require." },
    { title: "Economic disadvantage",      description: "Without domestic processing, the U.S. has limited influence over the cost, availability, and prioritization of materials that are essential to its industrial base." },
    { title: "Industrial bottleneck",      description: "Even with increased domestic mining, production cannot scale without local processing. The missing midstream stage limits the entire supply chain's capacity to deliver." },
  ],
  select_image: "https://cdn.spinxweb.net/united-rare-earths/uploads/2026/05/market-stake-chip.jpg",
};

export default function MktStake({ data }: { data?: MarketAcf["stake_section"] }) {
  const title = data?.title ?? FALLBACK.title;
  const rows  = data?.rows && data.rows.length ? data.rows : FALLBACK.rows;
  const image = data?.select_image?.url ?? FALLBACK.select_image;
  return (
    <section className="market-page__section">
      <div className="container">
        <div className="stake" data-aos="fade-in">
          <h2 className="stake__title">{title}</h2>
          <div className="stake__bottom">
            <div className="stake__rows">
              {rows.map((r, i) => (
                <div key={i} className="stake__row" data-aos="custom-fade-up" data-aos-delay={i * 75}>
                  <p className="stake__label">{r.title}</p>
                  <p className="stake__body">{r.description}</p>
                </div>
              ))}
            </div>
            <div className="stake__image" data-aos="custom-fade-up" data-aos-delay="150">
              <img src={image} alt="" width={508} height={555} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
