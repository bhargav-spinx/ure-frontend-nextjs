import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import "@/styles/pages/static-message.scss";

import { getPageAcf } from "@/app/lib/wp/queries";
import { JsonLd, breadcrumbJsonLd } from "@/app/lib/seo/jsonLd";
import type { StaticMessageAcf } from "@/app/lib/wp/types";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Thank you",
  description: "Thanks for getting in touch.",
  alternates: { canonical: "/thank-you" },
  robots: { index: false, follow: false },
};

const FALLBACK = {
  eyebrow: "Thanks for your message!",
  body:
    "We’ve received your message and truly appreciate you taking the time to reach out. Our team will review your message and get back to you as soon as possible. In the meantime, feel free to explore more of our site.",
  icon: "/images/upload/about-bottleneck.svg",
  cta_label: "Go to Homepage",
  cta_href: "/",
};

export default async function ThankYouPage() {
  const acf = await getPageAcf<StaticMessageAcf>("thank-you");

  const eyebrow  = acf?.eyebrow   || FALLBACK.eyebrow;
  const body     = acf?.body      || FALLBACK.body;
  const iconUrl  = acf?.icon?.url || FALLBACK.icon;
  const ctaLabel = acf?.cta_label || FALLBACK.cta_label;
  const ctaHref  = acf?.cta_href  || FALLBACK.cta_href;

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Thank you", path: "/thank-you" },
        ])}
      />
      <section className="static-message">
        <div className="container">
          <div className="static-message__inner">
            <div className="static-message__icon" aria-hidden="true">
              <Image src={iconUrl} alt="" width={120} height={128} />
            </div>
            <div className="static-message__copy">
              <h1 className="static-message__eyebrow">{eyebrow}</h1>
              <p className="static-message__body">{body}</p>
              <Link href={ctaHref} className="btn-ghost-dark">{ctaLabel}</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
