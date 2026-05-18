import type { AboutAcf } from "@/app/lib/wp/types";

const FALLBACK = {
  rows: [
    {
      title: "Heavy rare earth specialization",
      description:
        "<p>Most companies in this space focus on light rare earth elements, which are more abundant and easier to process. We specialize in heavy rare earths, including the elements critical to permanent magnets, defense systems, and high-performance motors. These materials are harder to separate, in shorter supply globally, and have no viable substitutes in many applications. This is where the greatest strategic value lies, and it is where we focus.</p>",
    },
    {
      title: "Oak Ridge licensed technology",
      description:
        "<p>Our core separation technology is licensed from <a href=\"https://www.ornl.gov/\" target=\"_blank\" rel=\"noopener\">Oak Ridge National Laboratory</a>, one of the U.S. Department of Energy's premier research institutions, developed in partnership with DOE's Critical Materials Innovation Hub. These technologies are specifically designed to produce high-purity heavy rare earth materials and to enable high-performance magnets engineered to use fewer critical minerals.</p>",
    },
    {
      title: "Magnet recycling and recovery",
      description:
        "<p>We recycle spent permanent magnets from electric vehicles, wind turbines, and industrial equipment, recovering the heavy rare earth elements inside them and returning high-purity materials to the domestic supply chain. We have already secured domestic sources of feedstock from the wind, solar, and automotive EV industries. This circular approach reduces waste, reduces dependence on mined inputs, and strengthens U.S. supply chain resilience.</p>",
    },
  ],
  highlight_image: "https://cdn.spinxweb.net/united-rare-earths/uploads/2026/05/about-operate-2.webp",
};

export default function AbBottleneck({ data }: { data?: AboutAcf["bottleneck_section"] }) {
  const rows  = data?.bottleneck_rows && data.bottleneck_rows.length ? data.bottleneck_rows : FALLBACK.rows;
  const image = data?.highlight_image?.url ?? FALLBACK.highlight_image;
  return (
    <div className="about-bottleneck__grid">
      <div className="about-bottleneck__list">
        {rows.map((r, i) => (
          <div key={i} className="about-bottleneck__row">
            <p className="about-bottleneck__label">{r.title}</p>
            <div className="about-bottleneck__cell">
              <div
                className="about-bottleneck__body"
                dangerouslySetInnerHTML={{ __html: r.description ?? "" }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="about-bottleneck__image">
        <img src={image} alt="" width={550} height={700} />
      </div>
    </div>
  );
}
