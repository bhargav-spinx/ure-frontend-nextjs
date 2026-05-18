import type { TechnologyAcf } from "@/app/lib/wp/types";

const FALLBACK = {
  select_image: "https://cdn.spinxweb.net/united-rare-earths/uploads/2026/05/tech-ornl-placeholder.webp",
  title: "Built on national laboratory science",
  description:
    "<p>United Rare Earths has licensed two innovative technologies from Oak Ridge National Laboratory, one of the U.S. Department of Energy's premier research institutions and one of the largest science and energy laboratories in the world. These technologies were developed in partnership with DOE's Critical Materials Innovation Hub.</p>" +
    "<p>This provides a technical foundation that has been developed and validated within a national laboratory environment. It is not experimental or unproven. It represents years of research applied to one of the most complex challenges in materials processing.</p>" +
    "<p>These licensed technologies are specifically designed to reduce dependence on critical rare earth elements. They support the creation of high-performance magnets engineered to use significantly less rare earth content while maintaining equivalent strength, improving both supply chain resilience and material efficiency. This gives United Rare Earths a competitive advantage that is both technically significant and difficult to replicate.</p>",
};

export default function TechOrnlLab({ data }: { data?: TechnologyAcf["ornl_lab_section"] }) {
  const image       = data?.select_image?.url ?? FALLBACK.select_image;
  const title       = data?.title             ?? FALLBACK.title;
  const description = data?.description       ?? FALLBACK.description;
  return (
    <section className="tech-ornl-lab bg-cream section-pad">
      <div className="container">
        <div className="tech-ornl-lab__inner" data-aos="custom-fade-up">
          <div className="tech-ornl-lab__image">
            <img src={image} alt="" width={342} height={357} />
          </div>
          <div className="tech-ornl-lab__body-wrap">
            <div className="tech-ornl-lab__divider" aria-hidden="true" />
            <div className="tech-ornl-lab__body">
              <h2 className="tech-ornl-lab__title">{title}</h2>
              <div
                className="tech-ornl-lab__copy"
                dangerouslySetInnerHTML={{ __html: description }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
