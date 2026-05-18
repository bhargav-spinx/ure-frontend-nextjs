import type { Metadata, Viewport } from "next";

import "bootstrap/dist/css/bootstrap.min.css";
import "aos/dist/aos.css";
import "@/styles/main.scss";

import Header from "@/app/components/shared/Header";
import Footer from "@/app/components/shared/Footer";
import AOSProvider from "@/app/components/providers/AOSProvider";
import ScrollProgress from "@/app/components/providers/ScrollProgress";
import HeaderScrollClass from "@/app/components/providers/HeaderScrollClass";
import SmoothAnchors from "@/app/components/providers/SmoothAnchors";

const SITE_NAME = "United Rare Earths";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const OG_DEFAULT_IMAGE = "/images/upload/hero-about.jpg";

export const metadata: Metadata = {
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: "Securing the rare earth supply chain.",
  metadataBase: new URL(SITE_URL),
  icons: { icon: "/images/favicon.ico" },
  formatDetection: { telephone: false },
  // Layout-level OG defaults. Every per-page metadata block can override
  // any of these; otherwise Next merges them into the response so social
  // shares always have at least a brand-level preview.
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_US",
    images: [{ url: OG_DEFAULT_IMAGE, width: 1920, height: 1080, alt: SITE_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    images: [OG_DEFAULT_IMAGE],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#c75a1a",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=TASA+Orbiter:wght@400;500;700&family=Rethink+Sans:ital,wght@0,400..800;1,400..800&family=Spline+Sans+Mono:ital,wght@0,300..700;1,300..700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ScrollProgress />
        <Header />
        <HeaderScrollClass />
        <SmoothAnchors />
        <AOSProvider />
        <main className="site-main" role="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
