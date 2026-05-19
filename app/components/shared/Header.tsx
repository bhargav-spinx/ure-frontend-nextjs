"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import SiteLogo from "@/app/components/shared/SiteLogo";

const NAV = [
  { label: "About",      href: "/about",      key: "about" },
  { label: "Technology", href: "/technology", key: "technology" },
  { label: "Market",     href: "/market",     key: "market" },
  { label: "News",       href: "/news",       key: "news" },
  { label: "Contact",    href: "/contact",    key: "contact" },
];

// Hero-driven routes that must ALWAYS render the dark/transparent header.
// Checked first to short-circuit any ambiguous usePathname() output at
// static prerender time (where the hook can return values the news-post
// regex below would otherwise classify as light).
const DARK_HEADER_PATHS = new Set([
  "/", "/about", "/technology", "/market",
]);

// Routes that get the light header variant (dark wordmark on cream/white bg).
const LIGHT_HEADER_PATHS = new Set([
  "/contact",
  "/news",
  "/privacy",
  "/do-not-sell-my-info",
  "/thank-you",
]);

// Top-level reserved slugs — any other single-segment path is a news post
// (root-slug routing). News posts use the light header.
const RESERVED_SLUGS = new Set([
  "about", "contact", "do-not-sell-my-info", "market", "news",
  "privacy", "technology", "thank-you",
]);

function isLightHeader(pathname: string): boolean {
  if (DARK_HEADER_PATHS.has(pathname)) return false;
  if (LIGHT_HEADER_PATHS.has(pathname)) return true;
  if (pathname.startsWith("/news/")) return true; // /news/p/<n>
  // /<slug> root-level news post (not one of the reserved top-level routes).
  const m = pathname.match(/^\/([^/]+)\/?$/);
  return Boolean(m && !RESERVED_SLUGS.has(m[1]));
}

export default function Header() {
  // `||` (not `??`) so we also catch `""` — Next returns an empty string for
  // the `/` route during production SSR, which would slip past `??` and break
  // the DARK_HEADER_PATHS lookup below.
  const pathname = usePathname() || "/";
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

  const isLight = isLightHeader(pathname);

  return (
    <header className={`site-header${isLight ? " site-header--light" : ""}`} role="banner">
      <div className="container">
        <nav className="navbar navbar-expand-lg p-0 justify-content-between">
          <Link href="/" className="navbar-brand p-0" aria-label="United Rare Earths">
            <SiteLogo />
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
