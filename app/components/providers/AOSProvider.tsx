"use client";

import { useEffect } from "react";
import AOS from "aos";

export default function AOSProvider() {
  useEffect(() => {
    AOS.init({
      easing: "ease",
      duration: 500,
      delay: 0,
      once: true,
    });
  }, []);
  return null;
}
