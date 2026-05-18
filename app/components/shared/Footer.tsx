import Link from "next/link";

export default function Footer() {
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
            <img src="/images/upload/footer-logo.svg" alt="" width={80} height={90} />
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
