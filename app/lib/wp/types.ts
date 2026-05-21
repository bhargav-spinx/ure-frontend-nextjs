export type AcfImage = {
  url: string;
  alt?: string;
  width?: number;
  height?: number;
} | null;

/** Site-wide ACF Options (logos) — from /ure/v1/options. */
export type SiteSettings = {
  header_logo: AcfImage;
  footer_logo: AcfImage;
};

export type AcfLink = {
  url: string;
  title: string;
  target: string;
};

/* ============================================================
 * REST response shapes from /ure/v1/*
 * ============================================================ */

export type UrePageResponse = {
  id: number;
  slug: string;
  title: string;
  template: string;
  content: string;
  acf: Record<string, unknown> | unknown[];
  featured_image: AcfImage;
};

export type UrePostResponse = {
  id: number;
  slug: string;
  date: string;
  modified: string;
  title: string;
  excerpt: string;
  content: string;
  acf: Record<string, unknown> | unknown[];
  featured_image: AcfImage;
};

/* ============================================================
 * Normalized shapes consumed by components
 * ============================================================ */

export type WpPage = {
  id: number;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
  template: string;
  acf?: Record<string, unknown> | unknown[];
};

export type WpPost = {
  id: number;
  slug: string;
  date: string;
  modified: string;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  featured_image: AcfImage;
  acf?: Record<string, unknown> | unknown[];
};

/* ============================================================
 * Shared / reusable section shapes
 * ============================================================ */

export type BannerSection = {
  sub_title?: string;
  title?: string;
  background_image?: AcfImage;
};

export type CtaSection = {
  title?: string;
  description?: string;
  cta_label?: string;
  cta_href?: string;
  background_image?: AcfImage;
};

export type TitleDescriptionRow = {
  title?: string;
  description?: string;
};

export type TitleDescriptionImageRow = TitleDescriptionRow & {
  select_image?: AcfImage;
};

/* ============================================================
 * Per-page ACF type contracts
 * ============================================================ */

export type HomeAcf = {
  banner_section?: {
    hero_lines?: { title: string }[] | null;
    description?: string;
    background_video?: string;       // ACF file field, return_format = url
    primary_cta_label?: string;
    primary_cta_href?: string;
    secondary_cta_label?: string;
    secondary_cta_href?: string;
  };
  problem_section?: {
    bars?: { value?: string; label?: string; fill?: number }[];
    description?: string;
    select_image?: AcfImage;
  };
  who_we_are_section?: {
    sub_title?: string;
    statement?: string;
    panels?: { select_image?: AcfImage }[];
    description_left?: string;
    description_right?: string;
    cta_label?: string;
    cta_href?: string;
  };
  separation_statement?: {
    description?: string;
    about_icon?: AcfImage;
  };
  capabilities_section?: {
    sub_title?: string;
    items?: {
      title?: string;
      description?: string;
      select_image?: AcfImage;
      hover_image?: AcfImage;
    }[];
    cta_label?: string;
    cta_href?: string;
  };
  heavy_re_focus_section?: {
    sub_title?: string;
    title?: string;
    description?: string;
    cta_label?: string;
    cta_href?: string;
  };
  supply_chain_section?: {
    sub_title?: string;
    title?: string;
    description?: string;
    steps?: TitleDescriptionRow[];
  };
  industries_section?: {
    title?: string;
    description?: string;
    cta_label?: string;
    cta_href?: string;
    items?: {
      label?: string;
      select_image?: AcfImage;
    }[];
  };
  cta_section?: CtaSection;
};

