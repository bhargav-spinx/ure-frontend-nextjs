import Link from "next/link";
import type { AcfImage } from "@/app/lib/wp/types";

export type CmnBannerCta = { label: string; href: string };

type Props = {
  /**
   * "home"  → full-bleed dark hero with optional <video> background.
   * "inner" → static inner banner with single image background + sub_title + title.
   */
  variant: "home" | "inner";
  sub_title?: string;
  /** Inner: single line. Home: pass joined lines or first line. */
  title?: string;
  description?: string;
  background_video?: string;
  background_image?: AcfImage;
  ctas?: CmnBannerCta[];
};

export default function CmnBanner({
  variant,
  sub_title,
  title,
  description,
  background_video,
  background_image,
  ctas,
}: Props) {
  if (variant === "home") {
    return (
      <section className="cmn-banner bg-dark">
        <div className="cmn-banner__bg">
          {background_video ? (
            <video className="cmn-banner__bg-img" autoPlay muted loop playsInline>
              <source src={background_video} type="video/mp4" />
            </video>
          ) : background_image?.url ? (
            <img
              src={background_image.url}
              alt={background_image.alt ?? ""}
              className="cmn-banner__bg-img"
              width={background_image.width ?? 1920}
              height={background_image.height ?? 1080}
            />
          ) : null}
          <div className="cmn-banner__overlay" />
        </div>
        <div className="container">
          <div className="row align-items-end">
            <div className="col-lg-7" data-aos="custom-fade-up">
              {title && (
                <h1 className="display">
                  <span data-aos="slide-up-custom" data-aos-delay="100">{title}</span>
                </h1>
              )}
            </div>
            <div className="col-lg-4 offset-lg-1 cmn-banner__side" data-aos="custom-fade-up" data-aos-delay="200">
              {description && <p className="cmn-banner__subhead">{description}</p>}
              {ctas && ctas.length > 0 && (
                <div className="cmn-banner__ctas">
                  {ctas.map((c, i) => (
                    <Link key={i} href={c.href} className="btn-ghost-light">{c.label}</Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="cmn-banner cmn-banner--inner">
      <div className="cmn-banner__bg">
        {background_image?.url && (
          <img
            src={background_image.url}
            alt={background_image.alt ?? ""}
            className="cmn-banner__bg-img"
            width={background_image.width ?? 1920}
            height={background_image.height ?? 1080}
          />
        )}
        <div className="cmn-banner__overlay" />
      </div>
      <div className="container">
        <div className="row">
          <div className="col-lg-9" data-aos="custom-fade-up">
            {sub_title && <span className="eyebrow">{sub_title}</span>}
            {title && <h1 className="cmn-banner__headline">{title}</h1>}
          </div>
        </div>
      </div>
    </section>
  );
}
