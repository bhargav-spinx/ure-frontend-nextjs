"use client";

import { useEffect } from "react";

/**
 * Toggles `.is-scrolled` on `.site-header` after the page is scrolled past 20px.
 * Mirrors the behavior in the original custom.js so the SCSS rules that fade in
 * the header backdrop continue to work.
 */
export default function HeaderScrollClass() {
  useEffect(() => {
    const header = document.querySelector(".site-header");
    if (!header) return;
    let ticking = false;
    const apply = () => {
      const y = window.pageYOffset || document.documentElement.scrollTop;
      header.classList.toggle("is-scrolled", y > 20);
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(apply);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    apply();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return null;
}
