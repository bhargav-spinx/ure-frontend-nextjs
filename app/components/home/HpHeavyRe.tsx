"use client";

import Link from "next/link";
import { useState } from "react";
import type { HomeAcf } from "@/app/lib/wp/types";

const FALLBACK = {
  sub_title: "Heavy Rare Earth Specialization",
  title: "Heavy rare earths are the most constrained segment of the supply chain",
  description:
    "<p>Most companies in this space focus on light rare earth elements, which are more abundant and easier to process. United Rare Earths specializes in heavy rare earths, the materials that are scarcer, harder to separate, and most critical to advanced defense and energy technologies. In many cases, there are no viable substitutes.</p>" +
    "<p>Our processing platform addresses the specific challenges of heavy rare earth separation, producing high-purity materials at the specifications these applications require.</p>",
  cta_label: "Learn More",
  cta_href: "/technology",
  tabImages: {
    heavy: "/images/upload/tab1-dark.svg",
    light: "/images/upload/tab2-dark.svg",
  },
};

type Tab = "heavy" | "light";

export default function HpHeavyRe({ data }: { data?: HomeAcf["heavy_re_focus_section"] }) {
  const subTitle    = data?.sub_title   ?? FALLBACK.sub_title;
  const title       = data?.title       ?? FALLBACK.title;
  const description = data?.description ?? FALLBACK.description;
  const ctaLabel    = data?.cta_label   ?? FALLBACK.cta_label;
  const ctaHref     = data?.cta_href    ?? FALLBACK.cta_href;
  const [tab, setTab] = useState<Tab>("heavy");

  return (
    <section className="heavy-re-focus heavy-re-focus--dark bg-dark section-pad">
      <div className="container">
        <div className="heavy-re-focus__inner">
          <div className="heavy-re-focus__left" data-aos="custom-fade-up">
            <div className="heavy-re-focus__tabs" role="tablist" aria-label="Rare earth group">
              <button
                type="button"
                className={`heavy-re-focus__tab${tab === "heavy" ? " is-active" : ""}`}
                role="tab"
                aria-selected={tab === "heavy"}
                onClick={() => setTab("heavy")}
              >
                Heavy Rare Earths
              </button>
              <button
                type="button"
                className={`heavy-re-focus__tab${tab === "light" ? " is-active" : ""}`}
                role="tab"
                aria-selected={tab === "light"}
                onClick={() => setTab("light")}
              >
                Light Rare Earths
              </button>
            </div>
            <div className="heavy-re-focus__panel">
              <img
                src={FALLBACK.tabImages.heavy}
                alt="Heavy rare earth elements"
                className={`heavy-re-focus__img${tab === "heavy" ? " is-active" : ""}`}
              />
              <img
                src={FALLBACK.tabImages.light}
                alt="Light rare earth elements"
                className={`heavy-re-focus__img${tab === "light" ? " is-active" : ""}`}
              />
            </div>
          </div>
          <div className="heavy-re-focus__right" data-aos="custom-fade-up" data-aos-delay="100">
            <div className="heavy-re-focus__divider" aria-hidden="true" />
            <div className="heavy-re-focus__body">
              <p className="heavy-re-focus__eyebrow">{subTitle}</p>
              <h2 className="heavy-re-focus__title">{title}</h2>
              <div className="heavy-re-focus__copy" dangerouslySetInnerHTML={{ __html: description }} />
              <Link href={ctaHref} className="heavy-re-focus__cta">{ctaLabel}</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
