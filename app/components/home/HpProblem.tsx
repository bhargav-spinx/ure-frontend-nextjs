"use client";

import { useEffect, useRef, useState } from "react";
import type { HomeAcf } from "@/app/lib/wp/types";

const FALLBACK = {
  bars: [
    { value: "85%",  label: "of global rare earth processing is concentrated in a single country", fill: 85 },
    { value: "< 1%", label: "of rare earth elements are currently recycled",                       fill: 1  },
  ],
  description: "Even when rare earth materials are mined in the United States, they are sent overseas for processing. The infrastructure to separate and refine them domestically does not yet exist at scale. That is the constraint United Rare Earths was built to address.",
  select_image: "https://cdn.spinxweb.net/united-rare-earths/uploads/2026/05/market-globe-china.png",
};

export default function HpProblem({ data }: { data?: HomeAcf["problem_section"] }) {
  const bars        = data?.bars && data.bars.length ? data.bars : FALLBACK.bars;
  const description = data?.description ?? FALLBACK.description;
  const image       = data?.select_image?.url ?? FALLBACK.select_image;

  const ref = useRef<HTMLElement | null>(null);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setAnimated(true);
            io.disconnect();
            break;
          }
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="problem-section" ref={ref}>
      <div className="container">
        <div className="problem-inner">
          <div className="problem-stack" data-aos="fade-in">
            <div className="problem-bars">
              {bars.map((b, i) => (
                <div key={i} className="problem-bar" data-aos="custom-fade-up">
                  <div
                    className="problem-bar__fill"
                    data-width={b.fill ?? 0}
                    style={{ width: animated ? `${b.fill ?? 0}%` : "0%" }}
                  />
                  <div className="problem-bar__content">
                    <span className="problem-bar__value">{b.value}</span>
                    <span className="problem-bar__label">{b.label}</span>
                  </div>
                </div>
              ))}
            </div>
            <p className="problem-body" data-aos="custom-fade-up" data-aos-delay="200">{description}</p>
          </div>
          <div className="problem-image" data-aos="custom-fade-up" data-aos-delay="150">
            <img src={image} alt="" className="problem-globe" width={485} height={485} />
          </div>
        </div>
      </div>
    </section>
  );
}
