import type { TechnologyAcf } from "@/app/lib/wp/types";

const FALLBACK = {
  sub_title: "Process",
  title: "Turning complex materials into usable elements",
  description:
    "<p>We take materials that contain rare earth elements, whether from mining or recycled sources such as spent permanent magnets, and turn them into usable, high-purity materials.</p>" +
    "<p>Rare earth elements do not occur individually. They are found mixed together in the same material, and they are chemically very similar to one another. Separating them requires specialized technology, precision, and significant infrastructure. This challenge is even greater for heavy rare earth elements, which require more advanced techniques and greater precision to isolate. This is why separation is the defining technical challenge and the primary constraint in the supply chain.</p>" +
    "<p>Our process takes these complex, mixed inputs and converts them into clean, high-purity building blocks that manufacturers can rely on for defense systems, energy infrastructure, electric vehicles, and advanced electronics.</p>",
};

export default function TechOverview({ data }: { data?: TechnologyAcf["overview_section"] }) {
  const subTitle    = data?.sub_title   ?? FALLBACK.sub_title;
  const title       = data?.title       ?? FALLBACK.title;
  const description = data?.description ?? FALLBACK.description;
  return (
    <section className="tech-overview-section bg-cream section-pad">
      <div className="container">
        <div className="cmn-landscape" data-aos="custom-fade-up">
          <p className="cmn-landscape__eyebrow">{subTitle}</p>
          <div className="cmn-landscape__row">
            <h2 className="cmn-landscape__title">{title}</h2>
            <div className="cmn-landscape__body-wrap">
              <div className="cmn-landscape__divider" aria-hidden="true" />
              <div
                className="cmn-landscape__body"
                dangerouslySetInnerHTML={{ __html: description }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
