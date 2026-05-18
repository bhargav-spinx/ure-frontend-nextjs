import type { TechnologyAcf } from "@/app/lib/wp/types";
import HeavyLightTabs from "@/app/components/shared/HeavyLightTabs";

const FALLBACK = {
  title: "Why we focus on heavy rare earths",
  description: "There are 17 recognized rare earth elements. They are broadly divided into two groups: light rare earths, which are more common and easier to process, and heavy rare earths, which are scarcer, more chemically complex, and more strategically valuable. We focus on heavy rare earths.",
  rows: [
    { title: "Harder to process", description: "Heavy rare earths are more difficult to separate and refine. Their chemical properties require more advanced techniques and greater precision, which is why so few facilities in the world can handle them." },
    { title: "No substitutes",    description: "Heavy rare earths are essential to advanced defense systems, high-performance permanent magnets, EV motors, and next-generation energy technologies. In many applications, there are no viable alternatives." },
    { title: "In shorter supply", description: "Heavy rare earths are less abundant than their light counterparts and their supply is more heavily concentrated. This makes them the most constrained segment of the global supply chain." },
  ],
};

export default function TechProcessWhy({ data }: { data?: TechnologyAcf["process_why"] }) {
  const title       = data?.title       ?? FALLBACK.title;
  const description = data?.description ?? FALLBACK.description;
  const rows        = data?.rows && data.rows.length ? data.rows : FALLBACK.rows;
  return (
    <div className="container">
      <div className="tech-process__why" data-aos="custom-fade-up">
        <div className="tech-process__why-copy">
          <div className="tech-process__why-top">
            <h2 className="tech-process__why-title">{title}</h2>
            <p className="tech-process__why-intro">{description}</p>
          </div>
          <div className="tech-process__why-rows">
            {rows.map((r, i) => (
              <div key={i} className="tech-process__why-row">
                <p className="tech-process__why-label">{r.title}</p>
                <p className="tech-process__why-body">{r.description}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="tech-process__why-visual">
          <HeavyLightTabs theme="light" />
        </div>
      </div>
    </div>
  );
}
