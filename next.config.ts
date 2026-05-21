import type { NextConfig } from "next";
import path from "path";

const isDev = process.env.NODE_ENV !== "production";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net",
      "style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net https://fonts.googleapis.com",
      "img-src 'self' data: blob: https: http://localhost http://127.0.0.1",
      "font-src 'self' data: https://fonts.gstatic.com",
      "media-src 'self' http://localhost http://127.0.0.1 https://cdn.spinxweb.net https://php2.spinxweb.net https://*.trycloudflare.com",
      "frame-src https://www.youtube.com https://www.youtube-nocookie.com",
      "connect-src 'self' http://localhost http://127.0.0.1 https://cdn.jsdelivr.net https://cdn.spinxweb.net https://php2.spinxweb.net https://*.trycloudflare.com",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'self'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  sassOptions: {
    includePaths: [path.join(process.cwd(), "styles")],
    silenceDeprecations: ["import", "legacy-js-api", "global-builtin", "color-functions"],
  },
  images: {
    remotePatterns: [
      { protocol: "http",  hostname: "localhost",            port: "", pathname: "/**", search: "" },
      { protocol: "http",  hostname: "127.0.0.1",            port: "", pathname: "/**", search: "" },
      { protocol: "https", hostname: "cdn.spinxweb.net",     port: "", pathname: "/**", search: "" },
      { protocol: "https", hostname: "php2.spinxweb.net",    port: "", pathname: "/**", search: "" },
      { protocol: "https", hostname: "*.trycloudflare.com",  port: "", pathname: "/**", search: "" },
    ],
    qualities: [75],
    dangerouslyAllowLocalIP: isDev,
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
