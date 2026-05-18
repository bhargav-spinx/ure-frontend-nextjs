const BASE = process.env.WORDPRESS_API_URL ?? "";
if (!BASE) console.warn("[wp] WORDPRESS_API_URL is not set; all WP fetches will return null.");

type FetchOpts = {
  query?: Record<string, string | number | boolean | undefined>;
  revalidate?: number | false;
  tags?: string[];
  /**
   * When true, transport errors and non-2xx responses throw instead of
   * returning null. Use for routes that must not 404 on a transient WP
   * outage (Google would de-index a stable URL on a hard 404).
   */
  strict?: boolean;
  /**
   * Retries on 5xx / transport errors before giving up. Defaults to 2 for
   * strict mode (so build-time parallel hits against a local XAMPP don't
   * fail the whole export on one transient 500), 0 otherwise.
   */
  retries?: number;
};

export class WpFetchError extends Error {
  status?: number;
  url: string;
  constructor(url: string, message: string, status?: number) {
    super(message);
    this.name = "WpFetchError";
    this.url = url;
    this.status = status;
  }
}

function buildUrl(path: string, query: FetchOpts["query"]) {
  const url = new URL(path.replace(/^\//, ""), BASE.endsWith("/") ? BASE : BASE + "/");
  if (query) for (const [k, v] of Object.entries(query)) {
    if (v !== undefined) url.searchParams.set(k, String(v));
  }
  return url.toString();
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function wpFetch<T>(path: string, opts: FetchOpts = {}): Promise<T | null> {
  if (!BASE) {
    if (opts.strict) throw new WpFetchError(path, "WORDPRESS_API_URL is not set");
    return null;
  }
  const { query, revalidate = 60, tags, strict } = opts;
  const retries = opts.retries ?? (strict ? 2 : 0);
  const url = buildUrl(path, query);

  let attempt = 0;
  let lastStatus: number | undefined;

  while (true) {
    try {
      const res = await fetch(url, {
        headers: { Accept: "application/json" },
        next: { revalidate: revalidate === false ? undefined : revalidate, tags },
      });
      if (res.ok) return (await res.json()) as T;

      lastStatus = res.status;
      console.warn(`[wp] ${res.status} ${url}${attempt < retries ? " (retrying)" : ""}`);
      // Retry on 5xx and 429 — typically transient (DB hiccup, parallel-load overload).
      if (attempt < retries && (res.status >= 500 || res.status === 429)) {
        await sleep(200 * (attempt + 1));
        attempt++;
        continue;
      }
      if (strict) throw new WpFetchError(url, `WP responded ${res.status}`, res.status);
      return null;
    } catch (err) {
      if (err instanceof WpFetchError) throw err;
      console.warn(`[wp] fetch failed for ${url}${attempt < retries ? " (retrying)" : ""}:`, err);
      if (attempt < retries) {
        await sleep(200 * (attempt + 1));
        attempt++;
        continue;
      }
      if (strict) throw new WpFetchError(url, "WP fetch transport error", lastStatus);
      return null;
    }
  }
}

export async function wpFetchWithMeta<T>(path: string, opts: FetchOpts = {}) {
  if (!BASE) return { data: null as T | null, total: 0, totalPages: 1 };
  const url = buildUrl(path, opts.query);
  const res = await fetch(url, {
    headers: { Accept: "application/json" },
    next: { revalidate: opts.revalidate === false ? undefined : (opts.revalidate ?? 60), tags: opts.tags },
  });
  if (!res.ok) return { data: null as T | null, total: 0, totalPages: 1 };
  return {
    data: (await res.json()) as T,
    total: parseInt(res.headers.get("x-wp-total") ?? "0", 10),
    totalPages: parseInt(res.headers.get("x-wp-totalpages") ?? "1", 10),
  };
}
