"use client";

import { useState } from "react";

type Tab = "heavy" | "light";

export default function HeavyLightTabs({
  theme = "dark",
}: {
  /** "dark" → tab1-dark.svg/tab2-dark.svg; "light" → tab1-light.svg/tab2-light.svg */
  theme?: "dark" | "light";
}) {
  const [tab, setTab] = useState<Tab>("heavy");
  const heavyImg = theme === "dark" ? "/images/upload/tab1-dark.svg" : "/images/upload/tab1-light.svg";
  const lightImg = theme === "dark" ? "/images/upload/tab2-dark.svg" : "/images/upload/tab2-light.svg";
  return (
    <>
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
          src={heavyImg}
          alt="Heavy rare earth elements"
          className={`heavy-re-focus__img${tab === "heavy" ? " is-active" : ""}`}
        />
        <img
          src={lightImg}
          alt="Light rare earth elements"
          className={`heavy-re-focus__img${tab === "light" ? " is-active" : ""}`}
        />
      </div>
    </>
  );
}
