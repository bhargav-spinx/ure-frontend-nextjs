import type { Metadata } from "next";
import "@/styles/pages/contact.scss";

import { getPageAcf, getGravityForm } from "@/app/lib/wp/queries";
import { JsonLd, breadcrumbJsonLd } from "@/app/lib/seo/jsonLd";
import type { ContactAcf } from "@/app/lib/wp/types";
import ContactForm from "@/app/components/contact/ContactForm";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Whether you are an investor, partner, government stakeholder, or prospective customer, we welcome the conversation.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact | United Rare Earths",
    description: "Whether you are an investor, partner, government stakeholder, or prospective customer, we welcome the conversation.",
    url: "/contact",
    type: "website",
  },
  twitter: {
    title: "Contact | United Rare Earths",
    description: "Whether you are an investor, partner, government stakeholder, or prospective customer, we welcome the conversation.",
  },
};

const FALLBACK = {
  sub_title: "Get in Touch",
  title: "Let's talk",
  description: "<p>Whether you are an investor, a potential partner, a government stakeholder, or a prospective customer, we welcome the conversation. The work we are doing requires collaboration across sectors.</p>",
  hq_label: "Headquarters",
  hq_address: "<p>2550 Meridian Blvd, Suite 600<br/>Franklin, TN 37067</p>",
  gi_label: "General Inquiries",
  gi_email: "info@unitedre.com",
};

export default async function ContactPage() {
  const acf  = await getPageAcf<ContactAcf>("contact");
  const intro = acf?.intro_section;
  const info  = acf?.contact_info;
  const form  = acf?.form_section;

  const subTitle    = intro?.sub_title   ?? FALLBACK.sub_title;
  const title       = intro?.title       ?? FALLBACK.title;
  const description = intro?.description ?? FALLBACK.description;
  const hqLabel     = info?.hq_label     ?? FALLBACK.hq_label;
  const hqAddr      = info?.hq_address   ?? FALLBACK.hq_address;
  const giLabel     = info?.gi_label     ?? FALLBACK.gi_label;
  const giEmail     = info?.gi_email     ?? FALLBACK.gi_email;

  // Fetch the GF schema for the form_id chosen in ACF (defaults to 3).
  const formId = form?.form_id && Number(form.form_id) > 0 ? Number(form.form_id) : 3;
  const gfForm = await getGravityForm(formId);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />
      <section className="contact-section bg-cream section-pad">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 mb-5 mb-lg-0" data-aos="custom-fade-up">
              <span className="eyebrow">{subTitle}</span>
              <h1 className="h2">{title}</h1>
              <div className="rich-text" dangerouslySetInnerHTML={{ __html: description }} />

              <div className="contact-info mt-4">
                <div className="contact-info-item">
                  <span className="contact-info-item__label">{hqLabel}</span>
                  <div className="contact-info-item__value" dangerouslySetInnerHTML={{ __html: hqAddr }} />
                </div>
                <div className="contact-info-item mt-5">
                  <span className="contact-info-item__label">{giLabel}</span>
                  <div className="contact-info-item__value">
                    <p><a href={`mailto:${giEmail}`}>{giEmail}</a></p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-7 offset-lg-1" data-aos="custom-fade-up" data-aos-delay="100">
              <div className="contact-form-wrap">
                {form?.form_intro && (
                  <p className="contact-form-intro" style={{ marginBottom: 24 }}>{form.form_intro}</p>
                )}
                {gfForm ? (
                  <ContactForm form={gfForm} />
                ) : (
                  <p style={{ color: "var(--neutral-500)", fontSize: 14 }}>
                    Form #{formId} could not be loaded. Check that Gravity Forms is active and the form ID is correct.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
