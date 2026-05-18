import type { AboutAcf } from "@/app/lib/wp/types";

const FALLBACK = {
  sub_title: "Overview",
  title: "Building U.S.-based processing capability within a global supply chain",
  description:
    "<p>The United States has virtually no domestic capability to process rare earths. Even when materials are mined on American soil, they are shipped overseas for separation and refining, primarily to China.</p>" +
    "<p>United Rare Earths is building the midstream processing infrastructure to change that, with a focus on high-purity heavy rare earth materials, the elements that are hardest to process and most critical to advanced technologies.</p>",
};

export default function AbOverview({ data }: { data?: AboutAcf["overview_section"] }) {
  const subTitle    = data?.sub_title   ?? FALLBACK.sub_title;
  const title       = data?.title       ?? FALLBACK.title;
  const description = data?.description ?? FALLBACK.description;
  return (
    <section className="about-overview-section bg-cream section-pad">
      <div className="container">
        <div className="about-overview" data-aos="custom-fade-up">
          <span className="about-overview__eyebrow">{subTitle}</span>
          <div className="about-overview__row">
            <h2 className="about-overview__title">{title}</h2>
            <div className="about-overview__body">
              <div className="about-overview__divider" aria-hidden="true" />
              <div
                className="about-overview__copy"
                dangerouslySetInnerHTML={{ __html: description }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
