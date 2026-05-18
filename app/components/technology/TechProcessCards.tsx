import type { TechnologyAcf } from "@/app/lib/wp/types";

type Card = NonNullable<TechnologyAcf["process_cards"]>[number] & { icon_url: string };

const FALLBACK: Card[] = [
  {
    sub_title: "Refining",
    title: "Purity at specification",
    description: "After separation, each element undergoes refining to achieve the purity levels required by the industries that depend on them. Defense applications require different specifications than consumer electronics; high-performance magnets require different purity levels than catalytic converters. We produce refined rare earth metals, oxides, and salts to customer specification, with a focus on the high-purity outputs required by defense contractors, advanced manufacturing, and energy applications.",
    specs: [
      { title: "Output Forms", description: "Oxides, metals, salts — by specification" },
      { title: "Purity",       description: "Up to 99.9%+ available" },
      { title: "Applications", description: "Defense, energy, advanced manufacturing" },
    ],
    icon_url: "https://cdn.spinxweb.net/united-rare-earths/uploads/2026/05/tech-refining-icon.svg",
  },
  {
    sub_title: "Magnet Recycling",
    title: "Magnet recycling and recovery",
    description: "Every EV motor, wind turbine generator, and industrial robot contains powerful permanent magnets made from heavy rare earth elements. When those products reach end of life, those materials can be recovered. Our hydrometallurgical recycling process recovers rare earth elements from spent permanent magnets, producing the same high-purity outputs as primary processing. We have already established relationships with domestic feedstock suppliers in the wind, solar, and EV industries.",
    specs: [
      { title: "Process",   description: "Hydrometallurgical rare earth recovery" },
      { title: "Feedstock", description: "Spent NdFeB magnets from EVs, wind turbines, industrial" },
      { title: "Output",    description: "High-purity RE oxides and metals — same spec as primary" },
    ],
    icon_url: "https://cdn.spinxweb.net/united-rare-earths/uploads/2026/05/tech-recycling-icon.svg",
  },
];

export default function TechProcessCards({ data }: { data?: TechnologyAcf["process_cards"] }) {
  const cards: Card[] = data && data.length
    ? data.map((c, i) => ({ ...c, icon_url: c.select_image?.url ?? FALLBACK[i % FALLBACK.length].icon_url }))
    : FALLBACK;
  return (
    <div className="container">
      <div className="tech-process__cards" data-aos="custom-fade-up">
        {cards.map((c, i) => (
          <article key={i} className="tech-process__card">
            <div className="tech-process__card-icon" aria-hidden="true">
              <img src={c.icon_url} alt="" width={80} height={80} />
            </div>
            <div className="tech-process__card-copy">
              <p className="tech-process__card-eyebrow">{c.sub_title}</p>
              <h3 className="tech-process__card-title">{c.title}</h3>
              <p className="tech-process__card-body">{c.description}</p>
            </div>
            {c.specs && c.specs.length > 0 && (
              <dl className="tech-process__card-specs">
                {c.specs.map((s, j) => (
                  <div key={j} className="tech-process__spec">
                    <dt>{s.title}</dt>
                    <dd>{s.description}</dd>
                  </div>
                ))}
              </dl>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}
