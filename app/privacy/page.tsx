import type { Metadata } from "next";
import "@/styles/pages/news-detail.scss";

import { getPageAcf } from "@/app/lib/wp/queries";
import { JsonLd, breadcrumbJsonLd } from "@/app/lib/seo/jsonLd";
import type { StaticMessageAcf } from "@/app/lib/wp/types";
import StaticArticle from "@/app/components/shared/StaticArticle";
import CmnCta from "@/app/components/shared/CmnCta";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How United Rare Earths handles your personal information.",
  alternates: { canonical: "/privacy" },
};

const FALLBACK_DESCRIPTION =
  "<p>United Rare Earths respects your privacy. This Privacy Policy describes how we collect, use, and share information when you visit our website or otherwise interact with us. By using this site you acknowledge the practices described below.</p>" +
  "<p>We collect information you provide directly — for example, when you submit a contact form — as well as limited technical information such as IP address, browser type, and pages visited. We use this information to respond to inquiries, improve our site, and meet our legal and operational obligations.</p>" +
  "<h3>Information we collect</h3>" +
  "<ul>" +
    "<li>Information you provide through forms, including name, organization, email, and message content</li>" +
    "<li>Technical data automatically collected via cookies and similar technologies</li>" +
    "<li>Aggregated usage statistics that help us understand how the site is used</li>" +
    "<li>Correspondence you send to us by email or other channels</li>" +
  "</ul>" +
  "<h4>How we use your information</h4>" +
  "<p>We use the information we collect to respond to your inquiries, deliver requested materials, and maintain a secure, functional website. We do not sell personal information. We may share information with service providers that support our operations, with successor entities in the event of a merger or acquisition, and as required by law.</p>" +
  "<p>We retain personal information only as long as necessary to fulfill the purposes for which it was collected or as required by applicable law. When information is no longer needed, we take reasonable steps to delete or anonymize it.</p>" +
  "<h5>Your choices</h5>" +
  "<ol>" +
    "<li>You may opt out of marketing communications at any time</li>" +
    "<li>You can request access to or correction of personal information we hold about you</li>" +
    "<li>You can request deletion subject to applicable legal exceptions</li>" +
    "<li>You can adjust your browser settings to limit cookies</li>" +
  "</ol>" +
  "<h4>Contact us</h4>" +
  "<p>If you have questions about this Privacy Policy or our data practices, please contact us through the form on our <a href=\"/contact\">contact page</a>. We update this policy from time to time; the most recent version will always be posted here.</p>";

export default async function PrivacyPage() {
  const acf = await getPageAcf<StaticMessageAcf>("privacy");
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Privacy Policy", path: "/privacy" },
        ])}
      />
      <StaticArticle
        slug="privacy"
        title="Privacy Policy"
        description={acf?.description ?? FALLBACK_DESCRIPTION}
      />
      <CmnCta />
    </>
  );
}
