import type { AboutAcf } from "@/app/lib/wp/types";

const FALLBACK = {
  about_icon: "https://cdn.spinxweb.net/united-rare-earths/uploads/2026/05/about-bottleneck.svg",
  bottleneck_statement:
    "We are solving the hardest, most underdeveloped part of the supply chain. <span>Separation</span> and <span>refining</span> is where the supply chain breaks down, and that is where we operate.",
};

export default function AbBottleneckLead({ data }: { data?: AboutAcf["about_section"] }) {
  const icon      = data?.about_icon?.url        ?? FALLBACK.about_icon;
  const statement = data?.bottleneck_statement   ?? FALLBACK.bottleneck_statement;
  return (
    <div className="about-bottleneck__lead">
      <div className="about-bottleneck__icon" aria-hidden="true">
        <img src={icon} alt="" width={120} height={120} />
      </div>
      <p
        className="about-bottleneck__statement"
        dangerouslySetInnerHTML={{ __html: statement }}
      />
    </div>
  );
}
