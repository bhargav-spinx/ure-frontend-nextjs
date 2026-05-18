import Link from "next/link";
import type { AcfImage, CtaSection } from "@/app/lib/wp/types";

const FALLBACK = {
  title: "Building the Future of Rare Earth Processing",
  description: "United Rare Earths is building the infrastructure required to enable a secure and scalable supply chain. Whether you are an investor, partner, or government stakeholder, we welcome the conversation.",
  cta_label: "Get in Touch",
  cta_href: "/contact",
  background_image: "https://cdn.spinxweb.net/united-rare-earths/uploads/2026/05/cta-bg.webp",
};

export default function CmnCta(props: Partial<CtaSection> = {}) {
  const title       = props.title       || FALLBACK.title;
  const description = props.description || FALLBACK.description;
  const ctaLabel    = props.cta_label   || FALLBACK.cta_label;
  const ctaHref     = props.cta_href    || FALLBACK.cta_href;
  const bg = (props.background_image as AcfImage | undefined)?.url || FALLBACK.background_image;
  return (
    <section className="cmn-cta">
      <div className="cmn-cta__bg" style={{ backgroundImage: `url('${bg}')` }} />
      <div className="cmn-cta__overlay" />
      <div className="container">
        <div className="cmn-cta__inner">
          <h2 className="cmn-cta__headline" data-aos="custom-fade-up">{title}</h2>
          <div className="cmn-cta__side" data-aos="custom-fade-up" data-aos-delay="100">
            <p>{description}</p>
            <Link href={ctaHref} className="btn-ghost-light">{ctaLabel}</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
