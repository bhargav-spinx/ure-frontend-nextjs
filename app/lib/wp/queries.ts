import { cache } from "react";
import { wpFetch, wpFetchWithMeta } from "./client";
import type {
  AcfImage,
  GravityForm,
  SiteSettings,
  UrePageResponse,
  UrePostResponse,
  WpPage,
  WpPost,
} from "./types";

export const tags = {
  posts: "wp:posts",
  page: (slug: string) => `wp:page:${slug}`,
  options: "wp:options",
};

/* ============================================================
 * Site Settings (ACF Options — global logos)
 * ============================================================ */
export const getSiteSettings = cache(async (): Promise<SiteSettings> => {
  const data = await wpFetch<SiteSettings>("ure/v1/options", {
    tags: [tags.options],
    revalidate: 300, // logos rarely change; webhook busts wp:options on save
  });
  return data ?? { header_logo: null, footer_logo: null };
});

/* ============================================================
 * Pages
 * ============================================================ */

export const getPageBySlug = cache(async (slug: string): Promise<WpPage | null> => {
  const data = await wpFetch<UrePageResponse>(`ure/v1/page/${slug}`, {
    tags: [tags.page(slug)],
  });
  if (!data) return null;
  return {
    id: data.id,
    slug: data.slug,
    title: { rendered: data.title },
    content: { rendered: data.content },
    template: data.template,
    acf: data.acf,
  };
});

export async function getPageAcf<T>(slug: string): Promise<T | null> {
  const page = await getPageBySlug(slug);
  if (!page?.acf || Array.isArray(page.acf)) return null;
  return page.acf as T;
}

/* ============================================================
 * Posts
 * ============================================================ */

function urePostToWpPost(r: UrePostResponse): WpPost {
  return {
    id: r.id,
    slug: r.slug,
    date: r.date,
    modified: r.modified,
    title: { rendered: r.title },
    excerpt: { rendered: r.excerpt },
    content: { rendered: r.content },
    featured_image: r.featured_image,
    acf: r.acf,
  };
}

export async function getPosts(opts: { perPage?: number; ids?: number[] } = {}): Promise<WpPost[]> {
  const list = await wpFetch<UrePostResponse[]>("ure/v1/posts", {
    query: {
      per_page: opts.perPage ?? 10,
      include: opts.ids?.join(","),
    },
    tags: [tags.posts],
  });
  return list ? list.map(urePostToWpPost) : [];
}

/**
 * Strict — throws on WP outage instead of returning null.
 * Use for stable, published URLs (e.g. /news-detail/<slug>) so Google
 * sees 500 (and retries) instead of 404 (and de-indexes).
 */
export async function getPostBySlug(slug: string): Promise<WpPost | null> {
  const list = await wpFetch<UrePostResponse[]>("ure/v1/posts", {
    query: { slug, per_page: 1 },
    tags: [tags.posts],
    strict: true,
  });
  return list?.[0] ? urePostToWpPost(list[0]) : null;
}

export async function getPostsPaged(opts: { page?: number; perPage?: number; topic?: string } = {}) {
  return wpFetchWithMeta<UrePostResponse[]>("ure/v1/posts", {
    query: {
      page:     opts.page ?? 1,
      per_page: opts.perPage ?? 10,
      topic:    opts.topic,
    },
    tags: [tags.posts],
  });
}

/* ============================================================
 * Image helper
 * ============================================================ */

export function getFeaturedImage(post: WpPost): AcfImage {
  return post.featured_image ?? null;
}

/* ============================================================
 * Gravity Forms
 * ============================================================ */

export const getGravityForm = cache(async (formId: number): Promise<GravityForm | null> => {
  if (!formId) return null;
  return wpFetch<GravityForm>(`ure/v1/form/${formId}`, {
    tags: [`wp:form:${formId}`],
    revalidate: 300, // form schemas rarely change — cache 5 min
  });
});
