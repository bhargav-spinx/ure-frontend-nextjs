"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const NAV = [
  { label: "About",      href: "/about",      key: "about" },
  { label: "Technology", href: "/technology", key: "technology" },
  { label: "Market",     href: "/market",     key: "market" },
  { label: "News",       href: "/news",       key: "news" },
  { label: "Contact",    href: "/contact",    key: "contact" },
];

export default function Header() {
  const pathname = usePathname() ?? "/";
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

  const isLight = pathname === "/contact" || pathname === "/news" || pathname.startsWith("/news-detail");

  return (
    <header className={`site-header${isLight ? " site-header--light" : ""}`} role="banner">
      <div className="container">
        <nav className="navbar navbar-expand-lg p-0 justify-content-between">
          <Link href="/" className="navbar-brand p-0" aria-label="United Rare Earths">
            <img
              src="/images/upload/ure-logo.svg"
              alt="United Rare Earths"
              className="site-logo"
              width={180}
              height={29}
            />
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
