import type { HomeAcf } from "@/app/lib/wp/types";

const FALLBACK = {
  description: '<span>Separation</span> is the control point of the rare earth supply chain',
  about_icon: "https://cdn.spinxweb.net/united-rare-earths/uploads/2026/05/separation-brand-mark.svg",
};

export default function HpSeparation({ data }: { data?: HomeAcf["separation_statement"] }) {
  const description = data?.description ?? FALLBACK.description;
  const icon = data?.about_icon?.url ?? FALLBACK.about_icon;
  return (
    <section className="separation-statement">
      <div className="container">
        <div className="separation-statement__inner" data-aos="custom-fade-up">
          <div className="separation-statement__mark" aria-hidden="true">
            <img src={icon} alt="" width={80} height={91} />
          </div>
          <p
            className="separation-statement__copy"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </div>
      </div>
    </section>
  );
}
