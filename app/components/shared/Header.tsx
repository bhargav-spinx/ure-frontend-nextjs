"use client";

import Link from "next/link";
import { usePathname, useSelectedLayoutSegment } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";

const NAV = [
  { label: "About",      href: "/about",      key: "about" },
  { label: "Technology", href: "/technology", key: "technology" },
  { label: "Market",     href: "/market",     key: "market" },
  { label: "News",       href: "/news",       key: "news" },
  { label: "Contact",    href: "/contact",    key: "contact" },
];

// Top-level segments (top-of-tree route segment name) that must render the
// dark/transparent header.
const DARK_SEGMENTS = new Set(["about", "technology", "market"]);

// Top-level segments that render the light header.
const LIGHT_SEGMENTS = new Set([
  "contact", "news", "privacy", "do-not-sell-my-info", "thank-you",
]);

// useSelectedLayoutSegment() returns:
//   null    → root `/` (home) — dark
//   "about" → /about — dark
//   "news"  → /news, /news/p/<n> — light
//   "<news-post-slug>" → /<slug> root-routed news post — light
//
// We use this instead of usePathname() because the segment hook is purpose-
// built for layouts and is stable at static prerender time, whereas
// usePathname() can return Next-internal placeholders for `/` that the
// news-post regex would otherwise misclassify as light.
function isLightHeader(segment: string | null): boolean {
  if (segment === null) return false;            // / (home)
  if (DARK_SEGMENTS.has(segment))  return false; // about, technology, market
  if (LIGHT_SEGMENTS.has(segment)) return true;  // contact, news, etc.
  return true;                                    // anything else = news post slug
}

export default function Header({ logoSlot }: { logoSlot: ReactNode }) {
  // Pathname is still used for nav active-link highlighting (works fine for
  // that since `/about === /about` matches). The header light/dark variant
  // uses useSelectedLayoutSegment() — SSR-stable, no regex traps.
  const pathname = usePathname() || "/";
  const segment  = useSelectedLayoutSegment();
  const [open, setOpen] = useState(false);

  // Close offcanvas on route change.
  useEffect(() => { setOpen(false); }, [pathname]);

  // Lock body scroll while open.
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = prev; };
    }
  }, [open]);

  const isLight = isLightHeader(segment);

  return (
    <header className={`site-header${isLight ? " site-header--light" : ""}`} role="banner">
      <div className="container">
        <nav className="navbar navbar-expand-lg p-0 justify-content-between">
          <Link href="/" className="navbar-brand p-0" aria-label="United Rare Earths">
            {logoSlot}
          </Link>

          <div className="menu-wrapper">
            <button
              type="button"
              className={`navbar-toggler${open ? " is-active" : ""}`}
              aria-label="Toggle navigation"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              <span className="toggler-bar" />
              <span className="toggler-bar" />
              <span className="toggler-bar" />
            </button>

            <div
              className={`offcanvas-lg offcanvas-end navbar-collapse${open ? " show" : ""}`}
              id="mainNavOffcanvas"
              role="dialog"
              aria-modal={open}
              aria-label="Main menu"
            >
              <div className="offcanvas-body">
                <ul id="menu-main-menu" className="navbar-nav align-items-lg-center">
                  {NAV.map((item) => {
                    const active = pathname === item.href || pathname.startsWith(item.href + "/");
                    return (
                      <li
                        key={item.key}
                        className={`nav-item nav-item-${item.key} page${active ? " current-menu-item current_page_item active" : ""}`}
                      >
                        <Link
                          href={item.href}
                          className={`nav-link${active ? " active" : ""}`}
                          aria-current={active ? "page" : undefined}
                        >
                          {item.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </div>

      {open && (
        <button
          type="button"
          className="navbar-backdrop"
          aria-label="Close menu"
          onClick={() => setOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            border: 0,
            zIndex: 1040,
          }}
        />
      )}
    </header>
  );
}
