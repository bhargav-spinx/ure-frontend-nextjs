"use client";

import { useState } from "react";
import type { AboutAcf } from "@/app/lib/wp/types";

const FALLBACK = {
  title: "Leadership",
  team: [
    { name: "Jeffrey Willis", designation: "CEO and Founding Partner",                  bio: "Jeffrey Willis brings over 25 years of experience in critical infrastructure development, energy policy, and strategic finance. He leads the company's long-term vision for building domestic rare earth processing capabilities that serve both commercial and national security objectives.", photo: "https://cdn.spinxweb.net/united-rare-earths/uploads/2026/05/headshot-jeffrey-willis.jpg" },
    { name: "John Graves",    designation: "Founding Partner",                          bio: "John Graves brings deep operational experience across rare earth processing, industrial plant development, and critical minerals policy, with a background spanning operations and commercial strategy at scale.",                                                                                                       photo: "https://cdn.spinxweb.net/united-rare-earths/uploads/2026/05/headshot-tom-armel.jpg" },
    { name: "Dr. Bob Wright", designation: "Founding Partner",                          bio: "Dr. Bob Wright directs technology development programs, including commercialization of separation and refining technologies licensed from Oak Ridge National Laboratory. His background spans rare earth chemistry, process engineering, and laboratory-to-plant scale-up.",                                          photo: "https://cdn.spinxweb.net/united-rare-earths/uploads/2026/05/headshot-david-caldwell.jpg" },
    { name: "Maggie Chen",    designation: "Vice President, Operations Development",    bio: "Maggie Chen leads operational planning, site development, and supply chain buildout. She brings extensive experience navigating federal procurement, defense supply chain programs, and critical minerals policy.",                                                                                                  photo: "https://cdn.spinxweb.net/united-rare-earths/uploads/2026/05/headshot-margaret-chen.jpg" },
    { name: "Sarah Novak",    designation: "Director of Process Engineering",           bio: "Sarah Novak leads the process engineering team responsible for designing and optimizing United Rare Earths' separation and refining systems. Her technical background in chemical engineering and rare earth hydrometallurgy is central to the company's ability to achieve the purity specifications required by defense and advanced manufacturing customers.", photo: "https://cdn.spinxweb.net/united-rare-earths/uploads/2026/05/headshot-sarah-novak.jpg" },
  ],
};

export default function AbLeadership({ data }: { data?: AboutAcf["leadership_section"] }) {
  const titleText = data?.title ?? FALLBACK.title;
  const team = data?.leadership_team && data.leadership_team.length
    ? data.leadership_team.map((p, i) => ({
        name:        p.name        ?? FALLBACK.team[i % FALLBACK.team.length].name,
        designation: p.designation ?? FALLBACK.team[i % FALLBACK.team.length].designation,
        bio:         p.bio         ?? FALLBACK.team[i % FALLBACK.team.length].bio,
        photo:       p.select_image?.url ?? FALLBACK.team[i % FALLBACK.team.length].photo,
      }))
    : FALLBACK.team;
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section className="about-leadership-section bg-cream section-pad">
      <div className="container">
        <div className="leadership" data-aos="custom-fade-up">
          <p className="leadership__eyebrow">{titleText}</p>
          <div className="leadership__list">
            {team.map((p, i) => {
              const open = openIdx === i;
              return (
                <div key={i} className={`leadership-row${open ? " is-open" : ""}`}>
                  <button
                    type="button"
                    className="leadership-row__trigger"
                    aria-expanded={open}
                    aria-controls={`bio-${i}`}
                    onClick={() => setOpenIdx(open ? null : i)}
                  >
                    <div className="leadership-row__photo">
                      <img src={p.photo} alt="" width={104} height={104} />
                    </div>
                    <div className="leadership-row__info">
                      <p className="leadership-row__name">{p.name}</p>
                      <p className="leadership-row__title">{p.designation}</p>
                    </div>
                    <span className="leadership-row__icon" aria-hidden="true" />
                  </button>
                  <div
                    className="leadership-row__body"
                    id={`bio-${i}`}
                    hidden={!open}
                  >
                    <p>{p.bio}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
