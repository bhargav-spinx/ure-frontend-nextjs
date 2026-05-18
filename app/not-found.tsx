import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import "@/styles/pages/static-message.scss";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="static-message">
      <div className="container">
        <div className="static-message__inner">
          <div className="static-message__icon" aria-hidden="true">
            <Image
              src="/images/upload/about-bottleneck.svg"
              alt=""
              width={120}
              height={128}
            />
          </div>
          <div className="static-message__copy">
            <h1 className="static-message__eyebrow">Page not found</h1>
            <p className="static-message__body">We can’t seem to find the page that you are looking for. Please check your URL for spelling or capitalization. If you’re having trouble locating your destination, try visiting the homepage.</p>
            <Link href="/" className="btn-ghost-dark">Go to Homepage</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
