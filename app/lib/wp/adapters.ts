import type { AcfImage } from "./types";

/**
 * Shape-conversion helpers — turn ACF group shapes into the props
 * shape components expect. One adapter per shared section.
 */

export type InnerHeroProps = {
  title: string;
  subtitle?: string;
  image?: AcfImage;
};

export function innerHeroFromAcf(
  src?: { title?: string; subtitle?: string; image?: AcfImage } | null,
): InnerHeroProps | null {
  if (!src?.title) return null;
  return {
    title: src.title,
    subtitle: src.subtitle,
    image: src.image ?? null,
  };
}
