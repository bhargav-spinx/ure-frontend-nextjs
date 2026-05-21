import { readFile } from "node:fs/promises";
import path from "node:path";

/**
 * Server component that inlines an SVG so its paths can be recolored with CSS
 * (e.g. the header wordmark flipping color on light vs dark headers).
 *
 * - `src` starting with "/" is read from the local `public/` folder (the
 *   bundled fallback logo).
 * - Any other `src` is fetched over the network (the WP-uploaded logo),
 *   tagged `wp:options` so the options-save webhook busts it.
 * - Non-SVG sources (png/webp) or any failure fall back to a plain <img>.
 *
 * Sanitization: only admins upload to WP media, but we still strip <script>
 * and inline event handlers before inlining.
 */
async function loadSvgMarkup(src: string): Promise<string | null> {
  try {
    let raw: string;
    if (src.startsWith("/")) {
      raw = await readFile(path.join(process.cwd(), "public", src), "utf8");
    } else {
      const res = await fetch(src, { next: { revalidate: 300, tags: ["wp:options"] } });
      if (!res.ok) return null;
      const ct = res.headers.get("content-type") ?? "";
      raw = await res.text();
      if (!ct.includes("svg") && !raw.includes("<svg")) return null;
    }
    if (!raw.includes("<svg")) return null;
    return raw
      .replace(/<script[\s\S]*?<\/script>/gi, "")
      .replace(/\son\w+\s*=\s*"[^"]*"/gi, "")
      .replace(/\son\w+\s*=\s*'[^']*'/gi, "");
  } catch {
    return null;
  }
}

type Props = {
  src: string;
  className?: string;
  /** Accessible label; renders as role="img" + aria-label on the wrapper. */
  label?: string;
  width?: number;
  height?: number;
};

export default async function InlineSvg({ src, className, label, width, height }: Props) {
  const markup = await loadSvgMarkup(src);

  if (markup) {
    return (
      <span
        className={className}
        role="img"
        aria-label={label || undefined}
        dangerouslySetInnerHTML={{ __html: markup }}
      />
    );
  }

  // Raster (png/webp) or fetch failure → plain image.
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={label ?? ""} className={className} width={width} height={height} />;
}
