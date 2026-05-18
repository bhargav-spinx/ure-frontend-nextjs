"use client";

import { useState } from "react";
import type { MarketAcf } from "@/app/lib/wp/types";

type Item = { title: string; description: string; image: string };

const FALLBACK: { sub_title: string; title: string; items: Item[] } = {
  sub_title: "Industries",
  title: "Rare earths are embedded in the technologies these sectors cannot function without.",
  items: [
    { title: "Defense and aerospace",    description: "Precision-guided weapons, jet engines, satellite communications, radar systems, and advanced military electronics all require high-purity rare earth permanent magnets and materials. Without a secure domestic supply, defense readiness is compromised.", image: "https://cdn.spinxweb.net/united-rare-earths/uploads/2026/05/ind-defense.webp" },
    { title: "Energy and renewables",    description: "Direct-drive offshore wind turbines use permanent magnet generators containing 500–600 kg of rare earth magnets per turbine. As offshore wind capacity expands globally, demand for the heavy rare earths used to stabilize these magnets is growing rapidly.",      image: "https://cdn.spinxweb.net/united-rare-earths/uploads/2026/05/ind-energy.webp" },
    { title: "Electric vehicles",        description: "Each EV motor requires up to 2 kg of rare earth permanent magnets. Global EV production is projected to reach 40+ million vehicles annually by 2030. The majority contain NdFeB magnets that depend on heavy rare earth additions — dysprosium and terbium — for high-temperature performance.", image: "https://cdn.spinxweb.net/united-rare-earths/uploads/2026/05/ind-ev.webp" },
    { title: "Advanced electronics",     description: "Smartphones, hard drives, industrial sensors, and data center infrastructure contain rare earth magnets and phosphors. As computing demands grow and semiconductor supply chains are scrutinized, the materials that power these devices receive increased attention.", image: "https://cdn.spinxweb.net/united-rare-earths/uploads/2026/05/ind-electronics.webp" },
    { title: "Industrial manufacturing", description: "The global automation push is driving rapid growth in industrial robotics, each unit relying on multiple rare earth permanent magnet motors. As manufacturers re-shore operations and adopt automation, demand for these components accelerates.",                  image: "https://cdn.spinxweb.net/united-rare-earths/uploads/2026/05/ind-manufacturing.jpg" },
    { title: "Medical technology",       description: "MRI machines require large superconducting magnets containing rare earth materials. Surgical robotics, proton therapy systems, and diagnostic imaging equipment all depend on rare earth components that have no viable substitutes for their specific performance requirements.", image: "https://cdn.spinxweb.net/united-rare-earths/uploads/2026/05/ind-medical.webp" },
  ],
};

export default function MktIndustries({ data }: { data?: MarketAcf["industries_section"] }) {
  const subTitle = data?.sub_title ?? FALLBACK.sub_title;
  const title    = data?.title     ?? FALLBACK.title;
  const items: Item[] = data?.items && data.items.length
    ? data.items.map((it, i) => ({
        title:       it.title       ?? FALLBACK.items[i % FALLBACK.items.length].title,
        description: it.description ?? FALLBACK.items[i % FALLBACK.items.length].description,
        image:       it.select_image?.url ?? FALLBACK.items[i % FALLBACK.items.length].image,
      }))
    : FALLBACK.items;
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <section className="market-page__section market-page__section--industries">
      <div className="container">
        <div className="market-industries" data-aos="custom-fade-up">
          <div className="market-industries__title">
            <p className="market-industries__eyebrow">{subTitle}</p>
            <h2 className="market-industries__h2">{title}</h2>
          </div>

          <div className="market-industries__split">
            <div className="market-industries__image-panel market-ind-img-panel">
              {items.map((it, i) => (
                <img
                  key={i}
                  src={it.image}
                  alt={it.title}
                  width={615}
                  height={615}
                  className={`ind-acc-img${i === openIdx ? " active" : ""}`}
                  data-industry={it.title}
                />
              ))}
            </div>
            <div className="market-industries__accordion market-ind-accordion">
              {items.map((it, i) => {
                const open = openIdx === i;
                return (
                  <div
                    key={i}
                    className={`market-ind-item${open ? " is-open" : ""}`}
                    data-industry={it.title}
                  >
                    <button
                      type="button"
                      className="market-ind-trigger"
                      aria-expanded={open}
                      onClick={() => setOpenIdx(open ? -1 : i)}
                    >
                      <span className="market-ind-title">{it.title}</span>
                      <span className="market-ind-icon" aria-hidden="true">{open ? "−" : "+"}</span>
                    </button>
                    <div className="market-ind-body" hidden={!open}>
                      <p>{it.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
