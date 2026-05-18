"use client";

import { useEffect, useRef, useState } from "react";
import type { MarketAcf } from "@/app/lib/wp/types";

const FALLBACK = {
  stats: [
    { value: "85%",   label: "of global rare earth processing is concentrated in a single country", fill: 85 },
    { value: "< 1%",  label: "of rare earth elements are currently recycled",                       fill: 1  },
    { value: "17",    label: "Rare earth elements critical to modern industry",                     fill: 17 },
  ],
  select_image: "https://cdn.spinxweb.net/united-rare-earths/uploads/2026/05/market-globe-china.png",
};

export default function MktStats({ data }: { data?: MarketAcf["stats_section"] }) {
  const stats = data?.stats && data.stats.length ? data.stats : FALLBACK.stats;
  const image = data?.select_image?.url ?? FALLBACK.select_image;
  const ref = useRef<HTMLDivElement | null>(null);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      setAnimated(true);
      return;
    }
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
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="market-page__section market-page__section--stats">
      <div className="container">
        <div className="market-stats-row">
          <div
            ref={ref}
            className={`market-stats${animated ? " is-animated" : ""}`}
            data-aos="custom-fade-up"
          >
            {stats.map((s, i) => (
              <div
                key={i}
                className="market-stat"
                style={{ ["--fill" as never]: `${s.fill ?? 0}%` }}
              >
                <div className="market-stat__fill" aria-hidden="true" />
                <div className="market-stat__content">
                  <span className="market-stat__value">{s.value}</span>
                  <p className="market-stat__label">{s.label}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="market-stats-image" data-aos="custom-fade-up" data-aos-delay="100">
            <img src={image} alt="" width={485} height={485} />
          </div>
        </div>
      </div>
    </section>
  );
}
