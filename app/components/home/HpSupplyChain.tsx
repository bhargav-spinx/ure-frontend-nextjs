"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { HomeAcf } from "@/app/lib/wp/types";

type Step = { n: number; title: string; description: string; img: string };

const FALLBACK_STEPS: Step[] = [
  { n: 1, title: "Raw inputs",          description: "Mined ore and recycled feedstock enter the supply chain.",                                                                                                                                       img: "https://cdn.spinxweb.net/united-rare-earths/uploads/2026/05/sc-step-1.webp" },
  { n: 2, title: "Separation",          description: "Individual rare earth elements are isolated from mixed ore and recycled compounds. The most technically demanding step in the chain.",                                                          img: "https://cdn.spinxweb.net/united-rare-earths/uploads/2026/05/sc-step-2.webp" },
  { n: 3, title: "Refining",            description: "Each separated element is purified to meet the specifications required by defense, energy, and advanced manufacturing applications.",                                                            img: "https://cdn.spinxweb.net/united-rare-earths/uploads/2026/05/sc-step-3.webp" },
  { n: 4, title: "Alloy manufacturing", description: "Refined rare earth oxides and metals become permanent magnets, specialty alloys, and high-performance compounds used across industries.",                                                        img: "https://cdn.spinxweb.net/united-rare-earths/uploads/2026/05/sc-step-4.webp" },
  { n: 5, title: "End products",        description: "Defense systems, electric vehicle motors, wind turbines, robotics, and advanced electronics all depend on rare earth materials processed upstream.",                                            img: "https://cdn.spinxweb.net/united-rare-earths/uploads/2026/05/sc-step-5.webp" },
  { n: 6, title: "Recovery",            description: "End-of-life products are collected and returned. URE recovers rare earth elements from spent magnets, closing the domestic loop.",                                                                img: "https://cdn.spinxweb.net/united-rare-earths/uploads/2026/05/sc-step-6.webp" },
];

const URE_STEPS = new Set([2, 3, 6]);
const AUTO_MS = 3000;

const FALLBACK = {
  sub_title: "Where we fit in the supply chain",
  title: "Building U.S.-based processing capability within a global supply chain",
  description:
    "<p>The rare earth supply chain has one primary constraint: processing. Raw materials are available. End-use demand is growing. What is missing is the midstream infrastructure to separate and refine those materials into usable elements. United Rare Earths operates at that constraint point.</p>" +
    "<p>We also recover rare earth elements from spent permanent magnets, returning high-purity materials to the domestic supply chain. We have secured domestic feedstock from the wind, solar, and automotive EV industries.</p>",
};

