import Link from "next/link";
import InlineSvg from "@/app/components/shared/InlineSvg";

export default function Footer({ logoSrc }: { logoSrc: string }) {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__top">
          <div className="site-footer__nav">
            <div className="site-footer__col">
              <Link className="site-footer__link" href="/">Home</Link>
              <Link className="site-footer__link" href="/about">About</Link>
              <Link className="site-footer__link" href="/technology">Technology</Link>
            </div>
            <div className="site-footer__col">
              <Link className="site-footer__link" href="/news">News</Link>
              <Link className="site-footer__link" href="/market">Market</Link>
              <Link className="site-footer__link" href="/contact">Contact</Link>
            </div>
          </div>
          <Link className="site-footer__brand" href="/" aria-label="Independence through infrastructure">
            <InlineSvg src={logoSrc} className="site-footer__logo" label="United Rare Earths" />
          </Link>
        </div>

        <div className="site-footer__bottom">
          <span>&copy;{new Date().getFullYear()} United Rare Earths. All rights reserved.</span>
          <span>
            <a href="https://www.spinxdigital.com/" target="_blank" rel="noopener noreferrer">
              Design by SPINX Digital
            </a>
          </span>
          <Link href="/privacy">Privacy</Link>
          <Link href="/do-not-sell-my-info">Do not sell my info</Link>
        </div>
      </div>
    </footer>
  );
}