export type AboutAcf = {
  banner_section?: BannerSection;
  overview_section?: {
    sub_title?: string;
    title?: string;
    description?: string;
  };
  operate_section?: {
    select_image?: AcfImage;
    title?: string;
    description?: string;
  };
  about_section?: {
    about_icon?: AcfImage;
    bottleneck_statement?: string;
  };
  bottleneck_section?: {
    bottleneck_rows?: TitleDescriptionRow[];
    highlight_image?: AcfImage;
  };
  capabilities_section?: HomeAcf["capabilities_section"];
  leadership_section?: {
    title?: string;
    leadership_team?: {
      select_image?: AcfImage;
      name?: string;
      designation?: string;
      bio?: string;
    }[];
  };
  cta_section?: CtaSection;
};

export type TechnologyAcf = {
  banner_section?: BannerSection;
  overview_section?: {
    sub_title?: string;
    title?: string;
    description?: string;
  };
  process_lead?: {
    sub_title?: string;
    title?: string;
    description?: string;
    specs?: TitleDescriptionRow[];
    select_video?: string;
  };
  process_why?: {
    title?: string;
    description?: string;
    rows?: TitleDescriptionRow[];
  };
  process_cards?: {
    sub_title?: string;
    title?: string;
    description?: string;
    specs?: TitleDescriptionRow[];
    select_image?: AcfImage;
  }[];
  ornl_lab_section?: {
    title?: string;
    description?: string;
    select_image?: AcfImage;
  };
  faq_section?: {
    title?: string;
    items?: TitleDescriptionRow[];
  };
  cta_section?: CtaSection;
};

export type MarketAcf = {
  banner_section?: BannerSection;
  landscape_section?: {
    sub_title?: string;
    title?: string;
    description?: string;
  };
  stats_section?: {
    stats?: { value?: string; label?: string; fill?: number }[];
    select_image?: AcfImage;
  };
  supply_shift_section?: {
    description?: string;
    about_icon?: AcfImage;
  };
  stake_section?: {
    title?: string;
    rows?: TitleDescriptionRow[];
    select_image?: AcfImage;
  };
  urgency_section?: {
    title?: string;
    rows?: TitleDescriptionRow[];
    select_image?: AcfImage;
  };
  industries_section?: {
    sub_title?: string;
    title?: string;
    items?: TitleDescriptionImageRow[];
  };
  gap_section?: {
    title?: string;
    description?: string;
    select_image?: AcfImage;
    cta_label?: string;
    cta_href?: string;
  };
  cta_section?: CtaSection;
};

export type NewsListAcf = {
  banner_section?: BannerSection;
  cta_section?: CtaSection;
};

export type NewsPostAcf = {
  background_image?: AcfImage;
  description?: string;
};

export type ContactAcf = {
  intro_section?: {
    sub_title?: string;
    title?: string;
    description?: string;
  };
  contact_info?: {
    hq_label?: string;
    hq_address?: string;
    gi_label?: string;
    gi_email?: string;
  };
  form_section?: {
    form_id?: number;
    form_intro?: string;
  };
};

export type StaticMessageAcf = {
  eyebrow?: string;
  body?: string;
  icon?: AcfImage;
  cta_label?: string;
  cta_href?: string;
  /** Long-form HTML — used by the news-detail-style pages (privacy, do-not-sell-my-info). */
  description?: string;
};

/* ============================================================
 * Gravity Forms schema (from /ure/v1/form/<id>)
 * ============================================================ */

export type GravityFieldType =
  | "text" | "email" | "phone" | "url" | "number"
  | "textarea" | "select" | "multiselect"
  | "radio" | "checkbox" | "honeypot" | "hidden"
  | "html" | "section" | string;

export type GravityChoice = {
  text: string;
  value: string;
  isSelected?: boolean;
};

export type GravityField = {
  id: number;
  type: GravityFieldType;
  label: string;
  placeholder?: string;
  description?: string;
  defaultValue?: string;
  cssClass?: string;
  size?: "small" | "medium" | "large" | string;
  isRequired?: boolean;
  choices?: GravityChoice[];
};

export type GravityForm = {
  id: number;
  title: string;
  description?: string;
  button: string;
  cssClass?: string;
  requireLogin?: boolean;
  fields: GravityField[];
};
