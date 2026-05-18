"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { HomeAcf } from "@/app/lib/wp/types";

type Industry = { label: string; img: string };

const FALLBACK_INDUSTRIES: Industry[] = [
  { label: "Electric Vehicles",        img: "https://cdn.spinxweb.net/united-rare-earths/uploads/2026/05/ind-ev.webp" },
  { label: "Satellite Communications", img: "https://cdn.spinxweb.net/united-rare-earths/uploads/2026/05/ind-satellite.webp" },
  { label: "Defense & Aerospace",      img: "https://cdn.spinxweb.net/united-rare-earths/uploads/2026/05/ind-defense.webp" },
  { label: "Guidance Systems",         img: "https://cdn.spinxweb.net/united-rare-earths/uploads/2026/05/ind-guidance.webp" },
  { label: "Wind Turbines",            img: "https://cdn.spinxweb.net/united-rare-earths/uploads/2026/05/ind-wind.webp" },
  { label: "Semiconductors",           img: "https://cdn.spinxweb.net/united-rare-earths/uploads/2026/05/ind-semiconductors.webp" },
  { label: "Smartphones & Displays",   img: "https://cdn.spinxweb.net/united-rare-earths/uploads/2026/05/ind-electronics.webp" },
  { label: "Lithium Battery Storage",  img: "https://cdn.spinxweb.net/united-rare-earths/uploads/2026/05/ind-energy.webp" },
  { label: "Industrial Robotics",      img: "https://cdn.spinxweb.net/united-rare-earths/uploads/2026/05/ind-manufacturing.jpg" },
  { label: "MRI Machines",             img: "https://cdn.spinxweb.net/united-rare-earths/uploads/2026/05/ind-medical.webp" },
  { label: "Surgical Robots",          img: "https://cdn.spinxweb.net/united-rare-earths/uploads/2026/05/ind-surgical.webp" },
];

const FALLBACK = {
  title: "Markets",
  description:
    "<p>Rare earth elements are embedded in the technologies the modern world depends on. United Rare Earths is building the high-purity heavy rare earth processing capacity to ensure they can be sourced domestically.</p>",
  cta_label: "Our Market Opportunity",
  cta_href: "/market",
};

export default function HpIndustries({ data }: { data?: HomeAcf["industries_section"] }) {
  const title       = data?.title       || FALLBACK.title;
  const description = data?.description || FALLBACK.description;
  const ctaLabel    = data?.cta_label   || FALLBACK.cta_label;
  const ctaHref     = data?.cta_href    || FALLBACK.cta_href;

  const items: Industry[] =
    data?.items?.length
      ? data.items.map((it, i) => ({
          label: it.label || FALLBACK_INDUSTRIES[i]?.label || "",
          img:   it.select_image?.url || FALLBACK_INDUSTRIES[i]?.img || "",
        }))
      : FALLBACK_INDUSTRIES;

  const [active, setActive] = useState(0);

  return (
    <section className="industries-section bg-cream section-pad">
      <div className="container">
        <div className="row industries-heading-row" data-aos="custom-fade-up">
          <div className="col-12"><h2 className="industries-heading">{title}</h2></div>
        </div>

        <div className="row gx-0 gy-4" data-aos="custom-fade-up">
          <div className="col-lg-4">
            <div className="industries-image-panel">
              {items.map((it, i) => (
                <Image
                  key={i}
                  src={it.img}
                  alt=""
                  width={400}
                  height={500}
                  className={`ind-panel-img${i === active ? " active" : ""}`}
                />
              ))}
            </div>
          </div>

          <div className="col-lg-3 industries-list-col">
            <ul className="industries-list">
              {items.map((it, i) => (
                <li
                  key={i}
                  className={`industry-item${i === active ? " active" : ""}`}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  tabIndex={0}
                >
                  <span className="industry-item__arrow">&rsaquo;</span>
                  {it.label}
                </li>
              ))}
            </ul>
          </div>

          <div className="col-lg-5 industries-body">
            <div className="industries-body__divider" aria-hidden="true" />
            <div className="industries-body__inner">
              <div dangerouslySetInnerHTML={{ __html: description }} />
              <Link href={ctaHref} className="btn-ghost-dark">{ctaLabel}</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