export default function HpSupplyChain({ data }: { data?: HomeAcf["supply_chain_section"] }) {
  const subTitle    = data?.sub_title   ?? FALLBACK.sub_title;
  const title       = data?.title       ?? FALLBACK.title;
  const description = data?.description ?? FALLBACK.description;
  const steps: Step[] = useMemo(() => {
    if (!data?.steps || !data.steps.length) return FALLBACK_STEPS;
    return data.steps.slice(0, 6).map((s, i) => ({
      n: i + 1,
      title:       s.title       || FALLBACK_STEPS[i].title,
      description: s.description || FALLBACK_STEPS[i].description,
      img:         FALLBACK_STEPS[i].img,
    }));
  }, [data?.steps]);

  const [idx, setIdx]               = useState(0);
  const [interacted, setInteracted] = useState(false);
  const [hovering, setHovering]     = useState(false);
  const arcRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const svg = arcRef.current;
    if (!svg) return;
    svg.querySelectorAll<SVGGeometryElement>(".sc-arc").forEach((el) => {
      const len = el.getTotalLength?.() ?? 0;
      if (len > 0) el.style.setProperty("--arc-length", String(len));
    });
  }, []);

  useEffect(() => {
    if (hovering) return;
    const id = window.setInterval(() => {
      setInteracted(true);
      setIdx((prev) => (prev + 1) % steps.length);
    }, AUTO_MS);
    return () => clearInterval(id);
  }, [hovering, steps.length]);

  const goTo = useCallback((n: number) => {
    setInteracted(true);
    setIdx(steps.findIndex((s) => s.n === n));
  }, [steps]);

  const advance = useCallback((delta: number) => {
    setInteracted(true);
    setIdx((prev) => (prev + delta + steps.length) % steps.length);
  }, [steps.length]);

  const current = steps[idx];
  const showActive = interacted && idx !== 0;

  return (
    <section className="supply-chain-section bg-cream section-pad">
      <div className="container">
        <div className="supply-chain__layout" data-aos="custom-fade-up">
          <div className="supply-chain__intro">
            <span className="supply-chain__eyebrow">{subTitle}</span>
            <h2 className="supply-chain__title">{title}</h2>
            <div className="supply-chain__body" dangerouslySetInnerHTML={{ __html: description }} />
          </div>

          <div
            className="supply-chain__infographic"
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            onFocus={() => setHovering(true)}
            onBlur={() => setHovering(false)}
          >
            <div className="supply-chain__nav">
              <button type="button" className="supply-chain__arrow" id="sc-prev" aria-label="Previous step" onClick={() => advance(-1)}>
                <svg width="21" height="11" viewBox="0 0 21 11" fill="none" aria-hidden="true">
                  <path d="M1 10L10.5 1L20 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <div className="supply-chain__nav-line" aria-hidden="true" />
              <button type="button" className="supply-chain__arrow" id="sc-next" aria-label="Next step" onClick={() => advance(1)}>
                <svg width="21" height="11" viewBox="0 0 21 11" fill="none" aria-hidden="true">
                  <path d="M1 1L10.5 10L20 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>

            <div className="supply-chain__wheel">
              <svg ref={arcRef} className="supply-chain__ring" viewBox="0 0 588 462" aria-hidden="true">
                <line className="sc-arc-bg" x1="43" y1="236" x2="141" y2="236" fill="none" strokeWidth="1" stroke="#DCD4CA" />
                <path className="sc-arc-bg" d="M 141 236 A 223 223 0 0 1 294 21" fill="none" strokeWidth="6" stroke="#5e8f7c" />
                <path className="sc-arc-bg" d="M 294 21 A 223 223 0 0 1 547 103 A 223 223 0 0 1 547 360 A 223 223 0 0 1 294 441" fill="none" strokeWidth="1" stroke="#DCD4CA" />
                <path className="sc-arc-bg" d="M 294 441 A 223 223 0 0 1 141 236" fill="none" strokeWidth="6" stroke="#5e8f7c" />
                {[
                  { seg: 1, type: "line", props: { x1: 43, y1: 236, x2: 141, y2: 236 } as const },
                  { seg: 2, type: "path", d: "M 141 236 A 223 223 0 0 1 294 21" },
                  { seg: 3, type: "path", d: "M 294 21  A 223 223 0 0 1 547 103" },
                  { seg: 4, type: "path", d: "M 547 103 A 223 223 0 0 1 547 360" },
                  { seg: 5, type: "path", d: "M 547 360 A 223 223 0 0 1 294 441" },
                  { seg: 6, type: "path", d: "M 294 441 A 223 223 0 0 1 141 236" },
                ].map((arc) => {
                  const cls = !showActive
                    ? "sc-arc"
                    : arc.seg === current.n
                      ? "sc-arc is-active"
                      : arc.seg < current.n
                        ? "sc-arc was-active"
                        : "sc-arc";
                  return arc.type === "line"
                    ? <line key={arc.seg} className={cls} data-segment={arc.seg} {...arc.props} fill="none" />
                    : <path key={arc.seg} className={cls} data-segment={arc.seg} d={arc.d!} fill="none" />;
                })}
              </svg>

              <div className="supply-chain__image">
                <img id="sc-active-img" src={current.img} alt={current.title} width={352} height={352} />
              </div>

              {steps.map((s) => {
                const isUre  = URE_STEPS.has(s.n);
                const active = showActive && s.n === current.n;
                const past   = showActive && s.n < current.n;
                const classes = [
                  "sc-node",
                  `sc-node--${s.n}`,
                  isUre  ? "sc-node--ure" : "",
                  active ? "is-active" : "",
                  past   ? "was-active" : "",
                ].filter(Boolean).join(" ");
                return (
                  <button
                    key={s.n}
                    type="button"
                    className={classes}
                    aria-label={`Step ${s.n}: ${s.title}`}
                    aria-current={active ? "true" : "false"}
                    onClick={() => goTo(s.n)}
                  >
                    <span>{s.n}</span>
                  </button>
                );
              })}
            </div>

            <div className={`supply-chain__caption${showActive && URE_STEPS.has(current.n) ? " is-ure-active" : ""}`}>
              <p className="supply-chain__caption-title">
                <span id="sc-active-num">{current.n}.</span>&nbsp;
                <span id="sc-active-label">{current.title.toUpperCase()}</span>
              </p>
              <p className="supply-chain__caption-body" id="sc-active-desc">{current.description}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
