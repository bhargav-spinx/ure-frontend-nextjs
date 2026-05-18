import type { TechnologyAcf } from "@/app/lib/wp/types";

const FALLBACK = {
  sub_title: "Separation",
  title: "Separation is the control point of the supply chain.",
  description: "Rare earth elements occur naturally together and are chemically so similar that separating them requires exquisitely precise chemistry. Solvent extraction selectively removes individual elements from a mixed solution through hundreds of carefully controlled stages. Our technologies — licensed from Oak Ridge National Laboratory — are specifically engineered for heavy rare earth separation, the most technically demanding segment of the process.",
  specs: [
    { title: "Process Method",  description: "Selective solvent extraction" },
    { title: "Output",          description: "Individual rare earth element solutions" },
    { title: "Target Elements", description: "Heavy rare earths: Tb, Dy, Ho, Er, Tm, Yb, Lu, Y, Gd" },
  ],
  video_url: "https://cdn.spinxweb.net/united-rare-earths/uploads/2026/05/separation-video.mp4",
  icon_url:  "/images/upload/tech-separation-graphic.svg",
};

export default function TechProcessLead({ data }: { data?: TechnologyAcf["process_lead"] }) {
  const subTitle    = data?.sub_title    ?? FALLBACK.sub_title;
  const title       = data?.title        ?? FALLBACK.title;
  const description = data?.description  ?? FALLBACK.description;
  const specs       = data?.specs && data.specs.length ? data.specs : FALLBACK.specs;
  const videoUrl    = data?.select_video ?? FALLBACK.video_url;
  return (
    <div className="tech-process__lead bg-dark" data-aos="custom-fade-up">
      <div className="container">
        <div className="tech-process__lead-inner">
          <div className="tech-process__lead-copy">
            <p className="tech-process__eyebrow"><span>{subTitle}</span></p>
            <h2 className="tech-process__title">{title}</h2>
            <p className="tech-process__body">{description}</p>
            <dl className="tech-process__specs">
              {specs.map((s, i) => (
                <div key={i} className="tech-process__spec">
                  <dt>{s.title}</dt>
                  <dd>{s.description}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="tech-process__lead-graphic" aria-hidden="true">
            <video
              className="tech-process__lead-video"
              src={videoUrl}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
            />
            <div className="tech-process__lead-blend" aria-hidden="true" />
            <div className="tech-process__lead-dim" aria-hidden="true" />
            <img
              className="tech-process__lead-icon"
              src={FALLBACK.icon_url}
              alt=""
              width={200}
              height={200}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
