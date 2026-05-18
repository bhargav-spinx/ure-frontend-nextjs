"use client";

import { useState } from "react";
import type { TechnologyAcf } from "@/app/lib/wp/types";

const FALLBACK = {
  title: "Frequently Asked Questions",
  items: [
    { title: "What are heavy rare earth elements, and why do they matter?",      description: "<p>The 17 rare earth elements are typically divided into light and heavy groups. Heavy rare earths — including dysprosium, terbium, holmium, erbium, ytterbium, and lutetium — are far less abundant and significantly harder to process than their lighter counterparts. They are critical to the permanent magnets used in EV motors, wind turbines, defense systems, and precision-guided munitions. There are no viable substitutes for many of these applications, and the global supply is overwhelmingly concentrated in China.</p>" },
    { title: "What makes heavy rare earth separation technically difficult?",    description: "<p>Rare earth elements have nearly identical chemical properties, which makes separating them from one another extremely challenging. Solvent extraction — the primary separation technique — requires hundreds of precisely controlled stages to selectively isolate individual elements from a mixed solution. Heavy rare earths sit closer together on the separation curve, meaning greater precision and more sophisticated chemistry is required compared to light rare earth processing.</p>" },
    { title: "What purity levels does URE target?",                              description: "<p>Our processing platform is engineered to deliver rare earth oxides, metals, and salts at purity levels up to 99.9%+. The exact specification depends on the application and customer requirements. Defense and high-performance magnet applications typically require the highest purity thresholds; other industrial applications may accept lower specifications. We produce to customer specification rather than a single standard.</p>" },
    { title: "What feedstocks does URE process?",                                description: "<p>URE is feedstock-agnostic by design. Our platform is engineered to accept mixed rare earth concentrates from mining operations, intermediate products from other processors, and end-of-life permanent magnets for recycling. This flexibility is deliberate — it allows us to process whatever domestic supply becomes available as the U.S. rare earth supply chain matures, without being dependent on any single upstream source.</p>" },
    { title: "How does the magnet recycling process work?",                      description: "<p>Spent NdFeB permanent magnets from EVs, wind turbines, and industrial equipment contain significant concentrations of dysprosium, terbium, and neodymium. Our hydrometallurgical process dissolves the magnet material and selectively recovers each rare earth element through a series of chemical separation steps. The output — high-purity rare earth oxides — is chemically identical to material processed from primary ore.</p>" },
    { title: "What stage of development is URE at?",                             description: "<p>United Rare Earths has completed pilot-scale separation trials demonstrating commercial-ready purity outputs, licensed its core separation and magnet manufacturing technologies from Oak Ridge National Laboratory, and is actively progressing site selection for its first U.S. processing facility. We are in an advanced pre-construction phase, working with government stakeholders, potential offtake partners, and investors to finalize the project financing and regulatory pathway toward first commercial production.</p>" },
  ],
};

export default function TechFaq({ data }: { data?: TechnologyAcf["faq_section"] }) {
  const title = data?.title ?? FALLBACK.title;
  const items = data?.items && data.items.length ? data.items : FALLBACK.items;
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  return (
    <section className="tech-faq-section bg-cream section-pad">
      <div className="container">
        <div className="tech-faq-section__inner" data-aos="custom-fade-up">
          <h2 className="tech-faq-section__title">{title}</h2>
          <div className="faq-accordion">
            {items.map((item, i) => {
              const open = openIdx === i;
              return (
                <div key={i} className={`faq-acc-item${open ? " is-open" : ""}`}>
                  <button
                    type="button"
                    className="faq-acc-trigger"
                    aria-expanded={open}
                    aria-controls={`faq-${i + 1}`}
                    onClick={() => setOpenIdx(open ? null : i)}
                  >
                    <h4 className="faq-acc-question">{item.title}</h4>
                    <span className="faq-acc-icon" aria-hidden="true">{open ? "−" : "+"}</span>
                  </button>
                  <div
                    className="faq-acc-body"
                    id={`faq-${i + 1}`}
                    hidden={!open}
                    dangerouslySetInnerHTML={{ __html: item.description ?? "" }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
